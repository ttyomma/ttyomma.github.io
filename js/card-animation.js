document.addEventListener('DOMContentLoaded', () => {
    // Получаем все нужные элементы со страницы
    const cards = document.querySelectorAll('.project-card');
    const cardViewerContainer = document.getElementById('card-viewer-container');
    const cardOverlay = document.getElementById('card-overlay');
    const activeCardPlaceholder = document.getElementById('active-card-placeholder');
    const sidePanel = document.getElementById('side-panel');
    const sidePanelText = document.getElementById('side-panel-text');
    const closeBtn = document.getElementById('close-btn');

    let originalCard = null;
    let activeTiltInstance = null;
    const cardScale = 1;
    const panelGap = 32;

    cards.forEach(card => {
        const imageSrc = card.dataset.imageSrc;
        if (imageSrc) {
            card.style.backgroundImage = `url(${imageSrc})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (originalCard) return;

            originalCard = card;
            const cardRect = card.getBoundingClientRect();

            const cardClone = card.cloneNode(true);
            const isDarkMode = document.documentElement.classList.contains('dark');

            let cloneClasses = 'tilt-card grainy backdrop-blur-md rounded-lg w-full h-full flex items-center justify-center shadow-lg';
            if (isDarkMode) {
                cloneClasses += ' bg-white/10 border-white/20';
            } else {
                cloneClasses += ' bg-white border border-gray-200';
            }
            cardClone.className = cloneClasses;

            activeCardPlaceholder.innerHTML = '';
            activeCardPlaceholder.appendChild(cardClone);

            const imageSrc = card.dataset.imageSrc;
            if (imageSrc) {
                cardClone.style.backgroundImage = `url(${imageSrc})`;
                cardClone.style.backgroundSize = 'cover';
                cardClone.style.backgroundPosition = 'center';
            }


            if (typeof initDynamicTilt === 'function') {
                activeTiltInstance = initDynamicTilt(cardClone);
            }
            
            const finalCardWidth = cardRect.width * cardScale;
            const finalCardHeight = cardRect.height * cardScale;
            const panelWidth = sidePanel.offsetWidth;
            const finalGroupWidth = finalCardWidth + panelGap + panelWidth;
            const finalLeftCard = (window.innerWidth - finalGroupWidth) / 2;
            const finalLeftPanel = finalLeftCard + finalCardWidth + panelGap;
            const finalTop = (window.innerHeight - finalCardHeight) / 2;

            activeCardPlaceholder.style.width = `${cardRect.width}px`;
            activeCardPlaceholder.style.height = `${cardRect.height}px`;
            activeCardPlaceholder.style.top = `${cardRect.top}px`;
            activeCardPlaceholder.style.left = `${cardRect.left}px`;
            activeCardPlaceholder.style.opacity = '1';
            activeCardPlaceholder.style.transform = `scale(1)`;

            sidePanel.style.height = `${finalCardHeight}px`;
            sidePanel.style.top = `${finalTop}px`;
            sidePanel.style.left = `${finalLeftCard}px`;
            sidePanelText.textContent = card.dataset.text;

            cardViewerContainer.classList.add('active');
            cardOverlay.classList.add('active');

            setTimeout(() => {
                activeCardPlaceholder.style.top = `${finalTop}px`;
                activeCardPlaceholder.style.left = `${finalLeftCard}px`;
                activeCardPlaceholder.style.width = `${finalCardWidth}px`;
                activeCardPlaceholder.style.height = `${finalCardHeight}px`;
                activeCardPlaceholder.style.transform = `scale(${cardScale})`;
                sidePanel.style.left = `${finalLeftPanel}px`;
                sidePanel.classList.add('active');
            }, 10);
        });
    });

    function closeCard() {
        if (!originalCard) return;
        const cardRect = originalCard.getBoundingClientRect();

        if (activeTiltInstance && activeTiltInstance.vanillaTilt) {
            activeTiltInstance.vanillaTilt.destroy();
            activeTiltInstance = null;
        }

        sidePanel.classList.remove('active');
        cardOverlay.classList.remove('active');
        activeCardPlaceholder.style.top = `${cardRect.top}px`;
        activeCardPlaceholder.style.left = `${cardRect.left}px`;
        activeCardPlaceholder.style.width = `${cardRect.width}px`;
        activeCardPlaceholder.style.height = `${cardRect.height}px`;
        activeCardPlaceholder.style.opacity = '0';
        sidePanel.style.left = activeCardPlaceholder.style.left;

        setTimeout(() => {
            if (!originalCard) return;
            cardViewerContainer.classList.remove('active');
            activeCardPlaceholder.innerHTML = '';
            activeCardPlaceholder.removeAttribute('style');
            sidePanel.removeAttribute('style');
            originalCard = null;
        }, 500);
    }

    closeBtn.addEventListener('click', closeCard);
    cardOverlay.addEventListener('click', closeCard);
});