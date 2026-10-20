const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.VIENEU_API_KEY || '';
const VOICE = 'Tưởng Vy';
const AUDIO_DIR = path.join(__dirname, 'audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// Load VN_SPELL from data-vn.js
const dataVnCode = fs.readFileSync(path.join(__dirname, 'data-vn.js'), 'utf8').replace(/const /g, 'global.');
eval(dataVnCode);

function getSpellSpokenText(cObj, vObj, toneIdx) {
  const syl = VN_SPELL.syl(cObj, vObj, toneIdx);
  return syl.spell.replace(/\s*-\s*/g, ' ').trim();
}

function fetchAudio(text) {
  const payload = JSON.stringify({
    model: 'vieneu-v4',
    input: text,
    voice: VOICE
  });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vieneu.io',
      path: '/api/v1/audio/speech',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode === 200) resolve(buf);
        else reject(new Error(`API Error ${res.statusCode}: ${buf.toString()}`));
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log(`Bắt đầu tạo âm thanh đánh vần với giọng ${VOICE}...`);

  // Target consonants to generate spelling for (prioritize core letters)
  const targetConsonants = ['b', 'c', 'd', 'đ'];

  // Load existing audio-map.js if present
  let existingMap = {};
  const mapPath = path.join(__dirname, 'audio-map.js');
  if (fs.existsSync(mapPath)) {
    try {
      const mapContent = fs.readFileSync(mapPath, 'utf8');
      const jsonMatch = mapContent.match(/window\.AUDIO_MAP\s*=\s*(\{[\s\S]*?\});/);
      if (jsonMatch) {
        existingMap = JSON.parse(jsonMatch[1]);
      }
    } catch(e) {
      console.warn('Lỗi đọc audio-map cũ:', e.message);
    }
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (const cChar of targetConsonants) {
    const cObj = VN_SPELL.C.find(x => x.c === cChar);
    if (!cObj) continue;

    for (const vObj of VN_SPELL.V) {
      if (!VN_SPELL.valid(cObj.c, vObj.v)) continue;

      for (let toneIdx = 0; toneIdx < 6; toneIdx++) {
        const spoken = getSpellSpokenText(cObj, vObj, toneIdx);
        const fileName = `spell_${cObj.c}_${vObj.v}_${toneIdx}.mp3`;
        const filePath = path.join(AUDIO_DIR, fileName);

        // Register in map
        existingMap[`vi|${spoken}`] = `audio/${fileName}`;
        existingMap[`vi|${spoken}.`] = `audio/${fileName}`;
        existingMap[`vi|spell_${cObj.c}_${vObj.v}_${toneIdx}`] = `audio/${fileName}`;

        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
          skippedCount++;
          continue;
        }

        try {
          console.log(`Đang tạo (${cObj.c}+${vObj.v}, thanh ${toneIdx}): "${spoken}" -> ${fileName}`);
          const buf = await fetchAudio(spoken);
          fs.writeFileSync(filePath, buf);
          createdCount++;
          console.log(`   -> OK (${buf.length} bytes)`);
          await sleep(200);
        } catch (err) {
          console.error(`   Lỗi "${spoken}":`, err.message);
          if (err.message.includes('429')) {
            console.log('Chạm giới hạn rate limit/quota, dừng tạo.');
            break;
          }
          await sleep(1000);
        }
      }
    }
  }

  // Save updated audio-map.js
  const mapCode = `// Bản đồ âm thanh VieNeu (Giọng #11 Tường Vy) & Bảng chữ cái VTV7 & Đánh vần Ghép tiếng chuẩn & Vần Cô Lan Anh
window.AUDIO_MAP = ${JSON.stringify(existingMap, null, 2)};
`;
  fs.writeFileSync(mapPath, mapCode, 'utf8');
  console.log(`\nHoàn tất! Đã tạo mới ${createdCount} file, bỏ qua ${skippedCount} file đã có.`);
  console.log(`Đã cập nhật window.AUDIO_MAP với ${Object.keys(existingMap).length} mục.`);
}

run();
