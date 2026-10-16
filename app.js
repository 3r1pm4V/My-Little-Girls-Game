const I=IMG,m=document.getElementById("m");
const im=(n,c="")=>`<img class="${c}" src="${I[n]}" alt="">`;
const imL=(L,c="")=>{const k=lang==="en"?L:(I["vi_"+L]?"vi_"+L:L);return im(k,c)};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[R(0,a.length-1)];
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const T=(vi,en)=>`<span>${vi}</span><small>${en}</small>`;
const ls={get(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const NV="không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi".split(","),NE="zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty".split(",");
const LV="a,á,ớ ngắn,bê,xê,dê,đê,e,ê,giê,hát,i,ca,lờ,mờ,nờ,o,ô,ờ,pê,cu,rờ,ét,tê,u,ư,vê,ích xì,i dài".split(",");
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
let RATE=+ls.get("rate2",.85),lang=ls.get("lang","vi"),stars=+ls.get("stars",0),cur="home",done=false,rd={n:0,f:0,st:0};const ROUND=5,RL={mem:2,trace:3,match:3},GM=/P$|^(cmp|cmpS|mis|match|mem|trace|math10)$/;let lvl=+ls.get("lvl",2);const MX=()=>[5,10,15][lvl-1];
function setLang(l){lang=l;ls.set("lang",l);ql=null;parent()}window.setLang=setLang;
const A=new Audio(),REC={},RECSZ={};let tok=0,sc=0,busy=false,busyEnd=0,lastSig="",dupN=0,vWait=false;
const SS=window.speechSynthesis;
let VOICES=[];
const loadVoices=()=>{try{VOICES=SS?SS.getVoices():[]}catch(e){VOICES=[]}};
loadVoices();
if(SS){const vc=()=>{loadVoices();if(cur==="parent")parent()};try{SS.addEventListener("voiceschanged",vc)}catch(e){SS.onvoiceschanged=vc}}
const viV=()=>VOICES.find(v=>/^vi([-_]|$)/i.test(v.lang||""));
const vState=()=>{if(!SS)return{k:"none"};loadVoices();if(!VOICES.length)return vWait?{k:"none"}:{k:"wait"};const v=viV();return v?{k:"ok",n:v.name}:{k:"no"}};
function say(vi,en){A.pause();const my=++tok;busy=true;if(SS)SS.cancel();
 const sp=(t,l)=>t.split(/[.!?]+\s*/).map(s=>s.trim()).filter(Boolean).map(s=>[s,l]);
 const LG=ql||lang,q=LG==="vi"?sp(vi,"vi-VN"):LG==="en"?sp(en,"en-US"):[...sp(en,"en-US"),...sp(vi,"vi-VN")];
 const fin=()=>{if(my===tok){busy=false;busyEnd=Date.now()}};
 setTimeout(fin,3000+q.reduce((s,c)=>s+((REC[c[1].slice(0,2)+"|"+c[0]]||(window.AUDIO_MAP&&window.AUDIO_MAP[c[1].slice(0,2)+"|"+c[0]]))?8000:c[0].length*130/RATE)+900/RATE,0));
 (function nx(i){if(my!==tok)return;if(i>=q.length){fin();return}let d=0;
  const nt=()=>{if(d++)return;if(i+1>=q.length){fin();return}setTimeout(()=>nx(i+1),900/RATE)};
  const ak=q[i][1].slice(0,2)+"|"+q[i][0],rk=REC[ak]||(window.AUDIO_MAP&&window.AUDIO_MAP[ak]);
  if(rk){A.onended=A.onerror=nt;A.src=rk;A.play().catch(nt);return}
  if(!SS){nt();return}
  const u=new SpeechSynthesisUtterance(q[i][0]);u.lang=q[i][1];u.rate=RATE;u.pitch=1.2;u.onend=nt;u.onerror=nt;SS.speak(u)})(0)}
let AC;function tone(f,d,t=0){if(!SFX())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type="triangle";o.frequency.value=f;o.connect(g);g.connect(AC.destination);const s=AC.currentTime+t;g.gain.setValueAtTime(.25,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.start(s);o.stop(s+d)}catch(e){}}
const sfxOk=()=>[523,659,784,1047].forEach((f,i)=>tone(f,.25,i*.1)),sfxNo=()=>{tone(220,.3);tone(180,.35,.15)};
const cat=document.getElementById("cat");
function catSet(s){cat.src=I["cat_"+s];cat.className=(s==="happy"||s==="celebrate")?"happy":""}
function head(){document.getElementById("sp").textContent=RATE<.5?"🐢🐢":RATE<.7?"🐢":"🐇";document.getElementById("stars").innerHTML=im("gstar")+stars}
document.getElementById("hb").innerHTML=im("btn_home");document.getElementById("hb").onclick=()=>go("home");document.getElementById("sp").onclick=()=>{RATE=RATE<.5?.6:RATE<.7?.85:.4;ls.set("rate2",RATE);head();say("Bé nghe nhé","Listen")};
function fx(){if(rmOn())return;const e=document.createElement("img");e.src=I.confetti;e.className="fx";document.body.appendChild(e);setTimeout(()=>e.remove(),1500)}
const PR=[["Giỏi quá!","Great job!"],["Hoan hô!","Hooray!"],["Tuyệt vời!","Wonderful!"],["Bé giỏi lắm!","Well done!"],["Đúng rồi!","That's right!"],["Siêu quá!","Awesome!"],["Bé thông minh quá!","So smart!"],["Hay quá!","Fantastic!"],["Mèo thích quá!","The kitty loves it!"]];
const ER=[["Thử lại nhé","Try again"],["Gần đúng rồi, bé thử lại nào","Almost! Try again"],["Không sao, bé thử lại nhé","It's okay, try again"]];
let stk=[{s:"home"}],pend=0;
function show(s,a){if(!V[s])s="home";cur=s;ql=null;tok++;sc++;busy=false;lastSig="";dupN=0;A.pause();if(SS)SS.cancel();if(GM.test(s))rd={n:0,f:0,st:0};V[s](a);if(!GM.test(s))catSet("idle");cat.style.display=s==="parent"||s==="rec"?"none":"";head();m.scrollTop=0}
function go(s,a){const n=stk.length-1,top=stk[n],rep=()=>{stk[n]={s,a};try{history.replaceState({i:n,s,a},"")}catch(e){}show(s,a)};
 if(top.s===s){rep();return}
 let k=-1;for(let j=n-1;j>=0;j--)if(stk[j].s===s){k=j;break}
 if(k>=0){const b=n-k;stk.length=k+1;pend=setTimeout(()=>{if(pend){pend=0;show(s,a)}},300);try{history.go(-b)}catch(e){clearTimeout(pend);pend=0;show(s,a)}return}
 if(top.s==="gate"){rep();return}
 stk.push({s,a});try{history.pushState({i:n+1,s,a},"")}catch(e){}show(s,a)}
addEventListener("popstate",e=>{if(pend){clearTimeout(pend);pend=0}const st=e.state||{i:0,s:"home"};while(stk.length<=st.i)stk.push({s:"home"});stk.length=st.i+1;stk[st.i]={s:st.s,a:st.a};show(st.s,st.a)});
function card(f,vis,vi,en){return`<button class="card" onclick="go('${f}')"><div class="vis">${vis}</div>${T(vi,en)}</button>`}
function home(){m.innerHTML=`<div class="hero">${im("cat_idle")}<h1>Bé học vui<small>Fun Learning</small></h1></div><div class="cards">${card("letL",imL("A")+imL("B"),"Chữ cái","Letters")}${card("readL","<b>ĐỌC</b>","Đánh vần & Đọc","Reading")}${card("storyL","<b>📖✨</b>","Truyện cổ tích","Stories")}${card("numL","<b>1 2 3</b>","Học số","Numbers")}${card("math10","<b>2 + 3</b>","Toán 10","Math 10")}${card("cmp",im("apple")+"<b>&gt;</b>"+im("ball"),"So sánh","Compare")}${card("games",im("kite")+im("rocket"),"Trò chơi","Games")}</div><div class="chips">${[1,2,3].map(v=>`<button class="pill${v==lvl?" on":""}" onclick="setLv(${v})">${T("Mức "+v,"Level "+v)}</button>`).join("")}</div><p><button class="pill" onclick="go('gate')">👨‍👩‍👧 ${T("Phụ huynh","Parents")}${vState().k==="no"?" ⚠":""}</button></p>`;say("Chào bé! Mình cùng học nhé","Hello! Let's learn together")}
const sayN=n=>say(NV[n],NE[n]);
function cnt(b,i){sayN(i);b.style.animation="none";void b.offsetWidth;b.style.animation="pop .4s"}
function numL(n=1){const o=COUNT[n%COUNT.length];
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('numP')">🎮 ${T("Chơi","Play")}</button></div><div class="stage"><button class="nav" onclick="numL(${(n+20)%21})">${im("btn_back")}</button><button class="bignum${n>9?" two":""}" onclick="sayN(${n})">${n}</button><button class="nav" onclick="numL(${(n+1)%21})">${im("btn_next")}</button></div><div class="word">${NV[n]} · ${NE[n]}</div><div class="objs">${n?Array.from({length:n},(_,i)=>`<button class="ob" onclick="cnt(this,${i+1})">${im(o)}</button>`).join(""):"<span>Không có gì · Nothing</span>"}</div><div class="chips">${[...Array(21).keys()].map(i=>`<button class="chip ${i==n?"on":""}" onclick="numL(${i})">${i}</button>`).join("")}</div>`;sayN(n)}
function numP(){if(!R(0,2))return numF();const n=R(1,MX()),o=pick(COUNT),c=new Set([n]);while(c.size<3)c.add(R(1,MX()));
 quiz(T("Có bao nhiêu?","How many?"),"Có bao nhiêu?","How many?",`<div class="objs">${Array.from({length:n},()=>im(o,"")).join("").replace(/<img/g,'<img style="width:clamp(48px,11vw,72px)"')}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,numP,()=>["",NV[n],NE[n]])}
function letL(){const arr=LET_ALL();m.innerHTML=`<div class="row"><button class="pill" onclick="go('letP')">🎮 ${T("Chơi","Play")}</button></div><h2>${T("Chạm vào chữ cái","Tap a letter")}</h2><div class="lgrid">${arr.map(L=>`<button onclick="go('letD','${L}')">${imL(L)}</button>`).join("")}</div>`;say("Chạm vào chữ cái nhé","Tap a letter");need("s")}
function letD(L){const arr=LET_ALL(),i=arr.indexOf(L),it=exLD(L),fb=lang==="vi"&&!exL(L,"vi").length;
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('letL')">← ${T("Chữ cái","Letters")}</button></div><div class="stage"><button class="nav" onclick="letD('${arr[(i+arr.length-1)%arr.length]}')">${im("btn_back")}</button><button onclick="sayL('${L}');rp(this)">${spr(L,"clamp(150px,30vw,230px)")}</button><button class="nav" onclick="letD('${arr[(i+1)%arr.length]}')">${im("btn_next")}</button></div>${fb?`<div class="note">${T(`Chữ ${L} ít dùng trong tiếng Việt, thường gặp ở từ mượn. Mình xem từ tiếng Anh nhé`,`The letter ${L} is rare in Vietnamese. Here are English words`)}</div>`:""}<div class="pair">${it.map(k=>{const x=EXA[k];return`<button onclick="sayAs('${x.l}','${x.t}','${x.t}');rp(this)">${spr(x.img,"100px")}<span>${x.t}</span>${lang==="both"||x.l!==lang?`<small>${x.l==="vi"?"🇻🇳":"🇬🇧"}</small>`:""}</button>`}).join("")}</div>`;sayL(L);need("s").then(upSpr)}
function sayL(L){const viIdx=LET_VI.indexOf(L),it=exLD(L),v=it.filter(k=>EXA[k].l==="vi").map(k=>EXA[k].t),e=it.filter(k=>EXA[k].l==="en").map(k=>EXA[k].t),fb=lang==="vi"&&!v.length;
 say(`${viIdx>=0?LV[viIdx]:L}${v.length?". "+v.join(". "):""}`,`${L}${!fb&&e.length?". "+e.join(". "):""}`)}
function letP(){if(!R(0,2))return letO();const l=ql=qL(),k=pick(exP(l)),L=EXA[k].L,c=new Set([L]);while(c.size<3)c.add(pick(exPL(l)));
 quiz(T("Chữ cái đầu tiên là gì?","What letter does it start with?"),"Chữ cái đầu tiên là gì?","What letter does it start with?",im(EXA[k].img,"big"),shuf([...c]).map(v=>({k:v,h:imL(v)})),L,letP,()=>["",l==="vi"?`${LET_VI.indexOf(L)>=0?LV[LET_VI.indexOf(L)]:L}. ${EXA[k].t}`:"",l==="en"?`${L}. ${EXA[k].t}`:""])}

function cmp(){let a=R(1,Math.min(MX(),10)),b=R(1,Math.min(MX(),10));if(!R(0,3))b=a;const more=R(0,1)==0,o1=pick(COUNT),o2=pick(COUNT);
 const right=a==b?"eq":more?(a>b?"a":"b"):(a<b?"a":"b"),grp=(n,o)=>`<div class="grp">${Array.from({length:n},()=>im(o)).join("")}</div>`;
 const q=more?["Bên nào NHIỀU hơn?","Which has MORE?"]:["Bên nào ÍT hơn?","Which has FEWER?"];
 quiz(T(q[0],q[1]),q[0],q[1],"",[{k:"a",h:grp(a,o1)},{k:"eq",h:`<span class="ans">=</span>${T("Bằng nhau","Same")}`},{k:"b",h:grp(b,o2)}],right,cmp,()=>{
  if(a==b)return[`<div class="eq">${a} = ${b}</div>`,`${NV[a]} bằng ${NV[b]}. Hai bên bằng nhau!`,`${NE[a]} equals ${NE[b]}. They are the same!`];
  const w=right=="a"?a:b,l=right=="a"?b:a;
  return[`<div class="eq">${a} ${a>b?">":"<"} ${b}</div>`,`${NV[w]} ${more?"nhiều":"ít"} hơn ${NV[l]}`,`${NE[w]} is ${more?"more":"fewer"} than ${NE[l]}`]},"cmp")}
function quiz(qh,qv,qe,body,opts,right,next,extra,cls=""){const strip=h=>String(h).replace(/<img[^>]*>/g,"¤"),sig=qv+"|"+right+"|"+strip(body)+(cls==="cmp"?"|"+opts.map(o=>strip(o.h)).join("¦"):"");if(sig===lastSig&&dupN++<8)return next();dupN=0;lastSig=sig;done=false;let wr=0;catSet("thinking");const back={numP:"numL",letP:"letL",mis:"games",cmpS:"games",math10:"home"}[cur]||"home";
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('${back}')">← ${back=="home"?T("Menu","Menu"):back=="games"?T("Trò chơi","Games"):T("Học","Learn")}</button></div><h2 id="q">🔊 ${qh}</h2><div>${body}</div><div class="opts ${cls}">${opts.map(o=>`<button class="opt" data-k="${o.k}">${o.h}</button>`).join("")}</div><div id="res"></div>`;
 document.getElementById("q").onclick=()=>say(qv,qe);say(qv,qe);
 m.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(done)return;
  if(b.dataset.k==String(right)){done=true;b.classList.add("good");sfxOk();fx();if(wr){rd.st=0}else{rd.st++;rd.f++}rd.n++;sta(wr==0);catSet(rd.st>=3?"celebrate":"happy");stars++;ls.set("stars",stars);head();
   const[h,v,e]=extra(),p=pick(PR);document.getElementById("res").innerHTML=h;say(p[0]+" "+v,p[1]+" "+e);adv(rd.n>=(RL[cur]||ROUND)?result:next)}
  else{wr++;rd.st=0;stw(right);b.classList.add("bad");sfxNo();catSet("sad");if(wr>=2){const g=m.querySelector('.opt[data-k="'+right+'"]');if(g)g.classList.add("hint");say("Bé nhìn chỗ này nè","Look here")}else{const w=pick(ER);say(w[0],w[1])}setTimeout(()=>{b.classList.remove("bad");if(!done)catSet(wr>=2?"pointing":"thinking")},900)}})}
function numF(){const n=R(0,MX()),c=new Set([n]);while(c.size<3)c.add(R(0,MX()));
 quiz(T(`Tìm số ${NV[n]}`,`Find the number ${NE[n]}`),`Tìm số ${NV[n]}`,`Find the number ${NE[n]}`,"",shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,numP,()=>["",NV[n],NE[n]])}
function letO(){const l=ql=qL(),L=pick(exPL(l)),k=pick(exPK(l,L)),c=new Set([k]);while(c.size<3){const o=pick(exP(l));if(EXA[o].L!==L)c.add(o)}
 quiz(T(`Hình nào bắt đầu bằng chữ ${L}?`,`Which starts with ${L}?`),`Hình nào bắt đầu bằng chữ ${LV[LET.indexOf(L)]}?`,`Which one starts with ${L}?`,imL(L,"big"),shuf([...c]).map(v=>({k:v,h:im(EXA[v].img)})),k,letP,()=>["",l==="vi"?`${LV[LET.indexOf(L)]}. ${EXA[k].t}`:"",l==="en"?`${L}. ${EXA[k].t}`:""])}

function result(){const g=cur,f=rd.f,N=RL[cur]||ROUND,lv=adapt(f/N);m.innerHTML=`<div class="stage">${im("trophy","big")}</div><h2>${T("Hoàn thành!","All done!")}</h2>${lv?`<h2>${lv}</h2>`:""}<div class="eq">${f} / ${N}</div><div class="objs">${Array.from({length:N},(_,i)=>im("gstar").replace("<img",`<img style="width:56px;${i<f?"":"filter:grayscale(1);opacity:.35"}"`)).join("")}</div><div class="stage"><button class="nav" onclick="go('${g}')">${im("btn_replay")}</button><button class="nav" onclick="go('home')">${im("btn_home")}</button></div>`;ql=null;catSet("celebrate");fx();sfxOk();say(`Bé làm đúng ${NV[f]} trên ${NV[N]} câu. Giỏi lắm!`,`You got ${NE[f]} out of ${NE[N]}. Great job!`)}
function setLv(v){lvl=v;ls.set("lvl",v);home();tok++;if(SS)SS.cancel()}
function win(wr,next,vi,en){if(wr){rd.st=0}else{rd.st++;rd.f++}rd.n++;sta(!wr);stars++;ls.set("stars",stars);head();sfxOk();fx();catSet(rd.st>=3?"celebrate":"happy");const p=pick(PR);say(p[0]+" "+vi,p[1]+" "+en);adv(rd.n>=(RL[cur]||ROUND)?result:next)}
const bk=()=>`<div class="row"><button class="pill" onclick="go('games')">← ${T("Trò chơi","Games")}</button></div>`;
function games(){m.innerHTML=`<h2>${T("Trò chơi","Games")}</h2><div class="cards">${card("mis","<b>1 2 ? 4</b>","Số còn thiếu","Missing number")}${card("match",im("apple")+imL("A"),"Ghép chữ và hình","Match")}${card("mem",im("cat")+im("cat"),"Lật thẻ","Memory")}${card("trace",im("pencil")+"<b>Aa1</b>","Tô chữ & nét viết","Trace")}${card("cmpS","<b>&gt; = &lt;</b>","Dấu so sánh","Signs")}</div>`;say("Bé chọn trò chơi nhé","Pick a game");need("o")}
function mis(){const mx=Math.max(MX(),6),s=R(1,mx-4),h=R(1,3),n=s+h,c=new Set([n]);while(c.size<3)c.add(R(1,mx));
 quiz(T("Số nào còn thiếu?","Which number is missing?"),"Số nào còn thiếu?","Which number is missing?",`<div class="objs">${[0,1,2,3,4].map(i=>`<span style="font-size:64px;font-weight:800;padding:0 10px;color:var(--acc)">${i==h?"?":s+i}</span>`).join("")}</div>`,shuf([...c]).map(v=>({k:v,h:`<span class="ans">${v}</span>`})),n,mis,()=>["",NV[n],NE[n]])}
function cmpS(){let a=R(1,Math.min(MX(),10)),b=R(1,Math.min(MX(),10));if(!R(0,3))b=a;const o1=pick(COUNT),o2=pick(COUNT),g=(n,o)=>`<div class="grp" style="flex:1">${Array.from({length:n},()=>im(o)).join("")}</div>`,s=a>b?">":a<b?"<":"=";
 quiz(T("Chọn dấu đúng","Pick the right sign"),"Chọn dấu đúng","Pick the right sign",`<div class="stage" style="gap:6px">${g(a,o1)}<span style="font-size:70px;font-weight:800;color:var(--acc)">?</span>${g(b,o2)}</div>`,[">","=","<"].map(v=>({k:v,h:`<span class="ans">${v==">"?"&gt;":v=="<"?"&lt;":"="}</span>`})),s,cmpS,()=>[`<div class="eq">${a} ${s} ${b}</div>`,...(a==b?[`${NV[a]} bằng ${NV[b]}`,`${NE[a]} equals ${NE[b]}`]:[`${NV[a]} ${a>b?"nhiều":"ít"} hơn ${NV[b]}`,`${NE[a]} is ${a>b?"more":"fewer"} than ${NE[b]}`])])}
function match(){const l=ql=qL(),Ls=shuf(exPL(l)).slice(0,3),ks=Ls.map(L=>pick(exPK(l,L)));let sel=null,left=3,wr=0;
 m.innerHTML=bk()+`<h2>${T("Ghép chữ với hình","Match the letter and picture")}</h2><div class="opts">${shuf(ks).map(k=>`<button class="opt" data-p="${k}">${im(EXA[k].img)}</button>`).join("")}</div><div class="opts">${shuf(Ls).map(L=>`<button class="opt" data-l="${L}">${imL(L)}</button>`).join("")}</div>`;
 say("Ghép chữ với hình nhé","Match the letter and picture");catSet("thinking");
 m.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{if(b.disabled)return;m.querySelectorAll("[data-p]").forEach(x=>x.style.borderColor="");sel=b;b.style.borderColor="var(--acc)";const k=b.dataset.p;say(EXA[k].t,EXA[k].t)});
 m.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{if(!sel||b.disabled)return;if(EXA[sel.dataset.p].L===b.dataset.l){[sel,b].forEach(x=>{x.disabled=true;x.style.borderColor="";x.classList.add("good")});sfxOk();sel=null;if(!--left)win(wr,match,"","")}else{wr++;sfxNo();catSet("sad");say("Thử lại nhé","Try again");setTimeout(()=>catSet("thinking"),900)}})}
function mem(){const l=ql=qL(),ks=shuf(exP(l)).slice(0,3),cs=shuf([...ks,...ks]);let a=null,lock=false,left=3,miss=0;
 m.innerHTML=bk()+`<h2>${T("Tìm hai hình giống nhau","Find the pairs")}</h2><div class="opts mem" style="max-width:520px;margin:12px auto">${cs.map(k=>`<button class="opt" data-c="${k}">${im("gstar")}</button>`).join("")}</div>`;
 say("Tìm hai hình giống nhau","Find two that are the same");catSet("thinking");
 m.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{if(lock||b.disabled||b===a)return;const k=b.dataset.c;b.innerHTML=im(EXA[k].img);say(EXA[k].t,EXA[k].t);
  if(!a){a=b;return}
  if(a.dataset.c===k){[a,b].forEach(x=>{x.disabled=true;x.classList.add("good")});a=null;sfxOk();if(!--left)setTimeout(()=>win(miss>2?1:0,mem,"",""),900)}
  else{miss++;lock=true;sfxNo();const p=a;a=null;setTimeout(()=>{p.innerHTML=b.innerHTML=im("gstar");lock=false},1200)}})}
let trm=ls.get("trm","up"),lastTr="";
const TR={up:{items:()=>LET_ALL(),key:x=>"o_"+x,vi:x=>`Tô chữ ${x}`,en:x=>`Color the letter ${x}`,say:x=>sayL(x)},
 lo:{items:()=>LET_ALL().map(x=>x.toLowerCase()),key:x=>"l_"+x,vi:x=>`Tô chữ ${x}`,en:x=>`Color the letter ${x}`,say:x=>sayL(x.toUpperCase())},
 nu:{items:()=>[...Array(10).keys()].map(String),key:x=>"n_"+x,vi:x=>`Tô số ${x}`,en:x=>`Color the number ${x}`,say:x=>sayN(+x)},
 net:{items:()=>VN_STROKES.map(s=>s.id),key:x=>x,vi:x=>`Tô ${VN_STROKES.find(s=>s.id===x).name}`,en:x=>`Trace ${VN_STROKES.find(s=>s.id===x).en}`,say:x=>{const s=VN_STROKES.find(k=>k.id===x);say(s.name,s.en)}}};
function trace(){const md=TR[trm]||TR.up;
 if(trm!=="net"&&!window.__o){m.innerHTML=bk()+`<h2>${T("Đang tải…","Loading…")}</h2>`;catSet("thinking");
  need("o").then(ok=>{if(cur!=="trace")return;if(ok)trace();else m.innerHTML=bk()+`<h2>${T("Chưa tải được hình. Kiểm tra mạng nhé","Could not load. Check the connection")}</h2><p><button class="pill" onclick="trace()">↻ ${T("Thử lại","Retry")}</button></p>`});return}
 const pool=md.items();let it;do{it=pick(pool)}while(it===lastTr&&pool.length>1);lastTr=it;let col="#ff5d8f",dn=false;
 const guide=trm==="net"?`<div style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">${VN_STROKES.find(s=>s.id===it).svg}</div>`:`<img src="${I[md.key(it)]}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none" alt="">`;
 m.innerHTML=bk()+`<div class="chips" style="margin:0 0 4px">${[["up","ABC"],["lo","abc"],["nu","123"],["net","Nét"]].map(([k,x])=>`<button class="pill${trm===k?" on":""}" onclick="trm='${k}';ls.set('trm',trm);trace()">${x}</button>`).join("")}</div><h2>${T(md.vi(it),md.en(it))}</h2><div style="position:relative;width:min(75vw,300px);aspect-ratio:415/512;margin:8px auto;background:#bfe3ff;border-radius:30px;touch-action:none"><canvas style="position:absolute;inset:0;width:100%;height:100%;border-radius:30px"></canvas>${guide}</div><div class="chips">${["#ff5d8f","#ffb347","#4cc36b","#4aa3ff","#a66bff"].map(c=>`<button class="chip" style="background:${c}" data-col="${c}"></button>`).join("")}<button class="pill" id="ok">✔ ${T("Xong","Done")}</button></div>`;
 const cv=m.querySelector("canvas"),W=cv.width=300,H=cv.height=370,x=cv.getContext("2d");x.lineCap=x.lineJoin="round";x.lineWidth=34;
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
 cv.onpointerdown=e=>{dn=true;const[p,q]=pt(e);x.strokeStyle=col;x.beginPath();x.moveTo(p,q);x.lineTo(p+.1,q);x.stroke();cv.setPointerCapture(e.pointerId)};
 cv.onpointermove=e=>{if(!dn)return;const[p,q]=pt(e);x.lineTo(p,q);x.stroke();x.beginPath();x.moveTo(p,q)};
 cv.onpointerup=()=>dn=false;
 m.querySelectorAll("[data-col]").forEach(b=>b.onclick=()=>col=b.dataset.col);
 m.querySelector("#ok").onclick=e=>{e.currentTarget.disabled=true;win(0,trace,"","")};
 md.say(it);catSet("pointing")}
const spr=(k,z)=>{const key=lang==="en"?k:(I["vi_"+k]?"vi_"+k:k);return I["s_"+key]?`<span class="spr" style="--z:${z};background-image:url(${I["s_"+key]})"></span>`:`<img class="spf" data-sk="${key}" data-z="${z}" src="${I[key]}" style="height:${z}" alt="">`};
function rp(b){const s=b.querySelector(".spr");if(s){s.style.animation="none";void s.offsetWidth;s.style.animation=""}}
let ST;try{ST=JSON.parse(ls.get("st",""))||{}}catch(e){ST={}}ST.n=ST.n||0;ST.f=ST.f||0;ST.w=ST.w||{};
const svS=()=>ls.set("st",JSON.stringify(ST)),sta=ok=>{ST.n++;if(ok)ST.f++;svS()};
function stw(r){const l=cur==="letP"?"Chữ "+(OBJ[r]?OBJ[r].L:r):(cur==="numP"||cur==="mis")?"Số "+r:"";if(l){ST.w[l]=(ST.w[l]||0)+1;svS()}}
function adapt(r){if(cur==="trace"||ls.get("auto","1")!="1")return"";let[g,b]=ls.get("ad","0,0").split(",").map(Number);if(r>=.8){g++;b=0}else if(r<=.4){b++;g=0}else g=b=0;let s="";if(g>=2&&lvl<3){lvl++;g=0;s=`⬆ Mức ${lvl} · Level ${lvl}`}else if(b>=2&&lvl>1){lvl--;b=0;s=`⬇ Mức ${lvl} · Level ${lvl}`}ls.set("ad",g+","+b);ls.set("lvl",lvl);return s}
const togAuto=()=>{ls.set("auto",ls.get("auto","1")=="1"?"0":"1");parent()};
function gate(){const a=R(4,9),b=R(4,9),c=new Set([a+b]);while(c.size<3)c.add(R(8,18));
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('home')">← Menu</button></div><h2>👨‍👩‍👧 ${T("Dành cho phụ huynh","For parents")}</h2><h2>${a} + ${b} = ?</h2><div class="opts">${shuf([...c]).map(v=>`<button class="opt" onclick="go('${v==a+b?"parent":"home"}')"><span class="ans">${v}</span></button>`).join("")}</div>`}
function parent(){const top=Object.entries(ST.w).sort((a,b)=>b[1]-a[1]).slice(0,8),au=ls.get("auto","1")=="1",sf=SFX(),rp=ls.get("rm","auto"),vs=vState(),nrec=Object.keys(REC).length;
 if(vs.k==="wait")setTimeout(()=>{vWait=true;if(cur==="parent")parent()},2000);
 const vh=vs.k==="ok"?`<div class="note ok">✅ ${T("Máy có giọng đọc tiếng Việt","This device has a Vietnamese voice")}<small>${esc(vs.n)}</small><button class="pill" onclick="testVi()">🔊 ${T("Nghe thử","Test")}</button></div>`
  :vs.k==="wait"?`<div class="note">⏳ ${T("Đang kiểm tra giọng đọc…","Checking voices…")}</div>`
  :`<div class="note warn">⚠ ${T(vs.k==="no"?"Máy chưa có giọng đọc tiếng Việt":"Không tìm thấy giọng đọc của máy","No Vietnamese voice found")}<small>${VIHELP}</small><button class="pill" onclick="testVi()">🔊 ${T("Nghe thử","Test")}</button><button class="pill" onclick="go('rec')">🎙 ${T("Thu giọng bố mẹ","Record your voice")}</button></div>`;
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('home')">← Menu</button></div><h2>👨‍👩‍👧 ${T("Phụ huynh","Parents")}</h2><div class="pair"><button><b class="n">⭐ ${stars}</b>${T("Tổng sao","Stars")}</button><button><b class="n">${ST.n}</b>${T("Câu đã làm","Questions")}</button><button><b class="n">${ST.n?Math.round(ST.f/ST.n*100):0}%</b>${T("Đúng ngay lần đầu","First try")}</button></div><h2>${T("Cần luyện thêm","Needs practice")}</h2><div class="chips">${top.length?top.map(([k,v])=>`<span class="pill">${k} ×${v}</span>`).join(""):"—"}</div><h2>${T("Giọng đọc","Voice")}</h2>${vh}<h2>${T("Cài đặt","Settings")}</h2><div class="chips">${[["vi","🇻🇳 Tiếng Việt"],["en","🇬🇧 Tiếng Anh"],["both","Song ngữ VI + EN"]].map(([k,t])=>`<button class="pill${lang===k?" on":""}" onclick="setLang('${k}')">${t}</button>`).join("")}</div><div class="chips">${[1,2,3].map(v=>`<button class="pill${v==lvl?" on":""}" onclick="lvl=${v};ls.set('lvl',${v});parent()">${T("Mức "+v,"Level "+v)}</button>`).join("")}<button class="pill${au?" on":""}" onclick="togAuto()">${T("Tự chỉnh mức: "+(au?"BẬT":"TẮT"),"Auto level: "+(au?"ON":"OFF"))}</button></div><div class="chips"><button class="pill${sf?" on":""}" onclick="togSfx()">🔊 ${T("Âm hiệu ứng: "+(sf?"BẬT":"TẮT"),"Sound effects: "+(sf?"ON":"OFF"))}</button><button class="pill${rmOn()?" on":""}" onclick="togRM()">🎞 ${T("Giảm chuyển động: "+(rp==="auto"?"THEO MÁY":rp==="1"?"BẬT":"TẮT"),"Reduce motion: "+(rp==="auto"?"AUTO":rp==="1"?"ON":"OFF"))}</button></div><div class="chips"><button class="pill" onclick="go('rec')">🎙 ${T("Giọng bố mẹ · nhập file âm thanh","Your voice · import audio")}</button><button class="pill" onclick="ST={n:0,f:0,w:{}};svS();parent()">🗑 ${T("Xóa thống kê","Reset stats")}</button></div><h2>${T("Sao lưu","Backup")}</h2><div class="note">${T("Lưu sao, thống kê và cài đặt ra một file để chuyển sang máy khác.","Save stars, stats and settings to a file to move to another device.")}<small>Chọn “kèm giọng thu” nếu muốn mang cả bản thu và file âm thanh đã nhập (file sẽ nặng hơn).</small></div><div class="chips"><button class="pill" onclick="exportData(0)">💾 ${T("Tiến độ","Progress")}</button><button class="pill" onclick="exportData(1)">💾 ${T("Kèm giọng thu"+(nrec?" ("+nrec+")":""),"With voices")}</button><button class="pill" onclick="document.getElementById('bf').click()">📂 ${T("Khôi phục","Restore")}</button></div><input type="file" id="bf" accept=".json,application/json" hidden onchange="importData(this.files[0]);this.value=''"><div class="note" id="bmsg" hidden></div>`}
function idb(mode,fn){return new Promise((res,rej)=>{try{const r=indexedDB.open("bhv",1);r.onupgradeneeded=()=>r.result.createObjectStore("rec");r.onerror=()=>rej(r.error);r.onsuccess=()=>{const tx=r.result.transaction("rec",mode),q=fn(tx.objectStore("rec"));tx.oncomplete=()=>res(q&&q.result);tx.onerror=()=>rej(tx.error)}}catch(e){rej(e)}})}
let rt="num",rl="vi",mr=null;
const RMAX=2*1024*1024,RTOT=40*1024*1024,recTotal=()=>Object.values(RECSZ).reduce((a,b)=>a+b,0);
const chunks=t=>t.split(/[.!?]+\s*/).map(s=>s.trim()).filter(Boolean);
const MSGS=l=>[...new Set([...PR,...ER].flatMap(p=>chunks(p[l==="vi"?0:1])))];
const recItems=()=>rt=="num"?[...Array(21).keys()].map(i=>rl=="vi"?NV[i]:NE[i]):rt=="let"?LET.map((L,i)=>rl=="vi"?LV[i]:L):rt=="msg"?MSGS(rl):rl=="vi"?[...new Set([...Object.keys(OBJ).map(k=>OBJ[k].vi),...VT.map(s=>s.split("|")[2])])]:Object.keys(OBJ).map(k=>OBJ[k].en);
async function putRec(k,bl){await idb("readwrite",s=>s.put({k,b:bl},k));if(REC[k])URL.revokeObjectURL(REC[k]);REC[k]=URL.createObjectURL(bl);RECSZ[k]=bl.size}
function recS(){const it=recItems();
 m.innerHTML=`<div class="row"><button class="pill" onclick="go('parent')">← ${T("Phụ huynh","Parents")}</button></div><h2>🎙 ${T("Giọng bố mẹ","Your voice")}</h2><p id="rmsg">${T("Chạm 🎙 để thu, ⏹ để dừng, 📁 để chọn file âm thanh","Tap 🎙 to record, ⏹ to stop, 📁 to pick an audio file")}</p><div class="chips">${[["num","Số"],["let","Chữ"],["obj","Hình"],["msg","Lời khen"]].map(([k,x])=>`<button class="pill${rt==k?" on":""}" onclick="rt='${k}';recS()">${x}</button>`).join("")}${["vi","en"].map(l=>`<button class="pill${rl==l?" on":""}" onclick="rl='${l}';recS()">${l.toUpperCase()}</button>`).join("")}</div><div class="note"><b>📁 Nhập nhiều file âm thanh</b> (MP3, M4A, WAV, OGG; tối đa 2 MB mỗi file, tổng 40 MB). Đặt tên file theo mẫu <b>vi_từ.mp3</b> hoặc <b>en_từ.mp3</b>, ví dụ <b>vi_hai.mp3</b>, <b>vi_quả táo.mp3</b>, <b>en_apple.mp3</b>. Từ không khớp sẽ được báo lại.<small>Đã dùng ${(recTotal()/1048576).toFixed(1)} / 40 MB</small><button class="pill" onclick="document.getElementById('rbulk').click()">📁 ${T("Chọn nhiều file","Choose files")}</button></div><input type="file" id="rbulk" multiple accept="audio/*,.mp3,.m4a,.aac,.wav,.ogg,.oga,.opus,.webm" hidden onchange="bulkAudio(this.files);this.value=''">${it.map(x=>{const k=rl+"|"+x;return`<div class="rr"><b>${esc(x)}</b><span><button class="pill" data-k="${esc(k)}" data-a="r">🎙</button><button class="pill" data-k="${esc(k)}" data-a="f">📁</button>${REC[k]?`<button class="pill" data-k="${esc(k)}" data-a="p">▶</button><button class="pill" data-k="${esc(k)}" data-a="d">✖</button>`:""}</span></div>`}).join("")}`;
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
let readTab="spell",curC="b",curV="a",curLes=1,curStory=0;
function readL(tab){
  if(tab)readTab=tab;
  const tabs=[["spell","🔤 Ghép tiếng","Spelling"],["lessons","📚 28 Bài Vần","Phonics"],["stories","📖 Tập đọc trơn","Stories"]];
  let body="";
  if(readTab==="spell"){
    const cObj=VN_SPELL.C.find(x=>x.c===curC)||VN_SPELL.C[0];
    const vObj=VN_SPELL.V.find(x=>x.v===curV)||VN_SPELL.V[0];
    const syls=[0,1,2,3,4,5].map(t=>VN_SPELL.syl(cObj,vObj,t));
    const curSyl=syls[0];
    body=`<div class="spell-board">
      <div class="spell-head"><span>${cObj.c}</span><span style="color:var(--acc2)">+</span><span>${vObj.v}</span><span style="color:var(--ok)">=</span><span style="font-size:1.15em;text-decoration:underline">${curSyl.text}</span></div>
      <div class="spell-sub">🔊 Đánh vần: <b>${curSyl.spell}</b></div>
      <div class="syl-grid">
        ${syls.map((s,idx)=>`<button class="syl-btn" onclick="say('${s.spell}','${s.text}');rp(this)"><b class="n" style="font-size:30px">${s.text}</b><small>${VN_SPELL.TONES[idx].n}</small></button>`).join("")}
      </div>
    </div>
    <div style="margin:8px 0 2px"><b>1. Chọn Phụ âm:</b></div>
    <div class="chips">${VN_SPELL.C.map(x=>`<button class="chip ${x.c===curC?"on":""}" style="width:auto;min-width:44px;border-radius:16px;padding:0 8px;font-size:22px" onclick="curC='${x.c}';readL()">${x.c}</button>`).join("")}</div>
    <div style="margin:8px 0 2px"><b>2. Chọn Nguyên âm:</b></div>
    <div class="chips">${VN_SPELL.V.map(x=>`<button class="chip ${x.v===curV?"on":""}" style="width:44px;height:44px;font-size:22px" onclick="curV='${x.v}';readL()">${x.v}</button>`).join("")}</div>`;
    say(`Ghép chữ ${cObj.c} và ${vObj.v}`,`Spell ${cObj.c} and ${vObj.v}`);
  }else if(readTab==="lessons"){
    const L=VN_LESSONS.find(x=>x.id===curLes)||VN_LESSONS[0];
    body=`<div class="chips" style="max-height:85px;overflow-y:auto;padding:2px">${VN_LESSONS.map(l=>`<button class="pill ${l.id===curLes?"on":""}" style="font-size:16px;padding:2px 8px" onclick="curLes=${l.id};readL()">${l.id<=10?"Âm "+l.id:l.id===11?"Ôn tập":"Bài "+l.id}</button>`).join("")}</div>
    <div class="lesson-card">
      <h3 style="margin:4px 0 8px;font-size:22px;color:var(--acc)">${L.title}</h3>
      <div style="font-weight:800;margin-bottom:4px">Vần / Âm đọc:</div>
      <div class="rhyme-chips">${L.rhymes.map(r=>`<button class="rhyme-chip" onclick="say('Vần ${r}. ${r}','${r}');rp(this)">${r}</button>`).join("")}</div>
      <div style="font-weight:800;margin:8px 0 4px">Từ ngữ ứng dụng:</div>
      <div class="words-grid">${L.words.map(w=>`<button class="word-btn" onclick="say('${w}','${w}');rp(this)">${w}</button>`).join("")}</div>
      <div style="font-weight:800;margin:8px 0 4px">Câu luyện đọc:</div>
      <div class="story-box" style="margin:4px 0;font-size:20px;cursor:pointer" onclick="say('${L.sentence}','${L.sentence}')">
        🔊 “${L.sentence}”
      </div>
    </div>`;
    say(L.title, L.title);
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
  m.innerHTML=`<div class="row"><button class="pill" onclick="go('home')">← Menu</button></div>
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
let curCat="vn",curStoryPage=1,curStorySearch="",readingStory=null,storyPlay=false;

function storyL(catId, page, search){
  if(catId)curCat=catId;
  if(page!==undefined)curStoryPage=page;
  if(search!==undefined)curStorySearch=search;
  storyPlay=false;A.pause();if(SS)SS.cancel();

  const catalog=(typeof STORY_CATALOG!=="undefined"&&STORY_CATALOG.length)?STORY_CATALOG:FAIRY_STORIES;
  const cat=FAIRY_CATEGORIES.find(c=>c.id===curCat)||FAIRY_CATEGORIES[0];

  let list=[];
  const q=(curStorySearch||"").trim();
  if(q){
    const nq=normStr(q);
    list=catalog.filter(s=>normStr(s.title).includes(nq)||normStr(s.summary).includes(nq));
  } else {
    list=catalog.filter(s=>s.cat===curCat);
  }

  const pageSize=12;
  const totalPages=Math.max(1,Math.ceil(list.length/pageSize));
  if(curStoryPage>totalPages)curStoryPage=totalPages;
  if(curStoryPage<1)curStoryPage=1;

  const startIdx=(curStoryPage-1)*pageSize;
  const pageItems=list.slice(startIdx,startIdx+pageSize);
  const getCatCount=cId=>catalog.filter(s=>s.cat===cId).length;

  window.onStorySearch=function(val){
    curStorySearch=val;
    curStoryPage=1;
    storyL(curCat,1,val);
  };
  window.storyGoPage=function(p){
    storyL(curCat,p,curStorySearch);
  };

  m.innerHTML=`<div class="row"><button class="pill" onclick="go('home')">← Menu</button></div>
  <h2>${T("Truyện cổ tích & Kể bé nghe","Fairy Tales & Stories")}</h2>

  <div class="story-search-wrap">
    <input type="search" class="story-search" id="stSearchInput" placeholder="🔍 Tìm kiếm trong 1.603 truyện..." value="${esc(curStorySearch)}" oninput="clearTimeout(window.__stTimer);window.__stTimer=setTimeout(()=>window.onStorySearch(this.value),200)">
    ${curStorySearch?`<button class="pill" onclick="window.onStorySearch('')" style="padding:4px 12px">✖</button>`:""}
  </div>

  <div class="chips" style="margin-bottom:10px">
    ${FAIRY_CATEGORIES.map(c=>`
      <button class="pill${c.id===curCat&&!curStorySearch?" on":""}" onclick="curStorySearch='';storyL('${c.id}',1,'')">
        ${c.icon} ${T(c.name,c.en)} (${getCatCount(c.id)})
      </button>
    `).join("")}
  </div>

  <div style="font-size:15px;opacity:.85;margin-bottom:8px">
    ${curStorySearch?`🔍 Tìm thấy <b>${list.length}</b> truyện cho "<em>${esc(curStorySearch)}</em>"`:`${cat.desc} · <span style="color:var(--acc);font-weight:700">truyencotich.top</span>`}
  </div>

  ${list.length===0?`<div style="padding:30px;opacity:.7;font-size:20px">Không tìm thấy truyện nào. Bé thử tìm từ khóa khác nhé!</div>`:""}

  <div style="display:flex;flex-direction:column;gap:10px">
    ${pageItems.map(s=>{
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
              ${isAudio?`<span class="story-badge audio">🎙️ Có kể truyện audio & bài học</span>`:`<span class="story-badge cat">📖 Tóm tắt & Đọc thêm</span>`}
            </div>
          </div>
          <button class="pill" style="font-size:15px;padding:6px 12px;margin:0;flex-shrink:0">${isAudio?"Kể chuyện ❯":"Xem truyện ❯"}</button>
        </div>
      `;
    }).join("")}
  </div>

  ${totalPages>1?`
    <div class="story-page-ctrl">
      <button class="story-page-btn" onclick="storyGoPage(1)" ${curStoryPage<=1?"disabled":""}>⏮ Đầu</button>
      <button class="story-page-btn" onclick="storyGoPage(${curStoryPage-1})" ${curStoryPage<=1?"disabled":""}>◀ Trước</button>
      <span style="font-size:16px;font-weight:700">Trang 
        <select class="story-page-select" onchange="storyGoPage(+this.value)">
          ${Array.from({length:totalPages},(_,i)=>`<option value="${i+1}" ${i+1===curStoryPage?"selected":""}>${i+1} / ${totalPages}</option>`).join("")}
        </select>
      </span>
      <button class="story-page-btn" onclick="storyGoPage(${curStoryPage+1})" ${curStoryPage>=totalPages?"disabled":""}>Sau ▶</button>
      <button class="story-page-btn" onclick="storyGoPage(${totalPages})" ${curStoryPage>=totalPages?"disabled":""}>Cuối (${totalPages}) ⏭</button>
    </div>
  `:""}`;

  if(!curStorySearch)say(cat.name,cat.en);
}

function storyDetail(id){
  storyPlay=false;A.pause();if(SS)SS.cancel();
  const catalog=(typeof STORY_CATALOG!=="undefined"&&STORY_CATALOG.length)?STORY_CATALOG:FAIRY_STORIES;
  const s=catalog.find(x=>x.id===id);
  if(!s){storyL();return;}

  const curated=FAIRY_STORIES.find(fs=>fs.id===s.id||fs.title.toLowerCase()===s.title.toLowerCase());
  if(curated){storyRead(curated.id);return;}

  const cat=FAIRY_CATEGORIES.find(c=>c.id===s.cat)||FAIRY_CATEGORIES[0];
  m.innerHTML=`<div class="row">
    <button class="pill" onclick="go('storyL','${s.cat}')">← ${T("Danh sách truyện","Story list")}</button>
  </div>
  <div class="story-view">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <span style="font-size:48px">${cat.icon}</span>
      <div>
        <h2 style="margin:0;cursor:default;color:var(--acc)">${esc(s.title)}</h2>
        <small style="opacity:.8;font-size:15px">Nguồn: truyencotich.top · ${T(cat.name,cat.en)}</small>
      </div>
    </div>
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

function storyRead(id){
  const s=FAIRY_STORIES.find(x=>x.id===id)||FAIRY_STORIES[0];
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
  m.innerHTML=`<div class="row"><button class="pill" onclick="window.__stopStory();go('storyL','${s.cat}')">← ${T("Danh sách truyện","Story list")}</button></div>
  <div class="story-view">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:48px">${s.icon}</span>
      <div>
        <h2 style="margin:0;cursor:default;color:var(--acc)">${s.title}</h2>
        <small style="opacity:.8;font-size:15px">Nguồn: truyencotich.top · ${T(FAIRY_CATEGORIES.find(c=>c.id===s.cat).name,FAIRY_CATEGORIES.find(c=>c.id===s.cat).en)}</small>
      </div>
    </div>
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
const V={home,numL,numP,letL,letD,letP,cmp,games,mis,cmpS,match,mem,trace,gate,parent,rec:recS,readL,math10,storyL,storyRead,storyDetail};
const LAZY={s:"img-s.js",o:"img-o.js"},LP={};
function need(k){if(window["__"+k])return Promise.resolve(true);if(LP[k])return LP[k];
 return LP[k]=new Promise(res=>{const s=document.createElement("script");s.src=LAZY[k];s.onload=()=>res(true);s.onerror=()=>{delete LP[k];s.remove();res(false)};document.head.appendChild(s)})}
function upSpr(){m.querySelectorAll("img.spf").forEach(e=>{const k=e.dataset.sk;if(!I["s_"+k])return;const s=document.createElement("span");s.className="spr";s.style.cssText=`--z:${e.dataset.z};background-image:url(${I["s_"+k]})`;e.replaceWith(s)})}
const SFX=()=>ls.get("sfx","1")!=="0";
const rmOn=()=>{const p=ls.get("rm","auto");return p==="1"||(p==="auto"&&!!window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)};
const applyRM=()=>document.documentElement.classList.toggle("rm",rmOn());
const togSfx=()=>{ls.set("sfx",SFX()?"0":"1");parent()};
const togRM=()=>{const p=ls.get("rm","auto");ls.set("rm",p==="auto"?"1":p==="1"?"0":"auto");applyRM();parent()};
const MINW=2000,PAUSE=700,MAXW=30000;
function adv(fn){const my=sc,t0=Date.now();(function chk(){if(sc!==my)return;const n=Date.now();if(n-t0>=MAXW||(n-t0>=MINW&&!busy&&n-busyEnd>=PAUSE))fn();else setTimeout(chk,150)})()}
const VIHELP="Cách xử lý: cài giọng tiếng Việt cho máy, hoặc dùng “Thu giọng bố mẹ” / nhập file âm thanh. Android: Cài đặt → Quản lý chung (hoặc Hệ thống) → Ngôn ngữ → Chuyển văn bản thành giọng nói → Cài đặt dữ liệu giọng nói → Tiếng Việt. iPhone/iPad: Cài đặt → Trợ năng → Nội dung đã đọc → Giọng nói → Tiếng Việt. Windows: Cài đặt → Thời gian & ngôn ngữ → Giọng nói → Thêm giọng nói. Tên menu có thể khác tùy máy.";
function testVi(){const o=lang;lang="vi";say("Xin chào bé. Mình cùng học nhé","Hello");lang=o}
const bm=t=>{const e=document.getElementById("bmsg");if(e){e.textContent=t;e.hidden=false}};
const b2d=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(b)});
const LSK=["stars","st","lvl","lang","rate2","auto","ad","sfx","rm","trm"];
const LSV={stars:/^\d{1,9}$/,lvl:/^[123]$/,lang:/^(vi|en|both)$/,rate2:/^\d?\.?\d{1,3}$/,auto:/^[01]$/,ad:/^\d{1,3},\d{1,3}$/,sfx:/^[01]$/,rm:/^(auto|0|1)$/,trm:/^(up|lo|nu)$/};
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
