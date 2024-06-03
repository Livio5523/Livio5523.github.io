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

document.addEventListener("DOMContentLoaded", (e) => {
    const projets = document.querySelectorAll('.projet');

    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.stopPropagation(); // Empêche le clic sur le projet de fermer la barre
            console.log("oui");
        });
    });
});