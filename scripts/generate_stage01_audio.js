/**
 * scripts/generate_stage01_audio.js
 * Sinh âm thanh VieNeu TTS (Giọng Tưởng Vy) theo lô cho Chặng 0–1.
 * 
 * Tính năng an toàn:
 * 1. Hỗ trợ --dry-run: Chỉ quét, đếm, tính dung lượng & ký tự, không gọi API, không ghi đè.
 * 2. Chia lô nhỏ (--batch-size, mặc định 20): Tự nghỉ giữa các lô và giữa các file.
 * 3. Tự tiếp tục (resume): Bỏ qua các file đã tồn tại trên đĩa có kích thước > 1000 bytes.
 * 4. Xử lý lỗi & Rate Limit: Tự động thử lại khi gặp 429/5xx (exponential backoff).
 * 5. Tuyệt đối không in / log API key ra màn hình hoặc console.
 * 6. Bảo toàn cấu trúc IIFE và Proxy của audio-map.js khi cập nhật RAW_MAP.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT_DIR, 'audio');
const MAP_PATH = path.join(ROOT_DIR, 'audio-map.js');
const PLAN_PATH = path.join(ROOT_DIR, 'docs', 'vieneu-generation-plan.md');

// Phân tích tham số dòng lệnh
const args = process.argv.slice(2);
const IS_DRY_RUN = args.includes('--dry-run');
const BATCH_SIZE = (() => {
  const idx = args.indexOf('--batch-size');
  return idx !== -1 && args[idx + 1] ? parseInt(args[idx + 1], 10) : 20;
})();
const BATCH_SLEEP_MS = (() => {
  const idx = args.indexOf('--batch-sleep');
  return idx !== -1 && args[idx + 1] ? parseInt(args[idx + 1], 10) : 3000;
})();
const FILE_SLEEP_MS = 350;

// Các chuỗi đã bị loại theo quyết định của Nghĩa (Chủ dự án):
// - 3 từ tiếng Anh mầm non (sẽ tải audio tiếng Anh bản ngữ chuẩn)
// - 4 mô phỏng tiếng kêu con vật (sẽ tải từ trên Google)
const EXCLUDED_STRINGS = new Set([
  'Dog',
  'Cat',
  'Chick',
  'Con Cừu / Con Dê kêu Be be',
  'Con Chó sủa Gâu gâu',
  'Con Mèo kêu Meo meo',
  'Con Gà gáy Ò ó o'
]);

// 1. Đọc danh sách khóa API an toàn (không in ra log)
function loadApiKeys() {
  const keys = [];
  if (process.env.VIENEU_API_KEY) keys.push(process.env.VIENEU_API_KEY.trim());
  if (process.env.VIENEU_API_KEYS) {
    process.env.VIENEU_API_KEYS.split(',').forEach(k => {
      const trimmed = k.trim();
      if (trimmed && !keys.includes(trimmed)) keys.push(trimmed);
    });
  }

  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('VIENEU_API_KEY=')) {
        const val = trimmed.substring('VIENEU_API_KEY='.length).trim();
        if (val && !keys.includes(val)) keys.push(val);
      } else if (trimmed.startsWith('VIENEU_API_KEYS=')) {
        const val = trimmed.substring('VIENEU_API_KEYS='.length).trim();
        val.split(',').forEach(k => {
          const t = k.trim();
          if (t && !keys.includes(t)) keys.push(t);
        });
      }
    });
  }
  return keys;
}

// 2. Trích xuất danh sách cần sinh từ docs/vieneu-generation-plan.md
function loadCandidateList() {
  if (!fs.existsSync(PLAN_PATH)) {
    throw new Error(`Không tìm thấy file kế hoạch: ${PLAN_PATH}`);
  }
  const content = fs.readFileSync(PLAN_PATH, 'utf8');
  const lines = content.split('\n');
  const candidates = [];

  lines.forEach(line => {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
    if (m) {
      const stt = parseInt(m[1], 10);
      const text = m[2].trim();
      const source = m[3].trim();
      const fileName = m[4].trim().replace(/`/g, '');
      const type = m[5].trim();
      const note = m[6].trim();

      candidates.push({ stt, text, source, fileName, type, note });
    }
  });

  return candidates;
}

// 3. Hàm gọi API VieNeu TTS
function fetchAudioVieNeu(text, apiKey) {
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
          reject(new Error(`VieNeu API HTTP ${res.statusCode}: ${buf.toString('utf8')}`));
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

// 4. Cập nhật an toàn audio-map.js (bảo toàn IIFE và Proxy)
function registerInAudioMap(newEntries) {
  if (!fs.existsSync(MAP_PATH)) return;
  const content = fs.readFileSync(MAP_PATH, 'utf8');
  const rawMapMarker = 'const RAW_MAP = {';
  const markerIdx = content.indexOf(rawMapMarker);
  if (markerIdx === -1) {
    console.error('Không tìm thấy RAW_MAP trong audio-map.js để cập nhật!');
    return;
  }

  let formattedEntries = '\n  // --- ÂM THANH BỔ SUNG CHẶNG 0–1 (VIENEU TTS TƯỞNG VY) ---';
  for (const [k, relPath] of Object.entries(newEntries)) {
    const safeK = JSON.stringify(k);
    const safeVal = JSON.stringify(relPath);
    formattedEntries += `\n  ${safeK}: ${safeVal},`;
  }

  const insertPos = markerIdx + rawMapMarker.length;
  const newContent = content.slice(0, insertPos) + formattedEntries + content.slice(insertPos);
  fs.writeFileSync(MAP_PATH, newContent, 'utf8');
  console.log(`✔ Đã cập nhật thành công ${Object.keys(newEntries).length} cặp khóa vào audio-map.js`);
}

// 5. Luồng thực thi chính
async function main() {
  console.log('================================================================');
  console.log('  VIENEU AUDIO GENERATOR — CHẶNG 0 & 1 BATCH GENERATION');
  console.log(`  Chế độ: ${IS_DRY_RUN ? 'DRY-RUN (CHẠY THỬ / KIỂM TRA THÔNG SỐ)' : 'EXECUTE (CHẠY THẬT THEO LÔ)'}`);
  console.log('================================================================\n');

  const allCandidates = loadCandidateList();
  console.log(`Tổng số mục trong kế hoạch ban đầu: ${allCandidates.length}`);

  // Lọc bỏ danh sách loại trừ
  const approvedList = allCandidates.filter(item => !EXCLUDED_STRINGS.has(item.text));
  const excludedList = allCandidates.filter(item => EXCLUDED_STRINGS.has(item.text));

  console.log(`- Số mục bị loại trừ (tiếng Anh & tiếng kêu): ${excludedList.length}`);
  console.log(`- Số mục chốt thực hiện: ${approvedList.length}`);

  // Tính toán ký tự và ước tính dung lượng
  let totalChars = 0;
  let totalEstBytes = 0;
  let existingCount = 0;
  let missingCount = 0;

  approvedList.forEach(item => {
    totalChars += item.text.length;
    const wordCount = item.text.split(/\s+/).length;
    totalEstBytes += wordCount < 4 ? 18 * 1024 : 32 * 1024;

    const filePath = path.join(AUDIO_DIR, item.fileName);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      existingCount++;
    } else {
      missingCount++;
    }
  });

  const estMB = (totalEstBytes / (1024 * 1024)).toFixed(2);
  console.log('\n--- BÁO CÁO THÔNG SỐ DỰ KIẾN ---');
  console.log(`• Tổng số file chốt: ${approvedList.length} file`);
  console.log(`  - Đã có sẵn trên đĩa (sẽ skip): ${existingCount} file`);
  console.log(`  - Cần sinh mới: ${missingCount} file`);
  console.log(`• Tổng số ký tự gửi VieNeu API: ${totalChars} ký tự`);
  console.log(`• Dung lượng MP3 ước tính: ~${(totalEstBytes / 1024).toFixed(1)} KB (~${estMB} MB)`);
  console.log(`• Kích thước lô (batch size): ${BATCH_SIZE} file/lô`);
  console.log(`• Số lô dự kiến: ${Math.ceil(missingCount / BATCH_SIZE)} lô`);

  console.log('\n--- DANH SÁCH CÁC CHUỖI ĐÃ LOẠI TRỪ KHỎI VIENEU ---');
  excludedList.forEach((it, idx) => {
    console.log(`  ${idx + 1}. [${it.type}] "${it.text}" (${it.source}) -> ${it.note}`);
  });

  if (IS_DRY_RUN) {
    console.log('\n================================================================');
    console.log('  KẾT THÚC CHẾ ĐỘ DRY-RUN AN TOÀN!');
    console.log('  Không có kết nối mạng hay tệp tin nào bị thay đổi.');
    console.log('  Vui lòng gửi số liệu trên cho Nghĩa để xác nhận trước khi chạy thật.');
    console.log('================================================================\n');
    return;
  }

  // Chế độ CHẠY THẬT (cần API key)
  const apiKeys = loadApiKeys();
  if (apiKeys.length === 0) {
    console.error('\n✖ LỖI: Không tìm thấy API key nào trong process.env hoặc file .env!');
    console.error('Vui lòng cấu hình VIENEU_API_KEY hoặc VIENEU_API_KEYS trước khi chạy thật.');
    process.exit(1);
  }
  console.log(`\n✔ Đã nạp an toàn ${apiKeys.length} khóa API (không hiển thị key).`);

  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }

  let keyIndex = 0;
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const failedItems = [];
  const newlyCreatedEntries = {};

  const itemsToGenerate = approvedList.filter(item => {
    const filePath = path.join(AUDIO_DIR, item.fileName);
    return !(fs.existsSync(filePath) && fs.statSync(filePath).size > 1000);
  });

  console.log(`\nBắt đầu sinh ${itemsToGenerate.length} file theo từng lô...\n`);

  for (let i = 0; i < itemsToGenerate.length; i += BATCH_SIZE) {
    const batch = itemsToGenerate.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(itemsToGenerate.length / BATCH_SIZE);

    console.log(`--- [LÔ ${batchNum}/${totalBatches}] Đang xử lý ${batch.length} file ---`);

    for (const item of batch) {
      const filePath = path.join(AUDIO_DIR, item.fileName);

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
        skippedCount++;
        continue;
      }

      let generated = false;
      let retries = 0;
      const maxRetries = 3;

      while (!generated && retries <= maxRetries) {
        const currentKey = apiKeys[keyIndex % apiKeys.length];
        try {
          process.stdout.write(`  [#${item.stt}] "${item.text}" -> ${item.fileName}... `);
          const buf = await fetchAudioVieNeu(item.text, currentKey);
          fs.writeFileSync(filePath, buf);
          process.stdout.write(`OK (${buf.length} bytes)\n`);

          // Đăng ký vào map
          const relPath = `audio/${item.fileName}`;
          newlyCreatedEntries[item.text] = relPath;
          newlyCreatedEntries[`vi|${item.text}`] = relPath;

          successCount++;
          generated = true;
          await sleep(FILE_SLEEP_MS);
        } catch (err) {
          process.stdout.write(`LỖI!\n`);
          console.warn(`    ⚠ Lỗi: ${err.message}`);

          // Xoay key nếu gặp lỗi 429
          if (err.message.includes('429')) {
            console.log('    -> Xoay vòng sang khóa API tiếp theo...');
            keyIndex++;
          }

          retries++;
          if (retries <= maxRetries) {
            const backoffMs = retries * 2000;
            console.log(`    -> Chờ ${backoffMs}ms và thử lại (lần ${retries}/${maxRetries})...`);
            await sleep(backoffMs);
          } else {
            console.error(`    ✖ Thất bại mục: "${item.text}" sau ${maxRetries} lần thử.`);
            failCount++;
            failedItems.push({ text: item.text, error: err.message });
          }
        }
      }
    }

    if (i + BATCH_SIZE < itemsToGenerate.length) {
      console.log(`\nNghỉ giữa lô ${BATCH_SLEEP_MS}ms để hạ nhiệt rate-limit...\n`);
      await sleep(BATCH_SLEEP_MS);
    }
  }

  // Đăng ký toàn bộ file vào audio-map.js
  if (Object.keys(newlyCreatedEntries).length > 0) {
    registerInAudioMap(newlyCreatedEntries);
  }

  console.log('\n================================================================');
  console.log('  TỔNG KẾT TIẾN TRÌNH SINH AUDIO');
  console.log(`  • Thành công tạo mới: ${successCount} file`);
  console.log(`  • Bỏ qua (đã có): ${skippedCount} file`);
  console.log(`  • Thất bại: ${failCount} file`);
  if (failedItems.length > 0) {
    console.log('  Danh sách các mục thất bại:');
    failedItems.forEach((f, idx) => console.log(`    ${idx + 1}. "${f.text}": ${f.error}`));
  }
  console.log('================================================================\n');
}

main().catch(err => {
  console.error('\n✖ LỖI TIẾN TRÌNH:', err.message);
  process.exit(1);
});
