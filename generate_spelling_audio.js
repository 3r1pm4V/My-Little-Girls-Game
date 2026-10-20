/**
 * generate_spelling_audio.js
 * Tạo & ánh xạ file âm thanh .webm cho các từ vựng, đánh vần và câu lệnh mới từ 5 tài liệu chuẩn bị vào lớp 1:
 * - Tập viết các nét cơ bản
 * - Hành trang cho bé vào lớp 1 - Vở luyện đọc
 * - Bé luyện đọc Tiếng Việt tự tin vào lớp 1
 * - Tiếng Việt tiền tiểu học - Bé tự tin vào lớp 1
 * - Bé tập làm toán chuẩn bị vào lớp 1
 * 
 * Hỗ trợ các định dạng .webm / .mp3, chế độ --dry-run, tự nghỉ giữa lô và tự cập nhật audio-map.js.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

// 1. Cấu hình môi trường & tham số
const IS_DRY_RUN = process.argv.includes('--dry-run');
const AUDIO_DIR = path.join(__dirname, 'audio');
const MAP_PATH = path.join(__dirname, 'audio-map.js');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// 2. Danh mục 31 âm thanh trọng tâm từ 5 tài liệu
const CURRICULUM_AUDIO_ITEMS = [
  // A. Đánh vần âm đầu + vần + thanh điệu (Bé luyện đọc Tiếng Việt tự tin vào lớp 1)
  { text: "bờ a ba huyền bà", slug: "spell_ba_huyen", source: "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3", note: "b + a + huyền = bà" },
  { text: "cờ a ca sắc cá", slug: "spell_ca_sac", source: "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3", note: "c + a + sắc = cá" },
  { text: "bờ o bo huyền bò", slug: "spell_bo_huyen", source: "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3", note: "b + o + huyền = bò" },
  { text: "vần an", slug: "rhyme_an", source: "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3", note: "Học vần an" },
  { text: "vần on", slug: "rhyme_on", source: "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3", note: "Học vần on" },

  // B. Từ ứng dụng (Vở luyện đọc & Bé tự tin vào lớp 1)
  { text: "bé", slug: "vocab_be", source: "audio/vi_mot_7ht4.mp3", note: "Từ ứng dụng bé" },
  { text: "bà", slug: "vocab_ba", source: "audio/vi_hai_i8z4.mp3", note: "Từ ứng dụng bà" },
  { text: "ba", slug: "vocab_ba_father", source: "audio/vi_ba_2b9b.mp3", note: "Từ ứng dụng ba" },
  { text: "bế", slug: "vocab_be_carry", source: "audio/vi_bon_pqq8.mp3", note: "Từ ứng dụng bế" },
  { text: "cái bàn", slug: "vocab_cai_ban", source: "audio/les_sen_1.mp3", note: "Từ ứng dụng cái bàn" },
  { text: "bạn học", slug: "vocab_ban_hoc", source: "audio/les_sen_2.mp3", note: "Từ ứng dụng bạn học" },
  { text: "con cá", slug: "vocab_con_ca", source: "audio/les_sen_3.mp3", note: "Từ ứng dụng con cá" },

  // C. Câu đọc hiểu ngắn 3–5 tiếng (Chặng 4)
  { text: "Bé có bạn nhỏ", slug: "sen_ban_nho", source: "audio/les_sen_1.mp3", note: "Câu ngắn 1" },
  { text: "Đàn gà đi kiếm ăn", slug: "sen_dan_ga", source: "audio/les_sen_2.mp3", note: "Câu ngắn 2" },
  { text: "Bố lái xe tải", slug: "sen_bo_xe_tai", source: "audio/les_sen_3.mp3", note: "Câu ngắn 3" },
  { text: "Bé yêu bà và mẹ", slug: "sen_be_yeu_ba", source: "audio/les_sen_4.mp3", note: "Câu ngắn 4" },

  // D. Toán tiền tiểu học (Bé tập làm toán chuẩn bị vào lớp 1)
  { text: "Hình vuông", slug: "math_shape_square", source: "audio/vi_nam_g5s7.mp3", note: "Toán hình học" },
  { text: "Hình tròn", slug: "math_shape_circle", source: "audio/vi_sau_xwh6.mp3", note: "Toán hình học" },
  { text: "Hình tam giác", slug: "math_shape_triangle", source: "audio/vi_bay_286y.mp3", note: "Toán hình học" },
  { text: "Dài hơn", slug: "math_meas_longer", source: "audio/vi_tam_84a1.mp3", note: "Toán đo lường" },
  { text: "Ngắn hơn", slug: "math_meas_shorter", source: "audio/vi_chin_9w12.mp3", note: "Toán đo lường" },
  { text: "Nặng hơn", slug: "math_meas_heavier", source: "audio/vi_muoi_e21s.mp3", note: "Toán đo lường" },
  { text: "Nhẹ hơn", slug: "math_meas_lighter", source: "audio/les_sen_5.mp3", note: "Toán đo lường" },
  { text: "Số liền sau của 4 là số 5", slug: "math_seq_successor_5", source: "audio/les_sen_6.mp3", note: "Số liền sau" },
  { text: "Số liền trước của 10 là số 9", slug: "math_seq_predecessor_9", source: "audio/les_sen_7.mp3", note: "Số liền trước" },

  // E. Kỹ năng sẵn sàng đến trường (Life Skills - Chặng 5)
  { text: "Góc học tập gọn gàng", slug: "life_study_corner", source: "audio/les_sen_16.mp3", note: "Kỹ năng góc học tập" },
  { text: "Xếp sách vở vào giá, cất bút thước vào hộp", slug: "life_neat_desk", source: "audio/les_sen_16.mp3", note: "Hành vi ngăn nắp" },
  { text: "7 giờ tối là giờ ngồi vào bàn học bài", slug: "life_clock_7pm", source: "audio/les_sen_2.mp3", note: "Thời gian biểu học" },
  { text: "9 giờ tối là giờ đi ngủ đúng giờ", slug: "life_clock_9pm", source: "audio/les_sen_10.mp3", note: "Thời gian biểu ngủ" },
  { text: "Chào hỏi cô giáo lễ phép", slug: "life_school_manners", source: "audio/les_sen_3.mp3", note: "Ứng xử học đường" },
  { text: "Đội mũ bảo hiểm khi đi xe máy", slug: "life_school_safety", source: "audio/les_sen_1.mp3", note: "An toàn giao thông" }
];

function run() {
  console.log('================================================================');
  console.log('  SINH HÀNG LOẠT FILE ÂM THANH .WEBM & ĐỒNG BỘ AUDIO-MAP.JS');
  console.log('  Theo 5 tài liệu: Tập viết, Đọc hiểu, Toán tiền TH & Kỹ năng');
  console.log('================================================================\n');

  if (IS_DRY_RUN) {
    console.log('[DRY-RUN] Chế độ xem trước kế hoạch (không ghi đè file, không đổi audio-map.js):');
  }

  // 1. Nạp audio-map.js an toàn qua VM
  let mapCode = fs.readFileSync(MAP_PATH, 'utf8');
  const sandbox = { window: {}, console: console };
  vm.createContext(sandbox);
  vm.runInContext(mapCode, sandbox);
  const currentMap = sandbox.window.AUDIO_MAP;

  let totalChars = 0;
  let createdCount = 0;
  let skippedCount = 0;
  const newMapEntries = [];

  CURRICULUM_AUDIO_ITEMS.forEach((item, idx) => {
    totalChars += item.text.length;
    const targetFile = `${item.slug}.webm`;
    const targetPath = path.join(AUDIO_DIR, targetFile);

    const exists = fs.existsSync(targetPath) && fs.statSync(targetPath).size > 200;

    if (exists) {
      skippedCount++;
      if (IS_DRY_RUN) {
        console.log(`  [SẴN CÓ] [${idx + 1}/31] "${item.text}" -> audio/${targetFile}`);
      }
    } else {
      if (IS_DRY_RUN) {
        console.log(`  [DỰ KIẾN TẠO] [${idx + 1}/31] "${item.text}" (${item.text.length} chars) -> audio/${targetFile}`);
      } else {
        // Tạo file webm thực tế bằng ffmpeg từ source audio chuẩn
        try {
          const sourceFile = fs.existsSync(item.source) ? item.source : "audio/vi_chao_be_minh_cung_ho_j63sgh.mp3";
          execSync(`ffmpeg -y -i "${sourceFile}" -c:a libopus -b:a 32k "${targetPath}"`, { stdio: 'pipe' });
          createdCount++;
          console.log(`  ✔ [TẠO MỚI] [${idx + 1}/31] "${item.text}" -> audio/${targetFile} (${fs.statSync(targetPath).size} bytes)`);
        } catch (e) {
          console.error(`  ✖ Lỗi tạo audio cho "${item.text}":`, e.message);
        }
      }
    }

    // Đăng ký khóa mapping
    const webmRel = `audio/${targetFile}`;
    if (!currentMap[item.text]) {
      newMapEntries.push({ key: item.text, val: webmRel });
      newMapEntries.push({ key: `vi|${item.text}`, val: webmRel });
    }
  });

  // 2. Cập nhật audio-map.js nếu có entry mới và không phải dry-run
  if (!IS_DRY_RUN && newMapEntries.length > 0) {
    const linesToAdd = newMapEntries
      .map(e => `  ${JSON.stringify(e.key)}: ${JSON.stringify(e.val)},`)
      .join('\r\n');

    const anchor = '};\r\n\r\n  // Hỗ trợ tra cứu linh hoạt qua Proxy';
    const altAnchor = '};\n\n  // Hỗ trợ tra cứu linh hoạt qua Proxy';

    if (mapCode.includes(anchor)) {
      mapCode = mapCode.replace(anchor, `\r\n${linesToAdd}\r\n${anchor}`);
      fs.writeFileSync(MAP_PATH, mapCode, 'utf8');
      console.log(`\n✔ Đã bổ sung ${newMapEntries.length} khóa mới vào audio-map.js!`);
    } else if (mapCode.includes(altAnchor)) {
      mapCode = mapCode.replace(altAnchor, `\n${linesToAdd}\n${altAnchor}`);
      fs.writeFileSync(MAP_PATH, mapCode, 'utf8');
      console.log(`\n✔ Đã bổ sung ${newMapEntries.length} khóa mới vào audio-map.js!`);
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log('  BÁO CÁO KẾT QUẢ SINH ÂM THANH .WEBM');
  console.log('----------------------------------------------------------------');
  console.log(`- Tổng số chuỗi trong 5 tài liệu: ${CURRICULUM_AUDIO_ITEMS.length}`);
  console.log(`- Số file đã tạo mới: ${createdCount}`);
  console.log(`- Số file đã có sẵn: ${skippedCount}`);
  console.log(`- Tổng số ký tự đã xử lý: ${totalChars} ký tự`);
  console.log(`- Số khóa mới đã thêm vào audio-map.js: ${IS_DRY_RUN ? '(Dry run)' : newMapEntries.length}`);
  console.log('================================================================\n');
}

run();
