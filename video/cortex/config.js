/* ============================================================
   Config de la vidéo CORTEX.
   Chargé AVANT ../player.js. Le texte des sous-titres doit rester
   identique aux phrases de generer_voix.py.
   ============================================================ */
window.VIDEO = {
  icon: 'assets/cortex-512.png',
  posterTitle: 'Découvre Cortex',
  posterText: 'Ton second cerveau : tes notes, et une IA qui les connaît.',
  voiceDir: 'voix/',
  scenes: [
    { id:0, dur:5200, sub:"Voici Cortex. Ton second cerveau, privé et toujours dans ta poche." },
    { id:1, dur:9000, sub:"Range tout ce qui se perd ailleurs : notes, liens, recettes, idées. Chiffré sur ton téléphone, sans compte." },
    { id:2, dur:8000, sub:"Tu as déjà des notes ailleurs ? Importe-les, Google Keep compris, en quelques secondes." },
    { id:3, dur:9500, sub:"Et surtout, tu parles à tes notes. Une question, l'IA cherche pour toi et cite ses sources." },
    { id:4, dur:8500, sub:"Dicte une note à la voix. Ou demande à l'IA de te la créer, déjà bien rangée." },
    { id:5, dur:7000, sub:"Tes listes de courses ou de tâches, tu les coches d'un simple doigt." },
    { id:6, dur:7000, sub:"Cortex. Ton second cerveau, dans ta poche. Sur generationapp.fr." },
  ],
  onScene: function(scene){
    // S3 : la réponse de l'IA et sa source apparaissent après la question
    if(scene.id===3){
      const ans=document.querySelector('.scr[data-scene="3"] .ct-ia');
      const src=document.querySelector('.scr[data-scene="3"] .ct-src');
      if(ans){ ans.style.opacity=0; ans.style.transform='translateY(8px)'; setTimeout(()=>{ans.style.transition='.5s';ans.style.opacity=1;ans.style.transform='none';},1200); }
      if(src){ src.style.opacity=0; setTimeout(()=>{src.style.transition='.5s';src.style.opacity=1;},2200); }
    }
    // S4 : les lignes de la note générée apparaissent une à une
    if(scene.id===4){
      const lines=[...document.querySelectorAll('.scr[data-scene="4"] .ct-gline')];
      lines.forEach(l=>{l.style.opacity=0;l.style.transform='translateX(8px)';});
      lines.forEach((l,i)=> setTimeout(()=>{l.style.transition='.4s';l.style.opacity=1;l.style.transform='none';}, 900+i*550));
    }
    // S5 : on coche les cases une par une
    if(scene.id===5){
      const boxes=[...document.querySelectorAll('.scr[data-scene="5"] .ct-chk')];
      boxes.forEach(b=>b.classList.remove('on'));
      boxes.forEach((b,i)=> setTimeout(()=> b.classList.add('on'), 700+i*750));
    }
  }
};
