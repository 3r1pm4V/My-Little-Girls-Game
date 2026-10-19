const I=IMG,m=document.getElementById("m");
const ALT_MAP={
  cat_idle:"Chú mèo con bạn đồng hành",cat_happy:"Chú mèo con vui mừng",cat_sad:"Chú mèo con đang suy nghĩ",
  cat_thinking:"Chú mèo con đang suy nghĩ",cat_celebrate:"Chú mèo con chúc mừng",cat_pointing:"Chú mèo con hướng dẫn",
  apple:"Quả táo",ball:"Quả bóng",star:"Ngôi sao",gstar:"Ngôi sao vàng thưởng điểm",flower:"Bông hoa",
  cat:"Con mèo",dog:"Con chó",donut:"Bánh donut",egg:"Quả trứng",grape:"Chùm nho",orange:"Quả cam",
  mango:"Quả xoài",frog:"Con ếch",gift:"Hộp quà",sun:"Mặt trời",moon:"Mặt trăng",tree:"Cái cây",
  btn_back:"Nút quay lại",btn_next:"Nút tiếp theo",btn_home:"Nút trang chủ",kite:"Con diều",
  rocket:"Tàu tên lửa",pencil:"Bút chì",confetti:"Pháo hoa giấy sắc màu"
};
const im=(n,c="",alt="")=>`<img class="${c}" src="${I[n]}" alt="${alt||ALT_MAP[n]||(OBJ[n]?OBJ[n].vi:n)}" loading="lazy" decoding="async">`;
const imL=(L,c="")=>{if(lang==="vi"&&LET_VI.includes(L))return`<span class="let-vn ${c}">${L}</span>`;const k=lang==="en"?L:(I["vi_"+L]?"vi_"+L:L);return im(k,c,`Chữ cái ${L}`)};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[R(0,a.length-1)];
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const T=(vi,en)=>`<span>${vi}</span><small>${en}</small>`;
const ls={get(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const NV="không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi".split(","),NE="zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty".split(",");
const LV="a,ă,â,b,c,d,đ,e,ê,g,h,i,k,l,m,n,o,ô,ơ,p,q,r,s,t,u,ư,v,x,y".split(",");
const OBJ={};"ant|ant|kiến;apple|apple|quả táo;ball|ball|quả bóng;bear|bear|con gấu;car|car|xe hơi;cat|cat|con mèo;dog|dog|con chó;donut|donut|bánh donut;egg|egg|quả trứng;elephant|elephant|con voi;flower|flower|bông hoa;frog|frog|con ếch;gift|gift|hộp quà;grape|grape|chùm nho;hat|hat|cái mũ;house|house|ngôi nhà;ice_cream|ice cream|cây kem;igloo|igloo|nhà băng;jelly|jelly|thạch;juice|juice|nước ép;key|key|chìa khóa;kite|kite|con diều;leaf|leaf|chiếc lá;lion|lion|sư tử;mango|mango|quả xoài;moon|moon|mặt trăng;nest|nest|tổ chim;notebook|notebook|quyển vở;octopus|octopus|bạch tuộc;orange|orange|quả cam;panda|panda|gấu trúc;pencil|pencil|bút chì;queen|queen|nữ hoàng;quill|quill|bút lông;rainbow|rainbow|cầu vồng;rocket|rocket|tên lửa;star|star|ngôi sao;sun|sun|mặt trời;train|train|tàu hỏa;tree|tree|cái cây;umbrella|umbrella|cái ô;unicorn|unicorn|kỳ lân;vase|vase|bình hoa;volcano|volcano|núi lửa;watermelone|watermelon|dưa hấu;whale|whale|cá voi;x-ray|x-ray|ảnh X-quang;xylophone|xylophone|đàn xylophone;yacht|yacht|du thuyền;yo-yo|yo-yo|yo-yo;zebra|zebra|ngựa vằn;zipper|zipper|khóa kéo".split(";").forEach(s=>{const[k,e,v]=s.split("|");OBJ[k]={en:e,vi:v,L:k[0].toUpperCase()}});
const LET_VI="A,Ă,Â,B,C,D,Đ,E,Ê,G,H,I,K,L,M,N,O,Ô,Ơ,P,Q,R,S,T,U,Ư,V,X,Y".split(",");
const LET_EN="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LET_ALL=()=>lang==="en"?LET_EN:LET_VI;
const LET=LET_VI;
const byL=L=>Object.keys(OBJ).filter(k=>OBJ[k].L===L);
const HARD=new Set(["quill","x-ray","yacht","igloo","jelly"]),NOPLAY="QXYZ",PO=Object.keys(OBJ).filter(k=>!HARD.has(k)&&!NOPLAY.includes(OBJ[k].L)),PL=LET_EN.filter(L=>PO.some(k=>OBJ[k].L===L)),byP=L=>PO.filter(k=>OBJ[k].L===L);
const VT="A|k_cherry|anh đào;B|ball|bóng;B|k_cow|bò;B|k_doll|búp bê;B|k_pen|bút;C|dog|chó;C|k_bird|chim;C|k_fox|cáo;C|k_banana|chuối;D|kite|diều;D|watermelone|dưa hấu;D|k_coconut|dừa;D|k_strawberry|dâu;E|e_baby|em bé;G|bear|gấu;G|panda|gấu trúc;G|k_eraser|gôm;H|flower|hoa;I|k_pig|ỉn;K|ant|kiến;K|ice_cream|kem;K|k_candy|kẹo;K|k_monkey|khỉ;K|k_scissors|kéo;L|leaf|lá;L|k_pear|lê;M|cat|mèo;M|sun|mặt trời;M|k_plum|mận;M|k_toyplane|máy bay;N|grape|nho;N|house|nhà;N|volcano|núi lửa;N|zebra|ngựa vằn;O|e_bee|ong;P|e_battery|pin;Q|gift|quà;R|k_robot|rô-bốt;R|k_turtle|rùa;S|lion|sư tử;S|star|sao;S|k_book|sách;S|k_chocolate|sô-cô-la;T|apple|táo;T|egg|trứng;T|moon|trăng;T|k_rabbit|thỏ;T|k_drum|trống;T|train|tàu hỏa;U|e_boot|ủng;V|elephant|voi;V|k_duck|vịt;V|notebook|vở;X|car|xe;X|mango|xoài;X|k_block|xếp hình;Y|yo-yo|yo-yo;Ă|e_antenna|ăng-ten;Ă|e_battery2|ắc quy;Â|e_kettle|ấm;Đ|e_lamp|đèn;Đ|e_clock|đồng hồ;Ê|frog|ếch;Ô|umbrella|ô;Ô|e_snail|ốc;Ơ|e_chili|ớt;Ư|e_wish|ước mơ".split(";");
const EXA={};Object.keys(OBJ).forEach(k=>EXA[k]={img:k,t:OBJ[k].en,L:OBJ[k].L,l:"en",hard:HARD.has(k)||NOPLAY.includes(OBJ[k].L)});
VT.forEach((s,i)=>{const[L,img,t]=s.split("|");EXA["v"+i]={img,t,L,l:"vi",hard:false}});
const exL=(L,l)=>Object.keys(EXA).filter(k=>EXA[k].l===l&&EXA[k].L===L),exP=l=>Object.keys(EXA).filter(k=>EXA[k].l===l&&!EXA[k].hard),exPL=l=>(l==="vi"?LET_VI:LET_EN).filter(L=>exP(l).some(k=>EXA[k].L===L)),exPK=(l,L)=>exP(l).filter(k=>EXA[k].L===L);
let ql=null;const qL=()=>lang==="both"?pick(["vi","en"]):lang;
const sayAs=(l,vi,en)=>{const o=ql;ql=l;say(vi,en);ql=o};
const exLD=L=>{const v=exL(L,"vi"),e=exL(L,"en");return lang==="vi"?(v.length?v.slice(0,3):e.slice(0,2)):lang==="en"?e.slice(0,3):[...v.slice(0,2),...e.slice(0,2)]};
const COUNT="apple,ball,star,flower,cat,dog,donut,egg,grape,orange,mango,frog,gift,sun,moon,tree".split(",");
let RATE=+ls.get("rate2",.85),lang=ls.get("lang","vi"),stars=+ls.get("stars",0),cur="home",done=false,rd={n:0,f:0,st:0};const ROUND=5,RL={mem:2,trace:3,match:3},GM=/P$|^(cmp|cmpS|mis|match|mem|trace|math10|countGame|playActivity)$/;let lvl=+ls.get("lvl",2);const MX=()=>[5,10,15][lvl-1];
const SOUND_ON=()=>ls.get("sound_master","1")!=="0";
function toggleSoundMaster(){
  const nxt=SOUND_ON()?"0":"1";
  ls.set("sound_master",nxt);
  if(!SOUND_ON()){
    A.pause();
    if(SS){try{SS.cancel()}catch(e){}}
  } else {
    sfxOk();
    say("Đã bật âm thanh","Sound is on");
  }
  head();
  if(cur==="parent")parent();
}

// ============================================================================
// PERFORMANCE UTILITIES: DEBOUNCE, THROTTLE & EVENT MANAGERS
// ============================================================================
function debounce(fn, ms=250){
  let timer;
  return function(...args){
    clearTimeout(timer);
    timer=setTimeout(()=>fn.apply(this,args),ms);
  };
}

function throttle(fn, limit=100){
  let inThrottle=false,lastArgs=null;
  return function(...args){
    if(!inThrottle){
      fn.apply(this,args);
      inThrottle=true;
      setTimeout(()=>{
        inThrottle=false;
        if(lastArgs){
          fn.apply(this,lastArgs);
          lastArgs=null;
        }
      },limit);
    }else{
      lastArgs=args;
    }
  };
}

let scrollHandlers = [];
function onScroll(fn){ if(!scrollHandlers.includes(fn)) scrollHandlers.push(fn); }
function offScroll(fn){ scrollHandlers = scrollHandlers.filter(h => h !== fn); }

const throttledScroll = throttle(e => {
  scrollHandlers.forEach(h => {
    try { h(e); } catch(err){}
  });
}, 100);

if(m) {
  m.addEventListener("scroll", throttledScroll, { passive: true });
}

let resizeHandlers = [];
function onResize(fn){ if(!resizeHandlers.includes(fn)) resizeHandlers.push(fn); }
function offResize(fn){ resizeHandlers = resizeHandlers.filter(h => h !== fn); }

const throttledResize = throttle(e => {
  resizeHandlers.forEach(h => {
    try { h(e); } catch(err){}
  });
}, 150);

window.addEventListener("resize", throttledResize, { passive: true });
const AGE_TIERS = {
  preschool: {
    id: "preschool",
    nameVi: "Tiền tiểu học",
    nameEn: "Preschool",
    ageVi: "4–6 tuổi",
    ageEn: "Ages 4–6",
    badge: "🐣",
    descVi: "Chữ cái, Học số, Đếm hình, Tiếng Anh & Đánh vần cơ bản",
    descEn: "Letters, Numbers, Counting, English & Phonics"
  },
  grade1_2: {
    id: "grade1_2",
    nameVi: "Lớp 1–2",
    nameEn: "Grade 1–2",
    ageVi: "6–8 tuổi",
    ageEn: "Ages 6–8",
    badge: "🎒",
    descVi: "Cộng/Trừ 20–100, Ghép vần, Tiếng Anh & Đọc hiểu",
    descEn: "Addition/Subtraction to 100, Phonics, English & Reading"
  },
  grade3_5: {
    id: "grade3_5",
    nameVi: "Lớp 3–5",
    nameEn: "Grade 3–5",
    ageVi: "8–11 tuổi",
    ageEn: "Ages 8–11",
    badge: "🚀",
    descVi: "Nhân/Chia, Phân số, Tiếng Anh giao tiếp & Đọc hiểu văn bản",
    descEn: "Multiplication/Division, Fractions, English & Comprehension"
  }
};
window.AGE_TIERS = AGE_TIERS;

async function loadActivities() {
  if (!window.ACTIVITIES_DATA) {
    try {
      const module = await import('./activities-data.js');
      window.ACTIVITIES_DATA = module.default || module.ACTIVITIES_DATA;
      if (module.getActivitiesByTier) window.getActivitiesByTier = module.getActivitiesByTier;
      if (module.getActivityById) window.getActivityById = module.getActivityById;
      if (module.getActivitiesBySubject) window.getActivitiesBySubject = module.getActivitiesBySubject;
    } catch(e) {
      console.error("Lỗi nạp activities-data.js:", e);
    }
  }
  return window.ACTIVITIES_DATA;
}
window.loadActivities = loadActivities;

async function loadStories() {
  if (!window.FAIRY_STORIES) {
    try {
      const sModule = await import('./stories-data.js');
      window.FAIRY_STORIES = sModule.default || sModule.FAIRY_STORIES;
      if (sModule.FAIRY_CATEGORIES) window.FAIRY_CATEGORIES = sModule.FAIRY_CATEGORIES;
    } catch(e) {
      console.error("Lỗi nạp stories-data.js:", e);
    }
  }
  if (!window.STORY_CATALOG) {
    try {
      const cModule = await import('./stories-catalog.js');
      window.STORY_CATALOG = cModule.default || cModule.STORY_CATALOG;
    } catch(e) {
      console.error("Lỗi nạp stories-catalog.js:", e);
    }
  }
  return window.FAIRY_STORIES;
}
window.loadStories = loadStories;

let currentTier=ls.get("ageTier",lvl===1?"preschool":(lvl===3?"grade3_5":"grade1_2"));
function setAgeTier(tierId){if(typeof AGE_TIERS==="undefined"||!AGE_TIERS[tierId])tierId="preschool";currentTier=tierId;ls.set("ageTier",currentTier);if(tierId==="preschool")lvl=1;else if(tierId==="grade1_2")lvl=2;else if(tierId==="grade3_5")lvl=3;ls.set("lvl",lvl);home();if(typeof AGE_TIERS!=="undefined"){sayPrompt("tier_"+tierId,AGE_TIERS[tierId].nameVi+". "+AGE_TIERS[tierId].descVi,AGE_TIERS[tierId].nameEn,60000);}}window.setAgeTier=setAgeTier;
function setLang(l){lang=l;ls.set("lang",l);ql=null;head();if(cur==="parent")parent();}window.setLang=setLang;
const A=new Audio(),REC={},RECSZ={};let tok=0,sc=0,busy=false,busyEnd=0,lastSig="",dupN=0,vWait=false;
const SS=window.speechSynthesis;
let VOICES=[];
const loadVoices=()=>{try{VOICES=SS?SS.getVoices():[]}catch(e){VOICES=[]}};
loadVoices();
if(SS){const vc=()=>{loadVoices();if(cur==="parent")parent()};try{SS.addEventListener("voiceschanged",vc)}catch(e){SS.onvoiceschanged=vc}}
const viV=()=>VOICES.find(v=>/^vi([-_]|$)/i.test(v.lang||""));
const vState=()=>{if(!SS)return{k:"none"};loadVoices();if(!VOICES.length)return vWait?{k:"none"}:{k:"wait"};const v=viV();return v?{k:"ok",n:v.name}:{k:"no"}};
// ============================================================================
// HỆ THỐNG ÂM THANH VIENEU TTS & CACHING NÂNG CAO (CLIENT-ONLY)
// 1. window.AUDIO_MAP load đồng bộ từ audio-map.js
// 2. Hàm playSafeAudio(text, voice, onEnd):
//    - Bước 1: Kiểm tra window.AUDIO_MAP[text] -> Phát trực tiếp file MP3 tương đối.
//    - Bước 2: Kiểm tra IndexedDB ('audios') -> Phát blob URL.
//    - Bước 3: Gọi API TTS (/api/tts) với debounce 300ms -> Lưu IDB + update AUDIO_MAP -> Phát.
//    - Bước 4: Fallback Web Speech API (window.speechSynthesis).
// ============================================================================
const AUDIO_CACHE_DB = "bhv_audio_cache";
const AUDIO_CACHE_STORE = "audios";
const MAX_AUDIO_CACHE_BYTES = 50 * 1024 * 1024; // 50 MB
const MEM_AUDIO_URLS = new Map();
const ttsDebounceTimers = new Map();

function openAudioCacheDB(){
  return new Promise(res=>{
    try{
      if(!window.indexedDB)return res(null);
      const req=indexedDB.open(AUDIO_CACHE_DB,1);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains(AUDIO_CACHE_STORE)){
          const store=db.createObjectStore(AUDIO_CACHE_STORE,{keyPath:"url"});
          store.createIndex("lastUsed","lastUsed",{unique:false});
        }
      };
      req.onsuccess=()=>res(req.result);
      req.onerror=()=>res(null);
    }catch(e){res(null)}
  });
}

async function getCachedAudio(url){
  if(!url)return null;
  if(MEM_AUDIO_URLS.has(url))return MEM_AUDIO_URLS.get(url);
  try{
    const db=await openAudioCacheDB();
    if(!db)return null;
    return new Promise(res=>{
      const tx=db.transaction(AUDIO_CACHE_STORE,"readwrite");
      const store=tx.objectStore(AUDIO_CACHE_STORE);
      const req=store.get(url);
      req.onsuccess=()=>{
        const it=req.result;
        if(it&&it.blob){
          it.lastUsed=Date.now();
          try{store.put(it)}catch(e){}
          const u=URL.createObjectURL(it.blob);
          MEM_AUDIO_URLS.set(url,u);
          res(u);
        }else res(null);
      };
      req.onerror=()=>res(null);
    });
  }catch(e){return null}
}

async function cacheAudio(url,blob){
  if(!url||!blob||!window.indexedDB)return null;
  try{
    const db=await openAudioCacheDB();
    if(!db)return null;
    const size=blob.size||0;
    await evictLRUIfNeeded(db,size);
    return new Promise(res=>{
      const tx=db.transaction(AUDIO_CACHE_STORE,"readwrite");
      const store=tx.objectStore(AUDIO_CACHE_STORE);
      store.put({url,blob,size,lastUsed:Date.now()});
      tx.oncomplete=()=>{
        if(!MEM_AUDIO_URLS.has(url)){
          MEM_AUDIO_URLS.set(url,URL.createObjectURL(blob));
        }
        res(true);
      };
      tx.onerror=()=>res(false);
    });
  }catch(e){
    console.warn("Lỗi cacheAudio IndexedDB:",e);
    return null;
  }
}
window.cacheAudio=cacheAudio;
window.getCachedAudio=getCachedAudio;

async function evictLRUIfNeeded(db,incomingSize){
  return new Promise(res=>{
    try{
      const tx=db.transaction(AUDIO_CACHE_STORE,"readwrite");
      const store=tx.objectStore(AUDIO_CACHE_STORE);
      const idx=store.index("lastUsed");
      const req=idx.openCursor();
      let totalSize=0;
      const recs=[];
      req.onsuccess=e=>{
        const cur=e.target.result;
        if(cur){
          totalSize+=cur.value.size||0;
          recs.push({url:cur.value.url,size:cur.value.size||0});
          cur.continue();
        }else{
          if(totalSize+incomingSize>MAX_AUDIO_CACHE_BYTES){
            let toRemove=(totalSize+incomingSize)-(MAX_AUDIO_CACHE_BYTES*0.85);
            for(const r of recs){
              if(toRemove<=0)break;
              store.delete(r.url);
              if(MEM_AUDIO_URLS.has(r.url)){
                try{URL.revokeObjectURL(MEM_AUDIO_URLS.get(r.url))}catch(err){}
                MEM_AUDIO_URLS.delete(r.url);
              }
              toRemove-=r.size;
            }
          }
          res();
        }
      };
      req.onerror=()=>res();
    }catch(e){res()}
  });
}

function fallbackToWebSpeech(text,langCode="vi-VN",onEnd){
  console.log("[Audio] Fallback to Web Speech:", text);
  if(!text||!SOUND_ON()){if(onEnd)onEnd();return}
  if(!SS){if(onEnd)onEnd();return}
  try{
    SS.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=langCode;
    u.rate=RATE;
    u.pitch=1.15;
    if(/^vi/i.test(langCode)){
      const v=viV();if(v)u.voice=v;
    }else if(/^en/i.test(langCode)){
      const enV=VOICES.find(v=>/^en([-_]|$)/i.test(v.lang||""));
      if(enV)u.voice=enV;
    }
    u.onend=u.onerror=()=>{if(onEnd)onEnd()};
    SS.speak(u);
  }catch(e){if(onEnd)onEnd()}
}

const getAudio=ak=>{
  if(!ak)return null;
  const raw=ak.replace(/^(vi|en)\|/i,"").trim();
  if(REC[ak]||REC[raw])return REC[ak]||REC[raw];
  if(!window.AUDIO_MAP)return null;
  const clean=typeof window.__normAudioKey==="function"?window.__normAudioKey(raw):raw.toLowerCase();
  return(
    window.AUDIO_MAP[ak]||
    window.AUDIO_MAP[raw]||
    window.AUDIO_MAP[clean]||
    window.AUDIO_MAP["vi|"+clean]||
    window.AUDIO_MAP["en|"+clean]||
    null
  );
};

let pendingAutoplayAudio=null;
function handleAutoplayUnlock(){
  if(!pendingAutoplayAudio)return;
  const pending=pendingAutoplayAudio;
  pendingAutoplayAudio=null;
  console.log("[Audio] Unlocking autoplay upon user interaction, playing:", pending.src);
  try{
    A.pause();
    if(SS){try{SS.cancel()}catch(e){}}
    A.src=pending.src;
    A.onended=pending.finishOnce;
    A.play().catch(err=>{
      console.warn("[Audio] User interaction deferred play failed:", err);
    });
  }catch(e){}
}
window.addEventListener("pointerdown",handleAutoplayUnlock,{passive:true});
window.addEventListener("keydown",handleAutoplayUnlock,{passive:true});

// ============================================================================
// HÀM CHÍNH: playSafeAudio(text, voice, onEnd)
// Đảm bảo không bao giờ gọi TTS API trước khi check Map và Local DB
// Không fallback giọng máy khi bị chặn bởi chính sách Autoplay của trình duyệt
// ============================================================================
async function playSafeAudio(text, voice="Tưởng Vy", onEnd){
  let finished=false;
  const finishOnce=()=>{
    if(finished)return;
    finished=true;
    if(typeof onEnd==="function")onEnd();
  };

  if(!SOUND_ON()||!text){
    finishOnce();
    return;
  }

  const rawText=String(text).trim();
  const nk=typeof window.__normAudioKey==="function"?window.__normAudioKey(rawText):rawText.toLowerCase().trim();
  const cleanKey=nk.replace(/^(vi|en)\|/,"");

  // BƯỚC 1: Kiểm tra window.AUDIO_MAP[text]
  const mapPath=getAudio(rawText)||(window.AUDIO_MAP&&(
    window.AUDIO_MAP[rawText]||
    window.AUDIO_MAP[nk]||
    window.AUDIO_MAP[cleanKey]||
    window.AUDIO_MAP["vi|"+cleanKey]||
    window.AUDIO_MAP["en|"+cleanKey]
  ));

  if(mapPath){
    console.log("[Audio] Found in Map:", mapPath);
    try{
      A.pause();
      if(SS){try{SS.cancel()}catch(e){}}
      A.onended=finishOnce;
      A.onerror=()=>{
        console.warn("[Audio] Lỗi phát file từ Map, chuyển Web Speech:", mapPath);
        fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      };
      A.src=mapPath;
      await A.play();
      return;
    }catch(e){
      if(e&&e.name==="AbortError")return;
      if(e&&(e.name==="NotAllowedError"||e.name==="SecurityError")){
        console.warn("[Audio] Autoplay bị chặn bởi chính sách trình duyệt. Chờ bé chạm màn hình để phát:", mapPath);
        pendingAutoplayAudio={src:mapPath,key:cleanKey,finishOnce};
        return;
      }
      console.warn("[Audio] Play map audio error:", e);
      fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      return;
    }
  }

  // BƯỚC 2: Kiểm tra IndexedDB (store 'audios')
  const dbKey="tts:"+cleanKey;
  let cachedBlobUrl=await getCachedAudio(dbKey);
  if(!cachedBlobUrl){
    cachedBlobUrl=await getCachedAudio(rawText);
  }

  if(cachedBlobUrl){
    console.log("[Audio] Found in DB:", rawText);
    try{
      A.pause();
      if(SS){try{SS.cancel()}catch(e){}}
      A.onended=finishOnce;
      A.onerror=()=>{
        console.warn("[Audio] Lỗi phát blob từ DB, chuyển Web Speech:", rawText);
        fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      };
      A.src=cachedBlobUrl;
      await A.play();
      return;
    }catch(e){
      if(e&&e.name==="AbortError")return;
      if(e&&(e.name==="NotAllowedError"||e.name==="SecurityError")){
        console.warn("[Audio] Autoplay bị chặn cho DB audio. Chờ tương tác người dùng:", rawText);
        pendingAutoplayAudio={src:cachedBlobUrl,key:cleanKey,finishOnce};
        return;
      }
      console.warn("[Audio] Play DB audio error:", e);
      fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      return;
    }
  }

  // BƯỚC 3: Gọi API TTS (/api/tts hoặc Netlify Function) với debounce 300ms
  console.log("[Audio] Fetching from API:", rawText);

  if(ttsDebounceTimers.has(cleanKey)){
    clearTimeout(ttsDebounceTimers.get(cleanKey));
  }

  return new Promise(resolve=>{
    const timerId=setTimeout(async()=>{
      ttsDebounceTimers.delete(cleanKey);
      try{
        const controller=new AbortController();
        const timeoutId=setTimeout(()=>controller.abort(),3500);

        const res=await fetch('/api/tts',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({text:cleanKey,voice:voice||'Tưởng Vy'}),
          signal:controller.signal
        });
        clearTimeout(timeoutId);

        if(res&&res.ok){
          const data=await res.json();
          if(data&&data.url){
            // Lưu vào IndexedDB và cập nhật vào AUDIO_MAP
            try{
              const aRes=await fetch(data.url);
              if(aRes&&aRes.ok){
                const blob=await aRes.blob();
                await cacheAudio(dbKey,blob);
                await cacheAudio(data.url,blob);
                if(window.AUDIO_MAP){
                  window.AUDIO_MAP[cleanKey]=data.url;
                  window.AUDIO_MAP["vi|"+cleanKey]=data.url;
                }
              }
            }catch(saveErr){
              console.warn("[Audio] Lỗi lưu IndexedDB:", saveErr);
            }

            A.pause();
            if(SS){try{SS.cancel()}catch(e){}}
            A.onended=()=>{finishOnce();resolve()};
            A.onerror=()=>{
              fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
              resolve();
            };
            A.src=data.url;
            try{
              await A.play();
            }catch(playErr){
              if(playErr&&(playErr.name==="NotAllowedError"||playErr.name==="SecurityError")){
                console.warn("[Audio] Autoplay bị chặn cho API audio. Chờ tương tác người dùng:", data.url);
                pendingAutoplayAudio={src:data.url,key:cleanKey,finishOnce};
                resolve();
                return;
              }
              fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
            }
            return;
          }
        }
        // BƯỚC 4: Fallback Web Speech nếu API trả về không hợp lệ
        fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
        resolve();
      }catch(apiErr){
        // BƯỚC 4: Fallback Web Speech nếu API lỗi / timeout / offline
        fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
        resolve();
      }
    }, 300);

    ttsDebounceTimers.set(cleanKey, timerId);
  });
}
window.playSafeAudio=playSafeAudio;

function say(vi,en){
  if(!SOUND_ON()){
    A.pause();
    if(SS){try{SS.cancel()}catch(e){}}
    return;
  }
  const my=++tok;busy=true;
  A.pause();A.onended=null;A.onerror=null;
  if(SS){try{SS.cancel()}catch(e){}}
  const LG=ql||lang;
  if(LG==="vi"&&vi){
    playSafeAudio(vi, "Tưởng Vy", ()=>{
      if(my===tok){busy=false;busyEnd=Date.now()}
    });
    return;
  }
  const sp=(t,l)=>{
    if(!t)return[];
    if(window.AUDIO_MAP&&(window.AUDIO_MAP[t]||(typeof window.__normAudioKey==="function"&&window.AUDIO_MAP[window.__normAudioKey(t)])))return[[t,l]];
    return t.split(/[.!?]+\s*/).map(s=>s.trim()).filter(Boolean).map(s=>[s,l]);
  };
  const q=LG==="vi"?sp(vi,"vi-VN"):LG==="en"?sp(en,"en-US"):[...sp(en,"en-US"),...sp(vi,"vi-VN")];
  const fin=()=>{if(my===tok){busy=false;busyEnd=Date.now()}};
  setTimeout(fin,3000+q.reduce((s,c)=>(window.AUDIO_MAP&&window.AUDIO_MAP[c[0]]?8000:c[0].length*130/RATE)+900/RATE,0));
  (function nx(i){
    if(my!==tok)return;
    if(i>=q.length){fin();return}
    let d=0;
    const nt=()=>{if(my!==tok)return;if(d++)return;if(i+1>=q.length){fin();return}setTimeout(()=>{if(my===tok)nx(i+1)},300/RATE)};
    playSafeAudio(q[i][0], "Tưởng Vy", nt);
  })(0);
}
let AC;
function haptic(ms=25){if(navigator.vibrate){try{navigator.vibrate(ms)}catch(e){}}}
function tone(f,d,t=0){if(!SFX())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain();o.type="triangle";o.frequency.value=f;o.connect(g);g.connect(AC.destination);const s=AC.currentTime+t;g.gain.setValueAtTime(.25,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.start(s);o.stop(s+d)}catch(e){}}
function sfxTap(){haptic(15);if(!SFX())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain();o.type="sine";const s=AC.currentTime;o.frequency.setValueAtTime(540,s);o.frequency.exponentialRampToValueAtTime(240,s+.06);g.gain.setValueAtTime(.22,s);g.gain.exponentialRampToValueAtTime(.001,s+.06);o.connect(g);g.connect(AC.destination);o.start(s);o.stop(s+.06)}catch(e){}}
function sfxOk(){haptic([25,30,40]);if(!SFX())return;[523.25,659.25,783.99,1046.50,1318.51].forEach((f,i)=>tone(f,.22,i*.07))}
function sfxNo(){haptic(35);if(!SFX())return;tone(280,.2);tone(220,.25,.12)}
function sfxFanfare(){haptic([40,50,80]);if(!SFX())return;[[523.25,.12,0],[659.25,.12,.1],[783.99,.12,.2],[1046.50,.35,.3],[880.00,.15,.55],[1046.50,.5,.7]].forEach(([f,d,t])=>tone(f,d,t))}
document.addEventListener("pointerdown",e=>{const b=e.target.closest("button,.card,.opt,.chip,.pill,.syl-btn,.word-btn,.rhyme-chip,.story-item,.trace-sample-card,.story-line,.story-p,.k-bc-btn,.k-bc-back,.badge-btn,.story-page-btn,.ob");if(b&&!b.disabled)sfxTap()},{passive:true});

function goHome(){
  if(cur==="home")return;
  stk=[{s:"home"}];
  try{history.replaceState({i:0,s:"home"},"")}catch(e){}
  show("home",undefined,true);
}
window.goHome=goHome;

function goBack(){
  if(cur==="home")return;
  if(stk.length>1){
    stk.pop();
    const prev=stk[stk.length-1];
    try{history.replaceState({i:stk.length-1,s:prev.s,a:prev.a},"")}catch(e){}
    show(prev.s,prev.a,true);
  } else {
    goHome();
  }
}
window.goBack=goBack;

function kbc(crumbs,actionHtml=""){
  const items=crumbs.map((c,idx)=>{
    if(idx===crumbs.length-1)return`<span class="k-bc-cur">${c.i?c.i+" ":""}${c.t}</span>`;
    const fn=(c.s==="home")?"goHome()":(c.a!==undefined?`go('${c.s}','${c.a}')`:`go('${c.s}')`);
    return`<button class="k-bc-btn" onclick="${fn}">${c.i?c.i+" ":""}${c.t}</button><span class="k-bc-sep">›</span>`;
  }).join("");
  return`<nav class="k-bc" aria-label="${T("Điều hướng","Navigation")}">${items}${actionHtml?`<span class="k-bc-action">${actionHtml}</span>`:""}</nav>`;
}

/* ========================================================
   HỆ THỐNG ĐỘNG LỰC HỌC TẬP: STREAK, SAO & BỘ SƯU TẬP
   ======================================================== */
function getLocalDateStr(d = new Date()){
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getDailyStreak(){
  const count = parseInt(ls.get("kids_streak_count", "0"), 10) || 0;
  const lastDate = ls.get("kids_streak_last_date", "");
  return { count, lastDate };
}

function recordDailyActivity(){
  const { count, lastDate } = getDailyStreak();
  const today = getLocalDateStr();
  if(lastDate === today){
    return { count, updated: false };
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateStr(yesterday);
  
  let newCount = 1;
  if(lastDate === yesterdayStr){
    newCount = count + 1;
  }
  
  ls.set("kids_streak_count", newCount);
  ls.set("kids_streak_last_date", today);
  head();
  return { count: newCount, updated: true };
}

const BADGES = [
  {id:"star5",name:"Bé Chăm Chỉ",en:"Diligent Star",icon:"⭐",desc:"Đạt 5 ngôi sao đầu tiên",enDesc:"Earn 5 stars",test:()=>stars>=5},
  {id:"star20",name:"Ngôi Sao Sáng",en:"Bright Star",icon:"🌟",desc:"Đạt 20 ngôi sao học tập",enDesc:"Earn 20 stars",test:()=>stars>=20},
  {id:"star50",name:"Vua Học Vui",en:"Learning King",icon:"👑",desc:"Chinh phục 50 ngôi sao",enDesc:"Earn 50 stars",test:()=>stars>=50},
  {id:"star100",name:"Siêu Sao Vô Địch",en:"Super Champion",icon:"💎",desc:"Chinh phục 100 ngôi sao",enDesc:"Earn 100 stars",test:()=>stars>=100},
  {id:"let5",name:"Bác Học Chữ Cái",en:"Alphabet Master",icon:"🔤",desc:"Khám phá ít nhất 5 chữ cái",enDesc:"Explore 5 letters",test:()=>(ST.letCount||0)>=5},
  {id:"num5",name:"Siêu Sao Đếm Số",en:"Counting Champ",icon:"🔢",desc:"Khám phá các con số đến 10",enDesc:"Explore numbers",test:()=>(ST.numCount||0)>=5},
  {id:"trace3",name:"Bút Chì Vàng",en:"Golden Pencil",icon:"✍️",desc:"Tập viết chữ hoặc nét vẽ",enDesc:"Trace 3 letters/strokes",test:()=>(ST.traceCount||0)>=3},
  {id:"story2",name:"Mọt Sách Nhí",en:"Story Lover",icon:"📖",desc:"Nghe đọc truyện cổ tích",enDesc:"Listen to fairy tales",test:()=>(ST.storyCount||0)>=2},
  {id:"streak3",name:"Tay Đua Bất Bại",en:"Winning Streak",icon:"🚀",desc:"Đúng liên tiếp 3 câu hỏi",enDesc:"3 correct answers in a row",test:()=>(ST.maxStreak||0)>=3},
  {id:"math5",name:"Thần Đồng Toán",en:"Math Prodigy",icon:"➕",desc:"Hoàn thành 5 phép tính",enDesc:"Solve 5 math problems",test:()=>(ST.mathCount||0)>=5},
  {id:"dayStreak3",name:"Chăm Chỉ 3 Ngày",en:"3-Day Streak",icon:"🔥",desc:"Học bài 3 ngày liên tiếp",enDesc:"Study 3 days in a row",test:()=>getDailyStreak().count>=3},
  {id:"dayStreak7",name:"Kiên Trì 7 Ngày",en:"7-Day Streak",icon:"✨",desc:"Học bài 7 ngày liên tiếp",enDesc:"Study 7 days in a row",test:()=>getDailyStreak().count>=7}
];

const STICKERS = [
  {id:"cat",name:"Mèo Mimi",en:"Mimi Kitty",icon:"🐱",desc:"Tặng bé ngày đầu tiên đến lớp",enDesc:"Welcome to learning",test:()=>true},
  {id:"apple",name:"Táo Ngọt Ngào",en:"Sweet Apple",icon:"🍎",desc:"Đạt 5 ngôi sao đầu tiên",enDesc:"Earn 5 stars",test:()=>stars>=5},
  {id:"rocket",name:"Phi Thuyền Nhí",en:"Space Rocket",icon:"🚀",desc:"Đạt chuỗi học 2 ngày liên tiếp",enDesc:"2-day streak",test:()=>getDailyStreak().count>=2},
  {id:"rainbow",name:"Cầu Vồng Kì Diệu",en:"Magic Rainbow",icon:"🌈",desc:"Đạt 25 ngôi sao rực rỡ",enDesc:"Earn 25 stars",test:()=>stars>=25},
  {id:"unicorn",name:"Kỳ Lân Mộng Mơ",en:"Dreamy Unicorn",icon:"🦄",desc:"Đạt chuỗi học 3 ngày liên tiếp",enDesc:"3-day streak",test:()=>getDailyStreak().count>=3},
  {id:"lion",name:"Sư Tử Trí Tuệ",en:"Wise Lion",icon:"🦁",desc:"Chinh phục 50 ngôi sao",enDesc:"Earn 50 stars",test:()=>stars>=50},
  {id:"icecream",name:"Kem Vui Vẻ",en:"Happy Ice Cream",icon:"🍦",desc:"Làm đúng 10 câu hỏi",enDesc:"Answer 10 questions",test:()=>(ST.f||0)>=10},
  {id:"crown",name:"Vương Miện Nhí",en:"Kid's Crown",icon:"👑",desc:"Đạt chuỗi học 5 ngày liên tiếp",enDesc:"5-day streak",test:()=>getDailyStreak().count>=5}
];

function getUnlockedBadges(){
  try{return JSON.parse(ls.get("badges","[]"))||[];}catch(e){return[];}
}

function checkBadges(){
  const unlocked=new Set(getUnlockedBadges());
  let newBadge=null;
  BADGES.forEach(b=>{
    if(!unlocked.has(b.id)&&b.test()){
      unlocked.add(b.id);
      if(!newBadge)newBadge=b;
    }
  });
  ls.set("badges",JSON.stringify([...unlocked]));
  head();
  if(newBadge){
    setTimeout(()=>{
      triggerCelebration(
        lang==="vi"?"Mở khóa huy hiệu mới!":"Badge Unlocked!",
        lang==="vi"?`Bé nhận được huy hiệu: ${newBadge.name}!`:`You unlocked: ${newBadge.en}!`,
        newBadge.icon,
        "⭐⭐⭐"
      );
      say(`Hoan hô! Bé mở khóa huy hiệu ${newBadge.name}!`,`Hooray! You unlocked ${newBadge.en}!`);
    },600);
  }
}

const LEVELS=[
  {lv:1,title:"🐣 Bé Mầm Non",en:"Toddler",min:0,max:15},
  {lv:2,title:"🐥 Bé Khám Phá",en:"Explorer",min:15,max:35},
  {lv:3,title:"🚀 Bé Thông Thái",en:"Scholar",min:35,max:70},
  {lv:4,title:"🦸 Bé Siêu Đẳng",en:"Super Kid",min:70,max:120},
  {lv:5,title:"🏆 Vô Địch Học Vui",en:"Champion",min:120,max:250}
];

function getCurrentLevel(){
  for(let i=LEVELS.length-1;i>=0;i--){
    if(stars>=LEVELS[i].min)return LEVELS[i];
  }
  return LEVELS[0];
}

let currentAchieveTab = "badges";
function showBadges(tab = currentAchieveTab){
  currentAchieveTab = tab;
  const curLv=getCurrentLevel();
  const nextLv=LEVELS.find(l=>l.lv===curLv.lv+1);
  const curMin=curLv.min;
  const nextMin=nextLv?nextLv.min:curLv.max;
  const span=Math.max(1,nextMin-curMin);
  const progress=nextLv?Math.min(100,Math.round(((stars-curMin)/span)*100)):100;
  const unlockedBadges=new Set(getUnlockedBadges());
  const dailyStreak=getDailyStreak();

  const tabButtonsHtml = `
    <div class="sticker-tabs">
      <button class="sticker-tab-btn ${tab === 'badges' ? 'on' : ''}" onclick="showBadges('badges')">
        🏆 ${T("Huy hiệu học tập", "Milestone Badges")} (${unlockedBadges.size}/${BADGES.length})
      </button>
      <button class="sticker-tab-btn ${tab === 'stickers' ? 'on' : ''}" onclick="showBadges('stickers')">
        ✨ ${T("Bộ sưu tập Sticker", "Sticker Book")} (${STICKERS.filter(s => s.test()).length}/${STICKERS.length})
      </button>
    </div>
  `;

  let contentHtml = "";
  if(tab === "badges"){
    contentHtml = `
      <div class="badge-grid">
        ${BADGES.map(b=>{
          const isUn=unlockedBadges.has(b.id);
          return `<div class="badge-card ${isUn?"unlocked":"locked"}" onclick="say('${b.name}','${b.en}')">
            <div class="badge-card-icon">${b.icon}</div>
            <div class="badge-card-title">${lang==="vi"?b.name:b.en}</div>
            <div class="badge-card-desc">${lang==="vi"?b.desc:b.enDesc}</div>
            <div class="badge-card-status ${isUn?"unlocked":"locked"}">${isUn?"✔ "+T("Đã đạt","Earned"):"🔒 "+T("Đang khóa","Locked")}</div>
          </div>`;
        }).join("")}
      </div>
    `;
  } else {
    contentHtml = `
      <div class="sticker-grid">
        ${STICKERS.map(s=>{
          const isUn=s.test();
          return `<div class="sticker-card ${isUn?"unlocked":"locked"}" onclick="window.__clickSticker('${s.id}')">
            <div class="sticker-emoji">${s.icon}</div>
            <div class="sticker-title">${lang==="vi"?s.name:s.en}</div>
            <div class="sticker-badge ${isUn?"unlocked":"locked"}">
              ${isUn?"✔ "+T("Đã dán","Collected"):"🔒 "+T("Khóa","Locked")}
            </div>
            <div class="badge-card-desc" style="font-size:11px;margin-top:2px">${lang==="vi"?s.desc:s.enDesc}</div>
          </div>`;
        }).join("")}
      </div>
    `;
  }

  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Thành tích của bé","Kid's Achievements"),i:"🏆"}])}
  <h2>🏆 ${T("Thành tích & Phần thưởng của bé","Kid's Achievements & Rewards")}</h2>
  <div class="star-progress-wrap">
    <div class="star-progress-head">
      <span>${lang==="vi"?curLv.title:curLv.en}</span>
      <span style="color:var(--acc)">⭐ ${stars} / ${nextLv?nextMin:"Max"}</span>
    </div>
    <div class="star-progress-bar">
      <div class="star-progress-fill" style="width:${progress}%"></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-top:6px">
      <small style="font-size:15px;opacity:.9">
        ${nextLv?(lang==="vi"?`Cần thêm ${nextMin-stars} ⭐ để lên cấp ${nextLv.title}`:`Need ${nextMin-stars} more ⭐ for ${nextLv.en}`):(lang==="vi"?"Đã đạt cấp độ cao nhất! Tuyệt vời!":"Maximum level reached!")}
      </small>
      <span class="streak-btn" style="pointer-events:none">
        🔥 ${T(`Chuỗi học: ${dailyStreak.count} ngày`, `Streak: ${dailyStreak.count} days`)}
      </span>
    </div>
  </div>
  ${tabButtonsHtml}
  ${contentHtml}
  <div class="row" style="justify-content:center;margin:18px 0">
    <button class="pill on" onclick="goBack()" style="font-size:18px;padding:8px 26px;min-height:56px">✔ ${T("Quay lại","Back")}</button>
  </div>`;
  sayPrompt("badges","Đây là các huy hiệu và bộ sưu tập của bé","Here are your achievements and rewards",180000);
}
window.showBadges=showBadges;

window.__clickSticker = function(id){
  const s = STICKERS.find(x => x.id === id);
  if(!s) return;
  if(s.test()){
    sfxOk();
    say(`Sticker ${s.name}! Đã mở khóa!`, `Sticker ${s.en}! Unlocked!`);
  } else {
    say(`Sticker ${s.name}: ${s.desc}`, `Sticker ${s.en}: ${s.enDesc}`);
  }
};

function isConfettiDisabled(){
  return ls.get("kids_confetti_disabled", "0") === "1";
}

function toggleConfettiFx(e){
  if(e) e.stopPropagation();
  const next = !isConfettiDisabled();
  ls.set("kids_confetti_disabled", next ? "1" : "0");
  updateConfettiBtnText();
  if(next){
    const cv = document.getElementById("confettiCv");
    if(cv){
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, cv.width, cv.height);
    }
  } else {
    runConfetti();
  }
}
window.toggleConfettiFx = toggleConfettiFx;

function updateConfettiBtnText(){
  const btn = document.getElementById("celebFxToggle");
  if(btn){
    const dis = isConfettiDisabled();
    btn.textContent = lang === "vi" 
      ? (dis ? "🎊 Hiệu ứng pháo hoa: TẮT" : "🎊 Hiệu ứng pháo hoa: BẬT")
      : (dis ? "🎊 Confetti: OFF" : "🎊 Confetti: ON");
    btn.style.opacity = dis ? "0.6" : "1";
  }
}

function runConfetti(){
  if(isConfettiDisabled() || rmOn()) return;
  const cv=document.getElementById("confettiCv");
  if(!cv)return;
  const ctx=cv.getContext("2d");
  const W=cv.width=window.innerWidth;
  const H=cv.height=window.innerHeight;
  const colors=["#ff7aa8","#ffb347","#4cc36b","#38bdf8","#a855f7","#facc15"];
  const pieces=Array.from({length:55},()=>({
    x:Math.random()*W,
    y:Math.random()*(H*0.4)-20,
    w:8+Math.random()*8,
    h:6+Math.random()*6,
    c:colors[Math.floor(Math.random()*colors.length)],
    vy:2+Math.random()*4,
    vx:(Math.random()-0.5)*3,
    rot:Math.random()*360,
    vrot:(Math.random()-0.5)*10
  }));
  let frames=0;
  function draw(){
    const ov=document.getElementById("celebOverlay");
    if(!ov||ov.style.display==="none")return;
    ctx.clearRect(0,0,W,H);
    pieces.forEach(p=>{
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.c;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
      p.y+=p.vy;
      p.x+=p.vx;
      p.rot+=p.vrot;
      if(p.y>H+20)p.y=-20;
    });
    frames++;
    if(frames<200)requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

let celebCallback=null;
function triggerCelebration(title,desc,icon="🎉",starsCount="⭐⭐⭐",cb=null){
  const el=document.getElementById("celebOverlay");
  if(!el)return;
  celebCallback=cb;
  document.getElementById("celebTitle").textContent=title;
  document.getElementById("celebDesc").textContent=desc;
  document.getElementById("celebIcon").textContent=icon;
  document.getElementById("celebStars").textContent=starsCount;
  updateConfettiBtnText();
  el.style.display="flex";
  sfxFanfare();
  catSet("celebrate");
  runConfetti();
}
window.triggerCelebration=triggerCelebration;

function closeCeleb(){
  const el=document.getElementById("celebOverlay");
  if(el)el.style.display="none";
  if(typeof celebCallback==="function"){
    const fn=celebCallback;
    celebCallback=null;
    fn();
  }
}
window.closeCeleb=closeCeleb;

const cat=document.getElementById("cat");
function catSet(s){cat.src=I["cat_"+s];cat.className=(s==="happy"||s==="celebrate")?"happy":""}
function head(){
  const lb=document.getElementById("langBtn");
  if(lb)lb.innerHTML=lang==="vi"?'🇻🇳 <span class="lang-txt">Tiếng Việt</span>':'🇬🇧 <span class="lang-txt">English</span>';
  const spBtn=document.getElementById("sp");
  if(spBtn)spBtn.textContent=RATE<.5?"🐢🐢":RATE<.7?"🐢":"🐇";
  const stEl=document.getElementById("stars");
  if(stEl)stEl.innerHTML=im("gstar")+" "+stars;
  const bb=document.getElementById("backBtn");
  if(bb){
    bb.style.display=(cur&&cur!=="home")?"inline-flex":"none";
    const lbl=bb.querySelector(".bk-lbl");
    if(lbl)lbl.textContent=lang==="vi"?"Quay lại":"Back";
  }
  const bc=document.getElementById("badgeCount");
  if(bc){
    const unlocked=getUnlockedBadges();
    bc.textContent=unlocked.length;
  }
  const scEl=document.getElementById("streakCount");
  if(scEl){
    scEl.textContent=getDailyStreak().count;
  }
  const sndBtn=document.getElementById("soundBtn");
  if(sndBtn){
    const on=SOUND_ON();
    sndBtn.textContent=on?"🔊":"🔇";
    sndBtn.setAttribute("aria-label",on?(lang==="vi"?"Âm thanh đang bật, bấm để tắt":"Sound is on, tap to mute"):(lang==="vi"?"Âm thanh đang tắt, bấm để bật":"Sound is muted, tap to unmute"));
    sndBtn.classList.toggle("muted",!on);
  }
}
function toggleLang(){const next=lang==="vi"?"en":"vi";setLang(next);if(typeof cur!=="undefined"&&cur)go(cur);}
window.toggleLang=toggleLang;
document.getElementById("hb").innerHTML=im("btn_home");
document.getElementById("hb").onclick=()=>{if(cur==="home")return;goHome();};
document.getElementById("sp").onclick=()=>{RATE=RATE<.5?.6:RATE<.7?.85:.4;ls.set("rate2",RATE);head();say("Bé nghe nhé","Listen")};
function fx(){if(rmOn())return;const e=document.createElement("img");e.src=I.confetti;e.className="fx";document.body.appendChild(e);setTimeout(()=>e.remove(),1500)}
const PR=[["Giỏi quá!","Great job!"],["Hoan hô!","Hooray!"],["Tuyệt vời!","Wonderful!"],["Bé giỏi lắm!","Well done!"],["Đúng rồi!","That's right!"],["Siêu quá!","Awesome!"],["Bé thông minh quá!","So smart!"],["Hay quá!","Fantastic!"],["Mèo thích quá!","The kitty loves it!"]];
const ER=[["Thử lại nhé","Try again"],["Gần đúng rồi, bé thử lại nào","Almost! Try again"],["Không sao, bé thử lại nhé","It's okay, try again"]];
let stk=[{s:"home"}],pend=0,isBackNav=false,promptCooldown={};
function sayPrompt(key,vi,en,cd=180000){
  if(isBackNav)return;
  const now=Date.now();
  if(promptCooldown[key]&&(now-promptCooldown[key]<cd))return;
  promptCooldown[key]=now;
  say(vi,en);
}
/* ========================================================
   ERROR BOUNDARY & SAFE RENDERING
   ======================================================== */
window.addEventListener("error", function(e){
  console.error("Global Error Caught:", e.message, e.filename, e.lineno);
  recordAppError(e.message, `${e.filename}:${e.lineno}`);
});

window.addEventListener("unhandledrejection", function(e){
  console.error("Unhandled Promise Rejection:", e.reason);
  recordAppError(String(e.reason && e.reason.message ? e.reason.message : e.reason), "Promise");
});

function recordAppError(msg, src){
  try {
    const errs = JSON.parse(ls.get("bhv_errors", "[]")) || [];
    errs.push({ msg, src, t: new Date().toLocaleTimeString() });
    if(errs.length > 10) errs.shift();
    ls.set("bhv_errors", JSON.stringify(errs));
  } catch(e){}
}

function renderErrorBoundary(errorMsg = ""){
  const m = document.getElementById("m");
  if(!m) return;
  m.innerHTML = `
    <div class="act-player-box" style="margin-top:24px;border-color:#f59e0b">
      <div style="font-size:56px;line-height:1;margin:8px 0">🐱💭</div>
      <h2 style="color:#d97706;margin:6px 0">${T("Ôi, có một chút nhầm lẫn nhỏ!","Oops, a little hiccup!")}</h2>
      <p style="font-size:16px;color:#334155;line-height:1.5;margin:8px auto 18px;max-width:440px">
        ${T("Mèo con và ứng dụng vừa gặp sự cố nhỏ. Bé đừng lo nhé, mình cùng quay về trang chủ để tiếp tục vui chơi nào!","The app had a small hiccup. Don't worry, let's head home!")}
      </p>
      ${errorMsg ? `<div style="font-size:12px;color:#94a3b8;margin-bottom:14px;word-break:break-all">Chi tiết: ${esc(errorMsg)}</div>` : ""}
      <div class="act-ctrl-row">
        <button class="pill on" onclick="go('home')" style="font-size:18px;font-weight:800;padding:10px 24px">
          🏠 ${T("Về trang chủ","Go Home")}
        </button>
        <button class="pill" onclick="location.reload()" style="font-size:16px;padding:8px 18px">
          🔄 ${T("Tải lại trang","Reload")}
        </button>
      </div>
    </div>
  `;
  say("Ôi, có sự cố nhỏ. Mình cùng về trang chủ nhé","Let's go home!");
}
window.renderErrorBoundary = renderErrorBoundary;

/* ========================================================
   ANONYMOUS EVENT TRACKING (ANALYTICS)
   - COPPA & GDPR-K compliant: anonymous, no PII.
   ======================================================== */
const Analytics = {
  MAX_EVENTS: 60,
  activeSession: null,

  getEvents(){
    try {
      return JSON.parse(ls.get("bhv_events", "[]")) || [];
    } catch(e) { return []; }
  },

  getStats(){
    try {
      return JSON.parse(ls.get("bhv_act_stats", "{}")) || {};
    } catch(e) { return {}; }
  },

  track(name, data = {}){
    try {
      const events = this.getEvents();
      const ev = { event: name, t: Date.now(), d: data };
      events.push(ev);
      if(events.length > this.MAX_EVENTS) events.shift();
      ls.set("bhv_events", JSON.stringify(events));
      this.updateAggregates(name, data);
    } catch(e){}
  },

  updateAggregates(name, data){
    try {
      const agg = this.getStats();
      const actId = data.actId || (this.activeSession && this.activeSession.actId);
      if(!actId) return;
      agg[actId] = agg[actId] || { starts: 0, completes: 0, abandons: 0, title: data.title || actId };
      if(name === "activity_start") agg[actId].starts = (agg[actId].starts || 0) + 1;
      if(name === "activity_complete") agg[actId].completes = (agg[actId].completes || 0) + 1;
      if(name === "activity_abandon") agg[actId].abandons = (agg[actId].abandons || 0) + 1;
      ls.set("bhv_act_stats", JSON.stringify(agg));
    } catch(e){}
  },

  startActivity(act){
    this.checkAndRecordAbandon("new_activity");
    this.activeSession = {
      actId: act.id,
      title: act.title,
      tier: act.ageTier,
      subject: act.subject,
      startTime: Date.now(),
      attempts: 0,
      completed: false
    };
    this.track("activity_start", {
      actId: act.id,
      title: act.title,
      tier: act.ageTier,
      subject: act.subject
    });
  },

  answerActivity(isCorrect, chosenId){
    if(!this.activeSession) return;
    this.activeSession.attempts++;
    this.track("activity_answer", {
      actId: this.activeSession.actId,
      attempt: this.activeSession.attempts,
      isCorrect,
      chosenId,
      durationMs: Date.now() - this.activeSession.startTime
    });
  },

  completeActivity(starsEarned){
    if(!this.activeSession) return;
    this.activeSession.completed = true;
    this.track("activity_complete", {
      actId: this.activeSession.actId,
      title: this.activeSession.title,
      stars: starsEarned,
      totalAttempts: this.activeSession.attempts,
      durationMs: Date.now() - this.activeSession.startTime
    });
    this.activeSession = null;
  },

  checkAndRecordAbandon(reason = "navigation"){
    if(this.activeSession && !this.activeSession.completed){
      const duration = Date.now() - this.activeSession.startTime;
      if(duration >= 3500){
        this.track("activity_abandon", {
          actId: this.activeSession.actId,
          title: this.activeSession.title,
          attemptsBeforeAbandon: this.activeSession.attempts,
          durationMs: duration,
          reason
        });
      }
      this.activeSession = null;
    }
  }
};
window.Analytics = Analytics;

window.addEventListener("pagehide", () => Analytics.checkAndRecordAbandon("pagehide"));
window.addEventListener("beforeunload", () => Analytics.checkAndRecordAbandon("beforeunload"));

function show(s,a,isBack=false){
  if(cur==="playActivity" && s!=="playActivity"){
    Analytics.checkAndRecordAbandon("nav_" + s);
  }
  if(!V[s])s="home";
  cur=s;ql=null;tok++;sc++;busy=false;lastSig="";dupN=0;
  A.pause();if(SS)SS.cancel();
  if(GM.test(s))rd={n:0,f:0,st:0};
  isBackNav=!!isBack;
  try {
    V[s](a);
  } catch(err){
    console.error("View render error:", err);
    renderErrorBoundary(err.message);
  }
  isBackNav=false;
  if(!GM.test(s))catSet("idle");
  cat.style.display=s==="parent"||s==="rec"?"none":"";
  head();
  m.scrollTop=0;
}
function go(s,a){
  if(s==="home"){
    goHome();
    return;
  }
  const n=stk.length-1,top=stk[n];
  if(top&&top.s===s&&top.a===a)return;
  if(top&&(top.s===s||top.s==="gate")){
    stk[n]={s,a};
    try{history.replaceState({i:n,s,a},"")}catch(e){}
    show(s,a,false);
    return;
  }
  let k=-1;
  for(let j=n-1;j>=0;j--){
    if(stk[j].s===s){k=j;break}
  }
  if(k>=0){
    stk.length=k+1;
    stk[k]={s,a};
    try{history.replaceState({i:k,s,a},"")}catch(e){}
    show(s,a,true);
    return;
  }
  stk.push({s,a});
  try{history.pushState({i:stk.length-1,s,a},"")}catch(e){}
  show(s,a,false);
}
addEventListener("popstate",e=>{
  const st=e.state||{i:0,s:"home"};
  if(st.s==="home"){
    stk=[{s:"home"}];
    show("home",undefined,true);
    return;
  }
  const isBack=(st.i<stk.length-1);
  while(stk.length<=st.i)stk.push({s:"home"});
  stk.length=st.i+1;
  stk[st.i]={s:st.s,a:st.a};
  show(st.s,st.a,isBack);
});
let defPrompt = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  defPrompt = e;
  const b = document.getElementById("pwa-btn");
  if(b) b.style.display = "inline-flex";
});
window.addEventListener("appinstalled", () => {
  defPrompt = null;
  const b = document.getElementById("pwa-btn");
  if(b) b.style.display = "none";
});
function isStandalone(){
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true || window.location.search.includes("pwa=1");
}
function triggerPWAInstall(){
  if(defPrompt){
    defPrompt.prompt();
    defPrompt.userChoice.then(r => {
      if(r.outcome === "accepted") defPrompt = null;
    });
  } else {
    go("pwaGuide");
  }
}
function pwaGuide(){
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  let guideHtml = "";
  if(isIOS){
    guideHtml = `<p><b>Cách thêm ứng dụng trên iPad / iPhone:</b></p>
    <ol style="text-align:left;padding-left:20px;line-height:1.7;margin:8px 0">
      <li>Bấm nút <b>Chia sẻ (Share)</b> ⬆ trên thanh công cụ Safari.</li>
      <li>Cuộn xuống chọn <b>"Thêm vào MH chính" (Add to Home Screen)</b> ➕.</li>
      <li>Bấm <b>Thêm (Add)</b> ở góc trên bên phải.</li>
    </ol>`;
  } else {
    guideHtml = `<p><b>Cách cài đặt trên Máy tính bảng Huawei / Android:</b></p>
    <ol style="text-align:left;padding-left:20px;line-height:1.7;margin:8px 0">
      <li>Mở trang web bằng <b>Trình duyệt Huawei (Huawei Browser)</b> hoặc <b>Chrome / Edge</b>.</li>
      <li>Bấm vào biểu tượng <b>Menu 3 chấm (⋮) hoặc (≡)</b> của trình duyệt.</li>
      <li>Chọn <b>"Cài đặt ứng dụng" (Install app)</b> hoặc <b>"Thêm vào màn hình chính" (Add to desktop)</b>.</li>
      <li>Sau khi cài đặt, mở biểu tượng <b>Bé học vui</b> từ màn hình chính: ứng dụng sẽ tự động chạy <b>toàn màn hình (Standalone)</b>, biến mất thanh web, mượt mà như app thật!</li>
    </ol>
    <div class="note warn" style="margin-top:10px;text-align:left">
      💡 <b>Lưu ý riêng cho máy Huawei:</b> Nếu dùng Google Chrome trên máy Huawei không có Google Play Services (GMS), Chrome sẽ chỉ tạo shortcut. Khuyên dùng <b>Trình duyệt Huawei (Huawei Browser)</b> mặc định để cài đặt ứng dụng chuẩn PWA không bị gán logo trình duyệt.
    </div>`;
  }
  m.innerHTML = `${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Cài đặt ứng dụng","Install App"),i:"📲"}])}
    <h2>📲 ${T("Cài đặt ứng dụng","Install App")}</h2>
    <div class="note ok" style="max-width:540px;margin:12px auto;text-align:left">${guideHtml}</div>
    <div class="row" style="justify-content:center;margin-top:14px"><button class="pill" onclick="go('home')">✔ ${T("Đã hiểu","Got it")}</button></div>`;
}
function card(f,vis,vi,en,subject="default"){
  const cls = subject !== "default" ? `card card-${subject}` : "card";
  return`<button class="${cls}" onclick="go('${f}')"><div class="vis">${vis}</div><span>${T(vi,en)}</span></button>`;
}
function home(){
  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[currentTier]) ? AGE_TIERS[currentTier] : {
    id: "preschool", nameVi: "Tiền tiểu học", nameEn: "Preschool", ageVi: "4–6 tuổi", ageEn: "Ages 4–6", badge: "🐣", descVi: "Chữ cái, Học số & Đếm hình", descEn: "Letters, Numbers & Counting"
  };

  const tierSelectorHtml = `
    <div class="tier-selector-wrap">
      <div class="tier-tabs">
        ${(typeof AGE_TIERS !== "undefined" ? Object.values(AGE_TIERS) : []).map(t => `
          <button class="tier-tab ${t.id === currentTier ? "on" : ""}" onclick="setAgeTier('${t.id}')">
            <span class="tier-tab-badge">${t.badge}</span>
            <span class="tier-tab-title">${T(t.nameVi, t.nameEn)}</span>
            <span class="tier-tab-sub">${T(t.ageVi, t.ageEn)}</span>
          </button>
        `).join("")}
      </div>
      <div class="tier-info-banner">
        <span>${tInfo.badge}</span>
        <span>${T(tInfo.descVi, tInfo.descEn)}</span>
      </div>
    </div>
  `;

  let cardsHtml = "";
  if(currentTier === "preschool"){
    cardsHtml = `
      ${card("letL", imL("A")+imL("B"), "Chữ cái", "Letters", "vietnamese")}
      ${card("numL", "<b>1 2 3</b>", "Học số", "Numbers", "math")}
      ${card("countGame", "<b>🍎 3 ⭐</b>", "Đếm hình chọn số", "Count & Match", "game")}
      ${card("readL", "<b>ĐỌC</b>", "Đánh vần & Đọc", "Reading", "reading")}
      ${card("tierActivities", "<b>🎯 🎒</b>", "Bài tập mầm non", "Preschool Tasks", "logic")}
      ${card("storyL", "<b>📖 ✨</b>", "Truyện cổ tích", "Stories", "reading")}
      ${card("games", im("kite")+im("rocket"), "Trò chơi", "Games", "game")}
    `;
  } else if(currentTier === "grade1_2"){
    cardsHtml = `
      ${card("tierActivities", "<b>🎯 🎒</b>", "Bài tập Lớp 1-2", "Grade 1-2 Lessons", "logic")}
      ${card("math10", "<b>8 + 7</b>", "Toán 20 - 100", "Math 20 - 100", "math")}
      ${card("tierActWord", "<b>🔤 🧩</b>", "Ghép vần & Từ", "Word Phonics", "vietnamese")}
      ${card("cmpS", "<b>&gt; = &lt;</b>", "Dấu so sánh", "Signs", "math")}
      ${card("trace", im("pencil")+"<b>Aa1</b>", "Luyện chữ đẹp", "Handwriting", "trace")}
      ${card("storyL", "<b>📖 ✨</b>", "Đọc truyện", "Stories", "reading")}
      ${card("games", im("kite")+im("rocket"), "Trò chơi", "Games", "game")}
    `;
  } else {
    cardsHtml = `
      ${card("tierActivities", "<b>🎯 🎒</b>", "Bài tập Lớp 3-5", "Grade 3-5 Lessons", "logic")}
      ${card("tierActMath", "<b>7 × 8</b>", "Nhân chia & Phân số", "Multiply & Fractions", "math")}
      ${card("tierActRead", "<b>📖 🔍</b>", "Đọc hiểu văn bản", "Reading Comprehension", "reading")}
      ${card("cmpS", "<b>&gt; = &lt;</b>", "Toán so sánh", "Signs", "math")}
      ${card("storyL", "<b>📖 ✨</b>", "Truyện & Bài học", "Stories & Morals", "reading")}
      ${card("games", im("kite")+im("rocket"), "Trò chơi trí tuệ", "Logic Games", "game")}
    `;
  }

  m.innerHTML = `
    <div class="hero"><button onclick="say('Chào bé! Mình cùng học nhé','Hello! Let\\'s learn together')" aria-label="${T("Nghe chào","Hear greeting")}" style="background:none;border:none;cursor:pointer;padding:0;display:inline-block">${im("cat_idle")}</button><h1>Bé học vui<small>Fun Learning</small></h1></div>
    ${tierSelectorHtml}
    <div class="cards">${cardsHtml}</div>
    <p style="margin-top:16px">
      <button class="pill" onclick="go('gate')">👨‍👩‍👧 ${T("Phụ huynh","Parents")}${vState().k==="no"?" ⚠":""}</button>
      ${!isStandalone()?`<button class="pill" id="pwa-btn" onclick="triggerPWAInstall()" style="margin-left:8px;background:var(--ok);color:#fff;font-weight:800">📲 ${T("Cài ứng dụng","Install App")}</button>`:""}
    </p>
  `;
  sayPrompt("home","Chào bé! Mình cùng học nhé","Hello! Let's learn together",300000);
}

/* ========================================================
   QUẢN LÝ BÀI TẬP PHÂN TẦNG (TIER ACTIVITIES & PLAYER)
   ======================================================== */
async function tierActivities(filterSubject){
  if(!window.ACTIVITIES_DATA){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang tải bài học vui nhộn...","Loading fun activities...")}</p></div>`;
    await loadActivities();
  }
  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[currentTier]) ? AGE_TIERS[currentTier] : { nameVi: "Bài học", nameEn: "Activities", badge: "🎯" };
  const allActs = typeof getActivitiesByTier === "function" ? getActivitiesByTier(currentTier) : [];
  const acts = (filterSubject && filterSubject !== "all") ? allActs.filter(a => a.subject === filterSubject) : allActs;

  const subjectBadges = {
    math: { vi: "Toán học", en: "Math", icon: "📐", cls: "math" },
    vietnamese: { vi: "Tiếng Việt", en: "Vietnamese", icon: "🔤", cls: "vietnamese" },
    reading: { vi: "Đọc hiểu", en: "Reading", icon: "📖", cls: "reading" },
    english: { vi: "Tiếng Anh", en: "English", icon: "🇬🇧", cls: "english" },
    logic: { vi: "Tư duy", en: "Logic", icon: "💡", cls: "logic" }
  };

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {t:T(tInfo.nameVi, tInfo.nameEn), i:tInfo.badge || "🎒"}
  ]);

  const filters = [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "math", vi: "Toán học 📐", en: "Math" },
    { id: "vietnamese", vi: "Tiếng Việt 🔤", en: "Vietnamese" },
    { id: "english", vi: "Tiếng Anh 🇬🇧", en: "English" },
    { id: "reading", vi: "Đọc hiểu 📖", en: "Reading" },
    { id: "logic", vi: "Tư duy 💡", en: "Logic" }
  ];

  m.innerHTML = `
    ${bcHtml}
    <h2>${tInfo.badge} ${T("Bài học " + tInfo.nameVi, tInfo.nameEn + " Activities")}</h2>
    <div class="chips" style="margin-bottom:12px">
      ${filters.map(f => `
        <button class="pill ${(!filterSubject && f.id === "all") || filterSubject === f.id ? "on" : ""}" onclick="tierActivities('${f.id}')">
          ${T(f.vi, f.en)}
        </button>
      `).join("")}
    </div>
    <div class="act-list-wrap"></div>
  `;

  const listWrap = m.querySelector(".act-list-wrap");
  if(listWrap){
    if(!acts.length){
      listWrap.innerHTML = `<div class="note">${T("Chưa có bài học nào trong mục này.", "No activities in this category.")}</div>`;
    } else {
      const frag = document.createDocumentFragment();
      const template = document.createElement("template");
      template.innerHTML = acts.map(act => {
        const sInfo = subjectBadges[act.subject] || { vi: act.subject, en: act.subject, icon: "⭐", cls: "math" };
        return `
          <div class="act-card" onclick="go('playActivity', '${act.id}')">
            <div class="act-card-icon">${sInfo.icon}</div>
            <div class="act-card-body">
              <div class="act-card-title">${T(act.title, act.titleEn || act.title)}</div>
              <div class="act-card-skill">🎯 ${act.skill}</div>
              <div class="act-card-meta">
                <span class="act-badge ${sInfo.cls}">${T(sInfo.vi, sInfo.en)}</span>
                <span class="act-badge reward">⭐ +${act.reward.stars} sao</span>
                <span style="font-size:12px;color:#94a3b8">Độ khó: ${Array(act.difficulty).fill("★").join("")}</span>
              </div>
            </div>
            <div style="font-size:24px;color:var(--acc)">➔</div>
          </div>
        `;
      }).join("");
      frag.appendChild(template.content);
      listWrap.appendChild(frag);
    }
  }
}

function tierActMath(){ tierActivities("math"); }
function tierActWord(){ tierActivities("vietnamese"); }
function tierActRead(){ tierActivities("reading"); }

let currentPlayingAct = null;
let actAnswered = false;
let currentActAttempts = 0;

function __completeActSuccess(act, earnedStars){
  actAnswered = true;
  if(window.Analytics) Analytics.completeActivity(earnedStars);
  stars += earnedStars;
  ls.set("stars", stars);

  recordDailyActivity();
  ST.n = (ST.n || 0) + 1;
  if(currentActAttempts === 0) ST.f = (ST.f || 0) + 1;
  if(act.subject === "math") ST.mathCount = (ST.mathCount || 0) + 1;
  else if(act.subject === "vietnamese") ST.letCount = (ST.letCount || 0) + 1;
  else if(act.subject === "reading") ST.storyCount = (ST.storyCount || 0) + 1;
  else if(act.subject === "english") ST.engCount = (ST.engCount || 0) + 1;

  if(act.skill){
    ST.skills = ST.skills || {};
    ST.skills[act.skill] = (ST.skills[act.skill] || 0) + 1;
  }
  svS();

  head();
  checkBadges();

  sfxOk();
  fx();
  catSet("celebrate");

  const starIcons = Array(earnedStars).fill("⭐").join("");
  const fbDiv = document.getElementById("actFeedback");
  const ctrlsDiv = document.getElementById("actCtrls");

  if(fbDiv){
    fbDiv.className = "act-feedback-card good";
    fbDiv.innerHTML = `🎉 <b>${T(`Chính xác! Thưởng bé ${starIcons} (+${earnedStars} sao)!`, `Correct! You earned ${starIcons} (+${earnedStars} stars)!`)}</b><br>${T(act.feedback.correct, act.feedback.correct)}`;
  }
  if(ctrlsDiv){
    ctrlsDiv.style.display = "flex";
  }
  say(`Chính xác! Thưởng bé ${earnedStars} sao! ` + act.feedback.correct, `Correct! You earned ${earnedStars} stars!`);
}

async function playActivity(actId){
  if(!window.ACTIVITIES_DATA){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang chuẩn bị bài học...","Loading activity...")}</p></div>`;
    await loadActivities();
  }
  const act = typeof getActivityById === "function" ? getActivityById(actId) : null;
  if(!act){
    tierActivities();
    return;
  }
  currentPlayingAct = act;
  actAnswered = false;
  currentActAttempts = 0;
  if(window.Analytics) Analytics.startActivity(act);

  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[act.ageTier]) ? AGE_TIERS[act.ageTier] : { nameVi: "Bài học", nameEn: "Activities", badge: "🎯" };
  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"tierActivities", t:T(tInfo.nameVi, tInfo.nameEn), i:tInfo.badge || "🎒"},
    {t:T(act.title, act.titleEn || act.title), i:"✨"}
  ]);

  const mediaHtml = act.content.media ? `
    <div class="act-media">${act.content.media}</div>
  ` : "";

  const escSay = s => String(s||"").replace(/'/g, "\\'").replace(/"/g, "&quot;");
  let bodyHtml = "";

  if(act.type === "reading_passage"){
    const storyBoxHtml = act.content.storyText ? `
      <div class="act-story-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <b>📖 ${T("Đoạn văn ngắn:","Short passage:")}</b>
          <button class="pill" style="font-size:13px;padding:4px 10px;min-height:36px;min-width:auto" onclick="say('${escSay(act.content.storyText)}', '${escSay(act.content.storyText)}')" aria-label="${T("Nghe đọc đoạn văn","Listen to passage")}">🔊 ${T("Nghe đọc","Listen")}</button>
        </div>
        ${act.content.storyText}
      </div>
    ` : "";
    const optsHtml = (act.options || []).map((opt, idx) => `
      <button class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChoose('${opt.id}', this)" aria-label="${opt.text}">
        <span class="act-opt-bullet">${idx + 1}</span>
        <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        <button type="button" class="act-opt-audio" onclick="event.stopPropagation(); say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </button>
    `).join("");
    bodyHtml = `
      ${storyBoxHtml}
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(act.content.question)}', '${escSay(act.content.questionEn || act.content.question)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(act.content.question, act.content.questionEn || act.content.question)}
      </div>
      <div class="act-options">${optsHtml}</div>
    `;
  } else if(act.type === "fill_blank"){
    const templateStr = act.content.template || "___";
    const blankHtml = templateStr.replace(/\[\s*\?\s*\]/g, `<span class="act-blank-slot" id="actBlankSlot">?</span>`);
    const optsHtml = (act.options || []).map((opt, idx) => `
      <button class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChooseBlank('${opt.id}', '${esc(opt.text)}', this)" aria-label="${opt.text}">
        <span class="act-opt-bullet">${idx + 1}</span>
        <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        <button type="button" class="act-opt-audio" onclick="event.stopPropagation(); say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </button>
    `).join("");
    bodyHtml = `
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(act.content.question)}', '${escSay(act.content.questionEn || act.content.question)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(act.content.question, act.content.questionEn || act.content.question)}
      </div>
      <div class="act-blank-box">${blankHtml}</div>
      <div class="act-options">${optsHtml}</div>
    `;
  } else if(act.type === "matching"){
    const pairs = act.content.pairs || [];
    window.__matchState = { selLeft: null, matchedIds: new Set(), total: pairs.length };
    const leftPairs = pairs;
    const rightPairs = shuf([...pairs]);
    bodyHtml = `
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(act.content.question)}', '${escSay(act.content.questionEn || act.content.question)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(act.content.question, act.content.questionEn || act.content.question)}
      </div>
      <div style="font-size:13px;color:#334155;font-weight:700;margin-bottom:8px">👆 ${T("Chạm 1 ô bên trái rồi chạm ô tương ứng bên phải nhé:","Tap an item on the left, then tap its match on the right:")}</div>
      <div class="act-match-grid">
        <div class="act-match-col">
          ${leftPairs.map(p => `<button class="act-match-btn" id="match-l-${p.id}" onclick="window.__matchTapLeft('${p.id}', this)" aria-label="${p.left}">${p.left}</button>`).join("")}
        </div>
        <div class="act-match-col">
          ${rightPairs.map(p => `<button class="act-match-btn" id="match-r-${p.id}" onclick="window.__matchTapRight('${p.id}', this)" aria-label="${p.right}">${p.right}</button>`).join("")}
        </div>
      </div>
    `;
  } else if(act.type === "drag_drop"){
    const seq = act.content.correctSequence || [];
    const slotsCount = act.content.slots || seq.length;
    const tokens = act.content.tokens || [];
    window.__sortState = { slotted: Array(slotsCount).fill(null), tokens, sequence: seq };
    const slotsHtml = Array(slotsCount).fill(0).map((_, idx) => `
      <button class="act-slot" id="sort-slot-${idx}" onclick="window.__slotTap(${idx})" title="${T("Chạm để gỡ ra","Tap to remove")}" aria-label="${T("Ô số " + (idx+1), "Slot " + (idx+1))}">___</button>
    `).join("");
    const tokensHtml = tokens.map(tok => `
      <button class="act-token-btn" id="token-btn-${tok.id}" onclick="window.__tokenTap('${tok.id}', '${esc(tok.text)}')">${tok.text}</button>
    `).join("");
    bodyHtml = `
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(act.content.question)}', '${escSay(act.content.questionEn || act.content.question)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(act.content.question, act.content.questionEn || act.content.question)}
      </div>
      <div style="font-size:13.5px;color:#334155;font-weight:700;margin-bottom:6px">👆 ${T("Chạm vào từ/số bên dưới để đưa lên ô trống, chạm vào ô để gỡ ra:","Tap token below to place in slot, tap slot to remove:")}</div>
      <div class="act-sort-slots" id="actSortSlots">${slotsHtml}</div>
      <div class="act-sort-tray" id="actSortTray">${tokensHtml}</div>
      <div style="text-align:center;margin-top:6px">
        <button class="pill" onclick="window.__resetSort()" style="font-size:14px;padding:6px 14px;min-height:42px">🔄 ${T("Xếp lại từ đầu","Reset")}</button>
      </div>
    `;
  } else {
    // Standard image_quiz / quiz
    const optsHtml = (act.options || []).map((opt, idx) => `
      <button class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChoose('${opt.id}', this)" aria-label="${opt.text}">
        <span class="act-opt-bullet">${idx + 1}</span>
        <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        <button type="button" class="act-opt-audio" onclick="event.stopPropagation(); say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </button>
    `).join("");
    bodyHtml = `
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(act.content.question)}', '${escSay(act.content.questionEn || act.content.question)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(act.content.question, act.content.questionEn || act.content.question)}
      </div>
      <div class="act-options">${optsHtml}</div>
    `;
  }

  m.innerHTML = `
    ${bcHtml}
    <div class="act-player-box">
      <div class="act-meta-row">
        <span>🎯 ${act.skill}</span>
        <button class="pill act-read-all-btn" onclick="window.__readActAloud()" aria-label="${T("Đọc to toàn bộ câu hỏi và đáp án","Read question and options aloud")}">🔊 ${T("Đọc to cả bài","Read all aloud")}</button>
      </div>
      ${bodyHtml}
      <div id="actFeedback"></div>
      <div class="act-ctrl-row" id="actCtrls" style="display:none">
        <button class="cg-btn-replay" onclick="window.__nextAct()">
          ${T("Bài tiếp theo ➡️", "Next Lesson ➡️")}
        </button>
        <button class="cg-btn-back" onclick="go('tierActivities')">
          🔙 ${T("Quay lại danh mục", "Back to Lessons")}
        </button>
      </div>
    </div>
  `;

  say(act.content.question, act.content.questionEn || act.content.question);
  catSet("thinking");
}

window.__readActAloud = function(){
  if(!currentPlayingAct) return;
  const act = currentPlayingAct;
  let qVi = act.content.question;
  let qEn = act.content.questionEn || act.content.question;
  if(act.content.storyText){
    qVi = act.content.storyText + ". " + qVi;
    qEn = act.content.storyText + ". " + qEn;
  }
  if(act.options && act.options.length){
    const optsVi = act.options.map((o, i) => `Đáp án ${i+1}: ${o.text}`).join(". ");
    const optsEn = act.options.map((o, i) => `Option ${i+1}: ${o.textEn || o.text}`).join(". ");
    qVi += ". " + optsVi;
    qEn += ". " + optsEn;
  }
  say(qVi, qEn);
};

window.__actChoose = function(chosenId, btn){
  if(actAnswered || !currentPlayingAct) return;
  const act = currentPlayingAct;
  const isRight = String(chosenId) === String(act.correctAnswer);
  if(window.Analytics) Analytics.answerActivity(isRight, chosenId);
  const fbDiv = document.getElementById("actFeedback");

  if(isRight){
    btn.classList.add("good");
    const sp = btn.querySelector("span");
    if(sp) sp.textContent = "✔";
    const earnedStars = currentActAttempts === 0 ? 3 : (currentActAttempts === 1 ? 2 : 1);
    __completeActSuccess(act, earnedStars);
  } else {
    currentActAttempts++;
    btn.classList.add("bad");
    const sp = btn.querySelector("span");
    if(sp) sp.textContent = "✖";
    btn.disabled = true;
    sfxNo();
    catSet("sad");
    if(fbDiv){
      fbDiv.className = "act-feedback-card bad";
      fbDiv.innerHTML = `💡 <b>${T("Chưa chính xác!", "Not quite!")}</b><br>${T(act.feedback.wrong, act.feedback.wrong)}${act.feedback.hint ? `<br><i>Gợi ý: ${act.feedback.hint}</i>` : ""}`;
    }
    say(act.feedback.wrong, act.feedback.wrong);
    setTimeout(() => { catSet("thinking"); }, 900);
  }
};

window.__actChooseBlank = function(chosenId, optText, btn){
  if(actAnswered || !currentPlayingAct) return;
  const act = currentPlayingAct;
  const isRight = String(chosenId) === String(act.correctAnswer);
  if(window.Analytics) Analytics.answerActivity(isRight, chosenId);
  const slot = document.getElementById("actBlankSlot");
  const fbDiv = document.getElementById("actFeedback");

  if(isRight){
    if(slot){ slot.textContent = optText; slot.className = "act-blank-slot good"; }
    btn.classList.add("good");
    const sp = btn.querySelector("span");
    if(sp) sp.textContent = "✔";
    const earnedStars = currentActAttempts === 0 ? 3 : (currentActAttempts === 1 ? 2 : 1);
    __completeActSuccess(act, earnedStars);
  } else {
    currentActAttempts++;
    if(slot){
      slot.textContent = optText;
      slot.className = "act-blank-slot bad";
      setTimeout(() => { if(!actAnswered){ slot.textContent = "?"; slot.className = "act-blank-slot"; } }, 800);
    }
    btn.classList.add("bad");
    const sp = btn.querySelector("span");
    if(sp) sp.textContent = "✖";
    btn.disabled = true;
    sfxNo();
    catSet("sad");
    if(fbDiv){
      fbDiv.className = "act-feedback-card bad";
      fbDiv.innerHTML = `💡 <b>${T("Chưa chính xác!", "Not quite!")}</b><br>${T(act.feedback.wrong, act.feedback.wrong)}${act.feedback.hint ? `<br><i>Gợi ý: ${act.feedback.hint}</i>` : ""}`;
    }
    say(act.feedback.wrong, act.feedback.wrong);
    setTimeout(() => { catSet("thinking"); }, 900);
  }
};

window.__matchTapLeft = function(pairId, btn){
  if(actAnswered || !currentPlayingAct || !window.__matchState) return;
  if(window.__matchState.matchedIds.has(pairId)) return;
  window.__matchState.selLeft = pairId;
  document.querySelectorAll(".act-match-col:first-child .act-match-btn").forEach(b => {
    if(!b.classList.contains("matched")) b.classList.remove("sel");
  });
  btn.classList.add("sel");
  const p = (currentPlayingAct.content.pairs || []).find(x => x.id === pairId);
  if(p) say(p.left, p.left);
};

window.__matchTapRight = function(pairId, btn){
  if(actAnswered || !currentPlayingAct || !window.__matchState) return;
  if(window.__matchState.matchedIds.has(pairId)) return;
  const sel = window.__matchState.selLeft;
  if(!sel){
    say("Bé hãy chạm vào 1 ô bên trái trước nhé!", "Tap an item on the left first!");
    return;
  }
  const leftBtn = document.getElementById("match-l-" + sel);
  if(sel === pairId){
    if(window.Analytics) Analytics.answerActivity(true, pairId);
    window.__matchState.matchedIds.add(pairId);
    window.__matchState.selLeft = null;
    if(leftBtn){ leftBtn.classList.remove("sel"); leftBtn.classList.add("matched"); leftBtn.innerHTML += " ✔"; }
    btn.classList.add("matched");
    btn.innerHTML += " ✔";
    sfxOk();
    fx();
    const p = (currentPlayingAct.content.pairs || []).find(x => x.id === pairId);
    if(p) say(p.right, p.right);
    if(window.__matchState.matchedIds.size === window.__matchState.total){
      const earnedStars = currentActAttempts === 0 ? 3 : (currentActAttempts === 1 ? 2 : 1);
      __completeActSuccess(currentPlayingAct, earnedStars);
    }
  } else {
    currentActAttempts++;
    if(window.Analytics) Analytics.answerActivity(false, pairId);
    if(leftBtn) leftBtn.classList.add("bad");
    btn.classList.add("bad");
    sfxNo();
    catSet("sad");
    setTimeout(() => {
      if(leftBtn) leftBtn.classList.remove("bad", "sel");
      btn.classList.remove("bad");
      window.__matchState.selLeft = null;
      catSet("thinking");
    }, 700);
    const fbDiv = document.getElementById("actFeedback");
    if(fbDiv){
      fbDiv.className = "act-feedback-card bad";
      fbDiv.innerHTML = `💡 <b>${T("Chưa ghép đúng cặp!", "Not a match!")}</b><br>${T(currentPlayingAct.feedback.wrong, currentPlayingAct.feedback.wrong)}`;
    }
    say(currentPlayingAct.feedback.wrong, currentPlayingAct.feedback.wrong);
  }
};

window.__tokenTap = function(tokId, tokText){
  if(actAnswered || !window.__sortState) return;
  const emptyIdx = window.__sortState.slotted.findIndex(x => x === null);
  if(emptyIdx === -1) return;
  window.__sortState.slotted[emptyIdx] = { id: tokId, text: tokText };
  const slotEl = document.getElementById("sort-slot-" + emptyIdx);
  if(slotEl){ slotEl.textContent = tokText; slotEl.className = "act-slot filled"; }
  const tBtn = document.getElementById("token-btn-" + tokId);
  if(tBtn){ tBtn.classList.add("used"); }
  say(tokText, tokText);

  if(window.__sortState.slotted.every(x => x !== null)){
    window.__checkSortResult();
  }
};

window.__slotTap = function(idx){
  if(actAnswered || !window.__sortState) return;
  const item = window.__sortState.slotted[idx];
  if(!item) return;
  window.__sortState.slotted[idx] = null;
  const slotEl = document.getElementById("sort-slot-" + idx);
  if(slotEl){ slotEl.textContent = "___"; slotEl.className = "act-slot"; }
  const tBtn = document.getElementById("token-btn-" + item.id);
  if(tBtn){ tBtn.classList.remove("used"); }
  const fbDiv = document.getElementById("actFeedback");
  if(fbDiv && fbDiv.classList.contains("bad")) fbDiv.innerHTML = "";
};

window.__resetSort = function(){
  if(actAnswered || !window.__sortState) return;
  window.__sortState.slotted.fill(null);
  document.querySelectorAll(".act-slot").forEach(s => { s.textContent = "___"; s.className = "act-slot"; });
  document.querySelectorAll(".act-token-btn").forEach(b => { b.classList.remove("used"); });
  const fbDiv = document.getElementById("actFeedback");
  if(fbDiv) fbDiv.innerHTML = "";
};

window.__checkSortResult = function(){
  const act = currentPlayingAct;
  const currentTexts = window.__sortState.slotted.map(x => x.text);
  const expected = window.__sortState.sequence;
  const isMatch = currentTexts.length === expected.length && currentTexts.every((t, i) => t.trim().toLowerCase() === expected[i].trim().toLowerCase());
  if(window.Analytics) Analytics.answerActivity(isMatch, currentTexts.join(" "));

  if(isMatch){
    document.querySelectorAll(".act-slot").forEach(s => { s.className = "act-slot good"; });
    const earnedStars = currentActAttempts === 0 ? 3 : (currentActAttempts === 1 ? 2 : 1);
    __completeActSuccess(act, earnedStars);
  } else {
    currentActAttempts++;
    document.querySelectorAll(".act-slot").forEach(s => {
      s.classList.add("bad");
      setTimeout(() => s.classList.remove("bad"), 800);
    });
    sfxNo();
    catSet("sad");
    const fbDiv = document.getElementById("actFeedback");
    if(fbDiv){
      fbDiv.className = "act-feedback-card bad";
      fbDiv.innerHTML = `💡 <b>${T("Chưa đúng thứ tự rồi bé ơi!", "Incorrect order!")}</b><br>${T(act.feedback.wrong, act.feedback.wrong)}${act.feedback.hint ? `<br><i>Gợi ý: ${act.feedback.hint}</i>` : ""}<br><small style="color:#64748b">${T("Chạm vào ô để gỡ ra hoặc bấm 'Xếp lại từ đầu' nhé!","Tap a slot to remove or tap Reset!")}</small>`;
    }
    say(act.feedback.wrong, act.feedback.wrong);
    setTimeout(() => catSet("thinking"), 900);
  }
};

window.__nextAct = function(){
  if(!currentPlayingAct) { tierActivities(); return; }
  const allActs = getActivitiesByTier(currentPlayingAct.ageTier);
  const currIdx = allActs.findIndex(a => a.id === currentPlayingAct.id);
  const nextAct = allActs[(currIdx + 1) % allActs.length];
  if(nextAct){
    go('playActivity', nextAct.id);
  } else {
    go('tierActivities');
  }
};

const sayN=n=>say(NV[n],NE[n]);
function cnt(b,i){sayN(i);b.style.animation="none";void b.offsetWidth;b.style.animation="pop .4s"}
function numL(n=1){const o=COUNT[n%COUNT.length];
 ST.numCount=(ST.numCount||0)+1;svS();checkBadges();
 m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Học số","Numbers"),i:"🔢"}],`<button class="pill" onclick="go('numP')">🎮 ${T("Chơi","Play")}</button>`)}<div class="stage"><button class="nav" onclick="numL(${(n+20)%21})">${im("btn_back")}</button><button class="bignum${n>9?" two":""}" onclick="sayN(${n})">${n}</button><button class="nav" onclick="numL(${(n+1)%21})">${im("btn_next")}</button></div><div class="word">${NV[n]} · ${NE[n]}</div><div class="objs">${n?Array.from({length:n},(_,i)=>`<button class="ob" onclick="cnt(this,${i+1})">${im(o)}</button>`).join(""):"<span>Không có gì · Nothing</span>"}</div><div class="chips" style="gap:10px">${[...Array(21).keys()].map(i=>`<button class="chip ${i==n?"on":""}" style="min-width:48px;min-height:48px;margin:2px" onclick="numL(${i})">${i}</button>`).join("")}</div>`;if(!isBackNav)sayN(n)}
function numP(){if(!R(0,2))return numF();const n=R(1,MX()),o=pick(COUNT),c=new Set([n]);while(c.size<3)c.add(R(1,MX()));
 quiz(T("Có bao nhiêu?","How many?"),"Có bao nhiêu?","How many?",`<div class="objs">${Array.from({length:n},()=>im(o,"")).join("").replace(/<img/g,'<img style="width:clamp(48px,11vw,72px)"')}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,numP,()=>["",NV[n],NE[n]])}
function letL(){const arr=LET_ALL();m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Chữ cái","Letters"),i:"🔤"}],`<button class="pill" onclick="go('letP')">🎮 ${T("Chơi","Play")}</button>`)}<h2>${T("Chạm vào chữ cái","Tap a letter")}</h2><div class="lgrid">${arr.map(L=>`<button onclick="go('letD','${L}')">${imL(L)}</button>`).join("")}</div>`;sayPrompt("letL","Chạm vào chữ cái nhé","Tap a letter",180000);need("s")}
function letD(L){const arr=LET_ALL(),i=arr.indexOf(L),it=exLD(L),fb=lang==="vi"&&!exL(L,"vi").length;
 ST.letCount=(ST.letCount||0)+1;svS();checkBadges();
 m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"letL",t:T("Chữ cái","Letters"),i:"🔤"},{t:T("Chữ "+L,"Letter "+L),i:"✨"}])}<div class="stage"><button class="nav" onclick="letD('${arr[(i+arr.length-1)%arr.length]}')">${im("btn_back")}</button><button onclick="sayAs('${lang==="vi"?"vi":"en"}','${L}','${L}');rp(this)">${spr(L,"clamp(150px,30vw,230px)")}</button><button class="nav" onclick="letD('${arr[(i+1)%arr.length]}')">${im("btn_next")}</button></div>${fb?`<div class="note">${T(`Chữ ${L} ít dùng trong tiếng Việt, thường gặp ở từ mượn. Mình xem từ tiếng Anh nhé`,`The letter ${L} is rare in Vietnamese. Here are English words`)}</div>`:""}<div class="pair">${it.map(k=>{const x=EXA[k];return`<button onclick="sayAs('${x.l}','${x.t}','${x.t}');rp(this)">${spr(x.img,"100px")}<span>${x.t}</span>${lang==="both"||x.l!==lang?`<small>${x.l==="vi"?"🇻🇳":"🇬🇧"}</small>`:""}</button>`}).join("")}</div>`;sayAs(lang==="vi"?"vi":"en",L,L);need("s").then(upSpr)}
function sayL(L){if(lang==="en"){const it=exLD(L),e=it.filter(k=>EXA[k].l==="en").map(k=>EXA[k].t);say(L,`${L}${e.length?". "+e.join(". "):""}`);return}const it=exLD(L),v=it.filter(k=>EXA[k].l==="vi").map(k=>EXA[k].t),e=it.filter(k=>EXA[k].l==="en").map(k=>EXA[k].t),fb=lang==="vi"&&!v.length;
 say(`${L}${v.length?". "+v.join(". "):""}`,`${L}${!fb&&e.length?". "+e.join(". "):""}`)}
function letP(){if(!R(0,2))return letO();const l=ql=qL(),k=pick(exP(l)),L=EXA[k].L,c=new Set([L]);while(c.size<3)c.add(pick(exPL(l)));
 quiz(T("Chữ cái đầu tiên là gì?","What letter does it start with?"),"Chữ cái đầu tiên là gì?","What letter does it start with?",im(EXA[k].img,"big"),shuf([...c]).map(v=>({k:v,h:imL(v)})),L,letP,()=>["",l==="vi"?`${LET_VI.indexOf(L)>=0?LV[LET_VI.indexOf(L)]:L}. ${EXA[k].t}`:"",l==="en"?`${L}. ${EXA[k].t}`:""])}

function cmp(){let a=R(1,Math.min(MX(),10)),b=R(1,Math.min(MX(),10));if(!R(0,3))b=a;const more=R(0,1)==0,o1=pick(COUNT),o2=pick(COUNT);
 const right=a==b?"eq":more?(a>b?"a":"b"):(a<b?"a":"b"),grp=(n,o)=>`<div class="grp">${Array.from({length:n},()=>im(o)).join("")}</div>`;
 const q=more?["Bên nào NHIỀU hơn?","Which has MORE?"]:["Bên nào ÍT hơn?","Which has FEWER?"];
 quiz(T(q[0],q[1]),q[0],q[1],"",[{k:"a",h:grp(a,o1)},{k:"eq",h:`<span class="ans">=</span>${T("Bằng nhau","Same")}`},{k:"b",h:grp(b,o2)}],right,cmp,()=>{
  if(a==b)return[`<div class="eq">${a} = ${b}</div>`,`${NV[a]} bằng ${NV[b]}. Hai bên bằng nhau!`,`${NE[a]} equals ${NE[b]}. They are the same!`];
  const w=right=="a"?a:b,l=right=="a"?b:a;
  return[`<div class="eq">${a} ${a>b?">":"<"} ${b}</div>`,`${NV[w]} ${more?"nhiều":"ít"} hơn ${NV[l]}`,`${NE[w]} is ${more?"more":"fewer"} than ${NE[l]}`]},"cmp")}
function quiz(qh,qv,qe,body,opts,right,next,extra,cls=""){const strip=h=>String(h).replace(/<img[^>]*>/g,"¤"),sig=qv+"|"+right+"|"+strip(body)+(cls==="cmp"?"|"+opts.map(o=>strip(o.h)).join("¦"):"");if(sig===lastSig&&dupN++<8)return next();dupN=0;lastSig=sig;done=false;let wr=0;catSet("thinking");
 const QBC={numP:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"numL",t:T("Học số","Numbers"),i:"🔢"},{t:T("Đố đếm số","Quiz"),i:"❓"}],letP:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"letL",t:T("Chữ cái","Letters"),i:"🔤"},{t:T("Đố chữ cái","Quiz"),i:"❓"}],mis:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Số còn thiếu","Missing"),i:"🔢"}],cmpS:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Dấu so sánh","Signs"),i:"⚖️"}],math10:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Toán 10","Math 10"),i:"➕"}],cmp:[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("So sánh","Compare"),i:"⚖️"}]};
 const bcHtml=kbc(QBC[cur]||[{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Câu đố","Quiz"),i:"❓"}]);
 m.innerHTML=`${bcHtml}<h2 id="q">🔊 ${qh}</h2><div>${body}</div><div class="opts ${cls}">${opts.map(o=>`<button class="opt" data-k="${o.k}">${o.h}</button>`).join("")}</div><div id="res"></div>`;
 document.getElementById("q").onclick=()=>say(qv,qe);say(qv,qe);
 m.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(done)return;
  if(b.dataset.k==String(right)){
   done=true;b.classList.add("good");sfxOk();fx();
   if(wr){rd.st=0}else{rd.st++;rd.f++}
   if(rd.st>(ST.maxStreak||0)){ST.maxStreak=rd.st;svS();}
   if(cur==="numP"||cur==="mis")ST.numCount=(ST.numCount||0)+1;
   if(cur==="letP")ST.letCount=(ST.letCount||0)+1;
   if(cur==="math10")ST.mathCount=(ST.mathCount||0)+1;
   rd.n++;sta(wr==0);catSet(rd.st>=3?"celebrate":"happy");
   stars++;ls.set("stars",stars);head();checkBadges();
   const[h,v,e]=extra(),p=pick(PR);document.getElementById("res").innerHTML=h;say(p[0]+" "+v,p[1]+" "+e);adv(rd.n>=(RL[cur]||ROUND)?result:next);
  }
  else{wr++;rd.st=0;stw(right);b.classList.add("bad");sfxNo();catSet("sad");if(wr>=2){const g=m.querySelector('.opt[data-k="'+right+'"]');if(g)g.classList.add("hint");say("Bé nhìn chỗ này nè","Look here")}else{const w=pick(ER);say(w[0],w[1])}setTimeout(()=>{b.classList.remove("bad");if(!done)catSet(wr>=2?"pointing":"thinking")},900)}})}
function numF(){const n=R(0,MX()),c=new Set([n]);while(c.size<3)c.add(R(0,MX()));
 quiz(T(`Tìm số ${NV[n]}`,`Find the number ${NE[n]}`),`Tìm số ${NV[n]}`,`Find the number ${NE[n]}`,"",shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,numP,()=>["",NV[n],NE[n]])}
function letO(){const l=ql=qL(),L=pick(exPL(l)),k=pick(exPK(l,L)),c=new Set([k]);while(c.size<3){const o=pick(exP(l));if(EXA[o].L!==L)c.add(o)}
 quiz(T(`Hình nào bắt đầu bằng chữ ${L}?`,`Which starts with ${L}?`),`Hình nào bắt đầu bằng chữ ${LV[LET.indexOf(L)]}?`,`Which one starts with ${L}?`,imL(L,"big"),shuf([...c]).map(v=>({k:v,h:im(EXA[v].img)})),k,letP,()=>["",l==="vi"?`${LV[LET.indexOf(L)]}. ${EXA[k].t}`:"",l==="en"?`${L}. ${EXA[k].t}`:""])}

function result(){
  const g=cur,f=rd.f,N=RL[cur]||ROUND,lv=adapt(f/N);
  const starCount = (f === N) ? 3 : (f >= Math.ceil(N * 0.6) ? 2 : 1);
  stars += starCount;
  ls.set("stars", stars);
  recordDailyActivity();
  head();
  checkBadges();

  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Kết quả","Results"),i:"🏆"}])}<div class="stage">${im("trophy","big")}</div><h2>${T("Hoàn thành!","All done!")}</h2>${lv?`<h2>${lv}</h2>`:""}<div class="eq">${f} / ${N}</div><div class="objs">${Array.from({length:3},(_,i)=>im("gstar").replace("<img",`<img style="width:56px;${i<starCount?"":"filter:grayscale(1);opacity:.35"}"`)).join("")}</div><div class="stage"><button class="nav" onclick="go('${g}')">${im("btn_replay")}</button><button class="nav" onclick="go('home')">${im("btn_home")}</button></div>`;
  ql=null;catSet("celebrate");fx();
  triggerCelebration(T("Hoàn thành xuất sắc!","All Done!"),T(`Bé làm đúng ${f} trên ${N} câu và nhận được ${starCount} sao! Giỏi quá!`,`You got ${f} out of ${N} right and earned ${starCount} stars!`),"🏆",Array(starCount).fill("⭐").join(""));
  say(`Bé làm đúng ${NV[f]} trên ${NV[N]} câu, thưởng bé ${starCount} sao. Giỏi lắm!`,`You got ${NE[f]} out of ${NE[N]}, you earned ${starCount} stars. Great job!`);
}
function setLv(v){lvl=v;ls.set("lvl",v);home();tok++;if(SS)SS.cancel()}
function win(wr,next,vi,en){
  if(wr){rd.st=0}else{rd.st++;rd.f++}
  if(rd.st>(ST.maxStreak||0)){ST.maxStreak=rd.st;svS();}
  rd.n++;sta(!wr);stars++;ls.set("stars",stars);head();checkBadges();
  sfxOk();fx();catSet(rd.st>=3?"celebrate":"happy");
  const p=pick(PR);say(p[0]+" "+vi,p[1]+" "+en);
  adv(rd.n>=(RL[cur]||ROUND)?result:next);
}
const bk=(curT,parentS="games",parentT=T("Trò chơi","Games"),action="")=>kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:parentS,t:parentT,i:parentS==="games"?"🎮":"📚"},...(curT?[{t:curT,i:"✨"}]:[])],action);
function games(){m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Trò chơi","Games"),i:"🎮"}])}<h2>${T("Trò chơi","Games")}</h2><div class="cards">${card("countGame","<b>🍎 3 ⭐</b>","Đếm hình chọn số","Count & Match","game")}${card("mis","<b>1 2 ? 4</b>","Số còn thiếu","Missing number","math")}${card("match",im("apple")+imL("A"),"Ghép chữ và hình","Match","vietnamese")}${card("mem",im("cat")+im("cat"),"Lật thẻ","Memory","logic")}${card("trace",im("pencil")+"<b>Aa1</b>","Tập viết chữ & nét","Handwriting practice","trace")}${card("cmpS","<b>&gt; = &lt;</b>","Dấu so sánh","Signs","math")}</div>`;sayPrompt("games","Bé chọn trò chơi nhé","Pick a game",180000)}

/* ========================================================
   TRÒ CHƠI HỌC TẬP TIỀN TIỂU HỌC: ĐẾM HÌNH CHỌN SỐ (COUNT GAME)
   ======================================================== */
const COUNT_ITEMS_POOL = [
  { emoji: "🍎", nameVi: "quả táo", nameEn: "apples" },
  { emoji: "🐱", nameVi: "chú mèo", nameEn: "cats" },
  { emoji: "🚗", nameVi: "ô tô", nameEn: "cars" },
  { emoji: "⭐", nameVi: "ngôi sao", nameEn: "stars" },
  { emoji: "🎈", nameVi: "bóng bay", nameEn: "balloons" },
  { emoji: "🐥", nameVi: "gà con", nameEn: "chicks" },
  { emoji: "🍓", nameVi: "dâu tây", nameEn: "strawberries" },
  { emoji: "🐰", nameVi: "chú thỏ", nameEn: "bunnies" },
  { emoji: "🍦", nameVi: "cây kem", nameEn: "ice creams" },
  { emoji: "🍉", nameVi: "miếng dưa", nameEn: "watermelons" },
  { emoji: "🐻", nameVi: "chú gấu", nameEn: "teddy bears" },
  { emoji: "🚀", nameVi: "tên lửa", nameEn: "rockets" }
];

let cgState = {
  qIndex: 0,
  score: 0,
  total: 5,
  questions: [],
  answered: false,
  countedItems: new Set()
};

function initCountGame(){
  const pool = shuf([...COUNT_ITEMS_POOL]);
  const nums = shuf([1, 2, 3, 4, 5, 6, 7]).slice(0, 5);
  const questions = [];
  for(let i = 0; i < 5; i++){
    const item = pool[i % pool.length];
    const target = nums[i];
    const c = new Set([target]);
    while(c.size < 3){
      const offset = pick([-2, -1, 1, 2, 3]);
      let cand = target + offset;
      if(cand < 1) cand = target + R(1, 3);
      if(cand > 9) cand = target - R(1, 3);
      if(cand >= 1 && cand <= 9 && cand !== target) c.add(cand);
    }
    questions.push({
      item,
      target,
      options: shuf([...c]),
      attempted: false
    });
  }
  cgState = {
    qIndex: 0,
    score: 0,
    total: 5,
    questions,
    answered: false,
    countedItems: new Set()
  };
}

function countGame(isReplay){
  if(isReplay || !cgState.questions || cgState.questions.length !== 5 || cgState.qIndex >= 5){
    initCountGame();
  }
  renderCountQuestion();
}

function renderCountQuestion(){
  const { qIndex, total, questions } = cgState;
  if(qIndex >= total){
    renderCountResult();
    return;
  }
  cgState.answered = false;
  cgState.countedItems = new Set();
  const q = questions[qIndex];
  const item = q.item;
  const count = q.target;
  const viPrompt = `Có bao nhiêu ${item.nameVi}?`;
  const enPrompt = `How many ${item.nameEn}?`;

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"games", t:T("Trò chơi","Games"), i:"🎮"},
    {t:T("Đếm hình chọn số","Count & Match"), i:"🍎"}
  ]);

  const dotsHtml = Array.from({length: total}, (_, i) => {
    const cls = i < qIndex ? "done" : (i === qIndex ? "cur" : "");
    return `<span class="cg-dot ${cls}"></span>`;
  }).join("");

  const itemsHtml = Array.from({length: count}, (_, i) => {
    return `<button class="cg-item-btn" data-i="${i+1}" onclick="window.__cgCountTap(this, ${i+1})" aria-label="${i+1}">
      ${item.emoji}
      <span class="cg-badge">${i+1}</span>
    </button>`;
  }).join("");

  const optsHtml = q.options.map(num => {
    return `<button class="cg-opt-btn" data-n="${num}" onclick="window.__cgChoose(${num}, this)">
      <span class="cg-opt-num">${num}</span>
    </button>`;
  }).join("");

  m.innerHTML = `${bcHtml}
  <div class="cg-wrap">
    <div class="cg-progress">
      <span>${T(`Câu ${qIndex + 1} / ${total}`, `Question ${qIndex + 1} / ${total}`)}</span>
      <div class="cg-progress-bar">
        <div class="cg-progress-fill" style="width:${Math.round(((qIndex + 1) / total) * 100)}%"></div>
      </div>
      <div class="cg-dots">${dotsHtml}</div>
    </div>

    <div class="cg-stage">
      <div class="cg-prompt" id="cgPrompt" onclick="say('${viPrompt}', '${enPrompt}')" title="${T("Bấm để nghe lại câu hỏi","Tap to listen again")}">
        <span>🔊</span> ${T(viPrompt, enPrompt)}
      </div>
      <div class="cg-items-box">
        ${itemsHtml}
      </div>
      <div class="cg-hint-text">${T("💡 Chạm vào từng hình để bé cùng đếm nhé!","💡 Tap each item to count together!")}</div>
      
      <div class="cg-opts">
        ${optsHtml}
      </div>

      <div class="cg-feedback" id="cgFeedback"></div>
    </div>
  </div>`;

  say(viPrompt, enPrompt);
  catSet("thinking");
}

window.__cgCountTap = function(btn, num){
  if(rmOn()) return;
  sfxTap();
  btn.classList.add("counted");
  btn.style.animation = "pop .3s ease";
  setTimeout(() => { btn.style.animation = ""; }, 300);
  cgState.countedItems.add(num);
  sayN(num);
};

window.__cgChoose = function(chosen, btn){
  if(cgState.answered) return;
  const q = cgState.questions[cgState.qIndex];
  const fb = document.getElementById("cgFeedback");

  if(chosen === q.target){
    cgState.answered = true;
    if(!q.attempted){
      cgState.score++;
    }
    btn.classList.add("good");
    sfxOk();
    fx();
    catSet("celebrate");
    const praise = pick(PR);
    if(fb){
      fb.className = "cg-feedback good";
      fb.innerHTML = `🎉 ${T(praise[0], praise[1])} ${T("Đúng rồi!", "That's right!")} ⭐`;
    }
    say(`${praise[0]} Có ${NV[q.target]} ${q.item.nameVi}.`, `${praise[1]} There are ${NE[q.target]} ${q.item.nameEn}.`);
    
    setTimeout(() => {
      cgState.qIndex++;
      renderCountQuestion();
    }, 1250);
  } else {
    q.attempted = true;
    btn.classList.add("bad");
    btn.disabled = true;
    sfxNo();
    catSet("sad");
    if(fb){
      fb.className = "cg-feedback bad";
      fb.innerHTML = `💡 ${T("Bé đếm lại cẩn thận rồi chọn nhé!","Count again carefully and try!")}`;
    }
    say("Bé thử đếm lại nhé", "Try counting again");
    setTimeout(() => {
      catSet("thinking");
    }, 900);
  }
};

function renderCountResult(){
  const { score, total } = cgState;
  // Tính sao 1-3 theo độ chính xác:
  // 5/5 -> 3 sao, 3-4/5 -> 2 sao, 1-2/5 -> 1 sao
  const starCount = score === 5 ? 3 : (score >= 3 ? 2 : 1);
  stars += starCount;
  ls.set("stars", stars);
  recordDailyActivity();
  head();
  checkBadges();

  const now = new Date();
  const dateFormatted = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} - ${now.getDate()}/${now.getMonth() + 1}`;
  const saveObj = {
    score,
    total,
    stars: starCount,
    timestamp: Date.now(),
    dateStr: dateFormatted
  };
  ls.set("kids_count_game_last", JSON.stringify(saveObj));

  let lastRecordText = "";
  try {
    const raw = ls.get("kids_count_game_last", "");
    if(raw){
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if(parsed && parsed.score !== undefined){
        lastRecordText = T(
          `🕒 Lần chơi gần nhất: ${parsed.score}/${parsed.total} câu đúng (${parsed.dateStr})`,
          `🕒 Last played: ${parsed.score}/${parsed.total} correct (${parsed.dateStr})`
        );
      }
    }
  } catch(e){}

  const starsHtml = Array.from({length: 3}, (_, i) => {
    return i < starCount ? `<span>⭐</span>` : `<span style="opacity:0.25;filter:grayscale(1)">⭐</span>`;
  }).join("");

  let msgVi = "Bé rất chăm chỉ và đáng khen!";
  let msgEn = "Great effort! Keep practicing!";
  if(score === 5){
    msgVi = "Xuất sắc! Bé là thiên tài đếm số! 🌟";
    msgEn = "Outstanding! You are a counting master! 🌟";
  } else if(score >= 4){
    msgVi = "Rất giỏi! Bé đếm số rất cừ khôi! 👏";
    msgEn = "Awesome job! You did so well! 👏";
  } else if(score >= 3){
    msgVi = "Tốt lắm! Cùng luyện tập để đạt điểm tuyệt đối nhé! 💪";
    msgEn = "Good job! Play again to get 3/3 stars! 💪";
  }

  triggerCelebration(
    T("Hoàn thành trò chơi đếm!","Counting Game Complete!"),
    T(`Bé làm đúng ${score}/${total} câu và nhận được ${starCount} sao!`,`You got ${score}/${total} right and earned ${starCount} stars!`),
    "🏆",
    Array(starCount).fill("⭐").join("")
  );

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"games", t:T("Trò chơi","Games"), i:"🎮"},
    {t:T("Kết quả","Results"), i:"🏆"}
  ]);

  m.innerHTML = `${bcHtml}
  <div class="cg-wrap">
    <div class="cg-result-card">
      <div class="cg-result-trophy">🏆</div>
      <h2>${T("Hoàn thành vòng chơi!","Game Complete!")}</h2>
      <div class="cg-result-stars">${starsHtml}</div>
      <div class="cg-result-score">${T(`Bé làm đúng ${score} / ${total} câu`, `You got ${score} / ${total} right`)}</div>
      <p class="cg-result-msg">${T(msgVi, msgEn)}</p>
      ${lastRecordText ? `<div class="cg-result-last">${lastRecordText}</div>` : ""}
      <div class="cg-result-btns">
        <button class="cg-btn-replay" onclick="countGame(true)">
          🔄 ${T("Chơi lại","Play Again")}
        </button>
        <button class="cg-btn-back" onclick="go('games')">
          🔙 ${T("Quay lại","Back to Games")}
        </button>
      </div>
    </div>
  </div>`;

  sfxFanfare();
  fx();
  catSet("celebrate");
  triggerCelebration(
    T("Hoàn thành xuất sắc!", "All Done!"),
    T(`Bé làm đúng ${score} / ${total} câu! Nhận được ${starCount} sao!`, `You got ${score}/${total} right and earned ${starCount} stars!`),
    "🏆",
    Array(starCount).fill("⭐").join("")
  );
  say(
    `Hoan hô bé! Bé làm đúng ${NV[score]} trên ${NV[total]} câu. Nhận được ${NV[starCount]} sao vàng!`,
    `Hooray! You got ${NE[score]} out of ${NE[total]}. You earned ${NE[starCount]} stars!`
  );
}
function mis(){const mx=Math.max(MX(),6),s=R(1,mx-4),h=R(1,3),n=s+h,c=new Set([n]);while(c.size<3)c.add(R(1,mx));
 quiz(T("Số nào còn thiếu?","Which number is missing?"),"Số nào còn thiếu?","Which number is missing?",`<div class="objs">${[0,1,2,3,4].map(i=>`<span style="font-size:64px;font-weight:800;padding:0 10px;color:var(--acc)">${i==h?"?":s+i}</span>`).join("")}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,mis,()=>["",NV[n],NE[n]])}
function cmpS(){let a=R(1,Math.min(MX(),10)),b=R(1,Math.min(MX(),10));if(!R(0,3))b=a;const o1=pick(COUNT),o2=pick(COUNT),g=(n,o)=>`<div class="grp" style="flex:1">${Array.from({length:n},()=>im(o)).join("")}</div>`,s=a>b?">":a<b?"<":"=";
 quiz(T("Chọn dấu đúng","Pick the right sign"),"Chọn dấu đúng","Pick the right sign",`<div class="stage" style="gap:6px">${g(a,o1)}<span style="font-size:70px;font-weight:800;color:var(--acc)">?</span>${g(b,o2)}</div>`,[">","=","<"].map(v=>({k:v,h:`<span class="ans">${v==">"?"&gt;":v=="<"?"&lt;":"="}</span>`})),s,cmpS,()=>[`<div class="eq">${a} ${s} ${b}</div>`,...(a==b?[`${NV[a]} bằng ${NV[b]}`,`${NE[a]} equals ${NE[b]}`]:[`${NV[a]} ${a>b?"nhiều":"ít"} hơn ${NV[b]}`,`${NE[a]} is ${a>b?"more":"fewer"} than ${NE[b]}`])])}
function match(){const l=ql=qL(),Ls=shuf(exPL(l)).slice(0,3),ks=Ls.map(L=>pick(exPK(l,L)));let sel=null,left=3,wr=0;
 m.innerHTML=kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Ghép chữ & hình","Match"),i:"🧩"}])+`<h2>${T("Ghép chữ với hình","Match the letter and picture")}</h2><div class="opts">${shuf(ks).map(k=>`<button class="opt" data-p="${k}">${im(EXA[k].img)}</button>`).join("")}</div><div class="opts">${shuf(Ls).map(L=>`<button class="opt" data-l="${L}">${imL(L)}</button>`).join("")}</div>`;
 say("Ghép chữ với hình nhé","Match the letter and picture");catSet("thinking");
 m.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{if(b.disabled)return;m.querySelectorAll("[data-p]").forEach(x=>x.style.borderColor="");sel=b;b.style.borderColor="var(--acc)";const k=b.dataset.p;say(EXA[k].t,EXA[k].t)});
 m.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{if(!sel||b.disabled)return;if(EXA[sel.dataset.p].L===b.dataset.l){[sel,b].forEach(x=>{x.disabled=true;x.style.borderColor="";x.classList.add("good")});sfxOk();sel=null;if(!--left)win(wr,match,"","")}else{wr++;sfxNo();catSet("sad");say("Thử lại nhé","Try again");setTimeout(()=>catSet("thinking"),900)}})}
function mem(){const l=ql=qL(),ks=shuf(exP(l)).slice(0,3),cs=shuf([...ks,...ks]);let a=null,lock=false,left=3,miss=0;
 m.innerHTML=kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Lật thẻ trí nhớ","Memory"),i:"🃏"}])+`<h2>${T("Tìm hai hình giống nhau","Find the pairs")}</h2><div class="opts mem" style="max-width:520px;margin:12px auto">${cs.map(k=>`<button class="opt" data-c="${k}">${im("gstar")}</button>`).join("")}</div>`;
 say("Tìm hai hình giống nhau","Find two that are the same");catSet("thinking");
 m.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{if(lock||b.disabled||b===a)return;const k=b.dataset.c;b.innerHTML=im(EXA[k].img);say(EXA[k].t,EXA[k].t);
  if(!a){a=b;return}
  if(a.dataset.c===k){[a,b].forEach(x=>{x.disabled=true;x.classList.add("good")});a=null;sfxOk();if(!--left)setTimeout(()=>win(miss>2?1:0,mem,"",""),900)}
  else{miss++;lock=true;sfxNo();const p=a;a=null;setTimeout(()=>{p.innerHTML=b.innerHTML=im("gstar");lock=false},1200)}})}
let trm=ls.get("trm","up"),lastTr="";
const TR={up:{items:()=>LET_ALL(),vi:x=>`Tập viết chữ ${x}`,en:x=>`Trace letter ${x}`,say:x=>sayL(x)},
 lo:{items:()=>LET_ALL().map(x=>x.toLowerCase()),vi:x=>`Tập viết chữ ${x}`,en:x=>`Trace letter ${x}`,say:x=>sayL(x.toUpperCase())},
 nu:{items:()=>[...Array(10).keys()].map(String),vi:x=>`Tập viết số ${x}`,en:x=>`Trace number ${x}`,say:x=>sayN(+x)},
 net:{items:()=>VN_STROKES.map(s=>s.id),vi:x=>`Tập viết ${VN_STROKES.find(s=>s.id===x).name}`,en:x=>`Trace ${VN_STROKES.find(s=>s.id===x).en}`,say:x=>{const s=VN_STROKES.find(k=>k.id===x);say(s.name,s.en)}}};
function trace(selItem){const md=TR[trm]||TR.up;
 const pool=md.items();let it=(selItem&&pool.includes(selItem))?selItem:null;
 if(!it){do{it=pick(pool)}while(it===lastTr&&pool.length>1)}lastTr=it;let col="#6b21a8",dn=false;
 const isNet=trm==="net";
 const guide=isNet?`<div style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">${VN_STROKES.find(s=>s.id===it).svg}</div>`:"";
 const sampleCard=isNet
  ?`<div class="trace-sample-card" onclick="TR.net.say('${it}')" title="${T("Bấm để nghe đọc","Tap to listen")}"><span class="trace-sample-tag">MẪU NÉT 🔊</span><span style="font-size:16px;font-weight:800;color:#184a86;margin-top:2px">${VN_STROKES.find(s=>s.id===it).name.replace("Nét ","")}</span></div>`
  :`<div class="trace-sample-card" onclick="TR['${trm}'].say('${it}')" title="${T("Bấm để nghe đọc","Tap to listen")}"><span class="trace-sample-tag">MẪU CHỮ 🔊</span><span class="trace-sample-letter">${it}</span></div>`;
 m.innerHTML=kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Tập viết chữ & nét","Trace"),i:"✍️"}])+`<div class="chips" style="margin:0 0 4px">${[["up","ABC"],["lo","abc"],["nu","123"],["net","Nét"]].map(([k,x])=>`<button class="pill${trm===k?" on":""}" onclick="trm='${k}';ls.set('trm',trm);trace()">${x}</button>`).join("")}</div><h2>${T(md.vi(it),md.en(it))}</h2><div style="position:relative;width:min(86vw,320px);aspect-ratio:320/390;margin:6px auto;background:#fdfdf9;border-radius:24px;border:4px solid #b8d4f6;box-shadow:0 8px 24px rgba(0,0,0,0.1);touch-action:none;overflow:hidden"><canvas id="bgCv" style="position:absolute;inset:0;width:100%;height:100%"></canvas><canvas id="guideCv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></canvas>${guide}<canvas id="cv" style="position:absolute;inset:0;width:100%;height:100%"></canvas>${sampleCard}</div><div class="chips" style="gap:8px;margin:8px 0;align-items:center">${["#6b21a8","#1d4ed8","#dc2626","#16a34a","#ea580c","#db2777"].map(c=>`<button class="chip" style="background:${c};border:3px solid ${c===col?"#fff":"transparent"};box-shadow:0 3px 6px #0002" data-col="${c}"></button>`).join("")}<button class="pill" id="btn-clear" title="${T("Xóa để viết lại","Erase")}">🧼 ${T("Tẩy","Clear")}</button><button class="pill" id="ok">✔ ${T("Xong","Done")}</button></div><div class="chips trace-picker" style="max-height:120px;overflow-y:auto;gap:6px;max-width:540px;margin:6px auto;padding:6px;border-radius:20px;background:var(--card);box-shadow:0 2px 8px #0001">${pool.map(x=>`<button class="pill${x===it?" on":""}" style="min-width:48px;padding:4px 10px;text-align:center" onclick="trace('${x}')">${isNet?VN_STROKES.find(s=>s.id===x).name.replace("Nét ",""):x}</button>`).join("")}</div>`;
 const cv=m.querySelector("#cv"),gcv=m.querySelector("#guideCv"),bcv=m.querySelector("#bgCv");
 const W=cv.width=gcv.width=bcv.width=320,H=cv.height=gcv.height=bcv.height=390;
 const x=cv.getContext("2d"),gx=gcv.getContext("2d"),bx=bcv.getContext("2d");
 x.lineCap=x.lineJoin="round";x.lineWidth=12;
 bx.fillStyle="#fdfdf9";bx.fillRect(0,0,W,H);
 const base_y=265,sp=36;
 bx.strokeStyle="#ebf3fb";bx.lineWidth=1;bx.beginPath();
 for(let px=16;px<=W-16;px+=sp){bx.moveTo(px,base_y-4*sp);bx.lineTo(px,base_y+sp)}
 bx.stroke();
 for(let i=-4;i<=1;i++){const y=base_y+i*sp;bx.beginPath();if(i===0){bx.strokeStyle="#8cb4e8";bx.lineWidth=2.5}else{bx.strokeStyle="#c4dbf6";bx.lineWidth=1}bx.moveTo(14,y);bx.lineTo(W-14,y);bx.stroke()}
 if(!isNet){
  const drawGuide=()=>{
   if(cur!=="trace"||lastTr!==it)return;
   gx.clearRect(0,0,W,H);gx.save();
   gx.font="175px 'HPCham', 'HPTapViet', sans-serif";
   gx.textAlign="center";gx.textBaseline="alphabetic";
   gx.fillStyle="#6582a6";gx.fillText(it,W/2,base_y);gx.restore();
  };
  if(document.fonts&&document.fonts.load){
   Promise.all([document.fonts.load("175px HPCham"),document.fonts.load("42px HPTapViet")]).then(drawGuide).catch(drawGuide);
  }else{drawGuide()}
 }else{gx.clearRect(0,0,W,H)}
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
 cv.onpointerdown=e=>{dn=true;const[p,q]=pt(e);x.strokeStyle=col;x.beginPath();x.moveTo(p,q);x.lineTo(p+.1,q);x.stroke();cv.setPointerCapture(e.pointerId)};
 cv.onpointermove=e=>{if(!dn)return;const[p,q]=pt(e);x.lineTo(p,q);x.stroke();x.beginPath();x.moveTo(p,q)};
 cv.onpointerup=()=>dn=false;
 m.querySelectorAll("[data-col]").forEach(b=>b.onclick=()=>{col=b.dataset.col;m.querySelectorAll("[data-col]").forEach(k=>k.style.borderColor=k.dataset.col===col?"#fff":"transparent")});
 const btnClear=m.querySelector("#btn-clear");if(btnClear)btnClear.onclick=()=>x.clearRect(0,0,W,H);
  m.querySelector("#ok").onclick=e=>{
   e.currentTarget.disabled=true;
   ST.traceCount=(ST.traceCount||0)+1;svS();checkBadges();
   triggerCelebration(T("Bé viết đẹp quá!","Great Writing!"),T("Bé nắn nót rất giỏi, thưởng bé 1 ⭐!","Wonderful tracing, +1 ⭐!"),"✍️","⭐",()=>win(0,trace,"",""));
  };
 md.say(it);catSet("pointing")}
const spr=(k,z)=>{if(lang==="vi"&&LET_VI.includes(k))return`<span class="let-vn-big" style="height:${z}">${k}</span>`;const key=lang==="en"?k:(I["vi_"+k]?"vi_"+k:k);const alt=ALT_MAP[key]||(OBJ[key]?OBJ[key].vi:key);return I["s_"+key]?`<span class="spr" style="--z:${z};background-image:url(${I["s_"+key]})" role="img" aria-label="${alt}"></span>`:`<img class="spf" data-sk="${key}" data-z="${z}" src="${I[key]}" style="height:${z}" alt="${alt}">`};
function rp(b){const s=b.querySelector(".spr");if(s){s.style.animation="none";void s.offsetWidth;s.style.animation=""}}
let ST;try{ST=JSON.parse(ls.get("st",""))||{}}catch(e){ST={}}ST.n=ST.n||0;ST.f=ST.f||0;ST.w=ST.w||{};
const svS=()=>ls.set("st",JSON.stringify(ST)),sta=ok=>{ST.n++;if(ok)ST.f++;svS()};
function stw(r){const l=cur==="letP"?"Chữ "+(OBJ[r]?OBJ[r].L:r):(cur==="numP"||cur==="mis")?"Số "+r:"";if(l){ST.w[l]=(ST.w[l]||0)+1;svS()}}
function adapt(r){if(cur==="trace"||ls.get("auto","1")!="1")return"";let[g,b]=ls.get("ad","0,0").split(",").map(Number);if(r>=.8){g++;b=0}else if(r<=.4){b++;g=0}else g=b=0;let s="";if(g>=2&&lvl<3){lvl++;g=0;s=`⬆ Mức ${lvl} · Level ${lvl}`}else if(b>=2&&lvl>1){lvl--;b=0;s=`⬇ Mức ${lvl} · Level ${lvl}`}ls.set("ad",g+","+b);ls.set("lvl",lvl);return s}
const togAuto=()=>{ls.set("auto",ls.get("auto","1")=="1"?"0":"1");parent()};
/* ========================================================
   KHÓA PHỤ HUYNH VỚI MÃ PIN & BẢNG ĐIỀU KHIỂN (PARENT DASHBOARD)
   ======================================================== */
let enteredPin = "";
function gate(){
  enteredPin = "";
  renderGatePin();
}

function renderGatePin(errorMsg = ""){
  const dotsHtml = [0, 1, 2, 3].map(i => {
    return `<span class="pin-dot ${i < enteredPin.length ? 'filled' : ''}"></span>`;
  }).join("");

  const keysHtml = [1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map(k => {
    return `<button class="pin-key" onclick="window.__pinPress('${k}')">${k}</button>`;
  }).join("");

  m.innerHTML = `
    ${kbc([{s:"home", t:T("Trang chủ","Home"), i:"🏠"}, {t:T("Khóa phụ huynh","Parent Gate"), i:"🔒"}])}
    <h2>👨‍👩‍👧 ${T("Dành cho phụ huynh","Parent Area")}</h2>
    <div class="pin-box">
      <div style="font-size:42px;line-height:1">🔒</div>
      <h3 style="margin:8px 0 4px;font-size:20px">${T("Nhập mã PIN phụ huynh","Enter Parent PIN")}</h3>
      <div class="pin-display">${dotsHtml}</div>
      ${errorMsg ? `<div style="color:var(--bad);font-weight:800;font-size:14px;margin-bottom:8px;animation:shake .3s">${errorMsg}</div>` : ""}
      <div class="pin-pad">${keysHtml}</div>
      <p class="pin-msg">💡 ${T("Mã PIN mặc định là <b>1234</b>. Bố mẹ có thể đổi mã PIN bên trong bảng điều khiển.","Default PIN is <b>1234</b>. You can change it in the dashboard.")}</p>
    </div>
  `;
}

window.__pinPress = function(k){
  const correctPin = ls.get("parent_pin", "1234");
  if(k === "C"){
    enteredPin = "";
    renderGatePin();
    return;
  }
  if(k === "⌫"){
    enteredPin = enteredPin.slice(0, -1);
    renderGatePin();
    return;
  }
  if(enteredPin.length < 4){
    enteredPin += k;
    renderGatePin();
    if(enteredPin.length === 4){
      setTimeout(() => {
        if(enteredPin === correctPin){
          sfxOk();
          go("parent");
        } else {
          sfxNo();
          enteredPin = "";
          renderGatePin(lang === "vi" ? "Mã PIN chưa đúng! Vui lòng thử lại" : "Incorrect PIN! Please try again");
        }
      }, 150);
    }
  }
};

function changeParentPin(){
  const curr = ls.get("parent_pin", "1234");
  const p1 = prompt(lang === "vi" ? "Nhập mã PIN mới (gồm 4 chữ số):" : "Enter new 4-digit PIN:", "");
  if(!p1) return;
  if(/^\d{4}$/.test(p1.trim())){
    ls.set("parent_pin", p1.trim());
    alert(lang === "vi" ? `✅ Đã đổi mã PIN thành công: ${p1.trim()}` : `✅ PIN changed to: ${p1.trim()}`);
  } else {
    alert(lang === "vi" ? "⚠ Mã PIN phải gồm đúng 4 chữ số!" : "⚠ PIN must be 4 digits!");
  }
}
window.changeParentPin = changeParentPin;

function updateKidName(newName){
  const clean = (newName || "").trim();
  if(clean){
    ls.set("kid_name", clean);
  }
}
window.updateKidName = updateKidName;

function cycleKidAvatar(){
  const avatars = ["🐣", "🐥", "🚀", "🐱", "🐰", "🦁", "👧", "👦", "⭐", "🦄"];
  const curr = ls.get("kid_avatar", "🐣");
  const next = avatars[(avatars.indexOf(curr) + 1) % avatars.length];
  ls.set("kid_avatar", next);
  const el = document.getElementById("kidAvatarEl");
  if(el) el.textContent = next;
}
window.cycleKidAvatar = cycleKidAvatar;

function getTodayStudyMinutes(){
  const sec = parseInt(ls.get("study_sec_" + getLocalDateStr(), "0"), 10) || 0;
  return Math.round(sec / 60);
}

setInterval(() => {
  if(!document.hidden){
    const today = getLocalDateStr();
    const sec = (parseInt(ls.get("study_sec_" + today, "0"), 10) || 0) + 10;
    ls.set("study_sec_" + today, sec);
    checkDailyTimeLimit(Math.round(sec / 60));
  }
}, 10000);

let limitModalDismissedUntil = 0;
function checkDailyTimeLimit(mins){
  const limit = parseInt(ls.get("daily_limit_minutes", "0"), 10) || 0;
  if(limit > 0 && mins >= limit){
    if(Date.now() > limitModalDismissedUntil){
      const modal = document.getElementById("timeLimitModal");
      if(modal && modal.style.display !== "flex"){
        modal.style.display = "flex";
      }
    }
  }
}

window.__unlockTimeLimit = function(){
  const pin = prompt(lang === "vi" ? "Nhập mã PIN phụ huynh để mở thêm 15 phút:" : "Enter Parent PIN for 15 more minutes:");
  if(pin === ls.get("parent_pin", "1234")){
    limitModalDismissedUntil = Date.now() + 15 * 60 * 1000;
    const modal = document.getElementById("timeLimitModal");
    if(modal) modal.style.display = "none";
    alert(lang === "vi" ? "✅ Đã gia hạn thêm 15 phút học!" : "✅ Extended 15 more minutes!");
  } else if(pin !== null){
    alert(lang === "vi" ? "⚠ Mã PIN không đúng!" : "⚠ Incorrect PIN!");
  }
};

function setDailyLimit(mins){
  ls.set("daily_limit_minutes", mins);
  if(cur === "parent") parent();
}
window.setDailyLimit = setDailyLimit;

function getWeakSkillRecommendation(){
  const mistakes = Object.entries(ST.w || {}).sort((a,b) => b[1] - a[1]);
  if(mistakes.length > 0){
    const topError = mistakes[0];
    const name = topError[0];
    const count = topError[1];
    if(name.startsWith("Số")){
      return {
        title: lang === "vi" ? `Luyện tập thêm: ${name} (chưa đúng ${count} lần)` : `Practice: ${name}`,
        desc: lang === "vi" ? "Bé cần củng cố thêm nhận biết mặt số và đếm số lượng hình minh họa." : "Strengthen number recognition.",
        action: "countGame",
        btnText: lang === "vi" ? "Cho bé luyện số ➔" : "Practice Numbers ➔"
      };
    } else if(name.startsWith("Chữ")){
      return {
        title: lang === "vi" ? `Luyện tập thêm: ${name} (chưa đúng ${count} lần)` : `Practice: ${name}`,
        desc: lang === "vi" ? "Bé cần làm quen thêm phát âm và hình dáng của chữ cái này." : "Practice this letter.",
        action: "letL",
        btnText: lang === "vi" ? "Cho bé luyện chữ ➔" : "Practice Letter ➔"
      };
    }
  }
  
  if(currentTier === "preschool"){
    return {
      title: lang === "vi" ? "Đếm hình chọn số & Bảng chữ cái" : "Count & Letters",
      desc: lang === "vi" ? "Hoạt động rèn luyện tư duy số lượng và thị giác hoàn hảo cho lứa tuổi mầm non." : "Best for preschool visual & counting skills.",
      action: "countGame",
      btnText: lang === "vi" ? "Cho bé học ngay ➔" : "Start Activity ➔"
    };
  } else if(currentTier === "grade1_2"){
    return {
      title: lang === "vi" ? "Phép cộng trừ 20–100 & Ghép vần" : "Math 20–100 & Words",
      desc: lang === "vi" ? "Rèn luyện tính nhẩm nhanh và ghép vần từ vựng tự tin cho lớp 1–2." : "Mental math and phonics.",
      action: "math10",
      btnText: lang === "vi" ? "Cho bé luyện toán ➔" : "Start Activity ➔"
    };
  } else {
    return {
      title: lang === "vi" ? "Nhân chia, Phân số & Đọc hiểu văn bản" : "Multiply & Reading",
      desc: lang === "vi" ? "Phát triển tư duy logic toán học nâng cao và khả năng đọc hiểu ngữ liệu." : "Math & reading comprehension.",
      action: "tierActMath",
      btnText: lang === "vi" ? "Khám phá ngay ➔" : "Start Activity ➔"
    };
  }
}

function resetAllKidsData(){
  const msg = lang === "vi"
    ? "Bố mẹ có chắc chắn muốn đặt lại TOÀN BỘ dữ liệu học tập của bé (Số sao, Chuỗi ngày học streak, Huy hiệu đã đạt)? Dữ liệu sau khi xóa sẽ bắt đầu lại từ đầu."
    : "Are you sure you want to reset all learning progress (stars, daily streak, badges)?";
  if(confirm(msg)){
    stars = 0;
    ls.set("stars", 0);
    ls.set("badges", "[]");
    ls.set("kids_streak_count", 0);
    ls.set("kids_streak_last_date", "");
    ls.set("kids_count_game_last", "");
    ls.set("bhv_events", "[]");
    ls.set("bhv_act_stats", "{}");
    ST = { n: 0, f: 0, w: {} };
    svS();
    head();
    if(cur === "parent") parent();
    alert(lang === "vi" ? "Đã đặt lại dữ liệu học tập thành công!" : "Progress reset successfully!");
  }
}
window.resetAllKidsData = resetAllKidsData;

function parent(){
  const kidName = ls.get("kid_name", "Bé Yêu");
  const kidAvatar = ls.get("kid_avatar", "🐣");
  const curLv = getCurrentLevel();
  const streakInfo = getDailyStreak();
  const todayMins = getTodayStudyMinutes();
  const dailyLimit = parseInt(ls.get("daily_limit_minutes", "0"), 10) || 0;
  const recom = getWeakSkillRecommendation();
  const topErrors = Object.entries(ST.w || {}).sort((a,b)=>b[1]-a[1]).slice(0, 6);
  const correctPct = ST.n ? Math.round((ST.f / ST.n) * 100) : 100;
  const actStats = typeof Analytics !== "undefined" ? Analytics.getStats() : {};
  const statsList = Object.entries(actStats);
  const totalStarts = statsList.reduce((acc, [, s]) => acc + (s.starts || 0), 0);
  const totalCompletes = statsList.reduce((acc, [, s]) => acc + (s.completes || 0), 0);
  const totalAbandons = statsList.reduce((acc, [, s]) => acc + (s.abandons || 0), 0);
  const abandonedList = statsList
    .filter(([, s]) => (s.abandons || 0) > 0)
    .sort((a, b) => (b[1].abandons || 0) - (a[1].abandons || 0));
  const au = ls.get("auto", "1") == "1";
  const sf = SFX();
  const rp = ls.get("rm", "auto");
  const vs = vState();
  const nrec = Object.keys(REC).length;

  if(vs.k === "wait") setTimeout(() => { vWait = true; if(cur === "parent") parent(); }, 2000);
  const vh = vs.k === "ok" ? `<div class="note ok">✅ ${T("Máy có giọng đọc tiếng Việt","Vietnamese voice available")}<small>${esc(vs.n)}</small><button class="pill" onclick="testVi()">🔊 ${T("Nghe thử","Test")}</button></div>`
    : vs.k === "wait" ? `<div class="note">⏳ ${T("Đang kiểm tra giọng đọc…","Checking voices…")}</div>`
    : `<div class="note warn">⚠ ${T(vs.k==="no"?"Máy chưa có giọng đọc tiếng Việt":"Không tìm thấy giọng đọc của máy","No Vietnamese voice found")}<small>${VIHELP}</small><button class="pill" onclick="testVi()">🔊 ${T("Nghe thử","Test")}</button><button class="pill" onclick="go('rec')">🎙 ${T("Thu giọng bố mẹ","Record voice")}</button></div>`;

  m.innerHTML = `
    ${kbc([{s:"home", t:T("Trang chủ","Home"), i:"🏠"}, {t:T("Bảng điều khiển phụ huynh","Parent Dashboard"), i:"👨‍👩‍👧"}])}
    <h2>👨‍👩‍👧 ${T("Bảng điều khiển của phụ huynh","Parent Dashboard")}</h2>

    <div class="parent-dash">
      <!-- 1. HỒ SƠ BÉ -->
      <div class="dash-card">
        <div class="dash-card-title">👤 ${T("Hồ sơ & Nhóm tuổi của bé","Kid Profile & Age Group")}</div>
        <div class="profile-row">
          <div class="profile-avatar" id="kidAvatarEl" onclick="cycleKidAvatar()" title="${T("Bấm để đổi hình đại diện","Tap to change avatar")}">${kidAvatar}</div>
          <div class="profile-info">
            <div style="font-size:13px;color:#64748b;font-weight:700">${T("Tên của bé (Bố mẹ chạm để sửa):","Kid's Name (Tap to edit):")}</div>
            <input class="profile-name-input" type="text" value="${esc(kidName)}" onchange="updateKidName(this.value)" placeholder="Ví dụ: Bé Bơ, Bé Na...">
            <div style="font-size:14px;color:var(--acc);font-weight:800;margin-top:4px">
              ${curLv.title} · ⭐ ${stars} sao · 🔥 ${streakInfo.count} ngày học
            </div>
          </div>
        </div>
        <div style="margin-top:12px">
          <div style="font-size:13px;color:#64748b;font-weight:700;margin-bottom:6px">${T("Chọn nhóm tuổi học tập phù hợp:","Select Learning Age Group:")}</div>
          <div class="tier-tabs">
            ${(typeof AGE_TIERS !== "undefined" ? Object.values(AGE_TIERS) : []).map(t => `
              <button class="tier-tab ${t.id === currentTier ? "on" : ""}" onclick="setAgeTier('${t.id}');parent()">
                <span class="tier-tab-badge">${t.badge}</span>
                <span class="tier-tab-title">${T(t.nameVi, t.nameEn)}</span>
                <span class="tier-tab-sub">${T(t.ageVi, t.ageEn)}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- 2. THỜI GIAN & GIỚI HẠN SỬ DỤNG MỖI NGÀY -->
      <div class="dash-card">
        <div class="dash-card-title">⏰ ${T("Thời gian học & Giới hạn hằng ngày","Screen Time & Daily Limit")}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:14px;color:#64748b;font-weight:700">${T("Hôm nay bé đã học:","Today's study time:")}</div>
            <div style="font-size:26px;font-weight:900;color:#0284c7">⏱ ~${todayMins} ${T("phút","mins")}</div>
          </div>
          <div>
            <div style="font-size:14px;color:#64748b;font-weight:700">${T("Giới hạn màn hình mỗi ngày:","Daily Screen Limit:")}</div>
            <div class="chips" style="margin-top:4px">
              ${[0, 15, 30, 45, 60].map(mVal => `
                <button class="pill ${dailyLimit === mVal ? "on" : ""}" onclick="setDailyLimit(${mVal})">
                  ${mVal === 0 ? T("Không giới hạn","No limit") : mVal + " " + T("phút","mins")}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- 3. TIẾN ĐỘ THEO MÔN HỌC & KỸ NĂNG -->
      <div class="dash-card">
        <div class="dash-card-title">📊 ${T("Tiến độ học tập theo môn","Subject Progress & Accuracy")}</div>
        <div class="prog-grid">
          <div class="prog-item">
            <div class="prog-item-head">
              <span style="color:#0284c7">📐 ${T("Toán học & Đếm số","Math & Numbers")}</span>
              <span>${ST.mathCount || 0} ${T("bài","lessons")}</span>
            </div>
            <div class="prog-bar-bg"><div class="prog-bar-fill math" style="width:${Math.min(100, (ST.mathCount || 0) * 12)}%"></div></div>
          </div>
          <div class="prog-item">
            <div class="prog-item-head">
              <span style="color:#ea580c">🔤 ${T("Chữ cái & Tiếng Việt","Letters & Phonics")}</span>
              <span>${ST.letCount || 0} ${T("chữ","letters")}</span>
            </div>
            <div class="prog-bar-bg"><div class="prog-bar-fill vietnamese" style="width:${Math.min(100, (ST.letCount || 0) * 10)}%"></div></div>
          </div>
          <div class="prog-item">
            <div class="prog-item-head">
              <span style="color:#8b5cf6">📖 ${T("Truyện & Đọc hiểu","Stories & Reading")}</span>
              <span>${ST.storyCount || 0} ${T("truyện","stories")}</span>
            </div>
            <div class="prog-bar-bg"><div class="prog-bar-fill reading" style="width:${Math.min(100, (ST.storyCount || 0) * 25)}%"></div></div>
          </div>
          <div class="prog-item">
            <div class="prog-item-head">
              <span style="color:#10b981">✍️ ${T("Luyện viết chữ đẹp","Handwriting")}</span>
              <span>${ST.traceCount || 0} ${T("bài viết","pages")}</span>
            </div>
            <div class="prog-bar-bg"><div class="prog-bar-fill logic" style="width:${Math.min(100, (ST.traceCount || 0) * 20)}%"></div></div>
          </div>
          <div class="prog-item">
            <div class="prog-item-head">
              <span style="color:#db2777">🇬🇧 ${T("Tiếng Anh cơ bản","Basic English")}</span>
              <span>${ST.engCount || 0} ${T("bài","lessons")}</span>
            </div>
            <div class="prog-bar-bg"><div class="prog-bar-fill english" style="width:${Math.min(100, (ST.engCount || 0) * 15)}%"></div></div>
          </div>
        </div>
        <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
          <div style="background:#f1f5f9;border-radius:14px;padding:8px 12px;font-size:14px;font-weight:700">
            🎯 ${T("Đúng ngay lần đầu:","First-try accuracy:")} <b>${correctPct}%</b> (${ST.f || 0}/${ST.n || 0} ${T("câu","questions")})
          </div>
          <div style="background:#f1f5f9;border-radius:14px;padding:8px 12px;font-size:14px;font-weight:700">
            🔥 ${T("Chuỗi ngày học liên tiếp:","Current Streak:")} <b>${streakInfo.count} ${T("ngày","days")}</b>
          </div>
        </div>
      </div>

      <!-- NHÃN KỸ NĂNG ĐÃ RÈN LUYỆN -->
      ${Object.keys(ST.skills || {}).length ? `
        <div class="dash-card">
          <div class="dash-card-title">🎯 ${T("Nhãn kỹ năng bé đã rèn luyện","Skill Badges & Practice")}</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
            ${Object.entries(ST.skills).sort((a,b)=>b[1]-a[1]).map(([sk, cnt]) => `
              <span style="background:#e0f2fe;border:2px solid #bae6fd;color:#0369a1;padding:6px 12px;border-radius:14px;font-size:13px;font-weight:800">
                🎯 ${sk} <span style="background:#0284c7;color:#fff;border-radius:10px;padding:2px 7px;font-size:11px;margin-left:4px">×${cnt}</span>
              </span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- 4. GỢI Ý BÀI HỌC TIẾP THEO -->
      <div class="dash-card">
        <div class="dash-card-title">💡 ${T("Gợi ý hoạt động tiếp theo cho bé","Smart Recommendation")}</div>
        <div class="recom-card">
          <div style="flex:1">
            <div style="font-size:17px;font-weight:800;color:#92400e;margin-bottom:2px">🎯 ${recom.title}</div>
            <div style="font-size:14px;color:#78350f;line-height:1.35">${recom.desc}</div>
          </div>
          <button class="recom-btn" onclick="go('${recom.action}')">
            ${recom.btnText}
          </button>
        </div>
      </div>

      <!-- 4B. THỐNG KÊ HOẠT ĐỘNG & BỎ DỞ (ANALYTICS) -->
      <div class="dash-card">
        <div class="dash-card-title">📊 ${T("Thống kê hoàn thành & Bài học bỏ dở","Activity Completion & Drop-offs")}</div>
        <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:105px;background:#f0fdf4;border:2px solid #bbf7d0;border-radius:14px;padding:10px;text-align:center">
            <div style="font-size:22px;font-weight:900;color:#16a34a">${totalCompletes}</div>
            <div style="font-size:12px;font-weight:700;color:#15803d">${T("Đã hoàn thành","Completed")}</div>
          </div>
          <div style="flex:1;min-width:105px;background:#fef2f2;border:2px solid #fecaca;border-radius:14px;padding:10px;text-align:center">
            <div style="font-size:22px;font-weight:900;color:#dc2626">${totalAbandons}</div>
            <div style="font-size:12px;font-weight:700;color:#b91c1c">${T("Bỏ dở giữa chừng","Abandoned")}</div>
          </div>
          <div style="flex:1;min-width:105px;background:#eff6ff;border:2px solid #bfdbfe;border-radius:14px;padding:10px;text-align:center">
            <div style="font-size:22px;font-weight:900;color:#2563eb">${totalStarts ? Math.round((totalCompletes / totalStarts) * 100) : 100}%</div>
            <div style="font-size:12px;font-weight:700;color:#1d4ed8">${T("Tỷ lệ hoàn thành","Completion rate")}</div>
          </div>
        </div>

        ${abandonedList.length > 0 ? `
          <div style="margin-top:12px">
            <div style="font-size:13px;font-weight:700;color:#b91c1c;margin-bottom:6px">⚠️ ${T("Các bài học bé dừng lại nhiều nhất (cần bố mẹ hỗ trợ):","Activities most frequently abandoned:")}</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${abandonedList.slice(0, 5).map(([id, s]) => `
                <div style="display:flex;align-items:center;justify-content:space-between;background:#fff1f2;border:1px solid #fecdd3;padding:8px 12px;border-radius:10px;font-size:13px">
                  <span style="font-weight:700;color:#9f1239">📌 ${esc(s.title || id)}</span>
                  <span>
                    <span style="background:#f43f5e;color:#fff;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:800;margin-right:8px">${s.abandons} ${T("lần bỏ dở","abandons")}</span>
                    <button class="pill" style="font-size:11px;padding:3px 8px" onclick="go('playActivity', '${id}')">🎮 ${T("Xem bài","View")}</button>
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
        ` : `
          <div style="margin-top:10px;padding:8px 12px;background:#f8fafc;border-radius:10px;font-size:13px;color:#475569;font-weight:600">
            🌟 ${T("Tuyệt vời! Bé chưa từng bỏ dở bài học nào giữa chừng.","Great! No activities have been abandoned midway.")}
          </div>
        `}
      </div>

      <!-- 5. KỸ NĂNG CẦN LUYỆN THÊM -->
      ${topErrors.length ? `
        <div class="dash-card">
          <div class="dash-card-title">🔄 ${T("Các điểm bé thường nhầm lẫn","Needs Extra Practice")}</div>
          <div class="chips">
            ${topErrors.map(([k, v]) => `<span class="pill" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b">⚠ ${k} ×${v}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      <!-- 6. BẢO MẬT & CÀI ĐẶT -->
      <div class="dash-card">
        <div class="dash-card-title">⚙️ ${T("Cài đặt hệ thống & Giọng đọc","Settings & Voice")}</div>
        <div style="margin-bottom:8px">${vh}</div>
        <div style="font-size:13px;color:#64748b;font-weight:700;margin-top:8px">${T("Ngôn ngữ hiển thị & phát âm:","Language:")}</div>
        <div class="chips">
          ${[["vi","🇻🇳 Tiếng Việt"],["en","🇬🇧 English"],["both","Song ngữ VI + EN"]].map(([k,t])=>`<button class="pill${lang===k?" on":""}" onclick="setLang('${k}');parent()">${t}</button>`).join("")}
        </div>
        <div style="font-size:13px;color:#334155;font-weight:700;margin-top:8px">${T("Hiệu ứng & Cảm ứng:","Sound & Effects:")}</div>
        <div class="chips">
          <button class="pill${SOUND_ON()?" on":""}" onclick="toggleSoundMaster();parent()">🔊 ${T("Âm thanh & Giọng đọc: "+(SOUND_ON()?"BẬT":"TẮT"),"Master sound: "+(SOUND_ON()?"ON":"OFF"))}</button>
          <button class="pill${sf?" on":""}" onclick="togSfx();parent()">🔔 ${T("Âm hiệu ứng: "+(sf?"BẬT":"TẮT"),"Sound effects: "+(sf?"ON":"OFF"))}</button>
          <button class="pill${rmOn()?" on":""}" onclick="togRM();parent()">🎞 ${T("Giảm chuyển động: "+(rp==="auto"?"THEO MÁY":rp==="1"?"BẬT":"TẮT"),"Reduce motion: "+(rp==="auto"?"AUTO":rp==="1"?"ON":"OFF"))}</button>
          <button class="pill" onclick="changeParentPin()">🔑 ${T("Đổi mã PIN phụ huynh","Change PIN")}</button>
          <button class="pill" onclick="go('rec')">🎙 ${T("Thu giọng bố mẹ","Record voice")}</button>
        </div>
      </div>

      <!-- 7. ĐẶT LẠI DỮ LIỆU & SAO LƯU -->
      <div class="dash-card">
        <div class="dash-card-title">🗑 ${T("Dữ liệu & Đặt lại","Data & Reset")}</div>
        <div class="note warn" style="text-align:left">
          <b>${T("Đặt lại tiến độ học tập của bé","Reset Kid's Progress")}</b>
          <small style="margin:4px 0 8px;line-height:1.4">${T("Bố mẹ có thể đặt lại số sao, chuỗi ngày học streak, huy hiệu để bé học lại từ đầu nếu muốn.","Reset stars, streak, and badges to start over.")}</small>
          <div class="chips" style="margin-top:8px">
            <button class="pill" onclick="resetAllKidsData()" style="background:#fee2e2;color:#991b1b;border-color:#ef4444;font-weight:800">
              🗑 ${T("Đặt lại toàn bộ tiến độ của bé","Reset All Progress")}
            </button>
            <button class="pill" onclick="ST={n:0,f:0,w:{}};svS();parent()">
              📊 ${T("Chỉ xóa thống kê câu hỏi","Reset Quiz Stats Only")}
            </button>
          </div>
        </div>

        <div style="margin-top:14px">
          <div style="font-size:13px;color:#64748b;font-weight:700;margin-bottom:6px">${T("Sao lưu / Khôi phục tiến độ ra máy khác:","Backup & Restore:")}</div>
          <div class="chips">
            <button class="pill" onclick="exportData(0)">💾 ${T("Sao lưu tiến độ","Backup progress")}</button>
            <button class="pill" onclick="exportData(1)">💾 ${T("Kèm giọng thu"+(nrec?" ("+nrec+")":""),"With voices")}</button>
            <button class="pill" onclick="document.getElementById('bf').click()">📂 ${T("Khôi phục","Restore")}</button>
          </div>
          <input type="file" id="bf" accept=".json,application/json" hidden onchange="importData(this.files[0]);this.value=''">
          <div class="note" id="bmsg" hidden></div>
        </div>
      </div>
    </div>
  `;
}
function idb(mode,fn){return new Promise((res,rej)=>{try{const r=indexedDB.open("bhv",1);r.onupgradeneeded=()=>r.result.createObjectStore("rec");r.onerror=()=>rej(r.error);r.onsuccess=()=>{const tx=r.result.transaction("rec",mode),q=fn(tx.objectStore("rec"));tx.oncomplete=()=>res(q&&q.result);tx.onerror=()=>rej(tx.error)}}catch(e){rej(e)}})}
let rt="num",rl="vi",mr=null;
const RMAX=2*1024*1024,RTOT=40*1024*1024,recTotal=()=>Object.values(RECSZ).reduce((a,b)=>a+b,0);
const chunks=t=>t.split(/[.!?]+\s*/).map(s=>s.trim()).filter(Boolean);
const MSGS=l=>[...new Set([...PR,...ER].flatMap(p=>chunks(p[l==="vi"?0:1])))];
const recItems=()=>rt=="num"?[...Array(21).keys()].map(i=>rl=="vi"?NV[i]:NE[i]):rt=="let"?LET.map((L,i)=>rl=="vi"?LV[i]:L):rt=="msg"?MSGS(rl):rl=="vi"?[...new Set([...Object.keys(OBJ).map(k=>OBJ[k].vi),...VT.map(s=>s.split("|")[2])])]:Object.keys(OBJ).map(k=>OBJ[k].en);
async function putRec(k,bl){await idb("readwrite",s=>s.put({k,b:bl},k));if(REC[k])URL.revokeObjectURL(REC[k]);REC[k]=URL.createObjectURL(bl);RECSZ[k]=bl.size}
function recS(){const it=recItems();
 m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"parent",t:T("Phụ huynh","Parents"),i:"👨‍👩‍👧"},{t:T("Giọng bố mẹ","Your voice"),i:"🎙️"}])}<h2>🎙 ${T("Giọng bố mẹ","Your voice")}</h2><p id="rmsg">${T("Chạm 🎙 để thu, ⏹ để dừng, 📁 để chọn file âm thanh","Tap 🎙 to record, ⏹ to stop, 📁 to pick an audio file")}</p><div class="chips">${[["num","Số"],["let","Chữ"],["obj","Hình"],["msg","Lời khen"]].map(([k,x])=>`<button class="pill${rt==k?" on":""}" onclick="rt='${k}';recS()">${x}</button>`).join("")}${["vi","en"].map(l=>`<button class="pill${rl==l?" on":""}" onclick="rl='${l}';recS()">${l.toUpperCase()}</button>`).join("")}</div><div class="note"><b>📁 Nhập nhiều file âm thanh</b> (MP3, M4A, WAV, OGG; tối đa 2 MB mỗi file, tổng 40 MB). Đặt tên file theo mẫu <b>vi_từ.mp3</b> hoặc <b>en_từ.mp3</b>, ví dụ <b>vi_hai.mp3</b>, <b>vi_quả táo.mp3</b>, <b>en_apple.mp3</b>. Từ không khớp sẽ được báo lại.<small>Đã dùng ${(recTotal()/1048576).toFixed(1)} / 40 MB</small><button class="pill" onclick="document.getElementById('rbulk').click()">📁 ${T("Chọn nhiều file","Choose files")}</button></div><input type="file" id="rbulk" multiple accept="audio/*,.mp3,.m4a,.aac,.wav,.ogg,.oga,.opus,.webm" hidden onchange="bulkAudio(this.files);this.value=''">${it.map(x=>{const k=rl+"|"+x;return`<div class="rr"><b>${esc(x)}</b><span><button class="pill" data-k="${esc(k)}" data-a="r">🎙</button><button class="pill" data-k="${esc(k)}" data-a="f">📁</button>${REC[k]?`<button class="pill" data-k="${esc(k)}" data-a="p">▶</button><button class="pill" data-k="${esc(k)}" data-a="d">✖</button>`:""}</span></div>`}).join("")}`;
 m.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>recAct(b.dataset.a,b.dataset.k,b))}
async function recAct(a,k,b){const msg=document.getElementById("rmsg");
 if(a=="p"){A.pause();A.onended=A.onerror=null;A.src=REC[k];A.play().catch(()=>{});return}
 if(a=="d"){if(REC[k])URL.revokeObjectURL(REC[k]);delete REC[k];delete RECSZ[k];try{await idb("readwrite",s=>s.delete(k))}catch(e){}recS();return}
 if(a=="f"){const i=document.createElement("input");i.type="file";i.accept="audio/*,.mp3,.m4a,.aac,.wav,.ogg,.oga,.opus,.webm";i.style.display="none";i.onchange=()=>{const f=i.files[0];i.remove();if(f)importAudio([[k,f]])};document.body.appendChild(i);i.click();return}
 if(mr){mr.stop();return}
 try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ch=[];mr=new MediaRecorder(st);mr.ondataavailable=e=>ch.push(e.data);
  mr.onstop=async()=>{st.getTracks().forEach(x=>x.stop());const bl=new Blob(ch,{type:mr.mimeType});mr=null;if(bl.size<500)return recS();try{await putRec(k,bl)}catch(e){REC[k]=URL.createObjectURL(bl);RECSZ[k]=bl.size}recS()};
  mr.start();b.textContent="⏹";b.style.background="var(--bad)"}
 catch(e){mr=null;msg.textContent="⚠ Không thu âm được ở đây (cần quyền micro). Hãy thử bản cài trên máy · Microphone not available here."}}
const AEXT={mp3:"audio/mpeg",m4a:"audio/mp4",aac:"audio/aac",wav:"audio/wav",ogg:"audio/ogg",oga:"audio/ogg",opus:"audio/ogg",webm:"audio/webm"};
const fext=f=>(f.name.split(".").pop()||"").toLowerCase(),isAud=f=>(f.type||"").startsWith("audio/")||!!AEXT[fext(f)],audMime=f=>(f.type||"").startsWith("audio/")?f.type:(AEXT[fext(f)]||"audio/mpeg");
const audOk=bl=>new Promise(res=>{const a=new Audio(),u=URL.createObjectURL(bl);let d=0,t;const fin=v=>{if(d++)return;clearTimeout(t);URL.revokeObjectURL(u);res(v)};a.preload="metadata";a.onloadedmetadata=()=>fin(a.duration>0?a.duration<=30:true);a.onerror=()=>fin(false);t=setTimeout(()=>fin(false),6000);a.src=u});
const nrm=t=>t.normalize("NFC").toLowerCase().replace(/['’.,!?]/g,"").replace(/[_\-]+/g," ").replace(/\s+/g," ").trim(),nod=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");
function recMap(){const m1=new Map(),m2=new Map(),add=(l,t)=>{const key=l+"|"+t,n=nrm(t);m1.set(l+"|"+n,key);const d=l+"|"+nod(n);m2.set(d,m2.has(d)&&m2.get(d)!==key?null:key)};
 NV.forEach(t=>add("vi",t));NE.forEach(t=>add("en",t));LV.forEach(t=>add("vi",t));LET.forEach(t=>add("en",t));Object.values(OBJ).forEach(o=>{add("vi",o.vi);add("en",o.en)});VT.forEach(s=>add("vi",s.split("|")[2]));MSGS("vi").forEach(t=>add("vi",t));MSGS("en").forEach(t=>add("en",t));return[m1,m2]}
async function bulkAudio(files){const[m1,m2]=recMap(),list=[];
 for(const f of files){const mt=/^(vi|en)[_\- ](.+)$/i.exec(f.name.replace(/\.[^.]+$/,"")),l=mt&&mt[1].toLowerCase(),t=mt&&nrm(mt[2]);
  list.push([mt?(m1.get(l+"|"+t)||m2.get(l+"|"+nod(t))||null):null,f])}
 importAudio(list)}
async function importAudio(list){let ok=0;const bad=[];
 for(const[k,f]of list){
  if(!k){bad.push(f.name+" (tên không khớp)");continue}
  if(!isAud(f)){bad.push(f.name+" (không phải âm thanh)");continue}
  if(f.size>RMAX){bad.push(f.name+" (quá 2 MB)");continue}
  if(recTotal()-(RECSZ[k]||0)+f.size>RTOT){bad.push(f.name+" (đã đầy 40 MB)");continue}
  const bl=new Blob([f],{type:audMime(f)});
  if(!await audOk(bl)){bad.push(f.name+" (không đọc được hoặc dài quá 30 giây)");continue}
  try{await putRec(k,bl);ok++}catch(e){bad.push(f.name+" (lỗi lưu)")}}
 recS();const r=document.getElementById("rmsg");
 if(r)r.textContent=(ok?`✅ Đã nhập ${ok} file`:"")+(bad.length?(ok?". ":"")+`⚠ ${ok?"Bỏ qua":"Không nhập được"} ${bad.length} file: `+bad.slice(0,6).join(", ")+(bad.length>6?"…":""):"")}
let curTone = 0;
function playConsonant(c, r){
  playSafeAudio(r, "Tưởng Vy");
}
function playVowel(v){
  playSafeAudio(v, "Tưởng Vy");
}
function playSyllable(text, c, v, toneIdx, spellText){
  curTone = toneIdx;
  const headEl = document.querySelector(".spell-head");
  if(headEl){
    headEl.innerHTML = `<span>${c}</span><span style="color:var(--acc2)">+</span><span>${v}</span><span style="color:var(--ok)">=</span><span style="font-size:1.15em;text-decoration:underline;color:var(--acc)">${text}</span>`;
  }
  const subEl = document.querySelector(".spell-sub");
  if(subEl){
    subEl.innerHTML = `🔊 Đánh vần: <b>${spellText}</b>`;
    subEl.onclick = () => playSpell(c, v, toneIdx, text, spellText);
  }
  document.querySelectorAll(".syl-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === toneIdx);
    btn.classList.toggle("on", i === toneIdx);
  });
  playSafeAudio(text, "Tưởng Vy");
}
function playSpell(c, v, toneIdx, finalWord, spellText){
  A.pause(); A.onended = null; A.onerror = null;
  if(SS){ try{ SS.cancel(); } catch(e){} }
  const my = ++tok;
  busy = true;

  // Đọc trọn câu đánh vần tự nhiên như hiển thị: ví dụ "bờ a ba huyền bà" hoặc "bờ a ba"
  const spoken = spellText.replace(/\s*-\s*/g, " ").trim();
  const subEl = document.querySelector(".spell-sub");
  if(subEl){
    subEl.innerHTML = `🔊 Đánh vần: <b style="color:var(--ok);font-size:1.15em">▶ ${spellText}</b>`;
  }
  const fin = () => {
    if(my === tok){
      busy = false;
      busyEnd = Date.now();
      if(subEl) subEl.innerHTML = `🔊 Đánh vần: <b>${spellText}</b>`;
    }
  };

  playSafeAudio(spoken, "Tưởng Vy", fin);
}
function pickConsonant(c, r){
  curC = c;
  curTone = 0;
  if(typeof VN_SPELL !== "undefined" && VN_SPELL.valid && !VN_SPELL.valid(curC, curV)){
    const firstValid = VN_SPELL.V.find(v => VN_SPELL.valid(curC, v.v));
    if(firstValid) curV = firstValid.v;
  }
  readL();
  playConsonant(c, r);
}
const CO_LAN_ANH_CONSONANTS = {
  "b": "bicX1RNzHos", "c": "uP9Ri14I28o", "d": "SqjCwJRONfU", "đ": "4c7ApUvxNKk",
  "g": "5AIIGSfthV8", "k": "kdrjFqjp9NY", "kh": "Pq6pxF1l2vg", "m": "UqfYtYRHmpY",
  "n": "477qRox5TWA", "ng": "82YileKSdiI", "nh": "6tHKEPP-sYU", "x": "4bq-lpEQI7U"
};
const CO_LAN_ANH_LESSONS = {
  1: "YLM9IUypgqQ", 2: "ww5wazKT7Ck", 3: "iEPpruHON1w", 4: "-O8EgkNBARE",
  5: "aqsjf0zKbXQ", 6: "2P0sVhYOvCw", 7: "kXk2vyXFXFY", 8: "czZBOWlGlaE",
  9: "6zfx2E3jizM", 10: "zJPfge__mUE", 11: "dojtsCRfbfU", 12: "FohTBERmiZc",
  13: "8560ssT_ing", 14: "Ag0Lt6Yvpkc", 15: "SHA2WEoc1js", 16: "JNhEKiIESlU",
  17: "hWy3TdFUAYA", 18: "d1TePylBOLQ", 19: "85TMOE5Npzo", 20: "U9FTdd6eBwA",
  21: "cIinEyjGUQ8", 22: "-15lFJeyxMc", 23: "jsDx9X1nwS0", 24: "D3KgV4yfagM",
  25: "04w8wNfFliw", 26: "YJ8Ms45Ttio", 27: "_9mHo5uIlvA", 28: "y2bFgBHTxUk"
};
function playLessonAudio(audioUrl, fallbackText){
  const my = ++tok;
  busy = true;
  const fin = () => { if(my === tok){ busy = false; busyEnd = Date.now(); } };

  const target = audioUrl ? (getAudio(audioUrl) || audioUrl) : fallbackText;
  playSafeAudio(target, "Tưởng Vy", fin);
}
let readTab="spell",curC="b",curV="a",curLes=1,curStory=0;
function readL(tab){
  if(tab)readTab=tab;
  const tabs=[["spell","🔤 Ghép tiếng","Spelling"],["lessons","📚 28 Bài Vần","Phonics"],["stories","📖 Tập đọc trơn","Stories"]];
  let body="";
  if(readTab==="spell"){
    if(typeof VN_SPELL !== "undefined" && VN_SPELL.valid && !VN_SPELL.valid(curC, curV)){
      const firstValid = VN_SPELL.V.find(v => VN_SPELL.valid(curC, v.v));
      if(firstValid) curV = firstValid.v;
    }
    const cObj=VN_SPELL.C.find(x=>x.c===curC)||VN_SPELL.C[0];
    const vObj=VN_SPELL.V.find(x=>x.v===curV)||VN_SPELL.V[0];
    const syls=[0,1,2,3,4,5].map(t=>VN_SPELL.syl(cObj,vObj,t));
    if(curTone >= syls.length) curTone = 0;
    const curSyl=syls[curTone];
    const ytClip=CO_LAN_ANH_CONSONANTS[cObj.c];
    const ytBadge=ytClip
      ?`<div style="margin:4px auto"><a href="https://www.youtube.com/watch?v=${ytClip}" target="_blank" rel="noopener" class="pill" style="font-size:13px;padding:3px 12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;background:#e74c3c;color:#fff;font-weight:700;box-shadow:0 3px 0 #922b21">▶ Video Cô Lan Anh dạy chữ ${cObj.c.toUpperCase()}</a></div>`
      :"";
    const meanBadge=curSyl.hasMeaning
      ?`<div style="background:#eafaf1;border:2px solid var(--ok);color:#196f3d;border-radius:18px;display:inline-block;padding:3px 14px;font-size:15px;font-weight:700;margin:4px auto">💡 Từ ví dụ: <b>${curSyl.ex}</b></div>`
      :`<div style="background:#fff3cd;border:2px solid #f39c12;color:#856404;border-radius:18px;display:inline-block;padding:3px 14px;font-size:13px;font-weight:600;margin:4px auto">⚠ Tiếng này ít dùng trong tiếng Việt</div>`;
    body=`<div class="spell-board">
      <div class="spell-head"><span>${cObj.c}</span><span style="color:var(--acc2)">+</span><span>${vObj.v}</span><span style="color:var(--ok)">=</span><span style="font-size:1.15em;text-decoration:underline;color:var(--acc)">${curSyl.text}</span></div>
      ${meanBadge}
      ${ytBadge}
      <div class="spell-sub" style="cursor:pointer" onclick="playSpell('${cObj.c}','${vObj.v}',${curTone},'${curSyl.text}','${curSyl.spell}')">🔊 Đánh vần: <b>${curSyl.spell}</b></div>
      <div class="syl-grid">
        ${syls.map((s,idx)=>{
          const isAct=idx===curTone;
          const opStyle=s.hasMeaning?"":"opacity:0.4;";
          const exText=s.hasMeaning?`<span class="syl-ex" style="display:block;font-size:11px;color:var(--ok);font-weight:700;line-height:1.1;margin-top:2px">${s.ex}</span>`:`<span class="syl-ex" style="display:block;font-size:10px;color:#888;font-style:italic;line-height:1.1;margin-top:2px">ít dùng</span>`;
          return `<button class="syl-btn${isAct?" active on":""}" style="${opStyle}" onclick="playSyllable('${s.text}','${cObj.c}','${vObj.v}',${idx},'${s.spell}');rp(this)"><b class="n" style="font-size:28px">${s.text}</b><small>${VN_SPELL.TONES[idx].n}</small>${exText}</button>`;
        }).join("")}
      </div>
    </div>
    <div style="margin:10px 0 4px"><b>1. Chọn Phụ âm:</b></div>
    <div class="chips" style="gap:10px">${VN_SPELL.C.map(x=>`<button class="chip ${x.c===curC?"on":""}" style="width:auto;min-width:48px;min-height:48px;border-radius:18px;padding:4px 12px;font-size:22px;margin:2px" onclick="pickConsonant('${x.c}','${x.r}')">${x.c}</button>`).join("")}</div>
    <div style="margin:12px 0 4px"><b>2. Chọn Nguyên âm:</b></div>
    <div class="chips" style="gap:10px">${VN_SPELL.V.map(x=>{
      const ok=VN_SPELL.valid(curC,x.v);
      const dis=ok?"":"opacity:0.22;pointer-events:none;filter:grayscale(1);";
      return `<button class="chip ${x.v===curV?"on":""}" style="width:50px;height:50px;min-width:48px;min-height:48px;font-size:22px;margin:2px;${dis}" ${ok?`onclick="curV='${x.v}';curTone=0;readL();playVowel('${x.v}')"`:"disabled"}>${x.v}</button>`;
    }).join("")}</div>`;
  }else if(readTab==="lessons"){
    const L=VN_LESSONS.find(x=>x.id===curLes)||VN_LESSONS[0];
    const ytLes=CO_LAN_ANH_LESSONS[L.id];
    const ytLesBtn=ytLes
      ?`<a href="https://www.youtube.com/watch?v=${ytLes}" target="_blank" rel="noopener" class="pill" style="font-size:13px;padding:3px 10px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;background:#e74c3c;color:#fff;font-weight:700;box-shadow:0 3px 0 #922b21">▶ Video Cô Lan Anh</a>`
      :"";
    const rhymeList=(L.rhymes||[]).map(r=>typeof r==="string"?r:(r.rhyme||""));
    const highlightRhymes=(text)=>{
      let res=esc(text);
      rhymeList.forEach(rh=>{
        if(!rh)return;
        const re=new RegExp("("+rh+")","gi");
        res=res.replace(re,'<b style="color:var(--acc);text-decoration:underline">$1</b>');
      });
      return res;
    };
    body=`<div class="chips" style="max-height:85px;overflow-y:auto;padding:2px">
      ${VN_LESSONS.map(l=>{
        const shortRhymes=(l.rhymes||[]).map(r=>typeof r==="string"?r:r.rhyme).join("-");
        return `<button class="pill ${l.id===curLes?"on":""}" style="font-size:15px;padding:3px 8px;margin:2px" onclick="curLes=${l.id};readL()">
          ${l.id<=28?"Bài "+l.id+" ("+shortRhymes+")":l.title}
        </button>`;
      }).join("")}
    </div>
    <div class="lesson-card">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
        <h3 style="margin:0;font-size:24px;color:var(--acc)">${L.title}</h3>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          ${ytLesBtn}
          <button class="pill on" style="font-size:14px;padding:4px 12px" onclick="playLessonAudio('${L.sentenceAudio||""}','${L.sentence.replace(/'/g,"\\'")}');rp(this)">🔊 Nghe cô đọc câu mẫu</button>
        </div>
      </div>

      <div style="font-weight:800;margin:6px 0 4px;color:var(--ink)">1. Đánh vần Vần (Cô Lan Anh):</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        ${(L.rhymes||[]).map(r=>{
          const rName=typeof r==="string"?r:r.rhyme;
          const rFormula=typeof r==="string"?`Vần ${r}`:(r.formula||rName);
          const rAudioSpell=typeof r==="object"?r.audioSpell:"";
          const rAudioRhyme=typeof r==="object"?r.audioRhyme:"";
          return `
            <div class="rhyme-box" onclick="playLessonAudio('${rAudioSpell}','${rFormula}');rp(this)">
              <div class="rhyme-big">${rName}</div>
              <div class="rhyme-formula">👉 ${rFormula}</div>
              <div style="display:flex;gap:4px;margin-top:6px;justify-content:center;flex-wrap:wrap">
                <button class="pill" style="font-size:13px;padding:2px 8px" onclick="event.stopPropagation();playLessonAudio('${rAudioRhyme}','${rName}');rp(this)">🔊 Đọc: ${rName}</button>
                <button class="pill on" style="font-size:13px;padding:2px 8px" onclick="event.stopPropagation();playLessonAudio('${rAudioSpell}','${rFormula}');rp(this)">🔤 Đánh vần</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="font-weight:800;margin:10px 0 6px;color:var(--ink)">2. Đánh vần tiếng & Từ mẫu (Cô Lan Anh):</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:12px">
        ${(L.words||[]).map(w=>{
          const wText=typeof w==="string"?w:w.word;
          const wSpell=typeof w==="string"?w:w.spell;
          const wAudio=typeof w==="object"?w.audio:"";
          return `
            <div class="spell-sample" onclick="playLessonAudio('${wAudio}','${wSpell.replace(/'/g,"\\'")}');rp(this)">
              <div>
                <b>${wText}</b>
                <div style="font-size:14px;color:var(--ink);opacity:.85;margin-top:2px">Đánh vần: ${wSpell}</div>
              </div>
              <span style="font-size:24px">🔊</span>
            </div>
          `;
        }).join("")}
      </div>

      <div style="font-weight:800;margin:10px 0 6px;color:var(--ink)">3. Câu luyện đọc ứng dụng (Cô Lan Anh):</div>
      <div class="story-box" style="margin:4px 0;font-size:21px;cursor:pointer;background:var(--card);border:3px solid var(--ok);line-height:1.6" onclick="playLessonAudio('${L.sentenceAudio||""}','${L.sentence.replace(/'/g,"\\'")}');rp(this)">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <span style="font-size:28px">📖</span>
          <div>
            <div>${highlightRhymes(L.sentence)}</div>
            <div style="font-size:14px;color:var(--ok);font-weight:700;margin-top:6px">▶ Bấm vào đây để nghe cô đọc câu mẫu</div>
          </div>
        </div>
      </div>
    </div>`;
    playLessonAudio(L.sentenceAudio || "", L.title);
  }else{
    const S=VN_STORIES[curStory]||VN_STORIES[0];
    body=`<div class="chips">${VN_STORIES.map((s,idx)=>`<button class="pill ${idx===curStory?"on":""}" onclick="curStory=${idx};readL()">${s.title}</button>`).join("")}</div>
    <div class="story-box">
      <h3 style="margin:0 0 10px;color:var(--acc);text-align:center">${S.title}</h3>
      ${S.sentences.map(st=>`<div class="story-line" onclick="say('${st}','${st}')"><span>🔊</span><span>${st}</span></div>`).join("")}
      <div style="text-align:center;margin-top:12px"><button class="pill on" onclick="say('${S.sentences.join(". ")}','${S.sentences.join(". ")}')">🔊 Nghe đọc toàn bài</button></div>
    </div>`;
    say(S.title, S.title);
  }
  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Đánh vần & Luyện đọc","Reading & Phonics"),i:"📚"}])}
  <h2>${T("Đánh vần & Luyện đọc","Reading & Phonics")}</h2>
  <div class="chips" style="margin-bottom:10px">${tabs.map(([k,vi,en])=>`<button class="pill${readTab===k?" on":""}" onclick="readL('${k}')">${T(vi,en)}</button>`).join("")}</div>
  ${body}`;
}
function math10(){
  const isAdd=lvl===1?true:R(0,1)===0;
  let a,b,res;
  if(isAdd){
    const max=lvl===1?5:10;
    a=R(1,max-1);b=R(1,max-a);res=a+b;
  }else{
    const max=lvl===1?5:10;
    a=R(2,max);b=R(1,a-1);res=a-b;
  }
  const op=isAdd?"+":"-",o=pick(COUNT);
  const c=new Set([res]);
  while(c.size<3){c.add(R(1,10))}
  const qVi=isAdd?`${NV[a]} cộng ${NV[b]} bằng mấy?`:`${NV[a]} trừ ${NV[b]} bằng mấy?`;
  const qEn=isAdd?`What is ${NE[a]} plus ${NE[b]}?`:`What is ${NE[a]} minus ${NE[b]}?`;
  const grp=(n)=>`<span style="display:inline-flex;flex-wrap:wrap;gap:2px;max-width:130px;justify-content:center">${Array.from({length:n},()=>im(o,"")).join("").replace(/<img/g,'<img style="width:34px"')}</span>`;
  const visual=`<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin:8px auto">${grp(a)}<b style="font-size:44px;color:var(--acc)">${op}</b>${grp(b)}<b style="font-size:44px;color:var(--acc)">= ?</b></div>`;
  quiz(T(`${a} ${op} ${b} = ?`,`${a} ${op} ${b} = ?`),qVi,qEn,visual,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),res,math10,()=>[`<div class="eq">${a} ${op} ${b} = ${res}</div>`,`${qVi.replace("bằng mấy?","bằng")} ${NV[res]}!`,`${qEn.replace("What is ","").replace("?"," equals")} ${NE[res]}!`]);
}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const normStr=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");
let curCat="vn",curStorySearch="",readingStory=null,storyPlay=false;
const STORY_BATCH_SIZE=14;
let storyRenderedCount=STORY_BATCH_SIZE;

function storyCardHtml(s){
  const curated=FAIRY_STORIES.find(fs=>fs.id===s.id||fs.title.toLowerCase()===s.title.toLowerCase());
  const icon=curated?curated.icon:(FAIRY_CATEGORIES.find(c=>c.id===s.cat)?.icon||"📖");
  const isAudio=!!curated;
  const clickFn=isAudio?`go('storyRead','${curated.id}')`:`go('storyDetail','${s.id}')`;
  return `
    <div class="story-item" onclick="${clickFn}">
      <div class="story-icon">${icon}</div>
      <div class="story-info">
        <div class="story-title">${esc(s.title)}</div>
        <div class="story-desc">${esc(s.summary)}</div>
        <div style="margin-top:4px">
          ${isAudio?`<span class="story-badge audio">🎙️ Kể truyện audio & bài học</span>`:`<span class="story-badge audio">🎧 Audio gốc truyencotich.top</span>`}
        </div>
      </div>
      <button class="pill" style="font-size:15px;padding:6px 12px;margin:0;flex-shrink:0">${isAudio?"Kể truyện ❯":"Nghe & Đọc ❯"}</button>
    </div>
  `;
}

function getFilteredStories(catalog){
  const q=(curStorySearch||"").trim();
  if(q){
    const nq=normStr(q);
    return catalog.filter(s=>normStr(s.title).includes(nq)||normStr(s.summary).includes(nq));
  }
  return catalog.filter(s=>s.cat===curCat);
}

async function storyL(catId, page, search){
  if(catId)curCat=catId;
  if(search!==undefined)curStorySearch=search;
  storyPlay=false;A.pause();if(SS)SS.cancel();

  if(!window.FAIRY_STORIES || !window.STORY_CATALOG){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang mở kho truyện cổ tích...","Loading fairy tales...")}</p></div>`;
    await loadStories();
  }

  const catalog=(typeof STORY_CATALOG!=="undefined"&&STORY_CATALOG.length)?STORY_CATALOG:FAIRY_STORIES;
  const getCatCount=cId=>catalog.filter(s=>s.cat===cId).length;

  window.debouncedStorySearch = debounce(function(val){
    curStorySearch=(val||"").trim();
    storyRenderedCount=STORY_BATCH_SIZE;
    const clr=document.getElementById("stClearBtn");
    if(clr)clr.style.display=curStorySearch?'inline-flex':'none';
    m.scrollTop=0;
    renderStoryItems(true);
  }, 250);

  window.clearStorySearch=function(){
    curStorySearch="";
    storyRenderedCount=STORY_BATCH_SIZE;
    const inp=document.getElementById("stSearchInput");
    if(inp){inp.value="";inp.focus();}
    const clr=document.getElementById("stClearBtn");
    if(clr)clr.style.display="none";
    m.scrollTop=0;
    renderStoryItems(true);
  };

  window.switchStoryCat=function(cId){
    curCat=cId;
    curStorySearch="";
    storyRenderedCount=STORY_BATCH_SIZE;
    const inp=document.getElementById("stSearchInput");
    if(inp)inp.value="";
    const clr=document.getElementById("stClearBtn");
    if(clr)clr.style.display="none";
    m.scrollTop=0;
    renderStoryItems(true);
  };

  function renderStoryItems(reset=false){
    if(reset) storyRenderedCount=STORY_BATCH_SIZE;
    const cat=FAIRY_CATEGORIES.find(c=>c.id===curCat)||FAIRY_CATEGORIES[0];

    // Cập nhật trạng thái nút danh mục
    const chips=document.getElementById("storyChips");
    if(chips){
      chips.querySelectorAll("button").forEach(btn=>{
        btn.classList.toggle("on",btn.dataset.cat===curCat&&!curStorySearch);
      });
    }

    const list=getFilteredStories(catalog);
    const visibleItems=list.slice(0, storyRenderedCount);

    // Cập nhật dòng trạng thái tìm kiếm
    const statusEl=document.getElementById("storySearchStatus");
    if(statusEl){
      statusEl.innerHTML=curStorySearch
        ?`🔍 Tìm thấy <b>${list.length}</b> truyện cho "<em>${esc(curStorySearch)}</em>"`
        :`${cat.desc} · <span style="color:var(--acc);font-weight:700">truyencotich.top</span>`;
    }

    // Cập nhật danh sách truyện với DocumentFragment
    const listWrap=document.getElementById("storyListWrap");
    const loadMoreWrap=document.getElementById("storyLoadMoreWrap");
    if(listWrap){
      if(list.length===0){
        listWrap.innerHTML=`<div style="padding:30px;opacity:.7;font-size:20px">Không tìm thấy truyện nào. Bé thử tìm từ khóa khác nhé!</div>`;
        if(loadMoreWrap) loadMoreWrap.innerHTML="";
      } else {
        const frag=document.createDocumentFragment();
        const tpl=document.createElement("template");
        tpl.innerHTML=visibleItems.map(storyCardHtml).join("");
        frag.appendChild(tpl.content);
        listWrap.replaceChildren(frag);

        if(loadMoreWrap){
          if(storyRenderedCount < list.length){
            loadMoreWrap.innerHTML=`<div class="story-infinite-tip" style="padding:14px;font-size:15px;color:#64748b;font-weight:700">📜 Bé cuộn xuống để xem thêm truyện nhé (${visibleItems.length}/${list.length})</div>`;
          } else {
            loadMoreWrap.innerHTML=`<div style="padding:14px;font-size:14px;color:#94a3b8;font-weight:700">🌟 Bé đã xem hết ${list.length} truyện trong mục này!</div>`;
          }
        }
      }
    }
  }

  // Đăng ký Infinite Scroll qua throttled scroll handler
  onScroll(function(){
    if(cur!=="storyL") return;
    const listWrap=document.getElementById("storyListWrap");
    if(!listWrap) return;
    const list=getFilteredStories(catalog);
    if(storyRenderedCount >= list.length) return;
    if(m.scrollTop + m.clientHeight >= m.scrollHeight - 350){
      const nextBatch = list.slice(storyRenderedCount, storyRenderedCount + STORY_BATCH_SIZE);
      if(nextBatch.length){
        storyRenderedCount += nextBatch.length;
        const frag=document.createDocumentFragment();
        const tpl=document.createElement("template");
        tpl.innerHTML=nextBatch.map(storyCardHtml).join("");
        frag.appendChild(tpl.content);
        listWrap.appendChild(frag);

        const loadMoreWrap=document.getElementById("storyLoadMoreWrap");
        if(loadMoreWrap){
          if(storyRenderedCount < list.length){
            loadMoreWrap.innerHTML=`<div class="story-infinite-tip" style="padding:14px;font-size:15px;color:#64748b;font-weight:700">📜 Bé cuộn xuống để xem thêm truyện nhé (${storyRenderedCount}/${list.length})</div>`;
          } else {
            loadMoreWrap.innerHTML=`<div style="padding:14px;font-size:14px;color:#94a3b8;font-weight:700">🌟 Bé đã xem hết ${list.length} truyện trong mục này!</div>`;
          }
        }
      }
    }
  });

  // Khởi tạo khung giao diện nếu chưa có
  const existingInput=document.getElementById("stSearchInput");
  if(!existingInput){
    m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Truyện cổ tích","Fairy Tales"),i:"📖"}])}
    <h2>${T("Truyện cổ tích & Kể bé nghe","Fairy Tales & Stories")}</h2>

    <div class="story-search-wrap">
      <input type="search" class="story-search" id="stSearchInput" placeholder="🔍 Tìm kiếm trong ${catalog.length} truyện..." value="${esc(curStorySearch)}" oninput="window.debouncedStorySearch(this.value)">
      <button class="pill" id="stClearBtn" onclick="window.clearStorySearch()" style="padding:4px 12px;display:${curStorySearch?'inline-flex':'none'}">✖</button>
    </div>

    <div class="chips" id="storyChips" style="margin-bottom:10px">
      ${FAIRY_CATEGORIES.map(c=>`
        <button class="pill${c.id===curCat&&!curStorySearch?" on":""}" data-cat="${c.id}" onclick="window.switchStoryCat('${c.id}')">
          ${c.icon} ${T(c.name,c.en)} (${getCatCount(c.id)})
        </button>
      `).join("")}
    </div>

    <div id="storySearchStatus" style="font-size:15px;opacity:.85;margin-bottom:8px"></div>
    <div id="storyListWrap" style="display:flex;flex-direction:column;gap:10px"></div>
    <div id="storyLoadMoreWrap" style="text-align:center"></div>`;
  }

  renderStoryItems(true);
}

async function storyDetail(id){
  storyPlay=false;A.pause();if(SS)SS.cancel();
  if(!window.FAIRY_STORIES || !window.STORY_CATALOG){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang tải truyện...","Loading story...")}</p></div>`;
    await loadStories();
  }
  const catalog=(typeof STORY_CATALOG!=="undefined"&&STORY_CATALOG.length)?STORY_CATALOG:FAIRY_STORIES;
  const s=catalog.find(x=>x.id===id);
  if(!s){storyL();return;}

  const curated=FAIRY_STORIES.find(fs=>fs.id===s.id||fs.title.toLowerCase()===s.title.toLowerCase());
  if(curated){storyRead(curated.id);return;}

  const cat=FAIRY_CATEGORIES.find(c=>c.id===s.cat)||FAIRY_CATEGORIES[0];
  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"storyL",a:s.cat,t:T(cat.name,cat.en),i:"📖"},{t:esc(s.title.length>18?s.title.slice(0,18)+"…":s.title),i:"✨"}])}
  <div class="story-view">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <span style="font-size:48px">${cat.icon}</span>
      <div>
        <h2 style="margin:0;cursor:default;color:var(--acc)">${esc(s.title)}</h2>
        <small style="opacity:.8;font-size:15px">Nguồn: truyencotich.top · ${T(cat.name,cat.en)}</small>
      </div>
    </div>
    ${s.audio?`
      <div class="story-audio-box">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-weight:800;color:var(--ink);font-size:17px;margin-bottom:8px">
          <span>🎧</span><span>Giọng đọc audio gốc từ truyencotich.top:</span>
        </div>
        <audio controls autoplay preload="metadata" src="${s.audio}" style="width:100%;max-width:540px;height:44px;outline:none"></audio>
      </div>
    `:""}
    <div style="background:var(--bg);padding:14px 18px;border-radius:20px;font-size:20px;line-height:1.6;margin:12px 0;text-align:left">
      <b>📝 Tóm tắt truyện:</b><br>
      <span style="display:inline-block;margin-top:6px">${esc(s.summary)}</span>
    </div>
    <div class="story-ctrls" style="margin-top:16px">
      <button class="pill on" onclick="say('${s.summary.replace(/'/g,"\\'")}','${s.summary.replace(/'/g,"\\'")}')">🔊 Nghe tóm tắt</button>
      <button class="pill" onclick="A.pause();if(SS)SS.cancel();">⏹ Dừng</button>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="pill" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;background:var(--acc);color:#fff;font-weight:700">📖 Đọc trên truyencotich.top ↗</a>
    </div>
  </div>`;
  say(s.title,s.title);
}

async function storyRead(id){
  if(!window.FAIRY_STORIES){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang chuẩn bị trang sách...","Preparing storybook...")}</p></div>`;
    await loadStories();
  }
  const s=FAIRY_STORIES.find(x=>x.id===id)||FAIRY_STORIES[0];
  ST.storyCount=(ST.storyCount||0)+1;svS();checkBadges();
  storyPlay=false;A.pause();if(SS)SS.cancel();
  let readingIdx=-1;
  const updateHl=()=>{
    m.querySelectorAll(".story-p").forEach((el,i)=>{
      el.classList.toggle("reading",i===readingIdx);
      if(i===readingIdx)el.scrollIntoView({behavior:"smooth",block:"center"});
    });
  };
  window.__stopStory=()=>{storyPlay=false;A.pause();if(SS)SS.cancel();readingIdx=-1;updateHl();const btn=document.getElementById("stPlayBtn");if(btn)btn.innerHTML="🔊 Kể truyện (Nghe đọc)";};
  window.__playStory=()=>{
    if(storyPlay){window.__stopStory();return;}
    storyPlay=true;const btn=document.getElementById("stPlayBtn");if(btn)btn.innerHTML="⏹ Dừng kể truyện";
    (function nextP(i){
      if(!storyPlay)return;
      if(i>=s.content.length){
        window.__stopStory();
        triggerCelebration(T("Bé nghe xong truyện rồi!","Story Complete!"),T(`Bé nghe xong truyện "${s.title}", thật tuyệt vời!`,"You finished reading!"),s.icon||"📖","⭐⭐⭐");
        say("Câu chuyện đến đây là hết rồi. Bé ngoan nhé!","The end. Sweet dreams!");
        return;
      }
      readingIdx=i;updateHl();
      const text=s.content[i];
      say(text,text);
      const waitMs=Math.max(3000, text.length*130/RATE + 800);
      setTimeout(()=>{if(storyPlay&&readingIdx===i)nextP(i+1);},waitMs);
    })(0);
  };
  const tctMatch=typeof STORY_CATALOG!=="undefined"&&STORY_CATALOG.find(sc=>sc.audio&&(sc.id===s.id||sc.title.toLowerCase().includes(s.title.toLowerCase())||s.title.toLowerCase().includes(sc.title.toLowerCase())));
  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"storyL",a:s.cat,t:T("Truyện cổ tích","Stories"),i:"📖"},{t:esc(s.title.length>18?s.title.slice(0,18)+"…":s.title),i:"🎙️"}])}
  <div class="story-view">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:48px">${s.icon}</span>
      <div>
        <h2 style="margin:0;cursor:default;color:var(--acc)">${s.title}</h2>
        <small style="opacity:.8;font-size:15px">Nguồn: truyencotich.top · ${T(FAIRY_CATEGORIES.find(c=>c.id===s.cat).name,FAIRY_CATEGORIES.find(c=>c.id===s.cat).en)}</small>
      </div>
    </div>
    ${tctMatch?`
      <div style="background:#eaf5ff;border:3px solid var(--acc);border-radius:22px;padding:12px 14px;margin:12px 0;text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-weight:800;color:var(--ink);font-size:17px;margin-bottom:8px">
          <span>🎧</span><span>Audio kể chuyện gốc từ truyencotich.top:</span>
        </div>
        <audio controls preload="metadata" src="${tctMatch.audio}" style="width:100%;max-width:540px;height:44px;outline:none" onplay="window.__stopStory()"></audio>
      </div>
    `:""}
    <div class="story-ctrls">
      <button class="pill on" id="stPlayBtn" onclick="window.__playStory()">🔊 Kể truyện (Nghe đọc)</button>
      <button class="pill" onclick="window.__stopStory()">⏹ Dừng</button>
    </div>
    <div style="margin-top:14px">
      ${s.content.map((p,i)=>`<div class="story-p" data-i="${i}" onclick="window.__stopStory();say('${p.replace(/'/g,"\\'")}','${p.replace(/'/g,"\\'")}');this.classList.add('reading');setTimeout(()=>this.classList.remove('reading'),4000);">${p}</div>`).join("")}
    </div>
    <div class="story-moral">
      <b>💡 Bài học ý nghĩa cho bé:</b><br>${s.moral}
    </div>
  </div>`;
  say(s.title, s.title);
}
const V={home,numL,numP,letL,letD,letP,cmp,games,mis,cmpS,match,mem,trace,gate,parent,rec:recS,readL,math10,storyL,storyRead,storyDetail,pwaGuide,badges:showBadges,countGame,tierActivities,tierActMath,tierActWord,tierActRead,playActivity};
const LAZY={s:"./img-s.js",o:"./img-o.js"},LP={};
async function need(k){
  if(window["__"+k])return true;
  if(LP[k])return LP[k];
  return LP[k]=(async()=>{
    try{
      await import(LAZY[k]);
      window["__"+k]=true;
      return true;
    }catch(e){
      console.warn("Failed to load "+LAZY[k],e);
      delete LP[k];
      return false;
    }
  })();
}
function upSpr(){m.querySelectorAll("img.spf").forEach(e=>{const k=e.dataset.sk;if(!I["s_"+k])return;const s=document.createElement("span");s.className="spr";s.style.cssText=`--z:${e.dataset.z};background-image:url(${I["s_"+k]})`;e.replaceWith(s)})}
const SFX=()=>SOUND_ON()&&ls.get("sfx","1")!=="0";
const rmOn=()=>{const p=ls.get("rm","auto");return p==="1"||(p==="auto"&&!!window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)};
const applyRM=()=>document.documentElement.classList.toggle("rm",rmOn());
const togSfx=()=>{ls.set("sfx",ls.get("sfx","1")!=="0"?"0":"1");parent()};
const togRM=()=>{const p=ls.get("rm","auto");ls.set("rm",p==="auto"?"1":p==="1"?"0":"auto");applyRM();parent()};
const MINW=2000,PAUSE=700,MAXW=30000;
function adv(fn){const my=sc,t0=Date.now();(function chk(){if(sc!==my)return;const n=Date.now();if(n-t0>=MAXW||(n-t0>=MINW&&!busy&&n-busyEnd>=PAUSE))fn();else setTimeout(chk,150)})()}
const VIHELP="Cách xử lý: cài giọng tiếng Việt cho máy, hoặc dùng “Thu giọng bố mẹ” / nhập file âm thanh. Android: Cài đặt → Quản lý chung (hoặc Hệ thống) → Ngôn ngữ → Chuyển văn bản thành giọng nói → Cài đặt dữ liệu giọng nói → Tiếng Việt. iPhone/iPad: Cài đặt → Trợ năng → Nội dung đã đọc → Giọng nói → Tiếng Việt. Windows: Cài đặt → Thời gian & ngôn ngữ → Giọng nói → Thêm giọng nói. Tên menu có thể khác tùy máy.";
function testVi(){const o=lang;lang="vi";say("Xin chào bé. Mình cùng học nhé","Hello");lang=o}
const bm=t=>{const e=document.getElementById("bmsg");if(e){e.textContent=t;e.hidden=false}};
const b2d=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(b)});
const LSK=["stars","st","lvl","lang","rate2","auto","ad","sfx","rm","trm","sound_master"];
const LSV={stars:/^\d{1,9}$/,lvl:/^[123]$/,lang:/^(vi|en|both)$/,rate2:/^\d?\.?\d{1,3}$/,auto:/^[01]$/,ad:/^\d{1,3},\d{1,3}$/,sfx:/^[01]$/,rm:/^(auto|0|1)$/,trm:/^(up|lo|nu)$/,sound_master:/^[01]$/};
const okSt=v=>{try{const o=JSON.parse(v);return!!o&&typeof o==="object"&&Number.isFinite(+o.n)&&Number.isFinite(+o.f)&&(!o.w||typeof o.w==="object")}catch(e){return false}};
async function saveFile(bl,name){const f=new File([bl],name,{type:bl.type});
 if(matchMedia("(pointer:coarse)").matches&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:name});return"share"}catch(e){if(e&&e.name==="AbortError")return"cancel"}}
 const u=URL.createObjectURL(bl),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return"dl"}
async function exportData(full){
 try{const d={app:"be-hoc-vui",v:1,t:new Date().toISOString(),ls:{},rec:{}};
  LSK.forEach(k=>{try{const v=localStorage.getItem(k);if(v!==null)d.ls[k]=v}catch(e){}});
  if(full){const all=await idb("readonly",s=>s.getAll())||[];for(const o of all)d.rec[o.k]=await b2d(o.b)}
  const bl=new Blob([JSON.stringify(d)],{type:"application/json"}),name=`be-hoc-vui-${full?"kem-giong":"tien-do"}-${new Date().toISOString().slice(0,10)}.json`,r=await saveFile(bl,name);
  if(r!=="cancel")bm(`✅ Đã tạo file ${name} (${bl.size>1048576?(bl.size/1048576).toFixed(1)+" MB":Math.max(1,Math.round(bl.size/1024))+" KB"}). Hãy giữ file này ở nơi an toàn.`)}
 catch(e){bm("⚠ Không tạo được file sao lưu.")}}
async function importData(file){if(!file)return;
 try{if(file.size>250*1024*1024)throw 0;const d=JSON.parse(await file.text());
  if(!d||d.app!=="be-hoc-vui"||!d.ls||typeof d.ls!=="object")throw 0;
  const recs=Object.entries(d.rec||{}).filter(([k,u])=>/^(vi|en)\|/.test(k)&&typeof u==="string"&&/^data:[^,]*;base64,/.test(u));
  if(!confirm("Khôi phục dữ liệu từ file này?\nSao, thống kê và cài đặt hiện tại sẽ được thay bằng dữ liệu trong file."+(recs.length?`\n${recs.length} bản thu sẽ được thêm vào (trùng tên sẽ bị ghi đè).`:"")))return;
  let n=0;for(const k of LSK){const v=d.ls[k];if(typeof v!=="string")continue;if(k==="st"?okSt(v):LSV[k].test(v)){ls.set(k,v);n++}}
  for(const[k,u]of recs){const bl=await(await fetch(u)).blob();await idb("readwrite",s=>s.put({k,b:bl},k))}
  alert("Đã khôi phục xong. Ứng dụng sẽ tải lại.");location.reload()}
 catch(e){bm("⚠ File này không đúng định dạng sao lưu của Bé học vui hoặc đã bị hỏng.")}}
idb("readonly",s=>s.getAll()).then(a=>(a||[]).forEach(o=>{REC[o.k]=URL.createObjectURL(o.b);RECSZ[o.k]=o.b.size})).catch(()=>{});
applyRM();try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyRM)}catch(e){}
try{history.replaceState({i:0,s:"home"},"")}catch(e){}
show("home");
