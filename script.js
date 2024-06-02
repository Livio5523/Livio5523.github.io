function toggleMenu(index) {
    const bars = document.querySelectorAll('.bar');
    const menu = bars[index].querySelector('.menu');
    const isVisible = menu.style.display === 'block';

    bars.forEach((bar, i) => {
        const menu = bar.querySelector('.menu');
        if (i === index && !isVisible) {
            bar.style.width = '300px';
            menu.style.display = 'block';
        } else {
            bar.style.width = '100px';
            menu.style.display = 'none';
        }
    });
}
