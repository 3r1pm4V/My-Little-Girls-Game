/**
 * test-trace-strokes.js
 * Kiểm thử module trace và dữ liệu nét viết cơ bản trong Tiền tiểu học / Chuẩn bị vào lớp 1
 */

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TẬP VIẾT CÁC NÉT CƠ BẢN & NHÓM CHỮ CÁI       ');
console.log('================================================================');

// 1. Nạp dữ liệu từ data-vn.js
const dataVn = require('./data-vn.js');
const { VN_STROKE_GROUPS, VN_STROKES, VN_LETTER_GROUPS, LETTER_STROKE_GUIDES } = dataVn;

console.log('\n--- TEST 1: Kiểm tra 5 nhóm nét cơ bản (VN_STROKE_GROUPS) ---');
assert.ok(Array.isArray(VN_STROKE_GROUPS), 'VN_STROKE_GROUPS phải là mảng');
assert.strictEqual(VN_STROKE_GROUPS.length, 5, 'Phải có đúng 5 nhóm nét cơ bản');

const expectedGroupIds = ['thang', 'cong', 'moc', 'khuyet', 'that'];
expectedGroupIds.forEach(gid => {
  const g = VN_STROKE_GROUPS.find(x => x.id === gid);
  assert.ok(g, `Phải có nhóm nét id '${gid}'`);
  assert.ok(g.name && g.desc, `Nhóm ${gid} phải có name và desc`);
});
console.log('✔ Đầy đủ 5 nhóm nét: Thẳng, Cong, Móc, Khuyết, Thắt!');

console.log('\n--- TEST 2: Kiểm tra 14 nét viết chi tiết trong VN_STROKES ---');
assert.ok(Array.isArray(VN_STROKES), 'VN_STROKES phải là mảng');
assert.strictEqual(VN_STROKES.length, 14, 'VN_STROKES phải có đủ 14 nét');

VN_STROKES.forEach(s => {
  assert.ok(s.id, 'Mỗi nét phải có id');
  assert.ok(s.group, `Nét ${s.id} phải thuộc một nhóm`);
  assert.ok(expectedGroupIds.includes(s.group), `Nét ${s.id} có nhóm hợp lệ: ${s.group}`);
  assert.ok(s.svg && s.svg.includes('<svg') && s.svg.includes('</svg>'), `Nét ${s.id} phải có SVG hợp lệ`);
});

// Kiểm tra nét cong tròn kín, hở, móc, khuyết, thắt
assert.ok(VN_STROKES.some(s => s.id === 'so_thang'), 'Phải có nét sổ thẳng (đứng)');
assert.ok(VN_STROKES.some(s => s.id === 'ngang'), 'Phải có nét ngang');
assert.ok(VN_STROKES.some(s => s.id === 'xien_phai'), 'Phải có nét xiên phải');
assert.ok(VN_STROKES.some(s => s.id === 'xien_trai'), 'Phải có nét xiên trái');
assert.ok(VN_STROKES.some(s => s.id === 'cong_ho_phai'), 'Phải có nét cong hở phải');
assert.ok(VN_STROKES.some(s => s.id === 'cong_ho_trai'), 'Phải có nét cong hở trái');
assert.ok(VN_STROKES.some(s => s.id === 'cong_kin'), 'Phải có nét cong kín');
assert.ok(VN_STROKES.some(s => s.id === 'moc_xuoi'), 'Phải có nét móc xuôi');
assert.ok(VN_STROKES.some(s => s.id === 'moc_nguoc'), 'Phải có nét móc ngược');
assert.ok(VN_STROKES.some(s => s.id === 'moc_2_dau'), 'Phải có nét móc hai đầu');
assert.ok(VN_STROKES.some(s => s.id === 'khuyet_tren'), 'Phải có nét khuyết trên');
assert.ok(VN_STROKES.some(s => s.id === 'khuyet_duoi'), 'Phải có nét khuyết dưới');
assert.ok(VN_STROKES.some(s => s.id === 'that_dau'), 'Phải có nét thắt trên');
assert.ok(VN_STROKES.some(s => s.id === 'that_giua'), 'Phải có nét thắt giữa');
console.log('✔ Toàn bộ 14 nét cơ bản đều có SVG chính xác và phân nhóm chuẩn GDPT!');

console.log('\n--- TEST 3: Kiểm tra 5 nhóm chữ cái theo độ khó nét viết ---');
assert.ok(Array.isArray(VN_LETTER_GROUPS), 'VN_LETTER_GROUPS phải là mảng');
assert.strictEqual(VN_LETTER_GROUPS.length, 5, 'Phải có đủ 5 nhóm chữ cái');

// Nhóm 1 (nét cong): c, o, ô, ơ, e, ê, x
const g1 = VN_LETTER_GROUPS[0];
['c', 'o', 'ô', 'ơ', 'e', 'ê', 'x'].forEach(char => {
  assert.ok(g1.letters.includes(char), `Nhóm 1 phải chứa chữ '${char}'`);
});
console.log('✔ Nhóm 1 (Nét cong: c, o, ô, ơ, e, ê, x) chuẩn xác');

// Nhóm 2 (nét cong + thẳng): a, ă, â, d, đ, q
const g2 = VN_LETTER_GROUPS[1];
['a', 'ă', 'â', 'd', 'đ', 'q'].forEach(char => {
  assert.ok(g2.letters.includes(char), `Nhóm 2 phải chứa chữ '${char}'`);
});
console.log('✔ Nhóm 2 (Nét cong + thẳng: a, ă, â, d, đ, q) chuẩn xác');

// Nhóm 3 (nét móc): i, u, ư, t, p, y, n, m, v, r, s
const g3 = VN_LETTER_GROUPS[2];
['i', 'u', 'ư', 't', 'p', 'y', 'n', 'm', 'v', 'r', 's'].forEach(char => {
  assert.ok(g3.letters.includes(char), `Nhóm 3 phải chứa chữ '${char}'`);
});
console.log('✔ Nhóm 3 (Nét móc: i, u, ư, t, p, y, n, m, v, r, s) chuẩn xác');

// Nhóm 4 (nét khuyết): l, b, h, k
const g4 = VN_LETTER_GROUPS[3];
['l', 'b', 'h', 'k'].forEach(char => {
  assert.ok(g4.letters.includes(char), `Nhóm 4 phải chứa chữ '${char}'`);
});
console.log('✔ Nhóm 4 (Nét khuyết: l, b, h, k) chuẩn xác');

// Nhóm 5 (nét phối hợp): g, v
const g5 = VN_LETTER_GROUPS[4];
['g', 'v'].forEach(char => {
  assert.ok(g5.letters.includes(char), `Nhóm 5 phải chứa chữ '${char}'`);
});
console.log('✔ Nhóm 5 (Nét phối hợp: g, v) chuẩn xác');

console.log('\n--- TEST 4: Hướng dẫn viết chữ "a" (nét cong tròn trước, nét móc ngược sau) ---');
assert.ok(LETTER_STROKE_GUIDES, 'Phải có bảng LETTER_STROKE_GUIDES');
const guideA = LETTER_STROKE_GUIDES['a'];
assert.ok(guideA, 'Phải có hướng dẫn riêng cho chữ "a"');
assert.strictEqual(guideA.strokesCount, 2, 'Chữ "a" cấu tạo từ 2 nét');

// Bước 1 là nét cong kín (cong tròn)
assert.strictEqual(guideA.strokes[0].step, 1);
assert.ok(guideA.strokes[0].name.toLowerCase().includes('cong'), 'Nét 1 của chữ a phải là nét cong');

// Bước 2 là nét móc ngược
assert.strictEqual(guideA.strokes[1].step, 2);
assert.ok(guideA.strokes[1].name.toLowerCase().includes('móc ngược'), 'Nét 2 của chữ a phải là nét móc ngược');

// Quy tắc bằng lời dặn
assert.ok(guideA.ruleVi.includes('nét cong tròn') && guideA.ruleVi.includes('nét móc ngược'), 'Quy tắc chữ a phải nêu rõ nét cong tròn trước, nét móc ngược sau');
assert.ok(guideA.svgGuide && guideA.svgGuide.includes('<svg') && guideA.svgGuide.includes('Nét cong tròn'), 'SVG Guide của chữ a phải hiển thị trực quan nét 1 và nét 2');
console.log('✔ Chữ "a" được thiết lập quy tắc sư phạm chuẩn: Viết nét cong tròn trước, nét móc ngược sau!');

console.log('\n--- TEST 5: Kiểm tra tích hợp trong app.js (trace module) ---');
const appCode = fs.readFileSync('app.js', 'utf8');
assert.ok(appCode.includes('VN_LETTER_GROUPS'), 'app.js phải sử dụng dữ liệu VN_LETTER_GROUPS');
assert.ok(appCode.includes('LETTER_STROKE_GUIDES'), 'app.js phải sử dụng LETTER_STROKE_GUIDES');
assert.ok(appCode.includes('nét cong tròn trước') || appCode.includes('strokeGuide.ruleVi'), 'app.js phải có hướng dẫn viết nét cong tròn trước');
assert.ok(appCode.includes('tabsConfig'), 'app.js phải có cấu hình tab phân loại nét & nhóm chữ');

console.log('✔ app.js tích hợp đầy đủ module trace với 5 nhóm chữ và 14 nét cơ bản!');

console.log('\n================================================================');
console.log('  TẤT CẢ KIỂM THỬ TRACE & NÉT VIẾT ĐẠT CHUẨN 100%!              ');
console.log('================================================================');
