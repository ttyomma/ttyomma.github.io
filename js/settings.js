document.addEventListener('DOMContentLoaded', () => {
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const settingsCard = document.getElementById('settings-card');
  const settingsClose = document.getElementById('settings-close');
  
  const animationToggle = document.getElementById('animation-toggle');
  const p5Canvas = document.getElementById('p5-canvas');

  const uiAnimationToggle = document.getElementById('ui-animation-toggle');
  
  const setUiAnimations = (enabled) => {
    if (enabled) {
      document.body.classList.remove('animations-disabled');
      localStorage.setItem('uiAnimationsEnabled', 'true');
      uiAnimationToggle.checked = true;
    } else {
      document.body.classList.add('animations-disabled');
      localStorage.setItem('uiAnimationsEnabled', 'false');
      uiAnimationToggle.checked = false;
    }
  };

  const areUiAnimationsEnabled = localStorage.getItem('uiAnimationsEnabled') !== 'false';
  setUiAnimations(areUiAnimationsEnabled);

  uiAnimationToggle.addEventListener('change', () => {
    setUiAnimations(uiAnimationToggle.checked);
  });

  const openPanel = () => {
    settingsPanel.classList.remove('opacity-0', 'pointer-events-none');
    settingsCard.classList.remove('opacity-0', 'scale-95');
  };

  const closePanel = () => {
    settingsCard.classList.add('opacity-0', 'scale-95');
    settingsPanel.classList.add('opacity-0');
    setTimeout(() => {
      settingsPanel.classList.add('pointer-events-none');
    }, 300);
  };

  settingsToggle.addEventListener('click', openPanel);
  settingsClose.addEventListener('click', closePanel);
  settingsPanel.addEventListener('click', (e) => {
    if (e.target === settingsPanel) {
      closePanel();
    }
  });

  const isAnimationEnabled = localStorage.getItem('animationEnabled') !== 'false';
  animationToggle.checked = isAnimationEnabled;
  if (!isAnimationEnabled && p5Canvas) {
    p5Canvas.style.display = 'none';
  }

  animationToggle.addEventListener('change', () => {
    if (animationToggle.checked) {
      localStorage.setItem('animationEnabled', 'true');
      if (p5Canvas) p5Canvas.style.display = 'block';
      if (typeof loop === 'function') loop();
      if (typeof startAnimation === 'function') startAnimation();
    } else {
      localStorage.setItem('animationEnabled', 'false');
      if (p5Canvas) p5Canvas.style.display = 'none';
      if (typeof noLoop === 'function') noLoop();
    }
  });
});