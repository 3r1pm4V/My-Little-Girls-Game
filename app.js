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
let RATE=+ls.get("rate2",.85),lang=ls.get("lang","vi"),stars=+ls.get("stars",0),cur="home",done=false,rd={n:0,f:0,st:0};const ROUND=5,RL={mem:2,trace:3,match:3,bubbleGame:1},GM=/P$|^(cmp|cmpS|mis|match|mem|trace|math10|countGame|playActivity|bubbleGame)$/;let lvl=+ls.get("lvl",1);const MX=()=>[5,10,15][lvl-1];
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
var AGE_TIERS = (typeof window !== "undefined" && window.AGE_TIERS) ? window.AGE_TIERS : {
  preschool: {
    id: "preschool",
    nameVi: "Tiền tiểu học",
    nameEn: "Preschool",
    ageVi: "4–6 tuổi",
    ageEn: "Ages 4–6",
    badge: "🐣",
    descVi: "Chữ cái, Học số, Đếm hình, Tiếng Anh & Làm quen trước lớp 1",
    descEn: "Letters, Numbers, Counting, English & Grade 1 Prep"
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

function isAgeTierSelectorEnabled(){
  return ls.get("show_age_tiers", "0") === "1" || ls.get("showAgeTiers", "0") === "1";
}
function setShowAgeTiers(enabled){
  const val = enabled ? "1" : "0";
  ls.set("show_age_tiers", val);
  ls.set("showAgeTiers", val);
  home();
}
window.isAgeTierSelectorEnabled = isAgeTierSelectorEnabled;
window.setShowAgeTiers = setShowAgeTiers;

async function loadActivities() {
  if (!window.ACTIVITIES_DATA) {
    try {
      const module = await import('./activities-data.js');
      window.ACTIVITIES_DATA = module.default || module.ACTIVITIES_DATA;
      if (module.getActivitiesByTier) window.getActivitiesByTier = module.getActivitiesByTier;
      if (module.getActivityById) window.getActivityById = module.getActivityById;
      if (module.getActivitiesByStage) window.getActivitiesByStage = module.getActivitiesByStage;
      if (module.getPreschoolJourneyActivities) window.getPreschoolJourneyActivities = module.getPreschoolJourneyActivities;
      if (module.getActivitiesBySubject) window.getActivitiesBySubject = module.getActivitiesBySubject;
    } catch(e) {
      console.error("Lỗi nạp activities-data.js:", e);
    }
  }
  return window.ACTIVITIES_DATA;
}
window.loadActivities = loadActivities;

function loadScriptTag(src) {
  return new Promise((resolve) => {
    if (typeof document === "undefined") return resolve(false);
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve(true);
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = (e) => {
      console.warn("Lỗi loadScriptTag cho " + src, e);
      resolve(false);
    };
    document.head.appendChild(s);
  });
}

async function loadStories() {
  if (window.FAIRY_STORIES && window.STORY_CATALOG) {
    return window.FAIRY_STORIES;
  }
  const isFileProto = typeof window !== "undefined" && window.location && window.location.protocol === "file:";

  if (!window.FAIRY_STORIES) {
    if (isFileProto) {
      await loadScriptTag("stories-data.js");
    } else {
      try {
        const sModule = await import('./stories-data.js');
        window.FAIRY_STORIES = sModule.default || sModule.FAIRY_STORIES || window.FAIRY_STORIES;
        if (sModule.FAIRY_CATEGORIES) window.FAIRY_CATEGORIES = sModule.FAIRY_CATEGORIES || window.FAIRY_CATEGORIES;
      } catch(e) {
        await loadScriptTag("stories-data.js");
      }
    }
  }
  if (!window.STORY_CATALOG) {
    if (isFileProto) {
      await loadScriptTag("stories-catalog.js");
    } else {
      try {
        const cModule = await import('./stories-catalog.js');
        window.STORY_CATALOG = cModule.default || cModule.STORY_CATALOG || window.STORY_CATALOG;
      } catch(e) {
        await loadScriptTag("stories-catalog.js");
      }
    }
  }
  return window.FAIRY_STORIES;
}
window.loadStories = loadStories;

function esc(s){ return String(s||"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function escSay(s){ return String(s||"").replace(/'/g, "\\'").replace(/"/g, "&quot;"); }
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
  console.log(`[Audio:Source] 🤖 Fallback sang Web Speech API: "${text}" (${langCode})`);
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
  if(/^(audio\/|blob:|data:|https?:\/\/)/i.test(ak) || /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i.test(ak)) return ak;
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

  // BƯỚC 1: Kiểm tra file đường dẫn trực tiếp hoặc trong window.AUDIO_MAP
  const isDirectPath = /^(audio\/|blob:|data:|https?:\/\/)/i.test(rawText) || /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i.test(rawText);
  const mapPath = isDirectPath ? rawText : (
    getAudio(rawText) || (window.AUDIO_MAP && (
      window.AUDIO_MAP[rawText] ||
      window.AUDIO_MAP[nk] ||
      window.AUDIO_MAP[cleanKey] ||
      window.AUDIO_MAP["vi|" + cleanKey] ||
      window.AUDIO_MAP["en|" + cleanKey]
    ))
  );

  if(mapPath){
    console.log(`[Audio:Source] 🎵 Phát từ Map (MP3 Local): "${rawText}" -> ${mapPath}`);
    try{
      A.pause();
      if(SS){try{SS.cancel()}catch(e){}}
      A.onended=finishOnce;
      A.onerror=()=>{
        console.warn(`[Audio:Source] ⚠️ Lỗi đọc file local "${mapPath}", chuyển Fallback Web Speech`);
        fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      };
      A.src=mapPath;
      await A.play();
      return;
    }catch(e){
      if(e&&e.name==="AbortError")return;
      if(e&&(e.name==="NotAllowedError"||e.name==="SecurityError")){
        console.warn("[Audio] Autoplay bị chặn bởi trình duyệt. Chờ tương tác người dùng:", mapPath);
        pendingAutoplayAudio={src:mapPath,key:cleanKey,finishOnce};
        return;
      }
      console.warn(`[Audio:Source] ⚠️ Play error cho "${mapPath}", chuyển Fallback Web Speech`);
      fallbackToWebSpeech(cleanKey,"vi-VN",finishOnce);
      return;
    }
  }

  // BƯỚC 2: Kiểm tra IndexedDB cache (store 'audios')
  const dbKey="tts:"+cleanKey;
  let cachedBlobUrl=await getCachedAudio(dbKey);
  if(!cachedBlobUrl){
    cachedBlobUrl=await getCachedAudio(rawText);
  }

  if(cachedBlobUrl){
    console.log(`[Audio:Source] 💾 Phát từ IndexedDB Cache: "${rawText}"`);
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
  console.log(`[Audio:Source] 🌐 Gọi API TTS VieNeu cho: "${rawText}" (Debounce 300ms)`);

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
function sfxTingTing(){haptic([30,50]);if(!SFX())return;tone(1046.50,.18,0);tone(1318.51,.25,.1);tone(1567.98,.3,.2);}
function sfxNo(){haptic(35);if(!SFX())return;tone(280,.2);tone(220,.25,.12)}
function sfxFanfare(){haptic([40,50,80]);if(!SFX())return;[[523.25,.12,0],[659.25,.12,.1],[783.99,.12,.2],[1046.50,.35,.3],[880.00,.15,.55],[1046.50,.5,.7]].forEach(([f,d,t])=>tone(f,d,t))}
function sfxPop(){haptic(20);if(!SFX())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain(),now=AC.currentTime;o.type="sine";o.frequency.setValueAtTime(750,now);o.frequency.exponentialRampToValueAtTime(140,now+0.07);g.setValueAtTime(0.35,now);g.exponentialRampToValueAtTime(0.001,now+0.07);o.connect(g);g.connect(AC.destination);o.start(now);o.stop(now+0.07)}catch(e){}}
function sfxDeflate(){haptic([15,20]);if(!SFX())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain(),now=AC.currentTime;o.type="sawtooth";o.frequency.setValueAtTime(320,now);o.frequency.linearRampToValueAtTime(120,now+0.18);g.setValueAtTime(0.18,now);g.exponentialRampToValueAtTime(0.001,now+0.18);o.connect(g);g.connect(AC.destination);o.start(now);o.stop(now+0.18)}catch(e){}}
document.addEventListener("pointerdown",e=>{const b=e.target.closest("button,.card,.opt,.chip,.pill,.syl-btn,.word-btn,.rhyme-chip,.story-item,.trace-sample-card,.story-line,.story-p,.k-bc-btn,.k-bc-back,.badge-btn,.story-page-btn,.ob");if(b&&!b.disabled)sfxTap()},{passive:true});

window.__showParentTipModal = function(title, tip){
  let modal = document.getElementById("parentTipModalOverlay");
  if(!modal){
    modal = document.createElement("div");
    modal.id = "parentTipModalOverlay";
    modal.className = "parent-tip-modal-overlay";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="parent-tip-modal">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <h3 style="margin:0;color:#b45309;font-size:22px;display:flex;align-items:center;gap:8px">
          <span>💡</span> Mẹo Dạy Học Cho Ba Mẹ
        </h3>
        <button onclick="window.__closeParentTipModal()" style="background:#f1f5f9;border:0;border-radius:50%;width:38px;height:38px;font-size:18px;cursor:pointer">✖</button>
      </div>
      <div style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:8px">📖 ${title}</div>
      <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:10px;font-size:15px;line-height:1.55;color:#92400e;margin-bottom:18px">
        ${tip}
      </div>
      <div style="text-align:right">
        <button class="pill on" onclick="window.__closeParentTipModal()" style="font-size:16px;padding:8px 20px;border-radius:20px">
          Đã hiểu rồi 👍
        </button>
      </div>
    </div>
  `;
  modal.style.display = "flex";
};

window.__closeParentTipModal = function(){
  const modal = document.getElementById("parentTipModalOverlay");
  if(modal) modal.style.display = "none";
};

function goHome(){

  stk=[{s:"home"}];
  try{history.replaceState({i:0,s:"home"},"")}catch(e){}
  show("home",undefined,true);
}
window.goHome=goHome;

function goBack(){

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
  let count = parseInt(ls.get("kids_streak_count", ""), 10);
  if(Number.isNaN(count)){
    count = parseInt(ls.get("streak", "0"), 10) || 0;
  }
  const lastDate = ls.get("kids_streak_last_date", "");
  return { count, lastDate };
}

function recordDailyActivity(){
  const { count, lastDate } = getDailyStreak();
  const today = getLocalDateStr();
  if(lastDate === today){
    return { count, updated: false };
  }
  
  // Streak nhẹ nhàng (Task P1-06): Mỗi ngày mới bé học đều tích lũy thêm 1 ngày ("Bé đã học N ngày"), không reset về 1 gây buồn
  const newCount = count + 1;
  
  ls.set("kids_streak_count", newCount);
  ls.set("streak", newCount);
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
  if (cur !== "badges") { go("badges", tab); return; }
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
        🌱 ${T(`Bé đã học: ${dailyStreak.count} ngày`, `Learning days: ${dailyStreak.count} days`)}
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

function setSpeechRate(rate){
  RATE = rate;
  ls.set("rate2", RATE);
  head();
  if(cur === "parent") parent();
  say(lang === "vi" ? "Bé nghe giọng đọc thử nhé" : "Listen to this speed test", "Listen");
}
window.setSpeechRate = setSpeechRate;

const hbEl = document.getElementById("hb");
if(hbEl){
  hbEl.innerHTML = im("btn_home");
  hbEl.onclick = () => goHome();
}
const spEl = document.getElementById("sp");
if(spEl){
  spEl.onclick = () => { RATE = RATE < .5 ? .6 : RATE < .7 ? .85 : .4; ls.set("rate2", RATE); head(); say("Bé nghe nhé","Listen"); };
}
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
      return JSON.parse(ls.get("bhv_act_stats", "bhv_offscreen_done", "blg_unlock_all", "blg_unlocked_stages", "{}")) || {};
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

/* ========================================================
   TASK P1-04: LỘ TRÌNH 6 CHẶNG & HỌC HÔM NAY DÀNH CHO BÉ
   ======================================================== */
const STAGE_META = [
  { stage: 0, icon: "🐣", nameVi: "Chặng 0: Khám phá", nameEn: "Stage 0: Explore", titleVi: "Nét bút & Trường lớp", titleEn: "Strokes & School Life" },
  { stage: 1, icon: "🔤", nameVi: "Chặng 1: Chữ cái & Số đếm", nameEn: "Stage 1: Letters & Numbers", titleVi: "Chữ cái & Số đếm", titleEn: "Letters & Numbers 1–5" },
  { stage: 2, icon: "📖", nameVi: "Chặng 2: Ghép vần cơ bản", nameEn: "Stage 2: Basic Phonics", titleVi: "Ghép vần cơ bản", titleEn: "Basic Phonics & Tones" },
  { stage: 3, icon: "🔢", nameVi: "Chặng 3: Toán tư duy", nameEn: "Stage 3: Logic Math", titleVi: "Toán tư duy", titleEn: "Logic Math & Shapes" },
  { stage: 4, icon: "📚", nameVi: "Chặng 4: Đọc câu & Tư duy", nameEn: "Stage 4: Sentences & Logic", titleVi: "Đọc câu ngắn & Tư duy logic", titleEn: "Short Sentences & Logic" },
  { stage: 5, icon: "🎓", nameVi: "Chặng 5: Vào Lớp 1", nameEn: "Stage 5: Ready for Grade 1", titleVi: "Tự tin bước vào Lớp 1", titleEn: "Confident for Grade 1" }
];
window.STAGE_META = STAGE_META;

function getKidCurrentStage(){
  const s = parseInt(ls.get("blg_stage", "1"), 10);
  return Number.isNaN(s) || s < 0 || s > 5 ? 1 : s;
}
window.getKidCurrentStage = getKidCurrentStage;

function setKidCurrentStage(st){
  const s = parseInt(st, 10);
  if(!Number.isNaN(s) && s >= 0 && s <= 5){
    ls.set("blg_stage", String(s));
  }
}
window.setKidCurrentStage = setKidCurrentStage;
/* ========================================================
   TASK P5-06: MỞ KHÓA / BỎ QUA CHẶNG THỦ CÔNG
   ======================================================== */

function getUnlockedStages() {
  const isUnlockAll = ls.get("blg_unlock_all", "0") === "1";
  if (isUnlockAll) return [0, 1, 2, 3, 4, 5];

  let list = [];
  try {
    list = JSON.parse(ls.get("blg_unlocked_stages", "[]"));
  } catch(e) {
    list = [];
  }
  if (!Array.isArray(list) || list.length === 0) {
    list = [0, 1];
  }
  const cur = getKidCurrentStage();
  if (!list.includes(cur)) list.push(cur);
  list.sort((a, b) => a - b);
  return list;
}
window.getUnlockedStages = getUnlockedStages;

function isStageUnlocked(stageNum) {
  if (ls.get("blg_unlock_all", "0") === "1") return true;
  const s = parseInt(stageNum, 10);
  return getUnlockedStages().includes(s);
}
window.isStageUnlocked = isStageUnlocked;

function unlockStage(stageNum) {
  const s = parseInt(stageNum, 10);
  if (Number.isNaN(s) || s < 0 || s > 5) return;
  const list = getUnlockedStages();
  if (!list.includes(s)) {
    list.push(s);
    list.sort((a, b) => a - b);
    ls.set("blg_unlocked_stages", JSON.stringify(list));
  }
}
window.unlockStage = unlockStage;

function lockStage(stageNum) {
  const s = parseInt(stageNum, 10);
  const cur = getKidCurrentStage();
  if (s === cur || s === 0 || s === 1) {
    alert(T("Không thể khóa chặng bé đang học hoặc chặng khởi đầu!", "Cannot lock active stage or starting stages!"));
    return;
  }
  let list = getUnlockedStages().filter(x => x !== s);
  ls.set("blg_unlocked_stages", JSON.stringify(list));
  ls.set("blg_unlock_all", "0");
}
window.lockStage = lockStage;

function toggleUnlockAllStages() {
  const cur = ls.get("blg_unlock_all", "0") === "1";
  ls.set("blg_unlock_all", cur ? "0" : "1");
}
window.toggleUnlockAllStages = toggleUnlockAllStages;

function setStageByParent(st) {
  setKidCurrentStage(st);
  unlockStage(st);
}
window.setStageByParent = setStageByParent;

function lockedStagePrompt(stageNum) {
  say("Chặng này đang được khóa. Bé nhờ bố mẹ mở khóa trong khu phụ huynh nhé!", "This stage is locked. Ask parents to unlock in Parent Dashboard!");
  alert(T("🔒 Chặng này đang tạm khóa!\nBố mẹ có thể vào Bảng điều khiển phụ huynh để mở khóa hoặc đặt chặng này cho bé học nhé.", "🔒 This stage is currently locked!\nParents can unlock it in Parent Dashboard."));
}
window.lockedStagePrompt = lockedStagePrompt;

let lastKidBtnSpeak = 0;
function speakKidBtn(type){
  const now = Date.now();
  if(now - lastKidBtnSpeak < 600) return;
  lastKidBtnSpeak = now;
  if(type === 'today'){
    playSafeAudio("audio/ui_home_btn_today.mp3", "Tưởng Vy");
  } else if(type === 'games'){
    playSafeAudio("audio/ui_home_btn_games.mp3", "Tưởng Vy");
  } else if(type === 'stickers'){
    playSafeAudio("audio/ui_home_btn_stickers.mp3", "Tưởng Vy");
  }
}
window.speakKidBtn = speakKidBtn;

async function todayLearning(stageNum){
  if(!window.ACTIVITIES_DATA){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang chuẩn bị bài học vui nhộn...","Loading fun activities...")}</p></div>`;
    await loadActivities();
  }
  let currentStage = getKidCurrentStage();
  if(stageNum !== undefined && stageNum !== null){
    const s = parseInt(stageNum, 10);
    if(!Number.isNaN(s) && s >= 0 && s <= 5){
      currentStage = s;
      setKidCurrentStage(s);
    }
  }

  const curStageInfo = STAGE_META[currentStage] || STAGE_META[1];
  const acts = typeof getActivitiesByStage === "function" 
    ? getActivitiesByStage(currentStage) 
    : (window.ACTIVITIES_DATA || []).filter(a => a.stage === currentStage);

  const tabsHtml = STAGE_META.map(sm => {
    const isUnlocked = isStageUnlocked(sm.stage);
    const isAct = sm.stage === currentStage;
    return `
      <button class="stage-tab-btn ${isAct ? "active" : ""} ${!isUnlocked ? "locked" : ""}" 
        onclick="${isUnlocked ? `todayLearning(${sm.stage})` : `lockedStagePrompt(${sm.stage})`}"
        aria-label="${T(sm.nameVi, sm.nameEn)} ${!isUnlocked ? '(Khóa)' : ''}">
        <span>${isUnlocked ? sm.icon : "🔒"}</span>
        <span>${T(sm.nameVi, sm.nameEn)}</span>
      </button>
    `;
  }).join("");

  let actsHtml = "";
  if(acts.length === 0){
    actsHtml = `
      <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:24px;border:3px dashed #cbd5e1;max-width:540px;margin:20px auto">
        <div style="font-size:52px;margin-bottom:12px">🌟</div>
        <h3 style="font-size:20px;color:#1e293b;margin:0 0 8px">${T("Bé sắp mở khóa chặng này!","Coming Soon!")}</h3>
        <p style="font-size:14.5px;color:#64748b;margin:0 0 16px">${T("Bé hãy hoàn thành các bài học ở chặng trước thật xuất sắc nhé!","Complete activities in previous stages first!")}</p>
        <button class="pill" onclick="todayLearning(${Math.max(0, currentStage - 1)})">🔙 ${T("Quay về chặng trước","Previous Stage")}</button>
      </div>
    `;
  } else {
    actsHtml = `<div class="stage-acts-grid">` + acts.map(act => {
      const icon = act.icon || (act.subject === "math" ? "🔢" : (act.subject === "logic" ? "🧩" : (act.subject === "vietnamese" ? "🔤" : (act.subject === "reading" ? "📖" : (act.subject === "english" ? "🇬🇧" : (act.subject === "science" ? "🔬" : "🌱"))))));
      const titleVi = act.title || "";
      const titleEn = act.titleEn || act.title || "";
      const qCount = act.content ? (Array.isArray(act.content) ? act.content.length : 1) : 3;
      return `
        <button class="stage-act-card" 
          onclick="playActivity('${act.id}')"
          aria-label="${T(titleVi, titleEn)}">
          <div class="stage-act-icon">${icon}</div>
          <div class="stage-act-info">
            <div class="stage-act-title">${T(titleVi, titleEn)}</div>
            <div class="stage-act-sub">
              <span>⭐ ${qCount} ${T("câu hỏi", "questions")}</span>
              <span>•</span>
              <span style="color:var(--ok, #16a34a)">${T("Học ngay 🚀", "Play 🚀")}</span>
            </div>
          </div>
        </button>
      `;
    }).join("") + `</div>`;
  }

  m.innerHTML = `
    ${kbc([
      {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
      {t:T("Học hôm nay","Today's Learning"), i:"🎒"}
    ])}
    <div style="text-align:center;margin:8px 0 12px">
      <h2 style="font-size:24px;margin:0 0 4px">🎒 ${T("Học hôm nay", "Today's Learning")}</h2>
      <p style="font-size:14px;color:#64748b;margin:0">${curStageInfo.icon} <b>${T(curStageInfo.titleVi, curStageInfo.titleEn)}</b> (${acts.length} ${T("bài học","activities")})</p>
    </div>
    <div class="stage-tabs-wrap">${tabsHtml}</div>
    ${actsHtml}
  `;
  sayPrompt("today_learning", `Chặng ${currentStage}. Bé chọn một bài để học nhé!`, `Stage ${currentStage}. Pick an activity to start!`, 180000);
}
window.todayLearning = todayLearning;

function home(){
  const showTiers = isAgeTierSelectorEnabled();
  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[currentTier]) ? AGE_TIERS[currentTier] : {
    id: "preschool", nameVi: "Tiền tiểu học", nameEn: "Preschool", ageVi: "4–6 tuổi", ageEn: "Ages 4–6", badge: "🐣", descVi: "Chữ cái, Học số & Đếm hình", descEn: "Letters, Numbers & Counting"
  };

  const tierSelectorHtml = showTiers ? `
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
  ` : "";

  let contentHtml = "";
  const isKidPreschoolMode = !showTiers || currentTier === "preschool";

  if(isKidPreschoolMode){
    const curStage = getKidCurrentStage();
    const stageInfo = (typeof STAGE_META !== "undefined" && STAGE_META[curStage]) ? STAGE_META[curStage] : { nameVi: "Chặng 1", nameEn: "Stage 1", icon: "🔤" };
    contentHtml = `
      <div class="kid-home-menu">
        <button class="kid-home-btn kid-btn-today" 
          onclick="go('todayLearning')"
          onpointerdown="speakKidBtn('today')"
          aria-label="${T("Học hôm nay", "Today's Learning")}">
          <div class="kid-btn-icon-wrap">🎒</div>
          <div class="kid-btn-text">
            <div class="kid-btn-title">${T("Học hôm nay", "Today's Learning")}</div>
            <div class="kid-btn-sub">${stageInfo.icon} ${T(stageInfo.nameVi, stageInfo.nameEn)} · ${T("Bài học mỗi ngày ✨", "Daily lessons ✨")}</div>
          </div>
          <div class="kid-btn-arrow">➡️</div>
        </button>

        <button class="kid-home-btn kid-btn-games" 
          onclick="go('games')"
          onpointerdown="speakKidBtn('games')"
          aria-label="${T("Chơi tự do", "Free Play")}">
          <div class="kid-btn-icon-wrap">🎮</div>
          <div class="kid-btn-text">
            <div class="kid-btn-title">${T("Chơi tự do", "Free Play")}</div>
            <div class="kid-btn-sub">${T("Đếm hình, chữ cái, vẽ nét 🎨", "Count, alphabet, trace 🎨")}</div>
          </div>
          <div class="kid-btn-arrow">➡️</div>
        </button>

        <button class="kid-home-btn kid-btn-stickers" 
          onclick="showBadges('stickers')"
          onpointerdown="speakKidBtn('stickers')"
          aria-label="${T("Sticker của bé", "My Stickers")}">
          <div class="kid-btn-icon-wrap">🏆</div>
          <div class="kid-btn-text">
            <div class="kid-btn-title">${T("Sticker của bé", "My Stickers")}</div>
            <div class="kid-btn-sub">${T("Huy hiệu & bộ sưu tập sao 🌟", "Badges & star collection 🌟")}</div>
          </div>
          <div class="kid-btn-arrow">➡️</div>
        </button>
      </div>
    `;
  } else if(currentTier === "grade1_2"){
    contentHtml = `<div class="cards">
      ${card("tierActLanAnh", "<b>👩‍🏫 🎬</b>", "Bé học Cô Lan Anh", "Teacher Lan Anh", "vietnamese")}
      ${card("tierActVtv7", "<b>📺 🔤</b>", "Chữ cái VTV7", "VTV7 Alphabet", "vietnamese")}
      ${card("tierActivities", "<b>🎯 🎒</b>", "Bài tập Lớp 1-2", "Grade 1-2 Lessons", "logic")}
      ${card("math10", "<b>8 + 7</b>", "Toán 20 - 100", "Math 20 - 100", "math")}
      ${card("tierActWord", "<b>🔤 🧩</b>", "Ghép vần & Từ", "Word Phonics", "vietnamese")}
      ${card("cmpS", "<b>&gt; = &lt;</b>", "Dấu so sánh", "Signs", "math")}
      ${card("trace", im("pencil")+"<b>Aa1</b>", "Luyện chữ đẹp", "Handwriting", "trace")}
      ${card("storyL", "<b>📖 ✨</b>", "Đọc truyện", "Stories", "reading")}
      ${card("games", im("kite")+im("rocket"), "Trò chơi", "Games", "game")}
    </div>`;
  } else {
    contentHtml = `<div class="cards">
      ${card("tierActivities", "<b>🎯 🎒</b>", "Bài tập Lớp 3-5", "Grade 3-5 Lessons", "logic")}
      ${card("tierActMath", "<b>7 × 8</b>", "Nhân chia & Phân số", "Multiply & Fractions", "math")}
      ${card("tierActRead", "<b>📖 🔍</b>", "Đọc hiểu văn bản", "Reading Comprehension", "reading")}
      ${card("cmpS", "<b>&gt; = &lt;</b>", "Toán so sánh", "Signs", "math")}
      ${card("storyL", "<b>📖 ✨</b>", "Truyện & Bài học", "Stories & Morals", "reading")}
      ${card("games", im("kite")+im("rocket"), "Trò chơi trí tuệ", "Logic Games", "game")}
    </div>`;
  }

  const subTitle = !showTiers 
    ? T("4–6 tuổi · Làm quen trước lớp 1", "Ages 4–6 · Grade 1 Prep")
    : "Fun Learning";

  m.innerHTML = `
    <div class="hero"><button onclick="say('Chào bé! Mình cùng học nhé','Hello! Let\\'s learn together')" aria-label="${T("Nghe chào","Hear greeting")}" style="background:none;border:none;cursor:pointer;padding:0;display:inline-block">${im("cat_idle")}</button><h1>Bé học vui<small>${subTitle}</small></h1></div>
    ${tierSelectorHtml}
    ${contentHtml}
    <p style="margin-top:16px">
      <button class="pill" onclick="go('gate')">👨‍👩‍👧 ${T("Phụ huynh","Parents")}${vState().k==="no"?" ⚠":""}</button>
      ${!isStandalone()?`<button class="pill" id="pwa-btn" onclick="triggerPWAInstall()" style="margin-left:8px;background:var(--ok);color:#fff;font-weight:800">📲 ${T("Cài ứng dụng","Install App")}</button>`:""}
    </p>
  `;
  if(isKidPreschoolMode){
    sayPrompt("home", "Chào bé! Bé chọn Học hôm nay, Chơi tự do, hay xem Sticker nào?", "Hello! Pick Today's Learning, Free Play, or Stickers!", 300000);
  } else {
    sayPrompt("home", "Chào bé! Mình cùng học nhé", "Hello! Let's learn together", 300000);
  }
}

/* ========================================================
   QUẢN LÝ BÀI TẬP PHÂN TẦNG (TIER ACTIVITIES & PLAYER)
   ======================================================== */
async function tierActivities(filterSubject){
  if(!window.ACTIVITIES_DATA){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang tải bài học vui nhộn...","Loading fun activities...")}</p></div>`;
    await loadActivities();
  }
  const showTiers = isAgeTierSelectorEnabled();
  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[currentTier]) ? AGE_TIERS[currentTier] : { nameVi: "Bài học", nameEn: "Activities", badge: "🎯" };
  
  let allActs = [];
  if(!showTiers){
    // Giao diện bé: chỉ hiện nội dung có stage 0–5, bất kể ageTier
    allActs = typeof getPreschoolJourneyActivities === "function" 
      ? getPreschoolJourneyActivities() 
      : (window.ACTIVITIES_DATA || []).filter(a => a.stage !== undefined && a.stage !== null && a.stage >= 0 && a.stage <= 5);
  } else {
    allActs = typeof getActivitiesByTier === "function" ? getActivitiesByTier(currentTier) : [];
  }
  const isPreschool = !showTiers || currentTier === "preschool";

  let acts = allActs;
  if(filterSubject === "lananh"){
    acts = allActs.filter(a => a.id.startsWith("g1_lananh") || a.id.startsWith("pre_lananh") || (a.title && a.title.includes("Lan Anh")));
  } else if(filterSubject === "vtv7"){
    acts = allActs.filter(a => a.id.startsWith("g1_vtv7") || (a.title && a.title.includes("VTV7")));
  } else if(filterSubject && filterSubject !== "all"){
    acts = allActs.filter(a => a.subject === filterSubject);
  }

  const subjectBadges = {
    math: { vi: "Toán học", en: "Math", icon: "📐", cls: "math" },
    vietnamese: { vi: "Tiếng Việt", en: "Vietnamese", icon: "🔤", cls: "vietnamese" },
    reading: { vi: "Đọc hiểu", en: "Reading", icon: "📖", cls: "reading" },
    english: { vi: "Tiếng Anh", en: "English", icon: "🇬🇧", cls: "english" },
    science: { vi: "Khoa học", en: "Science", icon: "🔬", cls: "science" },
    skills: { vi: "Kỹ năng sống", en: "Life Skills", icon: "🌱", cls: "skills" },
    logic: { vi: "Tư duy", en: "Logic", icon: "💡", cls: "logic" }
  };

  const bcTitle = !showTiers ? T("Chuẩn bị vào lớp 1", "Grade 1 Prep") : T(tInfo.nameVi, tInfo.nameEn);
  const bcBadge = !showTiers ? "🎒" : (tInfo.badge || "🎒");
  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {t:bcTitle, i:bcBadge}
  ]);

  const pageTitle = !showTiers 
    ? `🎒 ${T("Bài học Chuẩn bị vào Lớp 1", "Grade 1 Prep Activities")}`
    : `${tInfo.badge} ${T("Bài học " + tInfo.nameVi, tInfo.nameEn + " Activities")}`;

  const filters = !showTiers ? [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "lananh", vi: "Cô Lan Anh 👩‍🏫", en: "Teacher Lan Anh" },
    { id: "vtv7", vi: "Chữ cái VTV7 📺", en: "VTV7 Alphabet" },
    { id: "vietnamese", vi: "Tiếng Việt 🔤", en: "Vietnamese" },
    { id: "math", vi: "Toán học 📐", en: "Math" },
    { id: "english", vi: "Tiếng Anh 🇬🇧", en: "English" },
    { id: "science", vi: "Khoa học 🔬", en: "Science" },
    { id: "skills", vi: "Kỹ năng 🌱", en: "Life Skills" },
    { id: "reading", vi: "Đọc hiểu 📖", en: "Reading" },
    { id: "logic", vi: "Tư duy 💡", en: "Logic" }
  ] : (isPreschool ? [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "vietnamese", vi: "Tiếng Việt 🔤", en: "Vietnamese" },
    { id: "math", vi: "Toán học 📐", en: "Math" },
    { id: "english", vi: "Tiếng Anh 🇬🇧", en: "English" },
    { id: "science", vi: "Khoa học 🔬", en: "Science" },
    { id: "skills", vi: "Kỹ năng 🌱", en: "Life Skills" },
    { id: "reading", vi: "Đọc hiểu 📖", en: "Reading" },
    { id: "logic", vi: "Tư duy 💡", en: "Logic" }
  ] : [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "lananh", vi: "Cô Lan Anh 👩‍🏫", en: "Teacher Lan Anh" },
    { id: "vtv7", vi: "Chữ cái VTV7 📺", en: "VTV7 Alphabet" },
    { id: "vietnamese", vi: "Tiếng Việt 🔤", en: "Vietnamese" },
    { id: "math", vi: "Toán học 📐", en: "Math" },
    { id: "english", vi: "Tiếng Anh 🇬🇧", en: "English" },
    { id: "science", vi: "Khoa học 🔬", en: "Science" },
    { id: "skills", vi: "Kỹ năng 🌱", en: "Life Skills" },
    { id: "reading", vi: "Đọc hiểu 📖", en: "Reading" },
    { id: "logic", vi: "Tư duy 💡", en: "Logic" }
  ]);

  m.innerHTML = `
    ${bcHtml}
    <h2>${pageTitle}</h2>
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
      if(isPreschool){
        listWrap.className = "act-list-wrap act-list-preschool";
        template.innerHTML = acts.map(act => {
          const sInfo = subjectBadges[act.subject] || { vi: act.subject, en: act.subject, icon: "⭐", cls: "math" };
          let thumbSrc = "";
          if (act.mediaSource && act.mediaSource.thumbnail) {
            thumbSrc = act.mediaSource.thumbnail;
          } else if (act.videoUrl) {
            const ytId = act.videoUrl.includes("v=") ? act.videoUrl.split("v=")[1].split("&")[0] : act.videoUrl.split("/").pop();
            thumbSrc = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
          }
          const thumbHtml = thumbSrc 
            ? `<img src="${thumbSrc}" alt="${esc(act.title)}" loading="lazy">` 
            : `<div style="font-size:64px;display:flex;align-items:center;justify-content:center;height:100%">${sInfo.icon}</div>`;
          return `
            <div class="act-card-pre" onclick="go('playActivity', '${act.id}')">
              <div class="act-card-pre-thumb">
                ${thumbHtml}
                <div class="act-card-pre-play">▶</div>
              </div>
              <div class="act-card-pre-body">
                <div>
                  <div class="act-card-pre-title">${T(act.title, act.titleEn || act.title)}</div>
                  <div class="act-card-pre-goal">🎯 ${act.learningGoal || act.learningObjective || act.skill || ""}</div>
                </div>
                <div class="act-card-meta" style="margin-top:8px">
                  <span class="act-badge ${sInfo.cls}">${T(sInfo.vi, sInfo.en)}</span>
                  <span class="act-badge reward">⭐ +${(act.reward && act.reward.stars) || act.difficulty || 3}</span>
                  ${act.parentTip ? `<span class="act-badge" style="background:#fef3c7;color:#92400e;border:1px solid #fde68a" onclick="event.stopPropagation();window.__showParentTipModal('${escSay(act.title)}', '${escSay(act.parentTip)}')">💡 Mẹo bố mẹ</span>` : ""}
                </div>
              </div>
            </div>
          `;
        }).join("");
      } else {
        template.innerHTML = acts.map(act => {
          const sInfo = subjectBadges[act.subject] || { vi: act.subject, en: act.subject, icon: "⭐", cls: "math" };
          let iconHtml = `<div class="act-card-icon">${sInfo.icon}</div>`;
          if (act.mediaSource && act.mediaSource.thumbnail) {
            iconHtml = `<div class="act-card-icon" style="width:52px;height:40px;overflow:hidden;border-radius:8px"><img src="${act.mediaSource.thumbnail}" style="width:100%;height:100%;object-fit:cover" alt=""></div>`;
          } else if (act.videoUrl) {
            const ytId = act.videoUrl.includes("v=") ? act.videoUrl.split("v=")[1].split("&")[0] : act.videoUrl.split("/").pop();
            iconHtml = `<div class="act-card-icon" style="width:52px;height:40px;overflow:hidden;border-radius:8px"><img src="https://img.youtube.com/vi/${ytId}/hqdefault.jpg" style="width:100%;height:100%;object-fit:cover" alt=""></div>`;
          }
          return `
            <div class="act-card" onclick="go('playActivity', '${act.id}')">
              ${iconHtml}
              <div class="act-card-body">
                <div class="act-card-title">${T(act.title, act.titleEn || act.title)}</div>
                <div class="act-card-skill">🎯 ${act.learningGoal || act.learningObjective || act.skill || ""}</div>
                <div class="act-card-meta">
                  <span class="act-badge ${sInfo.cls}">${T(sInfo.vi, sInfo.en)}</span>
                  <span class="act-badge reward">⭐ +${(act.reward && act.reward.stars) || act.difficulty || 3} sao</span>
                  <span style="font-size:12px;color:#94a3b8">Độ khó: ${Array(Math.min(5, Math.max(1, act.difficulty || 1))).fill("★").join("")}</span>
                </div>
              </div>
              <div style="font-size:24px;color:var(--acc)">➔</div>
            </div>
          `;
        }).join("");
      }
      frag.appendChild(template.content);
      listWrap.appendChild(frag);
    }
  }
}

function tierActLanAnh(){
  if(isAgeTierSelectorEnabled() && currentTier !== "grade1_2"){
    currentTier = "grade1_2";
    ls.set("ageTier", "grade1_2");
    lvl = 2;
    ls.set("lvl", 2);
  }
  tierActivities("lananh");
}
function tierActVtv7(){
  if(isAgeTierSelectorEnabled() && currentTier !== "grade1_2"){
    currentTier = "grade1_2";
    ls.set("ageTier", "grade1_2");
    lvl = 2;
    ls.set("lvl", 2);
  }
  tierActivities("vtv7");
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
  say(earnedStars === 3 ? "Bé giỏi lắm!" : "Đúng rồi!", "Well done!");
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
  // Neu la bai tap to net hoac act.type === "trace"
  if(act.type === "trace" || act.id === "act_pre_let_01" || act.interactiveGame === "trace"){
    window.__traceFrom = "todayLearning";
    trm = act.traceMode || "net";
    trace(act.traceItem || "net_thang_dung");
    return;
  }
  if(!currentPlayingAct || currentPlayingAct.id !== actId){
    window.__actCurrentStep = 0;
    window.__actQuizStarted = false;
  }
  currentPlayingAct = act;
  actAnswered = false;
  currentActAttempts = 0;
  if(window.Analytics) Analytics.startActivity(act);

  const tInfo = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[act.ageTier]) ? AGE_TIERS[act.ageTier] : { nameVi: "Bài học", nameEn: "Activities", badge: "🎯" };
  const bcTierTitle = !isAgeTierSelectorEnabled() ? T("Chuẩn bị vào lớp 1", "Grade 1 Prep") : T(tInfo.nameVi, tInfo.nameEn);
  const bcTierBadge = !isAgeTierSelectorEnabled() ? "🎒" : (tInfo.badge || "🎒");
  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"tierActivities", t:bcTierTitle, i:bcTierBadge},
    {t:T(act.title, act.titleEn || act.title), i:"✨"}
  ]);

  // Chuẩn hóa content: Hỗ trợ cả Schema mới (content dạng Array), activities, exercises, lẫn cấu trúc cũ
  const rawList = Array.isArray(act.exercises) ? act.exercises : (Array.isArray(act.activities) ? act.activities : null);
  if (rawList && !act.content) {
    act.content = rawList.map(item => ({
      question: item.question,
      questionEn: item.questionEn || item.question,
      options: (item.options || []).map(opt => typeof opt === "object" ? `${opt.icon ? opt.icon + " " : ""}${opt.text}` : opt),
      correctAnswer: typeof item.correctAnswer === "string" 
        ? item.options.findIndex(opt => (typeof opt === "object" ? opt.text : opt) === item.correctAnswer)
        : item.correctAnswer,
      explanation: item.audioHint || item.explanation || "Chính xác! Bé làm rất giỏi! 🌟"
    }));
  }

  if (act.videoUrl && !act.mediaSource) {
    act.mediaSource = {
      type: "youtube",
      url: act.videoUrl,
      thumbnail: `https://img.youtube.com/vi/${act.videoUrl.includes("v=") ? act.videoUrl.split("v=")[1].split("&")[0] : act.videoUrl.split("/").pop()}/hqdefault.jpg`
    };
  }

  const isArrayContent = Array.isArray(act.content);
  const currentStep = window.__actCurrentStep || 0;
  const currentItem = isArrayContent ? (act.content[currentStep] || act.content[0]) : act.content;

  if(isArrayContent && currentItem){
    act.contentQuestion = currentItem.question;
    act.contentQuestionEn = currentItem.questionEn || currentItem.question;
    act.options = (currentItem.options || []).map((opt, i) => (typeof opt === "string" ? { id: i, text: opt } : opt));
    act.correctAnswer = currentItem.correctAnswer !== undefined ? currentItem.correctAnswer : act.correctAnswer;
    act.feedback = {
      correct: currentItem.explanation || "Chính xác! Bé làm rất tốt! 🌟",
      wrong: currentItem.hint || "Bé thử đọc kỹ và chọn lại đáp án nhé!"
    };
    act.reward = act.reward || { stars: Math.min(5, Math.max(1, act.difficulty || 3)) };
    act.skill = act.learningObjective || act.learningGoal || act.skill;
  }

  let mediaHtml = "";
  if(act.mediaSource && act.mediaSource.url){
    if(act.mediaSource.type === "youtube"){
      const ytId = act.mediaSource.url.includes("v=") ? act.mediaSource.url.split("v=")[1].split("&")[0] : act.mediaSource.url.split("/").pop();
      const isFile = typeof window !== "undefined" && window.location && window.location.protocol === "file:";
      const ytThumb = act.mediaSource.thumbnail || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      const ytDirectUrl = `https://www.youtube.com/watch?v=${ytId}`;

      if(isFile){
        mediaHtml = `
          <div class="act-video-wrap" style="position:relative;border-radius:18px;margin-bottom:14px;overflow:hidden;background:#0f172a;box-shadow:0 6px 16px rgba(0,0,0,0.18);text-align:center">
            <div style="position:relative;padding-bottom:56.25%;height:0;background:#000">
              <img src="${ytThumb}" alt="${esc(act.title)}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.85">
              <button type="button" onclick="openExternalLinkWithParentGate('${ytDirectUrl}', '${esc(act.title)}')" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:none;cursor:pointer;z-index:2" aria-label="Xem video trên YouTube">
                <div style="width:68px;height:68px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:32px;box-shadow:0 6px 20px rgba(220,38,38,0.5);transition:transform .15s">▶</div>
                <span style="background:rgba(0,0,0,0.78);color:#fff;padding:6px 16px;border-radius:20px;font-size:14px;font-weight:800">Xem video trên YouTube ↗</span>
              </button>
            </div>
            <div style="padding:10px 14px;background:#fef3c7;border-top:2px solid #fde68a;font-size:13px;color:#92400e;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:8px">
              <span>💡 <b>Lưu ý:</b> Khi mở file trực tiếp (file://), YouTube chặn nhúng video (Lỗi 153). Bố mẹ bấm nút để xem qua cổng xác nhận phụ huynh an toàn.</span>
              <button type="button" onclick="openExternalLinkWithParentGate('${ytDirectUrl}', '${esc(act.title)}')" class="pill on" style="font-size:12px;padding:4px 10px;background:#ea580c;color:#fff;white-space:nowrap;border:none;cursor:pointer">Mở YouTube</button>
            </div>
          </div>
        `;
      } else {
        mediaHtml = `
          <div class="act-video-wrap" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:18px;margin-bottom:14px;background:#000;box-shadow:0 6px 16px rgba(0,0,0,0.18)">
            <iframe src="https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&controls=1&autoplay=1&mute=1&playsinline=1" title="${esc(act.title)}" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div style="text-align:right;margin:-8px 0 10px">
            <button type="button" onclick="openExternalLinkWithParentGate('${ytDirectUrl}', '${esc(act.title)}')" style="background:none;border:none;cursor:pointer;font-size:12.5px;color:#64748b;font-weight:700">↗ Xem trực tiếp trên YouTube (Bố mẹ)</button>
          </div>
        `;
      }
    } else if(act.mediaSource.type === "local_mp4"){
      mediaHtml = `<div class="act-video-wrap" style="margin-bottom:12px;text-align:center">
        <video controls poster="${act.mediaSource.thumbnail || ''}" src="${act.mediaSource.url}" style="max-width:100%;max-height:260px;border-radius:14px"></video>
      </div>`;
    } else if(act.mediaSource.type === "image_set"){
      mediaHtml = `<div class="act-media" style="margin-bottom:12px;text-align:center">
        <img src="${act.mediaSource.thumbnail || act.mediaSource.url}" alt="${act.title}" style="max-width:100%;max-height:220px;border-radius:12px;object-fit:cover">
      </div>`;
    }
  } else if(act.content && act.content.media){
    mediaHtml = `<div class="act-media">${act.content.media}</div>`;
  }

  const actQText = act.contentQuestion || (act.content && act.content.question) || act.title;
  const actQTextEn = act.contentQuestionEn || (act.content && act.content.questionEn) || actQText;
  const escSay = s => String(s||"").replace(/'/g, "\\'").replace(/"/g, "&quot;");
  let bodyHtml = "";

  if(act.type === "reading_passage" || act.type === "story_listen"){
    const storyBoxLabel = act.type === "story_listen" ? T("Câu chuyện kỹ năng:","Life Skills Story:") : T("Đoạn văn ngắn:","Short passage:");
    const storyBoxHtml = act.content.storyText ? `
      <div class="act-story-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <b>📖 ${storyBoxLabel}</b>
          <button class="pill" style="font-size:13px;padding:4px 10px;min-height:36px;min-width:auto" onclick="say('${escSay(act.content.storyText)}', '${escSay(act.content.storyText)}')" aria-label="${T("Nghe đọc đoạn văn","Listen to passage")}">🔊 ${T("Nghe đọc","Listen")}</button>
        </div>
        ${act.content.storyText}
      </div>
    ` : "";
    const optsHtml = (act.options || []).map((opt, idx) => `
      <div class="act-opt-row">
        <button type="button" class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChoose('${opt.id}', this)" aria-label="${opt.text}">
          <span class="act-opt-bullet">${idx + 1}</span>
          <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        </button>
        <button type="button" class="act-opt-audio" onclick="say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </div>
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
      <div class="act-opt-row">
        <button type="button" class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChooseBlank('${opt.id}', '${esc(opt.text)}', this)" aria-label="${opt.text}">
          <span class="act-opt-bullet">${idx + 1}</span>
          <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        </button>
        <button type="button" class="act-opt-audio" onclick="say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </div>
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
      <div class="act-opt-row">
        <button type="button" class="act-opt-btn" data-id="${opt.id}" onclick="window.__actChoose('${opt.id}', this)" aria-label="${opt.text}">
          <span class="act-opt-bullet">${idx + 1}</span>
          <span style="flex:1">${T(opt.text, opt.textEn || opt.text)}</span>
        </button>
        <button type="button" class="act-opt-audio" onclick="say('${escSay(opt.text)}', '${escSay(opt.textEn || opt.text)}')" aria-label="${T("Nghe đọc đáp án " + (idx+1), "Listen to option " + (idx+1))}" title="${T("Nghe đọc","Listen")}">🔊</button>
      </div>
    `).join("");
    bodyHtml = `
      ${mediaHtml}
      <div class="act-question" id="actQTitle" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')this.click()" onclick="say('${escSay(actQText)}', '${escSay(actQTextEn)}')" title="${T("Bấm để nghe lại","Tap to listen")}" aria-label="${T("Bấm để nghe lại câu hỏi","Tap to listen to question")}">
        🔊 ${T(actQText, actQTextEn)}
      </div>
      <div class="act-options">${optsHtml}</div>
    `;
  }

  const parentTipHtml = act.parentTip ? `
    <div class="act-parent-tip" style="background:#fef3c7;border-left:4px solid #f59e0b;padding:8px 12px;border-radius:8px;margin-bottom:12px;font-size:13.5px;color:#92400e;display:flex;align-items:flex-start;gap:8px">
      <span style="font-size:18px">💡</span>
      <div><b>${T("Gợi ý cho bố mẹ:","Parent Tip:")}</b> ${act.parentTip}</div>
    </div>
  ` : "";

  const cornerTipBtnHtml = act.parentTip ? `
    <button class="parent-tip-corner-btn" onclick="window.__showParentTipModal('${escSay(act.title)}', '${escSay(act.parentTip)}')" aria-label="Mẹo dạy học cho bố mẹ">
      <span>💡</span> <b>${T("Mẹo dạy bé","Parent Tip")}</b>
    </button>
  ` : "";

  const isPreschool = act.ageTier === "preschool";
  const totalSteps = isArrayContent ? act.content.length : 1;
  const progressPercent = Math.min(100, Math.round(((currentStep + (actAnswered ? 1 : 0)) / totalSteps) * 100));

  const progressBarHtml = `
    <div class="act-progress-track" title="${T(`Tiến trình: ${currentStep + 1}/${totalSteps}`, `Progress: ${currentStep + 1}/${totalSteps}`)}">
      <div class="act-progress-fill" style="width:${progressPercent}%"></div>
    </div>
  `;

  // Chế độ 'Xem & Học' cho bé 4 tuổi: Nếu có video và đang ở bước đầu tiên và chưa bấm 'Bắt đầu làm bài'
  const hasVideo = act.mediaSource && act.mediaSource.type === "youtube";
  const isWatchMode = isPreschool && hasVideo && !window.__actQuizStarted && currentStep === 0;

  if (isWatchMode) {
    m.innerHTML = `
      ${bcHtml}
      ${progressBarHtml}
      <div class="act-watch-box">
        <h2 id="actWatchTitle" role="button" tabindex="0" onclick="say('${escSay(act.title)}', '${escSay(act.titleEn || act.title)}')" style="cursor:pointer;font-family:'Baloo 2',sans-serif;font-size:clamp(22px,5.5vw,30px);color:var(--ink);margin:0 0 10px" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">
          🔊 ${T(act.title, act.titleEn || act.title)}
        </h2>
        <div style="font-size:15px;color:#475569;margin-bottom:14px;font-weight:700">
          🎯 ${act.learningGoal || act.learningObjective || act.skill || ""}
        </div>
        ${mediaHtml}
        <div style="text-align:center;margin-top:14px">
          <button class="act-start-btn" onclick="window.__startPreschoolQuiz()">
            <span>✏️</span> ${T("Bé bắt đầu làm bài tập nào! 🚀", "Start Quiz Now! 🚀")}
          </button>
        </div>
      </div>
    `;
    catSet("happy");
    say(act.title, act.titleEn || act.title);
    return;
  }

  // Khi bé đang làm bài tập (hoặc các lớp khác)
  m.innerHTML = `
    ${bcHtml}
    ${progressBarHtml}
    <div class="act-player-box ${window.__actJustStarted ? 'act-quiz-slideup' : ''}">
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
  window.__actJustStarted = false;

  say(actQText, actQTextEn);
  catSet("thinking");
}

window.__startPreschoolQuiz = function(){
  window.__actQuizStarted = true;
  window.__actJustStarted = true;
  sfxTingTing();
  if (currentPlayingAct) {
    playActivity(currentPlayingAct.id);
  }
};

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

// Ghi nhận tiến độ kỹ năng sau mỗi câu trả lời của bé trong hoạt động (progress.js)
function recordActivityProgress(isCorrect, act = currentPlayingAct) {
  if (!act) return;
  const skillId = act.skillId || act.skill || act.id;
  if (!skillId) return;
  const updateFn = (typeof updateProgress === "function")
    ? updateProgress
    : (typeof window !== "undefined" && typeof window.updateProgress === "function"
        ? window.updateProgress
        : null);
  if (updateFn) {
    try {
      updateFn(skillId, isCorrect);
      if (act.id && act.id !== skillId) {
        updateFn(act.id, isCorrect);
      }
    } catch (e) {
      console.warn("Lỗi ghi nhận tiến độ:", e);
    }
  }
}
window.recordActivityProgress = recordActivityProgress;

window.__actChoose = function(chosenId, btn){
  if(actAnswered || !currentPlayingAct) return;
  const act = currentPlayingAct;
  const isRight = String(chosenId) === String(act.correctAnswer);
  if(window.Analytics) Analytics.answerActivity(isRight, chosenId);
  recordActivityProgress(isRight, act);
  const fbDiv = document.getElementById("actFeedback");

  if(isRight){
    btn.classList.add("good");
    const sp = btn.querySelector("span");
    if(sp) sp.textContent = "✔";

    // Âm thanh "Ting ting" vui tai + Hiệu ứng pháo hoa
    sfxTingTing();
    fx();

    const isArrayContent = Array.isArray(act.content);
    const currentStep = window.__actCurrentStep || 0;

    if(isArrayContent && currentStep + 1 < act.content.length){
      actAnswered = true;
      catSet("celebrate");
      const ctrlsDiv = document.getElementById("actCtrls");
      if(fbDiv){
        fbDiv.className = "act-feedback-card good";
        fbDiv.innerHTML = `🎉 <b>${T("Con giỏi lắm! ⭐", "Well done!")}</b><br>${T(act.feedback.correct, act.feedback.correct)}`;
      }
      if(ctrlsDiv){
        ctrlsDiv.style.display = "flex";
        ctrlsDiv.innerHTML = `
          <button class="cg-btn-replay" onclick="window.__actNextStep()" style="font-size:20px;padding:12px 24px;border-radius:28px">
            ${T(`Câu tiếp theo (${currentStep + 2}/${act.content.length}) ➡️`, `Next Question (${currentStep + 2}/${act.content.length}) ➡️`)}
          </button>
        `;
      }
      say("Bé giỏi lắm!", "Well done!");
      return;
    }

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
      fbDiv.innerHTML = `💡 <b>${T("Cố lên con yêu, thử lại nhé! 💖", "Try again, sweetheart!")}</b><br>${T(act.feedback.wrong, act.feedback.wrong)}${act.feedback.hint ? `<br><i>Gợi ý: ${act.feedback.hint}</i>` : ""}`;
    }
    say("Không sao, bé thử lại nhé", "Try again, sweetheart!");
    setTimeout(() => { catSet("thinking"); }, 900);
  }
};

window.__actChooseBlank = function(chosenId, optText, btn){
  if(actAnswered || !currentPlayingAct) return;
  const act = currentPlayingAct;
  const isRight = String(chosenId) === String(act.correctAnswer);
  if(window.Analytics) Analytics.answerActivity(isRight, chosenId);
  recordActivityProgress(isRight, act);
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
    recordActivityProgress(true, currentPlayingAct);
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
    recordActivityProgress(false, currentPlayingAct);
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
  recordActivityProgress(isMatch, act);

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

window.__actNextStep = function(){
  window.__actCurrentStep = (window.__actCurrentStep || 0) + 1;
  actAnswered = false;
  currentActAttempts = 0;
  if(currentPlayingAct) playActivity(currentPlayingAct.id);
};

window.__nextAct = function(){
  window.__actCurrentStep = 0;
  actAnswered = false;
  currentActAttempts = 0;
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
 m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Học số","Numbers"),i:"🔢"}],`<button class="pill" onclick="go('numP')">🎮 ${T("Chơi","Play")}</button>`)}<div class="stage"><button class="nav" onclick="numL(${(n+20)%21})">${im("btn_back")}</button><button class="bignum${n>9?" two":""}" onclick="sayN(${n})">${n}</button><button class="nav" onclick="numL(${(n+1)%21})">${im("btn_next")}</button></div><div class="word" onclick="sayN(${n})" role="button" tabindex="0" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${NV[n]} · ${NE[n]}</div><div class="objs">${n?Array.from({length:n},(_,i)=>`<button class="ob" onclick="cnt(this,${i+1})">${im(o)}</button>`).join(""):"<span>Không có gì · Nothing</span>"}</div><div class="chips" style="gap:10px">${[...Array(21).keys()].map(i=>`<button class="chip ${i==n?"on":""}" style="min-width:48px;min-height:48px;margin:2px" onclick="numL(${i})">${i}</button>`).join("")}</div>`;if(!isBackNav)sayN(n)}
function numP(){if(!R(0,2))return numF();const n=R(1,MX()),o=pick(COUNT),c=new Set([n]);while(c.size<3)c.add(R(1,MX()));
 quiz(T("Có bao nhiêu?","How many?"),"Có bao nhiêu?","How many?",`<div class="objs">${Array.from({length:n},()=>im(o,"")).join("").replace(/<img/g,'<img style="width:clamp(48px,11vw,72px)"')}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,numP,()=>["",NV[n],NE[n]])}
function letL(){const arr=LET_ALL();m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Chữ cái","Letters"),i:"🔤"}],`<button class="pill" onclick="go('letP')">🎮 ${T("Chơi","Play")}</button>`)}<h2 id="letLQ" role="button" tabindex="0" onclick="say('Chạm vào chữ cái nhé','Tap a letter')" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${T("Chạm vào chữ cái","Tap a letter")}</h2><div class="lgrid">${arr.map(L=>`<button onclick="go('letD','${L}')">${imL(L)}</button>`).join("")}</div>`;sayPrompt("letL","Chạm vào chữ cái nhé","Tap a letter",180000);need("s")}
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
function games(){
  window.__traceFrom = "games";
  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Chơi tự do","Free Play"),i:"🎮"}])}
  <div style="text-align:center;margin:8px 0 16px">
    <h2 style="font-size:24px;margin:0 0 4px">🎮 ${T("Chơi tự do","Free Play")}</h2>
    <p style="font-size:14px;color:#64748b;margin:0">${T("Các trò chơi vui nhộn rèn luyện trí tuệ & kỹ năng cho bé 🌟","Fun learning games and creative activities 🌟")}</p>
  </div>
  <div class="cards">
    ${card("countGame","<b>🍎 3 ⭐</b>","Đếm hình chọn số","Count & Match","game")}
    ${card("bubbleGame","<b>🫧 Aa</b>","Bắt bóng chữ","Bubble Pop Letters","game")}
    ${card("letL",imL("A")+imL("B"),"Khám phá chữ cái","Alphabet Letters","vietnamese")}
    ${card("numL","<b>1 2 3</b>","Học số đếm","Numbers & Count","math")}
    ${card("trace",im("pencil")+"<b>Aa1</b>","Tập viết chữ & nét","Handwriting practice","trace")}
    ${card("readL","<b>ĐỌC</b>","Đánh vần & Đọc","Reading","reading")}
    ${card("mis","<b>1 2 ? 4</b>","Số còn thiếu","Missing number","math")}
    ${card("match",im("apple")+imL("A"),"Ghép chữ và hình","Match","vietnamese")}
    ${card("mem",im("cat")+im("cat"),"Lật thẻ ghi nhớ","Memory","logic")}
    ${card("cmpS","<b>&gt; = &lt;</b>","Dấu so sánh","Signs","math")}
    ${card("storyL","<b>📖 ✨</b>","Truyện cổ tích","Stories","reading")}
  </div>`;
  sayPrompt("games","Bé chọn trò chơi tự do nhé! Rất nhiều trò vui!","Pick a fun game to play!",180000);
}

/* ========================================================
   TRÒ CHƠI HỌC TẬP TIỀN TIỂU HỌC: ĐẾM HÌNH CHỌN SỐ (COUNT GAME)
   Logic đã được tách thành module độc lập: games/count-game.js
   (Tự đọc say(viPrompt, enPrompt), phần tử #cgPrompt)
   ======================================================== */
let countGameModule = null;

async function countGame(isReplay){
  if(!countGameModule){
    m.innerHTML = `<div class="loading-box"><div class="spinner"></div><p style="font-size:18px;font-weight:800;color:var(--acc)">${T("Đang tải trò chơi...","Loading game...")}</p></div>`;
    const isFileProto = typeof window !== "undefined" && window.location && window.location.protocol === "file:";
    if (isFileProto) {
      await loadScriptTag("games/count-game.js");
      countGameModule = window.CountGame;
    } else {
      try {
        const mod = await import('./games/count-game.js');
        countGameModule = mod.default || mod || window.CountGame;
      } catch(e) {
        await loadScriptTag("games/count-game.js");
        countGameModule = window.CountGame;
      }
    }
  }

  if(countGameModule){
    countGameModule.init(m);
    countGameModule.render(isReplay);
  } else {
    m.innerHTML = `${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Đếm hình chọn số","Count & Match"),i:"🍎"}])}
      <div style="text-align:center;padding:40px 20px">
        <h3>${T("Chưa tải được trò chơi","Could not load game")}</h3>
        <button class="pill on" onclick="countGame(true)" style="margin-top:12px">🔄 ${T("Thử lại","Try Again")}</button>
      </div>`;
  }
}
window.countGame = countGame;

/* ========================================================
   TRÒ CHƠI HỌC TẬP TIỀN TIỂU HỌC: BẮT BÓNG CHỮ (BUBBLE POP LETTERS)
   ======================================================== */
const BUBBLE_THEMES = [
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(254,205,211,0.65) 45%, rgba(244,63,94,0.7) 100%)", border: "#f43f5e", color: "#881337" },
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(186,230,253,0.65) 45%, rgba(14,165,233,0.7) 100%)", border: "#0284c7", color: "#075985" },
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(187,247,208,0.65) 45%, rgba(34,197,94,0.7) 100%)", border: "#16a34a", color: "#14532d" },
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(254,240,138,0.65) 45%, rgba(234,179,8,0.75) 100%)", border: "#ca8a04", color: "#713f12" },
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(233,213,255,0.65) 45%, rgba(168,85,247,0.7) 100%)", border: "#9333ea", color: "#581c87" },
  { bg: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.92) 0%, rgba(254,215,170,0.65) 45%, rgba(249,115,22,0.75) 100%)", border: "#ea580c", color: "#7c2d12" }
];

let bgActiveAnim = null;

function bubbleGame(isReplay) {
  if (bgActiveAnim) {
    cancelAnimationFrame(bgActiveAnim);
    bgActiveAnim = null;
  }

  const l = ql = qL();
  const pool = (l === "vi" ? LET_VI : LET_EN).slice();
  const TARGET_SCORE = 10;
  let score = 0;
  let targetLetter = pick(pool);
  let isGentleMode = true;
  let baseSpeed = 0.65;
  let spawnCounter = 0;
  let spawnInterval = 75;
  let frameCount = 0;
  let bubbleUid = 0;
  const bubbles = [];

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"games", t:T("Trò chơi","Games"), i:"🎮"},
    {t:T("Bắt bóng chữ","Bubble Pop"), i:"🫧"}
  ]);

  m.innerHTML = `
    ${bcHtml}
    <div class="bubble-game-wrap" id="bgWrap">
      <div class="bubble-target-bar">
        <div class="bubble-target-box">
          <span style="font-weight:800;font-size:clamp(15px,3.8vw,18px);color:#334155">
            🎯 ${T("Bắt chữ:","Pop:")}
          </span>
          <span class="bubble-target-letter" id="bgTargetLetter">${targetLetter}</span>
          <button class="pill" onclick="window.__bgReplayAudio()" style="font-size:13.5px;padding:3px 10px;min-height:36px;border-radius:18px">
            🔊 ${T("Nghe lại","Listen")}
          </button>
          <button class="pill" id="bgSpeedBtn" onclick="window.__bgToggleSpeed()" style="font-size:13.5px;padding:3px 10px;min-height:36px;border-radius:18px" title="${T("Đổi tốc độ bay chậm hoặc nhanh","Toggle gentle or fast speed")}">
            🐢 ${T("Bay chậm","Gentle")}
          </button>
        </div>
        <div class="bubble-score-badge">
          ⭐ <span id="bgScore">0</span> / ${TARGET_SCORE}
        </div>
      </div>
      <div class="bubble-sky" id="bubbleSky"></div>
    </div>
  `;

  const skyEl = m.querySelector("#bubbleSky");
  const targetLetterEl = m.querySelector("#bgTargetLetter");
  const scoreEl = m.querySelector("#bgScore");

  function announceTarget() {
    sayAs(l, `Bé hãy bắt bóng chữ ${targetLetter}`, `Pop the bubble with letter ${targetLetter}`);
  }

  window.__bgReplayAudio = function() {
    announceTarget();
    if (targetLetterEl) {
      targetLetterEl.style.animation = "none";
      void targetLetterEl.offsetWidth;
      targetLetterEl.style.animation = "pop .35s ease";
    }
  };

  window.__bgToggleSpeed = function() {
    isGentleMode = !isGentleMode;
    const btn = document.getElementById("bgSpeedBtn");
    if (btn) {
      btn.innerHTML = isGentleMode ? `🐢 ${T("Bay chậm","Gentle")}` : `🐇 ${T("Bay nhanh","Fast")}`;
    }
    baseSpeed = isGentleMode ? 0.65 : 1.35;
    say(isGentleMode ? "Bóng bay chậm cho bé dễ bắt nhé" : "Bóng bay nhanh hơn nào!");
  };

  announceTarget();
  catSet("happy");

  function setTargetLetter(newLetter) {
    targetLetter = newLetter;
    if (targetLetterEl) {
      targetLetterEl.textContent = targetLetter;
      targetLetterEl.style.animation = "none";
      void targetLetterEl.offsetWidth;
      targetLetterEl.style.animation = "pop .35s ease";
    }
    announceTarget();
  }

  function spawnBubble() {
    if (!skyEl || bubbles.filter(b => b.state === "floating").length >= 5) return;
    const skyRect = skyEl.getBoundingClientRect();
    const skyWidth = skyRect.width || 360;
    const skyHeight = skyRect.height || 420;

    const isTarget = Math.random() < 0.45 || !bubbles.some(b => b.letter === targetLetter && b.state === "floating");
    const letter = isTarget ? targetLetter : pick(pool.filter(ch => ch !== targetLetter));
    const theme = pick(BUBBLE_THEMES);

    const bEl = document.createElement("div");
    bEl.className = "bubble-item";
    bEl.innerHTML = `
      <div class="bubble-body" style="background:${theme.bg};border-color:${theme.border}">
        <div class="bubble-shine"></div>
        <span class="bubble-char" style="color:${theme.color}">${letter}</span>
      </div>
    `;

    const bubbleRadius = 40;
    const spawnX = bubbleRadius + Math.random() * Math.max(60, skyWidth - bubbleRadius * 2);
    const spawnY = skyHeight + 50;

    const bubbleObj = {
      id: ++bubbleUid,
      letter,
      x: spawnX,
      y: spawnY,
      speed: baseSpeed + Math.random() * 0.35,
      wobbleSpeed: 0.028 + Math.random() * 0.025,
      wobbleAmp: 12 + Math.random() * 14,
      wobbleOffset: Math.random() * 10,
      state: "floating",
      el: bEl
    };

    function onBubbleTap(e) {
      if (bubbleObj.state !== "floating") return;
      if (e.cancelable) e.preventDefault();

      if (bubbleObj.letter === targetLetter) {
        bubbleObj.state = "popping";
        sfxPop();
        score++;
        if (scoreEl) scoreEl.textContent = score;

        const floatEl = document.createElement("div");
        floatEl.className = "bubble-float-text";
        floatEl.textContent = "+1 ⭐";
        floatEl.style.left = `${bubbleObj.x}px`;
        floatEl.style.top = `${bubbleObj.y - 20}px`;
        skyEl.appendChild(floatEl);
        setTimeout(() => floatEl.remove(), 850);

        bEl.classList.add("bubble-popping");
        setTimeout(() => {
          bEl.remove();
          const idx = bubbles.indexOf(bubbleObj);
          if (idx !== -1) bubbles.splice(idx, 1);
        }, 320);

        baseSpeed = isGentleMode ? Math.min(0.85, 0.65 + score * 0.02) : Math.min(2.5, 1.35 + score * 0.1);
        spawnInterval = isGentleMode ? 75 : Math.max(50, 80 - score * 3);

        if (score < TARGET_SCORE) {
          if (score % 2 === 0) {
            const nextL = pick(pool.filter(c => c !== targetLetter));
            setTargetLetter(nextL);
          }
        } else {
          cancelAnimationFrame(bgActiveAnim);
          bgActiveAnim = null;
          sfxTingTing();
          fx();
          catSet("celebrate");
          setTimeout(() => {
            renderBubbleWin(score, TARGET_SCORE);
          }, 600);
        }
      } else {
        bubbleObj.state = "deflating";
        sfxDeflate();
        bEl.classList.add("bubble-deflating");

        say(`Bé tìm chữ ${targetLetter} nhé`, `Look for letter ${targetLetter}`);

        if (targetLetterEl) {
          targetLetterEl.style.animation = "shake .4s ease-in-out";
          setTimeout(() => {
            if (targetLetterEl) targetLetterEl.style.animation = "";
          }, 450);
        }

        setTimeout(() => {
          bEl.remove();
          const idx = bubbles.indexOf(bubbleObj);
          if (idx !== -1) bubbles.splice(idx, 1);
        }, 380);
      }
    }

    bEl.addEventListener("touchstart", onBubbleTap, { passive: false });
    bEl.addEventListener("mousedown", onBubbleTap);

    skyEl.appendChild(bEl);
    bubbles.push(bubbleObj);
  }

  function gameLoop() {
    if (!document.getElementById("bubbleSky")) {
      bgActiveAnim = null;
      return;
    }

    frameCount++;
    spawnCounter++;

    if (spawnCounter >= spawnInterval) {
      spawnCounter = 0;
      spawnBubble();
    }

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      if (b.state === "floating") {
        b.y -= b.speed;
        const wobbleX = Math.sin(frameCount * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp;
        b.el.style.transform = `translate(${b.x + wobbleX}px, ${b.y}px)`;

        if (b.y < -70) {
          b.el.remove();
          bubbles.splice(i, 1);
        }
      }
    }

    bgActiveAnim = requestAnimationFrame(gameLoop);
  }

  spawnBubble();
  setTimeout(spawnBubble, 450);
  bgActiveAnim = requestAnimationFrame(gameLoop);
}

function renderBubbleWin(score, total) {
  const starCount = 3;
  const starsHtml = Array.from({length: 3}, (_, i) => im("gstar").replace("<img", `<img style="width:56px;${i < starCount ? "" : "filter:grayscale(1);opacity:.35"}"`)).join("");

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"games", t:T("Trò chơi","Games"), i:"🎮"},
    {t:T("Kết quả","Results"), i:"🏆"}
  ]);

  m.innerHTML = `${bcHtml}
  <div class="cg-wrap">
    <div class="cg-result-card">
      <div class="cg-result-trophy">🫧 🏆</div>
      <h2>${T("Bé bắt bóng siêu quá!","Bubble Pop Champion!")}</h2>
      <div class="cg-result-stars">${starsHtml}</div>
      <div class="cg-result-score">${T(`Bé đã bắt đúng ${score} bong bóng chữ!`, `You popped ${score} letter bubbles!`)}</div>
      <p class="cg-result-msg">${T("Bé phản xạ chữ cái rất nhanh và cừ khôi! Thưởng bé 3 sao vàng! 🌟", "Awesome reflexes! You earned 3 stars! 🌟")}</p>
      <div class="cg-result-btns">
        <button class="cg-btn-replay" onclick="bubbleGame(true)" style="background:#0284c7;border-color:#0369a1">
          🔄 ${T("Bắt bóng tiếp nào!","Play Again")}
        </button>
        <button class="cg-btn-back" onclick="go('games')">
          🔙 ${T("Quay lại trò chơi","Back to Games")}
        </button>
      </div>
    </div>
  </div>`;

  sfxFanfare();
  fx();
  catSet("celebrate");
  say("Hoan hô bé! Bé bắt bóng chữ rất siêu! Thưởng bé ba sao vàng!", "Hooray! You are a bubble popping champion! You earned three stars!");
}

function mis(){const mx=Math.max(MX(),6),s=R(1,mx-4),h=R(1,3),n=s+h,c=new Set([n]);while(c.size<3)c.add(R(1,mx));
 quiz(T("Số nào còn thiếu?","Which number is missing?"),"Số nào còn thiếu?","Which number is missing?",`<div class="objs">${[0,1,2,3,4].map(i=>`<span style="font-size:64px;font-weight:800;padding:0 10px;color:var(--acc)">${i==h?"?":s+i}</span>`).join("")}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,mis,()=>["",NV[n],NE[n]])}
function cmpS(){let a=R(1,Math.min(MX(),10)),b=R(1,Math.min(MX(),10));if(!R(0,3))b=a;const o1=pick(COUNT),o2=pick(COUNT),g=(n,o)=>`<div class="grp" style="flex:1">${Array.from({length:n},()=>im(o)).join("")}</div>`,s=a>b?">":a<b?"<":"=";
 quiz(T("Chọn dấu đúng","Pick the right sign"),"Chọn dấu đúng","Pick the right sign",`<div class="stage" style="gap:6px">${g(a,o1)}<span style="font-size:70px;font-weight:800;color:var(--acc)">?</span>${g(b,o2)}</div>`,[">","=","<"].map(v=>({k:v,h:`<span class="ans">${v==">"?"&gt;":v=="<"?"&lt;":"="}</span>`})),s,cmpS,()=>[`<div class="eq">${a} ${s} ${b}</div>`,...(a==b?[`${NV[a]} bằng ${NV[b]}`,`${NE[a]} equals ${NE[b]}`]:[`${NV[a]} ${a>b?"nhiều":"ít"} hơn ${NV[b]}`,`${NE[a]} is ${a>b?"more":"fewer"} than ${NE[b]}`])])}
function match(){
  const l = ql = qL();
  const allLetters = exPL(l);
  const Ls = shuf(allLetters).slice(0, 3);
  const items = Ls.map(L => {
    const k = pick(exPK(l, L));
    return { L, k, ex: EXA[k] };
  });

  const leftCards = shuf(items.map(it => ({ L: it.L })));
  const rightCards = shuf(items.map(it => ({ L: it.L, k: it.k, ex: it.ex })));

  let remaining = items.length;
  let wr = 0;
  const connectedPairs = [];
  const WIRE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

  const bcHtml = kbc([
    {s:"home", t:T("Trang chủ","Home"), i:"🏠"},
    {s:"games", t:T("Trò chơi","Games"), i:"🎮"},
    {t:T("Ghép chữ & hình","Match"), i:"🧩"}
  ]);

  m.innerHTML = `
    ${bcHtml}
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px">
      <h2 style="margin:0;font-size:clamp(20px,5vw,26px);color:var(--ink)">
        ${T("Nối chữ với hình đúng", "Connect letter to picture")}
      </h2>
      <button class="pill" onclick="say('Ghép chữ với hình nhé. Bé có thể chạm vào chữ rồi chạm vào hình, hoặc kéo dây để nối nhé!','Match letter and picture. Tap to connect or drag a line!')" style="font-size:14px;padding:4px 12px;min-height:38px">
        🔊 ${T("Hướng dẫn", "Help")}
      </button>
    </div>
    <div style="text-align:center;font-size:15px;color:#64748b;font-weight:700;margin-bottom:12px">
      👉 ${T("Bé chạm vào chữ rồi chạm vào hình tương ứng, hoặc kéo dây để nối nhé!", "Tap letter then picture, or drag a wire to connect!")}
    </div>

    <div class="drag-connect-wrap" id="dragWrap">
      <svg class="drag-connect-svg" id="dragSvg">
        <path id="dragActivePath" class="drag-wire-active" style="display:none"></path>
      </svg>
      <div class="drag-connect-cols">
        <div class="drag-connect-col left">
          ${leftCards.map(c => `
            <div class="drag-card left" data-side="left" data-l="${c.L}" tabindex="0" role="button" aria-label="${T('Chữ cái ' + c.L, 'Letter ' + c.L)}">
              <span class="drag-card-letter">${c.L}</span>
              <div class="drag-card-dot" aria-hidden="true"></div>
            </div>
          `).join("")}
        </div>
        <div class="drag-connect-col right">
          ${rightCards.map(c => `
            <div class="drag-card right" data-side="right" data-p="${c.k}" data-p-letter="${c.L}" data-t="${c.ex.t}" tabindex="0" role="button" aria-label="${T(c.ex.t, c.ex.t)}">
              <div class="drag-card-dot" aria-hidden="true"></div>
              <div class="drag-card-pic">
                ${im(c.ex.img)}
                <span>${c.ex.t}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  say("Ghép chữ với hình nhé. Bé có thể chạm vào chữ rồi chạm vào hình, hoặc kéo dây để nối nhé!", "Match letter and picture. Tap to connect or drag a line!");
  catSet("thinking");

  const wrapEl = m.querySelector("#dragWrap");
  const svgEl = m.querySelector("#dragSvg");
  const activePath = m.querySelector("#dragActivePath");
  if (!wrapEl || !svgEl || !activePath) return;

  function getDotCenter(cardEl) {
    const wrapRect = wrapEl.getBoundingClientRect();
    const dot = cardEl.querySelector(".drag-card-dot") || cardEl;
    const r = dot.getBoundingClientRect();
    return {
      x: (r.left + r.width / 2) - wrapRect.left,
      y: (r.top + r.height / 2) - wrapRect.top
    };
  }

  function makeCurve(x1, y1, x2, y2, isFromLeft) {
    const dx = Math.max(30, Math.abs(x2 - x1) * 0.5);
    const cx1 = isFromLeft ? x1 + dx : x1 - dx;
    const cx2 = isFromLeft ? x2 - dx : x2 + dx;
    return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
  }

  function redrawFixedWires() {
    if (!document.getElementById("dragWrap")) return;
    svgEl.querySelectorAll(".drag-wire-fixed").forEach(el => el.remove());
    connectedPairs.forEach(p => {
      const p1 = getDotCenter(p.leftEl);
      const p2 = getDotCenter(p.rightEl);
      const d = makeCurve(p1.x, p1.y, p2.x, p2.y, true);
      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("class", "drag-wire-fixed");
      pathEl.setAttribute("stroke", p.color);
      pathEl.setAttribute("d", d);
      svgEl.appendChild(pathEl);
    });
  }

  window.addEventListener("resize", redrawFixedWires, { passive: true });

  let currentDrag = null;
  let tapSelectedCard = null;

  function attemptMatch(firstEl, secondEl) {
    const leftEl = firstEl.dataset.side === "left" ? firstEl : secondEl;
    const rightEl = firstEl.dataset.side === "left" ? secondEl : firstEl;
    const isMatch = (leftEl.dataset.l === rightEl.dataset.pLetter);

    if (isMatch) {
      activePath.style.display = "none";
      leftEl.classList.add("good", "matched");
      rightEl.classList.add("good", "matched");
      leftEl.classList.remove("tap-selected");
      rightEl.classList.remove("tap-selected");

      const color = WIRE_COLORS[connectedPairs.length % WIRE_COLORS.length];
      connectedPairs.push({ leftEl, rightEl, color });

      sfxTingTing();
      fx();
      say(rightEl.dataset.t, rightEl.dataset.t);

      redrawFixedWires();

      remaining--;
      if (remaining === 0) {
        window.removeEventListener("resize", redrawFixedWires);
        cleanupEvents();
        setTimeout(() => {
          win(wr, match, "", "");
        }, 800);
      }
    } else {
      wr++;
      sfxNo();
      activePath.setAttribute("class", "drag-wire-wrong");
      leftEl.classList.add("bad");
      rightEl.classList.add("bad");

      say("Không sao, bé thử lại nhé", "Try again, sweetheart!");

      setTimeout(() => {
        activePath.style.display = "none";
        activePath.setAttribute("class", "drag-wire-active");
        leftEl.classList.remove("bad");
        rightEl.classList.remove("bad");
      }, 380);
    }
  }

  function handleCardTap(cardEl) {
    if (cardEl.classList.contains("matched")) return;
    if (!tapSelectedCard) {
      tapSelectedCard = cardEl;
      cardEl.classList.add("tap-selected");
      return;
    }
    if (tapSelectedCard === cardEl) {
      return;
    }
    if (tapSelectedCard.dataset.side === cardEl.dataset.side) {
      tapSelectedCard.classList.remove("tap-selected");
      tapSelectedCard = cardEl;
      cardEl.classList.add("tap-selected");
      return;
    }
    const prev = tapSelectedCard;
    tapSelectedCard = null;
    prev.classList.remove("tap-selected");
    attemptMatch(prev, cardEl);
  }
  window.__matchCardTap = handleCardTap;

  function findTargetCard(clientX, clientY, sourceSide) {
    const targetSide = sourceSide === "left" ? "right" : "left";
    const candidates = Array.from(wrapEl.querySelectorAll(`.drag-card[data-side="${targetSide}"]:not(.matched)`));
    if (!candidates.length) return null;

    const hitEl = document.elementFromPoint(clientX, clientY);
    if (hitEl) {
      const card = hitEl.closest(`.drag-card[data-side="${targetSide}"]:not(.matched)`);
      if (card) return card;
    }

    let bestCard = null;
    let minD = 999999;
    candidates.forEach(card => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(clientX - cx, clientY - cy);
      const insidePadded = (
        clientX >= r.left - 30 &&
        clientX <= r.right + 30 &&
        clientY >= r.top - 30 &&
        clientY <= r.bottom + 30
      );
      if ((insidePadded || d < 65) && d < minD) {
        minD = d;
        bestCard = card;
      }
    });

    return bestCard;
  }

  function handleStart(e, cardEl) {
    if (cardEl.classList.contains("matched")) return;
    if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();
    const isTouch = Boolean(e.touches);
    const point = isTouch ? e.touches[0] : e;
    const clientX = point ? point.clientX : 0;
    const clientY = point ? point.clientY : 0;
    const dotPos = getDotCenter(cardEl);

    currentDrag = {
      sourceEl: cardEl,
      sourceSide: cardEl.dataset.side,
      startX: dotPos.x,
      startY: dotPos.y,
      touchStartX: clientX,
      touchStartY: clientY,
      moved: false
    };

    cardEl.classList.add("dragging");

    if (cardEl.dataset.side === "left") {
      sayAs(l, cardEl.dataset.l, cardEl.dataset.l);
    } else {
      say(cardEl.dataset.t, cardEl.dataset.t);
    }

    activePath.setAttribute("class", "drag-wire-active");
    activePath.setAttribute("d", `M ${dotPos.x} ${dotPos.y} L ${dotPos.x} ${dotPos.y}`);
    activePath.style.display = "block";
  }

  function handleMove(e) {
    if (!currentDrag || !document.getElementById("dragWrap")) return;
    if (e.cancelable) e.preventDefault();
    const isTouch = Boolean(e.touches);
    const point = isTouch ? e.touches[0] : e;
    const wrapRect = wrapEl.getBoundingClientRect();
    const curX = point.clientX - wrapRect.left;
    const curY = point.clientY - wrapRect.top;

    const moveDist = Math.hypot(point.clientX - currentDrag.touchStartX, point.clientY - currentDrag.touchStartY);
    if (moveDist > 10) currentDrag.moved = true;
    if (!currentDrag.moved) return;

    const d = makeCurve(
      currentDrag.startX,
      currentDrag.startY,
      curX,
      curY,
      currentDrag.sourceSide === "left"
    );
    activePath.setAttribute("d", d);

    wrapEl.querySelectorAll(".drag-card.hover-target").forEach(el => el.classList.remove("hover-target"));
    const hoverCard = findTargetCard(point.clientX, point.clientY, currentDrag.sourceSide);
    if (hoverCard) {
      hoverCard.classList.add("hover-target");
    }
  }

  function handleEnd(e) {
    if (!currentDrag || !document.getElementById("dragWrap")) return;
    const isTouch = Boolean(e.changedTouches);
    const point = isTouch ? e.changedTouches[0] : (e.touches ? e.touches[0] : e);
    const clientX = point ? point.clientX : 0;
    const clientY = point ? point.clientY : 0;

    const sourceEl = currentDrag.sourceEl;
    sourceEl.classList.remove("dragging");
    wrapEl.querySelectorAll(".drag-card.hover-target").forEach(el => el.classList.remove("hover-target"));

    const isDragGesture = currentDrag.moved;
    const dragData = currentDrag;
    currentDrag = null;

    if (!isDragGesture) {
      activePath.style.display = "none";
      handleCardTap(sourceEl);
      return;
    }

    if (tapSelectedCard) {
      tapSelectedCard.classList.remove("tap-selected");
      tapSelectedCard = null;
    }

    const targetCard = findTargetCard(clientX, clientY, dragData.sourceSide);
    if (targetCard) {
      attemptMatch(dragData.sourceEl, targetCard);
    } else {
      activePath.style.display = "none";
    }
  }

  function cleanupEvents() {
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("touchend", handleEnd);
    document.removeEventListener("touchcancel", handleEnd);
    document.removeEventListener("mouseup", handleEnd);
  }

  wrapEl.querySelectorAll(".drag-card").forEach(card => {
    card.addEventListener("touchstart", (e) => handleStart(e, card), { passive: false });
    card.addEventListener("mousedown", (e) => handleStart(e, card));
  });

  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchend", handleEnd, { passive: false });
  document.addEventListener("touchcancel", handleEnd, { passive: false });
  document.addEventListener("mouseup", handleEnd);
  say("Ghép chữ với hình nhé. Bé có thể chạm vào chữ rồi chạm vào hình, hoặc kéo dây để nối nhé!", "Match letter and picture. Tap to connect or drag a line!");
  catSet("thinking");
}
function mem(){const l=ql=qL(),ks=shuf(exP(l)).slice(0,3),cs=shuf([...ks,...ks]);let a=null,lock=false,left=3,miss=0;
 m.innerHTML=kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Lật thẻ trí nhớ","Memory"),i:"🃏"}])+`<h2 id="memQ" role="button" tabindex="0" onclick="say('Tìm hai hình giống nhau','Find two that are the same')" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${T("Tìm hai hình giống nhau","Find the pairs")}</h2><div class="opts mem" style="max-width:520px;margin:12px auto">${cs.map(k=>`<button class="opt" data-c="${k}">${im("gstar")}</button>`).join("")}</div>`;
 say("Tìm hai hình giống nhau","Find two that are the same");catSet("thinking");
 m.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{if(lock||b.disabled||b===a)return;const k=b.dataset.c;b.innerHTML=im(EXA[k].img);say(EXA[k].t,EXA[k].t);
  if(!a){a=b;return}
  if(a.dataset.c===k){[a,b].forEach(x=>{x.disabled=true;x.classList.add("good")});a=null;sfxOk();if(!--left)setTimeout(()=>win(miss>2?1:0,mem,"",""),900)}
  else{miss++;lock=true;sfxNo();const p=a;a=null;setTimeout(()=>{p.innerHTML=b.innerHTML=im("gstar");lock=false},1200)}})}
function sayTrace(item, type = "letter"){
  if(!SOUND_ON()) return;
  if(type === "letter"){
    const l = String(item || "").toLowerCase();
    const alphaMap = {
      "a": "audio/alpha_vi_a.mp3",
      "ă": "audio/alpha_vi_aw.mp3",
      "â": "audio/alpha_vi_aa.mp3",
      "b": "audio/alpha_vi_b.mp3",
      "c": "audio/alpha_vi_c.mp3",
      "d": "audio/alpha_vi_d.mp3",
      "đ": "audio/alpha_vi_dd.mp3",
      "e": "audio/alpha_vi_e.mp3",
      "ê": "audio/alpha_vi_ee.mp3",
      "g": "audio/alpha_vi_g.mp3",
      "h": "audio/alpha_vi_h.mp3",
      "i": "audio/alpha_vi_i.mp3",
      "k": "audio/alpha_vi_k.mp3",
      "l": "audio/alpha_vi_l.mp3",
      "m": "audio/alpha_vi_m.mp3",
      "n": "audio/alpha_vi_n.mp3",
      "o": "audio/alpha_vi_o.mp3",
      "ô": "audio/alpha_vi_oo.mp3",
      "ơ": "audio/alpha_vi_ow.mp3",
      "p": "audio/alpha_vi_p.mp3",
      "q": "audio/alpha_vi_q.mp3",
      "r": "audio/alpha_vi_r.mp3",
      "s": "audio/alpha_vi_s.mp3",
      "t": "audio/alpha_vi_t.mp3",
      "u": "audio/alpha_vi_u.mp3",
      "ư": "audio/alpha_vi_uw.mp3",
      "v": "audio/alpha_vi_v.mp3",
      "x": "audio/alpha_vi_x.mp3",
      "y": "audio/alpha_vi_y.mp3"
    };
    const file = alphaMap[l];
    if(file){
      playSafeAudio(file, "Tưởng Vy");
      if(l === "a" || (typeof LETTER_STROKE_GUIDES !== "undefined" && LETTER_STROKE_GUIDES[l])){
        const g = (typeof LETTER_STROKE_GUIDES !== "undefined" && LETTER_STROKE_GUIDES[l]) ? LETTER_STROKE_GUIDES[l] : null;
        const hintVi = g ? g.ruleVi : "Bé nhớ viết nét cong tròn trước, rồi viết nét móc ngược nhé!";
        const hintEn = g ? g.ruleEn : "Trace the circle curve first, then the hook stroke!";
        setTimeout(() => { say(hintVi, hintEn); }, 800);
      }
      return;
    }
    const target = (window.AUDIO_MAP && (window.AUDIO_MAP[l] || window.AUDIO_MAP["chữ " + l])) || l;
    playSafeAudio(target, "Tưởng Vy");
  } else if(type === "number"){
    const n = String(item);
    const numMap = {
      "0": "audio/vi_khong_1othrk.mp3",
      "1": "audio/vi_mot_7ht4.mp3",
      "2": "audio/vi_hai_27io.mp3",
      "3": "audio/syl_b_a_0.mp3",
      "4": "audio/vi_bon_79gf.mp3",
      "5": "audio/vi_nam_2fug.mp3",
      "6": "audio/vi_sau_2iqv.mp3",
      "7": "audio/vi_bay_78d4.mp3",
      "8": "audio/vi_tam_2jhc.mp3",
      "9": "audio/vi_chin_1tikm.mp3",
      "10": "audio/vi_muoi_2bqz3.mp3"
    };
    if(numMap[n]){
      playSafeAudio(numMap[n], "Tưởng Vy");
      return;
    }
    sayN(+n);
  } else if(type === "stroke"){
    const s = VN_STROKES.find(k => k.id === item);
    if(s){
      const strokeKey = s.name.toLowerCase();
      const strokeAudio = window.AUDIO_MAP && (window.AUDIO_MAP[strokeKey] || window.AUDIO_MAP["vi|" + strokeKey]);
      if(strokeAudio){
        playSafeAudio(strokeAudio, "Tưởng Vy");
      } else {
        say(s.name, s.en);
      }
    }
  }
}
let trm=ls.get("trm","g2"),lastTr="";
const TR={
  net:{items:()=>VN_STROKES.map(s=>s.id),vi:x=>`Tập viết ${VN_STROKES.find(s=>s.id===x).name} (${VN_STROKES.find(s=>s.id===x).groupName})`,en:x=>`Trace ${VN_STROKES.find(s=>s.id===x).en}`,say:x=>sayTrace(x,"stroke")},
  g1:{items:()=>(typeof VN_LETTER_GROUPS!=="undefined"?VN_LETTER_GROUPS[0].letters:["c","o","ô","ơ","e","ê","x"]),vi:x=>`Tập viết chữ ${x} (Nhóm 1: Nét cong)`,en:x=>`Trace letter ${x} (Curves)`,say:x=>sayTrace(x,"letter")},
  g2:{items:()=>(typeof VN_LETTER_GROUPS!=="undefined"?VN_LETTER_GROUPS[1].letters:["a","ă","â","d","đ","q"]),vi:x=>`Tập viết chữ ${x} (Nhóm 2: Cong + Thẳng)`,en:x=>`Trace letter ${x} (Curve & Straight)`,say:x=>sayTrace(x,"letter")},
  g3:{items:()=>(typeof VN_LETTER_GROUPS!=="undefined"?VN_LETTER_GROUPS[2].letters:["i","u","ư","t","p","y","n","m","v","r","s"]),vi:x=>`Tập viết chữ ${x} (Nhóm 3: Nét móc)`,en:x=>`Trace letter ${x} (Hooks)`,say:x=>sayTrace(x,"letter")},
  g4:{items:()=>(typeof VN_LETTER_GROUPS!=="undefined"?VN_LETTER_GROUPS[3].letters:["l","b","h","k"]),vi:x=>`Tập viết chữ ${x} (Nhóm 4: Nét khuyết)`,en:x=>`Trace letter ${x} (Loops)`,say:x=>sayTrace(x,"letter")},
  g5:{items:()=>(typeof VN_LETTER_GROUPS!=="undefined"?VN_LETTER_GROUPS[4].letters:["g","v"]),vi:x=>`Tập viết chữ ${x} (Nhóm 5: Nét phối hợp)`,en:x=>`Trace letter ${x} (Combined)`,say:x=>sayTrace(x,"letter")},
  lo:{items:()=>LET_ALL().map(x=>x.toLowerCase()),vi:x=>`Tập viết chữ thường ${x}`,en:x=>`Trace lowercase ${x}`,say:x=>sayTrace(x,"letter")},
  up:{items:()=>LET_ALL(),vi:x=>`Tập viết chữ in hoa ${x}`,en:x=>`Trace uppercase ${x}`,say:x=>sayTrace(x,"letter")},
  nu:{items:()=>[...Array(10).keys()].map(String),vi:x=>`Tập viết số ${x}`,en:x=>`Trace number ${x}`,say:x=>sayTrace(x,"number")}
};
function trace(selItem){const md=TR[trm]||TR.g2;
 const pool=md.items();let it=(selItem&&pool.includes(selItem))?selItem:null;
 if(!it){if(trm==="g2"&&pool.includes("a")&&!lastTr){it="a"}else{do{it=pick(pool)}while(it===lastTr&&pool.length>1)}}lastTr=it;let col="#6b21a8",dn=false;
 const isNet=trm==="net";
 const strokeGuide=(!isNet&&typeof LETTER_STROKE_GUIDES!=="undefined"&&LETTER_STROKE_GUIDES[it])?LETTER_STROKE_GUIDES[it]:null;
 const guide=isNet?`<div style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">${VN_STROKES.find(s=>s.id===it).svg}</div>`:(strokeGuide&&strokeGuide.svgGuide?strokeGuide.svgGuide:"");
 const sampleCard=isNet
  ?`<div class="trace-sample-card" onclick="TR.net.say('${it}')" title="${T("Bấm để nghe đọc","Tap to listen")}"><span class="trace-sample-tag">${VN_STROKES.find(s=>s.id===it).groupName||"MẪU NÉT"} 🔊</span><span style="font-size:16px;font-weight:800;color:#184a86;margin-top:2px">${VN_STROKES.find(s=>s.id===it).name.replace("Nét ","")}</span></div>`
  :`<div class="trace-sample-card" onclick="TR['${trm}'].say('${it}')" title="${T("Bấm để nghe đọc","Tap to listen")}"><span class="trace-sample-tag">${strokeGuide?strokeGuide.group:"MẪU CHỮ"} 🔊</span><span class="trace-sample-letter">${it}</span></div>`;
 const hintBanner=strokeGuide?`<div style="background:linear-gradient(135deg,#fff0f5,#f0f9ff);border:2px solid #ff7aa8;border-radius:18px;padding:6px 14px;margin:4px auto 8px;max-width:340px;font-size:13.5px;color:#831843;line-height:1.35;box-shadow:0 3px 6px rgba(0,0,0,0.06);cursor:pointer" onclick="TR['${trm}'].say('${it}')">✍️ <b>${T("Thứ tự nét viết chữ "+it+":","Stroke order for "+it+":")}</b><br>${T(strokeGuide.ruleVi,strokeGuide.ruleEn)}</div>`:(isNet?`<div style="background:#f0f9ff;border:2px solid #7dd3fc;border-radius:18px;padding:6px 14px;margin:4px auto 8px;max-width:340px;font-size:13px;color:#0369a1;line-height:1.3">📏 <b>${VN_STROKES.find(s=>s.id===it).groupName}:</b> ${VN_STROKES.find(s=>s.id===it).desc}</div>`:"");
 const tabsConfig=[["net","14 Nét cơ bản"],["g1","Nhóm 1 (Cong)"],["g2","Nhóm 2 (Cong+Thẳng)"],["g3","Nhóm 3 (Móc)"],["g4","Nhóm 4 (Khuyết)"],["g5","Nhóm 5 (Phối hợp)"],["lo","abc"],["up","ABC"],["nu","123"]];
 const traceBc = (window.__traceFrom === "todayLearning")
    ? [{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"todayLearning",t:T("Học hôm nay","Today's Learning"),i:"🎒"},{t:T("Tập viết chữ & nét","Trace"),i:"✍️"}]
    : [{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{s:"games",t:T("Trò chơi","Games"),i:"🎮"},{t:T("Tập viết chữ & nét","Trace"),i:"✍️"}];
  m.innerHTML=kbc(traceBc)+`<div class="chips" style="margin:0 0 4px;overflow-x:auto;flex-wrap:nowrap;padding:4px 2px;justify-content:flex-start;max-width:680px">${tabsConfig.map(([k,x])=>`<button class="pill${trm===k?" on":""}" style="white-space:nowrap;font-size:14px;padding:6px 12px;min-height:48px;flex-shrink:0" onclick="trm='${k}';ls.set('trm',trm);trace()">${x}</button>`).join("")}</div><h2 id="traceQ" role="button" tabindex="0" onclick="TR['${trm}'].say('${it}')" style="cursor:pointer;margin:4px 0" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${T(md.vi(it),md.en(it))}</h2>${hintBanner}<div style="position:relative;width:min(86vw,320px);aspect-ratio:320/390;margin:6px auto;background:#fdfdf9;border-radius:24px;border:4px solid #b8d4f6;box-shadow:0 8px 24px rgba(0,0,0,0.1);touch-action:none;overflow:hidden"><canvas id="bgCv" style="position:absolute;inset:0;width:100%;height:100%"></canvas><canvas id="guideCv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></canvas>${guide}<canvas id="cv" style="position:absolute;inset:0;width:100%;height:100%"></canvas>${sampleCard}</div><div class="chips" style="gap:8px;margin:8px 0;align-items:center">${["#6b21a8","#1d4ed8","#dc2626","#16a34a","#ea580c","#db2777"].map(c=>`<button class="chip" style="background:${c};border:3px solid ${c===col?"#fff":"transparent"};box-shadow:0 3px 6px #0002" data-col="${c}"></button>`).join("")}<button class="pill" id="btn-clear" title="${T("Xóa để viết lại","Erase")}">🧼 ${T("Tẩy","Clear")}</button><button class="pill" id="ok">✔ ${T("Xong","Done")}</button></div><div class="chips trace-picker" style="max-height:120px;overflow-y:auto;gap:6px;max-width:540px;margin:6px auto;padding:6px;border-radius:20px;background:var(--card);box-shadow:0 2px 8px #0001">${pool.map(x=>`<button class="pill${x===it?" on":""}" style="min-width:48px;padding:4px 10px;text-align:center" onclick="trace('${x}')">${isNet?VN_STROKES.find(s=>s.id===x).name.replace("Nét ",""):x}</button>`).join("")}</div>`;
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
   if(typeof updateProgress === "function"){
      updateProgress("vi.trace.strokes", true);
    }
    const returnFn = (window.__traceFrom === "todayLearning") ? () => todayLearning(1) : trace;
    triggerCelebration(T("Bé viết đẹp quá!","Great Writing!"),T("Bé nắn nót rất giỏi, thưởng bé 1 ⭐!","Wonderful tracing, +1 ⭐!"),"✍️","⭐",()=>win(0,returnFn,"",""));
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
const PIN_SALT_KEY = "parent_pin_salt";
const PIN_HASH_KEY = "parent_pin_hash";

function generatePinSalt() {
  try {
    const arr = new Uint8Array(16);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(arr);
      return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
    }
  } catch(e) {}
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

async function hashPin(pin, salt) {
  const str = `${salt}:${pin}`;
  try {
    if (typeof crypto !== "undefined" && crypto.subtle && crypto.subtle.digest) {
      const enc = new TextEncoder();
      const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(str));
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
    }
  } catch(e) {}
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

function hasParentPin() {
  try {
    return !!(localStorage.getItem(PIN_HASH_KEY) && localStorage.getItem(PIN_SALT_KEY));
  } catch(e) {
    return false;
  }
}

async function migrateLegacyPin() {
  try {
    const legacy = localStorage.getItem("parent_pin");
    if (legacy && /^\d{4}$/.test(legacy.trim())) {
      const salt = generatePinSalt();
      const hash = await hashPin(legacy.trim(), salt);
      localStorage.setItem(PIN_SALT_KEY, salt);
      localStorage.setItem(PIN_HASH_KEY, hash);
      localStorage.removeItem("parent_pin");
    }
  } catch(e) {}
}
migrateLegacyPin();

async function setParentPin(pin) {
  if (!/^\d{4}$/.test(pin)) return false;
  try {
    const salt = generatePinSalt();
    const hash = await hashPin(pin, salt);
    localStorage.setItem(PIN_SALT_KEY, salt);
    localStorage.setItem(PIN_HASH_KEY, hash);
    localStorage.removeItem("parent_pin");
    return true;
  } catch(e) {
    return false;
  }
}

async function verifyParentPin(pin) {
  if (!/^\d{4}$/.test(pin)) return false;
  try {
    const salt = localStorage.getItem(PIN_SALT_KEY);
    const hash = localStorage.getItem(PIN_HASH_KEY);
    if (!salt || !hash) return false;
    const computed = await hashPin(pin, salt);
    return computed === hash;
  } catch(e) {
    return false;
  }
}

let parentPinModalState = window.parentPinModalState = {
  purpose: "gate",
  step: "verify",
  entered: "",
  tempPin: "",
  onSuccess: null,
  onCancel: null
};

function renderParentPinModalUI(errorMsg = "") {
  const modal = document.getElementById("parentPinModal");
  if (!modal) return;

  const titleEl = document.getElementById("parentPinModalTitle");
  const subEl = document.getElementById("parentPinModalSub");
  const dotsEl = document.getElementById("parentPinModalDots");
  const errEl = document.getElementById("parentPinModalErr");
  const padEl = document.getElementById("parentPinModalPad");
  const helpEl = document.getElementById("parentPinModalHelp");

  const s = parentPinModalState;

  if (titleEl) {
    if (s.step === "setup_enter") {
      titleEl.textContent = lang === "vi" ? "Tạo mã PIN phụ huynh" : "Create Parent PIN";
    } else if (s.step === "setup_confirm") {
      titleEl.textContent = lang === "vi" ? "Xác nhận mã PIN" : "Confirm Parent PIN";
    } else if (s.step === "change_current") {
      titleEl.textContent = lang === "vi" ? "Nhập mã PIN hiện tại" : "Enter Current PIN";
    } else if (s.step === "change_enter") {
      titleEl.textContent = lang === "vi" ? "Nhập mã PIN mới" : "Enter New PIN";
    } else if (s.step === "change_confirm") {
      titleEl.textContent = lang === "vi" ? "Xác nhận mã PIN mới" : "Confirm New PIN";
    } else if (s.purpose === "unlock_time") {
      titleEl.textContent = lang === "vi" ? "Gia hạn thêm thời gian" : "Extend Study Time";
    } else {
      titleEl.textContent = lang === "vi" ? "Khóa phụ huynh" : "Parent Gate";
    }
  }

  if (subEl) {
    if (s.step === "setup_enter") {
      subEl.textContent = lang === "vi" ? "Bố mẹ vui lòng đặt mã PIN gồm 4 số để bảo vệ cài đặt" : "Please set a 4-digit PIN to protect settings";
    } else if (s.step === "setup_confirm") {
      subEl.textContent = lang === "vi" ? "Nhập lại 4 số mã PIN vừa đặt" : "Re-enter the 4-digit PIN to confirm";
    } else if (s.step === "change_current") {
      subEl.textContent = lang === "vi" ? "Nhập mã PIN hiện tại của bố mẹ" : "Enter your current 4-digit PIN";
    } else if (s.step === "change_enter") {
      subEl.textContent = lang === "vi" ? "Nhập 4 số mã PIN mới" : "Enter your new 4-digit PIN";
    } else if (s.step === "change_confirm") {
      subEl.textContent = lang === "vi" ? "Nhập lại mã PIN mới để xác nhận" : "Re-enter your new PIN to confirm";
    } else if (s.purpose === "unlock_time") {
      subEl.textContent = lang === "vi" ? "Nhập mã PIN để mở thêm 15 phút học" : "Enter PIN to extend 15 minutes";
    } else {
      subEl.textContent = lang === "vi" ? "Nhập 4 chữ số mã PIN để tiếp tục" : "Enter 4-digit PIN to continue";
    }
  }

  if (dotsEl) {
    dotsEl.innerHTML = [0, 1, 2, 3].map(i => {
      return `<span class="pin-dot ${i < s.entered.length ? 'filled' : ''}"></span>`;
    }).join("");
  }

  if (errEl) {
    errEl.textContent = errorMsg;
    if (errorMsg) {
      errEl.style.animation = "none";
      void errEl.offsetWidth;
      errEl.style.animation = "shake .3s";
    }
  }

  if (padEl && !padEl.hasChildNodes()) {
    padEl.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map(k => {
      return `<button class="pin-key" type="button" onclick="window.__parentPinModalPress('${k}')">${k}</button>`;
    }).join("");
  }

  if (helpEl) {
    if (s.step && s.step.startsWith("setup_")) {
      helpEl.innerHTML = `💡 ${lang === "vi" ? "Mã PIN giúp ngăn bé vô tình thay đổi cài đặt hoặc mở giới hạn giờ." : "PIN helps prevent children from altering settings or time limits."}`;
    } else if (s.step && s.step.startsWith("change_")) {
      helpEl.innerHTML = `💡 ${lang === "vi" ? "Mã PIN gồm đúng 4 chữ số." : "PIN consists of exactly 4 digits."}`;
    } else {
      helpEl.innerHTML = `💡 ${lang === "vi" ? "Chỉ dành cho bố mẹ. Bố mẹ có thể đổi mã PIN trong bảng điều khiển." : "Parents only. You can change PIN in the dashboard."}`;
    }
  }
}

function openParentPinModal(options = {}) {
  const purpose = options.purpose || "gate";
  let step = "verify";
  if (!hasParentPin() || purpose === "setup") {
    step = "setup_enter";
  } else if (purpose === "change") {
    step = "change_current";
  } else {
    step = "verify";
  }

  window.parentPinModalState = parentPinModalState = {
    purpose: purpose,
    step: step,
    entered: "",
    tempPin: "",
    onSuccess: options.onSuccess || null,
    onCancel: options.onCancel || null
  };

  const modal = document.getElementById("parentPinModal");
  if (modal) {
    modal.style.display = "flex";
  }
  renderParentPinModalUI();
}
window.openParentPinModal = openParentPinModal;

function closeParentPinModal() {
  const modal = document.getElementById("parentPinModal");
  if (modal) modal.style.display = "none";
  const onCancel = parentPinModalState.onCancel;
  window.parentPinModalState = parentPinModalState = { purpose: "gate", step: "verify", entered: "", tempPin: "", onSuccess: null, onCancel: null };
  if (typeof onCancel === "function") onCancel();
}
window.__closeParentPinModal = closeParentPinModal;

window.__parentPinModalPress = async function(k) {
  const s = parentPinModalState;
  if (k === "C") {
    s.entered = "";
    renderParentPinModalUI();
    return;
  }
  if (k === "⌫") {
    s.entered = s.entered.slice(0, -1);
    renderParentPinModalUI();
    return;
  }
  if (s.entered.length < 4) {
    s.entered += k;
    renderParentPinModalUI();
    if (s.entered.length === 4) {
      const pinTyped = s.entered;
      if (s.step === "setup_enter") {
        s.tempPin = pinTyped;
        s.entered = "";
        s.step = "setup_confirm";
        setTimeout(() => renderParentPinModalUI(), 120);
      } else if (s.step === "setup_confirm") {
        if (pinTyped === s.tempPin) {
          await setParentPin(pinTyped);
          sfxOk();
          const modal = document.getElementById("parentPinModal");
          if (modal) modal.style.display = "none";
          const cb = s.onSuccess;
          window.parentPinModalState = parentPinModalState = { purpose: "gate", step: "verify", entered: "", tempPin: "", onSuccess: null, onCancel: null };
          if (typeof cb === "function") cb();
          else go("parent");
        } else {
          sfxNo();
          s.entered = "";
          s.tempPin = "";
          s.step = "setup_enter";
          renderParentPinModalUI(lang === "vi" ? "Mã PIN xác nhận không trùng khớp! Vui lòng thử lại" : "PIN confirmation mismatch! Please try again");
        }
      } else if (s.step === "change_current") {
        const ok = await verifyParentPin(pinTyped);
        if (ok) {
          sfxOk();
          s.entered = "";
          s.step = "change_enter";
          renderParentPinModalUI();
        } else {
          sfxNo();
          s.entered = "";
          renderParentPinModalUI(lang === "vi" ? "Mã PIN hiện tại chưa đúng! Vui lòng thử lại" : "Current PIN is incorrect! Please try again");
        }
      } else if (s.step === "change_enter") {
        s.tempPin = pinTyped;
        s.entered = "";
        s.step = "change_confirm";
        setTimeout(() => renderParentPinModalUI(), 120);
      } else if (s.step === "change_confirm") {
        if (pinTyped === s.tempPin) {
          await setParentPin(pinTyped);
          sfxOk();
          const modal = document.getElementById("parentPinModal");
          if (modal) modal.style.display = "none";
          window.parentPinModalState = parentPinModalState = { purpose: "gate", step: "verify", entered: "", tempPin: "", onSuccess: null, onCancel: null };
          alert(lang === "vi" ? "✅ Đã đổi mã PIN phụ huynh thành công!" : "✅ Parent PIN changed successfully!");
        } else {
          sfxNo();
          s.entered = "";
          s.tempPin = "";
          s.step = "change_enter";
          renderParentPinModalUI(lang === "vi" ? "Mã PIN xác nhận không trùng khớp! Vui lòng thử lại" : "PIN confirmation mismatch! Please try again");
        }
      } else if (s.step === "verify") {
        const ok = await verifyParentPin(pinTyped);
        if (ok) {
          sfxOk();
          const modal = document.getElementById("parentPinModal");
          if (modal) modal.style.display = "none";
          const cb = s.onSuccess;
          window.parentPinModalState = parentPinModalState = { purpose: "gate", step: "verify", entered: "", tempPin: "", onSuccess: null, onCancel: null };
          if (typeof cb === "function") cb();
          else go("parent");
        } else {
          sfxNo();
          s.entered = "";
          renderParentPinModalUI(lang === "vi" ? "Mã PIN chưa đúng! Vui lòng thử lại" : "Incorrect PIN! Please try again");
        }
      }
    }
  }
};

let enteredPin = "";
function gate(){
  if (!hasParentPin()) {
    openParentPinModal({
      purpose: "setup",
      onSuccess: () => go("parent"),
      onCancel: () => go("home")
    });
  } else {
    openParentPinModal({
      purpose: "gate",
      onSuccess: () => go("parent"),
      onCancel: () => go("home")
    });
  }
}

function renderGatePin(errorMsg = ""){
  gate();
}

window.__pinPress = function(k){
  window.__parentPinModalPress(k);
};

function changeParentPin(){
  openParentPinModal({
    purpose: "change"
  });
}
window.changeParentPin = changeParentPin;

/* ========================================================
   TASK P6-02: AN TOÀN VIDEO YOUTUBE & BẢO VỆ LIÊN KẾT NGOÀI
   ======================================================== */

function openExternalLinkWithParentGate(url, title) {
  if (typeof openParentPinModal === "function") {
    openParentPinModal({
      purpose: "gate",
      title: lang === "vi" ? "Mở liên kết ngoài (YouTube)" : "External Link Security (YouTube)",
      sub: lang === "vi"
        ? "Cần bố mẹ xác nhận mã PIN trước khi mở video trên YouTube:"
        : "Parent PIN required before opening YouTube video:",
      onSuccess: () => {
        if (typeof window !== "undefined") {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }
    });
  } else {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }
}
window.openExternalLinkWithParentGate = openExternalLinkWithParentGate;


function updateKidName(newName){
  const clean = (newName || "").trim();
  if(clean){
    ls.set("kid_name", clean);
    try {
      const profiles = getKidProfiles();
      const active = getActiveProfile();
      const p = profiles.find(x => x.id === active.id);
      if(p){
        p.name = clean;
        localStorage.setItem("bhv_profiles", JSON.stringify(profiles));
      }
    } catch(e) {}
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
  const limitVal = parseInt(ls.get("daily_limit_minutes", "15"), 10);
  const limit = Number.isNaN(limitVal) ? 15 : limitVal;
  if(limit > 0 && mins >= limit){
    if(Date.now() > limitModalDismissedUntil){
      const modal = document.getElementById("timeLimitModal");
      if(modal && modal.style.display !== "flex"){
        modal.style.display = "flex";
        say("Bé học giỏi lắm! Hôm nay bé đã rất chăm chỉ, mình cùng nghỉ ngơi giữ gìn đôi mắt sáng nhé!", "Great job today! Time to rest your bright eyes!");
        catSet("happy");
      }
    }
  }
}

window.__unlockTimeLimit = function(){
  openParentPinModal({
    purpose: "unlock_time",
    onSuccess: () => {
      limitModalDismissedUntil = Date.now() + 15 * 60 * 1000;
      const modal = document.getElementById("timeLimitModal");
      if (modal) modal.style.display = "none";
      alert(lang === "vi" ? "✅ Đã gia hạn thêm 15 phút học!" : "✅ Extended 15 more minutes!");
    }
  });
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

/* ========================================================
   TASK P5-04 & P5-05: NHIỀU HỒ SƠ BÉ & CÀI ĐẶT TẬP TRUNG
   ======================================================== */

const KID_AVATARS_LIST = ["👧", "🧒", "👶", "🐱", "🐰", "🦊", "🐼", "🦄", "🌸", "⭐"];

function getKidProfiles() {
  let list = [];
  try {
    list = JSON.parse(ls.get("bhv_profiles", "[]"));
  } catch (e) {
    list = [];
  }
  if (!Array.isArray(list) || list.length === 0) {
    const defaultProfile = {
      id: "prof_default",
      name: ls.get("kid_name", "Bé Yêu"),
      avatar: ls.get("kid_avatar", "👧"),
      ageTier: ls.get("ageTier", "preschool"),
      createdAt: Date.now()
    };
    list = [defaultProfile];
    try {
      localStorage.setItem("bhv_profiles", JSON.stringify(list));
      if (!localStorage.getItem("bhv_active_profile_id", "blg_unlock_all", "blg_unlocked_stages")) {
        localStorage.setItem("bhv_active_profile_id", "prof_default");
      }
    } catch(e) {}
  }
  return list;
}
window.getKidProfiles = getKidProfiles;

function getActiveProfile() {
  const profiles = getKidProfiles();
  const activeId = ls.get("bhv_active_profile_id", "prof_default");
  let active = profiles.find(p => p.id === activeId);
  if (!active) {
    active = profiles[0];
    try { localStorage.setItem("bhv_active_profile_id", active.id); } catch(e) {}
  }
  return active;
}
window.getActiveProfile = getActiveProfile;

function saveActiveProfileSnapshot() {
  const active = getActiveProfile();
  if (!active) return;
  const data = {};
  const staticKeys = [
    "stars", "st", "lvl", "ageTier", "blg_stage", "streak",
    "kids_streak_count", "kids_streak_last_date", "badges",
    "bhv_act_stats", "bhv_offscreen_done"
  ];
  staticKeys.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) data[k] = v;
  });
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("study_sec_") || k.startsWith("c_") || k.startsWith("w_"))) {
        data[k] = localStorage.getItem(k);
      }
    }
    localStorage.setItem("bhv_pdata_" + active.id, JSON.stringify(data));
  } catch(e) {}
}
window.saveActiveProfileSnapshot = saveActiveProfileSnapshot;

function restoreProfileSnapshot(profileId) {
  const keysToRemove = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("study_sec_") || k.startsWith("c_") || k.startsWith("w_"))) {
        keysToRemove.push(k);
      }
    }
  } catch(e) {}

  [
    "stars", "st", "lvl", "blg_stage", "streak",
    "kids_streak_count", "kids_streak_last_date", "badges",
    "bhv_act_stats", "bhv_offscreen_done"
  ].forEach(k => keysToRemove.push(k));

  keysToRemove.forEach(k => {
    try { localStorage.removeItem(k); } catch(e) {}
  });

  const raw = localStorage.getItem("bhv_pdata_" + profileId);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      Object.entries(data).forEach(([k, v]) => {
        localStorage.setItem(k, v);
      });
    } catch (e) {}
  }
  reloadProfileGlobals();
}
window.restoreProfileSnapshot = restoreProfileSnapshot;

function reloadProfileGlobals() {
  stars = parseInt(ls.get("stars", "0"), 10) || 0;
  try {
    ST = JSON.parse(ls.get("st", "")) || {};
  } catch (e) {
    ST = {};
  }
  ST.n = ST.n || 0;
  ST.f = ST.f || 0;
  ST.w = ST.w || {};
  currentTier = ls.get("ageTier", "preschool");
  const sEl = document.getElementById("stars");
  if (sEl) sEl.innerHTML = (typeof im === "function" ? im("gstar") : "⭐") + " " + stars;
  const bEl = document.getElementById("badgeCount");
  if (bEl) {
    const bList = (ls.get("badges", "") || "").split(",").filter(Boolean);
    bEl.textContent = bList.length;
  }
}
window.reloadProfileGlobals = reloadProfileGlobals;

function switchKidProfile(profileId) {
  const current = getActiveProfile();
  if (current && current.id === profileId) return;

  saveActiveProfileSnapshot();
  localStorage.setItem("bhv_active_profile_id", profileId);
  restoreProfileSnapshot(profileId);

  const profiles = getKidProfiles();
  const next = profiles.find(p => p.id === profileId) || profiles[0];
  ls.set("kid_name", next.name);
  ls.set("kid_avatar", next.avatar);
  ls.set("ageTier", next.ageTier || "preschool");
  currentTier = next.ageTier || "preschool";

  head();
  if (cur === "parent") parent();
  else if (cur === "home") home();
}
window.switchKidProfile = switchKidProfile;

function createKidProfile(name, avatar, ageTier) {
  saveActiveProfileSnapshot();

  const profiles = getKidProfiles();
  const newId = "prof_" + Date.now();
  const cleanName = (name || ("Bé " + (profiles.length + 1))).trim();
  const newProfile = {
    id: newId,
    name: cleanName,
    avatar: avatar || "🧒",
    ageTier: ageTier || "preschool",
    createdAt: Date.now()
  };
  profiles.push(newProfile);
  localStorage.setItem("bhv_profiles", JSON.stringify(profiles));

  localStorage.setItem("bhv_active_profile_id", newId);
  restoreProfileSnapshot(newId);

  ls.set("kid_name", newProfile.name);
  ls.set("kid_avatar", newProfile.avatar);
  ls.set("ageTier", newProfile.ageTier);
  currentTier = newProfile.ageTier;

  head();
  if (cur === "parent") parent();
}
window.createKidProfile = createKidProfile;

function deleteKidProfile(profileId) {
  let profiles = getKidProfiles();
  if (profiles.length <= 1) {
    alert(T("Cần giữ ít nhất 1 hồ sơ bé!", "Must keep at least one profile!"));
    return;
  }
  const toDelete = profiles.find(p => p.id === profileId);
  const name = toDelete ? toDelete.name : "";
  if (!confirm(T("Xóa hồ sơ \"" + name + "\"?\nToàn bộ số sao và tiến độ của bé này sẽ bị xóa.", "Delete profile \"" + name + "\"?\nAll progress will be deleted."))) {
    return;
  }

  const activeId = localStorage.getItem("bhv_active_profile_id");
  if (activeId === profileId) {
    const other = profiles.find(p => p.id !== profileId);
    switchKidProfile(other.id);
    profiles = getKidProfiles();
  }

  profiles = profiles.filter(p => p.id !== profileId);
  localStorage.setItem("bhv_profiles", JSON.stringify(profiles));
  localStorage.removeItem("bhv_pdata_" + profileId);

  head();
  if (cur === "parent") parent();
}
window.deleteKidProfile = deleteKidProfile;

function toggleAddProfileForm(show) {
  const form = document.getElementById("addProfileForm");
  if (!form) return;
  const isCurrentlyHidden = form.style.display === "none";
  const shouldShow = typeof show === "boolean" ? show : isCurrentlyHidden;
  form.style.display = shouldShow ? "flex" : "none";
  if (shouldShow) {
    const inp = document.getElementById("newProfileName");
    if (inp) { inp.value = ""; inp.focus(); }
  }
}
window.toggleAddProfileForm = toggleAddProfileForm;

function selectNewProfileAvatar(el, av) {
  document.querySelectorAll(".profile-avatar-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  const hidden = document.getElementById("newProfileAvatar");
  if (hidden) hidden.value = av;
}
window.selectNewProfileAvatar = selectNewProfileAvatar;

function selectNewProfileTier(tier) {
  ["preschool", "grade1_2", "grade3_5"].forEach(t => {
    const btn = document.getElementById("tierBtn_" + t);
    if (btn) btn.classList.toggle("on", t === tier);
  });
  const hidden = document.getElementById("newProfileTier");
  if (hidden) hidden.value = tier;
}
window.selectNewProfileTier = selectNewProfileTier;

function submitCreateProfile() {
  const nameInp = document.getElementById("newProfileName");
  const avInp = document.getElementById("newProfileAvatar");
  const tierInp = document.getElementById("newProfileTier");
  const name = nameInp ? nameInp.value.trim() : "";
  if (!name) {
    alert(T("Vui lòng nhập tên cho bé nhé!", "Please enter kid's name!"));
    if (nameInp) nameInp.focus();
    return;
  }
  const avatar = avInp ? avInp.value : "👧";
  const tier = tierInp ? tierInp.value : "preschool";
  createKidProfile(name, avatar, tier);
}
window.submitCreateProfile = submitCreateProfile;

function setMotionPref(val) {
  ls.set("rm", val);
  if (val === "1") {
    ls.set("kids_confetti_disabled", "1");
  } else if (val === "0") {
    ls.set("kids_confetti_disabled", "0");
  }
  applyRM();
}
window.setMotionPref = setMotionPref;


/* ========================================================
   TASK P5-03 & P5-07: BÁO CÁO TUẦN & HOẠT ĐỘNG NGOÀI MÀN HÌNH
   ======================================================== */

// 1. Thống kê học tập 7 ngày gần nhất (Past 7 Days Study Stats)
function getWeeklyStudyStats() {
  const days = [];
  const now = new Date();
  let totalSec = 0;
  let activeDays = 0;

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const dayName = d.toLocaleDateString("vi-VN", { weekday: "short" });
    const dayNameEn = d.toLocaleDateString("en-US", { weekday: "short" });
    const sec = parseInt(ls.get("study_sec_" + dateStr, "0"), 10) || 0;
    const mins = Math.round(sec / 60);
    totalSec += sec;
    if (mins > 0) activeDays++;

    days.push({
      dateStr,
      dayName: dayName.toUpperCase(),
      dayNameEn: dayNameEn.toUpperCase(),
      mins,
      sec,
      isToday: i === 0,
      metTarget: mins >= 5 && mins <= 15
    });
  }

  const totalMins = Math.round(totalSec / 60);
  const avgMins = activeDays > 0 ? Math.round(totalMins / activeDays) : 0;

  return {
    days,
    totalMins,
    activeDays,
    avgMins
  };
}
window.getWeeklyStudyStats = getWeeklyStudyStats;

// 2. Phân loại kỹ năng: Đã vững / Đang học / Cần ôn (Skills Mastery Breakdown)
function getSkillsMasteryBreakdown() {
  const skillsData = (typeof ST !== "undefined" && ST.skills) ? ST.skills : {};
  const wrongData = (typeof ST !== "undefined" && ST.w) ? ST.w : {};

  const mastered = [];
  const learning = [];
  const needsReview = [];

  const defaultSkills = [
    { id: "num_1_5", nameVi: "Nhận biết số 1–5", nameEn: "Numbers 1–5", subject: "math" },
    { id: "num_count", nameVi: "Đếm số lượng đồ vật 1–10", nameEn: "Counting 1–10", subject: "math" },
    { id: "vowels_basic", nameVi: "Mặt chữ cái đơn (O, Ô, Ơ, A, Ă, Â)", nameEn: "Basic Vowels", subject: "vietnamese" },
    { id: "consonants_basic", nameVi: "Phụ âm cơ bản (B, C, D, Đ)", nameEn: "Basic Consonants", subject: "vietnamese" },
    { id: "colors_animals_en", nameVi: "Từ vựng màu sắc & động vật Tiếng Anh", nameEn: "Colors & Animals (EN)", subject: "english" },
    { id: "reading_listen", nameVi: "Đọc hiểu câu chuyện có audio", nameEn: "Story Comprehension", subject: "reading" },
    { id: "fine_motor_trace", nameVi: "Vận động tinh & Tô nét cơ bản", nameEn: "Fine Motor & Tracing", subject: "skills" }
  ];

  defaultSkills.forEach(sk => {
    let practices = 0;
    let wrongs = 0;

    Object.entries(skillsData).forEach(([k, cnt]) => {
      if (k.toLowerCase().includes(sk.nameVi.toLowerCase()) || sk.nameVi.toLowerCase().includes(k.toLowerCase())) {
        practices += cnt;
      }
    });

    Object.entries(wrongData).forEach(([k, cnt]) => {
      if (k.toLowerCase().includes(sk.nameVi.toLowerCase()) || sk.nameVi.toLowerCase().includes(k.toLowerCase())) {
        wrongs += cnt;
      }
    });

    if (sk.subject === "math") practices += Math.floor((ST.mathCount || 0) / 3);
    if (sk.subject === "vietnamese") practices += Math.floor((ST.letCount || 0) / 4);
    if (sk.subject === "reading") practices += (ST.storyCount || 0);
    if (sk.subject === "skills") practices += (ST.traceCount || 0);
    if (sk.subject === "english") practices += Math.floor((ST.engCount || 0) / 2);

    if (wrongs >= 2 && practices <= wrongs) {
      needsReview.push({ ...sk, practices, wrongs });
    } else if (practices >= 3 && wrongs <= 1) {
      mastered.push({ ...sk, practices, wrongs });
    } else if (practices > 0) {
      learning.push({ ...sk, practices, wrongs });
    } else {
      learning.push({ ...sk, practices: 0, wrongs: 0, isNew: true });
    }
  });

  return { mastered, learning, needsReview };
}
window.getSkillsMasteryBreakdown = getSkillsMasteryBreakdown;

// 3. Danh mục hoạt động ngoài màn hình (Off-screen Activities)
const OFFSCREEN_ACTIVITIES = [
  {
    id: "off_fine_motor_clay",
    category: "motor",
    icon: "🎨",
    nameVi: "Nặn đất sét tạo hình chữ cái & chữ số",
    nameEn: "Clay Sculpting Letters & Numbers",
    skillVi: "Vận động tinh & Cảm giác ngón tay",
    skillEn: "Fine Motor & Tactile Skills",
    descVi: "Cùng bé vo tròn, lăn dài đất nặn để uốn thành hình chữ O, chữ A hoặc số 1, số 2. Giúp cơ bàn tay bé dẻo dai trước khi cầm bút.",
    descEn: "Roll and shape playdough into letters like O, A or numbers 1, 2 to build finger dexterity."
  },
  {
    id: "off_sand_tray_trace",
    category: "motor",
    icon: "🏖️",
    nameVi: "Vẽ chữ và số trên khay cát / bột mì",
    nameEn: "Finger Tracing on Sand / Flour Tray",
    skillVi: "Nhận diện mặt chữ & Định hướng nét",
    skillEn: "Letter Recognition & Stroke Orientation",
    descVi: "Rải một lớp bột mì hoặc cát sạch lên khay, hướng dẫn bé dùng ngón trỏ vạch nét thẳng, nét cong. Khi sai chỉ cần lắc nhẹ khay là xóa sạch!",
    descEn: "Spread flour on a tray and guide child's index finger to trace strokes and curves."
  },
  {
    id: "off_real_counting_spoons",
    category: "math",
    icon: "🥄",
    nameVi: "Đếm thìa đũa & Chia bánh kẹo thật",
    nameEn: "Counting Utensils & Fair Sharing",
    skillVi: "Đếm đồ vật thật & Tư duy số lượng",
    skillEn: "Real-life Counting & Quantity Sense",
    descVi: "Khi dọn cơm, nhờ bé đếm đủ số thìa cho cả nhà (ví dụ 4 người = 4 thìa). Khi ăn hoa quả, chia đều cho mỗi người 2 quả táo.",
    descEn: "Ask child to count spoons for dinner or share fruit evenly among family members."
  },
  {
    id: "off_open_ended_story",
    category: "expression",
    icon: "💬",
    nameVi: "Hỏi mở và kể lại truyện cùng bé",
    nameEn: "Open-ended Storytelling & Reflection",
    skillVi: "Giao tiếp, Diễn đạt & Tư duy phản biện",
    skillEn: "Verbal Expression & Critical Thinking",
    descVi: "Sau khi nghe truyện (Rùa & Thỏ, Chú Thỏ Trắng), hỏi bé: 'Nếu là bạn Thỏ, bé sẽ làm gì?', 'Bé thích bạn nào nhất và vì sao?'. Khích lệ bé diễn đạt trọn câu.",
    descEn: "Ask open questions: 'What would you do if you were the Bunny?' to foster speech and empathy."
  },
  {
    id: "off_clean_up_habit",
    category: "habit",
    icon: "🧺",
    nameVi: "Nề nếp tự cất đồ chơi & xếp dép",
    nameEn: "Tidying Up & Independence Habit",
    skillVi: "Tự lập, Nề nếp & Kỹ năng sống",
    skillEn: "Self-reliance & Daily Routines",
    descVi: "Cùng bé thi đua 'Ai cất đồ chơi vào giỏ nhanh hơn trong 1 phút'. Tập cho bé thói quen xếp dép ngay ngắn khi về nhà.",
    descEn: "Turn tidying toys into a 1-minute fun challenge and practice placing shoes neatly."
  },
  {
    id: "off_letter_hunt_grocery",
    category: "reading",
    icon: "🔍",
    nameVi: "Thợ săn chữ cái trên bao bì & biển hiệu",
    nameEn: "Letter Hunt on Packaging & Signs",
    skillVi: "Nhận biết chữ cái trong đời sống",
    skillEn: "Environmental Print Recognition",
    descVi: "Khi đi dạo hoặc đi chợ, đố bé tìm thấy chữ 'A' trên biển hiệu hoặc hộp sữa. Giúp bé thấy chữ cái hiện diện ở khắp mọi nơi quen thuộc.",
    descEn: "Spot letters like 'A' or 'O' on street signs or milk cartons during daily walks."
  }
];
window.OFFSCREEN_ACTIVITIES = OFFSCREEN_ACTIVITIES;

function getCompletedOffscreenIds() {
  try {
    const raw = localStorage.getItem("bhv_offscreen_done");
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}
window.getCompletedOffscreenIds = getCompletedOffscreenIds;

function toggleOffscreenCompleted(id) {
  try {
    let list = getCompletedOffscreenIds();
    if (list.includes(id)) {
      list = list.filter(x => x !== id);
    } else {
      list.push(id);
    }
    localStorage.setItem("bhv_offscreen_done", JSON.stringify(list));
    if (cur === "parent") parent();
  } catch(e) {}
}
window.toggleOffscreenCompleted = toggleOffscreenCompleted;

function parent(){
  const kidName = ls.get("kid_name", "Bé Yêu");
  const kidAvatar = ls.get("kid_avatar", "🐣");
  const curLv = getCurrentLevel();
  const streakInfo = getDailyStreak();
  const todayMins = getTodayStudyMinutes();
  const limitVal = parseInt(ls.get("daily_limit_minutes", "15"), 10);
  const dailyLimit = Number.isNaN(limitVal) ? 15 : limitVal;
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
      <!-- 1. HỒ SƠ CÁC BÉ (MULTI-PROFILE - P5-04) -->
      <div class="dash-card">
        <div class="dash-card-title">👥 ${T("Hồ sơ các bé trên thiết bị", "Kid Profiles on Device")}</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:8px">
          ${T("Mỗi bé có thể có một hồ sơ riêng với số sao, chuỗi ngày học và nhóm tuổi độc lập:","Each child can have their own profile with separate stars, streak, and age group:")}
        </div>
        
        <!-- DANH SÁCH THẺ HỒ SƠ -->
        <div class="profile-grid">
          ${(() => {
            const profiles = getKidProfiles();
            const activeId = (getActiveProfile() || {}).id;
            return profiles.map(prof => {
              const isActive = prof.id === activeId;
              let profStars = stars;
              let profStreak = streakInfo.count;
              if (!isActive) {
                try {
                  const sData = JSON.parse(localStorage.getItem("bhv_pdata_" + prof.id) || "{}");
                  profStars = parseInt(sData.stars || "0", 10) || 0;
                  profStreak = parseInt(sData.kids_streak_count || sData.streak || "0", 10) || 0;
                } catch(e) {}
              }
              const tierMeta = (typeof AGE_TIERS !== "undefined" && AGE_TIERS[prof.ageTier]) ? AGE_TIERS[prof.ageTier] : { nameVi: "Mầm non", nameEn: "Preschool", badge: "🌱" };
              return `
                <div class="profile-card ${isActive ? "active" : ""}">
                  <div class="profile-card-head">
                    <div class="profile-card-avatar" ${isActive ? 'id="kidAvatarEl" onclick="cycleKidAvatar()" title="' + T("Bấm để đổi avatar", "Tap to change avatar") + '" style="cursor:pointer"' : ''}>
                      ${prof.avatar || "👧"}
                    </div>
                    <div class="profile-card-info">
                      ${isActive ? `
                        <input class="profile-name-input" type="text" value="${esc(prof.name)}" onchange="updateKidName(this.value)" placeholder="Tên bé...">
                      ` : `
                        <div class="profile-card-name">${esc(prof.name)}</div>
                      `}
                      <div class="profile-card-tier">${tierMeta.badge} ${T(tierMeta.nameVi, tierMeta.nameEn)}</div>
                    </div>
                    <div>
                      <span class="profile-status-badge ${isActive ? "active" : "idle"}">
                        ${isActive ? T("🌟 Đang chọn", "🌟 Active") : T("Nghỉ", "Idle")}
                      </span>
                    </div>
                  </div>

                  <div class="profile-card-meta">
                    <span>⭐ ${profStars} ${T("sao", "stars")}</span>
                    <span>🔥 ${profStreak} ${T("ngày", "days")}</span>
                    ${(!isActive && profiles.length > 1) ? `
                      <button class="profile-del-btn" onclick="deleteKidProfile('${prof.id}')" title="${T("Xóa hồ sơ bé", "Delete profile")}">🗑 ${T("Xóa", "Del")}</button>
                    ` : ''}
                  </div>

                  ${!isActive ? `
                    <button class="profile-switch-btn" onclick="switchKidProfile('${prof.id}')">
                      👉 ${T("Chuyển sang bé " + prof.name, "Switch to " + prof.name)}
                    </button>
                  ` : `
                    <div style="font-size:12px;color:#15803d;font-weight:700;display:flex;align-items:center;gap:4px">
                      <span>✅ Bé đang học trên ứng dụng lúc này</span>
                    </div>
                  `}
                </div>
              `;
            }).join("");
          })()}
        </div>

        <!-- FORM THÊM BÉ MỚI (ẨN / HIỆN) -->
        <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <button class="pill" onclick="toggleAddProfileForm()" style="background:#eff6ff;color:#1e40af;border-color:#93c5fd;font-weight:800">
            ➕ ${T("Thêm hồ sơ bé mới (Bé thứ 2, thứ 3...)", "Add another kid profile")}
          </button>
        </div>

        <div id="addProfileForm" class="profile-add-form" style="display:none">
          <div style="font-weight:800;color:#0369a1;font-size:14px">
            🌟 ${T("Tạo hồ sơ cho bé mới:", "Create New Child Profile:")}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <input id="newProfileName" class="profile-name-input" type="text" placeholder="${T("Nhập tên bé (Ví dụ: Bé Na, Bé Bơ...)", "Enter kid's name...")}" style="flex:1;min-width:180px">
          </div>
          <div>
            <div style="font-size:12.5px;font-weight:700;color:#64748b;margin-bottom:4px">${T("Chọn hình đại diện:", "Choose avatar:")}</div>
            <div class="profile-avatar-select">
              ${["👧", "🧒", "👶", "🐱", "🐰", "🦊", "🐼", "🦄", "🌸", "⭐"].map((av, idx) => `
                <div class="profile-avatar-opt ${idx === 0 ? "selected" : ""}" onclick="selectNewProfileAvatar(this, '${av}')">${av}</div>
              `).join("")}
            </div>
            <input type="hidden" id="newProfileAvatar" value="👧">
          </div>
          <div>
            <div style="font-size:12.5px;font-weight:700;color:#64748b;margin-bottom:4px">${T("Nhóm tuổi học tập:", "Age Group:")}</div>
            <div class="chips">
              <button type="button" class="pill on" id="tierBtn_preschool" onclick="selectNewProfileTier('preschool')">🌱 Mầm non (4–6 tuổi)</button>
              <button type="button" class="pill" id="tierBtn_grade1_2" onclick="selectNewProfileTier('grade1_2')">🎒 Lớp 1–2</button>
              <button type="button" class="pill" id="tierBtn_grade3_5" onclick="selectNewProfileTier('grade3_5')">🚀 Lớp 3–5</button>
            </div>
            <input type="hidden" id="newProfileTier" value="preschool">
          </div>
          <div style="display:flex;gap:8px;margin-top:6px">
            <button class="pill on" onclick="submitCreateProfile()" style="background:#0284c7;color:#fff;border-color:#0284c7;font-weight:800">
              ✔ ${T("Lưu hồ sơ và chuyển sang bé mới", "Save & Switch to new child")}
            </button>
            <button class="pill" onclick="toggleAddProfileForm(false)">
              ✕ ${T("Hủy", "Cancel")}
            </button>
          </div>
        </div>

        <!-- CÀI ĐẶT TẦNG TUỔI BÉ ĐANG CHỌN -->
        <div style="margin-top:14px;border-top:1.5px dashed #cbd5e1;padding-top:12px">
          <div style="font-size:13px;color:#64748b;font-weight:700;margin-bottom:6px">
            ${T("Nhóm tuổi học tập của bé đang chọn:","Learning Age Group for Active Kid:")}
          </div>
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

        <!-- CỜ BẬT/TẮT BỘ CHỌN 3 TẦNG TUỔI CHO BÉ (MẶC ĐỊNH TẮT) -->
        <div style="margin-top:14px;padding-top:12px;border-top:1px dashed #cbd5e1">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div style="flex:1;min-width:200px">
              <div style="font-size:13px;color:#1e293b;font-weight:800">
                ${T("Hiện bộ chọn 3 tầng tuổi trên trang chủ cho bé","Show 3 age tier tabs on Home for kid")}
              </div>
              <div style="font-size:12px;color:#64748b;font-weight:600">
                ${T("Mặc định TẮT: Bé 4–6 tuổi học lộ trình làm quen trước lớp 1 gọn gàng, không bị phân tâm","Default OFF: 4–6 age prep curriculum mode")}
              </div>
            </div>
            <div>
              <button class="pill ${isAgeTierSelectorEnabled() ? "on" : ""}" onclick="setShowAgeTiers(!isAgeTierSelectorEnabled());parent()">
                ${isAgeTierSelectorEnabled() ? T("ĐANG BẬT ✔", "ENABLED ✔") : T("ĐANG TẮT ✖", "DISABLED ✖")}
              </button>
            </div>
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

      <!-- 2B. BÁO CÁO TUẦN (WEEKLY LEARNING REPORT - P5-03) -->
      ${(() => {
        const weekly = getWeeklyStudyStats();
        const maxBarMins = Math.max(15, ...weekly.days.map(d => d.mins));
        const mastery = getSkillsMasteryBreakdown();
        return `
          <div class="dash-card">
            <div class="dash-card-title">
              📅 ${T("Báo cáo tuần & Tiến độ 7 ngày của bé","Weekly Report & 7-Day Progress")}
            </div>
            <div style="font-size:13.5px;color:#64748b;margin-bottom:12px">
              ${T("Thời lượng học của bé trong 7 ngày gần nhất (Khuyến nghị 5–10 phút/ngày):","Child's study time over the last 7 days (Recommended 5-10 mins/day):")}
            </div>
            
            <!-- BIỂU ĐỒ CỘT 7 NGÀY -->
            <div class="weekly-bar-chart">
              ${weekly.days.map(d => {
                const barHeightPct = Math.min(100, Math.round((d.mins / maxBarMins) * 100));
                return `
                  <div class="weekly-bar-col">
                    <span class="weekly-bar-val">${d.mins ? d.mins + "'" : "0"}</span>
                    <div class="weekly-bar-fill ${d.isToday ? "today" : d.metTarget ? "target" : ""}" style="height:${Math.max(4, barHeightPct)}%" title="${d.dateStr}: ${d.mins} phút"></div>
                    <span class="weekly-bar-lbl" style="${d.isToday ? "color:#0284c7;font-weight:900" : ""}">${lang === "vi" ? d.dayName : d.dayNameEn}</span>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- TỔNG KẾT TUẦN -->
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0">
              <div style="flex:1;min-width:120px;background:#f0fdf4;border:2px solid #bbf7d0;border-radius:14px;padding:8px 12px;text-align:center">
                <div style="font-size:20px;font-weight:900;color:#16a34a">⏱ ${weekly.totalMins} ${T("phút","mins")}</div>
                <div style="font-size:12px;font-weight:700;color:#15803d">${T("Tổng thời gian 7 ngày","7-day total time")}</div>
              </div>
              <div style="flex:1;min-width:120px;background:#eff6ff;border:2px solid #bfdbfe;border-radius:14px;padding:8px 12px;text-align:center">
                <div style="font-size:20px;font-weight:900;color:#2563eb">🌱 ${weekly.activeDays}/7 ${T("ngày","days")}</div>
                <div style="font-size:12px;font-weight:700;color:#1d4ed8">${T("Số ngày có học tập","Active study days")}</div>
              </div>
              <div style="flex:1;min-width:120px;background:#fffbeb;border:2px solid #fde68a;border-radius:14px;padding:8px 12px;text-align:center">
                <div style="font-size:20px;font-weight:900;color:#d97706">🎯 ~${weekly.avgMins} ${T("phút/ngày","mins/day")}</div>
                <div style="font-size:12px;font-weight:700;color:#b45309">${T("Trung bình mỗi ngày","Daily average")}</div>
              </div>
            </div>

            <!-- PHÂN TÍCH THÀNH THẠO KỸ NĂNG (MASTERY BREAKDOWN) -->
            <div style="margin-top:14px;border-top:1.5px dashed #cbd5e1;padding-top:12px">
              <div style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px">
                🎯 ${T("Mức độ thành thạo các kỹ năng cốt lõi:","Core Skills Mastery Overview:")}
              </div>
              <div class="mastery-box">
                <div class="mastery-row">
                  <span style="font-size:13px;font-weight:800;color:#15803d;min-width:110px">🌟 ${T("Đã vững vàng:","Mastered:")}</span>
                  ${mastery.mastered.length > 0 ? mastery.mastered.map(m => `
                    <span class="mastery-badge mastered">✓ ${lang === "vi" ? m.nameVi : m.nameEn}</span>
                  `).join("") : `<span style="font-size:12.5px;color:#64748b"><i>${T("Bé đang tích lũy thêm bài tập","Working towards mastery")}</i></span>`}
                </div>
                <div class="mastery-row">
                  <span style="font-size:13px;font-weight:800;color:#0369a1;min-width:110px">📖 ${T("Đang rèn luyện:","Learning:")}</span>
                  ${mastery.learning.map(m => `
                    <span class="mastery-badge learning">● ${lang === "vi" ? m.nameVi : m.nameEn}</span>
                  `).join("")}
                </div>
                ${mastery.needsReview.length > 0 ? `
                  <div class="mastery-row">
                    <span style="font-size:13px;font-weight:800;color:#b91c1c;min-width:110px">🔄 ${T("Cần ôn lại:","Needs review:")}</span>
                    ${mastery.needsReview.map(m => `
                      <span class="mastery-badge review">⚠ ${lang === "vi" ? m.nameVi : m.nameEn}</span>
                    `).join("")}
                  </div>
                ` : ""}
              </div>
            </div>
          </div>
        `;
      })()}

      <!-- 3B. LỘ TRÌNH 6 CHẶNG & MỞ KHÓA THỦ CÔNG (P5-06) -->
      <div class="dash-card">
        <div class="dash-card-title">🗺️ ${T("Lộ trình 6 Chặng & Mở khóa học tập", "6-Stage Curriculum & Manual Unlock")}</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:12px;line-height:1.45">
          ${T("Bố mẹ có thể đặt chặng học cho bé hôm nay, hoặc mở khóa tự do toàn bộ các chặng để bé làm quen trước theo khả năng:","Parents can pick the child's active stage or unlock all stages to explore ahead:")}
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;background:#f0f9ff;border:2px solid #bae6fd;border-radius:16px;padding:12px 14px;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:14px;font-weight:800;color:#0369a1">
              🔓 ${T("Mở khóa tự do tất cả các chặng:", "Freely Unlock All Stages:")}
            </div>
            <div style="font-size:12px;color:#0284c7;font-weight:600">
              ${T("Cho phép bé tự do chạm vào bất kỳ chặng nào mà không bị giới hạn tuần tự", "Allow child to tap any stage without sequential lock")}
            </div>
          </div>
          <div>
            <button class="pill ${ls.get("blg_unlock_all", "0") === "1" ? "on" : ""}" onclick="toggleUnlockAllStages();parent()">
              ${ls.get("blg_unlock_all", "0") === "1" ? T("ĐANG MỞ TẤT CẢ ✔", "ALL UNLOCKED ✔") : T("KHÓA THEO TIẾN ĐỘ 🔒", "SEQUENTIAL 🔒")}
            </button>
          </div>
        </div>

        <!-- DANH SÁCH 6 CHẶNG -->
        <div class="stage-manage-grid">
          ${STAGE_META.map(sm => {
            const isCur = sm.stage === getKidCurrentStage();
            const isUnl = isStageUnlocked(sm.stage);
            const actsCount = (typeof getActivitiesByStage === "function" ? getActivitiesByStage(sm.stage) : []).length;
            return `
              <div class="stage-manage-card ${isCur ? "current" : isUnl ? "unlocked" : "locked"}">
                <div class="stage-manage-head">
                  <div class="stage-manage-icon">${isUnl ? sm.icon : "🔒"}</div>
                  <div style="flex:1;min-width:0">
                    <div class="stage-manage-title">${T(sm.nameVi, sm.nameEn)}</div>
                    <div class="stage-manage-sub">${T(sm.titleVi, sm.titleEn)} (${actsCount} ${T("bài", "lessons")})</div>
                  </div>
                  <div>
                    <span class="stage-status-badge ${isCur ? "current" : isUnl ? "unlocked" : "locked"}">
                      ${isCur ? T("🌟 Đang học", "🌟 Active") : isUnl ? T("Đã mở", "Open") : T("Đang khóa", "Locked")}
                    </span>
                  </div>
                </div>

                <div class="stage-manage-actions">
                  ${!isCur ? `
                    <button class="pill" onclick="setStageByParent(${sm.stage});parent()" style="font-size:12px;font-weight:800;background:#eff6ff;color:#1e40af;border-color:#93c5fd">
                      🎯 ${T("Đặt làm chặng học hôm nay", "Set as today's stage")}
                    </button>
                  ` : `
                    <span style="font-size:12.5px;color:#16a34a;font-weight:800">✅ Bé đang học chặng này</span>
                  `}
                  ${(!isCur && ls.get("blg_unlock_all", "0") !== "1") ? (
                    isUnl && sm.stage > 1 ? `
                      <button class="pill" onclick="lockStage(${sm.stage});parent()" style="font-size:12px;background:#fee2e2;color:#991b1b;border-color:#fca5a5">
                        🔒 ${T("Khóa lại", "Lock")}
                      </button>
                    ` : !isUnl ? `
                      <button class="pill" onclick="unlockStage(${sm.stage});parent()" style="font-size:12px;background:#f0fdf4;color:#166534;border-color:#86efac">
                        🔓 ${T("Mở khóa", "Unlock")}
                      </button>
                    ` : ''
                  ) : ''}
                </div>
              </div>
            `;
          }).join("")}
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
            🌱 ${T("Số ngày bé đã học:","Days of learning:")} <b>${streakInfo.count} ${T("ngày","days")}</b>
          </div>
        </div>
      </div>

      <!-- CHI TIẾT CHUỖI NGÀY HỌC LIÊN TIẾP (STREAK DETAILS) -->
      <div class="dash-card">
        <div class="dash-card-title">🌱 ${T("Chi tiết chuỗi ngày học của bé (Streak)","Study Streak & Days Details")}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:8px">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-size:44px;line-height:1">🌱</div>
            <div>
              <div style="font-size:24px;font-weight:900;color:#16a34a">
                ${streakInfo.count} ${T("ngày bé đã học","learning days completed")}
              </div>
              <div style="font-size:13px;color:#64748b;font-weight:700">
                ${streakInfo.lastDate ? T("Ngày học gần nhất: " + streakInfo.lastDate, "Last active: " + streakInfo.lastDate) : T("Hôm nay là ngày học đầu tiên!", "First day today!")}
              </div>
            </div>
          </div>
          <div>
            <button class="pill" onclick="showBadges()" style="font-size:14px;font-weight:800">
              🎖️ ${T("Xem bộ sưu tập huy hiệu","View Badges Collection")}
            </button>
          </div>
        </div>
        <div style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border:1.5px solid #dcfce7;border-radius:12px;font-size:13px;color:#166534;line-height:1.45">
          💡 <b>${T("Khích lệ bé nhẹ nhàng:","Gentle encouragement:")}</b> ${T("Ứng dụng ghi nhận mỗi ngày bé nỗ lực học tập và không bao giờ trừ điểm hay reset chuỗi khi bé nghỉ ngơi. Mỗi ngày bé học 5–10 phút là một niềm vui!","Every day of learning is recorded and never reset when taking breaks. 5–10 minutes a day brings pure joy!")}
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

      <!-- 4C. MẸO ĐỒNG HÀNH CÙNG BÉ DÀNH CHO BỐ MẸ (PARENT GUIDANCE) -->
      <div class="dash-card">
        <div class="dash-card-title">💡 ${T("Mẹo đồng hành cùng bé ở nhà","Parent Guidance & Practical Tips")}</div>
        <div style="font-size:13.5px;color:#475569;margin-bottom:12px;line-height:1.45">
          ${T("Bé 4–6 tuổi làm quen trước lớp 1 học tốt nhất khi được kết hợp giữa ứng dụng và tương tác ngoài đời thực với bố mẹ:","4-6 year-olds prep best when combining digital practice with real-life interactions:")}
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">
          <div style="background:#fef3c7;border:2px solid #fde68a;border-radius:16px;padding:12px;color:#92400e">
            <div style="font-weight:800;font-size:14px;margin-bottom:4px">🔤 ${T("Chữ cái & Nhận diện âm vần","Letters & Phonics")}</div>
            <div style="font-size:13px;line-height:1.45">${T("Cùng bé tìm chữ cái trên bảng hiệu, bao bì bánh kẹo, hộp sữa; liên tưởng hình dáng chữ cái ngộ nghĩnh (ví dụ chữ O tròn như quả trứng, chữ A đội nón là Â).","Spot letters on signs and packaging; link shapes with familiar objects.")}</div>
          </div>
          <div style="background:#eff6ff;border:2px solid #bfdbfe;border-radius:16px;padding:12px;color:#1e40af">
            <div style="font-weight:800;font-size:14px;margin-bottom:4px">🔢 ${T("Số lượng & Đếm số đời thực","Real-life Counting")}</div>
            <div style="font-size:13px;line-height:1.45">${T("Nhờ bé đếm số thìa đũa khi dọn cơm, đếm số bậc cầu thang khi đi dạo, so sánh đĩa nào nhiều hơn, đĩa nào ít hơn.","Count spoons at dinner, stairs when walking, compare more vs fewer.")}</div>
          </div>
          <div style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:16px;padding:12px;color:#166534">
            <div style="font-weight:800;font-size:14px;margin-bottom:4px">🌱 ${T("Khen ngợi nỗ lực & Khích lệ","Praise Effort")}</div>
            <div style="font-size:13px;line-height:1.45">${T("Khen 'Bé đã rất kiên trì suy nghĩ và làm thử!' thay vì chỉ khen 'Bé thông minh'. Khi bé chọn chưa đúng, hướng dẫn bé nghe lại câu hỏi với nút 🔊.","Praise persistence rather than perfection. Use 🔊 to replay questions.")}</div>
          </div>
          <div style="background:#fdf2f8;border:2px solid #fbcfe8;border-radius:16px;padding:12px;color:#9d174d">
            <div style="font-weight:800;font-size:14px;margin-bottom:4px">⏱️ ${T("Thời lượng học vàng","Optimal Session")}</div>
            <div style="font-size:13px;line-height:1.45">${T("Mỗi ngày bé chỉ nên học 5–10 phút (1–2 hoạt động). Học đều đặn mỗi ngày tốt hơn nhiều so với học dồn một lần trong tuần.","5-10 minutes daily consistency is far more effective than long sessions.")}</div>
          </div>
        </div>

        <!-- MẸO HƯỚNG DẪN TỪNG BÀI HỌC CỦA CÔ GIÁO -->
        <div style="margin-top:14px;border-top:1.5px dashed #cbd5e1;padding-top:12px">
          <div style="font-size:13.5px;font-weight:800;color:#1e293b;margin-bottom:8px">
            👩‍🏫 ${T("Mẹo sư phạm từ bài học (Cô Lan Anh):","Pedagogical Tips from Lessons:")}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${(typeof ACTIVITIES !== "undefined" ? ACTIVITIES.filter(a => a.parentTip) : []).map(act => `
              <div style="background:#fffbeb;border:1.5px solid #fef3c7;border-radius:12px;padding:10px 14px;display:flex;flex-direction:column;gap:4px">
                <div style="font-weight:800;color:#b45309;font-size:13.5px;display:flex;align-items:center;justify-content:space-between">
                  <span>📌 ${esc(act.title)}</span>
                  <span style="font-size:12px;color:#d97706;font-weight:700">${act.learningGoal || ""}</span>
                </div>
                <div style="font-size:13px;color:#92400e;line-height:1.45">
                  💡 ${esc(act.parentTip)}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- 4D. HOẠT ĐỘNG NGOÀI MÀN HÌNH CÙNG BÉ (OFFSCREEN ACTIVITIES - P5-07) -->
      ${(() => {
        const doneList = getCompletedOffscreenIds();
        return `
          <div class="dash-card">
            <div class="dash-card-title">
              🎨 ${T("Hoạt động ngoài màn hình cùng bé (Học qua đời thực)","Off-screen Parent-Child Activities")}
            </div>
            <div style="font-size:13.5px;color:#475569;margin-bottom:8px;line-height:1.45">
              ${T("Các hoạt động bổ ích rèn luyện vận động tinh, đếm đồ vật thật, thói quen nề nếp và giao tiếp. Bố mẹ chạm nút đánh dấu khi đã hoàn thành cùng bé nhé:","Interactive real-life activities for fine motor, real counting, habits and speaking. Tap to mark as completed:")}
            </div>
            
            <div class="offscreen-grid">
              ${OFFSCREEN_ACTIVITIES.map(act => {
                const isDone = doneList.includes(act.id);
                return `
                  <div class="offscreen-card ${isDone ? "done" : ""}">
                    <div class="offscreen-head">
                      <div class="offscreen-icon">${act.icon}</div>
                      <div class="offscreen-title">${lang === "vi" ? act.nameVi : act.nameEn}</div>
                    </div>
                    <div>
                      <span class="offscreen-skill">🎯 ${lang === "vi" ? act.skillVi : act.skillEn}</span>
                    </div>
                    <div class="offscreen-desc">${lang === "vi" ? act.descVi : act.descEn}</div>
                    <button class="offscreen-btn ${isDone ? "active" : "idle"}" onclick="toggleOffscreenCompleted('${act.id}')">
                      ${isDone ? T("✅ Đã hoàn thành cùng bé", "✅ Completed with child") : T("⚪ Đánh dấu đã hoàn thành", "⚪ Mark as completed")}
                    </button>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      })()}

      <!-- 5. KỸ NĂNG CẦN LUYỆN THÊM -->
      ${topErrors.length ? `
        <div class="dash-card">
          <div class="dash-card-title">🔄 ${T("Các điểm bé thường nhầm lẫn","Needs Extra Practice")}</div>
          <div class="chips">
            ${topErrors.map(([k, v]) => `<span class="pill" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b">⚠ ${k} ×${v}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      <!-- 6. CÀI ĐẶT TẬP TRUNG & GIỌNG ĐỌC (P5-05) -->
      <div class="dash-card">
        <div class="dash-card-title">⚙️ ${T("Cài đặt tập trung hệ thống","Centralized System Settings")}</div>
        <div style="margin-bottom:8px">${vh}</div>

        <!-- 1. GIỚI HẠN THỜI GIAN HẰNG NGÀY -->
        <div class="settings-group">
          <div class="settings-group-title">⏰ ${T("Giới hạn thời gian màn hình mỗi ngày:","Daily Screen Time Limit:")}</div>
          <div class="settings-group-desc">${T("Tự động nhắc bé nghỉ ngơi giữ mắt sáng khi hết giờ:","Automatically prompts child to rest eyes when limit is reached:")}</div>
          <div class="chips" style="margin-top:4px">
            ${[0, 15, 30, 45, 60].map(mVal => `
              <button class="pill ${dailyLimit === mVal ? "on" : ""}" onclick="setDailyLimit(${mVal})">
                ${mVal === 0 ? T("Không giới hạn","No limit") : mVal + " " + T("phút","mins")}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- 2. NGÔN NGỮ HIỂN THỊ & PHÁT ÂM -->
        <div class="settings-group">
          <div class="settings-group-title">🌐 ${T("Ngôn ngữ hiển thị & phát âm:","Language:")}</div>
          <div class="chips" style="margin-top:4px">
            ${[["vi","🇻🇳 Tiếng Việt"],["en","🇬🇧 English"],["both","Song ngữ VI + EN"]].map(([k,t])=>`<button class="pill${lang===k?" on":""}" onclick="setLang('${k}');parent()">${t}</button>`).join("")}
          </div>
        </div>

        <!-- 3. TỐC ĐỘ ĐỌC GIỌNG NÓI -->
        <div class="settings-group">
          <div class="settings-group-title">🐇 ${T("Tốc độ giọng đọc cho bé:","Speech Speed for Child:")}</div>
          <div class="chips" style="margin-top:4px">
            <button class="pill ${RATE<0.5 ? "on" : ""}" onclick="setSpeechRate(0.4)">🐢 ${T("Chậm (0.4×)","Slow (0.4×)")}</button>
            <button class="pill ${RATE>=0.5 && RATE<0.7 ? "on" : ""}" onclick="setSpeechRate(0.6)">🐰 ${T("Vừa (0.6×)","Medium (0.6×)")}</button>
            <button class="pill ${RATE>=0.7 ? "on" : ""}" onclick="setSpeechRate(0.85)">🐇 ${T("Chuẩn (0.85×)","Standard (0.85×)")}</button>
          </div>
        </div>

        <!-- 4. GIẢM CHUYỂN ĐỘNG & BẢO VỆ MẮT -->
        <div class="settings-group">
          <div class="settings-group-title">🎞 ${T("Giảm chuyển động (Bảo vệ mắt & Máy mượt):","Reduce Motion (Eye Comfort):")}</div>
          <div class="settings-group-desc">${T("Tắt bớt hoạt họa và pháo hoa rực rỡ để bé tập trung hơn:","Reduces heavy animations and particles for low-end devices and eye focus:")}</div>
          <div class="chips" style="margin-top:4px">
            <button class="pill ${rp==="auto" ? "on" : ""}" onclick="setMotionPref('auto');parent()">${T("THEO MÁY (Tự động)","AUTO (System)")}</button>
            <button class="pill ${rp==="1" ? "on" : ""}" onclick="setMotionPref('1');parent()">${T("BẬT (Giảm bớt chuyển động)","ON (Reduced)")}</button>
            <button class="pill ${rp==="0" ? "on" : ""}" onclick="setMotionPref('0');parent()">${T("TẮT (Hoạt họa đầy đủ)","OFF (Full motion)")}</button>
          </div>
        </div>

        <!-- 5. ÂM THANH & HIỆU ỨNG SFX -->
        <div class="settings-group">
          <div class="settings-group-title">🔊 ${T("Âm thanh & Hiệu ứng:","Audio & Sound Effects:")}</div>
          <div class="chips" style="margin-top:4px">
            <button class="pill${SOUND_ON()?" on":""}" onclick="toggleSoundMaster();parent()">🔊 ${T("Âm thanh & Giọng đọc: "+(SOUND_ON()?"BẬT":"TẮT"),"Master sound: "+(SOUND_ON()?"ON":"OFF"))}</button>
            <button class="pill${sf?" on":""}" onclick="togSfx();parent()">🔔 ${T("Âm hiệu ứng: "+(sf?"BẬT":"TẮT"),"Sound effects: "+(sf?"ON":"OFF"))}</button>
          </div>
        </div>

        <!-- 6. BẢO MẬT & THU ÂM -->
        <div class="settings-group">
          <div class="settings-group-title">🔑 ${T("Bảo mật & Giọng bố mẹ:","Security & Voice Recording:")}</div>
          <div class="chips" style="margin-top:4px">
            <button class="pill" onclick="changeParentPin()">🔑 ${T("Đổi mã PIN phụ huynh","Change PIN")}</button>
            <button class="pill" onclick="go('rec')">🎙 ${T("Thu giọng bố mẹ","Record voice")}</button>
            <button class="pill" onclick="testVi()">🔊 ${T("Nghe thử giọng máy","Test speech")}</button>
          </div>
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
  const consKey = "cons_" + (c === "đ" ? "dd" : c);
  const target = (window.AUDIO_MAP && (window.AUDIO_MAP[consKey] || window.AUDIO_MAP["cons_" + c] || window.AUDIO_MAP[r])) || r;
  playSafeAudio(target, "Tưởng Vy");
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

  // Đọc trọn câu đánh vần: Ưu tiên audio mẫu Cô Lan Anh nếu có, hoặc VieNeu
  const lananhKey = `lananh_spell_${c}_${v}_${toneIdx}`;
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

  const targetAudio = (window.AUDIO_MAP && window.AUDIO_MAP[lananhKey]) || spoken;
  playSafeAudio(targetAudio, "Tưởng Vy", fin);
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
  const lanAnhBanner = `
    <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:2px solid #f59e0b;border-radius:14px;padding:8px 14px;margin:8px auto 12px;max-width:580px;display:flex;align-items:center;justify-content:space-between;gap:8px">
      <div style="font-size:13.5px;font-weight:700;color:#92400e;text-align:left">
        👩‍🏫 <b>Bài học Đánh vần Cô Lan Anh (Lớp 1)</b><br>
        <span style="font-size:12px;color:#b45309;font-weight:500">Video sinh động, nhận biết mặt chữ và bài tập ghép vần</span>
      </div>
      <button class="pill on" onclick="go('tierActLanAnh')" style="font-size:13px;padding:6px 14px;background:#ea580c;color:#fff;border:0;flex-shrink:0">Học ngay ▶</button>
    </div>
  `;
  m.innerHTML=`${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Đánh vần & Luyện đọc","Reading & Phonics"),i:"📚"}])}
  <h2 id="readLQ" role="button" tabindex="0" onclick="say('Đánh vần và luyện đọc','Reading and phonics')" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${T("Đánh vần & Luyện đọc","Reading & Phonics")}</h2>
  ${lanAnhBanner}
  <div class="chips" style="margin-bottom:10px">${tabs.map(([k,vi,en])=>`<button class="pill${readTab===k?" on":""}" onclick="readL('${k}')">${T(vi,en)}</button>`).join("")}</div>
  ${body}`;
  sayPrompt("readL","Đánh vần và luyện đọc nhé","Reading and phonics",180000);
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

  const catalog = (typeof STORY_CATALOG !== "undefined" && Array.isArray(STORY_CATALOG) && STORY_CATALOG.length)
    ? STORY_CATALOG
    : (typeof FAIRY_STORIES !== "undefined" && Array.isArray(FAIRY_STORIES) ? FAIRY_STORIES : []);

  if (!catalog.length) {
    m.innerHTML = `${kbc([{s:"home",t:T("Trang chủ","Home"),i:"🏠"},{t:T("Kho truyện cổ tích","Stories"),i:"📖"}])}
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:64px;margin-bottom:12px">📖</div>
        <h3 style="color:var(--ink);margin-bottom:8px">${T("Chưa tải được kho truyện cổ tích","Could not load fairy tales")}</h3>
        <p style="color:#64748b;font-size:16px;max-width:480px;margin:0 auto 20px">
          ${T("Bé hoặc bố mẹ vui lòng kiểm tra kết nối mạng hoặc bấm nút Thử tải lại bên dưới nhé!","Please check network or tap Reload below!")}
        </p>
        <button class="pill on" onclick="storyL('${curCat}')" style="font-size:16px;padding:8px 24px">🔄 ${T("Thử tải lại","Try Again")}</button>
      </div>`;
    return;
  }
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
  const catalog = (typeof STORY_CATALOG !== "undefined" && Array.isArray(STORY_CATALOG) && STORY_CATALOG.length)
    ? STORY_CATALOG
    : (typeof FAIRY_STORIES !== "undefined" && Array.isArray(FAIRY_STORIES) ? FAIRY_STORIES : []);
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
        <audio controls preload="metadata" src="${tctMatch.audio}" style="width:100%;max-width:540px;height:44px;outline:none" onplay="window.__stopStory()" onerror="this.insertAdjacentHTML('afterend', '<div style=\'color:#e11d48;font-size:14px;margin-top:6px;font-weight:700\'>⚠️ Audio online từ truyencotich.top cần kết nối mạng. Bé bấm nút \'Kể truyện (Nghe đọc)\' bên dưới để nghe đọc offline nhé!</div>'); this.style.display='none';"></audio>
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
const V={home,todayLearning,numL,numP,letL,letD,letP,cmp,games,mis,cmpS,match,mem,trace,gate,parent,rec:recS,readL,math10,storyL,storyRead,storyDetail,pwaGuide,badges:showBadges,countGame,bubbleGame,tierActivities,tierActLanAnh,tierActVtv7,tierActMath,tierActWord,tierActRead,playActivity};
const LAZY={s:"./img-s.js",o:"./img-o.js"},LP={};
async function need(k){
  if(window["__"+k])return true;
  if(LP[k])return LP[k];
  return LP[k]=(async()=>{
    const isFileProto = typeof window !== "undefined" && window.location && window.location.protocol === "file:";
    if (isFileProto) {
      const ok = await loadScriptTag(LAZY[k].replace(/^\.\//, ""));
      if(ok) { window["__"+k]=true; return true; }
      delete LP[k];
      return false;
    }
    try{
      await import(LAZY[k]);
      window["__"+k]=true;
      return true;
    }catch(e){
      const ok = await loadScriptTag(LAZY[k].replace(/^\.\//, ""));
      if(ok) { window["__"+k]=true; return true; }
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
const LSK = [
  "stars", "st", "lvl", "lang", "rate2", "auto", "ad", "sfx", "rm", "trm", "sound_master",
  "badges", "kid_name", "kid_avatar", "ageTier", "show_age_tiers", "showAgeTiers",
  "daily_limit_minutes", "blg_stage", "streak", "kids_streak_count", "kids_streak_last_date",
  "kids_confetti_disabled", "bhv_act_stats", "bhv_offscreen_done", "bhv_profiles", "bhv_active_profile_id"
];
const LSV = {
  stars: /^\d{1,9}$/,
  lvl: /^[123]$/,
  lang: /^(vi|en|both)$/,
  rate2: /^\d?\.?\d{1,3}$/,
  auto: /^[01]$/,
  ad: /^\d{1,3},\d{1,3}$/,
  sfx: /^[01]$/,
  rm: /^(auto|0|1)$/,
  trm: /^(up|lo|nu)$/,
  sound_master: /^[01]$/,
  badges: /^[a-z0-9_,]{0,1000}$/,
  kid_name: /^.{1,50}$/,
  kid_avatar: /^.{1,20}$/,
  ageTier: /^(preschool|grade1_2|grade3_5)$/,
  show_age_tiers: /^[01]$/,
  showAgeTiers: /^(true|false|0|1)$/,
  daily_limit_minutes: /^\d{1,3}$/,
  blg_stage: /^\d{1,3}$/,
  streak: /^\d{1,5}$/,
  kids_streak_count: /^\d{1,5}$/,
  kids_streak_last_date: /^\d{4}-\d{2}-\d{2}$/,
  kids_confetti_disabled: /^[01]$/,
  bhv_act_stats: /^[\s\S]{2,100000}$/,
  bhv_offscreen_done: /^[\s\S]{2,10000}$/,
  bhv_profiles: /^\[[\s\S]*\]$/,
  bhv_active_profile_id: /^[a-zA-Z0-9_\-]{1,60}$/,
  blg_unlock_all: /^[01]$/,
  blg_unlocked_stages: /^\[[\d,\s]*\]$/
};
const okSt = v => {
  try {
    const o = JSON.parse(v);
    return !!o && typeof o === "object" && Number.isFinite(+o.n) && Number.isFinite(+o.f) && (!o.w || typeof o.w === "object");
  } catch(e) {
    return false;
  }
};
const okActStats = v => {
  try {
    const o = JSON.parse(v);
    return !!o && typeof o === "object";
  } catch(e) {
    return false;
  }
};
async function saveFile(bl,name){const f=new File([bl],name,{type:bl.type});
 if(matchMedia("(pointer:coarse)").matches&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:name});return"share"}catch(e){if(e&&e.name==="AbortError")return"cancel"}}
 const u=URL.createObjectURL(bl),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return"dl"}
async function exportData(full){
 try{const d={app:"be-hoc-vui",schemaVersion:2,v:2,exportedAt:new Date().toISOString(),ls:{},rec:{}};
  LSK.forEach(k=>{
   if(/pin/i.test(k)) return;
   try{const v=localStorage.getItem(k);if(v!==null)d.ls[k]=v}catch(e){}
  });
  try {
   for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (/^study_sec_\d{4}-\d{2}-\d{2}$/.test(k) || /^bhv_pdata_/.test(k))) {
     const v = localStorage.getItem(k);
     if (v !== null && /^\d{1,8}$/.test(v)) d.ls[k] = v;
    }
   }
  } catch(e) {}
  if(full){const all=await idb("readonly",s=>s.getAll())||[];for(const o of all)d.rec[o.k]=await b2d(o.b)}
  const bl=new Blob([JSON.stringify(d, null, 2)],{type:"application/json"}),name=`be-hoc-vui-${full?"kem-giong":"tien-do"}-${new Date().toISOString().slice(0,10)}.json`,r=await saveFile(bl,name);
  if(r!=="cancel")bm(`✅ Đã tạo file ${name} (${bl.size>1048576?(bl.size/1048576).toFixed(1)+" MB":Math.max(1,Math.round(bl.size/1024))+" KB"}). Hãy giữ file này ở nơi an toàn.`)}
 catch(e){bm("⚠ Không tạo được file sao lưu.")}}
async function importData(file){if(!file)return;
 try{if(file.size>250*1024*1024)throw 0;const d=JSON.parse(await file.text());
  if(!d||d.app!=="be-hoc-vui"||!d.ls||typeof d.ls!=="object")throw 0;
  const recs=Object.entries(d.rec||{}).filter(([k,u])=>/^(vi|en)\|/.test(k)&&typeof u==="string"&&/^data:[^,]*;base64,/.test(u));
  if(!confirm("Khôi phục dữ liệu từ file này?\nSao, thống kê và cài đặt hiện tại sẽ được thay bằng dữ liệu trong file."+(recs.length?`\n${recs.length} bản thu sẽ được thêm vào (trùng tên sẽ bị ghi đè).`:"")))return;
  let n=0;
  for(const [k, v] of Object.entries(d.ls)){
   if(typeof v!=="string")continue;
   if(/pin/i.test(k))continue;
   let valid = false;
   if(k==="st") valid = okSt(v);
   else if(k==="bhv_act_stats") valid = okActStats(v);
   else if(LSV[k]) valid = LSV[k].test(v);
   else if(/^study_sec_\d{4}-\d{2}-\d{2}$/.test(k)) valid = /^\d{1,8}$/.test(v);
   if(valid){ls.set(k,v);n++}
  }
  for(const[k,u]of recs){const bl=await(await fetch(u)).blob();await idb("readwrite",s=>s.put({k,b:bl},k))}
  alert("Đã khôi phục xong. Ứng dụng sẽ tải lại.");location.reload()}
 catch(e){bm("⚠ File này không đúng định dạng sao lưu của Bé học vui hoặc đã bị hỏng.")}}
idb("readonly",s=>s.getAll()).then(a=>(a||[]).forEach(o=>{REC[o.k]=URL.createObjectURL(o.b);RECSZ[o.k]=o.b.size})).catch(()=>{});
applyRM();try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyRM)}catch(e){}
try{history.replaceState({i:0,s:"home"},"")}catch(e){}
show("home");
