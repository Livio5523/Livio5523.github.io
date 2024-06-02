function toggleMenu(index) {
    const bars = document.querySelectorAll('.bar');
    const menu = bars[index].querySelector('.menu');
    const isVisible = menu.style.display === 'block';

    // Close all menus and reset transformations
    bars.forEach(bar => {
        const menu = bar.querySelector('.menu');
        menu.style.display = 'none';
        bar.classList.remove('expanded');
    });

    // Open the selected menu if it was not already visible
    if (!isVisible) {
        menu.style.display = 'block';
        bars[index].classList.add('expanded');
        width = document.body.offsetWidth;
        document.documentElement.style.setProperty('--translate-x', (width - (bars.length * 100)) + "px"); // Adjust the width of the menu here
    }
}