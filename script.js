function closeProject(iframeContainer, projet) {
    if (iframeContainer.classList.contains('closing') || iframeContainer.classList.contains('opening')) {
        return; // Empêcher de fermer si une animation est déjà en cours
    }

    projet.classList.remove('open');
    iframeContainer.style.height = iframeContainer.scrollHeight + 'px'; // Forcer la hauteur avant de retirer la classe 'opening'
    iframeContainer.classList.remove('opening');
    iframeContainer.classList.add('closing');

    // Assurez-vous que la transition de hauteur est définie
    iframeContainer.style.transition = 'height 0.5s ease';

    // Forcer un repaint pour que la transition soit appliquée
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            iframeContainer.style.height = '0';
        });
    });

    // Écoute de la fin de la transition de hauteur
    iframeContainer.addEventListener('transitionend', function transitionListener(event) {
        if (event.propertyName === 'height') {
            iframeContainer.style.display = 'none'; // Cacher le conteneur de l'iframe à la fin de l'animation
            iframeContainer.style.height = ''; // Réinitialise la hauteur après la fermeture
            iframeContainer.classList.remove('closing'); // Supprimer la classe 'closing' après l'animation
            iframeContainer.removeEventListener('transitionend', transitionListener); // Supprimer l'écouteur
        }
    }, { once: true });
}

function openProject(iframeContainer, projet, iframe) {
    if (iframeContainer.classList.contains('opening') || iframeContainer.classList.contains('closing')) {
        return; // Empêcher d'ouvrir si une animation est déjà en cours
    }
    
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

    // Écoute de la fin de la transition de hauteur
    iframeContainer.addEventListener('transitionend', function transitionListener(event) {
        if (event.propertyName === 'height') {
            iframeContainer.classList.remove('opening'); // Supprimer la classe 'opening' après l'animation
            iframeContainer.removeEventListener('transitionend', transitionListener); // Supprimer l'écouteur
        }
    }, { once: true });
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

function CloseSmth(smth) {
    if (smth.classList.contains('show')) {
        smth.classList.replace("show", "hide");
        smth.addEventListener('animationend', () => {
            smth.style.display = 'none';
            smth.classList.remove('hide');
        }, { once: true });
    }
}

function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const mainMenu = document.querySelector('.mainMenu');
    const isVisible = menu.classList.contains('show');
    const width = document.body.offsetWidth;
    const barsWidth = bar.clientWidth;

    if (!isVisible) {
        // Ferme tous les menus
        const bars = document.querySelectorAll('.bar');
        bars.forEach((indivBars) => {
            const barMenu = indivBars.querySelector('.menu');
            CloseSmth(barMenu);
            indivBars.classList.remove('expanded');
        });
        // Ouvre le menu de la barre cliquée
        mainMenu.style.display = 'none';
        menu.style.display = 'block';
        bar.classList.add('expanded');
        if (menu.style.display == "none" || menu.classList.contains("hide")) {
            menu.classList.remove('show');
            bar.classList.remove("expended");
        } else {
            menu.classList.add('show');
        }
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) /* outline of bars */) + "px");
    } else {
        // Ferme le menu de la barre cliquée
        CloseSmth(menu);
        mainMenu.style.display = 'block';
        bar.classList.remove('expanded');
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