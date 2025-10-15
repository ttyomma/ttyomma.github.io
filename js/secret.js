document.addEventListener('DOMContentLoaded', () => {
    const pfpContainer = document.getElementById('pfp-container');
    const pfpMain = document.getElementById('pfp-main');
    const pfpHidden = document.getElementById('pfp-hidden');
    const nameMain = document.getElementById('distort-text');
    const nameHidden = document.getElementById('hidden-text');

    if (!pfpContainer) return;

    let clickCount = 0;
    let clickTimer = null;
    let isAnimating = false;
    const clicksNeeded = 10;

    pfpContainer.addEventListener('click', () => {
        if (isAnimating) return;

        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1500);

        if (clickCount >= clicksNeeded) {
            isAnimating = true; 
            pfpMain.classList.add('is-glitching');
            nameMain.classList.add('is-glitching');

            setTimeout(() => {
                pfpMain.classList.remove('is-glitching');
                nameMain.classList.remove('is-glitching');
                pfpMain.classList.add('opacity-0', 'invisible');
                nameMain.classList.add('opacity-0', 'invisible');
                pfpHidden.classList.remove('opacity-0', 'invisible');
                nameHidden.classList.remove('opacity-0', 'invisible');
            }, 800);

            setTimeout(() => {
                pfpHidden.classList.add('is-glitching');
                nameHidden.classList.add('is-glitching');
            }, 3000);

            setTimeout(() => {
                pfpHidden.classList.remove('is-glitching');
                nameHidden.classList.remove('is-glitching');
                pfpMain.classList.remove('opacity-0', 'invisible');
                nameMain.classList.remove('opacity-0', 'invisible');
                pfpHidden.classList.add('opacity-0', 'invisible');
                nameHidden.classList.add('opacity-0', 'invisible');

                isAnimating = false;
            }, 3800);

            clickCount = 0;
            clearTimeout(clickTimer);
        }
    });
});