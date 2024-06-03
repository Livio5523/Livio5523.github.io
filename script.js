function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const isVisible = menu.style.display === 'block';

    if (!isVisible) {
        // Ferme tous les menus
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const menu = bar.querySelector('.menu');
            menu.style.display = 'none';
            bar.classList.remove('expanded');
        });
        // Ouvre le menu de la barre cliquée
        menu.style.display = 'block';
        bar.classList.add('expanded');
        const width = document.body.offsetWidth;
        const barsWidth = bar.clientWidth;
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth)) + "px");
    } else {
        // Ferme le menu de la barre cliquée
        menu.style.display = 'none';
        bar.classList.remove('expanded');
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    const bars = document.querySelectorAll('.bar');

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const projets = document.querySelectorAll('.projet');

    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.stopPropagation(); // Empêche la propagation de l'événement de clic

            const iframeId = projet.getAttribute('href').substring(1); // Identifiant unique de l'iframe
            const iframe = document.getElementById(iframeId);
            const isVisible = getComputedStyle(iframe).display !== 'none';

            // Ferme l'iframe si elle est déjà visible
            if (isVisible) {
                iframe.style.display = 'none';
                return; // Sortie de la fonction pour éviter l'exécution du reste du code
            }

            // Ferme tous les iframes
            const iframes = document.querySelectorAll('.projet-iframe');
            iframes.forEach(iframe => {
                iframe.style.display = 'none';
            });

            // Calcul de la position de l'iframe en dessous de l'option de projet
            const projetRect = projet.getBoundingClientRect();
            const iframeTop = projetRect.bottom; // Position de début de l'iframe

            // Affiche l'iframe sous le bouton cliqué
            iframe.style.position = 'absolute';
            iframe.style.top = `${iframeTop}px`;
            iframe.style.left = '0'; // Alignement à gauche
            iframe.style.display = 'block';
        });
    });
});
