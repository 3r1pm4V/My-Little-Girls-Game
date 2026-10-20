// Kho Tàng Truyện Cổ Tích Thiếu Nhi
// Tuyển chọn từ nguồn: truyencotich.top
// Gồm 4 chuyên mục: Truyện cổ tích Việt Nam, Truyện cổ tích Thế giới, Truyện ngụ ngôn, Truyện kể bé nghe

const FAIRY_CATEGORIES = [
  { id: "vn", name: "Cổ tích Việt Nam", en: "Vietnamese Tales", icon: "🇻🇳", desc: "Kho tàng truyện dân gian Việt Nam nuôi dưỡng tâm hồn trẻ thơ" },
  { id: "world", name: "Cổ tích Thế giới", en: "World Tales", icon: "🌍", desc: "Những câu chuyện cổ tích kinh điển nổi tiếng khắp thế giới" },
  { id: "fable", name: "Truyện ngụ ngôn", en: "Fables", icon: "🦊", desc: "Bài học cuộc sống sâu sắc, rèn luyện nhân cách qua các con vật" },
  { id: "bedtime", name: "Truyện kể bé nghe", en: "Bedtime Stories", icon: "🌙", desc: "Những câu chuyện dịu dàng, ấm áp giúp bé ngủ ngon giấc" }
];

const FAIRY_STORIES = [
  // ================= 1. TRUYỆN CỔ TÍCH VIỆT NAM =================
  {
    id: "vn_su_tich_dua_hau",
    cat: "vn",
    title: "Sự tích quả dưa hấu",
    en: "The Legend of Watermelon",
    icon: "🍉",
    summary: "Mai An Tiêm với sự cần cù và tự lập đã trồng được giống dưa hấu quý ngọt mát ngoài đảo hoang.",
    moral: "Sức lao động chân chính và ý chí kiên cường có thể biến khó khăn thành thành quả ngọt ngào.",
    content: [
      "Ngày xưa, đời Vua Hùng thứ mười bảy, có một chàng trai tên là Mai An Tiêm rất thông minh và chăm chỉ, được vua cha hết mực yêu thương.",
      "Một ngày nọ, vì có kẻ ghen ghét đặt điều hãm hại, vua cha hiểu lầm nên đã đày vợ chồng Mai An Tiêm ra một hòn đảo hoang vắng ngoài biển khơi.",
      "Trước cảnh ngộ khó khăn nơi hoang đảo, Mai An Tiêm không hề nản lòng. Chàng khuyên vợ: Bàn tay ta làm ra tất cả, chỉ cần chăm chỉ sẽ không lo đói khát.",
      "Một hôm, An Tiêm thấy một đàn chim từ phương tây bay tới đậu trên bãi cát, nhả lại những hạt mầm màu đen nhánh. Chàng cẩn thận nhặt lấy và đem gieo xuống đất ẩm.",
      "Ngày ngày chàng chăm sóc, tưới tắm cho mầm cây. Ít lâu sau, những dây leo xanh mướt mọc lan tỏa, đơm hoa kết trái. Những quả dưa tròn trịa, vỏ xanh mướt, ruột đỏ tươi và vị ngọt lịm.",
      "An Tiêm khắc tên mình lên vỏ dưa rồi thả trôi theo dòng nước biển. Thuyền buôn nhặt được nếm thử thấy ngon tuyệt vời, bèn tìm đến đảo xin đổi gạo, vải lấy dưa.",
      "Vua Hùng hay tin, vô cùng khâm phục ý chí tự lập của chàng. Vua cho rước vợ chồng Mai An Tiêm về triều và ban thưởng hậu hĩnh. Từ đó, giống dưa hấu quý được nhân rộng khắp đất nước."
    ]
  },
  {
    id: "vn_cay_tre_tram_dot",
    cat: "vn",
    title: "Cây tre trăm đốt",
    en: "The Hundred-Knot Bamboo",
    icon: "🎋",
    summary: "Anh Khoai hiền lành, chăm chỉ được Bụt ban câu thần chú kỳ diệu Khắc nhập, khắc xuất để chiến thắng sự bất công.",
    moral: "Ở hiền gặp lành, người trung thực và chăm chỉ sẽ luôn nhận được sự giúp đỡ và hạnh phúc.",
    content: [
      "Ngày xưa có một anh nông dân nghèo tên là Khoai, tính tình thật thà, chăm chỉ và hiền lành. Anh đến làm thuê cho một phú ông giàu có.",
      "Phú ông hứa rằng nếu anh làm lụng chăm chỉ trong ba năm, lão sẽ gả con gái rượu cho anh. Anh Khoai tin lời, ngày đêm thức khuya dậy sớm làm việc không quản nắng mưa.",
      "Ba năm sau, người phú ông bội ước, lén gả con gái cho con trai nhà giàu khác. Để đánh lừa anh Khoai, phú ông bảo: Ngươi hãy vào rừng tìm cho ta một cây tre có đủ đúng một trăm đốt đem về đây, ta mới gả con gái.",
      "Anh Khoai lặn lội khắp rừng sâu, chặt ngã bao nhiêu cây tre nhưng không cây nào đủ một trăm đốt. Thất vọng, anh ngồi ôm mặt khóc nức nở.",
      "Bỗng nhiên, một luồng ánh sáng hiện lên, một ông lão râu tóc bạc phơ hiện ra mỉm cười hiền từ: Vì sao con khóc? Anh Khoai liền đem sự tình kể lại.",
      "Bụt mỉm cười bảo: Con hãy đi chặt đủ một trăm đốt tre rời đem xếp lại đây, rồi đọc: Khắc nhập, khắc nhập! Anh vừa dứt lời, các đốt tre lập tức dính chặt lại thành một cây tre trăm đốt kỳ vĩ.",
      "Bụt lại dặn tiếp: Khi nào muốn rời ra, con chỉ cần đọc: Khắc xuất, khắc xuất! Anh Khoai mừng rỡ gánh tre về làng. Kẻ bội ước phải nhận bài học nhớ đời, và anh Khoai cưới được người mình yêu thương."
    ]
  },
  {
    id: "vn_tam_cam",
    cat: "vn",
    title: "Truyện Tấm Cám",
    en: "The Story of Tam and Cam",
    icon: "🌸",
    summary: "Cô Tấm dịu hiền, lương thiện trải qua bao gian truân cuối cùng đã tìm được hạnh phúc đích thực.",
    moral: "Cái thiện luôn chiến thắng cái ác, lòng nhân ái sẽ đem lại hạnh phúc bền lâu.",
    content: [
      "Ngày xưa có hai chị em cùng cha khác mẹ là Tấm và Cám. Tấm là chị, mồ côi mẹ từ nhỏ, hiền lành và siêng năng. Còn Cám được mẹ cưng chiều nên lười biếng và ích kỷ.",
      "Hằng ngày, Tấm phải làm lụng vất vả từ sáng sớm đến tối mịt, từ chăn trâu, gánh nước đến cắt cỏ, giặt giũ. Dù bị mẹ con Cám nhiều lần đối xử bất công, Tấm vẫn giữ lòng nhân hậu.",
      "Một lần nọ, nhà vua mở hội linh đình khắp kinh thành. Mẹ con Cám xúng xính váy hoa đi trẩy hội, còn Tấm bị dì ghẻ bắt nhặt một thúng gạo trộn lẫn thóc mới được đi.",
      "Tấm tủi thân ngồi khóc. Bụt hiện lên cho đàn chim sẻ sà xuống nhặt thóc giúp Tấm, rồi bảo Tấm đào những chiếc hũ chôn dưới chân giường lên.",
      "Kỳ diệu thay, trong hũ là bộ quần áo lụa tuyệt đẹp, một đôi hài thêu tinh xảo và một con ngựa nhỏ. Tấm cưỡi ngựa đến lễ hội hoa rực rỡ.",
      "Trên đường qua cầu, Tấm vô tình đánh rơi một chiếc hài xuống suối. Voi của nhà vua đi qua nhặt được chiếc hài nhỏ nhắn, tinh khôi. Vua truyền lệnh ai đi vừa hài sẽ cưới làm Hoàng hậu.",
      "Bao nhiêu tiểu thư quyền quý thử hài đều không vừa, chỉ có bàn chân xinh xắn của Tấm là ướm vừa in. Vua rước Tấm vào cung trong niềm hân hoan của muôn dân."
    ]
  },
  {
    id: "vn_thach_sanh",
    cat: "vn",
    title: "Chàng dũng sĩ Thạch Sanh",
    en: "Thach Sanh the Brave",
    icon: "🏹",
    summary: "Thạch Sanh dũng cảm, có cây đàn thần và niêu cơm thần kỳ cứu giúp dân lành và đất nước.",
    moral: "Lòng dũng cảm, sự chân thật và lòng nhân đạo sẽ chiến thắng mọi mưu mô xấu xa.",
    content: [
      "Ngày xưa, ở một túp lều dưới gốc cây đa cổ thụ, có chàng trai nghèo mồ côi tên là Thạch Sanh. Gia tài của chàng chỉ có một chiếc khố và một chiếc rìu sắt do cha để lại.",
      "Thạch Sanh có sức khỏe phi thường và tính tình thật thà. Lý Thông thấy vậy bèn kết nghĩa anh em để lợi dụng sức khỏe của chàng.",
      "Trong vùng có con trăn tinh hung dữ thường bắt người ăn thịt. Lý Thông lừa Thạch Sanh đến miếu hoang canh gác thế mạng cho mình. Nhưng với chiếc rìu sắt và lòng quả cảm, Thạch Sanh đã dũng mãnh trừ khử chằn tinh.",
      "Sau đó, khi công chúa bị đại bàng quắp đi, Thạch Sanh lại dùng cung tên bắn bị thương đại bàng, lần theo vết máu xuống tận hang sâu giải cứu công chúa.",
      "Dù nhiều lần bị Lý Thông cướp công và hãm hại vào ngục tối, Thạch Sanh vẫn bình thản. Chàng đem cây đàn thần ra gảy, tiếng đàn ai oán vang đến tai nhà vua giúp chàng hóa giải mọi oan khuất.",
      "Khi quân các nước kéo đến gây chiến, Thạch Sanh gảy đàn khiến quân giặc bùi ngùi nhớ quê hương xin hàng. Chàng còn thết đãi tướng sĩ niêu cơm thần ăn mãi không hết. Thạch Sanh được vua phong làm phò mã và nối ngôi vua trị vì đất nước thái bình."
    ]
  },
  {
    id: "vn_banh_chung_banh_giay",
    cat: "vn",
    title: "Sự tích Bánh chưng, Bánh giầy",
    en: "The Legend of Chung and Giay Cakes",
    icon: "🍃",
    summary: "Chàng hoàng tử Lang Liêu dùng hạt gạo nuôi sống con người để làm nên hai thứ bánh tượng trưng cho Trời và Đất.",
    moral: "Biết ơn cội nguồn, trân quý hạt ngọc của lao động là nét đẹp đạo lý cao quý nhất.",
    content: [
      "Thời Hùng Vương thứ sáu, sau khi đánh đuổi giặc Ân, nhà vua tuổi đã cao muốn truyền ngôi cho người con nào có phẩm hạnh và hiểu được lòng dân.",
      "Vua truyền lệnh: Đến ngày lễ Tiên vương, ai tìm được món ăn ngon, có ý nghĩa nhất để cúng tổ tiên thì ta sẽ truyền ngôi cho.",
      "Các hoàng tử khác đua nhau sai người lên rừng xuống biển tìm kiếm của ngon vật lạ, nem công chả phượng. Riêng chàng hoàng tử thứ mười tám là Lang Liêu, mẹ mất sớm, tính tình đôn hậu chỉ quen việc đồng áng.",
      "Lang Liêu lo lắng suy nghĩ ngày đêm. Một đêm, chàng nằm mộng thấy một vị thần đến bảo: Trong trời đất, không có gì quý bằng hạt gạo. Hạt gạo nuôi sống con người. Con hãy lấy gạo nếp làm bánh dâng lên Tiên vương.",
      "Tỉnh dậy, Lang Liêu mừng rỡ. Chàng chọn những hạt nếp cái hoa vàng tròn mẩy, đỗ xanh và thịt lợn ngon bọc trong lá dong xanh, gói thành hình vuông tượng trưng cho Đất, gọi là Bánh chưng.",
      "Chàng lại lấy nếp thơm đồ xôi, giã nhuyễn rồi nặn thành hình tròn mịn màng tượng trưng cho Trời, gọi là Bánh giầy.",
      "Đến ngày dâng lễ, nhà vua nếm thử hai thứ bánh của Lang Liêu thì tấm tắc khen ngon và cảm động trước ý nghĩa sâu xa. Vua quyết định truyền ngôi báu cho Lang Liêu."
    ]
  },
  {
    id: "vn_tich_chu",
    cat: "vn",
    title: "Cậu bé Tích Chu",
    en: "Tich Chu and the Water of Life",
    icon: "🕊️",
    summary: "Tích Chu mải chơi khiến bà hóa thành chim, cậu đã vượt núi cao tìm dòng nước suối thần để đón bà trở lại.",
    moral: "Phải luôn hiếu thảo, quan tâm và chăm sóc ông bà, cha mẹ mỗi ngày.",
    content: [
      "Ngày xưa có một cậu bé tên là Tích Chu. Bố mẹ mất sớm, Tích Chu ở với bà. Bà thương Tích Chu lắm, có món gì ngon cũng nhường cho cháu, suốt ngày quạt mát cho cháu ngủ.",
      "Thế nhưng lớn lên, Tích Chu lại mải mê rong chơi với bạn bè, chẳng mấy khi đoái hoài chăm sóc bà.",
      "Một ngày nọ, bà bị ốm nặng, người sốt cao mê man. Bà khát nước quá liền gọi: Tích Chu ơi, cho bà ngụm nước, bà khát khô cả cổ rồi! Nhưng bà gọi mãi mà Tích Chu vẫn mải chơi ngoài đồng.",
      "Đến khi thấy đói bụng chạy về nhà, Tích Chu bàng hoàng thấy bà đã hóa thành một chú chim vỗ cánh bay lên cành cây. Chim cất tiếng buồn bã: Cúc cu... cúc cu... muộn quá rồi, bà khát quá phải hóa thành chim đi tìm nước uống đây!",
      "Tích Chu hối hận khóc nức nở chạy theo chim: Bà ơi! Bà ở lại với cháu, cháu sẽ đi lấy nước cho bà! Nhưng chim đã bay xa mất hút.",
      "Một bà tiên hiền hậu hiện ra bảo: Nếu cháu muốn bà trở lại thành người, cháu phải vượt qua ba ngọn núi cao, tìm đến dòng suối Tiên lấy nước mát về cho bà uống.",
      "Không ngại đường sá xa xôi hiểm trở, Tích Chu lặn lội băng qua rừng rậm, trèo đèo lội suối mang được một bình nước suối Tiên về cho bà. Uống xong ngụm nước, chim rung rinh đôi cánh và hóa lại thành người bà yêu quý. Từ đó, Tích Chu hết lòng yêu thương, hiếu thảo với bà."
    ]
  },

  // ================= 2. TRUYỆN CỔ TÍCH THẾ GIỚI =================
  {
    id: "wd_khan_do",
    cat: "world",
    title: "Cô bé quàng khăn đỏ",
    en: "Little Red Riding Hood",
    icon: "👧",
    summary: "Câu chuyện nhắc nhở các bạn nhỏ luôn lắng nghe lời dặn dò của cha mẹ khi đi đường.",
    moral: "Hãy luôn vâng lời người lớn, không la cà và không tin lời người lạ.",
    content: [
      "Ngày xưa có một cô bé rất ngoan ngoãn và xinh xắn. Bà ngoại tặng cô một chiếc khăn choàng bằng nhung màu đỏ rất đẹp, nên mọi người thường gọi cô là Cô bé Quàng Khăn Đỏ.",
      "Một hôm, mẹ bảo Khăn Đỏ: Hôm nay bà ngoại bị ốm, con hãy mang giỏ bánh ngọt này sang thăm bà nhé. Nhớ đi đường thẳng, chớ la cà hái hoa bắt bướm nghe con!",
      "Khăn Đỏ vâng lời mẹ xách giỏ bánh lên đường. Khi đi qua khu rừng xanh, cô thấy hoa thơm bướm lượn dập dờn thì mải mê đuổi theo, quên mất lời mẹ dặn.",
      "Một con chó sói gian xảo từ trong bụi rậm bước ra, đon đả chào hỏi: Chào cô bé, cô bé đi đâu mà xinh xắn thế? Khăn Đỏ ngây thơ trả lời: Cháu sang thăm bà ngoại ở ngôi nhà gỗ cuối rừng ạ.",
      "Sói liền rảo bước thật nhanh đến nhà bà ngoại trước. Nó lẻn vào phòng, nhốt bà vào tủ rồi trùm chăn giả vờ nằm trên giường chờ Khăn Đỏ.",
      "Khi Khăn Đỏ đến nơi, cô ngạc nhiên hỏi: Bà ơi, sao hôm nay tai bà to thế? - Tai to để nghe cháu nói rõ hơn. - Sao mắt bà to thế? - Mắt to để nhìn cháu rõ hơn! - Sao miệng bà to thế? - Miệng to để ăn thịt cháu đây!",
      "Đúng lúc sói chồm dậy, một bác thợ săn dũng cảm đi ngang qua kịp thời xông vào khống chế con sói, giải cứu hai bà cháu an toàn. Khăn Đỏ ôm chầm lấy bà và hứa từ nay sẽ luôn nghe lời mẹ dặn."
    ]
  },
  {
    id: "wd_ba_chu_heo",
    cat: "world",
    title: "Ba chú heo con",
    en: "The Three Little Pigs",
    icon: "🐷",
    summary: "Ba chú heo tự xây nhà, chỉ có ngôi nhà gạch kiên cố mới bảo vệ được ba anh em trước gió bão và sói dữ.",
    moral: "Làm việc chăm chỉ, cẩn thận và có trách nhiệm sẽ mang lại sự an toàn và thành công.",
    content: [
      "Có ba chú heo con đến tuổi trưởng thành, mẹ bảo các chú hãy ra ngoài tự xây cho mình những ngôi nhà ấm áp.",
      "Chú heo anh cả lười biếng, chỉ muốn nhanh xong để đi chơi, nên chọn rơm rạ khô dựng một túp lều rơm ọp ẹp chỉ trong nửa ngày.",
      "Chú heo thứ hai thích làm nhanh vừa phải, nhặt những cành cây khô dựng một ngôi nhà gỗ sơ sài trong hai ngày rồi vui vẻ đi dạo.",
      "Riêng chú heo út chăm chỉ và lo xa. Chú quyết định mua gạch, cát và xi măng, cặm cụi đặt từng viên gạch, trát từng lớp vữa suốt cả tuần lễ để xây một ngôi nhà gạch vững chãi.",
      "Một ngày nọ, con sói xám đói bụng xuất hiện. Nó đến trước nhà rơm của heo anh cả, hít một hơi thật sâu rồi thổi phào một cái, ngôi nhà rơm bay tứ tung. Heo cả hốt hoảng chạy sang nhà heo thứ hai.",
      "Sói đuổi theo đến ngôi nhà gỗ. Nó húc mạnh vài cái rồi thổi mạnh, ngôi nhà gỗ rung chuyển rồi đổ sụp. Hai chú heo chạy thục mạng sang ngôi nhà gạch của heo út.",
      "Sói xám lấy hết sức bình sinh thổi thật mạnh: Phùùù! Nhưng ngôi nhà gạch vẫn đứng sừng sững không hề lay chuyển. Sói mệt đứt hơi, đành phải lủi thủi bỏ đi. Từ đó, hai người anh học tập tính chăm chỉ của heo út."
    ]
  },
  {
    id: "wd_lo_lem",
    cat: "world",
    title: "Cô bé Lọ Lem",
    en: "Cinderella",
    icon: "👠",
    summary: "Cô bé Lọ Lem tốt bụng, trong sáng đã được bà tiên ban phép màu để đến dạ hội hoàng cung.",
    moral: "Lòng tốt và sự lương thiện luôn tỏa sáng, mang lại hạnh phúc cho những ai biết yêu thương.",
    content: [
      "Ngày xửa ngày xưa, có một cô gái xinh đẹp và dịu dàng tên là Lọ Lem. Mẹ mất sớm, cô phải sống cùng người mẹ kế cay nghiệt và hai cô em gái kiêu căng.",
      "Hằng ngày Lọ Lem phải quét dọn, nấu ăn và ngủ cạnh đống tro bếp sưởi ấm, nhưng cô luôn mỉm cười và thân thiện với muôn loài muông thú.",
      "Một hôm, Hoàng tử mở hội khiêu vũ lớn để chọn vợ. Hai người em diện những bộ váy lộng lẫy lên xe ngựa đi trẩy hội, để lại Lọ Lem một mình với đống việc nhà ngổn ngang.",
      "Lọ Lem ngồi khóc bên khung cửa sổ. Bỗng một bà tiên hiền từ xuất hiện với cây đũa phép lấp lánh: Đừng khóc nữa cô bé ngoan, ta sẽ giúp con đi dạ hội!",
      "Bà tiên vung đũa phép: Quả bí ngô ngoài vườn biến thành cỗ xe ngựa bằng vàng rực rỡ, bốn chú chuột nhắt hóa thành những chú ngựa trắng dũng mãnh, và bộ đồ rách rưới của Lọ Lem hóa thành chiếc váy dạ hội lộng lẫy cùng đôi giày thủy tinh lấp lánh.",
      "Bà tiên dặn dò: Nhớ nhé con, phép màu sẽ biến mất khi đồng hồ điểm đúng mười hai giờ đêm!",
      "Tại dạ hội, vẻ đẹp thanh khiết của Lọ Lem khiến Hoàng tử say đắm. Hai người cùng khiêu vũ trong tiếng nhạc du dương. Khi chuông đồng hồ điểm mười hai tiếng, Lọ Lem vội vã chạy đi, vô tình đánh rơi một chiếc giày thủy tinh trên bậc thềm hoàng cung.",
      "Hoàng tử cho quân lính mang chiếc giày đi khắp vương quốc tìm người đi vừa. Cuối cùng, chiếc giày ướm vừa vặn vào bàn chân Lọ Lem. Hoàng tử hân hoan rước Lọ Lem về cung làm vợ và sống bên nhau trọn đời hạnh phúc."
    ]
  },
  {
    id: "wd_bach_tuyet",
    cat: "world",
    title: "Bạch Tuyết và bảy chú lùn",
    en: "Snow White and the Seven Dwarfs",
    icon: "🍎",
    summary: "Nàng Bạch Tuyết da trắng như tuyết, môi đỏ như son sống hạnh phúc cùng bảy chú lùn nhân hậu.",
    moral: "Cái đẹp của tâm hồn và tình yêu thương chân thành luôn che chở con người trước cái xấu.",
    content: [
      "Ngày xửa ngày xưa, ở một vương quốc xa xôi, có một nàng công chúa xinh đẹp tuyệt trần tên là Bạch Tuyết. Nàng có làn da trắng như tuyết, môi đỏ như son và mái tóc đen tuyền như gỗ mun.",
      "Mẹ kế của nàng là một hoàng hậu độc ác, có một chiếc gương thần biết nói. Hằng ngày bà ta đều hỏi: Gương kia ngự ở trên tường, thế gian ai đẹp được dường như ta? Gương thần luôn đáp hoàng hậu là người đẹp nhất.",
      "Nhưng khi Bạch Tuyết lớn lên, gương thần trả lời rằng Bạch Tuyết xinh đẹp hơn hoàng hậu bội phần. Hoàng hậu nổi giận, sai bác thợ săn mang nàng vào rừng sâu.",
      "Thương xót nàng công chúa hiền lành, bác thợ săn khuyên nàng chạy thật xa vào rừng rậm. Bạch Tuyết đi mãi, đi mãi thì tìm thấy một ngôi nhà nhỏ xinh xắn với bảy chiếc giường nhỏ xíu.",
      "Đó là ngôi nhà của bảy chú lùn làm nghề đào vàng trên núi. Khi trở về thấy Bạch Tuyết ngoan ngoãn quét dọn nhà cửa, các chú lùn rất vui mừng và mời nàng ở lại cùng sống như người thân.",
      "Nhờ sự chăm sóc và bảo vệ của bảy chú lùn tốt bụng cùng tình yêu chân thành của chàng hoàng tử, Bạch Tuyết đã vượt qua mọi hiểm nguy và sống hạnh phúc ngập tràn tiếng cười."
    ]
  },
  {
    id: "wd_vit_con_xau_xi",
    cat: "world",
    title: "Chú vịt con xấu xí",
    en: "The Ugly Duckling",
    icon: "🦢",
    summary: "Chú vịt con từng bị chê bai vì vẻ ngoài khác biệt cuối cùng đã hóa thành một chú thiên nga kiêu hãnh và lộng lẫy.",
    moral: "Đừng bao giờ đánh giá người khác qua vẻ bề ngoài; ai cũng có vẻ đẹp và giá trị riêng biệt.",
    content: [
      "Vào một buổi sáng mùa hè rực rỡ bên bờ hồ, vịt mẹ hạnh phúc đón đàn con nhỏ chào đời. Những quả trứng lần lượt nở ra những chú vịt con vàng óng, lông mềm mịn như tơ.",
      "Riêng quả trứng to nhất nở muộn nhất lại sinh ra một chú vịt màu xám xịt, vụng về và có vẻ ngoài khác hẳn anh chị em.",
      "Đàn vịt trong trang trại và cả lũ gà, ngỗng đều trêu chọc, xua đuổi chú, gọi chú là Vịt con xấu xí. Chú vịt con buồn bã, tủi thân bèn lẳng lặng bơi đi thật xa.",
      "Mùa đông lạnh giá đến, tuyết rơi trắng xóa đồng nội. Chú vịt con cô đơn co ro trong giá rét, suýt nữa bị đóng băng trên mặt hồ nếu không được một bác nông dân cứu giúp.",
      "Rồi mùa xuân ấm áp lại về, muôn hoa đua nở rực rỡ, mặt hồ tan băng soi bóng mây trời. Chú vịt đập cánh bay xuống làn nước biếc và nhìn thấy bóng mình dưới mặt nước trong veo.",
      "Kỳ diệu thay, chú không còn là chú vịt xám xấu xí năm nào nữa, mà đã trở thành một chú thiên nga trắng muốt, uy nghi và lộng lẫy nhất trần đời! Đàn thiên nga trên trời sà xuống hân hoan đón mừng người bạn mới xinh đẹp."
    ]
  },
  {
    id: "wd_aladdin",
    cat: "world",
    title: "Aladdin và cây đèn thần",
    en: "Aladdin and the Magic Lamp",
    icon: "🪔",
    summary: "Chàng trai Aladdin thông minh cùng cây đèn thần nhiệm màu đã vượt qua bao thử thách để bảo vệ công chúa.",
    moral: "Sự trung thực, lòng dũng cảm và trí thông minh sẽ giúp ta vượt qua mọi cạm bẫy trong đời.",
    content: [
      "Tại một thành phố cổ kính ở phương Đông, có chàng trai nghèo nhưng tốt bụng tên là Aladdin.",
      "Một ngày nọ, một tên phù thủy xảo quyệt dụ dỗ Aladdin vào một hang động kỳ bí chứa đầy vàng bạc châu báu để lấy cho hắn một chiếc đèn dầu cũ kỹ bằng đồng.",
      "Khi lấy được cây đèn, Aladdin vô tình chà tay vào thân đèn. Bỗng một làn khói xanh cuộn trào bay ra, hóa thành một vị Thần Đèn khổng lồ mỉm cười: Ta là Thần Đèn, sẵn sàng phục tùng mệnh lệnh của chủ nhân!",
      "Nhờ sự thông minh và lòng tốt của mình, Aladdin đã yêu cầu Thần Đèn giúp đỡ dân nghèo trong thành phố và chiếm được tình cảm của công chúa Jasmine xinh đẹp.",
      "Khi tên phù thủy quay lại đánh cắp chiếc đèn thần và bắt cóc công chúa, Aladdin không hề nao núng. Chàng dùng trí thông minh và sự dũng cảm bày kế lấy lại cây đèn, tiêu diệt tên gian ác.",
      "Cuối cùng, Aladdin thực hiện lời hứa ban sự tự do cho Thần Đèn. Chàng cùng công chúa sống trọn đời hạnh phúc trong sự kính trọng và yêu mến của muôn dân."
    ]
  },

  // ================= 3. TRUYỆN NGỤ NGÔN =================
  {
    id: "fb_rua_va_tho",
    cat: "fable",
    title: "Rùa và Thỏ",
    en: "The Tortoise and the Hare",
    icon: "🐢",
    summary: "Cuộc chạy đua nổi tiếng nhắc nhở chúng ta: chậm mà chắc, kiên trì nhẫn nại sẽ giành chiến thắng.",
    moral: "Không được kiêu ngạo, tự phụ; lòng kiên trì và sự tập trung là chìa khóa của thành công.",
    content: [
      "Vào một ngày đẹp trời trong khu rừng xanh, chú Thỏ kiêu ngạo luôn tự hào mình là kẻ chạy nhanh nhất muôn loài. Thấy Rùa đang cặm cụi từng bước chậm chạp, Thỏ cất giọng mỉa mai trêu chọc.",
      "Rùa điềm đạm ngẩng đầu đáp: Anh Thỏ ơi, anh chạy nhanh thật đấy, nhưng nếu thi chạy đua cùng tôi, chưa chắc anh đã thắng được đâu!",
      "Thỏ cười phá lên đắc chí: Được lắm! Ta hãy thi chạy đua từ gốc cây đa này đến bờ sông xem ai tới trước!",
      "Bác Gấu làm trọng tài thổi còi vang động: Một, hai, ba, xuất phát! Rùa biết mình chậm chạp nên không dám nghỉ một giây nào, cứ từng bước, từng bước kiên trì tiến về phía trước.",
      "Còn Thỏ ỷ mình chạy nhanh, vừa chạy vừa la cà đuổi bướm, hái hoa, rồi nằm ườn dưới gốc cây ngủ một giấc ngon lành: Để cho chú rùa chạy nửa ngày nữa cũng chưa đuổi kịp ta!",
      "Khi Thỏ sực tỉnh giấc thì mặt trời đã lặn bóng hoàng hôn. Thỏ vội vàng co cẳng phóng thục mạng về đích, nhưng than ôi, Rùa đã ung dung đứng đợi ở vạch đích tự bao giờ trong tiếng reo hò của muôn thú!"
    ]
  },
  {
    id: "fb_cao_va_co",
    cat: "fable",
    title: "Cáo và Cò",
    en: "The Fox and the Stork",
    icon: "🦊",
    summary: "Bài học sâu sắc về cách ứng xử và sự tôn trọng đối với bạn bè xung quanh.",
    moral: "Hãy đối xử với người khác theo cách mà mình muốn được người khác đối xử.",
    content: [
      "Cáo và Cò chơi thân với nhau. Một hôm, Cáo mời Cò đến nhà dùng bữa trưa để thể hiện lòng hiếu khách.",
      "Thế nhưng Cáo lại chơi khăm bạn khi đổ món súp thơm ngon vào một chiếc đĩa nông choèn. Mõm Cáo bẹt và ngắn nên húp sùm sụp một thoáng là hết sạch.",
      "Trong khi đó, chiếc mỏ dài ngoẵng của Cò không thể nào mổ được giọt súp nào dưới đáy đĩa phẳng. Cò đành ngậm ngùi nhịn đói ra về nhưng không hề tỏ ra tức giận.",
      "Mấy hôm sau, Cò vui vẻ mời Cáo sang nhà mình ăn tối. Cò chuẩn bị một món cá kho thơm lừng nức mũi và đựng thức ăn trong một chiếc bình cổ cao, miệng bình rất hẹp.",
      "Cò đưa chiếc mỏ dài vào bình, gắp từng miếng cá thơm ngon ăn một cách ngon lành. Còn Cáo dù đói cồn cào chỉ biết đứng nhìn và liếm quanh mép bình mà chẳng ăn được miếng nào.",
      "Cáo xấu hổ cúi gầm mặt hiểu ra bài học: Muốn bạn bè tôn trọng mình, trước hết mình phải biết nghĩ cho người khác."
    ]
  },
  {
    id: "fb_cau_be_chan_cuu",
    cat: "fable",
    title: "Cậu bé chăn cừu",
    en: "The Boy Who Cried Wolf",
    icon: "🐑",
    summary: "Cậu bé thích nói dối để đùa giỡn, đến khi nguy hiểm thực sự xảy đến thì chẳng còn ai tin lời cậu nữa.",
    moral: "Phải luôn trung thực và thật thà; kẻ hay nói dối sẽ đánh mất niềm tin của mọi người xung quanh.",
    content: [
      "Có một cậu bé nọ được giao việc chăn dắt đàn cừu trên sườn đồi thoai thoải gần một ngôi làng nhỏ.",
      "Ngồi chăn cừu một mình buồn tẻ, cậu bé bèn nghĩ ra một trò đùa tai hại. Cậu chạy thục mạng về phía làng và la lớn: Sói! Có sói! Cứu đàn cừu với!",
      "Nghe tiếng kêu cứu khẩn thiết, các bác nông dân đang làm đồng vội vã vác cuốc, xẻng chạy lên đồi ứng cứu. Nhưng khi đến nơi, chẳng thấy con sói nào cả, chỉ thấy cậu bé cười ngặt nghẽo vì đã lừa được mọi người.",
      "Vài ngày sau, cậu bé lại tiếp tục lặp lại trò đùa: Sói đến! Sói ăn thịt cừu rồi! Bà con lại tất tả chạy lên đồi, và cậu bé lại ôm bụng cười khoái chí.",
      "Cho đến một buổi chiều nọ, một con sói hung dữ từ trong rừng rậm nhảy xổ ra thật sự. Sói lao vào cắn xé đàn cừu tan tác.",
      "Cậu bé hoảng loạn tột độ, gào khóc thảm thiết: Sói! Có sói thật rồi! Xin mọi người hãy cứu cháu với! Nhưng lần này ở làng, mọi người đều nghĩ cậu lại giở trò lừa gạt nên chẳng ai thèm chạy lên nữa. Cậu bé vừa khóc vừa ân hận vì thói quen nói dối của mình."
    ]
  },
  {
    id: "fb_ve_va_kien",
    cat: "fable",
    title: "Ve sầu và Kiến",
    en: "The Ant and the Grasshopper",
    icon: "🐜",
    summary: "Đàn kiến cần cù tích trữ lương thực suốt mùa hè, trong khi ve sầu chỉ mải mê ca hát rong chơi.",
    moral: "Chăm chỉ lao động và biết lo xa cho tương lai sẽ giúp ta luôn ấm no, hạnh phúc.",
    content: [
      "Suốt cả mùa hè rực rỡ nắng vàng, đàn kiến nhỏ bé chăm chỉ nối đuôi nhau tha từng hạt thóc, cọng rơm khô về cất giữ cẩn thận trong tổ ấm dưới lòng đất.",
      "Ở trên cành cây cao mát mẻ, chú Ve Sầu chỉ biết ca hát véo von suốt ngày đêm. Thấy đàn kiến vất vả mồ hôi nhễ nhại, Ve Sầu chế giễu: Các bạn ngốc quá, mùa hè tươi đẹp thế này sao không ca hát vui chơi mà lại làm lụng khổ sở thế?",
      "Bác Kiến già ôn tồn đáp: Mùa hè trù phú rồi sẽ qua, chúng tôi phải lo tích trữ thức ăn trước khi mùa đông lạnh giá tràn về.",
      "Rồi những cơn gió bấc mùa đông ùa tới, tuyết phủ trắng xóa đất trời. Cây cối trơ trụi không còn một chiếc lá non nào để ăn.",
      "Ve Sầu run rẩy vì đói và rét buốt. Chú lảo đảo tìm đến gõ cửa tổ kiến xin một mẩu thức ăn nhỏ. Kiến mở cửa, chia sẻ cho Ve ít hạt kê ấm lòng và nhẹ nhàng khuyên nhủ:",
      "Nếu mùa hè bạn chỉ mải mê nhảy múa ca hát, thì mùa đông bạn sẽ phải chịu đói rét. Ve Sầu xấu hổ gật đầu và tự nhủ từ nay sẽ chăm chỉ lao động như đàn kiến."
    ]
  },
  {
    id: "fb_thay_boi_xem_voi",
    cat: "fable",
    title: "Thầy bói xem voi",
    en: "The Blind Men and the Elephant",
    icon: "🐘",
    summary: "Năm ông thầy bói mù sờ voi, mỗi người một ý tranh cãi nảy lửa vì chỉ nhìn thấy một phần nhỏ của sự vật.",
    moral: "Muốn đánh giá một sự việc phải quan sát toàn diện, lắng nghe và không bảo thủ chủ quan.",
    content: [
      "Nhân một buổi chợ phiên đông vui có người dắt voi đi qua, năm ông thầy bói mù rủ nhau chung tiền trả cho người quản tượng để được sờ tận tay con voi cho biết hình thù ra sao.",
      "Thầy thứ nhất sờ vào chiếc vòi dài, bảo ngay: Tưởng voi thế nào, hóa ra nó sun sun như con đỉa khổng lồ!",
      "Thầy thứ hai sờ vào chiếc ngà cứng nhẵn bóng, cãi lại: Không phải, nó chần chẫn như cái đòn càn bằng đá!",
      "Thầy thứ ba sờ trúng chiếc tai to bè, gạt đi: Hai ông sai bét, nó bè bè như cái quạt thóc quạt mát ngày hè!",
      "Thầy thứ tư sờ vào chân voi to sừng sững, khẳng định: Voi nó sừng sững như cái cột đình chống trời mới đúng!",
      "Thầy thứ năm túm lấy chiếc đuôi voi ve vẩy, quả quyết: Các ông chẳng biết gì, con voi nó tua tủa như cái chổi sể quét nhà!",
      "Năm ông thầy ai cũng cho mình là đúng nhất, to tiếng cãi vã rồi xông vào xô xát om sòm giữa chợ, khiến bà con một phen cười nghiêng ngả. Con voi to lớn có đầy đủ tất cả những bộ phận đó, chỉ vì mỗi người chỉ sờ một góc mà tưởng mình đã biết hết."
    ]
  },
  {
    id: "fb_hai_nguoi_ban",
    cat: "fable",
    title: "Hai người bạn và con gấu",
    en: "The Two Friends and the Bear",
    icon: "🐻",
    summary: "Người bạn chân chính là người không bao giờ bỏ rơi bạn bè khi gặp khó khăn, hiểm nguy.",
    moral: "Tình bạn thật sự được thử thách qua những lúc gian nan hoạn nạn.",
    content: [
      "Có hai người bạn thân cùng nhau đi bộ qua một khu rừng rậm rạp. Họ hẹn ước dù có chuyện gì xảy ra cũng sẽ sát cánh bảo vệ nhau.",
      "Bỗng nhiên từ trong lùm cây, một con gấu đen to lớn gầm vang lao thẳng về phía họ.",
      "Người bạn thứ nhất nhanh chân thoăn thoắt trèo tót lên một cành cây cao, chỉ biết lo cho bản thân mình mà bỏ mặc bạn ở dưới đất.",
      "Người bạn thứ hai không biết trèo cây, biết chạy không kịp liền nhanh trí nằm rạp xuống đất, nín thở giả vờ chết, vì cậu từng nghe nói loài gấu không bao giờ đụng đến xác chết.",
      "Con gấu khổng lồ lững thững bước đến, ghé sát mõm hít hà quanh tai, má và mũi cậu bé. Thấy người nằm im phăng phắc không động đậy, gấu tưởng là xác chết bèn lẳng lặng bỏ đi vào rừng sâu.",
      "Khi con gấu đã đi thật xa, người bạn trên cây mới tụt xuống, cười hề hề hỏi: Con gấu vừa nãy ghé vào tai cậu thì thầm điều gì thế?",
      "Người bạn nằm dưới đất đứng dậy phủi bụi trên áo, nhìn thẳng vào mắt bạn và đáp: Gấu khuyên tớ một câu sâu sắc: Đừng bao giờ kết bạn với những kẻ bỏ rơi bạn bè lúc hoạn nạn!"
    ]
  },

  // ================= 4. TRUYỆN KỂ BÉ NGHE (BEDTIME STORIES) =================
  {
    id: "bt_tho_vang_loi",
    cat: "bedtime",
    title: "Thỏ trắng biết vâng lời",
    en: "The Obedient Little Bunny",
    icon: "🐰",
    summary: "Thỏ con nghe lời mẹ dặn dò, được các bạn yêu mến và được mẹ thưởng giỏ cà rốt ngọt lịm.",
    moral: "Vâng lời cha mẹ là đức tính ngoan ngoãn đáng khen nhất của các bé.",
    content: [
      "Trong một khu rừng yên tĩnh có một chú Thỏ trắng nhỏ nhắn, có đôi tai dài hồng hào và bộ lông trắng muốt như bông gòn.",
      "Buổi sáng trước khi đi chợ hái nấm, Thỏ mẹ dặn: Thỏ con ngoan của mẹ ở nhà chơi ngoan nhé, chớ chạy ra bìa rừng kẻo bị lạc đường con nhé!",
      "Thỏ trắng vui vẻ dạ ran: Vâng ạ, con sẽ ở nhà vẽ tranh và tưới hoa chờ mẹ về!",
      "Một lát sau, bạn Bướm vàng bay lượn qua cửa sổ cất tiếng gọi: Thỏ trắng ơi, ra đồi cỏ chơi đuổi bắt với tớ đi, vui lắm đấy!",
      "Thỏ trắng lắc đầu nhẹ nhàng: Cảm ơn bạn Bướm nhé, mẹ tớ dặn phải ở nhà ngoan, tớ không đi la cà đâu.",
      "Trưa hè nắng ấm, Thỏ mẹ trở về với giỏ nấm hương thơm phức và những củ cà rốt đỏ mọng. Thấy nhà cửa ngăn nắp và Thỏ con ngoan ngoãn ngồi vẽ tranh, mẹ ôm Thỏ vào lòng khen ngợi:",
      "Con của mẹ ngoan lắm, biết vâng lời mẹ dặn là bé ngoan nhất trần đời! Hai mẹ con cùng thưởng thức bữa trưa ấm cúng và tràn ngập tiếng cười."
    ]
  },
  {
    id: "bt_gau_sau_rang",
    cat: "bedtime",
    title: "Gấu con bị sâu răng",
    en: "Little Bear's Toothache",
    icon: "🧸",
    summary: "Gấu con thích ăn kẹo ngọt trước khi ngủ mà lười đánh răng, bài học nhắc bé giữ gìn răng miệng sạch sẽ.",
    moral: "Nhớ đánh răng sạch sẽ mỗi sáng và tối trước khi đi ngủ để hàm răng luôn trắng đẹp và khỏe mạnh.",
    content: [
      "Gấu con là một chú gấu rất đáng yêu nhưng lại có một thói quen xấu: chú cực kỳ mê ăn kẹo ngọt và bánh sô-cô-la vào ban đêm, lại lười biếng không chịu đánh răng.",
      "Mỗi tối mẹ nhắc: Gấu con ơi, vào đánh răng rồi hãy đi ngủ nhé! Nhưng Gấu con lại mè nheo: Con buồn ngủ quá rồi, sáng mai con đánh răng bù nhé mẹ!",
      "Thế là trong bóng đêm, lũ vi khuẩn sâu răng nhỏ tí xíu tha hồ nhảy múa mở tiệc trong miệng Gấu con. Chúng đục khoét từng chiếc răng trắng xinh của chú.",
      "Bỗng nhiên giữa đêm khuya thanh vắng, Gấu con ôm má khóc ré lên nức nở: Ôi mẹ ơi, răng con đau buốt quá, con không ngủ được nữa rồi!",
      "Sáng hôm sau, mẹ vội vã đưa Gấu con đến phòng khám của bác sĩ Nhím. Bác sĩ Nhím nhẹ nhàng khám răng, làm sạch những vết sâu và ân cần dặn dò:",
      "Răng của cháu bị sâu vì ăn nhiều kẹo ngọt mà không chải răng đấy. Từ nay cháu nhớ đánh răng thật sạch sẽ sau khi ăn và trước khi đi ngủ nhé!",
      "Từ hôm đó, Gấu con không bao giờ quên chải răng nữa. Chú có một hàm răng trắng bóng, chắc khỏe và nụ cười rạng rỡ như ánh bình minh."
    ]
  },
  {
    id: "bt_doi_ban_tot",
    cat: "bedtime",
    title: "Đôi bạn tốt Gà và Vịt",
    en: "Good Friends Chick and Duckling",
    icon: "🐥",
    summary: "Gà con và Vịt con cùng chơi đùa, khi gặp nguy hiểm đã dũng cảm tương trợ lẫn nhau.",
    moral: "Bạn bè tốt phải luôn yêu thương, chia sẻ và giúp đỡ lẫn nhau khi gặp khó khăn.",
    content: [
      "Gà con và Vịt con là đôi bạn thân thiết từ thuở mới lọt lòng. Một hôm, hai bạn rủ nhau tung tăng ra vườn bách thảo tìm mồi.",
      "Gà con có đôi chân mảnh khảnh và chiếc mỏ nhọn thoăn thoắt bới đất tìm giun béo ngậy. Gà con bắt được chú giun nào cũng vui vẻ gọi bạn Vịt chia phần.",
      "Gần đó có một ao nước trong xanh biếc. Vịt con có đôi chân màng bơi lội thoăn thoắt dưới nước, bắt được những chú tôm tép nhỏ liền mang lên bờ tặng Gà con.",
      "Đột nhiên từ trong bụi rậm, một con cáo hung ác rón rén bước ra định vồ lấy Gà con. Gà con hốt hoảng kêu to: Chiếp chiếp, cứu tớ với!",
      "Nghe tiếng bạn gọi khẩn cấp, Vịt con bơi nhanh vào bờ cất tiếng gọi: Cạc cạc, Gà con mau nhảy lên lưng tớ nhanh lên!",
      "Gà con nhanh chân nhảy tót lên lưng bạn Vịt. Vịt con vội vã bơi nhanh ra giữa hồ nước sâu. Con cáo đứng trên bờ trơ mắt ếch nhìn theo tiếc nuối.",
      "Hai bạn ôm chầm lấy nhau mừng rỡ. Tình bạn của Gà con và Vịt con từ đó ngày càng gắn bó keo sơn."
    ]
  },
  {
    id: "bt_bai_hoc_dau_tien",
    cat: "bedtime",
    title: "Bài học đầu tiên của Gà con",
    en: "Chick's First Lesson",
    icon: "🐣",
    summary: "Gà con học được hai câu nói kỳ diệu: 'Cảm ơn' khi nhận được sự giúp đỡ và 'Xin lỗi' khi lỡ làm phiền người khác.",
    moral: "Luôn biết nói lời cảm ơn và xin lỗi lễ phép sẽ khiến mọi người thêm yêu quý bé.",
    content: [
      "Hôm nay là ngày đầu tiên Gà con lông vàng đi học mẫu giáo. Trước khi đi, mẹ dặn Gà con nhớ chào hỏi lễ phép và giữ gìn nề nếp.",
      "Khi đi trên đường làng, Gà con mải ngắm nhìn đàn bướm bay lượn nên vô tình vấp ngã vào chân bạn Cún con. Gà con lúng túng cúi đầu nói: Tớ xin lỗi bạn Cún nhé, tớ vô ý quá!",
      "Cún con tươi cười lắc chiếc đuôi xinh: Không sao đâu bạn Gà, chúng mình cùng đi học nào!",
      "Đến cửa lớp học, cô giáo Hươu Sao ân cần trao cho Gà con một chiếc cặp sách xinh xắn và một hộp bút chì màu rực rỡ. Gà con hai tay đỡ lấy và dõng dạc nói: Con cảm ơn cô ạ!",
      "Cô giáo Hươu Sao xoa đầu Gà con mỉm cười khen ngợi trước cả lớp: Gà con ngoan lắm, đã biết nói lời Xin lỗi và Cảm ơn rất đúng lúc!",
      "Gà con vui sướng trong lòng. Chú nhận ra rằng hai câu nói ấy như những nốt nhạc kỳ diệu, làm cho mọi người xung quanh luôn rạng rỡ nụ cười."
    ]
  },
  {
    id: "bt_chiec_am_sanh",
    cat: "bedtime",
    title: "Chiếc ấm sành nở hoa",
    en: "The Blooming Clay Teapot",
    icon: "🫖",
    summary: "Một chiếc ấm sành cũ sứt quai tưởng như bỏ đi đã trở thành ngôi nhà xinh đẹp cho mầm hoa tỏa hương.",
    moral: "Mọi vật và mọi người trên đời đều có giá trị quý giá khi được đón nhận bằng tình yêu thương.",
    content: [
      "Có một chiếc ấm sành cũ kỹ bị sứt mất chiếc quai nhỏ, nằm buồn thiu trong một góc vườn hoang vắng đầy cỏ dại.",
      "Ấm sành thở dài tự nhủ: Mình đã bị sứt quai rồi, chẳng còn đựng nước trà ấm cho cả nhà được nữa, mình là đồ bỏ đi rồi sao?",
      "Một buổi chiều mùa xuân ấm áp, một bạn nhỏ đi dạo trong vườn nhìn thấy chiếc ấm sành. Bạn nhỏ nhẹ nhàng nhặt chiếc ấm lên, lau sạch bụi bẩn và reo lên: Ôi chiếc ấm này đẹp quá!",
      "Bạn nhỏ xúc đất mùn màu mỡ đổ đầy vào lòng ấm sành, rồi gieo vào đó một hạt mầm hoa cúc vàng rực rỡ. Hằng ngày, bạn nhỏ đều tưới những giọt nước mát lành cho ấm sành.",
      "Ấm sành cảm thấy trong lòng mình ấm áp lạ kỳ. Chú ôm ấp hạt mầm bé nhỏ, che chở hạt mầm qua những ngày mưa bão.",
      "Chẳng bao lâu sau, mầm xanh nhú lên, đơm nụ rồi nở tung thành những bông hoa cúc vàng óng ả tỏa hương thơm ngát khắp khu vườn. Ấm sành sung sướng mỉm cười, cảm ơn cuộc đời vì đã mang lại cho mình một niềm vui mới diệu kỳ."
    ]
  },
  {
    id: "bt_be_may",
    cat: "bedtime",
    title: "Bé Mây đi ngủ ngoan",
    en: "Little Cloud Goes to Bed",
    icon: "☁️",
    summary: "Câu chuyện ru êm đềm về Đám Mây nhỏ bay dạo chơi cùng gió trời và về ngủ ngon cùng vầng trăng.",
    moral: "Bé ngoan hãy nhắm mắt lại, thư giãn và chìm vào giấc mơ ngọt ngào sau một ngày vui chơi bổ ích.",
    content: [
      "Bé Mây là một đám mây trắng bồng bềnh, xốp mịn như kẹo bông gòn, lơ lửng trên bầu trời xanh biếc mùa hạ.",
      "Suốt cả ngày dài, bé Mây cùng chị Gió bay lượn khắp chân trời. Bé che mát cho các bác nông dân đang cấy lúa, soi bóng xuống dòng sông mát lành và đùa vui cùng đàn chim én.",
      "Khi hoàng hôn dần buông xuống, ông Mặt Trời từ từ hạ xuống chân núi đỏ rực. Bầu trời chuyển sang màu tím biếc êm dịu.",
      "Mẹ Gió dịu dàng thổi những làn gió mát lành ru nhẹ: Mây con ơi, trời tối rồi, chúng mình về ngủ ngoan thôi!",
      "Chị Hằng Nga xuất hiện nở nụ cười hiền hậu, thắp sáng vầng trăng lưỡi liềm vàng óng. Muôn ngàn vì sao lấp lánh như những ngọn đèn ngủ lung linh trên bầu trời đêm.",
      "Bé Mây cuộn tròn mình lại êm ái như chiếc gối bông xinh xắn, nhắm đôi mắt tròn xoe và từ từ chìm vào giấc ngủ thật sâu, ngập tràn những giấc mơ êm đềm và tươi đẹp. Chúc bé ngủ thật ngon nhé!"
    ]
  }
];

if (typeof window !== "undefined") {
  window.FAIRY_CATEGORIES = FAIRY_CATEGORIES;
  window.FAIRY_STORIES = FAIRY_STORIES;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FAIRY_CATEGORIES, FAIRY_STORIES };
}
