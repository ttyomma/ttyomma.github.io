function initDynamicTilt(element) {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    function handleMouseMove(e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -7;
        const rotateY = (x - centerX) / centerX * 7;
        const shineOpacity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 14) / 14 * 0.3;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        element.style.setProperty('--shine-opacity', shineOpacity);
    }
    
    function handleMouseLeave() {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        element.style.setProperty('--shine-opacity', '0');
    }

    return {
        destroy: () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.style.transform = ''; 
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        if (!card.closest('#active-card-placeholder')) {
            card.addEventListener('mousemove', handleStaticMouseMove);
            card.addEventListener('mouseleave', handleStaticMouseLeave);
        }
    });

    function handleStaticMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 5;
        const shineOpacity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 20) / 20 * 0.3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.setProperty('--shine-opacity', shineOpacity);
    }

    function handleStaticMouseLeave() {
        const card = this;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--shine-opacity', '0');
    }
});