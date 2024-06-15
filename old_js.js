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
    const widthScollbar = document.style.width;
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
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) /* outline of bars */) + "px");
        if (menu.style.display == "none" || menu.classList.contains("hide")) {
            menu.classList.remove('show');
            bar.classList.remove("expended");
        } else {
            menu.classList.add('show');
        }
    } else {
        // Ferme le menu de la barre cliquée
        CloseSmth(menu);
        bar.classList.remove('expanded');
    }
}