// ============================================================================
// TEST SUITE: KIỂM TRA CHUẨN JSON SCHEMA CHO ACTIVITIES-DATA.JS
// 1. Kiểm tra cấu trúc activity.schema.json
// 2. Kiểm tra validateActivity() trên các bài học mẫu
// 3. Kiểm tra tính tương thích 100% của getActivitiesByTier()
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: CHUẨN HOÁ JSON SCHEMA ACTIVITIES DATA');
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

// 2. Kiểm tra hàm validateActivity và các hoạt động mẫu
console.log('\n--- TEST 2: Kiểm tra hàm validateActivity() và bài học mẫu ---');
const activitiesDataModule = require('./activities-data.js');
const { ACTIVITIES_DATA, validateActivity, getActivitiesByTier, getActivitiesBySubject } = activitiesDataModule;

assert(Array.isArray(ACTIVITIES_DATA), 'ACTIVITIES_DATA phải là mảng');
assert(typeof validateActivity === 'function', 'validateActivity phải là hàm');
assert(typeof getActivitiesByTier === 'function', 'getActivitiesByTier phải là hàm');

// Lấy các bài học mẫu theo chuẩn mới
const stdActs = ACTIVITIES_DATA.filter(a => a.id.startsWith('act_std_'));
assert(stdActs.length >= 4, 'Phải có ít nhất 4 bài học mẫu theo chuẩn mới');

stdActs.forEach(act => {
  const res = validateActivity(act);
  assert(res.valid, `Bài học ${act.id} phải hợp lệ theo Schema. Lỗi: ${res.errors.join(', ')}`);
  console.log(`✔ Hoạt động '${act.id}' (${act.type} / ${act.subject}): HỢP LỆ THEO SCHEMA`);
});

// 3. Kiểm tra tính tương thích của getActivitiesByTier
console.log('\n--- TEST 3: Kiểm tra tính tương thích của getActivitiesByTier() ---');
const tiers = ['preschool', 'grade1_2', 'grade3_5'];
tiers.forEach(tier => {
  const acts = getActivitiesByTier(tier);
  assert(Array.isArray(acts) && acts.length > 0, `getActivitiesByTier('${tier}') phải trả về danh sách`);
  acts.forEach(a => assert.strictEqual(a.ageTier, tier));
  console.log(`✔ getActivitiesByTier('${tier}'): Trả về ${acts.length} bài học`);
});

// 4. Kiểm tra lọc theo môn học mới (science, skills)
console.log('\n--- TEST 4: Kiểm tra lọc môn mới (science, skills) ---');
const sciActs = getActivitiesBySubject('grade3_5', 'science');
assert(sciActs.length > 0, 'Phải tìm thấy bài học môn science cho grade3_5');
console.log(`✔ getActivitiesBySubject('grade3_5', 'science'): ${sciActs.length} bài học`);

const skillActs = getActivitiesBySubject('preschool', 'skills');
assert(skillActs.length > 0, 'Phải tìm thấy bài học môn skills cho preschool');
console.log(`✔ getActivitiesBySubject('preschool', 'skills'): ${skillActs.length} bài học`);

console.log('\n================================================================');
console.log('  TẤT CẢ TEST SCHEMA VÀ TƯƠNG THÍCH ĐÃ VƯỢT QUA 100%! ');
console.log('================================================================');
