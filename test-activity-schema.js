// ============================================================================
// TEST SUITE: KIỂM TRA 10 BÀI HỌC VIDEO QUIZ & CHUẨN JSON SCHEMA
// 1. Kiểm tra cấu trúc activity.schema.json
// 2. Kiểm tra validateActivity() trên 10 bài học Video Quiz
// 3. Kiểm tra tính tương thích 100% của getActivitiesByTier()
// 4. Kiểm tra mỗi bài có đúng 3 câu hỏi trắc nghiệm tương tác
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: 10 BÀI HỌC VIDEO QUIZ & JSON SCHEMA');
console.log('================================================================\n');

// 1. Kiểm tra file activity.schema.json
console.log('--- TEST 1: Đọc và phân tích activity.schema.json ---');
assert(fs.existsSync('activity.schema.json'), 'File activity.schema.json phải tồn tại');
const schemaContent = fs.readFileSync('activity.schema.json', 'utf8');
const schema = JSON.parse(schemaContent);
assert.strictEqual(schema.type, 'object', 'Schema type phải là object');
assert(Array.isArray(schema.required), 'Schema phải có trường required');

const requiredFields = [
  'id', 'title', 'titleEn', 'ageTier', 'subject',
  'type', 'mediaSource', 'learningObjective', 'difficulty', 'content'
];
requiredFields.forEach(f => {
  assert(schema.required.includes(f), `Schema phải yêu cầu trường '${f}'`);
});
console.log('✔ activity.schema.json hợp lệ và đầy đủ 10 trường theo yêu cầu!');

// 2. Kiểm tra hàm validateActivity và 10 Video Quiz
console.log('\n--- TEST 2: Kiểm tra 10 bài học Video Quiz chuẩn GDPT 2018 ---');
const activitiesDataModule = require('./activities-data.js');
const { ACTIVITIES_DATA, validateActivity, getActivitiesByTier, getActivitiesBySubject } = activitiesDataModule;

assert(Array.isArray(ACTIVITIES_DATA), 'ACTIVITIES_DATA phải là mảng');
assert(typeof validateActivity === 'function', 'validateActivity phải là hàm');
assert(typeof getActivitiesByTier === 'function', 'getActivitiesByTier phải là hàm');

// Lấy 10 bài học Video Quiz
const vqActs = ACTIVITIES_DATA.filter(a => a.id.startsWith('act_vq_'));
assert.strictEqual(vqActs.length, 10, 'Phải có đúng 10 bài học Video Quiz');

vqActs.forEach((act, idx) => {
  const res = validateActivity(act);
  assert(res.valid, `Bài học ${act.id} phải hợp lệ theo Schema. Lỗi: ${res.errors.join(', ')}`);
  assert.strictEqual(act.type, 'video_quiz', 'Loại bài học phải là video_quiz');
  assert.strictEqual(act.mediaSource.type, 'youtube', 'MediaSource phải là youtube');
  assert(act.mediaSource.url.includes('youtube.com'), 'Link video phải là YouTube');
  assert.strictEqual(act.content.length, 3, 'Mỗi bài phải có đúng 3 câu hỏi trắc nghiệm');
  
  act.content.forEach((q, qIdx) => {
    assert(q.question && q.question.length > 5, `Câu hỏi ${qIdx + 1} phải rõ ràng`);
    assert(Array.isArray(q.options) && q.options.length >= 3, `Câu hỏi ${qIdx + 1} phải có ít nhất 3 lựa chọn`);
    assert(q.correctAnswer !== undefined, `Câu hỏi ${qIdx + 1} phải có đáp án đúng`);
    assert(q.explanation && q.explanation.length > 5, `Câu hỏi ${qIdx + 1} phải có phần giải thích`);
  });

  console.log(`✔ [${idx + 1}/10] '${act.id}' (${act.ageTier} / ${act.subject}): Đầy đủ 3 câu hỏi, HỢP LỆ SCHEMA 100%`);
});

// 3. Kiểm tra phân bổ theo 3 cấp độ
console.log('\n--- TEST 3: Kiểm tra phân bổ 3 cấp độ ---');
const preVq = vqActs.filter(a => a.ageTier === 'preschool');
const g12Vq = vqActs.filter(a => a.ageTier === 'grade1_2');
const g35Vq = vqActs.filter(a => a.ageTier === 'grade3_5');

assert.strictEqual(preVq.length, 3, 'Mầm non phải có 3 bài nhận biết con vật');
assert.strictEqual(g12Vq.length, 4, 'Lớp 1-2 phải có 4 bài đánh vần cùng cô Lan Anh');
assert.strictEqual(g35Vq.length, 3, 'Lớp 3-5 phải có 3 bài khám phá vũ trụ');
console.log('✔ Phân bổ chuẩn: 3 bài Mầm non, 4 bài Lớp 1-2, 3 bài Lớp 3-5');

// 4. Kiểm tra tính tương thích của getActivitiesByTier
console.log('\n--- TEST 4: Kiểm tra tính tương thích của getActivitiesByTier() ---');
const tiers = ['preschool', 'grade1_2', 'grade3_5'];
tiers.forEach(tier => {
  const acts = getActivitiesByTier(tier);
  assert(Array.isArray(acts) && acts.length > 0, `getActivitiesByTier('${tier}') phải trả về danh sách`);
  acts.forEach(a => assert.strictEqual(a.ageTier, tier));
  console.log(`✔ getActivitiesByTier('${tier}'): Trả về ${acts.length} bài học`);
});

console.log('\n================================================================');
console.log('  TẤT CẢ 10 BÀI HỌC VIDEO QUIZ ĐẠT CHUẨN 100% THÀNH CÔNG! ');
console.log('================================================================');
