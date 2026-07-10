/* ============================================================
   Moteur vidéo Generation App — COMMUN à toutes les applis.
   La page fournit :
     - <main id="video-root"> contenant les écrans .scr (data-scene="N")
     - window.VIDEO = { scenes, voiceDir, icon, posterTitle, posterText, onScene }
   Le moteur construit le lecteur (téléphone, sous-titres, barre, poster)
   puis enchaîne les scènes. Chaque scène dure sa voix off ; si l'audio
   manque, on retombe sur "dur" (ms). onScene(scene, index) est optionnel.
   ============================================================ */
(function(){
  const cfg = window.VIDEO;
  if(!cfg){ console.error('window.VIDEO manquant'); return; }
  const SCENES = cfg.scenes;
  const voiceDir = cfg.voiceDir || 'voix/';

  const root = document.getElementById('video-root');
  const screens = [...root.querySelectorAll('.scr')];

  /* ---- construction du cadre ---- */
  const player = document.createElement('div'); player.className = 'player';
  const stage  = document.createElement('div'); stage.className  = 'stage';
  const phone  = document.createElement('div'); phone.className  = 'phone';
  screens.forEach(s => phone.appendChild(s));
  stage.appendChild(phone); player.appendChild(stage);

  player.insertAdjacentHTML('beforeend', `
    <div class="subs"><span id="sub"></span></div>
    <div class="bar-play">
      <button class="play-btn" id="playBtn" aria-label="Lecture / Pause">
        <svg id="playIco" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <div class="track"><i id="progress"></i></div>
      <button class="mute" id="muteBtn" aria-label="Son">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 8a5 5 0 0 1 0 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="poster" id="poster">
      <div class="pico"><img src="${cfg.icon}" alt="" /></div>
      <h2>${cfg.posterTitle || 'Découvre l’appli'}</h2>
      <p>${cfg.posterText || ''}</p>
      <div class="bigplay"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>
    </div>`);
  root.appendChild(player);

  /* ---- éléments ---- */
  const scrs     = [...phone.querySelectorAll('.scr')];
  const subEl    = document.getElementById('sub');
  const progress = document.getElementById('progress');
  const playBtn  = document.getElementById('playBtn');
  const playIco  = document.getElementById('playIco');
  const muteBtn  = document.getElementById('muteBtn');
  const poster   = document.getElementById('poster');

  const ICON_PLAY  = 'M8 5v14l11-7z';
  const ICON_PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
  const TOTAL = SCENES.reduce((s,x)=>s+x.dur,0);

  let idx=0, playing=false, muted=false;
  let audio=null, sceneTimer=null, progTimer=null;
  let sceneStart=0, sceneLen=0, audioAvailable=true;

  function clearScene(){
    if(sceneTimer){ clearTimeout(sceneTimer); sceneTimer=null; }
    if(progTimer){ clearInterval(progTimer); progTimer=null; }
    if(audio){ audio.onended=null; audio.pause(); audio=null; }
  }
  function showSub(t){
    subEl.classList.remove('show');
    setTimeout(()=>{ subEl.textContent=t; subEl.classList.add('show'); },60);
  }
  function tickProgress(){
    const before = SCENES.slice(0,idx).reduce((s,x)=>s+x.dur,0);
    const step = ()=>{
      let cur;
      if(audio && audio.duration && !isNaN(audio.duration)) cur = audio.currentTime/audio.duration;
      else cur = Math.min(1,(performance.now()-sceneStart)/sceneLen);
      progress.style.width = (((before+cur*SCENES[idx].dur)/TOTAL)*100).toFixed(1)+'%';
    };
    step(); progTimer = setInterval(step,100);
  }

  function playScene(i){
    clearScene(); idx=i;
    scrs.forEach(s=>s.classList.toggle('show', +s.dataset.scene===SCENES[i].id));
    showSub(SCENES[i].sub);
    if(typeof cfg.onScene==='function') cfg.onScene(SCENES[i], i, scrs);
    sceneStart=performance.now(); sceneLen=SCENES[i].dur;

    const advance = ()=>{ (i+1<SCENES.length) ? playScene(i+1) : finish(); };
    if(audioAvailable){
      audio = new Audio(`${voiceDir}vo${SCENES[i].id}.mp3`);
      audio.muted=muted; audio.onended=advance;
      audio.onerror = ()=>{ audioAvailable=false; audio=null; sceneTimer=setTimeout(advance,SCENES[i].dur); };
      const pr = audio.play();
      if(pr && pr.catch) pr.catch(()=>{ audioAvailable=false; audio=null; sceneTimer=setTimeout(advance,SCENES[i].dur); });
    } else {
      sceneTimer=setTimeout(advance,SCENES[i].dur);
    }
    tickProgress();
  }
  function finish(){
    clearScene(); playing=false;
    playIco.setAttribute('d',ICON_PLAY); progress.style.width='100%';
  }
  function start(){
    poster.classList.add('hide'); playing=true;
    playIco.setAttribute('d',ICON_PAUSE); playScene(0);
  }
  function togglePlay(){
    if(!playing){
      if(idx===SCENES.length-1 && progress.style.width==='100%'){ audioAvailable=true; start(); }
      else if(!poster.classList.contains('hide')){ start(); }
      else { playing=true; playIco.setAttribute('d',ICON_PAUSE); audio?audio.play():playScene(idx); }
    } else {
      playing=false; playIco.setAttribute('d',ICON_PLAY);
      if(audio) audio.pause();
      if(sceneTimer){ clearTimeout(sceneTimer); sceneTimer=null; }
      if(progTimer){ clearInterval(progTimer); progTimer=null; }
    }
  }

  poster.addEventListener('click', start);
  playBtn.addEventListener('click', togglePlay);
  muteBtn.addEventListener('click', ()=>{ muted=!muted; if(audio) audio.muted=muted; muteBtn.style.opacity=muted?.5:1; });
})();
