// test-p5-stage-unlock.js
// Automated tests for Task P5-06 (Manual Stage Unlock & Skip by Parent)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log("=== BẮT ĐẦU KIỂM THỬ P5-06 (Manual Stage Unlock & Skip) ===");

// 1. Code-level audit
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const swCode = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');

// Audit 1: Cache bumped to bhv-v43 or higher
assert.ok(/bhv-v(?:4[3-9]|[5-9]\d)/.test(swCode), "sw.js cache version phải là bhv-v43 trở lên");
console.log("✓ Audit sw.js: Cache version bhv-v43+ xác nhận");

// Audit 2: Function presence in app.js
assert.ok(appCode.includes('function getUnlockedStages()'), "app.js phải có getUnlockedStages()");
assert.ok(appCode.includes('function isStageUnlocked('), "app.js phải có isStageUnlocked()");
assert.ok(appCode.includes('function unlockStage('), "app.js phải có unlockStage()");
assert.ok(appCode.includes('function lockStage('), "app.js phải có lockStage()");
assert.ok(appCode.includes('function toggleUnlockAllStages()'), "app.js phải có toggleUnlockAllStages()");
assert.ok(appCode.includes('function setStageByParent('), "app.js phải có setStageByParent()");
console.log("✓ Audit app.js: Đầy đủ các hàm mở khóa/bỏ qua chặng thủ công");

// Audit 3: LSK and LSV support for blg_unlock_all and blg_unlocked_stages
assert.ok(appCode.includes('"blg_unlock_all"'), "LSK phải bao gồm blg_unlock_all");
assert.ok(appCode.includes('"blg_unlocked_stages"'), "LSK phải bao gồm blg_unlocked_stages");
console.log("✓ Audit app.js: blg_unlock_all & blg_unlocked_stages có trong danh sách backup/restore v2");

// Audit 4: CSS presence in styles.css
const cssSelectors = [
  '.stage-tab-btn.locked',
  '.stage-manage-grid',
  '.stage-manage-card',
  '.stage-manage-card.current',
  '.stage-manage-card.unlocked',
  '.stage-manage-card.locked',
  '.stage-status-badge',
  '.stage-manage-actions'
];
for (const sel of cssSelectors) {
  assert.ok(stylesCss.includes(sel), `styles.css phải có class ${sel}`);
}
console.log("✓ Audit styles.css: Đầy đủ các class giao diện quản lý chặng");

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
  stars: { textContent: "", innerHTML: "" },
  backBtn: { style: {}, querySelector: () => null },
  badgeCount: { textContent: "" },
  m: { innerHTML: "", querySelectorAll: () => [], addEventListener: () => {}, removeEventListener: () => {}, scrollTo: () => {}, scrollTop: 0 }
};

const document = {
  hidden: false,
  getElementById: (id) => mockElements[id] || null,
  querySelectorAll: () => [],
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
  alert: (msg) => { sandbox.__lastAlert = msg; },
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

// Test 2.1: Default Stages Unlock State
console.log("\n--- Kiểm tra trạng thái mở khóa chặng ban đầu ---");
localStorage.clear();
localStorage.setItem("blg_stage", "1");

assert.strictEqual(sandbox.isStageUnlocked(0), true, "Chặng 0 phải mở mặc định");
assert.strictEqual(sandbox.isStageUnlocked(1), true, "Chặng 1 (đang học) phải mở");
assert.strictEqual(sandbox.isStageUnlocked(2), false, "Chặng 2 ban đầu phải khóa");
assert.strictEqual(sandbox.isStageUnlocked(4), false, "Chặng 4 ban đầu phải khóa");
console.log("✓ Trạng thái mở khóa ban đầu chuẩn xác (Chặng 0 & 1 mở, Chặng 2-5 khóa)");

// Test 2.2: Manual Unlock of a Specific Stage
console.log("\n--- Kiểm tra phụ huynh mở khóa thủ công một chặng ---");
sandbox.unlockStage(4);
assert.strictEqual(sandbox.isStageUnlocked(4), true, "Sau khi unlockStage(4), Chặng 4 phải mở");
assert.strictEqual(sandbox.isStageUnlocked(2), false, "Chặng 2 chưa mở thì vẫn khóa");

// Test 2.3: Manual Lock of a Specific Stage
console.log("\n--- Kiểm tra phụ huynh khóa lại chặng đã mở ---");
sandbox.lockStage(4);
assert.strictEqual(sandbox.isStageUnlocked(4), false, "Sau khi lockStage(4), Chặng 4 phải khóa lại");

// Verify cannot lock current stage or stage 0/1
sandbox.__lastAlert = null;
sandbox.lockStage(1);
assert.ok(sandbox.__lastAlert && sandbox.__lastAlert.includes("Không thể khóa"), "Phải chặn không cho khóa chặng bé đang học");
assert.strictEqual(sandbox.isStageUnlocked(1), true, "Chặng 1 vẫn mở an toàn");
console.log("✓ Khóa/Mở từng chặng hoạt động chính xác kèm bảo vệ chặng đang học");

// Test 2.4: Set active stage by parent
console.log("\n--- Kiểm tra phụ huynh đặt chặng học hôm nay (setStageByParent) ---");
sandbox.setStageByParent(2);
assert.strictEqual(sandbox.getKidCurrentStage(), 2, "Chặng hiện tại phải chuyển sang Chặng 2");
assert.strictEqual(sandbox.isStageUnlocked(2), true, "Chặng 2 phải tự động được mở khóa");
console.log("✓ setStageByParent(2) chuyển chặng hiện tại và mở khóa chặng 2 thành công");

// Test 2.5: Unlock all stages toggle (blg_unlock_all)
console.log("\n--- Kiểm tra chế độ mở khóa tự do toàn bộ các chặng ---");
sandbox.toggleUnlockAllStages();
assert.strictEqual(localStorage.getItem("blg_unlock_all"), "1");
for (let s = 0; s <= 5; s++) {
  assert.strictEqual(sandbox.isStageUnlocked(s), true, `Chặng ${s} phải mở khi blg_unlock_all = 1`);
}

sandbox.toggleUnlockAllStages();
assert.strictEqual(localStorage.getItem("blg_unlock_all"), "0");
console.log("✓ toggleUnlockAllStages() bật/tắt mở khóa tự do toàn bộ 6 chặng hoàn hảo");

// Test 2.6: todayLearning() rendering with locked vs unlocked stages
console.log("\n--- Kiểm tra kết xuất Học hôm nay todayLearning() ---");
localStorage.setItem("blg_unlock_all", "0");
localStorage.setItem("blg_unlocked_stages", JSON.stringify([0, 1]));
localStorage.setItem("blg_stage", "1");

sandbox.todayLearning();
const todayHtml = mockElements.m.innerHTML;
assert.ok(todayHtml.includes("stage-tabs-wrap"), "todayLearning() phải có tab bar");
assert.ok(todayHtml.includes("lockedStagePrompt"), "Chặng khóa phải có hành động lockedStagePrompt");
assert.ok(todayHtml.includes("🔒"), "Chặng khóa phải hiển thị biểu tượng ổ khóa 🔒");
console.log("✓ todayLearning() kết xuất ổ khóa 🔒 và gắn sự kiện cảnh báo nhẹ nhàng cho chặng khóa");

// Test 2.7: Parent Dashboard Card 3B rendering
console.log("\n--- Kiểm tra kết xuất Card 3B trong Bảng điều khiển phụ huynh ---");
sandbox.parent();
const parentHtml = mockElements.m.innerHTML;
assert.ok(parentHtml.includes("Lộ trình 6 Chặng & Mở khóa học tập"), "parent() phải có Card 3B");
assert.ok(parentHtml.includes("stage-manage-grid"), "Card 3B phải có lưới .stage-manage-grid");
assert.ok(parentHtml.includes("Đặt làm chặng học hôm nay"), "Phải có nút Đặt làm chặng học hôm nay");
assert.ok(parentHtml.includes("Mở khóa tự do tất cả các chặng"), "Phải có tùy chọn mở khóa tự do");

console.log("✓ Bảng điều khiển phụ huynh hiển thị đầy đủ Card 3B với danh sách 6 chặng và các nút thao tác");

console.log("\n=== TẤT CẢ KIỂM THỬ P5-06 ĐỀU ĐẠT CHUẨN 100%! ===");
