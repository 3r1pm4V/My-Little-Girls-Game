const fs = require('fs');
const path = require('path');

const API_URL = 'http://127.0.0.1:8001/api/tts/generate';
const VOICE_ID = 'Mai Anh';
const SPEED = 0.9;
const AUDIO_DIR = path.join(__dirname, '..', 'audio');

const NOUN_ITEMS = [
  { text: 'Dừa xiêm', file: 'vocab_dua_xiem.mp3' },
  { text: 'Ếch con', file: 'vocab_ech_con.mp3' },
  { text: 'I-ốt', file: 'vocab_i_ot.mp3' },
  { text: 'Inox', file: 'vocab_inox.mp3' },
  { text: 'Ó biển', file: 'vocab_o_bien.mp3' },
  { text: 'Ô dù', file: 'vocab_o_du.mp3' },
  { text: 'Ốc sên', file: 'vocab_oc_sen.mp3' },
  { text: 'Ớt đỏ', file: 'vocab_ot_do.mp3' },
  { text: 'Piano', file: 'vocab_piano.mp3' },
  { text: 'Rùa con', file: 'vocab_rua_con.mp3' },
  { text: 'Rắn con', file: 'vocab_ran_con.mp3' },
  { text: 'Ủng đi mưa', file: 'vocab_ung_di_mua.mp3' },
  { text: 'Uyên ương', file: 'vocab_uyen_uong.mp3' },
  { text: 'Ưng con', file: 'vocab_ung_con.mp3' },
  { text: 'Voi con', file: 'vocab_voi_con.mp3' },
  { text: 'Váy đầm', file: 'vocab_vay_dam.mp3' },
  { text: 'Yến phụng', file: 'vocab_yen_phung.mp3' }
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
  console.log(`Bắt đầu sinh ${NOUN_ITEMS.length} audio khớp chữ cái đầu cho 29 chữ cái (Mai Anh, tốc độ ${SPEED})...`);
  for (let i = 0; i < NOUN_ITEMS.length; i++) {
    const it = NOUN_ITEMS[i];
    process.stdout.write(`[${i+1}/${NOUN_ITEMS.length}] "${it.text}" -> ${it.file}... `);
    try {
      const bytes = await genOne(it);
      console.log(`OK (${(bytes/1024).toFixed(1)} KB)`);
    } catch(e) {
      console.log(`LỖI: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('Hoàn thành sinh audio khớp chữ cái đầu!');
}

main().catch(console.error);
