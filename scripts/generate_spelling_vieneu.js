/**
 * scripts/generate_spelling_vieneu.js
 * Sinh âm thanh đánh vần Tiếng Việt bằng VieNeu API (Giọng Tưởng Vy).
 * 
 * Tính năng:
 * - Đọc API keys từ .env (hỗ trợ nhiều key xoay vòng round-robin)
 * - Tự động tiếp tục: bỏ qua các file đã tồn tại trên đĩa > 1000 bytes
 * - Hỗ trợ lọc theo phụ âm: node scripts/generate_spelling_vieneu.js --consonant m
 * - Hỗ trợ --dry-run: kiểm tra danh sách và số lượng mà không tốn quota
 * - Tự động cập nhật audio-map.js sau khi hoàn thành
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT_DIR, 'audio');
const MAP_PATH = path.join(ROOT_DIR, 'audio-map.js');

const d = require(path.join(ROOT_DIR, 'data-vn.js'));

// Đọc tham số dòng lệnh
const args = process.argv.slice(2);
const IS_DRY_RUN = args.includes('--dry-run');

function getArgValue(name, defaultValue = null) {
  const idx = args.indexOf(name);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultValue;
}

const TARGET_CONSONANTS = (() => {
  const cVal = getArgValue('--consonant') || getArgValue('--consonants');
  if (cVal) return cVal.split(',').map(s => s.trim().toLowerCase());
  return null; // Mặc định tất cả
})();

const LIMIT = parseInt(getArgValue('--limit', '0'), 10);
const BATCH_SIZE = parseInt(getArgValue('--batch-size', '15'), 10);
const SLEEP_MS = parseInt(getArgValue('--sleep', '300'), 10);

// Nạp API Keys an toàn từ .env
function loadApiKeys() {
  const keys = [];
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('VIENEU_API_KEYS=')) {
        const val = trimmed.substring('VIENEU_API_KEYS='.length);
        val.split(',').forEach(k => {
          const t = k.trim();
          if (t && !keys.includes(t)) keys.push(t);
        });
      } else if (trimmed.startsWith('VIENEU_API_KEY=')) {
        const t = trimmed.substring('VIENEU_API_KEY='.length).trim();
        if (t && !keys.includes(t)) keys.push(t);
      }
    });
  }
  return keys;
}

// Xây dựng danh sách các câu đánh vần cần kiểm tra/sinh
function buildCandidateList() {
  const list = [];
  d.VN_SPELL.C.forEach(cObj => {
    const c = cObj.c;
    if (TARGET_CONSONANTS && !TARGET_CONSONANTS.includes(c)) return;

    d.VN_SPELL.V.forEach(vObj => {
      const v = vObj.v;
      if (!d.VN_SPELL.valid(c, v)) return;

      for (let t = 0; t < 6; t++) {
        const s = d.VN_SPELL.syl(cObj, vObj, t);
        const fileName = `spell_${c}_${v}_${t}.mp3`;
        const spoken = s.spell.replace(/\s*-\s*/g, ', ').trim() + '.';
        const spaced = s.spell.replace(/\s*-\s*/g, ' ').trim();
        list.push({
          c, v, t,
          text: s.text,
          spellText: s.spell,
          spoken,
          spaced,
          fileName,
          key: `spell_${c}_${v}_${t}`,
          lananhKey: `lananh_spell_${c}_${v}_${t}`
        });
      }
    });
  });
  return list;
}

function fetchVieNeuAudio(text, apiKey) {
  const payload = JSON.stringify({
    model: 'vieneu-v4',
    input: text,
    voice: 'Tưởng Vy'
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vieneu.io',
      path: '/api/v1/audio/speech',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode === 200) {
          resolve(buf);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${buf.toString('utf8')}`));
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function registerInAudioMap(newEntries) {
  if (!fs.existsSync(MAP_PATH)) return;
  console.log(`\nĐang đồng bộ ${Object.keys(newEntries).length / 4} mục mới vào audio-map.js...`);
  let content = fs.readFileSync(MAP_PATH, 'utf8');
  const anchor = 'const RAW_MAP = {';
  const idx = content.indexOf(anchor);
  if (idx === -1) return;

  const lines = [];
  for (const [k, v] of Object.entries(newEntries)) {
    lines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }

  const insertStr = '\n    // --- ÂM THANH ĐÁNH VẦN VIENEU BỔ SUNG ---\n' + lines.join('\n') + '\n';
  content = content.slice(0, idx + anchor.length) + insertStr + content.slice(idx + anchor.length);
  fs.writeFileSync(MAP_PATH, content, 'utf8');
  console.log('✔ Cập nhật audio-map.js thành công!');
}

async function main() {
  console.log('=== TRÌNH SINH ÂM THANH ĐÁNH VẦN VIENEU (TƯỞNG VY) ===\n');
  const candidates = buildCandidateList();
  console.log(`Tổng số mục đánh vần theo tiêu chí lọc: ${candidates.length}`);

  const missing = candidates.filter(item => {
    const filePath = path.join(AUDIO_DIR, item.fileName);
    return !(fs.existsSync(filePath) && fs.statSync(filePath).size > 1000);
  });

  console.log(`Số file đã có trên đĩa (>1000 bytes): ${candidates.length - missing.length}`);
  console.log(`Số file cần sinh mới: ${missing.length}`);

  let toProcess = missing;
  if (LIMIT > 0 && toProcess.length > LIMIT) {
    toProcess = toProcess.slice(0, LIMIT);
    console.log(`Giới hạn theo tham số --limit: ${LIMIT} file`);
  }

  if (IS_DRY_RUN) {
    console.log('\n[DRY RUN] Danh sách mẫu cần sinh (10 mục đầu):');
    toProcess.slice(0, 10).forEach((item, i) => {
      console.log(`  ${i + 1}. [${item.c}] "${item.spoken}" -> ${item.fileName}`);
    });
    console.log('\nKết thúc Dry Run! Chạy lại không có --dry-run để sinh thật.');
    return;
  }

  const keys = loadApiKeys();
  if (keys.length === 0) {
    console.error('✖ Không tìm thấy API key nào trong file .env!');
    process.exit(1);
  }
  console.log(`✔ Đã nạp ${keys.length} API key an toàn để xoay vòng.`);

  let keyIndex = 0;
  let successCount = 0;
  let failCount = 0;
  const newMapEntries = {};

  for (let i = 0; i < toProcess.length; i++) {
    const item = toProcess[i];
    const filePath = path.join(AUDIO_DIR, item.fileName);
    const relPath = `audio/${item.fileName}`;

    let success = false;
    let retries = 0;

    while (!success && retries < 3) {
      const currentKey = keys[keyIndex % keys.length];
      try {
        process.stdout.write(`[${i + 1}/${toProcess.length}] [Key #${(keyIndex % keys.length) + 1}] "${item.spoken}" -> ${item.fileName}... `);
        const buf = await fetchVieNeuAudio(item.spoken, currentKey);
        fs.writeFileSync(filePath, buf);
        process.stdout.write(`OK (${buf.length} bytes)\n`);

        newMapEntries[item.key] = relPath;
        newMapEntries[`vi|${item.key}`] = relPath;
        newMapEntries[item.lananhKey] = relPath;
        newMapEntries[`vi|${item.lananhKey}`] = relPath;
        newMapEntries[item.spoken] = relPath;
        newMapEntries[`vi|${item.spoken}`] = relPath;

        success = true;
        successCount++;
        keyIndex++; // Xoay vòng key cho lượt sau
        await sleep(SLEEP_MS);
      } catch (err) {
        process.stdout.write(`LỖI!\n`);
        console.warn(`    ⚠ Lỗi: ${err.message}`);
        const isQuota = err.message.includes('Daily token limit reached') || err.message.includes('Insufficient tokens') || err.message.includes('insufficient_quota') || err.message.includes('403');
        if (isQuota) {
          console.log(`    ⚠ Key #${(keyIndex % keys.length) + 1} đã hết hạn mức ngày, loại khỏi vòng xoay.`);
          keys.splice(keyIndex % keys.length, 1);
          if (keys.length === 0) {
            console.error('✖ Tất cả các khóa API đều đã đạt hạn mức ngày! Tạm dừng và lưu hàng đợi.');
            break;
          }
        } else {
          keyIndex++; // Đổi key khi gặp lỗi khác
        }
        retries++;
        await sleep(1000 * retries);
      }
    }

    if (!success) {
      failCount++;
    }

    if (keys.length === 0) {
      console.log('\n--- HẾT HẠN MỨC TOKEN TOÀN BỘ KEYS: LƯU DỮ LIỆU ĐÃ SINH & LẬP HÀNG ĐỢI CHO NGÀY MAI ---\n');
      break;
    }

    if ((i + 1) % BATCH_SIZE === 0 && i < toProcess.length - 1) {
      console.log(`\n--- Nghỉ 2s giữa lô để bảo vệ rate-limit ---\n`);
      await sleep(2000);
    }
  }

  if (Object.keys(newMapEntries).length > 0) {
    registerInAudioMap(newMapEntries);
  }

  // Ghi tệp trạng thái hàng đợi (Queue Status)
  const remainingCandidates = buildCandidateList().filter(item => {
    const filePath = path.join(AUDIO_DIR, item.fileName);
    return !(fs.existsSync(filePath) && fs.statSync(filePath).size > 1000);
  });

  const queueInfo = {
    updatedAt: new Date().toISOString(),
    localTime: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
    keysExhausted: keys.length === 0,
    resetTimeUTC: (() => { const n = new Date(); const r = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 17, 0, 0)); if (n.getUTCHours() >= 17) r.setUTCDate(r.getUTCDate() + 1); return r.toISOString(); })(),
    resetTimeLocal: "00:00 ngày mai (GMT+7)",
    generatedInRun: successCount,
    totalRemainingFiles: remainingCandidates.length,
    remainingConsonants: [...new Set(remainingCandidates.map(x => x.c))]
  };
  fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'vieneu_queue_status.json'), JSON.stringify(queueInfo, null, 2), 'utf8');
  console.log(`✔ Đã cập nhật file hàng đợi scripts/vieneu_queue_status.json (Còn lại: ${remainingCandidates.length} file)`);

  console.log('\n========================================');
  console.log(`Hoàn thành: ${successCount} thành công, ${failCount} thất bại.`);
  console.log('========================================\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
