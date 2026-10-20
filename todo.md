# todo.md — My-Little-Girls-Game ("Bé học vui")

Cập nhật lần cuối: 2026-10-19
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

### Tính năng (đã xác minh trong mã nguồn ngày 2026-10-19)
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
- [ ] **P0-02 (P1)** Tạo nhánh `main` ổn định + tag `v0-baseline`; quy ước nhánh theo `AGENTS.md` mục 8
- [x] **P0-03 (P1)** Kiểm toán code: đọc `app.js`, `sw.js`, `server.js`, `netlify/functions/*`; ghi kết quả vào `docs/audit.md` (cấu trúc, key `localStorage`, request mạng ra ngoài, hàm nào làm gì) (2026-10-19)
- [x] **P0-04 (P1)** Xác nhận cách chạy từng file `test-*.js`; ghi lệnh chuẩn vào README + `AGENTS.md` mục 9; sửa test đang đỏ (nếu có) (2026-10-19)
- [x] **P0-05 (P1)** Xác minh từng mục `[~]` ở phần A bằng cách chơi thử trên tablet/điện thoại của bé; đổi thành `[x]` hoặc mở bug (2026-10-19)
- [x] **P0-06 (P1)** Xác minh nút "Bố mẹ mở thêm 15 phút" (màn hình hết giờ) **có cổng PIN** — `window.__unlockTimeLimit()` trong `app.js` dùng `prompt()` xác thực PIN (2026-10-19)
- [x] **P0-07 (P1)** Liệt kê mọi request mạng khi chạy app (Google Fonts, YouTube, Netlify functions...) và quyết định giữ/bỏ (2026-10-19)
- [x] **P0-08 (P2)** Xác định `netlify/functions` đang làm gì (đồng bộ? TTS? proxy?) và có dữ liệu bé đi ra ngoài không — Proxy TTS VieNeu, không có dữ liệu bé (2026-10-19)

---

## C. PHASE 1 — Chế độ "Chuẩn bị vào lớp 1" (5–6 tuổi)

- [x] **P1-00 (P1)** Lập bản đồ phân bổ 77 bài học và trò chơi theo 6 chặng (0–5) (`docs/stage-map.md`), bổ sung trường `stage` vào `activity.schema.json` & `activities-data.js`, thêm hàm truy vấn theo chặng và cập nhật bộ test schema (2026-10-19)
- [x] **P1-01 (P1)** Đặt `preschool` làm mặc định; giao diện bé chỉ hiện nội dung có `stage` 0–5; ẩn bộ chọn 3 tầng tuổi khỏi bé, chỉ phụ huynh bật trong cài đặt (cờ `show_age_tiers`, mặc định tắt) (2026-10-19)
- [x] **P1-02 (P1)** Đổi mô tả/metadata từ "4–11 tuổi" thành "5–6 tuổi, chuẩn bị vào lớp 1" (`<title>`, `description`, manifest) (2026-10-19)
- [x] **P1-03 (P1)** Đơn giản hóa header cho bé: chỉ Home, Quay lại, sao, huy hiệu; chuyển ngôn ngữ, tốc độ đọc, streak chi tiết, âm thanh vào khu phụ huynh (2026-10-19)
- [x] **P1-04 (P1)** Home cho bé: tối đa 3 nút lớn (Học hôm nay · Chơi tự do · Sticker của bé), toàn icon + giọng đọc tự động khi bé chạm giữ/vào màn hình; "Học hôm nay" mở danh sách bài theo chặng (0–5); "Chơi tự do" mở các trò chơi hiện có; vùng chạm ≥ 64px, cách nhau ≥ 12px (2026-10-19)
- [x] **P1-05 (P1)** Tự động đọc to mọi câu hỏi/đề bài khi vào màn hình (tôn trọng chính sách autoplay: pendingAutoplayAudio); nút 🔊 nghe lại trên mọi màn hình bài/trò chơi (2026-10-20)
- [x] **P1-06 (P1)** Streak "nhẹ nhàng": bỏ cảm giác mất chuỗi; thay bằng "bé đã học N ngày" (không reset gây buồn, không có thông báo mất chuỗi); dữ liệu streak cũ vẫn đọc được; cập nhật test-scoring.js (2026-10-20)
- [x] **P1-07 (P1)** Kiểm tra mọi nút ≥ 64px, khoảng cách ≥ 12px trên màn 360px và tablet ngang (2026-10-20)
- [x] **P1-08 (P2)** Nút "Gợi ý cho bố mẹ" (góc trái dưới) chuyển vào khu phụ huynh, tránh chồng chú mèo/nội dung (2026-10-20)
- [x] **P1-09 (P2)** Chế độ chạm thay thế cho kéo-thả nối dây và bắt bóng (bé nhỏ khó kéo chính xác) (2026-10-20)
- [x] **P1-10 (P2)** Màn hình nghỉ ngơi nhẹ nhàng khi hết thời gian (đã có modal, rà soát lời + bỏ emoji "😴" nếu gây sợ) (2026-10-20)

---

## D. PHASE 2 — Dọn kỹ thuật (không viết lại)

- [ ] **P2-01 (P1)** Tách CSS inline (~80% `index.html`) ra `styles.css`; bump cache `sw.js`
- [ ] **P2-02 (P1)** Chuyển ảnh nền base64 trong CSS thành file `.webp` riêng
- [ ] **P2-03 (P1)** Tự host font "Baloo 2" (hiện nạp từ Google Fonts → offline sẽ lỗi, đồng thời có request ra ngoài)
- [ ] **P2-04 (P2)** Thống nhất danh mục môn: schema `subject` (vietnamese, math, english, science, skills) lệch với UI (math, vietnamese, reading, game, logic, trace). Chốt bảng chuẩn trong `PLAN.md` mục 5 rồi sửa schema + CSS + data
- [ ] **P2-05 (P2)** Chuyển `onclick` inline sang `addEventListener`; gom hàm toàn cục vào namespace `BLG`
- [ ] **P2-06 (P2)** Chia `app.js` thành module theo chức năng (router, progress, audio, templates, parent) — giữ nguyên hành vi, test trước/sau
- [ ] **P2-07 (P2)** Quản lý cache `sw.js`: tự sinh version từ hash, precache danh sách asset, trang offline dự phòng
- [ ] **P2-08 (P3)** Thêm `README.md` (cách chạy, cách thêm bài, cách deploy)
- [ ] **P2-09 (P3)** Thêm lint nhẹ (ESLint cấu hình tối thiểu) chạy bằng `npx`, không đổi cách build

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

---

## F. PHASE 4 — Nội dung theo chặng (xem `PLAN.md` mục 4)

- [ ] **P4-01 (P1)** Chặng 0 — Làm quen (màu, hình, to/nhỏ, nhiều/ít, đếm 1–5, nghe âm đầu): ~8 hoạt động
- [ ] **P4-02 (P1)** Chặng 1 — Số 1–10 + nguyên âm đầu tiên: ~12 hoạt động
- [ ] **P4-03 (P1)** Chặng 2 — Phụ âm + dấu thanh + ghép vần đơn giản: ~16 hoạt động
- [ ] **P4-04 (P2)** Chặng 3 — Số 11–20, cộng/trừ trong 10 bằng hình, hình học, vị trí, quy luật: ~14 hoạt động
- [ ] **P4-05 (P2)** Chặng 4 — Đọc từ 2 tiếng, câu ngắn, tô nét/tô chữ, nghe hiểu truyện: ~14 hoạt động
- [ ] **P4-06 (P2)** Chặng 5 — Ôn tổng hợp "Sẵn sàng vào lớp 1" + phiếu báo cáo
- [ ] **P4-07 (P2)** Chạy song song, nhẹ: tiếng Anh nhập môn (ABC, màu, số 1–10) + kỹ năng sống (cảm xúc, an toàn, giờ giấc)
- [ ] **P4-08 (P2)** Ghi nguồn/giấy phép mọi hình/âm thanh vào `ASSETS.md`
- [ ] **P4-09 (P2)** Phụ huynh rà soát chính tả/dấu/phát âm từng gói nội dung (đánh dấu `reviewed: true`)

---

## G. PHASE 5 — Khu vực phụ huynh

- [ ] **P5-01 (P1)** Cổng phụ huynh thống nhất (PIN hoặc phép tính ngẫu nhiên) cho mọi thao tác nhạy cảm, **bao gồm** mở thêm thời gian
- [ ] **P5-02 (P1)** Xuất/nhập tiến độ (JSON) để sao lưu, đổi thiết bị
- [ ] **P5-03 (P2)** Báo cáo tuần: kỹ năng thành thạo, kỹ năng cần ôn, thời gian học, gợi ý hoạt động cùng bé ở nhà
- [ ] **P5-04 (P2)** Nhiều hồ sơ bé trên một thiết bị (repo mô tả "My Daughters")
- [ ] **P5-05 (P2)** Cài đặt: giới hạn thời gian/ngày, bật/tắt tầng tuổi, tốc độ đọc, ngôn ngữ, giảm chuyển động
- [ ] **P5-06 (P3)** Mở khóa/bỏ qua chặng thủ công

---

## H. PHASE 6 — Chất lượng, an toàn, phát hành

- [ ] **P6-01 (P1)** Kiểm thử offline đầy đủ (airplane mode) trên Android + iOS (Add to Home Screen)
- [ ] **P6-02 (P1)** Thay/gói nội dung YouTube bằng video local, hoặc `youtube-nocookie` + `rel=0` + chặn link thoát
- [ ] **P6-03 (P2)** Audit truy cập: đọc màn hình, tương phản AA, focus, giảm chuyển động
- [ ] **P6-04 (P2)** Kiểm tra hiệu năng trên máy yếu (mở app < 3s, 60fps ở game bắt bóng) — dùng `test-dom-performance.js`
- [ ] **P6-05 (P2)** Thêm test cho: mastery, lập kế hoạch ngày, migrate dữ liệu, giới hạn thời gian
- [ ] **P6-06 (P3)** CSP + header bảo mật qua `netlify.toml`
- [ ] **P6-07 (P3)** Thiết lập GitHub Actions chạy test khi push

---

## I. Câu hỏi mở (chủ dự án trả lời để agent khỏi đoán)

- [ ] **Q1** Bé nhà mình bao nhiêu tuổi, và bé đã biết gì rồi (chữ cái? đếm đến mấy? cầm bút tô được chưa)?
- [ ] **Q2** Trường/lớp 1 dự kiến dùng bộ sách nào (Cánh Diều / Kết nối tri thức / Chân trời sáng tạo)? → quyết định thứ tự chữ cái
- [ ] **Q3** Thiết bị bé dùng: tablet hay điện thoại, Android hay iOS? có bút cảm ứng không?
- [ ] **Q4** Có một hay nhiều bé dùng chung (repo ghi "Daughters")?
- [ ] **Q5** `netlify/functions` đang dùng để làm gì?
- [ ] **Q6** Có muốn giữ tầng `grade1_2`, `grade3_5` để dùng sau không?

---

## Nhật ký

| Ngày | Task | Ghi chú |
|------|------|---------|
| 2026-10-19 | — | Tạo `AGENTS.md`, `todo.md`, `PLAN.md` |
