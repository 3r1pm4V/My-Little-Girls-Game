/**
 * scripts/generate_vocab_vieneu.js
 * Sinh âm thanh các từ vựng bảng chữ cái Tiếng Việt bằng VieNeu API (Giọng Tưởng Vy).
 * Tự động kiểm tra file đã có trên đĩa; nếu có thì bỏ qua.
 * Khi sinh xong tự động cập nhật audio-map.js.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT_DIR, 'audio');
const MAP_PATH = path.join(ROOT_DIR, 'audio-map.js');

const VOCAB_LIST = [
  // A
  "Anh trai", "Áo mưa", "An toàn",
  // Ă
  "Ăn cơm", "Ăn bánh",
  // Â
  "Ấm áp", "Âm thanh",
  // B
  "Ba mẹ", "Búp bê", "Bánh mì",
  // C
  "Con mèo", "Cà rốt", "Cái bát",
  // D
  "Dưa hấu", "Da dẻ", "Dạy học",
  // Đ
  "Đèn ngủ", "Đôi giày", "Đá bóng",
  // E
  "Em bé", "Én bạc",
  // Ê
  "Êm ái", "Ê ke",
  // G
  "Gấu bông", "Gà trống", "Ghế ngồi",
  // H
  "Hoa hồng", "Hạt gạo", "Học bài",
  // I
  "Im lặng", "Ít nhiều",
  // K
  "Kẹo ngọt", "Khăn mặt", "Kính mắt",
  // L
  "Lợn con", "Lá cây", "Ly nước",
  // M
  "Mẹ hiền", "Mây trắng", "Mũi tên",
  // N
  "Nhà cửa", "Nón lá", "Nước uống",
  // O
  "Ong mật", "Oa oa",
  // Ô
  "Ô tô", "Ổ bánh", "Ôn bài",
  // Ơ
  "Ơn trời", "Ơi gọi",
  // P
  "Phở bò", "Phim hoạt hình", "Phong bì",
  // Q
  "Quả táo", "Quà tặng", "Quạt nan",
  // R
  "Rổ rá", "Rùa chậm", "Rung chuông",
  // S
  "Sữa tươi", "Sách truyện", "Sâu bướm",
  // T
  "Trái cây", "Tivi", "Tóc tai",
  // U
  "Uống sữa", "Ủ ấm",
  // Ư
  "Ướt áo", "Ươm mầm",
  // V
  "Voi to", "Vẽ tranh", "Vàng bạc",
  // X
  "Xe đạp", "Xanh lá", "Xúc xích",
  // Y
  "Yêu quý", "Y tá", "Yến mạch"
];

function toSlug(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "_");
}

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
          reject(new Error(`HTTP ${res.statusCode}: ${buf.toString('utf8').slice(0, 100)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  const keys = loadApiKeys();
  if (keys.length === 0) {
    console.error("Không tìm thấy API key trong .env");
    return;
  }

  // Load existing audio map
  const win = {}; global.window = win;
  require(MAP_PATH);

  let keyIdx = 0;
  let successCount = 0;
  const newMapEntries = {};

  for (const word of VOCAB_LIST) {
    const fileName = `vocab_${toSlug(word)}.mp3`;
    const filePath = path.join(AUDIO_DIR, fileName);
    const relPath = `audio/${fileName}`;

    // Check if already mapped and exists
    const norm = win.__normAudioKey ? win.__normAudioKey(word) : word.toLowerCase();
    const existingAudio = win.AUDIO_MAP ? (win.AUDIO_MAP[word] || win.AUDIO_MAP[norm]) : null;
    if (existingAudio && fs.existsSync(path.join(ROOT_DIR, existingAudio))) {
      continue;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 500) {
      newMapEntries[word] = relPath;
      continue;
    }

    // Try fetching with rotation
    let fetched = false;
    for (let attempts = 0; attempts < keys.length; attempts++) {
      const apiKey = keys[keyIdx];
      keyIdx = (keyIdx + 1) % keys.length;
      try {
        console.log(`[VieNeu] Đang sinh: "${word}"...`);
        const buf = await fetchVieNeuAudio(word, apiKey);
        fs.writeFileSync(filePath, buf);
        newMapEntries[word] = relPath;
        successCount++;
        fetched = true;
        await new Promise(r => setTimeout(r, 400));
        break;
      } catch (e) {
        console.warn(`  Lỗi với key: ${e.message}`);
        if (e.message.includes('429')) {
          console.warn(`  Key đã hết quota hôm nay.`);
        }
      }
    }

    if (!fetched) {
      console.log(`[VieNeu] Hết quota toàn bộ keys, dừng phiên. Sẽ tự động chạy tiếp ngày mai.`);
      break;
    }
  }

  // If we have new entries, append to audio-map.js
  const entriesCount = Object.keys(newMapEntries).length;
  if (entriesCount > 0) {
    console.log(`Cập nhật ${entriesCount} từ vựng vào audio-map.js...`);
    let mapText = fs.readFileSync(MAP_PATH, 'utf8');
    const isCRLF = mapText.includes('\r\n');
    mapText = mapText.replace(/\r\n/g, '\n');

    let appendCode = '\n  // TỪ VỰNG BẢNG CHỮ CÁI TIẾNG VIỆT (VIENEU)\n';
    for (const [w, file] of Object.entries(newMapEntries)) {
      appendCode += `  ${JSON.stringify(w)}: ${JSON.stringify(file)},\n`;
      appendCode += `  ${JSON.stringify("vi|" + w)}: ${JSON.stringify(file)},\n`;
    }

    const pos = mapText.lastIndexOf('};');
    if (pos !== -1) {
      mapText = mapText.slice(0, pos) + appendCode + mapText.slice(pos);
      if (isCRLF) mapText = mapText.replace(/\n/g, '\r\n');
      fs.writeFileSync(MAP_PATH, mapText, 'utf8');
      console.log(`Đã cập nhật audio-map.js thành công!`);
    }
  }

  console.log(`[VieNeu] Hoàn thành: đã sinh ${successCount} file mới.`);
}

run().catch(console.error);
