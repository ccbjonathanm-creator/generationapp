# Vidéos des applis — moteur commun

Système réutilisable pour présenter chaque appli en vidéo web animée (mockup téléphone,
scènes, voix off, sous-titres). Aucune vidéo lourde : tout est animé en direct dans la page.

## Structure

```
video/
  player.css        ← moteur COMMUN (cadre lecteur, téléphone, sous-titres, barre). Ne pas dupliquer.
  player.js         ← moteur COMMUN (enchaîne les scènes, voix off, progression). Ne pas dupliquer.
  coffre/           ← une appli = un dossier
    index.html      ← les écrans de l'appli (mockups) + <link player.css> + <script config.js> + <script ../player.js>
    config.js       ← window.VIDEO : scènes, textes des sous-titres, voix, animations custom (onScene)
    generer_voix.py ← génère la voix off de cette appli
    assets/         ← icônes de l'appli
    voix/           ← vo0.mp3 ... voN.mp3 (créés par generer_voix.py)
```

## Ajouter la vidéo d'une nouvelle appli (ex : offgrid)

1. **Copier** le dossier `coffre/` en `offgrid/`.
2. Dans `offgrid/index.html` : remplacer les écrans `.scr` par les écrans de l'appli
   (garder `id="video-root"`, les `data-scene="N"`, et la ligne finale `<a class="cta" href="https://offgrid.generationapp.fr">`).
3. Dans `offgrid/config.js` : adapter `icon`, `posterTitle`, les `scenes` (texte `sub` + `dur`),
   et `onScene` si des animations spéciales sont voulues.
4. Dans `offgrid/generer_voix.py` : mettre les mêmes phrases que les `sub`, puis `py generer_voix.py`.
5. Remplacer les icônes dans `offgrid/assets/`.
6. Sur l'accueil (`../index.html`) : ajouter le badge ▶ sur la carte de l'appli
   (voir le bloc `.cardwrap` / `.vidbadge` de Coffre à recopier, en changeant le `href`).

## Régénérer / changer la voix (par appli)

```
cd video/coffre
pip install edge-tts   (une seule fois)
py generer_voix.py
```

Voix dispo : `fr-FR-HenriNeural` (homme posé, par défaut), `fr-FR-DeniseNeural` (femme),
`fr-FR-EloiseNeural` (femme jeune). Vitesse via `DEBIT` (ex : `+8%`, `-5%`).

## Regarder en local

```
py -m http.server 8900        (à la racine du dépôt generationapp)
```
Puis http://127.0.0.1:8900/video/coffre/index.html
