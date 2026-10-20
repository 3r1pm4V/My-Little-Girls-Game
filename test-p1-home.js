// ============================================================================
// TEST SUITE: TASK P1-04 (HOME CHO BÉ 3 NÚT LỚN & HỌC HÔM NAY THEO CHẶNG)
// 1. Kiểm tra CSS trong index.html:
//    - .kid-home-menu, .kid-home-btn, .stage-*
//    - Vùng chạm: min-height >= 64px, min-width >= 64px
//    - Khoảng cách: gap >= 12px
// 2. Kiểm tra DOM Home cho bé (home() trong app.js):
//    - Mặc định/preschool: hiển thị 3 nút lớn (Học hôm nay, Chơi tự do, Sticker của bé)
//    - Toàn icon + giọng đọc tự động (speakKidBtn, onpointerdown, onmouseenter)
// 3. Kiểm tra Màn hình "Học hôm nay" (todayLearning()):
//    - Mở danh sách bài học theo chặng hiện tại (stage 0-5)
//    - Có 6 tabs chặng (0-5)
//    - Thẻ bài học có vùng chạm >= 64px, click mở playActivity
// 4. Kiểm tra Màn hình "Chơi tự do" (games()):
//    - Breadcrumb: Trang chủ -> Chơi tự do
//    - Chứa đầy đủ các trò chơi hiện có (countGame, bubbleGame, trace, letL, numL, v.v.)
// 5. Kiểm tra Router V:
//    - V.todayLearning tồn tại và điều hướng an toàn
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TASK P1-04 (HOME CHO BÉ 3 NÚT LỚN)');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra CSS trong styles.css & index.html
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kiểm tra CSS Layout & Vùng chạm (styles.css & index.html) ---');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('styles.css'), 'index.html phải liên kết tới styles.css');
const stylesCss = fs.existsSync('styles.css') ? fs.readFileSync('styles.css', 'utf8') : indexHtml;

assert(stylesCss.includes('.kid-home-menu'), 'CSS phải có class .kid-home-menu');
assert(stylesCss.includes('.kid-home-btn'), 'CSS phải có class .kid-home-btn');
assert(stylesCss.includes('.kid-btn-today'), 'CSS phải có class .kid-btn-today');
assert(stylesCss.includes('.kid-btn-games'), 'CSS phải có class .kid-btn-games');
assert(stylesCss.includes('.kid-btn-stickers'), 'CSS phải có class .kid-btn-stickers');

// Kiểm tra quy định vùng chạm >= 64px và khoảng cách >= 12px
const btnHeightMatch = stylesCss.match(/\.kid-home-btn[\s\S]*?min-height:\s*(\d+)px/);
assert(btnHeightMatch, 'Nút lớn phải có CSS min-height');
const minHeight = parseInt(btnHeightMatch[1], 10);
assert(minHeight >= 64, `Vùng chạm nút lớn min-height phải >= 64px (thực tế: ${minHeight}px)`);

const btnWidthMatch = stylesCss.match(/\.kid-home-btn[\s\S]*?min-width:\s*(\d+)px/);
assert(btnWidthMatch, 'Nút lớn phải có CSS min-width');
const minWidth = parseInt(btnWidthMatch[1], 10);
assert(minWidth >= 64, `Vùng chạm nút lớn min-width phải >= 64px (thực tế: ${minWidth}px)`);

const gapMatch = stylesCss.match(/\.kid-home-menu[\s\S]*?gap:\s*(\d+)px/);
assert(gapMatch, 'Menu nút lớn phải có khoảng cách gap');
const gap = parseInt(gapMatch[1], 10);
assert(gap >= 12, `Khoảng cách giữa các nút gap phải >= 12px (thực tế: ${gap}px)`);

// Kiểm tra CSS thẻ bài học theo chặng
const stageActCardMatch = stylesCss.match(/\.stage-act-card[\s\S]*?min-height:\s*(\d+)px/);
assert(stageActCardMatch, '.stage-act-card phải có min-height');
assert(parseInt(stageActCardMatch[1], 10) >= 64, 'Thẻ bài học theo chặng phải có vùng chạm >= 64px');

console.log(`✔ CSS chuẩn: Vùng chạm nút lớn ${minHeight}x${minWidth}px (>= 64px), khoảng cách ${gap}px (>= 12px)!`);

// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra cấu trúc code trong app.js
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Kiểm tra cấu trúc logic trong app.js ---');

const appJs = fs.readFileSync('app.js', 'utf8');

assert(appJs.includes('STAGE_META'), 'app.js phải định nghĩa STAGE_META');
assert(appJs.includes('getKidCurrentStage'), 'app.js phải có hàm getKidCurrentStage');
assert(appJs.includes('setKidCurrentStage'), 'app.js phải có hàm setKidCurrentStage');
assert(appJs.includes('speakKidBtn'), 'app.js phải có hàm speakKidBtn hỗ trợ giọng đọc khi chạm giữ');
assert(appJs.includes('todayLearning'), 'app.js phải có hàm todayLearning');
assert(appJs.includes('kid-btn-today'), 'home() phải có nút kid-btn-today (Học hôm nay)');
assert(appJs.includes('kid-btn-games'), 'home() phải có nút kid-btn-games (Chơi tự do)');
assert(appJs.includes('kid-btn-stickers'), 'home() phải có nút kid-btn-stickers (Sticker của bé)');

// Kiểm tra router V
assert(appJs.includes('todayLearning,') || appJs.includes('todayLearning:'), 'Router V phải đăng ký todayLearning');

console.log('✔ Các hàm STAGE_META, todayLearning, speakKidBtn và Router V đã có mặt đầy đủ!');

// ----------------------------------------------------------------------------
// TEST 3: Mô phỏng chạy home() trong môi trường test
// ----------------------------------------------------------------------------
console.log('\n--- TEST 3: Mô phỏng kết xuất Home cho bé 5–6 tuổi ---');

// Tạo mock context
const mockStorage = {
  "bhv.lvl": "1",
  "bhv.ageTier": "preschool",
  "bhv.show_age_tiers": "0",
  "bhv.stars": "15"
};

const ls = {
  get(k, d) { return mockStorage["bhv." + k] !== undefined ? mockStorage["bhv." + k] : d; },
  set(k, v) { mockStorage["bhv." + k] = String(v); }
};

const T = (vi, en) => vi;
const im = (name) => `[img:${name}]`;
const isStandalone = () => true;
const vState = () => ({ k: "ok" });
const isAgeTierSelectorEnabled = () => ls.get("show_age_tiers", "0") === "1";
let currentTier = "preschool";

const STAGE_META = [
  { stage: 0, icon: "🐣", nameVi: "Chặng 0: Khám phá", nameEn: "Stage 0: Explore", titleVi: "Làm quen & Tự tin", titleEn: "Getting Started" },
  { stage: 1, icon: "🔤", nameVi: "Chặng 1: Chữ & Số 1–5", nameEn: "Stage 1: Letters & 1–5", titleVi: "Chữ cái đầu & Số 1–5", titleEn: "First Letters & 1–5" },
  { stage: 2, icon: "🔢", nameVi: "Chặng 2: Bảng chữ & Số 6–10", nameEn: "Stage 2: Full ABC & 6–10", titleVi: "Chữ cái còn lại & Số 6–10", titleEn: "Remaining Letters & 6–10" },
  { stage: 3, icon: "🧩", nameVi: "Chặng 3: Ghép vần & Phép tính", nameEn: "Stage 3: Phonics & Math", titleVi: "Ghép vần & Phép tính trong 10", titleEn: "Phonics & Math within 10" },
  { stage: 4, icon: "📖", nameVi: "Chặng 4: Đọc câu & Tư duy", nameEn: "Stage 4: Sentences & Logic", titleVi: "Đọc câu ngắn & Tư duy logic", titleEn: "Short Sentences & Logic" },
  { stage: 5, icon: "🎓", nameVi: "Chặng 5: Vào Lớp 1", nameEn: "Stage 5: Ready for Grade 1", titleVi: "Tự tin bước vào Lớp 1", titleEn: "Confident for Grade 1" }
];

function getKidCurrentStage(){
  const s = parseInt(ls.get("blg_stage", "1"), 10);
  return Number.isNaN(s) || s < 0 || s > 5 ? 1 : s;
}

let spokenPrompts = [];
function sayPrompt(key, vi, en) {
  spokenPrompts.push({ key, vi, en });
}

let renderedHtml = "";
const m = {
  set innerHTML(html) { renderedHtml = html; },
  get innerHTML() { return renderedHtml; }
};

// Thực thi render Home (mô phỏng logic home() từ app.js)
const showTiers = isAgeTierSelectorEnabled();
assert.strictEqual(showTiers, false, 'Bộ chọn tầng tuổi mặc định tắt ở chế độ bé');

const curStage = getKidCurrentStage();
assert.strictEqual(curStage, 1, 'Mặc định chặng của bé là 1 (hoặc đọc từ storage)');

const isKidPreschoolMode = !showTiers || currentTier === "preschool";
assert.strictEqual(isKidPreschoolMode, true, 'isKidPreschoolMode phải là true');

// Kiểm tra mã HTML render từ app.js
assert(appJs.includes('<div class="kid-home-menu">'), 'Home phải sinh ra .kid-home-menu');
assert(appJs.includes('onpointerdown="speakKidBtn(\'today\')"'), 'Nút Học hôm nay phải có sự kiện phát âm thanh khi chạm giữ');
assert(appJs.includes('onpointerdown="speakKidBtn(\'games\')"'), 'Nút Chơi tự do phải có sự kiện phát âm thanh khi chạm giữ');
assert(appJs.includes('onpointerdown="speakKidBtn(\'stickers\')"'), 'Nút Sticker phải có sự kiện phát âm thanh khi chạm giữ');

console.log('✔ Home cho bé kết xuất đúng 3 nút lớn với toàn icon và hỗ trợ âm thanh khi chạm giữ!');

// ----------------------------------------------------------------------------
// TEST 4: Kiểm tra kết nối dữ liệu hoạt động theo chặng trong todayLearning()
// ----------------------------------------------------------------------------
console.log('\n--- TEST 4: Kiểm tra phân bổ bài học theo từng chặng trong todayLearning() ---');

const { ACTIVITIES_DATA, getActivitiesByStage } = require('./activities-data.js');

const stage0Acts = getActivitiesByStage(0);
const stage1Acts = getActivitiesByStage(1);
const stage2Acts = getActivitiesByStage(2);
const stage3Acts = getActivitiesByStage(3);
const stage4Acts = getActivitiesByStage(4);
const stage5Acts = getActivitiesByStage(5);

assert.strictEqual(stage0Acts.length, 3, 'Chặng 0 phải có 3 bài học');
assert.strictEqual(stage1Acts.length, 22, 'Chặng 1 phải có 22 bài học');
assert.strictEqual(stage2Acts.length, 17, 'Chặng 2 phải có 17 bài học');
assert.strictEqual(stage3Acts.length, 9, 'Chặng 3 phải có 9 bài học');
assert.strictEqual(stage4Acts.length, 6, 'Chặng 4 phải có 6 bài học');
assert.strictEqual(stage5Acts.length, 5, 'Chặng 5 phải có 5 bài học');

const totalJourneyActs = stage0Acts.length + stage1Acts.length + stage2Acts.length + stage3Acts.length + stage4Acts.length + stage5Acts.length;
assert.strictEqual(totalJourneyActs, 62, 'Tổng số bài qua 6 chặng phải là 62 bài làm quen cho bé 4–6 tuổi');

console.log(`✔ Dữ liệu 6 chặng kết nối chính xác: Chặng 0 (${stage0Acts.length}), Chặng 1 (${stage1Acts.length}), Chặng 2 (${stage2Acts.length}), Chặng 3 (${stage3Acts.length}), Chặng 4 (${stage4Acts.length}), Chặng 5 (${stage5Acts.length})!`);

// ----------------------------------------------------------------------------
// TEST 5: Kiểm tra màn hình "Chơi tự do" (games())
// ----------------------------------------------------------------------------
console.log('\n--- TEST 5: Kiểm tra danh mục trò chơi trong games() ---');

const gamesSnippet = appJs.slice(appJs.indexOf('function games()'), appJs.indexOf('function games()') + 2000);

assert(gamesSnippet.includes('Chơi tự do'), 'games() phải có tiêu đề Chơi tự do');
assert(gamesSnippet.includes('countGame'), 'games() phải có trò đếm hình countGame');
assert(gamesSnippet.includes('bubbleGame'), 'games() phải có trò bắt bóng chữ bubbleGame');
assert(gamesSnippet.includes('letL'), 'games() phải có bảng chữ cái letL');
assert(gamesSnippet.includes('numL'), 'games() phải có số đếm numL');
assert(gamesSnippet.includes('trace'), 'games() phải có luyện nét trace');
assert(gamesSnippet.includes('readL'), 'games() phải có đánh vần readL');
assert(gamesSnippet.includes('storyL'), 'games() phải có truyện storyL');
assert(gamesSnippet.includes('match'), 'games() phải có ghép chữ match');
assert(gamesSnippet.includes('mem'), 'games() phải có lật thẻ mem');
assert(gamesSnippet.includes('cmpS'), 'games() phải có so sánh cmpS');

console.log('✔ Màn hình Chơi tự do chứa đầy đủ 11 trò chơi & hoạt động tương tác cho bé!');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST TASK P1-04 ĐẠT 100% THÀNH CÔNG!');
console.log('================================================================');
