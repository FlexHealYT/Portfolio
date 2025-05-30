import json

def detect_duplicate_pairs(pairs):
    seen_pairs = set()
    duplicates = []
    
    for pair in pairs:
        joueur = pair["joueur"]["nom"]
        joueuse = pair["joueuse"]["nom"]
        binome = frozenset([joueur, joueuse])  # Utilisation de frozenset pour ignorer l'ordre
        
        if binome in seen_pairs:
            duplicates.append((joueur, joueuse))
        else:
            seen_pairs.add(binome)
    
    return duplicates

# Exemple d'utilisation
data = [
    {
        "joueur": {
            "nom": "JB",
            "points": 0,
            "victoire": False,
            "defaite": False
        },
        "joueuse": {
            "nom": "Sophie",
            "points": 0,
            "victoire": False,
            "defaite": False
        },
        "points": 0
    },
    {
        "joueur": {
            "nom": "Christophe",
            "points": 0,
            "victoire": False,
            "defaite": False
        },
        "joueuse": {
            "nom": "Marie",
            "points": 0,
            "victoire": False,
            "defaite": False
        },
        "points": 0
    }
]

duplicates = detect_duplicate_pairs(data)
if duplicates:
    print("Binômes en double :", duplicates)
else:
    print("Aucun binôme en double trouvé.")