// Dữ liệu Giáo trình Tiếng Việt Tiền Tiểu Học & Lớp 1 Chuẩn
// Biên soạn theo: 28 Bài Đọc và Cách Đánh Vần Lớp 1, Sách Luyện Đọc Cô Huyền, Các Nét Cơ Bản, Phép Cộng Phạm Vi 10

// Danh từ & từ ghép ví dụ thực tế cho các tiếng mở có nghĩa trong tiếng Việt (đã hiệu đính chuẩn chính tả & thuần phong mỹ tục cho trẻ em)
const VN_SPELL_WORDS = {"b|a|0": "ba mẹ", "b|a|1": "bà nội", "b|a|2": "cô bá", "b|a|3": "bả vai", "b|a|4": "bã mía", "b|a|5": "bạ đâu hay đó", "b|e|0": "be bé", "b|e|1": "bè gỗ", "b|e|2": "em bé", "b|e|3": "bẻ bắp", "b|e|4": "bẽ bàng", "b|e|5": "bẹ ngô", "b|ê|0": "con bê", "b|ê|1": "bề trên", "b|ê|2": "bế em", "b|ê|3": "bể cá", "b|ê|4": "bễ rèn", "b|ê|5": "bệ đá", "b|i|0": "viên bi", "b|i|1": "bì bõm", "b|i|2": "quả bí", "b|i|3": "bỉ vỏ", "b|i|4": "bĩ cực", "b|i|5": "bị ngã", "b|o|0": "bo tròn", "b|o|1": "con bò", "b|o|2": "bó hoa", "b|o|3": "bỏ rác", "b|o|4": "bõ công", "b|o|5": "con bọ", "b|ô|0": "cái bô", "b|ô|1": "bồ câu", "b|ô|2": "bố mẹ", "b|ô|3": "bổ cam", "b|ô|4": "bỗ bã", "b|ô|5": "đi bộ", "b|ơ|0": "quả bơ", "b|ơ|1": "bờ ao", "b|ơ|2": "bớ làng", "b|ơ|3": "khoai bở", "b|ơ|4": "bỡ ngỡ", "b|ơ|5": "bợ đỡ", "b|u|0": "bu gà", "b|u|1": "bù đắp", "b|u|2": "bú sữa", "b|u|3": "bủn rủn", "b|u|5": "bụ bẫm", "b|ư|5": "to bự", "c|a|0": "ca hát", "c|a|1": "cà chua", "c|a|2": "con cá", "c|a|3": "tất cả", "c|a|4": "cãi cọ", "c|a|5": "cạ cứng", "c|o|0": "co cụm", "c|o|1": "con cò", "c|o|2": "có tiền", "c|o|3": "bãi cỏ", "c|o|5": "cây cọ", "c|ô|0": "cô giáo", "c|ô|1": "gà cồ", "c|ô|2": "cố gắng", "c|ô|3": "cái cổ", "c|ô|4": "mâm cỗ", "c|ô|5": "xe cộ", "c|ơ|0": "cơ thể", "c|ơ|1": "lá cờ", "c|ơ|2": "cớ sao", "c|ơ|3": "cởi mở", "c|ơ|4": "kích cỡ", "c|ơ|5": "cợt nhã", "c|u|0": "chim cu", "c|u|1": "cù nèo", "c|u|2": "con cú", "c|u|3": "củ cải", "c|u|4": "đồ cũ", "c|u|5": "ông cụ", "c|ư|0": "cư dân", "c|ư|1": "cừ khôi", "c|ư|2": "cứ việc", "c|ư|3": "cử chỉ", "c|ư|4": "kiêng cữ", "c|ư|5": "cự ly", "d|a|0": "làn da", "d|a|1": "dà dạt", "d|a|2": "dạ dày", "d|a|3": "dư dả", "d|a|4": "dã ngoại", "d|a|5": "dạ vâng", "d|e|1": "dè dặt", "d|e|3": "hạt dẻ", "d|e|4": "chim dẽ", "d|ê|0": "con dê", "d|ê|1": "dềnh dàng", "d|ê|2": "con dế", "d|ê|4": "dễ dàng", "d|ê|5": "dệt vải", "d|i|0": "di chuyển", "d|i|1": "dì út", "d|i|2": "dí dỏm", "d|i|4": "dĩ nhiên", "d|i|5": "kỳ dị", "d|o|0": "lý do", "d|o|1": "dò la", "d|o|2": "cây dó", "d|o|4": "dõng dạc", "d|o|5": "dọ mõm", "d|ô|0": "dô ta", "d|ô|1": "dồ dại", "d|ô|4": "dỗ dành", "d|ô|5": "dộ dộ", "d|ơ|0": "dơ bẩn", "d|ơ|1": "dờ dẫm", "d|ơ|2": "dớ dẩn", "d|ơ|3": "dở dang", "d|ơ|4": "tháo dỡ", "d|ơ|5": "dợ dẫm", "d|u|0": "du lịch", "d|u|1": "cây dù", "d|u|2": "dúi vào", "d|u|3": "rủ dủ", "d|u|4": "dũa móng", "d|u|5": "dụ dỗ", "d|ư|0": "dư thừa", "d|ư|1": "nhừ dừ", "d|ư|2": "dứ tay", "d|ư|3": "dửng dưng", "d|ư|4": "hung dữ", "d|ư|5": "dự đoán", "đ|a|0": "cây đa", "đ|a|1": "đà nẵng", "đ|a|2": "hòn đá", "đ|a|3": "đả kích", "đ|a|4": "đã xong", "đ|a|5": "đại lý", "đ|e|0": "cái đe", "đ|e|1": "đè bẹp", "đ|e|2": "đét đe", "đ|e|3": "sinh đẻ", "đ|e|4": "đẹp đẽ", "đ|e|5": "còi đẹt", "đ|ê|0": "con đê", "đ|ê|1": "đề thi", "đ|ê|2": "đế giày", "đ|ê|3": "để dành", "đ|ê|4": "đễ đễ", "đ|ê|5": "đệ tử", "đ|i|0": "đi học", "đ|i|1": "đì đọt", "đ|i|2": "đí đớ", "đ|i|3": "đỉa đỉ", "đ|i|5": "địu con", "đ|o|0": "đo đạc", "đ|o|1": "con đò", "đ|o|2": "đó đây", "đ|o|3": "màu đỏ", "đ|o|4": "đõ ong", "đ|o|5": "đọ sức", "đ|ô|0": "thủ đô", "đ|ô|1": "đồ chơi", "đ|ô|2": "đố vui", "đ|ô|3": "đổ rác", "đ|ô|4": "hạt đỗ", "đ|ô|5": "nhiệt độ", "đ|ơ|0": "đơ người", "đ|ơ|1": "đờ đẫn", "đ|ơ|2": "đớ lưỡi", "đ|ơ|3": "đở đờ", "đ|ơ|4": "giúp đỡ", "đ|ơ|5": "đợ người", "đ|u|0": "đu dây", "đ|u|1": "đù đẫn", "đ|u|2": "đú đởn", "đ|u|3": "đầy đủ", "đ|u|4": "đôi đũa", "đ|u|5": "đụn cát", "đ|ư|1": "đừ người", "đ|ư|2": "đứng đứ", "đ|ư|4": "đỡ đữ", "đ|ư|5": "con đực", "g|a|0": "nhà ga", "g|a|1": "con gà", "g|a|2": "gá lắp", "g|a|3": "gả con", "g|a|4": "gã kia", "g|a|5": "gạ gẫm", "g|o|1": "gò má", "g|o|4": "gõ cửa", "g|o|5": "gọng kính", "g|ô|0": "gô cổ", "g|ô|1": "gồ ghề", "g|ô|2": "gối gố", "g|ô|4": "cây gỗ", "g|ô|5": "gộc gộ", "g|ơ|1": "đường gờ", "g|ơ|2": "gớm gớ", "g|ơ|3": "điềm gở", "g|ơ|4": "tháo gỡ", "g|ơ|5": "gợi ý", "g|u|0": "hợp gu", "g|u|1": "lưng gù", "g|u|4": "gần gũi", "g|u|5": "gỗ gụ", "g|ư|1": "gầm gừ", "g|ư|5": "gượng gạo", "h|a|0": "ha ha", "h|a|1": "hà nội", "h|a|2": "há miệng", "h|a|3": "hả hê", "h|a|4": "hãm hã", "h|a|5": "mùa hạ", "h|e|1": "mùa hè", "h|e|2": "hé cửa", "h|e|3": "hẻm nhỏ", "h|e|5": "cây hẹ", "h|ê|0": "hê hả", "h|ê|1": "chú hề", "h|ê|2": "hếch hế", "h|ê|4": "hễ là", "h|ê|5": "hệ thống", "h|i|0": "hi hi", "h|i|1": "hì hục", "h|i|2": "ngựa hí", "h|i|3": "hỉ hả", "h|o|0": "bị ho", "h|o|1": "hát hò", "h|o|2": "hót líu", "h|o|3": "hỏi han", "h|o|4": "hõm má", "h|o|5": "họ hàng", "h|ô|0": "hô to", "h|ô|1": "hồ nước", "h|ô|2": "cái hố", "h|ô|3": "con hổ", "h|ô|4": "hỗ trợ", "h|ô|5": "hộ khẩu", "h|ơ|0": "hơ tay", "h|ơ|1": "hờ hững", "h|ơ|2": "hớ hênh", "h|ơ|3": "hở răng", "h|ơ|5": "hợm hĩnh", "h|u|0": "hu hu", "h|u|1": "hù dọa", "h|u|2": "hú vang", "h|u|3": "hủ tục", "h|u|4": "hũ mật", "h|u|5": "hụ còi", "h|ư|0": "hư hỏng", "h|ư|1": "hừ hừ", "h|ư|2": "hứ hứ", "h|ư|4": "hữu nghị", "h|ư|5": "hự hự", "k|e|0": "cây ke", "k|e|1": "bờ kè", "k|e|2": "ké cẩm", "k|e|3": "kẻ vở", "k|e|4": "kẽ tay", "k|e|5": "kẹo kéo", "k|ê|0": "hạt kê", "k|ê|1": "kề bên", "k|ê|2": "kế toán", "k|ê|3": "kể chuyện", "k|ê|4": "kễnh kễ", "k|ê|5": "kệ sách", "k|i|0": "ki ki", "k|i|1": "kì lạ", "k|i|2": "kí tên", "k|i|3": "kỉ niệm", "k|i|4": "kĩ càng", "k|i|5": "kị sĩ", "l|a|0": "la hét", "l|a|1": "bàn là", "l|a|2": "chiếc lá", "l|a|3": "lả lướt", "l|a|4": "nước lã", "l|a|5": "xa lạ", "l|e|0": "chim le", "l|e|1": "lè lưỡi", "l|e|2": "mắt lé", "l|e|3": "số lẻ", "l|e|4": "lẽ phải", "l|e|5": "nhanh lẹ", "l|ê|0": "quả lê", "l|ê|1": "lề đường", "l|ê|2": "lếch thếch", "l|ê|3": "lể ốc", "l|ê|4": "ngày lễ", "l|ê|5": "lệ phí", "l|i|0": "cái li", "l|i|1": "lì lợm", "l|i|2": "lí lẽ", "l|i|3": "thủ lỉ", "l|i|4": "lĩ lĩ", "l|i|5": "lị lị", "l|o|0": "lo lắng", "l|o|1": "lò nướng", "l|o|2": "ló mặt", "l|o|3": "lỏn lẻn", "l|o|4": "lõm lõ", "l|o|5": "lọ hoa", "l|ô|0": "lô đất", "l|ô|1": "lồ lộ", "l|ô|2": "lố bịch", "l|ô|3": "lổ đổ", "l|ô|4": "cái lỗ", "l|ô|5": "đường lộ", "l|ơ|0": "lơ lửng", "l|ơ|1": "lờ mờ", "l|ơ|2": "lớ ngớ", "l|ơ|3": "sạt lở", "l|ơ|4": "lỡ lời", "l|ơ|5": "lợ miệng", "l|u|0": "cái lu", "l|u|1": "lù đù", "l|u|2": "lú lẫn", "l|u|3": "thủ lủ", "l|u|4": "lũ lụt", "l|u|5": "lụ khụ", "l|ư|0": "lư hương", "l|ư|1": "lừ đừ", "l|ư|2": "lức lứ", "l|ư|3": "lửng lơ", "l|ư|4": "lữ hành", "l|ư|5": "quả lựu", "m|a|0": "con ma", "m|a|1": "nhưng mà", "m|a|2": "má yêu", "m|a|3": "mồ mả", "m|a|4": "mã lực", "m|a|5": "cây mạ", "m|e|0": "quả me", "m|e|1": "hạt mè", "m|e|2": "bên mé", "m|e|3": "mẻ cơm", "m|e|4": "mạnh mẽ", "m|e|5": "mẹ yêu", "m|ê|0": "mê ngủ", "m|ê|1": "mề gà", "m|ê|2": "mế yêu", "m|ê|4": "mễ cốc", "m|ê|5": "mệ già", "m|i|0": "lông mi", "m|i|1": "mì tôm", "m|i|2": "mí mắt", "m|i|3": "tỉ mỉ", "m|i|4": "mĩ miều", "m|i|5": "mị dân", "m|o|0": "mo cau", "m|o|1": "mò kim", "m|o|2": "mó máy", "m|o|3": "mỏ chim", "m|o|4": "tiếng mõ", "m|o|5": "mọ mẫm", "m|ô|0": "mô đất", "m|ô|1": "mồ hôi", "m|ô|2": "mố cầu", "m|ô|3": "mổ xẻ", "m|ô|4": "mỗ mỗ", "m|ô|5": "ngôi mộ", "m|ơ|0": "quả mơ", "m|ơ|1": "mờ ảo", "m|ơ|2": "mớ rau", "m|ơ|3": "mở cửa", "m|ơ|4": "dầu mỡ", "m|ơ|5": "cậu mợ", "m|u|0": "mu rùa", "m|u|1": "mù sương", "m|u|2": "múi mít", "m|u|3": "mủ cây", "m|u|4": "cái mũ", "m|u|5": "bà mụ", "m|ư|3": "nôn mửa", "n|a|0": "quả na", "n|a|2": "cái ná", "n|a|4": "bắn nã", "n|a|5": "mặt nạ", "n|e|1": "đây nè", "n|e|2": "né tránh", "n|e|3": "nứt nẻ", "n|e|5": "nẹt nẹ", "n|ê|0": "no nê", "n|ê|1": "tay nề", "n|ê|3": "nể nang", "n|ê|5": "câu nệ", "n|i|0": "cái ni", "n|i|1": "nài nì", "n|i|3": "nỉ non", "n|i|5": "nịnh nọt", "n|o|0": "no bụng", "n|o|1": "cái nò", "n|o|2": "nó đấy", "n|o|3": "cái nỏ", "n|o|4": "nõn nà", "n|o|5": "hôm nọ", "n|ô|0": "nô đùa", "n|ô|1": "nồi đồng", "n|ô|2": "nốt ruồi", "n|ô|3": "tiếng nổ", "n|ô|4": "nỗi lòng", "n|ô|5": "phẫn nộ", "n|ơ|0": "cái nơ", "n|ơ|3": "hoa nở", "n|ơ|4": "nỡ lòng", "n|ơ|5": "món nợ", "n|u|4": "nũng nịu", "n|u|5": "nụ hoa", "n|ư|4": "phụ nữ", "n|ư|5": "nực nồng", "p|a|0": "pa-nô", "p|e|0": "pe-nô", "p|i|0": "pin pi", "p|o|0": "bo po", "p|ơ|0": "gỗ pơ-mu", "r|a|0": "đi ra", "r|a|1": "con rà", "r|a|2": "phá giá", "r|a|3": "rả rích", "r|a|4": "rã rời", "r|a|5": "rạ lúa", "r|e|0": "re re", "r|e|1": "rè rè", "r|e|2": "ré lên", "r|e|3": "rẻ tiền", "r|e|4": "chim rẽ", "r|ê|0": "con rê", "r|ê|1": "rề rà", "r|ê|2": "rế nồi", "r|ê|3": "con rể", "r|ê|4": "rễ cây", "r|ê|5": "rệt rệ", "r|i|0": "chim ri", "r|i|1": "rì rầm", "r|i|2": "ríu rít", "r|i|3": "rỉ tai", "r|i|4": "rĩ rĩ", "r|i|5": "rị mọ", "r|o|0": "ro ro", "r|o|1": "rò rỉ", "r|o|2": "hét ré", "r|o|3": "rõ ràng", "r|o|4": "rõ rệt", "r|o|5": "rọ mõm", "r|ô|0": "cá rô", "r|ô|1": "cái rồ", "r|ô|2": "phố xá", "r|ô|3": "cái rổ", "r|ô|4": "cây rỗ", "r|ô|5": "cái rộ", "r|ơ|0": "rơ le", "r|ơ|1": "rờ rẫm", "r|ơ|2": "rớ rẩn", "r|ơ|3": "rở rở", "r|ơ|4": "rỡ ràng", "r|ơ|5": "rợ người", "r|u|0": "hát ru", "r|u|1": "con rùa", "r|u|2": "con rú", "r|u|3": "con rủ", "r|u|4": "rũ rượi", "r|u|5": "dụ rụ", "r|ư|1": "rừ rừ", "r|ư|3": "xử rử", "r|ư|4": "chữ rữ", "r|ư|5": "rực rỡ", "s|a|0": "phù sa", "s|a|1": "sà xuống", "s|a|2": "sá gì", "s|a|3": "củ sả", "s|a|4": "ngã sã", "s|a|5": "xạ sạ", "s|e|0": "se duyên", "s|e|1": "chim sẻ", "s|e|2": "sé sọc", "s|e|3": "chim sẻ", "s|e|4": "sẽ làm", "s|ê|0": "sơn sê", "s|ê|1": "sề sề", "s|ê|2": "con sế", "s|ê|4": "sễ sễ", "s|ê|5": "sệ sệ", "s|i|0": "cây si", "s|i|2": "si tình", "s|i|3": "sỉ lẻ", "s|i|4": "sĩ tử", "s|i|5": "sị mặt", "s|o|0": "so kè", "s|o|1": "con sò", "s|o|2": "só mó", "s|o|3": "sỏ sọ", "s|o|4": "rõ sõ", "s|o|5": "sọ dừa", "s|ô|0": "sô cô la", "s|ô|1": "sồ sề", "s|ô|2": "sổ tay", "s|ô|3": "quyển sổ", "s|ô|4": "sỗ sàng", "s|ô|5": "đồ sộ", "s|ơ|0": "sơ sinh", "s|ơ|1": "sờ mó", "s|ơ|2": "sớ táo", "s|ơ|3": "sở thích", "s|ơ|4": "sỡ sỡ", "s|ơ|5": "sợ hãi", "s|u|0": "cao su", "s|u|1": "su su", "s|u|2": "sú vẹt", "s|u|3": "sủi bọt", "s|u|4": "sũ sũ", "s|u|5": "sụ mặt", "s|ư|0": "sư tử", "s|ư|1": "từ sử", "s|ư|2": "sứ giả", "s|ư|3": "lịch sử", "s|ư|4": "sữa mẹ", "s|ư|5": "sự việc", "t|a|0": "chúng ta", "t|a|1": "tà áo", "t|a|2": "tá lả", "t|a|3": "miêu tả", "t|a|4": "tã lót", "t|a|5": "tạ ơn", "t|e|0": "te te", "t|e|1": "tè tè", "t|e|2": "tè té", "t|e|3": "té tẻ", "t|e|4": "nhỏ tẽ", "t|e|5": "tẹ tẹ", "t|ê|0": "tê tê", "t|ê|1": "tề tựu", "t|ê|2": "tế lễ", "t|ê|3": "tể tướng", "t|ê|4": "tễu tễ", "t|ê|5": "tệ nạn", "t|i|0": "ti ti", "t|i|1": "tì đè", "t|i|2": "bí tí", "t|i|3": "tỉ tê", "t|i|4": "tĩ tĩ", "t|i|5": "tị nạnh", "t|o|0": "to lớn", "t|o|1": "tò mò", "t|o|2": "tó té", "t|o|3": "tỏ tường", "t|o|4": "tõ tõ", "t|o|5": "con tọ", "t|ô|0": "cái tô", "t|ô|1": "tồ tồ", "t|ô|2": "tô tố", "t|ô|3": "tổ ong", "t|ô|4": "tỗ tỗ", "t|ô|5": "tộ tộ", "t|ơ|0": "sợi tơ", "t|ơ|1": "tờ giấy", "t|ơ|2": "tớ tớ", "t|ơ|3": "tở mở", "t|ơ|4": "cỡ tỡ", "t|ơ|5": "tợ tợ", "t|u|0": "tu hành", "t|u|1": "tù và", "t|u|2": "tu tú", "t|u|3": "cái tủ", "t|u|4": "vũ tũ", "t|u|5": "tụ tập", "t|ư|0": "số tư", "t|ư|1": "từ ngữ", "t|ư|2": "tứ quý", "t|ư|3": "tử tế", "t|ư|4": "tữ tữ", "t|ư|5": "tự tin", "v|a|0": "va chạm", "v|a|1": "và và", "v|a|2": "vá áo", "v|a|3": "bả vả", "v|a|4": "vã mồ hôi", "v|a|5": "vạ gió", "v|e|0": "con ve", "v|e|1": "vè vè", "v|e|2": "vé xe", "v|e|3": "vẻ mặt", "v|e|4": "vẽ tranh", "v|e|5": "vẹ vẹ", "v|ê|0": "vê tròn", "v|ê|1": "về nhà", "v|ê|2": "vế đối", "v|ê|3": "bể vể", "v|ê|4": "vễnh vễ", "v|ê|5": "vệ sinh", "v|i|0": "vi vu", "v|i|1": "vì sao", "v|i|2": "ví dụ", "v|i|3": "vỉ thuốc", "v|i|4": "vĩ đại", "v|i|5": "vị ngọt", "v|o|0": "vo gạo", "v|o|1": "vò võ", "v|o|2": "cá vó", "v|o|3": "vỏ cam", "v|o|4": "võ thuật", "v|o|5": "con vọp", "v|ô|0": "đi vô", "v|ô|1": "vồ mồi", "v|ô|2": "vỗ vố", "v|ô|3": "vổ răng", "v|ô|4": "vỗ tay", "v|ô|5": "vộ vộ", "v|ơ|0": "vơ vét", "v|ơ|1": "vờ vĩnh", "v|ơ|2": "vớ vẩn", "v|ơ|3": "vở bài tập", "v|ơ|4": "vỡ bát", "v|ơ|5": "vợ chồng", "v|u|0": "vi vu", "v|u|1": "vù vù", "v|u|2": "vú em", "v|u|3": "vủ vủ", "v|u|4": "vũ trụ", "v|u|5": "vụ việc", "v|ư|1": "vừ vừ", "v|ư|4": "vữ vữ", "v|ư|5": "vực thẳm", "x|a|0": "ở xa", "x|a|1": "xà phòng", "x|a|2": "xá tội", "x|a|3": "xả rác", "x|a|4": "xã hội", "x|a|5": "xạ thủ", "x|e|0": "xe cộ", "x|e|1": "xè xè", "x|e|2": "xé giấy", "x|e|3": "xẻ gỗ", "x|e|4": "san xẻ", "x|e|5": "xẹt qua", "x|ê|0": "xê dịch", "x|ê|1": "xề xòa", "x|ê|2": "xế chiều", "x|ê|3": "xểnh xể", "x|ê|4": "xễnh xễ", "x|ê|5": "xệ xệ", "x|i|0": "xi măng", "x|i|1": "xì xào", "x|i|2": "xí xóa", "x|i|3": "xỉ nhục", "x|i|5": "xị mặt", "x|o|0": "cái xoong", "x|o|1": "xò xò", "x|o|2": "xó xỉnh", "x|o|3": "xỏ lỗ", "x|o|4": "xõa tóc", "x|o|5": "xọ xọ", "x|ô|0": "cái xô", "x|ô|1": "xồ xồ", "x|ô|2": "xổ số", "x|ô|3": "xổ lồng", "x|ô|4": "xỗ xỗ", "x|ô|5": "bộ xộ", "x|ơ|0": "xơ mít", "x|ơ|1": "sờ xờ", "x|ơ|2": "xớ xớ", "x|ơ|3": "xở xở", "x|ơ|4": "cỡ xỡ", "x|ơ|5": "xợ xợ", "x|u|0": "đồng xu", "x|u|1": "xù xì", "x|u|2": "xú quẩy", "x|u|3": "xủ xủ", "x|u|4": "xũ xũ", "x|u|5": "xụ mặt", "x|ư|0": "ngày xưa", "x|ư|1": "xừ xừ", "x|ư|2": "xứ sở", "x|ư|3": "xử phạt", "x|ư|4": "chữ xữ", "x|ư|5": "xự xự", "ch|a|0": "cha mẹ", "ch|a|1": "chà là", "ch|a|2": "cháu chá", "ch|a|3": "chả giò", "ch|a|4": "chã chã", "ch|a|5": "chung chạ", "ch|e|0": "che chở", "ch|e|1": "chè ngọt", "ch|e|2": "cái ché", "ch|e|3": "chẻ củi", "ch|e|4": "chặt chẽ", "ch|e|5": "chẹt xe", "ch|ê|0": "khen chê", "ch|ê|1": "chề chề", "ch|ê|2": "chế tạo", "ch|ê|3": "chểnh mảng", "ch|ê|4": "chễm chệ", "ch|ê|5": "chệch hướng", "ch|i|0": "chi tiêu", "ch|i|1": "bút chì", "ch|i|2": "chí khí", "ch|i|3": "sợi chỉ", "ch|i|4": "chĩa súng", "ch|i|5": "chị gái", "ch|o|0": "cho quà", "ch|o|1": "cây chò", "ch|o|2": "con chó", "ch|o|3": "chỏ xôi", "ch|o|4": "chõ tai", "ch|o|5": "chọc ghẹo", "ch|ô|0": "chồi chô", "ch|ô|1": "chồm chồ", "ch|ô|2": "chối từ", "ch|ô|3": "cái chổi", "ch|ô|4": "chỗ ngồi", "ch|ô|5": "trộn chộ", "ch|ơ|0": "chơ vơ", "ch|ơ|1": "chờ đợi", "ch|ơ|2": "chớ quên", "ch|ơ|3": "chở hàng", "ch|ơ|4": "chỡ chỡ", "ch|ơ|5": "đi chợ", "ch|u|0": "chu đáo", "ch|u|1": "chù chù", "ch|u|2": "chú bác", "ch|u|3": "ông chủ", "ch|u|4": "chũm chọe", "ch|u|5": "chụm đầu", "ch|ư|0": "chư vị", "ch|ư|1": "bây chừ", "ch|ư|2": "chứ sao", "ch|ư|4": "chữ cái", "ch|ư|5": "chực chờ", "gh|e|0": "thuyền ghe", "gh|e|1": "ghè đá", "gh|e|2": "ghé chơi", "gh|e|3": "con ghẻ", "gh|e|5": "con ghẹ", "gh|ê|0": "ghê sợ", "gh|ê|1": "gồ ghề", "gh|ê|2": "cái ghế", "gh|ê|3": "nghể ghể", "gh|ê|5": "trêu ghẹo", "gh|i|0": "ghi chép", "gh|i|1": "ghì chặt", "gh|i|2": "ghí ghí", "gh|i|5": "ghị chặt", "gi|a|0": "gia đình", "gi|a|1": "ông già", "gi|a|2": "giá cả", "gi|a|3": "giả vờ", "gi|a|4": "giã giò", "gi|a|5": "giặt giạ", "gi|e|1": "gie gè", "gi|e|3": "giẻ lau", "gi|e|5": "giẹt giẹt", "gi|ê|0": "giê lúa", "gi|ê|1": "củ giềng", "gi|ê|2": "giếng giế", "gi|o|0": "giò gio", "gi|o|1": "cây giò", "gi|o|2": "cơn gió", "gi|o|3": "cái giỏ", "gi|o|4": "giõ giõ", "gi|o|5": "giọt nước", "gi|ô|0": "giông giô", "gi|ô|1": "giồ giồ", "gi|ô|2": "giống giố", "gi|ô|4": "bão giỗ", "gi|ô|5": "giột giộ", "gi|ơ|0": "giơ tay", "gi|ơ|1": "giờ học", "gi|ơ|2": "giớ giớ", "gi|ơ|3": "giở sách", "gi|ơ|4": "giỡn mặt", "gi|ơ|5": "giợt giợ", "gi|u|0": "giu giu", "gi|u|1": "giùm giùm", "gi|u|2": "giúp giú", "gi|u|4": "giũ áo", "gi|u|5": "giục giã", "gi|ư|1": "nhừ giừ", "gi|ư|4": "gìn giữ", "kh|a|0": "kha khá", "kh|a|1": "khà khà", "kh|a|2": "khá giỏi", "kh|a|3": "khả năng", "kh|a|5": "khạc khạ", "kh|e|0": "khe suối", "kh|e|1": "khè khè", "kh|e|2": "khé cổ", "kh|e|3": "khẽ khẻ", "kh|e|4": "nói khẽ", "kh|e|5": "khẹt khẹ", "kh|ê|0": "cơm khê", "kh|ê|1": "khề khà", "kh|ê|2": "quả khế", "kh|ê|3": "răng khểnh", "kh|ê|5": "khệ nệ", "kh|i|0": "khi nào", "kh|i|1": "khì khì", "kh|i|2": "không khí", "kh|i|3": "con khỉ", "kh|i|5": "khịt mũi", "kh|o|0": "kho cá", "kh|o|1": "khò khò", "kh|o|2": "khó khăn", "kh|o|3": "khỏa nước", "kh|o|5": "khọm khọ", "kh|ô|0": "cá khô", "kh|ô|1": "khờ khồ", "kh|ô|2": "cái khố", "kh|ô|3": "khổ cực", "kh|ô|5": "khộc khộc", "kh|ơ|0": "khơi khơ", "kh|ơ|1": "khờ dại", "kh|ơ|2": "khớ khớ", "kh|ơ|3": "khởi đầu", "kh|ơ|5": "khợm khợ", "kh|u|0": "khu phố", "kh|u|1": "khù khờ", "kh|u|2": "khúm núm", "kh|u|5": "khụ khụ", "kh|ư|0": "khư khư", "kh|ư|2": "khứ hồi", "kh|ư|3": "khử trùng", "kh|ư|5": "khựng lại", "nh|a|0": "nha sĩ", "nh|a|1": "ngôi nhà", "nh|a|2": "nhá nhem", "nh|a|3": "nhả kẹo", "nh|a|4": "nhã nhặn", "nh|a|5": "nhạt nhạ", "nh|e|0": "nhe răng", "nh|e|1": "nhè nhẹ", "nh|e|2": "đi nhé", "nh|e|3": "nhỏ nhẻ", "nh|e|4": "có nhẽ", "nh|e|5": "nhẹ nhàng", "nh|ê|0": "nhơ nhê", "nh|ê|1": "nhề nhề", "nh|ê|2": "nhếch mép", "nh|ê|4": "nhễ nhại", "nh|ê|5": "nhệch nhệ", "nh|i|0": "thiếu nhi", "nh|i|1": "hạng nhì", "nh|i|2": "nhí nhảnh", "nh|i|3": "đẹp nhỉ", "nh|i|4": "nhĩ nhĩ", "nh|i|5": "nhị hoa", "nh|o|0": "quả nho", "nh|o|1": "nhòe nhò", "nh|o|2": "nhóc con", "nh|o|3": "nhỏ bé", "nh|o|4": "nhõng nhẽo", "nh|o|5": "nhọ nồi", "nh|ô|0": "nhô lên", "nh|ô|1": "nhồi nhồ", "nh|ô|2": "nhố nhăng", "nh|ô|3": "nhổ cỏ", "nh|ô|5": "nhộn nhịp", "nh|ơ|0": "nhơ bẩn", "nh|ơ|1": "nhờ vả", "nh|ơ|2": "nhớ nhung", "nh|ơ|3": "nhắc nhở", "nh|ơ|4": "lỡ nhỡ", "nh|ơ|5": "dây nhợ", "nh|u|0": "nhu mì", "nh|u|1": "nhùn nhù", "nh|u|2": "nhú mầm", "nh|u|3": "nhắn nhủ", "nh|u|4": "nhũ nhi", "nh|u|5": "vinh nhục", "nh|ư|0": "như vậy", "nh|ư|1": "nấu nhừ", "nh|ư|2": "nhức nhứ", "nh|ư|3": "nhử mồi", "nh|ư|4": "những nhữ", "nh|ư|5": "nhựa cây", "ng|a|0": "nga nga", "ng|a|1": "con ngà", "ng|a|2": "ngã ngá", "ng|a|3": "ngả đường", "ng|a|4": "ngã nhào", "ng|a|5": "ngang ngạ", "ng|o|0": "ngo ngo", "ng|o|1": "ngò gai", "ng|o|2": "ngó nghiêng", "ng|o|3": "ngõ ngỏ", "ng|o|4": "ngõ hẻm", "ng|o|5": "ngọ nguậy", "ng|ô|0": "bắp ngô", "ng|ô|1": "ngồi ngồ", "ng|ô|2": "ngộ ngố", "ng|ô|3": "ngổ ngáo", "ng|ô|4": "ngỗ nghịch", "ng|ô|5": "ngộ nghĩnh", "ng|ơ|0": "ngơ ngác", "ng|ơ|1": "ngờ ngợ", "ng|ơ|2": "ngớ ngẩn", "ng|ơ|3": "ngở ngở", "ng|ơ|4": "ngỡ ngàng", "ng|ơ|5": "ngờ ngợ", "ng|u|0": "ngu ngơ", "ng|u|1": "ngủ ngù", "ng|u|2": "ngú ngú", "ng|u|3": "đi ngủ", "ng|u|4": "ngũ cốc", "ng|u|5": "ngụ ngôn", "ng|ư|0": "ngư dân", "ng|ư|1": "ngừ ngừ", "ng|ư|2": "ngực ngứ", "ng|ư|3": "ngửa mặt", "ng|ư|4": "ngữ văn", "ng|ư|5": "ngự trị", "ngh|e|0": "lắng nghe", "ngh|e|1": "ông nghè", "ngh|e|2": "con nghé", "ngh|e|3": "nghé nghẻ", "ngh|e|4": "nghẽn nghẽ", "ngh|e|5": "nghẹn ngào", "ngh|ê|0": "con nghê", "ngh|ê|1": "nghề nghiệp", "ngh|ê|2": "nghếch nghế", "ngh|ê|3": "nghểnh cổ", "ngh|ê|4": "nghễu nghện", "ngh|ê|5": "củ nghệ", "ngh|i|0": "nghi ngờ", "ngh|i|1": "nghĩa nghì", "ngh|i|2": "nghí nghí", "ngh|i|3": "nghỉ ngơi", "ngh|i|4": "suy nghĩ", "ngh|i|5": "nghị lực", "ph|a|0": "pha sữa", "ph|a|1": "đi phà", "ph|a|2": "phá vỡ", "ph|a|3": "phả vào", "ph|a|5": "phạt phạ", "ph|e|0": "phe phẩy", "ph|e|1": "phè phỡn", "ph|e|2": "phé phé", "ph|e|3": "khỏe phẻ", "ph|e|5": "phẹt phẹt", "ph|ê|0": "cà phê", "ph|ê|1": "phề phào", "ph|ê|2": "tàn phế", "ph|ê|3": "phểnh phể", "ph|ê|4": "phễu phễ", "ph|ê|5": "bụng phệ", "ph|i|0": "phi ngựa", "ph|i|1": "béo phì", "ph|i|2": "chi phí", "ph|i|3": "phỉ chí", "ph|i|5": "phị mặt", "ph|o|0": "pho tượng", "ph|o|1": "phò tá", "ph|o|2": "phó thác", "ph|o|3": "phỏng phỏ", "ph|o|5": "phọc phọc", "ph|ô|0": "phô trương", "ph|ô|1": "phồn phồ", "ph|ô|2": "đường phố", "ph|ô|3": "phổ biến", "ph|ô|5": "phộc phộc", "ph|ơ|0": "phơ phất", "ph|ơ|1": "phờ phạc", "ph|ơ|2": "phớn phở", "ph|ơ|3": "bát phở", "ph|ơ|5": "phợ phợ", "ph|u|0": "phu thê", "ph|u|1": "phù phép", "ph|u|2": "phú quý", "ph|u|3": "chính phủ", "ph|u|4": "phũ phàng", "ph|u|5": "phụ giúp", "ph|ư|5": "phựt phự", "qu|a|0": "đi qua", "qu|a|1": "hộp quà", "qu|a|2": "quá nhiều", "qu|a|3": "quả táo", "qu|a|5": "con quạ", "qu|e|0": "que kem", "qu|e|1": "chân què", "qu|e|2": "quéo qué", "qu|e|3": "quẻ bói", "qu|e|4": "quạnh quẽ", "qu|e|5": "rẽ quẹo", "qu|ê|0": "quê hương", "qu|ê|1": "quề quào", "qu|ê|2": "vỏ quế", "qu|ê|3": "uể quể", "qu|ê|5": "kiệt quệ", "qu|i|0": "qui định", "qu|i|1": "quì gối", "qu|i|2": "quí báu", "qu|i|3": "quỉ sứ", "qu|i|4": "quĩ đạo", "qu|i|5": "ngã quị", "qu|ơ|0": "quơ tay", "qu|ơ|1": "quờ quạng", "qu|ơ|3": "quở trách", "th|a|0": "tha thứ", "th|a|1": "thà là", "th|a|2": "thá gì", "th|a|3": "thả diều", "th|a|5": "thạc sĩ", "th|e|0": "vải the", "th|e|1": "thè lưỡi", "th|e|2": "the thé", "th|e|3": "cái thẻ", "th|e|4": "nhỏ thẽ", "th|e|5": "thẹn thùng", "th|ê|0": "thê thảm", "th|ê|1": "lời thề", "th|ê|2": "thế giới", "th|ê|3": "thân thể", "th|ê|5": "tuyên thệ", "th|i|0": "thi đua", "th|i|1": "thì là", "th|i|2": "thí nghiệm", "th|i|3": "thủ thỉ", "th|i|5": "quả thị", "th|o|0": "thoăn thoắt", "th|o|1": "thò đầu", "th|o|2": "thó đồ", "th|o|3": "con thỏ", "th|o|4": "thõng tay", "th|o|5": "sống thọ", "th|ô|0": "thô sơ", "th|ô|1": "chở thồ", "th|ô|2": "cái thố", "th|ô|3": "thổ địa", "th|ô|4": "thỗn thỗ", "th|ô|5": "thộn thộn", "th|ơ|0": "bài thơ", "th|ơ|1": "thờ cúng", "th|ơ|2": "thớ gỗ", "th|ơ|3": "hít thở", "th|ơ|5": "thợ may", "th|u|0": "mùa thu", "th|u|1": "kẻ thù", "th|u|2": "thú cưng", "th|u|3": "thủ đô", "th|u|4": "thũm thũ", "th|u|5": "tiếp thụ", "th|ư|0": "lá thư", "th|ư|1": "thừ người", "th|ư|2": "thứ tự", "th|ư|3": "thử sức", "th|ư|5": "biệt thự", "tr|a|0": "tra cứu", "tr|a|1": "tách trà", "tr|a|2": "ngụy trá", "tr|a|3": "trả bài", "tr|a|5": "trại gà", "tr|e|0": "cây tre", "tr|e|2": "món tré", "tr|e|3": "trẻ em", "tr|e|5": "trẹo chân", "tr|ê|0": "cá trê", "tr|ê|1": "môi trề", "tr|ê|4": "chậm trễ", "tr|ê|5": "trì trệ", "tr|i|0": "tri thức", "tr|i|1": "kiên trì", "tr|i|2": "trí nhớ", "tr|i|3": "chỉ trỉ", "tr|i|4": "chim trĩ", "tr|i|5": "chữa trị", "tr|o|0": "tro bếp", "tr|o|1": "học trò", "tr|o|2": "tróc tró", "tr|o|3": "chỉ trỏ", "tr|o|5": "nhà trọ", "tr|ô|0": "trồi trô", "tr|ô|1": "trồ mắt", "tr|ô|2": "trố mắt", "tr|ô|3": "trổ tài", "tr|ô|5": "trộn trộ", "tr|ơ|0": "trơ trọi", "tr|ơ|1": "trời trờ", "tr|ơ|2": "trớ trêu", "tr|ơ|3": "trở về", "tr|ơ|4": "hỗ trợ", "tr|ơ|5": "trợ cấp", "tr|u|0": "tru tréo", "tr|u|1": "trù phú", "tr|u|2": "trú mưa", "tr|u|5": "trụ cột", "tr|ư|0": "trư bát giới", "tr|ư|1": "phép trừ", "tr|ư|2": "trứ danh", "tr|ư|4": "tích trữ", "tr|ư|5": "trực nhật"};

const VN_SPELL = {
  // 27 Phụ âm đơn và ghép kèm âm đọc chuẩn
  C: [
    { c: "b", r: "bờ" }, { c: "c", r: "cờ" }, { c: "d", r: "dờ" }, { c: "đ", r: "đờ" },
    { c: "g", r: "gờ" }, { c: "h", r: "hờ" }, { c: "k", r: "ca" }, { c: "l", r: "lờ" },
    { c: "m", r: "mờ" }, { c: "n", r: "nờ" }, { c: "p", r: "pờ" }, { c: "r", r: "rờ" },
    { c: "s", r: "sờ" }, { c: "t", r: "tờ" }, { c: "v", r: "vờ" }, { c: "x", r: "xờ" },
    // 11 Phụ âm ghép
    { c: "ch", r: "chờ" }, { c: "gh", r: "gờ" }, { c: "gi", r: "di" }, { c: "kh", r: "khờ" },
    { c: "nh", r: "nhờ" }, { c: "ng", r: "ngờ" }, { c: "ngh", r: "ngờ" }, { c: "ph", r: "phờ" },
    { c: "qu", r: "quờ" }, { c: "th", r: "thờ" }, { c: "tr", r: "trờ" }
  ],
  // 9 Nguyên âm đơn mở chuẩn Tiếng Việt Lớp 1 (loại bỏ ă, â vì ă, â là nguyên âm ngắn bắt buộc có âm cuối)
  V: [
    { v: "a", t: ["a","à","á","ả","ã","ạ"] },
    { v: "e", t: ["e","è","é","ẻ","ẽ","ẹ"] },
    { v: "ê", t: ["ê","ề","ế","ể","ễ","ệ"] },
    { v: "i", t: ["i","ì","í","ỉ","ĩ","ị"] },
    { v: "o", t: ["o","ò","ó","ỏ","õ","ọ"] },
    { v: "ô", t: ["ô","ồ","ố","ổ","ỗ","ộ"] },
    { v: "ơ", t: ["ơ","ờ","ớ","ở","ỡ","ợ"] },
    { v: "u", t: ["u","ù","ú","ủ","ũ","ụ"] },
    { v: "ư", t: ["ư","ừ","ứ","ử","ữ","ự"] }
  ],
  // 6 Thanh điệu
  TONES: [
    { n: "Không dấu", s: "—", k: "" },
    { n: "Huyền", s: "\\", k: "huyền" },
    { n: "Sắc", s: "/", k: "sắc" },
    { n: "Hỏi", s: "?", k: "hỏi" },
    { n: "Ngã", s: "~", k: "ngã" },
    { n: "Nặng", s: ".", k: "nặng" }
  ],
  // Kiểm tra luật chính tả ghép âm tiếng Việt
  valid(c, v) {
    if (["k","gh","ngh"].includes(c)) return ["e","ê","i"].includes(v);
    if (["c","g","ng"].includes(c)) return ["a","o","ô","ơ","u","ư"].includes(v);
    if (c === "qu") return ["a","e","ê","i","ơ"].includes(v);
    if (c === "gi") return ["a","e","ê","o","ô","ơ","u","ư"].includes(v);
    return true;
  },
  // Tạo tiếng, kiểm tra từ vựng có nghĩa và câu đánh vần
  syl(consObj, vowelObj, toneIdx) {
    const c = consObj.c, cRead = consObj.r, v = vowelObj.v;
    const tonedV = vowelObj.t[toneIdx];
    const validOrth = this.valid(c, v);
    let text = c + tonedV;
    if (c === "gi" && v === "ê") text = "gi" + tonedV;
    let base = c + v;
    let tName = this.TONES[toneIdx].k;
    let spell = toneIdx === 0 ? `${cRead} - ${v} - ${base}` : `${cRead} - ${v} - ${base} - ${tName} - ${text}`;
    const ex = (typeof VN_SPELL_WORDS !== "undefined" && VN_SPELL_WORDS[`${c}|${v}|${toneIdx}`]) || "";
    const hasMeaning = Boolean(ex);
    return { text, spell, tName: this.TONES[toneIdx].n, valid: validOrth, hasMeaning, ex };
  }
};

const VN_LESSONS = [
  {
    "id": 1,
    "title": "Bài 1: Vần OI - AI",
    "rhymes": [
      {
        "rhyme": "oi",
        "slug": "oi",
        "formula": "o - i - oi",
        "audioRhyme": "audio/rhyme_oi.mp3",
        "audioSpell": "audio/rhyme_spell_oi.mp3"
      },
      {
        "rhyme": "ai",
        "slug": "ai",
        "formula": "a - i - ai",
        "audioRhyme": "audio/rhyme_ai.mp3",
        "audioSpell": "audio/rhyme_spell_ai.mp3"
      }
    ],
    "words": [
      {
        "word": "gói quà",
        "spell": "g - oi - goi - sắc - gói",
        "audio": "audio/spell_w_goi_qua.mp3"
      },
      {
        "word": "xe tải",
        "spell": "t - ai - tai - hỏi - tải",
        "audio": "audio/spell_w_xe_tai.mp3"
      },
      {
        "word": "cái còi",
        "spell": "c - oi - coi - huyền - còi",
        "audio": "audio/spell_w_cai_coi.mp3"
      },
      {
        "word": "hoa mai",
        "spell": "m - ai - mai",
        "audio": "audio/spell_w_hoa_mai.mp3"
      }
    ],
    "sentence": "Bé gói quà tặng cô. Bố lái xe tải về nhà.",
    "sentenceAudio": "audio/les_sen_1.mp3"
  },
  {
    "id": 2,
    "title": "Bài 2: Vần ON - AN",
    "rhymes": [
      {
        "rhyme": "on",
        "slug": "on",
        "formula": "o - n - on",
        "audioRhyme": "audio/rhyme_on.mp3",
        "audioSpell": "audio/rhyme_spell_on.mp3"
      },
      {
        "rhyme": "an",
        "slug": "an",
        "formula": "a - n - an",
        "audioRhyme": "audio/rhyme_an.mp3",
        "audioSpell": "audio/rhyme_spell_an.mp3"
      }
    ],
    "words": [
      {
        "word": "con cá",
        "spell": "c - on - con",
        "audio": "audio/spell_w_con_ca.mp3"
      },
      {
        "word": "cái bàn",
        "spell": "b - an - ban - huyền - bàn",
        "audio": "audio/spell_w_cai_ban.mp3"
      },
      {
        "word": "lon ton",
        "spell": "t - on - ton",
        "audio": "audio/spell_w_lon_ton.mp3"
      },
      {
        "word": "đan len",
        "spell": "đ - an - đan",
        "audio": "audio/spell_w_dan_len.mp3"
      }
    ],
    "sentence": "Bé ngồi học bên bàn nhỏ. Đàn gà lon ton theo mẹ.",
    "sentenceAudio": "audio/les_sen_2.mp3"
  },
  {
    "id": 3,
    "title": "Bài 3: Vần ÔN - ƠN",
    "rhymes": [
      {
        "rhyme": "ôn",
        "slug": "oon",
        "formula": "ô - n - ôn",
        "audioRhyme": "audio/rhyme_oon.mp3",
        "audioSpell": "audio/rhyme_spell_oon.mp3"
      },
      {
        "rhyme": "ơn",
        "slug": "own",
        "formula": "ơ - n - ơn",
        "audioRhyme": "audio/rhyme_own.mp3",
        "audioSpell": "audio/rhyme_spell_own.mp3"
      }
    ],
    "words": [
      {
        "word": "chồn nâu",
        "spell": "ch - ôn - chôn - huyền - chồn",
        "audio": "audio/spell_w_chon_nau.mp3"
      },
      {
        "word": "cơn mưa",
        "spell": "c - ơn - cơn",
        "audio": "audio/spell_w_con_mua.mp3"
      },
      {
        "word": "mái tôn",
        "spell": "t - ôn - tôn",
        "audio": "audio/spell_w_mai_ton.mp3"
      },
      {
        "word": "cảm ơn",
        "spell": "ơ - n - ơn",
        "audio": "audio/spell_w_cam_on.mp3"
      }
    ],
    "sentence": "Bé lễ phép nói cảm ơn. Chú chồn nâu tinh nghịch dưới cơn mưa.",
    "sentenceAudio": "audio/les_sen_3.mp3"
  },
  {
    "id": 4,
    "title": "Bài 4: Vần UA - ƯA",
    "rhymes": [
      {
        "rhyme": "ua",
        "slug": "ua",
        "formula": "u - a - ua",
        "audioRhyme": "audio/rhyme_ua.mp3",
        "audioSpell": "audio/rhyme_spell_ua.mp3"
      },
      {
        "rhyme": "ưa",
        "slug": "uwa",
        "formula": "ư - a - ưa",
        "audioRhyme": "audio/rhyme_uwa.mp3",
        "audioSpell": "audio/rhyme_spell_uwa.mp3"
      }
    ],
    "words": [
      {
        "word": "con cua",
        "spell": "c - ua - cua",
        "audio": "audio/spell_w_con_cua.mp3"
      },
      {
        "word": "cơn mưa",
        "spell": "m - ưa - mưa",
        "audio": "audio/spell_w_con_mua2.mp3"
      },
      {
        "word": "chú rùa",
        "spell": "r - ua - rua - huyền - rùa",
        "audio": "audio/spell_w_chu_rua.mp3"
      },
      {
        "word": "quả dưa",
        "spell": "d - ưa - dưa",
        "audio": "audio/spell_w_qua_dua.mp3"
      }
    ],
    "sentence": "Trời đổ mưa rào, chú rùa bò chậm chạp bên bờ suối.",
    "sentenceAudio": "audio/les_sen_4.mp3"
  },
  {
    "id": 5,
    "title": "Bài 5: Vần ÔI - ƠI",
    "rhymes": [
      {
        "rhyme": "ôi",
        "slug": "ooi",
        "formula": "ô - i - ôi",
        "audioRhyme": "audio/rhyme_ooi.mp3",
        "audioSpell": "audio/rhyme_spell_ooi.mp3"
      },
      {
        "rhyme": "ơi",
        "slug": "owi",
        "formula": "ơ - i - ơi",
        "audioRhyme": "audio/rhyme_owi.mp3",
        "audioSpell": "audio/rhyme_spell_owi.mp3"
      }
    ],
    "words": [
      {
        "word": "xe nôi",
        "spell": "n - ôi - nôi",
        "audio": "audio/spell_w_xe_noi.mp3"
      },
      {
        "word": "bơi lội",
        "spell": "b - ơi - bơi",
        "audio": "audio/spell_w_boi_loi.mp3"
      },
      {
        "word": "đôi đũa",
        "spell": "đ - ôi - đôi",
        "audio": "audio/spell_w_doi_dua.mp3"
      },
      {
        "word": "vui chơi",
        "spell": "ch - ơi - chơi",
        "audio": "audio/spell_w_vui_choi.mp3"
      }
    ],
    "sentence": "Bé ngồi trong xe nôi chơi đùa. Đàn cá bơi lội tung tăng.",
    "sentenceAudio": "audio/les_sen_5.mp3"
  },
  {
    "id": 6,
    "title": "Bài 6: Vần EN - ÊN",
    "rhymes": [
      {
        "rhyme": "en",
        "slug": "en",
        "formula": "e - n - en",
        "audioRhyme": "audio/rhyme_en.mp3",
        "audioSpell": "audio/rhyme_spell_en.mp3"
      },
      {
        "rhyme": "ên",
        "slug": "een",
        "formula": "ê - n - ên",
        "audioRhyme": "audio/rhyme_een.mp3",
        "audioSpell": "audio/rhyme_spell_een.mp3"
      }
    ],
    "words": [
      {
        "word": "hoa sen",
        "spell": "s - en - sen",
        "audio": "audio/spell_w_hoa_sen.mp3"
      },
      {
        "word": "ngọn nến",
        "spell": "n - ên - nên - sắc - nến",
        "audio": "audio/spell_w_ngon_nen.mp3"
      },
      {
        "word": "màu đen",
        "spell": "đ - en - đen",
        "audio": "audio/spell_w_mau_den.mp3"
      },
      {
        "word": "mũi tên",
        "spell": "t - ên - tên",
        "audio": "audio/spell_w_mui_ten.mp3"
      }
    ],
    "sentence": "Hồ sen ngát hương thơm. Ngọn nến lung linh tỏa sáng.",
    "sentenceAudio": "audio/les_sen_6.mp3"
  },
  {
    "id": 7,
    "title": "Bài 7: Vần AY - ÂY",
    "rhymes": [
      {
        "rhyme": "ay",
        "slug": "ay",
        "formula": "a - y - ay",
        "audioRhyme": "audio/rhyme_ay.mp3",
        "audioSpell": "audio/rhyme_spell_ay.mp3"
      },
      {
        "rhyme": "ây",
        "slug": "aay",
        "formula": "â - y - ây",
        "audioRhyme": "audio/rhyme_aay.mp3",
        "audioSpell": "audio/rhyme_spell_aay.mp3"
      }
    ],
    "words": [
      {
        "word": "máy bay",
        "spell": "m - ay - may - sắc - máy",
        "audio": "audio/spell_w_may_bay.mp3"
      },
      {
        "word": "cây xanh",
        "spell": "c - ây - cây",
        "audio": "audio/spell_w_cay_xanh.mp3"
      },
      {
        "word": "bàn tay",
        "spell": "t - ay - tay",
        "audio": "audio/spell_w_ban_tay.mp3"
      },
      {
        "word": "đám mây",
        "spell": "m - ây - mây",
        "audio": "audio/spell_w_dam_may.mp3"
      }
    ],
    "sentence": "Bàn tay bé nhỏ xinh. Máy bay lướt qua từng đám mây trắng.",
    "sentenceAudio": "audio/les_sen_7.mp3"
  },
  {
    "id": 8,
    "title": "Bài 8: Vần OM - AM",
    "rhymes": [
      {
        "rhyme": "om",
        "slug": "om",
        "formula": "o - m - om",
        "audioRhyme": "audio/rhyme_om.mp3",
        "audioSpell": "audio/rhyme_spell_om.mp3"
      },
      {
        "rhyme": "am",
        "slug": "am",
        "formula": "a - m - am",
        "audioRhyme": "audio/rhyme_am.mp3",
        "audioSpell": "audio/rhyme_spell_am.mp3"
      }
    ],
    "words": [
      {
        "word": "đom đóm",
        "spell": "đ - om - đom",
        "audio": "audio/spell_w_dom_dom.mp3"
      },
      {
        "word": "quả cam",
        "spell": "c - am - cam",
        "audio": "audio/spell_w_qua_cam.mp3"
      },
      {
        "word": "chòm râu",
        "spell": "ch - om - chom - huyền - chòm",
        "audio": "audio/spell_w_chom_rau.mp3"
      },
      {
        "word": "chăm làm",
        "spell": "l - am - lam - huyền - làm",
        "audio": "audio/spell_w_cham_lam.mp3"
      }
    ],
    "sentence": "Đom đóm thắp đèn bay trong đêm. Mẹ cho bé quả cam ngọt lành.",
    "sentenceAudio": "audio/les_sen_8.mp3"
  },
  {
    "id": 9,
    "title": "Bài 9: Vần ÔM - ƠM",
    "rhymes": [
      {
        "rhyme": "ôm",
        "slug": "oom",
        "formula": "ô - m - ôm",
        "audioRhyme": "audio/rhyme_oom.mp3",
        "audioSpell": "audio/rhyme_spell_oom.mp3"
      },
      {
        "rhyme": "ơm",
        "slug": "owm",
        "formula": "ơ - m - ơm",
        "audioRhyme": "audio/rhyme_owm.mp3",
        "audioSpell": "audio/rhyme_spell_owm.mp3"
      }
    ],
    "words": [
      {
        "word": "con tôm",
        "spell": "t - ôm - tôm",
        "audio": "audio/spell_w_con_tom.mp3"
      },
      {
        "word": "bát cơm",
        "spell": "c - ơm - cơm",
        "audio": "audio/spell_w_bat_com.mp3"
      },
      {
        "word": "ôm mẹ",
        "spell": "ô - m - ôm",
        "audio": "audio/spell_w_om_me.mp3"
      },
      {
        "word": "hương thơm",
        "spell": "th - ơm - thơm",
        "audio": "audio/spell_w_huong_thom.mp3"
      }
    ],
    "sentence": "Bé sà vào lòng ôm mẹ. Cơm mẹ nấu tỏa hương thơm ngát.",
    "sentenceAudio": "audio/les_sen_9.mp3"
  },
  {
    "id": 10,
    "title": "Bài 10: Vần EM - ÊM",
    "rhymes": [
      {
        "rhyme": "em",
        "slug": "em",
        "formula": "e - m - em",
        "audioRhyme": "audio/rhyme_em.mp3",
        "audioSpell": "audio/rhyme_spell_em.mp3"
      },
      {
        "rhyme": "êm",
        "slug": "eem",
        "formula": "ê - m - êm",
        "audioRhyme": "audio/rhyme_eem.mp3",
        "audioSpell": "audio/rhyme_spell_eem.mp3"
      }
    ],
    "words": [
      {
        "word": "que kem",
        "spell": "k - em - kem",
        "audio": "audio/spell_w_que_kem.mp3"
      },
      {
        "word": "ban đêm",
        "spell": "đ - êm - đêm",
        "audio": "audio/spell_w_ban_dem.mp3"
      },
      {
        "word": "em bé",
        "spell": "e - m - em",
        "audio": "audio/spell_w_em_be.mp3"
      },
      {
        "word": "êm ái",
        "spell": "ê - m - êm",
        "audio": "audio/spell_w_em_ai.mp3"
      }
    ],
    "sentence": "Em bé thích ăn que kem dâu. Chiếc gối êm đềm ru bé ngủ ngon.",
    "sentenceAudio": "audio/les_sen_10.mp3"
  },
  {
    "id": 11,
    "title": "Bài 11: Vần IM - UM",
    "rhymes": [
      {
        "rhyme": "im",
        "slug": "im",
        "formula": "i - m - im",
        "audioRhyme": "audio/rhyme_im.mp3",
        "audioSpell": "audio/rhyme_spell_im.mp3"
      },
      {
        "rhyme": "um",
        "slug": "um",
        "formula": "u - m - um",
        "audioRhyme": "audio/rhyme_um.mp3",
        "audioSpell": "audio/rhyme_spell_um.mp3"
      }
    ],
    "words": [
      {
        "word": "con chim",
        "spell": "ch - im - chim",
        "audio": "audio/spell_w_con_chim.mp3"
      },
      {
        "word": "cái chum",
        "spell": "ch - um - chum",
        "audio": "audio/spell_w_cai_chum.mp3"
      },
      {
        "word": "trái tim",
        "spell": "t - im - tim",
        "audio": "audio/spell_w_trai_tim.mp3"
      },
      {
        "word": "sum vầy",
        "spell": "s - um - sum",
        "audio": "audio/spell_w_sum_vay.mp3"
      }
    ],
    "sentence": "Chú chim hót líu lo trên cành. Cả nhà sum vầy bên mâm cơm ấm áp.",
    "sentenceAudio": "audio/les_sen_11.mp3"
  },
  {
    "id": 12,
    "title": "Bài 12: Vần IN - UN",
    "rhymes": [
      {
        "rhyme": "in",
        "slug": "in",
        "formula": "i - n - in",
        "audioRhyme": "audio/rhyme_in.mp3",
        "audioSpell": "audio/rhyme_spell_in.mp3"
      },
      {
        "rhyme": "un",
        "slug": "un",
        "formula": "u - n - un",
        "audioRhyme": "audio/rhyme_un.mp3",
        "audioSpell": "audio/rhyme_spell_un.mp3"
      }
    ],
    "words": [
      {
        "word": "quả chín",
        "spell": "ch - in - chin - sắc - chín",
        "audio": "audio/spell_w_qua_chin.mp3"
      },
      {
        "word": "chó cún",
        "spell": "c - un - cun - sắc - cún",
        "audio": "audio/spell_w_cho_cun.mp3"
      },
      {
        "word": "xin phép",
        "spell": "x - in - xin",
        "audio": "audio/spell_w_xin_phep.mp3"
      },
      {
        "word": "vun xới",
        "spell": "v - un - vun",
        "audio": "audio/spell_w_vun_xoi.mp3"
      }
    ],
    "sentence": "Bé ngoan biết xin phép bố mẹ. Chú cún con mừng rỡ vẫy đuôi.",
    "sentenceAudio": "audio/les_sen_12.mp3"
  },
  {
    "id": 13,
    "title": "Bài 13: Vần AU - ÂU",
    "rhymes": [
      {
        "rhyme": "au",
        "slug": "au",
        "formula": "a - u - au",
        "audioRhyme": "audio/rhyme_au.mp3",
        "audioSpell": "audio/rhyme_spell_au.mp3"
      },
      {
        "rhyme": "âu",
        "slug": "aau",
        "formula": "â - u - âu",
        "audioRhyme": "audio/rhyme_aau.mp3",
        "audioSpell": "audio/rhyme_spell_aau.mp3"
      }
    ],
    "words": [
      {
        "word": "rau xanh",
        "spell": "r - au - rau",
        "audio": "audio/spell_w_rau_xanh.mp3"
      },
      {
        "word": "dưa hấu",
        "spell": "h - âu - hâu - sắc - hấu",
        "audio": "audio/spell_w_dua_hau.mp3"
      },
      {
        "word": "cây cau",
        "spell": "c - au - cau",
        "audio": "audio/spell_w_cay_cau.mp3"
      },
      {
        "word": "chú gấu",
        "spell": "g - âu - gâu - sắc - gấu",
        "audio": "audio/spell_w_chu_gau.mp3"
      }
    ],
    "sentence": "Mẹ mua dưa hấu đỏ ngọt mát. Bé giúp mẹ tưới luống rau xanh.",
    "sentenceAudio": "audio/les_sen_13.mp3"
  },
  {
    "id": 14,
    "title": "Bài 14: Vần EO - AO",
    "rhymes": [
      {
        "rhyme": "eo",
        "slug": "eo",
        "formula": "e - o - eo",
        "audioRhyme": "audio/rhyme_eo.mp3",
        "audioSpell": "audio/rhyme_spell_eo.mp3"
      },
      {
        "rhyme": "ao",
        "slug": "ao",
        "formula": "a - o - ao",
        "audioRhyme": "audio/rhyme_ao.mp3",
        "audioSpell": "audio/rhyme_spell_ao.mp3"
      }
    ],
    "words": [
      {
        "word": "chú mèo",
        "spell": "m - eo - meo - huyền - mèo",
        "audio": "audio/spell_w_chu_meo.mp3"
      },
      {
        "word": "ngôi sao",
        "spell": "s - ao - sao",
        "audio": "audio/spell_w_ngoi_sao.mp3"
      },
      {
        "word": "leo trèo",
        "spell": "l - eo - leo",
        "audio": "audio/spell_w_leo_treo.mp3"
      },
      {
        "word": "quả táo",
        "spell": "t - ao - tao - sắc - táo",
        "audio": "audio/spell_w_qua_tao.mp3"
      }
    ],
    "sentence": "Chú mèo con thích trèo cau. Đêm rằm bầu trời lấp lánh muôn vì sao.",
    "sentenceAudio": "audio/les_sen_14.mp3"
  },
  {
    "id": 15,
    "title": "Bài 15: Vần IU - ÊU",
    "rhymes": [
      {
        "rhyme": "iu",
        "slug": "iu",
        "formula": "i - u - iu",
        "audioRhyme": "audio/rhyme_iu.mp3",
        "audioSpell": "audio/rhyme_spell_iu.mp3"
      },
      {
        "rhyme": "êu",
        "slug": "eeu",
        "formula": "ê - u - êu",
        "audioRhyme": "audio/rhyme_eeu.mp3",
        "audioSpell": "audio/rhyme_spell_eeu.mp3"
      }
    ],
    "words": [
      {
        "word": "cái rìu",
        "spell": "r - iu - riu - huyền - rìu",
        "audio": "audio/spell_w_cai_riu.mp3"
      },
      {
        "word": "cây nêu",
        "spell": "n - êu - nêu",
        "audio": "audio/spell_w_cay_neu.mp3"
      },
      {
        "word": "líu lo",
        "spell": "l - iu - liu - sắc - líu",
        "audio": "audio/spell_w_liu_lo.mp3"
      },
      {
        "word": "kêu to",
        "spell": "k - êu - kêu",
        "audio": "audio/spell_w_keu_to.mp3"
      }
    ],
    "sentence": "Bé dựng cây nêu ngày Tết. Đàn chim non hót líu lo chào ngày mới.",
    "sentenceAudio": "audio/les_sen_15.mp3"
  },
  {
    "id": 16,
    "title": "Bài 16: Vần UI - ƯI",
    "rhymes": [
      {
        "rhyme": "ui",
        "slug": "ui",
        "formula": "u - i - ui",
        "audioRhyme": "audio/rhyme_ui.mp3",
        "audioSpell": "audio/rhyme_spell_ui.mp3"
      },
      {
        "rhyme": "ưi",
        "slug": "uwi",
        "formula": "ư - i - ưi",
        "audioRhyme": "audio/rhyme_uwi.mp3",
        "audioSpell": "audio/rhyme_spell_uwi.mp3"
      }
    ],
    "words": [
      {
        "word": "cái túi",
        "spell": "t - ui - tui - sắc - túi",
        "audio": "audio/spell_w_cai_tui.mp3"
      },
      {
        "word": "gửi thư",
        "spell": "g - ưi - gưi - hỏi - gửi",
        "audio": "audio/spell_w_gui_thu.mp3"
      },
      {
        "word": "vui vẻ",
        "spell": "v - ui - vui",
        "audio": "audio/spell_w_vui_ve.mp3"
      },
      {
        "word": "ngửi hoa",
        "spell": "ng - ưi - ngưi - hỏi - ngửi",
        "audio": "audio/spell_w_ngui_hoa.mp3"
      }
    ],
    "sentence": "Bé vui vẻ bỏ vở vào túi để đến trường. Bé gửi thư thăm ông bà.",
    "sentenceAudio": "audio/les_sen_16.mp3"
  },
  {
    "id": 17,
    "title": "Bài 17: Vần ONG - ÔNG",
    "rhymes": [
      {
        "rhyme": "ong",
        "slug": "ong",
        "formula": "o - ng - ong",
        "audioRhyme": "audio/rhyme_ong.mp3",
        "audioSpell": "audio/rhyme_spell_ong.mp3"
      },
      {
        "rhyme": "ông",
        "slug": "oong",
        "formula": "ô - ng - ông",
        "audioRhyme": "audio/rhyme_oong.mp3",
        "audioSpell": "audio/rhyme_spell_oong.mp3"
      }
    ],
    "words": [
      {
        "word": "con ong",
        "spell": "o - ng - ong",
        "audio": "audio/spell_w_con_ong.mp3"
      },
      {
        "word": "chú công",
        "spell": "c - ông - công",
        "audio": "audio/spell_w_chu_cong.mp3"
      },
      {
        "word": "chong chóng",
        "spell": "ch - ong - chong",
        "audio": "audio/spell_w_chong_chong.mp3"
      },
      {
        "word": "dòng sông",
        "spell": "s - ông - sông",
        "audio": "audio/spell_w_dong_song.mp3"
      }
    ],
    "sentence": "Con ong chăm chỉ tìm mật. Chú công múa xoè đuôi rực rỡ bên bờ sông.",
    "sentenceAudio": "audio/les_sen_17.mp3"
  },
  {
    "id": 18,
    "title": "Bài 18: Vần UÔN - ƯƠN",
    "rhymes": [
      {
        "rhyme": "uôn",
        "slug": "uoon",
        "formula": "u - ô - n - uôn",
        "audioRhyme": "audio/rhyme_uoon.mp3",
        "audioSpell": "audio/rhyme_spell_uoon.mp3"
      },
      {
        "rhyme": "ươn",
        "slug": "uwown",
        "formula": "ư - ơ - n - ươn",
        "audioRhyme": "audio/rhyme_uwown.mp3",
        "audioSpell": "audio/rhyme_spell_uwown.mp3"
      }
    ],
    "words": [
      {
        "word": "chuồn chuồn",
        "spell": "ch - uôn - chuon - huyền - chuồn",
        "audio": "audio/spell_w_chuon_chuon.mp3"
      },
      {
        "word": "khu vườn",
        "spell": "v - ươn - vươn - huyền - vườn",
        "audio": "audio/spell_w_khu_vuon.mp3"
      },
      {
        "word": "cuốn sách",
        "spell": "c - uôn - cuon - sắc - cuốn",
        "audio": "audio/spell_w_cuon_sach.mp3"
      },
      {
        "word": "con lươn",
        "spell": "l - ươn - lươn",
        "audio": "audio/spell_w_con_luon.mp3"
      }
    ],
    "sentence": "Chú chuồn chuồn ớt bay lượn quanh khu vườn rực rỡ hoa tươi.",
    "sentenceAudio": "audio/les_sen_18.mp3"
  },
  {
    "id": 19,
    "title": "Bài 19: Vần OT - AT",
    "rhymes": [
      {
        "rhyme": "ot",
        "slug": "ot",
        "formula": "o - t - ot",
        "audioRhyme": "audio/rhyme_ot.mp3",
        "audioSpell": "audio/rhyme_spell_ot.mp3"
      },
      {
        "rhyme": "at",
        "slug": "at",
        "formula": "a - t - at",
        "audioRhyme": "audio/rhyme_at.mp3",
        "audioSpell": "audio/rhyme_spell_at.mp3"
      }
    ],
    "words": [
      {
        "word": "chim hót",
        "spell": "h - ot - hot - sắc - hót",
        "audio": "audio/spell_w_chim_hot.mp3"
      },
      {
        "word": "ca hát",
        "spell": "h - at - hat - sắc - hát",
        "audio": "audio/spell_w_ca_hat.mp3"
      },
      {
        "word": "gọt vỏ",
        "spell": "g - ot - got - nặng - gọt",
        "audio": "audio/spell_w_got_vo.mp3"
      },
      {
        "word": "bãi cát",
        "spell": "c - at - cat - sắc - cát",
        "audio": "audio/spell_w_bai_cat.mp3"
      }
    ],
    "sentence": "Bé cùng bạn ca hát rộn vang. Đàn chim hót véo von trong vòm lá.",
    "sentenceAudio": "audio/les_sen_19.mp3"
  },
  {
    "id": 20,
    "title": "Bài 20: Vần ET - ÊT",
    "rhymes": [
      {
        "rhyme": "et",
        "slug": "et",
        "formula": "e - t - et",
        "audioRhyme": "audio/rhyme_et.mp3",
        "audioSpell": "audio/rhyme_spell_et.mp3"
      },
      {
        "rhyme": "êt",
        "slug": "eet",
        "formula": "ê - t - êt",
        "audioRhyme": "audio/rhyme_eet.mp3",
        "audioSpell": "audio/rhyme_spell_eet.mp3"
      }
    ],
    "words": [
      {
        "word": "chim vẹt",
        "spell": "v - et - vet - nặng - vẹt",
        "audio": "audio/spell_w_chim_vet.mp3"
      },
      {
        "word": "ngày Tết",
        "spell": "t - êt - tet - sắc - tết",
        "audio": "audio/spell_w_ngay_tet.mp3"
      },
      {
        "word": "nét chữ",
        "spell": "n - et - net - sắc - nét",
        "audio": "audio/spell_w_net_chu.mp3"
      },
      {
        "word": "bánh tét",
        "spell": "t - et - tet - sắc - tét",
        "audio": "audio/spell_w_banh_tet.mp3"
      }
    ],
    "sentence": "Bé nắn nót viết từng nét chữ. Ngày Tết cả nhà quây quần gói bánh tét.",
    "sentenceAudio": "audio/les_sen_20.mp3"
  },
  {
    "id": 21,
    "title": "Bài 21: Vần IT - UT",
    "rhymes": [
      {
        "rhyme": "it",
        "slug": "it",
        "formula": "i - t - it",
        "audioRhyme": "audio/rhyme_it.mp3",
        "audioSpell": "audio/rhyme_spell_it.mp3"
      },
      {
        "rhyme": "ut",
        "slug": "ut",
        "formula": "u - t - ut",
        "audioRhyme": "audio/rhyme_ut.mp3",
        "audioSpell": "audio/rhyme_spell_ut.mp3"
      }
    ],
    "words": [
      {
        "word": "con vịt",
        "spell": "v - it - vit - nặng - vịt",
        "audio": "audio/spell_w_con_vit.mp3"
      },
      {
        "word": "cây bút",
        "spell": "b - ut - but - sắc - bút",
        "audio": "audio/spell_w_cay_but.mp3"
      },
      {
        "word": "trái mít",
        "spell": "m - it - mit - sắc - mít",
        "audio": "audio/spell_w_trai_mit.mp3"
      },
      {
        "word": "chim cút",
        "spell": "c - ut - cut - sắc - cút",
        "audio": "audio/spell_w_chim_cut.mp3"
      }
    ],
    "sentence": "Bé cầm cây bút chì tô màu chú vịt con bơi lội dưới ao.",
    "sentenceAudio": "audio/les_sen_21.mp3"
  },
  {
    "id": 22,
    "title": "Bài 22: Vần IA",
    "rhymes": [
      {
        "rhyme": "ia",
        "slug": "ia",
        "formula": "i - a - ia",
        "audioRhyme": "audio/rhyme_ia.mp3",
        "audioSpell": "audio/rhyme_spell_ia.mp3"
      }
    ],
    "words": [
      {
        "word": "cây mía",
        "spell": "m - ia - mia - sắc - mía",
        "audio": "audio/spell_w_cay_mia.mp3"
      },
      {
        "word": "cái thìa",
        "spell": "th - ia - thia - huyền - thìa",
        "audio": "audio/spell_w_cai_thia.mp3"
      },
      {
        "word": "cá lia thia",
        "spell": "l - ia - lia",
        "audio": "audio/spell_w_ca_lia_thia.mp3"
      },
      {
        "word": "chia quà",
        "spell": "ch - ia - chia",
        "audio": "audio/spell_w_chia_qua.mp3"
      }
    ],
    "sentence": "Mẹ dùng thìa bón sữa chua cho bé. Bé cùng bạn chia kẹo vui vẻ.",
    "sentenceAudio": "audio/les_sen_22.mp3"
  },
  {
    "id": 23,
    "title": "Bài 23: Vần UÔI - ƯƠI",
    "rhymes": [
      {
        "rhyme": "uôi",
        "slug": "uooi",
        "formula": "u - ô - i - uôi",
        "audioRhyme": "audio/rhyme_uooi.mp3",
        "audioSpell": "audio/rhyme_spell_uooi.mp3"
      },
      {
        "rhyme": "ươi",
        "slug": "uwowi",
        "formula": "ư - ơ - i - ươi",
        "audioRhyme": "audio/rhyme_uwowi.mp3",
        "audioSpell": "audio/rhyme_spell_uwowi.mp3"
      }
    ],
    "words": [
      {
        "word": "nải chuối",
        "spell": "ch - uôi - chuoi - sắc - chuối",
        "audio": "audio/spell_w_nai_chuoi.mp3"
      },
      {
        "word": "tươi cười",
        "spell": "c - ươi - cươi - huyền - cười",
        "audio": "audio/spell_w_tuoi_cuoi.mp3"
      },
      {
        "word": "con suối",
        "spell": "s - uôi - suoi - sắc - suối",
        "audio": "audio/spell_w_con_suoi.mp3"
      },
      {
        "word": "lưới cá",
        "spell": "l - ươi - luoi - sắc - lưới",
        "audio": "audio/spell_w_luoi_ca.mp3"
      }
    ],
    "sentence": "Nải chuối chín vàng thơm phức. Bé luôn tươi cười chào mọi người.",
    "sentenceAudio": "audio/les_sen_23.mp3"
  },
  {
    "id": 24,
    "title": "Bài 24: Vần ANH - ACH",
    "rhymes": [
      {
        "rhyme": "anh",
        "slug": "anh",
        "formula": "a - nh - anh",
        "audioRhyme": "audio/rhyme_anh.mp3",
        "audioSpell": "audio/rhyme_spell_anh.mp3"
      },
      {
        "rhyme": "ach",
        "slug": "ach",
        "formula": "a - ch - ach",
        "audioRhyme": "audio/rhyme_ach.mp3",
        "audioSpell": "audio/rhyme_spell_ach.mp3"
      }
    ],
    "words": [
      {
        "word": "quả chanh",
        "spell": "ch - anh - chanh",
        "audio": "audio/spell_w_qua_chanh.mp3"
      },
      {
        "word": "cuốn sách",
        "spell": "s - ach - sach - sắc - sách",
        "audio": "audio/spell_w_cuon_sach2.mp3"
      },
      {
        "word": "màu xanh",
        "spell": "x - anh - xanh",
        "audio": "audio/spell_w_mau_xanh.mp3"
      },
      {
        "word": "viên gạch",
        "spell": "g - ach - gach - sắc - gạch",
        "audio": "audio/spell_w_vien_gach.mp3"
      }
    ],
    "sentence": "Bé mở cuốn sách sạch đẹp ra đọc. Bầu trời xanh biếc bao la.",
    "sentenceAudio": "audio/les_sen_24.mp3"
  },
  {
    "id": 25,
    "title": "Bài 25: Vần IÊN - YÊN",
    "rhymes": [
      {
        "rhyme": "iên",
        "slug": "ieen",
        "formula": "i - ê - n - iên",
        "audioRhyme": "audio/rhyme_ieen.mp3",
        "audioSpell": "audio/rhyme_spell_ieen.mp3"
      },
      {
        "rhyme": "yên",
        "slug": "yeen",
        "formula": "y - ê - n - yên",
        "audioRhyme": "audio/rhyme_yeen.mp3",
        "audioSpell": "audio/rhyme_spell_yeen.mp3"
      }
    ],
    "words": [
      {
        "word": "cô tiên",
        "spell": "t - iên - tiên",
        "audio": "audio/spell_w_co_tien.mp3"
      },
      {
        "word": "chim yến",
        "spell": "y - ên - yên - sắc - yến",
        "audio": "audio/spell_w_chim_yen.mp3"
      },
      {
        "word": "bãi biển",
        "spell": "b - iên - biên - hỏi - biển",
        "audio": "audio/spell_w_bai_bien.mp3"
      },
      {
        "word": "yên tĩnh",
        "spell": "y - ên - yên",
        "audio": "audio/spell_w_yen_tinh.mp3"
      }
    ],
    "sentence": "Cô tiên hiền từ mang phép màu. Đàn chim yến chao liệng trên bãi biển.",
    "sentenceAudio": "audio/les_sen_25.mp3"
  },
  {
    "id": 26,
    "title": "Bài 26: Vần UÔNG - ƯƠNG",
    "rhymes": [
      {
        "rhyme": "uông",
        "slug": "uoong",
        "formula": "u - ô - ng - uông",
        "audioRhyme": "audio/rhyme_uoong.mp3",
        "audioSpell": "audio/rhyme_spell_uoong.mp3"
      },
      {
        "rhyme": "ương",
        "slug": "uwowng",
        "formula": "ư - ơ - ng - ương",
        "audioRhyme": "audio/rhyme_uwowng.mp3",
        "audioSpell": "audio/rhyme_spell_uwowng.mp3"
      }
    ],
    "words": [
      {
        "word": "tiếng chuông",
        "spell": "ch - uông - chuông",
        "audio": "audio/spell_w_tieng_chuong.mp3"
      },
      {
        "word": "hoa phượng",
        "spell": "ph - ương - phuong - nặng - phượng",
        "audio": "audio/spell_w_hoa_phuong.mp3"
      },
      {
        "word": "ruộng lúa",
        "spell": "r - uông - ruong - nặng - ruộng",
        "audio": "audio/spell_w_ruong_lua.mp3"
      },
      {
        "word": "soi gương",
        "spell": "g - ương - gương",
        "audio": "audio/spell_w_soi_guong.mp3"
      }
    ],
    "sentence": "Tiếng chuông ngân vang rộn ràng. Hoa phượng vĩ nở đỏ rực sân trường.",
    "sentenceAudio": "audio/les_sen_26.mp3"
  },
  {
    "id": 27,
    "title": "Bài 27: Vần UÔT - ƯƠT",
    "rhymes": [
      {
        "rhyme": "uôt",
        "slug": "uoot",
        "formula": "u - ô - t - uôt",
        "audioRhyme": "audio/rhyme_uoot.mp3",
        "audioSpell": "audio/rhyme_spell_uoot.mp3"
      },
      {
        "rhyme": "ươt",
        "slug": "uwowt",
        "formula": "ư - ơ - t - ươt",
        "audioRhyme": "audio/rhyme_uwowt.mp3",
        "audioSpell": "audio/rhyme_spell_uwowt.mp3"
      }
    ],
    "words": [
      {
        "word": "chú chuột",
        "spell": "ch - uôt - chuot - nặng - chuột",
        "audio": "audio/spell_w_chu_chuot.mp3"
      },
      {
        "word": "lướt sóng",
        "spell": "l - ươt - luot - sắc - lướt",
        "audio": "audio/spell_w_luot_song.mp3"
      },
      {
        "word": "tuốt lúa",
        "spell": "t - uôt - tuot - sắc - tuốt",
        "audio": "audio/spell_w_tuot_lua.mp3"
      },
      {
        "word": "xanh mướt",
        "spell": "m - ươt - muot - sắc - mướt",
        "audio": "audio/spell_w_xanh_muot.mp3"
      }
    ],
    "sentence": "Cánh đồng lúa chín vàng óng ả, cây cối xanh mướt quanh năm.",
    "sentenceAudio": "audio/les_sen_27.mp3"
  },
  {
    "id": 28,
    "title": "Bài 28: Vần OAI - OAY",
    "rhymes": [
      {
        "rhyme": "oai",
        "slug": "oai",
        "formula": "o - a - i - oai",
        "audioRhyme": "audio/rhyme_oai.mp3",
        "audioSpell": "audio/rhyme_spell_oai.mp3"
      },
      {
        "rhyme": "oay",
        "slug": "oay",
        "formula": "o - a - y - oay",
        "audioRhyme": "audio/rhyme_oay.mp3",
        "audioSpell": "audio/rhyme_spell_oay.mp3"
      }
    ],
    "words": [
      {
        "word": "củ khoai",
        "spell": "kh - oai - khoai",
        "audio": "audio/spell_w_cu_khoai.mp3"
      },
      {
        "word": "xoay tròn",
        "spell": "x - oay - xoay",
        "audio": "audio/spell_w_xoay_tron.mp3"
      },
      {
        "word": "quả xoài",
        "spell": "x - oai - xoai - huyền - xoài",
        "audio": "audio/spell_w_qua_xoai.mp3"
      },
      {
        "word": "loay hoay",
        "spell": "h - oay - hoay",
        "audio": "audio/spell_w_loay_hoay.mp3"
      }
    ],
    "sentence": "Bé thích ăn quả xoài cát thơm ngọt. Chong chóng gió xoay tít trong sân.",
    "sentenceAudio": "audio/les_sen_28.mp3"
  }
];

const VN_STORIES = [
  {
    id: "co_co",
    title: "Có cỗ",
    sentences: [
      "Nhà có giỗ, có cỗ to.",
      "Mâm cỗ có chả giò, có cá kho và gà luộc.",
      "Bé ăn ngoan nên đã no nê.",
      "Bé ngủ một giấc ngon lành khò khò."
    ]
  },
  {
    id: "qua_ba",
    title: "Món quà của bà",
    sentences: [
      "Thu qua nhà bà chơi vào ngày nghỉ.",
      "Bà tươi cười cho Thu một giỏ quà.",
      "Thu mở quà ra: có quả na mở mắt thơm lừng.",
      "Bà còn tặng Thu một cô búp bê mặc váy đỏ rất xinh."
    ]
  },
  {
    id: "bo_me_be",
    title: "Bé và gia đình",
    sentences: [
      "Bố bế bé Bi đi dạo mát ở bờ hồ.",
      "Mẹ đi chợ về có giỏ cá tươi và nải chuối chín.",
      "Buổi tối, bố dạy bé vẽ ngôi nhà và máy bay.",
      "Bé ôm cổ bố mẹ và nói: Con yêu bố mẹ nhiều lắm!"
    ]
  },
  {
    id: "buoi_sang",
    title: "Buổi sáng ở quê",
    sentences: [
      "Ở bờ đê xanh ngát có chú nghé tơ đang gặm cỏ non.",
      "Gà trống gáy vang le te báo trời đã sáng.",
      "Nắng sớm ấm áp chan hòa trên ngọn tre xanh.",
      "Các bạn nhỏ tung tăng cắp sách đến trường làng."
    ]
  },
  {
    id: "tha_ca",
    title: "Thả cá cờ",
    sentences: [
      "Mẹ dắt tay bé ra bờ hồ nước trong veo.",
      "Bé nhẹ nhàng thả chú cá cờ nhỏ xuống làn nước biếc.",
      "Đàn cá vẫy đuôi bơi lội tung tăng như đang cảm ơn bé.",
      "Bé mỉm cười vui sướng nhìn đàn cá bơi xa dần."
    ]
  },
  {
    id: "chu_khi",
    title: "Chú khỉ con",
    sentences: [
      "Trong vườn bách thú có chú khỉ con tinh nghịch.",
      "Chú thoăn thoắt chuyền từ cành cây này sang cành cây khác.",
      "Bé đưa cho chú khỉ một quả chuối chín vàng.",
      "Chú khỉ cầm lấy bóc vỏ ăn ngon lành rồi nhảy nhót cảm ơn."
    ]
  }
];

// 14 Nét viết cơ bản trong Tiền Tiểu Học (Theo giáo trình các nét cơ bản.pdf)
const VN_STROKES = [
  {
    id: "so_thang",
    name: "Nét sổ thẳng",
    en: "Vertical stroke",
    desc: "Kéo từ trên xuống dưới",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g1" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g1)"/><line x1="150" y1="50" x2="150" y2="320" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="150" cy="50" r="10" fill="#ff7aa8"/><path d="M142,185 L150,205 L158,185" fill="none" stroke="#ff7aa8" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: "ngang",
    name: "Nét ngang",
    en: "Horizontal stroke",
    desc: "Kéo từ trái sang phải",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g2" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g2)"/><line x1="40" y1="185" x2="260" y2="185" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="40" cy="185" r="10" fill="#ff7aa8"/><path d="M140,177 L160,185 L140,193" fill="none" stroke="#ff7aa8" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: "xien_phai",
    name: "Nét xiên phải",
    en: "Slant right stroke",
    desc: "Kéo xiên từ trên xuống phải",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g3" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g3)"/><line x1="80" y1="50" x2="220" y2="320" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="80" cy="50" r="10" fill="#ff7aa8"/><path d="M145,170 L158,195 L165,178" fill="none" stroke="#ff7aa8" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: "xien_trai",
    name: "Nét xiên trái",
    en: "Slant left stroke",
    desc: "Kéo xiên từ trên xuống trái",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g4" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g4)"/><line x1="220" y1="50" x2="80" y2="320" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="220" cy="50" r="10" fill="#ff7aa8"/><path d="M155,170 L142,195 L135,178" fill="none" stroke="#ff7aa8" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: "moc_xuoi",
    name: "Nét móc xuôi",
    en: "Hook up stroke",
    desc: "Móc cong trên kéo xuống",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g5" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g5)"/><path d="M70,160 Q100,50 170,50 L170,320" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="70" cy="160" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "moc_nguoc",
    name: "Nét móc ngược",
    en: "Hook down stroke",
    desc: "Kéo thẳng xuống lượn móc lên",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g6" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g6)"/><path d="M130,50 L130,260 Q130,320 220,320" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="130" cy="50" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "moc_2_dau",
    name: "Nét móc hai đầu",
    en: "Double hook stroke",
    desc: "Móc trên rồi móc dưới",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g7" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g7)"/><path d="M60,180 Q80,50 140,50 L160,50 Q220,50 220,260 Q220,320 260,320" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="60" cy="180" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "cong_ho_phai",
    name: "Nét cong hở phải",
    en: "Open-right curve",
    desc: "Như chữ C",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g8" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g8)"/><path d="M220,70 Q70,60 70,185 Q70,310 220,300" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="220" cy="70" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "cong_ho_trai",
    name: "Nét cong hở trái",
    en: "Open-left curve",
    desc: "Như chữ C ngược",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g9" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g9)"/><path d="M80,70 Q230,60 230,185 Q230,310 80,300" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="80" cy="70" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "cong_kin",
    name: "Nét cong kín",
    en: "Closed circle curve",
    desc: "Như chữ O tròn",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g10" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g10)"/><ellipse cx="150" cy="185" rx="90" ry="125" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="150" cy="60" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "khuyet_tren",
    name: "Nét khuyết trên",
    en: "Upper loop stroke",
    desc: "Trong chữ l, b, h, k",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g11" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g11)"/><path d="M120,320 L120,180 Q120,40 170,40 Q215,40 175,135 L120,240" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="120" cy="320" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "khuyet_duoi",
    name: "Nét khuyết dưới",
    en: "Lower loop stroke",
    desc: "Trong chữ g, y",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g12" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g12)"/><path d="M170,50 L170,230 Q170,335 125,335 Q80,335 120,245 L170,165" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="170" cy="50" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "that_dau",
    name: "Nét thắt trên",
    en: "Top knot stroke",
    desc: "Trong chữ r, s",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g13" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g13)"/><path d="M70,320 L70,120 Q90,55 140,75 Q165,95 130,115 L240,115" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="70" cy="320" r="10" fill="#ff7aa8"/></svg>`
  },
  {
    id: "that_giua",
    name: "Nét thắt giữa",
    en: "Middle knot stroke",
    desc: "Trong chữ k",
    svg: `<svg viewBox="0 0 300 370" width="100%" height="100%"><defs><pattern id="g14" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e8f8" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g14)"/><path d="M150,50 L150,150 Q195,150 195,190 Q195,225 150,225 Q105,225 105,190 Q105,150 150,150 L150,320" fill="none" stroke="#7a9bc2" stroke-width="14" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="150" cy="50" r="10" fill="#ff7aa8"/></svg>`
  }
];
