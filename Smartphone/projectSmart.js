document.addEventListener('DOMContentLoaded', () => {
    const projetsSmart = document.querySelectorAll('.projetSmart');

    projetsSmart.forEach((projetSmart) => {
        projetSmart.addEventListener('click', (e) => {
            e.preventDefault();
            const projetSmartId = projetSmart.getAttribute('href').substring(1);
            const iframeContainer = document.getElementById(`container-${projetSmartId}`);
            const iframe = iframeContainer.querySelector('iframe');
            const isOpen = projetSmart.classList.contains('open');

            if (isOpen) {
                closeProject(iframeContainer, projetSmart);
            } else {
                openProject(iframeContainer, projetSmart, iframe);
            }
        });
    });

    function adjustIframeHeight(iframe) {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframe.style.height = iframeDocument.documentElement.scrollHeight + 'px';

            const observer = new MutationObserver(() => {
                iframe.style.height = iframeDocument.documentElement.scrollHeight + 'px';
            });

            observer.observe(iframeDocument.body, { childList: true, subtree: true, attributes: true });
        } catch (error) {
            console.error("Erreur lors de l'ajustement de la hauteur de l'iframe : ", error);
        }
    }

    function closeProject(iframeContainer, projetSmart) {
        if (iframeContainer.classList.contains('closing') || iframeContainer.classList.contains('opening')) {
            return;
        }

        projetSmart.classList.remove('open');
        iframeContainer.style.height = iframeContainer.scrollHeight + 'px';
        iframeContainer.classList.remove('opening');
        iframeContainer.classList.add('closing');

        // Forcer un reflow pour que la transition soit appliquée
        iframeContainer.getBoundingClientRect();

        iframeContainer.style.transition = 'height 0.5s ease';
        iframeContainer.style.height = '0';

        iframeContainer.addEventListener('transitionend', function transitionListener(event) {
            if (event.propertyName === 'height') {
                iframeContainer.style.display = 'none';
                iframeContainer.style.height = '';
                iframeContainer.classList.remove('closing');
                iframeContainer.removeEventListener('transitionend', transitionListener);
            }
        }, { once: true });
    }

    function openProject(iframeContainer, projetSmart, iframe) {
        if (iframeContainer.classList.contains('opening') || iframeContainer.classList.contains('closing')) {
            return;
        }

        iframeContainer.style.display = 'block';
        projetSmart.classList.add('open');
        iframeContainer.classList.add('opening');
        iframeContainer.style.height = '0';

        // Forcer un reflow pour que la transition soit appliquée
        iframeContainer.getBoundingClientRect();

        iframe.onload = function() {
            adjustIframeHeight(iframe);
            iframeContainer.style.height = iframeContainer.scrollHeight + 'px';
        };

        if (iframe.contentWindow.document.readyState === 'complete') {
            adjustIframeHeight(iframe);
            iframeContainer.style.height = iframeContainer.scrollHeight - 15 + 'px';
        }

        iframeContainer.addEventListener('transitionend', function transitionListener(event) {
            if (event.propertyName === 'height') {
                iframeContainer.classList.remove('opening');
                iframeContainer.removeEventListener('transitionend', transitionListener);
            }
        }, { once: true });
    }
});
