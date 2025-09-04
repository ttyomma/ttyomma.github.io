document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', e => {
            body.style.setProperty('--x', e.clientX + 'px');
            body.style.setProperty('--y', (e.clientY + window.scrollY) + 'px');
        });
    }
});
