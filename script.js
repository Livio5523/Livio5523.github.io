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
    let openIframes = [];

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });

    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event propagation

            const iframeId = projet.getAttribute('href').substring(1); // Unique identifier of the iframe
            const iframe = document.getElementById(iframeId);
            const isOpen = projet.classList.contains('project-open');

            if (isOpen) {
                iframe.style.display = 'none';
                projet.classList.remove('project-open');
                openIframes = openIframes.filter(item => item.projet !== projet);
            } else {
                iframe.style.display = 'block';
                projet.classList.add('project-open');
                openIframes.push({ projet, iframe });
            }

            updateIframePositions();
        });
    });

    function updateIframePositions() {
        let offsetY = 0;

        openIframes.forEach(({ projet, iframe }) => {
            const projetRect = projet.getBoundingClientRect();
            iframe.style.top = `${projetRect.bottom + offsetY}px`;
            iframe.style.left = '0';
            offsetY += iframe.offsetHeight;
        });

        projets.forEach((projet) => {
            if (!openIframes.some(item => item.projet === projet)) {
                projet.style.transform = `translateY(${offsetY}px)`;
            }
        });
    }

    window.addEventListener('resize', updateIframePositions);
});


startSlideshows();

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