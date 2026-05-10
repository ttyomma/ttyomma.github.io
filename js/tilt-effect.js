function initDynamicTilt(element) {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    function handleMouseMove(e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        const shineOpacity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 6) / 6 * 0.22;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        element.style.setProperty('--shine-opacity', shineOpacity);
    }
    
    function handleMouseLeave() {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
            card.addEventListener('focus', handleStaticFocus);
            card.addEventListener('blur', handleStaticMouseLeave);
        }
    });

    function handleStaticMouseMove(e) {
        if (document.body.classList.contains('animations-disabled')) {
            return;
        }

        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 2.5;
        const shineOpacity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 5.5) / 5.5 * 0.2;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
        card.style.setProperty('--shine-opacity', shineOpacity);
    }

    function handleStaticFocus() {
        if (document.body.classList.contains('animations-disabled')) {
            return;
        }

        const card = this;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.025, 1.025, 1.025)';
        card.style.setProperty('--shine-opacity', '0.12');
    }

    function handleStaticMouseLeave() {
        const card = this;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.setProperty('--shine-opacity', '0');
    }
});
