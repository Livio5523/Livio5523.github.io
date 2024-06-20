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
        
        //mainMenu.style.display = 'none';
        menu.style.display = 'block';
        bar.classList.add('expanded');
        if (bar.classList.contains("expanded")) {
            menu.classList.add('show');
            menu.style.display = "block";
        }
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) /* outline of bars */) + "px");
    } else {
        // Ferme le menu de la barre cliquée
        CloseSmth(menu);
        //mainMenu.style.display = 'flex';
        bar.classList.remove('expanded');
        if (menu.classList.contains("show")) {
            menu.classList.add('show');
            menu.style.display = "block";
        }
    }
}