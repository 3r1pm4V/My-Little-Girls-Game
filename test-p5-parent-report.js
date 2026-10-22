// test-p5-parent-report.js
// Automated tests for Task P5-03 (Weekly Learning Report) and P5-07 (Off-screen Parent-Child Activities)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log("=== BẮT ĐẦU KIỂM THỬ P5-03 & P5-07 (Weekly Report & Offscreen Activities) ===");

// 1. Code-level audit
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const swCode = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');

// Audit 1: Cache bumped to bhv-v41 or higher
assert.ok(/bhv-v(?:4[1-9]|[5-9]\d|\d{3,})/.test(swCode), "sw.js cache version phải là bhv-v41 trở lên");
console.log("✓ Audit sw.js: Cache version xác nhận");

// Audit 2: Function presence in app.js
assert.ok(appCode.includes('function getWeeklyStudyStats()'), "app.js phải có getWeeklyStudyStats()");
assert.ok(appCode.includes('function getSkillsMasteryBreakdown()'), "app.js phải có getSkillsMasteryBreakdown()");
assert.ok(appCode.includes('const OFFSCREEN_ACTIVITIES = ['), "app.js phải có OFFSCREEN_ACTIVITIES");
assert.ok(appCode.includes('function getCompletedOffscreenIds()'), "app.js phải có getCompletedOffscreenIds()");
assert.ok(appCode.includes('function toggleOffscreenCompleted('), "app.js phải có toggleOffscreenCompleted()");
console.log("✓ Audit app.js: Đầy đủ các hàm thống kê và tương tác off-screen");

// Audit 3: LSK and LSV support for bhv_offscreen_done
assert.ok(appCode.includes('"bhv_offscreen_done"'), "LSK / LSV phải bao gồm bhv_offscreen_done");
console.log("✓ Audit app.js: bhv_offscreen_done được thêm vào danh sách backup/restore v2");

// Audit 4: CSS presence in styles.css
const cssSelectors = [
  '.weekly-bar-chart',
  '.weekly-bar-col',
  '.weekly-bar-fill',
  '.weekly-bar-fill.today',
  '.weekly-bar-fill.target',
  '.mastery-box',
  '.mastery-row',
  '.mastery-badge',
  '.offscreen-grid',
  '.offscreen-card',
  '.offscreen-card.done',
  '.offscreen-btn'
];
for (const sel of cssSelectors) {
  assert.ok(stylesCss.includes(sel), `styles.css phải có class ${sel}`);
}
console.log("✓ Audit styles.css: Đầy đủ các class báo cáo biểu đồ tuần và hoạt động off-screen");

// 2. Mock environment setup
const mockStorage = {};
const localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(mockStorage, k) ? mockStorage[k] : null),
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); },
  get length() { return Object.keys(mockStorage).length; },
  key: (i) => Object.keys(mockStorage)[i] || null
};

const mockElements = {
  parentPinModal: { style: { display: "none" } },
  parentPinModalTitle: { textContent: "" },
  parentPinModalSub: { textContent: "" },
  parentPinModalDots: { innerHTML: "" },
  parentPinModalErr: { textContent: "", style: {} },
  parentPinModalPad: { innerHTML: "", hasChildNodes: () => false },
  parentPinModalHelp: { innerHTML: "" },
  timeLimitModal: { style: { display: "none" } },
  cat: { src: "", className: "", style: {} },
  hb: { innerHTML: "" },
  badgeBtn: { textContent: "" },
  stars: { textContent: "" },
  backBtn: { style: {}, querySelector: () => null },
  badgeCount: { textContent: "" },
  m: { innerHTML: "", querySelectorAll: () => [], addEventListener: () => {}, removeEventListener: () => {}, scrollTo: () => {}, scrollTop: 0 }
};

const document = {
  hidden: false,
  getElementById: (id) => mockElements[id] || null,
  body: { appendChild: () => {}, removeChild: () => {} },
  createElement: () => ({ href: "", download: "", click: () => {}, remove: () => {} }),
  addEventListener: () => {},
  removeEventListener: () => {},
  documentElement: { classList: { toggle: () => {}, add: () => {}, remove: () => {} } }
};

const sandbox = {
  console,
  crypto,
  TextEncoder,
  Uint8Array,
  localStorage,
  document,
  lang: "vi",
  sfxOk: () => {},
  sfxNo: () => {},
  alert: () => {},
  confirm: () => true,
  setTimeout,
  clearTimeout,
  setInterval: () => 1,
  clearInterval: () => {},
  URL: { createObjectURL: () => "blob:test", revokeObjectURL: () => {} },
  Blob: class { constructor(parts, opts) { this.parts = parts; this.opts = opts; this.size = 100; } },
  File: class { constructor(parts, name, opts) { this.parts = parts; this.name = name; this.opts = opts; } },
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  Audio: class { constructor() {} addEventListener() {} play() { return Promise.resolve(); } pause() {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  navigator: { userAgent: "Node", standalone: false },
  cat: mockElements.cat,
  speechSynthesis: { getVoices: () => [], cancel: () => {}, speak: () => {} },
  location: { reload: () => {}, search: "", pathname: "/" },
  history: { replaceState: () => {} },
  idb: async () => [],
  REC: {},
  RECSZ: {}
};
sandbox.window = sandbox;
sandbox.global = sandbox;
sandbox.m = mockElements.m;
sandbox.go = (dest) => { sandbox.__lastGo = dest; };
sandbox.kbc = () => "";
sandbox.T = (vi, en) => vi;
sandbox.ls = {
  get: (k, d) => (sandbox.localStorage.getItem(k) !== null ? sandbox.localStorage.getItem(k) : d),
  set: (k, v) => sandbox.localStorage.setItem(k, v)
};
sandbox.bm = (msg) => { sandbox.__lastBm = msg; };

vm.createContext(sandbox);

const imgCore = fs.readFileSync(path.join(__dirname, 'img-core.js'), 'utf8');
const dataVn = fs.readFileSync(path.join(__dirname, 'data-vn.js'), 'utf8');
const actData = fs.readFileSync(path.join(__dirname, 'activities-data.js'), 'utf8');
vm.runInContext(imgCore, sandbox);
vm.runInContext(dataVn, sandbox);
vm.runInContext(actData, sandbox);
vm.runInContext(appCode, sandbox);

console.log("✓ Môi trường Sandbox và app.js khởi tạo thành công");

// Test 2.1: OFFSCREEN_ACTIVITIES structure
console.log("\n--- Kiểm tra danh sách hoạt động OFFSCREEN_ACTIVITIES ---");
const activities = sandbox.OFFSCREEN_ACTIVITIES;
assert.ok(Array.isArray(activities) && activities.length === 6, "Phải có đúng 6 hoạt động ngoại khóa thực tế");
activities.forEach((act, idx) => {
  assert.ok(act.id, `Hoạt động #${idx} thiếu id`);
  assert.ok(act.nameVi, `Hoạt động #${act.id} thiếu nameVi`);
  assert.ok(act.nameEn, `Hoạt động #${act.id} thiếu nameEn`);
  assert.ok(act.category, `Hoạt động #${act.id} thiếu category`);
  assert.ok(act.skillVi, `Hoạt động #${act.id} thiếu skillVi`);
  assert.ok(act.skillEn, `Hoạt động #${act.id} thiếu skillEn`);
  assert.ok(act.descVi, `Hoạt động #${act.id} thiếu descVi`);
  assert.ok(act.descEn, `Hoạt động #${act.id} thiếu descEn`);
});
console.log(`✓ Đã định nghĩa ${activities.length} hoạt động với đầy đủ metadata: ${activities.map(a => a.id).join(', ')}`);

// Test 2.2: Off-screen toggle persistence
console.log("\n--- Kiểm tra lưu trữ trạng thái hoàn thành Off-screen ---");
localStorage.clear();
assert.strictEqual(JSON.stringify(sandbox.getCompletedOffscreenIds()), JSON.stringify([]));

// Toggle act-01 on
sandbox.toggleOffscreenCompleted('off_fine_motor_clay');
assert.strictEqual(JSON.stringify(sandbox.getCompletedOffscreenIds()), JSON.stringify(['off_fine_motor_clay']));
assert.strictEqual(localStorage.getItem('bhv_offscreen_done'), JSON.stringify(['off_fine_motor_clay']));

// Toggle act-02 on
sandbox.toggleOffscreenCompleted('off_sand_tray_trace');
assert.strictEqual(JSON.stringify(sandbox.getCompletedOffscreenIds().sort()), JSON.stringify(['off_fine_motor_clay', 'off_sand_tray_trace'].sort()));

// Toggle act-01 off
sandbox.toggleOffscreenCompleted('off_fine_motor_clay');
assert.strictEqual(JSON.stringify(sandbox.getCompletedOffscreenIds()), JSON.stringify(['off_sand_tray_trace']));
console.log("✓ Toggle off-screen hoạt động chuẩn xác và đồng bộ vào localStorage (bhv_offscreen_done)");

// Test 2.3: Weekly study stats calculation
console.log("\n--- Kiểm tra tổng hợp thời gian học 7 ngày qua ---");
localStorage.clear();
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const fmtDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Set mock study times:
// Today: 480 sec (8 mins)
const todayStr = fmtDate(now);
localStorage.setItem(`study_sec_${todayStr}`, '480');

// Yesterday: 600 sec (10 mins)
const d1 = new Date(now); d1.setDate(d1.getDate() - 1);
localStorage.setItem(`study_sec_${fmtDate(d1)}`, '600');

// 2 days ago: 300 sec (5 mins)
const d2 = new Date(now); d2.setDate(d2.getDate() - 2);
localStorage.setItem(`study_sec_${fmtDate(d2)}`, '300');

// 3 days ago: 0 sec (0 mins)
// 4 days ago: 720 sec (12 mins)
const d4 = new Date(now); d4.setDate(d4.getDate() - 4);
localStorage.setItem(`study_sec_${fmtDate(d4)}`, '720');

const stats = sandbox.getWeeklyStudyStats();
assert.strictEqual(stats.days.length, 7, "Thống kê tuần phải trả về đúng 7 ngày");
assert.strictEqual(stats.activeDays, 4, "Số ngày bé có học phải là 4");
assert.strictEqual(stats.totalMins, 8 + 10 + 5 + 12, "Tổng số phút phải đúng 35 phút");
assert.strictEqual(stats.avgMins, Math.round(35 / 4), "Trung bình mỗi ngày hoạt động phải là 9 phút");
console.log(`✓ Thống kê 7 ngày: tổng ${stats.totalMins} phút, ${stats.activeDays} ngày học, TB ${stats.avgMins} phút/ngày`);

// Test 2.4: Skills mastery breakdown logic
console.log("\n--- Kiểm tra phân nhóm kỹ năng: Mastered / Learning / NeedsReview ---");
// Setup ST inside sandbox context
vm.runInContext(`
  ST = {
    skills: {
      "Nhận biết số 1–5": 4,
      "Mặt chữ cái đơn (O, Ô, Ơ, A, Ă, Â)": 1
    },
    w: {
      "Nhận biết số 1–5": 0,
      "Mặt chữ cái đơn (O, Ô, Ơ, A, Ă, Â)": 3
    },
    mathCount: 0,
    letCount: 0,
    storyCount: 0,
    traceCount: 0,
    engCount: 0
  };
`, sandbox);

const mastery = sandbox.getSkillsMasteryBreakdown();
const masteredIds = mastery.mastered.map(s => s.id);
const learningIds = mastery.learning.map(s => s.id);
const needsReviewIds = mastery.needsReview.map(s => s.id);

assert.ok(masteredIds.includes('num_1_5'), "num_1_5 phải thuộc nhóm mastered (4 hoàn thành, 0 sai)");
assert.ok(needsReviewIds.includes('vowels_basic'), "vowels_basic phải thuộc nhóm needsReview (1 hoàn thành, 3 sai)");

console.log(`✓ Phân nhóm kỹ năng chuẩn:
  - Đã thuần thục (${mastery.mastered.length}): ${masteredIds.join(', ')}
  - Cần cùng bé ôn lại (${mastery.needsReview.length}): ${needsReviewIds.join(', ')}
  - Đang tiến bộ (${mastery.learning.length}): ${learningIds.join(', ')}`);

// Test 2.5: Parent dashboard render contains Weekly Report & Offscreen Activities
console.log("\n--- Kiểm tra tích hợp vào Dashboard Phụ Huynh parent() ---");
sandbox.parent();
const parentHtml = mockElements.m.innerHTML;
assert.ok(parentHtml.includes('Báo Cáo Học Tập 7 Ngày Qua') || parentHtml.includes('Báo cáo học tập 7 ngày qua') || parentHtml.includes('weekly-bar-chart'), "parent() phải có Card 2B Báo Cáo Học Tập 7 Ngày Qua");
assert.ok(parentHtml.includes('weekly-bar-chart'), "parent() phải render biểu đồ cột .weekly-bar-chart");
assert.ok(parentHtml.includes('Hoạt Động Gắn Kết Ngoại Khóa') || parentHtml.includes('offscreen-grid'), "parent() phải có Card 4D Hoạt Động Ngoại Khóa");
assert.ok(parentHtml.includes('offscreen-grid'), "parent() phải render lưới hoạt động .offscreen-grid");
assert.ok(parentHtml.includes('off_fine_motor_clay'), "parent() phải chứa card hoạt động clay");
assert.ok(parentHtml.includes('off_real_counting_spoons'), "parent() phải chứa card hoạt động đếm thìa dĩa");

console.log("✓ Dashboard Phụ Huynh render đầy đủ Card 2B (Weekly Report) và Card 4D (Offscreen Activities)");

console.log("\n=== TẤT CẢ KIỂM THỬ P5-03 & P5-07 HOÀN TOÀN ĐẠT CHUẨN! ===");
