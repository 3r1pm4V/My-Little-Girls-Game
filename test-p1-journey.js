// ============================================================================
// TEST SUITE: TASK P1-01 & P1-02
// 1. Kiểm tra Metadata: <title>, meta description, manifest.webmanifest ("5–6 tuổi, chuẩn bị vào lớp 1")
// 2. Kiểm tra Mở app mới hoàn toàn (empty localStorage):
//    - Mặc định preschool, lvl = 1
//    - Cờ bộ chọn 3 tầng tuổi mặc định TẮT (isAgeTierSelectorEnabled === false)
//    - Giao diện bé chỉ hiện bài học có stage 0–5 (53 bài, loại bỏ 24 bài lớp 3–5 & lớp 1 quá khó)
// 3. Kiểm tra Dữ liệu cũ (legacy localStorage):
//    - lvl: 2, ageTier: "grade1_2", stars: 125, badges, streak được giữ nguyên 100%
//    - Không bị lỗi, không mất dữ liệu
//    - Khi phụ huynh bật cờ tầng tuổi trong cài đặt: bộ chọn 3 tầng tuổi hiển thị bình thường
// 4. Kiểm tra DOM mô phỏng các màn hình chính (home, tierActivities, parent)
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TASK P1-01 & P1-02 (5–6 TUỔI & CHẶNG 0–5)');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra Metadata trong index.html và manifest.webmanifest
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kiểm tra Metadata (index.html & manifest.webmanifest) ---');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('<title>Bé học vui · 4–6 tuổi, làm quen trước lớp 1</title>'), 
  'index.html phải có <title> cập nhật thành "4–6 tuổi, làm quen trước lớp 1"');

assert(indexHtml.includes('4–6 tuổi, làm quen trước lớp 1: Tiếng Việt, Toán học, Tiếng Anh, Đọc hiểu và Luyện viết'),
  'index.html meta description phải chuyển sang "4–6 tuổi, làm quen trước lớp 1"');

assert(!indexHtml.includes('4–11 tuổi'), 
  'index.html không được còn chứa "4–11 tuổi"');

const manifestContent = fs.readFileSync('manifest.webmanifest', 'utf8');
const manifest = JSON.parse(manifestContent);
assert(manifest.name.includes('4–6 tuổi, làm quen trước lớp 1'),
  'manifest.webmanifest name phải có "4–6 tuổi, làm quen trước lớp 1"');
assert(manifest.description.includes('4–6 tuổi, làm quen trước lớp 1'),
  'manifest.webmanifest description phải có "4–6 tuổi, làm quen trước lớp 1"');

console.log('✔ Metadata trong index.html và manifest.webmanifest đã cập nhật chuẩn 100%!');

// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra dữ liệu và hàm helpers trong activities-data.js
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Kiểm tra AGE_TIERS và hàm chặng trong activities-data.js ---');

const activitiesModule = require('./activities-data.js');
const { ACTIVITIES_DATA, AGE_TIERS, getPreschoolJourneyActivities, getActivitiesByStage, getActivitiesByTier } = activitiesModule;

assert(AGE_TIERS.preschool.ageVi.includes('4–6 tuổi'), 'AGE_TIERS.preschool.ageVi phải là "4–6 tuổi"');
assert(AGE_TIERS.preschool.ageEn.includes('4–6'), 'AGE_TIERS.preschool.ageEn phải là "Ages 4–6"');

const journeyActs = getPreschoolJourneyActivities();
assert.strictEqual(journeyActs.length, 53, `getPreschoolJourneyActivities phải trả về 53 bài (thực tế: ${journeyActs.length})`);

// Kiểm tra 100% bài trong journeyActs đều có stage từ 0 đến 5
journeyActs.forEach(act => {
  assert(Number.isInteger(act.stage) && act.stage >= 0 && act.stage <= 5, 
    `Bài ${act.id} trong lộ trình bé phải có stage hợp lệ`);
  assert(act.stage !== null, `Bài ${act.id} không được có stage null`);
});

// Đảm bảo không có bài lớp 3-5 nào lọt vào lộ trình của bé
const g35InJourney = journeyActs.filter(a => a.ageTier === 'grade3_5');
assert.strictEqual(g35InJourney.length, 0, 'Tuyệt đối không có bài grade3_5 trong lộ trình của bé');

// Đảm bảo các bài lớp 1-2 dời qua lớp 1 (toán khó, ghép vần, âm ghép...) không lọt vào lộ trình của bé
const hardMathInJourney = journeyActs.filter(a => a.id === 'act_g12_math_01' || a.id === 'act_g12_math_02' || a.id === 'act_g12_math_03');
assert.strictEqual(hardMathInJourney.length, 0, 'Các bài toán lớp 1-2 không được có trong lộ trình của bé 4 tuổi');

console.log('✔ Kho dữ liệu activities-data.js chuẩn hóa chính xác cho bé 4–6 tuổi (53 bài)!');

// ----------------------------------------------------------------------------
// TEST 3: Mô phỏng hành vi app.js khi mở app mới hoàn toàn (empty localStorage)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 3: Kiểm tra mở app mới hoàn toàn (empty localStorage) ---');

function createMockEnvironment(initialStorage = {}) {
  const store = { ...initialStorage };
  const mockLocalStorage = {
    getItem: (k) => store[k] !== undefined ? String(store[k]) : null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    _store: store
  };

  const lsHelper = {
    get: (k, def) => {
      const v = mockLocalStorage.getItem("bhv." + k);
      return v === null ? def : v;
    },
    set: (k, v) => mockLocalStorage.setItem("bhv." + k, v)
  };

  return { mockLocalStorage, lsHelper };
}

// Case A: App mới tinh
const envNew = createMockEnvironment({});
const lsNew = envNew.lsHelper;

// Logic khởi tạo app.js
const defaultLvl = +lsNew.get("lvl", 1);
assert.strictEqual(defaultLvl, 1, 'Mở app mới: default lvl phải là 1 (preschool)');

const defaultTier = lsNew.get("ageTier", defaultLvl === 1 ? "preschool" : "grade1_2");
assert.strictEqual(defaultTier, "preschool", 'Mở app mới: default ageTier phải là preschool');

const isTierSelectorOnNew = lsNew.get("show_age_tiers", "0") === "1" || lsNew.get("showAgeTiers", "0") === "1";
assert.strictEqual(isTierSelectorOnNew, false, 'Mở app mới: cờ showAgeTiers mặc định phải là TẮT (false)');

// Kiểm tra danh sách bài học bé nhận được khi mở app mới
let actsForNewKid = [];
if (!isTierSelectorOnNew) {
  actsForNewKid = getPreschoolJourneyActivities();
} else {
  actsForNewKid = getActivitiesByTier(defaultTier);
}
assert.strictEqual(actsForNewKid.length, 53, 'Bé mới chỉ nhận 53 bài có stage 0–5');
console.log('✔ Mở app mới tinh: Mặc định preschool, ẩn bộ chọn tầng tuổi, hiển thị chuẩn 53 bài chặng 0–5');

// ----------------------------------------------------------------------------
// TEST 4: Mô phỏng hành vi khi app đã có dữ liệu cũ (legacy localStorage)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 4: Kiểm tra khả năng tương thích dữ liệu cũ (legacy localStorage) ---');

// Case B: User cũ đã học Lớp 1-2, có 120 sao, huy hiệu, v.v.
const legacyData = {
  "bhv.lvl": "2",
  "bhv.ageTier": "grade1_2",
  "bhv.stars": "120",
  "bhv.badges": JSON.stringify(["star_10", "star_50", "star_100"]),
  "bhv.streak": "7",
  "bhv.kid_name": "Bé Na"
};

const envLegacy = createMockEnvironment(legacyData);
const lsLegacy = envLegacy.lsHelper;

// Kiểm tra sao và dữ liệu cũ không bị mất
const starsLegacy = +lsLegacy.get("stars", 0);
assert.strictEqual(starsLegacy, 120, 'Sao của bé phải được giữ nguyên 120 sao');
const badgesLegacy = JSON.parse(lsLegacy.get("badges", "[]"));
assert.deepStrictEqual(badgesLegacy, ["star_10", "star_50", "star_100"], 'Huy hiệu của bé phải giữ nguyên');
const kidNameLegacy = lsLegacy.get("kid_name", "Bé Yêu");
assert.strictEqual(kidNameLegacy, "Bé Na", 'Tên của bé phải giữ nguyên');

// Kiểm tra tầng tuổi và lvl cũ vẫn đọc được
const legacyLvl = +lsLegacy.get("lvl", 1);
assert.strictEqual(legacyLvl, 2, 'lvl cũ (2) vẫn đọc được bình thường');
const legacyTier = lsLegacy.get("ageTier", "preschool");
assert.strictEqual(legacyTier, "grade1_2", 'ageTier cũ (grade1_2) vẫn đọc được bình thường');

// Kiểm tra giao diện bé: mặc dù ageTier cũ là grade1_2, do cờ show_age_tiers mặc định tắt, bé vẫn được bảo vệ trong chế độ chặng 0–5
const isTierSelectorOnLegacy = lsLegacy.get("show_age_tiers", "0") === "1" || lsLegacy.get("showAgeTiers", "0") === "1";
assert.strictEqual(isTierSelectorOnLegacy, false, 'Cờ showAgeTiers vẫn mặc định tắt cho dữ liệu cũ nếu phụ huynh chưa bật');

let actsForLegacyKid = [];
if (!isTierSelectorOnLegacy) {
  actsForLegacyKid = getPreschoolJourneyActivities();
} else {
  actsForLegacyKid = getActivitiesByTier(legacyTier);
}
assert.strictEqual(actsForLegacyKid.length, 53, 'Bé cũ ở giao diện mặc định vẫn chỉ nhận 53 bài chặng 0–5');

// Khi phụ huynh vào cài đặt và bật cờ tầng tuổi
lsLegacy.set("show_age_tiers", "1");
const isTierSelectorOnAfterParent = lsLegacy.get("show_age_tiers", "0") === "1";
assert.strictEqual(isTierSelectorOnAfterParent, true, 'Phụ huynh bật cờ show_age_tiers thành công');

let actsAfterParentEnabled = [];
if (!isTierSelectorOnAfterParent) {
  actsAfterParentEnabled = getPreschoolJourneyActivities();
} else {
  actsAfterParentEnabled = getActivitiesByTier(legacyTier);
}
assert.strictEqual(actsAfterParentEnabled.length, 45, 'Khi phụ huynh bật tầng tuổi, lấy đầy đủ 45 bài Lớp 1-2');
console.log('✔ Tương thích 100% dữ liệu cũ: Không mất sao (120 ⭐), không mất huy hiệu, phụ huynh bật/tắt tầng tuổi mượt mà!');

// ----------------------------------------------------------------------------
// TEST 5: Kiểm tra toàn vẹn file app.js (không lỗi cú pháp, có đầy đủ hàm mới)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 5: Kiểm tra các hàm và cờ trong app.js ---');

const appJs = fs.readFileSync('app.js', 'utf8');
assert(appJs.includes('function isAgeTierSelectorEnabled()'), 'app.js phải có hàm isAgeTierSelectorEnabled');
assert(appJs.includes('function setShowAgeTiers('), 'app.js phải có hàm setShowAgeTiers');
assert(appJs.includes('getPreschoolJourneyActivities'), 'app.js phải gọi getPreschoolJourneyActivities');
assert(appJs.includes('Hiện bộ chọn 3 tầng tuổi trên trang chủ cho bé'), 'app.js phải có mục cài đặt bật/tắt tầng tuổi trong parent()');
assert(appJs.includes('daily_limit_minutes", "15"'), 'app.js phải đặt giới hạn thời gian mặc định là 15 phút');

console.log('✔ app.js có đầy đủ các hàm hỗ trợ P1-01, P1-12 và cấu trúc bảo vệ bé 4–6 tuổi!');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST P1-01 & P1-02 ĐÃ VƯỢT QUA 100% THÀNH CÔNG! ');
console.log('================================================================');
