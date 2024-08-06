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
    const sectionElems = Array.from(sections.children);
    
    // Calcul de la largeur d'une section
    const sectionWidth = sections.offsetWidth;

    // Clone first and last sections for infinite scroll illusion
    const firstClone = sectionElems[0].cloneNode(true);
    const lastClone = sectionElems[sectionElems.length - 1].cloneNode(true);

    startSlideshows();
    
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
        if (sections.scrollLeft <= 0) {
            sections.scrollTo({ left: sectionWidth * sectionElems.length, behavior: 'instant' });
        } else if (sections.scrollLeft >= (sectionWidth * sectionElems.length)) {
            sections.scrollTo({ left: 0, behavior: 'instant' });
        }
    });
});



