document.addEventListener('DOMContentLoaded', () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {return;}
    document.body.classList.add('no-touch');

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const outlineSpeed = 0.09;
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isInitialized = false;
    let isHovering = false;
    let isClicking = false;
    let currentScale = 1;
    const hoverScale = 1.5;
    const clickScale = 0.8;

    window.addEventListener('mousemove', (e) => {
        if (!isInitialized) {
            outlineX = e.clientX;
            outlineY = e.clientY;
            isInitialized = true;
            cursorDot.classList.add('visible');
            cursorOutline.classList.add('visible');
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        outlineX += dx * outlineSpeed;
        outlineY += dy * outlineSpeed;
        cursorDot.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;

        const velocityX = mouseX - lastMouseX;
        const velocityY = mouseY - lastMouseY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        const speed = Math.sqrt(velocityX**2 + velocityY**2);
        const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
        const stretch = Math.min(speed / 15, 1);

        let targetScale = 1;
        if (isHovering) {
            targetScale = hoverScale;
        }
        if (isClicking) {
            targetScale *= clickScale;
        }
        currentScale += (targetScale - currentScale) * 0.2; //speed of scale animation

        const scaleX = 1 + stretch * 0.5;
        const scaleY = 1 - stretch * 0.2;
        
        cursorOutline.style.transform = `
            translate(-50%, -50%) 
            translate(${outlineX}px, ${outlineY}px) 
            rotate(${angle}deg) 
            scaleX(${scaleX * currentScale}) 
            scaleY(${scaleY * currentScale})`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, input, [data-cursor-hover]');

    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => { isHovering = true; });
        el.addEventListener('mouseleave', () => { isHovering = false; });
    });

    document.addEventListener('mousedown', () => { isClicking = true; });
    document.addEventListener('mouseup', () => { isClicking = false; });
});