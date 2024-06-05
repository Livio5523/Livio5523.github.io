function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const mainMenu = document.querySelector('.mainMenu');
    const isVisible = menu.style.display === 'block';

    if (!isVisible) {
        // Ferme tous les menus
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const menu = bar.querySelector('.menu');
            menu.style.display = 'none';
            bar.classList.remove('expanded');
            mainMenu.style.display ='block';
        });
        // Ouvre le menu de la barre cliquée
        mainMenu.style.display ='none';
        menu.style.display = 'block';
        bar.classList.add('expanded');
        const width = document.body.offsetWidth;
        const barsWidth = bar.clientWidth;
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth)) + "px");
    } else {
        // Ferme le menu de la barre cliquée
        menu.style.display = 'none';
        bar.classList.remove('expanded');
        mainMenu.style.display ='block';
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const bars = document.querySelectorAll('.bar');
    const projets = document.querySelectorAll('.projet');

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });

    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            e.stopPropagation(); // Prevent event propagation

            const projetId = projet.getAttribute('href').substring(1);
            const iframeContainer = document.getElementById(`container-${projetId}`);
            const isOpen = projet.classList.contains('open');

            if (isOpen) {
                iframeContainer.style.display = 'none';
                projet.classList.remove('open');
            } else {
                iframeContainer.style.display = 'block';
                projet.classList.add('open');
            }
        });
    });
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