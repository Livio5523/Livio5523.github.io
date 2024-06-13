function closeProject(iframeContainer, projet) {
    projet.classList.remove('open');
    iframeContainer.style.height = iframeContainer.scrollHeight + 'px'; // Force la hauteur avant de retirer la classe 'opening'
    iframeContainer.classList.remove('opening');
    iframeContainer.classList.add('closing');
    

    // Écoute de la fin de l'animation de fermeture
    iframeContainer.addEventListener('transitionend', () => {
        iframeContainer.style.height = ''; // Réinitialise la hauteur après la fermeture
        iframeContainer.style.display = 'none'; // Cacher le conteneur de l'iframe à la fin de l'animation
        iframeContainer.classList.remove('closing'); // Supprimer la classe 'closing' après l'animation
    }, { once: true });

    // Forcer un repaint pour que la transition soit appliquée
    setTimeout(() => {
        iframeContainer.style.height = '0';
    }, 50);
}


function openProject(iframeContainer, projet, iframe) {
    // Assurer que le conteneur de l'iframe est visible avant l'animation
    iframeContainer.style.display = 'block';
    projet.classList.add('open'); // Ajouter la classe 'open' pour indiquer que le projet est ouvert
    iframeContainer.classList.add('opening'); // Ajouter la classe 'opening' pour l'animation d'ouverture

    // Réinitialiser la hauteur au cas où elle aurait été réduite lors de la fermeture précédente
    iframeContainer.style.height = '0';

    // Calculer la hauteur réelle du contenu de l'iframe après le chargement complet
    iframe.onload = function() {
        adjustIframeHeight(iframe);
        iframeContainer.style.height = iframeContainer.scrollHeight + 'px'; // Réglez la hauteur sur la hauteur totale du contenu
    };

    // Ajuster immédiatement la hauteur si le contenu est déjà chargé
    if (iframe.contentWindow.document.readyState === 'complete') {
        adjustIframeHeight(iframe);
        iframeContainer.style.height = iframeContainer.scrollHeight + 'px'; // Réglez la hauteur sur la hauteur totale du contenu
    }      
}

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

function adjustIframeHeight(iframe) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframe.style.height = iframeDocument.documentElement.scrollHeight + 'px';

        // Vérifier les changements dans le contenu pour ajuster dynamiquement la hauteur
        const observer = new MutationObserver(() => {
            iframe.style.height = iframeDocument.documentElement.scrollHeight + 'px';
        });

        observer.observe(iframeDocument.body, { childList: true, subtree: true, attributes: true });

    } catch (error) {
        console.error("Erreur lors de l'ajustement de la hauteur de l'iframe : ", error);
    }
}

function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const mainMenu = document.querySelector('.mainMenu');
    const isVisible = menu.classList.contains('show');

    if (!isVisible) {
        // Ferme tous les menus
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const menu = bar.querySelector('.menu');
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                menu.classList.add('hide');
                menu.addEventListener('animationend', () => {
                    menu.style.display = 'none';
                    menu.classList.remove('hide');
                }, { once: true });
            }
            bar.classList.remove('expanded');
        });
        // Ouvre le menu de la barre cliquée
        mainMenu.style.display = 'none';
        menu.style.display = 'block';
        menu.classList.add('show');
        bar.classList.add('expanded');
        const width = document.body.offsetWidth;
        const barsWidth = bar.clientWidth;
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) -10/* outline of bars */) + "px");
    } else {
        // Ferme le menu de la barre cliquée
        menu.classList.remove('show');
        menu.classList.add('hide');
        menu.addEventListener('animationend', () => {
            menu.style.display = 'none';
            menu.classList.remove('hide');
        }, { once: true });
        bar.classList.remove('expanded');
        mainMenu.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", (e2) => {
    const bars = document.querySelectorAll('.bar');
    const projets = document.querySelectorAll('.projet');

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length);
        });
    });

    const iframeContainers = document.querySelectorAll('.projet-iframe-container');
    
    // Parcours de chaque conteneur d'iframe
    iframeContainers.forEach((container, index) => {
        // Ajuster le z-index en fonction de la position dans le DOM
        container.style.zIndex = iframeContainers.length - index;
    });
    bars.forEach((container, index) => {
        // Ajuster le z-index en fonction de la position dans le DOM
        container.style.zIndex = bars.length - index;
    });


    projets.forEach((projet) => {
        projet.addEventListener("click", (e) => {
            e.preventDefault(); // Empêcher le comportement par défaut du lien
            e.stopPropagation(); // Empêcher la propagation de l'événement

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
});


startSlideshows();