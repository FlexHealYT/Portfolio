// Facteur de conversion pour les émissions CO2 (kg CO2 par km)
const FACTEUR_CO2 = 0.23;

// Seuils d'impact en kg CO2
const SEUIL_FAIBLE = 175;
const SEUIL_MOYEN = 2000;

const API_KEY = '546edcc859msh905108bbc91fb41p1fae6ajsn878ccfa0ef26';
const API_HOST = 'distanceto.p.rapidapi.com';
const API_URL = 'https://distanceto.p.rapidapi.com/distance/route';

// Fonction pour calculer la distance entre deux villes
async function calculerDistance(depart, destination) {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': API_HOST,
                'x-rapidapi-key': API_KEY
            },
            body: JSON.stringify({
                route: [{
                    name: depart,
                    country: "FRA"
                }, {
                    name: destination,
                    country: "FRA"
                }]
            })
        };

        const response = await fetch(API_URL, options);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            // Vérification spécifique pour le quota dépassé
            if (response.status === 429) {
                throw new Error("Le quota de l'API a été dépassé. Veuillez saisir manuellement la distance en kilomètres.");
            }
            throw new Error(data.message || "Erreur lors du calcul de la distance");
        }

        // La distance est retournée en km dans data.route.vincenty
        return data.route.vincenty;
    } catch (error) {
        console.error("Erreur:", error);
        // Si c'est une erreur de quota, on affiche un message spécifique
        if (error.message.includes("quota")) {
            throw error;
        }
        throw new Error("Impossible de calculer la distance entre ces villes");
    } finally {
        loading.style.display = "none";
    }
}

async function calc() {
    // Récupération des éléments DOM
    const res = document.getElementById("resultat");
    const name = document.getElementById("name").value.trim();
    const fname = document.getElementById("fname").value.trim();
    const depart = document.getElementById("depart").value.trim();
    const dest = document.getElementById("voyage").value.trim();
    const distanceInput = document.getElementById("distance").value.trim();

    // Validation des entrées
    if (!name || !fname || !dest || !depart) {
        res.innerHTML = "Veuillez remplir tous les champs";
        return null;
    }

    try {
        // Utilisation de la distance saisie si elle existe, sinon calcul via l'API
        let dist;
        if (distanceInput) {
            dist = parseFloat(distanceInput);
        } else {
            dist = await calculerDistance(depart, dest);
        }

        // Calcul des émissions CO2
        const conso = FACTEUR_CO2 * dist * 2;

        // Affichage du résultat
        res.innerHTML = `Monsieur ou Madame ${name} ${fname}, au cours de votre voyage en avion ${depart}-${dest} (${dist.toFixed(2)} km ±5km), l'émission de votre transport sera de ${conso.toFixed(2)} kg de CO2`;
        return conso.toFixed(2);
    } catch (error) {
        res.innerHTML = error.message;
        return null;
    }
}

async function vulgariser() {
    const vulg_res = document.getElementById("vulg");
    const impactContainer = document.getElementById("impact-container");
    const conso = await calc();

    // Si le calcul a échoué, on ne fait rien
    if (conso === null) {
        vulg_res.innerHTML = "<p>Sélectionnez une destination pour voir l'impact environnemental</p>";
        impactContainer.classList.remove('impact-faible', 'impact-moyen', 'impact-fort');
        return;
    }

    // Détermination de l'impact selon les seuils
    let impactMessage = "";
    let impactColor = "";
    let impactDetails = "";
    let impactClass = "";

    if (conso < SEUIL_FAIBLE) {
        impactMessage = "Ce trajet aura un faible impact";
        impactColor = "green";
        impactClass = "impact-faible";
        impactDetails = `
            <p>Impact faible :</p>
            <ul>
                <li>Équivalent à ${Math.round(conso / 2)} jours d'émission d'un foyer français moyen</li>
                <li>Peut être compensé par la plantation de ${Math.round(conso / 20)} arbres</li>
                <li>Impact minimal sur l'environnement</li>
            </ul>
        `;
    }
    else if (conso < SEUIL_MOYEN) {
        impactMessage = "Ce trajet aura un impact moyen";
        impactColor = "orange";
        impactClass = "impact-moyen";
        impactDetails = `
            <p>Impact moyen :</p>
            <ul>
                <li>Équivalent à ${Math.round(conso / 2)} jours d'émission d'un foyer français moyen</li>
                <li>Nécessite la plantation de ${Math.round(conso / 20)} arbres pour compensation</li>
                <li>Impact significatif sur l'environnement</li>
            </ul>
        `;
    }
    else {
        impactMessage = "Ce trajet aura un fort impact";
        impactColor = "red";
        impactClass = "impact-fort";
        impactDetails = `
            <p>Impact fort :</p>
            <ul>
                <li>Équivalent à ${Math.round(conso / 2)} jours d'émission d'un foyer français moyen</li>
                <li>Nécessite la plantation de ${Math.round(conso / 20)} arbres pour compensation</li>
                <li>Impact très important sur l'environnement</li>
            </ul>
        `;
    }

    vulg_res.innerHTML = impactDetails;
    vulg_res.style.color = impactColor;

    // Mise à jour des classes de filtres
    impactContainer.classList.remove('impact-faible', 'impact-moyen', 'impact-fort');
    impactContainer.classList.add(impactClass);
}

// Fonction pour rechercher des villes
async function searchCity(input, suggestionsId) {
    const query = input.value.trim();
    const suggestionsDiv = document.getElementById(suggestionsId);

    if (query.length < 2) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&countrycodes=fr&type=city,town,village`);
        const data = await response.json();

        suggestionsDiv.innerHTML = '';

        if (data.length === 0) {
            suggestionsDiv.style.display = 'none';
            return;
        }

        data.forEach(city => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            // On affiche le nom de la ville et son département
            const displayName = city.display_name.split(',');
            const ville = displayName[0];
            const departement = displayName.find(part => part.includes('département') || part.includes('Département'));
            div.textContent = departement ? `${ville}, ${departement}` : ville;
            div.onclick = async () => {
                input.value = ville;
                suggestionsDiv.style.display = 'none';

                // Mise à jour automatique de la distance si les deux villes sont sélectionnées
                const depart = document.getElementById("depart").value.trim();
                const dest = document.getElementById("voyage").value.trim();
                if (depart && dest) {
                    try {
                        const dist = await calculerDistance(depart, dest);
                        document.getElementById("distance").value = Math.round(dist);
                    } catch (error) {
                        console.error("Erreur lors du calcul automatique de la distance:", error);
                    }
                }
            };
            suggestionsDiv.appendChild(div);
        });

        suggestionsDiv.style.display = 'block';
    } catch (error) {
        console.error('Erreur lors de la recherche de villes:', error);
        suggestionsDiv.style.display = 'none';
    }
}

// Fermer les suggestions quand on clique en dehors
document.addEventListener('click', function (event) {
    if (!event.target.closest('.autocomplete-container')) {
        document.querySelectorAll('.suggestions').forEach(suggestions => {
            suggestions.style.display = 'none';
        });
    }
});