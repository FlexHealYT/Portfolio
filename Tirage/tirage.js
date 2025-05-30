$(document).ready(function() {
    let participants = { "joueurs": [], "joueuses": [] };
    let nbTerrainsDouble = 0;
    let nbTerrainsSimple = 0;
    let binomes = [];
    let binomesHistoriques = [];
    let matchsSimpleHommes = [];
    let matchsSimpleFemmes = [];
    let matchsSimpleHistoriques = { hommes: [], femmes: [] };
    let joueursDernierTour = { hommes: new Set(), femmes: new Set() };
    let joueursDeuxFoisAffilee = { hommes: new Set(), femmes: new Set() };

    // Fonction pour ajouter un joueur
    $('.validerAjoutJoueur').click(function() {
        const nomJoueur = $('.ajoutJoueur').val().trim();
        if (nomJoueur) {
            if (participants["joueurs"].some(joueur => joueur.nom === nomJoueur)) {
                alert("Ce joueur existe déjà");
            } else {
                participants["joueurs"].push({ nom: nomJoueur, points: 0 });
                $('.ajoutJoueur').val('');
                updateListeJoueurs();
            }
        }
    });

    // Fonction pour ajouter une joueuse
    $('.validerAjoutJoueuse').click(function() {
        const nomJoueuse = $('.ajoutJoueuse').val().trim();
        if (nomJoueuse) {
            if (participants["joueuses"].some(joueuse => joueuse.nom === nomJoueuse)) {
                alert("Cette joueuse existe déjà");
            } else {
                participants["joueuses"].push({ nom: nomJoueuse, points: 0 });
                $('.ajoutJoueuse').val('');
                updateListeJoueuses();
            }
        }
    });

    function genererListeJoueurs() {
        $.getJSON('participants.json', function(data) {
            participants = data;
            updateListeJoueurs();
            updateListeJoueuses();
        });
    }

    // Fonction pour mettre à jour la liste des joueurs
    function updateListeJoueurs() {
        const listeJoueurs = $('.blocListeJoueurs');
        listeJoueurs.empty();

        participants["joueurs"].forEach((joueur, index) => {
            const joueurElement = $(`
                <div class="blocJoueurParticipant">
                    <div class="joueurParticipant">
                        <div>${joueur.nom}</div>
                        <div class="boutonsJoueur">
                            <button class="changerCategorie" data-index="${index}" data-categorie="joueur">
                                <img src="remplacement.png" alt="Changer de catégorie" width="14" height="14">
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3 croix supprimerJoueuse" data-index="${index}" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `);
            listeJoueurs.append(joueurElement);
        });

        $('.nbJoueurs').text(`Nombre de joueurs : ${participants["joueurs"].length}`);
    }

    // Fonction pour mettre à jour la liste des joueuses
    function updateListeJoueuses() {
        const listeJoueuses = $('.blocListeJoueuses');
        listeJoueuses.empty();

        participants["joueuses"].forEach((joueuse, index) => {
            const joueuseElement = $(`
                <div class="blocJoueuseParticipante">
                    <div class="joueuseParticipante">
                        <div>${joueuse.nom}</div>
                        <div class="boutonsJoueuse">
                            <button class="changerCategorie" data-index="${index}" data-categorie="joueuse">
                                <img src="remplacement.png" alt="Changer de catégorie" width="14" height="14">
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3 croix supprimerJoueuse" data-index="${index}" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `);
            listeJoueuses.append(joueuseElement);
        });

        $('.nbJoueuses').text(`Nombre de joueuses : ${participants["joueuses"].length}`);
    }

    genererListeJoueurs();
    // Gestion des terrains
    $('.ajouterTerrainDouble').click(function() {
        nbTerrainsDouble++;
        updateTerrainsDouble();
    });

    $('.enleverTerrainDouble').click(function() {
        if (nbTerrainsDouble > 0) {
            nbTerrainsDouble--;
            updateTerrainsDouble();
        }
    });

    $('.ajouterTerrainSimple').click(function() {
        nbTerrainsSimple++;
        updateTerrainsSimple();
    });

    $('.enleverTerrainSimple').click(function() {
        if (nbTerrainsSimple > 0) {
            nbTerrainsSimple--;
            updateTerrainsSimple();
        }
    });

    // Fonction pour mélanger un tableau
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Fonction pour créer un binôme
    function creerBinome(joueur, joueuse) {
        return {
            joueur: joueur,
            joueuse: joueuse,
            points: 0
        };
    }

    // Fonction pour vérifier si un binôme existe déjà
    function binomeExiste(joueur, joueuse) {
        return binomesHistoriques.some(binome =>
            (binome.joueur.nom === joueur.nom && binome.joueuse.nom === joueuse.nom) ||
            (binome.joueur.nom === joueuse.nom && binome.joueuse.nom === joueur.nom)
        );
    }

    // Fonction pour vérifier si un joueur est déjà utilisé
    function joueurEstUtilise(joueur, binomes) {
        return binomes.some(binome =>
            binome.joueur.nom === joueur.nom ||
            binome.joueuse.nom === joueur.nom
        );
    }

    // Fonction pour vérifier si un match simple existe déjà
    function matchSimpleExiste(joueur1, joueur2, estHomme) {
        if (!joueur1 || !joueur2) return false;

        const matchs = estHomme ? matchsSimpleHistoriques.hommes : matchsSimpleHistoriques.femmes;
        return matchs.some(match =>
            (match.joueur1 && match.joueur2 &&
             ((match.joueur1.nom === joueur1.nom && match.joueur2.nom === joueur2.nom) ||
              (match.joueur1.nom === joueur2.nom && match.joueur2.nom === joueur1.nom)))
        );
    }

    // Fonction pour mettre à jour les terrains de double
    function updateTerrainsDouble() {
        const blocTerrainsDouble = $('.blocTerrainsDouble');
        blocTerrainsDouble.empty();

        for (let i = 1; i <= nbTerrainsDouble; i++) {
            const binome1 = binomes[(i-1)*2];
            const binome2 = binomes[(i-1)*2 + 1];

            const terrainElement = $(`
                <div class="blocTerrainDouble blocTerrain-${i}">
                    <div class="terrain terrain-${i}">Terrain ${i}</div>
                    <div class="blocJoueur">
                        <button class="victoire-double victoire-double-${i} ${binome1 && binome2 && (binome1.joueur.victoire || binome2.joueur.victoire) ? 'disabled' : ''}">V</button>
                        <div>
                            <div class="joueur joueur-${i*4-3} ${binome1 ? binome1.joueur.victoire ? 'victoire' : binome1.joueur.defaite ? 'defaite' : '' : ''}">${binome1 ? binome1.joueur.nom : ''}</div>
                            <div class="joueur joueuse joueur-${i*4-2} ${binome1 ? binome1.joueuse.victoire ? 'victoire' : binome1.joueuse.defaite ? 'defaite' : '' : ''}">${binome1 ? binome1.joueuse.nom : ''}</div>
                        </div>
                        <div class="vs">VS</div>
                        <div>
                            <div class="joueur joueur-${i*4-1} ${binome2 ? binome2.joueur.victoire ? 'victoire' : binome2.joueur.defaite ? 'defaite' : '' : ''}">${binome2 ? binome2.joueur.nom : ''}</div>
                            <div class="joueur joueuse joueur-${i*4} ${binome2 ? binome2.joueuse.victoire ? 'victoire' : binome2.joueuse.defaite ? 'defaite' : '' : ''}">${binome2 ? binome2.joueuse.nom : ''}</div>
                        </div>
                        <button class="victoire-double victoire-double-${i} ${binome1 && binome2 && (binome1.joueur.victoire || binome2.joueur.victoire) ? 'disabled' : ''}">V</button>
                    </div>
                </div>
            `);
            blocTerrainsDouble.append(terrainElement);
        }

        // Supprimer les anciens gestionnaires d'événements
        $(document).off('click', '.victoire-double');

        // Ajouter les nouveaux gestionnaires d'événements pour les boutons de victoire des doubles
        $(document).on('click', '.victoire-double', function() {
            const button = $(this);
            const classes = button.attr('class').split(' ');
            const terrainClass = classes.find(c => c.startsWith('victoire-double-'));
            const terrainIndex = parseInt(terrainClass.split('-')[2]);
            const isFirstButton = button.is(':first-child');
            const binomeIndex = (terrainIndex - 1) * 2;

            // Réinitialiser les états de victoire/défaite pour ce terrain
            const binome1 = binomes[binomeIndex];
            const binome2 = binomes[binomeIndex + 1];

            if (binome1) {
                binome1.joueur.victoire = false;
                binome1.joueur.defaite = false;
                binome1.joueuse.victoire = false;
                binome1.joueuse.defaite = false;
            }

            if (binome2) {
                binome2.joueur.victoire = false;
                binome2.joueur.defaite = false;
                binome2.joueuse.victoire = false;
                binome2.joueuse.defaite = false;
            }

            // Mettre à jour les états et les points selon le bouton cliqué
            if (isFirstButton) {
                if (binome1) {
                    binome1.joueur.victoire = true;
                    binome1.joueuse.victoire = true;
                    // Mettre à jour les points
                    binome1.joueur.points += 1;
                    binome1.joueuse.points += 1;
                }
                if (binome2) {
                    binome2.joueur.defaite = true;
                    binome2.joueuse.defaite = true;
                }
            } else {
                if (binome1) {
                    binome1.joueur.defaite = true;
                    binome1.joueuse.defaite = true;
                }
                if (binome2) {
                    binome2.joueur.victoire = true;
                    binome2.joueuse.victoire = true;
                    // Mettre à jour les points
                    binome2.joueur.points += 1;
                    binome2.joueuse.points += 1;
                }
            }

            // Mettre à jour l'affichage
            updateTerrainsDouble();
            updateScoreboard();
        });
    }

    // Fonction pour mettre à jour les terrains de simple
    function updateTerrainsSimple() {
        const blocTerrainsSimple = $('.blocTerrainsSimple');
        blocTerrainsSimple.empty();

        // Créer les terrains pour les hommes
        for (let i = 1; i <= nbTerrainsSimple; i++) {
            const match = matchsSimpleHommes[i-1] || { joueur1: null, joueur2: null };
            const terrainElement = $(`
                <div class="blocTerrainSimple blocTerrain-simple-homme-${i}">
                    <div class="terrain terrain-simple-homme-${i}">Terrain Simple Homme ${i}</div>
                    <div class="blocJoueur">
                        <button class="victoire-simple victoire-simple-homme-${i*2-1} ${match.joueur1 && match.joueur2 && (match.joueur1.victoire || match.joueur2.victoire) ? 'disabled' : ''}">V</button>
                        <div>
                            <div class="joueur joueurSimple-homme-${i*2-1} ${match.joueur1 ? match.joueur1.victoire ? 'victoire' : match.joueur1.defaite ? 'defaite' : '' : ''}">${match.joueur1 ? match.joueur1.nom : 'Pas assez de joueurs'}</div>
                        </div>
                        <div class="vs">VS</div>
                        <div>
                            <div class="joueur joueurSimple-homme-${i*2} ${match.joueur2 ? match.joueur2.victoire ? 'victoire' : match.joueur2.defaite ? 'defaite' : '' : ''}">${match.joueur2 ? match.joueur2.nom : ''}</div>
                        </div>
                        <button class="victoire-simple victoire-simple-homme-${i*2} ${match.joueur1 && match.joueur2 && (match.joueur1.victoire || match.joueur2.victoire) ? 'disabled' : ''}">V</button>
                    </div>
                </div>
            `);
            blocTerrainsSimple.append(terrainElement);
        }

        // Créer les terrains pour les femmes
        for (let i = 1; i <= nbTerrainsSimple; i++) {
            const match = matchsSimpleFemmes[i-1] || { joueuse1: null, joueuse2: null };
            const terrainElement = $(`
                <div class="blocTerrainSimple blocTerrain-simple-femme-${i}">
                    <div class="terrain terrain-simple-femme-${i}">Terrain Simple Femme ${i}</div>
                    <div class="blocJoueur">
                        <button class="victoire-simple victoire-simple-femme-${i*2-1} ${match.joueuse1 && match.joueuse2 && (match.joueuse1.victoire || match.joueuse2.victoire) ? 'disabled' : ''}">V</button>
                        <div>
                            <div class="joueur joueurSimple-femme-${i*2-1} ${match.joueuse1 ? match.joueuse1.victoire ? 'victoire' : match.joueuse1.defaite ? 'defaite' : '' : ''}">${match.joueuse1 ? match.joueuse1.nom : 'Pas assez de joueuses'}</div>
                        </div>
                        <div class="vs">VS</div>
                        <div>
                            <div class="joueur joueurSimple-femme-${i*2} ${match.joueuse2 ? match.joueuse2.victoire ? 'victoire' : match.joueuse2.defaite ? 'defaite' : '' : ''}">${match.joueuse2 ? match.joueuse2.nom : ''}</div>
                        </div>
                        <button class="victoire-simple victoire-simple-femme-${i*2} ${match.joueuse1 && match.joueuse2 && (match.joueuse1.victoire || match.joueuse2.victoire) ? 'disabled' : ''}">V</button>
                    </div>
                </div>
            `);
            blocTerrainsSimple.append(terrainElement);
        }

        // Supprimer les anciens gestionnaires d'événements
        $(document).off('click', '.victoire-simple');

        // Ajouter les nouveaux gestionnaires d'événements pour les boutons de victoire des simples
        $(document).on('click', '.victoire-simple', function() {
            const button = $(this);
            const classes = button.attr('class').split(' ');
            const isHomme = classes.some(c => c.includes('homme'));
            const terrainClass = classes.find(c => c.startsWith('victoire-simple-'));
            const terrainIndex = parseInt(terrainClass.split('-')[3]);
            const isFirstButton = terrainIndex % 2 === 1;
            const matchIndex = Math.floor((terrainIndex - 1) / 2);

            const match = isHomme ? matchsSimpleHommes[matchIndex] : matchsSimpleFemmes[matchIndex];
            if (!match) {
                return;
            }

            // Réinitialiser les états de victoire/défaite
            if (isHomme) {
                if (match.joueur1) {
                    match.joueur1.victoire = false;
                    match.joueur1.defaite = false;
                }
                if (match.joueur2) {
                    match.joueur2.victoire = false;
                    match.joueur2.defaite = false;
                }
            } else {
                if (match.joueuse1) {
                    match.joueuse1.victoire = false;
                    match.joueuse1.defaite = false;
                }
                if (match.joueuse2) {
                    match.joueuse2.victoire = false;
                    match.joueuse2.defaite = false;
                }
            }

            // Mettre à jour les états et les points selon le bouton cliqué
            if (isHomme) {
                if (isFirstButton) {
                    if (match.joueur1) {
                        match.joueur1.victoire = true;
                        // Mettre à jour les points dans participants
                        const joueur1 = participants["joueurs"].find(j => j.nom === match.joueur1.nom);
                        if (joueur1) joueur1.points += 1;
                    }
                    if (match.joueur2) {
                        match.joueur2.defaite = true;
                    }
                } else {
                    if (match.joueur1) {
                        match.joueur1.defaite = true;
                    }
                    if (match.joueur2) {
                        match.joueur2.victoire = true;
                        // Mettre à jour les points dans participants
                        const joueur2 = participants["joueurs"].find(j => j.nom === match.joueur2.nom);
                        if (joueur2) joueur2.points += 1;
                    }
                }
            } else {
                if (isFirstButton) {
                    if (match.joueuse1) {
                        match.joueuse1.victoire = true;
                        // Mettre à jour les points dans participants
                        const joueuse1 = participants["joueuses"].find(j => j.nom === match.joueuse1.nom);
                        if (joueuse1) joueuse1.points += 1;
                    }
                    if (match.joueuse2) {
                        match.joueuse2.defaite = true;
                    }
                } else {
                    if (match.joueuse1) {
                        match.joueuse1.defaite = true;
                    }
                    if (match.joueuse2) {
                        match.joueuse2.victoire = true;
                        // Mettre à jour les points dans participants
                        const joueuse2 = participants["joueuses"].find(j => j.nom === match.joueuse2.nom);
                        if (joueuse2) joueuse2.points += 1;
                    }
                }
            }

            // Mettre à jour l'affichage
            updateTerrainsSimple();
            updateScoreboard();
        });
    }

    // Fonction pour mettre à jour les joueurs du dernier tour
    function updateJoueursDernierTour() {
        joueursDernierTour.hommes.clear();
        joueursDernierTour.femmes.clear();

        // Ajouter les joueurs des doubles
        binomes.forEach(binome => {
            joueursDernierTour.hommes.add(binome.joueur.nom);
            joueursDernierTour.femmes.add(binome.joueuse.nom);
        });

        // Ajouter les joueurs des simples hommes
        matchsSimpleHommes.forEach(match => {
            if (match.joueur1) joueursDernierTour.hommes.add(match.joueur1.nom);
            if (match.joueur2) joueursDernierTour.hommes.add(match.joueur2.nom);
        });

        // Ajouter les joueurs des simples femmes
        matchsSimpleFemmes.forEach(match => {
            if (match.joueuse1) joueursDernierTour.femmes.add(match.joueuse1.nom);
            if (match.joueuse2) joueursDernierTour.femmes.add(match.joueuse2.nom);
        });
    }

    // Fonction pour trier les joueurs par priorité (ceux qui n'ont pas joué au dernier tour en premier)
    function trierJoueursParPriorite(joueurs, estHomme) {
        return [...joueurs].sort((a, b) => {
            const aJoue = joueursDernierTour[estHomme ? 'hommes' : 'femmes'].has(a.nom);
            const bJoue = joueursDernierTour[estHomme ? 'hommes' : 'femmes'].has(b.nom);
            if (aJoue === bJoue) return 0;
            return aJoue ? 1 : -1;
        });
    }

    // Tirage au sort
    $('.tirageAuSort').click(function() {
        const joueursDisponibles = [...participants["joueurs"]];
        const joueusesDisponibles = [...participants["joueuses"]];

        // Sauvegarder les états de victoire/défaite actuels
        const etatsActuels = {};
        binomes.forEach((binome, index) => {
            etatsActuels[`${binome.joueur.nom}-${binome.joueuse.nom}`] = {
                joueur: { victoire: binome.joueur.victoire, defaite: binome.joueur.defaite },
                joueuse: { victoire: binome.joueuse.victoire, defaite: binome.joueuse.defaite }
            };
        });

        // Réinitialiser les états de victoire/défaite des binômes historiques
        binomesHistoriques.forEach(binome => {
            binome.joueur.victoire = false;
            binome.joueur.defaite = false;
            binome.joueuse.victoire = false;
            binome.joueuse.defaite = false;
        });

        binomes = []; // Réinitialiser les binômes actuels

        // Mélanger les listes
        shuffleArray(joueursDisponibles);
        shuffleArray(joueusesDisponibles);

        // Trier les joueurs par priorité
        joueursDisponibles.sort((a, b) => {
            const aJoue = joueursDernierTour.hommes.has(a.nom);
            const bJoue = joueursDernierTour.hommes.has(b.nom);
            if (aJoue === bJoue) return 0;
            return aJoue ? 1 : -1;
        });

        joueusesDisponibles.sort((a, b) => {
            const aJoue = joueursDernierTour.femmes.has(a.nom);
            const bJoue = joueursDernierTour.femmes.has(b.nom);
            if (aJoue === bJoue) return 0;
            return aJoue ? 1 : -1;
        });

        // Tirage au sort des doubles si des terrains de double existent
        if (nbTerrainsDouble > 0) {
            // Calculer le nombre total de binômes nécessaires
            const nbBinomesNecessaires = nbTerrainsDouble * 2; // 2 binômes par terrain de double

            // Créer les binômes pour les terrains de double
            for (let i = 0; i < nbBinomesNecessaires; i++) {
                let binomeTrouve = false;
                let tentatives = 0;
                const maxTentatives = 50; // Pour éviter une boucle infinie

                while (!binomeTrouve && tentatives < maxTentatives) {
                    // Trouver un joueur et une joueuse non utilisés
                    let joueurIndex = -1;
                    let joueuseIndex = -1;

                    for (let j = 0; j < joueursDisponibles.length; j++) {
                        if (!joueurEstUtilise(joueursDisponibles[j], binomes)) {
                            joueurIndex = j;
                            break;
                        }
                    }

                    for (let j = 0; j < joueusesDisponibles.length; j++) {
                        if (!joueurEstUtilise(joueusesDisponibles[j], binomes)) {
                            joueuseIndex = j;
                            break;
                        }
                    }

                    if (joueurIndex !== -1 && joueuseIndex !== -1) {
                        const joueur = joueursDisponibles[joueurIndex];
                        const joueuse = joueusesDisponibles[joueuseIndex];

                        if (!binomeExiste(joueur, joueuse)) {
                            const nouveauBinome = creerBinome(joueur, joueuse);

                            // Restaurer les états de victoire/défaite si le binôme existait
                            const cleBinome = `${joueur.nom}-${joueuse.nom}`;
                            if (etatsActuels[cleBinome]) {
                                nouveauBinome.joueur.victoire = etatsActuels[cleBinome].joueur.victoire;
                                nouveauBinome.joueur.defaite = etatsActuels[cleBinome].joueur.defaite;
                                nouveauBinome.joueuse.victoire = etatsActuels[cleBinome].joueuse.victoire;
                                nouveauBinome.joueuse.defaite = etatsActuels[cleBinome].joueuse.defaite;
                            }

                            binomes.push(nouveauBinome);
                            binomesHistoriques.push(nouveauBinome);
                            joueursDisponibles.splice(joueurIndex, 1);
                            joueusesDisponibles.splice(joueuseIndex, 1);
                            binomeTrouve = true;
                        }
                    }

                    if (!binomeTrouve) {
                        shuffleArray(joueursDisponibles);
                        shuffleArray(joueusesDisponibles);
                        tentatives++;
                    }
                }

                if (!binomeTrouve) {
                    const nbBinomesPossibles = participants["joueurs"].length * participants["joueuses"].length;
                    console.log(`Nombre total de binômes uniques possibles : ${nbBinomesPossibles}`);
                    console.log(`Nombre de binômes uniques déjà créés : ${binomesHistoriques.length}`);
                    console.log(binomesHistoriques)
                    alert("Impossible de créer tous les binômes sans répétition");
                    return;
                }
            }
        }

        // Tirage au sort des terrains simples
if (nbTerrainsSimple > 0) {
    // Réinitialiser les matchs simples
    matchsSimpleHommes = [];
    matchsSimpleFemmes = [];

    // Créer des copies des listes disponibles
    const joueursDisponiblesSimple = [...participants["joueurs"]].filter(j =>
        !binomes.some(b => b.joueur.nom === j.nom)
    );
    const joueusesDisponiblesSimple = [...participants["joueuses"]].filter(j =>
        !binomes.some(b => b.joueuse.nom === j.nom)
    );

    // Trier par priorité
    joueursDisponiblesSimple.sort((a, b) => {
        const aJoue = joueursDernierTour.hommes.has(a.nom);
        const bJoue = joueursDernierTour.hommes.has(b.nom);
        if (aJoue === bJoue) return 0;
        return aJoue ? 1 : -1;
    });

    joueusesDisponiblesSimple.sort((a, b) => {
        const aJoue = joueursDernierTour.femmes.has(a.nom);
        const bJoue = joueursDernierTour.femmes.has(b.nom);
        if (aJoue === bJoue) return 0;
        return aJoue ? 1 : -1;
    });

    // Mélanger les listes
    shuffleArray(joueursDisponiblesSimple);
    shuffleArray(joueusesDisponiblesSimple);

    // Liste des joueurs déjà tirés
    let joueursTiresHommes = [];
    let joueursTiresFemmes = [];

    // Tirage au sort des matchs hommes
    for (let i = 1; i <= nbTerrainsSimple; i++) {
        let matchTrouve = false;
        let tentatives = 0;
        const maxTentatives = 50;

        while (!matchTrouve && tentatives < maxTentatives) {
            if (joueursDisponiblesSimple.length >= 2) {
                const joueur1 = joueursDisponiblesSimple[0];
                const joueur2 = joueursDisponiblesSimple[1];

                if (!matchSimpleExiste(joueur1, joueur2, true) &&
                    !joueursTiresHommes.includes(joueur1) &&
                    !joueursTiresHommes.includes(joueur2)) {

                    matchsSimpleHommes.push({
                        joueur1: { ...joueur1, victoire: false, defaite: false },
                        joueur2: { ...joueur2, victoire: false, defaite: false }
                    });
                    matchsSimpleHistoriques.hommes.push({
                        joueur1: joueur1,
                        joueur2: joueur2
                    });
                    joueursDisponiblesSimple.splice(0, 2);
                    joueursTiresHommes.push(joueur1, joueur2);
                    matchTrouve = true;
                } else {
                    shuffleArray(joueursDisponiblesSimple);
                    tentatives++;
                }
            } else {
                matchsSimpleHommes.push({ joueur1: null, joueur2: null });
                console.log(`Match simple homme ${i} impossible: pas assez de joueurs`);
                break;
            }
        }

        if (!matchTrouve) {
            matchsSimpleHommes.push({ joueur1: null, joueur2: null });
            console.log(`Match simple homme ${i} impossible: pas de match unique possible`);
        }

        // Réinitialiser la liste des joueurs tirés si nécessaire
        if (joueursDisponiblesSimple.length <= nbTerrainsSimple * 2) {
            joueursTiresHommes = [];
        }
    }

    // Tirage au sort des matchs femmes
    for (let i = 1; i <= nbTerrainsSimple; i++) {
        let matchTrouve = false;
        let tentatives = 0;
        const maxTentatives = 50;

        while (!matchTrouve && tentatives < maxTentatives) {
            if (joueusesDisponiblesSimple.length >= 2) {
                const joueuse1 = joueusesDisponiblesSimple[0];
                const joueuse2 = joueusesDisponiblesSimple[1];

                if (!matchSimpleExiste(joueuse1, joueuse2, false) &&
                    !joueursTiresFemmes.includes(joueuse1) &&
                    !joueursTiresFemmes.includes(joueuse2)) {

                    matchsSimpleFemmes.push({
                        joueuse1: { ...joueuse1, victoire: false, defaite: false },
                        joueuse2: { ...joueuse2, victoire: false, defaite: false }
                    });
                    matchsSimpleHistoriques.femmes.push({
                        joueuse1: joueuse1,
                        joueuse2: joueuse2
                    });
                    joueusesDisponiblesSimple.splice(0, 2);
                    joueursTiresFemmes.push(joueuse1, joueuse2);
                    matchTrouve = true;
                } else {
                    shuffleArray(joueusesDisponiblesSimple);
                    tentatives++;
                }
            } else {
                matchsSimpleFemmes.push({ joueuse1: null, joueuse2: null });
                console.log(`Match simple femme ${i} impossible: pas assez de joueuses`);
                break;
            }
        }

        if (!matchTrouve) {
            matchsSimpleFemmes.push({ joueuse1: null, joueuse2: null });
            console.log(`Match simple femme ${i} impossible: pas de match unique possible`);
        }

        // Réinitialiser la liste des joueurs tirés si nécessaire
        if (joueusesDisponiblesSimple.length <= nbTerrainsSimple * 2) {
            joueursTiresFemmes = [];
        }
    }
}

        // Mettre à jour l'affichage des terrains
        updateTerrainsDouble();
        updateTerrainsSimple();

        // Mettre à jour les joueurs du dernier tour
        updateJoueursDernierTour();
    });

    function updateScoreboard() {
        const scoreboardJoueurs = $('.scoreboard-joueurs');
        const scoreboardJoueuses = $('.scoreboard-joueuses');
    
        // Trier les joueurs et joueuses par points décroissants
        const joueursTries = [...participants["joueurs"]].sort((a, b) => b.points - a.points);
        const joueusesTriees = [...participants["joueuses"]].sort((a, b) => b.points - a.points);
    
        // Mettre à jour le scoreboard des joueurs
        scoreboardJoueurs.empty();
        joueursTries.forEach((joueur, index) => {
            const scoreElement = $(`
                <div class="scoreboard-item ${index === 0 ? 'or' : index === 1 ? 'argent' : index === 2 ? 'bronze' : ''}">
                    <span class="nom">${joueur.nom}</span>
                    <span class="points">${joueur.points}</span>
                </div>
            `);
            scoreboardJoueurs.append(scoreElement);
        });
    
        // Mettre à jour le scoreboard des joueuses
        scoreboardJoueuses.empty();
        joueusesTriees.forEach((joueuse, index) => {
            const scoreElement = $(`
                <div class="scoreboard-item ${index === 0 ? 'or' : index === 1 ? 'argent' : index === 2 ? 'bronze' : ''}">
                    <span class="nom">${joueuse.nom}</span>
                    <span class="points">${joueuse.points}</span>
                </div>
            `);
            scoreboardJoueuses.append(scoreElement);
        });
    }
        
    // Mettre à jour le scoreboard initial
    updateScoreboard();

    // Gestionnaires d'événements pour les suppressions et changements de catégorie
    $(document).on('click', '.supprimerJoueur', function() {
        const index = $(this).data('index');
        participants["joueurs"].splice(index, 1);
        updateListeJoueurs();
        updateScoreboard();
    });

    $(document).on('click', '.supprimerJoueuse', function() {
        const index = $(this).data('index');
        participants["joueuses"].splice(index, 1);
        updateListeJoueuses();
        updateScoreboard();
    });

    $(document).on('click', '.changerCategorie', function() {
        const index = $(this).data('index');
        const categorie = $(this).data('categorie');

        if (categorie === 'joueur') {
            // Déplacer le joueur vers les joueuses
            const joueur = participants["joueurs"][index];
            participants["joueurs"].splice(index, 1);
            participants["joueuses"].push(joueur);
        } else {
            // Déplacer la joueuse vers les joueurs
            const joueuse = participants["joueuses"][index];
            participants["joueuses"].splice(index, 1);
            participants["joueurs"].push(joueuse);
        }

        updateListeJoueurs();
        updateListeJoueuses();
        updateScoreboard();
    });

    // Ajouter le style CSS pour les boutons
    $('head').append(`
        <style>
            .victoire-double.disabled,
            .victoire-simple.disabled {
                opacity: 0.5;
                cursor: not-allowed;
                pointer-events: none;
            }
            .boutonsJoueur,
            .boutonsJoueuse {
                display: flex;
                gap: 5px;
                align-items: center;
            }
            .changerCategorie {
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
                color: #0d6efd;
            }
            .changerCategorie:hover {
                color: #0a58ca;
            }
        </style>
    `);

    // Ouvrir la pop-up du scoreboard avec animation
    $('#ouvrirScoreboard').click(function() {
        $('#scoreboardPopup').addClass('open').show();
        updateScoreboard();
    });

    // Fermer la pop-up du scoreboard avec animation
    $('.close-btn').click(function() {
        $('#scoreboardPopup').addClass('close');
    });

    // Détecter la fin de l'animation pour masquer la pop-up
    $('#scoreboardPopup').on('animationend', function() {
        if ($('#scoreboardPopup').hasClass('close')) {
            $('#scoreboardPopup').removeClass('open close').hide();
        }
    });

    // Fermer la pop-up si l'utilisateur clique en dehors de la pop-up
    $(window).click(function(event) {
        if (event.target == $('#scoreboardPopup')[0]) {
            $('#scoreboardPopup').addClass('close');
        }
    });

});
