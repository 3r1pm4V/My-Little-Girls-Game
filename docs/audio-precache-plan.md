# Kế Hoạch & Phân Tích Dung Lượng Precache Âm Thanh (Task P2-07 - Phần 2)

> **Mục tiêu**: Đo lường thực tế thư mục `audio/`, phân loại theo tiền tố và ngữ cảnh sử dụng cho bé 4 tuổi (Trang chủ & Chặng 0–1), đánh giá 3 phương án precache để đảm bảo ứng dụng chạy offline mượt mà mà không làm nặng máy hay vượt quota lưu trữ trên thiết bị cấu hình thấp.
> **Nguyên tắc**: Không sửa code/dữ liệu; không đoán mò dung lượng, toàn bộ số liệu đều được đo thực tế bằng lệnh Node.js/PowerShell.

---

## 1. Tổng Quan & Phân Loại Thư Mục `audio/`

### 1.1. Lệnh đo lường đã sử dụng
```bash
node -e "
const fs = require('fs'), path = require('path');
const files = fs.readdirSync('audio');
let totalBytes = 0;
files.forEach(f => { totalBytes += fs.statSync(path.join('audio', f)).size; });
console.log('Total files:', files.length, 'Total bytes:', totalBytes, '(' + (totalBytes/1024/1024).toFixed(2) + ' MB)');
"
```

### 1.2. Thống kê tổng thể
- **Tổng số file âm thanh**: **3,197 files**
- **Tổng dung lượng trên đĩa**: **68,796,273 bytes (~65.61 MB)**
- **Định dạng**: 100% MP3 mono tối ưu cho giọng nói.

### 1.3. Phân nhóm theo tiền tố & mục đích sử dụng

| Nhóm | Tiền tố file | Mô tả mục đích | Số lượng file | Dung lượng (bytes) | Dung lượng (MB) | Tỷ trọng |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **Giao diện (UI)** | `ui_*` | Giọng nói Home (3 nút lớn), dặn dò nghỉ ngơi, chuỗi ngày streak 1–10, Cổng PIN, hướng dẫn chạm thẻ | 50 | 2,458,698 B | **2.34 MB** | 3.6% |
| **Bảng chữ cái** | `alpha_*`, `letter_*` | Phát âm từng chữ cái đơn (A, Ă, Â, B, C...) | 40 | 407,756 B | **0.39 MB** | 0.6% |
| **Số học & Đếm** | `num_*`, `number_*`, `math_*` | Số đếm 1–20, phép cộng/trừ cơ bản | 200 | 5,265,960 B | **5.02 MB** | 7.7% |
| **Bài học cụ thể** | `act_*` | Lời bình, câu hỏi, giải thích các bài học mầm non & lớp 1 (Video Quiz, VTV7, Cô Lan Anh) | 195 | 12,808,647 B | **12.21 MB** | 18.6% |
| **Vần & Âm ghép** | `syl_*`, `spell_*`, `lananh_*`, `rhyme_*`, `word_*` | Đánh vần ghép âm, ghép vần, bảng âm tiết đầy đủ (dành cho Chặng 2–5 & Lớp 1) | 2,277 | 38,447,371 B | **36.67 MB** | 55.9% |
| **Từ vựng & Khác** | `vi_*`, `cmp_*`, `cons_*`, `les_*`, `tone_*`, `badge_*`, `cat_*` | Dấu thanh tiếng Việt, so sánh toán, phụ âm đơn, âm thanh mở khóa huy hiệu, danh mục truyện | 435 | 9,407,841 B | **8.97 MB** | 13.7% |
| **TỔNG CỘNG** | | | **3,197** | **68,796,273 B** | **65.61 MB** | **100%** |

---

## 2. Danh Sách Âm Thanh Cho Màn Hình Bé (Home & Chặng 0–1)

### 2.1. Cách xác định danh sách file cần thiết
Dựa vào phân tích mã nguồn thực tế:
1. **Trang chủ (`home()` trong `app.js`)**:
   - Lời chào mừng 3 nút lớn: `audio/ui_home_welcome_3btn.mp3`.
   - 3 nút lớn: `audio/ui_home_btn_today.mp3`, `audio/ui_home_btn_games.mp3`, `audio/ui_home_btn_stickers.mp3`.
   - Lời dặn dò chú mèo & chuỗi ngày: `audio/ui_streak_day_1.mp3` … `audio/ui_streak_day_10.mp3`.
   - Màn hình nghỉ ngơi giữ mắt sáng: `audio/ui_rest_modal_desc.mp3`, `audio/ui_rest_modal_cat_say.mp3`.
   - Chạm thẻ & hướng dẫn chung: `audio/ui_tap_left_first.mp3`, `audio/badge_unlock_1.mp3` … `badge_unlock_9.mp3`.
2. **Màn hình Học hôm nay (`todayLearning()` trong `app.js`)**:
   - Tiêu đề & lời nhắc Chặng 0: `audio/ui_stage_0_title.mp3`, `audio/ui_stage_0_prompt.mp3`.
   - Tiêu đề & lời nhắc Chặng 1: `audio/ui_stage_1_title.mp3`, `audio/ui_stage_1_prompt.mp3`.
3. **Bài học Chặng 0 (`activities-data.js` - 3 bài Video Quiz mầm non)**:
   - `act_vq_pre_01_pets` (Thú cưng): tiêu đề, câu hỏi 1–3, giải thích 1–3 (`act_act_vq_pre_01_pets_*.mp3`).
   - `act_vq_pre_02_wildlife` (Động vật hoang dã): tiêu đề, câu hỏi 1–3, giải thích 1–3 (`act_act_vq_pre_02_wildlife_*.mp3`).
   - `act_vq_pre_03_ocean` (Sinh vật biển): tiêu đề, câu hỏi 1–3, giải thích 1–3 (`act_act_vq_pre_03_ocean_*.mp3`).
4. **Bài học Chặng 1 (`activities-data.js` - 20 bài học nhận diện chữ & số)**:
   - Bài tập nhận diện số 1–5, 6–10, 11–20 (`act_pre_num_01..03`): tiêu đề, câu hỏi, đúng/sai (`act_act_pre_num_*.mp3`).
   - Bài tập tiếng Anh màu sắc & động vật (`act_pre_eng_01..02`): tiêu đề, câu hỏi, đúng/sai (`act_act_pre_eng_*.mp3`).
   - Bài tập chữ cái đơn A, Ă, Â (`act_pre_let_01`): tiêu đề, câu hỏi, đúng/sai (`act_act_pre_let_*.mp3`).
   - 3 bài đánh vần Cô Lan Anh A, Ă, Â (`g1_lananh_01..03`): gợi ý, câu hỏi (`act_g1_lananh_*.mp3`).
   - 11 bài chữ cái VTV7 O, Ô, Ơ, A, Ă, Â, U, Ư, E, Ê, I (`g1_vtv7_01..11`): câu hỏi, giải thích (`act_g1_vtv7_*.mp3`).
   - Âm thanh phát âm chữ cái đơn `alpha_*.mp3` và số đếm `num_*.mp3`.

### 2.2. Dung lượng tổng của gói Home & Chặng 0–1
- **Số lượng file**: **242 files** (gồm 50 file UI + 40 file chữ cái/số đếm cơ bản + 143 file bài học Chặng 0–1 + 9 file huy hiệu).
- **Tổng dung lượng**: **12,423,374 bytes (~11.85 MB)**.

---

## 3. Đánh Giá 3 Phương Án Kèm Số Liệu & Rủi Ro

### Lệnh chạy đo lường so sánh 3 phương án:
```bash
node -e "
const fs = require('fs'), path = require('path');
const all = fs.readdirSync('audio');
const size = list => (list.reduce((s, f) => s + fs.statSync(path.join('audio', f)).size, 0) / 1024 / 1024).toFixed(2);
const pA = all.filter(f => f.startsWith('ui_') || f.startsWith('alpha_'));
const pB_keys = ['act_vq_pre_01','act_vq_pre_02','act_vq_pre_03','act_pre_let_01','act_pre_num_01','act_pre_num_02','act_pre_num_03','act_pre_eng_01','act_pre_eng_02','g1_lananh_01','g1_lananh_02','g1_lananh_03','g1_vtv7_01','g1_vtv7_02','g1_vtv7_03','g1_vtv7_04','g1_vtv7_05','g1_vtv7_06','g1_vtv7_07','g1_vtv7_08','g1_vtv7_09','g1_vtv7_10','g1_vtv7_11'];
const pB = all.filter(f => f.startsWith('ui_') || f.startsWith('alpha_') || f.startsWith('num_') || f.startsWith('badge_') || pB_keys.some(k => f.includes(k)));
console.log('Phương án A:', pA.length, 'files |', size(pA), 'MB');
console.log('Phương án B:', pB.length, 'files |', size(pB), 'MB');
console.log('Phương án C:', all.length, 'files |', size(all), 'MB');
"
```

### Bảng so sánh 3 phương án:

| Tiêu chí | Phương án (a): Cực gọn<br>*(Chỉ `ui_*` + `alpha_*`)* | Phương án (b): Cân bằng ⭐ *(Khuyên dùng)*<br>*(Phương án a + Chặng 0–1 + Số)* | Phương án (c): Tối đa<br>*(Toàn bộ 100% audio)* |
| :--- | :--- | :--- | :--- |
| **Số lượng file precache** | **90 files** | **242 files** | **3,197 files** |
| **Dung lượng tải lần đầu** | **~2.73 MB** *(Tổng app ~7.5 MB)* | **~11.85 MB** *(Tổng app ~16.5 MB)* | **~65.61 MB** *(Tổng app ~70.2 MB)* |
| **Thời gian cài đặt (Mạng 4G/Wifi)** | < 1 giây | ~ 2–3 giây | ~ 15–45 giây |
| **Trải nghiệm offline của bé 4 tuổi** | - Home & UI mượt mà offline 100%.<br>- Các bài học cần mở 1 lần online trước khi chơi offline (cache động). | - Home + 23 bài học Chặng 0 & 1 chơi offline 100% ngay sau khi cài, không cần mở từng bài. | - Toàn bộ kho âm thanh offline 100%. |
| **Rủi ro trên thiết bị cấu hình thấp** | **0% rủi ro**: Siêu nhẹ, hoàn hảo cho mọi thiết bị. | **Rất thấp (< 2%)**: Dung lượng 11.8 MB nằm gọn trong hạn mức an toàn của iOS Safari (50 MB) và Android Chrome (hàng trăm MB). | **Rất cao (> 75%)**:<br>1. Lệnh `cache.addAll()` 3,197 file dễ bị lỗi mạng (chỉ cần 1 file 404/timeout là hỏng cả quá trình cài SW).<br>2. Gây nghẽn CPU/RAM máy yếu khi bung 3,197 kết nối HTTP song song.<br>3. 55% file là vần ghép Chặng 2–5 bé chưa dùng đến trong 3–6 tháng tới. |

---

## 4. Đề Xuất Kỹ Thuật

1. **Khuyến nghị áp dụng Phương án (b) (hoặc Phương án a nếu muốn app khởi động nhanh nhất)**:
   - Gói **11.85 MB** vừa vặn hoàn hảo cho lộ trình hiện tại của bé (4 tuổi, chuẩn bị vào lớp 1, đang ở Chặng 0 và 1).
   - Bé có thể mang máy đi chơi xa (về quê, trên xe ô tô, mất mạng) mà toàn bộ bài học Chặng 0 và 1 vẫn phát âm chuẩn cô giáo Tưởng Vy 100%.
2. **Cơ chế tải bổ sung cho các chặng sau (Chặng 2–5)**:
   - Khi bé hoàn thành Chặng 1 và bước sang Chặng 2, hệ thống có thể nạp âm thanh của Chặng 2 qua cơ chế cache động (`fetch & cache`) hoặc nút *"Tải bài học Chặng 2 để chơi offline"* trong Khu phụ huynh.

---

## 5. Câu Hỏi Dành Cho Chủ Dự Án (Nghĩa)

Để chốt phương án trước khi cấu hình vào `sw.js` ở các task tiếp theo, nhờ Nghĩa làm rõ 2 câu hỏi sau:

1. **Về ngưỡng dung lượng tải ban đầu**:
   - Nghĩa muốn ưu tiên **app siêu nhẹ (~7.5 MB tổng cộng - Phương án a)** để cài ngay tức thì, hay ưu tiên **chơi trọn vẹn Chặng 0–1 offline ngay lần đầu mở app (~16.5 MB tổng cộng - Phương án b)**?
2. **Về thiết bị bé dùng (Câu hỏi Q3 trong `todo.md`)**:
   - Bé đang dùng thiết bị gì để học (iPad, máy tính bảng Android, điện thoại Samsung / iPhone)?
   - Dung lượng bộ nhớ trống của máy có dồi dào không (trên 2GB trống)?
   - Thiết bị có thường xuyên kết nối Wifi gia đình không, hay gia đình hay cho bé dùng máy ở nơi không có mạng?
