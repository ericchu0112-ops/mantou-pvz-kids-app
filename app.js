/* ============================================================
   馒头幼小衔接（植物大战僵尸版） — app logic
   ============================================================ */

/* ---------------- Small SVG art library (original, no third-party game assets) ---------------- */
const ART = {
  sun(){
    const rays = Array.from({length:8},(_,i)=>`<rect x="47" y="1" width="6" height="15" rx="3" fill="url(#sunG)" transform="rotate(${i*45} 50 50)"/>`).join('');
    return `<defs><radialGradient id="sunG" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff3b0"/><stop offset="1" stop-color="#ffb400"/></radialGradient></defs>
      ${rays}<circle cx="50" cy="50" r="27" fill="url(#sunG)"/><circle cx="41" cy="41" r="4" fill="#fff8e1" opacity=".7"/>`;
  },
  eye(x,y,r,lookX,lookY){
    r = r||8;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#00000014" stroke-width="0.6"/><circle cx="${x+(lookX||0)}" cy="${y+(lookY||1.5)}" r="${r*0.46}" fill="#26261f"/><circle cx="${x+(lookX||0)-r*0.18}" cy="${y+(lookY||1.5)-r*0.18}" r="${r*0.14}" fill="#fff" opacity=".85"/>`;
  },
  brand(){
    return `<defs><radialGradient id="bfPetal" cx="50%" cy="35%" r="65%"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffb400"/></radialGradient></defs>
      ${Array.from({length:10},(_,i)=>`<ellipse cx="50" cy="24" rx="8" ry="17" fill="url(#bfPetal)" transform="rotate(${i*36} 50 50)"/>`).join('')}
      <circle cx="50" cy="50" r="19" fill="#7a5230"/>
      ${ART.eye(44,48,6.5,0,1.6)}${ART.eye(58,48,6.5,0,1.6)}
      <path d="M43 58 Q50 64 57 58" stroke="#2b1c0d" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  },
  sunflower(){
    const petals = Array.from({length:12},(_,i)=>`<ellipse cx="50" cy="20" rx="7" ry="16" fill="url(#sfPetal)" transform="rotate(${i*30} 50 50)"/>`).join('');
    return `<defs>
        <linearGradient id="sfStem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fbf58"/><stop offset="1" stop-color="#3f8f3a"/></linearGradient>
        <radialGradient id="sfPetal" cx="50%" cy="35%" r="65%"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffb400"/></radialGradient>
        <radialGradient id="sfCenter" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#e8ad4e"/></radialGradient>
      </defs>
      <path d="M50 62 Q46 82 50 97" stroke="url(#sfStem)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M50 80 Q36 76 29 85" stroke="#4f9a45" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M50 76 Q64 72 73 79" stroke="#4f9a45" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g>${petals}</g>
      <circle cx="50" cy="50" r="22" fill="url(#sfCenter)"/>
      ${ART.eye(42,47,7.5,0.5,2)}${ART.eye(58,47,7.5,0.5,2)}
      <path d="M41 58 Q50 66 59 58" stroke="#8a5a2b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="34" cy="58" r="4" fill="#ffb4a0" opacity=".55"/><circle cx="66" cy="58" r="4" fill="#ffb4a0" opacity=".55"/>`;
  },
  peashooter(bodyColor){
    const c1 = bodyColor==='ice' ? ['#bfe9f7','#5fb8d6'] : ['#8fd35a','#4f9a3a'];
    return `<defs>
        <linearGradient id="psPot${bodyColor||''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#9c631f"/></linearGradient>
        <linearGradient id="psBody${bodyColor||''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1[0]}"/><stop offset="1" stop-color="${c1[1]}"/></linearGradient>
      </defs>
      <path d="M32 88 L68 88 L62 99 L38 99 Z" fill="url(#psPot${bodyColor||''})"/>
      <rect x="46" y="58" width="8" height="32" fill="${c1[1]}"/>
      <path d="M50 28 C33 28 29 45 33 57 C35 66 44 70 50 70 C56 70 65 66 67 57 C71 45 67 28 50 28 Z" fill="url(#psBody${bodyColor||''})"/>
      <ellipse cx="50" cy="33" rx="12" ry="9" fill="${c1[1]}"/>
      <circle cx="50" cy="32" r="6" fill="${bodyColor==='ice'?'#e8f8fd':'#8fd35a'}"/>
      ${ART.eye(41,53,6,0.5,1.6)}${ART.eye(59,53,6,0.5,1.6)}
      <path d="M43 63 Q50 67 57 63" stroke="#2c6b28" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M40 82 Q29 78 23 85" stroke="${c1[1]}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M60 82 Q71 78 77 85" stroke="${c1[1]}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  },
  repeater(){
    return `<defs>
        <linearGradient id="rpPot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#9c631f"/></linearGradient>
        <linearGradient id="rpBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd35a"/><stop offset="1" stop-color="#4f9a3a"/></linearGradient>
      </defs>
      <path d="M30 88 L70 88 L64 99 L36 99 Z" fill="url(#rpPot)"/>
      <rect x="44" y="60" width="7" height="30" fill="#4f9a3a"/>
      <rect x="56" y="60" width="7" height="26" fill="#4f9a3a"/>
      <path d="M44 30 C29 30 26 45 30 56 C32 63 40 67 46 67 C51 67 58 63 60 56 C63 45 60 30 44 30 Z" fill="url(#rpBody)"/>
      <path d="M60 36 C50 36 48 48 51 57 C53 62 59 65 64 65 C68 65 74 62 76 57 C78 48 74 36 60 36 Z" fill="url(#rpBody)"/>
      <circle cx="44" cy="34" r="5" fill="#8fd35a"/><circle cx="64" cy="40" r="4.4" fill="#8fd35a"/>
      ${ART.eye(37,49,5.4,0.4,1.4)}${ART.eye(49,49,5.4,0.4,1.4)}
      <path d="M39 58 Q44 61 49 58" stroke="#2c6b28" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  },
  wallnut(){
    return `<defs><radialGradient id="wnBody" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#e8c08a"/><stop offset="1" stop-color="#a9793f"/></radialGradient></defs>
      <ellipse cx="50" cy="55" rx="35" ry="39" fill="url(#wnBody)"/>
      <path d="M28 42 Q50 31 72 42" stroke="#8a5f30" stroke-width="3" fill="none" opacity=".5"/>
      <path d="M25 62 Q50 71 75 62" stroke="#8a5f30" stroke-width="3" fill="none" opacity=".5"/>
      ${ART.eye(39,49,7,0.5,1.8)}${ART.eye(61,49,7,0.5,1.8)}
      <path d="M37 64 Q50 74 63 64" stroke="#7a5230" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  zombie(kind){
    const hat = kind==='cone' ? `<path d="M50 4 L63 25 L37 25 Z" fill="#ff8a3d"/><ellipse cx="50" cy="25" rx="13" ry="3" fill="#e06b1f"/>`
      : kind==='bucket' ? `<path d="M37 6 L63 6 L60 25 L40 25 Z" fill="#a7adb3"/><ellipse cx="50" cy="6" rx="13" ry="3" fill="#888e94"/>`
      : `<path d="M34 25 Q40 12 50 14 Q60 12 66 25" fill="none" stroke="#5c7a4d" stroke-width="3" opacity=".6"/>`;
    return `<defs><linearGradient id="zSkin${kind||''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c294"/><stop offset="1" stop-color="#7a9a68"/></linearGradient></defs>
      <path d="M20 66 Q30 58 39 63" stroke="url(#zSkin${kind||''})" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M80 66 Q70 58 61 63" stroke="url(#zSkin${kind||''})" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M39 60 L35 96 L65 96 L61 60 Z" fill="#4a4038"/>
      <path d="M39 60 L41 74 L35 96 L45 96 L48 66 Z" fill="#5a4f45"/>
      <rect x="37" y="32" width="26" height="30" rx="9" fill="url(#zSkin${kind||''})"/>
      <circle cx="50" cy="29" r="19" fill="url(#zSkin${kind||''})"/>
      ${hat}
      ${ART.eye(43,28,6,1.6,1.8)}${ART.eye(57,28,6,-1.6,1.8)}
      <path d="M40 39 Q50 35 60 39" stroke="#2b2b2b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <rect x="45" y="39" width="3.4" height="4" fill="#f4f2e8"/><rect x="51.6" y="39" width="3.4" height="4" fill="#f4f2e8"/>`;
  }
};
function svgOf(innerFn, ...args){ return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${innerFn(...args)}</svg>`; }

/* ---------------- Global sun currency ---------------- */
const state = { sun: 0 };
const sunCountEl = document.getElementById('sunCount');
const sunBadgeEl = document.getElementById('sunBadge');
document.getElementById('sunIcon').innerHTML = ART.sun();
document.getElementById('brandMark').innerHTML = ART.brand();

function initSun(){
  const saved = parseInt(localStorage.getItem('mantou_sun'));
  state.sun = isNaN(saved) ? 150 : saved;
  renderSun();
}
function saveSun(){ localStorage.setItem('mantou_sun', state.sun); }
function renderSun(){ sunCountEl.textContent = state.sun; }
function addSun(n, fromEl){
  state.sun += n; if(state.sun<0) state.sun = 0;
  saveSun(); renderSun();
  if(n>0) floatSun(n, fromEl);
}
function floatSun(n, fromEl){
  const rect = (fromEl||sunBadgeEl).getBoundingClientRect();
  const el = document.createElement('div');
  el.className='sun-float';
  el.textContent = (n>0?'+':'') + n + ' ☀️';
  el.style.left = (rect.left + rect.width/2 - 20) + 'px';
  el.style.top = (rect.top) + 'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 900);
}

/* ---------------- Speech ---------------- */
function speak(text, lang){
  if(!('speechSynthesis' in window)) return;
  lang = lang || 'zh-CN';
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = lang.indexOf('en')===0 ? 0.92 : 0.85;
  window.speechSynthesis.speak(u);
}

/* ---------------- Quiz helper shared by all modules ---------------- */
const PRAISE = ['🎉 太棒了，答对啦！','👍 真厉害！','✨ 完全正确！','🌟 你真聪明！','💯 一次就对！'];
const ENCOURAGE = ['再想一想，试试别的答案～','别着急，再看看提示～','差一点，加油再试一次！','没关系，我们再来一次～'];
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function setFeedback(ok, msg){
  const el = document.getElementById('quizFeedback');
  if(!el) return;
  el.textContent = msg;
  el.classList.toggle('wrong', !ok);
}
function mountQuiz(container, options, correctValue, {nextFn, sunReward=5}={}){
  container.innerHTML = options.map(o=>`<button data-v="${String(o.value).replace(/"/g,'&quot;')}">${o.label}</button>`).join('');
  setFeedback(true, '');
  container.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const ok = b.dataset.v === String(correctValue);
      b.classList.add(ok?'correct':'wrong');
      setFeedback(ok, ok?pick(PRAISE):pick(ENCOURAGE));
      if(ok){ addSun(sunReward, container); if(nextFn) setTimeout(nextFn, 900); }
    }, {once:true});
  });
}
function shuffled(arr){ return arr.slice().sort(()=>Math.random()-0.5); }
function uniquePush(arr, val, pool, max){
  while(arr.length<max){
    const cand = pool();
    if(!arr.includes(cand)) arr.push(cand);
  }
  return arr;
}

/* ---------------- Router ---------------- */
const contentEl = document.getElementById('content');
let stopCurrentModule = null;
function showModule(name){
  if(typeof stopCurrentModule === 'function'){ stopCurrentModule(); stopCurrentModule = null; }
  document.querySelectorAll('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.mod===name));
  contentEl.innerHTML = '';
  const map = {home:renderHome, pinyin:renderPinyin, math:renderMath, time:renderTime, shapes:renderShapes,
    english:renderEnglish, poems:renderPoems, logic:renderLogic, attention:renderAttention,
    safety:renderSafety, write:renderWrite, game:renderGame};
  (map[name]||renderHome)();
}
document.querySelectorAll('.nav-btn').forEach(b=> b.addEventListener('click', ()=> showModule(b.dataset.mod)));

/* ================= 首页 ================= */
function renderHome(){
  const items = [
    ['pinyin','🔤','拼音天地'],['math','🔢','数学乐园'],['time','⏰','时间认知'],['shapes','🔷','几何图形'],
    ['english','🐝','英语启蒙'],['poems','📖','古诗诵读'],['logic','🧩','逻辑思维'],['attention','🎯','专注力'],
    ['safety','🛡️','安全教育'],['write','✍️','写字练习'],['game','🧟','植物大战僵尸']
  ];
  contentEl.innerHTML = `
    <h2>👋 欢迎来到馒头的乐园！</h2>
    <div class="hint">答对拼音、数学、时间等小问题可以获得 <b>☀️阳光</b>，阳光可以在「植物大战僵尸」小游戏里种植物打僵尸哦！</div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr));">
      ${items.map(([k,ic,lb])=>`<div class="card" data-go="${k}"><div class="big">${ic}</div><div class="lbl">${lb}</div></div>`).join('')}
    </div>`;
  contentEl.querySelectorAll('.card').forEach(c=> c.addEventListener('click', ()=> showModule(c.dataset.go)));
}

/* ================= 拼音天地 ================= */
// [声母/韵母, 呼读音（教材标准读法，带声调）, 配套例字]
const REAL_AUDIO = {}; // 预留：找到真人录音后填 {呼读音或例字: '音频文件路径'}
const INITIALS = [['b','bō','爸'],['p','pō','皮'],['m','mō','妈'],['f','fō','飞'],['d','dē','大'],['t','tē','天'],['n','nē','你'],['l','lē','拉'],
  ['g','gē','哥'],['k','kē','看'],['h','hē','河'],['j','jī','鸡'],['q','qī','七'],['x','xī','西'],
  ['zh','zhī','猪'],['ch','chī','车'],['sh','shī','山'],['r','rī','人'],['z','zī','字'],['c','cī','草'],['s','sī','三'],['y','yī','鱼'],['w','wū','我']];
const FINALS = [['a','ā','啊'],['o','ō','哦'],['e','ē','鹅'],['i','yī','衣'],['u','wū','屋'],['ü','yū','雨'],
  ['ai','āi','爱'],['ei','ēi','黑'],['ui','wēi','对'],['ao','āo','好'],['ou','ōu','猴'],['iu','yōu','牛'],
  ['ie','yē','姐'],['üe','yuē','月'],['er','ēr','耳'],['an','ān','伞'],['en','ēn','门'],['in','yīn','心'],
  ['un','wēn','春'],['ün','yūn','裙'],['ang','āng','糖'],['eng','ēng','灯'],['ing','yīng','星'],['ong','wēng','熊']];
function speakSyllableThenChar(reading, ch){
  playAudioOrSpeak(reading);
  setTimeout(()=> playAudioOrSpeak(ch), 750);
}
function playAudioOrSpeak(text, lang){
  if(REAL_AUDIO[text]){ const a = new Audio(REAL_AUDIO[text]); a.play(); return; }
  speak(text, lang);
}
let pinyinState = { section:'initials' };
function renderPinyin(){
  contentEl.innerHTML = `
    <h2>🔤 拼音天地</h2>
    <div class="hint">💡 点击卡片先听标准读音（比如 b 读 "bō"），再听一个例字帮助记忆（bō — 爸）～</div>
    <div class="section-tabs">
      <button data-sec="initials" class="active">一、声母（23个）</button>
      <button data-sec="finals">二、韵母（24个）</button>
    </div>
    <div class="grid" id="pyGrid"></div>
    <div class="quiz-box">
      <h3>🎧 听音辨字小游戏</h3>
      <div style="text-align:center;font-size:44px;margin:6px 0;" id="pyQuizChar"></div>
      <button class="playBtn" id="pyPlayBtn">🔊 播放发音</button>
      <div class="quiz-options" id="pyOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  contentEl.querySelectorAll('.section-tabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      contentEl.querySelectorAll('.section-tabs button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); pinyinState.section = b.dataset.sec;
      drawPinyinGrid(); newPinyinQuiz();
    });
  });
  drawPinyinGrid();
  document.getElementById('pyPlayBtn').addEventListener('click', ()=> speakSyllableThenChar(pinyinState.quizReading, pinyinState.quizChar));
  newPinyinQuiz();
}
function drawPinyinGrid(){
  const data = pinyinState.section==='initials' ? INITIALS : FINALS;
  const grid = document.getElementById('pyGrid');
  grid.innerHTML = data.map(([l,reading,ch])=>`<div class="card" data-reading="${reading}" data-ch="${ch}"><div class="big">${l}</div><div class="lbl">${reading} · 例字：${ch}</div></div>`).join('');
  grid.querySelectorAll('.card').forEach(c=> c.addEventListener('click', ()=> speakSyllableThenChar(c.dataset.reading, c.dataset.ch)));
}
function newPinyinQuiz(){
  const data = pinyinState.section==='initials' ? INITIALS : FINALS;
  const correct = data[Math.floor(Math.random()*data.length)];
  const opts = [correct];
  uniquePush(opts, correct, ()=>data[Math.floor(Math.random()*data.length)], 4);
  pinyinState.quizReading = correct[1];
  pinyinState.quizChar = correct[2];
  document.getElementById('pyQuizChar').textContent = correct[2];
  mountQuiz(document.getElementById('pyOptions'), shuffled(opts).map(([l])=>({value:l,label:l})), correct[0], {nextFn:newPinyinQuiz});
  speakSyllableThenChar(correct[1], correct[2]);
}

/* ================= 数学乐园 ================= */
const MATH_ICONS = ['🌻','🍎','🍓','🐝','🌰'];
const NUM_CN = ['零','一','二','三','四','五','六','七','八','九','十'];
let mathState = { section:'arith' };
function renderMath(){
  contentEl.innerHTML = `
    <h2>🔢 数学乐园</h2>
    <div class="hint">💡 不确定答案时先点"提示"，跟着一个一个数，比直接猜答案学得更牢！</div>
    <div class="section-tabs">
      <button data-sec="arith" class="active">一、算一算</button>
      <button data-sec="count">二、数一数</button>
    </div>
    <div id="mathVisual" style="font-size:34px;letter-spacing:6px;min-height:56px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;"></div>
    <div id="numberLine" style="margin:14px 0;"></div>
    <div style="margin-bottom:10px;"><button class="playBtn" id="hintBtn">💡 提示：一个一个数</button></div>
    <div class="quiz-box">
      <h3 id="mathQ"></h3>
      <div class="quiz-options" id="mathOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  contentEl.querySelectorAll('.section-tabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      contentEl.querySelectorAll('.section-tabs button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); mathState.section = b.dataset.sec;
      newMathQuiz();
    });
  });
  newMathQuiz();
}
function newMathQuiz(){
  if(mathState.section==='count') newCountQuiz(); else newArithQuiz();
}
function drawNumberLine(from, to){
  const w=320,pad=16,step=(w-pad*2)/10;
  const x = n => pad+n*step;
  let ticks = Array.from({length:11},(_,n)=>`<line x1="${x(n)}" y1="20" x2="${x(n)}" y2="30" stroke="#c9c2a8" stroke-width="2"/><text x="${x(n)}" y="46" text-anchor="middle" font-size="12" fill="#8a8578">${n}</text>`).join('');
  const dir = to>=from ? 1 : -1;
  const midX = (x(from)+x(to))/2, arcY = 20-Math.min(24,Math.abs(x(to)-x(from))*0.35);
  const arc = `<path d="M${x(from)} 18 Q${midX} ${arcY} ${x(to)} 18" stroke="#f5b400" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;
  return `<svg viewBox="0 0 ${w} 50" width="100%" style="max-width:340px;height:56px;">
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f5b400"/></marker></defs>
    <line x1="${pad}" y1="25" x2="${w-pad}" y2="25" stroke="#e0dac4" stroke-width="2"/>
    ${ticks}
    <circle cx="${x(from)}" cy="25" r="4" fill="#3fa66a"/><circle cx="${x(to)}" cy="25" r="4" fill="#e0503a"/>
    ${arc}
  </svg>`;
}
let mathHintRunning = false;
function runCountHint(iconSel, startAt, endAt, onDone){
  if(mathHintRunning) return;
  mathHintRunning = true;
  const icons = Array.from(document.querySelectorAll(iconSel));
  const seq = []; for(let n=startAt;n<=endAt;n++) seq.push(n);
  let i = 0;
  function step(){
    if(i>=seq.length){ mathHintRunning=false; if(onDone) onDone(); return; }
    const n = seq[i];
    const el = icons[n-1];
    if(el) el.classList.add('counted');
    speak(NUM_CN[n]||String(n));
    i++;
    setTimeout(step, 650);
  }
  step();
}
function newCountQuiz(){
  const icon = pick(MATH_ICONS);
  const count = 2 + Math.floor(Math.random()*9); // 2-10
  document.getElementById('mathVisual').innerHTML = Array.from({length:count},(_,i)=>`<span class="micon" data-n="${i+1}">${icon}</span>`).join('');
  document.getElementById('mathQ').textContent = '数一数，一共有几个？';
  document.getElementById('numberLine').innerHTML = '';
  const opts = [count];
  uniquePush(opts, count, ()=> Math.max(1, count + (Math.floor(Math.random()*5)-2)), 4);
  mountQuiz(document.getElementById('mathOptions'), shuffled(opts).map(n=>({value:n,label:n})), count, {nextFn:newCountQuiz});
  document.getElementById('hintBtn').onclick = ()=>{
    document.querySelectorAll('.micon').forEach(e=>e.classList.remove('counted'));
    runCountHint('.micon', 1, count);
  };
}
function newArithQuiz(){
  const isAdd = Math.random()<0.5;
  let a,b,result,icon=pick(MATH_ICONS);
  if(isAdd){ a=1+Math.floor(Math.random()*8); b=1+Math.floor(Math.random()*(9-a)); result=a+b; }
  else { a=2+Math.floor(Math.random()*9); b=1+Math.floor(Math.random()*a); result=a-b; }
  if(isAdd){
    document.getElementById('mathVisual').innerHTML =
      `<span>${Array.from({length:a},(_,i)=>`<span class="micon" data-n="${i+1}">${icon}</span>`).join('')}</span>` +
      `<span style="margin:0 8px;">+</span>` +
      `<span>${Array.from({length:b},(_,i)=>`<span class="micon" data-n="${a+i+1}">${icon}</span>`).join('')}</span>` +
      `<span style="margin:0 8px;">=</span><span>❓</span>`;
  } else {
    // 单一一堆，用"划掉"的方式演示拿走b个，比两堆分开更贴近减法的实际含义
    document.getElementById('mathVisual').innerHTML =
      `<span>${Array.from({length:a},(_,i)=>`<span class="micon" data-n="${i+1}">${icon}</span>`).join('')}</span>` +
      `<span style="margin:0 8px;">− ${b} =</span><span>❓</span>`;
  }
  document.getElementById('mathQ').textContent = isAdd ? '算一算，加起来一共是几个？' : '算一算，拿走几个后还剩下几个？';
  document.getElementById('numberLine').innerHTML = drawNumberLine(a, result);
  const opts = [result];
  uniquePush(opts, result, ()=> Math.max(0, result + (Math.floor(Math.random()*5)-2)), 4);
  mountQuiz(document.getElementById('mathOptions'), shuffled(opts).map(n=>({value:n,label:n})), result, {nextFn:newArithQuiz});
  document.getElementById('hintBtn').onclick = ()=>{
    document.querySelectorAll('.micon').forEach(e=>e.classList.remove('counted','removed'));
    if(isAdd){
      speak('接着数');
      runCountHint('.micon', 1, result);
    } else {
      let i=0; mathHintRunning=true;
      const removeEls = Array.from(document.querySelectorAll('.micon')).sort((x,y)=> parseInt(y.dataset.n)-parseInt(x.dataset.n)).slice(0,b);
      function step(){
        if(i>=removeEls.length){ mathHintRunning=false; speak('还剩'+NUM_CN[result]); return; }
        removeEls[i].classList.add('removed');
        speak('拿走'+NUM_CN[i+1]);
        i++;
        setTimeout(step, 700);
      }
      step();
    }
  };
}

/* ================= 时间认知 ================= */
let clockState = { hour:9, minute:0, quizAnswer:null };
function renderTime(){
  contentEl.innerHTML = `
    <h2>⏰ 时间认知</h2>
    <div class="hint">💡 拖动指针，或者点击下面的按钮调整时间，看看钟表的变化！大班小朋友先练一练「整点」和「半点」吧～</div>
    <div id="clockWrap">
      <svg id="clockSvg" viewBox="0 0 220 220"></svg>
      <div style="flex:1;min-width:220px;">
        <div class="preset-row">
          <button data-h="3" data-m="0">3:00</button>
          <button data-h="6" data-m="0">6:00</button>
          <button data-h="9" data-m="0">9:00</button>
          <button data-h="12" data-m="0">12:00</button>
          <button data-h="3" data-m="30">3:30</button>
        </div>
        <div class="preset-row"><button class="randBtn" id="randTimeBtn">🎲 随机出题</button></div>
        <div class="quiz-box">
          <h3>钟表上显示的是几点？</h3>
          <div class="quiz-options" id="timeOptions"></div>
          <div id="quizFeedback"></div>
        </div>
      </div>
    </div>`;
  contentEl.querySelectorAll('.preset-row button[data-h]').forEach(b=>{
    b.addEventListener('click', ()=> setClock(parseInt(b.dataset.h), parseInt(b.dataset.m)));
  });
  document.getElementById('randTimeBtn').addEventListener('click', randomClock);
  drawClockFace();
  setClock(clockState.hour, clockState.minute);
  setupClockDrag();
}
function drawClockFace(){
  const svg = document.getElementById('clockSvg');
  let parts = `<circle cx="110" cy="110" r="104" fill="#fffdf7" stroke="#e2ddc9" stroke-width="4"/>`;
  for(let n=1;n<=12;n++){
    const ang = (n/12)*2*Math.PI - Math.PI/2;
    const x = 110 + 82*Math.cos(ang), y = 110 + 82*Math.sin(ang);
    parts += `<text x="${x}" y="${y+7}" text-anchor="middle" font-size="17" font-weight="700" fill="#292722">${n}</text>`;
  }
  for(let n=0;n<60;n+=5){
    const ang=(n/60)*2*Math.PI - Math.PI/2;
    const x1=110+96*Math.cos(ang), y1=110+96*Math.sin(ang);
    const x2=110+101*Math.cos(ang), y2=110+101*Math.sin(ang);
    parts += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c9c2a8" stroke-width="2"/>`;
  }
  parts += `<line id="hourHand" x1="110" y1="110" x2="110" y2="70" stroke="#292722" stroke-width="7" stroke-linecap="round"/>`;
  parts += `<line id="minuteHand" x1="110" y1="110" x2="110" y2="45" stroke="#3fa66a" stroke-width="5" stroke-linecap="round"/>`;
  parts += `<circle cx="110" cy="110" r="6" fill="#f5b400"/>`;
  parts += `<circle id="hourGrip" cx="110" cy="70" r="12" fill="rgba(0,0,0,0)"/>`;
  parts += `<circle id="minGrip" cx="110" cy="45" r="12" fill="rgba(0,0,0,0)"/>`;
  svg.innerHTML = parts;
}
function updateClockHands(){
  const hourDeg = (clockState.hour%12)*30 + clockState.minute*0.5;
  const minDeg = clockState.minute*6;
  document.getElementById('hourHand').setAttribute('transform', `rotate(${hourDeg} 110 110)`);
  document.getElementById('minuteHand').setAttribute('transform', `rotate(${minDeg} 110 110)`);
  const hAng = (hourDeg-90)*Math.PI/180, mAng=(minDeg-90)*Math.PI/180;
  document.getElementById('hourGrip').setAttribute('cx', 110+40*Math.cos(hAng));
  document.getElementById('hourGrip').setAttribute('cy', 110+40*Math.sin(hAng));
  document.getElementById('minGrip').setAttribute('cx', 110+65*Math.cos(mAng));
  document.getElementById('minGrip').setAttribute('cy', 110+65*Math.sin(mAng));
}
function setClock(h,m){ clockState.hour=h; clockState.minute=m; updateClockHands(); newTimeQuiz(); }
function randomClock(){
  const hours=[3,6,9,12,1,2,4,5,7,8,10,11];
  setClock(pick(hours), Math.random()<0.5?0:30);
}
function fmtTime(h,m){ return h + ':' + (m===0?'00':m); }
function newTimeQuiz(){
  const correct = fmtTime(clockState.hour, clockState.minute);
  const opts = [correct];
  uniquePush(opts, correct, ()=> fmtTime(1+Math.floor(Math.random()*12), Math.random()<0.5?0:30), 4);
  clockState.quizAnswer = correct;
  mountQuiz(document.getElementById('timeOptions'), shuffled(opts).map(s=>({value:s,label:s})), correct, {});
}
function setupClockDrag(){
  const svg = document.getElementById('clockSvg');
  let dragging=null;
  function toSvgCoords(clientX, clientY){
    const rect = svg.getBoundingClientRect();
    return { x:(clientX-rect.left)/rect.width*220, y:(clientY-rect.top)/rect.height*220 };
  }
  function angleOf(x,y){ let deg = Math.atan2(y-110, x-110)*180/Math.PI + 90; if(deg<0) deg+=360; return deg; }
  function pointerDown(e){
    const t = e.target;
    if(t.id==='hourGrip' || t.id==='hourHand') dragging='hour';
    else if(t.id==='minGrip' || t.id==='minuteHand') dragging='minute';
    if(dragging) e.preventDefault();
  }
  function pointerMove(e){
    if(!dragging) return;
    const pt = e.touches ? e.touches[0] : e;
    const {x,y} = toSvgCoords(pt.clientX, pt.clientY);
    const deg = angleOf(x,y);
    if(dragging==='minute'){ clockState.minute = Math.round(deg/30)*5 % 60; }
    else { let h = Math.round(deg/30); if(h===0) h=12; if(h>12) h-=12; clockState.hour = h; }
    updateClockHands(); newTimeQuiz();
  }
  function pointerUp(){ dragging=null; }
  svg.addEventListener('mousedown', pointerDown);
  svg.addEventListener('touchstart', pointerDown, {passive:false});
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('touchmove', pointerMove, {passive:false});
  window.addEventListener('mouseup', pointerUp);
  window.addEventListener('touchend', pointerUp);
  stopCurrentModule = ()=>{
    window.removeEventListener('mousemove', pointerMove);
    window.removeEventListener('touchmove', pointerMove);
    window.removeEventListener('mouseup', pointerUp);
    window.removeEventListener('touchend', pointerUp);
  };
}

/* ================= 几何图形 ================= */
const SHAPES = [
  {name:'圆形', sides:'没有边，圆圆的', svg:`<circle cx="55" cy="55" r="45" fill="#66bb6a" stroke="#1b5e20" stroke-width="4"/>`},
  {name:'正方形', sides:'4条一样长的边', svg:`<rect x="14" y="14" width="82" height="82" fill="#4fc3f7" stroke="#01579b" stroke-width="4"/>`},
  {name:'长方形', sides:'4条边，对边一样长', svg:`<rect x="6" y="26" width="98" height="58" fill="#ffb74d" stroke="#e65100" stroke-width="4"/>`},
  {name:'三角形', sides:'3条边，3个角', svg:`<polygon points="55,10 100,95 10,95" fill="#e57373" stroke="#b71c1c" stroke-width="4"/>`},
  {name:'五边形', sides:'5条边，5个角', svg:`<polygon points="55,8 100,42 82,98 28,98 10,42" fill="#ba68c8" stroke="#4a148c" stroke-width="4"/>`},
  {name:'六边形', sides:'6条边，6个角', svg:`<polygon points="30,10 80,10 105,55 80,100 30,100 5,55" fill="#4db6ac" stroke="#004d40" stroke-width="4"/>`},
  {name:'椭圆形', sides:'圆圆扁扁的', svg:`<ellipse cx="55" cy="55" rx="48" ry="32" fill="#f06292" stroke="#880e4f" stroke-width="4"/>`},
  {name:'菱形', sides:'4条边，斜着的正方形', svg:`<polygon points="55,8 100,55 55,102 10,55" fill="#9575cd" stroke="#311b92" stroke-width="4"/>`},
  {name:'星形', sides:'5个尖尖的角', svg:`<polygon points="55,6 68,40 105,40 75,62 87,98 55,76 23,98 35,62 5,40 42,40" fill="#ffd54f" stroke="#e65100" stroke-width="3"/>`}
];
function renderShapes(){
  contentEl.innerHTML = `
    <h2>🔷 几何图形</h2>
    <div class="hint">💡 点击图形卡片，听听它的名字，认一认它长什么样！</div>
    <div class="grid" id="shapeGrid"></div>
    <div class="quiz-box">
      <h3>🔍 这是什么图形？</h3>
      <div style="text-align:center;margin:10px 0;"><svg id="shapeQuizSvg" width="110" height="110" viewBox="0 0 110 110"></svg></div>
      <div class="quiz-options" id="shapeOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  const grid = document.getElementById('shapeGrid');
  grid.innerHTML = SHAPES.map((s,i)=>`<div class="card" data-i="${i}"><svg width="70" height="70" viewBox="0 0 110 110">${s.svg}</svg><div class="lbl">${s.name}</div></div>`).join('');
  grid.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click', ()=>{ const s = SHAPES[c.dataset.i]; speak(s.name + '，' + s.sides); });
  });
  newShapeQuiz();
}
function newShapeQuiz(){
  const correct = pick(SHAPES);
  document.getElementById('shapeQuizSvg').innerHTML = correct.svg;
  const opts = [correct.name];
  uniquePush(opts, correct.name, ()=> pick(SHAPES).name, 4);
  mountQuiz(document.getElementById('shapeOptions'), shuffled(opts).map(n=>({value:n,label:n})), correct.name, {nextFn:newShapeQuiz});
}

/* ================= 英语启蒙 ================= */
const NUM_WORDS = [[1,'One'],[2,'Two'],[3,'Three'],[4,'Four'],[5,'Five'],[6,'Six'],[7,'Seven'],[8,'Eight'],[9,'Nine'],[10,'Ten']];
const COLOR_WORDS = [['Red','#e74c3c'],['Blue','#3498db'],['Yellow','#f1c40f'],['Green','#2ecc71'],['Black','#3d3d3d'],['White','#f7f7f2'],['Orange','#e67e22'],['Purple','#9b59b6']];
let englishState = { section:'numbers' };
function renderEnglish(){
  contentEl.innerHTML = `
    <h2>🐝 英语启蒙</h2>
    <div class="hint">💡 点击卡片可以听英文发音！跟着读一读吧～</div>
    <div class="section-tabs">
      <button data-sec="numbers" class="active">一、数字 Numbers</button>
      <button data-sec="colors">二、颜色 Colors</button>
    </div>
    <div class="grid" id="enGrid"></div>
    <div class="quiz-box">
      <h3>🎧 听音选择</h3>
      <button class="playBtn" id="enPlayBtn">🔊 播放发音</button>
      <div class="quiz-options" id="enOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  contentEl.querySelectorAll('.section-tabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      contentEl.querySelectorAll('.section-tabs button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); englishState.section = b.dataset.sec;
      drawEnglishGrid(); newEnglishQuiz();
    });
  });
  drawEnglishGrid();
  document.getElementById('enPlayBtn').addEventListener('click', ()=> speak(englishState.quizWord, 'en-US'));
  newEnglishQuiz();
}
function drawEnglishGrid(){
  const grid = document.getElementById('enGrid');
  if(englishState.section==='numbers'){
    grid.innerHTML = NUM_WORDS.map(([n,w])=>`<div class="card" data-w="${w}"><div class="big">${n}</div><div class="lbl">${w}</div></div>`).join('');
  } else {
    grid.innerHTML = COLOR_WORDS.map(([w,hex])=>`<div class="card" data-w="${w}"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="${hex}" stroke="#00000022" stroke-width="2"/></svg><div class="lbl">${w}</div></div>`).join('');
  }
  grid.querySelectorAll('.card').forEach(c=> c.addEventListener('click', ()=> speak(c.dataset.w, 'en-US')));
}
function newEnglishQuiz(){
  const pool = englishState.section==='numbers' ? NUM_WORDS.map(x=>x[1]) : COLOR_WORDS.map(x=>x[0]);
  const correct = pick(pool);
  const opts = [correct];
  uniquePush(opts, correct, ()=> pick(pool), 4);
  englishState.quizWord = correct;
  document.getElementById('enPlayBtn').onclick = ()=> speak(correct, 'en-US');
  mountQuiz(document.getElementById('enOptions'), shuffled(opts).map(w=>({value:w,label:w})), correct, {nextFn:newEnglishQuiz});
  speak(correct, 'en-US');
}

/* ================= 古诗诵读 ================= */
const POEMS = [
  {title:'静夜思', author:'李白', tag:'沪教材·一年级', lines:['床前明月光，','疑是地上霜。','举头望明月，','低头思故乡。']},
  {title:'池上', author:'白居易', tag:'沪教材·一年级', lines:['小娃撑小艇，','偷采白莲回。','不解藏踪迹，','浮萍一道开。']},
  {title:'小池', author:'杨万里', tag:'沪教材·一年级', lines:['泉眼无声惜细流，','树阴照水爱晴柔。','小荷才露尖尖角，','早有蜻蜓立上头。']},
  {title:'咏鹅', author:'骆宾王', lines:['鹅，鹅，鹅，','曲项向天歌。','白毛浮绿水，','红掌拨清波。']},
  {title:'春晓', author:'孟浩然', lines:['春眠不觉晓，','处处闻啼鸟。','夜来风雨声，','花落知多少。']},
  {title:'悯农', author:'李绅', lines:['锄禾日当午，','汗滴禾下土。','谁知盘中餐，','粒粒皆辛苦。']},
  {title:'画', author:'佚名', lines:['远看山有色，','近听水无声。','春去花还在，','人来鸟不惊。']},
  {title:'风', author:'李峤', lines:['解落三秋叶，','能开二月花。','过江千尺浪，','入竹万竿斜。']},
  {title:'一去二三里', author:'邵康节', lines:['一去二三里，','烟村四五家。','亭台六七座，','八九十枝花。']},
  {title:'所见', author:'袁枚', lines:['牧童骑黄牛，','歌声振林樾。','意欲捕鸣蝉，','忽然闭口立。']}
];
let poemState = { i: 0 };
function renderPoems(){
  contentEl.innerHTML = `
    <h2>📖 古诗诵读</h2>
    <div class="hint">💡 从左边目录选一首古诗，点"播放朗读"跟着读一读！前3首是上海一年级教材里真实收录的古诗～</div>
    <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start;">
      <div id="poemMenu" class="poem-menu"></div>
      <div id="poemDetail" style="flex:1;min-width:240px;"></div>
    </div>
    <div class="quiz-box">
      <h3 id="poemQ"></h3>
      <div class="quiz-options" id="poemOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  drawPoemMenu();
  drawPoemDetail();
  newPoemQuiz();
}
function drawPoemMenu(){
  const menu = document.getElementById('poemMenu');
  menu.innerHTML = POEMS.map((p,i)=>`<button data-i="${i}" class="${i===poemState.i?'active':''}">${p.title}</button>`).join('');
  menu.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{ poemState.i = parseInt(b.dataset.i); drawPoemMenu(); drawPoemDetail(); });
  });
}
function drawPoemDetail(){
  const p = POEMS[poemState.i];
  const detail = document.getElementById('poemDetail');
  detail.innerHTML = `
    <div class="poem-card" style="cursor:default;">
      <h4>${p.title} ${p.tag?`<span style="font-size:11px;font-weight:400;color:var(--primary-dark);background:var(--primary-soft);padding:2px 8px;border-radius:10px;margin-left:6px;">${p.tag}</span>`:''}</h4>
      <div class="author">— ${p.author}</div>
      <div class="lines">${p.lines.join('<br>')}</div>
      <button class="playBtn" id="poemPlayBtn" style="margin-top:12px;">🔊 播放朗读</button>
    </div>`;
  document.getElementById('poemPlayBtn').addEventListener('click', ()=> speak(p.title + '。' + p.lines.join('')));
}
function newPoemQuiz(){
  const poem = pick(POEMS);
  const correct = poem.lines[poem.lines.length-1];
  document.getElementById('poemQ').textContent = `《${poem.title}》的最后一句是？`;
  const allOtherLines = POEMS.flatMap(p=>p===poem? [] : p.lines);
  const opts = [correct];
  uniquePush(opts, correct, ()=> pick(allOtherLines), 4);
  mountQuiz(document.getElementById('poemOptions'), shuffled(opts).map(l=>({value:l,label:l})), correct, {nextFn:newPoemQuiz});
}

/* ================= 逻辑思维 ================= */
let logicState = { section:'pattern' };
const LOGIC_CATS = {
  水果:['🍎','🍌','🍇','🍓','🍊'], 动物:['🐶','🐱','🐰','🐻','🐵'],
  交通工具:['🚗','🚌','🚲','🚂'], 天气:['☀️','☁️','🌧️','⛄']
};
function renderLogic(){
  contentEl.innerHTML = `
    <h2>🧩 逻辑思维</h2>
    <div class="hint">💡 找一找规律，认一认不一样的东西，锻炼小脑筋～</div>
    <div class="section-tabs">
      <button data-sec="pattern" class="active">一、找规律</button>
      <button data-sec="odd">二、找不同类</button>
    </div>
    <div id="logicVisual" style="font-size:38px;letter-spacing:10px;min-height:60px;"></div>
    <div class="quiz-box">
      <h3 id="logicQ"></h3>
      <div class="quiz-options" id="logicOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  contentEl.querySelectorAll('.section-tabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      contentEl.querySelectorAll('.section-tabs button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); logicState.section = b.dataset.sec;
      newLogicQuiz();
    });
  });
  newLogicQuiz();
}
function newLogicQuiz(){ logicState.section==='pattern' ? newPatternQuiz() : newOddQuiz(); }
function newPatternQuiz(){
  const pools = [['🔵','🔴'],['🌻','🍄'],['🍎','🍌','🍇'],['⭐','🌙','☁️']];
  const base = pick(pools);
  const seq = [];
  for(let i=0;i<6;i++) seq.push(base[i%base.length]);
  document.getElementById('logicVisual').innerHTML = seq.slice(0,5).join(' ') + ' <span style="opacity:.4">❓</span>';
  document.getElementById('logicQ').textContent = '接下来应该是什么？';
  const correct = seq[5];
  const decoys = ['🔵','🔴','🌻','🍄','🍎','🍌','🍇','⭐','🌙','☁️'].filter(x=>x!==correct);
  const opts = [correct];
  uniquePush(opts, correct, ()=> pick(decoys), 4);
  mountQuiz(document.getElementById('logicOptions'), shuffled(opts).map(v=>({value:v,label:v})), correct, {nextFn:newPatternQuiz});
}
function newOddQuiz(){
  const names = Object.keys(LOGIC_CATS);
  const catA = pick(names);
  let catB = pick(names); while(catB===catA) catB = pick(names);
  const itemsA = shuffled(LOGIC_CATS[catA]).slice(0,3);
  const itemB = pick(LOGIC_CATS[catB]);
  const shown = shuffled([...itemsA, itemB]);
  document.getElementById('logicVisual').innerHTML = shown.join('    ');
  document.getElementById('logicQ').textContent = '找出和其他不一样类别的那个！';
  mountQuiz(document.getElementById('logicOptions'), shown.map(v=>({value:v,label:v})), itemB, {nextFn:newOddQuiz});
}

/* ================= 专注力 ================= */
let attentionState = { section:'count' };
function renderAttention(){
  contentEl.innerHTML = `
    <h2>🎯 专注力</h2>
    <div class="hint">💡 仔细看一看，锻炼小朋友的观察力和专注力！</div>
    <div class="section-tabs">
      <button data-sec="count" class="active">一、数图案</button>
      <button data-sec="spot">二、找不同</button>
    </div>
    <div id="attnArea"></div>`;
  contentEl.querySelectorAll('.section-tabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      contentEl.querySelectorAll('.section-tabs button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); attentionState.section = b.dataset.sec;
      newAttentionRound();
    });
  });
  newAttentionRound();
}
function newAttentionRound(){
  const area = document.getElementById('attnArea');
  if(attentionState.section==='count'){
    area.innerHTML = `
      <div class="spot-grid" id="attnGrid" style="grid-template-columns:repeat(5,1fr);"></div>
      <div class="quiz-box"><h3 id="attnQ"></h3><div class="quiz-options" id="attnOptions"></div><div id="quizFeedback"></div></div>`;
    const target = pick(['🌻','🍎','🐝','🍓']);
    const decoy = pick(['🍄','🌰','🍁','🐞'].filter(x=>x!==target));
    const targetCount = 3+Math.floor(Math.random()*4);
    const total = 16;
    const cells = Array(total).fill(decoy);
    const idxs = shuffled([...Array(total).keys()]).slice(0,targetCount);
    idxs.forEach(i=> cells[i]=target);
    document.getElementById('attnGrid').innerHTML = shuffled(cells).map(c=>`<div class="spot-cell">${c}</div>`).join('');
    document.getElementById('attnQ').textContent = `${target} 出现了几次？`;
    const opts=[targetCount];
    uniquePush(opts, targetCount, ()=> Math.max(1, targetCount+(Math.floor(Math.random()*5)-2)), 4);
    mountQuiz(document.getElementById('attnOptions'), shuffled(opts).map(n=>({value:n,label:n})), targetCount, {nextFn:newAttentionRound});
  } else {
    area.innerHTML = `<p style="color:var(--text-soft);font-size:14px;margin:0 0 10px;">找一找，点一点和其他不一样的那个！</p>
      <div class="spot-grid" id="spotGrid"></div><div id="quizFeedback" style="margin-top:14px;"></div>`;
    const base = pick(['🌻','🍎','🐝','🍓','⭐']);
    const diffMap = {'🌻':'🌼','🍎':'🍏','🐝':'🐞','🍓':'🍒','⭐':'🌟'};
    const total = 16;
    const diffIdx = Math.floor(Math.random()*total);
    const grid = document.getElementById('spotGrid');
    grid.innerHTML = Array.from({length:total},(_,i)=>`<div class="spot-cell" data-i="${i}">${i===diffIdx? diffMap[base]: base}</div>`).join('');
    grid.querySelectorAll('.spot-cell').forEach(cell=>{
      cell.addEventListener('click', ()=>{
        const ok = parseInt(cell.dataset.i)===diffIdx;
        cell.classList.add(ok?'correct':'wrong');
        setFeedback(ok, ok?pick(PRAISE):pick(ENCOURAGE));
        if(ok){ addSun(5, grid); setTimeout(newAttentionRound, 900); }
      }, {once:true});
    });
  }
}

/* ================= 安全教育 ================= */
const SAFETY_TIPS = [
  {icon:'🚦', title:'过马路', tip:'红灯停，绿灯行，走人行横道，先看车再过马路。'},
  {icon:'🔌', title:'电源插座', tip:'不能用手或者小物件去摸电源插座，很危险！'},
  {icon:'🔥', title:'打火机和火柴', tip:'不能自己玩打火机、火柴，容易引发火灾。'},
  {icon:'🏊', title:'游泳和玩水', tip:'游泳一定要有大人陪着，不能独自到水边玩。'},
  {icon:'🍬', title:'陌生人给的东西', tip:'不认识的人给的食物、玩具不能随便要，也不能跟陌生人走。'},
  {icon:'🏠', title:'独自在家', tip:'一个人在家不要给陌生人开门，遇到情况先打电话给爸爸妈妈。'},
  {icon:'🪟', title:'阳台和窗边', tip:'不能爬阳台、爬窗户，很容易摔倒发生危险。'},
  {icon:'💊', title:'药品和清洁剂', tip:'药品和清洁剂不能自己乱吃乱喝，要问过大人。'}
];
const SAFETY_QUIZ = [
  {q:'过马路的时候，应该怎么做？', opts:['等绿灯亮了再走人行横道','看到车来了赶紧跑过去','边玩玩具边过马路'], correct:0},
  {q:'看到电源插座，可以做什么？', opts:['用手指去抠一抠','告诉大人，自己不要碰','用小刀去插一插'], correct:1},
  {q:'一个人在家，有不认识的人敲门，应该怎么做？', opts:['马上开门','不开门，给爸爸妈妈打电话','告诉他家里没有人'], correct:1},
  {q:'游泳的时候应该怎么做？', opts:['自己偷偷下水','请大人陪着一起游泳','在水边追着朋友跑'], correct:1},
  {q:'不认识的人给你糖果，应该怎么做？', opts:['开心地收下吃掉','有礼貌地拒绝，告诉大人','跟他走去拿更多'], correct:1},
  {q:'看到好看的药片，应该怎么做？', opts:['当成糖果吃掉','告诉大人，不要自己乱吃','藏起来自己收着'], correct:1}
];
function renderSafety(){
  contentEl.innerHTML = `
    <h2>🛡️ 安全教育</h2>
    <div class="hint">💡 点击卡片听一听安全小知识，保护好自己很重要！</div>
    <div class="list-2col" id="safetyGrid"></div>
    <div class="quiz-box">
      <h3 id="safetyQ"></h3>
      <div class="quiz-options" id="safetyOptions"></div>
      <div id="quizFeedback"></div>
    </div>`;
  const grid = document.getElementById('safetyGrid');
  grid.innerHTML = SAFETY_TIPS.map((t,i)=>`
    <div class="safety-card" data-i="${i}"><div class="ic">${t.icon}</div><div><h4>${t.title}</h4><p>${t.tip}</p></div></div>`).join('');
  grid.querySelectorAll('.safety-card').forEach(c=>{
    c.addEventListener('click', ()=>{ const t = SAFETY_TIPS[c.dataset.i]; speak(t.title + '。' + t.tip); });
  });
  newSafetyQuiz();
}
function newSafetyQuiz(){
  const item = pick(SAFETY_QUIZ);
  const correctText = item.opts[item.correct];
  document.getElementById('safetyQ').textContent = item.q;
  mountQuiz(document.getElementById('safetyOptions'), shuffled(item.opts).map(o=>({value:o,label:o})), correctText, {nextFn:newSafetyQuiz});
}

/* ================= 写字练习 ================= */
const STROKES = [
  {name:'横', d:'M20 50 L80 50', arrow:[80,50,0]},
  {name:'竖', d:'M50 15 L50 85', arrow:[50,85,90]},
  {name:'点', d:'M45 40 Q55 45 52 60', arrow:[52,60,120]},
  {name:'撇', d:'M65 20 Q40 55 25 82', arrow:[25,82,150]},
  {name:'捺', d:'M30 20 Q55 55 78 82', arrow:[78,82,45]},
  {name:'提', d:'M30 75 Q45 70 70 30', arrow:[70,30,-30]}
];
const WRITE_CHARS = ['一','二','三','十','人','大','小','上','下','口','日','月'];
let writeState = { char:'一' };
function renderWrite(){
  contentEl.innerHTML = `
    <h2>✍️ 写字练习</h2>
    <div class="hint">💡 先认认基本笔画，再跟着灰色的字描红练习吧！</div>
    <h3 style="font-size:15px;">基本笔画</h3>
    <div class="stroke-grid" id="strokeGrid"></div>
    <h3 style="font-size:15px;margin-top:22px;">描红练习</h3>
    <div class="char-picker" id="charPicker"></div>
    <div id="writeWrap">
      <div id="writeStage">
        <div id="guideChar"></div>
        <canvas id="writeCanvas"></canvas>
      </div>
      <div>
        <p style="color:var(--text-soft);font-size:14px;max-width:260px;">用手指或鼠标跟着灰色的字描一描，写完点击下面的按钮吧！</p>
        <button class="ghostBtn" id="clearBtn" style="margin-right:8px;">🧹 清除</button>
        <button class="bigBtn" id="doneBtn">✅ 我写完啦</button>
        <div id="quizFeedback" style="margin-top:12px;"></div>
      </div>
    </div>`;
  const sg = document.getElementById('strokeGrid');
  sg.innerHTML = STROKES.map((s,i)=>`
    <div class="stroke-card" data-i="${i}">
      <svg viewBox="0 0 100 100">
        <path d="${s.d}" stroke="#3fa66a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="${s.arrow[0]}" cy="${s.arrow[1]}" r="5" fill="#f5b400"/>
      </svg>
      <div class="lbl">${s.name}</div>
    </div>`).join('');
  sg.querySelectorAll('.stroke-card').forEach(c=> c.addEventListener('click', ()=> speak(STROKES[c.dataset.i].name)));

  const picker = document.getElementById('charPicker');
  picker.innerHTML = WRITE_CHARS.map(c=>`<button data-c="${c}" class="${c===writeState.char?'active':''}">${c}</button>`).join('');
  picker.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      picker.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); writeState.char = b.dataset.c;
      setGuideChar(); clearCanvas();
    });
  });
  setGuideChar();
  setupWriteCanvas();
  document.getElementById('clearBtn').addEventListener('click', clearCanvas);
  document.getElementById('doneBtn').addEventListener('click', ()=>{
    addSun(5, document.getElementById('doneBtn'));
    setFeedback(true, pick(PRAISE));
    const idx = WRITE_CHARS.indexOf(writeState.char);
    writeState.char = WRITE_CHARS[(idx+1)%WRITE_CHARS.length];
    picker.querySelectorAll('button').forEach(x=> x.classList.toggle('active', x.dataset.c===writeState.char));
    setGuideChar(); clearCanvas();
  });
}
function setGuideChar(){ document.getElementById('guideChar').textContent = writeState.char; }
let writeCtx=null;
function clearCanvas(){ if(writeCtx) writeCtx.clearRect(0,0,9999,9999); }
function setupWriteCanvas(){
  const canvas = document.getElementById('writeCanvas');
  const stage = document.getElementById('writeStage');
  const dpr = window.devicePixelRatio || 1;
  const size = 260;
  canvas.width = size*dpr; canvas.height = size*dpr;
  canvas.style.width = size+'px'; canvas.style.height = size+'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr,dpr);
  ctx.lineWidth = 10; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#3fa66a';
  writeCtx = ctx;
  let drawing=false;
  function pos(e){ const r = canvas.getBoundingClientRect(); const p = e.touches? e.touches[0]:e; return {x:p.clientX-r.left, y:p.clientY-r.top}; }
  function down(e){ e.preventDefault(); drawing=true; const p=pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); }
  function move(e){ if(!drawing) return; e.preventDefault(); const p=pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); }
  function up(){ drawing=false; }
  canvas.addEventListener('mousedown', down);
  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('mouseup', up);
  canvas.addEventListener('mouseleave', up);
  canvas.addEventListener('touchstart', down, {passive:false});
  canvas.addEventListener('touchmove', move, {passive:false});
  canvas.addEventListener('touchend', up);
}

/* ================= 植物大战僵尸 ================= */
const COLS = 8, ROWS = 5;
const PLANT_TYPES = {
  sunflower:{name:'向日葵', icon:ART.sunflower(), cost:50, hp:100, kind:'sun', sunTime:8},
  peashooter:{name:'豌豆射手', icon:ART.peashooter(), cost:100, hp:100, kind:'shoot', cooldown:1.5, damage:20},
  snowpea:{name:'寒冰射手', icon:ART.peashooter('ice'), cost:175, hp:100, kind:'shoot', cooldown:1.6, damage:16, slow:true},
  repeater:{name:'双发射手', icon:ART.repeater(), cost:200, hp:100, kind:'shoot', cooldown:1.5, damage:20, volley:2},
  wallnut:{name:'坚果墙', icon:ART.wallnut(), cost:50, hp:300, kind:'wall'}
};
let game = null;
const SPEED_PRESETS = {
  slow:{label:'🐢 慢速', mult:0.6, spawnMult:1.5},
  normal:{label:'🚶 标准', mult:0.9, spawnMult:1},
  fast:{label:'🏃 快速', mult:1.3, spawnMult:0.75}
};
let gameSpeedKey = 'slow';
function renderGame(){
  contentEl.innerHTML = `
    <h2>🧟 植物大战僵尸</h2>
    <div class="hint">☀️用阳光种植物，🧟僵尸从右边走来，走到最左边就会失去一条生命！天上偶尔会掉落阳光，记得点一下收集哦～</div>
    <div id="gameStats">
      <div class="stat-chip">☀️ 阳光：<span id="gSun"></span></div>
      <div class="stat-chip">❤️ 生命：<span id="gLives"></span></div>
      <div class="stat-chip">🏆 得分：<span id="gScore">0</span></div>
      <div class="stat-chip">🌊 波次：<span id="gWave">1</span></div>
    </div>
    <div class="section-tabs" id="speedTabs">
      ${Object.entries(SPEED_PRESETS).map(([k,p])=>`<button data-speed="${k}" class="${k===gameSpeedKey?'active':''}">${p.label}</button>`).join('')}
    </div>
    <div id="plantBar"></div>
    <div id="boardWrap">
      <div class="board-sky">
        <svg viewBox="0 0 400 56" preserveAspectRatio="none">
          <g opacity=".9" fill="#ffffff">
            <ellipse cx="55" cy="20" rx="26" ry="10"/><ellipse cx="78" cy="16" rx="18" ry="8"/><ellipse cx="34" cy="16" rx="16" ry="8"/>
            <ellipse cx="290" cy="26" rx="30" ry="11"/><ellipse cx="316" cy="21" rx="18" ry="8"/><ellipse cx="264" cy="21" rx="16" ry="8"/>
          </g>
          <g fill="#c9915b">
            ${Array.from({length:14},(_,i)=>`<rect x="${i*30+4}" y="40" width="6" height="16"/>`).join('')}
          </g>
          <rect x="0" y="46" width="400" height="4" fill="#a97a48"/>
        </svg>
      </div>
      <div id="board"></div>
    </div>
    <div style="margin-top:14px;"><button class="ghostBtn" id="restartBtn">🔄 重新开始</button></div>
  `;
  document.getElementById('plantBar').innerHTML = Object.entries(PLANT_TYPES).map(([key,p])=>`
    <button class="plant-opt" data-key="${key}">
      <svg viewBox="0 0 100 100">${p.icon}</svg>
      <div class="nm">${p.name}</div>
      <div class="cost">☀️${p.cost}</div>
    </button>`).join('');
  const board = document.getElementById('board');
  board.innerHTML = '';
  for(let r=0;r<ROWS;r++){ const lane = document.createElement('div'); lane.className='lane'; lane.dataset.row=r; board.appendChild(lane); }
  document.getElementById('restartBtn').addEventListener('click', startGame);
  document.querySelectorAll('#speedTabs button').forEach(b=>{
    b.addEventListener('click', ()=>{
      gameSpeedKey = b.dataset.speed;
      document.querySelectorAll('#speedTabs button').forEach(x=>x.classList.toggle('active', x===b));
      const mult = SPEED_PRESETS[gameSpeedKey].mult;
      if(game) game.zombies.forEach(z=> z.speed = z.baseSpeed*mult);
    });
  });
  document.querySelectorAll('.plant-opt').forEach(b=>{
    b.addEventListener('click', ()=>{ game.selected = game.selected===b.dataset.key ? null : b.dataset.key; refreshPlantBar(); });
  });
  board.addEventListener('click', (e)=>{
    const lane = e.target.closest('.lane');
    if(!lane || !game.selected || game.over) return;
    const type = PLANT_TYPES[game.selected];
    if(state.sun < type.cost) return;
    const rect = lane.getBoundingClientRect();
    const pct = (e.clientX - rect.left)/rect.width*100;
    const col = Math.max(0, Math.min(COLS-1, Math.floor(pct/(100/COLS))));
    const row = parseInt(lane.dataset.row);
    if(game.plants.find(p=>p.row===row && p.col===col)) return;
    addSun(-type.cost);
    game.plants.push({row,col,type:game.selected,hp:type.hp,maxHp:type.hp,timer: type.kind==='shoot'? type.cooldown : (type.kind==='sun'? type.sunTime : 0)});
    game.selected=null; refreshPlantBar();
  });
  startGame();
}
function refreshPlantBar(){
  document.querySelectorAll('.plant-opt').forEach(b=>{
    const type = PLANT_TYPES[b.dataset.key];
    b.classList.toggle('selected', game.selected===b.dataset.key);
    b.classList.toggle('disabled', state.sun < type.cost);
  });
}
function colX(col){ return (col+0.5)/COLS*100; }
function startGame(){
  game = { plants:[], zombies:[], peas:[], sunDrops:[], lives:3, score:0, wave:1, over:false, selected:null,
    spawnTimer:9, waveTimer:25, sunDropTimer:6 };
  document.getElementById('gLives').textContent = '❤️'.repeat(game.lives);
  document.getElementById('gScore').textContent = 0;
  document.getElementById('gWave').textContent = 1;
  document.getElementById('gSun').textContent = state.sun;
  const overlay = document.getElementById('gameOverlay');
  if(overlay) overlay.remove();
  refreshPlantBar();
  let last = null;
  function loop(ts){
    if(!last) last = ts;
    const dt = Math.min(0.06, (ts-last)/1000);
    last = ts;
    if(!game.over) tickGame(dt);
    renderGameFrame();
    if(!game.over) game.raf = requestAnimationFrame(loop);
  }
  game.raf = requestAnimationFrame(loop);
  stopCurrentModule = ()=>{ if(game && game.raf) cancelAnimationFrame(game.raf); };
}
function tickGame(dt){
  document.getElementById('gSun').textContent = state.sun;
  game.waveTimer -= dt;
  if(game.waveTimer<=0){ game.wave++; game.waveTimer=20; document.getElementById('gWave').textContent=game.wave; }
  const speedPreset = SPEED_PRESETS[gameSpeedKey];
  game.spawnTimer -= dt;
  if(game.spawnTimer<=0){
    const row = Math.floor(Math.random()*ROWS);
    const roll = Math.random();
    const kind = game.wave>=6 && roll<0.2 ? 'bucket' : (game.wave>=3 && roll<0.45 ? 'cone' : 'normal');
    const baseHp = kind==='bucket'?220:(kind==='cone'?130:60);
    const baseSpeed = 1.5 + game.wave*0.12;
    game.zombies.push({ row, pos:100, hp: baseHp + game.wave*10, maxHp: baseHp + game.wave*10,
      speed: baseSpeed*speedPreset.mult, baseSpeed, dps: 16, kind, slowTimer:0 });
    game.spawnTimer = Math.max(4, 7.5 - game.wave*0.35) * speedPreset.spawnMult;
  }
  game.sunDropTimer -= dt;
  if(game.sunDropTimer<=0){
    game.sunDrops.push({ x: 10+Math.random()*80, t:0, landAt:2.5, life:8, el:null });
    game.sunDropTimer = 7 + Math.random()*5;
  }
  for(const sd of game.sunDrops) sd.t += dt;
  game.sunDrops = game.sunDrops.filter(sd=>{
    const keep = sd.t < sd.life;
    if(!keep && sd.el) sd.el.remove();
    return keep;
  });
  for(const p of game.plants){
    const type = PLANT_TYPES[p.type];
    if(type.kind==='sun'){
      p.timer -= dt;
      if(p.timer<=0){ addSun(25, document.getElementById('board')); p.timer = type.sunTime; }
    } else if(type.kind==='shoot'){
      p.timer -= dt;
      const target = game.zombies.find(z=> z.row===p.row && z.pos > colX(p.col));
      if(p.timer<=0 && target){
        const shots = type.volley || 1;
        for(let i=0;i<shots;i++) game.peas.push({row:p.row, pos: colX(p.col)+i*2, damage: type.damage, slow: !!type.slow});
        p.timer = type.cooldown;
      }
    }
  }
  for(const pea of game.peas) pea.pos += dt*38;
  for(const pea of game.peas){
    const z = game.zombies.find(z=> z.row===pea.row && Math.abs(z.pos-pea.pos)<3 && z.hp>0);
    if(z){ z.hp -= pea.damage; pea.dead=true; if(pea.slow){ z.slowTimer=3; } }
  }
  game.peas = game.peas.filter(p=> !p.dead && p.pos<105);
  for(const z of game.zombies){
    if(z.hp<=0) continue;
    if(z.slowTimer>0) z.slowTimer -= dt;
    const speedMult = z.slowTimer>0 ? 0.5 : 1;
    const blocking = game.plants.filter(p=> p.row===z.row && colX(p.col) <= z.pos).sort((a,b)=> colX(b.col)-colX(a.col))[0];
    if(blocking && z.pos - colX(blocking.col) < 100/COLS*0.7){
      blocking.hp -= z.dps*dt;
      if(blocking.hp<=0) game.plants = game.plants.filter(p=>p!==blocking);
    } else {
      z.pos -= z.speed*dt*speedMult;
    }
    if(z.pos<=0){
      z.hp=0; game.lives--;
      document.getElementById('gLives').textContent = '❤️'.repeat(Math.max(0,game.lives));
      if(game.lives<=0) endGame();
    }
  }
  const before = game.zombies.length;
  game.zombies = game.zombies.filter(z=> z.hp>0);
  const killed = before - game.zombies.length;
  if(killed>0){ game.score += killed*10; document.getElementById('gScore').textContent = game.score; }
}
function renderGameFrame(){
  refreshPlantBar();
  const board = document.getElementById('board');
  const lanes = board.children;
  for(let r=0;r<ROWS;r++){
    const lane = lanes[r];
    lane.querySelectorAll('.plant-el,.zombie-el,.pea-el').forEach(e=>e.remove());
    for(const p of game.plants){
      if(p.row!==r) continue;
      const el = document.createElement('div'); el.className='plant-el'; el.style.left = colX(p.col)+'%';
      el.innerHTML = `<svg viewBox="0 0 100 100">${PLANT_TYPES[p.type].icon}</svg><div class="hpbar"><i style="width:${Math.max(0,p.hp/p.maxHp*100)}%"></i></div>`;
      lane.appendChild(el);
    }
    for(const z of game.zombies){
      if(z.row!==r) continue;
      const el = document.createElement('div'); el.className='zombie-el'; el.style.left = z.pos+'%';
      el.innerHTML = `<svg viewBox="0 0 100 100">${ART.zombie(z.kind==='normal'?'':z.kind)}</svg><div class="hpbar"><i style="width:${Math.max(0,z.hp/z.maxHp*100)}%"></i></div>`;
      lane.appendChild(el);
    }
    for(const pea of game.peas){
      if(pea.row!==r) continue;
      const el = document.createElement('div'); el.className='pea-el'; el.style.left = pea.pos+'%';
      if(pea.slow) el.style.background = 'radial-gradient(circle at 35% 30%,#dff6fb,#5fb8d6)';
      lane.appendChild(el);
    }
  }
  const wrap = document.getElementById('boardWrap');
  const wrapH = wrap.clientHeight || 340;
  for(const sd of game.sunDrops){
    if(!sd.el){
      const el = document.createElement('div'); el.className='sun-drop-el'; el.style.animation='none';
      el.innerHTML = `<svg viewBox="0 0 100 100">${ART.sun()}</svg>`;
      el.addEventListener('click', ()=>{ if(sd.life<=0) return; addSun(20, el); sd.life=0; });
      wrap.appendChild(el);
      sd.el = el;
    }
    const topPct = Math.min(1, sd.t/sd.landAt);
    sd.el.style.left = sd.x+'%'; sd.el.style.top = (topPct*(wrapH-40))+'px';
  }
}
function endGame(){
  game.over = true;
  const wrap = document.getElementById('boardWrap');
  const overlay = document.createElement('div'); overlay.id='gameOverlay';
  overlay.innerHTML = `<div>😢 家园被攻破啦！</div><div>得分：${game.score}</div><button class="bigBtn" id="tryAgainBtn">再试一次</button>`;
  wrap.appendChild(overlay);
  document.getElementById('tryAgainBtn').addEventListener('click', startGame);
}

/* ================= 启动 ================= */
initSun();
showModule('home');
