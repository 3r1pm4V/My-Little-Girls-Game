# BẢN ĐỒ PHÂN BỔ HOẠT ĐỘNG THEO LỘ TRÌNH 6 CHẶNG (STAGE MAP)
## Task P1-00 — Báo cáo Phân tích Lộ trình "Chuẩn bị vào Lớp 1" (5–6 tuổi)
*Tài liệu tham chiếu: PLAN.md (Mục 4 & 5.1), AGENTS.md, activities-data.js*

---

## 1. BẢNG PHÂN BỔ 77 BÀI HỌC TRONG `ACTIVITIES-DATA.JS`

> **Quy ước mức độ phù hợp cho bé 5–6 tuổi**:
> - **Phù hợp (🟢)**: Trọng tâm của lứa tuổi 5–6 tuổi, bé tiếp thu tự nhiên, hình ảnh sinh động, câu hỏi ngắn.
> - **Hơi khó (🟡)**: Kiến thức đầu lớp 1 hoặc mở rộng, cần sự đồng hành/gợi ý của bố mẹ hoặc sau khi đã vững chặng trước.
> - **Quá khó (🔴)**: Kiến thức Lớp 2–5 (nhân chia, phân số, thành ngữ, văn bản dài, vũ trụ sâu), cần ẩn khỏi bé 5–6 tuổi.

### Danh sách 77 bài học:

| # | ID bài học | Tiêu đề bài học | Môn | ageTier | Đề xuất Stage | Kỹ năng đề xuất (`skill id`) | Mức phù hợp 4–6 tuổi |
|---|---|---|---|---|:---:|---|:---:|
| 1 | `act_pre_let_01` | Chữ cái đầu tiên: Quả Táo 🍎 | VN | preschool | **1** | `vi.phonics.initial-sound` | 🟢 Phù hợp (giữ lại) |
| 2 | `act_pre_let_02` | Điền chữ còn thiếu: C_N MÈO 🐱 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.vowels` | 🔴 Dời qua Lớp 1 (ghép từ) |
| 3 | `act_pre_let_03` | Ghép chữ in hoa và chữ thường 🔤 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.vowels` | 🔴 Dời qua Lớp 1 (hoa/thường) |
| 4 | `act_pre_num_01` | Bé tìm chữ số 4 ⛵ | Math | preschool | **1** | `math.count.1-5` | 🟢 Phù hợp (giữ lại) |
| 5 | `act_pre_num_02` | Sắp xếp số từ bé đến lớn: 1, 2, 3 🔢 | Math | preschool | **1** | `math.order.numbers` | 🟢 Phù hợp (giữ lại) |
| 6 | `act_pre_num_03` | Nối số với số lượng quả táo 🍎 | Math | preschool | **1** | `math.count.1-10` | 🟢 Phù hợp (giữ lại) |
| 7 | `act_pre_eng_01` | Colors: Màu sắc mặt trời ☀️ | EN | preschool | **1** | `en.intro.colors` | 🟢 Phù hợp (giữ lại) |
| 8 | `act_pre_eng_02` | Animals: Ghép con vật tiếng Anh 🐶🐱 | EN | preschool | **1** | `en.intro.colors` | 🟢 Phù hợp (giữ lại) |
| 9 | `act_pre_read_01` | Đọc hiểu: Chú Thỏ Trắng ngoan ngoãn 🐰 | Reading | preschool | **4** | `vi.listen.story` | 🟢 Phù hợp (giữ lại) |
| 10 | `act_g12_vn_01` | Điền vần đúng: Quả B___ng bay 🎈 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.blend.simple` | 🔴 Dời qua Lớp 1 (vần ong) |
| 11 | `act_g12_vn_02` | Sắp xếp từ thành câu: Bé yêu gia đình 👨‍👩‍👧 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.read.sentence-short` | 🔴 Dời qua Lớp 1 (câu) |
| 12 | `act_g12_vn_03` | Chính tả C hay K: Con ___ua và con ___iến 🦀🐜 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (chính tả c/k) |
| 13 | `act_g12_math_01` | Phép cộng có nhớ: 8 + 7 = ? 🧮 | Math | grade1_2 | Sau Lớp 1 (null) | `math.addsub.beyond10` | 🔴 Quá khó (Lớp 1-2) |
| 14 | `act_g12_math_02` | Dãy số cách đều 5: 5, 10, 15, ___ 🚀 | Math | grade1_2 | Sau Lớp 1 (null) | `math.pattern.repeat` | 🔴 Quá khó (Lớp 1-2) |
| 15 | `act_g12_math_03` | Ghép phép tính có cùng kết quả = 10 🎯 | Math | grade1_2 | Sau Lớp 1 (null) | `math.addsub.within10` | 🔴 Dời qua Lớp 1 (phép tính) |
| 16 | `act_g12_eng_01` | School Things: Đồ dùng học tập 🖊️📖 | EN | grade1_2 | Sau Lớp 1 (null) | `en.intro.abc` | 🔴 Dời qua Lớp 1 (đồ dùng) |
| 17 | `act_g12_eng_02` | Missing letter: B_OK (Quyển sách) 📖 | EN | grade1_2 | Sau Lớp 1 (null) | `en.intro.abc` | 🔴 Dời qua Lớp 1 (điền chữ) |
| 18 | `act_g12_read_01` | Đọc hiểu: Chuyện Rùa và Thỏ chạy thi 🐢🐇 | Reading | grade1_2 | **4** | `vi.listen.story` | 🟢 Phù hợp (giữ lại) |
| 19 | `act_g35_vn_01` | Tìm từ đồng nghĩa với 'Chăm chỉ' 🐝 | VN | grade3_5 | Sau Lớp 1 | `vi.vocab.advanced` | 🔴 Quá khó |
| 20 | `act_g35_vn_02` | Ghép thành ngữ: Học thầy không tày... 📜 | VN | grade3_5 | Sau Lớp 1 | `vi.idiom.advanced` | 🔴 Quá khó |
| 21 | `act_g35_vn_03` | Cặp từ trái nghĩa trong tiếng Việt ⚖️ | VN | grade3_5 | Sau Lớp 1 | `vi.vocab.advanced` | 🔴 Quá khó |
| 22 | `act_g35_math_01` | Bảng nhân 8: 8 × 7 = ? 📐 | Math | grade3_5 | Sau Lớp 1 | `math.multiply.basic` | 🔴 Quá khó |
| 23 | `act_g35_math_02` | Phân số cơ bản: Một nửa chiếc bánh pizza 🍕 | Math | grade3_5 | Sau Lớp 1 | `math.fraction.basic` | 🔴 Quá khó |
| 24 | `act_g35_math_03` | Phép chia có dư: 26 chia cho 4 🍬 | Math | grade3_5 | Sau Lớp 1 | `math.division.basic` | 🔴 Quá khó |
| 25 | `act_g35_eng_01` | Daily English: What time is it? ⏰ | EN | grade3_5 | Sau Lớp 1 | `en.time.advanced` | 🔴 Quá khó |
| 26 | `act_g35_eng_02` | English Opposites: Cặp từ đối lập ❄️🔥 | EN | grade3_5 | Sau Lớp 1 | `en.vocab.advanced` | 🔴 Quá khó |
| 27 | `act_g35_read_01` | Đọc hiểu: Truyền thuyết Hồ Gươm 🏛️🐢 | Reading | grade3_5 | Sau Lớp 1 | `vi.read.passage` | 🔴 Quá khó |
| 28 | `act_vq_pre_01_pets` | Bé làm quen thú cưng đáng yêu trong nhà 🐶🐱🐹 | Skills | preschool | **0** | `life.emotions` | 🟢 Phù hợp |
| 29 | `act_vq_pre_02_wildlife` | Những người bạn khổng lồ nơi rừng xanh 🐘🦒🦁 | Science | preschool | **0** | `vi.phonics.initial-sound` | 🟢 Phù hợp |
| 30 | `act_vq_pre_03_ocean` | Chuyến du hành dưới đáy đại dương bao la 🐬🐢🐙 | Science | preschool | **0** | `vi.phonics.initial-sound` | 🟢 Phù hợp |
| 31 | `act_vq_g12_01_spell_b` | Tập đánh vần cùng cô Lan Anh: Âm B và Dấu Thanh 🔤👩‍🏫 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.tones.six` | 🔴 Dời qua Lớp 1 (đánh vần) |
| 32 | `act_vq_g12_02_spell_c` | Học vần cùng cô Lan Anh: Âm C và Tiếng Có Nghĩa 🐟🦀 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.blend.simple` | 🔴 Dời qua Lớp 1 (đánh vần) |
| 33 | `act_vq_g12_03_spell_d_dd` | Phân biệt D và Đ cùng cô Lan Anh: Con Dê và Đàn Gà 🐐🐔 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (đánh vần) |
| 34 | `act_vq_g12_04_spell_ai_ay` | Bí quyết ghép vần đôi 'AI' và 'AY' cùng cô Lan Anh 🌾👋 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.blend.simple` | 🔴 Dời qua Lớp 1 (vần đôi) |
| 35 | `act_vq_g35_01_solar_system` | Hành trình kỳ vĩ khám phá Hệ Mặt Trời 🪐🚀 | Science | grade3_5 | Sau Lớp 1 | `sci.space.planets` | 🔴 Quá khó |
| 36 | `act_vq_g35_02_earth_moon` | Trái Đất và Mặt Trăng: Điệu vũ ngày và đêm 🌍🌙 | Science | grade3_5 | Sau Lớp 1 | `sci.earth.moon` | 🔴 Quá khó |
| 37 | `act_vq_g35_03_space_travel` | Chinh phục không gian: Bước chân con người lên Mặt Trăng 👨‍🚀🚀 | Science | grade3_5 | Sau Lớp 1 | `sci.space.travel` | 🔴 Quá khó |
| 38 | `act_g3_math_01_supermarket` | Siêu thị toán học: Tính tiền giỏ hàng 🛒🧺 | Math | grade3_5 | Sau Lớp 1 | `math.multiply.wordproblem` | 🔴 Quá khó |
| 39 | `act_g3_math_02_mooncakes` | Chia bánh trung thu rằm tháng Tám 🥮🏮 | Math | grade3_5 | Sau Lớp 1 | `math.division.concept` | 🔴 Quá khó |
| 40 | `act_g3_math_03_number_pattern` | Thám tử số học: Mật mã cấp số nhân 🔍🔢 | Math | grade3_5 | Sau Lớp 1 | `math.pattern.advanced` | 🔴 Quá khó |
| 41 | `act_g3_math_04_apple_harvest` | Nông trại vui vẻ: Thu hoạch táo chín 🍏🧺 | Math | grade3_5 | Sau Lớp 1 | `math.division.wordproblem` | 🔴 Quá khó |
| 42 | `act_g3_math_05_multiplication_duel` | Đấu trường toán nhí: Bắn bóng cửu chương 🎯⚡ | Math | grade3_5 | Sau Lớp 1 | `math.multiply.tables` | 🔴 Quá khó |
| 43 | `act_g35_sci_01_butterfly_vocab` | Vòng đời của bướm: Khám phá từ vựng 🐛🦋 | Science | grade3_5 | Sau Lớp 1 | `en.sci.lifecycle` | 🔴 Quá khó |
| 44 | `act_g35_sci_02_sentence_match` | Tiếng Anh Khoa học: Ghép câu & ý nghĩa 📖🌿 | Science | grade3_5 | Sau Lớp 1 | `en.sci.reading` | 🔴 Quá khó |
| 45 | `act_g35_sci_03_lifecycle_dragdrop` | Sắp xếp vòng đời của Bướm (Drag & Drop) 🔄✨ | Science | grade3_5 | Sau Lớp 1 | `sci.lifecycle.logic` | 🔴 Quá khó |
| 46 | `act_g35_sci_04_listening_script` | Luyện nghe tiếng Anh: Chú sâu háu ăn 🎧🐛 | Science | grade3_5 | Sau Lớp 1 | `en.sci.listening` | 🔴 Quá khó |
| 47 | `act_g35_sci_05_metamorphosis` | Bí mật biến thái hoàn toàn: Metamorphosis 🔬✨ | Science | grade3_5 | Sau Lớp 1 | `sci.biology.insects` | 🔴 Quá khó |
| 48 | `g1_lananh_01_letter_a` | Học chữ A cùng cô Lan Anh: Chữ A tươi cười 🍎 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 49 | `g1_lananh_02_letter_aw` | Học chữ Ă cùng cô Lan Anh: Chiếc mũ trăng khuyết 🌙 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 50 | `g1_lananh_03_letter_aa` | Học chữ Â cùng cô Lan Anh: Chiếc nón che mưa 🛖 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 51 | `g1_lananh_04_letter_b` | Học chữ B cùng cô Lan Anh: Chữ B bụng bự ⚽ | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 52 | `g1_lananh_05_letter_c` | Học chữ C cùng cô Lan Anh: Chữ C cong cong & Chú Cá nhỏ 🐟 | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 53 | `g1_vtv7_01_letter_o` | VTV7 Lớp 1: Học chữ O tròn xoe ⭕ | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 54 | `g1_vtv7_02_letter_oo` | VTV7 Lớp 1: Học chữ Ô đội mũ 🧢 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 55 | `g1_vtv7_03_letter_ow` | VTV7 Lớp 1: Học chữ Ơ có râu 🐱 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 56 | `g1_vtv7_04_letter_a` | VTV7 Lớp 1: Học chữ A & Đánh vần chữ A 🍎 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 57 | `g1_vtv7_05_letter_aw` | VTV7 Lớp 1: Học chữ Ă: Vầng trăng khuyết 🌙 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 58 | `g1_vtv7_06_letter_aa` | VTV7 Lớp 1: Học chữ Â: Chiếc nón che mưa 🛖 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 59 | `g1_vtv7_07_letter_u` | VTV7 Lớp 1: Học chữ U & Tiếng có âm U 🥣 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 60 | `g1_vtv7_08_letter_uw` | VTV7 Lớp 1: Học chữ Ư & Phân biệt U/Ư 🍇 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 61 | `g1_vtv7_09_letter_e` | VTV7 Lớp 1: Học chữ E & Tiếng có âm E 🐑 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 62 | `g1_vtv7_10_letter_ee` | VTV7 Lớp 1: Học chữ Ê & Phân biệt E/Ê 🐐 | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 63 | `g1_vtv7_11_letter_i` | VTV7 Lớp 1: Học chữ I ngắn & Ghép tiếng ⚪ | VN | grade1_2 | **1** | `vi.letters.vowels` | 🟢 Phù hợp |
| 64 | `g1_vtv7_12_letter_c` | VTV7 Lớp 1: Học phụ âm C & Quy tắc chính tả C/K 🐟 | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 65 | `g1_vtv7_13_letter_b` | VTV7 Lớp 1: Học phụ âm B & Ghép dấu thanh ⚽ | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 66 | `g1_vtv7_14_letter_d` | VTV7 Lớp 1: Học phụ âm D (Dờ) & Tiếng có âm D 🐐 | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 67 | `g1_vtv7_17_letter_dd` | VTV7 Lớp 1: Học phụ âm Đ & Phân biệt D/Đ 🏮 | VN | grade1_2 | **2** | `vi.letters.consonants` | 🟢 Phù hợp |
| 68 | `g1_vtv7_31_letter_gh` | VTV7 Lớp 1: Phụ âm ghép GH & Quy tắc G/GH 🪑 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép gh) |
| 69 | `g1_vtv7_32_letter_ch` | VTV7 Lớp 1: Phụ âm ghép CH: Chú Chó, Quả Chanh 🐕 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép ch) |
| 70 | `g1_vtv7_33_letter_gi` | VTV7 Lớp 1: Phụ âm ghép GI: Cơn Gió, Giỏ Cá 💨 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép gi) |
| 71 | `g1_vtv7_34_letter_kh` | VTV7 Lớp 1: Phụ âm ghép KH: Chú Khỉ, Khăn Quàng 🐒 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép kh) |
| 72 | `g1_vtv7_35_letter_ng` | VTV7 Lớp 1: Phụ âm ghép NG & NGH: Con Ngựa, Nghé Con 🐎 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép ng) |
| 73 | `g1_vtv7_37_letter_ph` | VTV7 Lớp 1: Phụ âm ghép PH: Phố Phường, Bát Phở 🍜 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép ph) |
| 74 | `g1_vtv7_38_letter_tr` | VTV7 Lớp 1: Phụ âm ghép TR & Phân biệt TR/CH ☀️ | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép tr) |
| 75 | `g1_vtv7_39_letter_nh` | VTV7 Lớp 1: Phụ âm ghép NH: Ngôi Nhà, Chùm Nho 🏠 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép nh) |
| 76 | `g1_vtv7_40_letter_th` | VTV7 Lớp 1: Phụ âm ghép TH: Thước Kẻ, Con Thỏ 🐇 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép th) |
| 77 | `g1_vtv7_41_letter_qu` | VTV7 Lớp 1: Phụ âm ghép QU: Quả Quýt, Cái Quạt 🍊 | VN | grade1_2 | Sau Lớp 1 (null) | `vi.letters.consonants` | 🔴 Dời qua Lớp 1 (ghép qu) |

---

## 2. PHÂN BỔ CÁC TRÒ CHƠI & MÀN HÌNH NGOÀI `ACTIVITIES-DATA.JS`

Những trò chơi và màn hình tương tác cốt lõi trong `app.js` được gán vào các chặng và kỹ năng tương ứng:

| Tên màn hình / Game | Mô tả hành vi tương tác | Stage đề xuất | Kỹ năng chuẩn (`skill id`) | Đánh giá trải nghiệm bé 5–6 tuổi |
|---|---|:---:|---|---|
| **`trace`** (Luyện viết nét) | Vẽ canvas theo mẫu nét chấm (14 nét cơ bản trong `VN_STROKES`) | **0** | `vi.trace.strokes` | 🟢 Cực kỳ phù hợp cho bé bắt đầu cầm bút |
| **`trace`** (Luyện viết chữ) | Vẽ canvas theo mẫu chữ cái và chữ số (font `HPTapViet`) | **1 & 2** | `vi.trace.letters` | 🟢 Hỗ trợ tô chữ cái chuẩn tiểu học |
| **`cmp`** (So sánh nhiều/ít) | Nhìn 2 nhóm đồ vật trực quan, bấm chọn bên nhiều hơn hoặc ít hơn | **0** | `math.compare.moreless` | 🟢 Rất trực quan, không cần biết số |
| **`mem`** (Lật thẻ nhớ) | Lật mở các thẻ tìm 2 hình giống nhau (con vật, hoa quả) | **0** | `math.shape.basic` | 🟢 Rèn luyện trí nhớ thị giác |
| **`countGame`** (Đếm hình) | Đếm số lượng con vật/hoa quả (1–10) rồi bấm chọn số tương ứng | **1** | `math.count.1-10` | 🟢 Trọng tâm toán mầm non |
| **`bubbleGame`** (Bắt bóng chữ) | Nghe phát âm chữ cái, chạm vào bong bóng chữ đang bay (Pốp!) | **1 & 2** | `vi.letters.vowels`, `vi.letters.consonants` | 🟢 Vui nhộn, rèn phản xạ nghe - nhận diện mặt chữ |
| **`letL` / `letD` / `letP`** | Bảng chữ cái 29 chữ, xem từ vựng minh họa và trắc nghiệm tìm chữ | **1 & 2** | `vi.letters.vowels`, `vi.letters.consonants` | 🟢 Dễ tra cứu và tự học |
| **`numL` / `numP`** | Học số đếm 0–10 (và 11–20), trắc nghiệm nhận diện số | **1 & 3** | `math.count.1-10`, `math.count.11-20` | 🟢 Nhận diện mặt số chuẩn |
| **`match`** (Kéo nối dây) | Nối chữ cái cột trái với hình minh họa cột phải bằng dây SVG | **1 & 2** | `vi.phonics.initial-sound`, `vi.letters.vowels` | 🟢 Tương tác touch mượt mà |
| **`cmpS`** (Dấu so sánh) | Đặt dấu `>`, `=`, `<` giữa 2 số | **1 & 3** | `math.compare.moreless`, `math.order.numbers` | 🟡 Cần học ý nghĩa dấu cá sấu há miệng |
| **`readL` (Đánh vần)** | Ghép âm `b-a-ba`, thanh điệu `ba-huyền-bà`, 28 bài vần mẫu | **2 & 4** | `vi.blend.simple`, `vi.read.word2` | 🟢 Chuẩn ngữ âm tiếng Việt |
| **`storyL` / `storyRead`** | Nghe kể truyện cổ tích, chữ chạy karaoke, câu hỏi đạo đức | **0 & 4** | `vi.listen.story` | 🟢 Nuôi dưỡng tâm hồn và khả năng nghe hiểu |
| **`math10`** (Toán cộng trừ) | Phép tính cộng/trừ phạm vi 10 (và 20-100) | **3** | `math.addsub.within5`, `math.addsub.within10` | 🟡 Cần chuyển từ hình ảnh sang số |

---

## 3. PHÂN TÍCH KHOẢNG TRỐNG (GAP ANALYSIS) THEO PLAN.MD

So sánh kho bài hiện có với yêu cầu của từng chặng trong `PLAN.md` mục 4:

```
[Chặng 0: Làm quen] ────────► THIẾU: To/nhỏ, Âm giống/khác, Hình khối (Tròn, Vuông, Tam giác)
[Chặng 1: Số 1–10 & Nguyên âm] ──► ĐẦY ĐỦ Tiếng Việt & Số; THIẾU: Số liền trước/sau, Tiếng Anh số 1-10
[Chặng 2: Phụ âm & Dấu thanh] ──► RẤT MẠNH Phụ âm VTV7; THIẾU: Tách-gộp trong 5, Cảm xúc/Chào hỏi
[Chặng 3: Số 11–20 & Hình/Quy luật] THIẾU: Cộng/trừ bằng hình ảnh, Vị trí không gian, Quy luật lặp
[Chặng 4: Đọc bước đầu] ─────► THIẾU: Dài/ngắn, Nặng/nhẹ, Xem giờ đúng, Kỹ năng an toàn bản thân
[Chặng 5: Sẵn sàng vào lớp 1] ──► THIẾU HOÀN TOÀN: Bài kiểm tra ôn tập tổng hợp & Phiếu báo cáo
```

### Chi tiết khoảng trống từng chặng:

#### Chặng 0 — Làm quen:
* **Đã có**: 3 bài Video Quiz con vật (`act_vq_pre_01..03`), game lật thẻ (`mem`), so sánh nhiều/ít (`cmp`), 14 nét viết (`trace`).
* **Khoảng trống cần bổ sung**:
  1. Bài học so sánh kích thước: To — Nhỏ (ví dụ: Quả dưa hấu to vs Quả cherry nhỏ).
  2. Bài tập phân biệt âm thanh: Nghe 2 âm, phân biệt Giống nhau hay Khác nhau (`vi.phonics.initial-sound`).
  3. Nhận diện 4 hình khối cơ bản: Hình tròn, hình vuông, hình tam giác, hình chữ nhật (`math.shape.basic`).

#### Chặng 1 — Số 1–10 và Nguyên âm:
* **Đã có**: Đầy đủ 11 bài nguyên âm VTV7 (O, Ô, Ơ, A, Ă, Â, U, Ư, E, Ê, I), 3 bài Cô Lan Anh (A, Ă, Â), trò chơi đếm hình (`countGame`), bắt bóng (`bubbleGame`), màu sắc tiếng Anh (`act_pre_eng_01`).
* **Khoảng trống cần bổ sung**:
  1. Bài tập tìm số liền trước, số liền sau trong phạm vi 10 (`math.order.numbers`).
  2. Số đếm tiếng Anh từ 1 đến 10 (`en.intro.numbers`).

#### Chặng 2 — Phụ âm, Dấu thanh, Ghép vần:
* **Đã có**: 14 bài phụ âm VTV7 và 2 bài Cô Lan Anh (B, C), bài đánh vần âm B (`act_vq_g12_01_spell_b`), module đánh vần tương tác trong `readL`.
* **Khoảng trống cần bổ sung**:
  1. Bài tập tách — gộp số lượng trong phạm vi 5 bằng hình ảnh quả táo/que tính (`math.addsub.within5`).
  2. Bài tập nhận diện riêng 6 thanh điệu (Không dấu, Huyền, Sắc, Hỏi, Ngã, Nặng) bằng hình ảnh chiếc thuyền lên dốc/xuống dốc (`vi.tones.six`).
  3. Kỹ năng sống: Nhận biết cảm xúc (Vui, Buồn, Ngạc nhiên, Tức giận) và Chào hỏi lễ phép (`life.emotions`).

#### Chặng 3 — Số 11–20 + Hình & Quy luật:
* **Đã có**: Học số đến 20 trong `numL`, phép cộng trừ trong `math10`, bài vần AI/AY của Cô Lan Anh.
* **Khoảng trống cần bổ sung**:
  1. Phép cộng/trừ trong phạm vi 10 **bằng hình ảnh trực quan** (thêm vào/bớt đi đồ vật), thay vì chỉ có phép tính số khô khan trong `math10`.
  2. Khái niệm vị trí không gian: Trên — Dưới, Trái — Phải, Trong — Ngoài (`math.position.basic`).
  3. Bài tập tư duy quy luật lặp: Ví dụ 🔴 🔷 🔴 🔷 ___ (`math.pattern.repeat`).
  4. Bảng chữ cái tiếng Anh ABC vui nhộn (`en.intro.abc`).

#### Chặng 4 — Đọc bước đầu & Kỹ năng chuẩn bị:
* **Đã có**: Đọc đoạn văn ngắn và truyện cổ tích (`storyL`, `readL`).
* **Khoảng trống cần bổ sung**:
  1. Bài tập so sánh thuộc tính đo lường: Dài hơn — Ngắn hơn, Nặng hơn — Nhẹ hơn.
  2. Làm quen xem đồng hồ giờ đúng (1 giờ, 2 giờ... giờ đi ngủ, giờ đến trường) (`life.time`).
  3. Kỹ năng an toàn bản thân: Nhớ số điện thoại của bố mẹ, quy tắc 5 ngón tay phòng tránh người lạ (`life.safety`).

#### Chặng 5 — Sẵn sàng vào lớp 1:
* **Khoảng trống cần bổ sung**:
  1. Gói bài ôn tập tổng hợp (kết hợp nhận mặt chữ, làm toán đố vui, xử lý tình huống).
  2. Màn hình "Phiếu báo cáo sẵn sàng vào lớp 1" hiển thị các kỹ năng bé đã thành thạo để bố mẹ xem.

---

## 4. ĐÁNH GIÁ COMMIT `FEAT(GRADE1)` & HẬU QUẢ KHI ẨN `GRADE1_2`

### Bối cảnh:
Trong commit trước, theo yêu cầu đưa Cô Lan Anh qua lớp 1, 5 bài học Cô Lan Anh (`g1_lananh_01..05`) đã được đổi `ageTier: "grade1_2"` và thẻ trang chủ được chuyển sang tab Lớp 1–2.

### Hậu quả nghiêm trọng nếu ẩn `grade1_2` khỏi bé (khi làm Task P1-01):
* Khi Task **P1-01** được thực thi (đặt `preschool` làm mặc định, ẩn hoàn toàn `grade1_2` và `grade3_5` khỏi giao diện của bé):
  * Bé 5–6 tuổi sẽ **MẤT HOÀN TOÀN QUYỀN TRUY CẬP** vào:
    * 5 bài học chữ cái đầu tiên của Cô Lan Anh (A, Ă, Â, B, C).
    * 4 bài Video Quiz đánh vần của Cô Lan Anh (`act_vq_g12_01..04`).
    * 25 bài học Bảng chữ cái & phụ âm ghép xuất sắc của VTV7 (`g1_vtv7_*`).
  * Trong khi đó, các bài học này là tài nguyên quý giá nhất, **cốt lõi nhất để bé 5–6 tuổi chuẩn bị vào lớp 1**! Nếu chỉ còn lại 12 bài mầm non đơn sơ ban đầu, ứng dụng sẽ trở nên trống rỗng và bé không có nội dung để học chữ cái.

### Đề xuất xử lý tối ưu (Không hoàn nguyên code, dùng Stage-based Routing):
1. **KHÔNG HOÀN NGUYÊN (No Rollback)**: Giữ nguyên `ageTier: "grade1_2"` trong dữ liệu và test để không làm hỏng cấu trúc phân lớp hiện có và giữ test xanh.
2. **Cơ chế phân quyền theo Chặng (`stage`)**:
   * Bổ sung trường `stage: 1` cho các bài học chữ cái nguyên âm Cô Lan Anh & VTV7 (A, Ă, Â, O, Ô, Ơ...).
   * Bổ sung trường `stage: 2` cho các bài học phụ âm và ghép vần (B, C, D, Đ, CH, GH...).
   * Khi ứng dụng chạy ở Chế độ "Chuẩn bị vào lớp 1" cho bé 5–6 tuổi, app sẽ lọc bài học theo:
     $$\text{Bài học hiển thị} = \{ \text{Bài có } stage \in [0, 5] \}$$
     bất kể bài đó có `ageTier` là `preschool` hay `grade1_2`!
   * Như vậy: Phụ huynh mở chế độ phân lớp vẫn thấy bài theo lớp; còn bé 5–6 tuổi ở chế độ lộ trình vẫn được học đầy đủ bài của Cô Lan Anh và VTV7 theo đúng trình tự từ dễ đến khó!

---

## 5. ĐỀ XUẤT THIẾT KẾ TRƯỜNG `STAGE` TƯƠNG THÍCH NGƯỢC 100%

Để bổ sung trường `stage` mà không gây lỗi dữ liệu hay làm đỏ các bài test hiện có:

### 5.1. Quy tắc Schema (`activity.schema.json`)
Thêm `stage` vào mục `properties` nhưng **KHÔNG** đưa vào danh sách `required`:
```json
"stage": {
  "type": ["integer", "null"],
  "enum": [0, 1, 2, 3, 4, 5, null],
  "description": "Chặng học từ 0 đến 5 cho lộ trình chuẩn bị vào lớp 1 (5–6 tuổi). Để null nếu là bài lớp 3–5."
}
```

### 5.2. Quy tắc gán `stage` trong `activities-data.js`
* **Stage 0**: Các bài nhận biết con vật, kỹ năng quan sát ban đầu (`act_vq_pre_01..03`).
* **Stage 1**: Nhận diện số 1–10 và các nguyên âm đơn (Chữ A, Ă, Â, O, Ô, Ơ, E, Ê, U, Ư, I của VTV7, Cô Lan Anh, bài tập đếm táo).
* **Stage 2**: Phụ âm và thanh điệu (Chữ B, C, D, Đ, digraphs VTV7, bài vần Cô Lan Anh B, C).
* **Stage 3**: Số 11–20, quy luật số, vần đôi (AI, AY), đồ dùng học tập.
* **Stage 4**: Đọc hiểu truyện ngắn, sắp xếp câu, nghe hiểu văn bản.
* **Stage 5**: Ôn tập tổng hợp sẵn sàng vào lớp 1.
* **`stage: null` hoặc không khai báo**: Dành cho 22 bài học nâng cao lớp 3–5 (nhân chia, phân số, Hồ Gươm, vũ trụ...).

### 5.3. Bổ sung hàm tiện ích song song trong `activities-data.js`
Giữ nguyên `getActivitiesByTier(tier)` để phục vụ màn hình phân lớp cũ, đồng thời bổ sung:
```javascript
function getActivitiesByStage(stage) {
  return ACTIVITIES_DATA.filter(a => a.stage === stage);
}
function getPreschoolJourneyActivities() {
  return ACTIVITIES_DATA.filter(a => a.stage !== undefined && a.stage !== null);
}
```

---
*Tài liệu hoàn thành theo yêu cầu Task P1-00. Sẵn sàng làm căn cứ triển khai cho Phase 1 & Phase 3.*
