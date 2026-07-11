"""
Voix off de la vidéo CORTEX (Edge TTS, gratuit).

    pip install edge-tts
    py generer_voix.py

Crée voix/vo0.mp3 ... voix/vo6.mp3. Les phrases doivent rester identiques
aux sous-titres de config.js (champ sub).
"""
import asyncio, os
import edge_tts

VOIX  = "fr-FR-HenriNeural"   # homme posé. Autres : fr-FR-DeniseNeural, fr-FR-EloiseNeural
DEBIT = "+8%"                  # négatif = plus lent, positif = plus rapide

PHRASES = [
    "Voici Cortex. Ton second cerveau, privé et toujours dans ta poche.",
    "Range tout ce qui se perd ailleurs : notes, liens, recettes, idées. Chiffré sur ton téléphone, sans compte.",
    "Tu as déjà des notes ailleurs ? Importe-les, Google Keep compris, en quelques secondes.",
    "Et surtout, tu parles à tes notes. Une question, l'IA cherche pour toi et cite ses sources.",
    "Dicte une note à la voix. Ou demande à l'IA de te la créer, déjà bien rangée.",
    "Tes listes de courses ou de tâches, tu les coches d'un simple doigt.",
    "Cortex. Ton second cerveau, dans ta poche. Sur génération app point fr.",
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
