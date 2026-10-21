const fs = require('fs');
const path = require('path');

const API_URL = 'http://127.0.0.1:8001/api/tts/generate';
const VOICE_ID = 'Mai Anh';
const SPEED = 0.9;
const AUDIO_DIR = path.join(__dirname, '..', 'audio');

const ITEMS = [
  { text: 'Khăn mặt', file: 'vocab_khan_mat.mp3' },
  { text: 'Áo mưa', file: 'vocab_ao_mua.mp3' },
  { text: 'Búp bê', file: 'vocab_bup_be.mp3' },
  { text: 'Con mèo', file: 'vocab_con_meo.mp3' },
  { text: 'Cà rốt', file: 'vocab_ca_rot.mp3' },
  { text: 'Dưa hấu', file: 'vocab_dua_hau.mp3' },
  { text: 'Đôi giày', file: 'vocab_doi_giay.mp3' },
  { text: 'Em bé', file: 'vocab_em_be.mp3' },
  { text: 'Gấu bông', file: 'vocab_gau_bong.mp3' },
  { text: 'Gà trống', file: 'vocab_ga_trong.mp3' },
  { text: 'Mũi tên', file: 'vocab_mui_ten.mp3' },
  { text: 'Nón lá', file: 'vocab_non_la.mp3' },
  { text: 'Ô tô', file: 'vocab_o_to.mp3' },
  { text: 'Quả táo', file: 'vocab_qua_tao.mp3' },
  { text: 'Xe đạp', file: 'vocab_xe_dap.mp3' }
];

async function genOne(it) {
  const payload = {
    text: it.text,
    voice_id: VOICE_ID,
    format: 'mp3',
    speed: SPEED,
    temperature: 0.65
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`TTS error ${res.status}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = path.join(AUDIO_DIR, it.file);
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

async function main() {
  console.log(`Bắt đầu sinh ${ITEMS.length} file audio vocab chuẩn Mai Anh 0.9...`);
  for (let i = 0; i < ITEMS.length; i++) {
    const it = ITEMS[i];
    process.stdout.write(`[${i+1}/${ITEMS.length}] "${it.text}" -> ${it.file}... `);
    try {
      const bytes = await genOne(it);
      console.log(`OK (${(bytes/1024).toFixed(1)} KB)`);
    } catch(e) {
      console.log(`LỖI: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('Hoàn thành sinh audio!');
}

main().catch(console.error);
