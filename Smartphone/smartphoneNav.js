document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    const sectionElems = Array.from(sections.children);
    
    // Calcul de la largeur d'une section
    const sectionWidth = sections.offsetWidth;

    // Clone first and last sections for infinite scroll illusion
    const firstClone = sectionElems[0].cloneNode(true);
    const lastClone = sectionElems[sectionElems.length - 1].cloneNode(true);

    // Add clones to DOM
    sections.appendChild(firstClone);
    sections.insertBefore(lastClone, sectionElems[0]);

    // Adjust scroll position to account for the initial clone
    sections.scrollLeft = sectionWidth;

    // Associer chaque bouton à sa section respective
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            const sectionIndex = sectionElems.indexOf(section) + 1; // Adjust index for clone
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

    sections.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        dragStart = sections.scrollLeft;
    });

    sections.addEventListener('mouseup', () => {
        isDown = false;
    });

    sections.addEventListener('mouseleave', () => {
        isDown = false;
    });

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
            if (index === currentSectionIndex - 1) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });

    // Ajout de la boucle de défilement
    sections.addEventListener('scroll', () => {
        if (sections.scrollLeft >= (sectionWidth * (sectionElems.length + 1))) {
            sections.scrollTo({ left: sectionWidth, behavior: 'instant' });
        } else if (sections.scrollLeft <= 0) {
            sections.scrollTo({ left: sectionWidth * sectionElems.length, behavior: 'instant' });
        }
    });

    const projetsSmart = document.querySelectorAll('.projetSmart');


    projetsSmart.forEach((projetSmart) => {
        projetSmart.addEventListener("click", () => {

            const projetSmartId = projetSmart.getAttribute('href').substring(1);
            const iframeContainer = document.getElementById(`container-${projetSmartId}`);
            const iframe = iframeContainer.querySelector('iframe');
            const isOpen = projetSmart.classList.contains('open');

            if (isOpen) {
                // Si le projet est déjà ouvert, le fermer
                closeProject(iframeContainer, projetSmart);
            } else {
                // Ouvrir le projet cliqué
                openProject(iframeContainer, projetSmart, iframe);
            }
        });
    });
});


