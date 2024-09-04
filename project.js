let offsetHeight;

// Fonction pour mettre à jour offsetHeight en fonction de la largeur de la fenêtre
function updateOffsetHeight() {
    console.log("update offset height");
    if (window.innerWidth <= 1480) {
        offsetHeight = 18;
    } else {
        offsetHeight = -15;
    }
}

updateOffsetHeight();
updateIframeHeightsOnResize();


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

    // Charger l'iframe seulement maintenant
    const src = iframe.getAttribute('data-src');
    if (iframe.src !== src) {
        iframe.src = src;
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
        iframeContainer.style.height = iframeContainer.scrollHeight - offsetHeight + 'px'; // Réglez la hauteur sur la hauteur totale du contenu
    };

    // Ajuster immédiatement la hauteur si le contenu est déjà chargé
    if (iframe.contentWindow.document.readyState === 'complete') {
        adjustIframeHeight(iframe);
        iframeContainer.style.height = iframeContainer.scrollHeight - offsetHeight + 'px'; // Réglez la hauteur sur la hauteur totale du contenu
    }

    // Écoute de la fin de la transition de hauteur
    iframeContainer.addEventListener('transitionend', function transitionListener(event) {
        if (event.propertyName === 'height') {
            iframeContainer.classList.remove('opening'); // Supprimer la classe 'opening' après l'animation
            iframeContainer.removeEventListener('transitionend', transitionListener); // Supprimer l'écouteur
        }
    }, { once: true });
}

// Utilisation de l'exemple pour ouvrir et fermer un projet
document.querySelector('.projet-about').addEventListener('click', (event) => {
    event.preventDefault();
    const iframeContainer = document.getElementById('container-aboutMe');
    const projet = event.currentTarget;
    const iframe = document.getElementById('aboutMe');
    openProject(iframeContainer, projet, iframe);
});

// Fonction pour mettre à jour la hauteur de toutes les iframes ouvertes au redimensionnement de la fenêtre
function updateIframeHeightsOnResize() {
    console.log("update iframe height on resize");
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const iframeContainer = iframe.parentElement;
        if (iframeContainer.style.display !== 'none') { // Ajuster uniquement si l'iframe est visible
            adjustIframeHeight(iframe);

            // Mettre à jour la hauteur du conteneur après avoir ajusté la hauteur de l'iframe
            iframeContainer.style.height = iframe.scrollHeight + 'px';

            // Si l'iframe a un contenu qui se rétracte, il faut également ajuster la hauteur du conteneur en conséquence
            iframe.onload = () => {
                iframeContainer.style.height = iframe.scrollHeight + 'px';
            };
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Attacher l'événement de redimensionnement
    window.addEventListener('resize', () => {
        updateOffsetHeight();
        updateIframeHeightsOnResize();
    });
});