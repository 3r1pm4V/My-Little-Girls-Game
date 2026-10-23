// scripts/build-complete-activities.js
// Biên soạn và mở rộng toàn diện bộ bài học Lớp 1-2 và Lớp 3-5 theo chuẩn GDPT 2018
const fs = require('fs');
const path = require('path');

const oldModule = require('../temp-old.js');
const baseActivities = oldModule.ACTIVITIES_DATA;

console.log(`Loaded ${baseActivities.length} base activities.`);

// 46 BÀI TẬP MỚI CHUẨN GDPT 2018 (CÁNH DIỀU, KẾT NỐI TRI THỨC, GLOBAL SUCCESS)
const newActivities = [
  // ==========================================
  // LỚP 1–2: TOÁN HỌC (MATH)
  // ==========================================
  {
    id: "act_g12_math_04",
    title: "Phép trừ có nhớ phạm vi 20: 15 - 8 = ? 🧮",
    titleEn: "Subtraction within 20: 15 - 8",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.subtraction.within20",
    skills: ["math.subtraction.within20"],
    learningObjective: "Thực hiện phép trừ có nhớ trong phạm vi 20",
    difficulty: 2,
    type: "fill_blank",
    reward: { stars: 3 },
    parentTip: "Bố mẹ hướng dẫn bé tách số: 15 - 8 = (15 - 5) - 3 = 10 - 3 = 7 nhé!",
    content: {
      question: "15 trừ 8 bằng mấy?",
      questionEn: "What is 15 minus 8?",
      template: "15 - 8 = [ ? ]",
      options: [
        { id: "opt_6", text: "6" },
        { id: "opt_7", text: "7" },
        { id: "opt_8", text: "8" },
        { id: "opt_9", text: "9" }
      ],
      correctAnswer: "opt_7",
      explanation: "Chính xác! 15 - 8 = 7. Bé làm phép trừ qua 10 rất xuất sắc! 🌟"
    }
  },
  {
    id: "act_g12_math_05",
    title: "Phép cộng trong phạm vi 100: 34 + 25 = ? 🔢",
    titleEn: "Addition within 100: 34 + 25",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.addition.within100",
    skills: ["math.addition.within100"],
    learningObjective: "Cộng các số có hai chữ số không nhớ trong phạm vi 100",
    difficulty: 2,
    type: "fill_blank",
    reward: { stars: 3 },
    parentTip: "Bố mẹ nhắc bé cộng hàng đơn vị trước (4 + 5 = 9), sau đó cộng hàng chục (3 + 2 = 5) nhé!",
    content: {
      question: "34 cộng 25 bằng bao nhiêu?",
      questionEn: "What is 34 plus 25?",
      template: "34 + 25 = [ ? ]",
      options: [
        { id: "opt_57", text: "57" },
        { id: "opt_58", text: "58" },
        { id: "opt_59", text: "59" },
        { id: "opt_60", text: "60" }
      ],
      correctAnswer: "opt_59",
      explanation: "Chính xác! 4 + 5 = 9, 3 + 2 = 5 -> Kết quả là 59! 🌟"
    }
  },
  {
    id: "act_g12_math_06",
    title: "Bảng nhân 2: 2 × 4 = ? ✌️",
    titleEn: "Multiplication Table 2: 2 × 4",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "math",
    skill: "math.multiplication.table2",
    skills: ["math.multiplication.table2"],
    learningObjective: "Ghi nhớ và áp dụng bảng nhân 2 trong Toán lớp 2",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Bố mẹ gợi ý cho bé: 2 nhân 4 tức là 2 được lấy 4 lần (2 + 2 + 2 + 2 = 8).",
    content: {
      question: "2 nhân 4 bằng mấy?",
      questionEn: "What is 2 multiplied by 4?",
      options: [
        { id: "opt_6", text: "6" },
        { id: "opt_8", text: "8" },
        { id: "opt_10", text: "10" }
      ],
      correctAnswer: "opt_8",
      explanation: "Đúng rồi! 2 × 4 = 8. Bé nhớ bảng nhân 2 rất giỏi! 🌟"
    }
  },
  {
    id: "act_g12_math_07",
    title: "Bảng nhân 5: 5 × 6 = ? 🖐️",
    titleEn: "Multiplication Table 5: 5 × 6",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "math",
    skill: "math.multiplication.table5",
    skills: ["math.multiplication.table5"],
    learningObjective: "Ghi nhớ và vận dụng bảng nhân 5 trong Toán lớp 2",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Bố mẹ chỉ bé mẹo đếm cách 5: 5, 10, 15, 20, 25, 30!",
    content: {
      question: "5 nhân 6 bằng bao nhiêu?",
      questionEn: "What is 5 times 6?",
      options: [
        { id: "opt_25", text: "25" },
        { id: "opt_30", text: "30" },
        { id: "opt_35", text: "35" }
      ],
      correctAnswer: "opt_30",
      explanation: "Chính xác! 5 × 6 = 30. Bé thuộc bảng cửu chương 5 rồi đấy! 🌟"
    }
  },
  {
    id: "act_g12_math_08",
    title: "Bảng chia 2: Chia kẹo cho hai bạn 🍬",
    titleEn: "Division by 2: Share Candies",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "math",
    skill: "math.division.table2",
    skills: ["math.division.table2"],
    learningObjective: "Làm quen với phép chia 2 và chia đều đồ vật",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Có 10 cái kẹo chia đều cho 2 bạn, mỗi bạn nhận được một nửa số kẹo.",
    content: {
      question: "Có 10 chiếc kẹo chia đều cho 2 bạn, hỏi mỗi bạn được mấy chiếc kẹo?",
      questionEn: "10 candies shared equally between 2 friends, how many does each get?",
      options: [
        { id: "opt_4", text: "4 chiếc kẹo" },
        { id: "opt_5", text: "5 chiếc kẹo (10 ÷ 2 = 5)" },
        { id: "opt_6", text: "6 chiếc kẹo" }
      ],
      correctAnswer: "opt_5",
      explanation: "Rất giỏi! 10 chia 2 bằng 5. Mỗi bạn được 5 chiếc kẹo! 🌟"
    }
  },
  {
    id: "act_g12_math_09",
    title: "Tìm số hạng chưa biết: ___ + 15 = 20 ❓",
    titleEn: "Find Missing Addend",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "math",
    skill: "math.algebra.missing_term",
    skills: ["math.algebra.missing_term"],
    learningObjective: "Tìm số hạng chưa biết: Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết",
    difficulty: 2,
    type: "fill_blank",
    reward: { stars: 3 },
    parentTip: "Quy tắc Toán lớp 2: Số hạng = Tổng - Số hạng đã biết (20 - 15 = 5).",
    content: {
      question: "Số nào cộng với 15 thì bằng 20?",
      questionEn: "Which number plus 15 equals 20?",
      template: "[ ? ] + 15 = 20",
      options: [
        { id: "opt_4", text: "4" },
        { id: "opt_5", text: "5" },
        { id: "opt_6", text: "6" }
      ],
      correctAnswer: "opt_5",
      explanation: "Chính xác! 5 + 15 = 20. Ta lấy 20 - 15 = 5! 🌟"
    }
  },
  {
    id: "act_g12_math_10",
    title: "Đo độ dài: Đơn vị Xăng-ti-mét (cm) 📏",
    titleEn: "Measurement: Centimeter (cm)",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.measurement.length_cm",
    skills: ["math.measurement.length_cm"],
    learningObjective: "Nhận biết đơn vị đo độ dài xăng-ti-mét (cm) và cách dùng thước kẻ",
    difficulty: 1,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Bố mẹ nhắc bé: Đặt đầu bút chì trùng với vạch số 0 của thước kẻ nhé!",
    content: {
      question: "Chiếc bút chì đặt từ vạch số 0 đến vạch số 8 trên thước kẻ dài bao nhiêu cm?",
      questionEn: "A pencil placed from mark 0 to mark 8 on a ruler is how many cm long?",
      options: [
        { id: "opt_6", text: "6 cm" },
        { id: "opt_7", text: "7 cm" },
        { id: "opt_8", text: "8 cm" }
      ],
      correctAnswer: "opt_8",
      explanation: "Đúng rồi! Chiếc bút chì dài đúng 8 xăng-ti-mét (8 cm)! 🌟"
    }
  },
  {
    id: "act_g12_math_11",
    title: "Xem đồng hồ: Giờ đúng trong ngày ⏰",
    titleEn: "Telling Time: O'clock",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.measurement.time_oclock",
    skills: ["math.measurement.time_oclock"],
    learningObjective: "Nhận biết giờ đúng: Kim ngắn chỉ giờ, kim dài chỉ số 12",
    difficulty: 1,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Khi kim dài chỉ đúng số 12, kim ngắn chỉ vào số nào thì đồng hồ chỉ đúng giờ đó.",
    content: {
      question: "Đồng hồ có kim ngắn chỉ số 3, kim dài chỉ số 12. Hỏi đồng hồ chỉ mấy giờ?",
      questionEn: "The short hand points to 3, the long hand points to 12. What time is it?",
      options: [
        { id: "opt_3", text: "3 giờ đúng (3:00)" },
        { id: "opt_12", text: "12 giờ đúng (12:00)" },
        { id: "opt_6", text: "6 giờ đúng (6:00)" }
      ],
      correctAnswer: "opt_3",
      explanation: "Chính xác! Kim ngắn chỉ số 3 và kim dài chỉ số 12 là 3 giờ đúng! 🌟"
    }
  },
  {
    id: "act_g12_math_12",
    title: "Hình học không gian: Khối lập phương và Khối hộp chữ nhật 📦",
    titleEn: "3D Shapes: Cube & Rectangular Prism",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.geometry.3d_shapes",
    skills: ["math.geometry.3d_shapes"],
    learningObjective: "Nhận biết khối lập phương (viên xúc xắc) và khối hộp chữ nhật (hộp sữa)",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Viên xúc xắc có 6 mặt hình vuông bằng nhau chính là khối lập phương bố mẹ nhé!",
    content: {
      question: "Đồ vật nào dưới đây có dạng Khối lập phương?",
      questionEn: "Which of the following objects has the shape of a Cube?",
      options: [
        { id: "opt_dice", text: "🎲 Viên xúc xắc" },
        { id: "opt_ball", text: "⚽ Quả bóng đá (Khối cầu)" },
        { id: "opt_can", text: "🥫 Lon sữa ngọt (Khối trụ)" }
      ],
      correctAnswer: "opt_dice",
      explanation: "Đúng rồi! Viên xúc xắc có 6 mặt hình vuông đều nhau, mang dạng khối lập phương! 🌟"
    }
  },
  {
    id: "act_g12_math_13",
    title: "Toán có lời văn: Vườn hoa của Mai 🌸",
    titleEn: "Word Problem: Mai's Garden",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "math",
    skill: "math.word_problem.addition",
    skills: ["math.word_problem.addition"],
    learningObjective: "Giải toán có lời văn bằng 1 phép tính cộng trong phạm vi 20",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Mai có 9 bông hoa, được tặng thêm 6 bông hoa. Phép tính là: 9 + 6 = 15.",
    content: {
      question: "Mai có 9 bông hoa hồng, mẹ tặng thêm cho Mai 6 bông hoa nữa. Hỏi Mai có tất cả bao nhiêu bông hoa?",
      questionEn: "Mai has 9 roses, mom gives her 6 more. How many roses does Mai have in total?",
      options: [
        { id: "opt_14", text: "14 bông hoa" },
        { id: "opt_15", text: "15 bông hoa (9 + 6 = 15)" },
        { id: "opt_16", text: "16 bông hoa" }
      ],
      correctAnswer: "opt_15",
      explanation: "Xuất sắc! 9 + 6 = 15. Mai có tất cả 15 bông hoa hồng xinh đẹp! 🌟"
    }
  },

  // ==========================================
  // LỚP 1–2: TIẾNG VIỆT & CHÍNH TẢ (VIETNAMESE)
  // ==========================================
  {
    id: "act_g12_vn_04",
    title: "Chính tả G hay GH: Ghế gỗ và Con gà 🪑🐓",
    titleEn: "Spelling Rule: G or GH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    skill: "vi.spelling.g_gh",
    skills: ["vi.spelling.g_gh"],
    learningObjective: "Ghi nhớ quy tắc GH đi với e, ê, i; G đi với a, o, u, ô, ơ, ư",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Mẹo vàng lớp 1: 'Gh' chỉ đi cùng ba chữ 'e, ê, i', còn lại đi với 'g' bố mẹ nhé!",
    content: {
      question: "Chọn chữ cái thích hợp điền vào chỗ trống: Chiếc ___ế gỗ (Ghế)",
      questionEn: "Fill in the blank: Chiếc ___ế gỗ (Wooden chair)",
      options: [
        { id: "opt_gh", text: "gh (Chiếc ghế gỗ)" },
        { id: "opt_g", text: "g (Chiếc gế gỗ)" },
        { id: "opt_k", text: "k (Chiếc kế gỗ)" }
      ],
      correctAnswer: "opt_gh",
      explanation: "Chính xác! 'Gh' luôn đi trước các nguyên âm 'e, ê, i' nên ta viết là 'chiếc ghế'! 🌟"
    }
  },
  {
    id: "act_g12_vn_05",
    title: "Chính tả NG hay NGH: Con nghé và Ngôi nhà 🐃🏠",
    titleEn: "Spelling Rule: NG or NGH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    skill: "vi.spelling.ng_ngh",
    skills: ["vi.spelling.ng_ngh"],
    learningObjective: "Nắm vững quy tắc chính tả phân biệt NG và NGH",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "'Ngh' luôn đứng trước 'e, ê, i' (ví dụ: con nghé, lắng nghe, nghỉ ngơi).",
    content: {
      question: "Chọn từ viết đúng chính tả tiếng Việt:",
      questionEn: "Choose the correct Vietnamese spelling:",
      options: [
        { id: "opt_nghe", text: "Con nghé (đúng quy tắc ngh + e)" },
        { id: "opt_nge", text: "Con ngé (sai chính tả)" },
        { id: "opt_ge", text: "Con gé (sai chính tả)" }
      ],
      correctAnswer: "opt_nghe",
      explanation: "Đúng rồi! Đi trước âm 'e' bắt buộc phải dùng 'ngh': Con nghé! 🌟"
    }
  },
  {
    id: "act_g12_vn_06",
    title: "Phân biệt S hay X: Hoa sen và Xe đạp 🌸🚲",
    titleEn: "Spelling Practice: S or X",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    skill: "vi.spelling.s_x",
    skills: ["vi.spelling.s_x"],
    learningObjective: "Phân biệt phụ âm đầu S và X trong các từ quen thuộc",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Hoa sen (s nhẹ cong lưỡi), xe đạp (x xát nhẹ không cong lưỡi).",
    content: {
      question: "Điền S hay X vào chỗ trống: Bông hoa ___en 🌸",
      questionEn: "Fill S or X: Bông hoa ___en (Lotus flower)",
      options: [
        { id: "opt_s", text: "s (Hoa sen)" },
        { id: "opt_x", text: "x (Hoa xen)" }
      ],
      correctAnswer: "opt_s",
      explanation: "Chính xác! Hoa sen viết bằng chữ 's'. Quốc hoa của Việt Nam mình đấy! 🌟"
    }
  },
  {
    id: "act_g12_vn_07",
    title: "Phân biệt TR hay CH: Chú chó và Cây tre 🐕🎋",
    titleEn: "Spelling Practice: TR or CH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    skill: "vi.spelling.tr_ch",
    skills: ["vi.spelling.tr_ch"],
    learningObjective: "Luyện phát âm và viết đúng âm TR (uốn lưỡi) và CH",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Cây tre, bầu trời (tr); chú chó, quả chanh, bát cháo (ch).",
    content: {
      question: "Điền TR hay CH vào chỗ trống: Cây ___e xanh ngát 🎋",
      questionEn: "Fill TR or CH: Cây ___e xanh ngát (Green bamboo)",
      options: [
        { id: "opt_tr", text: "tr (Cây tre)" },
        { id: "opt_ch", text: "ch (Cây che)" }
      ],
      correctAnswer: "opt_tr",
      explanation: "Rất chuẩn! Cây tre viết bằng âm 'tr'. Tre là biểu tượng kiên cường của làng quê Việt Nam! 🌟"
    }
  },
  {
    id: "act_g12_vn_08",
    title: "Từ chỉ sự vật: Người, Con vật, Đồ vật, Cây cối 🎒🐱",
    titleEn: "Nouns: People, Animals, Things, Plants",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "vietnamese",
    skill: "vi.grammar.nouns",
    skills: ["vi.grammar.nouns"],
    learningObjective: "Nhận biết nhóm từ chỉ sự vật theo chương trình Tiếng Việt lớp 2",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Từ chỉ sự vật gồm từ chỉ con người, con vật, đồ vật, cây cối xung quanh bé.",
    content: {
      question: "Dãy từ nào dưới đây toàn là TỪ CHỈ SỰ VẬT?",
      questionEn: "Which group contains ONLY nouns (objects, animals, people)?",
      options: [
        { id: "opt_1", text: "Cô giáo, Con mèo, Cặp sách, Cây bàng" },
        { id: "opt_2", text: "Chạy nhảy, Múa hát, Đọc sách, Đi học (Từ chỉ hoạt động)" },
        { id: "opt_3", text: "Xinh đẹp, Chăm chỉ, Ngoan ngoãn, Đỏ tươi (Từ chỉ đặc điểm)" }
      ],
      correctAnswer: "opt_1",
      explanation: "Tuyệt vời! Cô giáo (người), con mèo (vật), cặp sách (đồ vật), cây bàng (cây cối) đều là từ chỉ sự vật! 🌟"
    }
  },
  {
    id: "act_g12_vn_09",
    title: "Từ chỉ hoạt động: Bé đang làm gì? 🏃‍♂️📖",
    titleEn: "Verbs: Actions of Children",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "vietnamese",
    skill: "vi.grammar.verbs",
    skills: ["vi.grammar.verbs"],
    learningObjective: "Nhận biết từ chỉ hoạt động, cử động của người và loài vật",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Từ chỉ hoạt động trả lời cho câu hỏi: 'Bé đang làm gì?' hoặc 'Con vật làm gì?'.",
    content: {
      question: "Trong câu: 'Nam đang chăm chú đọc sách', từ nào là TỪ CHỈ HOẠT ĐỘNG?",
      questionEn: "In the sentence 'Nam is reading a book', which word is the VERB (action)?",
      options: [
        { id: "opt_nam", text: "Nam (Tên người)" },
        { id: "opt_read", text: "Đọc sách (Hoạt động)" },
        { id: "opt_book", text: "Sách (Đồ vật)" }
      ],
      correctAnswer: "opt_read",
      explanation: "Chính xác! 'Đọc sách' là từ chỉ hoạt động của bạn Nam! 🌟"
    }
  },
  {
    id: "act_g12_vn_10",
    title: "Dấu câu tiếng Việt: Dấu chấm hay Dấu hỏi? ❓",
    titleEn: "Punctuation Marks: Period or Question Mark",
    ageTier: "grade1_2",
    stage: null,
    minAge: 7,
    subject: "vietnamese",
    skill: "vi.grammar.punctuation",
    skills: ["vi.grammar.punctuation"],
    learningObjective: "Sử dụng đúng dấu chấm (.) kết thúc câu kể và dấu hỏi chấm (?) kết thúc câu hỏi",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Câu dùng để hỏi thì cuối câu phải có dấu chấm hỏi (?) bố mẹ nhé!",
    content: {
      question: "Chọn dấu câu thích hợp điền vào cuối câu: 'Hôm nay mấy giờ bạn đi học [ ? ]'",
      questionEn: "Pick the correct punctuation for: 'What time do you go to school today [ ? ]'",
      options: [
        { id: "opt_qm", text: "Dấu hỏi chấm (?)" },
        { id: "opt_dot", text: "Dấu chấm (.)" },
        { id: "opt_comma", text: "Dấu phẩy (,)" }
      ],
      correctAnswer: "opt_qm",
      explanation: "Đúng rồi! Đây là câu hỏi nên cuối câu phải đặt dấu chấm hỏi (?)! 🌟"
    }
  },

  // ==========================================
  // LỚP 1–2: TIẾNG ANH (ENGLISH - GLOBAL SUCCESS)
  // ==========================================
  {
    id: "act_g12_eng_03",
    title: "Colors: Cầu vồng sắc màu 🌈",
    titleEn: "Colors Match: Red, Blue, Green, Yellow",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "english",
    skill: "en.vocab.colors",
    skills: ["en.vocab.colors"],
    learningObjective: "Nhận biết và ghép đúng tên 4 màu sắc cơ bản bằng tiếng Anh",
    difficulty: 1,
    type: "matching",
    reward: { stars: 3 },
    parentTip: "Bố mẹ cùng bé phát âm to: Red, Blue, Yellow, Green nhé!",
    content: {
      question: "Bé hãy ghép tên màu tiếng Anh với màu tương ứng nhé:",
      questionEn: "Match the English color with its Vietnamese name:",
      pairs: [
        { id: "red", left: "🔴 Red", right: "Màu đỏ" },
        { id: "blue", left: "🔵 Blue", right: "Màu xanh dương" },
        { id: "yellow", left: "🟡 Yellow", right: "Màu vàng" },
        { id: "green", left: "🟢 Green", right: "Màu xanh lá" }
      ]
    }
  },
  {
    id: "act_g12_eng_04",
    title: "Animals: Thú cưng đáng yêu 🐶🐱",
    titleEn: "Pets: Cat, Dog, Duck, Fish",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "english",
    skill: "en.vocab.animals",
    skills: ["en.vocab.animals"],
    learningObjective: "Gọi tên các con vật nuôi quen thuộc bằng tiếng Anh",
    difficulty: 1,
    type: "matching",
    reward: { stars: 3 },
    parentTip: "Con mèo là Cat, con chó là Dog, con vịt là Duck, con cá là Fish.",
    content: {
      question: "Ghép tên con vật bằng tiếng Anh với tiếng Việt:",
      questionEn: "Match the English animal name with Vietnamese:",
      pairs: [
        { id: "cat", left: "🐱 Cat", right: "Con mèo" },
        { id: "dog", left: "🐶 Dog", right: "Con chó" },
        { id: "duck", left: "🦆 Duck", right: "Con vịt" },
        { id: "fish", left: "🐟 Fish", right: "Con cá" }
      ]
    }
  },
  {
    id: "act_g12_eng_05",
    title: "Classroom Commands: Mệnh lệnh lớp học 🎒",
    titleEn: "Classroom Commands: Stand up, Sit down",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "english",
    skill: "en.communication.commands",
    skills: ["en.communication.commands"],
    learningObjective: "Hiểu và thực hiện các khẩu lệnh quen thuộc trong lớp học tiếng Anh",
    difficulty: 1,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Stand up (Đứng lên), Sit down (Ngồi xuống), Open your book (Mở sách ra).",
    content: {
      question: "Khi cô giáo nói: 'Stand up, please!', bé sẽ làm gì?",
      questionEn: "When the teacher says 'Stand up, please!', what should you do?",
      options: [
        { id: "opt_stand", text: "🧍 Đứng dậy chào cô" },
        { id: "opt_sit", text: "🪑 Ngồi xuống ghế" },
        { id: "opt_open", text: "📖 Mở quyển sách" }
      ],
      correctAnswer: "opt_stand",
      explanation: "Chính xác! 'Stand up' nghĩa là đứng lên. Bé nghe lời cô giáo rất ngoan! 🌟"
    }
  },
  {
    id: "act_g12_eng_06",
    title: "My Family: Gia đình yêu thương 👨‍👩‍👧",
    titleEn: "Family Members: Father, Mother, Brother, Sister",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "english",
    skill: "en.vocab.family",
    skills: ["en.vocab.family"],
    learningObjective: "Nhận biết các từ vựng chỉ thành viên trong gia đình",
    difficulty: 1,
    type: "matching",
    reward: { stars: 3 },
    parentTip: "Bố mẹ hướng dẫn: Father = Bố, Mother = Mẹ, Brother = Anh/Em trai, Sister = Chị/Em gái.",
    content: {
      question: "Ghép tên thành viên gia đình bằng tiếng Anh với tiếng Việt:",
      questionEn: "Match the family member words:",
      pairs: [
        { id: "father", left: "👨 Father", right: "Bố / Ba" },
        { id: "mother", left: "👩 Mother", right: "Mẹ / Má" },
        { id: "brother", left: "👦 Brother", right: "Anh / Em trai" },
        { id: "sister", left: "👧 Sister", right: "Chị / Em gái" }
      ]
    }
  },

  // ==========================================
  // LỚP 1–2: ĐỌC HIỂU (READING)
  // ==========================================
  {
    id: "act_g12_read_02",
    title: "Đọc hiểu: Đôi bạn tốt Gà con và Vịt con 🐥🦆",
    titleEn: "Story: Two Good Friends",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "reading",
    skill: "reading.comprehension.friendship",
    skills: ["reading.comprehension.friendship"],
    learningObjective: "Đọc hiểu ý nghĩa câu chuyện và bài học về tình bạn giúp đỡ nhau",
    difficulty: 2,
    type: "reading_passage",
    reward: { stars: 3 },
    parentTip: "Bố mẹ cùng bé thảo luận: Khi bạn gặp khó khăn, chúng mình nên giúp đỡ bạn như thế nào nhé!",
    content: {
      storyText: "Gà con và Vịt con cùng đi dạo chơi. Đến một con suối nhỏ, Gà con không biết bơi nên đứng khóc. Vịt con liền bảo: 'Bạn đừng sợ, hãy trèo lên lưng mình!'. Vịt con cõng Gà con bơi qua suối an toàn. Hai bạn cười vui rộn rã.",
      question: "Vì sao Vịt con cõng Gà con qua suối?",
      questionEn: "Why did Duck carry Chick across the stream?",
      options: [
        { id: "opt_1", text: "Vì Gà con không biết bơi và Vịt con muốn giúp bạn" },
        { id: "opt_2", text: "Vì Vịt con muốn tập bơi một mình" },
        { id: "opt_3", text: "Vì con suối cạn nước" }
      ],
      correctAnswer: "opt_1",
      explanation: "Chính xác! Vịt con biết bơi nên đã tốt bụng cõng Gà con qua suối. Tình bạn thật đáng quý! 🌟"
    }
  },
  {
    id: "act_g12_read_03",
    title: "Đọc hiểu: Cậu bé chăn cừu và bài học trung thực 🐑",
    titleEn: "Story: The Boy Who Cried Wolf",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "reading",
    skill: "reading.comprehension.honesty",
    skills: ["reading.comprehension.honesty"],
    learningObjective: "Rút ra bài học đạo đức về lòng trung thực, không nói dối",
    difficulty: 2,
    type: "reading_passage",
    reward: { stars: 3 },
    parentTip: "Nhắc bé: Người hay nói dối thì khi nói thật cũng sẽ không ai tin nữa.",
    content: {
      storyText: "Có một cậu bé chăn cừu buồn chán liền la lớn: 'Sói đến! Sói đến!'. Mọi người hốt hoảng chạy đến giúp thì cậu cười bảo mình nói đùa. Đến khi sói thật xông vào đàn cừu, cậu la khóc nhưng không ai đến cứu nữa vì tưởng cậu lại nói dối.",
      question: "Câu chuyện khuyên các bạn nhỏ điều gì?",
      questionEn: "What moral does the story teach us?",
      options: [
        { id: "opt_1", text: "Phải luôn trung thực, không được nói dối trêu chọc người khác" },
        { id: "opt_2", text: "Nên thường xuyên nói đùa để mọi người vui vẻ" },
        { id: "opt_3", text: "Không nên chăn cừu một mình" }
      ],
      correctAnswer: "opt_1",
      explanation: "Rất đúng! Lòng trung thực là đức tính quý nhất. Chúng mình hãy luôn nói thật nhé! 🌟"
    }
  },

  // ==========================================
  // LỚP 3–5: TOÁN HỌC (MATH)
  // ==========================================
  {
    id: "act_g35_math_04",
    title: "Bảng cửu chương 9: 9 × 6 = ? 📐",
    titleEn: "Multiplication Table 9: 9 × 6",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "math",
    skill: "math.multiplication.table9",
    skills: ["math.multiplication.table9"],
    learningObjective: "Thuộc lòng bảng cửu chương 9 và áp dụng mẹo tính nhanh bằng ngón tay",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Mẹo bảng nhân 9: Tổng 2 chữ số của kết quả luôn bằng 9 (5 + 4 = 9 -> 54).",
    content: {
      question: "9 nhân 6 bằng bao nhiêu?",
      questionEn: "What is 9 multiplied by 6?",
      options: [
        { id: "opt_45", text: "45" },
        { id: "opt_54", text: "54" },
        { id: "opt_63", text: "63" }
      ],
      correctAnswer: "opt_54",
      explanation: "Chính xác! 9 × 6 = 54. Bạn nhỏ thuộc bảng cửu chương 9 rất siêu! 🌟"
    }
  },
  {
    id: "act_g35_math_05",
    title: "Thứ tự phép tính: 20 + 5 × 4 = ? 🧮",
    titleEn: "Order of Operations: 20 + 5 × 4",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "math",
    skill: "math.arithmetic.order_of_operations",
    skills: ["math.arithmetic.order_of_operations"],
    learningObjective: "Nắm vững quy tắc thứ tự thực hiện phép tính: Nhân chia trước, cộng trừ sau",
    difficulty: 2,
    type: "fill_blank",
    reward: { stars: 3 },
    parentTip: "Quy tắc vàng: Ta phải thực hiện 5 × 4 = 20 trước, sau đó mới lấy 20 + 20 = 40.",
    content: {
      question: "Tính giá trị biểu thức: 20 + 5 × 4 = ?",
      questionEn: "Calculate: 20 + 5 × 4 = ?",
      template: "20 + 5 × 4 = [ ? ]",
      options: [
        { id: "opt_40", text: "40 (Nhân chia trước: 20 + 20 = 40)" },
        { id: "opt_100", text: "100 (Sai nếu cộng trước 25 × 4)" },
        { id: "opt_45", text: "45" }
      ],
      correctAnswer: "opt_40",
      explanation: "Tuyệt vời! 'Nhân chia trước, cộng trừ sau': 5 × 4 = 20, 20 + 20 = 40! 🌟"
    }
  },
  {
    id: "act_g35_math_06",
    title: "Cộng phân số cùng mẫu: 2/7 + 3/7 = ? 🍕",
    titleEn: "Add Fractions with Same Denominator",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "math",
    skill: "math.fractions.addition_same_denominator",
    skills: ["math.fractions.addition_same_denominator"],
    learningObjective: "Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và giữ nguyên mẫu số",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Quy tắc Toán lớp 4: Giữ nguyên mẫu số 7, lấy tử số 2 + 3 = 5.",
    content: {
      question: "Kết quả của phép tính: 2/7 + 3/7 là bao nhiêu?",
      questionEn: "What is 2/7 + 3/7?",
      options: [
        { id: "opt_57", text: "5/7 (Giữ nguyên mẫu số 7)" },
        { id: "opt_514", text: "5/14 (Sai vì cộng cả mẫu số)" },
        { id: "opt_67", text: "6/7" }
      ],
      correctAnswer: "opt_57",
      explanation: "Rất chuẩn! Muốn cộng phân số cùng mẫu, ta cộng hai tử số và giữ nguyên mẫu: 2/7 + 3/7 = 5/7! 🌟"
    }
  },
  {
    id: "act_g35_math_07",
    title: "Rút gọn phân số: 6/8 = ? ✂️",
    titleEn: "Simplify Fraction: 6/8",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "math",
    skill: "math.fractions.simplify",
    skills: ["math.fractions.simplify"],
    learningObjective: "Rút gọn phân số về phân số tối giản bằng cách chia cả tử và mẫu cho cùng một số",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Cả tử số 6 và mẫu số 8 đều chia hết cho 2: 6:2=3, 8:2=4 -> được 3/4.",
    content: {
      question: "Rút gọn phân số 6/8 về phân số tối giản được phân số nào?",
      questionEn: "Simplify 6/8 to lowest terms:",
      options: [
        { id: "opt_34", text: "3/4 (Chia cả tử và mẫu cho 2)" },
        { id: "opt_12", text: "1/2" },
        { id: "opt_23", text: "2/3" }
      ],
      correctAnswer: "opt_34",
      explanation: "Chính xác! 6 ÷ 2 = 3 và 8 ÷ 2 = 4, phân số tối giản là 3/4! 🌟"
    }
  },
  {
    id: "act_g35_math_08",
    title: "Nhân hai phân số: (2/3) × (4/5) = ? 📐",
    titleEn: "Multiply Fractions: (2/3) × (4/5)",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.fractions.multiplication",
    skills: ["math.fractions.multiplication"],
    learningObjective: "Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số",
    difficulty: 3,
    type: "image_quiz",
    reward: { stars: 4 },
    parentTip: "Toán lớp 5: Tử nhân tử (2 × 4 = 8), mẫu nhân mẫu (3 × 5 = 15).",
    content: {
      question: "Tính kết quả phép nhân hai phân số: (2/3) × (4/5) = ?",
      questionEn: "Calculate: (2/3) × (4/5) = ?",
      options: [
        { id: "opt_815", text: "8/15 (Tử nhân tử, mẫu nhân mẫu)" },
        { id: "opt_68", text: "6/8" },
        { id: "opt_88", text: "8/8" }
      ],
      correctAnswer: "opt_815",
      explanation: "Xuất sắc! (2 × 4) / (3 × 5) = 8/15. Quy tắc nhân phân số bé nắm rất chắc! 🌟"
    }
  },
  {
    id: "act_g35_math_09",
    title: "Làm quen Số thập phân: 3 phần 10 viết là gì? 🔟",
    titleEn: "Decimals: 3/10 written as 0.3",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.decimals.intro",
    skills: ["math.decimals.intro"],
    learningObjective: "Chuyển đổi phân số thập phân sang số thập phân",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Phân số 3/10 có một chữ số 0 ở mẫu, viết thành số thập phân là 0,3.",
    content: {
      question: "Phân số thập phân 3/10 được viết dưới dạng số thập phân là:",
      questionEn: "The fraction 3/10 is written as decimal:",
      options: [
        { id: "opt_03", text: "0,3" },
        { id: "opt_003", text: "0,03" },
        { id: "opt_30", text: "3,0" }
      ],
      correctAnswer: "opt_03",
      explanation: "Đúng rồi! 3/10 = 0,3 (đọc là không phẩy ba). Đây là nền tảng Toán lớp 5! 🌟"
    }
  },
  {
    id: "act_g35_math_10",
    title: "Cộng số thập phân: 3,5 + 2,4 = ? 🧮",
    titleEn: "Decimal Addition: 3.5 + 2.4",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.decimals.addition",
    skills: ["math.decimals.addition"],
    learningObjective: "Thực hiện phép cộng số thập phân thẳng hàng dấu phẩy",
    difficulty: 2,
    type: "fill_blank",
    reward: { stars: 3 },
    parentTip: "Cộng phần thập phân trước: 5 + 4 = 9, sau đó cộng phần nguyên: 3 + 2 = 5 -> 5,9.",
    content: {
      question: "3,5 cộng 2,4 bằng bao nhiêu?",
      questionEn: "What is 3.5 plus 2.4?",
      template: "3,5 + 2,4 = [ ? ]",
      options: [
        { id: "opt_59", text: "5,9" },
        { id: "opt_58", text: "5,8" },
        { id: "opt_60", text: "6,0" }
      ],
      correctAnswer: "opt_59",
      explanation: "Rất chính xác! 3,5 + 2,4 = 5,9. Bé tính toán số thập phân rất nhanh! 🌟"
    }
  },
  {
    id: "act_g35_math_11",
    title: "Tỉ số phần trăm: 50% của 100 chiếc kẹo 🍬",
    titleEn: "Percentages: 50% of 100 candies",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.percentages.concept",
    skills: ["math.percentages.concept"],
    learningObjective: "Hiểu ý nghĩa tỉ số phần trăm và tính nhẩm 50% (một nửa)",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "50% chính là một nửa (1/2). 50% của 100 cái kẹo là 100 : 2 = 50 cái kẹo.",
    content: {
      question: "50% của 100 chiếc kẹo là bao nhiêu chiếc kẹo?",
      questionEn: "How many candies is 50% of 100 candies?",
      options: [
        { id: "opt_50", text: "50 chiếc kẹo (Một nửa)" },
        { id: "opt_25", text: "25 chiếc kẹo (25%)" },
        { id: "opt_75", text: "75 chiếc kẹo" }
      ],
      correctAnswer: "opt_50",
      explanation: "Chính xác! 50% nghĩa là một nửa, 100 : 2 = 50 chiếc kẹo! 🌟"
    }
  },
  {
    id: "act_g35_math_12",
    title: "Diện tích hình chữ nhật: Chiều dài 8m, chiều rộng 5m 📏",
    titleEn: "Area of Rectangle: 8m × 5m",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "math",
    skill: "math.geometry.area_rectangle",
    skills: ["math.geometry.area_rectangle"],
    learningObjective: "Tính diện tích hình chữ nhật: S = Chiều dài × Chiều rộng",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Công thức: Diện tích = Dài nhân Rộng (8 × 5 = 40 mét vuông).",
    content: {
      question: "Một mảnh vườn hình chữ nhật có chiều dài 8m, chiều rộng 5m. Hỏi diện tích mảnh vườn là bao nhiêu mét vuông (m²)?",
      questionEn: "A rectangular garden has length 8m, width 5m. What is its area?",
      options: [
        { id: "opt_40", text: "40 m² (8 × 5 = 40)" },
        { id: "opt_26", text: "26 m (Đây là chu vi: (8+5)×2)" },
        { id: "opt_45", text: "45 m²" }
      ],
      correctAnswer: "opt_40",
      explanation: "Đúng rồi! Diện tích hình chữ nhật bằng dài nhân rộng: 8 × 5 = 40 m²! 🌟"
    }
  },
  {
    id: "act_g35_math_13",
    title: "Diện tích hình tam giác: Đáy 6cm, chiều cao 4cm 📐",
    titleEn: "Area of Triangle: Base 6cm, Height 4cm",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.geometry.area_triangle",
    skills: ["math.geometry.area_triangle"],
    learningObjective: "Tính diện tích tam giác: S = (Độ dài đáy × Chiều cao) ÷ 2",
    difficulty: 3,
    type: "image_quiz",
    reward: { stars: 4 },
    parentTip: "Công thức Toán lớp 5: S = (a × h) : 2 -> (6 × 4) : 2 = 12 cm².",
    content: {
      question: "Một hình tam giác có độ dài đáy là 6cm và chiều cao là 4cm. Diện tích hình tam giác đó là:",
      questionEn: "A triangle has base 6cm, height 4cm. Its area is:",
      options: [
        { id: "opt_12", text: "12 cm² ((6 × 4) ÷ 2 = 12)" },
        { id: "opt_24", text: "24 cm² (Chưa chia 2)" },
        { id: "opt_10", text: "10 cm²" }
      ],
      correctAnswer: "opt_12",
      explanation: "Chính xác! Diện tích tam giác bằng đáy nhân chiều cao rồi chia cho 2: (6 × 4) ÷ 2 = 12 cm²! 🌟"
    }
  },
  {
    id: "act_g35_math_14",
    title: "Thể tích hình hộp chữ nhật: Dài 5, rộng 4, cao 3 📦",
    titleEn: "Volume of Rectangular Prism",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.geometry.volume",
    skills: ["math.geometry.volume"],
    learningObjective: "Tính thể tích hình hộp chữ nhật: V = a × b × c",
    difficulty: 3,
    type: "image_quiz",
    reward: { stars: 4 },
    parentTip: "Công thức: Thể tích = Dài × Rộng × Cao = 5 × 4 × 3 = 60 cm³.",
    content: {
      question: "Một chiếc hộp có chiều dài 5cm, chiều rộng 4cm, chiều cao 3cm. Thể tích chiếc hộp là bao nhiêu cm³?",
      questionEn: "A box has length 5cm, width 4cm, height 3cm. What is its volume in cm³?",
      options: [
        { id: "opt_60", text: "60 cm³ (5 × 4 × 3 = 60)" },
        { id: "opt_50", text: "50 cm³" },
        { id: "opt_45", text: "45 cm³" }
      ],
      correctAnswer: "opt_60",
      explanation: "Tuyệt đỉnh! Thể tích = dài nhân rộng nhân cao: 5 × 4 × 3 = 60 xăng-ti-mét khối (cm³)! 🌟"
    }
  },
  {
    id: "act_g35_math_15",
    title: "Toán chuyển động đều: Tính quãng đường (s = v × t) 🚗",
    titleEn: "Motion Problem: Distance = Speed × Time",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "math",
    skill: "math.word_problem.motion",
    skills: ["math.word_problem.motion"],
    learningObjective: "Vận dụng công thức chuyển động đều: Quãng đường = Vận tốc × Thời gian",
    difficulty: 3,
    type: "image_quiz",
    reward: { stars: 4 },
    parentTip: "Toán lớp 5: Quãng đường = Vận tốc nhân với Thời gian: s = 40 × 2 = 80 km.",
    content: {
      question: "Một chiếc xe máy đi với vận tốc 40 km/giờ. Hỏi trong 2 giờ xe máy đó đi được quãng đường bao nhiêu ki-lô-mét?",
      questionEn: "A motorbike travels at 40 km/h. In 2 hours, how far does it travel?",
      options: [
        { id: "opt_80", text: "80 km (40 × 2 = 80)" },
        { id: "opt_60", text: "60 km" },
        { id: "opt_42", text: "42 km" }
      ],
      correctAnswer: "opt_80",
      explanation: "Xuất sắc! Muốn tính quãng đường ta lấy vận tốc nhân với thời gian: 40 × 2 = 80 km! 🌟"
    }
  },

  // ==========================================
  // LỚP 3–5: TIẾNG VIỆT & NGỮ VĂN (VIETNAMESE)
  // ==========================================
  {
    id: "act_g35_vn_04",
    title: "Biện pháp tu từ: Phép So Sánh 🌿",
    titleEn: "Rhetorical Device: Simile / Comparison",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "vietnamese",
    skill: "vi.literature.simile",
    skills: ["vi.literature.simile"],
    learningObjective: "Nhận biết phép so sánh trong thơ văn (dấu hiệu từ 'như', 'tựa như', 'là')",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Dấu hiệu nhận biết phép so sánh là có từ 'như': Sự vật 1 như Sự vật 2.",
    content: {
      question: "Câu thơ nào dưới đây sử dụng BIỆN PHÁP SO SÁNH?",
      questionEn: "Which line uses a SIMILE (comparison with 'như')?",
      options: [
        { id: "opt_1", text: "Trẻ em như búp trên cành (So sánh Trẻ em với búp non)" },
        { id: "opt_2", text: "Mặt trời mọc ở hướng đông" },
        { id: "opt_3", text: "Gió thổi qua rặng tre" }
      ],
      correctAnswer: "opt_1",
      explanation: "Đúng rồi! 'Trẻ em như búp trên cành' là câu thơ nổi tiếng của Bác Hồ sử dụng biện pháp so sánh rất đẹp! 🌟"
    }
  },
  {
    id: "act_g35_vn_05",
    title: "Biện pháp tu từ: Phép Nhân Hóa ☀️",
    titleEn: "Rhetorical Device: Personification",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "vietnamese",
    skill: "vi.literature.personification",
    skills: ["vi.literature.personification"],
    learningObjective: "Nhận biết phép nhân hóa: Gán hành động, tính cách con người cho sự vật",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Nhân hóa là gọi hoặc tả sự vật, con vật bằng những từ ngữ dùng cho con người.",
    content: {
      question: "Câu nào dưới đây sử dụng BIỆN PHÁP NHÂN HÓA?",
      questionEn: "Which sentence uses PERSONIFICATION?",
      options: [
        { id: "opt_1", text: "Bác gà trống vươn cổ cất tiếng gáy đánh thức cả xóm (Bác, gáy đánh thức)" },
        { id: "opt_2", text: "Mùa hè trời rất nắng nóng" },
        { id: "opt_3", text: "Con mèo đang ngủ trên ghế" }
      ],
      correctAnswer: "opt_1",
      explanation: "Chính xác! Gọi gà trống là 'Bác' và hành động 'đánh thức cả xóm' chính là phép nhân hóa sinh động! 🌟"
    }
  },
  {
    id: "act_g35_vn_06",
    title: "Cấu tạo từ: Phân biệt Từ ghép và Từ láy 📚",
    titleEn: "Compound Words vs Reduplicative Words",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "vietnamese",
    skill: "vi.grammar.word_formation",
    skills: ["vi.grammar.word_formation"],
    learningObjective: "Phân biệt từ ghép (ghép các tiếng có nghĩa) và từ láy (lặp âm/vần)",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Từ láy có sự lặp lại âm hoặc vần: lung linh, róc rách, ríu rít.",
    content: {
      question: "Từ nào dưới đây là TỪ LÁY trong tiếng Việt?",
      questionEn: "Which word is a REDUPLICATIVE word (từ láy)?",
      options: [
        { id: "opt_lay", text: "Lung linh (Lặp lại âm đầu L)" },
        { id: "opt_ghep1", text: "Bàn ghế (Từ ghép đẳng lập)" },
        { id: "opt_ghep2", text: "Sách vở (Từ ghép đẳng lập)" }
      ],
      correctAnswer: "opt_lay",
      explanation: "Đúng rồi! 'Lung linh' lặp lại phụ âm đầu 'l', tạo nên từ láy gợi hình ảnh lấp lánh ánh sáng! 🌟"
    }
  },
  {
    id: "act_g35_vn_07",
    title: "Từ loại tiếng Việt: Danh từ, Động từ, Tính từ 📝",
    titleEn: "Parts of Speech: Nouns, Verbs, Adjectives",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "vietnamese",
    skill: "vi.grammar.parts_of_speech",
    skills: ["vi.grammar.parts_of_speech"],
    learningObjective: "Nhận biết và phân loại ba từ loại cơ bản trong chương trình Tiếng Việt lớp 4",
    difficulty: 2,
    type: "matching",
    reward: { stars: 3 },
    parentTip: "Danh từ (sự vật), Động từ (hoạt động/trạng thái), Tính từ (đặc điểm/tính chất).",
    content: {
      question: "Ghép đúng từ với từ loại tương ứng:",
      questionEn: "Match the word with its part of speech:",
      pairs: [
        { id: "n", left: "Trường học, Học sinh", right: "Danh từ (Chỉ sự vật)" },
        { id: "v", left: "Học tập, Chạy nhảy", right: "Động từ (Chỉ hoạt động)" },
        { id: "adj", left: "Chăm chỉ, Xinh đẹp", right: "Tính từ (Chỉ đặc điểm)" }
      ]
    }
  },
  {
    id: "act_g35_vn_08",
    title: "Cặp quan hệ từ: Vì... nên... chỉ Nguyên nhân - Kết quả 🔗",
    titleEn: "Correlative Conjunctions: Because... so...",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "vietnamese",
    skill: "vi.grammar.conjunctions",
    skills: ["vi.grammar.conjunctions"],
    learningObjective: "Sử dụng cặp quan hệ từ liên kết câu ghép trong Tiếng Việt lớp 5",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Cặp 'Vì... nên...' biểu thị quan hệ nguyên nhân - kết quả.",
    content: {
      question: "Điền cặp quan hệ từ thích hợp: '___ Nam chăm chỉ học tập ___ bạn ấy đạt học sinh giỏi.'",
      questionEn: "Fill in the correlative conjunction: '___ Nam studied hard ___ he got good grades.'",
      options: [
        { id: "opt_vi_nen", text: "Vì ... nên ... (Nguyên nhân - Kết quả)" },
        { id: "opt_tuy_nhung", text: "Tuy ... nhưng ... (Tương phản)" },
        { id: "opt_neu_thi", text: "Nếu ... thì ... (Giả thiết - Điều kiện)" }
      ],
      correctAnswer: "opt_vi_nen",
      explanation: "Chính xác! 'Vì Nam chăm chỉ nên bạn ấy đạt học sinh giỏi'. Cặp quan hệ từ rất chuẩn! 🌟"
    }
  },

  // ==========================================
  // LỚP 3–5: TIẾNG ANH (ENGLISH - GLOBAL SUCCESS)
  // ==========================================
  {
    id: "act_g35_eng_03",
    title: "Abilities: Can and Can't 🐧",
    titleEn: "Can you swim? Can a bird fly?",
    ageTier: "grade3_5",
    stage: null,
    minAge: 8,
    subject: "english",
    skill: "en.grammar.modal_can",
    skills: ["en.grammar.modal_can"],
    learningObjective: "Sử dụng động từ khuyết thiếu Can / Can't để diễn tả khả năng",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Chim cánh cụt không biết bay (Penguins can't fly) nhưng bơi rất giỏi (They can swim).",
    content: {
      question: "Can a penguin fly in the sky? 🐧",
      questionEn: "Can a penguin fly in the sky?",
      options: [
        { id: "opt_no", text: "No, it can't. (Chim cánh cụt không biết bay)" },
        { id: "opt_yes", text: "Yes, it can." },
        { id: "opt_run", text: "No, it runs." }
      ],
      correctAnswer: "opt_no",
      explanation: "Correct! A penguin cannot fly in the air, but it can swim very fast in the ocean! 🌟"
    }
  },
  {
    id: "act_g35_eng_04",
    title: "Comparative Adjectives: So sánh hơn 🐆",
    titleEn: "Comparatives: Faster, Bigger, Taller",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "english",
    skill: "en.grammar.comparatives",
    skills: ["en.grammar.comparatives"],
    learningObjective: "Sử dụng tính từ ngắn so sánh hơn (tính từ + er + than)",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "So sánh hơn tính từ ngắn: Fast -> Faster than (nhanh hơn), Tall -> Taller than (cao hơn).",
    content: {
      question: "A cheetah is ___ than a turtle. 🐆🐢",
      questionEn: "A cheetah is ___ than a turtle.",
      options: [
        { id: "opt_faster", text: "faster (Nhanh hơn)" },
        { id: "opt_slower", text: "slower (Chậm hơn)" },
        { id: "opt_fast", text: "fast" }
      ],
      correctAnswer: "opt_faster",
      explanation: "Great job! 'A cheetah is faster than a turtle' - Báo săn chạy nhanh hơn rùa! 🌟"
    }
  },
  {
    id: "act_g35_eng_05",
    title: "Simple Past: Where were you yesterday? 🏖️",
    titleEn: "Past Tense: I was at the beach",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "english",
    skill: "en.grammar.past_simple",
    skills: ["en.grammar.past_simple"],
    learningObjective: "Hỏi và trả lời về các hoạt động ở quá khứ (Yesterday / Last weekend)",
    difficulty: 3,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Quá khứ của 'is/am' là 'was': I was at the beach yesterday.",
    content: {
      question: "Where were you yesterday? (Hôm qua bạn ở đâu?)",
      questionEn: "Where were you yesterday?",
      options: [
        { id: "opt_was", text: "I was at the beach. (Hôm qua tớ ở bãi biển)" },
        { id: "opt_am", text: "I am at school today." },
        { id: "opt_will", text: "I will go tomorrow." }
      ],
      correctAnswer: "opt_was",
      explanation: "Excellent! 'I was at the beach' dùng thì quá khứ đơn chính xác! 🌟"
    }
  },
  {
    id: "act_g35_eng_06",
    title: "Future Dreams: What will you be in the future? 👨‍🚀",
    titleEn: "Future Dreams: I will be an astronaut",
    ageTier: "grade3_5",
    stage: null,
    minAge: 10,
    subject: "english",
    skill: "en.grammar.future_will",
    skills: ["en.grammar.future_will"],
    learningObjective: "Sử dụng 'will be' để nói về ước mơ nghề nghiệp tương lai",
    difficulty: 2,
    type: "image_quiz",
    reward: { stars: 3 },
    parentTip: "Cấu trúc: I will be a/an [nghề nghiệp] in the future.",
    content: {
      question: "What will you be in the future? 🚀",
      questionEn: "What will you be in the future?",
      options: [
        { id: "opt_astro", text: "I will be an astronaut. (Tớ sẽ là nhà du hành vũ trụ)" },
        { id: "opt_was", text: "I was a student." },
        { id: "opt_am", text: "I am playing game." }
      ],
      correctAnswer: "opt_astro",
      explanation: "Wonderful! 'I will be an astronaut' - Ước mơ khám phá vũ trụ thật kỳ vĩ! 🌟"
    }
  },

  // ==========================================
  // LỚP 3–5: ĐỌC HIỂU (READING)
  // ==========================================
  {
    id: "act_g35_read_02",
    title: "Đọc hiểu: Sự tích Quả Dưa Hấu (Mai An Tiêm) 🍉",
    titleEn: "Story: The Legend of Watermelon",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "reading",
    skill: "reading.comprehension.legend",
    skills: ["reading.comprehension.legend"],
    learningObjective: "Đọc hiểu truyện cổ tích Việt Nam và bài học về ý chí tự lập, không ỷ lại",
    difficulty: 2,
    type: "reading_passage",
    reward: { stars: 3 },
    parentTip: "Câu nói nổi tiếng của Mai An Tiêm: 'Của biếu là của lo, của cho là của nợ', tự tay lao động mới bền vững.",
    content: {
      storyText: "Bị đày ra đảo hoang ngoài biển khơi, vợ chồng Mai An Tiêm không hề nản lòng. Thấy đàn chim ăn hạt quả màu đen nhả lại, chàng đem gieo thử. Ít lâu sau, dây leo mọc xanh tốt, cho những quả tròn vỏ xanh, ruột đỏ ngọt lịm. Chàng khắc tên mình lên quả thả trôi theo sóng biển. Thuyền buôn vớt được đem vào đất liền, vua cha cảm phục đón gia đình chàng trở về.",
      question: "Phẩm chất nổi bật nhất của Mai An Tiêm trong câu chuyện là gì?",
      questionEn: "What is Mai An Tiêm's most prominent virtue in the story?",
      options: [
        { id: "opt_1", text: "Ý chí kiên cường, cần cù lao động và tinh thần tự lực cánh sinh" },
        { id: "opt_2", text: "Chờ đợi sự giúp đỡ của người khác" },
        { id: "opt_3", text: "Buồn bã buông xuôi trên đảo hoang" }
      ],
      correctAnswer: "opt_1",
      explanation: "Chính xác! Mai An Tiêm là tấm gương sáng ngời về lòng tự trọng, tự tay lao động dựng xây cuộc sống! 🌟"
    }
  },
  {
    id: "act_g35_read_03",
    title: "Đọc hiểu: Bài thơ Hạt Gạo Làng Ta (Trần Đăng Khoa) 🌾",
    titleEn: "Poem: The Grain of Rice of Our Village",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "reading",
    skill: "reading.comprehension.poetry",
    skills: ["reading.comprehension.poetry"],
    learningObjective: "Cảm thụ bài thơ nổi tiếng ca ngợi giá trị hạt gạo và công lao người nông dân",
    difficulty: 2,
    type: "reading_passage",
    reward: { stars: 3 },
    parentTip: "Bố mẹ nhắc bé quý trọng từng hạt cơm ăn hàng ngày vì thấm đượm bao giọt mồ hôi vất vả.",
    content: {
      storyText: "'Hạt gạo làng ta / Có vị phù sa / Của sông Kinh Thầy / Có hương sen thơm / Trong hồ nước đầy / Có lời mẹ hát / Ngọt bùi đắng cay... Hạt gạo làng ta / Có bão tháng bảy / Có mưa tháng ba / Giọt mồ hôi sa / Những trưa tháng sáu / Nước như ai nấu / Chết cả cá cờ / Cua ngoi lên bờ / Mẹ em xuống cấy...'",
      question: "Đoạn thơ trên muốn nhắc nhở chúng ta điều gì?",
      questionEn: "What does the poem remind us of?",
      options: [
        { id: "opt_1", text: "Biết ơn sự nhọc nhằn của người nông dân và biết trân quý từng hạt gạo" },
        { id: "opt_2", text: "Chỉ nên ăn cơm vào buổi trưa tháng sáu" },
        { id: "opt_3", text: "Sông Kinh Thầy có rất nhiều cá cờ" }
      ],
      correctAnswer: "opt_1",
      explanation: "Rất xúc động! Hạt gạo dẻo thơm được đổi bằng giọt mồ hôi mẹ đổ trên đồng. Chúng mình hãy luôn trân trọng thức ăn nhé! 🌟"
    }
  },

  // ==========================================
  // LỚP 3–5: KHOA HỌC & TỰ NHIÊN (SCIENCE)
  // ==========================================
  {
    id: "act_g35_sci_06_water_cycle",
    title: "Vòng tuần hoàn của Nước trong tự nhiên 💧☁️🌧️",
    titleEn: "The Water Cycle: Evaporation, Condensation, Rain",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "science",
    skill: "sci.earth.water_cycle",
    skills: ["sci.earth.water_cycle"],
    learningObjective: "Hiểu quy trình vòng tuần hoàn của nước: Nước bốc hơi -> Ngưng tụ thành mây -> Mưa rơi",
    difficulty: 2,
    type: "drag_drop",
    reward: { stars: 3 },
    parentTip: "Quy trình: Ánh nắng làm nước bốc hơi -> Lên cao lạnh ngưng tụ thành mây -> Nặng hạt rơi thành mưa.",
    content: {
      question: "Sắp xếp đúng thứ tự các bước trong Vòng tuần hoàn của Nước:",
      questionEn: "Arrange the steps of the Water Cycle in correct order:",
      correctSequence: ["tok_1", "tok_2", "tok_3", "tok_4"],
      slots: 4,
      tokens: [
        { id: "tok_1", text: "1. Mặt trời làm nước bốc hơi ☀️💧" },
        { id: "tok_2", text: "2. Hơi nước ngưng tụ thành mây ☁️" },
        { id: "tok_3", text: "3. Mây nặng hạt tạo thành mưa rơi 🌧️" },
        { id: "tok_4", text: "4. Nước mưa chảy về sông suối, biển cả 🌊" }
      ]
    }
  },
  {
    id: "act_g35_sci_07_nutrition",
    title: "Cơ thể con người: 4 nhóm chất dinh dưỡng 🥗🍎🥩",
    titleEn: "Human Nutrition: 4 Nutrient Groups",
    ageTier: "grade3_5",
    stage: null,
    minAge: 9,
    subject: "science",
    skill: "sci.biology.nutrition",
    skills: ["sci.biology.nutrition"],
    learningObjective: "Nhận biết 4 nhóm chất dinh dưỡng cần thiết: Chất đạm, Chất bột đường, Chất béo, Vitamin & Khoáng chất",
    difficulty: 2,
    type: "matching",
    reward: { stars: 3 },
    parentTip: "Ăn đa dạng các nhóm thực phẩm giúp bé cao lớn, thông minh và khỏe mạnh.",
    content: {
      question: "Ghép đúng nhóm chất dinh dưỡng với món ăn tương ứng:",
      questionEn: "Match nutrient groups with foods:",
      pairs: [
        { id: "protein", left: "🥩 Thịt, Cá, Trứng, Sữa", right: "Chất đạm (Protein) giúp lớn nhanh" },
        { id: "carb", left: "🍚 Cơm, Bánh mì, Khoai lang", right: "Chất bột đường cung cấp năng lượng" },
        { id: "vitamin", left: "🥦 Rau xanh, Trái cây tươi", right: "Vitamin & Khoáng chất tăng đề kháng" },
        { id: "fat", left: "🥜 Dầu mè, Lạc, Vừng, Mỡ cá", right: "Chất béo dự trữ năng lượng" }
      ]
    }
  }
];

// Gộp danh sách hoạt động
const combinedActivities = [...baseActivities, ...newActivities];
console.log(`Total combined activities: ${combinedActivities.length}`);

// Đảm bảo schema đầy đủ cho từng activity
combinedActivities.forEach(act => {
  if (!act.skills) {
    if (act.skill) act.skills = [act.skill];
    else act.skills = ["general.skill"];
  }
  if (!act.learningObjective && act.learningGoal) act.learningObjective = act.learningGoal;
  if (!act.learningObjective && act.skill) act.learningObjective = act.skill;
  if (!act.difficulty) act.difficulty = 2;
  if (!act.titleEn) act.titleEn = act.title;
  if (!act.reward) act.reward = { stars: Math.min(5, Math.max(1, act.difficulty || 3)) };
});

const outContent = `(function () {
// ========================================================
// MÔ HÌNH DỮ LIỆU BÀI HỌC & PHÂN TẦNG ĐỘ TUỔI (GDPT 2018)
// LỚP TIỀN TIỂU HỌC (4–6T), LỚP 1–2 (6–8T), LỚP 3–5 (8–11T)
// ========================================================

const AGE_TIERS = {
  preschool: {
    id: "preschool",
    nameVi: "Tiền tiểu học",
    nameEn: "Preschool",
    ageVi: "4–6 tuổi",
    ageEn: "Ages 4–6",
    badge: "🐣",
    descVi: "Chữ cái, Học số, Đếm hình, Tiếng Anh & Làm quen trước lớp 1",
    descEn: "Letters, Numbers, Counting, English & Grade 1 Prep"
  },
  grade1_2: {
    id: "grade1_2",
    nameVi: "Lớp 1–2",
    nameEn: "Grade 1–2",
    ageVi: "6–8 tuổi",
    ageEn: "Ages 6–8",
    badge: "🎒",
    descVi: "Cộng/Trừ 20–100, Ghép vần, Tiếng Anh & Đọc hiểu",
    descEn: "Addition/Subtraction to 100, Phonics, English & Reading"
  },
  grade3_5: {
    id: "grade3_5",
    nameVi: "Lớp 3–5",
    nameEn: "Grade 3–5",
    ageVi: "8–11 tuổi",
    ageEn: "Ages 8–11",
    badge: "🚀",
    descVi: "Nhân/Chia, Phân số, Tiếng Anh giao tiếp & Đọc hiểu văn bản",
    descEn: "Multiplication/Division, Fractions, English & Comprehension"
  }
};

const ACTIVITIES_DATA = ${JSON.stringify(combinedActivities, null, 2)};

// Helper lọc bài học theo nhóm tuổi (Tier)
function getActivitiesByTier(tierId) {
  return ACTIVITIES_DATA.filter(a => a.ageTier === tierId);
}

// Helper lấy chi tiết 1 bài học theo id
function getActivityById(id) {
  return ACTIVITIES_DATA.find(a => a.id === id);
}

// Helper lọc bài học theo môn học
function getActivitiesBySubject(tierId, subject) {
  return ACTIVITIES_DATA.filter(a => a.ageTier === tierId && (subject === "all" || a.subject === subject));
}

// Helper lấy danh sách bài học theo chặng (0-5)
function getActivitiesByStage(stage) {
  return ACTIVITIES_DATA.filter(a => a.stage === stage);
}

// Helper lấy tất cả bài học thuộc lộ trình Chuẩn bị vào Lớp 1 (5–6 tuổi)
function getPreschoolJourneyActivities() {
  return ACTIVITIES_DATA.filter(a => a.stage !== undefined && a.stage !== null && a.stage >= 0 && a.stage <= 5);
}

// Helper lấy danh sách bài học kỹ năng sống
function getLifeSkillsActivities() {
  return ACTIVITIES_DATA.filter(a => a.subject === "skills" || a.type === "interactive_story");
}

// Xuất bản sang window (cho Browser / PWA)
if (typeof window !== "undefined") {
  window.AGE_TIERS = AGE_TIERS;
  window.ACTIVITIES_DATA = ACTIVITIES_DATA;
  window.getActivitiesByTier = getActivitiesByTier;
  window.getActivityById = getActivityById;
  window.getActivitiesBySubject = getActivitiesBySubject;
  window.getActivitiesByStage = getActivitiesByStage;
  window.getPreschoolJourneyActivities = getPreschoolJourneyActivities;
  window.getLifeSkillsActivities = getLifeSkillsActivities;
}

// Xuất bản sang CommonJS (cho Node.js Runner & Tests)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    default: ACTIVITIES_DATA,
    AGE_TIERS,
    ACTIVITIES_DATA,
    getActivitiesByTier,
    getActivityById,
    getActivitiesBySubject,
    getActivitiesByStage,
    getPreschoolJourneyActivities,
    getLifeSkillsActivities,
    LIFE_SKILLS: getLifeSkillsActivities()
  };
}
})();
`;

fs.writeFileSync(path.join(__dirname, '../activities-data.js'), outContent, 'utf8');
console.log(`Saved activities-data.js successfully! Total activities: ${combinedActivities.length}`);
