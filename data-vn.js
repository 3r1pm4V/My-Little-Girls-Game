// Dữ liệu Giáo trình Tiếng Việt Tiền Tiểu Học & Lớp 1 Chuẩn
// Biên soạn theo: 28 Bài Đọc và Cách Đánh Vần Lớp 1, Sách Luyện Đọc Cô Huyền, Các Nét Cơ Bản, Phép Cộng Phạm Vi 10

const VN_SPELL = {
  // Phụ âm đơn và ghép kèm âm đọc
  C: [
    { c: "b", r: "bờ" }, { c: "c", r: "cờ" }, { c: "d", r: "dờ" }, { c: "đ", r: "đờ" },
    { c: "g", r: "gờ" }, { c: "h", r: "hờ" }, { c: "k", r: "ca" }, { c: "l", r: "lờ" },
    { c: "m", r: "mờ" }, { c: "n", r: "nờ" }, { c: "p", r: "pờ" }, { c: "r", r: "rờ" },
    { c: "s", r: "sờ" }, { c: "t", r: "tờ" }, { c: "v", r: "vờ" }, { c: "x", r: "xờ" },
    // 11 Phụ âm ghép
    { c: "ch", r: "chờ" }, { c: "gh", r: "gờ" }, { c: "gi", r: "gi" }, { c: "kh", r: "khờ" },
    { c: "nh", r: "nhờ" }, { c: "ng", r: "ngờ" }, { c: "ngh", r: "ngờ" }, { c: "ph", r: "phờ" },
    { c: "qu", r: "quờ" }, { c: "th", r: "thờ" }, { c: "tr", r: "trờ" }
  ],
  // Nguyên âm
  V: [
    { v: "a", t: ["a","à","á","ả","ã","ạ"] },
    { v: "ă", t: ["ă","ằ","ắ","ẳ","ẵ","ặ"] },
    { v: "â", t: ["â","ầ","ấ","ẩ","ẫ","ậ"] },
    { v: "e", t: ["e","è","é","ẻ","ẽ","ẹ"] },
    { v: "ê", t: ["ê","ề","ế","ể","ễ","ệ"] },
    { v: "i", t: ["i","ì","í","ỉ","ĩ","ị"] },
    { v: "o", t: ["o","ò","ó","ỏ","õ","ọ"] },
    { v: "ô", t: ["ô","ồ","ố","ổ","ỗ","ộ"] },
    { v: "ơ", t: ["ơ","ờ","ớ","ở","ỡ","ợ"] },
    { v: "u", t: ["u","ù","ú","ủ","ũ","ụ"] },
    { v: "ư", t: ["ư","ừ","ứ","ử","ữ","ự"] },
    { v: "y", t: ["y","ỳ","ý","ỷ","ỹ","ỵ"] }
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
  // Tạo tiếng và câu đánh vần
  syl(consObj, vowelObj, toneIdx) {
    const c = consObj.c, cRead = consObj.r, v = vowelObj.v;
    const tonedV = vowelObj.t[toneIdx];
    // Luật chính tả tiếng Việt cơ bản:
    // c, g, ng không đi với e, ê, i (thay bằng k, gh, ngh)
    // k, gh, ngh không đi với a, o, ô, ơ, u, ư (thay bằng c, g, ng)
    let valid = true;
    if (["c","g","ng"].includes(c) && ["e","ê","i","y"].includes(v)) valid = false;
    if (["k","gh","ngh"].includes(c) && ["a","ă","â","o","ô","ơ","u","ư"].includes(v)) valid = false;
    if (c === "qu" && (v === "u" || v === "ư")) valid = false;
    if (c === "gi" && (v === "i" || v === "y")) valid = false;

    let text = c + tonedV;
    if (c === "gi" && v === "ê") text = "gi" + tonedV.slice(0); // giê
    let base = c + v;
    let tName = this.TONES[toneIdx].k;
    let spell = toneIdx === 0 ? `${cRead} - ${v} - ${base}` : `${cRead} - ${v} - ${base} - ${tName} - ${text}`;
    return { text, spell, tName: this.TONES[toneIdx].n, valid };
  }
};

// 28 Bài học vần và đọc trơn chuẩn Lớp 1 (Trích từ tài liệu 28 Bài Đọc & Sách Luyện Đọc)
const VN_LESSONS = [
  {
    id: 1,
    title: "Bài 1: Nguyên âm cơ bản",
    rhymes: ["a", "ă", "â", "o", "ô", "ơ", "e", "ê", "i", "u", "ư", "y"],
    words: ["quả na", "con gà", "cái ô", "con cá", "cờ đỏ", "con bê", "cái nơ", "con cú", "lá thư", "em bé"],
    sentence: "Bé có cờ đỏ. Bé yêu bố mẹ."
  },
  {
    id: 2,
    title: "Bài 2: Phụ âm B, D, Đ",
    rhymes: ["ba", "bo", "bô", "bơ", "be", "bê", "da", "do", "dô", "đa", "đo", "đô"],
    words: ["bà ba", "bè bè", "bò bê", "bế bé", "bi bô", "da dẻ", "dỗ bé", "đá đỏ", "đi đò", "đu đủ"],
    sentence: "Bố bế bé Bi đi bộ ở bờ đê."
  },
  {
    id: 3,
    title: "Bài 3: Phụ âm H, L, K",
    rhymes: ["ha", "ho", "hô", "hơ", "he", "hê", "la", "lo", "lô", "lơ", "le", "lê", "ke", "kê", "ki"],
    words: ["ha ha", "hồ cá", "hổ dữ", "lá đa", "lá cờ", "quả lê", "kệ gỗ", "kì cọ", "ê ke"],
    sentence: "Bố bế bé đi bộ ở bờ hồ. Hồ có cá cờ."
  },
  {
    id: 4,
    title: "Bài 4: Phụ âm T, N, M",
    rhymes: ["ta", "to", "tô", "tơ", "te", "tê", "na", "no", "nô", "nơ", "ma", "mo", "mô", "mơ", "me", "mê"],
    words: ["củ từ", "sư tử", "tô mì", "nơ đỏ", "mũ nỉ", "ba má", "bố mẹ", "lá me", "quả mơ"],
    sentence: "Bé có nơ đỏ và mũ nỉ. Mẹ cho bé tô mì gà to."
  },
  {
    id: 5,
    title: "Bài 5: Phụ âm V, R, S, X",
    rhymes: ["va", "vo", "vô", "vơ", "ve", "vê", "ra", "ro", "rô", "rơ", "sa", "so", "sô", "xa", "xo", "xê"],
    words: ["võ sĩ", "vỏ sò", "vé số", "vở vẽ", "cá rô", "rổ rá", "củ sả", "sổ đỏ", "ca sĩ", "xe lu", "lò xo"],
    sentence: "Bố rủ bé ra bờ đê. Bố có xe ô tô màu đỏ."
  },
  {
    id: 6,
    title: "Bài 6: Phụ âm P, PH, Q, QU",
    rhymes: ["pa", "po", "pô", "pe", "pha", "pho", "phô", "phê", "qua", "que", "qui", "quơ"],
    words: ["pha lê", "phố cổ", "phở bò", "cà phê", "phi cơ", "quả na", "quả mơ", "quả nho", "quà quê", "chả quế"],
    sentence: "Nhà bé ở phố cổ. Bà ở quê ra có quà cho bé."
  },
  {
    id: 7,
    title: "Bài 7: Phụ âm G, GH, NG, NGH",
    rhymes: ["ga", "go", "gô", "gơ", "gu", "ghe", "ghê", "ghi", "nga", "ngo", "ngô", "nghe", "nghê", "nghi"],
    words: ["ổ gà", "gà gô", "ghế gỗ", "ghẹ đỏ", "bí ngô", "cá ngừ", "ru ngủ", "nghé tơ", "củ nghệ", "nghỉ hè"],
    sentence: "Mẹ ru bé ngủ. Ở bờ đê có chú nghé tơ gặm cỏ."
  },
  {
    id: 8,
    title: "Bài 8: Phụ âm CH, TR",
    rhymes: ["cha", "cho", "chô", "chơ", "che", "chê", "chi", "chu", "tra", "tro", "trô", "trơ", "tre", "trê", "tri", "tru"],
    words: ["cha mẹ", "chả cá", "chó xù", "đi chợ", "che chở", "trà đá", "cây tre", "cá trê", "vũ trụ", "bầu trời"],
    sentence: "Dì Ba có chú chó xù. Bé bê ly trà đá cho bố."
  },
  {
    id: 9,
    title: "Bài 9: Phụ âm NH, TH",
    rhymes: ["nha", "nho", "nhô", "nhơ", "nhe", "nhê", "nhi", "nhu", "tha", "tho", "thô", "thơ", "the", "thê", "thi", "thu"],
    words: ["nha sĩ", "nhà lá", "chùm nho", "nhỏ bé", "thỏ mẹ", "thơ ca", "thủ thỉ", "quả thị", "thi sĩ", "lá thư"],
    sentence: "Cô Ba là nha sĩ. Mẹ và bé ra bờ hồ thả cá cờ."
  },
  {
    id: 10,
    title: "Bài 10: Phụ âm GI, KH",
    rhymes: ["gia", "gio", "giô", "giơ", "gie", "giê", "giu", "kha", "kho", "khô", "khơ", "khe", "khê", "khi", "khu"],
    words: ["cụ già", "giò chả", "giỏ cá", "giá đỗ", "gia vị", "cá kho", "lá khô", "khe đá", "chú khỉ", "khế chua"],
    sentence: "Bà đi chợ về có giỏ cá to. Mẹ kho cá với khế."
  },
  {
    id: 11,
    title: "Bài 11: Ôn tập Đọc trơn",
    rhymes: ["ba", "ca", "da", "ga", "ha", "la", "ma", "na", "ra", "ta", "va", "xa"],
    words: ["nhà có cỗ", "chả giò", "cá kho", "no nê", "ngủ khò", "mở quà", "búp bê", "chó con"],
    sentence: "Nhà có giỗ, có cỗ to: có chả giò, có cá kho. Bé ăn no, bé ngủ khò."
  },
  {
    id: 12,
    title: "Bài 12: Vần AN, ĂN, ÂN, ON, ÔN, ƠN, EN, ÊN, IN, UN",
    rhymes: ["an", "ăn", "ân", "on", "ôn", "ơn", "en", "ên", "in", "un"],
    words: ["đàn ngan", "bàn ghế", "căn dặn", "cẩn thận", "khăn đỏ", "bạn thân", "ăn ngon", "con chồn", "ngọn nến", "con trăn"],
    sentence: "Bé đeo khăn quàng đỏ đi học. Bạn thân cùng học chăm ngoan."
  },
  {
    id: 13,
    title: "Bài 13: Vần AM, ĂM, ÂM, OM, ÔM, ƠM, EM, ÊM, IM, UM",
    rhymes: ["am", "ăm", "âm", "om", "ôm", "ơm", "em", "êm", "im", "um"],
    words: ["quả cam", "chăm làm", "mầm non", "tăm tre", "con tằm", "giỏ kem", "ban đêm", "con chim", "cơm gà", "tôm hùm"],
    sentence: "Mẹ mua giỏ cam ngọt và tôm hùm tươi ngon cho cả nhà."
  },
  {
    id: 14,
    title: "Bài 14: Vần AI, AY, ÂY, OI, ÔI, ƠI, UI, ƯI, UY",
    rhymes: ["ai", "ay", "ây", "oi", "ôi", "ơi", "ui", "ưi", "uy"],
    words: ["số hai", "máy bay", "thợ xây", "cây hoa", "cá voi", "xe nôi", "con dơi", "cái túi", "gửi thư", "thủy thủ"],
    sentence: "Bố dạy bé vẽ chiếc máy bay bay lượn trên bầu trời."
  },
  {
    id: 15,
    title: "Bài 15: Vần AO, EO, AU, ÂU, ÊU, IU, ƯU",
    rhymes: ["ao", "eo", "au", "âu", "êu", "iu", "ưu"],
    words: ["tờ báo", "chào cờ", "quả táo", "chú mèo", "leo trèo", "bó rau", "dưa hấu", "cây nêu", "cái rìu", "quả lựu"],
    sentence: "Mẹ cho bé quả táo đỏ và dưa hấu mát ngọt."
  },
  {
    id: 16,
    title: "Bài 16: Vần AC, ĂC, ÂC, OC, ÔC, UC, ƯC",
    rhymes: ["ac", "ăc", "âc", "oc", "ôc", "uc", "ưc"],
    words: ["bác sĩ", "củ lạc", "mắc áo", "quả gấc", "bậc thang", "con cóc", "con ốc", "hoa cúc", "lọ mực", "bức tranh"],
    sentence: "Hoa cúc vàng rực rỡ dưới nắng ban mai."
  },
  {
    id: 17,
    title: "Bài 17: Vần AT, ĂT, ÂT, OT, ÔT, ƠT, ET, ÊT, IT, UT, ƯT",
    rhymes: ["at", "ăt", "ât", "ot", "ôt", "ơt", "et", "êt", "it", "ut", "ưt"],
    words: ["cái bát", "giặt giũ", "lật đật", "hót ca", "cà rốt", "quả ớt", "con vẹt", "bồ kết", "vịt con", "bút chì", "mứt tết"],
    sentence: "Bé dùng bút chì vẽ chú vịt con bơi lội tung tăng."
  },
  {
    id: 18,
    title: "Bài 18: Vần AP, ĂP, ÂP, OP, ÔP, ƠP, EP, ÊP, IP, UP",
    rhymes: ["ap", "ăp", "âp", "op", "ôp", "ơp", "ep", "êp", "ip", "up"],
    words: ["sáp màu", "cái cặp", "bài tập", "ngăn nắp", "hộp quà", "tia chớp", "đôi dép", "bếp gas", "bìm bịp", "búp bê"],
    sentence: "Bé soạn sách vở ngăn nắp vào chiếc cặp mới tinh."
  },
  {
    id: 19,
    title: "Bài 19: Vần ANH, ÊNH, INH, ACH, ÊCH, ICH",
    rhymes: ["anh", "ênh", "inh", "ach", "êch", "ich"],
    words: ["bầu trời xanh", "bập bênh", "thông minh", "cuốn sách", "viên gạch", "con ếch", "du lịch", "tích tắc"],
    sentence: "Bầu trời xanh trong vắt. Bé đọc cuốn sách truyện hay."
  },
  {
    id: 20,
    title: "Bài 20: Vần ANG, ĂNG, ÂNG, ONG, ÔNG, ENG, UNG, ƯNG",
    rhymes: ["ang", "ăng", "âng", "ong", "ông", "eng", "ung", "ưng"],
    words: ["vầng trăng", "cây bàng", "con ong", "quả bóng", "bông hồng", "tiếng leng keng", "hoa súng", "củ gừng"],
    sentence: "Đêm rằm vầng trăng tròn sáng lung linh tỏa khắp sân nhà."
  },
  {
    id: 21,
    title: "Bài 21: Vần IA, UA, ƯA, IÊC, IÊP, IÊN, YÊN, IÊM, YÊM",
    rhymes: ["ia", "ua", "ưa", "iêc", "iêp", "iên", "yên", "iêm", "yêm"],
    words: ["quả dưa", "con cua", "cái thìa", "xem xiếc", "tấm thiệp", "cô tiên", "chim yến", "trái tim", "cái yếm"],
    sentence: "Bé đi xem xiếc có chú voi huơ cái vòi dài thật ngộ nghĩnh."
  },
  {
    id: 22,
    title: "Bài 22: Vần IÊU, YÊU, IÊT, YÊT, IÊNG, YÊNG",
    rhymes: ["iêu", "yêu", "iêt", "yêt", "iêng", "yêng"],
    words: ["vải thiều", "buổi chiều", "yêu quý", "tiết kiệm", "tiếng chim", "cái giếng", "khiêng bàn", "chim yểng"],
    sentence: "Buổi chiều hè, đàn chim hót líu lo rộn rã trên cành cây."
  },
  {
    id: 23,
    title: "Bài 23: Vần UÔI, UÔM, UÔC, UÔT, UÔN, UÔNG",
    rhymes: ["uôi", "uôm", "uôc", "uôt", "uôn", "uông"],
    words: ["nải chuối", "con suối", "cánh buồm", "con cuốc", "chuột túi", "chuồn chuồn", "hoa muống", "uống nước"],
    sentence: "Chú chuồn chuồn ớt bay lượn trên mặt hồ nước mát lành."
  },
  {
    id: 24,
    title: "Bài 24: Vần ƯƠI, ƯƠU, ƯƠC, ƯƠT, ƯƠM, ƯƠP, ƯƠN, ƯƠNG",
    rhymes: ["ươi", "ươu", "ươc", "ươt", "ươm", "ươp", "ươn", "ương"],
    words: ["quả bưởi", "con hươu", "ngọn đuốc", "lướt sóng", "con bướm", "khu vườn", "quê hương", "đo đường"],
    sentence: "Trong khu vườn nhà, chú bướm xinh rập rờn bên khóm hoa hồng."
  },
  {
    id: 25,
    title: "Bài 25: Vần OA, OE, OAI, OAN, OAC, OAT",
    rhymes: ["oa", "oe", "oai", "oan", "oac", "oat"],
    words: ["bông hoa", "hoa khoe sắc", "củ khoai", "bé ngoan", "áo khoác", "hoạt hình", "chích chòe", "đoạt giải"],
    sentence: "Mùa xuân về, trăm hoa đua nở khoe sắc rực rỡ khắp muôn nơi."
  },
  {
    id: 26,
    title: "Bài 26: Vần OĂN, OẮT, OANH, OACH, OANG, OĂNG",
    rhymes: ["oăn", "oắt", "oanh", "oach", "oang", "oăng"],
    words: ["tóc xoăn", "thoăn thoắt", "chim oanh", "kế hoạch", "khoảng trời", "con hoẵng", "loanh quanh", "thu hoạch"],
    sentence: "Bé có mái tóc xoăn xinh xắn. Bé chạy thoăn thoắt đón bà."
  },
  {
    id: 27,
    title: "Bài 27: Vần UÊ, UY, UÂN, UÂT, UÂY, UYÊN, UYÊT",
    rhymes: ["uê", "uy", "uân", "uât", "uây", "uyên", "uyêt"],
    words: ["hoa huệ", "tàu thủy", "mùa xuân", "kỷ luật", "sum vầy", "kể chuyện", "trăng khuyết", "hoa cúc vàng"],
    sentence: "Mùa xuân ấm áp, cả gia đình sum vầy bên mâm cơm ấm cúng."
  },
  {
    id: 28,
    title: "Bài 28: Vần Mở Rộng OAO, OAY, OAM, OĂM, OEN, OET, UYA",
    rhymes: ["oao", "oay", "oam", "oăm", "oen", "oet", "uya", "oong", "ooc"],
    words: ["ngoao ngoao", "cơn gió xoáy", "ngoàm ngoàm", "sâu hoắm", "cười nhoẻn", "đêm khuya", "quần soóc", "cái xoong"],
    sentence: "Mùa hè bé mặc quần soóc đi dạo phố. Chú mèo kêu ngoao ngoao đáng yêu."
  }
];

// Tuyển tập Bài đọc trơn ngắn chuẩn bị vào Lớp 1 (Trích Sách Luyện Đọc Cô Huyền & Bài Đọc Lớp 1)
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
