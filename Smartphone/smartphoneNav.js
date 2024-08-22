document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    let sectionElems = Array.from(sections.children);

    let sectionWidth = sections.offsetWidth;
  

    function generateUniqueId(baseId, suffix) {
        return `${baseId}-${suffix}`;
    }

    function createClones() {
        const originalSections = document.querySelectorAll('.sections > section:not([id*="-clone"])');
        const firstClone = originalSections[0].cloneNode(true);
        const lastClone = originalSections[originalSections.length - 1].cloneNode(true);

        updateCloneIds(firstClone, 'first-clone');
        updateCloneIds(lastClone, 'last-clone');

        sections.appendChild(firstClone);
        sections.insertBefore(lastClone, originalSections[0]);
    }

    function updateCloneIds(clone, suffix) {
        clone.id = generateUniqueId(clone.id, suffix);
        const iframes = clone.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.id = generateUniqueId(iframe.id, suffix);
            iframe.parentNode.id = generateUniqueId(iframe.parentNode.id, suffix);
        });
    }

    function updateClones() {
        console.log("Updating clones");

        // Supprimer les anciens clones
        const oldClones = document.querySelectorAll('.sections > section[id*="-clone"]');
        oldClones.forEach(clone => clone.remove());

        // Recréer les clones
        createClones();

        // Réinitialiser les éléments de section
        sectionElems = Array.from(sections.children);
    }

    function handleScroll() {
        const currentScrollLeft = sections.scrollLeft;
        const totalSections = sectionElems.length;
        const currentSectionIndex = Math.round(currentScrollLeft / sectionWidth);


        console.log(sectionWidth * (totalSections - 2));

        // Vérifier si l'utilisateur a atteint la fin des sections réelles
        
        if (currentScrollLeft >= sectionWidth * (totalSections - 1) - 1) {
            sections.scrollLeft = sectionWidth; // Repositionner vers le début des clones
            updateClones(); // Mettre à jour les clones
        } else if (currentScrollLeft <= 1) {
            sections.scrollLeft = sectionWidth * (totalSections - 2); // Repositionner vers la fin réelle
            updateClones(); // Mettre à jour les clones
        }
        

        if(currentScrollLeft === sectionWidth * (totalSections - 2)){ //permet de mettre a jour les clone quand on passe de blue a about
            updateClones();
        }

        // Mettre à jour les boutons actifs
        buttons.forEach((button, index) => {
            if (index === currentSectionIndex - 1) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    function initializeView() {
        createClones();
        sectionElems = Array.from(sections.children);
        sections.scrollLeft = sectionWidth;
        buttons[0].classList.add('active');
    }

    sections.addEventListener('scroll', handleScroll);

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const scrollDistance = (index + 1) * sectionWidth;
            sections.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('resize', () => {
        sectionWidth = sections.offsetWidth;
        sections.scrollLeft = sectionWidth;
    });

    setTimeout(() => {
        initializeView();
    }, 0);
});
