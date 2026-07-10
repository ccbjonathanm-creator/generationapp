"""
Voix off de la vidéo OFF-GRID (Edge TTS, gratuit).

    pip install edge-tts
    py generer_voix.py

Crée voix/vo0.mp3 ... voix/vo6.mp3. Phrases identiques aux sous-titres de config.js.
"""
import asyncio, os
import edge_tts

VOIX  = "fr-FR-HenriNeural"   # même voix que Coffre (homme posé)
DEBIT = "+8%"

PHRASES = [
    "Voici Off-Grid. L'appli qui t'aide à devenir autonome, pas à pas.",
    "Fais ton bilan d'autonomie, un score clair sur ton énergie, ton eau, ta nourriture et tes déchets.",
    "Un parcours en trois niveaux te guide, module par module, avec des actions concrètes à cocher.",
    "Des calculateurs dimensionnent ton installation, panneaux solaires, batteries, eau de pluie.",
    "Et grâce à ta position, il utilise l'ensoleillement et la pluie réels de ta commune.",
    "Il chiffre même tes économies, et ton plan complet prêt à imprimer.",
    "Off-Grid. Reprends ton autonomie, chez toi. Sur génération app point fr.",
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
