/**
 * tools/batch-generate-trucly.js
 * Script tự động hóa sinh âm thanh giọng Trúc Ly 48kHz từ CIT Voice Studio local API (http://127.0.0.1:8001)
 *
 * Cách chạy:
 *   node tools/batch-generate-trucly.js --priority       (Sinh ~200 file cốt lõi: chữ cái, số đếm, lời khen, từ vựng)
 *   node tools/batch-generate-trucly.js --plan           (Sinh 157 file theo danh sách chốt docs/vieneu-generation-plan.md)
 *   node tools/batch-generate-trucly.js --all            (Sinh toàn bộ ~4.400 file tiếng Việt)
 *   node tools/batch-generate-trucly.js --limit 10       (Chỉ thử nghiệm 10 file đầu tiên)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const API_URL = 'http://127.0.0.1:8001/api/tts/generate';
const VOICE_ID = 'Trúc Ly';
const AUDIO_DIR = path.join(__dirname, '..', 'audio');

// Đọc tham số dòng lệnh
const args = process.argv.slice(2);
const isAll = args.includes('--all');
const isPlan = args.includes('--plan');
const isPriority = args.includes('--priority') || (!isAll && !isPlan);
const limitIdx = args.indexOf('--limit');
const limitCount = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 0;
const speedIdx = args.indexOf('--speed');
const speedVal = speedIdx >= 0 ? parseFloat(args[speedIdx + 1]) : 0.95;

async function checkServer() {
  try {
    const res = await fetch('http://127.0.0.1:8001/health', { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function generateAudio(text, outPath, speed = 0.95) {
  const payload = {
    text: text,
    voice_id: VOICE_ID,
    format: 'mp3',
    speed: speed,
    temperature: 0.7
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
      items.push({ text, file: path.join(AUDIO_DIR, fileName) });
    }
  });
  return items;
}

function getCoreItems(map) {
  const items = [];
  const addedFiles = new Set();

  function addItem(text, targetFile) {
    if (!targetFile) {
      const mapped = map['vi|' + text] || map[text];
      if (mapped) targetFile = path.join(__dirname, '..', mapped);
    }
    if (targetFile && !addedFiles.has(targetFile)) {
      addedFiles.add(targetFile);
      items.push({ text, file: targetFile });
    }
  }

  // 1. 29 chữ cái tiếng Việt
  const letters = 'a,ă,â,b,c,d,đ,e,ê,g,h,i,k,l,m,n,o,ô,ơ,p,q,r,s,t,u,ư,v,x,y'.split(',');
  const letterMapFiles = {
    'a': 'alpha_vi_a.mp3', 'ă': 'alpha_vi_aw.mp3', 'â': 'alpha_vi_aa.mp3', 'b': 'alpha_vi_b.mp3',
    'c': 'alpha_vi_c.mp3', 'd': 'alpha_vi_d.mp3', 'đ': 'alpha_vi_dd.mp3', 'e': 'alpha_vi_e.mp3',
    'ê': 'alpha_vi_ee.mp3', 'g': 'alpha_vi_g.mp3', 'h': 'alpha_vi_h.mp3', 'i': 'alpha_vi_i.mp3',
    'k': 'alpha_vi_k.mp3', 'l': 'alpha_vi_l.mp3', 'm': 'alpha_vi_m.mp3', 'n': 'alpha_vi_n.mp3',
    'o': 'alpha_vi_o.mp3', 'ô': 'alpha_vi_oo.mp3', 'ơ': 'alpha_vi_ow.mp3', 'p': 'alpha_vi_p.mp3',
    'q': 'alpha_vi_q.mp3', 'r': 'alpha_vi_r.mp3', 's': 'alpha_vi_s.mp3', 't': 'alpha_vi_t.mp3',
    'u': 'alpha_vi_u.mp3', 'ư': 'alpha_vi_uw.mp3', 'v': 'alpha_vi_v.mp3', 'x': 'alpha_vi_x.mp3',
    'y': 'alpha_vi_y.mp3'
  };

  letters.forEach(l => {
    const f = letterMapFiles[l];
    if (f) addItem(l, path.join(AUDIO_DIR, f));
  });

  // 2. Số đếm 0 - 20
  const numbersVi = 'không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi'.split(',');
  numbersVi.forEach((nText, i) => {
    addItem(nText);
    addItem(String(i));
  });

  // 3. Lời khen thưởng & nhắc nhở
  const praises = [
    'Giỏi quá!', 'Hoan hô!', 'Tuyệt vời!', 'Bé giỏi lắm!', 'Đúng rồi!', 'Siêu quá!',
    'Bé thông minh quá!', 'Hay quá!', 'Mèo thích quá!',
    'Thử lại nhé', 'Gần đúng rồi, bé thử lại nào', 'Không sao, bé thử lại nhé',
    'Chào bé! Mình cùng học nhé', 'Bé nghe xong truyện rồi!'
  ];
  praises.forEach(p => addItem(p));

  // 4. Từ vựng minh họa 29 chữ cái (VT trong alphabet.js)
  const vtList = 'Anh trai,Áo mưa,An toàn,Ăn cơm,Ăn bánh,Ấm áp,Âm thanh,Ba mẹ,Búp bê,Bánh mì,Con mèo,Cà rốt,Cái bát,Dưa hấu,Da dẻ,Dạy học,Đèn ngủ,Đôi giày,Đá bóng,Em bé,Én bạc,Êm ái,Ê ke,Gấu bông,Gà trống,Ghế ngồi,Hoa hồng,Hạt gạo,Học bài,Im lặng,Ít nhiều,Kẹo ngọt,Khăn mặt,Kính mắt,Lợn con,Lá cây,Ly nước,Mẹ hiền,Mây trắng,Mũi tên,Nhà cửa,Nón lá,Nước uống,Ong mật,Oa oa,Ô tô,Ổ bánh,Ôn bài,Ơn trời,Ới gọi,Phở bò,Phim hoạt hình,Phong bì,Quả táo,Quà tặng,Quạt nan,Rổ rá,Rùa chậm,Rung chuông,Sữa tươi,Sách truyện,Sâu bướm,Trái cây,Tivi,Tóc tai,Uống sữa,Ủ ấm,Ướt áo,Ươm mầm,Voi to,Vẽ tranh,Vàng bạc,Xe đạp,Xanh lá,Xúc xích,Yêu quý,Y tá,Yến mạch'.split(',');
  vtList.forEach(v => addItem(v));

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
        addedFiles.add(targetPath);
        items.push({ text: rawText, file: targetPath });
      }
    }
  }
  return items;
}

async function main() {
  console.log('================================================================');
  console.log(`  BẮT ĐẦU TIẾN TRÌNH SINH ÂM THANH GIỌNG "${VOICE_ID}"`);
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

  if (isPlan) {
    console.log('Chế độ: --plan (157 chuỗi theo kế hoạch)');
    items = getPlanItems();
  } else if (isAll) {
    console.log('Chế độ: --all (Toàn bộ danh mục tiếng Việt trong game)');
    items = getAllViItems(map);
  } else {
    console.log('Chế độ: --priority (Chữ cái, Số đếm, Lời khen, Từ vựng cốt lõi)');
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
    process.stdout.write(`[${i + 1}/${items.length}] (${pct}%) Đang đọc: "${item.text}" ... `);

    try {
      const bytes = await generateAudio(item.text, item.file, speedVal);
      successCount++;
      process.stdout.write(`OK (${(bytes / 1024).toFixed(1)} KB)\n`);
    } catch (err) {
      failCount++;
      process.stdout.write(`LỖI: ${err.message}\n`);
    }

    // Nghỉ nhẹ 100ms giữa các câu để GPU/CPU ổn định
    await new Promise(r => setTimeout(r, 100));
  }

  const durationSec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('\n================================================================');
  console.log(`  HOÀN TẤT TRONG ${durationSec} GIÂY`);
  console.log(`  ✔ Thành công: ${successCount} file`);
  if (failCount > 0) console.log(`  ⚠ Lỗi: ${failCount} file`);
  console.log('================================================================\n');
}

main().catch(console.error);
