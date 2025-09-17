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

            const isMobile = window.innerWidth < 768;

            const finalCardScale = isMobile ? 1.1 : 1.2;
            const finalPanelWidth = isMobile ? 280 : 384;
            const panelGap = isMobile ? 16 : 32;

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

            const finalCardWidth = cardRect.width * finalCardScale;
            const finalCardHeight = cardRect.height * finalCardScale;

            let finalLeftCard, finalLeftPanel, finalTop;

            if (isMobile) {
                finalTop = 80;
                finalLeftCard = (window.innerWidth - finalCardWidth) / 2;
                finalLeftPanel = (window.innerWidth - finalPanelWidth) / 2;
                
                sidePanel.style.top = `${finalTop + finalCardHeight + panelGap}px`;
                sidePanel.style.left = `${finalLeftPanel}px`;
                sidePanel.style.width = `${finalPanelWidth}px`;
                sidePanel.style.height = `auto`;
            } else {
                const finalGroupWidth = finalCardWidth + panelGap + finalPanelWidth;
                finalLeftCard = (window.innerWidth - finalGroupWidth) / 2;
                finalLeftPanel = finalLeftCard + finalCardWidth + panelGap;
                finalTop = (window.innerHeight - finalCardHeight) / 2;
                
                sidePanel.style.top = `${finalTop}px`;
                sidePanel.style.left = `${finalLeftCard}px`;
                sidePanel.style.width = `${finalPanelWidth}px`;
                sidePanel.style.height = `${finalCardHeight}px`;
            }

            activeCardPlaceholder.style.width = `${cardRect.width}px`;
            activeCardPlaceholder.style.height = `${cardRect.height}px`;
            activeCardPlaceholder.style.top = `${cardRect.top}px`;
            activeCardPlaceholder.style.left = `${cardRect.left}px`;
            activeCardPlaceholder.style.opacity = '1';
            activeCardPlaceholder.style.transform = `scale(1)`;
            
            sidePanelText.textContent = card.dataset.text;
            cardViewerContainer.classList.add('active');
            cardOverlay.classList.add('active');

            setTimeout(() => {
                activeCardPlaceholder.style.top = `${finalTop}px`;
                activeCardPlaceholder.style.left = `${finalLeftCard}px`;
                activeCardPlaceholder.style.width = `${finalCardWidth}px`;
                activeCardPlaceholder.style.height = `${finalCardHeight}px`;
                
                if (!isMobile) {
                    sidePanel.style.left = `${finalLeftPanel}px`;
                }
                
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