"""
Voix off de la vidéo RESOLV (Edge TTS, gratuit).

    pip install edge-tts
    py generer_voix.py

Crée voix/vo0.mp3 ... voix/vo6.mp3. Phrases identiques aux sous-titres de config.js.
"""
import asyncio, os
import edge_tts

VOIX  = "fr-FR-HenriNeural"   # même voix que les autres (homme posé)
DEBIT = "+8%"

PHRASES = [
    "Voici Resolv. Un souci ? On le règle.",
    "Décris ton problème avec tes mots, dans n'importe quel domaine, voiture, vélo, jardin, ordinateur.",
    "L'intelligence artificielle te répond par un diagnostic clair, étape par étape.",
    "Et elle te sort les meilleures vidéos et discussions de forums, déjà prêtes à ouvrir.",
    "Une panne, un bricolage, un réglage, quel que soit le domaine, tu avances.",
    "Tu l'essaies gratuitement, puis tu le débloques à vie quand il t'a convaincu.",
    "Resolv. Trouve la solution, à chaque fois. Sur génération app point fr.",
]


async def main():
    os.makedirs("voix", exist_ok=True)
    print(f"Voix off ({VOIX}, {DEBIT}) ...")
    for i, texte in enumerate(PHRASES):
        await edge_tts.Communicate(texte, VOIX, rate=DEBIT).save(f"voix/vo{i}.mp3")
        print(f"  OK  voix/vo{i}.mp3")
    print("Terminé.")


if __name__ == "__main__":
    asyncio.run(main())
