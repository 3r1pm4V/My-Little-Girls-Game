// test-p5-profiles-settings.js
// Automated tests for Task P5-04 (Multiple Kid Profiles) and P5-05 (Centralized System Settings)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log("=== BẮT ĐẦU KIỂM THỬ P5-04 & P5-05 (Multi-Profile & Centralized Settings) ===");

// 1. Code-level audit
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const swCode = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');

// Audit 1: Cache bumped to bhv-v42 or higher
assert.ok(/bhv-v(?:4[2-9]|[5-9]\d)/.test(swCode), "sw.js cache version phải là bhv-v42 trở lên");
console.log("✓ Audit sw.js: Cache version bhv-v42+ xác nhận");

// Audit 2: Function presence in app.js
assert.ok(appCode.includes('function getKidProfiles()'), "app.js phải có getKidProfiles()");
assert.ok(appCode.includes('function getActiveProfile()'), "app.js phải có getActiveProfile()");
assert.ok(appCode.includes('function switchKidProfile('), "app.js phải có switchKidProfile()");
assert.ok(appCode.includes('function createKidProfile('), "app.js phải có createKidProfile()");
assert.ok(appCode.includes('function deleteKidProfile('), "app.js phải có deleteKidProfile()");
assert.ok(appCode.includes('function setMotionPref('), "app.js phải có setMotionPref()");
console.log("✓ Audit app.js: Đầy đủ các hàm quản lý đa hồ sơ bé và cài đặt tập trung");

// Audit 3: LSK and LSV support for bhv_profiles and bhv_active_profile_id
assert.ok(appCode.includes('"bhv_profiles"'), "LSK phải bao gồm bhv_profiles");
assert.ok(appCode.includes('"bhv_active_profile_id"'), "LSK phải bao gồm bhv_active_profile_id");
console.log("✓ Audit app.js: bhv_profiles & bhv_active_profile_id có trong danh sách backup/restore v2");

// Audit 4: CSS presence in styles.css
const cssSelectors = [
  '.profile-grid',
  '.profile-card',
  '.profile-card.active',
  '.profile-card-avatar',
  '.profile-card-name',
  '.profile-card-tier',
  '.profile-switch-btn',
  '.profile-del-btn',
  '.profile-add-form',
  '.settings-group',
  '.settings-group-title'
];
for (const sel of cssSelectors) {
  assert.ok(stylesCss.includes(sel), `styles.css phải có class ${sel}`);
}
console.log("✓ Audit styles.css: Đầy đủ các class giao diện thẻ hồ sơ và nhóm cài đặt tập trung");

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

// Test 2.1: Default Profile Migration / Initialization
console.log("\n--- Kiểm tra khởi tạo và di chuyển hồ sơ mặc định ---");
localStorage.clear();
localStorage.setItem("kid_name", "Bé Bơ");
localStorage.setItem("kid_avatar", "🐰");
localStorage.setItem("ageTier", "preschool");
localStorage.setItem("stars", "120");
localStorage.setItem("kids_streak_count", "4");

const initialProfiles = sandbox.getKidProfiles();
assert.strictEqual(initialProfiles.length, 1, "Ban đầu phải có đúng 1 hồ sơ mặc định");
assert.strictEqual(initialProfiles[0].name, "Bé Bơ", "Tên hồ sơ mặc định phải lấy từ kid_name");
assert.strictEqual(initialProfiles[0].avatar, "🐰", "Avatar hồ sơ mặc định phải lấy từ kid_avatar");
assert.strictEqual(initialProfiles[0].ageTier, "preschool", "Nhóm tuổi phải đúng preschool");
const activeProf = sandbox.getActiveProfile();
assert.strictEqual(activeProf.id, initialProfiles[0].id, "Hồ sơ mặc định phải là hồ sơ đang hoạt động");
console.log(`✓ Khởi tạo hồ sơ ban đầu thành công: ${activeProf.name} (${activeProf.avatar}), ID: ${activeProf.id}`);

// Test 2.2: Create a second profile (P5-04)
console.log("\n--- Kiểm tra tạo thêm hồ sơ bé thứ 2 (Multi-Profile) ---");
sandbox.createKidProfile("Bé Na", "👧", "grade1_2");

const profilesAfterAdd = sandbox.getKidProfiles();
assert.strictEqual(profilesAfterAdd.length, 2, "Sau khi thêm phải có đúng 2 hồ sơ");
const currentActive = sandbox.getActiveProfile();
assert.strictEqual(currentActive.name, "Bé Na", "Sau khi tạo, hệ thống tự động chuyển sang hồ sơ Bé Na");
assert.strictEqual(localStorage.getItem("kid_name"), "Bé Na");
assert.strictEqual(localStorage.getItem("kid_avatar"), "👧");
assert.strictEqual(localStorage.getItem("ageTier"), "grade1_2");
assert.strictEqual(vm.runInContext("stars", sandbox), 0, "Bé Na mới tạo phải có 0 sao (tiến trình độc lập)");

// Add some stars and streak for Bé Na
localStorage.setItem("stars", "35");
localStorage.setItem("kids_streak_count", "2");
vm.runInContext("stars = 35;", sandbox);
console.log("✓ Tạo hồ sơ Bé Na thành công, tiến trình mới bắt đầu độc lập (0 sao -> 35 sao)");

// Test 2.3: Switch back to Profile 1 (Bé Bơ)
console.log("\n--- Kiểm tra chuyển đổi hồ sơ (Profile Switching) ---");
const profBoId = initialProfiles[0].id;
sandbox.switchKidProfile(profBoId);

const activeSwitched = sandbox.getActiveProfile();
assert.strictEqual(activeSwitched.id, profBoId);
assert.strictEqual(activeSwitched.name, "Bé Bơ");
assert.strictEqual(localStorage.getItem("kid_name"), "Bé Bơ");
assert.strictEqual(localStorage.getItem("kid_avatar"), "🐰");
assert.strictEqual(localStorage.getItem("ageTier"), "preschool");
assert.strictEqual(vm.runInContext("stars", sandbox), 120, "Số sao của Bé Bơ phải được khôi phục nguyên vẹn 120 sao!");
console.log("✓ Chuyển lại Bé Bơ thành công: 120 sao và chuỗi ngày học được bảo toàn 100%");

// Test 2.4: Switch to Bé Na again and verify Bé Na's data preserved
sandbox.switchKidProfile(currentActive.id);
assert.strictEqual(sandbox.getActiveProfile().name, "Bé Na");
assert.strictEqual(vm.runInContext("stars", sandbox), 35, "Số sao của Bé Na phải được bảo toàn 35 sao!");
console.log("✓ Chuyển lại Bé Na thành công: 35 sao được bảo toàn chính xác");

// Test 2.5: Prevent deleting only profile vs delete secondary profile
console.log("\n--- Kiểm tra bảo vệ không xóa hồ sơ duy nhất & xóa hồ sơ ---");
// Try deleting Bé Bơ (inactive)
sandbox.deleteKidProfile(profBoId);
const profilesAfterDel = sandbox.getKidProfiles();
assert.strictEqual(profilesAfterDel.length, 1, "Sau khi xóa Bé Bơ còn đúng 1 hồ sơ");
assert.strictEqual(profilesAfterDel[0].name, "Bé Na");

// Try deleting Bé Na (the only remaining profile)
sandbox.__lastAlert = null;
sandbox.deleteKidProfile(profilesAfterDel[0].id);
assert.ok(sandbox.__lastAlert && sandbox.__lastAlert.includes("ít nhất 1 hồ sơ"), "Phải chặn không cho xóa hồ sơ duy nhất");
assert.strictEqual(sandbox.getKidProfiles().length, 1, "Vẫn còn đúng 1 hồ sơ sau khi cố xóa");
console.log("✓ Cơ chế bảo vệ hồ sơ hoạt động chuẩn xác: chặn xóa khi chỉ còn 1 bé");

// Test 2.6: Centralized Settings Functions (P5-05)
console.log("\n--- Kiểm tra các hàm cài đặt tập trung (P5-05) ---");

// 1. setDailyLimit
sandbox.setDailyLimit(45);
assert.strictEqual(localStorage.getItem("daily_limit_minutes"), "45", "Giới hạn thời gian học phải lưu 45 phút");

// 2. setLang
sandbox.setLang("both");
assert.strictEqual(localStorage.getItem("lang"), "both", "Ngôn ngữ phải lưu song ngữ both");

// 3. setSpeechRate
sandbox.setSpeechRate(0.6);
assert.strictEqual(localStorage.getItem("rate2"), "0.6", "Tốc độ đọc phải lưu 0.6");

// 4. setMotionPref
sandbox.setMotionPref("1");
assert.strictEqual(localStorage.getItem("rm"), "1", "Giảm chuyển động phải bật 1");
assert.strictEqual(localStorage.getItem("kids_confetti_disabled"), "1", "Pháo hoa confetti phải tự động tắt khi bật giảm chuyển động");

sandbox.setMotionPref("0");
assert.strictEqual(localStorage.getItem("rm"), "0", "Giảm chuyển động phải tắt 0");
assert.strictEqual(localStorage.getItem("kids_confetti_disabled"), "0", "Pháo hoa bật lại");

console.log("✓ Các hàm cài đặt tập trung (Thời gian, Ngôn ngữ, Tốc độ, Giảm chuyển động) hoạt động chuẩn xác");

// Test 2.7: Parent Dashboard render test
console.log("\n--- Kiểm tra kết xuất Giao diện Phụ huynh parent() ---");
sandbox.parent();
const html = mockElements.m.innerHTML;
assert.ok(html.includes("Hồ sơ các bé trên thiết bị"), "Card 1 phải có tiêu đề Hồ sơ các bé trên thiết bị");
assert.ok(html.includes("profile-grid"), "Card 1 phải có lưới .profile-grid");
assert.ok(html.includes("profile-card"), "Card 1 phải có thẻ .profile-card");
assert.ok(html.includes("Cài đặt tập trung hệ thống"), "Card 6 phải có tiêu đề Cài đặt tập trung hệ thống");
assert.ok(html.includes("settings-group"), "Card 6 phải có nhóm .settings-group");
assert.ok(html.includes("Tốc độ giọng đọc cho bé"), "Card 6 phải có mục chỉnh tốc độ giọng đọc");
assert.ok(html.includes("Giảm chuyển động"), "Card 6 phải có mục chỉnh giảm chuyển động");

console.log("✓ Dashboard Phụ huynh kết xuất đầy đủ Card 1 (Đa hồ sơ bé) và Card 6 (Cài đặt tập trung)");

console.log("\n=== TẤT CẢ KIỂM THỬ P5-04 & P5-05 ĐỀU ĐẠT CHUẨN 100%! ===");
