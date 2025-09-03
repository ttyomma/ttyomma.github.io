document.addEventListener('DOMContentLoaded', function() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(6deg) rotateY(-6deg) scale3d(1,1,1)';
        void card.offsetWidth;
        requestAnimationFrame(() => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });

    tiltCards.forEach(card => {
        const shine = card.querySelector('.tilt-shine');
        
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        function handleMouseMove(e) {
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
        
        function handleMouseLeave() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            card.style.setProperty('--shine-opacity', '0');
        }
    });
});