// test-p5-parent-backup.js
// Automated tests for Task P5-01 (Salted Hash Parent PIN Gate & Modal) and P5-02 (Backup Export/Import v2)

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== BẮT ĐẦU KIỂM THỬ P5-01 & P5-02 (Parent Gate & Backup v2) ===");

// 1. Code-level audit
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

// Audit 1: No window.prompt or standalone prompt in app.js
const promptMatches = [...appCode.matchAll(/(?:^|[^a-zA-Z0-9_.])(?:window\.)?prompt\s*\(/g)];
console.log(`Kiểm tra window.prompt(): tìm thấy ${promptMatches.length} vị trí`);
assert.strictEqual(promptMatches.length, 0, "Không được còn bất kỳ lệnh window.prompt() nào trong app.js!");

// Audit 2: Touch targets for pin-key and pin-pad in styles.css
assert.ok(stylesCss.includes('min-height:64px'), "styles.css phải có min-height:64px cho .pin-key");
assert.ok(stylesCss.includes('min-width:64px'), "styles.css phải có min-width:64px cho .pin-key");
assert.ok(stylesCss.includes('gap:12px'), "styles.css phải có gap:12px cho .pin-pad");
assert.ok(stylesCss.includes('.pin-modal-close'), "styles.css phải có .pin-modal-close");
console.log("✓ Audit styles.css: pin-key (>=64px), pin-pad (gap: 12px), close button đạt chuẩn touch");

// Audit 3: Modal exists in index.html
assert.ok(indexHtml.includes('id="parentPinModal"'), "index.html phải có #parentPinModal");
assert.ok(indexHtml.includes('id="parentPinModalDots"'), "index.html phải có #parentPinModalDots");
assert.ok(indexHtml.includes('id="parentPinModalPad"'), "index.html phải có #parentPinModalPad");
console.log("✓ Audit index.html: Cấu trúc #parentPinModal hiện diện đầy đủ");

// 2. Behavioral test environment mock
const mockStorage = {};
const localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(mockStorage, k) ? mockStorage[k] : null),
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); },
  get length() { return Object.keys(mockStorage).length; },
  key: (i) => Object.keys(mockStorage)[i] || null
};

// Mock DOM elements
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

// Global context
global.localStorage = localStorage;
global.document = document;
global.window = global;
global.lang = "vi";
global.sfxOk = () => {};
global.sfxNo = () => {};
global.alert = (msg) => { global.__lastAlert = msg; };
global.confirm = () => true;

// Evaluate app.js PIN & Export logic in context
// We extract the PIN functions & export/import functions or load app.js safely
// Let's create a sandbox runner for app.js or test the cryptographic and export logic
(async () => {
  try {
    // 3. Test Cryptographic PIN Functions
    // Check if functions are extracted or eval'd
    const vm = require('vm');
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

    // Load app.js in sandbox with minimal stubs
    sandbox.m = mockElements.m;
    sandbox.go = (dest) => { sandbox.__lastGo = dest; };
    sandbox.kbc = () => "";
    sandbox.T = (vi, en) => vi;
    sandbox.ls = {
      get: (k, d) => (sandbox.localStorage.getItem(k) !== null ? sandbox.localStorage.getItem(k) : d),
      set: (k, v) => sandbox.localStorage.setItem(k, v)
    };
    sandbox.bm = (msg) => { sandbox.__lastBm = msg; };

    // Create context & run the prerequisite files
    vm.createContext(sandbox);
    const imgCore = fs.readFileSync(path.join(__dirname, 'img-core.js'), 'utf8');
    const dataVn = fs.readFileSync(path.join(__dirname, 'data-vn.js'), 'utf8');
    const actData = fs.readFileSync(path.join(__dirname, 'activities-data.js'), 'utf8');
    vm.runInContext(imgCore, sandbox);
    vm.runInContext(dataVn, sandbox);
    vm.runInContext(actData, sandbox);

    // Run the app.js code
    vm.runInContext(appCode, sandbox);

    console.log("✓ Load app.js in VM sandbox thành công");

    // Test A: generatePinSalt()
    const salt1 = sandbox.generatePinSalt();
    const salt2 = sandbox.generatePinSalt();
    assert.strictEqual(typeof salt1, "string", "Salt phải là string");
    assert.strictEqual(salt1.length, 32, "Salt phải có 32 ký tự hex (16 bytes)");
    assert.notStrictEqual(salt1, salt2, "Hai lần sinh salt phải khác nhau");
    console.log("✓ Test A: generatePinSalt() hoạt động chính xác (32 ký tự hex, ngẫu nhiên)");

    // Test B: hashPin()
    const hashA = await sandbox.hashPin("1234", salt1);
    const hashB = await sandbox.hashPin("1234", salt1);
    const hashC = await sandbox.hashPin("5678", salt1);
    assert.strictEqual(hashA, hashB, "Cùng PIN và salt phải ra cùng hash");
    assert.notStrictEqual(hashA, hashC, "Khác PIN phải ra khác hash");
    assert.strictEqual(hashA.length, 64, "SHA-256 hash phải có 64 ký tự hex");
    console.log("✓ Test B: hashPin() SHA-256 chuẩn xác, deterministic với cùng salt");

    // Test C: First-time mandatory setup (no default 1234)
    sandbox.localStorage.clear();
    assert.strictEqual(sandbox.hasParentPin(), false, "Ban đầu không có PIN");

    // Open gate modal in setup mode
    sandbox.openParentPinModal({ purpose: "gate" });
    assert.strictEqual(sandbox.parentPinModalState.step, "setup_enter", "Khi chưa có PIN, tự động vào bước setup_enter");

    // Step 1: Type 4 digits (e.g. 5, 8, 2, 9)
    await sandbox.__parentPinModalPress("5");
    await sandbox.__parentPinModalPress("8");
    await sandbox.__parentPinModalPress("2");
    await sandbox.__parentPinModalPress("9");
    assert.strictEqual(sandbox.parentPinModalState.step, "setup_confirm", "Nhập đủ 4 số chuyển sang setup_confirm");
    assert.strictEqual(sandbox.parentPinModalState.tempPin, "5829");

    // Step 2: Confirmation mismatch
    await sandbox.__parentPinModalPress("1");
    await sandbox.__parentPinModalPress("1");
    await sandbox.__parentPinModalPress("1");
    await sandbox.__parentPinModalPress("1");
    assert.strictEqual(sandbox.parentPinModalState.step, "setup_enter", "Không khớp phải quay lại setup_enter");
    assert.strictEqual(sandbox.hasParentPin(), false, "Chưa lưu PIN khi xác nhận sai");

    // Step 3: Confirmation match
    await sandbox.__parentPinModalPress("5");
    await sandbox.__parentPinModalPress("8");
    await sandbox.__parentPinModalPress("2");
    await sandbox.__parentPinModalPress("9");
    await sandbox.__parentPinModalPress("5");
    await sandbox.__parentPinModalPress("8");
    await sandbox.__parentPinModalPress("2");
    await sandbox.__parentPinModalPress("9");

    assert.strictEqual(sandbox.hasParentPin(), true, "Đã lưu PIN sau khi xác nhận trùng");
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin"), null, "Tuyệt đối không lưu plaintext parent_pin!");
    assert.ok(sandbox.localStorage.getItem("parent_pin_hash"), "Đã lưu parent_pin_hash");
    assert.ok(sandbox.localStorage.getItem("parent_pin_salt"), "Đã lưu parent_pin_salt");
    console.log("✓ Test C: Bắt buộc tạo PIN lần đầu thành công (2 bước xác nhận, lưu hash/salt, không plaintext)");

    // Test D: Verify PIN
    const verifyGood = await sandbox.verifyParentPin("5829");
    const verifyBad = await sandbox.verifyParentPin("1234");
    assert.strictEqual(verifyGood, true, "PIN đúng phải verify thành công");
    assert.strictEqual(verifyBad, false, "PIN sai phải bị từ chối");
    console.log("✓ Test D: verifyParentPin() xác thực chính xác");

    // Test E: Legacy PIN migration
    sandbox.localStorage.clear();
    sandbox.localStorage.setItem("parent_pin", "4321"); // legacy plaintext
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin_hash"), null);
    await sandbox.migrateLegacyPin();
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin"), null, "Sau khi migrate, plaintext parent_pin phải bị xóa");
    assert.ok(sandbox.localStorage.getItem("parent_pin_hash"), "Đã tạo parent_pin_hash");
    assert.ok(sandbox.localStorage.getItem("parent_pin_salt"), "Đã tạo parent_pin_salt");
    const migratedCheck = await sandbox.verifyParentPin("4321");
    assert.strictEqual(migratedCheck, true, "PIN cũ sau khi migrate vẫn dùng được bình thường");
    console.log("✓ Test E: migrateLegacyPin() tự động băm mã PIN cũ và xóa plaintext");

    // Test F: Unlock Time Limit Modal (no prompt)
    let unlocked = false;
    sandbox.__unlockTimeLimit();
    assert.strictEqual(sandbox.parentPinModalState.purpose, "unlock_time");
    sandbox.parentPinModalState.onSuccess = () => { unlocked = true; };
    await sandbox.__parentPinModalPress("4");
    await sandbox.__parentPinModalPress("3");
    await sandbox.__parentPinModalPress("2");
    await sandbox.__parentPinModalPress("1");
    assert.strictEqual(unlocked, true, "Mở khóa thành công bằng modal không dùng prompt()");
    console.log("✓ Test F: __unlockTimeLimit() hoạt động qua modal an toàn không dùng prompt()");

    // Test G: Backup Export v2 (P5-02)
    sandbox.localStorage.clear();
    sandbox.localStorage.setItem("stars", "150");
    sandbox.localStorage.setItem("badges", "first_star,streak_3,math_master");
    sandbox.localStorage.setItem("kid_name", "Bé Bông");
    sandbox.localStorage.setItem("kid_avatar", "🐰");
    sandbox.localStorage.setItem("ageTier", "preschool");
    sandbox.localStorage.setItem("streak", "5");
    sandbox.localStorage.setItem("kids_streak_count", "5");
    sandbox.localStorage.setItem("kids_streak_last_date", "2026-10-20");
    sandbox.localStorage.setItem("study_sec_2026-10-20", "600");
    sandbox.localStorage.setItem("study_sec_2026-10-19", "450");
    sandbox.localStorage.setItem("parent_pin_hash", "secret_hash_value");
    sandbox.localStorage.setItem("parent_pin_salt", "secret_salt_value");
    sandbox.localStorage.setItem("parent_pin", "secret_plaintext");

    let exportedBlobContent = null;
    sandbox.saveFile = async (blob, name) => {
      exportedBlobContent = blob.parts[0];
      return "dl";
    };

    await sandbox.exportData(false);
    assert.ok(exportedBlobContent, "File sao lưu phải được tạo");
    const exportedJson = JSON.parse(exportedBlobContent);

    assert.strictEqual(exportedJson.app, "be-hoc-vui");
    assert.strictEqual(exportedJson.schemaVersion, 2, "schemaVersion phải là 2");
    assert.strictEqual(exportedJson.ls.stars, "150");
    assert.strictEqual(exportedJson.ls.badges, "first_star,streak_3,math_master");
    assert.strictEqual(exportedJson.ls.kid_name, "Bé Bông");
    assert.strictEqual(exportedJson.ls.kid_avatar, "🐰");
    assert.strictEqual(exportedJson.ls["study_sec_2026-10-20"], "600");
    assert.strictEqual(exportedJson.ls["study_sec_2026-10-19"], "450");

    // CRITICAL SECURITY ASSERTION: NO PIN IN EXPORT
    assert.strictEqual(exportedJson.ls.parent_pin, undefined, "Tuyệt đối không xuất parent_pin!");
    assert.strictEqual(exportedJson.ls.parent_pin_hash, undefined, "Tuyệt đối không xuất parent_pin_hash!");
    assert.strictEqual(exportedJson.ls.parent_pin_salt, undefined, "Tuyệt đối không xuất parent_pin_salt!");
    for (const k of Object.keys(exportedJson.ls)) {
      assert.strictEqual(/pin/i.test(k), false, `Không key nào được chứa 'pin': ${k}`);
    }
    console.log("✓ Test G: exportData() tạo JSON schemaVersion 2, đầy đủ sao/badges/streak/study_sec, KHÔNG XUẤT PIN");

    // Test H: Backup Import v2 (Round-trip & PIN exclusion)
    sandbox.localStorage.clear();
    sandbox.localStorage.setItem("stars", "0");
    sandbox.localStorage.setItem("parent_pin_hash", "device_owner_hash"); // PIN on current device
    sandbox.localStorage.setItem("parent_pin_salt", "device_owner_salt");

    // Attempt malicious import containing injected PIN
    const maliciousImport = {
      app: "be-hoc-vui",
      schemaVersion: 2,
      ls: {
        stars: "200",
        kid_name: "Bé An",
        badges: "streak_7",
        parent_pin: "9999",
        parent_pin_hash: "malicious_hash",
        parent_pin_salt: "malicious_salt",
        "study_sec_2026-10-20": "900"
      }
    };

    const mockFile = {
      size: 1024,
      text: async () => JSON.stringify(maliciousImport)
    };

    await sandbox.importData(mockFile);

    assert.strictEqual(sandbox.localStorage.getItem("stars"), "200", "Khôi phục stars thành công");
    assert.strictEqual(sandbox.localStorage.getItem("kid_name"), "Bé An", "Khôi phục kid_name thành công");
    assert.strictEqual(sandbox.localStorage.getItem("badges"), "streak_7", "Khôi phục badges thành công");
    assert.strictEqual(sandbox.localStorage.getItem("study_sec_2026-10-20"), "900", "Khôi phục study_sec dynamic thành công");

    // Assert PIN was ignored and local device PIN intact
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin"), null, "importData không được nạp parent_pin");
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin_hash"), "device_owner_hash", "Mã PIN của thiết bị không bị ghi đè");
    assert.strictEqual(sandbox.localStorage.getItem("parent_pin_salt"), "device_owner_salt", "Salt của thiết bị không bị ghi đè");
    console.log("✓ Test H: importData() khôi phục đầy đủ dữ liệu v2 và hoàn toàn bỏ qua mọi trường PIN lạ");

    console.log("\n🎉 TẤT CẢ CÁC BÀI TEST P5-01 & P5-02 ĐỀU PASS 100%!");
  } catch (err) {
    console.error("❌ TEST FAILED:", err);
    process.exit(1);
  }
})();
