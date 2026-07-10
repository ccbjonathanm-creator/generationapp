/* ============================================================
   Config de la vidéo OFF-GRID. Chargé avant ../player.js.
   Les phrases doivent rester identiques aux sous-titres et à generer_voix.py.
   ============================================================ */
window.VIDEO = {
  icon: 'assets/offgrid-512.png',
  posterTitle: 'Découvre Off-Grid',
  posterText: '60 secondes pour reprendre ton autonomie.',
  voiceDir: 'voix/',
  scenes: [
    { id:0, dur:5200, sub:"Voici Off-Grid. L'appli qui t'aide à devenir autonome, pas à pas." },
    { id:1, dur:9500, sub:"Fais ton bilan d'autonomie : un score clair sur ton énergie, ton eau, ta nourriture et tes déchets." },
    { id:2, dur:9000, sub:"Un parcours en trois niveaux te guide, module par module, avec des actions concrètes à cocher." },
    { id:3, dur:9000, sub:"Des calculateurs dimensionnent ton installation : panneaux solaires, batteries, eau de pluie." },
    { id:4, dur:8500, sub:"Et grâce à ta position, il utilise l'ensoleillement et la pluie réels de ta commune." },
    { id:5, dur:8500, sub:"Il chiffre même tes économies, et ton plan complet prêt à imprimer." },
    { id:6, dur:6500, sub:"Off-Grid. Reprends ton autonomie, chez toi. Sur generationapp.fr." },
  ],
  onScene: function(scene){
    if(scene.id===1){
      const bars=document.querySelectorAll('.scr[data-scene="1"] .catbar i');
      bars.forEach(b=>b.style.width='0');
      setTimeout(()=>bars.forEach(b=>b.style.width=(b.parentElement.dataset.w||'50')+'%'),350);
    }
    if(scene.id===2){
      const bars=document.querySelectorAll('.scr[data-scene="2"] .lvlbar i');
      bars.forEach(b=>b.style.width='0');
      setTimeout(()=>bars.forEach(b=>b.style.width=(b.parentElement.dataset.w||'50')+'%'),350);
    }
  }
};
