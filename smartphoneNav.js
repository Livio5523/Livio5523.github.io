document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    const sectionCount = document.querySelectorAll('.sections section').length;

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
    let scrollLeft;
    let isDown = false;
    let dragStart;
    let dragEnd;

    sections.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        dragStart = sections.scrollLeft;
    });

    sections.addEventListener('mouseup', () => {
        isDown = false;
        dragEnd = sections.scrollLeft;
        checkSlide();
    });

    sections.addEventListener('mouseleave', () => {
        isDown = false;
        dragEnd = sections.scrollLeft;
        checkSlide();
    });

    sections.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 3; // scroll-fast
        sections.scrollLeft = dragStart - walk;
    });

    function checkSlide() {
        // Calculate the current section index
        const currentSectionIndex = Math.round(sections.scrollLeft / sectionWidth);

        // Check if scrolled to the end and loop back to the beginning
        if (sections.scrollLeft <= 0) {
            sections.scrollLeft = sections.scrollWidth - sectionWidth;
        }
        // Check if scrolled to the beginning and loop back to the end
        else if (sections.scrollLeft >= sections.scrollWidth - sections.clientWidth) {
            sections.scrollLeft = 0;
        }
    }

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
