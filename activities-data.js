(function () {
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
  // NHÓM 1: CHUẨN BỊ VÀO LỚP 1 (4–6 TUỔI) - LỘ TRÌNH 5 CHẶNG THEO GOOGLE DRIVE (34 BÀI HỌC)
  // ========================================================
  // Source: GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1 (Trang 1)
  {
    "id": "act_s0_tu_the_cam_but",
    "title": "Tư thế ngồi học và cách cầm bút đúng chuẩn 🎒",
    "titleEn": "Sitting Posture and Pencil Grip",
    "icon": "🎒",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "skills",
    "skill": "Tư thế ngồi học và cầm bút",
    "skills": [
      "life.school_manners",
      "vi.trace.prep"
    ],
    "prerequisites": [],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận biết tư thế ngồi học thẳng lưng, mắt cách vở 25-30cm và quy tắc cầm bút bằng 3 ngón tay.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/posture_pencil.png",
      "thumbnail": "img/posture_pencil.png"
    },
    "source": "GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1 (Trang 1)",
    "content": {
      "question": "Bé cầm bút bằng mấy ngón tay của bàn tay phải? ✏️",
      "questionEn": "How many fingers do you use to hold the pencil?",
      "media": "✏️ 🖐️"
    },
    "options": [
      {
        "id": "opt_3",
        "text": "3 ngón tay (ngón cái, ngón trỏ giữ, ngón giữa đỡ) ✍️"
      },
      {
        "id": "opt_all",
        "text": "Nắm cả bàn tay ✊"
      },
      {
        "id": "opt_1",
        "text": "Chỉ dùng 1 ngón tay ☝️"
      }
    ],
    "correctAnswer": "opt_3",
    "feedback": {
      "correct": "Đúng rồi! Cầm bút bằng tay phải, dùng ngón cái và ngón trỏ giữ bút, ngón giữa đỡ phía dưới nhé! 🌟",
      "wrong": "Bé nhớ quy tắc 3 ngón tay cầm bút: ngón cái, ngón trỏ và ngón giữa nhé!",
      "hint": "Quy tắc 3 ngón tay cầm bút"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1 (Trang 1)
  {
    "id": "act_s0_do_dung_hoc_tap",
    "title": "Nhận biết đồ dùng học tập của bé Lớp 1 🎒✏️",
    "titleEn": "School Supplies for Grade 1",
    "icon": "🎒",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "skills",
    "skill": "Nhận biết đồ dùng học tập",
    "skills": [
      "life.observation",
      "life.study_corner"
    ],
    "prerequisites": [],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé làm quen và gọi đúng tên các đồ dùng đi học: cặp sách, hộp bút, bút chì, thước kẻ, bảng con.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/school_supplies.png",
      "thumbnail": "img/school_supplies.png"
    },
    "source": "GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1 (Trang 1)",
    "content": {
      "question": "Đồ dùng nào dùng để đựng sách vở và dụng cụ khi bé đến trường? 🎒",
      "questionEn": "Which item holds your books and supplies when going to school?",
      "media": "🎒 ✏️ 📏"
    },
    "options": [
      {
        "id": "opt_bag",
        "text": "Cặp sách (Balo đi học) 🎒"
      },
      {
        "id": "opt_pillow",
        "text": "Gối ngủ 🛋️"
      },
      {
        "id": "opt_bowl",
        "text": "Bát ăn cơm 🥣"
      }
    ],
    "correctAnswer": "opt_bag",
    "feedback": {
      "correct": "Chính xác! Cặp sách giúp bé xếp gọn gàng sách vở, hộp bút để sẵn sàng tới trường! 🎒✨",
      "wrong": "Bé chọn chiếc cặp sách xinh xắn để đựng sách vở nhé!",
      "hint": "Chiếc cặp sách (balo)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1; cac net co ban.pdf - Page 1
  {
    "id": "act_s0_dong_ke_o_ly",
    "title": "Làm quen dòng kẻ ô ly và bảng con 📏",
    "titleEn": "Grid Lines and Writing Slate",
    "icon": "✏️",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Nhận biết dòng kẻ ô ly",
    "skills": [
      "vi.trace.prep"
    ],
    "prerequisites": [],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận biết đường kẻ ngang đậm (mặt đất), đường kẻ dọc và các ô ly 1 ly, 2 ly.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/grid_lines.png",
      "thumbnail": "img/grid_lines.png"
    },
    "source": "GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1; cac net co ban.pdf - Page 1",
    "content": {
      "question": "Đường kẻ ngang đậm nhất ở dưới cùng của bảng ô ly được gọi là gì? 📏",
      "questionEn": "What is the boldest horizontal line at the bottom called?",
      "media": "📏 ⬛ 🔲"
    },
    "options": [
      {
        "id": "opt_mat_dat",
        "text": "Đường kẻ ngang 1 (Đường mặt đất) 🏡"
      },
      {
        "id": "opt_mai_nha",
        "text": "Mái nhà cao ⛺"
      },
      {
        "id": "opt_dong_song",
        "text": "Dòng sông xanh 🌊"
      }
    ],
    "correctAnswer": "opt_mat_dat",
    "feedback": {
      "correct": "Đúng rồi! Đường kẻ ngang 1 là đường kẻ đậm, còn được gọi là mặt đất để đặt chân các chữ cái! 🏡🌟",
      "wrong": "Bé chọn đường kẻ ngang số 1 (đường mặt đất) nhé!",
      "hint": "Đường mặt đất (đường ngang 1)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: cac net co ban.pdf - Page 1-8; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1, 2
  {
    "id": "act_s0_net_thang",
    "title": "Tập viết Nhóm 1: Nét thẳng đứng, nét ngang và nét xiên ✏️",
    "titleEn": "Strokes Group 1: Straight, Horizontal, and Slanted Lines",
    "icon": "✏️",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Luyện viết nét thẳng",
    "skills": [
      "vi.trace.strokes"
    ],
    "prerequisites": [],
    "type": "trace",
    "traceMode": "net",
    "traceItem": "net_thang_dung",
    "difficulty": 1,
    "learningObjective": "Bé tập tô nét thẳng đứng cao 2 ly, nét ngang rộng 2 ly, nét xiên trái và xiên phải theo ô ly.",
    "mediaSource": {
      "type": "image_set",
      "url": "trace:net",
      "thumbnail": "trace:net"
    },
    "source": "cac net co ban.pdf - Page 1-8; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 1, 2",
    "content": {
      "question": "Bé chọn bút màu và tập tô nét thẳng đứng kéo từ trên xuống dưới nhé! ✏️",
      "questionEn": "Trace the vertical stroke from top to bottom!",
      "media": "✏️ | ➖ ╱"
    },
    "options": [
      {
        "id": "net_thang_dung",
        "text": "Nét thẳng đứng | ✏️"
      },
      {
        "id": "net_thang_ngang",
        "text": "Nét thẳng ngang ➖"
      },
      {
        "id": "net_xien_phai",
        "text": "Nét xiên phải ╱"
      }
    ],
    "correctAnswer": "net_thang_dung",
    "feedback": {
      "correct": "Bé nắn nót viết nét thẳng rất đẹp! Kéo thẳng từ trên xuống đường mặt đất! 🌟✍️",
      "wrong": "Bé tô nét thẳng đứng từ trên xuống dưới nhé!",
      "hint": "Nét thẳng đứng |"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: cac net co ban.pdf - Page 9-14; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 3, 4
  {
    "id": "act_s0_net_moc",
    "title": "Tập viết Nhóm 2: Nét móc xuôi, nét móc ngược và nét móc hai đầu ✏️",
    "titleEn": "Strokes Group 2: Downward, Upward, and Double Hooks",
    "icon": "✏️",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Luyện viết nét móc",
    "skills": [
      "vi.trace.strokes"
    ],
    "prerequisites": [],
    "type": "trace",
    "traceMode": "net",
    "traceItem": "net_moc_nguoc",
    "difficulty": 1,
    "learningObjective": "Bé tập tô nét móc ngược (cao 2 ly, rộng 1 ly), nét móc xuôi và nét móc hai đầu.",
    "mediaSource": {
      "type": "image_set",
      "url": "trace:net",
      "thumbnail": "trace:net"
    },
    "source": "cac net co ban.pdf - Page 9-14; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 3, 4",
    "content": {
      "question": "Bé tập tô nét móc ngược: kéo thẳng xuống rồi uốn cong móc lên trên nhé! ✍️",
      "questionEn": "Trace the upward hook stroke!",
      "media": "✍️ 🦯 🪝"
    },
    "options": [
      {
        "id": "net_moc_nguoc",
        "text": "Nét móc ngược (móc dưới) 🪝"
      },
      {
        "id": "net_moc_xuoi",
        "text": "Nét móc xuôi (móc trên) 🦯"
      },
      {
        "id": "net_moc_hai_dau",
        "text": "Nét móc 2 đầu 〰️"
      }
    ],
    "correctAnswer": "net_moc_nguoc",
    "feedback": {
      "correct": "Bé viết nét móc rất khéo léo! Đây là nét chính để viết các chữ cái u, ư, i, t! 🌟",
      "wrong": "Bé kéo thẳng xuống rồi uốn nhẹ móc lên nhé!",
      "hint": "Nét móc ngược"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: cac net co ban.pdf - Page 15-20; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 5
  {
    "id": "act_s0_net_cong",
    "title": "Tập viết Nhóm 3: Nét cong hở và nét cong tròn kín ⭕",
    "titleEn": "Strokes Group 3: Open Curve and Closed Circle",
    "icon": "✏️",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Luyện viết nét cong",
    "skills": [
      "vi.trace.strokes"
    ],
    "prerequisites": [],
    "type": "trace",
    "traceMode": "net",
    "traceItem": "net_cong_kin",
    "difficulty": 1,
    "learningObjective": "Bé tập tô nét cong trái, nét cong phải và nét cong tròn kín chữ O (cao 2 ly, rộng 1.5 ly).",
    "mediaSource": {
      "type": "image_set",
      "url": "trace:net",
      "thumbnail": "trace:net"
    },
    "source": "cac net co ban.pdf - Page 15-20; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 5",
    "content": {
      "question": "Bé tập tô nét cong tròn kín tròn xoe như quả trứng gà nhé! ⭕",
      "questionEn": "Trace the closed circle curve!",
      "media": "⭕ 🌙 🥚"
    },
    "options": [
      {
        "id": "net_cong_kin",
        "text": "Nét cong kín (chữ O tròn) ⭕"
      },
      {
        "id": "net_cong_ho_phai",
        "text": "Nét cong hở phải (chữ C) 🌙"
      },
      {
        "id": "net_cong_ho_trai",
        "text": "Nét cong hở trái 🌘"
      }
    ],
    "correctAnswer": "net_cong_kin",
    "feedback": {
      "correct": "Tuyệt vời! Nét cong kín tròn xoe, lưng cong chạm vào đường kẻ dọc! 🌟⭕",
      "wrong": "Bé đặt bút dưới đường kẻ ngang 3 rồi uốn cong tròn kín nhé!",
      "hint": "Nét cong tròn kín"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: cac net co ban.pdf - Page 21-30; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 6
  {
    "id": "act_s0_net_khuyet_that",
    "title": "Tập viết Nhóm 4 & 5: Nét khuyết trên, khuyết dưới và nét thắt ✍️",
    "titleEn": "Strokes Group 4 & 5: Loops and Tie Strokes",
    "icon": "✏️",
    "ageTier": "preschool",
    "stage": 0,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Luyện viết nét khuyết và thắt",
    "skills": [
      "vi.trace.strokes"
    ],
    "prerequisites": [],
    "type": "trace",
    "traceMode": "net",
    "traceItem": "net_khuyet_tren",
    "difficulty": 2,
    "learningObjective": "Bé làm quen và tập viết nét khuyết trên cao 5 ly (dùng viết l, b, h) và nét thắt.",
    "mediaSource": {
      "type": "image_set",
      "url": "trace:net",
      "thumbnail": "trace:net"
    },
    "source": "cac net co ban.pdf - Page 21-30; GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 6",
    "content": {
      "question": "Bé tập tô nét khuyết trên cao 5 ô ly để chuẩn bị viết các chữ cái l, b, h nhé! ✍️",
      "questionEn": "Trace the upper loop stroke!",
      "media": "✍️ 🦒 🎗️"
    },
    "options": [
      {
        "id": "net_khuyet_tren",
        "text": "Nét khuyết trên cao 5 ly 🦒"
      },
      {
        "id": "net_khuyet_duoi",
        "text": "Nét khuyết dưới (chữ g, y) 🐟"
      },
      {
        "id": "net_that_giua",
        "text": "Nét thắt giữa (chữ k) 🎗️"
      }
    ],
    "correctAnswer": "net_khuyet_tren",
    "feedback": {
      "correct": "Bé viết nét khuyết rất giỏi! Đưa chéo lên rồi uốn lượn kéo thẳng đứng xuống! 🌟👏",
      "wrong": "Bé đưa nét xiên lên góc ô ly rồi uốn cong kéo thẳng xuống nhé!",
      "hint": "Nét khuyết trên cao 5 ly"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 1-3
  {
    "id": "act_s1_tv_nguyen_am_a_o_e",
    "title": "Nhận biết nguyên âm đơn: A, Ă, Â, O, Ô, Ơ, E, Ê 🔤",
    "titleEn": "Vowels: A, Ă, Â, O, Ô, Ơ, E, Ê",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Nhận diện nguyên âm đơn",
    "skills": [
      "vi.vowels"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận diện và phát âm đúng các nguyên âm đơn: a, ă, â, o, ô, ơ, e, ê.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/vowels_group1.png",
      "thumbnail": "img/vowels_group1.png"
    },
    "source": "Sach luyen doc.pdf - Page 1-3",
    "content": {
      "question": "Chữ cái nào tròn xoe như quả trứng gà? ⭕",
      "questionEn": "Which letter is round like an egg?",
      "media": "⭕ 🅰️ 🅾️"
    },
    "options": [
      {
        "id": "opt_o",
        "text": "Chữ O (O tròn như quả trứng gà) ⭕"
      },
      {
        "id": "opt_a",
        "text": "Chữ A 🍎"
      },
      {
        "id": "opt_e",
        "text": "Chữ E 🐑"
      }
    ],
    "correctAnswer": "opt_o",
    "feedback": {
      "correct": "Đúng rồi! O tròn như quả trứng gà, Ô thì đội mũ, Ơ thì thêm râu! ⭕✨",
      "wrong": "Chữ tròn xoe không có nét thừa là chữ O nhé!",
      "hint": "Chữ O tròn"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 3-4
  {
    "id": "act_s1_tv_nguyen_am_u_i",
    "title": "Nhận biết nguyên âm đơn: U, Ư, I, Y 🔤",
    "titleEn": "Vowels: U, Ư, I, Y",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Nhận diện nguyên âm đơn U, Ư, I",
    "skills": [
      "vi.vowels"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé phân biệt được nguyên âm u và ư (ư có râu), i ngắn và y dài.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/vowels_group2.png",
      "thumbnail": "img/vowels_group2.png"
    },
    "source": "Sach luyen doc.pdf - Page 3-4",
    "content": {
      "question": "Chữ nào có thêm chiếc râu nhỏ ở bên phải: chữ U hay chữ Ư? 🍇",
      "questionEn": "Which letter has a small hook on the right: U or Ư?",
      "media": "🥣 🍇"
    },
    "options": [
      {
        "id": "opt_uw",
        "text": "Chữ Ư (Chữ Ư có râu) 🍇"
      },
      {
        "id": "opt_u",
        "text": "Chữ U (Không có râu) 🥣"
      },
      {
        "id": "opt_i",
        "text": "Chữ I 🦯"
      }
    ],
    "correctAnswer": "opt_uw",
    "feedback": {
      "correct": "Chính xác! Chữ Ư giống chữ U nhưng có thêm chiếc râu nhỏ xinh xắn! 🍇🌟",
      "wrong": "Chữ có chiếc râu ở góc trên bên phải là chữ Ư nhé!",
      "hint": "Chữ Ư có râu"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 4
  {
    "id": "act_s1_tv_ghep_am_b",
    "title": "Đánh vần âm đầu B: bà ba, be bé, bò bê, bế bé 👵",
    "titleEn": "Spelling Consonant B: bà ba, be bé, bò bê",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Ghép âm đầu B",
    "skills": [
      "vi.phonics.blend",
      "vi.consonants"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé ghép âm đầu b với nguyên âm và dấu thanh để đọc: bà ba, be bé, bò bê, bế bé.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/spell_b.png",
      "thumbnail": "img/spell_b.png"
    },
    "source": "Sach luyen doc.pdf - Page 4",
    "content": {
      "question": "Âm 'b' ghép với âm 'a' và thanh huyền tạo thành tiếng gì? (b - a - huyền) 👵",
      "questionEn": "What word is made from b + a + grave accent?",
      "media": "👵 👧"
    },
    "options": [
      {
        "id": "opt_ba_huyen",
        "text": "bà (Bà yêu của bé) 👵"
      },
      {
        "id": "opt_bo",
        "text": "bò 🐮"
      },
      {
        "id": "opt_be",
        "text": "bé 👶"
      }
    ],
    "correctAnswer": "opt_ba_huyen",
    "feedback": {
      "correct": "Đúng rồi! b - a - ba - huyền - bà! Bé phát âm rất to và rõ ràng! 👵💖",
      "wrong": "b ghép với a thành ba, thêm dấu huyền thành bà nhé!",
      "hint": "b - a - huyền - bà"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 5
  {
    "id": "act_s1_tv_ghep_am_c",
    "title": "Đánh vần âm đầu C: cá cờ, cổ cò, cụ cố, cô ba 🐟",
    "titleEn": "Spelling Consonant C: cá cờ, cổ cò, cụ cố",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "vietnamese",
    "skill": "Ghép âm đầu C",
    "skills": [
      "vi.phonics.blend",
      "vi.consonants"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé ghép âm c với các nguyên âm a, o, ô, u để đọc: cá cờ, cổ cò, cụ cố, cô ba.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/spell_c.png",
      "thumbnail": "img/spell_c.png"
    },
    "source": "Sach luyen doc.pdf - Page 5",
    "content": {
      "question": "Âm 'c' ghép với 'a' và dấu sắc tạo thành tiếng gì? (c - a - sắc) 🐟",
      "questionEn": "What word is made from c + a + acute accent?",
      "media": "🐟 🚩"
    },
    "options": [
      {
        "id": "opt_ca_sac",
        "text": "cá (Con cá bơi lội) 🐟"
      },
      {
        "id": "opt_co",
        "text": "cò 🦢"
      },
      {
        "id": "opt_co_ba",
        "text": "cô 👩"
      }
    ],
    "correctAnswer": "opt_ca_sac",
    "feedback": {
      "correct": "Chính xác! c - a - ca - sắc - cá! Bé ghép vần rất cừ khôi! 🐟🌟",
      "wrong": "c ghép với a thành ca, thêm sắc thành cá nhé!",
      "hint": "c - a - sắc - cá"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 3-4
  {
    "id": "act_s1_toan_dem_1_5",
    "title": "Tập đếm số lượng đồ vật trong phạm vi 1 đến 5 🍎⛵",
    "titleEn": "Counting Objects 1 to 5",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "math",
    "skill": "Đếm trong phạm vi 5",
    "skills": [
      "math.count.5"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé đếm đúng số lượng từ 1 đến 5 qua hình ảnh trực quan: quả táo, cánh bướm, con thuyền.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/count_1_5.png",
      "thumbnail": "img/count_1_5.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 3-4",
    "content": {
      "question": "Bé đếm xem có bao nhiêu quả táo đỏ tươi trên đĩa nhé: 🍎 🍎 🍎",
      "questionEn": "Count the red apples: 🍎 🍎 🍎",
      "media": "🍎 🍎 🍎"
    },
    "options": [
      {
        "id": "opt_3",
        "text": "3 quả táo 🍎"
      },
      {
        "id": "opt_2",
        "text": "2 quả táo 🍎"
      },
      {
        "id": "opt_5",
        "text": "5 quả táo 🍎"
      }
    ],
    "correctAnswer": "opt_3",
    "feedback": {
      "correct": "Chuẩn xác! 1, 2, 3 - có tất cả 3 quả táo đỏ thơm ngon! 🍎🌟",
      "wrong": "Bé chỉ tay vào từng quả và đếm lại cùng cô nhé: 1, 2, 3!",
      "hint": "Có 3 quả táo"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 5-6
  {
    "id": "act_s1_toan_nhan_dien_so_1_5",
    "title": "Nhận diện chữ số và nối số thích hợp (1 - 5) 🔢",
    "titleEn": "Recognizing Numbers 1 to 5",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "math",
    "skill": "Nhận diện số 1-5",
    "skills": [
      "math.number.recognition.5"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận biết hình dáng mặt chữ số 1, 2, 3, 4, 5 và khoanh đúng số lượng tương ứng.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/numbers_1_5.png",
      "thumbnail": "img/numbers_1_5.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 5-6",
    "content": {
      "question": "Chữ số nào nhìn giống như một cánh buồm no gió trên biển khơi? ⛵",
      "questionEn": "Which number looks like a sailboat on the sea?",
      "media": "⛵ 1️⃣ 4️⃣"
    },
    "options": [
      {
        "id": "opt_4",
        "text": "Số 4 (Số bốn giống cánh buồm) ⛵"
      },
      {
        "id": "opt_1",
        "text": "Số 1 (Cây gậy thẳng) 🦯"
      },
      {
        "id": "opt_2",
        "text": "Số 2 (Con vịt bơi) 🦆"
      }
    ],
    "correctAnswer": "opt_4",
    "feedback": {
      "correct": "Đúng rồi! Số 4 có hình dáng giống như một cánh buồm căng gió! ⛵✨",
      "wrong": "Bé tìm số 4 có góc vuông và cánh buồm nhé!",
      "hint": "Số 4 giống cánh buồm"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 12-13
  {
    "id": "act_s1_toan_so_sanh_nhieu_it",
    "title": "So sánh số lượng: Nhiều hơn, ít hơn, bằng nhau 🐸🐰",
    "titleEn": "Comparison: More, Fewer, Equal",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 1,
    "minAge": 4,
    "subject": "math",
    "skill": "So sánh nhiều hơn ít hơn",
    "skills": [
      "math.compare.quantity"
    ],
    "prerequisites": [
      "stage_0"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé so sánh hai nhóm đồ vật bằng cách ghép cặp 1 - 1 để biết nhóm nào nhiều hơn, ít hơn hoặc bằng nhau.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/more_less.png",
      "thumbnail": "img/more_less.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 12-13",
    "content": {
      "question": "Có 4 chú ếch xanh 🐸 và 3 chiếc lá sen 🍃. Số ếch nhiều hơn hay số lá nhiều hơn?",
      "questionEn": "There are 4 frogs and 3 leaves. Are there more frogs or more leaves?",
      "media": "🐸🐸🐸🐸  🍃🍃🍃"
    },
    "options": [
      {
        "id": "opt_frogs_more",
        "text": "Số ếch nhiều hơn số lá 🐸"
      },
      {
        "id": "opt_leaves_more",
        "text": "Số lá nhiều hơn số ếch 🍃"
      },
      {
        "id": "opt_equal",
        "text": "Hai bên bằng nhau ⚖️"
      }
    ],
    "correctAnswer": "opt_frogs_more",
    "feedback": {
      "correct": "Rất giỏi! 4 chú ếch so với 3 chiếc lá sen thì số ếch nhiều hơn số lá (thừa 1 chú ếch)! 🐸🌟",
      "wrong": "4 lớn hơn 3 nên số ếch sẽ nhiều hơn số lá sen con nhé!",
      "hint": "Số ếch (4) nhiều hơn số lá (3)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 3; Sach luyen doc.pdf - Page 4
  {
    "id": "act_s2_tv_6_dau_thanh",
    "title": "Nhận biết 6 dấu thanh: Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng ✍️",
    "titleEn": "The 6 Vietnamese Tone Marks",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Nhận biết 6 dấu thanh",
    "skills": [
      "vi.tones"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận diện và phân biệt 6 dấu thanh: ngang (không dấu), huyền, sắc, hỏi, ngã, nặng.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/6_tones.png",
      "thumbnail": "img/6_tones.png"
    },
    "source": "GIAO AN HANH TRANG VAO LOP 1.doc - Buoi 3; Sach luyen doc.pdf - Page 4",
    "content": {
      "question": "Dấu thanh nào có nét kéo xuôi từ trái xuống phải giống như tay chào xuôi xuống? ✍️",
      "questionEn": "Which tone mark slants down from left to right?",
      "media": "👵 ˋ ba bà"
    },
    "options": [
      {
        "id": "opt_huyen",
        "text": "Dấu huyền (bà, cà, bò) 👵"
      },
      {
        "id": "opt_sac",
        "text": "Dấu sắc (cá, bé, lá) 🐟"
      },
      {
        "id": "opt_hoi",
        "text": "Dấu hỏi (hổ, thỏ) 🐰"
      }
    ],
    "correctAnswer": "opt_huyen",
    "feedback": {
      "correct": "Chính xác! Dấu huyền nghiêng từ trái sang phải, đọc giọng trầm: b - a - ba - huyền - bà! 👵✨",
      "wrong": "Dấu kéo từ trên bên trái xuôi xuống bên phải là dấu huyền con nhé!",
      "hint": "Dấu huyền ( \\ )"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 6-7
  {
    "id": "act_s2_tv_phu_am_d_dd",
    "title": "Luyện đọc phụ âm D, Đ: da dẻ, đá đỏ, đu đủ, đi đò 🚣",
    "titleEn": "Consonants D and Đ: da dẻ, đu đủ, đi đò",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Phụ âm D và Đ",
    "skills": [
      "vi.consonants",
      "vi.phonics.blend"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé phân biệt chữ d và chữ đ (đ có nét gạch ngang), đọc các từ: da dẻ, đá đỏ, đu đủ, đi đò.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/letters_d_dd.png",
      "thumbnail": "img/letters_d_dd.png"
    },
    "source": "Sach luyen doc.pdf - Page 6-7",
    "content": {
      "question": "Chữ cái nào có nét gạch ngang ở giữa cột đứng: chữ D hay chữ Đ? 🚣",
      "questionEn": "Which letter has a horizontal crossbar: D or Đ?",
      "media": "d  đ"
    },
    "options": [
      {
        "id": "opt_dd",
        "text": "Chữ Đ (Đ có nét gạch ngang) 🏮"
      },
      {
        "id": "opt_d",
        "text": "Chữ D (Không có nét gạch) 🐐"
      },
      {
        "id": "opt_b",
        "text": "Chữ B ⚽"
      }
    ],
    "correctAnswer": "opt_dd",
    "feedback": {
      "correct": "Đúng rồi! Chữ Đ có thêm nét gạch ngang ngắn trên đầu cột đứng! Đ - đi đò, đu đủ! 🚣🌟",
      "wrong": "Chữ Đ có gạch ngang ở trên thân, còn chữ D thì trơn không có gạch nhé!",
      "hint": "Chữ Đ có gạch ngang"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 11-13
  {
    "id": "act_s2_tv_phu_am_m_n_l",
    "title": "Luyện đọc phụ âm M, N, L: bố mẹ, nơ đỏ, lá cờ 🚩",
    "titleEn": "Consonants M, N, L: bố mẹ, nơ đỏ, lá cờ",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Phụ âm M, N, L",
    "skills": [
      "vi.consonants",
      "vi.phonics.blend"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé đọc đúng các từ chứa phụ âm m, n, l: ba má, bố mẹ, no nê, nơ đỏ, lá cờ, lọ cà.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/letters_m_n_l.png",
      "thumbnail": "img/letters_m_n_l.png"
    },
    "source": "Sach luyen doc.pdf - Page 11-13",
    "content": {
      "question": "Bé chọn từ đúng mô tả món quà mẹ cài trên mái tóc xinh: n___ đỏ 🎀",
      "questionEn": "Fill in the blank: n___ đỏ",
      "media": "🎀 🚩"
    },
    "options": [
      {
        "id": "opt_no",
        "text": "nơ đỏ (Chiếc nơ đỏ cài tóc) 🎀"
      },
      {
        "id": "opt_la",
        "text": "lá cờ 🚩"
      },
      {
        "id": "opt_me",
        "text": "bố mẹ 👩‍👧"
      }
    ],
    "correctAnswer": "opt_no",
    "feedback": {
      "correct": "Chính xác! n - ơ - nơ - đỏ! Chiếc nơ đỏ cài tóc bé rất đáng yêu! 🎀✨",
      "wrong": "n ghép với ơ thành nơ, trong từ nơ đỏ con nhé!",
      "hint": "nơ đỏ"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 7-11
  {
    "id": "act_s2_toan_cac_so_6_10",
    "title": "Nhận diện và đếm số lượng các số 6, 7, 8, 9, 10 🔢",
    "titleEn": "Counting and Numbers 6 to 10",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "math",
    "skill": "Số đếm 6-10",
    "skills": [
      "math.count.10"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé nhận biết mặt chữ số và đếm chính xác số lượng từ 6 đến 10.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/numbers_6_10.png",
      "thumbnail": "img/numbers_6_10.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 7-11",
    "content": {
      "question": "Bé đếm xem có bao nhiêu chú chim cánh cụt đang xếp hàng nhé: 🐧🐧🐧🐧🐧🐧🐧",
      "questionEn": "Count the penguins: 🐧🐧🐧🐧🐧🐧🐧",
      "media": "🐧🐧🐧🐧🐧🐧🐧 (7 chú)"
    },
    "options": [
      {
        "id": "opt_7",
        "text": "7 chú chim cánh cụt 🐧"
      },
      {
        "id": "opt_6",
        "text": "6 chú chim 🐧"
      },
      {
        "id": "opt_8",
        "text": "8 chú chim 🐧"
      }
    ],
    "correctAnswer": "opt_7",
    "feedback": {
      "correct": "Tuyệt vời! 1, 2, 3, 4, 5, 6, 7 - có đúng 7 chú chim cánh cụt! 🐧🌟",
      "wrong": "Bé chỉ tay từng chú chim và đếm chậm rãi nhé: có 7 chú chim!",
      "hint": "Có 7 chú chim cánh cụt"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 14-19
  {
    "id": "act_s2_toan_dau_so_sanh",
    "title": "So sánh các số bằng dấu Lớn hơn (>), Bé hơn (<), Bằng nhau (=) ⚖️",
    "titleEn": "Comparison Symbols: >, <, =",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "math",
    "skill": "Dấu so sánh lớn bé bằng",
    "skills": [
      "math.compare.symbols"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé nhận biết và sử dụng đúng các dấu so sánh: dấu lớn (>), dấu bé (<), dấu bằng (=).",
    "mediaSource": {
      "type": "image_set",
      "url": "img/compare_symbols.png",
      "thumbnail": "img/compare_symbols.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 14-19",
    "content": {
      "question": "Bé điền dấu thích hợp vào chỗ chấm:  5  ...  3 ⚖️",
      "questionEn": "Fill in the symbol: 5 ... 3",
      "media": "5  [ ? ]  3"
    },
    "options": [
      {
        "id": "opt_gt",
        "text": "Dấu lớn hơn ( > )"
      },
      {
        "id": "opt_lt",
        "text": "Dấu bé hơn ( < )"
      },
      {
        "id": "opt_eq",
        "text": "Dấu bằng ( = )"
      }
    ],
    "correctAnswer": "opt_gt",
    "feedback": {
      "correct": "Đúng rồi! 5 lớn hơn 3 nên ta viết 5 > 3. Miệng dấu luôn há to về phía số lớn hơn! 🌟🐊",
      "wrong": "Số 5 nhiều hơn số 3 nên ta dùng dấu lớn hơn (>) nhé!",
      "hint": "5 > 3 (Dấu lớn hơn)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 20-25
  {
    "id": "act_s2_toan_tach_gop_5",
    "title": "Tách gộp số trong phạm vi 5 (Mấy và mấy) 🧩",
    "titleEn": "Number Bonds within 5",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "math",
    "skill": "Tách gộp số phạm vi 5",
    "skills": [
      "math.number_bonds.5"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé hiểu bản chất cấu tạo số: 5 gồm 4 và 1; 5 gồm 3 và 2 để làm nền tảng cho phép cộng trừ.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/number_bonds_5.png",
      "thumbnail": "img/number_bonds_5.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 20-25",
    "content": {
      "question": "Có 5 quả bóng, chia cho bạn Nam 3 quả. Hỏi bạn Mai nhận được mấy quả bóng? 🎈",
      "questionEn": "There are 5 balloons. Nam gets 3. How many balloons does Mai get?",
      "media": "🎈🎈🎈🎈🎈 -> Nam: 3  |  Mai: ?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": "2 quả bóng (5 gồm 3 và 2) 🎈🎈"
      },
      {
        "id": "opt_1",
        "text": "1 quả bóng 🎈"
      },
      {
        "id": "opt_4",
        "text": "4 quả bóng 🎈🎈🎈🎈"
      }
    ],
    "correctAnswer": "opt_2",
    "feedback": {
      "correct": "Chính xác! 5 gồm 3 và 2. Nam có 3 quả thì Mai có 2 quả bóng! 🎈🎈🌟",
      "wrong": "5 quả bớt đi 3 quả thì còn lại 2 quả bóng con nhé!",
      "hint": "5 gồm 3 và 2"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 26-28
  {
    "id": "act_s2_toan_hinh_hoc",
    "title": "Nhận biết Hình vuông, Hình tròn, Hình tam giác, Hình chữ nhật 🔴🟦🔺",
    "titleEn": "Basic Shapes: Square, Circle, Triangle, Rectangle",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 2,
    "minAge": 5,
    "subject": "math",
    "skill": "Hình học cơ bản",
    "skills": [
      "math.shapes.basic"
    ],
    "prerequisites": [
      "stage_1"
    ],
    "type": "image_quiz",
    "difficulty": 1,
    "learningObjective": "Bé nhận biết và phân biệt 4 hình hình học cơ bản: hình vuông (4 cạnh bằng nhau), hình tròn, hình tam giác (3 cạnh), hình chữ nhật.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/basic_shapes.png",
      "thumbnail": "img/basic_shapes.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 26-28",
    "content": {
      "question": "Hình nào có đúng 3 cạnh và 3 góc nhọn? 🔺",
      "questionEn": "Which shape has 3 sides and 3 corners?",
      "media": "🔺 🟦 🔴 🟨"
    },
    "options": [
      {
        "id": "opt_triangle",
        "text": "Hình tam giác 🔺"
      },
      {
        "id": "opt_square",
        "text": "Hình vuông 🟦"
      },
      {
        "id": "opt_circle",
        "text": "Hình tròn 🔴"
      }
    ],
    "correctAnswer": "opt_triangle",
    "feedback": {
      "correct": "Đúng rồi! Hình tam giác có 3 cạnh giống như mái nhà hay chiếc bánh kem! 🔺🍰",
      "wrong": "Hình có 3 cạnh là hình tam giác con nhé!",
      "hint": "Hình tam giác (3 cạnh)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 19, 24, 25, 27
  {
    "id": "act_s3_tv_phu_am_ghep",
    "title": "Phụ âm ghép: ch, nh, kh, th (cha mẹ, nhà lá, cá kho, thỏ mẹ) 🏠",
    "titleEn": "Blended Consonants: ch, nh, kh, th",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Phụ âm ghép",
    "skills": [
      "vi.phonics.blend",
      "vi.consonants"
    ],
    "prerequisites": [
      "stage_2",
      "vi.vowels",
      "vi.consonants"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé nhận biết các phụ âm ghép 2 chữ cái ch, nh, kh, th và đọc các từ ứng dụng trong đời sống.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/digraphs.png",
      "thumbnail": "img/digraphs.png"
    },
    "source": "Sach luyen doc.pdf - Page 19, 24, 25, 27",
    "content": {
      "question": "Phụ âm ghép 'nh' ghép với 'a' và dấu huyền tạo thành từ nơi bé ở là gì? 🏠",
      "questionEn": "nh + a + grave accent makes which word for home?",
      "media": "🏠 🏡"
    },
    "options": [
      {
        "id": "opt_nha",
        "text": "nhà (Ngôi nhà ấm áp) 🏠"
      },
      {
        "id": "opt_tho",
        "text": "thỏ 🐰"
      },
      {
        "id": "opt_cho",
        "text": "chó 🐕"
      }
    ],
    "correctAnswer": "opt_nha",
    "feedback": {
      "correct": "Tuyệt vời! nh - a - nha - huyền - nhà! Ngôi nhà thân yêu của gia đình! 🏠💖",
      "wrong": "nh ghép với a và dấu huyền là nhà con nhé!",
      "hint": "nh - a - huyền - nhà"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 30
  {
    "id": "act_s3_tv_van_doi_ia_oa_ua_ua",
    "title": "Học vần đôi: ia, oa, ua, ưa (gà tía, toà nhà, cua bể, quả dưa) 🍈",
    "titleEn": "Diphthongs: ia, oa, ua, ưa",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Vần đôi cơ bản",
    "skills": [
      "vi.phonics.blend"
    ],
    "prerequisites": [
      "stage_2",
      "vi.vowels",
      "vi.consonants"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé đánh vần và đọc trơn các tiếng chứa vần đôi: ia (gà tía), oa (toà nhà), ua (múa lòa, cua bể), ưa (quả dưa).",
    "mediaSource": {
      "type": "image_set",
      "url": "img/diphthongs_ia_oa.png",
      "thumbnail": "img/diphthongs_ia_oa.png"
    },
    "source": "Sach luyen doc.pdf - Page 30",
    "content": {
      "question": "Con vật có hai chiếc càng to sống ở biển chứa vần 'ua': c___ bể 🦀",
      "questionEn": "Fill in the blank with ua: c___ bể 🦀",
      "media": "🦀 🌊"
    },
    "options": [
      {
        "id": "opt_cua",
        "text": "cua bể (c - ua - cua) 🦀"
      },
      {
        "id": "opt_ca",
        "text": "cá 🐟"
      },
      {
        "id": "opt_co",
        "text": "cò 🦢"
      }
    ],
    "correctAnswer": "opt_cua",
    "feedback": {
      "correct": "Đúng rồi! c - ua - cua bể! Chú cua biển có hai chiếc càng giơ cao! 🦀🌟",
      "wrong": "c ghép với vần ua thành cua trong cua bể nhé!",
      "hint": "cua bể (vần ua)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 31
  {
    "id": "act_s3_tv_van_ai_oi_oi_oi",
    "title": "Học vần: ai, oi, ôi, ơi (số hai, cá voi, xe nôi, con thoi) 🐋",
    "titleEn": "Rhymes: ai, oi, ôi, ơi",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Vần kết thúc i",
    "skills": [
      "vi.phonics.blend"
    ],
    "prerequisites": [
      "stage_2",
      "vi.vowels",
      "vi.consonants"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé nhận biết và đọc trơn các vần có âm cuối i: ai, oi, ôi, ơi qua các từ: số hai, cá voi, xe nôi, con thoi.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/rhymes_i.png",
      "thumbnail": "img/rhymes_i.png"
    },
    "source": "Sach luyen doc.pdf - Page 31",
    "content": {
      "question": "Loài cá to lớn nhất đại dương chứa vần 'oi' là con cá gì? 🐋",
      "questionEn": "Which giant marine creature contains the rhyme 'oi'?",
      "media": "🐋 🌊"
    },
    "options": [
      {
        "id": "opt_ca_voi",
        "text": "cá voi (v - oi - voi) 🐋"
      },
      {
        "id": "opt_ca_ro",
        "text": "cá rô 🐟"
      },
      {
        "id": "opt_ca_me",
        "text": "cá mè 🐠"
      }
    ],
    "correctAnswer": "opt_ca_voi",
    "feedback": {
      "correct": "Chính xác! v - oi - voi! Chú cá voi xanh khổng lồ bơi lội giữa đại dương! 🐋🌊",
      "wrong": "Cá chứa vần oi là cá voi con nhé!",
      "hint": "cá voi (vần oi)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 31-36; Quyen luyen chu tieng tu va cau.pdf
  {
    "id": "act_s3_tv_doc_tu_2_tieng",
    "title": "Đọc từ ứng dụng 2 tiếng: cái bàn, bạn học, con trăn, bồ câu 🕊️",
    "titleEn": "Reading 2-Syllable Words: cái bàn, bạn học, bồ câu",
    "icon": "🔤",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "vietnamese",
    "skill": "Đọc từ ứng dụng 2 tiếng",
    "skills": [
      "vi.words.2syllables"
    ],
    "prerequisites": [
      "stage_2",
      "vi.vowels",
      "vi.consonants"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé đọc trơn và hiểu nghĩa của các từ ứng dụng 2 tiếng quen thuộc trong lớp học và tự nhiên.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/words_2syl.png",
      "thumbnail": "img/words_2syl.png"
    },
    "source": "Sach luyen doc.pdf - Page 31-36; Quyen luyen chu tieng tu va cau.pdf",
    "content": {
      "question": "Đồ vật trong lớp học nơi bé ngồi viết bài mỗi ngày được gọi là gì? 🪑",
      "questionEn": "What classroom furniture do you sit at to write?",
      "media": "🪑 📚"
    },
    "options": [
      {
        "id": "opt_cai_ban",
        "text": "cái bàn (b - an - ban - huyền - bàn) 🪑"
      },
      {
        "id": "opt_bo_cau",
        "text": "bồ câu 🕊️"
      },
      {
        "id": "opt_qua_cam",
        "text": "quả cam 🍊"
      }
    ],
    "correctAnswer": "opt_cai_ban",
    "feedback": {
      "correct": "Đúng rồi! 'cái bàn' là nơi bé ngồi học bài và để sách vở ngay ngắn! 🪑✨",
      "wrong": "Đồ dùng để ngồi viết bài là 'cái bàn' con nhé!",
      "hint": "cái bàn"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 29-35, 38-47; Phep-cong-pham-vi-10.pdf - Page 1-11
  {
    "id": "act_s3_toan_phep_cong_10",
    "title": "Phép cộng không nhớ trong phạm vi 10 (2+1, 3+2, 4+4, 5+5) ➕",
    "titleEn": "Addition within 10: 2+1, 3+2, 4+4, 5+5",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "math",
    "skill": "Phép cộng trong phạm vi 10",
    "skills": [
      "math.addition.10"
    ],
    "prerequisites": [
      "stage_2"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé thực hiện đúng các phép cộng không nhớ trong phạm vi 10 bằng phương pháp gộp số trực quan.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/addition_10.png",
      "thumbnail": "img/addition_10.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 29-35, 38-47; Phep-cong-pham-vi-10.pdf - Page 1-11",
    "content": {
      "question": "Bé tính xem: 3 quả táo đỏ cộng thêm 2 quả táo xanh bằng mấy quả táo? (3 + 2 = ?) 🍎🍏",
      "questionEn": "What is 3 apples + 2 apples? (3 + 2 = ?)",
      "media": "🍎🍎🍎  ➕  🍏🍏  =  ❓"
    },
    "options": [
      {
        "id": "opt_5",
        "text": "5 quả táo (3 + 2 = 5) 🌟"
      },
      {
        "id": "opt_4",
        "text": "4 quả táo"
      },
      {
        "id": "opt_6",
        "text": "6 quả táo"
      }
    ],
    "correctAnswer": "opt_5",
    "feedback": {
      "correct": "Chính xác! 3 + 2 = 5! Bé làm phép cộng rất nhanh và thông minh! 🍎🍏🌟",
      "wrong": "Bé gộp 3 quả táo với 2 quả táo lại và đếm xem: 1, 2, 3, 4, 5 quả!",
      "hint": "3 + 2 = 5"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 48-56
  {
    "id": "act_s3_toan_phep_tru_10",
    "title": "Phép trừ không nhớ trong phạm vi 10 (3-1, 5-2, 8-3, 10-4) ➖",
    "titleEn": "Subtraction within 10: 3-1, 5-2, 8-3, 10-4",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "math",
    "skill": "Phép trừ trong phạm vi 10",
    "skills": [
      "math.subtraction.10"
    ],
    "prerequisites": [
      "stage_2"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé hiểu bản chất phép trừ là thao tác bớt đi hoặc tách ra trong phạm vi 10.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/subtraction_10.png",
      "thumbnail": "img/subtraction_10.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 48-56",
    "content": {
      "question": "Trên cành cây có 5 chú chim, bay đi mất 2 chú. Hỏi trên cành còn lại mấy chú chim? (5 - 2 = ?) 🐦",
      "questionEn": "There are 5 birds. 2 fly away. How many birds are left? (5 - 2 = ?)",
      "media": "🐦🐦🐦🐦🐦  ➖  🐦🐦  =  ❓"
    },
    "options": [
      {
        "id": "opt_3",
        "text": "3 chú chim (5 - 2 = 3) 🐦"
      },
      {
        "id": "opt_2",
        "text": "2 chú chim"
      },
      {
        "id": "opt_4",
        "text": "4 chú chim"
      }
    ],
    "correctAnswer": "opt_3",
    "feedback": {
      "correct": "Tuyệt vời! 5 bớt đi 2 còn 3 chú chim! Phép tính 5 - 2 = 3 rất chuẩn! 🐦🌟",
      "wrong": "Có 5 chú chim, bớt đi 2 chú thì còn lại 3 chú chim trên cành nhé!",
      "hint": "5 - 2 = 3"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 57-64
  {
    "id": "act_s3_toan_day_so_11_20",
    "title": "Đếm và nhận biết dãy số từ 11 đến 20 🚀",
    "titleEn": "Counting and Numbers 11 to 20",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 3,
    "minAge": 5,
    "subject": "math",
    "skill": "Số đếm 11-20",
    "skills": [
      "math.count.20"
    ],
    "prerequisites": [
      "stage_2"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé nhận biết thứ tự dãy số tăng dần từ 11 đến 20 (11, 12, 13, ..., 20) và số liền trước/liền sau.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/numbers_11_20.png",
      "thumbnail": "img/numbers_11_20.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 57-64",
    "content": {
      "question": "Bé tìm số liền sau của số 11 trong dãy số đếm nhé: 10, 11, [ ? ], 13 🚀",
      "questionEn": "What number comes after 11? 10, 11, [ ? ], 13",
      "media": "10 ➔ 11 ➔ [ ? ] ➔ 13"
    },
    "options": [
      {
        "id": "opt_12",
        "text": "Số 12 (Mười hai) 🚀"
      },
      {
        "id": "opt_14",
        "text": "Số 14"
      },
      {
        "id": "opt_10",
        "text": "Số 10"
      }
    ],
    "correctAnswer": "opt_12",
    "feedback": {
      "correct": "Đúng rồi! 10 rồi đến 11, tiếp theo là 12, rồi đến 13! Bé đếm số rất siêu! 🚀✨",
      "wrong": "Số liền sau số 11 là số 12 con nhé!",
      "hint": "Số 12 (đứng sau số 11)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 71
  {
    "id": "act_s4_tv_cau_loi_chao",
    "title": "Luyện đọc câu thơ: Lời chào (Chào mẹ, chào cô khi đến lớp) 🏫",
    "titleEn": "Poem: Greeting - Polite Manners at School",
    "icon": "📖",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "reading",
    "skill": "Đọc câu thơ ngắn",
    "skills": [
      "vi.reading.passage",
      "life.school_manners"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "story_listen",
    "difficulty": 2,
    "learningObjective": "Bé đọc hiểu bài thơ ngắn 3-5 tiếng về lời chào và rèn luyện văn hóa lễ phép khi tới trường.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/poem_greeting.png",
      "thumbnail": "img/poem_greeting.png"
    },
    "source": "Sach luyen doc.pdf - Page 71",
    "content": {
      "storyText": "Đi về con chào mẹ,\nRa đường con chào cô.\nLời chào theo chân bé,\nAi cũng quý, cũng yêu.",
      "question": "Khi đi học về hoặc gặp cô giáo, bé cần làm gì để thể hiện sự lễ phép? 🏫",
      "questionEn": "What should you do to show polite manners when meeting teachers or arriving home?",
      "media": "🏫 👋"
    },
    "options": [
      {
        "id": "opt_chao",
        "text": "Khoanh tay cúi đầu chào lễ phép 👋"
      },
      {
        "id": "opt_chay",
        "text": "Chạy thẳng vào nhà không nói gì 🏃"
      },
      {
        "id": "opt_khoc",
        "text": "Khóc nhè 😢"
      }
    ],
    "correctAnswer": "opt_chao",
    "feedback": {
      "correct": "Rất chính xác! 'Lời chào đi trước, rước nụ cười theo' - bé ngoan luôn lễ phép chào hỏi mọi người! 🌟💖",
      "wrong": "Bé nhớ khoanh tay lễ phép chào mẹ và chào cô giáo nhé!",
      "hint": "Khoanh tay chào lễ phép"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 78
  {
    "id": "act_s4_tv_cau_ban_tay_me",
    "title": "Luyện đọc câu ngắn: Bàn tay mẹ (3-5 tiếng) 👩‍👧",
    "titleEn": "Short Story: Mother's Hands",
    "icon": "📖",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "reading",
    "skill": "Đọc câu ngắn 3-5 tiếng",
    "skills": [
      "vi.reading.passage"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "story_listen",
    "difficulty": 2,
    "learningObjective": "Bé rèn luyện kỹ năng đọc câu ngắn 3-5 tiếng và trả lời câu hỏi tìm hiểu nội dung.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/mothers_hands.png",
      "thumbnail": "img/mothers_hands.png"
    },
    "source": "Sach luyen doc.pdf - Page 78",
    "content": {
      "storyText": "Bàn tay của mẹ,\nBế bé sớm chiều.\nNấu cơm quét nhà,\nChăm lo cho bé.",
      "question": "Trong bài thơ, bàn tay mẹ đã làm những công việc gì để chăm sóc bé? 👩‍👧",
      "questionEn": "What does mother's hands do to take care of the child?",
      "media": "👩‍👧 🍲"
    },
    "options": [
      {
        "id": "opt_care",
        "text": "Bế bé, nấu cơm và quét dọn nhà cửa 🍲"
      },
      {
        "id": "opt_tv",
        "text": "Chỉ xem ti vi 📺"
      },
      {
        "id": "opt_sleep",
        "text": "Chỉ ngủ cả ngày 😴"
      }
    ],
    "correctAnswer": "opt_care",
    "feedback": {
      "correct": "Đúng rồi! Mẹ nấu cơm ngon, quét nhà sạch và luôn chăm sóc yêu thương bé mỗi ngày! 👩‍👧💖",
      "wrong": "Bàn tay mẹ bế bé sớm chiều, nấu cơm và chăm lo cho bé con nhé!",
      "hint": "Bế bé, nấu cơm và quét nhà"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 92
  {
    "id": "act_s4_tv_cau_co_va_me",
    "title": "Luyện đọc bài thơ: Cô và mẹ 👩‍🏫",
    "titleEn": "Poem: Teacher and Mother",
    "icon": "📖",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "reading",
    "skill": "Đọc câu thơ ngắn",
    "skills": [
      "vi.reading.passage"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "story_listen",
    "difficulty": 2,
    "learningObjective": "Bé rèn khả năng đọc lưu loát bài thơ ngắn và ghi nhớ tình cảm của cô giáo và mẹ hiền.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/teacher_mother.png",
      "thumbnail": "img/teacher_mother.png"
    },
    "source": "Sach luyen doc.pdf - Page 92",
    "content": {
      "storyText": "Buổi sáng bé chào mẹ,\nChạy đến ôm cổ cô.\nBuổi chiều bé chào cô,\nSà vào lòng của mẹ.",
      "question": "Buổi sáng khi đến lớp, bé chạy đến làm gì với cô giáo? 👩‍🏫",
      "questionEn": "What does the child do when arriving at class in the morning?",
      "media": "🏫 👩‍🏫"
    },
    "options": [
      {
        "id": "opt_hug",
        "text": "Chạy đến ôm cổ cô giáo 👩‍🏫"
      },
      {
        "id": "opt_cry",
        "text": "Khóc to đòi về 😭"
      },
      {
        "id": "opt_hide",
        "text": "Trốn sau cánh cửa 🚪"
      }
    ],
    "correctAnswer": "opt_hug",
    "feedback": {
      "correct": "Chính xác! 'Buổi sáng bé chào mẹ / Chạy đến ôm cổ cô' - bé rất yêu cô giáo và trường lớp! 👩‍🏫🌟",
      "wrong": "Bé chạy đến ôm cổ cô giáo con nhé!",
      "hint": "Chạy đến ôm cổ cô"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: Sach luyen doc.pdf - Page 88
  {
    "id": "act_s4_tv_cau_muoi_qua_trung",
    "title": "Luyện đọc: Mười quả trứng tròn 🐣",
    "titleEn": "Poem: Ten Round Eggs",
    "icon": "📖",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "reading",
    "skill": "Đọc thơ kết hợp số đếm",
    "skills": [
      "vi.reading.passage",
      "math.count.10"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "story_listen",
    "difficulty": 2,
    "learningObjective": "Bé đọc trơn bài thơ ngắn kết hợp củng cố số lượng 10 và quan sát sự nở của đàn gà con.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/ten_eggs.png",
      "thumbnail": "img/ten_eggs.png"
    },
    "source": "Sach luyen doc.pdf - Page 88",
    "content": {
      "storyText": "Mười quả trứng tròn,\nMẹ gà ấp ủ.\nHôm nay nở ra,\nMười chú gà con.",
      "question": "Từ 10 quả trứng tròn của mẹ gà, hôm nay đã nở ra bao nhiêu chú gà con? 🐣",
      "questionEn": "How many baby chicks hatched from the 10 eggs?",
      "media": "🥚🥚🥚 -> 🐣🐣🐣 (10 chú)"
    },
    "options": [
      {
        "id": "opt_10_chicks",
        "text": "10 chú gà con lông vàng 🐣"
      },
      {
        "id": "opt_5_chicks",
        "text": "5 chú gà con"
      },
      {
        "id": "opt_2_chicks",
        "text": "2 chú gà con"
      }
    ],
    "correctAnswer": "opt_10_chicks",
    "feedback": {
      "correct": "Đúng rồi! Mười quả trứng tròn nở ra đúng 10 chú gà con lông vàng óng ả! 🐣🌟",
      "wrong": "Có đúng 10 chú gà con nở ra con nhé!",
      "hint": "10 chú gà con"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 62-64
  {
    "id": "act_s4_toan_dien_so_con_thieu_20",
    "title": "Toán tư duy: Điền số còn thiếu vào dãy số phạm vi 20 🧩",
    "titleEn": "Logic Math: Fill in Missing Numbers up to 20",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "math",
    "skill": "Điền số còn thiếu phạm vi 20",
    "skills": [
      "math.logic.patterns",
      "math.count.20"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé phát triển tư duy logic qua bài tập tìm quy luật và điền số còn thiếu trong dãy số 1 đến 20.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/pattern_20.png",
      "thumbnail": "img/pattern_20.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 62-64",
    "content": {
      "question": "Bé tìm số còn thiếu điền vào ô trống nhé: 15, 16, [ ? ], 18, 19, 20 🚂",
      "questionEn": "Find the missing number: 15, 16, [ ? ], 18, 19, 20",
      "media": "15 ➔ 16 ➔ [ ? ] ➔ 18 ➔ 19 ➔ 20"
    },
    "options": [
      {
        "id": "opt_17",
        "text": "Số 17 (Mười bảy) 🚂"
      },
      {
        "id": "opt_14",
        "text": "Số 14"
      },
      {
        "id": "opt_21",
        "text": "Số 21"
      }
    ],
    "correctAnswer": "opt_17",
    "feedback": {
      "correct": "Chính xác! 15, 16 rồi đến 17, tiếp theo là 18! Bé tư duy dãy số rất nhạy bén! 🚂✨",
      "wrong": "Số đứng giữa 16 và 18 là số 17 con nhé!",
      "hint": "Số 17 (đứng sau 16 và trước 18)"
    },
    "reward": {
      "stars": 3
    }
  },
  // Source: TTH LAM QUEN VOI TOAN.pdf - Page 65-66
  {
    "id": "act_s4_toan_so_sanh_20",
    "title": "Toán tư duy: So sánh số và phép tính trong phạm vi 20 ⚖️",
    "titleEn": "Logic Math: Comparing Numbers and Operations up to 20",
    "icon": "🔢",
    "ageTier": "preschool",
    "stage": 4,
    "minAge": 5,
    "subject": "math",
    "skill": "So sánh số phạm vi 20",
    "skills": [
      "math.compare.symbols",
      "math.logic"
    ],
    "prerequisites": [
      "stage_3"
    ],
    "type": "image_quiz",
    "difficulty": 2,
    "learningObjective": "Bé so sánh các số trong phạm vi 20 và so sánh kết quả phép tính đơn giản với một số.",
    "mediaSource": {
      "type": "image_set",
      "url": "img/compare_20.png",
      "thumbnail": "img/compare_20.png"
    },
    "source": "TTH LAM QUEN VOI TOAN.pdf - Page 65-66",
    "content": {
      "question": "Bé so sánh xem số nào lớn hơn: 18 hay 15? ⚖️",
      "questionEn": "Which number is greater: 18 or 15?",
      "media": "18  [ ? ]  15"
    },
    "options": [
      {
        "id": "opt_18_gt",
        "text": "18 > 15 (18 lớn hơn 15) 🌟"
      },
      {
        "id": "opt_18_lt",
        "text": "18 < 15"
      },
      {
        "id": "opt_equal",
        "text": "18 = 15"
      }
    ],
    "correctAnswer": "opt_18_gt",
    "feedback": {
      "correct": "Chuẩn xác! 18 lớn hơn 15 nên ta có 18 > 15! Bé đã sẵn sàng bước vào Lớp 1 với tư duy toán học vững vàng! 🌟🎓",
      "wrong": "18 có 1 chục và 8 đơn vị, lớn hơn 15 có 1 chục và 5 đơn vị con nhé!",
      "hint": "18 > 15"
    },
    "reward": {
      "stars": 3
    }
  },

  // ========================================================
  // NHÓM 2: LỚP 1–2 (6–8 TUỔI) - 9 HOẠT ĐỘNG
  // ========================================================
  {
    id: "act_g12_vn_01",
    title: "Điền vần đúng: Quả B___ng bay 🎈",
    titleEn: "Fill Phonics: Quả B_ng",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    stage: null,
    minAge: 6,
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
    icon: "📚",
    title: "Đọc hiểu: Chuyện Rùa và Thỏ chạy thi 🐢🐇",
    titleEn: "Story: The Tortoise and The Hare",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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
    stage: null,
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

  // ==========================================================================
  // 10 BÀI HỌC VIDEO QUIZ TỪ CÁC KÊNH GIÁO DỤC UY TÍN (VTV7, THIẾU NHI)
  // ==========================================================================

  // --- CẤP ĐỘ 1: MẦM NON (4–6 TUỔI) - NHẬN BIẾT CON VẬT ---
  {
    id: "act_vq_pre_01_pets",
    icon: "🎒",
    title: "Làm quen với trường lớp: Nhận biết cặp sách & Đồ dùng đi học 🎒",
    titleEn: "School Life: Backpack & School Supplies",
    icon: "🎒",
    ageTier: "preschool",
    stage: null,
    minAge: 4,
    subject: "skills",
    skills: ["life.school_supplies"],
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=kdrjFqjp9NY",
      thumbnail: "img/backpack_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Nhận biết chiếc cặp sách đi học, cách phân loại sách vở, hộp bút và chuẩn bị đồ dùng ngăn nắp trước khi đến trường.",
    difficulty: 1,
    content: [
      {
        question: "Bé chuẩn bị đi học lớp 1, đồ dùng nào dưới đây dùng để đựng sách vở và hộp bút?",
        options: [
          "Chiếc cặp sách xinh xắn 🎒",
          "Chiếc rổ đựng rau 🧺",
          "Chiếc chảo rán 🍳"
        ],
        correctAnswer: 0,
        explanation: "Chiếc cặp sách (ba lô) là bạn đồng hành giúp bé đựng sách vở, bút thước ngăn nắp khi đến trường! 🎒✨"
      },
      {
        question: "Trong cặp sách đi học, bé nên để những món đồ nào sau đây?",
        options: [
          "Sách vở, hộp bút và bình nước cá nhân 📚✏️💧",
          "Đồ chơi sắc nhọn và kéo to ✂️",
          "Bánh kẹo ăn dở bừa bãi 🍬"
        ],
        correctAnswer: 0,
        explanation: "Sách vở, hộp bút và bình nước là những đồ dùng học tập thiết yếu cần có trong cặp sách của bé!"
      },
      {
        question: "Buổi tối trước khi đi ngủ, bé nên làm gì với cặp sách của mình?",
        options: [
          "Soạn đủ sách vở theo thời khóa biểu và kéo khóa cẩn thận 🎒✨",
          "Vứt cặp sách dưới sàn nhà 🛋️",
          "Chờ sáng mai bố mẹ soạn hộ ⏰"
        ],
        correctAnswer: 0,
        explanation: "Bé tự lập soạn trước sách vở vào cặp giúp buổi sáng đến trường đúng giờ và không bị quên đồ dùng!"
      }
    ]
  },
  {
    id: "act_vq_pre_02_wildlife",
    icon: "👩‍🏫",
    title: "Làm quen với trường lớp: Làm quen cô giáo và bạn bè mới 🏫",
    titleEn: "School Life: Getting to Know Teacher and Friends",
    icon: "👩‍🏫",
    ageTier: "preschool",
    stage: null,
    minAge: 4,
    subject: "skills",
    skills: ["life.school_manners"],
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=czZBOWlGlaE",
      thumbnail: "img/teacher_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Xây dựng tâm lý tự tin, lễ phép khi gặp cô giáo, kỹ năng kết bạn và nề nếp giơ tay phát biểu trong lớp học.",
    difficulty: 1,
    content: [
      {
        question: "Ngày đầu tiên bước vào lớp học, khi gặp cô giáo, bé nên làm gì?",
        options: [
          "Khoanh tay cúi đầu: Con chào cô ạ! 👧👋",
          "Chạy trốn sau lưng bố mẹ 🙈",
          "Không nói gì và quay mặt đi 😐"
        ],
        correctAnswer: 0,
        explanation: "Khoanh tay chào cô giáo lễ phép là hành vi đẹp của một bạn nhỏ ngoan ngoãn tự tin vào lớp 1! 🏫✨"
      },
      {
        question: "Khi muốn làm quen với một bạn mới cùng bàn, bé sẽ nói thế nào?",
        options: [
          "Chào bạn, chúng mình cùng làm quen nhé! 🤝😊",
          "Bạn tránh ra cho mình ngồi! 😠",
          "Mình không thích chơi với bạn 🙅"
        ],
        correctAnswer: 0,
        explanation: "Lời chào và nụ cười thân thiện sẽ giúp bé nhanh chóng có thêm nhiều bạn tốt ở trường tiểu học!"
      },
      {
        question: "Trong giờ học, khi muốn phát biểu hoặc xin phép cô ra ngoài, bé cần làm gì?",
        options: [
          "Giơ tay ngay ngắn chờ cô gọi 🙋‍♀️",
          "Hét to thật lớn trong lớp 📢",
          "Tự ý đứng dậy chạy ra khỏi lớp 🏃"
        ],
        correctAnswer: 0,
        explanation: "Giơ tay trật tự và chờ cô cho phép là nề nếp học tập chuẩn mực của học sinh lớp 1!"
      }
    ]
  },
  {
    id: "act_vq_pre_03_ocean",
    icon: "📚",
    title: "Làm quen với trường lớp: Sắp xếp bàn học ngăn nắp 📚✏️",
    titleEn: "School Life: Tidying Your Study Desk",
    icon: "📚",
    ageTier: "preschool",
    stage: null,
    minAge: 4,
    subject: "skills",
    skills: ["life.study_desk"],
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ww5wazKT7Ck",
      thumbnail: "img/study_desk_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Rèn luyện tư thế ngồi học đúng, bảo vệ mắt và cột sống; hình thành thói quen cất bút thước và giữ bàn học sạch đẹp.",
    difficulty: 1,
    content: [
      {
        question: "Khi ngồi vào bàn học ở lớp hoặc ở nhà, tư thế ngồi học đúng của bé là gì?",
        options: [
          "Lưng thẳng, hai chân chạm sàn, mắt cách bàn khoảng 25-30cm 🪑✨",
          "Nằm bò ra bàn để viết 🛌",
          "Ngồi vẹo sang một bên 🪑"
        ],
        correctAnswer: 0,
        explanation: "Ngồi thẳng lưng, mắt cách vở khoảng 25-30cm giúp bé bảo vệ cột sống và giữ cho đôi mắt luôn sáng khỏe!"
      },
      {
        question: "Sau khi làm bài tập xong, bút chì và thước kẻ nên để ở đâu?",
        options: [
          "Cất gọn vào trong hộp bút ✏️📏",
          "Để lăn lóc trên mặt bàn 🛋️",
          "Vứt xuống sàn nhà 🧹"
        ],
        correctAnswer: 0,
        explanation: "Cất bút thước vào hộp bút giúp đồ dùng không bị rơi gãy ngòi và luôn sẵn sàng cho buổi học sau!"
      },
      {
        question: "Để bàn học luôn sạch đẹp và có cảm hứng học tập, bé cần lưu ý điều gì?",
        options: [
          "Không vẽ bậy lên bàn, giữ mặt bàn luôn sạch sẽ, gọn gàng ✨📚",
          "Vẽ mực lung tung lên mặt bàn 🖍️",
          "Để vỏ bánh kẹo bừa bãi trên bàn 🍬"
        ],
        correctAnswer: 0,
        explanation: "Giữ bàn học sạch đẹp, ngăn nắp thể hiện nếp sống văn minh và giúp bé học tập tập trung, hiệu quả hơn!"
      }
    ]
  },
  {
    id: "act_vq_g12_01_spell_b",
    title: "Tập đánh vần cùng cô Lan Anh: Âm B và Dấu Thanh 🔤👩‍🏫",
    titleEn: "Phonics with Teacher Lan Anh: Letter B & Tones",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=bicX1RNzHos",
      thumbnail: "https://img.youtube.com/vi/bicX1RNzHos/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 môn Tiếng Việt lớp 1: Nhận diện phụ âm B, ghép âm B với nguyên âm và các dấu thanh (huyền, sắc, hỏi, ngã, nặng) để tạo tiếng chuẩn xác.",
    difficulty: 2,
    content: [
      {
        question: "Khi ghép âm 'B' với âm 'A' và thêm dấu 'Huyền' (`), ta được tiếng nào?",
        options: [
          "Bá",
          "Bà",
          "Bả",
          "Bạ"
        ],
        correctAnswer: 1,
        explanation: "Bờ - a - ba - huyền - Bà! Đúng quy tắc ghép vần tiếng Việt của cô Lan Anh VTV7!"
      },
      {
        question: "Từ nào sau đây có tiếng bắt đầu bằng âm 'B'?",
        options: [
          "Quả Bí ngô 🎃",
          "Cái Kẹo 🍬",
          "Con Gà 🐔",
          "Dòng Sông 🌊"
        ],
        correctAnswer: 0,
        explanation: "Bí ngô: tiếng 'Bí' bắt đầu bằng phụ âm B (b-i-bi-sắc-bí)!"
      },
      {
        question: "Cô Lan Anh hướng dẫn phát âm chữ 'B' (Bờ) như thế nào?",
        options: [
          "Hai môi khép nhẹ rồi bật luồng hơi ra ngoài",
          "Há to miệng tròn xoe như chữ O",
          "Thè lưỡi chạm vào răng cửa",
          "Hít sâu không phát thành tiếng"
        ],
        correctAnswer: 0,
        explanation: "Âm 'B' là âm môi-môi: hai môi khép kín lại rồi bật luồng hơi ra tạo thành tiếng 'Bờ'!"
      }
    ]
  },
  {
    id: "act_vq_g12_02_spell_c",
    title: "Học vần cùng cô Lan Anh: Âm C và Tiếng Có Nghĩa 🐟🦀",
    titleEn: "Phonics with Teacher Lan Anh: Letter C & Words",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=uP9Ri14I28o",
      thumbnail: "https://img.youtube.com/vi/uP9Ri14I28o/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt lớp 1: Nắm vững quy tắc chính tả của âm C (cờ) khi đi với các nguyên âm a, o, ô, ơ, u, ư.",
    difficulty: 2,
    content: [
      {
        question: "Trong quy tắc chính tả tiếng Việt, chữ 'C' đứng trước những nguyên âm nào?",
        options: [
          "Chỉ đứng trước e, ê, i",
          "Đứng trước a, o, ô, ơ, u, ư",
          "Chỉ đứng trước chữ y",
          "Không đứng trước nguyên âm nào"
        ],
        correctAnswer: 1,
        explanation: "Quy tắc chính tả: C đứng trước a, o, ô, ơ, u, ư (ví dụ: ca, cô, cư). Còn trước e, ê, i thì viết bằng chữ K!"
      },
      {
        question: "Đánh vần đúng từ 'Con Cá' 🐟 như thế nào?",
        options: [
          "C-on-con, c-a-ca-sắc-cá",
          "C-an-can, c-o-co-sắc-có",
          "K-on-kon, k-a-ka-sắc-ká",
          "B-on-bon, b-a-ba"
        ],
        correctAnswer: 0,
        explanation: "Cờ - on - con, cờ - a - ca - sắc - cá: Con Cá! 🐟"
      },
      {
        question: "Tìm từ có tiếng bắt đầu bằng âm 'C' chỉ đồ vật dùng để uống nước:",
        options: [
          "Cái Ca / Cái Cốc 🥛",
          "Cái Ghế 🪑",
          "Cái Thìa 🥄",
          "Cái Đĩa 🍽️"
        ],
        correctAnswer: 0,
        explanation: "Cái Ca (c-a-ca) và Cái Cốc (c-ôc-côc-sắc-cốc) đều bắt đầu bằng chữ C!"
      }
    ]
  },
  {
    id: "act_vq_g12_03_spell_d_dd",
    title: "Phân biệt D và Đ cùng cô Lan Anh: Con Dê và Đàn Gà 🐐🐔",
    titleEn: "Distinguish D and Đ with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=4c7ApUvxNKk",
      thumbnail: "https://img.youtube.com/vi/4c7ApUvxNKk/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt lớp 1: Phân biệt rõ ràng hình dáng chữ viết và phát âm chuẩn xác giữa hai phụ âm D (dờ) và Đ (đờ).",
    difficulty: 2,
    content: [
      {
        question: "Điểm khác biệt dễ thấy nhất giữa chữ 'D' (dờ) và chữ 'Đ' (đờ) là gì?",
        options: [
          "Chữ Đ có thêm nét gạch ngang ở đầu cổ chữ",
          "Chữ D có chấm tròn ở trên đầu",
          "Chữ Đ viết bằng vòng tròn",
          "Hai chữ giống hệt nhau không khác gì"
        ],
        correctAnswer: 0,
        explanation: "Chữ Đ có thêm nét gạch ngang phía trên thân chữ, phát âm là 'Đờ'!"
      },
      {
        question: "Từ nào dưới đây bắt đầu bằng chữ 'Đ' (đờ)?",
        options: [
          "Con Dê 🐐",
          "Quả Đu đủ 🍈",
          "Quả Dưa 🍉",
          "Cái Dù ☂️"
        ],
        correctAnswer: 1,
        explanation: "Quả Đu đủ: cả hai tiếng 'Đu' và 'Đủ' đều bắt đầu bằng chữ Đ!"
      },
      {
        question: "Chọn từ đúng chính tả điền vào chỗ trống: 'Bé ... học đúng giờ'",
        options: [
          "đi (đ-i-đi)",
          "di (d-i-di)",
          "bi (b-i-bi)",
          "ci (c-i-ci)"
        ],
        correctAnswer: 0,
        explanation: "Đi học: đ-i-đi! Chữ 'Đ' ghép với âm 'i' thành tiếng 'Đi'."
      }
    ]
  },
  {
    id: "act_vq_g12_04_spell_ai_ay",
    title: "Bí quyết ghép vần đôi 'AI' và 'AY' cùng cô Lan Anh 🌾👋",
    titleEn: "Mastering Rhymes AI and AY with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YLM9IUypgqQ",
      thumbnail: "https://img.youtube.com/vi/YLM9IUypgqQ/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt lớp 1: Nhận biết, phát âm và phân biệt hai nguyên âm đôi gần âm AI (a - i ngắn) và AY (a - y dài) trong từ vựng.",
    difficulty: 2,
    content: [
      {
        question: "Vần 'AI' trong từ 'Hoa Mai' 🌼 được ghép từ hai chữ cái nào?",
        options: [
          "Chữ A và chữ I ngắn (a - i)",
          "Chữ A và chữ Y dài (a - y)",
          "Chữ O và chữ I",
          "Chữ E và chữ I"
        ],
        correctAnswer: 0,
        explanation: "A - i - ai: vần AI có âm cuối là chữ 'i' ngắn (hoa mai, củ khoai)!"
      },
      {
        question: "Từ nào sau đây chứa vần 'AY' (a - y dài)?",
        options: [
          "Bàn Tay 👋",
          "Cái Tai 👂",
          "Củ Khoai 🥔",
          "Quả Xoài 🥭"
        ],
        correctAnswer: 0,
        explanation: "Bàn Tay: t-ay-tay! Tiếng 'Tay' có vần AY (a-y dài). Còn 'Tai' là vần AI (a-i ngắn)."
      },
      {
        question: "Điền vần thích hợp vào câu: 'Đôi bàn t... khéo léo'",
        options: [
          "ay (bàn tay)",
          "ai (bàn tai)",
          "oi (bàn toi)",
          "ui (bàn tui)"
        ],
        correctAnswer: 0,
        explanation: "Đôi bàn tay (vần ay) giúp bé viết bài, vẽ tranh và tự xúc cơm ngoan ngoãn!"
      }
    ]
  },

  // --- CẤP ĐỘ 3: LỚP 3–5 (8–11 TUỔI) - KHÁM PHÁ VŨ TRỤ & HỆ MẶT TRỜ ---
  {
    id: "act_vq_g35_01_solar_system",
    title: "Hành trình kỳ vĩ khám phá Hệ Mặt Trời 🪐🚀",
    titleEn: "Grand Journey Across the Solar System",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=libKVRa074Q",
      thumbnail: "https://img.youtube.com/vi/libKVRa074Q/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Khoa học & Tự nhiên xã hội: Trình bày được vị trí của Trái Đất trong Hệ Mặt Trời; gọi tên và so sánh đặc điểm cơ bản của các hành tinh quanh Mặt Trời.",
    difficulty: 3,
    content: [
      {
        question: "Mặt Trời là thiên thể trung tâm của Hệ Mặt Trời, thuộc loại thiên thể nào?",
        options: [
          "Một ngôi sao tự phát sáng và tỏa nhiệt khổng lồ",
          "Một hành tinh bằng đất đá nguội lạnh",
          "Một vệ tinh quay quanh Trái Đất",
          "Một sao chổi băng tuyết"
        ],
        correctAnswer: 0,
        explanation: "Mặt Trời là một ngôi sao (ngôi sao lùn vàng) có khối lượng khổng lồ, tự phát ra năng lượng ánh sáng và nhiệt sưởi ấm toàn bộ các hành tinh!"
      },
      {
        question: "Hành tinh nào trong Hệ Mặt Trời có kích thước lớn nhất và được mệnh danh là 'Vua của các hành tinh'?",
        options: [
          "Sao Mộc (Jupiter) 🪐",
          "Sao Hỏa (Mars) 🔴",
          "Sao Kim (Venus) ✨",
          "Trái Đất (Earth) 🌍"
        ],
        correctAnswer: 0,
        explanation: "Sao Mộc là hành tinh khí khổng lồ lớn nhất Hệ Mặt Trời, có thể chứa hơn 1.300 Trái Đất bên trong!"
      },
      {
        question: "Trái Đất xinh đẹp của chúng ta nằm ở vị trí thứ mấy tính theo thứ tự khoảng cách từ Mặt Trời ra ngoài?",
        options: [
          "Vị trí thứ 1 (gần nhất)",
          "Vị trí thứ 3",
          "Vị trí thứ 5",
          "Vị trí thứ 8 (xa nhất)"
        ],
        correctAnswer: 1,
        explanation: "Thứ tự lần lượt từ gần đến xa: Sao Thủy (1), Sao Kim (2), Trái Đất (3), Sao Hỏa (4). Vị trí thứ 3 có nhiệt độ lý tưởng cho sự sống phát triển!"
      }
    ]
  },
  {
    id: "act_vq_g35_02_earth_moon",
    title: "Trái Đất và Mặt Trăng: Điệu vũ ngày và đêm 🌍🌙",
    titleEn: "Earth and Moon: Cosmic Dance of Day and Night",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=f08p2A_7g14",
      thumbnail: "https://img.youtube.com/vi/f08p2A_7g14/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Địa lí & Khoa học: Giải thích được hiện tượng ngày và đêm luân phiên do Trái Đất tự quay quanh trục; nhận biết chu kỳ Mặt Trăng quanh Trái Đất.",
    difficulty: 3,
    content: [
      {
        question: "Hiện tượng ngày và đêm luân phiên xuất hiện trên Trái Đất là do nguyên nhân chính nào?",
        options: [
          "Trái Đất tự quay quanh trục tưởng tượng từ Tây sang Đông",
          "Mặt Trời tự tắt ánh sáng khi về đêm",
          "Mặt Trăng che khuất Mặt Trời",
          "Mây đen che kín bầu trời"
        ],
        correctAnswer: 0,
        explanation: "Do Trái Đất hình cầu và tự quay quanh trục liên tục (khoảng 24 giờ / 1 vòng), phần hướng về Mặt Trời là ban ngày, phần khuất bóng là ban đêm!"
      },
      {
        question: "Mặt Trăng có tự phát sáng được như Mặt Trời không?",
        options: [
          "Không, Mặt Trăng chỉ phản chiếu lại ánh sáng từ Mặt Trời",
          "Có, Mặt Trăng phát sáng nhờ than đá bên trong",
          "Có, Mặt Trăng là một bóng đèn lớn",
          "Không, ánh sáng là do Trái Đất chiếu lên"
        ],
        correctAnswer: 0,
        explanation: "Mặt Trăng là vệ tinh tự nhiên bằng đất đá nguội, nó chỉ phản chiếu lại ánh sáng của Mặt Trời chiếu vào bề mặt của nó."
      },
      {
        question: "Mất bao nhiêu thời gian để Trái Đất hoàn thành một vòng quay trọn vẹn quanh Mặt Trời?",
        options: [
          "1 ngày (24 giờ)",
          "1 tháng (30 ngày)",
          "1 năm (khoảng 365 ngày và 6 giờ)",
          "10 năm"
        ],
        correctAnswer: 2,
        explanation: "Trái Đất mất khoảng 365 ngày 6 giờ (1 năm) để đi hết một vòng quỹ đạo quanh Mặt Trời, tạo nên 4 mùa Xuân - Hạ - Thu - Đông kỳ diệu!"
      }
    ]
  },
  {
    id: "act_vq_g35_03_space_travel",
    title: "Chinh phục không gian: Bước chân con người lên Mặt Trăng 👨‍🚀🚀",
    titleEn: "Space Exploration: Humans on the Moon",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=al-do-HGuIk",
      thumbnail: "https://img.youtube.com/vi/al-do-HGuIk/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018: Bồi dưỡng niềm đam mê khoa học, hiểu biết về các thành tựu công nghệ vũ trụ và môi trường không trọng lực.",
    difficulty: 4,
    content: [
      {
        question: "Khi ở trên trạm vũ trụ không gian, tại sao các nhà du hành vũ trụ lại có thể lơ lửng bay trong không khí?",
        options: [
          "Do ở trạng thái không trọng lượng (vi trọng lực)",
          "Do có đôi cánh thần kỳ",
          "Do có quạt gió khổng lồ thổi từ dưới lên",
          "Do mặc áo bay đặc biệt"
        ],
        correctAnswer: 0,
        explanation: "Trong quỹ đạo quay quanh Trái Đất, lực hấp dẫn cân bằng với lực ly tâm tạo ra trạng thái vi trọng lượng, khiến mọi đồ vật và con người đều lơ lửng bay tự do!"
      },
      {
        question: "Tại sao khi bước ra ngoài không gian vũ trụ hoặc trên Mặt Trăng, phi hành gia bắt buộc phải mặc bộ đồ phi hành gia (spacesuit)?",
        options: [
          "Để cung cấp khí Oxy để thở, giữ nhiệt độ và áp suất cơ thể an toàn",
          "Để nhìn cho thật đẹp và chụp ảnh kỷ niệm",
          "Để bay nhanh hơn phi thuyền",
          "Để không bị ướt mưa"
        ],
        correctAnswer: 0,
        explanation: "Vũ trụ là môi trường chân không không có không khí để thở, nhiệt độ cực kỳ khắc nghiệt và có bức xạ nguy hiểm, nên bộ đồ vũ trụ bảo vệ tính mạng phi hành gia!"
      },
      {
        question: "Con người đã đưa các thiết bị công nghệ hiện đại nào lên không gian để chụp ảnh các thiên hà xa xôi hàng triệu năm ánh sáng?",
        options: [
          "Kính viễn vọng không gian (như Hubble, James Webb) 🔭",
          "Máy ảnh điện thoại thông thường",
          "Flycam bay bằng cánh quạt",
          "Bóng bay khí cầu"
        ],
        correctAnswer: 0,
        explanation: "Kính viễn vọng không gian như Hubble và James Webb hoạt động ngoài khí quyển Trái Đất, chụp được những bức ảnh vũ trụ sâu vô cùng rõ nét và kỳ ảo!"
      }
    ]
  },

  // ==========================================================================
  // 5 MINI-GAME TOÁN LỚP 3: PHÉP NHÂN & PHÉP CHIA (CT GDPT 2018)
  // ==========================================================================

  // --- GAME 1: SIÊU THỊ TOÁN HỌC (PHÉP NHÂN TÍNH TIỀN) ---
  {
    id: "act_g3_math_01_supermarket",
    title: "Siêu thị toán học: Tính tiền giỏ hàng 🛒🧺",
    titleEn: "Math Supermarket: Cart Total",
    ageTier: "grade3_5",
    stage: null,
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/supermarket_math.png",
      thumbnail: "img/supermarket_math_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 3: Thực hiện phép nhân số có nhiều chữ số với số có một chữ số; vận dụng tính tổng tiền hàng mua sắm thực tế.",
    difficulty: 3,
    content: [
      {
        question: "Bé mua 4 hộp sữa tươi 🥛, mỗi hộp có giá 8.000 đồng. Hỏi bé phải trả thu ngân bao nhiêu tiền?",
        options: [
          "24.000 đồng",
          "32.000 đồng",
          "36.000 đồng",
          "40.000 đồng"
        ],
        correctAnswer: 1,
        explanation: "Phép nhân: 8.000 × 4 = 32.000 đồng! Bé tính tiền siêu thị rất chuẩn xác!"
      },
      {
        question: "Mẹ mua 5 quyển vở ô ly 📓 giá 6.000 đồng/quyển và đưa cho cô thu ngân tờ 50.000 đồng. Cô thu ngân phải thối lại cho mẹ bao nhiêu tiền?",
        options: [
          "10.000 đồng",
          "15.000 đồng",
          "20.000 đồng",
          "25.000 đồng"
        ],
        correctAnswer: 2,
        explanation: "Tiền mua vở: 6.000 × 5 = 30.000 đồng. Tiền thối lại: 50.000 - 30.000 = 20.000 đồng!"
      },
      {
        question: "Bé chọn 3 gói bánh quy 🍪 (12.000 đồng/gói) và 2 que kem 🍦 (7.000 đồng/que). Tổng cộng hóa đơn của bé hết bao nhiêu tiền?",
        options: [
          "45.000 đồng",
          "50.000 đồng",
          "52.000 đồng",
          "55.000 đồng"
        ],
        correctAnswer: 1,
        explanation: "Tiền bánh: 12.000 × 3 = 36.000 đồng. Tiền kem: 7.000 × 2 = 14.000 đồng. Tổng tiền: 36.000 + 14.000 = 50.000 đồng!"
      }
    ]
  },

  // --- GAME 2: CHIA BÁNH TRUNG THU (PHÉP CHIA ĐỀU & CHIA CÓ DƯ) ---
  {
    id: "act_g3_math_02_mooncakes",
    title: "Chia bánh trung thu rằm tháng Tám 🥮🏮",
    titleEn: "Mid-Autumn Mooncake Sharing",
    ageTier: "grade3_5",
    stage: null,
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/mooncake_share.png",
      thumbnail: "img/mooncake_share_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 3: Hiểu bản chất phép chia (chia đều thành các phần bằng nhau); thực hiện thành thạo phép chia hết và chia có dư.",
    difficulty: 3,
    content: [
      {
        question: "Đêm rằm có 24 chiếc bánh nướng thơm lừng 🥮, xếp đều vào 6 hộp quà trung thu. Hỏi mỗi hộp có bao nhiêu chiếc bánh?",
        options: [
          "3 chiếc bánh",
          "4 chiếc bánh",
          "5 chiếc bánh",
          "6 chiếc bánh"
        ],
        correctAnswer: 1,
        explanation: "Phép chia đều: 24 : 6 = 4 chiếc bánh cho mỗi hộp quà!"
      },
      {
        question: "Có 15 chiếc bánh dẻo tuyết 🥮, chia đều cho 4 bạn nhỏ. Hỏi mỗi bạn nhận được mấy chiếc bánh và còn thừa mấy chiếc?",
        options: [
          "Mỗi bạn 3 chiếc, thừa 3 chiếc",
          "Mỗi bạn 4 chiếc, thừa 1 chiếc",
          "Mỗi bạn 3 chiếc, thừa 2 chiếc",
          "Mỗi bạn 2 chiếc, thừa 7 chiếc"
        ],
        correctAnswer: 0,
        explanation: "Phép chia có dư: 15 : 4 = 3 (dư 3). Mỗi bạn được 3 chiếc và còn thừa đúng 3 chiếc bánh dẻo!"
      },
      {
        question: "Xưởng làm bánh nướng được 48 chiếc bánh, đóng mỗi hộp 4 chiếc. Hỏi xưởng đóng được tất cả bao nhiêu hộp bánh?",
        options: [
          "10 hộp",
          "11 hộp",
          "12 hộp",
          "14 hộp"
        ],
        correctAnswer: 2,
        explanation: "Phép chia số có 2 chữ số: 48 : 4 = 12 hộp bánh hoàn chỉnh!"
      }
    ]
  },

  // --- GAME 3: ĐIỀN SỐ CÒN THIẾU (DÃY SỐ CẤP SỐ NHÂN) ---
  {
    id: "act_g3_math_03_number_pattern",
    title: "Thám tử số học: Mật mã cấp số nhân 🔍🔢",
    titleEn: "Number Detective: Geometric Sequence",
    ageTier: "grade3_5",
    stage: null,
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/number_pattern.png",
      thumbnail: "img/number_pattern_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 3: Rèn luyện tư duy logic toán học, nhận diện quy luật tăng theo bội số nhân của dãy số.",
    difficulty: 3,
    content: [
      {
        question: "Dãy số bí ẩn: 3, 6, 12, 24, [ ? ]. Tìm số thích hợp điền vào dấu hỏi chấm:",
        options: [
          "36",
          "42",
          "48",
          "52"
        ],
        correctAnswer: 2,
        explanation: "Quy luật gấp đôi (nhân 2): 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, và 24 × 2 = 48!"
      },
      {
        question: "Dãy số mật mã: 2, 6, 18, 54, [ ? ]. Điền số chính xác để mở rương kho báu:",
        options: [
          "108",
          "150",
          "162",
          "180"
        ],
        correctAnswer: 2,
        explanation: "Quy luật gấp 3 lần (nhân 3): 2 × 3 = 6, 6 × 3 = 18, 18 × 3 = 54, và 54 × 3 = 162!"
      },
      {
        question: "Dãy số bậc thang: 5, 25, 125, [ ? ]. Số tiếp theo trong dãy là số nào?",
        options: [
          "250",
          "500",
          "625",
          "750"
        ],
        correctAnswer: 2,
        explanation: "Quy luật gấp 5 lần (nhân 5): 5 × 5 = 25, 25 × 5 = 125, và 125 × 5 = 625!"
      }
    ]
  },

  // --- GAME 4: NÔNG TRẠI THU HOẠCH TÁO (CHIA ĐỀU SỌT) ---
  {
    id: "act_g3_math_04_apple_harvest",
    title: "Nông trại vui vẻ: Thu hoạch táo chín 🍏🧺",
    titleEn: "Fun Farm: Apple Harvest Division",
    ageTier: "grade3_5",
    stage: null,
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/apple_harvest.png",
      thumbnail: "img/apple_harvest_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 3: Giải bài toán có lời văn liên quan đến phép chia rút về đơn vị trong đời sống nông trại thực tế.",
    difficulty: 3,
    content: [
      {
        question: "Bác nông dân hái được 72 quả táo đỏ 🍎, chia đều vào 8 sọt tre. Hỏi mỗi sọt có bao nhiêu quả táo?",
        options: [
          "7 quả táo",
          "8 quả táo",
          "9 quả táo",
          "10 quả táo"
        ],
        correctAnswer: 2,
        explanation: "Phép chia trong bảng chia 8: 72 : 8 = 9 quả táo cho mỗi sọt!"
      },
      {
        question: "Có 5 sọt táo, mỗi sọt có 14 quả. Bác nông dân vừa hái thêm 10 quả nữa bỏ vào. Hỏi hiện có tất cả bao nhiêu quả táo?",
        options: [
          "70 quả",
          "75 quả",
          "80 quả",
          "85 quả"
        ],
        correctAnswer: 2,
        explanation: "Tính 2 bước: 5 sọt có 14 × 5 = 70 quả táo. Thêm 10 quả: 70 + 10 = 80 quả táo!"
      },
      {
        question: "Có 65 quả táo, xếp vào các hộp quà, mỗi hộp chỉ chứa được 6 quả. Hỏi cần ít nhất bao nhiêu hộp để xếp hết số táo đó?",
        options: [
          "10 hộp",
          "11 hộp",
          "12 hộp",
          "13 hộp"
        ],
        correctAnswer: 1,
        explanation: "Ta có 65 : 6 = 10 (dư 5). 10 hộp xếp được 60 quả, còn 5 quả thừa cần thêm 1 hộp nữa. Vậy cần ít nhất 10 + 1 = 11 hộp!"
      }
    ]
  },

  // --- GAME 5: ĐẤU TRƯỜNG PHÉP NHÂN (BẮN BÓNG CỬU CHƯƠNG) ---
  {
    id: "act_g3_math_05_multiplication_duel",
    title: "Đấu trường toán nhí: Bắn bóng cửu chương 🎯⚡",
    titleEn: "Math Arena: Multiplication Balloon Pop",
    ageTier: "grade3_5",
    stage: null,
    subject: "math",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/balloon_pop_math.png",
      thumbnail: "img/balloon_pop_math_thumb.png"
    },
    learningObjective: "CT GDPT 2018 môn Toán lớp 3: Thuộc làu bảng nhân 6, 7, 8, 9; rèn luyện phản xạ tính nhẩm nhanh và kết hợp cộng trừ nhân chia.",
    difficulty: 4,
    content: [
      {
        question: "Quả bóng bay mang phép tính '7 × 8' 🎈. Kết quả chính xác là bao nhiêu?",
        options: [
          "48",
          "54",
          "56",
          "64"
        ],
        correctAnswer: 2,
        explanation: "Bảng nhân 7: 7 × 8 = 56! Bé bắn bóng rất chuẩn xác!"
      },
      {
        question: "Trong các phép nhân dưới đây, quả bóng nào có giá trị bằng 54?",
        options: [
          "6 × 9 🎈",
          "7 × 7 🎈",
          "8 × 6 🎈",
          "9 × 5 🎈"
        ],
        correctAnswer: 0,
        explanation: "Ta có 6 × 9 = 54 (còn 7 × 7 = 49, 8 × 6 = 48, 9 × 5 = 45)!"
      },
      {
        question: "Thử thách tính nhanh: Tính giá trị biểu thức '9 × 7 + 8 × 4'?",
        options: [
          "85",
          "91",
          "95",
          "99"
        ],
        correctAnswer: 2,
        explanation: "Tính từng tích: 9 × 7 = 63 và 8 × 4 = 32. Sau đó cộng lại: 63 + 32 = 95!"
      }
    ]
  },

  // ==========================================================================
  // 5 BÀI HỌC TIẾNG ANH LỚP 4–5: KHOA HỌC TỰ NHIÊN (VÒNG ĐỜI CỦA BƯỚM)
  // ==========================================================================

  // --- BÀI 1: TỪ VỰNG 4 GIAI ĐOẠN VÒNG ĐỜI ---
  {
    id: "act_g35_sci_01_butterfly_vocab",
    title: "Vòng đời của bướm: Khám phá từ vựng 🐛🦋",
    titleEn: "Life Cycle of a Butterfly: Key Vocabulary",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/butterfly_cycle.png",
      thumbnail: "img/butterfly_cycle_thumb.png"
    },
    learningObjective: "Tiếng Anh & Khoa học Lớp 4-5: Nắm vững 4 thuật ngữ khoa học chính của vòng đời loài bướm (Egg, Larva / Caterpillar, Pupa / Chrysalis, Adult Butterfly).",
    difficulty: 3,
    content: [
      {
        question: "Stage 1: A female butterfly lays tiny green dots on a leaf. What is this stage called? 🍃",
        options: [
          "Egg (Trứng)",
          "Pupa (Kén nhộng)",
          "Adult (Bướm trưởng thành)",
          "Larva (Sâu bướm)"
        ],
        correctAnswer: 0,
        explanation: "Correct! The mother butterfly lays tiny round eggs on green leaves. Giai đoạn 1 là Egg (Trứng)."
      },
      {
        question: "Stage 2: The egg hatches into a hungry caterpillar that eats green leaves all day. What is the scientific name? 🐛",
        options: [
          "Pupa",
          "Larva (Caterpillar)",
          "Adult",
          "Egg"
        ],
        correctAnswer: 1,
        explanation: "Awesome! 'Larva' (hoặc caterpillar) là sâu bướm, ăn rất nhiều lá cây để lớn nhanh!"
      },
      {
        question: "Stage 3: The caterpillar builds a hard protective shell around itself to transform. What is it? 🛖",
        options: [
          "Egg",
          "Larva",
          "Pupa (Chrysalis)",
          "Adult Butterfly"
        ],
        correctAnswer: 2,
        explanation: "Super! 'Pupa' (kén nhộng/chrysalis) là giai đoạn nghỉ ngơi và biến đổi kỳ diệu bên trong lớp vỏ cứng."
      }
    ]
  },

  // --- BÀI 2: ĐỌC HIỂU CÂU VÍ DỤ & NGHĨA KHOA HỌC ---
  {
    id: "act_g35_sci_02_sentence_match",
    title: "Tiếng Anh Khoa học: Ghép câu & ý nghĩa 📖🌿",
    titleEn: "Butterfly Science: Sentences & Meaning",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/butterfly_stages.png",
      thumbnail: "img/butterfly_stages_thumb.png"
    },
    learningObjective: "Đọc hiểu các câu văn khoa học miêu tả đặc điểm sinh học của từng giai đoạn phát triển.",
    difficulty: 3,
    content: [
      {
        question: "'The pupa rests quietly inside the hard shell.' Câu này có nghĩa là gì?",
        options: [
          "Con nhộng nằm yên tĩnh bên trong lớp vỏ cứng.",
          "Con bướm bay lượn hút mật hoa.",
          "Sâu bướm bò đi tìm lá non.",
          "Quả trứng nở ra sau cơn mưa."
        ],
        correctAnswer: 0,
        explanation: "Chính xác! 'pupa' = nhộng, 'rests quietly' = nằm yên tĩnh, 'hard shell' = vỏ cứng."
      },
      {
        question: "Chọn câu tiếng Anh miêu tả đúng nhất giai đoạn 'Adult Butterfly': 🦋🌸",
        options: [
          "The adult butterfly has colorful wings and drinks sweet flower nectar.",
          "The adult stays underground all winter.",
          "The adult has no wings and crawls slowly.",
          "The adult only lives inside an egg."
        ],
        correctAnswer: 0,
        explanation: "Great job! Bướm trưởng thành ('adult butterfly') có đôi cánh sặc sỡ và hút mật hoa ngọt ngào."
      },
      {
        question: "Hoàn thành câu: 'A tiny ______ hatches from the egg and eats leaves.' 🐛",
        options: [
          "larva",
          "wing",
          "flower",
          "shell"
        ],
        correctAnswer: 0,
        explanation: "Well done! 'A tiny larva (caterpillar) hatches from the egg' (Một chú ấu trùng nhỏ nở ra từ quả trứng)."
      }
    ]
  },

  // --- BÀI 3: DRAG & DROP LOGIC - SẮP XẾP THỨ TỰ VÒNG ĐỜI ---
  {
    id: "act_g35_sci_03_lifecycle_dragdrop",
    title: "Sắp xếp vòng đời của Bướm (Drag & Drop) 🔄✨",
    titleEn: "Order the Butterfly Life Cycle (Sequence)",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    skill: "Khoa học tự nhiên: Sắp xếp đúng trình tự 4 giai đoạn vòng đời sinh vật",
    type: "drag_drop",
    difficulty: 3,
    mediaSource: {
      type: "image_set",
      url: "img/butterfly_order.png",
      thumbnail: "img/butterfly_order_thumb.png"
    },
    learningObjective: "Rèn luyện tư duy logic khoa học qua việc xếp đúng 4 bước theo thời gian: Egg ➔ Larva ➔ Pupa ➔ Adult.",
    content: {
      question: "Bé hãy chạm vào các thẻ để xếp đúng thứ tự 4 giai đoạn vòng đời của bướm nhé! 🔄",
      questionEn: "Place the 4 stages of the butterfly life cycle in the correct chronological order!",
      media: "🥚 ➔ 🐛 ➔ 🛖 ➔ 🦋",
      slots: 4,
      tokens: [
        { id: "t_pupa", text: "3. Pupa" },
        { id: "t_egg", text: "1. Egg" },
        { id: "t_adult", text: "4. Adult" },
        { id: "t_larva", text: "2. Larva" }
      ],
      correctSequence: ["1. Egg", "2. Larva", "3. Pupa", "4. Adult"]
    },
    feedback: {
      correct: "Xuất sắc! Vòng đời của bướm bắt đầu từ: 1. Egg (Trứng) ➔ 2. Larva (Ấu trùng sâu) ➔ 3. Pupa (Nhộng) ➔ 4. Adult (Bướm trưởng thành)! 🌟🦋",
      wrong: "Bé nhớ lại nhé: Trứng nở thành Sâu, Sâu hóa thành Nhộng, rồi mới nở thành Bướm xinh đẹp!"
    },
    reward: { stars: 3 }
  },

  // --- BÀI 4: LUYỆN NGHE AUDIO SCRIPT (LISTENING COMPREHENSION) ---
  {
    id: "act_g35_sci_04_listening_script",
    title: "Luyện nghe tiếng Anh: Chú sâu háu ăn 🎧🐛",
    titleEn: "Listening: The Hungry Caterpillar Transformation",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "reading_passage",
    difficulty: 3,
    mediaSource: {
      type: "image_set",
      url: "img/hungry_caterpillar.png",
      thumbnail: "img/hungry_caterpillar_thumb.png"
    },
    learningObjective: "Luyện kỹ năng nghe hiểu đoạn văn ngắn tiếng Anh về quá trình sâu bướm chuẩn bị làm kén.",
    content: {
      storyText: "Listen to the story: 'On a sunny morning, a tiny caterpillar hatches from an egg. It eats green leaves day and night. Soon, it grows big and fat. Then, it hangs upside down on a branch to make a pupa.'",
      question: "According to the audio story, what does the caterpillar do when it grows big and fat? 🎧",
      questionEn: "What does the caterpillar do when it grows big and fat?",
      media: "🎧 🐛 🍃 🛖"
    },
    options: [
      { id: "optA", text: "It flies away to find sweet flowers." },
      { id: "optB", text: "It hangs upside down to make a pupa." },
      { id: "optC", text: "It lays tiny eggs under a rock." },
      { id: "optD", text: "It goes to sleep under the soil." }
    ],
    correctAnswer: "optB",
    feedback: {
      correct: "Awesome listening! 'Then, it hangs upside down on a branch to make a pupa' (Sau đó, chú treo ngược mình trên cành cây để tạo thành chiếc kén nhộng)! 🎧🌟",
      wrong: "Bé nghe lại câu cuối nhé: 'Then, it hangs upside down on a branch to make a pupa.'"
    },
    reward: { stars: 3 }
  },

  // --- BÀI 5: KHOA HỌC MỞ RỘNG (METAMORPHOSIS QUIZ) ---
  {
    id: "act_g35_sci_05_metamorphosis",
    title: "Bí mật biến thái hoàn toàn: Metamorphosis 🔬✨",
    titleEn: "Science Secret: Complete Metamorphosis",
    ageTier: "grade3_5",
    stage: null,
    subject: "science",
    type: "logic_puzzle",
    mediaSource: {
      type: "image_set",
      url: "img/metamorphosis.png",
      thumbnail: "img/metamorphosis_thumb.png"
    },
    learningObjective: "Tìm hiểu hiện tượng biến thái hoàn toàn (Metamorphosis) và vai trò của bướm đối với hệ sinh thái thực vật.",
    difficulty: 4,
    content: [
      {
        question: "The complete transformation from an egg into an adult butterfly is called: 🔬",
        options: [
          "Metamorphosis (Biến thái hoàn toàn)",
          "Photosynthesis (Quang hợp)",
          "Evaporation (Bay hơi)",
          "Hibernation (Ngủ đông)"
        ],
        correctAnswer: 0,
        explanation: "Exactly! 'Metamorphosis' là thuật ngữ sinh học chỉ sự biến thái hoàn toàn trải qua 4 giai đoạn rõ rệt."
      },
      {
        question: "Inside the pupa, the caterpillar's body breaks down and rebuilds into wings and long legs. How long does it usually take? ⏳",
        options: [
          "About 1 to 2 weeks (Khoảng 1 đến 2 tuần)",
          "10 seconds (10 giây)",
          "5 years (5 năm)",
          "Only 1 minute (Chỉ 1 phút)"
        ],
        correctAnswer: 0,
        explanation: "Correct! Hầu hết các loài bướm ở trong kén nhộng từ 1 đến 2 tuần trước khi bung kén xòe cánh."
      },
      {
        question: "How do adult butterflies help plants and flowers in nature? 🌸🐝",
        options: [
          "They help pollinate flowers (Thụ phấn cho hoa)",
          "They eat tree roots (Ăn rễ cây)",
          "They dig deep holes in the ground",
          "They make the flowers dry up"
        ],
        correctAnswer: 0,
        explanation: "Wonderful! Khi bay đi hút mật hoa, bướm mang theo phấn hoa giúp cây cối thụ phấn ('pollinate flowers') để kết trái."
      }
    ]
  },

  // ==========================================================================
  // 5 BÀI HỌC LỚP 1–2 - TẬP ĐÁNH VẦN CHỮ CÁI CÙNG CÔ LAN ANH (A, Ă, Â, B, C)
  // ==========================================================================
  {
    id: "g1_lananh_01_letter_a",
    icon: "🔤",
    title: "Học chữ A cùng cô Lan Anh: Chữ A tươi cười 🍎",
    titleEn: "Letter A: Happy Open Mouth with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    videoUrl: "https://www.youtube.com/watch?v=t5As5kwFvRM",
    learningGoal: "Bé nhận biết mặt chữ A, mở rộng khẩu hình miệng cười tươi và phát âm 'A' to, rõ ràng.",
    parentTip: "Bố mẹ hướng dẫn bé mở to miệng như khi đi khám bác sĩ và nói 'Aaaa'. Cùng bé tìm các đồ vật quanh nhà có chữ A như Quả Táo, Cái Áo nhé!",
    difficulty: 1,
    activities: [
      {
        type: "listen_and_pick",
        question: "Bé hãy chạm vào chữ 'A' có hai chân bước đều và nét ngang ở giữa nào:",
        options: ["A", "O", "C", "B"],
        correctAnswer: "A",
        audioHint: "Chữ A mở miệng cười thật to: 'Aaaaa'! Bé chọn chữ A nhé!"
      },
      {
        type: "image_match",
        "question": "Chữ 'A' ngọt ngào xuất hiện trong loại quả đỏ mọng nào?",
        options: [
          { "text": "Anh đào", "icon": "🍒" },
          { "text": "Bắp ngô", "icon": "🌽" }
        ],
        correctAnswer: "Anh đào",
        audioHint: "A - Quả Anh Đào màu đỏ mọng ngọt thơm!"
      },
      {
        type: "image_match",
        question: "Món đồ mặc trên người nào bắt đầu bằng tiếng 'Áo' có chữ A?",
        options: [
          { "text": "Cái Áo", "icon": "👕" },
          { "text": "Cái Nón", "icon": "👒" }
        ],
        correctAnswer: "Cái Áo",
        audioHint: "A - Cái Áo xinh của bé mặc đi chơi!"
      }
    ]
  },
  {
    id: "g1_lananh_02_letter_aw",
    icon: "🔤",
    title: "Học chữ Ă cùng cô Lan Anh: Chiếc mũ trăng khuyết 🌙",
    titleEn: "Letter Ă: Crescent Smile with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    videoUrl: "https://www.youtube.com/watch?v=1qAjhNd2N6M",
    learningGoal: "Bé nhận diện chữ Ă (Á), liên tưởng dấu á với vầng trăng khuyết ngửa lên trời.",
    parentTip: "Mẹo Cô Lan Anh: Đố bé 'Chữ A đội trăng khuyết ngửa lên trời là chữ gì?'. Mẹ cong ngón tay làm hình vầng trăng để bé bắt chước theo.",
    difficulty: 1,
    activities: [
      {
        type: "listen_and_pick",
        question: "Bé hãy tìm chữ 'Ă' (Á) có chiếc mũ cong ngửa lên trời đón trăng nào:",
        options: ["A", "Ă", "Â", "E"],
        correctAnswer: "Ă",
        audioHint: "Chữ Ă chính là chữ A nhưng có vầng trăng khuyết cong cong ở trên đầu đấy!"
      },
      {
        type: "image_match",
        question: "Vật dụng lau mặt mềm mại mỗi sáng nào có chữ 'Ă' (Á)?",
        options: [
          { "text": "Khăn mặt", "icon": "🧣" },
          { "text": "Bàn chải", "icon": "🪥" }
        ],
        correctAnswer: "Khăn mặt",
        audioHint: "Khờ - Ăn - Khăn! Khăn mặt thơm tho giúp bé rửa mặt sạch tinh!"
      },
      {
        type: "image_match",
        question: "Hình ảnh vầng sáng dịu dàng ban đêm nào có chữ 'Ă'?",
        options: [
          { "text": "Mặt trăng", "icon": "🌙" },
          { "text": "Mặt trời", "icon": "☀️" }
        ],
        correctAnswer: "Mặt trăng",
        audioHint: "Mờ - Ăn - Măng - Nặng - Mặt trăng tròn sáng lung linh!"
      }
    ]
  },
  {
    id: "g1_lananh_03_letter_aa",
    icon: "🔤",
    title: "Học chữ Â cùng cô Lan Anh: Chiếc nón che mưa 🛖",
    titleEn: "Letter Â: The Little Hat with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    videoUrl: "https://www.youtube.com/watch?v=rErOluFSNT0",
    learningGoal: "Bé phân biệt rõ ràng chữ Â (Ớ) với Ă nhờ chiếc nón úp nhọn đầu như mái nhà che mưa.",
    parentTip: "Bố mẹ dùng hai bàn tay chụm lại hình chóp nón lên đầu bé và nói 'Â - Chiếc nón che mưa'. Hỏi lại bé: 'Nón ngửa là Ă, nón úp là chữ gì?'.",
    difficulty: 1,
    activities: [
      {
        type: "listen_and_pick",
        question: "Bé chạm vào chữ 'Â' đang đội chiếc nón lá che nắng mưa nhé:",
        options: ["Ă", "A", "Â", "O"],
        correctAnswer: "Â",
        audioHint: "Chữ Â có chiếc nón nhọn chóp úp xuống như mái nhà che mưa cho bé!"
      },
      {
        type: "image_match",
        question: "Đồ vật ấm áp dùng để pha trà mời ông bà nào bắt đầu bằng chữ 'Â'?",
        options: [
          { "text": "Ấm trà", "icon": "🫖" },
          { "text": "Cốc nước", "icon": "🥛" }
        ],
        correctAnswer: "Ấm trà",
        audioHint: "Â - Sắc - Ấm! Ấm trà nóng thơm của ông bà!"
      },
      {
        type: "image_match",
        question: "Giai điệu vui tươi rộn rã nào bắt đầu bằng chữ 'Â'?",
        options: [
          { "text": "Âm nhạc", "icon": "🎵" },
          { "text": "Bức tranh", "icon": "🎨" }
        ],
        correctAnswer: "Âm nhạc",
        audioHint: "Âm nhạc vui tươi rộn rã cho bé múa hát!"
      }
    ]
  },
  {
    id: "g1_lananh_04_letter_b",
    icon: "🔤",
    title: "Học chữ B cùng cô Lan Anh: Chữ B bụng bự ⚽",
    titleEn: "Letter B: Big Round Bellies with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    videoUrl: "https://www.youtube.com/watch?v=bicX1RNzHos",
    learningGoal: "Nhận biết phụ âm B, mím hai môi bật hơi phát âm chuẩn 'Bờ' và tìm chữ B trong đồ chơi quen thuộc.",
    parentTip: "Bố mẹ dạy bé xoa bụng tròn và nói 'Bờ - Bụng bự'. Sau đó cho bé chơi bóng và đố: 'Quả bóng bắt đầu bằng chữ gì?'.",
    difficulty: 1,
    activities: [
      {
        type: "listen_and_pick",
        question: "Tìm chữ 'B' (Bờ) có nét thẳng và chiếc bụng tròn bự nào bé ơi:",
        options: ["D", "B", "C", "A"],
        correctAnswer: "B",
        audioHint: "Bé mím môi bật hơi nào: Bờ! Chữ B có hai chiếc bụng tròn no căng bên phải!"
      },
      {
        type: "image_match",
        question: "Đồ chơi tròn xoe bé thích đá trên sân cỏ bắt đầu bằng chữ 'B' là gì?",
        options: [
          { "text": "Quả Bóng", "icon": "⚽" },
          { "text": "Chiếc Xe", "icon": "🚗" }
        ],
        correctAnswer: "Quả Bóng",
        audioHint: "B - Quả Bóng lăn tròn trên sân cỏ!"
      },
      {
        type: "image_match",
        question: "Bạn búp bê xinh xắn trong góc đồ chơi bắt đầu bằng chữ gì?",
        options: [
          { "text": "Búp bê", "icon": "🪆" },
          { "text": "Gấu bông", "icon": "🧸" }
        ],
        correctAnswer: "Búp bê",
        audioHint: "B - Búp bê mắt tròn xoe má hồng dễ thương!"
      }
    ]
  },
  {
    id: "g1_lananh_05_letter_c",
    icon: "🔤",
    title: "Học chữ C cùng cô Lan Anh: Chữ C cong cong & Chú Cá nhỏ 🐟",
    titleEn: "Letter C: Curved Crescent with Teacher Lan Anh",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    videoUrl: "https://www.youtube.com/watch?v=uP9Ri14I28o",
    learningGoal: "Nhận biết chữ C với nét cong hở phải, phát âm 'Cờ' dứt khoát và làm quen ghép tiếng 'Cá'.",
    parentTip: "Bố mẹ uốn cong bàn tay thành hình chữ C và bảo bé: 'Đây là miệng cười Cờ'. Cùng bé làm động tác cá bơi hai tay uốn lượn: 'Cờ - A - Ca - Sắc - Cá'.",
    difficulty: 1,
    activities: [
      {
        type: "listen_and_pick",
        question: "Bé hãy chạm vào chữ 'C' (Cờ) cong tròn như chiếc miệng đang cười nhé:",
        options: ["O", "C", "D", "B"],
        correctAnswer: "C",
        audioHint: "Chữ C là một nét cong tròn hở một bên phải giống vầng trăng khuyết!"
      },
      {
        type: "image_match",
        question: "Bạn nhỏ nào tung tăng bơi lội dưới nước bắt đầu bằng chữ 'C'?",
        options: [
          { "text": "Chú Cá", "icon": "🐟" },
          { "text": "Vịt con", "icon": "🐥" }
        ],
        correctAnswer: "Chú Cá",
        audioHint: "C - Con Cá bơi lội tung tăng trong làn nước mát!"
      },
      {
        type: "image_match",
        question: "Củ gì màu cam giòn ngọt mà chú thỏ rất thích ăn có chữ 'C'?",
        options: [
          { "text": "Cà rốt", "icon": "🥕" },
          { "text": "Quả chuối", "icon": "🍌" }
        ],
        correctAnswer: "Cà rốt",
        audioHint: "C - Củ Cà rốt màu cam giàu vitamin cho đôi mắt sáng ngời!"
      }
    ]
  },

  // ==========================================================================
  // LỚP 1–2 (6–8 TUỔI) - BẢNG CHỮ CÁI & PHỤ ÂM GHÉP VTV7 (ABC VUI TỪNG GIỜ)
  // Toàn bộ playlist chuẩn VTV7: https://www.youtube.com/playlist?list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL
  // Bám sát chuẩn CT GDPT 2018 môn Tiếng Việt Lớp 1
  // ==========================================================================
  {
    id: "g1_vtv7_01_letter_o",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ O tròn xoe ⭕ (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter O",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=iBX6RT_xrg0&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=1",
      thumbnail: "https://img.youtube.com/vi/iBX6RT_xrg0/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 môn Tiếng Việt lớp 1: Nhận diện chữ O, phát âm âm O tròn môi và tìm các tiếng chứa chữ O trong đời sống.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'O' có hình dáng tròn xoe giống vật thể quen thuộc nào?",
        options: ["Quả trứng gà tròn 🥚","Chiếc thang đứng 🪜","Mái nhà nhọn 🛖","Chiếc nón lá 👒"],
        correctAnswer: 0,
        explanation: "O tròn như quả trứng gà! Chữ O là một nét cong tròn khép kín hoàn hảo."
      },
      {
        question: "Tìm từ có chứa chữ 'O' chỉ đồ chơi bé yêu thích:",
        options: ["Ô tô 🚗","Búp bê 🪆","Quả bóng ⚽","Viên bi ⚪"],
        correctAnswer: 2,
        explanation: "Quả bóng (b-ong-bong-sắc-bóng): tiếng 'bóng' có chữ O!"
      },
      {
        question: "Khẩu hình miệng khi phát âm âm 'O' chuẩn xác là gì?",
        options: ["Miệng mở tròn đều, môi uốn tròn","Mím chặt hai môi","Răng cắn nhẹ vào môi","Há to hết cỡ sang hai bên"],
        correctAnswer: 0,
        explanation: "Khi phát âm 'O', hai môi mở tròn đều tạo luồng hơi thoát ra tự nhiên: O!"
      }
    ]
  },
  {
    id: "g1_vtv7_02_letter_oo",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Ô đội mũ 🧢 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Ô",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lYpWGqbGbkw&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=2",
      thumbnail: "https://img.youtube.com/vi/lYpWGqbGbkw/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ Ô, dấu nón úp trên đầu chữ O và phân biệt âm O với Ô.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'Ô' khác chữ 'O' ở điểm đặc biệt nào?",
        options: ["Có thêm chiếc mũ nón úp trên đầu 🧢","Có dấu râu bên phải","Có nét gạch ngang ở bụng","Không khác nhau"],
        correctAnswer: 0,
        explanation: "Ô thì đội mũ! Chữ Ô chính là chữ O có thêm chiếc nón úp nhọn trên đầu."
      },
      {
        question: "Phương tiện giao thông nào bắt đầu bằng chữ 'Ô'?",
        options: ["Ô tô 🚗","Xe máy 🛵","Tàu hỏa 🚂","Máy bay ✈️"],
        correctAnswer: 0,
        explanation: "Ô tô: tiếng 'Ô' đứng đầu chỉ xe ô tô chạy bon bon trên đường!"
      },
      {
        question: "Tìm con vật có chữ 'Ô' trong tên gọi:",
        options: ["Con gà trống 🐓","Con cá vàng 🐠","Con mèo con 🐱","Con chó con 🐶"],
        correctAnswer: 0,
        explanation: "Gà trống (tr-ông-trông-sắc-trống): tiếng 'trống' có chữ Ô!"
      }
    ]
  },
  {
    id: "g1_vtv7_03_letter_ow",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Ơ có râu 🐱 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Ơ",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=KPzCvB3890o&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=3",
      thumbnail: "https://img.youtube.com/vi/KPzCvB3890o/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Phân biệt bộ ba nguyên âm O - Ô - Ơ, nhận diện nét râu móc chữ Ơ và ghép vần.",
    difficulty: 2,
    content: [
      {
        question: "Câu thơ quen thuộc giúp bé ghi nhớ chữ 'Ơ' là gì?",
        options: ["Ơ thì thêm râu 🐱","Ơ thì đội mũ 🧢","Ơ tròn như quả trứng 🥚","Ơ thẳng như cây thước 📏"],
        correctAnswer: 0,
        explanation: "O tròn như quả trứng gà, Ô thì đội mũ, Ơ thì thêm râu!"
      },
      {
        question: "Loại gia vị màu đỏ cay cay nào có chữ 'Ơ'?",
        options: ["Quả Ớt 🌶️","Củ Tỏi 🧄","Củ Gừng 🫚","Hạt Tiêu 🧂"],
        correctAnswer: 0,
        explanation: "Quả Ớt: bắt đầu bằng chữ Ơ (ơ-sắc-ớt) có vị cay nồng đặc trưng!"
      },
      {
        question: "Trong các từ sau, từ nào chứa chữ 'Ơ'?",
        options: ["Lá cờ 🚩","Cái ô ☂️","Quả na 🍐","Bông hoa 🌸"],
        correctAnswer: 0,
        explanation: "Lá cờ (c-ơ-cơ-huyền-cờ): tiếng 'cờ' có chữ Ơ đỏ sao vàng thắm tươi!"
      }
    ]
  },
  {
    id: "g1_vtv7_04_letter_a",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ A & Đánh vần chữ A 🍎 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter A",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=mk6HhmS3SEg&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=4",
      thumbnail: "https://img.youtube.com/vi/mk6HhmS3SEg/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ A in hoa, in thường, phát âm chuẩn và làm quen ghép tiếng Ba, Ca, Gà.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'A' có cấu tạo gồm những nét cơ bản nào?",
        options: ["Hai nét xiên và một nét ngang ở giữa","Một nét cong tròn khép kín","Một nét thẳng đứng và hai bụng tròn","Một nét cong hở phải"],
        correctAnswer: 0,
        explanation: "Chữ A gồm hai nét xiên hai bên như hai chân đứng vững và một nét gạch ngang ở giữa!"
      },
      {
        question: "Khi ghép âm 'B' với 'A' và dấu sắc, ta được tiếng nào?",
        options: ["Bá","Bà","Bả","Bạ"],
        correctAnswer: 0,
        explanation: "Bờ - a - ba - sắc - Bá! Đúng quy tắc ghép âm và dấu thanh tiếng Việt lớp 1."
      },
      {
        question: "Món đồ mặc trên người bé mỗi ngày bắt đầu bằng chữ 'A' là gì?",
        options: ["Cái Áo 👕","Cái Quần 👖","Đôi Tất 🧦","Chiếc Mũ 🧢"],
        correctAnswer: 0,
        explanation: "Cái Áo (a-sắc-áo): bắt đầu bằng chữ cái A quen thuộc!"
      }
    ]
  },
  {
    id: "g1_vtv7_05_letter_aw",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Ă: Vầng trăng khuyết 🌙 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Ă",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=waszboqAEeY&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=5",
      thumbnail: "https://img.youtube.com/vi/waszboqAEeY/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ Ă (Á), dấu á cong ngửa lên trời và ghép các vần có âm Ă (ăn, ắp, ắt).",
    difficulty: 2,
    content: [
      {
        question: "Dấu á trên đầu chữ 'Ă' có hình dáng giống gì?",
        options: ["Vầng trăng khuyết ngửa lên trời 🌙","Mái nhà nhọn úp xuống 🛖","Chiếc nơ xinh 🎀","Dấu chấm tròn 🔴"],
        correctAnswer: 0,
        explanation: "Dấu á của chữ Ă là nét cong ngửa lên trời tựa vầng trăng khuyết dịu dàng."
      },
      {
        question: "Vật dụng lau mặt mềm mại mỗi sáng có chứa chữ 'Ă':",
        options: ["Khăn mặt 🧣","Bàn chải 🪥","Gương soi 🪞","Cốc nước 🥛"],
        correctAnswer: 0,
        explanation: "Khăn mặt (kh-ăn-khăn): tiếng 'khăn' có vần ĂN chứa chữ Ă!"
      },
      {
        question: "Hình ảnh lung linh ban đêm trên bầu trời nào có chữ 'Ă'?",
        options: ["Mặt trăng 🌙","Mặt trời ☀️","Cầu vồng 🌈","Đám mây ☁️"],
        correctAnswer: 0,
        explanation: "Mặt trăng (m-ăng-măng-nặng-mặt): tiếng 'mặt' chứa chữ Ă!"
      }
    ]
  },
  {
    id: "g1_vtv7_06_letter_aa",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Â: Chiếc nón che mưa 🛖 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Â",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wNL8V_MlmTA&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=6",
      thumbnail: "https://img.youtube.com/vi/wNL8V_MlmTA/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Phân biệt chữ Ă và chữ Â, nhận diện dấu nón úp và ghép vần âm, ân, ấp.",
    difficulty: 2,
    content: [
      {
        question: "Điểm khác biệt rõ nhất giữa dấu chữ 'Ă' và dấu chữ 'Â' là gì?",
        options: ["Dấu Ă ngửa lên trời (🌙), dấu Â úp xuống như nón (🛖)","Dấu Ă có hình vuông, dấu Â hình tròn","Dấu Ă nằm bên dưới, dấu Â nằm bên trên","Hai dấu giống hệt nhau"],
        correctAnswer: 0,
        explanation: "Dễ nhớ nhất: Nón ngửa là Ă, nón úp là Â!"
      },
      {
        question: "Đồ vật dùng để pha trà nóng mời ông bà bắt đầu bằng chữ 'Â' là gì?",
        options: ["Ấm trà 🫖","Cốc trà 🍵","Bình thủy 🍶","Cái ly 🥛"],
        correctAnswer: 0,
        explanation: "Ấm trà: tiếng 'Ấm' (â-m-âm-sắc-ấm) bắt đầu bằng nguyên âm Â!"
      },
      {
        question: "Giai điệu vui tươi rộn ràng cho bé múa hát bắt đầu bằng chữ 'Â':",
        options: ["Âm nhạc 🎵","Bức tranh 🎨","Trò chơi 🎲","Bài thơ 📜"],
        correctAnswer: 0,
        explanation: "Âm nhạc: tiếng 'Âm' mở đầu bằng chữ Â mang niềm vui ca hát đến cho bé!"
      }
    ]
  },
  {
    id: "g1_vtv7_07_letter_u",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ U & Tiếng có âm U 🥣 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter U",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=X14_q49I9O0&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=7",
      thumbnail: "https://img.youtube.com/vi/X14_q49I9O0/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ U, nét móc dưới và ghép phụ âm với âm U (bu, cu, du, đu, thu).",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'U' thường được viết bởi các nét nào?",
        options: ["Nét móc hai đầu và nét móc ngược phải","Một nét tròn khép kín","Hai nét xiên chéo nhau","Một nét lượn sóng"],
        correctAnswer: 0,
        explanation: "Chữ U viết thường gồm nét hất và nét móc ngược rộng, tạo dáng như chiếc bát tròn."
      },
      {
        question: "Loại quả giải khát ngày hè có cả hai tiếng chứa âm 'U':",
        options: ["Quả Đu đủ 🍈","Quả Chuối 🍌","Quả Cam 🍊","Quả Táo 🍎"],
        correctAnswer: 0,
        explanation: "Đu đủ: đ-u-đu và đ-u-đu-hỏi-đủ! Cả 2 tiếng đều chứa nguyên âm U!"
      },
      {
        question: "Vật dụng che nắng che mưa bé mang đi học có âm 'U':",
        options: ["Cái Dù (Ô dù) ☂️","Cái Mũ 🧢","Cái Nón 👒","Áo mưa 🧥"],
        correctAnswer: 0,
        explanation: "Cái Dù (d-u-du-huyền-dù) giúp bé không bị ướt khi trời mưa!"
      }
    ]
  },
  {
    id: "g1_vtv7_08_letter_uw",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Ư & Phân biệt U/Ư 🍇 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Ư",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=vZLCRG3uZg8&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=8",
      thumbnail: "https://img.youtube.com/vi/vZLCRG3uZg8/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận biết nét râu chữ Ư, phân biệt khẩu hình phát âm U (chụm môi) và Ư (cười bè môi).",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'Ư' khác chữ 'U' ở điểm nào?",
        options: ["Chữ Ư có thêm nét râu nhỏ ở góc trên bên phải","Chữ Ư có nét gạch ngang ở bụng","Chữ Ư có chấm tròn trên đầu","Chữ Ư viết hoa chữ U viết thường"],
        correctAnswer: 0,
        explanation: "Chữ Ư chính là chữ U có thêm nét râu móc xinh xắn ở góc trên bên phải!"
      },
      {
        question: "Bức thư bé gửi tặng bà nơi xa có chứa âm 'Ư' là từ nào?",
        options: ["Lá thư ✉️","Tấm thiệp 💌","Cuốn sách 📖","Tờ báo 📰"],
        correctAnswer: 0,
        explanation: "Lá thư (th-ư-thư): tiếng 'thư' có chữ Ư chứa đựng tình yêu thương của bé!"
      },
      {
        question: "Loại quả vỏ xanh nước ngọt mát lành mọc nhiều ở Bến Tre có chữ 'Ư':",
        options: ["Quả Dừa 🥥","Quả Nhãn 🍈","Quả Vải 🍓","Quả Mận 🫐"],
        correctAnswer: 0,
        explanation: "Quả Dừa (d-ưa-dưa-huyền-dừa): chứa nguyên âm đôi có chữ Ư!"
      }
    ]
  },
  {
    id: "g1_vtv7_09_letter_e",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ E & Tiếng có âm E 🐑 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter E",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5riu4_DkLug&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=9",
      thumbnail: "https://img.youtube.com/vi/5riu4_DkLug/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ E, nét thắt cong và tìm tiếng có âm E trong đời sống (bé, me, ve, xe).",
    difficulty: 2,
    content: [
      {
        question: "Tiếng kêu be be của bạn nhỏ nào trong nông trại chứa chữ 'E'?",
        options: ["Con Cừu / Con Dê kêu Be be 🐑","Con Chó sủa Gâu gâu 🐶","Con Mèo kêu Meo meo 🐱","Con Gà gáy Ò ó o 🐓"],
        correctAnswer: 0,
        explanation: "Bờ - e - be! Tiếng kêu 'be be' của chú cừu nhỏ chứa nguyên âm E."
      },
      {
        question: "Phương tiện hai bánh bé đạp đi công viên có chữ 'E':",
        options: ["Xe đạp 🚲","Thuyền buồm ⛵","Ca nô 🚤","Xe buýt 🚌"],
        correctAnswer: 0,
        explanation: "Xe đạp (x-e-xe): tiếng 'xe' có nguyên âm E!"
      },
      {
        question: "Loại quả chua thanh mùa hè nấu canh chua rất ngon có chữ 'E':",
        options: ["Quả Me 🥜","Quả Khế ⭐","Quả Sấu 🟢","Quả Chanh 🍋"],
        correctAnswer: 0,
        explanation: "Quả Me (m-e-me): tiếng 'me' bắt đầu bằng m ghép với e!"
      }
    ]
  },
  {
    id: "g1_vtv7_10_letter_ee",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ Ê & Phân biệt E/Ê 🐐 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Ê",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=_r_NziSb7yc&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=10",
      thumbnail: "https://img.youtube.com/vi/_r_NziSb7yc/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ Ê có nón, so sánh chữ E với Ê và nhận biết tiếng bê, dê, ghế, khế.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'Ê' được tạo thành từ chữ 'E' và dấu gì?",
        options: ["Chiếc mũ nón úp 🛖","Chiếc râu móc 🐱","Dấu chấm tròn 🔴","Dấu gạch chéo ❌"],
        correctAnswer: 0,
        explanation: "Chữ Ê chính là chữ E được đội chiếc nón lá úp nhỏ trên đầu!"
      },
      {
        question: "Bạn bò con mới sinh được gọi là gì có chứa chữ 'Ê'?",
        options: ["Chú Bê con 🐂","Chú Nghé con 🐃","Chú Heo con 🐖","Chú Ngựa con 🐎"],
        correctAnswer: 0,
        explanation: "Chú Bê (b-ê-bê): bò con được gọi là con bê, có âm Ê!"
      },
      {
        question: "Đồ vật trong nhà bé ngồi vào bàn học tập mỗi ngày có chữ 'Ê':",
        options: ["Cái Ghế 🪑","Cái Bàn 🪵","Cái Giường 🛏️","Cửa sổ 🪟"],
        correctAnswer: 0,
        explanation: "Cái Ghế (gh-ê-ghê-sắc-ghế): có chữ Ê nâng đỡ bé ngồi học ngoan!"
      }
    ]
  },
  {
    id: "g1_vtv7_11_letter_i",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học chữ I ngắn & Ghép tiếng ⚪ (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter I",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wIYIDuxp044&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=11",
      thumbnail: "https://img.youtube.com/vi/wIYIDuxp044/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện chữ I thường có chấm trên đầu, phân biệt i ngắn và ghép tiếng bi, đi, khỉ, ví.",
    difficulty: 2,
    content: [
      {
        question: "Đặc điểm dễ nhận ra nhất của chữ 'i' viết thường là gì?",
        options: ["Có một chấm tròn nhỏ ở trên đầu 🔴","Có chiếc nón nhọn úp","Có chiếc râu móc bên phải","Là một vòng tròn khép kín"],
        correctAnswer: 0,
        explanation: "Chữ 'i' viết thường có một nét thẳng ngắn và dấu chấm nhỏ xinh ngay phía trên đầu!"
      },
      {
        question: "Trò chơi dân gian với những viên tròn lấp lánh bằng thủy tinh có chữ 'I':",
        options: ["Bắn Bi ⚪","Thả diều 🪁","Ô ăn quan 🪨","Nhảy dây 🪢"],
        correctAnswer: 0,
        explanation: "Viên Bi (b-i-bi): tiếng 'bi' có âm I ngắn tròn xoe lấp lánh!"
      },
      {
        question: "Bạn động vật thông minh leo trèo thoăn thoắt trên cây thích ăn chuối có chữ 'I':",
        options: ["Chú Khỉ 🐒","Chú Voi 🐘","Chú Hươu 🦌","Chú Gấu 🐻"],
        correctAnswer: 0,
        explanation: "Con Khỉ (kh-i-khi-hỏi-khỉ): tiếng 'khỉ' có âm I ngắn tinh nghịch!"
      }
    ]
  },
  {
    id: "g1_vtv7_12_letter_c",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học phụ âm C & Quy tắc chính tả C/K 🐟 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter C & Orthography",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=pRDN0XbGof8&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=12",
      thumbnail: "https://img.youtube.com/vi/pRDN0XbGof8/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm C (cờ), nét cong hở phải và quy tắc chính tả: C đứng trước a, o, ô, ơ, u, ư.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'C' là nét vẽ có đặc điểm gì?",
        options: ["Nét cong hở ở bên phải giống miệng đang cười","Nét cong khép kín tròn xoe","Nét thẳng đứng có hai bụng tròn","Hai nét chéo nhau"],
        correctAnswer: 0,
        explanation: "Chữ C là một nét cong một bên, hở sang phải như khuôn miệng tươi cười!"
      },
      {
        question: "Theo quy tắc chính tả lớp 1, chữ 'C' đứng trước những nguyên âm nào?",
        options: ["Đứng trước a, o, ô, ơ, u, ư (ca, cô, cư)","Chỉ đứng trước e, ê, i","Chỉ đứng trước chữ y dài","Đứng trước tất cả các chữ cái"],
        correctAnswer: 0,
        explanation: "Quy tắc chính tả vàng lớp 1: Chữ C đứng trước a, o, ô, ơ, u, ư. Trước e, ê, i ta phải viết bằng chữ K!"
      },
      {
        question: "Bạn nhỏ tung tăng bơi lội dưới làn nước trong veo bắt đầu bằng chữ 'C':",
        options: ["Con Cá 🐟","Con Mèo 🐱","Con Vịt 🦆","Con Thỏ 🐇"],
        correctAnswer: 0,
        explanation: "Con Cá (c-a-ca-sắc-cá): tiếng 'Cá' bắt đầu bằng phụ âm C!"
      }
    ]
  },
  {
    id: "g1_vtv7_13_letter_b",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học phụ âm B & Ghép dấu thanh ⚽ (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter B & Tones",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=a9kTaQY72MU&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=13",
      thumbnail: "https://img.youtube.com/vi/a9kTaQY72MU/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm B (bờ), phát âm âm môi-môi và luyện ghép tiếng Ba, Bà, Bá, Bả, Bã, Bạ.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'B' in hoa gồm những nét nào cấu tạo nên?",
        options: ["Một nét thẳng đứng và hai nét cong tròn bên phải","Một nét cong khép kín","Hai nét xiên đứng","Một nét thẳng và một nét ngang"],
        correctAnswer: 0,
        explanation: "Chữ B in hoa có nét thẳng đứng cao và hai chiếc bụng cong tròn no căng bên phải."
      },
      {
        question: "Khi ghép âm 'B' với 'A' và thanh hỏi (?), ta được tiếng nào?",
        options: ["Bả","Bá","Bà","Bã"],
        correctAnswer: 0,
        explanation: "Bờ - a - ba - hỏi - Bả! Dấu hỏi uốn lượn đặt ngay trên đầu chữ a."
      },
      {
        question: "Đồ chơi bé rất thích đá trên sân cỏ bắt đầu bằng chữ 'B':",
        options: ["Quả Bóng ⚽","Xe đạp 🚲","Chong chóng 🪁","Con quay 🪀"],
        correctAnswer: 0,
        explanation: "Quả Bóng (b-ong-bong-sắc-bóng): bắt đầu bằng phụ âm B tròn xoe lăn tít!"
      }
    ]
  },
  {
    id: "g1_vtv7_14_letter_d",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học phụ âm D (Dờ) & Tiếng có âm D 🐐 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter D",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=g6gAxkT5FuI&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=14",
      thumbnail: "https://img.youtube.com/vi/g6gAxkT5FuI/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm D (dờ), đặt lưỡi phát âm chuẩn xác và ghép tiếng da, de, do, du, dưa.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'D' in hoa có hình dáng giống hình ảnh nào?",
        options: ["Cánh buồm căng gió lướt sóng ⛵","Quả bóng tròn ⚽","Chiếc nón lá 🛖","Chiếc cầu trượt 🛝"],
        correctAnswer: 0,
        explanation: "Chữ D có nét thẳng đứng và chiếc bụng cong phồng về phía trước tựa cánh buồm no gió!"
      },
      {
        question: "Loại quả ruột đỏ thẫm ngọt mát hạt đen nhánh có chữ 'D':",
        options: ["Dưa hấu 🍉","Quả Ổi 🍐","Quả Chuối 🍌","Quả Bưởi 🍈"],
        correctAnswer: 0,
        explanation: "Dưa hấu (d-ưa-dưa): tiếng 'dưa' bắt đầu bằng phụ âm D mát ngọt ngày hè!"
      },
      {
        question: "Bạn động vật có chòm râu dưới cằm thích ăn lá non bắt đầu bằng chữ 'D':",
        options: ["Con Dê 🐐","Con Ngựa 🐎","Con Hổ 🐯","Con Cừu 🐑"],
        correctAnswer: 0,
        explanation: "Con Dê (d-ê-dê): bắt đầu bằng phụ âm D kêu be be trên sườn đồi!"
      }
    ]
  },
  {
    id: "g1_vtv7_17_letter_dd",
    icon: "🔤",
    title: "VTV7 Lớp 1: Học phụ âm Đ & Phân biệt D/Đ 🏮 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Letter Đ & Contrast D/Đ",
    ageTier: "grade1_2",
    stage: null,
    minAge: 4,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Xs2mbWmhdFM&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=17",
      thumbnail: "https://img.youtube.com/vi/Xs2mbWmhdFM/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Phân biệt chính tả và cách phát âm hai phụ âm D (dờ) và Đ (đờ), tránh lỗi phát âm vùng miền.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'Đ' khác chữ 'D' ở nét vẽ quan trọng nào?",
        options: ["Chữ Đ có thêm nét gạch ngang nhỏ cắt qua thân chữ ➖","Chữ Đ có dấu chấm ở dưới","Chữ Đ có hai bụng cong","Chữ Đ có nét móc tròn"],
        correctAnswer: 0,
        explanation: "Chữ Đ chính là chữ D nhưng được thêm nét gạch ngang nhỏ xinh trên đầu cổ chữ!"
      },
      {
        question: "Món đồ chơi lấp lánh năm cánh rước trong đêm rằm Trung thu có chữ 'Đ':",
        options: ["Đèn ông sao 🏮","Mặt nạ 🎭","Trống cơm 🥁","Cái quạt 🪭"],
        correctAnswer: 0,
        explanation: "Đèn ông sao (đ-en-đen-huyền-đèn): bắt đầu bằng chữ Đ lung linh sắc màu!"
      },
      {
        question: "Từ nào đúng chính tả để điền vào câu: 'Bé ... bộ cùng mẹ ở công viên'?",
        options: ["đi (đ-i-đi)","di (d-i-di)","bi (b-i-bi)","ci (c-i-ci)"],
        correctAnswer: 0,
        explanation: "Đi bộ: viết bằng chữ Đ (đ-i-đi)! Chữ Đ phát âm dứt khoát đầu lưỡi chạm nướu răng."
      }
    ]
  },
  {
    id: "g1_vtv7_31_letter_gh",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép GH & Quy tắc G/GH 🪑 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph GH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=yeTaJ5GgTw8&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=31",
      thumbnail: "https://img.youtube.com/vi/yeTaJ5GgTw8/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nắm vững quy tắc chính tả phụ âm ghép GH: GH chỉ đứng trước e, ê, i (ghế, ghi, ghé).",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'GH' được ghép từ hai con chữ nào?",
        options: ["Chữ G đơn và chữ H","Chữ G đơn và chữ K","Chữ C và chữ H","Chữ N và chữ G"],
        correctAnswer: 0,
        explanation: "Gờ ghép: gồm con chữ 'G' đứng trước và con chữ 'H' đứng sau tạo thành phụ âm GH!"
      },
      {
        question: "Quy tắc chính tả bắt buộc của phụ âm 'GH' trong tiếng Việt là gì?",
        options: ["GH chỉ đứng trước 3 nguyên âm: E, Ê, I","GH đứng trước tất cả các nguyên âm","GH chỉ đứng trước A, O, U","GH không bao giờ đứng đầu tiếng"],
        correctAnswer: 0,
        explanation: "Quy tắc chính tả ghi nhớ suốt đời: GH chỉ đứng trước e, ê, i (ví dụ: ghé, ghế, ghi). Còn lại viết bằng G đơn!"
      },
      {
        question: "Từ nào dưới đây viết đúng chính tả tiếng Việt?",
        options: ["Cái Ghế 🪑","Cái Gế","Ghi nhớ 📝","Ghé thăm 🏡"],
        correctAnswer: 0,
        explanation: "Cái Ghế: vì đứng trước âm Ê nên bắt buộc phải viết bằng GH ghép (gh-ê-ghê-sắc-ghế)!"
      }
    ]
  },
  {
    id: "g1_vtv7_32_letter_ch",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép CH: Chú Chó, Quả Chanh 🐕 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph CH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=pg8cSpM-B-E&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=32",
      thumbnail: "https://img.youtube.com/vi/pg8cSpM-B-E/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm ghép CH, luyện phát âm chuẩn đầu lưỡi nhẹ nhàng và ghép từ chó, chim, chanh, chuối.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'CH' gồm hai chữ cái nào đứng cạnh nhau?",
        options: ["Chữ C đứng trước, chữ H đứng sau","Chữ T đứng trước, chữ H đứng sau","Chữ N đứng trước, chữ H đứng sau","Chữ P đứng trước, chữ H đứng sau"],
        correctAnswer: 0,
        explanation: "Chữ C ghép với chữ H tạo thành phụ âm ghép CH (chờ nhẹ) quen thuộc của tiếng Việt!"
      },
      {
        question: "Bạn cún cưng giữ nhà trung thành có tên gọi bắt đầu bằng 'CH':",
        options: ["Chú Chó 🐕","Chú Mèo 🐱","Chú Chuột 🐁","Chú Gà 🐔"],
        correctAnswer: 0,
        explanation: "Chú Chó (ch-o-cho-sắc-chó): bắt đầu bằng phụ âm ghép CH!"
      },
      {
        question: "Loại quả màu xanh vị chua dịu pha nước giải khát mùa hè bắt đầu bằng 'CH':",
        options: ["Quả Chanh 🍋","Quả Cam 🍊","Quả Chuối 🍌","Quả Mận 🫐"],
        correctAnswer: 0,
        explanation: "Quả Chanh (ch-anh-chanh): thơm lừng mát lành giúp bé khỏe mạnh!"
      }
    ]
  },
  {
    id: "g1_vtv7_33_letter_gi",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép GI: Cơn Gió, Giỏ Cá 💨 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph GI",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ZqvUrLjG81s&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=33",
      thumbnail: "https://img.youtube.com/vi/ZqvUrLjG81s/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Phân biệt âm GI (giê) với D (dờ) và R (rờ), nhận biết hiện tượng giản lược chữ i khi ghép vần.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'GI' được tạo nên từ chữ cái nào?",
        options: ["Chữ G và chữ I","Chữ G và chữ H","Chữ D và chữ I","Chữ C và chữ I"],
        correctAnswer: 0,
        explanation: "Chữ G đứng trước chữ I tạo thành phụ âm ghép GI phát âm là 'Giê'!"
      },
      {
        question: "Hiện tượng thiên nhiên làm mát rượi tán cây bắt đầu bằng 'GI':",
        options: ["Cơn Gió 💨","Cơn Mưa 🌧️","Tia Nắng ☀️","Sấm Sét ⚡"],
        correctAnswer: 0,
        explanation: "Cơn Gió (gi-o-gio-sắc-gió): luồng gió mát lành thổi lá cây rung rinh!"
      },
      {
        question: "Đồ đan bằng mây tre bà đi chợ đựng rau củ quả có chữ 'GI':",
        options: ["Cái Giỏ 🧺","Cái Bát 🥣","Cái Nồi 🍲","Cái Chảo 🍳"],
        correctAnswer: 0,
        explanation: "Cái Giỏ (gi-o-gio-hỏi-giỏ): đan bằng tre nứa xinh xắn bà mang đi chợ sớm!"
      }
    ]
  },
  {
    id: "g1_vtv7_34_letter_kh",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép KH: Chú Khỉ, Khăn Quàng 🐒 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph KH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=c2kAm44gAS8&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=34",
      thumbnail: "https://img.youtube.com/vi/c2kAm44gAS8/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm KH (khờ), phát âm âm cuống họng hơi ma sát nhẹ và làm quen các từ khỉ, khoai, khế.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'KH' được cấu tạo bởi hai chữ cái nào?",
        options: ["Chữ K và chữ H","Chữ C và chữ H","Chữ P và chữ H","Chữ T và chữ H"],
        correctAnswer: 0,
        explanation: "Con chữ K đứng trước chữ H ghép lại thành phụ âm KH (khờ)!"
      },
      {
        question: "Bạn khỉ tinh nghịch đu cành ăn chuối bắt đầu bằng phụ âm ghép nào?",
        options: ["Phụ âm KH 🐒","Phụ âm CH 🐕","Phụ âm NH 🏠","Phụ âm TH 🐇"],
        correctAnswer: 0,
        explanation: "Con Khỉ (kh-i-khi-hỏi-khỉ): bắt đầu bằng phụ âm ghép KH!"
      },
      {
        question: "Chiếc khăn quàng đỏ thắm trên vai học sinh có tiếng 'Khăn' chứa phụ âm gì?",
        options: ["Phụ âm KH 🧣","Phụ âm PH 🏙️","Phụ âm TR ☀️","Phụ âm GH 🪑"],
        correctAnswer: 0,
        explanation: "Khăn quàng (kh-ăn-khăn): bắt đầu bằng phụ âm ghép KH thơm tho!"
      }
    ]
  },
  {
    id: "g1_vtv7_35_letter_ng",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép NG & NGH: Con Ngựa, Nghé Con 🐎 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraphs NG & NGH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=84ff7ouDD7A&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=35",
      thumbnail: "https://img.youtube.com/vi/84ff7ouDD7A/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Phân biệt NG đơn và NGH ghép, quy tắc NGH chỉ đi với e, ê, i (nghé, nghỉ, nghệ).",
    difficulty: 2,
    content: [
      {
        question: "Quy tắc chính tả phân biệt NG đơn và NGH ghép là gì?",
        options: ["NGH chỉ đi với e, ê, i; còn NG đi với các nguyên âm còn lại","NGH chỉ đi với a, o, u","Hai chữ dùng thay thế nhau tùy thích","Không có quy tắc nào"],
        correctAnswer: 0,
        explanation: "Quy tắc lớp 1 chuẩn: NGH (ngờ ghép 3 chữ cái) chỉ đứng trước e, ê, i (con nghé, nghỉ ngơi, củ nghệ)!"
      },
      {
        question: "Bạn động vật dũng mãnh phi nước đại trên thảo nguyên có chữ 'NG':",
        options: ["Con Ngựa 🐎","Con Voi 🐘","Con Sư tử 🦁","Con Hươu 🦌"],
        correctAnswer: 0,
        explanation: "Con Ngựa (ng-ưa-ngưa-nặng-ngựa): tiếng 'ngựa' bắt đầu bằng phụ âm NG đơn!"
      },
      {
        question: "Từ nào dưới đây viết đúng quy tắc chính tả tiếng Việt?",
        options: ["Cả Con Nghé 🐃 và Nghỉ hè 🏖️ đều đúng (dùng NGH)","Con Ngé","Nghỉ hè 🏖️","Con Nghé 🐃"],
        correctAnswer: 0,
        explanation: "Vì đứng trước nguyên âm 'e' và 'i' nên cả 'Nghé' và 'Nghỉ' đều bắt buộc phải viết bằng NGH ghép!"
      }
    ]
  },
  {
    id: "g1_vtv7_37_letter_ph",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép PH: Phố Phường, Bát Phở 🍜 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph PH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=KWElEhpaAZ0&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=37",
      thumbnail: "https://img.youtube.com/vi/KWElEhpaAZ0/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm PH (phờ), phát âm âm răng-môi chuẩn xác và làm quen từ vựng phở, phố, pháo, phim.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'PH' được ghép từ hai con chữ nào?",
        options: ["Chữ P và chữ H","Chữ B và chữ H","Chữ T và chữ H","Chữ C và chữ H"],
        correctAnswer: 0,
        explanation: "Chữ P ghép với chữ H tạo thành phụ âm ghép PH (phờ)!"
      },
      {
        question: "Món ăn truyền thống thơm lừng nổi tiếng của Việt Nam bắt đầu bằng 'PH':",
        options: ["Bát Phở 🍜","Bánh Mì 🥖","Bánh Chưng 🫔","Bún Riêu 🍲"],
        correctAnswer: 0,
        explanation: "Bát Phở (ph-ơ-phơ-hỏi-phở): món ăn quốc hồn quốc túy mở đầu bằng phụ âm PH!"
      },
      {
        question: "Nơi đường xá tấp nập xe cộ nhà cửa san sát ở thành phố được gọi là gì?",
        options: ["Phố Phường 🏙️","Làng quê 🌾","Cánh đồng 🌱","Khu rừng 🌲"],
        correctAnswer: 0,
        explanation: "Phố Phường: cả hai tiếng 'Phố' và 'Phường' đều bắt đầu bằng chữ PH nhộn nhịp!"
      }
    ]
  },
  {
    id: "g1_vtv7_38_letter_tr",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép TR & Phân biệt TR/CH ☀️ (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph TR & Contrast TR/CH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5F8ZX9rFfXw&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=38",
      thumbnail: "https://img.youtube.com/vi/5F8ZX9rFfXw/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Luyện phát âm uốn đầu lưỡi âm TR (trờ nặng) phân biệt với CH (chờ nhẹ), rèn chính tả không nhầm lẫn.",
    difficulty: 2,
    content: [
      {
        question: "Khẩu hình khi phát âm âm 'TR' (trờ nặng) khác 'CH' (chờ nhẹ) như thế nào?",
        options: ["Âm TR uốn cong đầu lưỡi lên vòm họng trên, âm CH lưỡi để thẳng nhẹ","Âm TR mím môi, âm CH mở to miệng","Hai âm phát âm y hệt nhau","Âm TR thè lưỡi ra ngoài"],
        correctAnswer: 0,
        explanation: "Khi phát âm TR, đầu lưỡi uốn cong lên chạm ngạc cứng tạo âm nổ bật hơi mạnh mẽ!"
      },
      {
        question: "Vầng sáng khổng lồ chiếu rọi ban ngày đem ánh nắng ấm áp bắt đầu bằng 'TR':",
        options: ["Mặt Trời ☀️","Mặt Trăng 🌙","Ngôi Sao ⭐","Đám Mây ☁️"],
        correctAnswer: 0,
        explanation: "Mặt Trời (tr-ơi-trơi-huyền-trời): bắt đầu bằng phụ âm ghép TR rực rỡ!"
      },
      {
        question: "Cây thân đốt dẻo dai xanh mướt gắn liền với làng quê Việt Nam có chữ 'TR':",
        options: ["Cây Tre 🎋","Cây Bàng 🌳","Cây Đa 🌿","Cây Dừa 🌴"],
        correctAnswer: 0,
        explanation: "Cây Tre (tr-e-tre): bắt đầu bằng phụ âm ghép TR biểu tượng kiên cường của làng quê Việt Nam!"
      }
    ]
  },
  {
    id: "g1_vtv7_39_letter_nh",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép NH: Ngôi Nhà, Chùm Nho 🏠 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph NH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=xt4lQb-pW5Q&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=39",
      thumbnail: "https://img.youtube.com/vi/xt4lQb-pW5Q/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm NH (nhờ), phát âm âm mũi-ngạc mềm và tìm từ vựng nhà, nho, nhím, nhạn.",
    difficulty: 2,
    content: [
      {
        question: "Chữ 'NH' gồm hai con chữ nào ghép lại?",
        options: ["Chữ N và chữ H","Chữ M và chữ H","Chữ L và chữ H","Chữ N và chữ G"],
        correctAnswer: 0,
        explanation: "Con chữ N ghép với con chữ H tạo thành phụ âm ghép NH (nhờ) dịu dàng."
      },
      {
        question: "Tổ ấm thân yêu nơi cả gia đình bé cùng sinh sống quây quần có chữ 'NH':",
        options: ["Ngôi Nhà 🏠","Lớp học 🏫","Bệnh viện 🏥","Công viên 🏞️"],
        correctAnswer: 0,
        explanation: "Ngôi Nhà (nh-a-nha-huyền-nhà): tiếng 'nhà' mở đầu bằng phụ âm ghép NH ấm cúng!"
      },
      {
        question: "Chùm quả mọng nước tròn tròn màu tím ngọt mát bé thích ăn có chữ 'NH':",
        options: ["Quả Nho 🍇","Quả Táo 🍎","Quả Dưa 🍉","Quả Cam 🍊"],
        correctAnswer: 0,
        explanation: "Quả Nho (nh-o-nho): tiếng 'nho' bắt đầu bằng phụ âm ghép NH ngọt lịm!"
      }
    ]
  },
  {
    id: "g1_vtv7_40_letter_th",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép TH: Thước Kẻ, Con Thỏ 🐇 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph TH",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lmT85DwjSV8&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=40",
      thumbnail: "https://img.youtube.com/vi/lmT85DwjSV8/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm TH (thờ), bật hơi mạnh qua kẽ răng và làm quen từ vựng thỏ, thước, thuyền, thìa.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'TH' gồm chữ cái nào kết hợp với nhau?",
        options: ["Chữ T và chữ H","Chữ C và chữ H","Chữ K và chữ H","Chữ P và chữ H"],
        correctAnswer: 0,
        explanation: "Chữ T đứng trước chữ H ghép lại thành phụ âm ghép TH (thờ) bật hơi!"
      },
      {
        question: "Bạn nhỏ tai dài lông trắng mắt đỏ thích ăn củ cà rốt có chữ 'TH':",
        options: ["Con Thỏ 🐇","Con Sóc 🐿️","Con Chuột 🐁","Con Mèo 🐱"],
        correctAnswer: 0,
        explanation: "Con Thỏ (th-o-tho-hỏi-thỏ): bắt đầu bằng phụ âm ghép TH đáng yêu!"
      },
      {
        question: "Dụng cụ học tập thẳng tắp giúp bé kẻ đường thẳng ngay ngắn có chữ 'TH':",
        options: ["Cây Thước kẻ 📏","Cây Bút chì ✏️","Cục Tẩy 🧼","Hộp Bút 👝"],
        correctAnswer: 0,
        explanation: "Thước kẻ (th-ươc-thươc-sắc-thước): bắt đầu bằng phụ âm ghép TH ngay ngắn!"
      }
    ]
  },
  {
    id: "g1_vtv7_41_letter_qu",
    icon: "🔤",
    title: "VTV7 Lớp 1: Phụ âm ghép QU: Quả Quýt, Cái Quạt 🍊 (ABC Vui từng giờ)",
    titleEn: "Grade 1 VTV7: Digraph QU",
    ageTier: "grade1_2",
    stage: null,
    minAge: 6,
    subject: "vietnamese",
    type: "video_quiz",
    mediaSource: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=td_bP6TBJnw&list=PL8bUH3S0Jon487GmOHnzpOlfQUumC9SIL&index=41",
      thumbnail: "https://img.youtube.com/vi/td_bP6TBJnw/hqdefault.jpg"
    },
    learningObjective: "CT GDPT 2018 Tiếng Việt 1: Nhận diện phụ âm QU (quờ), phát âm tròn môi và ghép các tiếng qua, quả, quýt, quạt, quê hương.",
    difficulty: 2,
    content: [
      {
        question: "Phụ âm ghép 'QU' được ghép từ hai con chữ nào?",
        options: ["Chữ Q và chữ U","Chữ Q và chữ O","Chữ C và chữ U","Chữ K và chữ U"],
        correctAnswer: 0,
        explanation: "Chữ Q luôn luôn đi liền với chữ U để tạo thành phụ âm ghép QU (quờ) tròn môi!"
      },
      {
        question: "Loại quả tép vàng mọng nước vị ngọt thơm nhiều vitamin C có chữ 'QU':",
        options: ["Quả Quýt 🍊","Quả Táo 🍎","Quả Chuối 🍌","Quả Lê 🍐"],
        correctAnswer: 0,
        explanation: "Quả Quýt: cả hai tiếng 'Quả' và 'Quýt' đều bắt đầu bằng phụ âm ghép QU!"
      },
      {
        question: "Đồ vật tạo ra làn gió mát lành khi hè về bắt đầu bằng chữ 'QU':",
        options: ["Cái Quạt 🪭","Cái Gối 🛌","Cái Chăn 🛏️","Cái Đèn 💡"],
        correctAnswer: 0,
        explanation: "Cái Quạt (qu-at-quat-nặng-quạt): mang làn gió mát lành đến cho giấc ngủ ngon của bé!"
      }
    ]
  }

,

  // ========================================================
  // STAGE 2: GHÉP VẦN CƠ BẢN (b-a-ba, m-e-me, DẤU HUYỀN / SẮC)
  // ========================================================
  {
    id: "act_s2_spell_ba_ba",
    icon: "🔤",
    title: "Ghép vần cơ bản: Ghép âm b - a - ba 👵",
    titleEn: "Basic Phonics: Blend b - a - ba",
    icon: "🔤",
    ageTier: "preschool",
    stage: null,
    minAge: 5,
    subject: "vietnamese",
    skill: "vi.blend.ba",
    skills: ["vi.blend.ba"],
    type: "image_quiz",
    difficulty: 1,
    mediaSource: {
      type: "image_set",
      url: "img/phonics_ba.png",
      thumbnail: "img/phonics_ba_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Ghép phụ âm đầu b với nguyên âm a và thanh điệu để tạo tiếng ba, bà, bé.",
    content: [
      {
        question: "Khi ghép âm b đứng trước và âm a đứng sau, ta đọc thành tiếng gì? 🔤",
        options: [
          "b - a - ba 👵",
          "b - o - bo 🐮",
          "b - e - be 🐑"
        ],
        correctAnswer: 0,
        explanation: "Âm b ghép với âm a đọc là: b - a - ba!"
      },
      {
        question: "Tiếng ba thêm dấu huyền trên đầu chữ a đọc là gì? 👵",
        options: [
          "ba - huyền - bà 👵",
          "ba - sắc - bá 👧",
          "ba - hỏi - bả 🥣"
        ],
        correctAnswer: 0,
        explanation: "Tiếng ba thêm dấu huyền thành bà - người bà kính yêu của bé!"
      },
      {
        question: "Chọn từ đúng điền vào câu: Bé khoanh tay chào ___ ? 👨",
        options: [
          "ba 👨",
          "cá 🐟",
          "gà 🐔"
        ],
        correctAnswer: 0,
        explanation: "Câu hoàn chỉnh: Bé khoanh tay chào ba!"
      }
    ],
    reward: { stars: 3 }
  },
  {
    id: "act_s2_spell_me_me",
    icon: "🔤",
    title: "Ghép vần cơ bản: Ghép âm m - e - me 👩‍👧",
    titleEn: "Basic Phonics: Blend m - e - me",
    icon: "🔤",
    ageTier: "preschool",
    stage: null,
    minAge: 5,
    subject: "vietnamese",
    skill: "vi.blend.me",
    skills: ["vi.blend.me"],
    type: "image_quiz",
    difficulty: 1,
    mediaSource: {
      type: "image_set",
      url: "img/phonics_me.png",
      thumbnail: "img/phonics_me_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Ghép phụ âm m với nguyên âm e và thanh nặng để tạo tiếng mẹ thân thương.",
    content: [
      {
        question: "Khi ghép âm m đứng trước và âm e đứng sau, ta đọc được tiếng nào? 👩‍👧",
        options: [
          "m - e - me 👩‍👧",
          "m - a - ma 👻",
          "m - o - mo 🥣"
        ],
        correctAnswer: 0,
        explanation: "Âm m ghép với âm e đọc là: m - e - me!"
      },
      {
        question: "Tiếng me thêm dấu nặng ở dưới chữ e đọc là gì? ❤️",
        options: [
          "me - nặng - mẹ 👩‍👧❤️",
          "me - sắc - mé 🌊",
          "me - huyền - mè 🌾"
        ],
        correctAnswer: 0,
        explanation: "Tiếng me thêm thanh nặng thành mẹ - mẹ yêu quý của chúng mình!"
      },
      {
        question: "Chọn từ đúng để hoàn thành câu: Bé ngoan yêu thương ___ và ba 👩‍👧",
        options: [
          "mẹ 👩‍👧❤️",
          "me 🌳",
          "mè 🌾"
        ],
        correctAnswer: 0,
        explanation: "Chính xác: Bé ngoan yêu thương mẹ và ba!"
      }
    ],
    reward: { stars: 3 }
  },
  {
    id: "act_s2_tones_huyen_sac",
    icon: "📖",
    title: "Nhận biết dấu thanh: Dấu huyền và Dấu sắc ✍️✨",
    titleEn: "Vietnamese Tones: Grave and Acute Accents",
    icon: "📖",
    ageTier: "preschool",
    stage: null,
    minAge: 5,
    subject: "vietnamese",
    skill: "vi.tones.huyen_sac",
    skills: ["vi.tones.huyen_sac"],
    type: "image_quiz",
    difficulty: 1,
    mediaSource: {
      type: "image_set",
      url: "img/tones_thumb.png",
      thumbnail: "img/tones_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học: Nhận diện hình dáng và phát âm đúng thanh huyền (dốc xuống) và thanh sắc (dốc lên).",
    content: [
      {
        question: "Dấu huyền ( \\ ) có hình dáng giống như vật gì nào bé nhỉ? 🎢",
        options: [
          "Nét xiên từ trái xuống phải ( \\ ) giống chiếc cầu trượt đi xuống 🎢",
          "Nét xiên từ dưới lên phải ( / ) như tên lửa 🚀",
          "Dấu chấm tròn nhỏ dưới chân chữ ( . ) 💧"
        ],
        correctAnswer: 0,
        explanation: "Dấu huyền là nét xiên từ trái sang phải, đọc giọng trầm xuống: bà, cà, bò!"
      },
      {
        question: "Dấu sắc ( / ) có hình dáng giống như chuyển động nào? 🚀",
        options: [
          "Nét xiên từ dưới vút lên bên phải ( / ) như chiếc tên lửa bay lên 🚀",
          "Nét nằm ngang phẳng lặng ( - ) ➖",
          "Chiếc nón úp ngược ( ^ ) 🧢"
        ],
        correctAnswer: 0,
        explanation: "Dấu sắc là nét xiên vút lên trên bên phải, đọc giọng cao vút: cá, bé, lá!"
      },
      {
        question: "Trong hai từ cá 🐟 và cà 🍆, từ nào mang dấu sắc ( / )?",
        options: [
          "Từ cá mang dấu sắc 🐟",
          "Từ cà mang dấu sắc 🍆",
          "Cả hai từ đều không có dấu sắc ❌"
        ],
        correctAnswer: 0,
        explanation: "Từ cá mang dấu sắc: c - a - ca - sắc - cá! 🐟"
      }
    ],
    reward: { stars: 3 }
  },
  // ========================================================
  // STAGE 3: TOÁN TƯ DUY - QUY LUẬT MÀU SẮC
  // ========================================================
  {
    id: "act_s3_color_pattern",
    icon: "🎨",
    title: "Toán tư duy: Quy luật màu sắc 🔴🔵🔴🔵 [?] 🎨",
    titleEn: "Logic Math: Color Pattern",
    icon: "🎨",
    ageTier: "preschool",
    stage: null,
    minAge: 5,
    subject: "math",
    skill: "math.pattern.color",
    skills: ["math.pattern.color"],
    type: "image_quiz",
    difficulty: 1,
    mediaSource: {
      type: "image_set",
      url: "img/pattern_color.png",
      thumbnail: "img/pattern_color_thumb.png"
    },
    learningObjective: "Chuẩn Tiền tiểu học môn Toán: Phát hiện quy luật lặp lại của chuỗi màu sắc và dự đoán phần tử kế tiếp.",
    content: [
      {
        question: "Bé quan sát chuỗi hạt màu: Đỏ 🔴, Xanh 🔵, Đỏ 🔴, Xanh 🔵, Đỏ 🔴, ... Hạt tiếp theo màu gì? 🎨",
        options: [
          "Hạt màu Xanh 🔵",
          "Hạt màu Đỏ 🔴",
          "Hạt màu Vàng 🟡"
        ],
        correctAnswer: 0,
        explanation: "Quy luật lặp lại xen kẽ: Đỏ rồi đến Xanh, nên sau hạt Đỏ chắc chắn là hạt Xanh! 🔵"
      },
      {
        question: "Đoàn tàu màu sắc: Vàng 🟡, Vàng 🟡, Đỏ 🔴, Vàng 🟡, Vàng 🟡, [?]. Toa tiếp theo màu gì?",
        options: [
          "Toa màu Đỏ 🔴",
          "Toa màu Vàng 🟡",
          "Toa màu Tím 🟣"
        ],
        correctAnswer: 0,
        explanation: "Quy luật: Cứ 2 toa Vàng thì đến 1 toa Đỏ. Sau 2 toa Vàng tiếp theo sẽ là toa Đỏ! 🔴"
      },
      {
        question: "Dãy hình: Hình tròn đỏ 🔴, Hình vuông xanh 🟦, Hình tròn đỏ 🔴, Hình vuông xanh 🟦, [?]. Hình tiếp theo là gì?",
        options: [
          "Hình tròn đỏ 🔴",
          "Hình vuông xanh 🟦",
          "Hình tam giác vàng 🔺"
        ],
        correctAnswer: 0,
        explanation: "Quy luật lặp lại cặp (Tròn đỏ - Vuông xanh), sau Vuông xanh sẽ quay lại Tròn đỏ! 🔴"
      }
    ],
    reward: { stars: 3 }
  },
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
    stage: {
      type: ["integer", "null"],
      enum: [0, 1, 2, 3, 4, 5, null],
      description: "Chặng học từ 0 đến 5 cho lộ trình làm quen và chuẩn bị vào lớp 1 (4–6 tuổi) theo PLAN.md. Giá trị null dành cho bài nâng cao lớp 3–5."
    },
    minAge: {
      type: "integer",
      minimum: 3,
      maximum: 12,
      description: "Độ tuổi tối thiểu đề xuất cho hoạt động"
    },
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
  if (act.stage !== undefined && act.stage !== null) {
    if (!Number.isInteger(act.stage) || act.stage < 0 || act.stage > 5) {
      errors.push("Invalid 'stage' (must be integer 0-5 or null)");
    }
  }
  if (act.skills !== undefined && act.skills !== null) {
    if (!Array.isArray(act.skills) && typeof act.skills !== "string") {
      errors.push("Invalid 'skills' (must be array or string)");
    }
  }
  if (act.minAge !== undefined && act.minAge !== null) {
    if (!Number.isInteger(act.minAge) || act.minAge < 3 || act.minAge > 12) {
      errors.push("Invalid 'minAge' (must be integer 3-12)");
    }
  }
  if (!["vietnamese", "math", "english", "science", "skills", "reading", "logic"].includes(act.subject)) errors.push("Invalid 'subject'");
  if (!act.mediaSource || typeof act.mediaSource !== "object") {
    if ((act.videoUrl && typeof act.videoUrl === "string") || (act.content && act.content.media)) {
      // videoUrl or content.media provided directly
    } else {
      errors.push("Missing 'mediaSource'");
    }
  } else {
    if (!["youtube", "local_mp4", "image_set"].includes(act.mediaSource.type)) errors.push("Invalid 'mediaSource.type'");
    if (typeof act.mediaSource.url !== "string") errors.push("Invalid 'mediaSource.url'");
    if (typeof act.mediaSource.thumbnail !== "string") errors.push("Invalid 'mediaSource.thumbnail'");
  }
  if (!act.learningObjective && !act.skill && !act.learningGoal) errors.push("Missing 'learningObjective'");
  if (act.difficulty !== undefined && (typeof act.difficulty !== "number" || act.difficulty < 1 || act.difficulty > 5)) {
    errors.push("Invalid 'difficulty' (must be 1-5)");
  }
  if (Array.isArray(act.content)) {
    if (act.content.length === 0) errors.push("'content' array cannot be empty");
    act.content.forEach((item, idx) => {
      if (!item.question || typeof item.question !== "string") errors.push(`Item ${idx}: missing 'question'`);
      if (!Array.isArray(item.options) || item.options.length < 2) errors.push(`Item ${idx}: 'options' must have at least 2 items`);
      if (item.correctAnswer === undefined) errors.push(`Item ${idx}: missing 'correctAnswer'`);
      if (!item.explanation || typeof item.explanation !== "string") errors.push(`Item ${idx}: missing 'explanation'`);
    });
  } else if (Array.isArray(act.activities)) {
    if (act.activities.length === 0) errors.push("'activities' array cannot be empty");
    act.activities.forEach((item, idx) => {
      if (!item.question || typeof item.question !== "string") errors.push(`Activity ${idx}: missing 'question'`);
      if (!Array.isArray(item.options) || item.options.length < 2) errors.push(`Activity ${idx}: 'options' must have at least 2 items`);
      if (item.correctAnswer === undefined) errors.push(`Activity ${idx}: missing 'correctAnswer'`);
    });
  } else if (Array.isArray(act.exercises)) {
    if (act.exercises.length === 0) errors.push("'exercises' array cannot be empty");
    act.exercises.forEach((item, idx) => {
      if (!item.question || typeof item.question !== "string") errors.push(`Exercise ${idx}: missing 'question'`);
      if (!Array.isArray(item.options) || item.options.length < 2) errors.push(`Exercise ${idx}: 'options' must have at least 2 items`);
      if (item.correctAnswer === undefined) errors.push(`Exercise ${idx}: missing 'correctAnswer'`);
    });
  } else if (act.content && typeof act.content === "object") {
    if (act.type === "drag_drop") {
      if (!Array.isArray(act.content.tokens) || act.content.tokens.length < 2) errors.push("drag_drop: 'tokens' must have at least 2 items");
      if (!Array.isArray(act.content.correctSequence)) errors.push("drag_drop: missing 'correctSequence'");
    } else if (!act.content.question && !act.content.storyText) {
      errors.push("Missing question or storyText in content object");
    }
  } else {
    errors.push("Invalid 'content': must be an array, activities/exercises array, or content object");
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

// Helper lấy danh sách bài học theo chặng (0-5)
function getActivitiesByStage(stage) {
  return ACTIVITIES_DATA.filter(a => a.stage === stage);
}

// Helper lấy tất cả bài học thuộc lộ trình Chuẩn bị vào Lớp 1 (5–6 tuổi)

// Helper lấy danh sách bài học kỹ năng sống sẵn sàng đến trường (life_skills)
// Đảm bảo trường skills đồng bộ với schema cho mọi activity
ACTIVITIES_DATA.forEach(act => {
  if (!act.skills) {
    if (act.skill) {
      act.skills = [act.skill];
    } else if (act.id.startsWith("g1_vtv7_")) {
      act.skills = ["vi.letters.alphabet"];
    } else if (act.id.startsWith("g1_lananh_")) {
      act.skills = ["vi.phonics.lananh"];
    } else if (act.id.startsWith("act_vq_pre_")) {
      act.skills = ["life.observation"];
    } else if (act.id.startsWith("act_vq_g12_")) {
      act.skills = ["vi.phonics.blend"];
    } else if (act.id.startsWith("act_vq_g35_")) {
      act.skills = ["sci.space.discovery"];
    } else if (act.id.startsWith("act_g3_math_")) {
      act.skills = ["math.operations.advanced"];
    } else if (act.id.startsWith("act_g35_sci_")) {
      act.skills = ["sci.biology.lifecycle"];
    } else {
      act.skills = [act.subject || "general"];
    }
  }
});

function getLifeSkillsActivities() {
  return ACTIVITIES_DATA.filter(a => a.stage === 5 || (a.skill && a.skill.startsWith("life.")));
}

function getPreschoolJourneyActivities() {
  return ACTIVITIES_DATA.filter(a => a.stage !== undefined && a.stage !== null);
}

if (typeof window !== "undefined") {
  window.AGE_TIERS = AGE_TIERS;
  window.ACTIVITIES_DATA = ACTIVITIES_DATA;
  window.ACTIVITY_SCHEMA = ACTIVITY_SCHEMA;
  window.validateActivity = validateActivity;
  window.getActivitiesByTier = getActivitiesByTier;
  window.getActivityById = getActivityById;
  window.getActivitiesBySubject = getActivitiesBySubject;
  window.getActivitiesByStage = getActivitiesByStage;
  window.getPreschoolJourneyActivities = getPreschoolJourneyActivities;
  window.getLifeSkillsActivities = getLifeSkillsActivities;
  window.LIFE_SKILLS = getLifeSkillsActivities();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    default: ACTIVITIES_DATA,
    AGE_TIERS,
    ACTIVITIES_DATA,
    ACTIVITY_SCHEMA,
    validateActivity,
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
