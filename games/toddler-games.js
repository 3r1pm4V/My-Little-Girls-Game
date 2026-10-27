/**
 * games/toddler-games.js
 * Hệ thống Trò chơi Tư duy & Khám phá Mầm non (RV AppStudios "Baby Toddler Kids Games" Edition)
 * - Đã tăng độ khó +20% (5 thẻ phân loại màu, 4 khuôn hình học, 3 khung ghép tranh, 6 ô tìm khác biệt, đếm tới 12, dãy 5 số...)
 * - Chế độ Chơi Liên Tục Không Giới Hạn (Endless Loop) cho đến khi bé chủ động thoát ra hoặc chạm ngưỡng thời gian 15/30 phút của bố mẹ.
 * - "Hộp Quà Bất Ngờ (Play Random Mix)" bốc ngẫu nhiên liên tục giữa TẤT CẢ 11 trò chơi trong hình Góc Vui Chơi.
 */
(function() {
  "use strict";

  const _T = (vi, en) => (typeof window !== "undefined" && window.T ? window.T(vi, en) : vi);
  const _shuf = (arr) => (typeof window !== "undefined" && window.shuf ? window.shuf([...arr]) : [...arr].sort(() => Math.random() - 0.5));
  const _pick = (arr) => (typeof window !== "undefined" && window.pick ? window.pick(arr) : arr[Math.floor(Math.random() * arr.length)]);
  const _R = (a, b) => (typeof window !== "undefined" && window.R ? window.R(a, b) : Math.floor(Math.random() * (b - a + 1)) + a);
  const _kbc = (crumbs) => (typeof window !== "undefined" && window.kbc ? window.kbc(crumbs) : "");
  const _say = (vi, en) => { if (typeof window !== "undefined" && window.say) window.say(vi, en); };
  const _catSet = (st) => { if (typeof window !== "undefined" && window.catSet) window.catSet(st); };
  const _sfxTap = () => { if (typeof window !== "undefined" && window.sfxTap) window.sfxTap(); };
  const _sfxOk = () => { if (typeof window !== "undefined" && window.sfxOk) window.sfxOk(); };
  const _sfxNo = () => { if (typeof window !== "undefined" && window.sfxNo) window.sfxNo(); };
  const _sfxTing = () => { if (typeof window !== "undefined" && window.sfxTingTing) window.sfxTingTing(); else _sfxOk(); };
  const _fx = () => { if (typeof window !== "undefined" && window.fx) window.fx(); };

  function getContainer() {
    return (typeof document !== "undefined" && (document.getElementById("m") || document.body)) || null;
  }

  function rewardStarsAndProgress(starAdd, skillKey) {
    if (typeof window === "undefined") return;
    try {
      if (typeof window.stars !== "undefined" && window.ls) {
        window.stars += starAdd;
        window.ls.set("stars", window.stars);
      }
      if (typeof window.head === "function") window.head();
      if (typeof window.checkBadges === "function") window.checkBadges();
      if (typeof window.recordDailyActivity === "function") window.recordDailyActivity();
      if (skillKey && typeof window.updateProgress === "function") {
        window.updateProgress(skillKey, true);
      }
    } catch (e) {}
  }

  // ============================================================================
  // 1. DỮ LIỆU PHONG PHÚ CHO CÁC TRÒ CHƠI MẦM NON
  // ============================================================================

  const COLOR_BUCKETS = [
    {
      id: "red",
      nameVi: "Màu đỏ",
      nameEn: "Red",
      hex: "#ef4444",
      dark: "#b91c1c",
      light: "#fee2e2",
      items: [
        { emoji: "🍓", vi: "Quả dâu tây đỏ", en: "Red strawberry" },
        { emoji: "🍎", vi: "Quả táo đỏ", en: "Red apple" },
        { emoji: "🐜", vi: "Chú kiến đỏ", en: "Red ant" },
        { emoji: "🐞", vi: "Bọ rùa đỏ", en: "Red ladybug" },
        { emoji: "🍉", vi: "Dưa hấu đỏ", en: "Red watermelon" },
        { emoji: "🍒", vi: "Quả anh đào đỏ", en: "Red cherry" },
        { emoji: "🚒", vi: "Xe cứu hỏa đỏ", en: "Red fire truck" }
      ]
    },
    {
      id: "green",
      nameVi: "Màu xanh lá",
      nameEn: "Green",
      hex: "#22c55e",
      dark: "#15803d",
      light: "#dcfce7",
      items: [
        { emoji: "🐸", vi: "Chú ếch xanh lá", en: "Green frog" },
        { emoji: "🐢", vi: "Chú rùa xanh lá", en: "Green turtle" },
        { emoji: "🐊", vi: "Cá sấu xanh lá", en: "Green crocodile" },
        { emoji: "🥦", vi: "Súp lơ xanh lá", en: "Green broccoli" },
        { emoji: "🥒", vi: "Dưa chuột xanh lá", en: "Green cucumber" },
        { emoji: "🍃", vi: "Chiếc lá xanh", en: "Green leaf" },
        { emoji: "🥑", vi: "Quả bơ xanh", en: "Green avocado" }
      ]
    },
    {
      id: "blue",
      nameVi: "Màu xanh dương",
      nameEn: "Blue",
      hex: "#3b82f6",
      dark: "#1d4ed8",
      light: "#dbeafe",
      items: [
        { emoji: "🐬", vi: "Cá heo xanh dương", en: "Blue dolphin" },
        { emoji: "🐳", vi: "Cá voi xanh dương", en: "Blue whale" },
        { emoji: "🦋", vi: "Bươm bướm xanh", en: "Blue butterfly" },
        { emoji: "🚙", vi: "Ô tô xanh dương", en: "Blue car" },
        { emoji: "💎", vi: "Viên ngọc xanh dương", en: "Blue gem" },
        { emoji: "🧢", vi: "Chiếc mũ xanh dương", en: "Blue cap" }
      ]
    },
    {
      id: "yellow",
      nameVi: "Màu vàng",
      nameEn: "Yellow",
      hex: "#eab308",
      dark: "#a16207",
      light: "#fef9c3",
      items: [
        { emoji: "🐥", vi: "Vịt con màu vàng", en: "Yellow duckling" },
        { emoji: "🍌", vi: "Quả chuối vàng", en: "Yellow banana" },
        { emoji: "🍋", vi: "Quả chanh vàng", en: "Yellow lemon" },
        { emoji: "⭐", vi: "Ngôi sao vàng", en: "Yellow star" },
        { emoji: "🌻", vi: "Hoa hướng dương vàng", en: "Yellow sunflower" },
        { emoji: "🧀", vi: "Phô mai vàng", en: "Yellow cheese" }
      ]
    },
    {
      id: "purple",
      nameVi: "Màu tím",
      nameEn: "Purple",
      hex: "#a855f7",
      dark: "#7e22ce",
      light: "#f3e8ff",
      items: [
        { emoji: "🍇", vi: "Chùm nho tím", en: "Purple grapes" },
        { emoji: "🍆", vi: "Cà tím", en: "Purple eggplant" },
        { emoji: "👾", vi: "Bạn nhỏ màu tím", en: "Purple monster" },
        { emoji: "🔮", vi: "Quả cầu tím", en: "Purple crystal" }
      ]
    },
    {
      id: "orange",
      nameVi: "Màu cam",
      nameEn: "Orange",
      hex: "#f97316",
      dark: "#c2410c",
      light: "#ffedd5",
      items: [
        { emoji: "🍊", vi: "Quả cam", en: "Orange fruit" },
        { emoji: "🥕", vi: "Củ cà rốt cam", en: "Orange carrot" },
        { emoji: "🦊", vi: "Chú cáo màu cam", en: "Orange fox" },
        { emoji: "🎃", vi: "Bí ngô màu cam", en: "Orange pumpkin" }
      ]
    }
  ];

  const SHAPES_DATA = [
    { id: "star", nameVi: "Hình ngôi sao", nameEn: "Star", svg: `<svg viewBox="0 0 100 100"><polygon points="50,6 63,36 95,39 71,61 78,93 50,76 22,93 29,61 5,39 37,36" fill="currentColor" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>`, color: "#ec4899" },
    { id: "circle", nameVi: "Hình tròn", nameEn: "Circle", svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="currentColor" stroke="#fff" stroke-width="4"/></svg>`, color: "#3b82f6" },
    { id: "square", nameVi: "Hình vuông", nameEn: "Square", svg: `<svg viewBox="0 0 100 100"><rect x="12" y="12" width="76" height="76" rx="10" fill="currentColor" stroke="#fff" stroke-width="4"/></svg>`, color: "#ef4444" },
    { id: "triangle", nameVi: "Hình tam giác", nameEn: "Triangle", svg: `<svg viewBox="0 0 100 100"><polygon points="50,10 92,86 8,86" fill="currentColor" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>`, color: "#22c55e" },
    { id: "heart", nameVi: "Hình trái tim", nameEn: "Heart", svg: `<svg viewBox="0 0 100 100"><path d="M50,88 C50,88 10,62 10,34 C10,18 23,10 36,10 C44,10 50,16 50,22 C50,16 56,10 64,10 C77,10 90,18 90,34 C90,62 50,88 50,88 Z" fill="currentColor" stroke="#fff" stroke-width="4"/></svg>`, color: "#f43f5e" },
    { id: "hexagon", nameVi: "Hình lục giác", nameEn: "Hexagon", svg: `<svg viewBox="0 0 100 100"><polygon points="28,10 72,10 94,50 72,90 28,90 6,50" fill="currentColor" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>`, color: "#f59e0b" },
    { id: "diamond", nameVi: "Hình thoi", nameEn: "Diamond", svg: `<svg viewBox="0 0 100 100"><polygon points="50,6 90,50 50,94 10,50" fill="currentColor" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>`, color: "#8b5cf6" }
  ];

  const PUZZLE_ANIMALS = [
    { id: "penguin", emoji: "🐧", nameVi: "Chim cánh cụt", nameEn: "Penguin", bg: "#38bdf8" },
    { id: "duck", emoji: "🦆", nameVi: "Chú vịt con", nameEn: "Duck", bg: "#2dd4bf" },
    { id: "snail", emoji: "🐌", nameVi: "Ốc sên", nameEn: "Snail", bg: "#a7f3d0" },
    { id: "hedgehog", emoji: "🦔", nameVi: "Chú nhím nhỏ", nameEn: "Hedgehog", bg: "#fde68a" },
    { id: "panda", emoji: "🐼", nameVi: "Gấu trúc", nameEn: "Panda", bg: "#bfdbfe" },
    { id: "cat", emoji: "🐱", nameVi: "Mèo con", nameEn: "Kitty", bg: "#fed7aa" },
    { id: "ladybug", emoji: "🐞", nameVi: "Bọ rùa", nameEn: "Ladybug", bg: "#fecdd3" },
    { id: "lion", emoji: "🦁", nameVi: "Sư tử", nameEn: "Lion", bg: "#fef08a" },
    { id: "elephant", emoji: "🐘", nameVi: "Voi con", nameEn: "Elephant", bg: "#e0e7ff" },
    { id: "turtle", emoji: "🐢", nameVi: "Rùa xanh", nameEn: "Turtle", bg: "#bbf7d0" },
    { id: "owl", emoji: "🦉", nameVi: "Chim cú mèo", nameEn: "Owl", bg: "#ddd6fe" },
    { id: "rabbit", emoji: "🐰", nameVi: "Thỏ trắng", nameEn: "Rabbit", bg: "#fce7f3" }
  ];

  const FRUIT_CUTOUTS = [
    { id: "watermelon_star", fruitEmoji: "🍉", fruitVi: "Quả dưa hấu", shapeId: "star", shapeVi: "Hình ngôi sao", bg: "#fb7185", fill: "#16a34a" },
    { id: "pepper_hex", fruitEmoji: "🔔", fruitVi: "Quả chuông vàng", shapeId: "hexagon", shapeVi: "Hình lục giác", bg: "#f472b6", fill: "#eab308" },
    { id: "apple_heart", fruitEmoji: "🍎", fruitVi: "Quả táo đỏ", shapeId: "heart", shapeVi: "Hình trái tim", bg: "#bae6fd", fill: "#ef4444" },
    { id: "orange_circle", fruitEmoji: "🍊", fruitVi: "Quả cam vàng", shapeId: "circle", shapeVi: "Hình tròn", bg: "#fde68a", fill: "#f97316" },
    { id: "strawberry_tri", fruitEmoji: "🍓", fruitVi: "Quả dâu tây", shapeId: "triangle", shapeVi: "Hình tam giác", bg: "#bbf7d0", fill: "#e11d48" },
    { id: "grape_diamond", fruitEmoji: "🍇", fruitVi: "Chùm nho tím", shapeId: "diamond", shapeVi: "Hình thoi", bg: "#fed7aa", fill: "#9333ea" }
  ];

  const OPPOSITE_PAIRS = [
    { id: "hot_cold", leftEmoji: "🔥", leftVi: "Ngọn lửa nóng", rightEmoji: "🧊", rightVi: "Viên đá lạnh", border: "#22c55e" },
    { id: "happy_sad", leftEmoji: "😄", leftVi: "Khuôn mặt vui", rightEmoji: "🙄", rightVi: "Khuôn mặt buồn", border: "#38bdf8" },
    { id: "fast_slow", leftEmoji: "🐇", leftVi: "Thỏ chạy nhanh", rightEmoji: "🐢", rightVi: "Rùa bò chậm", border: "#eab308" },
    { id: "day_night", leftEmoji: "☀️", leftVi: "Ban ngày nắng", rightEmoji: "🌙", rightVi: "Ban đêm trăng", border: "#f97316" },
    { id: "big_small", leftEmoji: "🐘", leftVi: "Voi khổng lồ", rightEmoji: "🐜", rightVi: "Kiến tí hon", border: "#a855f7" },
    { id: "sun_rain", leftEmoji: "🕶️", leftVi: "Trời nắng đeo kính", rightEmoji: "☂️", rightVi: "Trời mưa che ô", border: "#ec4899" }
  ];

  const ANIMAL_ASSOC_PAIRS = [
    { id: "monkey_banana", leftEmoji: "🐒", leftVi: "Chú khỉ", rightEmoji: "🍌", rightVi: "Quả chuối", border: "#eab308" },
    { id: "rabbit_carrot", leftEmoji: "🐰", leftVi: "Chú thỏ", rightEmoji: "🥕", rightVi: "Củ cà rốt", border: "#f97316" },
    { id: "bee_flower", leftEmoji: "🐝", leftVi: "Ong chăm chỉ", rightEmoji: "🌻", rightVi: "Bông hoa", border: "#22c55e" },
    { id: "cat_fish", leftEmoji: "🐱", leftVi: "Mèo con", rightEmoji: "🐟", rightVi: "Con cá", border: "#38bdf8" },
    { id: "dog_bone", leftEmoji: "🐶", leftVi: "Chó cún", rightEmoji: "🦴", rightVi: "Khúc xương", border: "#a855f7" },
    { id: "panda_bamboo", leftEmoji: "🐼", leftVi: "Gấu trúc", rightEmoji: "🎍", rightVi: "Cây trúc", border: "#10b981" }
  ];

  const ANIMAL_QUESTIONS = [
    { qVi: "Bạn nào mê ăn tre trúc và đeo kính đen sành điệu?", qEn: "Who loves bamboo and has black eye patches?", right: "🐼", rightVi: "Gấu trúc đáng yêu", wrong: ["🐱", "🐶", "🐸", "🦁", "🐷"] },
    { qVi: "Bạn nào kêu 'Meo meo' và bắt chuột siêu giỏi?", qEn: "Who says 'Meow' and catches mice?", right: "🐱", rightVi: "Mèo con tinh nghịch", wrong: ["🐼", "🐷", "🐮", "🐸", "🐢"] },
    { qVi: "Bạn nào có chiếc vòi dài ngoẵng và đôi tai to bự?", qEn: "Who has a long trunk and big ears?", right: "🐘", rightVi: "Voi con khỏe mạnh", wrong: ["🐰", "🐥", "🐒", "🦊", "🐻"] },
    { qVi: "Bạn nào có cổ cao vút để với lá cây trên ngọn?", qEn: "Who has a very long neck?", right: "🦒", rightVi: "Hươu cao cổ duyên dáng", wrong: ["🐢", "🦀", "🦔", "🐧", "🦆"] },
    { qVi: "Bạn nào là chúa sơn lâm với bờm tóc oai phong?", qEn: "Who is the king of the jungle?", right: "🦁", rightVi: "Sư tử dũng mãnh", wrong: ["🐑", "🦆", "🐌", "🐰", "🐸"] },
    { qVi: "Bạn nào sống dưới biển sâu và phun nước tung tóe?", qEn: "Who swims in the ocean and spouts water?", right: "🐳", rightVi: "Cá voi khổng lồ", wrong: ["🐓", "🐕", "🦋", "🐈", "🐿️"] }
  ];

  // ============================================================================
  // 2. HÀM KIỂM CHỨNG ĐƯỜNG NÉT TẬP VIẾT (PATH VALIDATION CÓ UNIT TEST)
  // ============================================================================
  function validateTracePath(userPoints, targetCheckpoints, toleranceRadius = 38) {
    if (!Array.isArray(userPoints) || !Array.isArray(targetCheckpoints) || targetCheckpoints.length === 0) {
      return { valid: false, coverage: 0, matchedCount: 0, totalCheckpoints: 0 };
    }
    if (userPoints.length < 2) {
      return { valid: false, coverage: 0, matchedCount: 0, totalCheckpoints: targetCheckpoints.length };
    }

    let matchedCount = 0;
    for (const cp of targetCheckpoints) {
      const hit = userPoints.some(p => Math.hypot((p.x || 0) - cp.x, (p.y || 0) - cp.y) <= toleranceRadius);
      if (hit) matchedCount++;
    }

    const coverage = matchedCount / targetCheckpoints.length;
    const firstCp = targetCheckpoints[0];
    const startDist = Math.hypot((userPoints[0].x || 0) - firstCp.x, (userPoints[0].y || 0) - firstCp.y);
    const startOk = startDist <= toleranceRadius * 1.6;

    return {
      valid: coverage >= 0.7 && startOk,
      coverage: Math.round(coverage * 100) / 100,
      matchedCount,
      totalCheckpoints: targetCheckpoints.length,
      startOk
    };
  }

  // ============================================================================
  // 3. ĐIỀU HƯỚNG LIÊN TỤC KHÔNG GIỚI HẠN (ENDLESS CONTINUOUS PLAY)
  //    Khi bé thắng 1 lượt: cộng Sao + mở khóa Sticker ngẫu nhiên và tự động
  //    chuyển tiếp sang lượt mới (hoặc sang trò ngẫu nhiên mới nếu đang ở Random Mix)
  // ============================================================================
  const STICKER_REWARDS = ["🦁", "🐼", "🦄", "🦖", "🐬", "🦋", "🚀", "🌈", "👑", "🧸", "🍭", "🎨"];

  function advanceEndlessOrNext(defaultNextFn, skillKey) {
    rewardStarsAndProgress(1, skillKey);
    try {
      if (typeof window !== "undefined" && window.ls && Math.random() < 0.35) {
        const sticker = _pick(STICKER_REWARDS);
        const unlocked = JSON.parse(window.ls.get("stickers_unlocked", "[]") || "[]");
        if (!unlocked.includes(sticker)) {
          unlocked.push(sticker);
          window.ls.set("stickers_unlocked", JSON.stringify(unlocked));
        }
      }
    } catch (e) {}

    if (typeof window !== "undefined" && typeof window.__endlessNext === "function") {
      window.__endlessNext();
    } else if (typeof defaultNextFn === "function") {
      defaultNextFn();
    }
  }

  function renderHeaderRightBadge(roundNum) {
    const isMix = typeof window !== "undefined" && typeof window.__endlessNext === "function";
    return `
      <div style="display:flex;align-items:center;gap:8px">
        ${isMix ? `<button class="pill" onclick="window.__endlessNext()" style="font-size:13.5px;padding:4px 12px;min-height:38px;background:#f3e8ff;color:#6d28d9;border-color:#c084fc">🎲 ${_T("Đổi trò khác", "Next Random")}</button>` : ""}
        <div class="rv-round-badge">⭐ ${_T("Lượt", "Round")} ${roundNum}</div>
      </div>
    `;
  }

  // ============================================================================
  // 4. TRÒ CHƠI 1: GIỎ MÀU & HÌNH DẠNG (colorShapeGame - Độ khó +20%)
  //    - Mode A: Phân loại 5 thẻ đồ vật vào 3 chiếc giỏ màu
  //    - Mode B: Phân loại 4 hình học vào 4 khuôn hình dạng
  // ============================================================================
  let csState = { round: 1 };

  function colorShapeGame(isReplay) {
    if (isReplay) csState.round = 1;
    const mode = Math.random() < 0.6 ? "basket" : "shapes";
    if (mode === "basket") {
      renderColorBasketRound();
    } else {
      renderShapeMatchRound();
    }
  }

  function renderColorBasketRound() {
    const c = getContainer();
    if (!c) return;

    const chosenBuckets = _shuf(COLOR_BUCKETS).slice(0, 3);
    const cards = [];
    // Độ khó +20%: 5 thẻ hình phân loại vào 3 giỏ màu
    chosenBuckets.forEach(b => {
      const it = _pick(b.items);
      cards.push({ uid: "cb_" + Math.random().toString(36).slice(2, 7), bucketId: b.id, colorVi: b.nameVi, colorEn: b.nameEn, ...it });
    });
    for (let k = 0; k < 2; k++) {
      const extraBucket = chosenBuckets[k % chosenBuckets.length];
      const remainingItems = extraBucket.items.filter(it => !cards.some(x => x.emoji === it.emoji));
      const extraItem = _pick(remainingItems.length ? remainingItems : extraBucket.items);
      cards.push({ uid: "cb_" + Math.random().toString(36).slice(2, 7), bucketId: extraBucket.id, colorVi: extraBucket.nameVi, colorEn: extraBucket.nameEn, ...extraItem });
    }

    const shuffledCards = _shuf(cards);
    let remaining = shuffledCards.length;
    let selectedCardEl = null;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Giỏ màu & Hình dạng", "Colors & Shapes"), i: "🧺" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvColorWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Bé hãy giúp các hình khối tìm về đúng ngôi nhà màu sắc của chúng nhé!','Put each item into the matching color basket!')">
            🔊 ${_T("Bỏ 5 hình vào đúng giỏ cùng màu nhé!", "Sort 5 items into the matching color basket!")}
          </h2>
          ${renderHeaderRightBadge(csState.round)}
        </div>

        <div class="rv-cards-row" id="rvCardsRow" style="grid-template-columns:repeat(5,minmax(0,1fr))">
          ${shuffledCards.map(item => `
            <div class="rv-item-card" data-uid="${item.uid}" data-bucket="${item.bucketId}" data-vi="${item.vi}" data-en="${item.en}" tabindex="0" role="button" aria-label="${item.vi}">
              <span class="rv-item-emoji">${item.emoji}</span>
              <span class="rv-item-label">${item.vi}</span>
            </div>
          `).join("")}
        </div>

        <div class="rv-baskets-stage">
          <div class="rv-mascot-buddy" onclick="say('Cố lên bé ơi! Kéo hình bỏ vào chiếc giỏ cùng màu nào!','Tap or drag items into the basket!')" title="${_T("Chạm để nghe cổ vũ", "Tap for cheer")}">
            🦁
          </div>
          <div class="rv-baskets-row">
            ${chosenBuckets.map(b => `
              <div class="rv-basket" data-bucket-id="${b.id}" data-vi="${b.nameVi}" data-en="${b.nameEn}" style="--b-color:${b.hex};--b-dark:${b.dark};--b-light:${b.light}" tabindex="0" role="button" aria-label="${b.nameVi}">
                <div class="rv-basket-rim"></div>
                <div class="rv-basket-body">
                  <div class="rv-basket-collected"></div>
                  <span class="rv-basket-title">${_T(b.nameVi, b.nameEn)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    _say("Bé hãy giúp các hình khối tìm về đúng ngôi nhà màu sắc của chúng nhé!", "Put the pictures into the matching color baskets!");
    _catSet("thinking");

    const wrap = c.querySelector("#rvColorWrap");
    if (!wrap) return;

    function checkMatch(cardEl, basketEl) {
      if (!cardEl || !basketEl || cardEl.classList.contains("sorted")) return;
      if (cardEl.dataset.bucket === basketEl.dataset.bucketId) {
        cardEl.classList.add("sorted");
        cardEl.classList.remove("selected");
        selectedCardEl = null;
        _sfxTing();
        _fx();
        _say(`${cardEl.dataset.vi}`, `${cardEl.dataset.en}! ${basketEl.dataset.en}`);

        const colBox = basketEl.querySelector(".rv-basket-collected");
        if (colBox) {
          const mini = document.createElement("span");
          mini.className = "rv-basket-mini-item";
          mini.textContent = cardEl.querySelector(".rv-item-emoji").textContent;
          colBox.appendChild(mini);
        }
        basketEl.classList.add("pop-good");
        setTimeout(() => basketEl.classList.remove("pop-good"), 450);

        remaining--;
        if (remaining <= 0) {
          setTimeout(() => {
            csState.round++;
            advanceEndlessOrNext(() => colorShapeGame(false), "vi.colors.sort");
          }, 700);
        }
      } else {
        _sfxNo();
        basketEl.classList.add("shake-bad");
        cardEl.classList.add("shake-bad");
        setTimeout(() => {
          basketEl.classList.remove("shake-bad");
          cardEl.classList.remove("shake-bad");
        }, 450);
      }
    }

    wrap.querySelectorAll(".rv-item-card").forEach(cardEl => {
      cardEl.addEventListener("click", () => {
        if (cardEl.classList.contains("sorted")) return;
        _sfxTap();
        wrap.querySelectorAll(".rv-item-card").forEach(el => el.classList.remove("selected"));
        selectedCardEl = cardEl;
        cardEl.classList.add("selected");
        _say(cardEl.dataset.vi, cardEl.dataset.en);
      });
      setupPointerDrag(cardEl, ".rv-basket", (targetBasket) => checkMatch(cardEl, targetBasket));
    });

    wrap.querySelectorAll(".rv-basket").forEach(basketEl => {
      basketEl.addEventListener("click", () => {
        if (selectedCardEl) checkMatch(selectedCardEl, basketEl);
        else _say(basketEl.dataset.vi, basketEl.dataset.en);
      });
    });
  }

  function renderShapeMatchRound() {
    const c = getContainer();
    if (!c) return;

    // Độ khó +20%: 4 khuôn hình học cùng lúc
    const chosenShapes = _shuf(SHAPES_DATA).slice(0, 4);
    const dragItems = _shuf([...chosenShapes]);
    let remaining = chosenShapes.length;
    let selectedShapeEl = null;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Hình dạng thú vị", "Fun Shapes"), i: "⭐" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvShapeWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Hình khối nào đi với khuôn nào? Bé hãy đặt chúng vào đúng vị trí nhé!','Match each shape to its silhouette!')">
            🔊 ${_T("Ghép 4 hình vào đúng khuôn hình dạng nhé!", "Match 4 shapes to their slots!")}
          </h2>
          ${renderHeaderRightBadge(csState.round)}
        </div>

        <div class="rv-slots-row" style="grid-template-columns:repeat(4,minmax(0,1fr))">
          ${chosenShapes.map(sh => `
            <div class="rv-shape-slot" data-shape-id="${sh.id}" data-vi="${sh.nameVi}" data-en="${sh.nameEn}" tabindex="0" role="button" aria-label="${sh.nameVi}">
              <div class="rv-shape-silhouette" style="color:#94a3b8">${sh.svg}</div>
              <div class="rv-shape-slot-label">${_T(sh.nameVi, sh.nameEn)}</div>
            </div>
          `).join("")}
        </div>

        <div class="rv-tray-box">
          ${dragItems.map(sh => `
            <div class="rv-shape-piece" data-shape-id="${sh.id}" data-vi="${sh.nameVi}" data-en="${sh.nameEn}" style="color:${sh.color}" tabindex="0" role="button" aria-label="${sh.nameVi}">
              <div class="rv-shape-svg">${sh.svg}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    _say("Hình khối nào đi với khuôn nào? Bé hãy đặt chúng vào đúng vị trí nhé!", "Place the shapes into their matching slots!");
    _catSet("thinking");

    const wrap = c.querySelector("#rvShapeWrap");
    if (!wrap) return;

    function attemptPlaceShape(pieceEl, slotEl) {
      if (!pieceEl || !slotEl || pieceEl.classList.contains("sorted") || slotEl.classList.contains("filled")) return;
      if (pieceEl.dataset.shapeId === slotEl.dataset.shapeId) {
        pieceEl.classList.add("sorted");
        pieceEl.classList.remove("selected");
        slotEl.classList.add("filled");
        const sil = slotEl.querySelector(".rv-shape-silhouette");
        if (sil) sil.style.color = pieceEl.style.color;
        selectedShapeEl = null;
        _sfxTing();
        _fx();
        _say(pieceEl.dataset.vi, pieceEl.dataset.en);

        remaining--;
        if (remaining <= 0) {
          setTimeout(() => {
            csState.round++;
            advanceEndlessOrNext(() => colorShapeGame(false), "vi.shapes.match");
          }, 700);
        }
      } else {
        _sfxNo();
        slotEl.classList.add("shake-bad");
        pieceEl.classList.add("shake-bad");
        setTimeout(() => {
          slotEl.classList.remove("shake-bad");
          pieceEl.classList.remove("shake-bad");
        }, 450);
      }
    }

    wrap.querySelectorAll(".rv-shape-piece").forEach(pieceEl => {
      pieceEl.addEventListener("click", () => {
        if (pieceEl.classList.contains("sorted")) return;
        _sfxTap();
        wrap.querySelectorAll(".rv-shape-piece").forEach(el => el.classList.remove("selected"));
        selectedShapeEl = pieceEl;
        pieceEl.classList.add("selected");
        _say(pieceEl.dataset.vi, pieceEl.dataset.en);
      });
      setupPointerDrag(pieceEl, ".rv-shape-slot:not(.filled)", (slotEl) => attemptPlaceShape(pieceEl, slotEl));
    });

    wrap.querySelectorAll(".rv-shape-slot").forEach(slotEl => {
      slotEl.addEventListener("click", () => {
        if (selectedShapeEl) attemptPlaceShape(selectedShapeEl, slotEl);
        else _say(slotEl.dataset.vi, slotEl.dataset.en);
      });
    });
  }

  // ============================================================================
  // 5. TRÒ CHƠI 2: GHÉP TRANH & HÌNH BÓNG (puzzleGame - Độ khó +20%)
  //    - Mode 1: Ghép 3 khung nửa con vật + 1 mảnh gây nhiễu (4 mảnh ở khay)
  //    - Mode 2: Ghép 3 quả khuyết hình học + 1 mảnh gây nhiễu
  //    - Mode 3: Ghép 4 con vật vào 4 hình bóng
  // ============================================================================
  let pzState = { round: 1 };

  function puzzleGame(isReplay) {
    if (isReplay) pzState.round = 1;
    const modes = ["half_animal", "fruit_cutout", "shadow_animal"];
    const mode = modes[(pzState.round - 1 + _R(0, 2)) % modes.length];

    if (mode === "half_animal") {
      renderHalfAnimalPuzzle();
    } else if (mode === "fruit_cutout") {
      renderFruitCutoutPuzzle();
    } else {
      renderShadowAnimalPuzzle();
    }
  }

  function renderHalfAnimalPuzzle() {
    const c = getContainer();
    if (!c) return;

    // Độ khó +20%: 3 bức tranh cần ghép + 1 mảnh nhiễu ở khay
    const shuffledPool = _shuf(PUZZLE_ANIMALS);
    const pair = shuffledPool.slice(0, 3);
    const distractor = shuffledPool[3];
    const trayPieces = _shuf([...pair, distractor]);
    let remaining = pair.length;
    let selectedPiece = null;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Hoàn thành bức tranh", "Complete Pictures"), i: "🧩" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvHalfWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Hoàn thành bức tranh nào! Bé hãy tìm đúng nửa còn thiếu để ghép vào bạn nhỏ nhé!','Complete the animal pictures!')">
            🔊 ${_T("Ghép nửa còn thiếu để hoàn thành 3 bức tranh nhé!", "Match the missing half to complete 3 pictures!")}
          </h2>
          ${renderHeaderRightBadge(pzState.round)}
        </div>

        <div class="rv-half-boards" style="grid-template-columns:repeat(3,minmax(0,1fr))">
          ${pair.map(an => `
            <div class="rv-half-board" data-id="${an.id}" data-vi="${an.nameVi}" data-en="${an.nameEn}" style="background:${an.bg}" tabindex="0" role="button" aria-label="${an.nameVi}">
              <div class="rv-half-graphic">
                <span class="rv-emoji-left-half">${an.emoji}</span>
                <span class="rv-emoji-right-shadow" data-right-slot="${an.id}">${an.emoji}</span>
              </div>
              <div class="rv-board-caption">${_T(an.nameVi, an.nameEn)}</div>
            </div>
          `).join("")}
        </div>

        <div class="rv-tray-box">
          ${trayPieces.map(an => `
            <div class="rv-half-piece" data-id="${an.id}" data-vi="${an.nameVi}" data-en="${an.nameEn}" tabindex="0" role="button" aria-label="${_T('Nửa hình ' + an.nameVi, 'Half of ' + an.nameEn)}">
              <span class="rv-emoji-right-half">${an.emoji}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    _say("Hoàn thành bức tranh nào! Bé hãy tìm đúng nửa còn thiếu để ghép vào bạn nhỏ nhé!", "Complete the pictures by matching the missing half!");
    _catSet("thinking");

    const wrap = c.querySelector("#rvHalfWrap");
    if (!wrap) return;

    function checkHalfMatch(pieceEl, boardEl) {
      if (!pieceEl || !boardEl || pieceEl.classList.contains("sorted") || boardEl.classList.contains("completed")) return;
      if (pieceEl.dataset.id === boardEl.dataset.id) {
        pieceEl.classList.add("sorted");
        pieceEl.classList.remove("selected");
        boardEl.classList.add("completed");
        selectedPiece = null;
        _sfxTing();
        _fx();
        _say(`Hoan hô! ${boardEl.dataset.vi}!`, `Hooray! ${boardEl.dataset.en}!`);

        remaining--;
        if (remaining <= 0) {
          setTimeout(() => {
            pzState.round++;
            advanceEndlessOrNext(() => puzzleGame(false), "vi.logic.puzzle");
          }, 700);
        }
      } else {
        _sfxNo();
        boardEl.classList.add("shake-bad");
        pieceEl.classList.add("shake-bad");
        setTimeout(() => {
          boardEl.classList.remove("shake-bad");
          pieceEl.classList.remove("shake-bad");
        }, 450);
      }
    }

    wrap.querySelectorAll(".rv-half-piece").forEach(pieceEl => {
      pieceEl.addEventListener("click", () => {
        if (pieceEl.classList.contains("sorted")) return;
        _sfxTap();
        wrap.querySelectorAll(".rv-half-piece").forEach(el => el.classList.remove("selected"));
        selectedPiece = pieceEl;
        pieceEl.classList.add("selected");
        _say(pieceEl.dataset.vi, pieceEl.dataset.en);
      });
      setupPointerDrag(pieceEl, ".rv-half-board:not(.completed)", (boardEl) => checkHalfMatch(pieceEl, boardEl));
    });

    wrap.querySelectorAll(".rv-half-board").forEach(boardEl => {
      boardEl.addEventListener("click", () => {
        if (selectedPiece) checkHalfMatch(selectedPiece, boardEl);
        else _say(boardEl.dataset.vi, boardEl.dataset.en);
      });
    });
  }

  function renderFruitCutoutPuzzle() {
    const c = getContainer();
    if (!c) return;

    // Độ khó +20%: 3 quả khuyết hình + 1 miếng ghép nhiễu
    const shuffled = _shuf(FRUIT_CUTOUTS);
    const pair = shuffled.slice(0, 3);
    const distractor = shuffled[3];
    const trayPieces = _shuf([...pair, distractor]);
    let remaining = pair.length;
    let selectedPiece = null;

    const getShapeSvg = (shapeId) => {
      const found = SHAPES_DATA.find(s => s.id === shapeId) || SHAPES_DATA[0];
      return found.svg;
    };

    const getClipPoly = (shapeId) => {
      switch (shapeId) {
        case "star": return "polygon(50% 6%, 63% 36%, 95% 39%, 71% 61%, 78% 93%, 50% 76%, 22% 93%, 29% 61%, 5% 39%, 37% 36%)";
        case "hexagon": return "polygon(28% 10%, 72% 10%, 94% 50%, 72% 90%, 28% 90%, 6% 50%)";
        case "triangle": return "polygon(50% 10%, 92% 86%, 8% 86%)";
        case "diamond": return "polygon(50% 6%, 90% 50%, 50% 94%, 10% 50%)";
        case "circle": return "circle(42% at 50% 50%)";
        case "heart": return "polygon(50% 20%, 65% 8%, 85% 12%, 94% 32%, 85% 56%, 50% 88%, 15% 56%, 6% 32%, 15% 12%, 35% 8%)";
        default: return "circle(42% at 50% 50%)";
      }
    };

    const renderTexturedCutoutPiece = (fc, isHole = false) => {
      const clip = getClipPoly(fc.shapeId);
      if (isHole) {
        return `
          <div class="rv-cutout-hole" style="color:#271c15">
            <div style="position:absolute;inset:0;clip-path:${clip};-webkit-clip-path:${clip};display:flex;align-items:center;justify-content:center;background:#1e1b18">
              <span style="font-size:112px;line-height:1;filter:brightness(0.32) contrast(1.25);opacity:0.75;user-select:none">${fc.fruitEmoji}</span>
            </div>
            <div style="position:relative;width:100%;height:100%;color:transparent">${getShapeSvg(fc.shapeId)}</div>
          </div>
        `;
      }
      return `
        <div style="position:relative;width:74px;height:74px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.22))">
          <div style="position:absolute;inset:0;clip-path:${clip};-webkit-clip-path:${clip};background:${fc.fill};display:flex;align-items:center;justify-content:center">
            <span style="font-size:112px;line-height:1;user-select:none">${fc.fruitEmoji}</span>
          </div>
          <div style="position:relative;width:100%;height:100%;color:transparent;pointer-events:none">${getShapeSvg(fc.shapeId)}</div>
        </div>
      `;
    };

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Trò chơi Bức tranh", "Shape Cutout Puzzle"), i: "🍉" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvCutoutWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Tìm mảnh ghép bí ẩn! Bé hãy tìm miếng vừa khít với chỗ trống trên quả nhé!','Fit the shape piece into the fruit cutout!')">
            🔊 ${_T("Đặt miếng ghép vào đúng chỗ khuyết trên 3 quả nhé!", "Fit the shape piece into the matching fruit!")}
          </h2>
          ${renderHeaderRightBadge(pzState.round)}
        </div>

        <div class="rv-half-boards" style="grid-template-columns:repeat(3,minmax(0,1fr))">
          ${pair.map(fc => `
            <div class="rv-cutout-board" data-id="${fc.id}" data-vi="${fc.fruitVi} - ${fc.shapeVi}" data-en="${fc.shapeVi}" style="background:${fc.bg}" tabindex="0" role="button" aria-label="${fc.fruitVi}">
              <div class="rv-cutout-fruit-wrap">
                <span class="rv-cutout-fruit">${fc.fruitEmoji}</span>
                ${renderTexturedCutoutPiece(fc, true)}
                <div class="rv-cutout-filled-piece" style="display:flex;align-items:center;justify-content:center">${renderTexturedCutoutPiece(fc, false)}</div>
              </div>
              <div class="rv-board-caption">${fc.fruitVi}</div>
            </div>
          `).join("")}
        </div>

        <div class="rv-tray-box">
          ${trayPieces.map(fc => `
            <div class="rv-cutout-piece" data-id="${fc.id}" data-vi="${fc.shapeVi}" style="color:${fc.fill}" tabindex="0" role="button" aria-label="${fc.shapeVi}">
              ${renderTexturedCutoutPiece(fc, false)}
            </div>
          `).join("")}
        </div>
      </div>
    `;

    _say("Tìm mảnh ghép bí ẩn! Bé hãy tìm miếng vừa khít với chỗ trống trên quả nhé!", "Fit the shape pieces into the fruits!");
    _catSet("thinking");

    const wrap = c.querySelector("#rvCutoutWrap");
    if (!wrap) return;

    function checkCutoutMatch(pieceEl, boardEl) {
      if (!pieceEl || !boardEl || pieceEl.classList.contains("sorted") || boardEl.classList.contains("completed")) return;
      if (pieceEl.dataset.id === boardEl.dataset.id) {
        pieceEl.classList.add("sorted");
        pieceEl.classList.remove("selected");
        boardEl.classList.add("completed");
        selectedPiece = null;
        _sfxTing();
        _fx();
        _say(boardEl.dataset.vi, boardEl.dataset.en);

        remaining--;
        if (remaining <= 0) {
          setTimeout(() => {
            pzState.round++;
            advanceEndlessOrNext(() => puzzleGame(false), "vi.shapes.cutout");
          }, 700);
        }
      } else {
        _sfxNo();
        boardEl.classList.add("shake-bad");
        pieceEl.classList.add("shake-bad");
        setTimeout(() => {
          boardEl.classList.remove("shake-bad");
          pieceEl.classList.remove("shake-bad");
        }, 450);
      }
    }

    wrap.querySelectorAll(".rv-cutout-piece").forEach(pieceEl => {
      pieceEl.addEventListener("click", () => {
        if (pieceEl.classList.contains("sorted")) return;
        _sfxTap();
        wrap.querySelectorAll(".rv-cutout-piece").forEach(el => el.classList.remove("selected"));
        selectedPiece = pieceEl;
        pieceEl.classList.add("selected");
        _say(pieceEl.dataset.vi, pieceEl.dataset.vi);
      });
      setupPointerDrag(pieceEl, ".rv-cutout-board:not(.completed)", (boardEl) => checkCutoutMatch(pieceEl, boardEl));
    });

    wrap.querySelectorAll(".rv-cutout-board").forEach(boardEl => {
      boardEl.addEventListener("click", () => {
        if (selectedPiece) checkCutoutMatch(selectedPiece, boardEl);
        else _say(boardEl.dataset.vi, boardEl.dataset.en);
      });
    });
  }

  function renderShadowAnimalPuzzle() {
    const c = getContainer();
    if (!c) return;

    // Độ khó +20%: 4 con vật & 4 hình bóng
    const chosen = _shuf(PUZZLE_ANIMALS).slice(0, 4);
    const trayItems = _shuf([...chosen]);
    let remaining = chosen.length;
    let selectedPiece = null;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Hình bóng", "Shadow Match"), i: "🐌" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvShadowWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Ai đang trốn trong bóng tối? Bé hãy đưa các bạn về đúng chiếc bóng của mình nhé!','Match each animal to its shadow!')">
            🔊 ${_T("Ghép 4 con vật vào đúng hình bóng nhé!", "Match 4 animals to their shadows!")}
          </h2>
          ${renderHeaderRightBadge(pzState.round)}
        </div>

        <div class="rv-slots-row" style="grid-template-columns:repeat(4,minmax(0,1fr))">
          ${chosen.map(an => `
            <div class="rv-shadow-slot" data-id="${an.id}" data-vi="${an.nameVi}" data-en="${an.nameEn}" tabindex="0" role="button" aria-label="${_T('Bóng của ' + an.nameVi, 'Shadow of ' + an.nameEn)}">
              <span class="rv-shadow-emoji">${an.emoji}</span>
              <span class="rv-shadow-label">${_T(an.nameVi, an.nameEn)}</span>
            </div>
          `).join("")}
        </div>

        <div class="rv-tray-box">
          ${trayItems.map(an => `
            <div class="rv-shadow-piece" data-id="${an.id}" data-vi="${an.nameVi}" data-en="${an.nameEn}" tabindex="0" role="button" aria-label="${an.nameVi}">
              <span class="rv-piece-emoji">${an.emoji}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    _say("Ai đang trốn trong bóng tối? Bé hãy đưa các bạn về đúng chiếc bóng của mình nhé!", "Match each animal with its shadow!");
    _catSet("thinking");

    const wrap = c.querySelector("#rvShadowWrap");
    if (!wrap) return;

    function checkShadowMatch(pieceEl, slotEl) {
      if (!pieceEl || !slotEl || pieceEl.classList.contains("sorted") || slotEl.classList.contains("completed")) return;
      if (pieceEl.dataset.id === slotEl.dataset.id) {
        pieceEl.classList.add("sorted");
        pieceEl.classList.remove("selected");
        slotEl.classList.add("completed");
        selectedPiece = null;
        _sfxTing();
        _fx();
        _say(slotEl.dataset.vi, slotEl.dataset.en);

        remaining--;
        if (remaining <= 0) {
          setTimeout(() => {
            pzState.round++;
            advanceEndlessOrNext(() => puzzleGame(false), "vi.logic.shadow");
          }, 700);
        }
      } else {
        _sfxNo();
        slotEl.classList.add("shake-bad");
        pieceEl.classList.add("shake-bad");
        setTimeout(() => {
          slotEl.classList.remove("shake-bad");
          pieceEl.classList.remove("shake-bad");
        }, 450);
      }
    }

    wrap.querySelectorAll(".rv-shadow-piece").forEach(pieceEl => {
      pieceEl.addEventListener("click", () => {
        if (pieceEl.classList.contains("sorted")) return;
        _sfxTap();
        wrap.querySelectorAll(".rv-shadow-piece").forEach(el => el.classList.remove("selected"));
        selectedPiece = pieceEl;
        pieceEl.classList.add("selected");
        _say(pieceEl.dataset.vi, pieceEl.dataset.en);
      });
      setupPointerDrag(pieceEl, ".rv-shadow-slot:not(.completed)", (slotEl) => checkShadowMatch(pieceEl, slotEl));
    });

    wrap.querySelectorAll(".rv-shadow-slot").forEach(slotEl => {
      slotEl.addEventListener("click", () => {
        if (selectedPiece) checkShadowMatch(selectedPiece, slotEl);
        else _say("Chiếc bóng của ai đây nhỉ?", "Whose shadow is this?");
      });
    });
  }

  // ============================================================================
  // 6. TRÒ CHƠI 3: TO NHỎ & NHIỀU ÍT (sizeCompareGame - Độ khó +20%)
  //    - Mode 1: Kích cỡ sát nhau hơn (56px, 72px, 88px, 108px) đòi hỏi quan sát kỹ
  //    - Mode 2: So sánh 3 nhóm đồ vật (hoặc 2 nhóm số lượng 4..10 sát nhau chỉ lệch 1-2 đơn vị)
  // ============================================================================
  let scState = { round: 1 };

  function sizeCompareGame(isReplay) {
    if (isReplay) scState.round = 1;
    const mode = Math.random() < 0.5 ? "big_small" : "more_less";
    if (mode === "big_small") {
      renderBigSmallRound();
    } else {
      renderMoreLessRound();
    }
  }

  function renderBigSmallRound() {
    const c = getContainer();
    if (!c) return;

    const animal = _pick(PUZZLE_ANIMALS);
    const findBiggest = Math.random() < 0.5;
    const promptVi = findBiggest ? `Tìm bạn ${animal.nameVi} TO NHẤT nào!` : `Tìm bạn ${animal.nameVi} NHỎ XÍU nào!`;
    const promptEn = findBiggest ? `Tap the BIGGEST ${animal.nameEn}` : `Tap the SMALLEST ${animal.nameEn}`;

    // Độ khó +20%: Chênh lệch kích cỡ tinh tế hơn
    const sizes = _shuf([
      { id: "xs", px: 54, isTarget: !findBiggest },
      { id: "sm", px: 68, isTarget: false },
      { id: "md", px: 84, isTarget: false },
      { id: "xl", px: 102, isTarget: findBiggest }
    ]);

    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("To & Nhỏ · So sánh", "Big & Small"), i: "🐞" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvBigSmallWrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('${promptVi}','${promptEn}')">
            🔊 ${_T(promptVi, promptEn)}
          </div>
          ${renderHeaderRightBadge(scState.round)}
        </div>

        <div class="rv-quad-grid">
          <div class="rv-center-qmark">?</div>
          ${sizes.map(sz => `
            <button type="button" class="rv-quad-card" data-target="${sz.isTarget ? '1' : '0'}" aria-label="${animal.nameVi}">
              <span style="font-size:${sz.px}px;line-height:1;display:inline-block;transition:transform .2s">${animal.emoji}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say(promptVi, promptEn);
    _catSet("thinking");

    c.querySelectorAll(".rv-quad-card").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        if (btn.dataset.target === "1") {
          answered = true;
          btn.classList.add("good");
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(findBiggest ? "Chính xác! Đây chính là bạn to nhất rồi!" : "Chính xác! Đây chính là bạn nhỏ nhất rồi!", "Correct!");
          setTimeout(() => {
            scState.round++;
            advanceEndlessOrNext(() => sizeCompareGame(false), "vi.math.compare");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say(findBiggest ? "Bé nhìn kỹ xem, ai mới là người to nhất nhé!" : "Bé nhìn kỹ xem, ai mới là người bé nhất nhé!", "Look closely and try again!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  function renderMoreLessRound() {
    const c = getContainer();
    if (!c) return;

    const fruits = [
      { emoji: "🍇", vi: "chùm nho", en: "grapes" },
      { emoji: "🍓", vi: "quả dâu", en: "strawberries" },
      { emoji: "🍎", vi: "quả táo", en: "apples" },
      { emoji: "🍊", vi: "quả cam", en: "oranges" },
      { emoji: "🐥", vi: "gà con", en: "chicks" },
      { emoji: "🎈", vi: "bóng bay", en: "balloons" }
    ];
    const item = _pick(fruits);
    const askMore = Math.random() < 0.55;
    // Độ khó +20%: Số lượng từ 4 đến 9 và chênh lệch chỉ 1 hoặc 2 để bé phải đếm thực sự (ẩn số gợi ý trước khi chọn)
    const countA = _R(4, 9);
    const diff = _pick([-2, -1, 1, 2]);
    const countB = Math.max(2, Math.min(10, countA + diff === countA ? countA + 1 : countA + diff));

    const isLeftWinner = askMore ? countA > countB : countA < countB;
    const promptVi = askMore ? `Bên nào có NHIỀU ${item.vi} hơn?` : `Bên nào có ÍT ${item.vi} hơn?`;
    const promptEn = askMore ? `Which side has MORE ${item.en}?` : `Which side has FEWER ${item.en}?`;

    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Đếm và So sánh", "Count & Compare"), i: "🍇" }
    ]);

    const renderGroup = (cnt) => Array.from({ length: cnt }, () => `<span class="rv-compare-item">${item.emoji}</span>`).join("");

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvMoreLessWrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('${promptVi}','${promptEn}')">
            🔊 ${_T(promptVi, promptEn)}
          </div>
          ${renderHeaderRightBadge(scState.round)}
        </div>

        <div class="rv-compare-cards">
          <button type="button" class="rv-compare-card" data-win="${isLeftWinner ? '1' : '0'}" data-cnt="${countA}">
            <div class="rv-compare-items-grid">${renderGroup(countA)}</div>
            <div class="rv-compare-count-badge">?</div>
          </button>
          <button type="button" class="rv-compare-card" data-win="${!isLeftWinner ? '1' : '0'}" data-cnt="${countB}">
            <div class="rv-compare-items-grid">${renderGroup(countB)}</div>
            <div class="rv-compare-count-badge">?</div>
          </button>
        </div>
      </div>
    `;

    _say(promptVi, promptEn);
    _catSet("thinking");

    c.querySelectorAll(".rv-compare-card").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        const cnt = btn.dataset.cnt;
        const badge = btn.querySelector(".rv-compare-count-badge");
        if (badge) badge.textContent = cnt;

        if (btn.dataset.win === "1") {
          answered = true;
          btn.classList.add("good");
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(askMore ? `Giỏi quá! Bên này có nhiều ${item.vi} hơn đấy!` : `Giỏi quá! Bên này có ít ${item.vi} hơn đấy!`, `Correct! ${cnt} ${item.en}!`);
          setTimeout(() => {
            scState.round++;
            advanceEndlessOrNext(() => sizeCompareGame(false), "vi.math.compare");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say("Bé hãy đếm thử cả hai bên xem bên nào " + (askMore ? "nhiều hơn" : "ít hơn") + " nhé!", "Count both sides and try again!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  // ============================================================================
  // 7. TRÒ CHƠI 4: TINH MẮT TÌM NHANH (oddSpotGame - Độ khó +20%)
  //    - Mode 1: Tìm hình Khác biệt trong 6 ô (5 hình giống + 1 hình khác)
  //    - Mode 2: Quy luật hình 5 ô (AABAA, ABCAB...) với 4 đáp án lựa chọn
  //    - Mode 3: Thế giới Loài vật với 6 ô lựa chọn
  // ============================================================================
  let osState = { round: 1 };

  function oddSpotGame(isReplay) {
    if (isReplay) osState.round = 1;
    const modes = ["odd_one", "missing_pattern", "animal_world"];
    const mode = modes[(osState.round - 1 + _R(0, 2)) % modes.length];

    if (mode === "odd_one") {
      renderOddOneOutRound();
    } else if (mode === "missing_pattern") {
      renderMissingPatternRound();
    } else {
      renderAnimalWorldRound();
    }
  }

  function renderOddOneOutRound() {
    const c = getContainer();
    if (!c) return;

    const groups = [
      { common: "🐞", commonVi: "Bọ rùa", odd: "🐠", oddVi: "Con cá vàng" },
      { common: "🐦", commonVi: "Chú chim", odd: "🦜", oddVi: "Chim vẹt mào sắc màu" },
      { common: "🍎", commonVi: "Quả táo đỏ", odd: "🍅", oddVi: "Quả cà chua" },
      { common: "🐱", commonVi: "Chú mèo", odd: "🐯", oddVi: "Chú hổ con" },
      { common: "🚗", commonVi: "Ô tô", odd: "🚕", oddVi: "Xe taxi vàng" },
      { common: "🌻", commonVi: "Hoa hướng dương", odd: "🌼", oddVi: "Hoa cúc vàng" },
      { common: "🐸", commonVi: "Chú ếch", odd: "🐢", oddVi: "Chú rùa" }
    ];
    const g = _pick(groups);
    // Độ khó +20%: Lưới 6 ô (5 hình giống + 1 hình khác tinh tế hơn)
    const cards = _shuf([
      { emoji: g.common, isOdd: false, vi: g.commonVi },
      { emoji: g.common, isOdd: false, vi: g.commonVi },
      { emoji: g.common, isOdd: false, vi: g.commonVi },
      { emoji: g.common, isOdd: false, vi: g.commonVi },
      { emoji: g.common, isOdd: false, vi: g.commonVi },
      { emoji: g.odd, isOdd: true, vi: g.oddVi }
    ]);

    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Tìm hình Khác biệt", "Odd One Out"), i: "🔍" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="rvOddWrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('Tìm điểm khác biệt! Bé hãy tìm ra hình duy nhất không giống các bạn còn lại nhé!','Tap the picture that is different!')">
            🔊 ${_T("Tìm 1 hình KHÁC BIỆT trong 6 hình!", "Tap the odd one out among 6!")}
          </div>
          ${renderHeaderRightBadge(osState.round)}
        </div>

        <div class="rv-quad-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));max-width:760px">
          ${cards.map(item => `
            <button type="button" class="rv-quad-card" data-odd="${item.isOdd ? '1' : '0'}" data-vi="${item.vi}">
              <span style="font-size:clamp(54px,11vw,82px);line-height:1">${item.emoji}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say("Tìm điểm khác biệt! Bé hãy tìm ra hình duy nhất không giống các bạn còn lại nhé!", "Tap the one that is different!");
    _catSet("thinking");

    c.querySelectorAll(".rv-quad-card").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        if (btn.dataset.odd === "1") {
          answered = true;
          btn.classList.add("good");
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(`Tìm ra rồi! ${btn.dataset.vi} này đặc biệt nhất!`, "Correct!");
          setTimeout(() => {
            osState.round++;
            advanceEndlessOrNext(() => oddSpotGame(false), "vi.logic.odd");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say("Bạn này giống các bạn khác mà, bé hãy tìm hình 'độc nhất vô nhị' kia kìa!", "Find the one that is different!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  function renderMissingPatternRound() {
    const c = getContainer();
    if (!c) return;

    // Độ khó +20%: Quy luật 5 phần tử đa dạng (ABABA, AABAA, ABCAB) + 4 lựa chọn
    const patterns = [
      { seq: ["❤️", "⭐", "❤️", "⭐"], ans: "❤️", ansVi: "Trái tim đỏ", opts: ["❤️", "⭐", "🟢", "🟦"] },
      { seq: ["🟢", "🟢", "🟦", "🟢"], ans: "🟢", ansVi: "Hình tròn xanh lá", opts: ["🟢", "🟦", "🔺", "⭐"] },
      { seq: ["🍎", "🍌", "🍉", "🍎"], ans: "🍌", ansVi: "Quả chuối", opts: ["🍌", "🍎", "🍉", "🍓"] },
      { seq: ["🌞", "🌙", "⭐", "🌞"], ans: "🌙", ansVi: "Mặt trăng", opts: ["🌙", "🌞", "⭐", "☁️"] },
      { seq: ["🐱", "🐶", "🐱", "🐶"], ans: "🐱", ansVi: "Chú mèo", opts: ["🐱", "🐶", "🐰", "🐸"] }
    ];
    const p = _pick(patterns);
    const options = _shuf(p.opts);
    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Hình dạng Còn thiếu", "Missing Shape"), i: "❓" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('Đoán hình tiếp theo! Bé xem quy luật và điền hình còn thiếu vào dấu chấm hỏi nhé!','Which shape comes next?')">
            🔊 ${_T("Hình nào tiếp theo ở ô dấu hỏi [?] nhỉ?", "Which shape completes the pattern?")}
          </div>
          ${renderHeaderRightBadge(osState.round)}
        </div>

        <div class="rv-pattern-row">
          ${p.seq.map(em => `<div class="rv-pattern-box">${em}</div>`).join("")}
          <div class="rv-pattern-box rv-pattern-mystery" id="rvPatternSlot">?</div>
        </div>

        <div class="rv-tray-box">
          ${options.map(opt => `
            <button type="button" class="rv-choice-btn" data-val="${opt}">
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say("Đoán hình tiếp theo! Bé xem quy luật và điền hình còn thiếu vào dấu chấm hỏi nhé!", "Which shape is missing?");
    _catSet("thinking");

    c.querySelectorAll(".rv-choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        if (btn.dataset.val === p.ans) {
          answered = true;
          btn.classList.add("good");
          const slot = document.getElementById("rvPatternSlot");
          if (slot) {
            slot.textContent = p.ans;
            slot.classList.add("good");
          }
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(`Xuất sắc! Đó chính là ${p.ansVi}!`, "Correct!");
          setTimeout(() => {
            osState.round++;
            advanceEndlessOrNext(() => oddSpotGame(false), "vi.logic.pattern");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say("Chưa đúng quy luật rồi, bé nhìn dãy hình từ đầu đến cuối xem nào!", "Look at the pattern and try again!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  function renderAnimalWorldRound() {
    const c = getContainer();
    if (!c) return;

    const q = _pick(ANIMAL_QUESTIONS);
    // Độ khó +20%: 6 con vật lựa chọn thay vì 4
    const opts = _shuf([
      { emoji: q.right, isRight: true, vi: q.rightVi },
      ...q.wrong.slice(0, 5).map(em => ({ emoji: em, isRight: false, vi: "" }))
    ]);
    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Thế giới Loài vật", "Animal World"), i: "🐼" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('${q.qVi.replace(/'/g, "\\'")}','${q.qEn.replace(/'/g, "\\'")}')">
            🔊 ${_T(q.qVi, q.qEn)}
          </div>
          ${renderHeaderRightBadge(osState.round)}
        </div>

        <div class="rv-quad-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));max-width:760px">
          ${opts.map(o => `
            <button type="button" class="rv-quad-card" data-right="${o.isRight ? '1' : '0'}" data-vi="${o.vi}">
              <span style="font-size:clamp(54px,11vw,82px);line-height:1">${o.emoji}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say(q.qVi, q.qEn);
    _catSet("thinking");

    c.querySelectorAll(".rv-quad-card").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        if (btn.dataset.right === "1") {
          answered = true;
          btn.classList.add("good");
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(`Hoan hô! Là bạn ${q.rightVi}!`, "Correct!");
          setTimeout(() => {
            osState.round++;
            advanceEndlessOrNext(() => oddSpotGame(false), "vi.science.animals");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say("Chưa phải bạn này rồi, bé nghe lại gợi ý và chọn nhé!", "Try another animal!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  // ============================================================================
  // 8. ĐOÀN TÀU SÂU RÓM & BÓNG BAY SỐ (numberTrainGame - Độ khó +20%)
  //    Dãy 5 toa tàu / 5 quả bóng bay, phạm vi tới 20, có bước nhảy 1 hoặc 2, 4 đáp án
  // ============================================================================
  let trainState = { round: 1 };

  function numberTrainGame(isReplay) {
    if (isReplay) trainState.round = 1;
    const c = getContainer();
    if (!c) return;

    const isCaterpillar = Math.random() < 0.55;
    const step = Math.random() < 0.25 ? 2 : 1;
    const startNum = _R(1, 12);
    const missingIdx = _R(1, 4);
    const seq = Array.from({ length: 5 }, (_, i) => startNum + i * step);
    const targetNum = seq[missingIdx];

    const choicesSet = new Set([targetNum]);
    while (choicesSet.size < 4) {
      const cand = Math.max(1, targetNum + _pick([-3, -2, -1, 1, 2, 3]));
      if (cand !== targetNum) choicesSet.add(cand);
    }
    const choices = _shuf([...choicesSet]);
    let answered = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Đoàn tàu & Bóng bay Số", "Number Train & Balloons"), i: "🐛" }
    ]);

    const visualHtml = isCaterpillar
      ? `<div class="rv-caterpillar-wrap">
          <div class="rv-caterpillar-head">🐛</div>
          ${seq.map((num, idx) => `
            <div class="rv-caterpillar-body ${idx === missingIdx ? 'mystery' : ''}" id="${idx === missingIdx ? 'rvTrainMystery' : ''}">
              <span>${idx === missingIdx ? '?' : num}</span>
            </div>
          `).join("")}
        </div>`
      : `<div class="rv-balloons-seq-wrap">
          ${seq.map((num, idx) => `
            <div class="rv-seq-balloon ${idx === missingIdx ? 'mystery' : ''}" id="${idx === missingIdx ? 'rvTrainMystery' : ''}">
              <span>${idx === missingIdx ? '?' : num}</span>
            </div>
          `).join("")}
        </div>`;

    const promptVi = isCaterpillar
      ? "Đoàn tàu sâu róm thiếu một toa rồi! Bé tìm giúp số còn thiếu nhé!"
      : "Quả bóng bay nào đang vắng mặt? Bé đoán xem đó là số mấy?";
    const promptEn = "Which number is missing?";

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('${promptVi}','${promptEn}')">
            🔊 ${_T(promptVi, promptEn)}
          </div>
          ${renderHeaderRightBadge(trainState.round)}
        </div>

        ${visualHtml}

        <div class="rv-tray-box">
          ${choices.map(num => `
            <button type="button" class="rv-num-choice-btn" data-k="${num}" aria-label="Số ${num}">
              <span class="ans">${num}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say(promptVi, promptEn);
    _catSet("thinking");

    c.querySelectorAll(".rv-num-choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        const val = parseInt(btn.dataset.k, 10);
        if (val === targetNum) {
          answered = true;
          btn.classList.add("good");
          const mys = document.getElementById("rvTrainMystery");
          if (mys) {
            mys.innerHTML = `<span>${targetNum}</span>`;
            mys.classList.remove("mystery");
            mys.classList.add("good");
          }
          _sfxTing();
          _fx();
          _catSet("celebrate");
          _say(`Giỏi lắm! Số ${targetNum} đã xuất hiện rồi!`, `Awesome! Number ${targetNum}!`);
          setTimeout(() => {
            trainState.round++;
            advanceEndlessOrNext(() => numberTrainGame(false), "vi.math.sequence");
          }, 700);
        } else {
          btn.classList.add("shake-bad");
          _sfxNo();
          _say(`Chưa đúng rồi, bé hãy đếm dãy số từ ${seq[0]} một lần nữa nhé!`, "Count along and try again!");
          setTimeout(() => btn.classList.remove("shake-bad"), 450);
        }
      });
    });
  }

  // ============================================================================
  // 9. CHẾ ĐỘ "HỘP QUÀ BẤT NGỜ" - CHẠY RANDOM LIÊN TỤC GIỮA TẤT CẢ 11 TRÒ TRONG HÌNH
  //    Bé chơi liên tục không giới hạn số câu cho tới khi bé bấm Quay lại / Trang chủ
  //    hoặc hết giờ chơi (15/30 phút) do phụ huynh cài đặt!
  // ============================================================================
  let lastMixGameId = "";

  function randomMixGame() {
    const ALL_GAMES_IN_MENU = [
      "countGame",
      "bubbleGame",
      "match",
      "mis",
      "mem",
      "cmpS",
      "colorShapeGame",
      "puzzleGame",
      "sizeCompareGame",
      "oddSpotGame",
      "fruitSlash",
      "artStudioGame",
      "connectDotsGame",
      "memoryStepDrawGame",
      "tenFrameGame",
      "pairLinkGridGame"
    ];

    if (typeof window !== "undefined") {
      window.__endlessNext = function() {
        randomMixGame();
      };
    }

    const candidates = ALL_GAMES_IN_MENU.filter(g => g !== lastMixGameId);
    const nextGameId = _pick(candidates.length ? candidates : ALL_GAMES_IN_MENU);
    lastMixGameId = nextGameId;

    if (typeof window !== "undefined") {
      // Nếu chạy trong môi trường test tối giản chưa nạp đầy đủ app.js
      if (typeof window[nextGameId] !== "function") {
        colorShapeGame(false);
        return;
      }
      // Đặt cur để quiz() (mis, cmpS) nhận diện đúng ngữ cảnh
      try { window.cur = nextGameId; } catch (e) {}
      window[nextGameId](false);
    }
  }

  // ============================================================================
  // 10. TIỆN ÍCH KÉO THẢ MƯỢT MÀ TRÊN MOBILE & TABLET (setupPointerDrag)
  // ============================================================================
  function setupPointerDrag(itemEl, targetSelector, onDropMatch) {
    let dragging = false;
    let startX = 0, startY = 0;
    let cloneEl = null;

    function onStart(e) {
      if (itemEl.classList.contains("sorted")) return;
      const pt = e.touches ? e.touches[0] : e;
      if (!pt) return;
      startX = pt.clientX;
      startY = pt.clientY;
      dragging = false;

      function onMove(ev) {
        const p = ev.touches ? ev.touches[0] : ev;
        if (!p) return;
        const dist = Math.hypot(p.clientX - startX, p.clientY - startY);
        if (!dragging && dist > 10) {
          dragging = true;
          cloneEl = itemEl.cloneNode(true);
          cloneEl.className = itemEl.className + " rv-dragging-clone";
          const r = itemEl.getBoundingClientRect();
          cloneEl.style.width = r.width + "px";
          cloneEl.style.height = r.height + "px";
          cloneEl.style.position = "fixed";
          cloneEl.style.zIndex = "9999";
          cloneEl.style.pointerEvents = "none";
          cloneEl.style.margin = "0";
          document.body.appendChild(cloneEl);
          itemEl.style.opacity = "0.35";
        }
        if (dragging && cloneEl) {
          if (ev.cancelable) ev.preventDefault();
          cloneEl.style.left = (p.clientX - cloneEl.offsetWidth / 2) + "px";
          cloneEl.style.top = (p.clientY - cloneEl.offsetHeight / 2) + "px";
        }
      }

      function onEnd(ev) {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchend", onEnd);
        document.removeEventListener("touchcancel", onEnd);

        if (!dragging) return;
        itemEl.style.opacity = "";
        if (cloneEl && cloneEl.parentNode) cloneEl.parentNode.removeChild(cloneEl);
        cloneEl = null;

        const p = ev.changedTouches ? ev.changedTouches[0] : ev;
        if (!p) return;

        const targets = Array.from(document.querySelectorAll(targetSelector));
        let bestTarget = null;
        let minDist = 115;

        targets.forEach(t => {
          const r = t.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(p.clientX - cx, p.clientY - cy);
          const inside = p.clientX >= r.left - 24 && p.clientX <= r.right + 24 && p.clientY >= r.top - 24 && p.clientY <= r.bottom + 24;
          if ((inside || d < minDist) && d <= minDist) {
            minDist = d;
            bestTarget = t;
          }
        });

        if (bestTarget && typeof onDropMatch === "function") {
          onDropMatch(bestTarget);
        }
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchend", onEnd);
      document.addEventListener("touchcancel", onEnd);
    }

    itemEl.addEventListener("mousedown", onStart);
    itemEl.addEventListener("touchstart", onStart, { passive: true });
  }

  const ToddlerGames = {
    COLOR_BUCKETS,
    SHAPES_DATA,
    PUZZLE_ANIMALS,
    FRUIT_CUTOUTS,
    OPPOSITE_PAIRS,
    ANIMAL_ASSOC_PAIRS,
    ANIMAL_QUESTIONS,
    validateTracePath,
    colorShapeGame,
    puzzleGame,
    sizeCompareGame,
    oddSpotGame,
    numberTrainGame,
    randomMixGame
  };

  if (typeof window !== "undefined") {
    window.ToddlerGames = ToddlerGames;
    window.validateTracePath = validateTracePath;
    window.colorShapeGame = colorShapeGame;
    window.puzzleGame = puzzleGame;
    window.sizeCompareGame = sizeCompareGame;
    window.oddSpotGame = oddSpotGame;
    window.numberTrainGame = numberTrainGame;
    window.randomMixGame = randomMixGame;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.ToddlerGames = ToddlerGames;
    globalThis.validateTracePath = validateTracePath;
    globalThis.colorShapeGame = colorShapeGame;
    globalThis.puzzleGame = puzzleGame;
    globalThis.sizeCompareGame = sizeCompareGame;
    globalThis.oddSpotGame = oddSpotGame;
    globalThis.numberTrainGame = numberTrainGame;
    globalThis.randomMixGame = randomMixGame;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ToddlerGames;
  }
})();
