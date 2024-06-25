document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');

    // Calcul de la largeur d'une section
    const sectionWidth = sections.offsetWidth;

    // Associer chaque bouton à sa section respective
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            const sectionIndex = Array.from(sections.children).indexOf(section);
            const scrollDistance = sectionIndex * sectionWidth;

            // Faire défiler jusqu'à la section de manière contrôlée
            sections.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    });

    let startX;
    let isDown = false;
    let dragStart;



    sections.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 3; // scroll-fast
        sections.scrollLeft = dragStart - walk;
    });


    // Highlight the active button based on the visible section
    sections.addEventListener('scroll', () => {
        const currentSectionIndex = Math.round(sections.scrollLeft / sectionWidth);
        buttons.forEach((button, index) => {
            if (index === currentSectionIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });
});
