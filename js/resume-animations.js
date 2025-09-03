document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in-up-1, .fade-in-up-2, .fade-in-up-3, .fade-in-up-4').forEach(el => {
        el.addEventListener('animationend', () => {
            el.classList.add('animated-done');
            el.classList.remove('fade-in-up-1', 'fade-in-up-2', 'fade-in-up-3', 'fade-in-up-4');
        });
    });
});