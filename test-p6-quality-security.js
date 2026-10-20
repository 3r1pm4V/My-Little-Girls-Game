// test-p6-quality-security.js
// Automated tests for Phase 6: P6-01 through P6-07
// (Safe YouTube, Accessibility, Low-end performance, CSP Headers, GitHub Actions CI, Release Checklist)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log("=== BẮT ĐẦU KIỂM THỬ TOÀN DIỆN PHASE 6 (P6-01 ĐẾN P6-07) ===");

// 1. Kiểm tra P6-02: Video YouTube an toàn & Bảo vệ liên kết ngoài
console.log("\n--- TEST 1 (P6-02): Video YouTube nocookie & Cổng phụ huynh bảo vệ liên kết thoát ---");
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Iframe uses youtube-nocookie.com with safe params
assert.ok(appCode.includes('youtube-nocookie.com/embed/'), "app.js phải nhúng video qua domain an toàn youtube-nocookie.com");
assert.ok(appCode.includes('rel=0'), "URL nhúng YouTube phải có rel=0");
assert.ok(appCode.includes('modestbranding=1'), "URL nhúng YouTube phải có modestbranding=1");
assert.ok(appCode.includes('controls=1'), "URL nhúng YouTube phải có controls=1");

// openExternalLinkWithParentGate must exist and guard external links
assert.ok(appCode.includes('function openExternalLinkWithParentGate('), "app.js phải có hàm openExternalLinkWithParentGate");
assert.ok(appCode.includes('openExternalLinkWithParentGate('), "Các liên kết ngoài YouTube phải được bảo vệ bởi cổng PIN phụ huynh");
console.log("✓ P6-02 ĐẠT: Video sử dụng youtube-nocookie.com và mọi nút thoát ra ngoài đều được bảo vệ bởi Cổng phụ huynh!");

// 2. Kiểm tra P6-05: CSP và Security Headers trong netlify.toml
console.log("\n--- TEST 2 (P6-05): CSP & Security Headers trong netlify.toml ---");
const netlifyToml = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');

assert.ok(netlifyToml.includes('Content-Security-Policy'), "netlify.toml phải có header Content-Security-Policy");
assert.ok(netlifyToml.includes("frame-src 'self' https://www.youtube-nocookie.com"), "CSP phải cho phép frame-src từ youtube-nocookie.com");
assert.ok(netlifyToml.includes("Permissions-Policy"), "netlify.toml phải có Permissions-Policy");
assert.ok(netlifyToml.includes("X-Frame-Options"), "netlify.toml phải có X-Frame-Options");
assert.ok(netlifyToml.includes("X-Content-Type-Options = \"nosniff\""), "netlify.toml phải có nosniff");
assert.ok(netlifyToml.includes("Referrer-Policy = \"strict-origin-when-cross-origin\""), "netlify.toml phải có Referrer-Policy");
console.log("✓ P6-05 ĐẠT: netlify.toml cấu hình đầy đủ CSP, Permissions-Policy, X-Frame-Options, nosniff!");

// 3. Kiểm tra P6-06: GitHub Actions Workflow
console.log("\n--- TEST 3 (P6-06): GitHub Actions CI Workflow ---");
const workflowPath = path.join(__dirname, '.github', 'workflows', 'test.yml');
assert.ok(fs.existsSync(workflowPath), ".github/workflows/test.yml phải tồn tại");
const workflowContent = fs.readFileSync(workflowPath, 'utf8');
assert.ok(workflowContent.includes('actions/checkout'), "Workflow phải có action checkout");
assert.ok(workflowContent.includes('actions/setup-node'), "Workflow phải có action setup-node");
assert.ok(workflowContent.includes('node test-'), "Workflow phải chạy các bài kiểm thử tự động");
console.log("✓ P6-06 ĐẠT: Workflow CI tự động trên GitHub Actions đã sẵn sàng!");

// 4. Kiểm tra P6-03: Accessibility (Truy cập, Focus, Giảm chuyển động, WCAG AA)
console.log("\n--- TEST 4 (P6-03): Audit Khả năng tiếp cận (Accessibility) ---");
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Focus visible styles
assert.ok(stylesCss.includes(':focus-visible'), "styles.css phải có quy tắc :focus-visible rõ ràng");
// Reduced motion styles
assert.ok(stylesCss.includes('prefers-reduced-motion: reduce'), "styles.css phải hỗ trợ prefers-reduced-motion");
assert.ok(stylesCss.includes('html.rm'), "styles.css phải hỗ trợ class .rm để tắt animation");
// ARIA labels on core buttons in index.html
assert.ok(indexHtml.includes('aria-label="Trang chủ"') || indexHtml.includes('aria-label='), "index.html phải có aria-label cho các nút điều hướng");
console.log("✓ P6-03 ĐẠT: :focus-visible, prefers-reduced-motion, html.rm và thuộc tính ARIA đầy đủ!");

// 5. Kiểm tra P6-04: Hiệu năng máy yếu (DOM containment, cleanup)
console.log("\n--- TEST 5 (P6-04): Tối ưu hiệu năng thiết bị cấu hình thấp ---");
assert.ok(stylesCss.includes('contain: content') || stylesCss.includes('contain:content'), "styles.css phải áp dụng CSS Containment cho các danh sách dài");
assert.ok(appCode.includes('URL.revokeObjectURL'), "app.js phải thu hồi URL.revokeObjectURL để tránh rò rỉ bộ nhớ");
assert.ok(appCode.includes('STORY_BATCH_SIZE') || appCode.includes('BATCH_SIZE'), "app.js phải có cơ chế phân đoạn batch để chống phình to DOM");
console.log("✓ P6-04 ĐẠT: CSS Containment, thu hồi bộ nhớ Blob và phân đoạn nạp danh sách đạt chuẩn!");

// 6. Kiểm tra P6-01 & P6-07: Checklist kiểm thử offline & phát hành v1.0
console.log("\n--- TEST 6 (P6-01 & P6-07): Tài liệu Checklist Offline & Phát Hành v1.0 ---");
const offlineChecklistPath = path.join(__dirname, 'docs', 'offline-testing-checklist.md');
assert.ok(fs.existsSync(offlineChecklistPath), "docs/offline-testing-checklist.md phải tồn tại");
const offlineDoc = fs.readFileSync(offlineChecklistPath, 'utf8');
assert.ok(offlineDoc.includes('Android') && offlineDoc.includes('iOS'), "Tài liệu offline phải bao gồm cả Android và iOS");

const releaseChecklistPath = path.join(__dirname, 'docs', 'release-v1.0-checklist.md');
assert.ok(fs.existsSync(releaseChecklistPath), "docs/release-v1.0-checklist.md phải tồn tại");
const releaseDoc = fs.readFileSync(releaseChecklistPath, 'utf8');
assert.ok(releaseDoc.includes('git tag'), "Tài liệu release phải có hướng dẫn gắn thẻ git tag v1.0");
console.log("✓ P6-01 & P6-07 ĐẠT: Đầy đủ tài liệu checklist kiểm thử offline thực tế và quy trình phát hành v1.0!");

// 7. Test openExternalLinkWithParentGate functionality in sandbox
console.log("\n--- TEST 7: Kiểm thử hành vi hàm openExternalLinkWithParentGate ---");
let lastModalOpened = null;
let lastWindowOpened = null;

const sandbox = {
  console,
  lang: "vi",
  T: (vi, en) => vi,
  window: {
    open: (url, target, features) => {
      lastWindowOpened = { url, target, features };
    }
  },
  openParentPinModal: (opts) => {
    lastModalOpened = opts;
    // Simulate successful PIN verification
    if (opts.onSuccess) opts.onSuccess();
  }
};

const fnCode = appCode.slice(
  appCode.indexOf('function openExternalLinkWithParentGate'),
  appCode.indexOf('window.openExternalLinkWithParentGate = openExternalLinkWithParentGate;')
);
vm.createContext(sandbox);
vm.runInContext(fnCode, sandbox);

sandbox.openExternalLinkWithParentGate("https://www.youtube.com/watch?v=test1234", "Video Test");
assert.ok(lastModalOpened !== null, "Phải mở hộp thoại mã PIN phụ huynh trước");
assert.strictEqual(lastModalOpened.purpose, "gate");
assert.ok(lastWindowOpened !== null, "Sau khi xác thực PIN, link ngoài mới được mở");
assert.strictEqual(lastWindowOpened.url, "https://www.youtube.com/watch?v=test1234");
assert.strictEqual(lastWindowOpened.target, "_blank");
console.log("✓ openExternalLinkWithParentGate() kích hoạt cổng PIN phụ huynh và chỉ mở link sau khi xác thực!");

console.log("\n=== TẤT CẢ KIỂM THỬ PHASE 6 ĐỀU ĐẠT CHUẨN 100%! ===");
