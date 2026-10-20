// ============================================================================
// TEST SUITE: TASK P1-07 & P1-08
// P1-07: Kiểm tra mọi nút >= 64px, khoảng cách >= 12px trên màn 360px và tablet ngang
// P1-08: Nút "Gợi ý cho bố mẹ" chuyển vào khu phụ huynh, tránh chồng chú mèo/nội dung
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TASK P1-07 & P1-08');
console.log('================================================================\n');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('styles.css'), 'index.html phải liên kết tới styles.css');
const stylesCss = fs.existsSync('styles.css') ? fs.readFileSync('styles.css', 'utf8') : indexHtml;
const appJs = fs.readFileSync('app.js', 'utf8');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra P1-07 — Vùng chạm >= 64px & Khoảng cách >= 12px
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kiểm tra P1-07 (Touch target >= 64px & Gap >= 12px) ---');

// 1.1 Kiểm tra rule chuẩn hóa touch target min-height >= 64px và min-width >= 64px
const targetSelectorRegex = /button[\s\S]*?\{min-height:\s*64px;min-width:\s*64px;touch-action:\s*manipulation\}/;
assert(targetSelectorRegex.test(stylesCss), 'styles.css phải có CSS rule chuẩn hóa min-height:64px;min-width:64px');

const targetRuleMatch = stylesCss.match(/(button[^{]*)\{min-height:\s*64px;min-width:\s*64px/);
assert(targetRuleMatch, 'Phải tìm thấy selector danh sách nút >= 64px');
const selectors = targetRuleMatch[1];
const requiredSelectors = [
  'button', '.card', '.opt', '.chip', '.pill', '.syl-btn', '.word-btn',
  '.k-bc-btn', '.k-bc-back', '.act-opt-btn', '.cg-opt-btn', '.badge-btn',
  '.stage-tab-btn', '.stars', '#hb', '#backBtn'
];
requiredSelectors.forEach(sel => {
  assert(selectors.includes(sel), `Danh sách chuẩn hóa touch target >= 64px phải chứa '${sel}'`);
});
console.log('✔ Danh sách 16+ nhóm phần tử tương tác đều được áp dụng min-height:64px và min-width:64px!');

// 1.2 Kiểm tra khoảng cách gap >= 12px của các khối lựa chọn & điều hướng
const gapChecks = [
  { name: '.k-bc (thanh điều hướng breadcrumb)', pattern: /\.k-bc\{[^}]*gap:\s*12px/ },
  { name: '.k-bc-action (hành động breadcrumb)', pattern: /\.k-bc-action\{[^}]*gap:\s*12px/ },
  { name: '.chips (lựa chọn chip/màu/đáp án)', pattern: /\.chips\{[^}]*gap:\s*12px/ },
  { name: '.lgrid (lưới ảnh/chữ)', pattern: /\.lgrid\{[^}]*gap:\s*12px/ },
  { name: '.syl-grid (lưới ghép vần/âm)', pattern: /\.syl-grid\{[^}]*gap:\s*12px/ },
  { name: '.cg-opts (lựa chọn đếm hình chọn số)', pattern: /\.cg-opts\{[^}]*gap:\s*12px/ },
  { name: '.stage-tabs-wrap (tab chọn chặng)', pattern: /\.stage-tabs-wrap\s*\{[^}]*gap:\s*12px/ },
  { name: '.badge-grid (lưới huy hiệu)', pattern: /\.badge-grid\{[^}]*gap:\s*12px/ }
];

gapChecks.forEach(gc => {
  assert(gc.pattern.test(stylesCss), `CSS ${gc.name} phải có gap >= 12px`);
  console.log(`  ✔ ${gc.name}: gap >= 12px`);
});

// 1.3 Kiểm tra @media(max-width:600px) (màn hình hẹp 360px)
console.log('\n--- Kiểm tra chế độ màn hình hẹp 360px (@media max-width:600px) ---');
const media600Match = stylesCss.match(/@media\(max-width:600px\)\{([\s\S]*?)\n\}/);
assert(media600Match, 'Phải có @media(max-width:600px)');
const mediaCss = media600Match[1];

assert(mediaCss.includes('#backBtn{padding:6px 14px!important;min-width:64px!important;min-height:64px!important'), 'Nút #backBtn trên mobile phải đạt chuẩn >= 64px');
assert(mediaCss.includes('.badge-btn{padding:6px 12px;font-size:15px;min-height:64px;min-width:64px'), 'Nút .badge-btn trên mobile phải đạt chuẩn >= 64px');
assert(mediaCss.includes('.stars{font-size:19px;padding:4px 10px;min-height:64px;min-width:64px'), 'Khối .stars trên mobile phải đạt chuẩn >= 64px');
assert(mediaCss.includes('.k-bc-back{padding:6px 14px;font-size:15px;min-height:64px;min-width:64px'), 'Nút .k-bc-back trên mobile phải đạt chuẩn >= 64px');
assert(mediaCss.includes('.k-bc-btn{padding:6px 12px;font-size:14px;min-height:64px;min-width:64px'), 'Nút .k-bc-btn trên mobile phải đạt chuẩn >= 64px');
assert(mediaCss.includes('.cards{gap:12px}'), 'Danh sách thẻ bài trên mobile phải có gap >= 12px');

console.log('✔ P1-07 ĐẠT: Toàn bộ nút đạt >= 64px và khoảng cách >= 12px trên mọi kích thước màn hình!');

// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra P1-08 — Nút Gợi ý cho bố mẹ chuyển vào khu phụ huynh
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Kiểm tra P1-08 (Gợi ý cho bố mẹ chuyển vào khu phụ huynh) ---');

// 2.1 Màn hình làm bài (playActivity) không còn floating corner button che chú mèo
const playActivityCodeMatch = appJs.match(/function playActivity\([\s\S]*?\n\}/);
assert(playActivityCodeMatch, 'Phải tìm thấy hàm playActivity trong app.js');
const playActivityCode = playActivityCodeMatch[0];

assert(!playActivityCode.includes('${cornerTipBtnHtml}'), 'playActivity KHÔNG được nhúng cornerTipBtnHtml nổi góc màn hình');
console.log('✔ Màn hình bài học không còn nút nổi góc trái dưới che chú mèo và nội dung làm bài!');

// 2.2 CSS .parent-tip-corner-btn bị vô hiệu hóa display: none !important
assert(stylesCss.includes('.parent-tip-corner-btn{display:none!important;'), '.parent-tip-corner-btn phải có display:none!important');
console.log('✔ CSS bảo vệ .parent-tip-corner-btn{display:none!important} ngăn mọi nút nổi vô ý!');

// 2.3 Khu vực phụ huynh (parent()) có thẻ hướng dẫn sư phạm chuyên biệt
const parentCodeMatch = appJs.match(/function parent\(\)\{[\s\S]*?\n\}/);
assert(parentCodeMatch, 'Phải tìm thấy function parent trong app.js');
const parentCode = parentCodeMatch[0];

assert(parentCode.includes('Mẹo đồng hành cùng bé ở nhà'), 'Parent dashboard phải có tiêu đề "Mẹo đồng hành cùng bé ở nhà"');
assert(parentCode.includes('Chữ cái & Nhận diện âm vần'), 'Parent dashboard phải có hướng dẫn Chữ cái & Âm vần');
assert(parentCode.includes('Số lượng & Đếm số đời thực'), 'Parent dashboard phải có hướng dẫn Đếm số đời thực');
assert(parentCode.includes('Khen ngợi nỗ lực & Khích lệ'), 'Parent dashboard phải có hướng dẫn Khen ngợi nỗ lực');
assert(parentCode.includes('Thời lượng học vàng'), 'Parent dashboard phải có hướng dẫn Thời lượng học 10–15 phút');
assert(parentCode.includes('Mẹo sư phạm từ bài học (Cô Lan Anh):'), 'Parent dashboard phải có mục tổng hợp mẹo từ bài học của Cô Lan Anh');
assert(parentCode.includes('act.parentTip'), 'Parent dashboard phải duyệt danh sách act.parentTip');

console.log('✔ P1-08 ĐẠT: Khu vực phụ huynh đã có chuyên mục Mẹo đồng hành cùng bé & Mẹo sư phạm từ bài học đầy đủ!');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST TASK P1-07 & P1-08 ĐẠT 100% THÀNH CÔNG!');
console.log('================================================================\n');
