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
            const isOpen = projet.classList.contains('project-open');
    
            // Ferme l'iframe si elle est déjà ouverte
            if (isOpen) {
                iframe.style.display = 'none';
                projet.classList.remove('project-open');
            } else {
                
                // Affiche l'iframe sous le bouton cliqué
                iframe.style.position = 'absolute';
                const projetRect = projet.getBoundingClientRect();
                const iframeTop = projetRect.bottom; // Position de début de l'iframe
                iframe.style.top = `${iframeTop}px`;
                iframe.style.left = '0'; // Alignement à gauche
                iframe.style.display = 'block';
    
                projet.classList.add('project-open'); // Ajoute la classe pour indiquer que l'iframe est ouverte
                // Ajuste la variable CSS pour déplacer les autres barres
                const iframeHeight = iframe.offsetHeight;
                document.documentElement.style.setProperty('--iframeSize', `${iframeHeight}px`);
            }
        });
    });
});
