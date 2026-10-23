/**
 * tools/generate-friendly-prompts-cit.js
 * Sinh toàn bộ âm thanh MP3 cho danh sách câu thoại hướng dẫn thân thiện mới ("Bé học vui")
 * bằng Local CIT Voice Studio API (http://127.0.0.1:8001/api/tts/generate, giọng Mai Anh, tốc độ 0.9)
 * và remap chính xác vào audio-map.js.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT_DIR, 'audio');
const MAP_PATH = path.join(ROOT_DIR, 'audio-map.js');

const API_URL = process.env.CIT_TTS_URL || 'http://127.0.0.1:8001/api/tts/generate';
const VOICE_ID = 'Mai Anh';
const SPEED = 0.9;

const NV = "không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi".split(",");
const LV = "a,ă,â,b,c,d,đ,e,ê,g,h,i,k,l,m,n,o,ô,ơ,p,q,r,s,t,u,ư,v,x,y".split(",");

const COUNT_ITEMS = [
  "quả táo", "chú mèo", "ô tô", "ngôi sao", "bóng bay", "gà con",
  "dâu tây", "chú thỏ", "cây kem", "miếng dưa", "chú gấu", "tên lửa"
];

const PUZZLE_ANIMALS_VI = [
  "Chim cánh cụt", "Chú vịt con", "Ốc sên", "Chú nhím nhỏ", "Gấu trúc",
  "Mèo con", "Bọ rùa", "Sư tử", "Voi con", "Rùa xanh", "Chim cú mèo", "Thỏ trắng"
];

const COMPARE_FRUITS_VI = [
  "chùm nho", "quả dâu", "quả táo", "quả cam", "gà con", "bóng bay"
];

const ODD_ITEMS_VI = [
  "Con cá vàng", "Chim vẹt mào sắc màu", "Quả cà chua", "Chú hổ con",
  "Xe taxi vàng", "Hoa cúc vàng", "Chú rùa"
];

const PATTERN_ANS_VI = [
  "Trái tim đỏ", "Hình tròn xanh lá", "Quả chuối", "Mặt trăng", "Chú mèo"
];

const SVG_PIC_TITLES = [
  "Ngôi nhà nhỏ", "Bươm bướm xinh", "Bông hoa mặt trời",
  "Chú cá vui vẻ", "Tên lửa vũ trụ", "Thuyền buồm ra khơi",
  "Mèo Kitty đọc sách", "Mèo Kitty múa ba lê", "Bông hoa cúc xinh",
  "Vườn hoa rực rỡ", "Mèo con đeo nơ", "Chú cún con vui vẻ",
  "Chim non hót trên cành", "Chú ong chăm chỉ", "Thỏ con tai dài",
  "Ốc sên nhỏ đáng yêu", "Cá ngựa đại dương", "Bò sữa đáng yêu",
  "Chiếc ô tô nhỏ", "Chiếc máy bay"
];

const COLOR_SWATCH_VI = [
  "Màu đỏ", "Màu cam", "Màu vàng", "Màu xanh lá", "Màu xanh dương",
  "Màu tím", "Màu hồng", "Màu ngọc bích", "Màu nâu", "Cục tẩy trắng"
];

const CONNECT_DOT_TITLES = [
  "Ngôi sao vàng", "Ngôi nhà ấm áp", "Chiếc thuyền buồm", "Vương miện công chúa"
];

const MEMORY_STEP_TITLES = [
  "Hình tròn", "Hình tam giác", "Hình vuông"
];

const PAIR_LINK_TITLES = [
  "Quả táo", "Ngôi sao", "Chú mèo", "Vịt con", "Số ba", "Chữ A"
];

const FRUIT_CUTOUT_BOARD_VI = [
  "Quả dưa hấu - Hình ngôi sao",
  "Quả chuông vàng - Hình lục giác",
  "Quả táo đỏ - Hình trái tim",
  "Quả cam vàng - Hình tròn",
  "Quả dâu tây - Hình tam giác",
  "Chùm nho tím - Hình thoi"
];

function buildPromptList() {
  const list = [];
  const add = (text, customFile) => {
    const t = String(text || "").trim();
    if (!t) return;
    if (!list.some(x => x.text === t)) {
      list.push({ text: t, customFile: customFile || null });
    }
  };

  // 1. TRANG CHỦ & ĐIỀU HƯỚNG CHUNG
  add("Xin chào bé yêu! Chúng mình cùng bắt đầu ngày học vui vẻ nhé!");
  add("Bài học mới đang chờ bé đấy! Cùng khám phá thôi nào!", "ui_home_btn_today.mp3");
  add("Giờ chơi tự do! Bé thích trò gì nhất nhỉ?", "ui_home_btn_games.mp3");
  add("Kho báu của bé đây rồi! Cùng xem mình đã sưu tập được những gì nhé!", "ui_home_btn_stickers.mp3");

  // Lời khen ngợi PR
  add("Wow, giỏi quá!");
  add("Hoan hô bé yêu!");
  add("Tuyệt vời ông mặt trời!");
  add("Bé thật xuất sắc!");
  add("Chuẩn luôn rồi!");
  add("Siêu phết!");
  add("Bé thông minh lắm nha!");
  add("Hay quá đi mất!");
  add("Mèo con cũng phải trầm trồ khen bé đấy!");

  // Lời động viên ER & gợi ý
  add("Không sao, thử lại lần nữa nhé!");
  add("Gần đúng rồi, cố lên tí nữa nào!");
  add("Bình tĩnh nhé, chúng mình thử lại xem sao.");
  add("Bé nhìn kỹ chỗ này xem nào...");

  // Hết giờ chơi
  add("Bé học chăm chỉ quá! Giờ đôi mắt cần được nghỉ ngơi một chút. Chúng mình hẹn gặp lại nhau vào ngày mai nhé, bé ngoan!");

  // 2. GÓC VUI CHƠI - CÁC TRÒ CHƠI CỐT LÕI
  add("Bé muốn chơi trò gì nào? Chọn một món quà vui nhộn nhé!");

  // Trò 1: Đếm hình chọn số
  COUNT_ITEMS.forEach(nameVi => {
    add(`Có bao nhiêu ${nameVi} xinh xinh ở đây? Bé hãy chạm vào từng bạn ấy để đếm cùng cô nhé!`);
  });
  for (let n = 1; n <= 12; n++) {
    add(`Chính xác! Có tất cả ${NV[n]}!`);
  }
  add("Ồ, chưa đúng rồi. Bé hãy chậm rãi chạm vào từng hình một để đếm lại nhé!");

  // Trò 2: Bắt bóng chữ
  add("Trò chơi Bắt bóng chữ bắt đầu! Bé hãy nhanh tay chạm vào những quả bóng có chữ cái đúng nhé!");
  add("Bóng bay chầm chậm cho bé dễ bắt nè.");
  add("Tăng tốc nào! Bóng bay nhanh hơn rồi đây!");

  // Trò 3: Nối chữ & Hình đối lập
  add("Trò chơi Nối dây thần kỳ! Bé hãy nối ô bên trái với người bạn tương ứng bên phải nhé!");
  add("Tìm bạn cùng nhà! Nối chữ In Hoa với chữ thường giống hệt nó nhé!");
  add("Ai đối lập với ai? Bé hãy tìm hai hình trái ngược nhau và nối chúng lại nào!");
  add("Bạn nhỏ nào thích món ăn nào? Bé hãy nối đúng sở thích của các bạn nhé!");
  add("Đúng rồi! Hai bạn kết đôi thật hoàn hảo!");
  add("Hai bạn này chưa phải là một đôi đâu, bé thử chọn lại xem nào.");
  add("Hoan hô! Bé đã ghép nối thành công tất cả các cặp rồi!");

  // Trò 4: Đoàn tàu sâu róm & Bóng bay số còn thiếu
  add("Ô số nào đang trốn mất nhỉ?");
  add("Đoàn tàu sâu róm thiếu một toa rồi! Bé tìm giúp số còn thiếu nhé!");
  add("Quả bóng bay nào đang vắng mặt? Bé đoán xem đó là số mấy?");
  for (let n = 1; n <= 20; n++) {
    add(`Giỏi lắm! Số ${NV[n]} đã xuất hiện rồi!`);
    add(`Giỏi lắm! Số ${n} đã xuất hiện rồi!`);
    add(`Số ${NV[n]} đã xuất hiện rồi!`);
    add(`Số ${n} đã xuất hiện rồi!`);
  }
  for (let s = 1; s <= 12; s++) {
    add(`Chưa đúng rồi, bé hãy đếm dãy số từ ${s} một lần nữa nhé!`);
  }

  // Trò 5: Lật thẻ ghi nhớ
  add("Trò chơi Thử thách trí nhớ! Hãy tìm hai tấm thẻ giống hệt nhau nhé!");
  add("Tìm thấy rồi! Hai hình giống nhau y đúc!");

  // Trò 6: Dấu so sánh & So sánh nhóm
  add("Bên nào nhiều hơn nhỉ?");
  add("Bên nào ít hơn ta?");
  add("Chọn chiếc cầu đúng nối hai bên nhé!");
  add("Hai bên cân bằng nhau thật đẹp!");
  for (let n = 1; n <= 10; n++) {
    add(`${NV[n]} bằng ${NV[n]}. Hai bên cân bằng nhau thật đẹp!`);
    add(`${NV[n]} bằng ${NV[n]}`);
    add(`${NV[n]} đông vui hơn!`);
    add(`${NV[n]} ít hơn một chút!`);
  }

  // Trò 7: Chém trái cây
  add("Trò chơi Chém trái cây! Bé hãy lướt ngón tay thật nhanh qua những quả trái cây ngon lành nhé!");
  add("Hoan hô bé yêu! Bé là cao thủ chém trái cây siêu đẳng! Tặng bé ba ngôi sao lấp lánh!");

  // 3. CÁC TRÒ CHƠI MẦM NON RV APPSTUDIOS
  // Trò 8: Giỏ màu & Hình dạng
  add("Bé hãy giúp các hình khối tìm về đúng ngôi nhà màu sắc của chúng nhé!");
  add("Cố lên bé ơi! Kéo hình bỏ vào chiếc giỏ cùng màu nào!");
  add("Ồ, nhầm màu rồi! Bé thử tìm chiếc giỏ khác xem nào!");
  add("Hình khối nào đi với khuôn nào? Bé hãy đặt chúng vào đúng vị trí nhé!");
  add("Hình này chưa vừa khít đâu, bé thử khuôn bên cạnh xem sao!");

  // Trò 9: Ghép tranh & Hình bóng
  add("Hoàn thành bức tranh nào! Bé hãy tìm đúng nửa còn thiếu để ghép vào bạn nhỏ nhé!");
  add("Chưa đúng rồi, bé nhìn kỹ đường viền xem nào!");
  add("Tìm mảnh ghép bí ẩn! Bé hãy tìm miếng vừa khít với chỗ trống trên quả nhé!");
  add("Miếng này hơi lệch rồi, bé thử quả bên cạnh xem!");
  add("Ai đang trốn trong bóng tối? Bé hãy đưa các bạn về đúng chiếc bóng của mình nhé!");
  add("Chiếc bóng của ai đây nhỉ?");
  add("Bóng này không khớp rồi, bé quan sát kỹ dáng hình nhé!");
  PUZZLE_ANIMALS_VI.forEach(an => {
    add(`Hoan hô! ${an}!`);
    add(an);
  });
  FRUIT_CUTOUT_BOARD_VI.forEach(fc => add(fc));

  // Trò 10: To nhỏ & Đếm so sánh
  PUZZLE_ANIMALS_VI.forEach(an => {
    add(`Tìm bạn ${an} TO NHẤT nào!`);
    add(`Tìm bạn ${an} NHỎ XÍU nào!`);
  });
  add("Chính xác! Đây chính là bạn to nhất rồi!");
  add("Chính xác! Đây chính là bạn nhỏ nhất rồi!");
  add("Bé nhìn kỹ xem, ai mới là người to nhất nhé!");
  add("Bé nhìn kỹ xem, ai mới là người bé nhất nhé!");

  COMPARE_FRUITS_VI.forEach(f => {
    add(`Bên nào có NHIỀU ${f} hơn?`);
    add(`Bên nào có ÍT ${f} hơn?`);
    add(`Giỏi quá! Bên này có nhiều ${f} hơn đấy!`);
    add(`Giỏi quá! Bên này có ít ${f} hơn đấy!`);
  });
  add("Bé hãy đếm thử cả hai bên xem bên nào nhiều hơn nhé!");
  add("Bé hãy đếm thử cả hai bên xem bên nào ít hơn nhé!");

  // Trò 11: Tinh mắt Tìm khác biệt, Quy luật & Thế giới loài vật
  add("Tìm điểm khác biệt! Bé hãy tìm ra hình duy nhất không giống các bạn còn lại nhé!");
  ODD_ITEMS_VI.forEach(oddVi => {
    add(`Tìm ra rồi! ${oddVi} này đặc biệt nhất!`);
  });
  add("Bạn này giống các bạn khác mà, bé hãy tìm hình 'độc nhất vô nhị' kia kìa!");

  add("Đoán hình tiếp theo! Bé xem quy luật và điền hình còn thiếu vào dấu chấm hỏi nhé!");
  PATTERN_ANS_VI.forEach(ansVi => {
    add(`Xuất sắc! Đó chính là ${ansVi}!`);
  });
  add("Chưa đúng quy luật rồi, bé nhìn dãy hình từ đầu đến cuối xem nào!");

  // Thế giới loài vật
  add("Bạn nào mê ăn tre trúc và đeo kính đen sành điệu?");
  add("Hoan hô! Là bạn Gấu trúc đáng yêu!");
  add("Bạn nào kêu 'Meo meo' và bắt chuột siêu giỏi?");
  add("Hoan hô! Là bạn Mèo con tinh nghịch!");
  add("Bạn nào có chiếc vòi dài ngoẵng và đôi tai to bự?");
  add("Hoan hô! Là bạn Voi con khỏe mạnh!");
  add("Bạn nào có cổ cao vút để với lá cây trên ngọn?");
  add("Hoan hô! Là bạn Hươu cao cổ duyên dáng!");
  add("Bạn nào là chúa sơn lâm với bờm tóc oai phong?");
  add("Hoan hô! Là bạn Sư tử dũng mãnh!");
  add("Bạn nào sống dưới biển sâu và phun nước tung tóe?");
  add("Hoan hô! Là bạn Cá voi khổng lồ!");
  add("Chưa phải bạn này rồi, bé nghe lại gợi ý và chọn nhé!");

  // 4. CÁC TRÒ CHƠI SÁNG TẠO, VẼ & MONTESSORI MỚI
  // Trò 12: Tô màu & Bút phát sáng
  COLOR_SWATCH_VI.forEach(cName => {
    add(cName);
  });
  SVG_PIC_TITLES.forEach(titleVi => {
    add(`Họa sĩ nhí tài ba! Bé hãy chọn màu yêu thích và tô vào bức tranh ${titleVi} nhé!`);
    add(`Bức tranh ${titleVi} của bé đẹp lung linh! Tặng bé một ngôi sao vàng rực rỡ!`);
  });
  add("Mừng bé quay lại với bức tranh dang dở nào!");
  add("Bút thần diệu kỳ! Bé hãy vẽ những nét sáng lấp lánh trên nền tối nhé!");
  add("Bảng đã sạch bong kin kít, mời bé vẽ tác phẩm mới!");
  add("Tác phẩm ánh sáng tuyệt đẹp! Tặng bé một ngôi sao lấp lánh!");

  // Trò 13: Nối chấm theo số & Tự vẽ
  add("Nối chấm kỳ diệu! Bé hãy bắt đầu từ chấm số 1 nhé!");
  for (let n = 1; n <= 10; n++) {
    add(`Bé ơi, tìm chấm số ${n} đang nhấp nháy kìa!`);
  }
  add("Ngồi yên nhé, bút thần sẽ tự động nối chấm và tô màu cho bé xem!");
  CONNECT_DOT_TITLES.forEach(nameVi => {
    add(`Wow! Hiện ra hình ${nameVi} xinh xắn quá!`);
  });

  // Trò 14: Vẽ theo trí nhớ & Học vẽ từng bước
  MEMORY_STEP_TITLES.forEach(nameVi => {
    add(`Thử thách trí nhớ! Bé hãy nhìn kỹ ${nameVi} trong 2 giây, sau đó vẽ lại thật giống nhé!`);
    add(`Tập vẽ từng nét! Bé hãy tô theo các nét chấm mờ để tạo thành ${nameVi} nhé!`);
    add(`Đây là bí quyết vẽ ${nameVi} nè, bé tham khảo nhé!`);
    add(`Tuyệt cú mèo! Bé vẽ ${nameVi} khéo léo quá!`);
  });

  // Trò 15: Khung Mười Ô
  for (let b = 2; b <= 10; b++) {
    add(`Bé hãy thêm vào cho đủ ${b} quả táo nhé!`);
    add(`Giỏi quá! Đã đủ ${b} quả táo rồi!`);
  }

  // Trò 16: Nối cặp giống nhau lưới
  add("Tìm đôi bạn thân! Bé hãy nối hai ô có hình giống hệt nhau nhé!");
  add("Hai bạn này chưa giống nhau đâu, bé thử cặp khác xem!");
  add("Đã hủy nối, bé chọn lại nhé!");
  PAIR_LINK_TITLES.forEach(vi => {
    add(`Bé nhìn xem, hai ô ${vi} đang mách nước kìa!`);
  });
  add("Hoan hô! Bé đã tìm ra tất cả các cặp đôi giống nhau!");

  // 5. HỌC CHỮ CÁI, ĐÁNH VẦN, TẬP VIẾT & KỂ CHUYỆN
  add("Bé muốn học chữ cái, tập viết nét hay đánh vần nào? Chọn một mục nhé!", "ui_home_btn_letters.mp3");
  add("Bé hãy chạm vào các chữ cái xinh xinh nhé!");
  add("Chữ cái đầu tiên của bảng chữ cái là chữ gì nhỉ?");
  LV.forEach(lv => {
    add(`Hình nào bắt đầu bằng chữ ${lv} đáng yêu?`);
  });
  add("Câu chuyện kết thúc rồi. Chúc bé ngủ ngon và mơ những giấc mơ đẹp nhé!");

  return list;
}

function toFileName(text, customFile) {
  if (customFile) return customFile;
  const slug = text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 34);
  const hash = crypto.createHash('md5').update(text, 'utf8').digest('hex').slice(0, 6);
  return `vp_${slug}_${hash}.mp3`;
}

async function generateOneCit(text, outPath) {
  const payload = {
    text: text,
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
    const errText = await res.text().catch(() => '');
    throw new Error(`CIT HTTP ${res.status}: ${errText}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

function updateAudioMapFile(mappedEntries) {
  let mapText = fs.readFileSync(MAP_PATH, 'utf8');
  const isCRLF = mapText.includes('\r\n');
  mapText = mapText.replace(/\r\n/g, '\n');

  const startMarker = '  // === DANH SÁCH GIỌNG ĐỌC HƯỚNG DẪN THÂN THIỆN (CIT MAI ANH 0.9) ===';
  const endMarker = '  // === KẾT THÚC DANH SÁCH GIỌNG ĐỌC HƯỚNG DẪN THÂN THIỆN ===';
  const sIdx = mapText.indexOf(startMarker);
  const eIdx = mapText.indexOf(endMarker);
  if (sIdx !== -1 && eIdx !== -1 && eIdx > sIdx) {
    mapText = mapText.slice(0, sIdx) + mapText.slice(eIdx + endMarker.length + 1);
  }

  let block = `${startMarker}\n`;
  const addedKeys = new Set();
  const addKey = (k, rel) => {
    if (!k || addedKeys.has(k)) return;
    addedKeys.add(k);
    block += `  ${JSON.stringify(k)}: ${JSON.stringify(rel)},\n`;
  };

  for (const { text, relPath } of mappedEntries) {
    addKey(text, relPath);
    addKey("vi|" + text, relPath);
    const norm = text
      .trim()
      .toLowerCase()
      .normalize("NFC")
      .replace(/[.,!?:;'"“”„…\-–—()\[\]{}]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (norm) {
      addKey(norm, relPath);
      addKey("vi|" + norm, relPath);
    }
  }
  block += `${endMarker}\n`;

  const pos = mapText.lastIndexOf('};');
  if (pos !== -1) {
    mapText = mapText.slice(0, pos) + block + mapText.slice(pos);
    if (isCRLF) mapText = mapText.replace(/\n/g, '\r\n');
    fs.writeFileSync(MAP_PATH, mapText, 'utf8');
    console.log(`Đã cập nhật ${mappedEntries.length} câu thoại (${addedKeys.size} khóa tra cứu) vào audio-map.js!`);
  }
}

async function run() {
  const promptList = buildPromptList();
  console.log(`Tổng số câu thoại thân thiện cần sinh / kiểm tra (CIT Mai Anh 0.9x): ${promptList.length}`);

  let generatedCount = 0;
  let reusedCount = 0;
  const mappedEntries = [];

  for (let i = 0; i < promptList.length; i++) {
    const item = promptList[i];
    const fileName = toFileName(item.text, item.customFile);
    const filePath = path.join(AUDIO_DIR, fileName);
    const relPath = `audio/${fileName}`;

    // Nếu là customFile (ui_home_btn_*) thì kiểm tra marker để ghi đè câu mới 1 lần
    const markerFile = filePath + '.cit_v2';
    const needCustomOverwrite = !!item.customFile && !fs.existsSync(markerFile);

    if (!needCustomOverwrite && fs.existsSync(filePath) && fs.statSync(filePath).size > 800) {
      reusedCount++;
      mappedEntries.push({ text: item.text, relPath });
      continue;
    }

    try {
      const bytes = await generateOneCit(item.text, filePath);
      if (item.customFile) {
        fs.writeFileSync(markerFile, 'ok');
      }
      mappedEntries.push({ text: item.text, relPath });
      generatedCount++;
      if (generatedCount % 10 === 0 || i === promptList.length - 1) {
        console.log(`[${i + 1}/${promptList.length}] Đã sinh ${generatedCount} file mới (vừa xong: ${fileName} - ${(bytes / 1024).toFixed(1)} KB)`);
      }
    } catch (e) {
      console.error(`[LỖI tại câu ${i + 1}] "${item.text}": ${e.message}`);
      break;
    }
  }

  updateAudioMapFile(mappedEntries);

  // Dọn marker tạm
  fs.readdirSync(AUDIO_DIR).forEach(f => {
    if (f.endsWith('.cit_v2')) {
      try { fs.unlinkSync(path.join(AUDIO_DIR, f)); } catch (e) {}
    }
  });

  console.log(`Hoàn tất! Đã sinh mới: ${generatedCount} file MP3 (Giọng Mai Anh 0.9x), tái sử dụng: ${reusedCount} file.`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
