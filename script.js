document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://sc1xjvb7355.universe.wf/portfolio/';
    const projectList = document.getElementById('project-list');
    const projects = ['TP1', 'LAB2R', 'LAB1R', 'LAB3R']; // Ajoute d'autres projets ici

    projects.forEach(projectFolder => {
        const projectUrl = `${baseUrl}${projectFolder}`;
        const titleUrl = `${projectUrl}/title.txt`;
        const imageUrl = `${projectUrl}/preview.jpg`;
        const videoUrl = `${projectUrl}/preview.mp4`;
        const linkUrl = `${projectUrl}/link.txt`;

        fetch(titleUrl).then(response => {
            if (!response.ok) throw new Error(`Erreur de chargement du titre (${response.status})`);
            return response.text();
        }).then(title => {
            let finalUrl = projectUrl; // Par défaut, lien vers le projet

            // Vérifier si link.txt existe et en récupérer le contenu
            fetch(linkUrl)
                .then(response => {
                    if (!response.ok) throw new Error(`Lien alternatif non trouvé (${response.status})`);
                    return response.text();
                })
                .then(link => {
                    finalUrl = link.trim(); // Remplace le lien par celui de link.txt s'il existe
                })
                .catch(() => {
                    console.log(`Aucun lien alternatif trouvé pour ${title}`);
                })
                .finally(() => {
                    const projectItem = document.createElement('a');
                    projectItem.classList.add('project-item');
                    projectItem.href = finalUrl; // Utilisation du lien final
                    projectItem.target = "_blank"; // Ouvrir dans un nouvel onglet

                    // Création de l'image
                    const imageElement = document.createElement('img');
                    imageElement.classList.add('project-image');
                    imageElement.src = imageUrl;
                    imageElement.alt = `Aperçu de ${title}`;

                    // Ajout de l'image et du titre
                    projectItem.appendChild(imageElement);
                    projectItem.appendChild(document.createElement('h3')).innerText = title;
                    projectList.appendChild(projectItem);

                    // Vérifier si la vidéo existe avant de l'ajouter
                    fetch(videoUrl, { method: 'HEAD' })
                        .then(response => {
                            if (!response.ok) throw new Error(`Vidéo non trouvée (${response.status})`);

                            // Création de la vidéo
                            const videoElement = document.createElement('video');
                            videoElement.classList.add('project-video');
                            videoElement.src = videoUrl;
                            videoElement.muted = true;
                            videoElement.loop = true;
                            videoElement.style.display = "none"; // Cacher la vidéo par défaut

                            projectItem.appendChild(videoElement);

                            // Gestion du survol
                            projectItem.addEventListener('mouseenter', () => {
                                imageElement.style.display = "none";
                                videoElement.style.display = "block";
                                videoElement.play();
                            });

                            projectItem.addEventListener('mouseleave', () => {
                                videoElement.style.display = "none";
                                imageElement.style.display = "block";
                                videoElement.pause();
                                videoElement.currentTime = 0;
                            });
                        })
                        .catch(error => console.warn('Vidéo non disponible:', error));
                });
        }).catch(error => {
            console.error('Erreur lors du chargement du projet:', error);
        });
    });
});
