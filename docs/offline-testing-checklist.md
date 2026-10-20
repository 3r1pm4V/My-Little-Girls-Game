# Kế Hoạch & Checklist Kiểm Thử Offline (P6-01)
### Ứng dụng "Bé học vui" (Progressive Web App - Offline First)

Tài liệu này hướng dẫn chi tiết quy trình kiểm thử chế độ ngoại tuyến (Airplane mode / Không có mạng) trên cả hai hệ điều hành **Android (Chrome)** và **iOS (Safari)**.

---

## 1. Nguyên Tắc Thiết Kế Offline-First Của Ứng Dụng
- **100% tài nguyên cốt lõi được precache**: HTML, CSS tách rời (`styles.css`), ảnh nền tách rời (`bg.webp`), Javascript (`app.js`, `activities-data.js`, `audio-map.js`, `img-core.js`), 3 bộ font tiếng Việt (`font-vn.ttf`, `font-tapviet.ttf`, `font-tapviet-cham.ttf`), manifest và icon.
- **Service Worker (`sw.js`)**: Cache chiến lược Cache-First cho tài nguyên tĩnh, tự động clone và lưu phản hồi mạng khi có kết nối, fallback về `index.html` nếu điều hướng bị gián đoạn.
- **Âm thanh chuẩn hóa (VieNeu MP3 Caching)**: Toàn bộ 241 file âm thanh giao diện và bài học cốt lõi đã được lưu cục bộ trong `audio/` và ánh xạ qua `audio-map.js`. Âm thanh mới được tự động lưu trong IndexedDB (dung lượng tối đa 50MB với thuật toán dọn dẹp LRU).

---

## 2. Checklist Kiểm Thử Trên Thiết Bị Android (Chrome / Samsung Internet)

| STT | Bước thực hiện | Kỳ vọng đạt | Kết quả |
| :---: | :--- | :--- | :---: |
| 1 | Mở trình duyệt Chrome trên điện thoại/máy tính bảng Android, truy cập URL ứng dụng. | Trang tải nhanh, không báo lỗi kết nối. Nút cài đặt ứng dụng (PWA) hoặc thông báo "Thêm vào màn hình chính" xuất hiện. | [ ] Đạt |
| 2 | Bấm **"Cài ứng dụng"** hoặc menu Chrome (⋮) → **"Cài đặt ứng dụng"** (Install App). | Biểu tượng "Bé học vui" xuất hiện trên màn hình chính với icon sắc nét (192px/512px). | [ ] Đạt |
| 3 | Mở ứng dụng từ màn hình chính (Standalone PWA mode). | Khởi động độc lập, không có thanh địa chỉ URL của trình duyệt, thanh điều hướng hiển thị đúng màu chủ đạo. | [ ] Đạt |
| 4 | **BẬT CHẾ ĐỘ MÁY BAY (AIRPLANE MODE)** và tắt hoàn toàn Wi-Fi + 4G/5G. | Thiết bị ngắt kết nối Internet hoàn toàn. | [ ] Đạt |
| 5 | Tắt ứng dụng từ danh sách đa nhiệm (kill app process) rồi mở lại từ màn hình chính. | Ứng dụng vẫn mở ngay lập tức, không xuất hiện màn hình khủng long Offline của Chrome. | [ ] Đạt |
| 6 | Thao tác 3 nút lớn trang chủ: **Học hôm nay**, **Chơi tự do**, **Sticker của bé**. | Màn hình chuyển đổi mượt mà, âm thanh câu chào và hướng dẫn phát to rõ từ file MP3 local. | [ ] Đạt |
| 7 | Làm trọn vẹn 1 bài học bất kỳ trong Chặng 0 hoặc Chặng 1 (ví dụ: Bé làm quen động vật, đếm số 1–5). | Âm thanh câu hỏi, hiệu ứng đúng/sai, số sao cộng dồn và lưu vào `localStorage` bình thường. | [ ] Đạt |
| 8 | Vào Bảng điều khiển phụ huynh qua Cổng PIN (nhập mã PIN 4 số). | Hộp thoại xác thực mở nhanh, hiển thị báo cáo tuần, tiến độ sao và danh sách hoạt động ngoại khóa. | [ ] Đạt |
| 9 | Bấm "Sao lưu tiến độ" trong mục Cài đặt. | File `.json` sao lưu v2 tải xuống máy thành công dù không có mạng. | [ ] Đạt |

---

## 3. Checklist Kiểm Thử Trên Thiết Bị iOS / iPadOS (Safari)

| STT | Bước thực hiện | Kỳ vọng đạt | Kết quả |
| :---: | :--- | :--- | :---: |
| 1 | Mở Safari trên iPhone / iPad, truy cập URL ứng dụng. | Trang tải đầy đủ font chữ đẹp, icon chú mèo và bố cục đáp ứng chuẩn. | [ ] Đạt |
| 2 | Chạm nút **Share** (biểu tượng ô vuông mũi tên lên) → **"Thêm vào MH chính"** (Add to Home Screen). | Icon ứng dụng được thêm vào màn hình chính với tên "Bé học vui". | [ ] Đạt |
| 3 | Mở ứng dụng từ màn hình chính (WebClip PWA). | Chạy ở chế độ toàn màn hình (`apple-mobile-web-app-capable`). | [ ] Đạt |
| 4 | **BẬT CHẾ ĐỘ MÁY BAY (AIRPLANE MODE)** và tắt Wi-Fi. | Máy ngắt mạng hoàn toàn. | [ ] Đạt |
| 5 | Khởi động lại ứng dụng ngoại tuyến. | App mở ngay lập tức từ Service Worker Cache. | [ ] Đạt |
| 6 | Thao tác chơi mini-game: Đếm hình chọn số, bắt bóng chữ cái, nối thẻ. | Chạm mượt mà, âm thanh hiệu ứng Web Audio API và MP3 phát chuẩn xác. | [ ] Đạt |
| 7 | Chạm giữ nút để nghe đọc tên bài học / câu chào. | Giọng cô giáo đọc to rõ, không bị câm tiếng. | [ ] Đạt |
| 8 | Thử tạo thêm hồ sơ bé mới (Bé thứ 2) và chuyển đổi qua lại. | Lưu trữ `localStorage` cục bộ độc lập, đổi bé mượt mà. | [ ] Đạt |

---

## 4. Các Tình Huống Ngoại Lệ & Hướng Xử Lý Khi Mất Mạng
1. **Video YouTube (Video Quiz / Cô Lan Anh / VTV7)**:
   - Khi không có mạng, `iframe` YouTube sẽ hiển thị thông báo offline của YouTube.
   - **Xử lý an toàn**: Ứng dụng đã có cơ chế bao bọc, cung cấp tóm tắt bài học, câu hỏi tương tác và giải thích đáp án bằng giọng đọc cục bộ (`exp_1.mp3`, `q_1.mp3`) để bé vẫn học và trả lời câu hỏi đạt sao bình thường mà không phụ thuộc vào video stream.
2. **Âm thanh từ vựng chưa có trong bộ MP3 offline**:
   - Tự động chuyển tầng ưu tiên sang Web Speech API tích hợp sẵn của hệ điều hành (Siri trên iOS, Google TTS trên Android) hoạt động hoàn toàn offline mà không cần Internet.
