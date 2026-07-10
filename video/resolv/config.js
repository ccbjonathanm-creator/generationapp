/* ============================================================
   Config de la vidéo RESOLV. Chargé avant ../player.js.
   Phrases identiques aux sous-titres et à generer_voix.py.
   ============================================================ */
window.VIDEO = {
  icon: 'assets/resolv-512.png',
  posterTitle: 'Découvre Resolv',
  posterText: '60 secondes pour ne plus jamais rester bloqué.',
  voiceDir: 'voix/',
  scenes: [
    { id:0, dur:5000, sub:"Voici Resolv. Un souci ? On le règle." },
    { id:1, dur:9000, sub:"Décris ton problème avec tes mots, dans n'importe quel domaine : voiture, vélo, jardin, ordinateur." },
    { id:2, dur:9000, sub:"L'intelligence artificielle te répond par un diagnostic clair, étape par étape." },
    { id:3, dur:9000, sub:"Et elle te sort les meilleures vidéos et discussions de forums, déjà prêtes à ouvrir." },
    { id:4, dur:8000, sub:"Une panne, un bricolage, un réglage : quel que soit le domaine, tu avances." },
    { id:5, dur:8000, sub:"Tu l'essaies gratuitement, puis tu le débloques à vie quand il t'a convaincu." },
    { id:6, dur:6500, sub:"Resolv. Trouve la solution, à chaque fois. Sur generationapp.fr." },
  ],
  onScene: function(scene){
    // effet "frappe au clavier" sur la description du problème
    if(scene.id===1){
      const el=document.getElementById('typed');
      if(!el) return;
      const txt="Ma tondeuse thermique ne démarre plus";
      el.textContent="";
      let i=0;
      const type=()=>{ if(i<=txt.length){ el.textContent=txt.slice(0,i++); setTimeout(type,55); } };
      setTimeout(type,500);
    }
    // apparition des étapes du diagnostic une par une
    if(scene.id===2){
      const steps=[...document.querySelectorAll('.scr[data-scene="2"] .dstep')];
      steps.forEach(s=>s.style.opacity='0');
      steps.forEach((s,k)=>setTimeout(()=>{ s.style.transition='opacity .4s, transform .4s'; s.style.opacity='1'; s.style.transform='none'; }, 500+k*700));
    }
  }
};
