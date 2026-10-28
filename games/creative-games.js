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
      id: "mnvh_tulip_garden",
      icon: "🌷",
      titleVi: "Vườn hoa rực rỡ",
      titleEn: "Flower Garden",
      imgSrc: "coloring/mnvh_tulip_garden.webp"
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
      id: "mnvh_butterfly",
      icon: "🦋",
      titleVi: "Bươm bướm xinh",
      titleEn: "Pretty Butterfly",
      imgSrc: "coloring/mnvh_butterfly.webp"
    },
    {
      id: "mnvh_seahorse",
      icon: "🐠",
      titleVi: "Cá ngựa đại dương",
      titleEn: "Ocean Seahorse",
      imgSrc: "coloring/mnvh_seahorse.webp"
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
    { id: "mnvh_hen_chicks", icon: "🐔", titleVi: "Gà mẹ và đàn con", titleEn: "Hen and Chicks", imgSrc: "coloring/mnvh_hen_chicks.webp" },
    { id: "mnvh_cow_field", icon: "🐄", titleVi: "Bò ăn cỏ trên đồi", titleEn: "Cow in the Field", imgSrc: "coloring/mnvh_cow_field.webp" },
    { id: "mnvh_rescue_pups", icon: "🐾", titleVi: "Những chú chó cứu hộ", titleEn: "Rescue Pups", imgSrc: "coloring/mnvh_rescue_pups.webp" },
    { id: "mnvh_giraffe_palm", icon: "🦒", titleVi: "Hươu cao cổ", titleEn: "Giraffe", imgSrc: "coloring/mnvh_giraffe_palm.webp" },
    { id: "mnvh_lily_flower", icon: "💮", titleVi: "Hoa loa kèn", titleEn: "Lily Flower", imgSrc: "coloring/mnvh_lily_flower.webp" },
    { id: "mnvh_flower_pot", icon: "🪴", titleVi: "Chậu hoa xinh", titleEn: "Flower Pot", imgSrc: "coloring/mnvh_flower_pot.webp" },
    { id: "mnvh_smiling_sunflower", icon: "🌻", titleVi: "Hoa mặt cười", titleEn: "Smiling Flower", imgSrc: "coloring/mnvh_smiling_sunflower.webp" },
    { id: "mnvh_bellflower", icon: "🔔", titleVi: "Hoa chuông", titleEn: "Bellflower", imgSrc: "coloring/mnvh_bellflower.webp" },
    { id: "mnvh_twin_daisies", icon: "🌼", titleVi: "Đôi hoa cúc", titleEn: "Twin Daisies", imgSrc: "coloring/mnvh_twin_daisies.webp" },
    { id: "mnvh_rose_bloom", icon: "🌹", titleVi: "Bông hoa nở", titleEn: "Blooming Flower", imgSrc: "coloring/mnvh_rose_bloom.webp" },
    { id: "mnvh_sun_garden", icon: "☀️", titleVi: "Vườn hoa ông mặt trời", titleEn: "Sunny Garden", imgSrc: "coloring/mnvh_sun_garden.webp" },
    { id: "mnvh_boy_basketball", icon: "🏀", titleVi: "Bé trai chơi bóng", titleEn: "Boy with a Ball", imgSrc: "coloring/mnvh_boy_basketball.webp" },
    { id: "mnvh_boy_soccer", icon: "⚽", titleVi: "Bé trai đá bóng", titleEn: "Boy Playing Soccer", imgSrc: "coloring/mnvh_boy_soccer.webp" },
    { id: "mnvh_lion_king", icon: "🦁", titleVi: "Sư tử cha và con", titleEn: "Lion Family", imgSrc: "coloring/mnvh_lion_king.webp" },
    { id: "mnvh_cute_dino", icon: "🦕", titleVi: "Khủng long con", titleEn: "Baby Dinosaur", imgSrc: "coloring/mnvh_cute_dino.webp" },
    { id: "mnvh_pikachu", icon: "⚡", titleVi: "Pikachu", titleEn: "Pikachu", imgSrc: "coloring/mnvh_pikachu.webp" },
    { id: "mnvh_doraemon", icon: "🔵", titleVi: "Doraemon", titleEn: "Doraemon", imgSrc: "coloring/mnvh_doraemon.webp" },
    { id: "mnvh_small_plane", icon: "🛩️", titleVi: "Máy bay nhỏ", titleEn: "Small Plane", imgSrc: "coloring/mnvh_small_plane.webp" },
    { id: "mnvh_passenger_plane", icon: "🛫", titleVi: "Máy bay chở khách", titleEn: "Passenger Plane", imgSrc: "coloring/mnvh_passenger_plane.webp" },
    { id: "mnvh_night_plane", icon: "🌙", titleVi: "Máy bay đêm", titleEn: "Night Flight", imgSrc: "coloring/mnvh_night_plane.webp" },
    { id: "mnvh_cloud_plane", icon: "☁️", titleVi: "Máy bay trên mây", titleEn: "Plane in the Clouds", imgSrc: "coloring/mnvh_cloud_plane.webp" },
    { id: "mnvh_helicopter", icon: "🚁", titleVi: "Trực thăng", titleEn: "Helicopter", imgSrc: "coloring/mnvh_helicopter.webp" },
    { id: "mnvh_propeller_plane", icon: "🪂", titleVi: "Máy bay cánh quạt", titleEn: "Propeller Plane", imgSrc: "coloring/mnvh_propeller_plane.webp" },
    { id: "mnvh_beetle_car", icon: "🚙", titleVi: "Ô tô con bọ", titleEn: "Beetle Car", imgSrc: "coloring/mnvh_beetle_car.webp" },
    { id: "mnvh_police_car", icon: "🚓", titleVi: "Xe cảnh sát", titleEn: "Police Car", imgSrc: "coloring/mnvh_police_car.webp" },
    { id: "mnvh_police_suv", icon: "🚔", titleVi: "Xe cảnh sát địa hình", titleEn: "Police SUV", imgSrc: "coloring/mnvh_police_suv.webp" },
    { id: "mnvh_convertible_car", icon: "🏎️", titleVi: "Ô tô mui trần", titleEn: "Convertible Car", imgSrc: "coloring/mnvh_convertible_car.webp" },
    { id: "mnvh_mcqueen_car", icon: "🏁", titleVi: "Xe đua tia chớp", titleEn: "Racing Car", imgSrc: "coloring/mnvh_mcqueen_car.webp" },
    { id: "mnvh_dump_truck", icon: "🚚", titleVi: "Xe ben", titleEn: "Dump Truck", imgSrc: "coloring/mnvh_dump_truck.webp" },
    { id: "mnvh_school_bus", icon: "🚌", titleVi: "Xe buýt đến trường", titleEn: "School Bus", imgSrc: "coloring/mnvh_school_bus.webp" },
    { id: "mnvh_fire_truck", icon: "🚒", titleVi: "Xe cứu hỏa", titleEn: "Fire Truck", imgSrc: "coloring/mnvh_fire_truck.webp" },
    { id: "mnvh_ambulance", icon: "🚑", titleVi: "Xe cứu thương", titleEn: "Ambulance", imgSrc: "coloring/mnvh_ambulance.webp" },
    { id: "mnvh_sports_car", icon: "🚘", titleVi: "Siêu xe thể thao", titleEn: "Sports Car", imgSrc: "coloring/mnvh_sports_car.webp" },
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
      id: "mnvh_elsa_ice_castle",
      icon: "🏰",
      titleVi: "Elsa và lâu đài băng",
      titleEn: "Elsa and the Ice Castle",
      imgSrc: "coloring/mnvh_elsa_ice_castle.png"
    },
    {
      id: "mnvh_elsa_ice_skating",
      icon: "⛸️",
      titleVi: "Elsa trượt băng nghệ thuật",
      titleEn: "Elsa Ice Skating",
      imgSrc: "coloring/mnvh_elsa_ice_skating.png"
    },
    {
      id: "mnvh_elsa_ice_crown",
      icon: "👑",
      titleVi: "Elsa vương miện băng tuyết",
      titleEn: "Elsa with Ice Crown",
      imgSrc: "coloring/mnvh_elsa_ice_crown.png"
    },
    {
      id: "mnvh_elsa_nokk_water_horse",
      icon: "🦄",
      titleVi: "Elsa và chú ngựa thần Nokk",
      titleEn: "Elsa and Nokk Water Horse",
      imgSrc: "coloring/mnvh_elsa_nokk_water_horse.png"
    },
    {
      id: "mnvh_elsa_bruni",
      icon: "🦎",
      titleVi: "Elsa và thằn lằn tuyết Bruni",
      titleEn: "Elsa and Baby Salamander Bruni",
      imgSrc: "coloring/mnvh_elsa_bruni.png"
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

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Tô màu & Bút phát sáng", "Coloring & Glow Pen"), i: "🎨" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crColoringWrap">
        <div class="rv-top-bar">
          <div class="chips" style="margin:0">
            <button type="button" class="pill on" onclick="window.artStudioGame('color')" style="min-height:48px;font-weight:800">🖍️ ${_T("Tô màu bằng tay", "Hand Coloring")}</button>
            <button type="button" class="pill" onclick="window.artStudioGame('glow')" style="min-height:48px;font-weight:800">✨ ${_T("Bút phát sáng", "Glow Pen")}</button>
          </div>
          ${renderCreativeHeaderBadge(artState.round)}
        </div>

        <div id="crResumeBanner" style="display:none;background:#fef9c3;border:2px solid #facc15;border-radius:18px;padding:8px 14px;text-align:center;font-weight:800;color:#854d0e">
          🌟 ${_T("Bé có bức tranh đang tô dở:", "Resume your unfinished drawing:")}
          <button type="button" class="pill on" id="crResumeBtn" style="margin-left:8px;min-height:44px;background:#eab308;color:#fff">🖌️ ${_T("Tô tiếp bức đang dở", "Resume Drawing")}</button>
        </div>

        <div style="display:flex;justify-content:center;margin:4px 0 8px">
          <select class="bhv-select" id="crPicSelect" aria-label="${_T("Chọn tranh tô màu", "Pick a picture")}">
            ${SVG_COLORING_PICTURES.map((p, idx) => `<option value="${idx}" ${idx === (artState.picIdx % SVG_COLORING_PICTURES.length) ? "selected" : ""}>${p.icon} ${_T(p.titleVi, p.titleEn)}</option>`).join("")}
          </select>
        </div>

        <div class="cr-coloring-row">
          <div style="text-align:center">
            <h3 role="button" tabindex="0" onclick="say('${pic.titleVi}', '${pic.titleEn}')" style="margin:0 0 6px;font-size:20px;color:#1e293b;cursor:pointer" title="${_T("Bấm để nghe tên tranh", "Tap to hear title")}">🔊 ${pic.icon} ${_T(pic.titleVi, pic.titleEn)} <small style="font-size:13px;color:#64748b;font-weight:700">(${_T("Bé kéo ngón tay để tô màu nhé!", "Drag your finger to color!")})</small></h3>
            <div id="crSvgCanvas" style="position:relative;width:min(86vw,350px);aspect-ratio:1/1;margin:0 auto;background:#ffffff;border:4px solid #bae6fd;border-radius:24px;box-shadow:0 8px 20px rgba(2,132,199,0.14);overflow:hidden;touch-action:none;user-select:none">
              <img src="${pic.imgSrc}" alt="${pic.titleVi}" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;z-index:1;background:#ffffff" />
              <canvas id="crHandColorCanvas" width="350" height="350" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;mix-blend-mode:multiply;cursor:crosshair;touch-action:none"></canvas>
            </div>
          </div>

          <div class="cr-coloring-side">
            <div style="display:flex;align-items:center;justify-content:space-between;width:100%;max-width:420px;flex-wrap:wrap;gap:6px">
              <span style="font-weight:800;color:#334155;font-size:15px">${_T("Bút sáp màu & cỡ cọ:", "Crayon color & brush size:")}</span>
              <div class="cr-active-color-badge" id="crActiveColorBadge">
                <span>🖍️</span>
                <span class="cr-active-color-dot" id="crActiveColorDot" style="background:${artState.isEraser ? '#ffffff' : artState.activeHex}"></span>
                <strong id="crActiveColorText">${artState.isEraser ? _T("Cục tẩy trắng", "Eraser") : _T(COLOR_PALETTE.find(c => c.hex === artState.activeHex)?.vi || "Màu đỏ", COLOR_PALETTE.find(c => c.hex === artState.activeHex)?.en || "Red")}</strong>
              </div>
            </div>
            <div class="cr-swatches-grid">
              ${COLOR_PALETTE.map(col => {
                const isSelected = (!artState.isEraser && col.hex === artState.activeHex) || (artState.isEraser && col.isEraser);
                return `
                <button type="button" class="cr-color-swatch ${isSelected ? 'on' : ''}" data-hex="${col.hex}" data-eraser="${col.isEraser ? '1' : '0'}" data-vi="${col.vi}" data-en="${col.en}" aria-label="${col.vi}" title="${col.vi} (${col.en})"
                  style="background:${col.hex};border:${isSelected ? (col.isEraser ? '4px solid #0284c7' : '4px solid #ffffff') : (col.isEraser ? '3px solid #cbd5e1' : '2px solid rgba(0,0,0,0.15)')};display:flex;align-items:center;justify-content:center;cursor:pointer">
                  ${col.isEraser ? "🧼" : ""}
                </button>`;
              }).join("")}
            </div>

            <div class="chips" style="margin:2px 0;gap:8px;align-items:center;flex-wrap:wrap">
              ${[
                { sz: 10, label: _T("Cọ nhỏ", "Small"), dot: 10 },
                { sz: 18, label: _T("Cọ vừa", "Medium"), dot: 16 },
                { sz: 28, label: _T("Cọ to", "Large"), dot: 22 }
              ].map(b => `
                <button type="button" class="pill cr-brush-btn ${(!artState.isEraser && artState.brushSize === b.sz) ? 'on' : ''}" data-sz="${b.sz}" style="min-height:46px;padding:6px 12px;font-weight:800;display:inline-flex;align-items:center;gap:6px">
                  <span style="width:${b.dot}px;height:${b.dot}px;border-radius:50%;background:currentColor;display:inline-block"></span> ${b.label}
                </button>
              `).join("")}
              <button type="button" class="pill cr-eraser-btn ${artState.isEraser ? 'on' : ''}" id="crEraserBtn" style="min-height:46px;padding:6px 14px;font-weight:800;display:inline-flex;align-items:center;gap:6px">
                🧼 ${_T("Cục tẩy", "Eraser")}
              </button>
            </div>

            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:4px">
              <button type="button" class="pill" id="crUndoColorBtn" style="min-height:54px;padding:8px 14px;font-weight:800">↩️ ${_T("Hoàn tác", "Undo")}</button>
              <button type="button" class="pill" id="crClearColorBtn" style="min-height:54px;padding:8px 14px;font-weight:800;background:#fee2e2;color:#991b1b;border-color:#fca5a5">🧹 ${_T("Tô lại", "Clear")}</button>
              <button type="button" class="pill" id="crNextPicBtn" style="min-height:54px;padding:8px 14px;font-weight:800">🔄 ${_T("Tranh khác", "Next")}</button>
              <button type="button" class="pill on" id="crDoneColorBtn" style="min-height:54px;padding:8px 20px;font-weight:900;background:#16a34a;color:#fff;border-color:#15803d">✔ ${_T("Xong rồi!", "All Done!")}</button>
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
        ctx.lineWidth = st.size || 18;
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
            strokes = saved.strokes;
            redrawAllStrokes();
            banner.style.display = "none";
            _sfxTing();
          };
        }
      }
    });

    if (cv) {
      const getPt = (e) => {
        const r = cv.getBoundingClientRect();
        const p = e.touches && e.touches[0] ? e.touches[0] : e;
        return {
          x: Math.round(((p.clientX - r.left) / (r.width || 350)) * cv.width),
          y: Math.round(((p.clientY - r.top) / (r.height || 350)) * cv.height)
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
      };

      const moveDraw = (e) => {
        if (!currentStroke) return;
        if (e.cancelable) e.preventDefault();
        const pt = getPt(e);
        const last = currentStroke.points[currentStroke.points.length - 1];
        if (Math.hypot(pt.x - last.x, pt.y - last.y) < 3) return;
        currentStroke.points.push(pt);
        redrawAllStrokes();
      };

      const endDraw = () => {
        if (!currentStroke) return;
        currentStroke = null;
        scheduleAutosave();
      };

      cv.addEventListener("mousedown", startDraw);
      cv.addEventListener("mousemove", moveDraw);
      window.addEventListener("mouseup", endDraw);
      cv.addEventListener("touchstart", startDraw, { passive: false });
      cv.addEventListener("touchmove", moveDraw, { passive: false });
      cv.addEventListener("touchend", endDraw);
    }

    const picSel = wrap.querySelector("#crPicSelect");
    if (picSel) [picSel].forEach(btn => {
      btn.addEventListener("change", () => {
        const idx = parseInt(btn.value, 10);
        if (!isNaN(idx)) {
          saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
          artState.picIdx = idx;
          _sfxTap();
          renderSvgColoringStudio();
        }
      });
    });

    function updateColorSwatchUI(selectedBtn) {
      artState.isEraser = false;
      artState.activeHex = selectedBtn.dataset.hex;
      const eraserBtn = wrap.querySelector("#crEraserBtn");
      if (eraserBtn) eraserBtn.classList.remove("on");

      wrap.querySelectorAll(".cr-color-swatch").forEach(b => {
        const isSel = (b === selectedBtn);
        b.classList.toggle("on", isSel);
        b.style.border = isSel ? "4px solid #ffffff" : "2px solid rgba(0,0,0,0.15)";
      });
      const badgeText = wrap.querySelector("#crActiveColorText");
      const badgeDot = wrap.querySelector("#crActiveColorDot");
      if (badgeText) {
        badgeText.textContent = _T(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
      if (badgeDot) {
        badgeDot.style.background = selectedBtn.dataset.hex;
      }
      wrap.querySelectorAll(".cr-brush-btn span").forEach(sp => {
        sp.style.background = artState.activeHex;
      });
    }

    wrap.querySelectorAll(".cr-color-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        updateColorSwatchUI(btn);
        _sfxTap();
      });
    });

    const eraserBtn = wrap.querySelector("#crEraserBtn");
    if (eraserBtn) {
      eraserBtn.addEventListener("click", () => {
        artState.isEraser = true;
        eraserBtn.classList.add("on");
        wrap.querySelectorAll(".cr-color-swatch").forEach(b => {
          b.classList.remove("on");
          b.style.border = "2px solid rgba(0,0,0,0.15)";
        });
        const badgeText = wrap.querySelector("#crActiveColorText");
        const badgeDot = wrap.querySelector("#crActiveColorDot");
        if (badgeText) badgeText.textContent = _T("Cục tẩy trắng", "Eraser");
        if (badgeDot) badgeDot.style.background = "#ffffff";
        wrap.querySelectorAll(".cr-brush-btn span").forEach(sp => {
          sp.style.background = "#64748b";
        });
        _sfxTap();
      });
    }

    wrap.querySelectorAll(".cr-brush-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        artState.brushSize = parseInt(btn.dataset.sz, 10) || 18;
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

    const nextBtn = wrap.querySelector("#crNextPicBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        saveDrawingRecord({ id: saveId, type: "freehand_color", picId: pic.id, strokes: [...strokes] });
        artState.picIdx = (artState.picIdx + 1) % SVG_COLORING_PICTURES.length;
        renderSvgColoringStudio();
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

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Bút phát sáng", "Glow Pen"), i: "✨" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crGlowWrap">
        <div class="rv-top-bar">
          <div class="chips" style="margin:0">
            <button type="button" class="pill" onclick="window.artStudioGame('color')" style="min-height:48px;font-weight:800">🖍️ ${_T("Tô màu bằng tay", "Hand Coloring")}</button>
            <button type="button" class="pill on" onclick="window.artStudioGame('glow')" style="min-height:48px;font-weight:800">✨ ${_T("Bút phát sáng", "Glow Pen")}</button>
          </div>
          ${renderCreativeHeaderBadge(artState.round)}
        </div>

        <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">
          <canvas id="crGlowCanvas" width="320" height="270" style="width:min(84vw,350px);height:auto;background:#0f172a;border:4px solid #38bdf8;border-radius:26px;touch-action:none;box-shadow:0 8px 24px rgba(15,23,42,0.45)"></canvas>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:center;max-width:420px">
            <div class="cr-active-glow-badge" id="crActiveGlowBadge">
              <span>✨</span>
              <span class="cr-active-glow-dot" id="crActiveGlowDot" style="background:${artState.activeHex};box-shadow:0 0 10px ${artState.activeHex}"></span>
              <strong id="crActiveGlowText">${_T(COLOR_PALETTE.find(c => c.hex === artState.activeHex)?.vi || "Màu đỏ", COLOR_PALETTE.find(c => c.hex === artState.activeHex)?.en || "Red")}</strong>
            </div>
            <div class="cr-glow-swatches-grid">
              ${COLOR_PALETTE.map(col => {
                const isSelected = (col.hex === artState.activeHex);
                return `
                <button type="button" class="cr-glow-swatch ${isSelected ? 'on' : ''}" data-hex="${col.hex}" data-vi="${col.vi}" data-en="${col.en}" aria-label="${col.vi}" title="${col.vi} (${col.en})"
                  style="background:${col.hex};border:${isSelected ? '4px solid #ffffff' : '3px solid #334155'};box-shadow:0 0 ${isSelected ? '16px' : '6px'} ${col.hex};display:flex;align-items:center;justify-content:center;cursor:pointer">
                </button>`;
              }).join("")}
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:6px">
              <button type="button" class="pill" id="crGlowClearBtn" style="min-height:64px;min-width:110px;font-weight:800;background:#fee2e2;color:#991b1b;border-color:#fca5a5">🧹 ${_T("Xóa bảng", "Clear")}</button>
              <button type="button" class="pill on" id="crGlowDoneBtn" style="min-height:64px;min-width:120px;font-weight:900;background:#16a34a;color:#fff;border-color:#15803d">✔ ${_T("Xong", "Done")}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    _catSet("happy");

    const wrap = c.querySelector("#crGlowWrap");
    const cv = c.querySelector("#crGlowCanvas");
    if (!wrap || !cv) return;
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
        ctx.shadowBlur = 14;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.lineWidth = 2.5;
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

    function getCanvasPt(e) {
      const r = cv.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return {
        x: Math.round(((p.clientX - r.left) / (r.width || 320)) * cv.width),
        y: Math.round(((p.clientY - r.top) / (r.height || 270)) * cv.height)
      };
    }

    function onStart(e) {
      if (e.cancelable) e.preventDefault();
      const pt = getCanvasPt(e);
      currentStroke = { color: artState.activeHex, points: [pt] };
      strokes.push(currentStroke);
      totalPoints++;
    }

    function onMove(e) {
      if (!currentStroke) return;
      if (e.cancelable) e.preventDefault();
      const pt = getCanvasPt(e);
      const last = currentStroke.points[currentStroke.points.length - 1];
      if (Math.hypot(pt.x - last.x, pt.y - last.y) < 5) return;
      currentStroke.points.push(pt);
      totalPoints++;
      // Giới hạn số điểm để máy yếu luôn mượt
      while (totalPoints > MAX_GLOW_POINTS && strokes.length > 1) {
        const removed = strokes.shift();
        totalPoints -= (removed.points ? removed.points.length : 0);
      }
      redrawGlow();
    }

    function onEnd() {
      if (!currentStroke) return;
      currentStroke = null;
      saveDrawingRecord({ id: "glow_pen_latest", type: "glow_pen", strokes });
    }

    cv.addEventListener("mousedown", onStart);
    cv.addEventListener("mousemove", onMove);
    cv.addEventListener("mouseup", onEnd);
    cv.addEventListener("touchstart", onStart, { passive: false });
    cv.addEventListener("touchmove", onMove, { passive: false });
    cv.addEventListener("touchend", onEnd);

    function updateGlowSwatchUI(selectedBtn) {
      artState.activeHex = selectedBtn.dataset.hex;
      wrap.querySelectorAll(".cr-glow-swatch").forEach(b => {
        const isSel = (b === selectedBtn);
        b.classList.toggle("on", isSel);
        b.style.border = isSel ? "4px solid #ffffff" : "3px solid #334155";
        b.style.boxShadow = isSel ? `0 0 18px ${b.dataset.hex}` : `0 0 6px ${b.dataset.hex}`;
      });
      const badgeText = wrap.querySelector("#crActiveGlowText");
      const badgeDot = wrap.querySelector("#crActiveGlowDot");
      if (badgeText) {
        badgeText.textContent = _T(selectedBtn.dataset.vi, selectedBtn.dataset.en);
      }
      if (badgeDot) {
        badgeDot.style.background = selectedBtn.dataset.hex;
        badgeDot.style.boxShadow = `0 0 10px ${selectedBtn.dataset.hex}`;
      }
    }

    wrap.querySelectorAll(".cr-glow-swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        updateGlowSwatchUI(btn);
        _sfxTap();
      });
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

  // ============================================================================
  // BƯỚC 3: NỐI CHẤM THEO SỐ (1..N) VÀ TỰ VẼ CHO BÉ XEM (connectDotsGame)
  // Dữ liệu tọa độ chấm lưu dạng cấu hình độc lập
  // ============================================================================
  const CONNECT_DOT_SHAPES = [
    {
      id: "star5",
      nameVi: "Ngôi sao vàng",
      nameEn: "Golden Star",
      fill: "#facc15",
      stroke: "#ca8a04",
      points: [
        { x: 150, y: 30 }, { x: 185, y: 105 }, { x: 265, y: 115 }, { x: 205, y: 170 }, { x: 222, y: 250 },
        { x: 150, y: 210 }, { x: 78, y: 250 }, { x: 95, y: 170 }, { x: 35, y: 115 }, { x: 115, y: 105 }
      ]
    },
    {
      id: "house6",
      nameVi: "Ngôi nhà ấm áp",
      nameEn: "Cozy House",
      fill: "#fb7185",
      stroke: "#be123c",
      points: [
        { x: 150, y: 35 }, { x: 255, y: 115 }, { x: 230, y: 115 }, { x: 230, y: 245 },
        { x: 70, y: 245 }, { x: 70, y: 115 }, { x: 45, y: 115 }
      ]
    },
    {
      id: " sailboat",
      nameVi: "Chiếc thuyền buồm",
      nameEn: "Sailboat",
      fill: "#38bdf8",
      stroke: "#0284c7",
      points: [
        { x: 150, y: 35 }, { x: 235, y: 170 }, { x: 150, y: 170 }, { x: 250, y: 190 },
        { x: 215, y: 245 }, { x: 85, y: 245 }, { x: 50, y: 190 }, { x: 75, y: 170 }
      ]
    },
    {
      id: "crown",
      nameVi: "Vương miện công chúa",
      nameEn: "Princess Crown",
      fill: "#c084fc",
      stroke: "#7e22ce",
      points: [
        { x: 50, y: 220 }, { x: 40, y: 95 }, { x: 105, y: 150 }, { x: 150, y: 65 },
        { x: 195, y: 150 }, { x: 260, y: 95 }, { x: 250, y: 220 }
      ]
    }
  ];

  let dotsState = { shapeIdx: 0, round: 1, autoTimer: null };

  function connectDotsGame(isReplay) {
    if (dotsState.autoTimer) {
      clearInterval(dotsState.autoTimer);
      dotsState.autoTimer = null;
    }
    const c = getContainer();
    if (!c) return;

    const shape = CONNECT_DOT_SHAPES[dotsState.shapeIdx % CONNECT_DOT_SHAPES.length];
    const maxRange = getParentMaxNumber();
    // N mặc định 5..10 tùy cài đặt khoảng số
    const pts = maxRange <= 5 ? shape.points.slice(0, 5) : shape.points;
    let currentIdx = 0;
    let completed = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Nối chấm theo số & Tự vẽ", "Connect Dots & Auto-Draw"), i: "🔢" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crDotsWrap">
        <div class="rv-top-bar">
          <h2 class="rv-prompt" onclick="say('Nối chấm kỳ diệu! Bé hãy bắt đầu từ chấm số 1 nhé!','Tap the numbered dots in order!')">
            🔊 ${_T("Chạm nối chấm theo thứ tự số 1 → " + pts.length, "Tap dots in order 1 → " + pts.length)}
          </h2>
          ${renderCreativeHeaderBadge(dotsState.round)}
        </div>

        <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap">
          <svg id="crDotsSvg" viewBox="0 0 300 280" style="width:min(84vw,340px);height:auto;background:#ffffff;border:4px solid #c084fc;border-radius:28px;box-shadow:0 8px 20px rgba(126,34,206,0.12)">
            <polygon id="crDotsFillPoly" points="${pts.map(p => `${p.x},${p.y}`).join(" ")}" fill="${shape.fill}" stroke="${shape.stroke}" stroke-width="5" stroke-linejoin="round" style="opacity:0;transition:opacity .45s ease"/>
            <polyline id="crDotsLine" points="" fill="none" stroke="${shape.stroke}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            ${pts.map((p, idx) => `
              <g class="cr-dot-node" data-idx="${idx}" style="cursor:pointer">
                <circle cx="${p.x}" cy="${p.y}" r="22" fill="${idx === 0 ? '#fde047' : '#f3e8ff'}" stroke="#7e22ce" stroke-width="3.5"/>
                <text x="${p.x}" y="${p.y + 6}" text-anchor="middle" font-size="18" font-weight="900" fill="#4c1d95">${idx + 1}</text>
              </g>
            `).join("")}
          </svg>

          <div style="display:flex;flex-direction:column;gap:10px;max-width:260px">
            <button type="button" class="pill on" id="crAutoDrawBtn" style="min-height:64px;font-weight:800;background:#8b5cf6;color:#fff">🎬 ${_T("Tự vẽ cho bé xem", "Auto-Draw for Me")}</button>
            <button type="button" class="pill" id="crNextShapeBtn" style="min-height:64px;font-weight:800">🔄 ${_T("Đổi hình khác", "Next Shape")}</button>
          </div>
        </div>
      </div>
    `;

    _say("Nối chấm kỳ diệu! Bé hãy bắt đầu từ chấm số 1 nhé!", "Connect the dots! Tap number 1 first!");
    _catSet("thinking");

    const wrap = c.querySelector("#crDotsWrap");
    if (!wrap) return;
    const polyLine = wrap.querySelector("#crDotsLine");
    const fillPoly = wrap.querySelector("#crDotsFillPoly");
    const nodes = Array.from(wrap.querySelectorAll(".cr-dot-node"));

    function activateDot(idx) {
      if (completed || idx !== currentIdx) {
        // Nhấp nháy gợi ý chấm đúng tiếp theo
        const rightNode = nodes[currentIdx];
        if (rightNode) {
          const cir = rightNode.querySelector("circle");
          if (cir) {
            cir.setAttribute("fill", "#facc15");
            cir.setAttribute("r", "26");
            setTimeout(() => cir.setAttribute("r", "22"), 350);
          }
        }
        _sfxNo();
        _say(`Bé ơi, tìm chấm số ${currentIdx + 1} đang nhấp nháy kìa!`, `Tap number ${currentIdx + 1}!`);
        return;
      }

      const node = nodes[idx];
      const cir = node ? node.querySelector("circle") : null;
      if (cir) cir.setAttribute("fill", "#4ade80");

      currentIdx++;
      const connectedPts = pts.slice(0, currentIdx).map(p => `${p.x},${p.y}`);
      if (currentIdx === pts.length) {
        connectedPts.push(`${pts[0].x},${pts[0].y}`);
      }
      if (polyLine) polyLine.setAttribute("points", connectedPts.join(" "));

      // Đếm số bằng giọng đọc
      if (typeof window !== "undefined" && typeof window.sayN === "function") {
        window.sayN(currentIdx);
      } else {
        _say(String(currentIdx), String(currentIdx));
      }
      _sfxTap();

      if (currentIdx < pts.length && nodes[currentIdx]) {
        const nextCir = nodes[currentIdx].querySelector("circle");
        if (nextCir) nextCir.setAttribute("fill", "#fde047");
      }

      if (currentIdx >= pts.length) {
        completed = true;
        if (fillPoly) fillPoly.style.opacity = "1";
        _sfxTing();
        _fx();
        _catSet("celebrate");
        setTimeout(() => {
          _say(`Wow! Hiện ra hình ${shape.nameVi} xinh xắn quá!`, `Hooray! A ${shape.nameEn}!`);
        }, 400);
        setTimeout(() => {
          dotsState.round++;
          dotsState.shapeIdx = (dotsState.shapeIdx + 1) % CONNECT_DOT_SHAPES.length;
          finishRoundAndContinue(() => connectDotsGame(false), "vi.math.order");
        }, 1600);
      }
    }

    nodes.forEach((node, idx) => {
      node.addEventListener("click", () => activateDot(idx));
    });

    const autoBtn = wrap.querySelector("#crAutoDrawBtn");
    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        if (completed) return;
        if (dotsState.autoTimer) clearInterval(dotsState.autoTimer);
        _say("Ngồi yên nhé, bút thần sẽ tự động nối chấm và tô màu cho bé xem!", "Watch the magic pen draw and color!");
        dotsState.autoTimer = setInterval(() => {
          if (currentIdx < pts.length) {
            activateDot(currentIdx);
          } else {
            clearInterval(dotsState.autoTimer);
            dotsState.autoTimer = null;
          }
        }, 550);
      });
    }

    const nextShapeBtn = wrap.querySelector("#crNextShapeBtn");
    if (nextShapeBtn) {
      nextShapeBtn.addEventListener("click", () => {
        dotsState.shapeIdx = (dotsState.shapeIdx + 1) % CONNECT_DOT_SHAPES.length;
        connectDotsGame(false);
      });
    }
  }

  // ============================================================================
  // BƯỚC 4: VẼ THEO TRÍ NHỚ & HỌC VẼ TỪNG BƯỚC (memoryStepDrawGame)
  // ============================================================================
  const MEMORY_STEP_SHAPES = [
    {
      id: "circle",
      nameVi: "Hình tròn",
      nameEn: "Circle",
      steps: [
        "M 150,45 A 85,85 0 1,1 149.9,45"
      ],
      checkpoints: [
        { x: 150, y: 45 }, { x: 235, y: 130 }, { x: 150, y: 215 }, { x: 65, y: 130 }
      ]
    },
    {
      id: "triangle",
      nameVi: "Hình tam giác",
      nameEn: "Triangle",
      steps: [
        "M 150,45 L 70,210",
        "M 70,210 L 230,210",
        "M 230,210 L 150,45"
      ],
      checkpoints: [
        { x: 150, y: 45 }, { x: 70, y: 210 }, { x: 230, y: 210 }
      ]
    },
    {
      id: "square",
      nameVi: "Hình vuông",
      nameEn: "Square",
      steps: [
        "M 75,55 L 225,55",
        "M 225,55 L 225,205",
        "M 225,205 L 75,205",
        "M 75,205 L 75,55"
      ],
      checkpoints: [
        { x: 75, y: 55 }, { x: 225, y: 55 }, { x: 225, y: 205 }, { x: 75, y: 205 }
      ]
    }
  ];

  let memDrawState = { idx: 0, round: 1, subMode: "memory" };

  function memoryStepDrawGame(forcedSubMode) {
    if (forcedSubMode === "memory" || forcedSubMode === "step") {
      memDrawState.subMode = forcedSubMode;
    }
    const c = getContainer();
    if (!c) return;

    const item = MEMORY_STEP_SHAPES[memDrawState.idx % MEMORY_STEP_SHAPES.length];
    let stepProgress = 0;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Vẽ trí nhớ & Vẽ từng bước", "Memory & Step Drawing"), i: "✍️" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crMemDrawWrap">
        <div class="rv-top-bar">
          <div class="chips" style="margin:0">
            <button type="button" class="pill ${memDrawState.subMode === 'memory' ? 'on' : ''}" onclick="window.memoryStepDrawGame('memory')" style="min-height:48px;font-weight:800">🧠 ${_T("Vẽ theo trí nhớ", "Memory Draw")}</button>
            <button type="button" class="pill ${memDrawState.subMode === 'step' ? 'on' : ''}" onclick="window.memoryStepDrawGame('step')" style="min-height:48px;font-weight:800">👣 ${_T("Học vẽ từng bước", "Step-by-Step")}</button>
          </div>
          ${renderCreativeHeaderBadge(memDrawState.round)}
        </div>

        <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap">
          <div style="position:relative;width:300px;height:260px;background:#fff;border:4px solid #38bdf8;border-radius:26px;overflow:hidden;touch-action:none">
            <svg id="crGuideSvg" viewBox="0 0 300 260" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;transition:opacity .4s">
              ${item.steps.map((d, si) => `
                <path class="cr-step-path" data-si="${si}" d="${d}" fill="none" stroke="#94a3b8" stroke-width="10" stroke-dasharray="12 10" stroke-linecap="round" style="opacity:${memDrawState.subMode === 'memory' || si === 0 ? '1' : '0.15'}"/>
              `).join("")}
            </svg>
            <canvas id="crMemCanvas" width="300" height="260" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;max-width:260px">
            <div style="font-size:18px;font-weight:900;color:#0369a1">🎯 ${_T(item.nameVi, item.nameEn)}</div>
            <button type="button" class="pill" id="crPeekBtn" style="min-height:64px;font-weight:800;background:#e0f2fe;color:#0369a1">👀 ${_T("Xem lại nét mẫu", "Peek Guide")}</button>
            <button type="button" class="pill on" id="crFinishDrawBtn" style="min-height:64px;font-weight:900;background:#16a34a;color:#fff">✔ ${_T("Bé vẽ xong rồi!", "I'm Done!")}</button>
          </div>
        </div>
      </div>
    `;

    const wrap = c.querySelector("#crMemDrawWrap");
    const guideSvg = c.querySelector("#crGuideSvg");
    const cv = c.querySelector("#crMemCanvas");
    if (!wrap || !cv) return;
    const ctx = cv.getContext ? cv.getContext("2d") : null;
    const userPoints = [];
    let drawing = false;

    if (memDrawState.subMode === "memory") {
      _say(`Thử thách trí nhớ! Bé hãy nhìn kỹ ${item.nameVi} trong 2 giây, sau đó vẽ lại thật giống nhé!`, `Look at the ${item.nameEn} for 2 seconds then draw it from memory!`);
      setTimeout(() => {
        if (guideSvg) guideSvg.style.opacity = "0";
      }, 2400);
    } else {
      _say(`Tập vẽ từng nét! Bé hãy tô theo các nét chấm mờ để tạo thành ${item.nameVi} nhé!`, `Draw ${item.nameEn} step by step!`);
    }

    function getPt(e) {
      const r = cv.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return {
        x: Math.round(((p.clientX - r.left) / (r.width || 300)) * cv.width),
        y: Math.round(((p.clientY - r.top) / (r.height || 260)) * cv.height)
      };
    }

    cv.addEventListener("mousedown", e => {
      drawing = true;
      const pt = getPt(e);
      userPoints.push(pt);
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      }
    });

    cv.addEventListener("mousemove", e => {
      if (!drawing) return;
      const pt = getPt(e);
      userPoints.push(pt);
      if (ctx) {
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    });

    cv.addEventListener("mouseup", () => {
      drawing = false;
      if (memDrawState.subMode === "step") {
        stepProgress = Math.min(item.steps.length - 1, stepProgress + 1);
        wrap.querySelectorAll(".cr-step-path").forEach((p, idx) => {
          if (idx <= stepProgress) p.style.opacity = "1";
        });
      }
    });

    cv.addEventListener("touchstart", e => {
      if (e.cancelable) e.preventDefault();
      drawing = true;
      const pt = getPt(e);
      userPoints.push(pt);
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      }
    }, { passive: false });

    cv.addEventListener("touchmove", e => {
      if (!drawing) return;
      if (e.cancelable) e.preventDefault();
      const pt = getPt(e);
      userPoints.push(pt);
      if (ctx) {
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }, { passive: false });

    cv.addEventListener("touchend", () => {
      drawing = false;
      if (memDrawState.subMode === "step") {
        stepProgress = Math.min(item.steps.length - 1, stepProgress + 1);
        wrap.querySelectorAll(".cr-step-path").forEach((p, idx) => {
          if (idx <= stepProgress) p.style.opacity = "1";
        });
      }
    });

    const peekBtn = wrap.querySelector("#crPeekBtn");
    if (peekBtn) {
      peekBtn.addEventListener("click", () => {
        if (guideSvg) {
          guideSvg.style.opacity = "1";
          if (memDrawState.subMode === "memory") {
            setTimeout(() => { if (guideSvg) guideSvg.style.opacity = "0"; }, 2200);
          }
        }
        _sfxTap();
      });
    }

    const finBtn = wrap.querySelector("#crFinishDrawBtn");
    if (finBtn) {
      finBtn.addEventListener("click", () => {
        // Dung sai rộng, luôn khen bé, không bao giờ trừ điểm
        if (guideSvg) guideSvg.style.opacity = "1";
        _sfxTing();
        _fx();
        _catSet("celebrate");
        _say(`Tuyệt cú mèo! Bé vẽ ${item.nameVi} khéo léo quá!`, `Wonderful ${item.nameEn}!`);
        setTimeout(() => {
          memDrawState.round++;
          memDrawState.idx = (memDrawState.idx + 1) % MEMORY_STEP_SHAPES.length;
          finishRoundAndContinue(() => memoryStepDrawGame(), "vi.trace.strokes");
        }, 800);
      });
    }
  }

  // ============================================================================
  // BƯỚC 5: KHUNG MƯỜI Ô (2×5 TEN-FRAME) & GỘP NHÓM ĐỒ VẬT (tenFrameGame)
  // ============================================================================
  let tfState = { round: 1 };

  function tenFrameGame(isReplay) {
    if (isReplay) tfState.round = 1;
    const c = getContainer();
    if (!c) return;

    const maxAllowed = Math.min(10, getParentMaxNumber());
    const initialDots = _R(1, Math.max(2, maxAllowed - 2));
    const targetDots = _R(initialDots + 1, maxAllowed);
    const needMore = targetDots - initialDots;
    let currentDots = initialDots;
    let completed = false;

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Khung Mười Ô (2×5)", "Ten-Frame (2×5)"), i: "🔟" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crTenFrameWrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('Bé hãy thêm vào cho đủ ${targetDots} quả táo nhé!','Tap empty cells until there are ${targetDots} apples!')">
            🔊 ${_T(`Đặt thêm táo vào khung 2×5 cho đủ ${targetDots} (Đang có ${initialDots} + thêm ${needMore} 🍎)`, `Fill the 2×5 frame to make ${targetDots} apples (${initialDots} + ${needMore} 🍎)`)}
          </div>
          ${renderCreativeHeaderBadge(tfState.round)}
        </div>

        <div id="crTenFrameGrid" style="display:grid;grid-template-columns:repeat(5,minmax(64px,82px));gap:12px;justify-content:center;margin:14px auto;background:#fff;padding:16px;border-radius:26px;border:4px solid #38bdf8;box-shadow:0 8px 20px rgba(2,132,199,0.12)">
          ${Array.from({ length: 10 }, (_, idx) => {
            const filled = idx < initialDots;
            return `
              <button type="button" class="cr-tf-cell ${filled ? 'filled locked' : ''}" data-idx="${idx}" aria-label="Ô ${idx + 1}"
                style="min-width:64px;min-height:64px;aspect-ratio:1;border-radius:18px;border:3px dashed ${filled ? '#16a34a' : '#94a3b8'};background:${filled ? '#dcfce7' : '#f8fafc'};font-size:36px;cursor:pointer;display:flex;align-items:center;justify-content:center">
                ${filled ? "🍎" : ""}
              </button>
            `;
          }).join("")}
        </div>

        <div style="text-align:center;font-size:22px;font-weight:900;color:#0369a1" id="crTfCounter">
          🍎 ${_T("Số lượng hiện tại:", "Current count:")} <span id="crTfCountVal">${currentDots}</span> / ${targetDots}
        </div>
      </div>
    `;

    _say(`Bé hãy thêm vào cho đủ ${targetDots} quả táo nhé!`, `There are ${initialDots} apples. Tap empty cells to make ${targetDots}!`);
    _catSet("thinking");

    const wrap = c.querySelector("#crTenFrameWrap");
    if (!wrap) return;
    const countValEl = wrap.querySelector("#crTfCountVal");

    wrap.querySelectorAll(".cr-tf-cell").forEach(cell => {
      cell.addEventListener("click", () => {
        if (completed || cell.classList.contains("locked")) return;
        if (!cell.classList.contains("filled")) {
          cell.classList.add("filled");
          cell.textContent = "🍎";
          cell.style.background = "#fef9c3";
          cell.style.borderColor = "#eab308";
          currentDots++;
        } else {
          cell.classList.remove("filled");
          cell.textContent = "";
          cell.style.background = "#f8fafc";
          cell.style.borderColor = "#94a3b8";
          currentDots--;
        }

        if (countValEl) countValEl.textContent = String(currentDots);
        if (typeof window !== "undefined" && typeof window.sayN === "function") {
          window.sayN(currentDots);
        } else {
          _say(String(currentDots), String(currentDots));
        }

        if (currentDots === targetDots) {
          completed = true;
          _sfxTing();
          _fx();
          _catSet("celebrate");
          setTimeout(() => {
            _say(`Giỏi quá! Đã đủ ${targetDots} quả táo rồi!`, `Great job! ${initialDots} plus ${needMore} makes ${targetDots}!`);
          }, 450);
          setTimeout(() => {
            tfState.round++;
            finishRoundAndContinue(() => tenFrameGame(false), "math.addsub.within10");
          }, 1500);
        }
      });
    });
  }

  // ============================================================================
  // BƯỚC 7: NỐI CẶP GIỐNG NHAU LƯỚI 2×2 / 3×2 CÓ HOÀN TÁC & GỢI Ý (pairLinkGridGame)
  // ============================================================================
  const PAIR_LINK_ITEMS = [
    { id: "apple", label: "🍎", vi: "Quả táo", en: "Apple" },
    { id: "star", label: "⭐", vi: "Ngôi sao", en: "Star" },
    { id: "cat", label: "🐱", vi: "Chú mèo", en: "Cat" },
    { id: "duck", label: "🐥", vi: "Vịt con", en: "Duckling" },
    { id: "num3", label: "3", vi: "Số ba", en: "Number three" },
    { id: "letA", label: "A", vi: "Chữ A", en: "Letter A" }
  ];

  let plState = { round: 1 };

  function pairLinkGridGame(isReplay) {
    if (isReplay) plState.round = 1;
    const c = getContainer();
    if (!c) return;

    // Bắt đầu lưới 2×2 ở lượt 1, sau đó 3×2 (luôn đảm bảo giải được 100%, không thẻ lẻ)
    const pairCount = plState.round === 1 ? 2 : 3;
    const chosen = _shuf(PAIR_LINK_ITEMS).slice(0, pairCount);
    const deck = _shuf([...chosen, ...chosen].map((it, idx) => ({ ...it, uid: "pl_" + idx })));

    let selectedBtn = null;
    const matchedHistory = []; // lưu lịch sử các cặp đã nối để hỗ trợ nút Hoàn tác (Undo)

    const bcHtml = _kbc([
      { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
      { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
      { t: _T("Nối cặp giống nhau", "Pair Link Grid"), i: "🔗" }
    ]);

    c.innerHTML = `
      ${bcHtml}
      <div class="rv-game-wrap" id="crPairLinkWrap">
        <div class="rv-top-bar">
          <div class="rv-ribbon-blue" onclick="say('Tìm đôi bạn thân! Bé hãy nối hai ô có hình giống hệt nhau nhé!','Connect two matching tiles!')">
            🔊 ${_T("Nối hai ô giống nhau trên lưới!", "Connect two identical tiles!")}
          </div>
          ${renderCreativeHeaderBadge(plState.round)}
        </div>

        <div style="display:flex;justify-content:center;gap:12px;margin:4px 0">
          <button type="button" class="pill" id="crPairUndoBtn" style="min-height:54px;padding:6px 16px;font-weight:800">↩️ ${_T("Hoàn tác", "Undo")}</button>
          <button type="button" class="pill" id="crPairHintBtn" style="min-height:54px;padding:6px 16px;font-weight:800;background:#fef9c3;color:#854d0e;border-color:#facc15">💡 ${_T("Gợi ý một cặp", "Hint")}</button>
        </div>

        <div id="crPairGrid" style="display:grid;grid-template-columns:repeat(${pairCount},minmax(90px,130px));gap:16px;justify-content:center;margin:10px auto">
          ${deck.map(card => `
            <button type="button" class="cr-pair-tile" data-id="${card.id}" data-uid="${card.uid}" data-vi="${card.vi}" data-en="${card.en}"
              style="min-width:88px;min-height:88px;border-radius:24px;border:4px solid #cbd5e1;background:#ffffff;font-size:44px;font-weight:900;color:#1e293b;cursor:pointer;box-shadow:0 6px 14px rgba(0,0,0,0.08);transition:all .2s">
              ${card.label}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    _say("Tìm đôi bạn thân! Bé hãy nối hai ô có hình giống hệt nhau nhé!", "Tap two matching tiles to connect them!");
    _catSet("thinking");

    const wrap = c.querySelector("#crPairLinkWrap");
    if (!wrap) return;
    const tiles = Array.from(wrap.querySelectorAll(".cr-pair-tile"));

    function checkAllCleared() {
      const remaining = tiles.filter(t => !t.classList.contains("matched"));
      if (remaining.length === 0) {
        _sfxTing();
        _fx();
        _catSet("celebrate");
        _say("Hoan hô! Bé đã tìm ra tất cả các cặp đôi giống nhau!", "Hooray! All pairs connected!");
        setTimeout(() => {
          plState.round++;
          finishRoundAndContinue(() => pairLinkGridGame(false), "vi.logic.pairlink");
        }, 750);
      }
    }

    tiles.forEach(tile => {
      tile.addEventListener("click", () => {
        if (tile.classList.contains("matched")) return;
        _sfxTap();
        if (!selectedBtn) {
          selectedBtn = tile;
          tile.style.borderColor = "#0284c7";
          tile.style.background = "#e0f2fe";
          return;
        }
        if (selectedBtn === tile) {
          tile.style.borderColor = "#cbd5e1";
          tile.style.background = "#ffffff";
          selectedBtn = null;
          return;
        }

        if (selectedBtn.dataset.id === tile.dataset.id) {
          const first = selectedBtn;
          selectedBtn = null;
          first.classList.add("matched");
          tile.classList.add("matched");
          first.style.opacity = "0.2";
          tile.style.opacity = "0.2";
          first.style.borderColor = "#16a34a";
          tile.style.borderColor = "#16a34a";
          matchedHistory.push([first, tile]);
          _sfxOk();
          _say(tile.dataset.vi, tile.dataset.en);
          checkAllCleared();
        } else {
          const prev = selectedBtn;
          selectedBtn = null;
          prev.style.borderColor = "#cbd5e1";
          prev.style.background = "#ffffff";
          _sfxNo();
        }
      });
    });

    const undoBtn = wrap.querySelector("#crPairUndoBtn");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        const lastPair = matchedHistory.pop();
        if (lastPair) {
          lastPair.forEach(t => {
            t.classList.remove("matched");
            t.style.opacity = "1";
            t.style.borderColor = "#cbd5e1";
            t.style.background = "#ffffff";
          });
          _sfxTap();
        }
      });
    }

    const hintBtn = wrap.querySelector("#crPairHintBtn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        const activeTiles = tiles.filter(t => !t.classList.contains("matched"));
        if (activeTiles.length >= 2) {
          const targetId = activeTiles[0].dataset.id;
          const pair = activeTiles.filter(t => t.dataset.id === targetId);
          pair.forEach(t => {
            t.style.borderColor = "#eab308";
            t.style.background = "#fef9c3";
          });
          _sfxTap();
          _say(`Bé nhìn xem, hai ô ${activeTiles[0].dataset.vi} đang mách nước kìa!`, "Look at the glowing pair!");
        }
      });
    }
  }

  const CreativeGames = {
    COLOR_PALETTE,
    SVG_COLORING_PICTURES,
    CONNECT_DOT_SHAPES,
    MEMORY_STEP_SHAPES,
    saveDrawingRecord,
    loadDrawingRecord,
    listSavedDrawings,
    clearAllSavedDrawings,
    artStudioGame,
    connectDotsGame,
    memoryStepDrawGame,
    tenFrameGame,
    pairLinkGridGame
  };

  if (typeof window !== "undefined") {
    window.CreativeGames = CreativeGames;
    window.artStudioGame = artStudioGame;
    window.connectDotsGame = connectDotsGame;
    window.memoryStepDrawGame = memoryStepDrawGame;
    window.tenFrameGame = tenFrameGame;
    window.pairLinkGridGame = pairLinkGridGame;
    window.clearAllSavedDrawings = clearAllSavedDrawings;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.CreativeGames = CreativeGames;
    globalThis.artStudioGame = artStudioGame;
    globalThis.connectDotsGame = connectDotsGame;
    globalThis.memoryStepDrawGame = memoryStepDrawGame;
    globalThis.tenFrameGame = tenFrameGame;
    globalThis.pairLinkGridGame = pairLinkGridGame;
    globalThis.clearAllSavedDrawings = clearAllSavedDrawings;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CreativeGames;
  }
})();
