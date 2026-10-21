/**
 * tools/batch-generate-trucly.js
 * Script tự động hóa sinh âm thanh giọng Mai Anh (hoặc Trúc Ly) 48kHz từ CIT Voice Studio local API (http://127.0.0.1:8001)
 *
 * Cách chạy:
 *   node tools/batch-generate-trucly.js                  (Sinh toàn bộ: chữ cái, ghép âm, số, từ vựng, ví dụ, menu)
 *   node tools/batch-generate-trucly.js --voice "Mai Anh" --speed 0.9
 *   node tools/batch-generate-trucly.js --phonics        (Chỉ sinh 46 âm đánh vần & chữ cái)
 *   node tools/batch-generate-trucly.js --plan           (Sinh 157 chuỗi cốt lõi theo plan)
 *   node tools/batch-generate-trucly.js --all            (Toàn bộ danh mục tiếng Việt)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const API_URL = 'http://127.0.0.1:8001/api/tts/generate';
const AUDIO_DIR = path.join(__dirname, '..', 'audio');

// Đọc tham số dòng lệnh
const args = process.argv.slice(2);
const voiceIdx = args.indexOf('--voice');
const VOICE_ID = voiceIdx >= 0 ? args[voiceIdx + 1] : 'Mai Anh';
const speedIdx = args.indexOf('--speed');
const speedVal = speedIdx >= 0 ? parseFloat(args[speedIdx + 1]) : 0.9;
const isPhonics = args.includes('--phonics');
const isAll = args.includes('--all');
const isPlan = args.includes('--plan');
const limitIdx = args.indexOf('--limit');
const limitCount = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 0;

// ============================================================================
// BẢNG PHÁT ÂM CHUẨN ĐỔI MỚI (BỘ GD&ĐT - CÔNG NGHỆ GIÁO DỤC - VTV7)
// ============================================================================
const PHONETIC_MAP = {
  // 29 chữ cái tiếng Việt
  'alpha_vi_a.mp3': { text: 'a', speed: 0.9, desc: 'Chữ a' },
  'alpha_vi_aw.mp3': { text: 'á', speed: 0.9, desc: 'Chữ ă (phát âm á ngắn)' },
  'alpha_vi_aa.mp3': { text: 'ớ', speed: 0.9, desc: 'Chữ â (phát âm ớ ngắn)' },
  'alpha_vi_b.mp3': { text: 'bờ', speed: 0.9, desc: 'Chữ b (âm bờ)' },
  'alpha_vi_c.mp3': { text: 'cờ', speed: 0.9, desc: 'Chữ c (âm cờ)' },
  'alpha_vi_d.mp3': { text: 'dờ', speed: 0.9, desc: 'Chữ d (âm dờ)' },
  'alpha_vi_dd.mp3': { text: 'đờ', speed: 0.9, desc: 'Chữ đ (âm đờ)' },
  'alpha_vi_e.mp3': { text: 'e', speed: 0.9, desc: 'Chữ e' },
  'alpha_vi_ee.mp3': { text: 'ê', speed: 0.9, desc: 'Chữ ê' },
  'alpha_vi_g.mp3': { text: 'gờ', speed: 0.9, desc: 'Chữ g (âm gờ)' },
  'alpha_vi_h.mp3': { text: 'hờ', speed: 0.9, desc: 'Chữ h (âm hờ)' },
  'alpha_vi_i.mp3': { text: 'i', speed: 0.9, desc: 'Chữ i' },
  'alpha_vi_k.mp3': { text: 'cờ', speed: 0.9, desc: 'Chữ k (âm cờ)' },
  'alpha_vi_l.mp3': { text: 'lờ', speed: 0.9, desc: 'Chữ l (âm lờ)' },
  'alpha_vi_m.mp3': { text: 'mờ', speed: 0.9, desc: 'Chữ m (âm mờ)' },
  'alpha_vi_n.mp3': { text: 'nờ', speed: 0.9, desc: 'Chữ n (âm nờ)' },
  'alpha_vi_o.mp3': { text: 'o', speed: 0.9, desc: 'Chữ o' },
  'alpha_vi_oo.mp3': { text: 'ô', speed: 0.9, desc: 'Chữ ô' },
  'alpha_vi_ow.mp3': { text: 'ơ', speed: 0.9, desc: 'Chữ ơ' },
  'alpha_vi_p.mp3': { text: 'pờ', speed: 0.9, desc: 'Chữ p (âm pờ)' },
  'alpha_vi_q.mp3': { text: 'cu', speed: 0.9, desc: 'Chữ q (phát âm cu theo chuẩn đổi mới)' },
  'alpha_vi_r.mp3': { text: 'rờ', speed: 0.9, desc: 'Chữ r (âm rờ)' },
  'alpha_vi_s.mp3': { text: 'sờ', speed: 0.9, desc: 'Chữ s (âm sờ)' },
  'alpha_vi_t.mp3': { text: 'tờ', speed: 0.9, desc: 'Chữ t (âm tờ)' },
  'alpha_vi_u.mp3': { text: 'u', speed: 0.9, desc: 'Chữ u' },
  'alpha_vi_uw.mp3': { text: 'ư', speed: 0.9, desc: 'Chữ ư' },
  'alpha_vi_v.mp3': { text: 'vờ', speed: 0.9, desc: 'Chữ v (âm vờ)' },
  'alpha_vi_x.mp3': { text: 'xờ', speed: 0.9, desc: 'Chữ x (âm xờ)' },
  'alpha_vi_y.mp3': { text: 'i', speed: 0.9, desc: 'Chữ y (âm i)' },

  // 11 Phụ âm ghép
  'alpha_vi_ch.mp3': { text: 'chờ', speed: 0.9, desc: 'Phụ âm ghép ch' },
  'alpha_vi_gh.mp3': { text: 'gờ', speed: 0.9, desc: 'Phụ âm ghép gh' },
  'alpha_vi_gi.mp3': { text: 'dờ', speed: 0.9, desc: 'Phụ âm ghép gi' },
  'alpha_vi_kh.mp3': { text: 'khờ', speed: 0.9, desc: 'Phụ âm ghép kh' },
  'alpha_vi_ng.mp3': { text: 'ngờ', speed: 0.9, desc: 'Phụ âm ghép ng' },
  'alpha_vi_ngh.mp3': { text: 'ngờ', speed: 0.9, desc: 'Phụ âm ghép ngh' },
  'alpha_vi_nh.mp3': { text: 'nhờ', speed: 0.9, desc: 'Phụ âm ghép nh' },
  'alpha_vi_ph.mp3': { text: 'phờ', speed: 0.9, desc: 'Phụ âm ghép ph' },
  'alpha_vi_qu.mp3': { text: 'quờ', speed: 0.9, desc: 'Phụ âm ghép qu' },
  'alpha_vi_th.mp3': { text: 'thờ', speed: 0.9, desc: 'Phụ âm ghép th' },
  'alpha_vi_tr.mp3': { text: 'trờ', speed: 0.9, desc: 'Phụ âm ghép tr' },

  // 6 Thanh điệu tiếng Việt
  'tone_khong_dau.mp3': { text: 'thanh ngang', speed: 0.9, desc: 'Thanh ngang' },
  'tone_huyen.mp3': { text: 'dấu huyền', speed: 0.9, desc: 'Dấu huyền' },
  'tone_sac.mp3': { text: 'dấu sắc', speed: 0.9, desc: 'Dấu sắc' },
  'tone_hoi.mp3': { text: 'dấu hỏi', speed: 0.9, desc: 'Dấu hỏi' },
  'tone_nga.mp3': { text: 'dấu ngã', speed: 0.9, desc: 'Dấu ngã' },
  'tone_nang.mp3': { text: 'dấu nặng', speed: 0.9, desc: 'Dấu nặng' }
};

async function checkServer() {
  try {
    const res = await fetch('http://127.0.0.1:8001/health', { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function generateAudio(text, outPath, speed = speedVal) {
  const payload = {
    text: text,
    voice_id: VOICE_ID,
    format: 'mp3',
    speed: speed,
    temperature: 0.65
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Error ${res.status}: ${errText}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const dir = path.dirname(outPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

function loadAudioMap() {
  const mapPath = path.join(__dirname, '..', 'audio-map.js');
  const code = fs.readFileSync(mapPath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.AUDIO_MAP || {};
}

function getPhonicsItems() {
  const items = [];
  for (const [fileName, conf] of Object.entries(PHONETIC_MAP)) {
    items.push({
      text: conf.text,
      file: path.join(AUDIO_DIR, fileName),
      speed: conf.speed,
      desc: conf.desc
    });
  }
  return items;
}

function getPlanItems() {
  const planPath = path.join(__dirname, '..', 'docs', 'vieneu-generation-plan.md');
  if (!fs.existsSync(planPath)) return [];
  const planContent = fs.readFileSync(planPath, 'utf8');
  const items = [];
  planContent.split('\n').forEach(line => {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
    if (m) {
      const text = m[2].trim();
      const fileName = m[4].trim().replace(/`/g, '');
      const phon = PHONETIC_MAP[fileName];
      items.push({
        text: phon ? phon.text : text,
        file: path.join(AUDIO_DIR, fileName),
        speed: phon ? phon.speed : speedVal,
        desc: phon ? phon.desc : text
      });
    }
  });
  return items;
}

function getCoreItems(map) {
  const items = [];
  const addedFiles = new Set();

  function addItem(text, targetFile, speed = speedVal, desc = text) {
    if (!targetFile) {
      const mapped = map['vi|' + text] || map[text];
      if (mapped) targetFile = path.join(__dirname, '..', mapped);
    }
    if (targetFile && !addedFiles.has(targetFile)) {
      const fileName = path.basename(targetFile);
      const phon = PHONETIC_MAP[fileName];
      const actualText = phon ? phon.text : text;
      const actualSpeed = phon ? phon.speed : speed;
      const actualDesc = phon ? phon.desc : desc;

      addedFiles.add(targetFile);
      items.push({
        text: actualText,
        file: targetFile,
        speed: actualSpeed,
        desc: actualDesc
      });
    }
  }

  // 1. GHÉP ÂM: Toàn bộ 29 chữ cái, 11 phụ âm ghép, 6 thanh điệu
  for (const [fileName, conf] of Object.entries(PHONETIC_MAP)) {
    addItem(conf.text, path.join(AUDIO_DIR, fileName), conf.speed, conf.desc);
  }

  // 2. SỐ ĐẾM: 0 - 20 (chữ, số và đường dẫn trực tiếp)
  const numbersVi = 'không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi'.split(',');
  const numberDirectFiles = {
    '0': 'vi_khong_1othrk.mp3', '1': 'vi_mot_7ht4.mp3', '2': 'vi_hai_27io.mp3', '3': 'syl_b_a_0.mp3',
    '4': 'vi_bon_79gf.mp3', '5': 'vi_nam_2fug.mp3', '6': 'vi_sau_2iqv.mp3', '7': 'vi_bay_78d4.mp3',
    '8': 'vi_tam_2jhc.mp3', '9': 'vi_chin_1tikm.mp3', '10': 'vi_muoi_2bqz3.mp3'
  };
  numbersVi.forEach((nText, i) => {
    const directFile = numberDirectFiles[String(i)];
    if (directFile) addItem(nText, path.join(AUDIO_DIR, directFile), speedVal, `Số ${i} (${nText})`);
    addItem(nText, null, speedVal, `Số ${nText}`);
    addItem(String(i), null, speedVal, `Số ${i}`);
  });

  // 3. MENU & ĐIỀU HƯỚNG & NÚT BẤM CHÍNH
  const menuItems = [
    { text: 'Hôm nay học gì', file: 'audio/ui_home_btn_today.mp3' },
    { text: 'Trò chơi luyện tập', file: 'audio/ui_home_btn_games.mp3' },
    { text: 'Tủ sticker của bé', file: 'audio/ui_home_btn_stickers.mp3' },
    { text: 'Trang chủ', file: 'audio/ui_nav_home.mp3' },
    { text: 'Chữ cái', file: 'audio/ui_nav_letters.mp3' },
    { text: 'Bé tập đếm số', file: 'audio/ui_nav_numbers.mp3' },
    { text: 'Kho truyện cổ tích', file: 'audio/ui_nav_stories.mp3' },
    { text: 'Góc phụ huynh', file: 'audio/ui_nav_parent.mp3' },
    { text: 'Học số và tập đếm nào!', file: null },
    { text: 'Cùng nghe đọc truyện cổ tích nào!', file: null },
    { text: 'Chào bé! Mình cùng học nhé', file: null },
    { text: 'Bé nghe xong truyện rồi!', file: null },
    { text: 'Giỏi quá!', file: null },
    { text: 'Hoan hô!', file: null },
    { text: 'Tuyệt vời!', file: null },
    { text: 'Bé giỏi lắm!', file: null },
    { text: 'Đúng rồi!', file: null },
    { text: 'Siêu quá!', file: null },
    { text: 'Bé thông minh quá!', file: null },
    { text: 'Hay quá!', file: null },
    { text: 'Mèo thích quá!', file: null },
    { text: 'Thử lại nhé', file: null },
    { text: 'Gần đúng rồi, bé thử lại nào', file: null },
    { text: 'Không sao, bé thử lại nhé', file: null }
  ];
  menuItems.forEach(m => addItem(m.text, m.file ? path.join(__dirname, '..', m.file) : null, speedVal, m.text));

  // 4. TOÀN BỘ CÁC TỪ VỰNG & VÍ DỤ MINH HỌA (VT 29 chữ cái + OBJ tiếng Việt)
  const vtList = 'Anh trai,Áo mưa,An toàn,Ăn cơm,Ăn bánh,Ấm áp,Âm thanh,Ba mẹ,Búp bê,Bánh mì,Con mèo,Cà rốt,Cái bát,Dưa hấu,Da dẻ,Dạy học,Đèn ngủ,Đôi giày,Đá bóng,Em bé,Én bạc,Êm ái,Ê ke,Gấu bông,Gà trống,Ghế ngồi,Hoa hồng,Hạt gạo,Học bài,Im lặng,Ít nhiều,Kẹo ngọt,Khăn mặt,Kính mắt,Lợn con,Lá cây,Ly nước,Mẹ hiền,Mây trắng,Mũi tên,Nhà cửa,Nón lá,Nước uống,Ong mật,Oa oa,Ô tô,Ổ bánh,Ôn bài,Ơn trời,Ới gọi,Phở bò,Phim hoạt hình,Phong bì,Quả táo,Quà tặng,Quạt nan,Rổ rá,Rùa chậm,Rung chuông,Sữa tươi,Sách truyện,Sâu bướm,Trái cây,Tivi,Tóc tai,Uống sữa,Ủ ấm,Ướt áo,Ươm mầm,Voi to,Vẽ tranh,Vàng bạc,Xe đạp,Xanh lá,Xúc xích,Yêu quý,Y tá,Yến mạch'.split(',');
  vtList.forEach(v => addItem(v, null, speedVal, `Từ vựng: ${v}`));

  // Từ vựng đồ vật / con vật chuẩn từ alphabet.js OBJ
  const objViList = 'kiến,quả táo,quả bóng,con gấu,xe hơi,con mèo,con chó,bánh donut,quả trứng,con voi,bông hoa,con ếch,hộp quà,chùm nho,cái mũ,ngôi nhà,cây kem,nhà băng,thạch,nước ép,chìa khóa,con diều,chiếc lá,sư tử,quả xoài,mặt trăng,tổ chim,quyển vở,bạch tuộc,quả cam,gấu trúc,bút chì,nữ hoàng,bút lông,cầu vồng,tên lửa,ngôi sao,mặt trời,tàu hỏa,cái cây,cái ô,kỳ lân,bình hoa,núi lửa,dưa hấu,cá voi,ảnh X-quang,đàn xylophone,du thuyền,yo-yo,ngựa vằn,khóa kéo'.split(',');
  objViList.forEach(o => addItem(o, null, speedVal, `Đồ vật: ${o}`));

  // 5. Thêm các mục từ kế hoạch 157 chuỗi
  getPlanItems().forEach(it => {
    if (!addedFiles.has(it.file)) {
      addedFiles.add(it.file);
      items.push(it);
    }
  });

  return items;
}

function getAllViItems(map) {
  const items = [];
  const addedFiles = new Set();
  for (const [k, file] of Object.entries(map)) {
    if (k.startsWith('vi|')) {
      const rawText = k.slice(3).trim();
      const targetPath = path.join(__dirname, '..', file);
      if (!addedFiles.has(targetPath)) {
        const fileName = path.basename(targetPath);
        const phon = PHONETIC_MAP[fileName];
        addedFiles.add(targetPath);
        items.push({
          text: phon ? phon.text : rawText,
          file: targetPath,
          speed: phon ? phon.speed : speedVal,
          desc: phon ? phon.desc : rawText
        });
      }
    }
  }
  return items;
}

async function main() {
  console.log('================================================================');
  console.log(`  BẮT ĐẦU TIẾN TRÌNH SINH ÂM THANH GIỌNG "${VOICE_ID}" (Tốc độ: ${speedVal})`);
  console.log('================================================================');

  const isUp = await checkServer();
  if (!isUp) {
    console.error('[LỖI] Không thể kết nối tới CIT Voice Studio API tại http://127.0.0.1:8001');
    console.error('Vui lòng đảm bảo ứng dụng CIT Voice Studio đang mở trên màn hình!');
    process.exit(1);
  }
  console.log('✔ CIT Voice Studio API đang hoạt động (127.0.0.1:8001)');

  const map = loadAudioMap();
  let items = [];

  if (isPhonics) {
    console.log('Chế độ: --phonics (46 âm đánh vần: 29 chữ cái, 11 phụ âm ghép, 6 thanh điệu)');
    items = getPhonicsItems();
  } else if (isPlan) {
    console.log('Chế độ: --plan (157 chuỗi theo kế hoạch)');
    items = getPlanItems();
  } else if (isAll) {
    console.log('Chế độ: --all (Toàn bộ danh mục tiếng Việt trong game)');
    items = getAllViItems(map);
  } else {
    console.log('Chế độ: Toàn bộ từ, ví dụ, số, ghép âm, menu');
    items = getCoreItems(map);
  }

  if (limitCount > 0) {
    items = items.slice(0, limitCount);
    console.log(`Áp dụng giới hạn: ${limitCount} file`);
  }

  console.log(`Tổng số lượng cần sinh: ${items.length} file MP3\n`);

  let successCount = 0;
  let failCount = 0;
  const t0 = Date.now();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const pct = Math.round(((i + 1) / items.length) * 100);
    const label = item.desc || item.text;
    process.stdout.write(`[${i + 1}/${items.length}] (${pct}%) "${label}" (Text: "${item.text}") ... `);

    try {
      const bytes = await generateAudio(item.text, item.file, item.speed || speedVal);
      successCount++;
      process.stdout.write(`OK (${(bytes / 1024).toFixed(1)} KB)\n`);
    } catch (err) {
      failCount++;
      process.stdout.write(`LỖI: ${err.message}\n`);
    }

    // Nghỉ nhẹ 70ms giữa các câu để server ổn định
    await new Promise(r => setTimeout(r, 70));
  }

  const durationSec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('\n================================================================');
  console.log(`  HOÀN TẤT TRONG ${durationSec} GIÂY`);
  console.log(`  ✔ Thành công: ${successCount} file`);
  if (failCount > 0) console.log(`  ⚠ Lỗi: ${failCount} file`);
  console.log('================================================================\n');
}

main().catch(console.error);
