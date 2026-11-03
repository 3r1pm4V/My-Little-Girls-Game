/**
 * games/creative-games.js
 * Bộ Trò Chơi Sáng Tạo, Tư Duy & Montessori cho bé 4–6 tuổi ("Bé học vui")
 * Tuân thủ 100% quy tắc AGENTS.md & PLAN.md:
 * - Hoàn toàn offline, tự vẽ tài sản bằng SVG/Canvas và tái sử dụng kho hình sẵn có.
 * - Nút chạm lớn (>= 64px), thao tác 1 chạm hoặc kéo nhẹ, không đếm giờ, không phạt điểm.
 * - Lưu tự động bản vẽ đang làm dở (Tô màu & Bút phát sáng) vào IndexedDB `bhv_drawings` (tối đa 20 bức).
 * - Tích hợp liền mạch với chế độ Chơi Liên Tục (Endless Loop) & Hộp Quà Bất Ngờ (`randomMixGame`).
 */
(function() {
  "use strict";

  const _T = (vi, en) => (typeof window !== "undefined" && window.T ? window.T(vi, en) : vi);
  const _shuf = (arr) => (typeof window !== "undefined" && window.shuf ? window.shuf([...arr]) : [...arr].sort(() => Math.random() - 0.5));
  const _pick = (arr) => (typeof window !== "undefined" && window.pick ? window.pick(arr) : arr[Math.floor(Math.random() * arr.length)]);
  const _R = (a, b) => (typeof window !== "undefined" && window.R ? window.R(a, b) : Math.floor(Math.random() * (b - a + 1)) + a);
  const _kbc = (crumbs) => (typeof window !== "undefined" && window.kbc ? window.kbc(crumbs) : "");
  // Ba mẹ trực tiếp hướng dẫn bé, tắt giọng đọc AI tự động trong trò chơi
  const _say = () => {};
  const _catSet = (st) => { if (typeof window !== "undefined" && window.catSet) window.catSet(st); };
  const _sfxTap = () => { if (typeof window !== "undefined" && window.sfxTap) window.sfxTap(); };
  const _sfxOk = () => { if (typeof window !== "undefined" && window.sfxOk) window.sfxOk(); };
  const _sfxNo = () => { if (typeof window !== "undefined" && window.sfxNo) window.sfxNo(); };
  const _sfxTing = () => { if (typeof window !== "undefined" && window.sfxTingTing) window.sfxTingTing(); else _sfxOk(); };
  const _fx = () => { if (typeof window !== "undefined" && window.fx) window.fx(); };

  function getContainer() {
    return (typeof document !== "undefined" && (document.getElementById("m") || document.body)) || null;
  }

  function getParentMaxNumber() {
    if (typeof window !== "undefined") {
      if (typeof window.getNumberRangeMax === "function") return window.getNumberRangeMax();
      if (window.ls) {
        const v = parseInt(window.ls.get("number_range_max", "10"), 10);
        if (v === 5 || v === 10 || v === 20) return v;
      }
    }
    return 10;
  }

  function finishRoundAndContinue(defaultNextFn, skillKey) {
    if (typeof window !== "undefined") {
      try {
        if (typeof window.stars !== "undefined" && window.ls) {
          window.stars += 1;
          window.ls.set("stars", window.stars);
        }
        if (typeof window.head === "function") window.head();
        if (typeof window.checkBadges === "function") window.checkBadges();
        if (typeof window.recordDailyActivity === "function") window.recordDailyActivity();
        if (skillKey && typeof window.updateProgress === "function") {
          window.updateProgress(skillKey, true);
        }
      } catch (e) {}

      if (typeof window.__endlessNext === "function") {
        window.__endlessNext();
        return;
      }
    }
    if (typeof defaultNextFn === "function") defaultNextFn();
  }

  function renderCreativeHeaderBadge(roundNum) {
    const isMix = typeof window !== "undefined" && typeof window.__endlessNext === "function";
    return `
      <div style="display:flex;align-items:center;gap:8px">
        ${isMix ? `<button class="pill" onclick="window.__endlessNext()" style="font-size:13.5px;padding:4px 12px;min-height:38px;background:#f3e8ff;color:#6d28d9;border-color:#c084fc">🎲 ${_T("Đổi trò khác", "Next Random")}</button>` : ""}
        <div class="rv-round-badge">⭐ ${_T("Lượt", "Round")} ${roundNum}</div>
      </div>
    `;
  }

  // ============================================================================
  // BƯỚC 9: LƯU TỰ ĐỘNG BẢN VẼ VÀO INDEXEDDB (TỐI ĐA 20 BẢN VẼ, XÓA BẢN CŨ NHẤT)
  // ============================================================================
  const DRAWING_DB_NAME = "bhv_drawings";
  const DRAWING_STORE = "artworks";
  const MAX_SAVED_DRAWINGS = 20;
  const memDrawingFallback = new Map();

  function openDrawingDB() {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") return reject(new Error("no_idb"));
      try {
        const req = indexedDB.open(DRAWING_DB_NAME, 1);
        req.onupgradeneeded = () => {
          if (!req.result.objectStoreNames.contains(DRAWING_STORE)) {
            req.result.createObjectStore(DRAWING_STORE, { keyPath: "id" });
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }

  async function saveDrawingRecord(record) {
    if (!record || !record.id) return false;
    const item = { ...record, updatedAt: Date.now() };
    memDrawingFallback.set(item.id, item);
    if (memDrawingFallback.size > MAX_SAVED_DRAWINGS) {
      const oldestKey = [...memDrawingFallback.entries()].sort((a, b) => a[1].updatedAt - b[1].updatedAt)[0][0];
      memDrawingFallback.delete(oldestKey);
    }
    try {
      const db = await openDrawingDB();
      await new Promise((res, rej) => {
        const tx = db.transaction(DRAWING_STORE, "readwrite");
        const st = tx.objectStore(DRAWING_STORE);
        const getAllReq = st.getAll();
        getAllReq.onsuccess = () => {
          const all = Array.isArray(getAllReq.result) ? getAllReq.result : [];
          const others = all.filter(x => x.id !== item.id).sort((a, b) => (a.updatedAt || 0) - (b.updatedAt || 0));
          while (others.length >= MAX_SAVED_DRAWINGS) {
            const oldest = others.shift();
            if (oldest && oldest.id) st.delete(oldest.id);
          }
          st.put(item);
        };
        tx.oncomplete = () => res(true);
        tx.onerror = () => rej(tx.error);
      });
      return true;
    } catch (e) {
      if (e && (e.name === "QuotaExceededError" || /quota/i.test(String(e)))) {
        console.warn("Bộ nhớ vẽ đã đầy, tự động giữ trong phiên tạm.");
      }
      return true;
    }
  }

  async function loadDrawingRecord(id) {
    try {
      const db = await openDrawingDB();
      return await new Promise((res) => {
        const tx = db.transaction(DRAWING_STORE, "readonly");
        const req = tx.objectStore(DRAWING_STORE).get(id);
        req.onsuccess = () => res(req.result || memDrawingFallback.get(id) || null);
        req.onerror = () => res(memDrawingFallback.get(id) || null);
      });
    } catch (e) {
      return memDrawingFallback.get(id) || null;
    }
  }

  async function listSavedDrawings() {
    try {
      const db = await openDrawingDB();
      return await new Promise((res) => {
        const tx = db.transaction(DRAWING_STORE, "readonly");
        const req = tx.objectStore(DRAWING_STORE).getAll();
        req.onsuccess = () => res(Array.isArray(req.result) ? req.result : [...memDrawingFallback.values()]);
        req.onerror = () => res([...memDrawingFallback.values()]);
      });
    } catch (e) {
      return [...memDrawingFallback.values()];
    }
  }

  async function clearAllSavedDrawings() {
    memDrawingFallback.clear();
    try {
      const db = await openDrawingDB();
      await new Promise((res) => {
        const tx = db.transaction(DRAWING_STORE, "readwrite");
        tx.objectStore(DRAWING_STORE).clear();
        tx.oncomplete = () => res(true);
        tx.onerror = () => res(false);
      });
    } catch (e) {}
    return true;
  }

  // ============================================================================
  // BƯỚC 2: TÔ MÀU BẰNG TAY (KHO TRANH TÔ MÀU CANVA CHO BÉ) & BÚT PHÁT SÁNG (artStudioGame)
  // ============================================================================
  const COLOR_PALETTE = [
    { id: "red", hex: "#ef4444", vi: "Màu đỏ", en: "Red" },
    { id: "crimson", hex: "#b91c1c", vi: "Màu đỏ thẫm", en: "Crimson" },
    { id: "orange", hex: "#f97316", vi: "Màu cam", en: "Orange" },
    { id: "amber", hex: "#fb923c", vi: "Màu cam tươi", en: "Light Orange" },
    { id: "skin", hex: "#fed7aa", vi: "Màu da người", en: "Skin Tone" },
    { id: "yellow", hex: "#facc15", vi: "Màu vàng", en: "Yellow" },
    { id: "lemon", hex: "#fef08a", vi: "Màu vàng nhạt", en: "Light Yellow" },
    { id: "lime", hex: "#84cc16", vi: "Màu xanh chuối", en: "Lime" },
    { id: "green", hex: "#22c55e", vi: "Màu xanh lá", en: "Green" },
    { id: "darkgreen", hex: "#15803d", vi: "Màu xanh đậm", en: "Dark Green" },
    { id: "emerald", hex: "#10b981", vi: "Màu xanh ngọc", en: "Emerald" },
    { id: "cyan", hex: "#06b6d4", vi: "Màu ngọc bích", en: "Cyan" },
    { id: "skyblue", hex: "#38bdf8", vi: "Màu da trời", en: "Sky Blue" },
    { id: "blue", hex: "#3b82f6", vi: "Màu xanh dương", en: "Blue" },
    { id: "navy", hex: "#1d4ed8", vi: "Màu xanh lam", en: "Navy" },
    { id: "purple", hex: "#a855f7", vi: "Màu tím", en: "Purple" },
    { id: "darkpurple", hex: "#6b21a8", vi: "Màu tím than", en: "Dark Purple" },
    { id: "pink", hex: "#ec4899", vi: "Màu hồng", en: "Pink" },
    { id: "lightpink", hex: "#f472b6", vi: "Màu hồng sen", en: "Light Pink" },
    { id: "peach", hex: "#fbcfe8", vi: "Màu hồng phấn", en: "Peach Pink" },
    { id: "brown", hex: "#a16207", vi: "Màu nâu", en: "Brown" },
    { id: "darkbrown", hex: "#713f12", vi: "Màu nâu đất", en: "Dark Brown" },
    { id: "gray", hex: "#94a3b8", vi: "Màu xám", en: "Gray" },
    { id: "black", hex: "#1e293b", vi: "Màu đen", en: "Black" }
  ];

  // Kho tranh tô màu mầm non từ Trường Mầm non Việt Hưng (https://mnviethung.hanoi.edu.vn/chuong-trinh-hoc-cua-be/tranh-to-mau-cho-be-nhieu-chu-de/ctmb/12444/358979)
  const SVG_COLORING_PICTURES = [
    {
      id: "mnvh_kitty_reading",
      icon: "🎀",
      titleVi: "Mèo Kitty đọc sách",
      titleEn: "Hello Kitty Reading",
      imgSrc: "coloring/mnvh_kitty_reading.webp"
    },
    {
      id: "mnvh_kitty_dancing",
      icon: "🩰",
      titleVi: "Mèo Kitty múa ba lê",
      titleEn: "Ballet Hello Kitty",
      imgSrc: "coloring/mnvh_kitty_dancing.webp"
    },
    {
      id: "mnvh_daisy_flower",
      icon: "🌼",
      titleVi: "Bông hoa cúc xinh",
      titleEn: "Cute Daisy Flower",
      imgSrc: "coloring/mnvh_daisy_flower.webp"
    },
    {
      id: "mnvh_cute_cat",
      icon: "🐱",
      titleVi: "Mèo con đeo nơ",
      titleEn: "Kitty with a Bow",
      imgSrc: "coloring/mnvh_cute_cat.webp"
    },
    {
      id: "mnvh_happy_dog",
      icon: "🐶",
      titleVi: "Chú cún con vui vẻ",
      titleEn: "Happy Puppy",
      imgSrc: "coloring/mnvh_happy_dog.webp"
    },
    {
      id: "mnvh_singing_bird",
      icon: "🐦",
      titleVi: "Chim non hót trên cành",
      titleEn: "Singing Little Bird",
      imgSrc: "coloring/mnvh_singing_bird.webp"
    },
    {
      id: "mnvh_little_bee",
      icon: "🐝",
      titleVi: "Chú ong chăm chỉ",
      titleEn: "Busy Little Bee",
      imgSrc: "coloring/mnvh_little_bee.webp"
    },
    {
      id: "mnvh_cute_rabbit",
      icon: "🐰",
      titleVi: "Thỏ con tai dài",
      titleEn: "Cute Little Bunny",
      imgSrc: "coloring/mnvh_cute_rabbit.webp"
    },
    {
      id: "mnvh_little_snail",
      icon: "🐌",
      titleVi: "Ốc sên nhỏ đáng yêu",
      titleEn: "Lovely Little Snail",
      imgSrc: "coloring/mnvh_little_snail.webp"
    },
    {
      id: "mnvh_dairy_cow",
      icon: "🐮",
      titleVi: "Bò sữa đáng yêu",
      titleEn: "Cute Dairy Cow",
      imgSrc: "coloring/mnvh_dairy_cow.webp"
    },
    {
      id: "mnvh_cute_car",
      icon: "🚗",
      titleVi: "Chiếc ô tô nhỏ",
      titleEn: "Little Car",
      imgSrc: "coloring/mnvh_cute_car.webp"
    },
    {
      id: "mnvh_airplane",
      icon: "✈️",
      titleVi: "Chiếc máy bay",
      titleEn: "Airplane",
      imgSrc: "coloring/mnvh_airplane.webp"
    },
    { id: "mnvh_kitty_flower", icon: "🌸", titleVi: "Mèo Kitty ôm hoa", titleEn: "Kitty with Flowers", imgSrc: "coloring/mnvh_kitty_flower.webp" },
    { id: "mnvh_kitty_baking", icon: "🍪", titleVi: "Mèo Kitty làm bánh", titleEn: "Kitty Baking", imgSrc: "coloring/mnvh_kitty_baking.webp" },
    { id: "mnvh_kitty_princess", icon: "👗", titleVi: "Mèo Kitty diện váy", titleEn: "Kitty in a Dress", imgSrc: "coloring/mnvh_kitty_princess.webp" },
    { id: "mnvh_kitty_balloon", icon: "🎈", titleVi: "Mèo Kitty và bóng bay", titleEn: "Kitty with Balloons", imgSrc: "coloring/mnvh_kitty_balloon.webp" },
    { id: "mnvh_kitty_stars", icon: "✨", titleVi: "Mèo Kitty lấp lánh", titleEn: "Sparkly Kitty", imgSrc: "coloring/mnvh_kitty_stars.webp" },
    { id: "mnvh_kitty_basket", icon: "🧺", titleVi: "Mèo Kitty giỏ trứng", titleEn: "Kitty Egg Basket", imgSrc: "coloring/mnvh_kitty_basket.webp" },
    { id: "mnvh_kitty_painting", icon: "🎨", titleVi: "Mèo Kitty vẽ tranh", titleEn: "Kitty Painting", imgSrc: "coloring/mnvh_kitty_painting.webp" },
    { id: "mnvh_kitty_hat", icon: "🤠", titleVi: "Mèo Kitty đội mũ", titleEn: "Kitty with a Hat", imgSrc: "coloring/mnvh_kitty_hat.webp" },
    { id: "mnvh_puppy_bow", icon: "🐕", titleVi: "Cún con đeo nơ", titleEn: "Puppy with a Bow", imgSrc: "coloring/mnvh_puppy_bow.webp" },
    { id: "mnvh_giraffe_palm", icon: "🦒", titleVi: "Hươu cao cổ", titleEn: "Giraffe", imgSrc: "coloring/mnvh_giraffe_palm.webp" },
    { id: "mnvh_lily_flower", icon: "💮", titleVi: "Hoa loa kèn", titleEn: "Lily Flower", imgSrc: "coloring/mnvh_lily_flower.webp" },
    { id: "mnvh_flower_pot", icon: "🪴", titleVi: "Chậu hoa xinh", titleEn: "Flower Pot", imgSrc: "coloring/mnvh_flower_pot.webp" },
    { id: "mnvh_smiling_sunflower", icon: "🌻", titleVi: "Hoa mặt cười", titleEn: "Smiling Flower", imgSrc: "coloring/mnvh_smiling_sunflower.webp" },
    { id: "mnvh_boy_basketball", icon: "🏀", titleVi: "Bé trai chơi bóng", titleEn: "Boy with a Ball", imgSrc: "coloring/mnvh_boy_basketball.webp" },
    { id: "mnvh_boy_soccer", icon: "⚽", titleVi: "Bé trai đá bóng", titleEn: "Boy Playing Soccer", imgSrc: "coloring/mnvh_boy_soccer.webp" },
    { id: "mnvh_lion_king", icon: "🦁", titleVi: "Sư tử cha và con", titleEn: "Lion Family", imgSrc: "coloring/mnvh_lion_king.webp" },
    { id: "mnvh_cute_dino", icon: "🦕", titleVi: "Khủng long con", titleEn: "Baby Dinosaur", imgSrc: "coloring/mnvh_cute_dino.webp" },
    { id: "mnvh_pikachu", icon: "⚡", titleVi: "Pikachu", titleEn: "Pikachu", imgSrc: "coloring/mnvh_pikachu.webp" },
    { id: "mnvh_small_plane", icon: "🛩️", titleVi: "Máy bay nhỏ", titleEn: "Small Plane", imgSrc: "coloring/mnvh_small_plane.webp" },
    { id: "mnvh_night_plane", icon: "🌙", titleVi: "Máy bay đêm", titleEn: "Night Flight", imgSrc: "coloring/mnvh_night_plane.webp" },
    { id: "mnvh_helicopter", icon: "🚁", titleVi: "Trực thăng", titleEn: "Helicopter", imgSrc: "coloring/mnvh_helicopter.webp" },
    { id: "mnvh_propeller_plane", icon: "🪂", titleVi: "Máy bay cánh quạt", titleEn: "Propeller Plane", imgSrc: "coloring/mnvh_propeller_plane.webp" },
    { id: "mnvh_beetle_car", icon: "🚙", titleVi: "Ô tô con bọ", titleEn: "Beetle Car", imgSrc: "coloring/mnvh_beetle_car.webp" },
    { id: "mnvh_police_car", icon: "🚓", titleVi: "Xe cảnh sát", titleEn: "Police Car", imgSrc: "coloring/mnvh_police_car.webp" },
    { id: "mnvh_police_suv", icon: "🚔", titleVi: "Xe cảnh sát địa hình", titleEn: "Police SUV", imgSrc: "coloring/mnvh_police_suv.webp" },
    { id: "mnvh_convertible_car", icon: "🏎️", titleVi: "Ô tô mui trần", titleEn: "Convertible Car", imgSrc: "coloring/mnvh_convertible_car.webp" },
    { id: "mnvh_mcqueen_car", icon: "🏁", titleVi: "Xe đua tia chớp", titleEn: "Racing Car", imgSrc: "coloring/mnvh_mcqueen_car.webp" },
    { id: "mnvh_dump_truck", icon: "🚚", titleVi: "Xe ben", titleEn: "Dump Truck", imgSrc: "coloring/mnvh_dump_truck.webp" },
    { id: "mnvh_ambulance", icon: "🚑", titleVi: "Xe cứu thương", titleEn: "Ambulance", imgSrc: "coloring/mnvh_ambulance.webp" },
    {
      id: "mnvh_elsa_portrait",
      icon: "❄️",
      titleVi: "Công chúa Elsa duyên dáng",
      titleEn: "Princess Elsa Portrait",
      imgSrc: "coloring/mnvh_elsa_portrait.webp"
    },
    {
      id: "mnvh_elsa_magic_wand",
      icon: "🪄",
      titleVi: "Elsa và cây đũa tuyết",
      titleEn: "Elsa with Magic Wand",
      imgSrc: "coloring/mnvh_elsa_magic_wand.webp"
    },
    {
      id: "mnvh_elsa_anna_chibi",
      icon: "👯",
      titleVi: "Chị em Elsa và Anna dễ thương",
      titleEn: "Cute Elsa and Anna",
      imgSrc: "coloring/mnvh_elsa_anna_chibi.webp"
    },
    {
      id: "mnvh_elsa_snowflakes",
      icon: "❄️",
      titleVi: "Elsa và những bông tuyết",
      titleEn: "Elsa and Snowflakes",
      imgSrc: "coloring/mnvh_elsa_snowflakes.webp"
    },
    {
      id: "mnvh_elsa_ballgown",
      icon: "👗",
      titleVi: "Công chúa Elsa đầm dạ hội",
      titleEn: "Elsa in Ballgown",
      imgSrc: "coloring/mnvh_elsa_ballgown.webp"
    },
    {
      id: "mnvh_elsa_smile",
      icon: "✨",
      titleVi: "Nụ cười công chúa Elsa",
      titleEn: "Elsa Beautiful Smile",
      imgSrc: "coloring/mnvh_elsa_smile.webp"
    },
    {
      id: "mnvh_elsa_standing",
      icon: "👑",
      titleVi: "Công chúa băng giá đứng kiêu sa",
      titleEn: "Graceful Elsa Standing",
      imgSrc: "coloring/mnvh_elsa_standing.webp"
    },
    {
      id: "mnvh_elsa_cute_chibi",
      icon: "💖",
      titleVi: "Elsa chibi nhí nhảnh",
      titleEn: "Cute Chibi Elsa",
      imgSrc: "coloring/mnvh_elsa_cute_chibi.webp"
    },
    {
      id: "mnvh_elsa_braid",
      icon: "🎀",
      titleVi: "Elsa với bím tóc dài",
      titleEn: "Elsa with Long Braid",
      imgSrc: "coloring/mnvh_elsa_braid.webp"
    },
    {
      id: "mnvh_elsa_cape",
      icon: "💃",
      titleVi: "Elsa và tà áo choàng",
      titleEn: "Elsa with Flowing Cape",
      imgSrc: "coloring/mnvh_elsa_cape.webp"
    },
    {
      id: "mnvh_elsa_gentle",
      icon: "🌟",
      titleVi: "Công chúa Elsa dịu dàng",
      titleEn: "Gentle Princess Elsa",
      imgSrc: "coloring/mnvh_elsa_gentle.webp"
    },
    {
      id: "mnvh_elsa_magic_hands",
      icon: "✨",
      titleVi: "Phép thuật băng giá của Elsa",
      titleEn: "Elsa Magic Hands",
      imgSrc: "coloring/mnvh_elsa_magic_hands.webp"
    },
    {
      id: "mnvh_elsa_bust",
      icon: "👸",
      titleVi: "Chân dung công chúa Elsa",
      titleEn: "Elsa Portrait",
      imgSrc: "coloring/mnvh_elsa_bust.webp"
    },
    {
      id: "mnvh_elsa_anna_friends",
      icon: "👭",
      titleVi: "Elsa và Anna thân thiết",
      titleEn: "Elsa and Anna Sisters",
      imgSrc: "coloring/mnvh_elsa_anna_friends.webp"
    },
    {
      id: "mnvh_elsa_dancing",
      icon: "🩰",
      titleVi: "Elsa múa điệu băng tuyết",
      titleEn: "Elsa Dancing in Snow",
      imgSrc: "coloring/mnvh_elsa_dancing.webp"
    },
    {
      id: "mnvh_elsa_anna_happy",
      icon: "🥰",
      titleVi: "Hai chị em Elsa và Anna vui vẻ",
      titleEn: "Happy Elsa and Anna",
      imgSrc: "coloring/mnvh_elsa_anna_happy.webp"
    },
    {
      id: "mnvh_elsa_looking_back",
      icon: "❄️",
      titleVi: "Elsa ngoảnh lại mỉm cười",
      titleEn: "Elsa Looking Back",
      imgSrc: "coloring/mnvh_elsa_looking_back.webp"
    },
    {
      id: "mnvh_elsa_anna_toddler",
      icon: "👶",
      titleVi: "Elsa và Anna chibi bé bỏng",
      titleEn: "Baby Elsa and Anna",
      imgSrc: "coloring/mnvh_elsa_anna_toddler.webp"
    },
    {
      id: "mnvh_elsa_olaf",
      icon: "☃️",
      titleVi: "Elsa và người tuyết Olaf",
      titleEn: "Elsa and Olaf the Snowman",
      imgSrc: "coloring/mnvh_elsa_olaf.png"
    },
    {
      id: "mnvh_elsa_ice_skating",
      icon: "⛸️",
      titleVi: "Elsa trượt băng nghệ thuật",
      titleEn: "Elsa Ice Skating",
      imgSrc: "coloring/mnvh_elsa_ice_skating.png"
    }
  ];

  let artState = { mode: "color", picIdx: 0, activeHex: "#ef4444", brushSize: 18, isEraser: false, round: 1, autosaveTimer: null };

  function artStudioGame(forcedMode) {
    if (typeof forcedMode === "string" && (forcedMode === "color" || forcedMode === "glow")) {
      artState.mode = forcedMode;
    }
    if (artState.mode === "glow") {
      renderGlowPenStudio();
    } else {
      renderSvgColoringStudio();
    }
  }

  function renderSvgColoringStudio() {
    const c = getContainer();
    if (!c) return;

    const pic = SVG_COLORING_PICTURES[artState.picIdx % SVG_COLORING_PICTURES.length];
    const saveId = "freehand_color_" + pic.id;
    const formatColorName = (vi, en) => {
      const shortVi = (vi || "").replace(/^Màu\s+/i, "");
      return _T(shortVi.charAt(0).toUpperCase() + shortVi.slice(1), en || "");
    };
    const activeCol = COLOR_PALETTE.find(col => col.hex === artState.activeHex) || COLOR_PALETTE[0];

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Tô màu & Bút phát sáng", "Coloring & Glow Pen"), i: "🎨" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crColoringWrap">
        <div class="rv-top-bar cr-top-bar">
          <div class="chips" style="margin:0;gap:6px">
            <button type="button" class="pill on" onclick="window.artStudioGame('color')" style="min-height:44px;font-weight:800">🖍️ ${_T("Tô màu", "Hand Color")}</button>
            <button type="button" class="pill" onclick="window.artStudioGame('glow')" style="min-height:44px;font-weight:800">✨ ${_T("Bút phát sáng", "Glow Pen")}</button>
          </div>

          <div class="cr-pic-nav-bar">
            <button type="button" class="pill cr-nav-arrow" id="crPrevPicBtn" aria-label="${_T("Tranh trước", "Previous picture")}" title="${_T("Tranh trước", "Previous picture")}">◀</button>
            <div class="cr-pic-dropdown-wrap">
              <select class="bhv-select cr-pic-dropdown" id="crPicSelect" aria-label="${_T("Chọn tranh tô màu", "Pick a picture")}">
                ${SVG_COLORING_PICTURES.map((p, idx) => `<option value="${idx}" ${idx === (artState.picIdx % SVG_COLORING_PICTURES.length) ? "selected" : ""}>${p.icon} ${_T(p.titleVi, p.titleEn)}</option>`).join("")}
              </select>
            </div>
            <button type="button" class="pill cr-nav-arrow" id="crNextPicNavBtn" aria-label="${_T("Tranh tiếp", "Next picture")}" title="${_T("Tranh tiếp", "Next picture")}">▶</button>
            <button type="button" class="pill cr-speak-btn" id="crSpeakTitleBtn" aria-label="${_T("Nghe tên tranh", "Hear title")}" title="${_T("Bấm để nghe đọc tên tranh", "Hear picture name")}">🔊</button>
          </div>

          ${renderCreativeHeaderBadge(artState.round)}
        </div>

        <div id="crResumeBanner" style="display:none;background:#fef9c3;border:2px solid #facc15;border-radius:18px;padding:6px 14px;text-align:center;font-weight:800;color:#854d0e;margin:2px auto 6px">
          🌟 ${_T("Bé có bức tranh đang tô dở:", "Resume your unfinished drawing:")}
          <button type="button" class="pill on" id="crResumeBtn" style="margin-left:8px;min-height:40px;background:#eab308;color:#fff">🖌️ ${_T("Tô tiếp bức đang dở", "Resume Drawing")}</button>
        </div>

        <div class="cr-coloring-row">
          <!-- KHU VỰC KHUNG VẼ TO RỘNG CHO BÉ -->
          <div class="cr-canvas-container">
            <div id="crSvgCanvas" class="cr-svg-canvas">
              <img src="${pic.imgSrc}" alt="${pic.titleVi}" draggable="false" class="cr-canvas-bg" />
              <canvas id="crHandColorCanvas" width="500" height="500" class="cr-canvas-layer"></canvas>
              <!-- VÒNG TRÒN HIỂN THỊ VÙNG TÔ ĐƯỢC DƯỚI NGÓN TAY BÉ -->
              <div id="crBrushCursor" class="cr-brush-indicator" style="display:none;opacity:0;"></div>
            </div>
          </div>

          <!-- THANH CÔNG CỤ TINH GỌN (BỘ CHỌN MÀU SELECTOR + CỠ CỌ + NÚT BẤM) -->
          <div class="cr-coloring-sidebar">
            <div class="cr-tool-card">
              <span class="cr-tool-label">${_T("Màu sáp & Tẩy", "Crayon & Eraser")}:</span>
              <div class="cr-color-ctrl-row">
                <!-- NÚT BỘ CHỌN MÀU (POPUP SELECTOR) -->
                <button type="button" class="pill cr-color-picker-trigger" id="crColorPickerBtn" title="${_T("Bấm để mở bảng chọn màu", "Tap to open palette")}">
                  <span class="cr-active-color-dot" id="crActiveColorDot" style="background:${artState.isEraser ? '#ffffff' : artState.activeHex}"></span>
                  <strong class="cr-active-color-name" id="crActiveColorText">${artState.isEraser ? _T("Cục tẩy", "Eraser") : formatColorName(activeCol.vi, activeCol.en)}</strong>
                  <span class="cr-picker-chevron">🎨 ▾</span>
                </button>

                <!-- NÚT CỤC TẨY TRẮNG TIỆN LỢI -->
                <button type="button" class="pill cr-eraser-btn ${artState.isEraser ? 'on' : ''}" id="crEraserBtn" title="${_T("Cục tẩy trắng", "Eraser")}">
                  🧼 ${_T("Tẩy", "Eraser")}
                </button>
              </div>
            </div>

            <!-- CHỌN CỠ NÉT VẼ -->
            <div class="cr-tool-card">
              <span class="cr-tool-label">${_T("Cỡ ngòi vẽ", "Brush Size")}:</span>
              <div class="chips cr-brush-chips" style="margin:0;gap:6px">
                ${[
                  { sz: 14, label: _T("Nhỏ", "Small"), dot: 10 },
                  { sz: 26, label: _T("Vừa", "Medium"), dot: 16 },
                  { sz: 42, label: _T("To", "Large"), dot: 24 }
                ].map(b => `
                  <button type="button" class="pill cr-brush-btn ${(!artState.isEraser && artState.brushSize === b.sz) ? 'on' : ''}" data-sz="${b.sz}">
                    <span class="cr-brush-dot" style="width:${b.dot}px;height:${b.dot}px;border-radius:50%;background:${artState.isEraser ? '#64748b' : artState.activeHex};display:inline-block"></span>
                    <span>${b.label}</span>
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- CÁC THAO TÁC: HOÀN TÁC, TÔ LẠI, XONG RỒI -->
            <div class="cr-tool-card cr-actions-card">
              <div class="cr-action-btns-row">
                <button type="button" class="pill cr-sub-btn" id="crUndoColorBtn" title="${_T("Lùi lại một nét", "Undo stroke")}">↩️ ${_T("Hoàn tác", "Undo")}</button>
                <button type="button" class="pill cr-sub-btn cr-clear-btn" id="crClearColorBtn" title="${_T("Tô lại từ đầu", "Clear canvas")}">🧹 ${_T("Tô lại", "Clear")}</button>
              </div>
              <button type="button" class="pill on cr-done-btn" id="crDoneColorBtn">✔ ${_T("Xong rồi!", "All Done!")}</button>
            </div>
          </div>
        </div>

        <!-- HỘP THOẠI POPUP BẢNG MÀU SÁP CHO BÉ CHỌN (MODAL SELECTOR) -->
        <div id="crPaletteModal" class="cr-palette-modal" style="display:none;" aria-hidden="true">
          <div class="cr-palette-backdrop" id="crPaletteBackdrop"></div>
          <div class="cr-palette-sheet" role="dialog" aria-modal="true" aria-label="${_T("Bảng màu sáp", "Crayon Palette")}">
            <div class="cr-palette-header">
              <h4 style="margin:0;font-size:19px;display:flex;align-items:center;gap:8px;color:#1e293b;font-weight:900">
                🎨 <span>${_T("Bé chọn màu sáp yêu thích:", "Pick your favorite crayon:")}</span>
              </h4>
              <button type="button" class="cr-palette-close-btn" id="crPaletteCloseBtn" aria-label="${_T("Đóng", "Close")}">✖</button>
            </div>
            <div class="cr-swatches-grid">
              ${COLOR_PALETTE.map(col => {
                const isSelected = (!artState.isEraser && col.hex === artState.activeHex);
                return `
                <button type="button" class="cr-color-swatch ${isSelected ? 'on' : ''}" data-hex="${col.hex}" data-vi="${col.vi}" data-en="${col.en}" aria-label="${col.vi}" title="${col.vi} (${col.en})"
                  style="background:${col.hex};">
                  ${isSelected ? '<span class="cr-swatch-check">✔</span>' : ''}
                </button>`;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    _catSet("happy");

    const wrap = c.querySelector("#crColoringWrap");
    if (!wrap) return;
    const cv = wrap.querySelector("#crHandColorCanvas");
    const ctx = cv && cv.getContext ? cv.getContext("2d") : null;
    const cursorEl = wrap.querySelector("#crBrushCursor");
    let strokes = [];
    let currentStroke = null;

    function redrawAllStrokes() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      strokes.forEach(st => {
        if (!st.points || st.points.length === 0) return;
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = st.size || 26;
        if (st.eraser) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.strokeStyle = "rgba(0,0,0,1)";
        } else {
          ctx.globalCompositeOperation = "source-over";
          ctx.strokeStyle = st.color || "#ef4444";
        }
        ctx.beginPath();
        ctx.moveTo(st.points[0].x, st.points[0].y);
        if (st.points.length === 1) {
          ctx.lineTo(st.points[0].x + 0.1, st.points[0].y + 0.1);
        } else {
          for (let i = 1; i < st.points.length; i++) {
            ctx.lineTo(st.points[i].x, st.points[i].y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });
    }

    function scheduleAutosave() {
      if (artState.autosaveTimer) clearTimeout(artState.autosaveTimer);
      artState.autosaveTimer = setTimeout(() => {
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
      }, 900);
    }

    loadDrawingRecord(saveId).then(saved => {
      if (saved && Array.isArray(saved.strokes) && saved.strokes.length > 0) {
        const banner = wrap.querySelector("#crResumeBanner");
        const btn = wrap.querySelector("#crResumeBtn");
        if (banner && btn) {
          banner.style.display = "block";
          btn.onclick = () => {
            // Tương thích ngược: nếu nét vẽ được lưu ở chuẩn cũ 350x350, tự động scale lên 500x500
            const maxCoord = Math.max(...saved.strokes.flatMap(st => (st.points || []).flatMap(pt => [pt.x, pt.y])), 0);
            if (maxCoord > 0 && maxCoord <= 360) {
              const ratio = 500 / 350;
              strokes = saved.strokes.map(st => ({
                ...st,
                size: Math.round((st.size || 18) * ratio),
                points: (st.points || []).map(p => ({ x: Math.round(p.x * ratio), y: Math.round(p.y * ratio) }))
              }));
            } else {
              strokes = saved.strokes;
            }
            redrawAllStrokes();
            banner.style.display = "none";
            _sfxTing();
          };
        }
      }
    });

    // Cập nhật vị trí và kích thước vòng tròn hiển thị vùng tô dưới ngón tay bé
    function updateBrushCursor(e, visible) {
      if (!cursorEl || !cv) return;
      if (!visible) {
        cursorEl.style.opacity = "0";
        cursorEl.style.display = "none";
        return;
      }
      const r = cv.getBoundingClientRect();
      const p = e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e);
      const relX = p.clientX - r.left;
      const relY = p.clientY - r.top;

      if (relX < -15 || relX > r.width + 15 || relY < -15 || relY > r.height + 15) {
        cursorEl.style.opacity = "0";
        cursorEl.style.display = "none";
        return;
      }

      const scale = r.width / cv.width;
      const diamCss = Math.max(14, Math.round(artState.brushSize * scale));

      cursorEl.style.width = diamCss + "px";
      cursorEl.style.height = diamCss + "px";
      cursorEl.style.left = relX + "px";
      cursorEl.style.top = relY + "px";

      if (artState.isEraser) {
        cursorEl.style.background = "rgba(255, 255, 255, 0.55)";
        cursorEl.style.borderColor = "#0284c7";
      } else {
        cursorEl.style.background = artState.activeHex + "44";
        cursorEl.style.borderColor = "rgba(15, 23, 42, 0.75)";
      }
      cursorEl.style.display = "block";
      cursorEl.style.opacity = "1";
    }

    if (cv) {
      const getPt = (e) => {
        const r = cv.getBoundingClientRect();
        const p = e.touches && e.touches[0] ? e.touches[0] : e;
        return {
          x: Math.round(((p.clientX - r.left) / (r.width || 500)) * cv.width),
          y: Math.round(((p.clientY - r.top) / (r.height || 500)) * cv.height)
        };
      };

      const startDraw = (e) => {
        if (e.cancelable) e.preventDefault();
        const pt = getPt(e);
        currentStroke = {
          color: artState.activeHex,
          size: artState.brushSize,
          eraser: !!artState.isEraser,
          points: [pt]
        };
        strokes.push(currentStroke);
        redrawAllStrokes();
        updateBrushCursor(e, true);
      };

      const moveDraw = (e) => {
        if (!currentStroke) {
          updateBrushCursor(e, true);
          return;
        }
        if (e.cancelable) e.preventDefault();
        const pt = getPt(e);
        const last = currentStroke.points[currentStroke.points.length - 1];
        if (Math.hypot(pt.x - last.x, pt.y - last.y) < 3) return;
        currentStroke.points.push(pt);
        redrawAllStrokes();
        updateBrushCursor(e, true);
      };

      const endDraw = (e) => {
        if (!currentStroke) return;
        currentStroke = null;
        scheduleAutosave();
        updateBrushCursor(e, false);
      };

      cv.addEventListener("mousedown", startDraw);
      cv.addEventListener("mousemove", moveDraw);
      cv.addEventListener("mouseleave", (e) => updateBrushCursor(e, false));
      window.addEventListener("mouseup", endDraw);
      cv.addEventListener("touchstart", startDraw, { passive: false });
      cv.addEventListener("touchmove", moveDraw, { passive: false });
      cv.addEventListener("touchend", endDraw);
      cv.addEventListener("touchcancel", endDraw);
    }

    // Điều hướng chọn tranh
    const picSel = wrap.querySelector("#crPicSelect");
    if (picSel) {
      picSel.addEventListener("change", () => {
        const idx = parseInt(picSel.value, 10);
        if (!isNaN(idx)) {
          saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
          artState.picIdx = idx;
          _sfxTap();
          renderSvgColoringStudio();
        }
      });
    }

    const prevBtn = wrap.querySelector("#crPrevPicBtn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
        artState.picIdx = (artState.picIdx - 1 + SVG_COLORING_PICTURES.length) % SVG_COLORING_PICTURES.length;
        _sfxTap();
        renderSvgColoringStudio();
      });
    }

    const nextNavBtn = wrap.querySelector("#crNextPicNavBtn");
    if (nextNavBtn) {
      nextNavBtn.addEventListener("click", () => {
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
        artState.picIdx = (artState.picIdx + 1) % SVG_COLORING_PICTURES.length;
        _sfxTap();
        renderSvgColoringStudio();
      });
    }

    const speakTitleBtn = wrap.querySelector("#crSpeakTitleBtn");
    if (speakTitleBtn) {
      speakTitleBtn.addEventListener("click", () => {
        _sfxTap();
        if (typeof window !== "undefined" && window.say) {
          window.say(pic.titleVi, pic.titleEn);
        }
      });
    }

    // Quản lý Modal Chọn Màu (Color Selector Popover)
    const modal = wrap.querySelector("#crPaletteModal");
    const openBtn = wrap.querySelector("#crColorPickerBtn");
    const closeBtn = wrap.querySelector("#crPaletteCloseBtn");
    const backdrop = wrap.querySelector("#crPaletteBackdrop");

    function openPaletteModal() {
      if (!modal) return;
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      _sfxTap();
    }

    function closePaletteModal() {
      if (!modal) return;
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }

    if (openBtn) openBtn.addEventListener("click", openPaletteModal);
    if (closeBtn) closeBtn.addEventListener("click", () => { closePaletteModal(); _sfxTap(); });
    if (backdrop) backdrop.addEventListener("click", closePaletteModal);

    function updateColorSwatchUI(selectedBtn) {
      artState.isEraser = false;
      artState.activeHex = selectedBtn.dataset.hex;
      const eraserBtn = wrap.querySelector("#crEraserBtn");
      if (eraserBtn) eraserBtn.classList.remove("on");

      wrap.querySelectorAll(".cr-color-swatch").forEach(b => {
        const isSel = (b === selectedBtn);
        b.classList.toggle("on", isSel);
        b.innerHTML = isSel ? '<span class="cr-swatch-check">✔</span>' : '';
      });

      const badgeText = wrap.querySelector("#crActiveColorText");
      const badgeDot = wrap.querySelector("#crActiveColorDot");
      if (badgeText) {
        badgeText.textContent = formatColorName(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
      if (badgeDot) {
        badgeDot.style.background = selectedBtn.dataset.hex;
      }
      wrap.querySelectorAll(".cr-brush-btn .cr-brush-dot").forEach(sp => {
        sp.style.background = artState.activeHex;
      });

      closePaletteModal();
      _sfxTap();
      if (typeof window !== "undefined" && window.say) {
        window.say(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
    }

    wrap.querySelectorAll(".cr-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => updateColorSwatchUI(btn));
    });

    const eraserBtn = wrap.querySelector("#crEraserBtn");
    if (eraserBtn) {
      eraserBtn.addEventListener("click", () => {
        artState.isEraser = true;
        eraserBtn.classList.add("on");
        wrap.querySelectorAll(".cr-color-swatch").forEach(b => {
          b.classList.remove("on");
          b.innerHTML = '';
        });
        const badgeText = wrap.querySelector("#crActiveColorText");
        const badgeDot = wrap.querySelector("#crActiveColorDot");
        if (badgeText) badgeText.textContent = _T("Cục tẩy", "Eraser");
        if (badgeDot) badgeDot.style.background = "#ffffff";
        wrap.querySelectorAll(".cr-brush-btn .cr-brush-dot").forEach(sp => {
          sp.style.background = "#64748b";
        });
        _sfxTap();
      });
    }

    wrap.querySelectorAll(".cr-brush-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        artState.brushSize = parseInt(btn.dataset.sz, 10) || 26;
        wrap.querySelectorAll(".cr-brush-btn").forEach(b => b.classList.toggle("on", b === btn));
        _sfxTap();
      });
    });

    const undoBtn = wrap.querySelector("#crUndoColorBtn");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        if (strokes.length > 0) {
          strokes.pop();
          redrawAllStrokes();
          scheduleAutosave();
          _sfxTap();
        }
      });
    }

    const clearBtn = wrap.querySelector("#crClearColorBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        strokes = [];
        redrawAllStrokes();
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [] });
        _sfxTap();
      });
    }

    const doneBtn = wrap.querySelector("#crDoneColorBtn");
    if (doneBtn) {
      doneBtn.addEventListener("click", () => {
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
        _sfxTing();
        _fx();
        _catSet("celebrate");
        _say(`Bức tranh ${pic.titleVi} của bé đẹp lung linh! Tặng bé một ngôi sao vàng rực rỡ!`, "Beautiful coloring! You earned a star!");
        setTimeout(() => {
          artState.round++;
          artState.picIdx = (artState.picIdx + 1) % SVG_COLORING_PICTURES.length;
          finishRoundAndContinue(() => renderSvgColoringStudio(), "vi.fine_motor.coloring");
        }, 700);
      });
    }
  }

  // "Bút phát sáng" (Glow Pen): nền tối, giới hạn tối đa 320 điểm để điện thoại tầm thấp mượt mà
  const MAX_GLOW_POINTS = 320;

  function renderGlowPenStudio() {
    const c = getContainer();
    if (!c) return;
    const formatColorName = (vi, en) => {
      const shortVi = (vi || "").replace(/^Màu\s+/i, "");
      return _T(shortVi.charAt(0).toUpperCase() + shortVi.slice(1), en || "");
    };
    const activeCol = COLOR_PALETTE.find(col => col.hex === artState.activeHex) || COLOR_PALETTE[0];

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Bút phát sáng", "Glow Pen"), i: "✨" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crGlowWrap">
        <div class="rv-top-bar cr-top-bar">
          <div class="chips" style="margin:0;gap:6px">
            <button type="button" class="pill" onclick="window.artStudioGame('color')" style="min-height:44px;font-weight:800">🖍️ ${_T("Tô màu", "Hand Color")}</button>
            <button type="button" class="pill on" onclick="window.artStudioGame('glow')" style="min-height:44px;font-weight:800">✨ ${_T("Bút phát sáng", "Glow Pen")}</button>
          </div>
          <div style="font-size:16px;font-weight:800;color:#38bdf8">✨ ${_T("Vẽ tia sáng thần kỳ", "Magical Neon Glow")}</div>
          ${renderCreativeHeaderBadge(artState.round)}
        </div>

        <div class="cr-coloring-row">
          <div class="cr-canvas-container">
            <div id="crGlowCanvasWrap" class="cr-svg-canvas cr-glow-canvas-wrap" style="position:relative;background:#0f172a;border:4px solid #38bdf8;border-radius:26px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,0.45)">
              <canvas id="crGlowCanvas" width="500" height="500" style="display:block;width:100%;height:100%;touch-action:none;cursor:crosshair"></canvas>
              <div id="crGlowBrushCursor" class="cr-brush-indicator cr-glow-indicator" style="display:none;opacity:0;"></div>
            </div>
          </div>

          <div class="cr-coloring-sidebar">
            <div class="cr-tool-card">
              <span class="cr-tool-label">${_T("Màu ánh sáng", "Glow Color")}:</span>
              <button type="button" class="pill cr-color-selector-btn" id="crGlowColorPickerBtn" style="border-color:#38bdf8;box-shadow:0 0 12px rgba(56,189,248,0.3)">
                <span class="cr-active-color-dot" id="crActiveGlowDot" style="background:${artState.activeHex};box-shadow:0 0 10px ${artState.activeHex}"></span>
                <strong class="cr-active-color-name" id="crActiveGlowText">${_T(activeCol.vi, activeCol.en)}</strong>
                <span class="cr-picker-chevron">✨ ▾</span>
              </button>
            </div>

            <div class="cr-tool-card cr-actions-card">
              <button type="button" class="pill cr-sub-btn cr-clear-btn" id="crGlowClearBtn" style="min-height:48px;font-weight:800;background:#fee2e2;color:#991b1b;border-color:#fca5a5">🧹 ${_T("Xóa bảng", "Clear")}</button>
              <button type="button" class="pill on cr-done-btn" id="crGlowDoneBtn">✔ ${_T("Xong rồi!", "All Done!")}</button>
            </div>
          </div>
        </div>

        <!-- HỘP THOẠI POPUP BẢNG MÀU ÁNH SÁNG -->
        <div id="crGlowPaletteModal" class="cr-palette-modal" style="display:none;" aria-hidden="true">
          <div class="cr-palette-backdrop" id="crGlowPaletteBackdrop"></div>
          <div class="cr-palette-sheet" style="background:#0f172a;border-color:#38bdf8" role="dialog" aria-modal="true">
            <div class="cr-palette-header">
              <h4 style="margin:0;font-size:19px;display:flex;align-items:center;gap:8px;color:#38bdf8;font-weight:900">
                ✨ <span>${_T("Chọn màu ánh sáng neon:", "Pick a neon glow color:")}</span>
              </h4>
              <button type="button" class="cr-palette-close-btn" id="crGlowPaletteCloseBtn" style="color:#ffffff;background:#334155" aria-label="${_T("Đóng", "Close")}">✖</button>
            </div>
            <div class="cr-swatches-grid">
              ${COLOR_PALETTE.map(col => {
                const isSelected = (col.hex === artState.activeHex);
                return `
                <button type="button" class="cr-glow-swatch ${isSelected ? 'on' : ''}" data-hex="${col.hex}" data-vi="${col.vi}" data-en="${col.en}" aria-label="${col.vi}" title="${col.vi} (${col.en})"
                  style="background:${col.hex};border:${isSelected ? '4px solid #ffffff' : '3px solid #334155'};box-shadow:0 0 ${isSelected ? '18px' : '6px'} ${col.hex};">
                  ${isSelected ? '<span class="cr-swatch-check" style="color:#fff">✔</span>' : ''}
                </button>`;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    _catSet("happy");

    const wrap = c.querySelector("#crGlowWrap");
    const cv = c.querySelector("#crGlowCanvas");
    if (!wrap || !cv) return;
    const cursorEl = wrap.querySelector("#crGlowBrushCursor");
    const ctx = cv.getContext ? cv.getContext("2d") : null;
    let strokes = []; // mỗi phần tử: { color, points: [{x,y}] }
    let currentStroke = null;
    let totalPoints = 0;

    function redrawGlow() {
      if (!ctx) return;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, cv.width, cv.height);
      strokes.forEach(st => {
        if (!st.points || st.points.length < 2) return;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(st.points[0].x, st.points[0].y);
        for (let i = 1; i < st.points.length; i++) {
          ctx.lineTo(st.points[i].x, st.points[i].y);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = st.color;
        ctx.shadowColor = st.color;
        ctx.shadowBlur = 16;
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      });
    }

    redrawGlow();

    loadDrawingRecord("glow_pen_latest").then(saved => {
      if (saved && Array.isArray(saved.strokes) && saved.strokes.length > 0) {
        strokes = saved.strokes;
        redrawGlow();
      }
    });

    function updateGlowCursor(e, visible) {
      if (!cursorEl || !cv) return;
      if (!visible) {
        cursorEl.style.opacity = "0";
        cursorEl.style.display = "none";
        return;
      }
      const r = cv.getBoundingClientRect();
      const p = e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e);
      const relX = p.clientX - r.left;
      const relY = p.clientY - r.top;

      if (relX < -15 || relX > r.width + 15 || relY < -15 || relY > r.height + 15) {
        cursorEl.style.opacity = "0";
        cursorEl.style.display = "none";
        return;
      }

      cursorEl.style.width = "24px";
      cursorEl.style.height = "24px";
      cursorEl.style.left = relX + "px";
      cursorEl.style.top = relY + "px";
      cursorEl.style.background = artState.activeHex + "66";
      cursorEl.style.borderColor = "#ffffff";
      cursorEl.style.boxShadow = `0 0 12px ${artState.activeHex}, inset 0 0 6px ${artState.activeHex}`;
      cursorEl.style.display = "block";
      cursorEl.style.opacity = "1";
    }

    function getCanvasPt(e) {
      const r = cv.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return {
        x: Math.round(((p.clientX - r.left) / (r.width || 500)) * cv.width),
        y: Math.round(((p.clientY - r.top) / (r.height || 500)) * cv.height)
      };
    }

    function onStart(e) {
      if (e.cancelable) e.preventDefault();
      const pt = getCanvasPt(e);
      currentStroke = { color: artState.activeHex, points: [pt] };
      strokes.push(currentStroke);
      totalPoints++;
      updateGlowCursor(e, true);
    }

    function onMove(e) {
      if (!currentStroke) {
        updateGlowCursor(e, true);
        return;
      }
      if (e.cancelable) e.preventDefault();
      const pt = getCanvasPt(e);
      const last = currentStroke.points[currentStroke.points.length - 1];
      if (Math.hypot(pt.x - last.x, pt.y - last.y) < 5) return;
      currentStroke.points.push(pt);
      totalPoints++;
      while (totalPoints > MAX_GLOW_POINTS && strokes.length > 1) {
        const removed = strokes.shift();
        totalPoints -= (removed.points ? removed.points.length : 0);
      }
      redrawGlow();
      updateGlowCursor(e, true);
    }

    function onEnd(e) {
      if (!currentStroke) return;
      currentStroke = null;
      saveDrawingRecord({ id: "glow_pen_latest", type: "glow_pen", strokes });
      updateGlowCursor(e, false);
    }

    cv.addEventListener("mousedown", onStart);
    cv.addEventListener("mousemove", onMove);
    cv.addEventListener("mouseleave", (e) => updateGlowCursor(e, false));
    window.addEventListener("mouseup", onEnd);
    cv.addEventListener("touchstart", onStart, { passive: false });
    cv.addEventListener("touchmove", onMove, { passive: false });
    cv.addEventListener("touchend", onEnd);
    cv.addEventListener("touchcancel", onEnd);

    // Modal quản lý bảng màu Glow
    const glowModal = wrap.querySelector("#crGlowPaletteModal");
    const openGlowBtn = wrap.querySelector("#crGlowColorPickerBtn");
    const closeGlowBtn = wrap.querySelector("#crGlowPaletteCloseBtn");
    const backdropGlow = wrap.querySelector("#crGlowPaletteBackdrop");

    function openGlowModal() {
      if (!glowModal) return;
      glowModal.style.display = "flex";
      glowModal.setAttribute("aria-hidden", "false");
      _sfxTap();
    }

    function closeGlowModal() {
      if (!glowModal) return;
      glowModal.style.display = "none";
      glowModal.setAttribute("aria-hidden", "true");
    }

    if (openGlowBtn) openGlowBtn.addEventListener("click", openGlowModal);
    if (closeGlowBtn) closeGlowBtn.addEventListener("click", () => { closeGlowModal(); _sfxTap(); });
    if (backdropGlow) backdropGlow.addEventListener("click", closeGlowModal);

    function updateGlowSwatchUI(selectedBtn) {
      artState.activeHex = selectedBtn.dataset.hex;
      wrap.querySelectorAll(".cr-glow-swatch").forEach(b => {
        const isSel = (b === selectedBtn);
        b.classList.toggle("on", isSel);
        b.style.border = isSel ? "4px solid #ffffff" : "3px solid #334155";
        b.style.boxShadow = isSel ? `0 0 18px ${b.dataset.hex}` : `0 0 6px ${b.dataset.hex}`;
        b.innerHTML = isSel ? '<span class="cr-swatch-check" style="color:#fff">✔</span>' : '';
      });
      const badgeText = wrap.querySelector("#crActiveGlowText");
      const badgeDot = wrap.querySelector("#crActiveGlowDot");
      if (badgeText) {
        badgeText.textContent = formatColorName(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
      if (badgeDot) {
        badgeDot.style.background = selectedBtn.dataset.hex;
        badgeDot.style.boxShadow = `0 0 10px ${selectedBtn.dataset.hex}`;
      }
      closeGlowModal();
      _sfxTap();
      if (typeof window !== "undefined" && window.say) {
        window.say(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
    }

    wrap.querySelectorAll(".cr-glow-swatch").forEach(btn => {
      btn.addEventListener("click", () => updateGlowSwatchUI(btn));
    });

    const clrBtn = wrap.querySelector("#crGlowClearBtn");
    if (clrBtn) {
      clrBtn.addEventListener("click", () => {
        strokes = [];
        totalPoints = 0;
        redrawGlow();
        saveDrawingRecord({ id: "glow_pen_latest", type: "glow_pen", strokes: [] });
        _sfxTap();
      });
    }

    const doneBtn = wrap.querySelector("#crGlowDoneBtn");
    if (doneBtn) {
      doneBtn.addEventListener("click", () => {
        saveDrawingRecord({ id: "glow_pen_latest", type: "glow_pen", strokes });
        _sfxTing();
        _fx();
        _say("Tác phẩm ánh sáng tuyệt đẹp! Tặng bé một ngôi sao lấp lánh!", "Magical glowing picture!");
        setTimeout(() => {
          artState.round++;
          finishRoundAndContinue(() => artStudioGame("color"), "vi.fine_motor.glow");
        }, 650);
      });
    }
  }


  const CreativeGames = {
    COLOR_PALETTE,
    SVG_COLORING_PICTURES,
    saveDrawingRecord,
    loadDrawingRecord,
    listSavedDrawings,
    clearAllSavedDrawings,
    artStudioGame
  };

  if (typeof window !== "undefined") {
    window.CreativeGames = CreativeGames;
    window.artStudioGame = artStudioGame;
    window.clearAllSavedDrawings = clearAllSavedDrawings;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.CreativeGames = CreativeGames;
    globalThis.artStudioGame = artStudioGame;
    globalThis.clearAllSavedDrawings = clearAllSavedDrawings;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CreativeGames;
  }
})();
