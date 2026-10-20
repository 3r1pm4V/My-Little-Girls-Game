# ASSETS.md — Quản lý Bản quyền & Nguồn gốc Tài nguyên

Dự án ưu tiên an toàn, giáo dục trẻ em, không thương mại hóa, chạy offline.

---

## 1. Font chữ (Typography)

* **Font Tiếng Việt AnjaVN (`font-vn.ttf`)**:
  * Mục đích: Hiển thị chữ tiêu đề và nhãn giao diện tiếng Việt.
  * Trạng thái: Lưu trữ nội bộ trong repo, nạp offline.
* **Font Luyện chữ đẹp Tiểu học (`font-tapviet.ttf` & `font-tapviet-cham.ttf`)**:
  * Tên: HPTapViet và HPCham (bản quyền tác giả Hải Phòng / Bộ GD&ĐT chuẩn nét chữ tiểu học).
  * Mục đích: Luyện viết chữ đẹp, nét chấm tập tô, mẫu chữ chuẩn cho bé 5–6 tuổi và lớp 1.
  * Trạng thái: Lưu trữ nội bộ trong repo, nạp offline.
* **Font Baloo 2 (`fonts/baloo2-600.woff2` & `fonts/baloo2-800.woff2`)**:
  * Tác giả / Bản quyền: The Baloo 2 Project Authors (EkType, https://github.com/EkType/Baloo2).
  * Nguồn gốc: Dự án mã nguồn mở Google Fonts (https://github.com/google/fonts/tree/main/ofl/baloo2).
  * Giấy phép: **SIL Open Font License, Version 1.1** (Bằng chứng đính kèm nguyên văn tại [`fonts/OFL.txt`](fonts/OFL.txt)).
  * Mục đích: Font chữ bo tròn thân thiện, dễ đọc cho trẻ 4–6 tuổi.
  * Tối ưu hóa (Task P2-03): Subset chỉ giữ lại các dải ký tự Latin, Latin-Ext và Tiếng Việt; định dạng WOFF2 nén cao (weight 600: 31.2 KB, weight 800: 29.0 KB). Lưu trữ 100% nội bộ trong repo, nạp offline qua Service Worker precache.

---

## 2. Âm thanh (Audio & Speech)

* **Thư viện âm thanh từ vựng cục bộ (`audio/*.mp3`)**:
  * Số lượng: 2,955 file (51.2 MB).
  * Nguồn tạo: Sinh từ mô hình AI VieNeu TTS (`vieneu-v4`, giọng đọc cô giáo Tưởng Vy #11).
  * Mục đích: Phát âm chuẩn từng âm tiết, chữ cái, tiếng mở, câu đánh vần và lời khen ngợi.
  * Bản quyền: Thuộc dự án cá nhân, cấp quyền sử dụng phi thương mại cho bé.
* **Gói âm thanh bổ sung Chặng 0–1 (157 file mới sinh, Task P2-07)**:
  * Nguồn gốc: VieNeu TTS (`api.vieneu.io`, model `vieneu-v4`), giọng Tưởng Vy (#11), sinh ngày 2026-10-20.
  * Danh mục: 157 file phát âm các đáp án lựa chọn bài học con vật Mầm non Chặng 0, bài chữ cái VTV7 Chặng 1, ghép thẻ số lượng táo và hướng dẫn Cổng PIN phụ huynh.
  * Tổng dung lượng: 3.31 MB (3,311,769 bytes).
  * Điều khoản sử dụng: **UNVERIFIED** (chờ Nghĩa nghe duyệt thực tế trên máy tính bảng trước khi công nhận chuẩn giáo dục, danh mục kiểm tra tại `docs/new-audio-review.md`).
* **Âm thanh hiệu ứng giao diện (SFX)**:
  * Nguồn: Sinh trực tiếp bằng trình duyệt qua **Web Audio API** (`OscillatorNode`, `GainNode`).
  * Bao gồm: `sfxTap` (chạm nút), `sfxOk` (làm đúng), `sfxFanfare` (hoàn thành bài), `sfxPop` (nổ bóng chữ), `sfxDeflate` (xẹp bóng).
  * Bản quyền: 100% mã nguồn mở tự tạo, không có file audio ngoài.

---

## 3. Hình ảnh & Đồ họa (Graphics & Icons)

* **Nhân vật Chú Mèo Mimi đồng hành (`img-core.js`)**:
  * Các trạng thái: `cat_idle`, `cat_happy`, `cat_sad`, `cat_thinking`, `cat_celebrate`, `cat_pointing`.
  * Định dạng: SVG và ảnh tối ưu WebP Base64 tích hợp trực tiếp.
* **Hình ảnh minh họa chữ cái & đồ vật**:
  * Định dạng: SVG vector màu sắc tươi sáng, tương phản cao, tối ưu cho mắt trẻ em.
  * Nguồn: Bộ icon giáo dục mã nguồn mở và đồ họa tự thiết kế.

---

## 4. Video & Truyện đọc ngoài

* **Video Chữ cái VTV7 ("ABC Vui từng giờ")**:
  * Bản quyền: Kênh truyền hình Giáo dục Quốc gia VTV7.
  * Phương thức nhúng: `youtube-nocookie.com`, `rel=0` qua iframe học tập không thương mại.
* **Video Đánh vần Cô Lan Anh**:
  * Bản quyền: Kênh Cô Lan Anh Đánh Vần Tiền Tiểu Học.
  * Phương thức nhúng: `youtube-nocookie.com`, `rel=0`.
* **Kho truyện cổ tích (`stories-catalog.js`)**:
  * Nguồn văn bản & audio: `truyencotich.top` (phi thương mại).
