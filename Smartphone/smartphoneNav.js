function startSlideshows() {
    const slideshows = [
        { slides: document.getElementsByClassName('mySlidesRED'), index: 0 },
        { slides: document.getElementsByClassName('mySlidesGREEN'), index: 0 },
        { slides: document.getElementsByClassName('mySlidesBLUE'), index: 0 },
    ];

    slideshows.forEach(showSlides);
    function showSlides(slideshow) {
        const { slides, index } = slideshow;
        if (slides.length === 0) return;

        const currentSlide = slides[index];
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex];

        Array.from(slides).forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('slide-in', 'slide-out');
        });

        currentSlide.style.display = 'block';
        currentSlide.classList.add('slide-out');

        nextSlide.style.display = 'block';
        nextSlide.classList.add('slide-in');

        slideshow.index = nextIndex;
        setTimeout(() => showSlides(slideshow), 5000); // Duration to display the slide before starting the slide-out animation
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    const originalSectionElems = Array.from(sections.children);
    
    // Calcul de la largeur d'une section
    let sectionWidth = sections.offsetWidth;

    // Initialisation des clones (basés sur les sections correctes)
    let firstClone = originalSectionElems[0].cloneNode(true);
    let lastClone = originalSectionElems[originalSectionElems.length - 1].cloneNode(true);

    // Ajout des clones au DOM
    sections.appendChild(firstClone);
    sections.insertBefore(lastClone, originalSectionElems[0]);

    // Mise à jour de sectionElems pour inclure les clones
    let sectionElems = Array.from(sections.children);

    // Positionnement initial pour afficher la première section réelle
    sections.scrollLeft = sectionWidth;

    // Associer chaque bouton à sa section respective
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            const sectionIndex = originalSectionElems.indexOf(section) + 1; // Ajuster l'index pour tenir compte du clone
            const scrollDistance = sectionIndex * sectionWidth;
    
            // Faire défiler jusqu'à la section de manière contrôlée
            sections.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    });

    // Fonction pour mettre à jour les clones de manière dynamique
    function updateClones() {
        // Supprimer les anciens clones
        sections.removeChild(firstClone);
        sections.removeChild(lastClone);

        // Recréer les clones basés sur l'état actuel des sections originales
        firstClone = originalSectionElems[0].cloneNode(true);
        lastClone = originalSectionElems[originalSectionElems.length - 1].cloneNode(true);

        // Ajouter les nouveaux clones au DOM
        sections.appendChild(firstClone);
        sections.insertBefore(lastClone, originalSectionElems[0]);

        // Mettre à jour la liste des éléments de section pour inclure les nouveaux clones
        sectionElems = Array.from(sections.children);
    }

    // Gestion des événements de défilement
    sections.addEventListener('scroll', () => {
        const currentSectionIndex = Math.round(sections.scrollLeft / sectionWidth);

        if (sections.scrollLeft >= sectionWidth * (sectionElems.length - 1)) {
            // Transition de la dernière section à la première
            updateClones();
            sections.scrollTo({
                left: sectionWidth,
                behavior: 'instant'
            });
        } else if (sections.scrollLeft <= 0) {
            // Transition de la première section à la dernière
            updateClones();
            sections.scrollTo({
                left: sectionWidth * (sectionElems.length - 2),
                behavior: 'instant'
            });
        }

        // Mise à jour des boutons actifs
        buttons.forEach((button, index) => {
            if (index === currentSectionIndex - 1) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });

    // Réinitialisation des clones et de la position au redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        sectionWidth = sections.offsetWidth;
        sections.scrollLeft = sectionWidth;
        updateClones();
    });

    // Initialisation de la position et des boutons actifs
    setTimeout(() => {
        sections.scrollLeft = sectionWidth;
        buttons[0].classList.add('active');
    }, 0);
});
