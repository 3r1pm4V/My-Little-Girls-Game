# KẾ HOẠCH CHI TIẾT SINH ÂM THANH VIENEU TTS (GIỌNG TƯỜNG VY) CHO CHẶNG 0–1

> **Tài liệu đặc tả kỹ thuật**: Kế hoạch chuẩn bị cho các đợt phát sinh âm thanh tự động (D2/D3)  
> **Nguyên tắc**: KHÔNG gọi mạng, KHÔNG sử dụng API key, KHÔNG tạo file mp3 trong đợt này.  
> **Đầu vào**: Nhóm (c) từ báo cáo kiểm kê âm thanh [`docs/stage01-audio-audit.md`](file:///d:/Nghia/Python/My-Little-Girls-Game/docs/stage01-audio-audit.md).  
> **Nhánh thực hiện**: `docs/P2-07-vieneu-plan`

---

## 1. Phân Tích Cơ Chế Sinh Audio Hiện Tại Trong Mã Nguồn

Dựa trên việc đọc trực tiếp 3 tệp tin mã nguồn trong dự án:

### 1.1. Script sinh âm thanh đánh vần [`generate_spelling_audio.js`](file:///d:/Nghia/Python/My-Little-Girls-Game/generate_spelling_audio.js)
- **Đọc API Key**:
  - Dòng 5: `const API_KEY = process.env.VIENEU_API_KEY || '';`
  - Đọc trực tiếp từ biến môi trường của tiến trình (`process.env`), không hardcode key trong mã nguồn.
- **Cấu hình giọng đọc & Thư mục đích**:
  - Dòng 6: `const VOICE = 'Tưởng Vy';` (Giọng chuẩn miền Bắc truyền cảm cho thiếu nhi).
  - Dòng 7–11: Thư mục lưu trữ `audio/` nằm cùng cấp với thư mục dự án.
- **Endpoint API & Giao thức mạng**:
  - Dòng 22–51 (`function fetchAudio(text)`): Sử dụng thư viện gốc `https` của Node.js.
  - Dòng 30: `hostname: 'api.vieneu.io'`
  - Dòng 31: `path: '/api/v1/audio/speech'`
  - Dòng 32: `method: 'POST'`
  - Dòng 24–27: Payload JSON gửi đi gồm:
    ```json
    {
      "model": "vieneu-v4",
      "input": "...",
      "voice": "Tưởng Vy"
    }
    ```
  - Dòng 34: Header xác thực `'Authorization': 'Bearer ' + API_KEY`.
- **Định dạng âm thanh**:
  - API trả về nhị phân trực tiếp của file MP3 (`audio/mpeg`).
  - Dòng 106: Ghi nhị phân buffer thẳng ra file đĩa `fs.writeFileSync(filePath, buf)`.
- **Quy tắc đặt tên file**:
  - Dòng 90: `spell_${cObj.c}_${vObj.v}_${toneIdx}.mp3` (dành riêng cho các âm vần kết hợp).
- **Cơ chế bỏ qua file đã tồn tại (`skip-existing`)**:
  - Dòng 98–101:
    ```javascript
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      skippedCount++;
      continue;
    }
    ```
    Script kiểm tra nếu tệp tin đã tồn tại trên ổ đĩa và có kích thước `> 1000 bytes` (tránh các file rác bị ngắt giữa chừng) thì tự động bỏ qua, không gọi lại API.
- **Cách ghi vào [`audio-map.js`](file:///d:/Nghia/Python/My-Little-Girls-Game/audio-map.js)**:
  - Dòng 65–76: Đọc nội dung `audio-map.js` hiện có qua Regex `/window\.AUDIO_MAP\s*=\s*(\{[\s\S]*?\});/` rồi parse thành `existingMap`.
  - Dòng 94–96: Đăng ký các khóa tra cứu:
    - `existingMap["vi|" + spoken] = "audio/" + fileName;`
    - `existingMap["vi|" + spoken + "."] = "audio/" + fileName;`
    - `existingMap["vi|spell_" + cObj.c + "_" + vObj.v + "_" + toneIdx] = "audio/" + fileName;`
  - Dòng 123–126: Serialize toàn bộ đối tượng `existingMap` ra JSON và ghi đè file.
  > [!WARNING]
  > **Lưu ý kiến trúc**: Script `generate_spelling_audio.js` cũ ghi đè toàn bộ `audio-map.js` bằng cú pháp `window.AUDIO_MAP = {...}`. Tuy nhiên, hiện tại `audio-map.js` đã được tái cấu trúc thành dạng IIFE tự thực thi với hàm chuẩn hóa `normKey` và cơ chế tra cứu mờ qua `Proxy` (dòng 4–18 & 27156–27183). Bất kỳ script sinh mới nào sau này phải bảo toàn cấu trúc IIFE và đối tượng `RAW_MAP`, **tuyệt đối không được ghi đè làm mất Proxy**.

### 1.2. Hàm Netlify Function Serverless [`netlify/functions/tts.js`](file:///d:/Nghia/Python/My-Little-Girls-Game/netlify/functions/tts.js)
- **Đọc API Key**: Dòng 3: `const API_KEY = process.env.VIENEU_API_KEY || '';`
- **Giọng đọc mặc định**: Dòng 4: `const DEFAULT_VOICE = 'Tưởng Vy';`
- **Endpoint gọi**: Dòng 58–60: `https://api.vieneu.io/api/v1/audio/speech`
- **Xử lý phản hồi**: Dòng 80–87: Chuyển đổi Buffer âm thanh thành chuỗi Data URI Base64:
  `data:audio/mpeg;base64,...` trả về JSON `{ url: base64Audio, cached: false }` để trình duyệt người dùng phát tức thì qua thẻ `<audio>` khi online.

### 1.3. Quy ước đặt tên file và tra cứu trong [`audio-map.js`](file:///d:/Nghia/Python/My-Little-Girls-Game/audio-map.js)
Hiện tại dự án đang sử dụng các tiền tố chuẩn sau cho kho âm thanh:
1. `alpha_vi_{ký_tự}.mp3`: 29 chữ cái tiếng Việt cơ bản (`alpha_vi_a.mp3`, `alpha_vi_b.mp3`...).
2. `syl_{phụ_âm}_{nguyên_âm}_{dấu}.mp3`: Các âm tiết có dấu thanh (`syl_b_a_0.mp3` đến `syl_b_a_5.mp3`).
3. `vi_{từ_không_dấu}_{hash}.mp3`: Từ vựng đơn/ngắn (`vi_khong_1othrk.mp3`, `vi_tau_hoa_ypennn.mp3`).
4. `spell_w_{từ_không_dấu}.mp3`: Từ vựng ghép thẻ (`spell_w_chu_meo.mp3`, `spell_w_qua_cam.mp3`).
5. `act_act_{actId}_{trường}.mp3`: Câu hỏi và giải thích bài học (`act_act_vq_pre_01_pets_q_1.mp3`).
6. `ui_{tên_chức_năng}.mp3`: Lời nhắc hệ thống và điều hướng (`ui_home_btn_today.mp3`, `ui_rest_modal_desc.mp3`).

---

## 2. Bảng Danh Mục Các Chuỗi Cần Sinh (Nhóm c - Chặng 0 & 1)

Dưới đây là danh mục chi tiết **164 chuỗi độc nhất** (tương ứng với 166 vị trí gọi trong mã nguồn) thuộc Nhóm (c) hiện đang phải rơi về TTS online hoặc Web Speech cục bộ. 

Mọi chuỗi đều được chuẩn hóa Unicode **NFC**, loại bỏ ký tự biểu tượng cảm xúc (emoji) để gửi dữ liệu sạch đến VieNeu TTS.

### 2.1. Nhóm Bài Học Mầm Non Chặng 0 (36 lựa chọn)

| STT | Chuỗi chuẩn hóa NFC (Văn bản phát âm) | Nguồn gọi (`activities-data.js`) | Tên file MP3 dự kiến | Phân loại | Ghi chú & Rủi ro |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | Bạn Chó | `act_vq_pre_01_pets` (q1.opt0) | `opt_pre_pets_ban_cho.mp3` | Lựa chọn con vật | An toàn |
| 2 | Bạn Mèo | `act_vq_pre_01_pets` (q1.opt1) | `opt_pre_pets_ban_meo.mp3` | Lựa chọn con vật | An toàn |
| 3 | Bạn Cá vàng | `act_vq_pre_01_pets` (q1.opt2) | `opt_pre_pets_ban_ca_vang.mp3` | Lựa chọn con vật | An toàn |
| 4 | Bạn Vịt | `act_vq_pre_01_pets` (q1.opt3) | `opt_pre_pets_ban_vit.mp3` | Lựa chọn con vật | An toàn |
| 5 | Trông giữ nhà và làm bạn thân thiết | `act_vq_pre_01_pets` (q2.opt0) | `opt_pre_pets_trong_giu_nha.mp3` | Lựa chọn hành vi | Câu dài (8 từ) |
| 6 | Bắt chuột trên mái nhà | `act_vq_pre_01_pets` (q2.opt1) | `opt_pre_pets_bat_chuot.mp3` | Lựa chọn hành vi | An toàn |
| 7 | Bay lên trời đón mặt trời | `act_vq_pre_01_pets` (q2.opt2) | `opt_pre_pets_bay_len_troi.mp3` | Lựa chọn hành vi | An toàn |
| 8 | Bơi lặn dưới đáy sông | `act_vq_pre_01_pets` (q2.opt3) | `opt_pre_pets_boi_lan_song.mp3` | Lựa chọn hành vi | An toàn |
| 9 | Củ Cà rốt | `act_vq_pre_01_pets` (q3.opt0) | `opt_pre_pets_cu_ca_rot.mp3` | Lựa chọn thức ăn | `TODO(parent-review)` |
| 10 | Thịt cá rán | `act_vq_pre_01_pets` (q3.opt1) | `opt_pre_pets_thit_ca_ran.mp3` | Lựa chọn thức ăn | An toàn |
| 11 | Kẹo sô-cô-la | `act_vq_pre_01_pets` (q3.opt2) | `opt_pre_pets_keo_socola.mp3` | Lựa chọn thức ăn | `TODO(parent-review)` (Từ mượn) |
| 12 | Xương hầm | `act_vq_pre_01_pets` (q3.opt3) | `opt_pre_pets_xuong_ham.mp3` | Lựa chọn thức ăn | An toàn |
| 13 | Chú Hươu cao cổ | `act_vq_pre_02_wildlife` (q1.opt0) | `opt_pre_wild_huou_cao_co.mp3` | Lựa chọn con vật | An toàn |
| 14 | Bác Voi to lớn | `act_vq_pre_02_wildlife` (q1.opt1) | `opt_pre_wild_bac_voi.mp3` | Lựa chọn con vật | An toàn |
| 15 | Bác Gấu đen | `act_vq_pre_02_wildlife` (q1.opt2) | `opt_pre_wild_bac_gau_den.mp3` | Lựa chọn con vật | An toàn |
| 16 | Chú Khỉ nâu | `act_vq_pre_02_wildlife` (q1.opt3) | `opt_pre_wild_khi_nau.mp3` | Lựa chọn con vật | An toàn |
| 17 | Bơi lặn sâu dưới nước | `act_vq_pre_02_wildlife` (q2.opt0) | `opt_pre_wild_boi_lan_sau.mp3` | Lựa chọn hành vi | An toàn |
| 18 | Vươn lên ăn lá non trên ngọn cây cao | `act_vq_pre_02_wildlife` (q2.opt1) | `opt_pre_wild_vuon_len_an_la.mp3` | Lựa chọn hành vi | Câu dài (10 từ) |
| 19 | Đào hang sâu dưới lòng đất | `act_vq_pre_02_wildlife` (q2.opt2) | `opt_pre_wild_dao_hang_sau.mp3` | Lựa chọn hành vi | An toàn |
| 20 | Bay lượn trên mây | `act_vq_pre_02_wildlife` (q2.opt3) | `opt_pre_wild_bay_luon_may.mp3` | Lựa chọn hành vi | An toàn |
| 21 | Một chiếc bờm dày dặn oai phong | `act_vq_pre_02_wildlife` (q3.opt0) | `opt_pre_wild_bom_oai_phong.mp3` | Lựa chọn đặc điểm | Câu miêu tả |
| 22 | Một đôi cánh sặc sỡ | `act_vq_pre_02_wildlife` (q3.opt1) | `opt_pre_wild_doi_canh.mp3` | Lựa chọn đặc điểm | An toàn |
| 23 | Đôi tai nhọn dài | `act_vq_pre_02_wildlife` (q3.opt2) | `opt_pre_wild_doi_tai_nhon.mp3` | Lựa chọn đặc điểm | An toàn |
| 24 | Bộ vảy lấp lánh | `act_vq_pre_02_wildlife` (q3.opt3) | `opt_pre_wild_bo_vay_lap_lanh.mp3` | Lựa chọn đặc điểm | An toàn |
| 25 | Nhảy vút lên không trung nhào lộn vui vẻ | `act_vq_pre_03_ocean` (q1.opt0) | `opt_pre_ocean_nhay_vut_nhao_lon.mp3` | Lựa chọn hành vi | Câu dài (9 từ) |
| 26 | Leo trèo lên cây dừa | `act_vq_pre_03_ocean` (q1.opt1) | `opt_pre_ocean_leo_cay_dua.mp3` | Lựa chọn hành vi | An toàn |
| 27 | Đi bộ trên bờ cát | `act_vq_pre_03_ocean` (q1.opt2) | `opt_pre_ocean_di_bo_bo_cat.mp3` | Lựa chọn hành vi | An toàn |
| 28 | Chạy thi cùng thỏ rừng | `act_vq_pre_03_ocean` (q1.opt3) | `opt_pre_ocean_chay_thi_tho.mp3` | Lựa chọn hành vi | An toàn |
| 29 | Một chiếc mai rùa cứng cáp như chiếc khiên | `act_vq_pre_03_ocean` (q2.opt0) | `opt_pre_ocean_mai_rua_cung.mp3` | Lựa chọn đặc điểm | Câu dài (9 từ) |
| 30 | Một bộ lông xù | `act_vq_pre_03_ocean` (q2.opt1) | `opt_pre_ocean_bo_long_xu.mp3` | Lựa chọn đặc điểm | An toàn |
| 31 | Một chiếc nón lá | `act_vq_pre_03_ocean` (q2.opt2) | `opt_pre_ocean_chiec_non_la.mp3` | Lựa chọn đồ vật | An toàn |
| 32 | Đôi cánh bay lượn | `act_vq_pre_03_ocean` (q2.opt3) | `opt_pre_ocean_canh_bay_luon.mp3` | Lựa chọn đặc điểm | An toàn |
| 33 | 2 xúc tua | `act_vq_pre_03_ocean` (q3.opt0) | `opt_pre_ocean_2_xuc_tua.mp3` | Lựa chọn số lượng | `TODO(parent-review)` |
| 34 | 4 xúc tua | `act_vq_pre_03_ocean` (q3.opt1) | `opt_pre_ocean_4_xuc_tua.mp3` | Lựa chọn số lượng | `TODO(parent-review)` |
| 35 | 8 xúc tua | `act_vq_pre_03_ocean` (q3.opt2) | `opt_pre_ocean_8_xuc_tua.mp3` | Lựa chọn số lượng | `TODO(parent-review)` |
| 36 | 100 xúc tua | `act_vq_pre_03_ocean` (q3.opt3) | `opt_pre_ocean_100_xuc_tua.mp3` | Lựa chọn số lượng | `TODO(parent-review)` |

---

### 2.2. Nhóm Bài Học Ghép Thẻ Tiếng Anh & Số Lượng Táo Chặng 1 (8 mục)

| STT | Chuỗi chuẩn hóa NFC (Văn bản phát âm) | Nguồn gọi (`activities-data.js`) | Tên file MP3 dự kiến | Phân loại | Ghi chú & Rủi ro |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 37 | 1 quả | `act_pre_num_03` (pairs[0].right) | `opt_pre_num_1_qua.mp3` | Ghép thẻ số lượng | `TODO(parent-review)` |
| 38 | 2 quả | `act_pre_num_03` (pairs[1].right) | `opt_pre_num_2_qua.mp3` | Ghép thẻ số lượng | `TODO(parent-review)` |
| 39 | 3 quả | `act_pre_num_03` (pairs[2].right) | `opt_pre_num_3_qua.mp3` | Ghép thẻ số lượng | `TODO(parent-review)` |
| 40 | Chú chó | `act_pre_eng_02` (pairs[0].left) | `spell_w_chu_cho.mp3` | Từ vựng tiếng Việt | An toàn |
| 41 | Dog | `act_pre_eng_02` (pairs[0].right) | `spell_w_eng_dog.mp3` | Từ vựng tiếng Anh | `TODO(parent-review)` (Phát âm /g/) |
| 42 | Cat | `act_pre_eng_02` (pairs[1].right) | `spell_w_eng_cat.mp3` | Từ vựng tiếng Anh | `TODO(parent-review)` (Phát âm /t/) |
| 43 | Gà con | `act_pre_eng_02` (pairs[2].left) | `spell_w_ga_con.mp3` | Từ vựng tiếng Việt | An toàn |
| 44 | Chick | `act_pre_eng_02` (pairs[2].right) | `spell_w_eng_chick.mp3` | Từ vựng tiếng Anh | `TODO(parent-review)` (Phát âm /k/) |

---

### 2.3. Nhóm 11 Bài Học Chữ Cái VTV7 Chặng 1 (118 lựa chọn)

| STT | Chuỗi chuẩn hóa NFC (Văn bản phát âm) | Nguồn gọi (`activities-data.js`) | Tên file MP3 dự kiến | Phân loại | Ghi chú & Rủi ro |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 45 | Quả trứng gà tròn | `g1_vtv7_01_letter_o` (q1.opt0) | `opt_vtv7_o_trung_ga.mp3` | Lựa chọn hình ảnh | An toàn |
| 46 | Chiếc thang đứng | `g1_vtv7_01_letter_o` (q1.opt1) | `opt_vtv7_o_chiec_thang.mp3` | Lựa chọn hình ảnh | An toàn |
| 47 | Mái nhà nhọn | `g1_vtv7_01_letter_o` (q1.opt2) | `opt_vtv7_o_mai_nha.mp3` | Lựa chọn hình ảnh | An toàn |
| 48 | Chiếc nón lá | `g1_vtv7_01_letter_o` (q1.opt3) | `opt_vtv7_o_non_la.mp3` | Lựa chọn hình ảnh | An toàn |
| 49 | Ô tô | `g1_vtv7_01_letter_o` (q2.opt0) | `opt_vtv7_o_o_to.mp3` | Lựa chọn từ vựng | An toàn |
| 50 | Quả bóng | `g1_vtv7_01_letter_o` (q2.opt2) | `opt_vtv7_o_qua_bong.mp3` | Lựa chọn từ vựng | An toàn |
| 51 | Viên bi | `g1_vtv7_01_letter_o` (q2.opt3) | `opt_vtv7_o_vien_bi.mp3` | Lựa chọn từ vựng | An toàn |
| 52 | Miệng mở tròn đều, môi uốn tròn | `g1_vtv7_01_letter_o` (q3.opt0) | `opt_vtv7_o_khau_hinh_dung.mp3` | Khẩu hình phát âm | `TODO(parent-review)` |
| 53 | Mím chặt hai môi | `g1_vtv7_01_letter_o` (q3.opt1) | `opt_vtv7_o_mim_moi.mp3` | Khẩu hình phát âm | An toàn |
| 54 | Răng cắn nhẹ vào môi | `g1_vtv7_01_letter_o` (q3.opt2) | `opt_vtv7_o_rang_can_moi.mp3` | Khẩu hình phát âm | An toàn |
| 55 | Há to hết cỡ sang hai bên | `g1_vtv7_01_letter_o` (q3.opt3) | `opt_vtv7_o_ha_to_moi.mp3` | Khẩu hình phát âm | An toàn |
| 56 | Có thêm chiếc mũ nón úp trên đầu | `g1_vtv7_02_letter_oo` (q1.opt0) | `opt_vtv7_oo_chiec_mu.mp3` | Đặc điểm nét chữ | Câu dài (8 từ) |
| 57 | Có dấu râu bên phải | `g1_vtv7_02_letter_oo` (q1.opt1) | `opt_vtv7_oo_dau_rau.mp3` | Đặc điểm nét chữ | An toàn |
| 58 | Có nét gạch ngang ở bụng | `g1_vtv7_02_letter_oo` (q1.opt2) | `opt_vtv7_oo_gach_ngang.mp3` | Đặc điểm nét chữ | An toàn |
| 59 | Không khác nhau | `g1_vtv7_02_letter_oo` (q1.opt3) | `opt_vtv7_oo_khong_khac.mp3` | Lựa chọn so sánh | An toàn |
| 60 | Xe máy | `g1_vtv7_02_letter_oo` (q2.opt1) | `opt_vtv7_oo_xe_may.mp3` | Lựa chọn từ vựng | An toàn |
| 61 | Máy bay | `g1_vtv7_02_letter_oo` (q2.opt3) | `opt_vtv7_oo_may_bay.mp3` | Lựa chọn từ vựng | An toàn |
| 62 | Con gà trống | `g1_vtv7_02_letter_oo` (q3.opt0) | `opt_vtv7_oo_ga_trong.mp3` | Lựa chọn từ vựng | An toàn |
| 63 | Con vịt bầu | `g1_vtv7_02_letter_oo` (q3.opt1) | `opt_vtv7_oo_vit_bau.mp3` | Lựa chọn từ vựng | An toàn |
| 64 | Con mèo con | `g1_vtv7_02_letter_oo` (q3.opt2) | `opt_vtv7_oo_meo_con.mp3` | Lựa chọn từ vựng | An toàn |
| 65 | Con thỏ trắng | `g1_vtv7_02_letter_oo` (q3.opt3) | `opt_vtv7_oo_tho_trang.mp3` | Lựa chọn từ vựng | An toàn |
| 66 | Có một chiếc râu nhỏ xinh ở góc trên bên phải | `g1_vtv7_03_letter_ow` (q1.opt0) | `opt_vtv7_ow_dau_rau_xinh.mp3` | Đặc điểm nét chữ | Câu dài (12 từ) |
| 67 | Có chiếc mũ nón úp ngược | `g1_vtv7_03_letter_ow` (q1.opt1) | `opt_vtv7_ow_mu_nguoc.mp3` | Đặc điểm nét chữ | An toàn |
| 68 | Có hai chấm tròn trên đầu | `g1_vtv7_03_letter_ow` (q1.opt2) | `opt_vtv7_ow_hai_cham.mp3` | Đặc điểm nét chữ | An toàn |
| 69 | Nét thẳng đứng | `g1_vtv7_03_letter_ow` (q1.opt3) | `opt_vtv7_ow_net_thang.mp3` | Đặc điểm nét chữ | An toàn |
| 70 | Cây Nơ | `g1_vtv7_03_letter_ow` (q2.opt0) | `opt_vtv7_ow_cai_no.mp3` | Lựa chọn đồ vật | `TODO(parent-review)` |
| 71 | Bông Hoa | `g1_vtv7_03_letter_ow` (q2.opt1) | `opt_vtv7_ow_bong_hoa.mp3` | Lựa chọn đồ vật | An toàn |
| 72 | Ngôi Sao | `g1_vtv7_03_letter_ow` (q2.opt2) | `opt_vtv7_ow_ngoi_sao.mp3` | Lựa chọn đồ vật | An toàn |
| 73 | Trái Tim | `g1_vtv7_03_letter_ow` (q2.opt3) | `opt_vtv7_ow_trai_tim.mp3` | Lựa chọn đồ vật | An toàn |
| 74 | Quả Mơ | `g1_vtv7_03_letter_ow` (q3.opt0) | `opt_vtv7_ow_qua_mo.mp3` | Lựa chọn hoa quả | An toàn |
| 75 | Quả Mận | `g1_vtv7_03_letter_ow` (q3.opt1) | `opt_vtv7_ow_qua_man.mp3` | Lựa chọn hoa quả | An toàn |
| 76 | Quả Đào | `g1_vtv7_03_letter_ow` (q3.opt2) | `opt_vtv7_ow_qua_dao.mp3` | Lựa chọn hoa quả | An toàn |
| 77 | Quả Dâu | `g1_vtv7_03_letter_ow` (q3.opt3) | `opt_vtv7_ow_qua_dau.mp3` | Lựa chọn hoa quả | An toàn |
| 78 | Một nét cong tròn khép kín và một nét móc ngược phải | `g1_vtv7_04_letter_a` (q1.opt0) | `opt_vtv7_a_cau_tao_chu.mp3` | Đặc điểm cấu tạo | Câu dài (12 từ) |
| 79 | Hai nét thẳng đứng song song | `g1_vtv7_04_letter_a` (q1.opt1) | `opt_vtv7_a_hai_net_thang.mp3` | Đặc điểm cấu tạo | An toàn |
| 80 | Một nét xiên trái và một nét gạch ngang | `g1_vtv7_04_letter_a` (q1.opt2) | `opt_vtv7_a_xien_trai_gach.mp3` | Đặc điểm cấu tạo | An toàn |
| 81 | Một hình tam giác khép kín | `g1_vtv7_04_letter_a` (q1.opt3) | `opt_vtv7_a_tam_giac.mp3` | Đặc điểm cấu tạo | An toàn |
| 82 | Con Cá | `g1_vtv7_04_letter_a` (q3.opt0) | `opt_vtv7_a_con_ca.mp3` | Lựa chọn từ vựng | An toàn |
| 83 | Con Chó | `g1_vtv7_04_letter_a` (q3.opt1) | `opt_vtv7_a_con_cho.mp3` | Lựa chọn từ vựng | An toàn |
| 84 | Con Voi | `g1_vtv7_04_letter_a` (q3.opt2) | `opt_vtv7_a_con_voi.mp3` | Lựa chọn từ vựng | An toàn |
| 85 | Con Mèo | `g1_vtv7_04_letter_a` (q3.opt3) | `opt_vtv7_a_con_meo.mp3` | Lựa chọn từ vựng | An toàn |
| 86 | Chiếc mũ cong cong hình chiếc thuyền nhỏ (dấu á) | `g1_vtv7_05_letter_aw` (q1.opt0) | `opt_vtv7_aw_dau_mu_thuyen.mp3` | Đặc điểm cấu tạo | `TODO(parent-review)` |
| 87 | Chiếc nón chóp nhọn úp xuống | `g1_vtv7_05_letter_aw` (q1.opt1) | `opt_vtv7_aw_non_chop.mp3` | Đặc điểm cấu tạo | An toàn |
| 88 | Chiếc râu móc bên phải | `g1_vtv7_05_letter_aw` (q1.opt2) | `opt_vtv7_aw_rau_moc.mp3` | Đặc điểm cấu tạo | An toàn |
| 89 | Nét gạch ngang trên đầu | `g1_vtv7_05_letter_aw` (q1.opt3) | `opt_vtv7_aw_gach_ngang.mp3` | Đặc điểm cấu tạo | An toàn |
| 90 | Mặt Trăng lưỡi liềm | `g1_vtv7_05_letter_aw` (q2.opt0) | `opt_vtv7_aw_mat_trang.mp3` | Lựa chọn hình ảnh | An toàn |
| 91 | Mặt Trời tròn | `g1_vtv7_05_letter_aw` (q2.opt1) | `opt_vtv7_aw_mat_troi.mp3` | Lựa chọn hình ảnh | An toàn |
| 92 | Đám mây | `g1_vtv7_05_letter_aw` (q2.opt2) | `opt_vtv7_aw_dam_may.mp3` | Lựa chọn hình ảnh | An toàn |
| 93 | Ngôi sao | `g1_vtv7_05_letter_aw` (q2.opt3) | `opt_vtv7_aw_ngoi_sao.mp3` | Lựa chọn hình ảnh | An toàn |
| 94 | Đôi Mắt | `g1_vtv7_05_letter_aw` (q3.opt0) | `opt_vtv7_aw_doi_mat.mp3` | Lựa chọn từ vựng | An toàn |
| 95 | Cái Mũ | `g1_vtv7_05_letter_aw` (q3.opt1) | `opt_vtv7_aw_cai_mu.mp3` | Lựa chọn từ vựng | An toàn |
| 96 | Cái Bàn | `g1_vtv7_05_letter_aw` (q3.opt2) | `opt_vtv7_aw_cai_ban.mp3` | Lựa chọn từ vựng | An toàn |
| 97 | Chiếc Ghế | `g1_vtv7_05_letter_aw` (q3.opt3) | `opt_vtv7_aw_chiec_ghe.mp3` | Lựa chọn từ vựng | An toàn |
| 98 | Chiếc nón nhọn úp xuống | `g1_vtv7_06_letter_aa` (q1.opt0) | `opt_vtv7_aa_non_nhon.mp3` | Đặc điểm cấu tạo | An toàn |
| 99 | Chiếc nón ngửa lên hứng nước | `g1_vtv7_06_letter_aa` (q1.opt1) | `opt_vtv7_aa_non_ngua.mp3` | Đặc điểm cấu tạo | An toàn |
| 100 | Nét móc bên sườn phải | `g1_vtv7_06_letter_aa` (q1.opt2) | `opt_vtv7_aa_net_moc.mp3` | Đặc điểm cấu tạo | An toàn |
| 101 | Không có dấu gì cả | `g1_vtv7_06_letter_aa` (q1.opt3) | `opt_vtv7_aa_khong_dau.mp3` | Đặc điểm cấu tạo | An toàn |
| 102 | Quả Mận | `g1_vtv7_06_letter_aa` (q2.opt0) | `opt_vtv7_aa_qua_man.mp3` | Lựa chọn hoa quả | An toàn |
| 103 | Quả Cam | `g1_vtv7_06_letter_aa` (q2.opt1) | `opt_vtv7_aa_qua_cam.mp3` | Lựa chọn hoa quả | An toàn |
| 104 | Quả Nho | `g1_vtv7_06_letter_aa` (q2.opt2) | `opt_vtv7_aa_qua_nho.mp3` | Lựa chọn hoa quả | An toàn |
| 105 | Quả Chuối | `g1_vtv7_06_letter_aa` (q2.opt3) | `opt_vtv7_aa_qua_chuoi.mp3` | Lựa chọn hoa quả | An toàn |
| 106 | Cây Nấm | `g1_vtv7_06_letter_aa` (q3.opt0) | `opt_vtv7_aa_cay_nam.mp3` | Lựa chọn thiên nhiên | An toàn |
| 107 | Bông Hoa | `g1_vtv7_06_letter_aa` (q3.opt1) | `opt_vtv7_aa_bong_hoa.mp3` | Lựa chọn thiên nhiên | An toàn |
| 108 | Trò chơi | `g1_vtv7_06_letter_aa` (q3.opt2) | `opt_vtv7_aa_tro_choi.mp3` | Lựa chọn từ vựng | An toàn |
| 109 | Bài thơ | `g1_vtv7_06_letter_aa` (q3.opt3) | `opt_vtv7_aa_bai_tho.mp3` | Lựa chọn từ vựng | An toàn |
| 110 | Nét móc hai đầu và nét móc ngược phải | `g1_vtv7_07_letter_u` (q1.opt0) | `opt_vtv7_u_cau_tao.mp3` | Đặc điểm cấu tạo | Câu dài (9 từ) |
| 111 | Một nét tròn khép kín | `g1_vtv7_07_letter_u` (q1.opt1) | `opt_vtv7_u_tron_khep_kin.mp3` | Đặc điểm cấu tạo | An toàn |
| 112 | Hai nét xiên chéo nhau | `g1_vtv7_07_letter_u` (q1.opt2) | `opt_vtv7_u_xien_cheo.mp3` | Đặc điểm cấu tạo | An toàn |
| 113 | Một nét lượn sóng | `g1_vtv7_07_letter_u` (q1.opt3) | `opt_vtv7_u_luon_song.mp3` | Đặc điểm cấu tạo | An toàn |
| 114 | Quả Đu đủ | `g1_vtv7_07_letter_u` (q2.opt0) | `opt_vtv7_u_qua_du_du.mp3` | Lựa chọn hoa quả | An toàn |
| 115 | Quả Chuối | `g1_vtv7_07_letter_u` (q2.opt1) | `opt_vtv7_u_qua_chuoi.mp3` | Lựa chọn hoa quả | An toàn |
| 116 | Cái Dù (Ô dù) | `g1_vtv7_07_letter_u` (q3.opt0) | `opt_vtv7_u_cai_du.mp3` | Lựa chọn đồ vật | `TODO(parent-review)` |
| 117 | Cái Mũ | `g1_vtv7_07_letter_u` (q3.opt1) | `opt_vtv7_u_cai_mu.mp3` | Lựa chọn đồ vật | An toàn |
| 118 | Cái Nón | `g1_vtv7_07_letter_u` (q3.opt2) | `opt_vtv7_u_cai_non.mp3` | Lựa chọn đồ vật | An toàn |
| 119 | Áo mưa | `g1_vtv7_07_letter_u` (q3.opt3) | `opt_vtv7_u_ao_mua.mp3` | Lựa chọn đồ vật | An toàn |
| 120 | Chữ Ư có thêm nét râu nhỏ ở góc trên bên phải | `g1_vtv7_08_letter_uw` (q1.opt0) | `opt_vtv7_uw_so_sanh_dung.mp3` | So sánh chữ cái | `TODO(parent-review)` |
| 121 | Chữ Ư có nét gạch ngang ở bụng | `g1_vtv7_08_letter_uw` (q1.opt1) | `opt_vtv7_uw_so_sanh_sai1.mp3` | So sánh chữ cái | `TODO(parent-review)` |
| 122 | Chữ Ư có chấm tròn trên đầu | `g1_vtv7_08_letter_uw` (q1.opt2) | `opt_vtv7_uw_so_sanh_sai2.mp3` | So sánh chữ cái | `TODO(parent-review)` |
| 123 | Chữ Ư viết hoa chữ U viết thường | `g1_vtv7_08_letter_uw` (q1.opt3) | `opt_vtv7_uw_so_sanh_sai3.mp3` | So sánh chữ cái | `TODO(parent-review)` |
| 124 | Lá thư | `g1_vtv7_08_letter_uw` (q2.opt0) | `opt_vtv7_uw_la_thu.mp3` | Lựa chọn đồ vật | An toàn |
| 125 | Tấm thiệp | `g1_vtv7_08_letter_uw` (q2.opt1) | `opt_vtv7_uw_tam_thiep.mp3` | Lựa chọn đồ vật | An toàn |
| 126 | Tờ báo | `g1_vtv7_08_letter_uw` (q2.opt3) | `opt_vtv7_uw_to_bao.mp3` | Lựa chọn đồ vật | An toàn |
| 127 | Quả Dừa | `g1_vtv7_08_letter_uw` (q3.opt0) | `opt_vtv7_uw_qua_dua.mp3` | Lựa chọn hoa quả | An toàn |
| 128 | Quả Nhãn | `g1_vtv7_08_letter_uw` (q3.opt1) | `opt_vtv7_uw_qua_nhan.mp3` | Lựa chọn hoa quả | An toàn |
| 129 | Quả Vải | `g1_vtv7_08_letter_uw` (q3.opt2) | `opt_vtv7_uw_qua_vai.mp3` | Lựa chọn hoa quả | An toàn |
| 130 | Quả Mận | `g1_vtv7_08_letter_uw` (q3.opt3) | `opt_vtv7_uw_qua_man.mp3` | Lựa chọn hoa quả | An toàn |
| 131 | Con Cừu / Con Dê kêu Be be | `g1_vtv7_09_letter_e` (q1.opt0) | `opt_vtv7_e_tieng_keu_be_be.mp3` | Mô phỏng tiếng kêu | `TODO(parent-review)` |
| 132 | Con Chó sủa Gâu gâu | `g1_vtv7_09_letter_e` (q1.opt1) | `opt_vtv7_e_tieng_keu_gau_gau.mp3` | Mô phỏng tiếng kêu | `TODO(parent-review)` |
| 133 | Con Mèo kêu Meo meo | `g1_vtv7_09_letter_e` (q1.opt2) | `opt_vtv7_e_tieng_keu_meo_meo.mp3` | Mô phỏng tiếng kêu | `TODO(parent-review)` |
| 134 | Con Gà gáy Ò ó o | `g1_vtv7_09_letter_e` (q1.opt3) | `opt_vtv7_e_tieng_keu_o_o_o.mp3` | Mô phỏng tiếng kêu | `TODO(parent-review)` |
| 135 | Xe đạp | `g1_vtv7_09_letter_e` (q2.opt0) | `opt_vtv7_e_xe_dap.mp3` | Lựa chọn phương tiện | An toàn |
| 136 | Thuyền buồm | `g1_vtv7_09_letter_e` (q2.opt1) | `opt_vtv7_e_thuyen_buom.mp3` | Lựa chọn phương tiện | An toàn |
| 137 | Ca nô | `g1_vtv7_09_letter_e` (q2.opt2) | `opt_vtv7_e_ca_no.mp3` | Lựa chọn phương tiện | `TODO(parent-review)` |
| 138 | Xe buýt | `g1_vtv7_09_letter_e` (q2.opt3) | `opt_vtv7_e_xe_buyt.mp3` | Lựa chọn phương tiện | `TODO(parent-review)` |
| 139 | Quả Me | `g1_vtv7_09_letter_e` (q3.opt0) | `opt_vtv7_e_qua_me.mp3` | Lựa chọn hoa quả | An toàn |
| 140 | Quả Khế | `g1_vtv7_09_letter_e` (q3.opt1) | `opt_vtv7_e_qua_khe.mp3` | Lựa chọn hoa quả | An toàn |
| 141 | Quả Sấu | `g1_vtv7_09_letter_e` (q3.opt2) | `opt_vtv7_e_qua_sau.mp3` | Lựa chọn hoa quả | An toàn |
| 142 | Chiếc mũ nón úp | `g1_vtv7_10_letter_ee` (q1.opt0) | `opt_vtv7_ee_mu_non_up.mp3` | Đặc điểm nét chữ | An toàn |
| 143 | Chiếc râu móc | `g1_vtv7_10_letter_ee` (q1.opt1) | `opt_vtv7_ee_rau_moc.mp3` | Đặc điểm nét chữ | An toàn |
| 144 | Dấu gạch chéo | `g1_vtv7_10_letter_ee` (q1.opt3) | `opt_vtv7_ee_gach_cheo.mp3` | Đặc điểm nét chữ | An toàn |
| 145 | Chú Bê con | `g1_vtv7_10_letter_ee` (q2.opt0) | `opt_vtv7_ee_chu_be_con.mp3` | Lựa chọn con vật | An toàn |
| 146 | Chú Nghé con | `g1_vtv7_10_letter_ee` (q2.opt1) | `opt_vtv7_ee_chu_nghe_con.mp3` | Lựa chọn con vật | An toàn |
| 147 | Chú Heo con | `g1_vtv7_10_letter_ee` (q2.opt2) | `opt_vtv7_ee_chu_heo_con.mp3` | Lựa chọn con vật | An toàn |
| 148 | Chú Ngựa con | `g1_vtv7_10_letter_ee` (q2.opt3) | `opt_vtv7_ee_chu_ngua_con.mp3` | Lựa chọn con vật | An toàn |
| 149 | Cái Ghế | `g1_vtv7_10_letter_ee` (q3.opt0) | `opt_vtv7_ee_cai_ghe.mp3` | Lựa chọn đồ vật | An toàn |
| 150 | Cái Giường | `g1_vtv7_10_letter_ee` (q3.opt2) | `opt_vtv7_ee_cai_giuong.mp3` | Lựa chọn đồ vật | An toàn |
| 151 | Cửa sổ | `g1_vtv7_10_letter_ee` (q3.opt3) | `opt_vtv7_ee_cua_so.mp3` | Lựa chọn đồ vật | An toàn |
| 152 | Có một chấm tròn nhỏ ở trên đầu | `g1_vtv7_11_letter_i` (q1.opt0) | `opt_vtv7_i_cham_tron_dau.mp3` | Đặc điểm cấu tạo | Câu dài (8 từ) |
| 153 | Có chiếc nón nhọn úp | `g1_vtv7_11_letter_i` (q1.opt1) | `opt_vtv7_i_chiec_non_nhon.mp3` | Đặc điểm cấu tạo | An toàn |
| 154 | Có chiếc râu móc bên phải | `g1_vtv7_11_letter_i` (q1.opt2) | `opt_vtv7_i_rau_moc_phai.mp3` | Đặc điểm cấu tạo | An toàn |
| 155 | Là một vòng tròn khép kín | `g1_vtv7_11_letter_i` (q1.opt3) | `opt_vtv7_i_vong_tron_kin.mp3` | Đặc điểm cấu tạo | An toàn |
| 156 | Bắn Bi | `g1_vtv7_11_letter_i` (q2.opt0) | `opt_vtv7_i_ban_bi.mp3` | Lựa chọn trò chơi | An toàn |
| 157 | Thả diều | `g1_vtv7_11_letter_i` (q2.opt1) | `opt_vtv7_i_tha_dieu.mp3` | Lựa chọn trò chơi | An toàn |
| 158 | Ô ăn quan | `g1_vtv7_11_letter_i` (q2.opt2) | `opt_vtv7_i_o_an_quan.mp3` | Lựa chọn trò chơi | An toàn |
| 159 | Nhảy dây | `g1_vtv7_11_letter_i` (q2.opt3) | `opt_vtv7_i_nhay_day.mp3` | Lựa chọn trò chơi | An toàn |
| 160 | Chú Khỉ | `g1_vtv7_11_letter_i` (q3.opt0) | `opt_vtv7_i_chu_khi.mp3` | Lựa chọn con vật | An toàn |
| 161 | Chú Voi | `g1_vtv7_11_letter_i` (q3.opt1) | `opt_vtv7_i_chu_voi.mp3` | Lựa chọn con vật | An toàn |
| 162 | Chú Hươu | `g1_vtv7_11_letter_i` (q3.opt2) | `opt_vtv7_i_chu_huou.mp3` | Lựa chọn con vật | An toàn |

---

### 2.4. Nhóm Cổng PIN Phụ Huynh (2 mục)

| STT | Chuỗi chuẩn hóa NFC (Văn bản phát âm) | Nguồn gọi (`app.js`) | Tên file MP3 dự kiến | Phân loại | Ghi chú & Rủi ro |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 163 | Khu vực dành cho phụ huynh | `app.js` (`gate()`) | `ui_pin_gate_notice.mp3` | Nhắc nhở hệ thống | Web Speech đọc tốt |
| 164 | Mời bố mẹ nhập mã PIN để vào phần cài đặt | `app.js` (`gate()`) | `ui_pin_gate_prompt.mp3` | Hướng dẫn hệ thống | Web Speech đọc tốt |

---

## 3. Ước Lượng Kỹ Thuật & Cảnh Báo Ngưỡng Bộ Nhớ (13 MB)

### 3.1. Thống kê chi tiết
- **Tổng số chuỗi cần sinh**: **164 file** độc nhất (phục vụ 166 điểm gọi).
- **Tổng số ký tự gửi VieNeu API**: **2,396 ký tự**.
  - Trung bình mỗi chuỗi: ~14.6 ký tự.
  - Chuỗi ngắn nhất: 4 ký tự (`"Ô tô"`, `"Dog"`, `"Cat"`).
  - Chuỗi dài nhất: 45 ký tự (`"Chữ Ư có thêm nét râu nhỏ ở góc trên bên phải"`).

### 3.2. Ước lượng dung lượng MP3 thực tế
Dựa trên thống kê từ 276 tệp âm thanh VieNeu hiện hữu trong thư mục `audio/`:
- **Nhóm từ vựng ngắn** (1–3 từ, thời lượng ~1.0s – 1.5s):
  - Tham chiếu: `vi_tau_hoa_ypennn.mp3` (13.8 KB), `spell_w_chu_meo.mp3` (31 KB), `spell_w_qua_cam.mp3` (23 KB), `syl_b_a_4.mp3` (10 KB).
  - Trung bình: **~18 KB/file**.
- **Nhóm câu miêu tả / khẩu hình / tiếng kêu** (6–12 từ, thời lượng ~2.5s – 4.0s):
  - Tham chiếu: `act_g1_vtv7_08_q_1_exp.mp3` (35 KB), `ui_home_welcome_3btn.mp3` (42 KB).
  - Trung bình: **~32 KB/file**.

$$\begin{aligned}
\text{Dung lượng 118 file từ vựng ngắn} &\approx 118 \times 18\text{ KB} = 2,124\text{ KB} \\
\text{Dung lượng 46 file câu dài/miêu tả} &\approx 46 \times 32\text{ KB} = 1,472\text{ KB} \\
\mathbf{\text{Tổng dung lượng MP3 dự kiến}} &\approx \mathbf{3,596\text{ KB } (\sim 3.51\text{ MB})}
\end{aligned}$$

### 3.3. Đối chiếu với ngưỡng giới hạn bộ nhớ 13 MB của Service Worker

> [!CAUTION]
> **CẢNH BÁO VƯỢT NGƯỠNG BỘ NHỚ CRITICAL**:
> - Dung lượng `OPT_AUDIO` hiện tại (`bhv-v49`, 276 file): **12,962,234 bytes (~12.36 MB)**.
> - Hạn mức tối đa được kiểm tra nghiêm ngặt bởi `test-sw-precache.js`: **13.00 MB (13,631,488 bytes)**.
> - **Dư địa bộ nhớ an toàn còn lại**:
>   $$\Delta = 13,631,488 - 12,962,234 = \mathbf{669,254\text{ bytes } (\sim 653.5\text{ KB})}$$
> - **Nếu sinh và nạp TOÀN BỘ 164 file (~3.51 MB) vào `OPT_AUDIO`**:
>   $$\text{Tổng dung lượng mới} = 12.36\text{ MB} + 3.51\text{ MB} = \mathbf{15.87\text{ MB}} \gg \mathbf{13.00\text{ MB}} \quad \implies \mathbf{FAIL\ TEST!}$$

**Khuyến nghị giải pháp**:
1. **Tuyệt đối KHÔNG precache ồ ạt cả 164 file**.
2. **Ưu tiên nạp Top từ vựng tinh gọn**: Chỉ chọn lọc tối đa **~25–30 từ vựng cốt lõi** của bài học Mầm non & tiếng Anh cho bé 4 tuổi (dung lượng < 500 KB để không chạm ngưỡng 13 MB).
3. Các phương án nhiễu (distractors) dài trong bài tập VTV7 hoặc Cổng PIN bố mẹ: Tiếp tục để cơ chế **Web Speech on-demand** xử lý cục bộ, không tốn dung lượng cache.

---

## 4. Đánh Dấu Rủi Ro Phát Âm TTS (`TODO(parent-review)`)

Khi tạo giọng bằng mô hình AI tổng hợp (VieNeu TTS), một số dạng văn bản có xác suất cao bị phát âm sai, lệch ngữ điệu hoặc phát âm ngọng. Toàn bộ các mục dưới đây được đánh dấu bắt buộc Nghĩa phải nghe kiểm duyệt trực tiếp trước khi tích hợp vào game:

### 4.1. Từ vựng tiếng Anh nguyên bản
- `Dog`, `Cat`, `Chick` (STT 41, 42, 44):
  - **Rủi ro**: Giọng VieNeu được huấn luyện chủ yếu cho âm tiết tiếng Việt. Khi gặp từ tiếng Anh ngắn, AI có thể nuốt âm đuôi (/g/, /t/, /k/) hoặc phát âm bồi kiểu "Đót", "Cát", "Chích".
  - **Hành động**: `TODO(parent-review)` — Bố mẹ nghe thử hoặc thay bằng audio từ điển chuẩn quốc tế.

### 4.2. Từ mượn hoặc từ ghép tiếng nước ngoài
- `Kẹo sô-cô-la` (STT 11), `Củ Cà rốt` (STT 9), `Cái Dù (Ô dù)` (STT 116), `Ca nô` (STT 137), `Xe buýt` (STT 138):
  - **Rủi ro**: Dấu gạch nối trong `"sô-cô-la"` có thể khiến TTS ngắt quãng quá lâu; `"Ca nô"`, `"Xe buýt"` dễ bị nhấn sai trọng âm.
  - **Hành động**: `TODO(parent-review)`.

### 4.3. Mô phỏng tiếng kêu động vật
- `"Con Cừu / Con Dê kêu Be be"`, `"Con Chó sủa Gâu gâu"`, `"Con Mèo kêu Meo meo"`, `"Con Gà gáy Ò ó o"` (STT 131–134):
  - **Rủi ro**: Tiếng kêu trẻ thơ đòi hỏi ngữ điệu cao vút, vui tươi (`Ò ó o...`). TTS AI thường đọc đều đều như văn xuôi, làm mất sự hấp dẫn đối với bé 4 tuổi.
  - **Hành động**: `TODO(parent-review)`.

### 4.4. Đếm số lượng và số đứng trước danh từ
- `1 quả`, `2 quả`, `3 quả` (STT 37–39), `2 xúc tua`, `4 xúc tua`, `8 xúc tua`, `100 xúc tua` (STT 33–36):
  - **Rủi ro**: Chữ số viết bằng ký tự số (`1`, `2`, `3`) có thể bị TTS đọc thành âm rời hoặc ngắt quãng trước danh từ thay vì đọc liền mạch tự nhiên.
  - **Hành động**: `TODO(parent-review)`.

### 4.5. Câu so sánh và tên chữ cái đơn lẻ
- `"Chữ Ư có thêm nét râu nhỏ ở góc trên bên phải"` (STT 120–123):
  - **Rủi ro**: Chữ cái đứng độc lập như `"Ư"`, `"U"` dễ bị đọc lướt hoặc biến dạng thành từ cảm thán (như "ừ", "u").
  - **Hành động**: `TODO(parent-review)`.

---

## 5. Đề Xuất Cơ Chế An Toàn Cho Đợt Sinh Audio (D2/D3)

Để đảm bảo các đợt chạy sinh audio thực tế sau này diễn ra an toàn tuyệt đối, script thực thi cần tuân thủ 6 nguyên tắc kỹ thuật sau:

1. **Chế độ chạy thử không tác động (`--dry-run`)**:
   - Khi chạy lệnh `node scripts/generate_stage01_audio.js --dry-run`:
     - Script chỉ quét mã nguồn, so khớp với `AUDIO_MAP` hiện có, in ra danh sách các file sẽ tạo, tổng ký tự, ước tính dung lượng và quota.
     - **Tuyệt đối KHÔNG gửi request ra Internet**, KHÔNG tiêu tốn quota và KHÔNG ghi/sửa bất kỳ file nào trên đĩa.
2. **Cơ chế bỏ qua file đã tồn tại (`skip-existing`)**:
   - Kiểm tra `fs.existsSync(filePath) && fs.statSync(filePath).size > 1000`.
   - Nếu file hợp lệ đã có trên đĩa, tự động bỏ qua (skip), bảo vệ các file đã được bố mẹ duyệt nghe chuẩn.
3. **Khả năng tự phục hồi và tiếp tục (`resume-on-interrupt`)**:
   - Tiến trình thực hiện tuần tự theo từng file độc lập. Nếu mất mạng, lỗi nguồn hoặc nhấn `Ctrl+C`, lần chạy kế tiếp sẽ tự động tiếp tục từ file chưa hoàn thành mà không phải sinh lại từ đầu.
4. **Giới hạn tần suất gọi & Thử lại thông minh (`Rate-limit & Backoff`)**:
   - Chèn khoảng nghỉ tĩnh `await sleep(350)` giữa các request liên tiếp để tránh làm nghẽn API.
   - Nếu nhận mã lỗi `429` (Too Many Requests) hoặc `5xx` (Server Error): Tự động chờ với thời gian tăng dần lũy thừa (1s $\rightarrow$ 3s $\rightarrow$ 7s) và thử lại tối đa 3 lần. Nếu vẫn thất bại thì dừng an toàn và lưu báo cáo lỗi, không spam server.
5. **Bảo mật tuyệt đối thông tin nhạy cảm (`Zero-Leak API Key`)**:
   - Khóa API chỉ được đọc duy nhất qua `process.env.VIENEU_API_KEY`.
   - Script không in, không log giá trị key (kể cả dạng masked `vien_***`) ra console hay các file nhật ký build.
6. **Bảo toàn tính toàn vẹn của [`audio-map.js`](file:///d:/Nghia/Python/My-Little-Girls-Game/audio-map.js)**:
   - Script mới không serialize ghi đè toàn bộ file. Script sẽ phân tích vị trí mảng `RAW_MAP = { ... }` trong file và chỉ chèn bổ sung các cặp key-value mới vào bên trong, bảo vệ 100% logic của `normKey` và `Proxy` tra cứu.

---

## 6. Danh Sách Câu Hỏi Cần Xin Ý Kiến Nghĩa (Chủ Dự Án)

Trước khi tiến hành viết script và gọi API VieNeu, đề xuất Nghĩa quyết định 3 định hướng chiến lược sau:

1. **Về phát âm từ vựng Tiếng Anh (`Dog`, `Cat`, `Chick`)**:
   - *Lựa chọn 1*: Vẫn dùng VieNeu giọng Tưởng Vy (chấp nhận giọng người Việt phát âm tiếng Anh cho trẻ mầm non).
   - *Lựa chọn 2*: Tải bộ audio tiếng Anh bản ngữ chuẩn trẻ em (từ các nguồn mở giáo dục uy tín hoặc Google Web Speech `en-US`).
   - *Lựa chọn 3*: Tạm thời chưa cần audio riêng, để Web Speech trên thiết bị phát âm theo giọng tiếng Anh mặc định của máy tính bảng.

2. **Về các âm tiết đơn lẻ & tiếng kêu con vật**:
   - Có nên để AI sinh các tiếng tượng thanh (`Ò ó o`, `Meo meo`, `Gâu gâu`, `Be be`), hay bố/mẹ sẽ dành 5 phút tự thu âm trực tiếp qua tính năng ghi âm giọng nói phụ huynh sẵn có trong ứng dụng để bé cảm nhận giọng người thân quen thuộc?

3. **Về phương án điều phối bộ nhớ Precache (Ngưỡng 13 MB)**:
   - *Phương án A (Khuyến nghị)*: Giữ nguyên ngưỡng 13 MB; chỉ sinh và nạp **~25 từ vựng con vật và đồ vật ngắn** gần gũi nhất với bé 4 tuổi (tăng thêm ~450 KB, tổng ~12.81 MB $\le$ 13 MB). Các câu giải thích dài hoặc đáp án nhiễu vẫn để Web Speech đọc khi bấm.
   - *Phương án B*: Nâng ngưỡng kiểm thử của `test-sw-precache.js` lên **16 MB** trong giai đoạn Chặng 2 để nạp toàn bộ 164 file MP3 offline vào máy tính bảng.
