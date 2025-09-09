document.addEventListener('DOMContentLoaded', () => {
    const projectsGroup = document.getElementById('projects-group');
    
    if (projectsGroup) {
        const animatedCards = projectsGroup.querySelectorAll('[class*="fade-in-up-"]');

        animatedCards.forEach(card => {
            card.addEventListener('animationend', () => {
                card.classList.remove('fade-in-up-1', 'fade-in-up-2', 'fade-in-up-3', 'fade-in-up-4');
            });
        });
    }
});