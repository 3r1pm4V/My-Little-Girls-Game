const fs = require('fs');
const path = require('path');

const API_URL = 'http://127.0.0.1:8001/api/tts/generate';
const VOICE_ID = 'Mai Anh';
const SPEED = 0.9;
const AUDIO_DIR = path.join(__dirname, '..', 'audio');

const NOUN_ITEMS = [
  { text: 'Ăng-ten', file: 'vocab_ang_ten.mp3' },
  { text: 'Ắc-quy', file: 'vocab_ac_quy.mp3' },
  { text: 'Ấm trà', file: 'vocab_am_tra.mp3' },
  { text: 'Âm nhạc', file: 'vocab_am_nhac.mp3' },
  { text: 'Quả dừa', file: 'vocab_qua_dua.mp3' },
  { text: 'Dưa chuột', file: 'vocab_dua_chuot.mp3' },
  { text: 'Đồng hồ', file: 'vocab_dong_ho.mp3' },
  { text: 'Con ếch', file: 'vocab_con_ech.mp3' },
  { text: 'Thước ê-ke', file: 'vocab_thuoc_e_ke.mp3' },
  { text: 'Muối i-ốt', file: 'vocab_muoi_i_ot.mp3' },
  { text: 'Thìa inox', file: 'vocab_thia_inox.mp3' },
  { text: 'Chim ó', file: 'vocab_chim_o.mp3' },
  { text: 'Cái ô', file: 'vocab_cai_o.mp3' },
  { text: 'Con ốc', file: 'vocab_con_oc.mp3' },
  { text: 'Quả ớt', file: 'vocab_qua_ot.mp3' },
  { text: 'Ớt chuông', file: 'vocab_ot_chuong.mp3' },
  { text: 'Bát phở', file: 'vocab_bat_pho.mp3' },
  { text: 'Đàn piano', file: 'vocab_dan_piano.mp3' },
  { text: 'Con rắn', file: 'vocab_con_ran.mp3' },
  { text: 'Con rùa', file: 'vocab_con_rua.mp3' },
  { text: 'Con sâu', file: 'vocab_con_sau.mp3' },
  { text: 'Tàu hỏa', file: 'vocab_tau_hoa.mp3' },
  { text: 'Đôi ủng', file: 'vocab_doi_ung.mp3' },
  { text: 'Chim uyên ương', file: 'vocab_chim_uyen_uong.mp3' },
  { text: 'Chim ưng', file: 'vocab_chim_ung.mp3' },
  { text: 'Mầm cây', file: 'vocab_mam_cay.mp3' },
  { text: 'Vịt con', file: 'vocab_vit_con.mp3' },
  { text: 'Con voi', file: 'vocab_con_voi.mp3' },
  { text: 'Cái váy', file: 'vocab_cai_vay.mp3' },
  { text: 'Xích đu', file: 'vocab_xich_du.mp3' },
  { text: 'Chim yến', file: 'vocab_chim_yen.mp3' },
  { text: 'Bát yến mạch', file: 'vocab_bat_yen_mach.mp3' },
  { text: 'Áo phông', file: 'vocab_ao_phong.mp3' }
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
  console.log(`Bắt đầu sinh ${NOUN_ITEMS.length} danh từ mới cho 29 chữ cái bằng giọng Mai Anh (tốc độ ${SPEED})...`);
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
  console.log('Hoàn thành sinh danh từ!');
}

main().catch(console.error);
