document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    let sectionElems = Array.from(sections.children);
    
    let sectionWidth = sections.offsetWidth;

    function generateUniqueId(baseId, suffix) {
        return `${baseId}-${suffix}`;
    }

    function createClones() {
        const originalSections = document.querySelectorAll('.sections > section');
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
    
        const projets = clone.querySelectorAll('.projetSmart');
        projets.forEach(projet => {
            const href = projet.getAttribute('href').substring(1);
            projet.setAttribute('href', `#${href}-${suffix}`);
        });
    }
    
    createClones();
    sectionElems = Array.from(sections.children);

    sections.scrollLeft = sectionWidth;

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const scrollDistance = (index + 1) * sectionWidth;
            sections.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    });

    sections.addEventListener('scroll', () => {
        const currentSectionIndex = Math.round(sections.scrollLeft / sectionWidth);

        if (sections.scrollLeft >= sectionWidth * (sectionElems.length - 1)) {
            sections.scrollLeft = sectionWidth;
        } else if (sections.scrollLeft <= 0) {
            sections.scrollLeft = sectionWidth * (sectionElems.length - 2);
        }

        buttons.forEach((button, index) => {
            if (index === currentSectionIndex - 1) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });

    window.addEventListener('resize', () => {
        sectionWidth = sections.offsetWidth;
        sections.scrollLeft = sectionWidth;
    });

    setTimeout(() => {
        sections.scrollLeft = sectionWidth;
        buttons[0].classList.add('active');
    }, 0);
});
