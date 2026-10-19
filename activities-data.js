// ========================================================
// MÔ HÌNH DỮ LIỆU BÀI HỌC & PHÂN TẦNG ĐỘ TUỔI (AGE TIERS & ACTIVITIES)
// ========================================================

const AGE_TIERS = {
  preschool: {
    id: "preschool",
    nameVi: "Tiền tiểu học",
    nameEn: "Preschool",
    ageVi: "4–6 tuổi",
    ageEn: "Ages 4–6",
    badge: "🐣",
    descVi: "Chữ cái, Học số, Đếm hình, Tiếng Anh & Đánh vần cơ bản",
    descEn: "Letters, Numbers, Counting, English & Phonics"
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

/**
 * MÔ HÌNH ACTIVITY HOÀN CHỈNH:
 * - id: string
 * - title: string, titleEn: string
 * - ageTier: 'preschool' | 'grade1_2' | 'grade3_5'
 * - subject: 'vietnamese' | 'math' | 'english' | 'reading'
 * - skill: string (nhãn kỹ năng thống kê phụ huynh)
 * - type: 'quiz' | 'image_quiz' | 'fill_blank' | 'matching' | 'drag_drop' | 'reading_passage'
 * - difficulty: 1 | 2 | 3
 * - content: { question, questionEn, media?, template?, storyText?, pairs?, slots?, tokens?, correctSequence? }
 * - options?: Array<{ id, text, textEn? }>
 * - correctAnswer?: string | number | Array<string>
 * - feedback: { correct: string, wrong: string, hint?: string }
 * - reward: { stars: number }
 */
const ACTIVITIES_DATA = [
  // ========================================================
  // NHÓM 1: TIỀN TIỂU HỌC (4–6 TUỔI) - 9 HOẠT ĐỘNG
  // ========================================================
  {
    id: "act_pre_let_01",
    title: "Chữ cái đầu tiên: Quả Táo 🍎",
    titleEn: "Starting Letter: Apple",
    ageTier: "preschool",
    subject: "vietnamese",
    skill: "Nhận biết âm đầu chữ cái tiếng Việt",
    type: "image_quiz",
    difficulty: 1,
    content: {
      question: "Quả 🍎 Táo bắt đầu bằng chữ cái nào bé nhỉ?",
      questionEn: "What letter does 'Apple' (Táo) start with?",
      media: "🍎"
    },
    options: [
      { id: "T", text: "Chữ T (Tờ)" },
      { id: "B", text: "Chữ B (Bờ)" },
      { id: "C", text: "Chữ C (Cờ)" }
    ],
    correctAnswer: "T",
    feedback: {
      correct: "Đúng rồi! T - Quả Táo đỏ mọng thơm ngon! 🍎",
      wrong: "Bé nghe lại nhé: Tờ - Táo! Bé thử lại nào!",
      hint: "Tờ - Táo"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_let_02",
    title: "Điền chữ còn thiếu: C_N MÈO 🐱",
    titleEn: "Missing Letter: C_N MÈO",
    ageTier: "preschool",
    subject: "vietnamese",
    skill: "Điền khuyết nguyên âm cơ bản",
    type: "fill_blank",
    difficulty: 1,
    content: {
      question: "Bé chọn chữ cái đúng để hoàn thành từ: C___N MÈO 🐱",
      questionEn: "Choose the missing letter to complete: C___N MÈO 🐱",
      media: "🐱",
      template: "C [ ? ] N  M È O"
    },
    options: [
      { id: "O", text: "O (Chữ O tròn)" },
      { id: "A", text: "A" },
      { id: "U", text: "U" }
    ],
    correctAnswer: "O",
    feedback: {
      correct: "Hoan hô bé! C - O - N ➔ CON MÈO kêu meo meo! 🐱",
      wrong: "Chữ O tròn như quả trứng gà bé ơi! Thử lại nhé!",
      hint: "Chữ O tròn xoe"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_let_03",
    title: "Ghép chữ in hoa và chữ thường 🔤",
    titleEn: "Match Uppercase & Lowercase",
    ageTier: "preschool",
    subject: "vietnamese",
    skill: "Nhận diện chữ hoa và chữ thường",
    type: "matching",
    difficulty: 2,
    content: {
      question: "Bé chạm vào chữ in hoa rồi chạm chữ in thường tương ứng nhé!",
      questionEn: "Match the uppercase letter with the lowercase letter!",
      media: "🔤",
      pairs: [
        { id: "p1", left: "Chữ A (Hoa)", right: "a (thường)" },
        { id: "p2", left: "Chữ B (Hoa)", right: "b (thường)" },
        { id: "p3", left: "Chữ C (Hoa)", right: "c (thường)" }
      ]
    },
    feedback: {
      correct: "Tuyệt vời! Bé đã ghép đúng cả 3 cặp chữ cái in hoa và in thường! 👏",
      wrong: "Bé nhìn thật kỹ dáng chữ rồi ghép lại nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_num_01",
    title: "Bé tìm chữ số 4 ⛵",
    titleEn: "Find Number 4",
    ageTier: "preschool",
    subject: "math",
    skill: "Nhận biết mặt chữ số 1–10",
    type: "image_quiz",
    difficulty: 1,
    content: {
      question: "Đố bé biết số 4 giống cánh buồm ở đâu?",
      questionEn: "Where is number 4 looking like a sailboat?",
      media: "⛵ ⛵ ⛵ ⛵"
    },
    options: [
      { id: "4", text: "Số 4" },
      { id: "1", text: "Số 1" },
      { id: "7", text: "Số 7" }
    ],
    correctAnswer: "4",
    feedback: {
      correct: "Chính xác! Số 4 giống như cánh buồm căng gió lướt sóng! ⛵",
      wrong: "Bé nhìn kỹ nhé: Số 4 có nét gập ngang như cánh buồm!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_num_02",
    title: "Sắp xếp số từ bé đến lớn: 1, 2, 3 🔢",
    titleEn: "Sort Numbers: 1, 2, 3",
    ageTier: "preschool",
    subject: "math",
    skill: "Thứ tự đếm số tự nhiên cơ bản",
    type: "drag_drop",
    difficulty: 1,
    content: {
      question: "Bé chạm vào các số để xếp theo thứ tự từ bé đến lớn nhé!",
      questionEn: "Tap the numbers in order from smallest to largest!",
      media: "🔢 1 ➔ 2 ➔ 3",
      slots: 3,
      tokens: [
        { id: "t2", text: "2" },
        { id: "t1", text: "1" },
        { id: "t3", text: "3" }
      ],
      correctSequence: ["1", "2", "3"]
    },
    feedback: {
      correct: "Xuất sắc! Thứ tự đúng là: 1 rồi đến 2, rồi đến 3! 🌟",
      wrong: "Số nào nhỏ nhất bé xếp trước nhé: 1, rồi đến mấy nhỉ?"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_num_03",
    title: "Nối số với số lượng quả táo 🍎",
    titleEn: "Match Number with Apple Count",
    ageTier: "preschool",
    subject: "math",
    skill: "Đếm tương ứng số lượng 1-1",
    type: "matching",
    difficulty: 2,
    content: {
      question: "Bé chạm vào số rồi chạm vào đĩa táo có số lượng tương ứng nhé!",
      questionEn: "Match the number with the correct count of apples!",
      media: "🍎 🍏 🍎",
      pairs: [
        { id: "m1", left: "Số 1", right: "🍎 (1 quả)" },
        { id: "m2", left: "Số 2", right: "🍎 🍎 (2 quả)" },
        { id: "m3", left: "Số 3", right: "🍎 🍎 🍎 (3 quả)" }
      ]
    },
    feedback: {
      correct: "Giỏi quá! Bé đếm số lượng quả táo rất cừ khôi! 🍎",
      wrong: "Bé đếm ngón tay từ 1 đến 3 để tìm đĩa táo đúng nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_eng_01",
    title: "Colors: Màu sắc mặt trời ☀️",
    titleEn: "Colors: Sun Color",
    ageTier: "preschool",
    subject: "english",
    skill: "Nhận biết từ vựng màu sắc tiếng Anh cơ bản",
    type: "image_quiz",
    difficulty: 1,
    content: {
      question: "Mặt trời ☀️ màu vàng rực rỡ, tiếng Anh gọi là gì?",
      questionEn: "What color is the sunny sun? ☀️",
      media: "☀️  YELLOW"
    },
    options: [
      { id: "yellow", text: "Yellow (Màu vàng)" },
      { id: "red", text: "Red (Màu đỏ)" },
      { id: "blue", text: "Blue (Màu xanh)" }
    ],
    correctAnswer: "yellow",
    feedback: {
      correct: "Awesome! Sun is Yellow! Màu vàng tiếng Anh là Yellow! ☀️",
      wrong: "Màu vàng là Yellow bé ơi! Nghe lại nhé: YEL-LOW!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_eng_02",
    title: "Animals: Ghép con vật tiếng Anh 🐶🐱",
    titleEn: "Match Animal Words",
    ageTier: "preschool",
    subject: "english",
    skill: "Từ vựng con vật thân thuộc tiếng Anh",
    type: "matching",
    difficulty: 1,
    content: {
      question: "Bé nối hình con vật với tên tiếng Anh của bạn ấy nhé!",
      questionEn: "Match the animal with its English name!",
      media: "🐶 🐱 🐥",
      pairs: [
        { id: "e1", left: "🐶 Chú chó", right: "Dog" },
        { id: "e2", left: "🐱 Chú mèo", right: "Cat" },
        { id: "e3", left: "🐥 Gà con", right: "Chick" }
      ]
    },
    feedback: {
      correct: "Hooray! Dog là chú chó, Cat là chú mèo, Chick là gà con! Giỏi lắm! 🎉",
      wrong: "Chú chó sủa gâu gâu là Dog, chú mèo meo meo là Cat bé nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_pre_read_01",
    title: "Đọc hiểu: Chú Thỏ Trắng ngoan ngoãn 🐰",
    titleEn: "Story: The Good Bunny",
    ageTier: "preschool",
    subject: "reading",
    skill: "Đọc hiểu chi tiết văn bản ngắn",
    type: "reading_passage",
    difficulty: 1,
    content: {
      storyText: "Chú Thỏ Trắng có đôi tai dài và bộ lông trắng muốt. Mỗi buổi sáng, Thỏ Trắng đều thích ăn củ cà rốt giòn ngọt cùng mẹ.",
      question: "Trong câu chuyện, chú Thỏ Trắng thích ăn món gì nhất?",
      questionEn: "What does the little bunny love to eat?",
      media: "🐰 🥕"
    },
    options: [
      { id: "carrot", text: "Củ cà rốt giòn ngọt 🥕" },
      { id: "fish", text: "Con cá rán 🐟" },
      { id: "candy", text: "Cái kẹo mút 🍭" }
    ],
    correctAnswer: "carrot",
    feedback: {
      correct: "Đúng rồi! Thỏ Trắng thích ăn củ cà rốt đỏ cam giòn rụm! 🥕🐰",
      wrong: "Bé nghe lại nhé: 'Thỏ Trắng đều thích ăn củ cà rốt giòn ngọt'!"
    },
    reward: { stars: 3 }
  },

  // ========================================================
  // NHÓM 2: LỚP 1–2 (6–8 TUỔI) - 9 HOẠT ĐỘNG
  // ========================================================
  {
    id: "act_g12_vn_01",
    title: "Điền vần đúng: Quả B___ng bay 🎈",
    titleEn: "Fill Phonics: Quả B_ng",
    ageTier: "grade1_2",
    subject: "vietnamese",
    skill: "Quy tắc chính tả ghép vần có âm cuối ng",
    type: "fill_blank",
    difficulty: 1,
    content: {
      question: "Bé chọn vần đúng điền vào chỗ chấm: 'Quả b___ng bay' 🎈",
      questionEn: "Choose the correct rhyme for 'Quả b___ng bay'",
      media: "🎈",
      template: "Quả  b [ ? ] ng  bay"
    },
    options: [
      { id: "o", text: "o (bong)" },
      { id: "a", text: "a (bang)" },
      { id: "u", text: "u (bung)" }
    ],
    correctAnswer: "o",
    feedback: {
      correct: "Chính xác! B - O - NG ➔ BÓNG, 'Quả bóng bay' rực rỡ sắc màu! 🎈",
      wrong: "Bé đánh vần nhé: Bờ - ong - bong - sắc - bóng!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_vn_02",
    title: "Sắp xếp từ thành câu: Bé yêu gia đình 👨‍👩‍👧",
    titleEn: "Word Order: Family Love",
    ageTier: "grade1_2",
    subject: "vietnamese",
    skill: "Cấu trúc ngữ pháp câu đơn tiếng Việt",
    type: "drag_drop",
    difficulty: 2,
    content: {
      question: "Bé chạm vào các từ để sắp xếp thành một câu có nghĩa nhé!",
      questionEn: "Tap the words to form a meaningful sentence!",
      media: "👨‍👩‍👧 ❤️",
      slots: 3,
      tokens: [
        { id: "w2", text: "rất yêu" },
        { id: "w1", text: "Bé" },
        { id: "w3", text: "gia đình" }
      ],
      correctSequence: ["Bé", "rất yêu", "gia đình"]
    },
    feedback: {
      correct: "Tuyệt vời! Câu hoàn chỉnh là: 'Bé rất yêu gia đình'! 👨‍👩‍👧❤️",
      wrong: "Bé xếp ai trước nhỉ? 'Bé' trước rồi đến 'rất yêu' nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_vn_03",
    title: "Chính tả C hay K: Con ___ua và con ___iến 🦀🐜",
    titleEn: "Spelling Rule: C or K",
    ageTier: "grade1_2",
    subject: "vietnamese",
    skill: "Quy tắc chính tả phân biệt C và K",
    type: "image_quiz",
    difficulty: 2,
    content: {
      question: "Từ nào viết đúng chính tả tiếng Việt bé nhỉ?",
      questionEn: "Which word has correct Vietnamese spelling?",
      media: "🦀 🐜"
    },
    options: [
      { id: "optA", text: "Con cua & con kiến (Đúng) ✔" },
      { id: "optB", text: "Con kua & con ciến ✖" },
      { id: "optC", text: "Con kua & con kiến ✖" }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Quá xuất sắc! Chữ K đứng trước i, e, ê (con kiến), còn chữ C đứng trước u, o, a (con cua)! 👏",
      wrong: "Bé nhớ quy tắc nhé: Chữ K chỉ đi với i, e, ê thôi nè!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_math_01",
    title: "Phép cộng có nhớ: 8 + 7 = ? 🧮",
    titleEn: "Addition within 20: 8 + 7",
    ageTier: "grade1_2",
    subject: "math",
    skill: "Phép tính cộng qua 10 phạm vi 20",
    type: "fill_blank",
    difficulty: 2,
    content: {
      question: "Bé tính nhẩm: 8 + 7 bằng bao nhiêu?",
      questionEn: "Calculate: 8 + 7 = ?",
      media: "8 + 7 = ?",
      template: "8  +  7  =  [ ? ]"
    },
    options: [
      { id: "15", text: "15" },
      { id: "14", text: "14" },
      { id: "16", text: "16" }
    ],
    correctAnswer: "15",
    feedback: {
      correct: "Chính xác! 8 + 2 = 10, 10 + 5 = 15! Tính nhẩm quá cừ! 🧮",
      wrong: "Bé tách 7 thành 2 và 5 nhé: 8 + 2 = 10, cộng thêm 5 bằng mấy nào?"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_math_02",
    title: "Dãy số cách đều 5: 5, 10, 15, ___ 🚀",
    titleEn: "Number Pattern by 5s",
    ageTier: "grade1_2",
    subject: "math",
    skill: "Quy luật dãy số cách đều đếm tiến",
    type: "fill_blank",
    difficulty: 2,
    content: {
      question: "Bé tìm số tiếp theo của dãy số: 5, 10, 15, ...?",
      questionEn: "What number comes next: 5, 10, 15, ...?",
      media: "5 ➔ 10 ➔ 15 ➔ [ ? ]",
      template: "5,  10,  15,  [ ? ]"
    },
    options: [
      { id: "20", text: "20" },
      { id: "18", text: "18" },
      { id: "25", text: "25" }
    ],
    correctAnswer: "20",
    feedback: {
      correct: "Đúng rồi! Cứ thêm 5 đơn vị: 15 + 5 = 20! Bé rất nhanh trí! 🚀",
      wrong: "Mỗi bước nhảy thêm 5 số bé ơi: 15 cộng thêm 5 bằng bao nhiêu nhỉ?"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_math_03",
    title: "Ghép phép tính có cùng kết quả = 10 🎯",
    titleEn: "Match Equations Sum to 10",
    ageTier: "grade1_2",
    subject: "math",
    skill: "Cặp số cộng bằng 10 và tính chất giao hoán",
    type: "matching",
    difficulty: 2,
    content: {
      question: "Bé ghép phép tính ở cột trái với phép tính có cùng kết quả ở cột phải nhé!",
      questionEn: "Match expressions that have the same result!",
      media: "🎯 = 10",
      pairs: [
        { id: "sum1", left: "6 + 4", right: "5 + 5 (cùng = 10)" },
        { id: "sum2", left: "7 + 3", right: "8 + 2 (cùng = 10)" },
        { id: "sum3", left: "9 + 1", right: "10 + 0 (cùng = 10)" }
      ]
    },
    feedback: {
      correct: "Tuyệt đỉnh! Tất cả các phép tính này đều có tổng bằng 10! 🎯",
      wrong: "Bé nhẩm tính từng phép tính xem kết quả có bằng 10 không nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_eng_01",
    title: "School Things: Đồ dùng học tập 🖊️📖",
    titleEn: "School Items Match",
    ageTier: "grade1_2",
    subject: "english",
    skill: "Từ vựng đồ dùng học sinh tiếng Anh",
    type: "matching",
    difficulty: 1,
    content: {
      question: "Bé nối đồ dùng học tập với từ tiếng Anh tương ứng nhé!",
      questionEn: "Match school items with their English names!",
      media: "🖊️ 📖 📏",
      pairs: [
        { id: "sc1", left: "🖊️ Cái bút", right: "Pen" },
        { id: "sc2", left: "📖 Quyển sách", right: "Book" },
        { id: "sc3", left: "📏 Thước kẻ", right: "Ruler" }
      ]
    },
    feedback: {
      correct: "Great job! Pen là bút, Book là sách, Ruler là thước kẻ! 🖊️📖",
      wrong: "Cái bút là Pen, quyển sách là Book bé nhớ nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_eng_02",
    title: "Missing letter: B_OK (Quyển sách) 📖",
    titleEn: "Spell the word: BOOK",
    ageTier: "grade1_2",
    subject: "english",
    skill: "Đánh vần và nhận biết từ vựng tiếng Anh",
    type: "fill_blank",
    difficulty: 1,
    content: {
      question: "Điền chữ cái còn thiếu để có từ 'BOOK' (Quyển sách):",
      questionEn: "Fill in the missing letter for 'BOOK':",
      media: "📖",
      template: "B  [ ? ]  O  K"
    },
    options: [
      { id: "O", text: "O (B-O-O-K)" },
      { id: "A", text: "A" },
      { id: "U", text: "U" }
    ],
    correctAnswer: "O",
    feedback: {
      correct: "Well done! B-O-O-K ➔ BOOK nghĩa là quyển sách! 📖",
      wrong: "Từ 'BOOK' có hai chữ O đứng cạnh nhau bé nha: B-O-O-K!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g12_read_01",
    title: "Đọc hiểu: Chuyện Rùa và Thỏ chạy thi 🐢🐇",
    titleEn: "Story: The Tortoise and The Hare",
    ageTier: "grade1_2",
    subject: "reading",
    skill: "Đọc hiểu ý nghĩa và bài học ngụ ngôn",
    type: "reading_passage",
    difficulty: 2,
    content: {
      storyText: "Trong cuộc chạy thi, Thỏ cậy mình chạy nhanh nên mải ngắm hoa bắt bướm rồi ngủ quên dưới gốc cây. Bác Rùa tuy chậm chạp nhưng kiên trì bước từng bước một và đã về đích đầu tiên.",
      question: "Vì sao bác Rùa lại giành chiến thắng trong cuộc chạy thi?",
      questionEn: "Why did the tortoise win the race?",
      media: "🐢 🏆 🐇"
    },
    options: [
      { id: "optA", text: "Vì Rùa kiên trì, không bỏ cuộc giữa chừng" },
      { id: "optB", text: "Vì Rùa biết bay trên trời" },
      { id: "optC", text: "Vì đường chạy quá ngắn" }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Rất xuất sắc! Bài học quý giá: 'Kiên trì, nỗ lực ắt sẽ thành công'! 🐢🥇",
      wrong: "Bé đọc lại nhé: Rùa thắng vì kiên trì từng bước một trong khi Thỏ ngủ quên!"
    },
    reward: { stars: 3 }
  },

  // ========================================================
  // NHÓM 3: LỚP 3–5 (8–11 TUỔI) - 9 HOẠT ĐỘNG
  // ========================================================
  {
    id: "act_g35_vn_01",
    title: "Tìm từ đồng nghĩa với 'Chăm chỉ' 🐝",
    titleEn: "Synonyms: Diligent",
    ageTier: "grade3_5",
    subject: "vietnamese",
    skill: "Mở rộng vốn từ đồng nghĩa tiếng Việt",
    type: "image_quiz",
    difficulty: 2,
    content: {
      question: "Từ nào dưới đây đồng nghĩa với từ 'Chăm chỉ'?",
      questionEn: "Which word is a synonym for 'Chăm chỉ' (Diligent)?",
      media: "🐝 📖 ✍️"
    },
    options: [
      { id: "optA", text: "Cần cù (chịu khó làm lụng)" },
      { id: "optB", text: "Thông minh" },
      { id: "optC", text: "Thật thà" }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Chính xác! 'Cần cù', 'siêng năng', 'chuyên cần' đều đồng nghĩa với 'chăm chỉ'! 🐝",
      wrong: "'Thông minh' là nhanh trí, còn 'cần cù' mới cùng nghĩa với chăm chỉ bé nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_vn_02",
    title: "Ghép thành ngữ: Học thầy không tày... 📜",
    titleEn: "Proverb: Learning from peers",
    ageTier: "grade3_5",
    subject: "vietnamese",
    skill: "Hiểu biết thành ngữ tục ngữ truyền thống",
    type: "drag_drop",
    difficulty: 3,
    content: {
      question: "Bé chạm vào các cụm từ để hoàn chỉnh câu tục ngữ nổi tiếng:",
      questionEn: "Arrange the phrase to complete the Vietnamese proverb:",
      media: "📜 ✍️",
      slots: 3,
      tokens: [
        { id: "p3", text: "không tày" },
        { id: "p1", text: "Học thầy" },
        { id: "p2", text: "học bạn" }
      ],
      correctSequence: ["Học thầy", "không tày", "học bạn"]
    },
    feedback: {
      correct: "Đúng rồi! 'Học thầy không tày học bạn' khuyên chúng ta vừa kính trọng thầy cô vừa học hỏi bạn bè! 📜",
      wrong: "Bé xếp theo nhịp câu nhé: Học thầy ➔ không tày ➔ học bạn!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_vn_03",
    title: "Cặp từ trái nghĩa trong tiếng Việt ⚖️",
    titleEn: "Vietnamese Antonyms Match",
    ageTier: "grade3_5",
    subject: "vietnamese",
    skill: "Nhận biết và sử dụng cặp từ trái nghĩa",
    type: "matching",
    difficulty: 2,
    content: {
      question: "Bé nối từng từ ở cột trái với từ trái nghĩa tương ứng ở cột phải:",
      questionEn: "Match words with their antonyms!",
      media: "⚖️",
      pairs: [
        { id: "ant1", left: "Dũng cảm (gan dạ)", right: "Hèn nhát" },
        { id: "ant2", left: "Rộng lớn (bao la)", right: "Nhỏ hẹp" },
        { id: "ant3", left: "Đoàn kết (gắn bó)", right: "Chia rẽ" }
      ]
    },
    feedback: {
      correct: "Xuất sắc! Dũng cảm ⚔️ Hèn nhát; Rộng lớn ⚔️ Nhỏ hẹp; Đoàn kết ⚔️ Chia rẽ! 👏",
      wrong: "Bé suy nghĩ kỹ xem từ nào mang ý nghĩa ngược lại hoàn toàn nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_math_01",
    title: "Bảng nhân 8: 8 × 7 = ? 📐",
    titleEn: "Multiplication Table: 8 × 7",
    ageTier: "grade3_5",
    subject: "math",
    skill: "Ghi nhớ bảng nhân 8 và tính nhẩm",
    type: "image_quiz",
    difficulty: 2,
    content: {
      question: "Bé tính nhanh kết quả của phép nhân: 8 × 7 = ?",
      questionEn: "Calculate: 8 × 7 = ?",
      media: "8 × 7 = ?"
    },
    options: [
      { id: "56", text: "56" },
      { id: "54", text: "54" },
      { id: "64", text: "64" }
    ],
    correctAnswer: "56",
    feedback: {
      correct: "Chính xác! 8 × 7 = 56! Bé thuộc bảng nhân rất chắc chắn! 📐",
      wrong: "Bé nhẩm lại nhé: 8 × 5 = 40, 8 × 6 = 48, vậy 8 × 7 bằng mấy nào?"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_math_02",
    title: "Phân số cơ bản: Một nửa chiếc bánh pizza 🍕",
    titleEn: "Fractions: Half a Pizza",
    ageTier: "grade3_5",
    subject: "math",
    skill: "Khái niệm phân số và phần bằng nhau của đơn vị",
    type: "fill_blank",
    difficulty: 2,
    content: {
      question: "Chia đều chiếc bánh pizza làm 2 phần bằng nhau, lấy 1 phần gọi là phân số nào?",
      questionEn: "What fraction represents half of a pizza?",
      media: "🍕 ➔ 1/2",
      template: "Một nửa chiếc bánh =  [ ? ]"
    },
    options: [
      { id: "1/2", text: "1/2 (Một phần hai)" },
      { id: "1/4", text: "1/4 (Một phần tư)" },
      { id: "2/1", text: "2/1" }
    ],
    correctAnswer: "1/2",
    feedback: {
      correct: "Đúng rồi! Lấy 1 phần trên tổng số 2 phần bằng nhau chính là phân số 1/2! 🍕",
      wrong: "Có 2 phần bằng nhau, bé lấy 1 phần thì tử số là 1, mẫu số là 2 nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_math_03",
    title: "Phép chia có dư: 26 chia cho 4 🍬",
    titleEn: "Division with Remainder: 26 ÷ 4",
    ageTier: "grade3_5",
    subject: "math",
    skill: "Thực hiện phép chia có dư trong phạm vi 100",
    type: "image_quiz",
    difficulty: 3,
    content: {
      question: "Có 26 chiếc kẹo chia đều cho 4 bạn. Mỗi bạn được mấy chiếc kẹo và dư mấy chiếc? (26 ÷ 4 = ?)",
      questionEn: "Divide 26 candies among 4 friends. How many each, and remainder?",
      media: "🍬 26 ÷ 4 = ?"
    },
    options: [
      { id: "optA", text: "Mỗi bạn 6 chiếc, dư 2 chiếc" },
      { id: "optB", text: "Mỗi bạn 5 chiếc, dư 6 chiếc" },
      { id: "optC", text: "Mỗi bạn 6 chiếc, không dư" }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Quá giỏi! 4 × 6 = 24; 26 - 24 = 2 (dư 2 chiếc kẹo)! Số dư luôn bé hơn số chia! 🍬",
      wrong: "Bé nhẩm xem: 4 nhân mấy gần 26 nhất? 4 × 6 = 24, 26 trừ 24 còn dư mấy nhỉ?"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_eng_01",
    title: "Daily English: What time is it? ⏰",
    titleEn: "What time is it?",
    ageTier: "grade3_5",
    subject: "english",
    skill: "Mẫu câu hỏi và trả lời giờ giấc tiếng Anh",
    type: "image_quiz",
    difficulty: 2,
    content: {
      question: "Đồng hồ chỉ đúng 8:00 sáng. Câu trả lời tiếng Anh nào chính xác?",
      questionEn: "The clock shows 8:00 AM. Which answer is correct?",
      media: "⏰ 8:00"
    },
    options: [
      { id: "optA", text: "It's eight o'clock." },
      { id: "optB", text: "It's seven o'clock." },
      { id: "optC", text: "It's eight hours." }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Excellent! 'It's eight o'clock' nghĩa là 'Bây giờ là tám giờ đúng'! ⏰👏",
      wrong: "Số 8 là eight, khi nói giờ đúng ta dùng cấu trúc: 'It's + số giờ + o'clock' bé nha!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_eng_02",
    title: "English Opposites: Cặp từ đối lập ❄️🔥",
    titleEn: "Opposite Adjectives Match",
    ageTier: "grade3_5",
    subject: "english",
    skill: "Tính từ trái nghĩa trong tiếng Anh",
    type: "matching",
    difficulty: 2,
    content: {
      question: "Bé ghép các cặp tính từ trái nghĩa trong tiếng Anh nhé!",
      questionEn: "Match the opposite adjectives!",
      media: "❄️ ⚔️ 🔥",
      pairs: [
        { id: "opp1", left: "Hot (Nóng 🔥)", right: "Cold (Lạnh ❄️)" },
        { id: "opp2", left: "Big (To lớn 🐘)", right: "Small (Nhỏ bé 🐭)" },
        { id: "opp3", left: "Happy (Vui vẻ 😊)", right: "Sad (Buồn bã 😢)" }
      ]
    },
    feedback: {
      correct: "Super smart! Hot ⚔️ Cold, Big ⚔️ Small, Happy ⚔️ Sad! Vốn từ tiếng Anh của bé rất phong phú! 🌟",
      wrong: "Bé đọc kỹ nghĩa tiếng Việt bên cạnh để tìm cặp đối lập nhé!"
    },
    reward: { stars: 3 }
  },
  {
    id: "act_g35_read_01",
    title: "Đọc hiểu: Truyền thuyết Hồ Gươm 🏛️🐢",
    titleEn: "Legend of Sword Lake",
    ageTier: "grade3_5",
    subject: "reading",
    skill: "Đọc hiểu ngữ liệu lịch sử và danh lam thắng cảnh",
    type: "reading_passage",
    difficulty: 3,
    content: {
      storyText: "Hồ Gươm nằm giữa lòng thủ đô Hà Nội cổ kính. Truyền thuyết kể rằng sau khi đánh tan giặc ngoại xâm, vua Lê Lợi dạo thuyền rồng trên hồ. Rùa Vàng nổi lên mặt nước đòi lại thanh gươm thần mà Long Quân đã cho mượn để cứu nước. Từ đó hồ mang tên Hồ Hoàn Kiếm (Hồ Trả Gươm).",
      question: "Theo truyền thuyết, Rùa Vàng nổi lên mặt hồ để làm gì?",
      questionEn: "According to the legend, why did the Golden Turtle emerge?",
      media: "🏛️ 🐢 🗡️"
    },
    options: [
      { id: "optA", text: "Đòi lại thanh gươm thần để trả cho Long Quân" },
      { id: "optB", text: "Tặng thêm cho nhà vua một thanh gươm mới" },
      { id: "optC", text: "Mời nhà vua xuống thăm thủy cung" }
    ],
    correctAnswer: "optA",
    feedback: {
      correct: "Hoàn toàn chính xác! Vua Lê Lợi đã trả gươm báu cho Rùa Vàng, thể hiện khát vọng hòa bình của dân tộc Việt Nam! 🇻🇳🐢",
      wrong: "Bé đọc kỹ câu: 'Rùa Vàng nổi lên mặt nước đòi lại thanh gươm thần mà Long Quân đã cho mượn' nhé!"
    },
    reward: { stars: 3 }
  },

  // ========================================================
  // BÀI HỌC MẪU THEO CHUẨN JSON SCHEMA MỚI (GDPT 2018)
  // ========================================================
  {
    id: "act_std_sci_01",
    title: "Vòng tuần hoàn kỳ thú của Nước 🌧️☀️",
    titleEn: "The Wonder Water Cycle",
    ageTier: "grade3_5",
    subject: "science",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=al-do-HGuIk",
      thumbnail: "https://img.youtube.com/vi/al-do-HGuIk/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 môn Khoa học lớp 4: Nêu được sự chuyển thể của nước; giải thích được vòng tuần hoàn của nước trong tự nhiên.",
    difficulty: 3,
    content: [
      {
        question: "Dưới ánh nắng mặt trời, nước ở ao hồ, sông biển biến đổi như thế nào?",
        options: [
          "Nước đóng băng lại thành tảng đá",
          "Nước nóng lên và bay hơi thành thể khí bay lên cao",
          "Nước biến thành đất cát",
          "Nước không có biến đổi gì"
        ],
        correctAnswer: 1,
        explanation: "Nhiệt độ mặt trời làm nóng bề mặt nước, nước chuyển từ thể lỏng sang thể khí (bay hơi) và bay lên bầu khí quyển."
      },
      {
        question: "Khi hơi nước bốc lên cao gặp không khí lạnh thì điều gì sẽ xảy ra?",
        options: [
          "Ngưng tụ thành những hạt nước li ti tạo thành mây",
          "Biến mất hoàn toàn vào không gian vũ trụ",
          "Rơi ngay lập tức xuống đất thành than",
          "Cháy sáng rực rỡ"
        ],
        correctAnswer: 0,
        explanation: "Càng lên cao nhiệt độ càng giảm, hơi nước ngưng tụ thành muôn vàn hạt nước nhỏ li ti tụ lại thành từng đám mây bồng bềnh."
      }
    ]
  },
  {
    id: "act_std_skill_01",
    title: "Bé qua đường an toàn cùng bạn Thỏ 🚦🐇",
    titleEn: "Safe Road Crossing with Bunny",
    ageTier: "preschool",
    subject: "skills",
    type: "interactive_story",
    mediaSource: {
      type: "image_set",
      url: "img/traffic_safety.png",
      thumbnail: "img/traffic_safety_thumb.png"
    },
    learningObjective: "CT GD Mầm non & GDPT 2018: Nhận biết tín hiệu đèn giao thông và kỹ năng nắm tay người lớn an toàn khi qua đường.",
    difficulty: 1,
    content: [
      {
        question: "Khi nhìn thấy đèn tín hiệu giao thông chuyển sang màu ĐỎ 🔴, bé và bạn Thỏ phải làm gì?",
        options: [
          "Chạy thật nhanh qua đường",
          "Dừng lại trên vỉa hè và kiên nhẫn chờ đợi",
          "Nhảy múa giữa lòng đường"
        ],
        correctAnswer: 1,
        explanation: "Đèn đỏ báo hiệu tất cả mọi người phải dừng lại để đảm bảo an toàn tính mạng nhé bé ơi! 🔴"
      },
      {
        question: "Khi đèn dành cho người đi bộ chuyển sang màu XANH 🟢, bé nên qua đường như thế nào?",
        options: [
          "Nắm chặt tay bố mẹ, quan sát hai bên và đi trên vạch kẻ trắng",
          "Vừa chạy vừa đá bóng qua đường",
          "Nhắm mắt lại và tự đi một mình"
        ],
        correctAnswer: 0,
        explanation: "Luôn luôn nắm chặt tay người lớn, quan sát xe cộ hai bên và bước đi trên vạch kẻ đường dành cho người đi bộ! 🟢"
      }
    ]
  },
  {
    id: "act_std_math_01",
    title: "Chiếc cân thăng bằng bí ẩn ⚖️🍎🍐",
    titleEn: "The Mystery Balance Scale",
    ageTier: "grade1_2",
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/balance_scale.png",
      thumbnail: "img/balance_scale_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 2: Hình thành tư duy đại số sơ khởi thông qua quan hệ bằng nhau và suy luận logic tương đương.",
    difficulty: 2,
    content: [
      {
        question: "Cân 1: 1 quả Táo 🍎 nặng bằng 2 quả Mận 🫐. Cân 2: 1 quả Lê 🍐 nặng bằng 1 quả Táo 🍎. Hỏi 1 quả Lê 🍐 nặng bằng mấy quả Mận 🫐?",
        options: [
          "1 quả Mận 🫐",
          "2 quả Mận 🫐",
          "3 quả Mận 🫐",
          "4 quả Mận 🫐"
        ],
        correctAnswer: 1,
        explanation: "Vì 1 quả Lê = 1 quả Táo, mà 1 quả Táo = 2 quả Mận, nên 1 quả Lê cũng nặng bằng đúng 2 quả Mận! ⚖️"
      }
    ]
  },
  {
    id: "act_std_vie_01",
    title: "Thám tử tìm vần: Phân biệt AN và AT 🔍📝",
    titleEn: "Phonics Detective: Sound AN vs AT",
    ageTier: "grade1_2",
    subject: "vietnamese",
    type: "phonics_game",
    mediaSource: {
      type: "local_mp4",
      url: "audio/vtv7_phonics_an_at.mp3",
      thumbnail: "img/phonics_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Tiếng Việt lớp 1: Nhận diện và phân biệt được các vần có âm cuối tương đồng (vần mở/đóng: an - at), đọc trơn và hiểu nghĩa từ.",
    difficulty: 2,
    content: [
      {
        question: "Từ nào dưới đây chứa vần 'AN' (a-n-an)?",
        options: [
          "Cái Bát 🥣",
          "Cái Bàn 🪵",
          "Con Hát 🎤",
          "Mặt Trời ☀️"
        ],
        correctAnswer: 1,
        explanation: "Cái Bàn: b-an-ban-huyền-bàn. Tiếng 'Bàn' chứa vần 'AN'!"
      },
      {
        question: "Từ nào dưới đây chứa vần 'AT' (a-t-at)?",
        options: [
          "Bãi Cát 🏖️",
          "Hoa Lan 🌸",
          "Cái Căn 🏠",
          "Đàn Gà 🐔"
        ],
        correctAnswer: 0,
        explanation: "Bãi Cát: c-at-cat-sắc-cát. Tiếng 'Cát' chứa vần 'AT'!"
      }
    ]
  }
];

// Định nghĩa JSON Schema chuẩn
const ACTIVITY_SCHEMA = {
  $id: "https://behocvui.vn/schemas/activity.schema.json",
  type: "object",
  required: [
    "id", "title", "titleEn", "ageTier", "subject",
    "type", "mediaSource", "learningObjective", "difficulty", "content"
  ],
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    titleEn: { type: "string" },
    ageTier: { enum: ["preschool", "grade1_2", "grade3_5"] },
    subject: { enum: ["vietnamese", "math", "english", "science", "skills"] },
    type: { enum: ["video_quiz", "interactive_story", "logic_puzzle", "phonics_game"] },
    mediaSource: {
      type: "object",
      required: ["type", "url", "thumbnail"],
      properties: {
        type: { enum: ["youtube", "local_mp4", "image_set"] },
        url: { type: "string" },
        thumbnail: { type: "string" }
      }
    },
    learningObjective: { type: "string" },
    difficulty: { type: "integer", minimum: 1, maximum: 5 },
    content: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["question", "options", "correctAnswer", "explanation"],
        properties: {
          question: { type: "string" },
          options: { type: "array", minItems: 2 },
          correctAnswer: { type: ["string", "number"] },
          explanation: { type: "string" }
        }
      }
    }
  }
};

// Hàm kiểm tra tính hợp lệ của bài học theo Schema
function validateActivity(act) {
  const errors = [];
  if (!act || typeof act !== "object") return { valid: false, errors: ["Activity must be an object"] };
  if (!act.id || typeof act.id !== "string") errors.push("Missing or invalid 'id'");
  if (!act.title || typeof act.title !== "string") errors.push("Missing or invalid 'title'");
  if (!act.titleEn || typeof act.titleEn !== "string") errors.push("Missing or invalid 'titleEn'");
  if (!["preschool", "grade1_2", "grade3_5"].includes(act.ageTier)) errors.push("Invalid 'ageTier'");
  if (!["vietnamese", "math", "english", "science", "skills", "reading", "logic"].includes(act.subject)) errors.push("Invalid 'subject'");
  if (!act.mediaSource || typeof act.mediaSource !== "object") {
    errors.push("Missing 'mediaSource'");
  } else {
    if (!["youtube", "local_mp4", "image_set"].includes(act.mediaSource.type)) errors.push("Invalid 'mediaSource.type'");
    if (typeof act.mediaSource.url !== "string") errors.push("Invalid 'mediaSource.url'");
    if (typeof act.mediaSource.thumbnail !== "string") errors.push("Invalid 'mediaSource.thumbnail'");
  }
  if (!act.learningObjective && !act.skill) errors.push("Missing 'learningObjective'");
  if (typeof act.difficulty !== "number" || act.difficulty < 1 || act.difficulty > 5) errors.push("Invalid 'difficulty' (must be 1-5)");
  if (!Array.isArray(act.content) || act.content.length === 0) {
    errors.push("'content' must be a non-empty array");
  } else {
    act.content.forEach((item, idx) => {
      if (!item.question || typeof item.question !== "string") errors.push(`Item ${idx}: missing 'question'`);
      if (!Array.isArray(item.options) || item.options.length < 2) errors.push(`Item ${idx}: 'options' must have at least 2 items`);
      if (item.correctAnswer === undefined) errors.push(`Item ${idx}: missing 'correctAnswer'`);
      if (!item.explanation || typeof item.explanation !== "string") errors.push(`Item ${idx}: missing 'explanation'`);
    });
  }
  return { valid: errors.length === 0, errors };
}

// Helper lấy danh sách bài học theo nhóm tuổi (Tương thích 100% với code hiện có)
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

if (typeof window !== "undefined") {
  window.AGE_TIERS = AGE_TIERS;
  window.ACTIVITIES_DATA = ACTIVITIES_DATA;
  window.ACTIVITY_SCHEMA = ACTIVITY_SCHEMA;
  window.validateActivity = validateActivity;
  window.getActivitiesByTier = getActivitiesByTier;
  window.getActivityById = getActivityById;
  window.getActivitiesBySubject = getActivitiesBySubject;
}

export default ACTIVITIES_DATA;
export {
  AGE_TIERS,
  ACTIVITIES_DATA,
  ACTIVITY_SCHEMA,
  validateActivity,
  getActivitiesByTier,
  getActivityById,
  getActivitiesBySubject
};
