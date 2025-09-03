window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;

    window.addEventListener('mousemove', e => {
        body.style.setProperty('--x', e.clientX + 'px');
        body.style.setProperty('--y', (e.clientY + window.scrollY) + 'px');
    });
});