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
        bar.classList.add('expanded');
        menu.classList.add('show');
        menu.style.display = "block";
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barsWidth) /* outline of bars */) + "px");
    } else {
        CloseSmth(menu);
        bar.classList.remove('expanded');
        menu.classList.remove("show");
        menu.addEventListener("animationend", () => {
            if (bar.classList.contains("expanded") && menu.classList.contains("show") && menu.style.display == "none") {
                menu.style.display = "block";
            }
        });
    }
}