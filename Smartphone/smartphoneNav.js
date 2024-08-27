document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelector('.sections');
    let sectionElems = Array.from(sections.children);

    let sectionWidth = sections.offsetWidth;
    let isUpdating = false; // Flag to prevent infinite updates
    let lastUpdatedSectionIndex = null; // Track the last updated section index

    const choices = document.querySelectorAll('.choice');

    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            const targetIndex = parseInt(choice.getAttribute('data-target'));
            const scrollDistance = targetIndex * sectionWidth;
            sections.scrollTo({
                left: scrollDistance,
                behavior: 'instant'
            });
            const mainMenuSmart = document.querySelector('.mainMenuSmart');
            mainMenuSmart.classList.add('hidden');
            sections.classList.add("open");
            const smartButtons = document.querySelector(".smartButtons");
            smartButtons.classList.add("open");
        });
    });

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
        if (isUpdating) return; // Prevent duplicate updates
        isUpdating = true;

        console.log("Updating clones");

        const oldClones = document.querySelectorAll('.sections > section[id*="-clone"]');
        oldClones.forEach(clone => clone.remove());

        createClones();
        sectionElems = Array.from(sections.children);

        isUpdating = false;
    }

    function handleScroll() {
        const currentScrollLeft = sections.scrollLeft;
        const totalSections = sectionElems.length;
        const currentSectionIndex = Math.round(currentScrollLeft / sectionWidth);

        if (currentScrollLeft >= sectionWidth * (totalSections - 1) - 1) {
            if (!isUpdating) {
                sections.scrollLeft = sectionWidth;
                updateClones(); 
            } 
        } else if (currentScrollLeft <= 1) {
            if (!isUpdating) {
                sections.scrollLeft = sectionWidth * (totalSections - 2);
                updateClones(); 
            } 
        } else if (currentSectionIndex === 1 || currentSectionIndex === totalSections - 2) {
            if (!isUpdating && lastUpdatedSectionIndex !== currentSectionIndex) {
                updateClones(); 
                lastUpdatedSectionIndex = currentSectionIndex;
            }
        } else {
            lastUpdatedSectionIndex = null;
        }

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
