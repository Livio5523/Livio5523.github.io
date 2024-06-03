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


document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll('.bar');
    const projets = document.querySelectorAll('.projet');

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });

    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.stopPropagation(); // Empêche la propagation de l'événement de clic

            const iframeId = projet.getAttribute('href').substring(1); // Identifiant unique de l'iframe
            const iframe = document.getElementById(iframeId);
            const isVisible = getComputedStyle(iframe).display !== 'none';

            // Ferme l'iframe si elle est déjà visible
            if (isVisible) {
                iframe.style.display = 'none';
            } else {
                // Calcul de la position de l'iframe en dessous de l'option de projet
                const projetRect = projet.getBoundingClientRect();
                const iframeTop = projetRect.bottom; // Position de début de l'iframe
                console.log(projetRect);

                // Affiche l'iframe sous le bouton cliqué
                iframe.style.position = 'absolute';
                iframe.style.top = `${iframeTop}px`;
                iframe.style.left = '0'; // Alignement à gauche
                iframe.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const projects = document.querySelectorAll('.menu-green .projet');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('show');
        }, index * 500); // 500ms delay between each option
    });
});