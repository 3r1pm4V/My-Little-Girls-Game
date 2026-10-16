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
