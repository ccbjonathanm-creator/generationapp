"""
Voix off de la vidéo COFFRE (Edge TTS, gratuit).

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
    "Voici Coffre. L'appli qui te montre enfin où part ton argent.",
    "Tout reste sur ton téléphone. Chiffré, protégé par ton code. Aucun compte, rien ne part sur internet.",
    "Tu importes ton relevé, et Coffre range chaque dépense dans la bonne catégorie, tout seul.",
    "D'un coup d'œil, ton solde, tes revenus, tes dépenses, et ce qu'il te reste à vivre chaque jour.",
    "Tu fixes tes budgets, et Coffre te prévient avant que tu ne dérapes.",
    "Il repère aussi les abonnements qui te grignotent, avec la lettre de résiliation déjà prête.",
    "Coffre. Tes finances, en sécurité, dans ta poche. Sur génération app point fr.",
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
