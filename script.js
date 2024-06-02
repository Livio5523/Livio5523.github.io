function toggleMenu(bar, barLength) {
    const menu = bar.querySelector('.menu');
    const isVisible = menu.style.display === 'block';
    
    if (!isVisible) {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const menu = bar.querySelector('.menu');
            menu.style.display = 'none';
            bar.classList.remove('expanded');
        });
        menu.style.display = 'block';
        bar.classList.add('expanded');
        width = document.body.offsetWidth;
        barswidth = bar.clientWidth;
        document.documentElement.style.setProperty('--translate-x', (width - (barLength * barswidth)) + "px");
    } else {
        // Close all menus and reset transformations

    }

}

document.addEventListener("DOMContentLoaded", (e) => {
    const bars = document.querySelectorAll('.bar');

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            toggleMenu(bar, bars.length)
        });
    });
});

function showText(index) {
    const texts = document.querySelectorAll('.text');
    const textToShow = document.getElementById(`text-${index}`);
    
    texts.forEach(text => {
        text.classList.add('hidden');
    });

    textToShow.classList.remove('hidden');
}