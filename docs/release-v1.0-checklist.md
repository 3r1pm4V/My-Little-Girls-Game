# Checklist Phát Hành Phiên Bản v1.0 (P6-07)
### Ứng dụng Giáo Dục "Bé học vui" (4–6 Tuổi, Chuẩn Bị Vào Lớp 1)

Tài liệu này tổng hợp toàn bộ các tiêu chí nghiệm thu chất lượng kỹ thuật, an toàn dữ liệu và trải nghiệm người dùng trước khi gắn thẻ phát hành chính thức `git tag v1.0`.

---

## 1. Tiêu Chí Nghiệm Thu Kỹ Thuật (Engineering Quality)

- [x] **Tách rời CSS & Tài nguyên độc lập (P2-01, P2-02)**:
  - Toàn bộ CSS inline trong `index.html` đã được tách sang `styles.css`.
  - Ảnh nền base64 đã được trích xuất thành file nhị phân `bg.webp` (15KB).
  - Precache đầy đủ trong `sw.js` phiên bản `bhv-v43`.
- [x] **Hiệu Năng & Tối Ưu Hóa (P6-04)**:
  - Áp dụng CSS Containment (`contain: content`) cho các thành phần danh sách.
  - Ảo hóa danh sách và cuộn vô tận (Infinite Scroll) với phân đoạn nạp 14 mục.
  - Thuật toán kiểm soát bộ nhớ âm thanh IndexedDB LRU Eviction tối đa 50MB.
  - Thu hồi bộ nhớ Blob (`URL.revokeObjectURL`) khi thay thế hoặc xóa file ghi âm.
- [x] **Bảo Mật & An Toàn Web (P6-05)**:
  - Cấu hình CSP (Content-Security-Policy) chặt chẽ trong `netlify.toml`.
  - Thiết lập HTTP Headers an toàn: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
  - File `.env` chứa bí mật API được bảo vệ bởi `.gitignore`, không bao giờ được commit hay push.
- [x] **Tích Hợp Tự Động (P6-06)**:
  - Thiết lập GitHub Actions workflow (`.github/workflows/test.yml`) chạy tự động kiểm tra cú pháp và toàn bộ 15 test suites khi push/pull request trên nhánh `main`.

---

## 2. Tiêu Chí Nghiệm Thu Sư Phạm & Trải Nghiệm Bé 4–6 Tuổi

- [x] **Định Vị Độ Tuổi & Tối Giản Giao Diện (P1-01, P1-04, P1-12)**:
  - Trang chủ cho bé thiết kế 3 nút lớn trực quan: **Học hôm nay** 🎒, **Chơi tự do** 🎮, **Sticker của bé** 🏆.
  - Vùng chạm đạt chuẩn công thái học trẻ em: kích thước tối thiểu $\ge 64\times 64\text{px}$, khoảng cách giữa các phần tử $\ge 12\text{px}$.
  - Hỗ trợ âm thanh tự động đọc đề bài và đọc khi chạm giữ vào các nút lớn.
- [x] **Lộ Trình Làm Quen 6 Chặng (P1-02, P5-06)**:
  - 31 bài học mầm non cốt lõi làm quen trước lớp 1 (chữ cái đơn, đếm số 1–10, vận động tinh, đọc truyện).
  - Chuyển toàn bộ 24 bài tập quá khó (ghép vần phức tạp, phép tính lớp 1) sang giai đoạn lớp 1.
  - Phụ huynh có thể mở khóa hoặc khóa từng chặng, hoặc mở khóa tự do toàn bộ 6 chặng linh hoạt.
- [x] **Tâm Lý Trẻ Em & Thói Quen Lành Mạnh (P1-06, P1-10)**:
  - Chuỗi ngày streak tích lũy nhẹ nhàng, không bị reset về 0 khi bé nghỉ vài ngày, bảo vệ tâm lý không làm bé buồn.
  - Hộp thoại nghỉ ngơi giữ mắt sáng ấm áp, hình ảnh chú mèo vui vẻ (xóa bỏ hoàn toàn emoji mặt ngủ 😴).
  - Giới hạn thời gian màn hình hằng ngày (5–10 phút/ngày khuyến nghị).

---

## 3. Tiêu Chí Nghiệm Thu Khu Vực Phụ Huynh (Parent Zone)

- [x] **Cổng Phụ Huynh Thống Nhất & Mã Hóa PIN (P5-01)**:
  - Xóa bỏ hoàn toàn `window.prompt()`, thay bằng bàn phím số `#parentPinModal` chuẩn touch target $\ge 64\text{px}$.
  - Mã PIN 4 số được băm muối SHA-256 an toàn với salt ngẫu nhiên 16 bytes.
- [x] **Sao Lưu & Khôi Phục Dữ Liệu v2 (P5-02)**:
  - Khôi phục khứ hồi đầy đủ 25+ keys trạng thái của bé.
  - Tuyệt đối KHÔNG xuất hoặc ghi đè mã PIN qua file sao lưu.
- [x] **Báo Cáo Học Tập Tuần & Hoạt Động Ngoài Màn Hình (P5-03, P5-07)**:
  - Biểu đồ cột CSS nhẹ trực quan hóa thời lượng học 7 ngày qua.
  - Phân loại kỹ năng: Đã vững vàng / Đang rèn luyện / Cần ôn lại.
  - 6 hoạt động ngoại khóa thực tế gắn với bài học để bố mẹ cùng bé trải nghiệm và tích dấu hoàn thành.
- [x] **Đa Hồ Sơ Bé & Cài Đặt Tập Trung (P5-04, P5-05)**:
  - Quản lý độc lập hồ sơ nhiều bé trên cùng thiết bị, chuyển đổi tức thì không lẫn lộn sao hay streak.
  - Cài đặt tập trung: giới hạn thời gian, ngôn ngữ, tốc độ đọc, giảm chuyển động, âm thanh.
- [x] **An Toàn Khi Xem Video (P6-02)**:
  - Toàn bộ video nhúng qua `youtube-nocookie.com` với `rel=0&modestbranding=1&controls=1`.
  - Mọi liên kết thoát ra ngoài đều được bảo vệ bởi Cổng PIN phụ huynh, ngăn bé vô ý thoát ra ngoài môi trường không an toàn.

---

## 4. Lệnh Gắn Git Tag Phát Hành
Sau khi hoàn tất kiểm thử thực tế trên thiết bị:
```bash
git add .
git commit -m "chore(release): release version v1.0"
git tag -a v1.0 -m "Release version 1.0 — Bé học vui (4–6 tuổi, làm quen trước lớp 1)"
git push origin main --tags
```
