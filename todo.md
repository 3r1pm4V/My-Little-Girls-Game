# todo.md — My-Little-Girls-Game ("Bé học vui")

Cập nhật lần cuối: 2026-11-03
Luật làm việc: xem `AGENTS.md`. Lộ trình: xem `PLAN.md`.

**Ký hiệu**
- `[x]` xong và đã kiểm chứng
- `[~]` thấy trong code/CSS hiện tại nhưng **chưa kiểm chứng hành vi** → cần xác minh (task `P0-xx`)
- `[ ]` chưa làm
- Khi hoàn thành: đổi ký hiệu, thêm `(YYYY-MM-DD)` và ghi vào `CHANGELOG.md`.
- Ưu tiên: **P1** làm trước · **P2** sau · **P3** có thể để muộn.

---

## A. ĐÃ CÓ (từ repo hiện tại)

### Nền tảng
- [x] PWA cơ bản: `manifest.webmanifest`, `icon-192/512.png`, đăng ký `sw.js` (2026-10-19)
- [x] Deploy Netlify (`netlify.toml`, `netlify/functions`), chạy local (`run-local.bat`, `server.js`) (2026-10-19)
- [x] Font tiếng Việt cục bộ (`font-vn.ttf`, `font-tapviet.ttf`, `font-tapviet-cham.ttf`, Baloo 2 woff2) (2026-10-20)
- [x] Bộ 19 test suites tự động: audio, DOM performance, scoring, precache, toddler games, touch, profiles, fruit-ninja... (2026-11-03)
- [x] Hệ thống âm thanh đa tầng: 433 file `OPT_AUDIO` VieNeu TTS Tưởng Vy + CIT Mai Anh + Web Speech fallback (2026-10-28)

### Tính năng (xác minh bằng ĐỌC MÃ NGUỒN + 19/19 TEST SUITES PASS)
- [x] 3 tầng tuổi: `preschool` (mặc định 4–6 tuổi), `grade1_2`, `grade3_5` (2026-10-19)
- [x] Home 4–6 tuổi chuẩn Responsive: icon đồ họa lớn co giãn linh hoạt, Single-Screen 100dvh (2026-10-28)
- [x] Phân hệ Học chữ (`alphabet.js`): 4 thẻ lớn Glassmorphism (14 Nét viết cơ bản, Bảng chữ cái, Đánh vần, Tư thế ngồi & Cầm bút) (2026-10-28)
- [x] Phân hệ Học số (`numbers.js`): khay đếm cố định kính mờ, 21 vật đếm độc nhất 0–20, thanh chọn số 2 hàng (2026-10-28)
- [x] Phân hệ Trò chơi mầm non & Montessori (`games/`): 12 game tương tác tinh gọn, Chém hoa quả 2D Canvas 60 FPS, Nối chấm, Khung 10 ô, Nối cặp (2026-10-26)
- [x] Xưởng vẽ & Tô màu (`coloring/`, Art Studio): 6 tranh tô màu Elsa line art không màu nền, 24 màu vẽ + màu da người, Cục tẩy, Bút phát sáng, lưu IndexedDB (2026-10-28)
- [x] Sao thưởng, cấp độ, bộ sưu tập sticker hoạt hình 2D rực rỡ, chuỗi ngày học nhẹ nhàng không trừ điểm (2026-10-28)
- [x] Bảng điều khiển phụ huynh: Cổng PIN SHA-256 an toàn, đa hồ sơ bé, giới hạn giờ chơi, báo cáo tuần, hoạt động ngoài màn hình, mở khóa chặng (2026-10-27)
- [x] Tối ưu máy tính bảng 11-inch (Huawei MatePad 11 / iPad) & nút chuyển trang cạnh viền (Side Pagination) (2026-10-29)

---

## B. PHASE 0 — Chuẩn bị & kiểm toán (làm trước tiên)

- [x] **P0-01 (P1)** Đưa `AGENTS.md`, `todo.md`, `PLAN.md` vào root repo; tạo `CHANGELOG.md`, `ASSETS.md` (2026-10-19)
- [ ] **P0-02 (P1)** Tạo nhánh `main` ổn định + tag `v0-baseline`; quy ước nhánh theo `AGENTS.md` mục 8 — LƯU Ý: gắn tag vào commit cũ trước 2026-10-19 (`git tag v0-baseline <hash>`); gắn thêm tag `p1-complete` ở commit hiện tại
- [x] **P0-03 (P1)** Kiểm toán code: đọc `app.js`, `sw.js`, `server.js`, `netlify/functions/*`; ghi kết quả vào `docs/audit.md` (2026-10-19)
- [x] **P0-04 (P1)** Xác nhận cách chạy toàn bộ 19 file `test-*.js`; tích hợp CI GitHub Actions `.github/workflows/test.yml`; 19/19 test PASS (2026-11-03)
- [~] **P0-05 (P1)** Xác minh từng mục phần A và P1. Agent đã xác minh bằng đọc code/19 test tự động. **Còn lại: Nghĩa chơi thử trên tablet/điện thoại của bé** rồi đổi thành `[x]` hoặc mở bug
- [x] **P0-06 (P1)** Xác minh nút "Bố mẹ mở thêm 15 phút" (màn hình hết giờ) **có cổng PIN** qua `#parentPinModal`, không có lỗ hổng hoãn giờ (2026-10-27)
- [x] **P0-07 (P1)** Liệt kê mọi request mạng khi chạy app; siết chặt CSP netlify.toml, 0 request ngoài trái phép (2026-10-20)
- [x] **P0-08 (P2)** Xác định `netlify/functions` đang làm gì — Proxy TTS VieNeu, không có dữ liệu bé (2026-10-19)
- [~] **P0-09 (KHẨN)** API key VieNeu: agent đã xóa khỏi toàn bộ code (2026-10-19). **Chưa xong cho tới khi Nghĩa:** thu hồi/xoay key tại VieNeu dashboard (key cũ từng nằm trong lịch sử git của repo public)
- [x] **P0-10 (P1)** Báo cáo audit: đã thay bằng bản redacted, chỉ lưu tại `docs/audit.md`, đã xóa file cũ ở root (2026-10-20)
- [x] **P0-11 (P2)** `server.js` mặc định phục vụ `index.html` (dòng 163–165); đã dọn sạch `test-local.html` (2026-10-20)
- [ ] **P0-12 (P1)** Xác minh nguồn gốc/giấy phép trong `ASSETS.md` (repo public): font HPTapViet/HPCham, thư mục `audio/`, điều khoản VieNeu, sprite `img-*.js`, truyện. Chưa chắc → ghi `UNVERIFIED`, không đoán
- [~] **P0-13 (P1)** Tự động hóa kiểm tra & bump cache `sw.js`: script `test-sw-precache.js --fix`, tích hợp CI GitHub Actions (2026-10-20) — hiện tại cache đạt `bhv-v157`; chờ Nghĩa kiểm tra (thiết bị: máy tính bảng Android của bé, bật chế độ máy bay)

---

## C. PHASE 1 — Chế độ "Chuẩn bị vào lớp 1" (4–6 tuổi)

- [x] **P1-00 (P1)** Lập bản đồ phân bổ 77 bài học và trò chơi theo 6 chặng (0–5) (`docs/stage-map.md`), bổ sung trường `stage` vào dữ liệu hoạt động (2026-10-19)
- [x] **P1-01 (P1)** Đặt `preschool` làm mặc định; giao diện bé chỉ hiện nội dung có `stage` 0–5; ẩn bộ chọn 3 tầng tuổi khỏi bé, chỉ phụ huynh bật trong cài đặt (2026-10-19)
- [x] **P1-02 (P1)** Đổi mô tả/metadata sang "4–6 tuổi, làm quen trước lớp 1" (`<title>`, `description`, manifest) (2026-10-19)
- [~] **P1-03 (P1)** Đơn giản hóa header cho bé: chỉ Home tròn 52px, Quay lại tròn 52px, sao, huy hiệu; cài đặt chuyển vào khu phụ huynh (2026-10-28) — test tự động PASS; **chờ Nghĩa kiểm tra header ở 360px và tablet**
- [~] **P1-04 (P1)** Home cho bé: 4 nút lớn Responsive co giãn linh hoạt (`Học chữ cái`, `Học số đếm`, `Trò chơi ôn tập`, `Truyện cổ tích`) có giọng đọc tự động khi bấm loa; icon PNG đồ họa sắc nét; Single-Screen 100dvh (2026-10-28) — **chờ chơi thử Home trên thiết bị**
- [~] **P1-05 (P1)** Tự động đọc to đề bài khi vào màn hình (tôn trọng chính sách autoplay: `pendingAutoplayAudio`); nút 🔊 nghe lại trên mọi màn hình bài/trò chơi (2026-10-20) — **chờ thử trên thiết bị**
- [x] **P1-06 (P1)** Streak "nhẹ nhàng": bỏ cảm giác mất chuỗi; thay bằng "bé đã học N ngày" (không reset gây buồn, không có thông báo mất chuỗi); test PASS (2026-10-20)
- [~] **P1-07 (P1)** Kiểm tra mọi nút ≥ 64px, khoảng cách ≥ 12px trên màn 360px và tablet ngang (2026-11-03) — kiểm tra bằng test CSS/DOM; **chờ thử trực quan trên tablet của bé**
- [x] **P1-08 (P2)** Nút "Gợi ý cho bố mẹ" chuyển vào khu phụ huynh, tránh chồng chéo giao diện (2026-10-20)
- [~] **P1-09 (P2)** Chế độ chạm thay thế cho kéo-thả nối dây và bắt bóng (2026-10-20) — test tự động PASS; **chờ bé thật chơi trên màn hình cảm ứng**
- [~] **P1-10 (P2)** Màn hình nghỉ ngơi nhẹ nhàng khi hết thời gian; nút mở khóa bảo vệ bằng Cổng PIN an toàn (2026-10-27) — test tự động PASS; **chờ thử trên thiết bị**
- [ ] **P1-11 (P1)** Nghĩa duyệt `docs/stage-map.md`: gán `stage`/mức khó có hợp lý với bé không (53 bài hiển thị cho bé, 24 bài lớp 3–5 bị ẩn), chốt nội dung cần bổ sung ở Phase 4
- [x] **P1-12 (P1)** Định vị lại **4–6 tuổi, làm quen trước lớp 1**: hoàn tất cập nhật `<title>`, `description`, `manifest.webmanifest`, `AGE_TIERS.preschool` trong `app.js` ("4-6 tuổi, Làm quen trước lớp 1") (2026-10-28)

---

## D. PHASE 2 — Dọn kỹ thuật (không viết lại)

- [x] **P2-01 (P1)** Tách CSS inline ra `styles.css`; bump cache `sw.js` (2026-10-20)
- [x] **P2-02 (P1)** Chuyển ảnh nền base64 trong CSS thành file `bg.webp` riêng (2026-10-20)
- [~] **P2-03 (P1)** Tự host font "Baloo 2" (woff2 subset trong `fonts/`), kèm `fonts/OFL.txt`, xóa Google Fonts, siết CSP, 0 request ra ngoài Google (2026-10-20) — chờ Nghĩa kiểm tra trên thiết bị offline
- [ ] **P2-04 (P2)** Thống nhất danh mục môn: schema `subject` (vietnamese, math, english, science, skills) lệch với UI (math, vietnamese, reading, game, logic, trace). Chốt bảng chuẩn trong `PLAN.md` mục 5
- [ ] **P2-05 (P2)** Chuyển `onclick` inline sang `addEventListener`; gom hàm toàn cục vào namespace `BLG`
- [x] **P2-06 (P2)** Module hóa `app.js`: tách trò chơi Đếm hình chọn số ra module độc lập `games/count-game.js`, nạp động dynamic `import()` kèm fallback `loadScriptTag` (2026-10-20)
- [x] **P2-07 (P2)** Quản lý cache `sw.js` & precache âm thanh Chặng 0–1 & số 0–20: tự sinh version từ asset-hash (`test-sw-precache.js`), nạp precache `CORE` + `OPT` + `OPT_AUDIO`; gọt emoji trong `audio-map.js` (2026-10-20)
- [~] **P2-07b (P2)** Sinh hàng loạt 157 file audio VieNeu TTS giọng Tưởng Vy cho Chặng 0–1, cập nhật 304 cặp khóa vào `audio-map.js`, tạo `test-required-audio.js` (2026-10-20) — chờ Nghĩa kiểm tra thực tế
- [ ] **P2-08 (P3)** Thêm `README.md` (cách chạy, cách thêm bài, cách deploy)
- [ ] **P2-09 (P3)** Thêm lint nhẹ (ESLint cấu hình tối thiểu) chạy bằng `npx`, không đổi cách build
- [ ] **P2-10 (P2)** `img-core.js` + `img-s.js` + `img-o.js` ≈ 4,3 MB ảnh base64 trong JS và `audio-map.js` ≈ 2.1 MB nạp đồng bộ: chuyển sang file thật/tải lazy

---

## E. PHASE 3 — Bộ máy học (learning engine)

- [ ] **P3-01 (P1)** Schema v2: cấu trúc bài học tích hợp `template`, `skills[]`, `prerequisites[]`, `estimatedMinutes`; giữ tương thích ngược
- [ ] **P3-02 (P1)** Danh mục kỹ năng (`skills.js`) theo `PLAN.md` mục 5 (id, tên, nhóm, tiên quyết)
- [ ] **P3-03 (P1)** Ghi nhận kết quả theo kỹ năng: số lần thử, đúng/sai, lần cuối, mức thành thạo (`blg.progress.v2` + hàm migrate từ dữ liệu cũ)
- [ ] **P3-04 (P1)** Quy tắc mastery: đạt khi ≥ 4/5 đúng ở 2 phiên khác ngày; kèm unit test
- [ ] **P3-05 (P1)** "Học hôm nay": tự chọn 3 hoạt động (1 ôn lại, 1 bài mới, 1 trò chơi) trong 5–10 phút
- [ ] **P3-06 (P2)** Ôn tập giãn cách (Leitner đơn giản: +1, +3, +7, +14 ngày)
- [ ] **P3-07 (P2)** Điều chỉnh độ khó nhẹ: 3 đúng liên tiếp → tăng, 2 sai liên tiếp → giảm và cho gợi ý (không phạt)
- [ ] **P3-08 (P2)** Bản đồ hành trình (các "chặng" mở dần) thay danh sách phẳng
- [ ] **P3-09 (P3)** Khảo sát đầu vào ngắn (5 phút, do phụ huynh bật) để đặt điểm xuất phát
- [ ] **P3-10 (P2)** Hồ sơ bé có tuổi/ngày sinh: tự đặt mặc định thời lượng phiên 5–10 phút, độ khó, chặng khởi điểm
- [ ] **P3-11 (P1)** Thêm vào schema hai trường `theme` (ban-than | gia-dinh | dong-vat | truong-hoc | do-vat-mau-sac) và `pillar` (cognition-language | fine-motor | readiness-habits)

---

## F. PHASE 4 — Nội dung theo chặng & Hoạt động tương tác

- [ ] **P4-01 (P1)** Chặng 0 — Làm quen Tiếng Việt tiền đọc-viết (nghe âm đầu/vần, bắt vần, nhận mặt nguyên âm qua hình) + màu, hình, to/nhỏ, nhiều/ít: ~8–10 hoạt động
- [x] **P4-LET (P1)** Module Học chữ cái & 14 Nét viết cơ bản (`alphabet.js`): Single-Screen 4 thẻ lớn cân đối (14 Nét viết cơ bản, Bảng chữ cái, Đánh vần, Tư thế ngồi & Cầm bút kèm popup cô giáo dặn dò) (2026-10-28)
- [ ] **P4-02 (P1)** Chặng 1 — Nhận mặt chữ số 1–10 và đếm đúng số vật thật + nguyên âm đầu tiên + làm quen số 11–20: ~12 hoạt động
- [x] **P4-NUM (P1)** Module Học số đếm 0–20 chuyên sâu (`numbers.js`): khay đếm cố định kính mờ chống giật màn hình, 21 loại đồ vật đếm độc nhất từ 0–20 (dâu tây, bướm, chùm nho...), thanh chọn số 2 hàng cân đối (0–10 và 11–20) (2026-10-28)
- [ ] **P4-03 (P1)** Chặng 2 — Phụ âm + dấu thanh + ghép vần đơn giản: ~16 hoạt động
- [ ] **P4-04 (P2)** Chặng 3 — Số 11–20, cộng/trừ trong 10 bằng hình, hình học, vị trí, quy luật: ~14 hoạt động
- [ ] **P4-05 (P2)** Chặng 4 — Đọc từ 2 tiếng, câu ngắn, tô nét/tô chữ, nghe hiểu truyện: ~14 hoạt động
- [ ] **P4-06 (P2)** Chặng 5 — Ôn tổng hợp "Sẵn sàng vào lớp 1" + phiếu báo cáo
- [x] **P4-LOGIC (P1)** Nâng cấp Bộ trò chơi tư duy Logic Montessori cho bé 4 tuổi: kích hoạt game Ghép đôi quen thuộc & Cặp đối lập (`pairMatchGame`), thay thế emoji bằng hình ảnh 3D chân thực (`img/animals/`, `img/vocab/`), nâng cấp Ghép hình bóng & So sánh to-nhỏ 3 mức to rõ, tích hợp vào menu và Hộp Quà Bất Ngờ; bump cache `sw.js` bhv-v158 (2026-11-03)
- [x] **P4-COL (P1)** Xưởng nghệ thuật & Tranh tô màu line art (`coloring/`, `games/creative-games.js`): 6 tranh tô màu Elsa line art không lem màu, bảng 24 màu vẽ (bổ sung màu da người `#fed7aa`), cục tẩy chuyên dụng, bút phát sáng Glow Pen, lưu IndexedDB `bhv_drawings` (2026-10-28)
- [x] **P4-FN (P1)** Module Chém trái cây (Ninja Fruit Clone, `games/fruit-ninja.js`): Canvas 2D 60 FPS, multi-touch 5 ngón, 25 WebP sprites, 3 chế độ (Classic, Zen, Arcade với chuối Freeze/Frenzy/Double & quả lựu cuối màn), Web Audio Synth (2026-10-26)
- [x] **P4-TAB (P2)** Tối ưu giao diện Tablet 11-inch & Single-Screen: hỗ trợ màn hình lớn (Huawei MatePad 11 / iPad), nút phân trang bên hông (Side Pagination) cho trò chơi, truyện, huy hiệu; fit trọn vẹn 100dvh không bị cuộn dọc (2026-10-29)
- [x] **P4-AUD (P2)** Tinh gọn âm thanh tương tác: tắt đọc giọng nói khi bấm nút màu, cục tẩy, nhấc thẻ trò chơi Montessori để tăng tập trung cho bé; giữ SFX nhẹ nhàng và giọng đọc khi bấm nút loa 🔊 (2026-10-27)
- [ ] **P4-07 (P2)** Chạy song song, nhẹ: tiếng Anh nhập môn (ABC, màu, số 1–10) + kỹ năng sống (cảm xúc, an toàn, giờ giấc)
- [ ] **P4-08 (P2)** Ghi nguồn/giấy phép mọi hình/âm thanh vào `ASSETS.md`
- [ ] **P4-09 (P2)** Phụ huynh rà soát chính tả/dấu/phát âm từng gói nội dung (đánh dấu `reviewed: true`)
- [ ] **P4-10 (P2)** Tổ chức nội dung theo chủ đề: mỗi chặng có 2–3 chủ đề; Home/"Học hôm nay" nhóm bài theo chủ đề
- [ ] **P4-11 (P2)** Toán bổ sung theo khung Logic Lab: phân loại, so sánh kích thước/màu sắc, hình khối 3D, vị trí, quy luật lặp
- [ ] **P4-12 (P2)** Tiếng Việt diễn đạt: bộ câu hỏi mở cho bố mẹ hỏi bé (tự giới thiệu, kể lại truyện, bé thích gì)

---

## G. PHASE 5 — Khu vực phụ huynh

- [~] **P5-01 (P1)** Cổng phụ huynh thống nhất, **bao gồm** mở thêm thời gian: modal `#parentPinModal`; bắt buộc tạo PIN ở lần đầu; lưu PIN băm SHA-256 + salt ngẫu nhiên 16 bytes; test PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [x] **P5-02 (P1)** Sửa xuất/nhập: nâng cấp `LSK` + `LSV` đầy đủ 23 keys, xuất schemaVersion 2, test khứ hồi, **KHÔNG xuất PIN**, bỏ qua mọi key chứa pin khi nhập (2026-10-20)
- [~] **P5-03 (P2)** Báo cáo tuần: kỹ năng thành thạo, kỹ năng cần ôn, thời gian học 7 ngày (biểu đồ cột CSS, ngày học tích cực, đánh giá mục tiêu 5–10 phút), gợi ý hoạt động cùng bé ở nhà; test PASS 100%, chờ thử trên thiết bị
- [~] **P5-07 (P2)** "Hoạt động ngoài màn hình" cho bố mẹ, gắn theo kỹ năng: vận động tinh, đếm thìa dĩa dọn bàn ăn, nề nếp, hỏi mở sau truyện. Hiển thị trong khu phụ huynh và báo cáo tuần, toggle tương tác lưu `bhv_offscreen_done`; test PASS 100%, chờ thử trên thiết bị
- [~] **P5-04 (P2)** Nhiều hồ sơ bé trên một thiết bị (`bhv_profiles`, chuyển đổi `switchKidProfile`, lưu snapshot tiến trình riêng từng bé `bhv_pdata_*`, tạo bé mới, đồng bộ backup v2); test PASS 100%, chờ thử trên thiết bị
- [~] **P5-05 (P2)** Cài đặt tập trung: giới hạn thời gian/ngày (0, 15, 30, 45, 60 phút), bật/tắt tầng tuổi, tốc độ đọc, ngôn ngữ, giảm chuyển động tự động tắt pháo hoa; test PASS 100%, chờ thử trên thiết bị
- [~] **P5-06 (P3)** Mở khóa/bỏ qua chặng thủ công: phụ huynh chọn chặng hôm nay `setStageByParent()`, mở khóa từng chặng hoặc mở khóa toàn bộ 6 chặng `toggleUnlockAllStages()` (`blg_unlock_all`); test PASS 100%, chờ thử trên thiết bị

---

## H. PHASE 6 — Chất lượng, an toàn, phát hành

- [~] **P6-01 (P1)** Kiểm thử offline đầy đủ (airplane mode) trên Android + iOS: kịch bản chi tiết `docs/offline-testing-checklist.md`, chờ thử thực tế trên thiết bị
- [x] **P6-02 (P1)** Video YouTube an toàn: `youtube-nocookie.com`, `rel=0&modestbranding=1&controls=1`, bọc Cổng PIN phụ huynh `openExternalLinkWithParentGate()`; test PASS 100% (2026-10-20)
- [x] **P6-03 (P2)** Audit truy cập: đọc màn hình (`aria-label`, `role`), tương phản màu WCAG AA, `:focus-visible`, hỗ trợ `prefers-reduced-motion` và class `.rm`; test PASS 100% (2026-10-20)
- [x] **P6-04 (P2)** Kiểm tra hiệu năng máy yếu: CSS Containment (`contain: content`), phân đoạn nạp danh sách, thu hồi bộ nhớ `URL.revokeObjectURL`, dọn dẹp IndexedDB LRU 50MB; test PASS 100% (2026-10-20)
- [x] **P6-05 (P2)** CSP + HTTP headers an toàn trong `netlify.toml`: Content-Security-Policy, X-Frame-Options: SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy; test PASS 100% (2026-10-20)
- [x] **P6-06 (P2)** Tích hợp CI tự động: GitHub Actions workflow `.github/workflows/test.yml` chạy kiểm tra cú pháp và toàn bộ 19 test suites tự động khi push hoặc PR; test PASS 100% (2026-10-20)
- [~] **P6-07 (P1)** Checklist release v1.0 & chuẩn bị tag v1.0: đã lập tài liệu `docs/release-v1.0-checklist.md`, sẵn sàng gắn tag `v1.0` sau khi thử thiết bị
- [x] **P6-08 (P1)** Sửa lỗi cú pháp code (`img-s.js`, `styles.css`), dọn sạch 124 khóa trùng lặp/xung đột trong `audio-map.js`, tinh chỉnh lặp từ tiếng Việt trong UI (2026-10-26)

---

## I. Câu hỏi mở (chủ dự án trả lời để agent khỏi đoán)

- [x] **Q1** Bé nhà mình bao nhiêu tuổi, đã biết gì? → (2026-10-20) bé 4 tuổi, chưa rành chữ, đã biết đếm 1–10. **Còn mở:** bé nhận mặt chữ số 1–10 và đếm đúng số vật thật chưa, hay mới đếm thuộc lòng?
- [~] **Q2** Bộ sách lớp 1 của trường → (2026-10-20) Nghĩa gửi link web trường Lâm Văn Bền (chỉ liệt kê file PDF SGK lớp 1, không ghi tên bộ sách; PDF bị chặn đọc tự động). **Cần:** tên bộ sách ghi trên bìa Tiếng Việt 1. Chưa gấp vì bé vào lớp 1 khoảng 2028; cần trước khi chốt thứ tự chữ ở chặng 2
- [x] **Q3** Thiết bị bé dùng: tablet hay điện thoại, Android hay iOS? có bút cảm ứng không? → (2026-10-20) Máy tính bảng Android, bộ nhớ trống > 2GB, chơi ở nhà có Wifi; chọn Phương án (b) precache âm thanh Chặng 0–1 (~11.85 MB)
- [ ] **Q4** Có một hay nhiều bé dùng chung (repo ghi "Daughters")?
- [x] **Q5** `netlify/functions` dùng để làm gì? → Proxy TTS VieNeu, không gửi dữ liệu của bé (2026-10-19)
- [ ] **Q6** Có muốn giữ tầng `grade1_2`, `grade3_5` để dùng sau không?

---

## Nhật ký

| Ngày | Task | Ghi chú |
|------|------|---------|
| 2026-10-19 | — | Tạo `AGENTS.md`, `todo.md`, `PLAN.md` |
| 2026-10-19/20 | P0-01…08, P1-00…P1-10 | Agent hoàn thành, 10/10 bộ test PASS; phần giao diện chờ Nghĩa thử thiết bị |
| 2026-10-20 | P0-09 | Key đã xóa khỏi code; **chưa xác nhận đã thu hồi tại VieNeu** |
| 2026-10-20 | Q1, Q2 | Bé 4 tuổi, chưa rành chữ, đếm được 1–10 → đổi định vị 4–6 tuổi (P1-12), mỗi chặng ~3–4 tháng, thêm P3-10; Q2 chờ tên bộ sách |
| 2026-10-20 | (khung tham chiếu) | Thêm khung Logic Lab (nguồn thương mại, chỉ tham khảo): 3 trụ cột, chủ đề, Toán 3 mảng → P3-11, P4-10…12, P5-07 |
| 2026-10-20 | P5-01, P5-02 | Cổng phụ huynh SHA-256 + salt, bỏ hoàn toàn `prompt()`, modal #parentPinModal, xuất/nhập v2 bảo vệ 100% dữ liệu & KHÔNG xuất PIN; 11/11 bộ test PASS |
| 2026-10-20 | VieNeu TTS & Remap | Sinh 241/241 audio MP3 chuẩn VieNeu Tưởng Vy cho nhóm ưu tiên (UI 4–6 tuổi + 31 bài mầm non); tự động remap +1,780 keys vào `audio-map.js` (tổng 14,728 keys); .env được .gitignore bảo vệ; 11/11 test PASS |
| 2026-10-20 | P5-03, P5-07 | Báo cáo tuần phụ huynh (biểu đồ cột CSS 7 ngày, ngày học tích cực, đánh giá mục tiêu 5–10p/ngày, phân nhóm kỹ năng thuần thục/cần ôn/đang học); 6 Hoạt động ngoài màn hình gắn kỹ năng thực tế với toggle lưu `bhv_offscreen_done` (hỗ trợ backup v2); bump sw `bhv-v41`; 12/12 test PASS |
| 2026-10-20 | P5-04, P5-05 | Đa hồ sơ bé trên một thiết bị (`bhv_profiles`, chuyển đổi `switchKidProfile`, bảo lưu tiến trình riêng biệt từng bé qua snapshot, thêm/xóa hồ sơ); Cài đặt tập trung hệ thống (Giới hạn màn hình, Ngôn ngữ, Tốc độ giọng đọc, Giảm chuyển động, Âm thanh & SFX, Bảo mật PIN); bump sw `bhv-v42`; 13/13 test PASS |
| 2026-10-20 | P5-06 | Mở khóa / bỏ qua chặng thủ công (Card 3B khu phụ huynh, chọn chặng hôm nay `setStageByParent`, mở khóa/khóa từng chặng, công tắc mở khóa tự do toàn bộ 6 chặng `blg_unlock_all`, hiển thị 🔒 và âm nhắc nhở); bump sw `bhv-v43`; 14/14 test PASS |
| 2026-10-20 | Phase 6 (P6-01…P6-07) | Hoàn thành toàn bộ Phase 6: Video YouTube nocookie an toàn & bọc PIN gate cho mọi link thoát; CSP + Headers bảo mật trong `netlify.toml`; GitHub Actions CI `.github/workflows/test.yml` chạy 15 test suites; Audit Accessibility; bump sw `bhv-v43`; 15/15 test PASS |
| 2026-10-20 | Fix Home CSS & Hover Audio | Sửa lỗi vỡ khung 3 nút lớn Home, gỡ bỏ `onmouseenter`, chuẩn hóa `speakKidBtn` phát trực tiếp file MP3 VieNeu, bổ sung alias `audio-map.js`, bump sw `bhv-v44`; 15/15 test PASS |
| 2026-10-20 | P2-03, P0-13, P2-07 (phần 1) | Tự host font Baloo 2 (woff2 600 & 800 subset) kèm fonts/OFL.txt; xóa 3 thẻ Google Fonts; siết CSP netlify.toml (0 request google); sw.js quản lý qua test-sw-precache.js --fix; CI test.yml; 16/16 test PASS |
| 2026-10-20 | P2-07 (precache audio 0–20 & Chặng 0–1) | Precache 276 file âm thanh Chặng 0–1 & số 0–20 (~12.36 MB ≤ 13 MB); lọc emoji Unicode kích hoạt đúng 49 audio bài học; bump cache `bhv-v48`; 16/16 test PASS |
| 2026-10-20 | P2-07b (sinh hàng loạt VieNeu Chặng 0–1) | Sinh 157/157 file audio VieNeu TTS Tưởng Vy cho các lựa chọn Chặng 0–1; bổ sung 304 cặp khóa vào `audio-map.js`; nâng trần kiểm thử lên 16 MB trong `test-sw-precache.js` (`OPT_AUDIO` đạt 433 file, 15.52 MB ≤ 16 MB); lập `test-required-audio.js`; bump cache `bhv-v49`; 17/17 test PASS |
| 2026-10-23 | Góc vui chơi RV & Sáng tạo Montessori | Gộp & mở rộng Góc vui chơi (`games/toddler-games.js` + `games/creative-games.js`): Tô màu SVG & Bút phát sáng (IndexedDB), Nối chấm theo số & Tự vẽ, Vẽ theo trí nhớ, Khung 10 ô (`2×5`), Nối cặp lưới `2×2`/`3×2`, Chủ đề màu theo mùa & Khoảng số `1–5`/`1–10`/`1–20`; 18/18 test PASS |
| 2026-10-26 | P6-08 (Fix syntax, deduplication & UI Polish) | Sửa cú pháp `img-s.js` & `styles.css`; dọn sạch 124 khóa trùng lặp/xung đột trong `audio-map.js`; chuẩn hóa ngữ pháp UI; bump cache `sw.js` (bhv-v123); 18/18 test PASS |
| 2026-10-26 | P4-FN (Ninja Fruit Clone & Asset Integration) | Nâng cấp game Chém trái cây thành module `games/fruit-ninja.js` tích hợp 25 sprites WebP; Canvas 2D 60 FPS, multi-touch 5 ngón, 3 chế độ (Classic, Zen, Arcade & chuối Freeze/Frenzy/Double), Shop Kiếm & Dojos, Web Audio Synth, bump precache `sw.js` bhv-v125; 19/19 test PASS |
| 2026-10-27 | Parent Gate PIN & Tinh gọn âm thanh tương tác | Khóa an toàn `#timeLimitModal` không hoãn lén lút khi hết giờ; tắt đọc máy khi nhặt thẻ/chọn màu/tẩy; giữ âm thanh khen thưởng & loa 🔊; bump sw `bhv-v126`; 19/19 test PASS |
| 2026-10-28 | Single-Screen, Tranh Elsa Line-art, Bộ Sticker 2D Chrome | 4 thẻ lớn học chữ `lettersHome`, 16 huy hiệu game 3D độc nhất, 6 tranh tô màu Elsa line-art trắng đen không lem màu, 10 sticker hoạt hình 2D; bump sw `bhv-v134`; 19/19 test PASS |
| 2026-10-28 | Antigravity Design Expert UI Refactor & Khay đếm 0–20 | Thẻ học chữ đứng Glassmorphism, nút Back đồng bộ tròn 52px; khay đếm cố định kính mờ 0–20 với 21 vật đếm độc nhất; bump sw `bhv-v136`; 19/19 test PASS |
| 2026-10-29 | Tablet 11-inch & Side Pagination Navigation | Tối ưu hiển thị cho tablet 11-inch (Huawei MatePad 11); nút phân trang cạnh màn hình cho Trò chơi, Truyện, Huy hiệu; bump sw `bhv-v144`; 19/19 test PASS |
| 2026-11-03 | Responsive Layout & Đồng bộ hiện trạng SW bhv-v157 | Tối ưu bố cục xoay ngang điện thoại, co giãn thanh điều hướng, dọn template tô màu phức tạp; sw.js đạt `bhv-v157` (13.89 MB ≤ 16 MB); 19/19 test PASS |
| 2026-11-03 | P4-LOGIC (Montessori Logic & Pair Match) | Kích hoạt game Ghép đôi tương ứng (pairMatchGame), dùng ảnh 3D chân thực thay emoji, nâng cấp Ghép hình bóng & So sánh to-nhỏ 3 mức to rõ; bump sw bhv-v158; 19/19 test PASS |
