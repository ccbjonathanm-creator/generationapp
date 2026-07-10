/* ============================================================
   Config de la vidéo COFFRE.
   Un fichier comme celui-ci par appli (video/<appli>/config.js).
   Chargé AVANT ../player.js. Le texte des sous-titres doit rester
   identique aux phrases de generer_voix.py.
   ============================================================ */
window.VIDEO = {
  icon: 'assets/coffre-512.png',
  posterTitle: 'Découvre Coffre',
  posterText: '60 secondes pour comprendre pourquoi tu vas l’adopter.',
  voiceDir: 'voix/',
  scenes: [
    { id:0, dur:5200, sub:"Voici Coffre. L'appli qui te montre enfin où part ton argent." },
    { id:1, dur:9000, sub:"Tout reste sur ton téléphone. Chiffré, protégé par ton code. Aucun compte, rien ne part sur internet." },
    { id:2, dur:9000, sub:"Tu importes ton relevé, et Coffre range chaque dépense dans la bonne catégorie, tout seul." },
    { id:3, dur:9500, sub:"D'un coup d'œil : ton solde, tes revenus, tes dépenses, et ce qu'il te reste à vivre chaque jour." },
    { id:4, dur:8000, sub:"Tu fixes tes budgets, et Coffre te prévient avant que tu ne dérapes." },
    { id:5, dur:9000, sub:"Il repère aussi les abonnements qui te grignotent, avec la lettre de résiliation déjà prête." },
    { id:6, dur:6500, sub:"Coffre. Tes finances, en sécurité, dans ta poche. Sur generationapp.fr." },
  ],
  // animations propres à certaines scènes de Coffre
  onScene: function(scene){
    if(scene.id===1){
      const dots=[...document.querySelectorAll('#pinDots i')];
      const btns=[...document.querySelectorAll('#keys .k')];
      dots.forEach(d=>d.classList.remove('on'));
      for(let i=0;i<6;i++){
        setTimeout(()=>{
          const b=btns[(i*3+2)%btns.length];
          if(b){ b.classList.add('press'); setTimeout(()=>b.classList.remove('press'),160); }
          if(dots[i]) dots[i].classList.add('on');
        }, 700+i*520);
      }
    }
    if(scene.id===4){
      const bars=document.querySelectorAll('.scr[data-scene="4"] .bar');
      bars.forEach(b=>b.querySelector('i').style.width='0');
      setTimeout(()=>bars.forEach(b=>b.querySelector('i').style.width=(b.dataset.w||'50')+'%'),350);
    }
  }
};
