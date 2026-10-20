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
* **Font Baloo 2**:
  * Nguồn: Google Fonts (SIL Open Font License).
  * Mục đích: Font chữ tròn trịa, thân thiện cho trẻ nhỏ.
  * Kế hoạch (Task P2-03): Tải về lưu nội bộ trong repo để không phụ thuộc kết nối Google Fonts.

---

## 2. Âm thanh (Audio & Speech)

* **Thư viện âm thanh từ vựng cục bộ (`audio/*.mp3`)**:
  * Số lượng: 2,955 file (51.2 MB).
  * Nguồn tạo: Sinh từ mô hình AI VieNeu TTS (`vieneu-v4`, giọng đọc cô giáo Tưởng Vy #11).
  * Mục đích: Phát âm chuẩn từng âm tiết, chữ cái, tiếng mở, câu đánh vần và lời khen ngợi.
  * Bản quyền: Thuộc dự án cá nhân, cấp quyền sử dụng phi thương mại cho bé.
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
