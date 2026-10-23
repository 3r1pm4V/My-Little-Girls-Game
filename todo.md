# todo.md — My-Little-Girls-Game ("Bé học vui")

Cập nhật lần cuối: 2026-10-20
Luật làm việc: xem `AGENTS.md`. Lộ trình: xem `PLAN.md`.

**Ký hiệu**
- `[x]` xong và đã kiểm chứng
- `[~]` thấy trong code/CSS hiện tại nhưng **chưa kiểm chứng hành vi** → cần xác minh (task `P0-xx`)
- `[ ]` chưa làm
- Khi hoàn thành: đổi ký hiệu, thêm `(YYYY-MM-DD)` và ghi vào `CHANGELOG.md`.
- Ưu tiên: **P1** làm trước · **P2** sau · **P3** có thể để muộn.

> Lưu ý: danh sách "đã có" dưới đây dựa trên cây thư mục và `index.html`, `activity.schema.json`. Chưa đọc `app.js`, `activities-data.js`, `server.js`, `netlify/functions`, `sw.js` nên nhiều mục để `[~]`.

---

## A. ĐÃ CÓ (từ repo hiện tại)

### Nền tảng
- [x] PWA cơ bản: `manifest.webmanifest`, `icon-192/512.png`, đăng ký `sw.js`
- [x] Deploy Netlify (`netlify.toml`, `netlify/functions`), chạy local (`run-local.bat`, `server.js`)
- [x] Font tiếng Việt cục bộ (`font-vn.ttf`, `font-tapviet.ttf`, `font-tapviet-cham.ttf`)
- [x] Schema hoạt động `activity.schema.json` + test `test-activity-schema.js`
- [x] Bộ test: audio, DOM performance, scoring, local
- [x] Script sinh audio đánh vần `generate_spelling_audio.js`, thư mục `audio/`, `audio-map.js`

### Tính năng (xác minh bằng ĐỌC MÃ NGUỒN 2026-10-19; chưa chơi thử trên thiết bị)
- [x] 3 tầng tuổi: `preschool`, `grade1_2`, `grade3_5` (tab chọn tầng) (2026-10-19)
- [x] Thẻ hoạt động preschool có ảnh + chế độ "xem rồi học" + thanh tiến trình (2026-10-19)
- [x] Mẫu bài: trắc nghiệm, điền chỗ trống, nối cặp, sắp xếp, kéo-thả nối dây (2026-10-19)
- [x] Trò chơi: đếm hình chọn số, bắt bóng chữ, tô chữ (trace), chữ cái/đánh vần, truyện có audio (2026-10-19)
- [x] Sao, huy hiệu, bộ sưu tập sticker, chuỗi ngày (streak) (2026-10-19)
- [x] Khu vực phụ huynh: PIN, hồ sơ bé, tiến độ theo môn, gợi ý bài tiếp theo (2026-10-19)
- [x] Giới hạn thời gian chơi + màn hình nghỉ (2026-10-19)
- [x] Hỗ trợ giảm chuyển động, focus-visible, nút tắt tiếng, chỉnh tốc độ đọc (2026-10-19)
- [x] Song ngữ Việt/Anh (nút đổi ngôn ngữ) (2026-10-19)

---

## B. PHASE 0 — Chuẩn bị & kiểm toán (làm trước tiên)

- [x] **P0-01 (P1)** Đưa `AGENTS.md`, `todo.md`, `PLAN.md` vào root repo; tạo `CHANGELOG.md`, `ASSETS.md` (2026-10-19)
- [ ] **P0-02 (P1)** Tạo nhánh `main` ổn định + tag `v0-baseline`; quy ước nhánh theo `AGENTS.md` mục 8 — LƯU Ý: đã có nhiều thay đổi nên gắn tag vào **commit cũ trước 2026-10-19** (`git tag v0-baseline <hash>`); gắn thêm tag `p1-complete` ở commit hiện tại
- [x] **P0-03 (P1)** Kiểm toán code: đọc `app.js`, `sw.js`, `server.js`, `netlify/functions/*`; ghi kết quả vào `docs/audit.md` (cấu trúc, key `localStorage`, request mạng ra ngoài, hàm nào làm gì) (2026-10-19)
- [x] **P0-04 (P1)** Xác nhận cách chạy từng file `test-*.js`; ghi lệnh chuẩn vào README + `AGENTS.md` mục 9; sửa test đang đỏ (nếu có) (2026-10-19)
- [~] **P0-05 (P1)** Xác minh từng mục phần A và P1. Agent đã xác minh bằng đọc code/test tự động. **Còn lại: Nghĩa chơi thử trên tablet/điện thoại của bé** (xem checklist trong `ROADMAP-PROMPTS.md`/chat) rồi đổi thành `[x]` hoặc mở bug
- [x] **P0-06 (P1)** Xác minh nút "Bố mẹ mở thêm 15 phút" (màn hình hết giờ) **có cổng PIN** — `window.__unlockTimeLimit()` trong `app.js` dùng `prompt()` xác thực PIN (2026-10-19)
- [x] **P0-07 (P1)** Liệt kê mọi request mạng khi chạy app (Google Fonts, YouTube, Netlify functions...) và quyết định giữ/bỏ (2026-10-19)
- [x] **P0-08 (P2)** Xác định `netlify/functions` đang làm gì (đồng bộ? TTS? proxy?) và có dữ liệu bé đi ra ngoài không — Proxy TTS VieNeu, không có dữ liệu bé (2026-10-19)
- [~] **P0-09 (KHẨN)** API key VieNeu: agent đã xóa khỏi `server.js`, `netlify/functions/tts.js`, `generate_spelling_audio.js` (2026-10-19). **Chưa xong cho tới khi Nghĩa:** (1) thu hồi/xoay key tại VieNeu (key cũ còn trong lịch sử git của repo public); (2) đặt `VIENEU_API_KEY` mới trên Netlify; (3) chạy `git grep -n "vn_sk_"` rỗng; (4) kiểm tra TTS vẫn chạy
- [~] **P0-10 (P1)** Báo cáo audit: agent đã thay bằng bản redacted; còn cần chỉ giữ `docs/audit.md`, xóa `audit.md` ở root
- [ ] **P0-11 (P2)** `server.js` mặc định phục vụ `index.html`; xử lý `test-local.html` (lệch bản)
- [ ] **P0-12 (P1)** Xác minh nguồn gốc/giấy phép trong `ASSETS.md` (repo public): font HPTapViet/HPCham, thư mục `audio/` (có giọng VTV7?), điều khoản VieNeu, sprite `img-*.js`, truyện `truyencotich.top`. Chưa chắc → ghi `UNVERIFIED`, không đoán
- [~] **P0-13 (P1)** Tự động hóa kiểm tra & bump cache `sw.js`: trang bị script `test-sw-precache.js`, bắt buộc chạy `node test-sw-precache.js --fix` trước mỗi commit đổi asset, tích hợp CI GitHub Actions (2026-10-20) — xác minh bằng (đọc code: sw.js dòng 1-3) + (test: test-sw-precache.js); chờ Nghĩa kiểm tra (thiết bị: máy tính bảng Android của bé, bật chế độ máy bay)

---

## C. PHASE 1 — Chế độ "Chuẩn bị vào lớp 1" (5–6 tuổi)

- [x] **P1-00 (P1)** Lập bản đồ phân bổ 77 bài học và trò chơi theo 6 chặng (0–5) (`docs/stage-map.md`), bổ sung trường `stage` vào `activity.schema.json` & `activities-data.js`, thêm hàm truy vấn theo chặng và cập nhật bộ test schema (2026-10-19)
- [x] **P1-01 (P1)** Đặt `preschool` làm mặc định; giao diện bé chỉ hiện nội dung có `stage` 0–5; ẩn bộ chọn 3 tầng tuổi khỏi bé, chỉ phụ huynh bật trong cài đặt (cờ `show_age_tiers`, mặc định tắt) (2026-10-19)
- [x] **P1-02 (P1)** Đổi mô tả/metadata từ "4–11 tuổi" thành "5–6 tuổi, chuẩn bị vào lớp 1" (`<title>`, `description`, manifest) (2026-10-19)
- [~] **P1-03 (P1)** Đơn giản hóa header cho bé: chỉ Home, Quay lại, sao, huy hiệu; chuyển ngôn ngữ, tốc độ đọc, streak chi tiết, âm thanh vào khu phụ huynh (2026-10-19) — test tự động PASS; **chờ Nghĩa kiểm tra header ở 360px (Home+Quay lại+sao+huy hiệu có tràn/dính nhau không)**
- [~] **P1-04 (P1)** Home cho bé: tối đa 3 nút lớn (Học hôm nay · Chơi tự do · Sticker của bé), toàn icon + giọng đọc tự động khi bé chạm giữ/vào màn hình; "Học hôm nay" mở danh sách bài theo chặng (0–5); "Chơi tự do" mở các trò chơi hiện có; vùng chạm ≥ 64px, cách nhau ≥ 12px (2026-10-19) — test tự động PASS; **chờ chơi thử Home trên thiết bị**
- [~] **P1-05 (P1)** Tự động đọc to mọi câu hỏi/đề bài khi vào màn hình (tôn trọng chính sách autoplay: pendingAutoplayAudio); nút 🔊 nghe lại trên mọi màn hình bài/trò chơi (2026-10-20) — test tự động PASS; **chờ thử trên iOS Safari/Chrome Android (autoplay)**
- [x] **P1-06 (P1)** Streak "nhẹ nhàng": bỏ cảm giác mất chuỗi; thay bằng "bé đã học N ngày" (không reset gây buồn, không có thông báo mất chuỗi); dữ liệu streak cũ vẫn đọc được; cập nhật test-scoring.js (2026-10-20)
- [~] **P1-07 (P1)** Kiểm tra mọi nút ≥ 64px, khoảng cách ≥ 12px trên màn 360px và tablet ngang (2026-10-20) — kiểm tra bằng test CSS/DOM; **chờ thử trực quan ở 360px và tablet ngang**
- [x] **P1-08 (P2)** Nút "Gợi ý cho bố mẹ" (góc trái dưới) chuyển vào khu phụ huynh, tránh chồng chú mèo/nội dung (2026-10-20)
- [~] **P1-09 (P2)** Chế độ chạm thay thế cho kéo-thả nối dây và bắt bóng (bé nhỏ khó kéo chính xác) (2026-10-20) — test tự động PASS; **chờ bé thật chơi nối dây bằng chạm và bắt bóng chế độ chậm**
- [~] **P1-10 (P2)** Màn hình nghỉ ngơi nhẹ nhàng khi hết thời gian (đã có modal, rà soát lời + bỏ emoji "😴" nếu gây sợ) (2026-10-20) — test tự động PASS; **chờ thử màn hình nghỉ trên thiết bị**. Nút "mở thêm 15 phút" vẫn dùng `prompt()`, xem P5-01
- [ ] **P1-11 (P1)** Nghĩa duyệt `docs/stage-map.md`: gán `stage`/mức khó có hợp lý với bé không (53 bài hiển thị cho bé, 24 bài lớp 3–5 bị ẩn), đọc phần "khoảng trống" để chốt nội dung cần làm ở Phase 4
- [ ] **P1-12 (P1)** Định vị lại **4–6 tuổi, làm quen trước lớp 1**: sửa `<title>`, `description`, `manifest.webmanifest`, `AGE_TIERS.preschool` (hiện ghi "5–6 tuổi"); thời lượng phiên gợi ý 5–10 phút; giới hạn ngày mặc định thấp (phụ huynh chỉnh); rà 53 bài hiển thị, bài nào quá khó cho bé 4 tuổi thì đánh dấu `difficulty`/`minAge` và không dùng làm điều kiện thành thạo

---

## D. PHASE 2 — Dọn kỹ thuật (không viết lại)

- [x] **P2-01 (P1)** Tách CSS inline (~80% `index.html`) ra `styles.css`; bump cache `sw.js` (2026-10-20)
- [x] **P2-02 (P1)** Chuyển ảnh nền base64 trong CSS thành file `.webp` riêng (2026-10-20)
- [~] **P2-03 (P1)** Tự host font "Baloo 2" (woff2 weight 600 & 800 subset Latin/Vietnamese trong `fonts/`), kèm giấy phép `fonts/OFL.txt`, xóa 3 thẻ Google Fonts trong `index.html`, siết CSP trong `netlify.toml`, xóa FONT_HOSTS trong `sw.js`, xác minh 0 request ra ngoài Google (2026-10-20) — xác minh bằng (đọc code: styles.css dòng 8-19, index.html dòng 17-23, netlify.toml dòng 14) + (test: test-sw-precache.js); chờ Nghĩa kiểm tra (thiết bị: máy tính bảng Android của bé, bật chế độ máy bay)
- [ ] **P2-04 (P2)** Thống nhất danh mục môn: schema `subject` (vietnamese, math, english, science, skills) lệch với UI (math, vietnamese, reading, game, logic, trace). Chốt bảng chuẩn trong `PLAN.md` mục 5 rồi sửa schema + CSS + data
- [ ] **P2-05 (P2)** Chuyển `onclick` inline sang `addEventListener`; gom hàm toàn cục vào namespace `BLG`
- [x] **P2-06 (P2)** Module hóa `app.js`: tách trò chơi Đếm hình chọn số `countGame` ra module độc lập `games/count-game.js` (export `init(container)` và `render()`), nạp động qua dynamic `import()` với fallback `loadScriptTag` cho môi trường `file://`, đưa vào `OPT` trong `sw.js` (bump `bhv-v51`), viết `test-count-game-module.js`; 18/18 test PASS (2026-10-20)
- [x] **P2-07 (P2)** Quản lý cache `sw.js` & precache âm thanh Chặng 0–1 & số 0–20: tự sinh version từ asset-hash (`test-sw-precache.js`), nạp precache `CORE` (17 file) + `OPT` (4 file tải lười) + `OPT_AUDIO` (276 file âm thanh gồm Home, Chặng 0–1, số 0–20, đủ 6 thanh BA `syl_b_a_0..5`, và 7 từ vựng Chặng 1; tổng 12.36 MB ≤ 13 MB); sửa `normKey` & Proxy trong `audio-map.js` gọt emoji chuẩn xác, kích hoạt đúng 100% audio bài học; bump cache `bhv-v48` (2026-10-20) — xác minh bằng (đọc code: audio-map.js dòng 8-15 & 27164-27178, sw.js dòng 1-296, test-sw-precache.js dòng 1-95) + (test: test-sw-precache.js) + (thiết bị: Nghĩa đã kiểm tra trên máy tính bảng Android của bé khi bật chế độ máy bay, phát đúng giọng Tường Vy)
- [~] **P2-07b (P2)** Sinh hàng loạt 157 file audio VieNeu TTS giọng Tưởng Vy cho toàn bộ các đáp án lựa chọn bài học Chặng 0–1, nâng trần kiểm thử lên 16 MB trong `test-sw-precache.js` (`OPT_AUDIO` đạt 433 file, 15.52 MB ≤ 16 MB), cập nhật 304 cặp khóa vào `audio-map.js`, tạo `test-required-audio.js`, lập danh mục `docs/new-audio-review.md`, bump cache `bhv-v49` (2026-10-20) — xác minh bằng (đọc code: audio-map.js, sw.js, test-sw-precache.js, test-required-audio.js) + (test: test-audio-system.js, test-required-audio.js, test-sw-precache.js); chờ Nghĩa kiểm tra (thiết bị: máy tính bảng Android của bé)
- [ ] **P2-08 (P3)** Thêm `README.md` (cách chạy, cách thêm bài, cách deploy)
- [ ] **P2-09 (P3)** Thêm lint nhẹ (ESLint cấu hình tối thiểu) chạy bằng `npx`, không đổi cách build
- [ ] **P2-10 (P2)** `img-core.js` + `img-s.js` + `img-o.js` ≈ 4,3 MB ảnh base64 trong JS và `audio-map.js` ≈ 610 KB nạp đồng bộ: chuyển sang file thật/tải lazy, đo thời gian mở app trên máy của bé

---

## E. PHASE 3 — Bộ máy học (learning engine)

- [ ] **P3-01 (P1)** Schema v2: thêm `template`, `skills[]`, `prerequisites[]`, `estimatedMinutes`; giữ tương thích bản cũ; cập nhật `test-activity-schema.js`
- [ ] **P3-02 (P1)** Danh mục kỹ năng (`skills.js`) theo `PLAN.md` mục 5 (id, tên, nhóm, tiên quyết)
- [ ] **P3-03 (P1)** Ghi nhận kết quả theo kỹ năng: số lần thử, đúng/sai, lần cuối, mức thành thạo (`blg.progress.v2` + hàm migrate từ dữ liệu cũ)
- [ ] **P3-04 (P1)** Quy tắc mastery: đạt khi ≥ 4/5 đúng ở 2 phiên khác ngày; kèm unit test
- [ ] **P3-05 (P1)** "Học hôm nay": tự chọn 3 hoạt động (1 ôn lại, 1 bài mới, 1 trò chơi) trong 10–15 phút
- [ ] **P3-06 (P2)** Ôn tập giãn cách (Leitner đơn giản: +1, +3, +7, +14 ngày)
- [ ] **P3-07 (P2)** Điều chỉnh độ khó nhẹ: 3 đúng liên tiếp → tăng, 2 sai liên tiếp → giảm và cho gợi ý (không phạt)
- [ ] **P3-08 (P2)** Bản đồ hành trình (các "chặng" mở dần) thay danh sách phẳng
- [ ] **P3-09 (P3)** Khảo sát đầu vào ngắn (5 phút, do phụ huynh bật) để đặt điểm xuất phát
- [ ] **P3-10 (P2)** Hồ sơ bé có tuổi/ngày sinh (phụ huynh nhập, không hiện cho bé): tự đặt mặc định thời lượng phiên, giới hạn giờ, độ khó, chặng khởi điểm; tăng dần khi bé lớn
- [ ] **P3-11 (P1)** Thêm vào schema v2 hai trường `theme` (ban-than | gia-dinh | dong-vat | truong-hoc | do-vat-mau-sac) và `pillar` (cognition-language | fine-motor | readiness-habits); gán cho các bài hiện có

---

## F. PHASE 4 — Nội dung theo chặng (xem `PLAN.md` mục 4)

- [ ] **P4-01 (P1)** Chặng 0 — Làm quen, ưu tiên Tiếng Việt tiền đọc-viết (nghe âm đầu/vần, bắt vần, nhận mặt nguyên âm qua hình) + màu, hình, to/nhỏ, nhiều/ít; **bỏ đếm 1–5 vì bé đã đếm 1–10**: ~8–10 hoạt động, mỗi bài ≤ 4–5 câu
- [ ] **P4-02 (P1)** Chặng 1 — Nhận mặt chữ số 1–10 và đếm đúng số vật (rút gọn nếu bé đã vững) + nguyên âm đầu tiên + làm quen số 11–20: ~12 hoạt động
- [ ] **P4-03 (P1)** Chặng 2 — Phụ âm + dấu thanh + ghép vần đơn giản: ~16 hoạt động
- [ ] **P4-04 (P2)** Chặng 3 — Số 11–20, cộng/trừ trong 10 bằng hình, hình học, vị trí, quy luật: ~14 hoạt động
- [ ] **P4-05 (P2)** Chặng 4 — Đọc từ 2 tiếng, câu ngắn, tô nét/tô chữ, nghe hiểu truyện: ~14 hoạt động
- [ ] **P4-06 (P2)** Chặng 5 — Ôn tổng hợp "Sẵn sàng vào lớp 1" + phiếu báo cáo
- [ ] **P4-07 (P2)** Chạy song song, nhẹ: tiếng Anh nhập môn (ABC, màu, số 1–10) + kỹ năng sống (cảm xúc, an toàn, giờ giấc)
- [ ] **P4-08 (P2)** Ghi nguồn/giấy phép mọi hình/âm thanh vào `ASSETS.md`
- [ ] **P4-09 (P2)** Phụ huynh rà soát chính tả/dấu/phát âm từng gói nội dung (đánh dấu `reviewed: true`)
- [ ] **P4-10 (P2)** Tổ chức nội dung theo chủ đề: mỗi chặng có 2–3 chủ đề; Home/"Học hôm nay" có thể nhóm bài theo chủ đề
- [ ] **P4-11 (P2)** Toán bổ sung theo khung Logic Lab: phân loại, so sánh kích thước/màu sắc, hình khối 3D, vị trí (trên–dưới, trước–sau, trái–phải), quy luật lặp
- [ ] **P4-12 (P2)** Tiếng Việt diễn đạt: bộ câu hỏi mở cho bố mẹ hỏi bé (tự giới thiệu, kể lại truyện, bé thích gì), gắn với từng truyện/bài; bắt vần và nghe âm đầu ưu tiên hơn tô chữ

---

## G. PHASE 5 — Khu vực phụ huynh

- [~] **P5-01 (P1)** Cổng phụ huynh thống nhất, **bao gồm** mở thêm thời gian: thay `prompt()` của `__unlockTimeLimit` và `changeParentPin` bằng hộp thoại trong app (#parentPinModal); **bắt buộc tạo PIN ở lần đầu, bỏ PIN mặc định `1234`**; lưu PIN dạng băm an toàn (SHA-256 + salt ngẫu nhiên 16 bytes); tự động migrate PIN cũ; test `test-p5-parent-backup.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [x] **P5-02 (P1)** Sửa xuất/nhập: nâng cấp `LSK` + `LSV` đầy đủ 23 keys (`badges`, `kids_streak_*`, `kid_name`, `kid_avatar`, `ageTier`, `show_age_tiers`, `daily_limit_minutes`, `study_sec_*`, `bhv_act_stats`), xuất schemaVersion 2, test khứ hồi, **KHÔNG xuất PIN**, bỏ qua mọi key chứa pin khi nhập (cách xác minh: đọc code + test tự động khứ hồi)
- [~] **P5-03 (P2)** Báo cáo tuần: kỹ năng thành thạo, kỹ năng cần ôn, thời gian học 7 ngày (biểu đồ cột CSS, ngày học tích cực, đánh giá mục tiêu 5–10 phút), gợi ý hoạt động cùng bé ở nhà; test `test-p5-parent-report.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [~] **P5-07 (P2)** "Hoạt động ngoài màn hình" cho bố mẹ, gắn theo kỹ năng: vận động tinh (nặn đất chữ/số, khay cát/bột mì vẽ nét), đếm thìa dĩa dọn bàn ăn, nề nếp (1 phút dọn dẹp, sắp xếp giày dép), diễn đạt & giao tiếp (hỏi mở sau truyện). Hiển thị trong khu phụ huynh và báo cáo tuần, toggle tương tác lưu `bhv_offscreen_done` (hỗ trợ backup v2); test `test-p5-parent-report.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [~] **P5-04 (P2)** Nhiều hồ sơ bé trên một thiết bị (repo mô tả "My Daughters"): quản lý danh sách hồ sơ `bhv_profiles`, chuyển đổi qua lại giữa các bé `switchKidProfile()`, lưu snapshot tiến trình riêng biệt từng bé (`bhv_pdata_*`), thêm bé mới `createKidProfile()`, bảo vệ không xóa hồ sơ duy nhất, đồng bộ vào Backup v2; test `test-p5-profiles-settings.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [~] **P5-05 (P2)** Cài đặt tập trung: giới hạn thời gian/ngày (0, 15, 30, 45, 60 phút), bật/tắt tầng tuổi & chọn tầng tuổi học, tốc độ đọc (0.4×, 0.6×, 0.85×), ngôn ngữ (vi, en, both), giảm chuyển động (auto, 1, 0) tự động tắt pháo hoa confetti bảo vệ mắt; test `test-p5-profiles-settings.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)
- [~] **P5-06 (P3)** Mở khóa/bỏ qua chặng thủ công: phụ huynh chọn chặng học trực tiếp `setStageByParent()`, mở khóa từng chặng `unlockStage()` / khóa lại `lockStage()`, hoặc bật chế độ tự do mở khóa toàn bộ 6 chặng `toggleUnlockAllStages()` (`blg_unlock_all`), chặng khóa có biểu tượng 🔒 và lời nhắc thân thiện; test `test-p5-stage-unlock.js` PASS 100%, chờ thử trên thiết bị (cách xác minh: đọc code + test tự động + [~] thiết bị)

---

## H. PHASE 6 — Chất lượng, an toàn, phát hành

- [~] **P6-01 (P1)** Kiểm thử offline đầy đủ (airplane mode) trên Android + iOS (Add to Home Screen): đã lập tài liệu kịch bản chi tiết `docs/offline-testing-checklist.md`, chờ người dùng thử thực tế trên thiết bị (cách xác minh: đọc tài liệu + [~] thiết bị)
- [x] **P6-02 (P1)** Video YouTube an toàn: nhúng qua `youtube-nocookie.com`, thông số an toàn `rel=0&modestbranding=1&controls=1`, bọc Cổng mã PIN phụ huynh `openExternalLinkWithParentGate()` bảo vệ mọi liên kết thoát ra ngoài YouTube; test `test-p6-quality-security.js` PASS 100%
- [x] **P6-03 (P2)** Audit truy cập: đọc màn hình (`aria-label`, `role`), tương phản màu WCAG AA, `:focus-visible` viền xanh nổi bật, hỗ trợ giảm chuyển động qua `prefers-reduced-motion` và class `.rm`; test `test-p6-quality-security.js` PASS 100%
- [x] **P6-04 (P2)** Kiểm tra hiệu năng máy yếu: CSS Containment (`contain: content`), ảo hóa và phân đoạn tải 14 mục chống phình to DOM, thu hồi bộ nhớ `URL.revokeObjectURL`, dọn dẹp âm thanh IndexedDB LRU 50MB; test `test-dom-performance.js` & `test-p6-quality-security.js` PASS 100%
- [x] **P6-05 (P2)** CSP + HTTP headers an toàn trong `netlify.toml`: Content-Security-Policy (cho phép self, blob, data, youtube-nocookie, vieneu, viettelgroup), X-Frame-Options: SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy; test `test-p6-quality-security.js` PASS 100%
- [x] **P6-06 (P2)** Tích hợp CI tự động: thiết lập GitHub Actions workflow `.github/workflows/test.yml` chạy kiểm tra cú pháp và toàn bộ 15 test suites tự động khi push hoặc pull request; test `test-p6-quality-security.js` PASS 100%
- [~] **P6-07 (P1)** Checklist release v1.0 & chuẩn bị tag v1.0: đã lập tài liệu nghiệm thu kỹ thuật, sư phạm, phụ huynh và hướng dẫn gắn tag `docs/release-v1.0-checklist.md`, sẵn sàng gắn tag `v1.0` sau khi thử thiết bị (cách xác minh: đọc tài liệu + [~] thiết bị)

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
| 2026-10-20 | Phase 6 (P6-01…P6-07) | Hoàn thành toàn bộ Phase 6: Video YouTube nocookie an toàn & bọc PIN gate cho mọi link thoát; CSP + Headers bảo mật trong `netlify.toml`; GitHub Actions CI `.github/workflows/test.yml` chạy 15 test suites; Audit Accessibility (ARIA, focus-visible, reduced-motion); Tối ưu hiệu năng máy yếu; Kế hoạch & checklist offline Android/iOS `docs/offline-testing-checklist.md`; Checklist release v1.0 `docs/release-v1.0-checklist.md`; 15/15 test PASS |
| 2026-10-20 | Fix Home CSS & Hover Audio | Sửa lỗi vỡ khung 3 nút lớn Home (thiếu `}` ở `@keyframes bubbleFloatUp`), gỡ bỏ `onmouseenter` tránh giọng máy khi hover, chuẩn hóa `speakKidBtn` phát trực tiếp file MP3 VieNeu, bổ sung alias `audio-map.js`, bump sw `bhv-v44`; 15/15 test PASS |
| 2026-10-20 | P2-03, P0-13, P2-07 (phần 1) | Tự host font Baloo 2 (woff2 600 & 800 subset) kèm fonts/OFL.txt; xóa 3 thẻ Google Fonts; siết CSP netlify.toml (0 request google); sw.js quản lý qua test-sw-precache.js --fix; CI test.yml; 16/16 test PASS |
| 2026-10-20 | P2-07 (phần 2 - phân tích) | Lập báo cáo đo lường & phân loại 3,197 file âm thanh (65.61 MB) tại `docs/audio-precache-plan.md`; xác định gói Home + Chặng 0–1 (242 file, 11.85 MB); đánh giá rủi ro 3 phương án; nêu câu hỏi cho chủ dự án |
| 2026-10-20 | P2-07 (phần 3) & Q3 | Cấu hình precache âm thanh Phương án (b) vào `sw.js` (242 file, 11.85 MB) qua `OPT_AUDIO` cho Home & Chặng 0–1; nâng cấp `test-sw-precache.js`; bump cache `bhv-v46`; ghi nhận thiết bị bé (tablet Android > 2GB trống, Wifi) |
| 2026-10-20 | P2-07 (siết test) | Nâng cấp `test-sw-precache.js`: kiểm tra 100% file `OPT_AUDIO` tồn tại (thiếu là FAIL), khống chế dung lượng ≤ 13 MB (đo 11.85 MB), quét cảnh báo 11 file số 0–10 hardcoded trong `app.js`; 16/16 test PASS |
| 2026-10-20 | P2-07 (bổ sung audio số & Chặng 0–1) | Bổ sung 26 file âm thanh vào `OPT_AUDIO` trong `sw.js` (11 file số 0–10 từ `numMap`, 10 file số 11–20 từ `audio-map.js`, 4 file âm tiết bài Chữ A VTV7, 1 file mèo chào Trang chủ); tổng `OPT_AUDIO` 268 file (12.18 MB ≤ 13 MB); sạch 0 WARN; bump cache `bhv-v47`; 16/16 test PASS |

| 2026-10-20 | P2-07 (lọc emoji audio & nạp 8 file nhóm b) | Cập nhật `normKey` & Proxy trong `audio-map.js` lọc emoji Unicode `\p{Extended_Pictographic}` và VS16, kích hoạt chính xác 49 audio bài học Chặng 0–1 có emoji; nạp 8 file nhóm b vào `OPT_AUDIO` (gồm `syl_b_a_4.mp3` "bã" và 7 file từ vựng Chặng 1, tổng 276 file ~12.36 MB ≤ 13 MB); bump cache `bhv-v48`; 16/16 test PASS |
| 2026-10-20 | P2-07b (sinh hàng loạt VieNeu Chặng 0–1) | Sinh 157/157 file audio VieNeu TTS Tưởng Vy cho các lựa chọn Chặng 0–1 (tổng 3.16 MB mới, 2,374 ký tự); bổ sung 304 cặp khóa vào `audio-map.js`; nâng trần kiểm thử lên 16 MB trong `test-sw-precache.js` (`OPT_AUDIO` đạt 433 file, 15.52 MB ≤ 16 MB); lập `test-required-audio.js` và `docs/new-audio-review.md`; bump cache `bhv-v49`; 17/17 test PASS |
| 2026-10-23 | Góc vui chơi RV & Sáng tạo Montessori (P4-Games) | Gộp & mở rộng Góc vui chơi (`games/toddler-games.js` + `games/creative-games.js`): Chơi liên tục không giới hạn (Endless Loop) & Hộp Quà Bất Ngờ (`randomMixGame`), tăng độ khó +20%, thêm Tô màu vùng SVG & Bút phát sáng (lưu tự động IndexedDB tối đa 20 bức), Nối chấm theo số & Tự vẽ, Vẽ theo trí nhớ & Từng bước, Khung 10 ô (`2×5`), Nối cặp lưới `2×2`/`3×2` (có Hoàn tác & Gợi ý), Chủ đề màu theo mùa & Khoảng số `1–5`/`1–10`/`1–20`; trích xuất file `danh-sach-giong-doc-huong-dan.txt`; 18/18 test PASS |