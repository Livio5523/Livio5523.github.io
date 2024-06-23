WebFont.load({
    typekit: { id: 'epr6byt' }
});

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

function CloseSmth(smth) {
    if (smth.classList.contains('show')) {
        smth.style.display = 'block';
        smth.classList.replace("show", "hide");
        smth.addEventListener('animationend', () => {
            smth.style.display = 'none';
            smth.classList.remove('hide');
        }, { once: true });
    }
}

function updateMenuPosition(bar, barLength) {
   
    const menu = bar.querySelector('.menu');
    const isVisible = menu.classList.contains('show');

    const width = document.body.offsetWidth;
    const barsWidth = bar.clientWidth;
    console.log("update");

    if (!isVisible) {
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) /* outline of bars */) + "px");
    }
}



function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const isVisible = menu.classList.contains('show');
    const width = document.body.offsetWidth;
    const barsWidth = bar.clientWidth;
    const mainMenu = document.querySelector(".mainMenu");
    
    menu.classList.remove("hide");
    if (!isVisible) {
        // Ferme tous les menus
        const bars = document.querySelectorAll('.bar');
        bars.forEach((indivBars) => {
            const barMenu = indivBars.querySelector('.menu');
            CloseSmth(barMenu);
            indivBars.classList.remove('expanded');
        });
        
        // Ouvre le menu de la barre cliquée
        bar.classList.add('expanded');
        menu.classList.add('show');
        menu.style.display = "block";
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) - 19/* outline of bars */) + "px");

    } else {
        mainMenu.style.display = "flex";
        CloseSmth(menu);
        bar.classList.remove('expanded');
        menu.classList.remove("show");
    }
    menu.addEventListener("animationend", () => {
        if (bar.classList.contains("expanded")) {
            mainMenu.style.display = "none";
        }
        if (bar.classList.contains("expanded") && menu.classList.contains("show") && menu.style.display == "none") {
            menu.style.display = "block";
        }
    });
    const show = document.querySelector(".show");
    if (show) {
        show.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll('.bar');
    const projets = document.querySelectorAll('.projet');


    startSlideshows();
    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });

    projets.forEach((projet) => {
        projet.addEventListener("click", () => {

            const projetId = projet.getAttribute('href').substring(1);
            const iframeContainer = document.getElementById(`container-${projetId}`);
            const iframe = iframeContainer.querySelector('iframe');
            const isOpen = projet.classList.contains('open');

            if (isOpen) {
                // Si le projet est déjà ouvert, le fermer
                closeProject(iframeContainer, projet);
            } else {
                // Ouvrir le projet cliqué
                openProject(iframeContainer, projet, iframe);
            }
        });
    });


    bars.forEach((bar) => {
        window.addEventListener('resize', updateMenuPosition(bar, bars.length));
    });
});
