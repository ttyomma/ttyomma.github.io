document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-btn');
  const downloadContent = document.getElementById('download-content');
  
  if (!downloadBtn || !downloadContent) return;

  const originalText = downloadContent.innerHTML;
  const iconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
    </svg>
  `;

  downloadBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (this.classList.contains('is-opening')) {
      return;
    }

    const pdfUrl = this.href;
    const currentWidth = this.offsetWidth;
    this.style.minWidth = currentWidth + 'px';

    this.classList.add('is-opening');
    downloadContent.innerHTML = iconSVG;

    setTimeout(() => {
      window.open(pdfUrl, '_blank');
    }, 700);

    setTimeout(() => {
      this.classList.remove('is-opening');
      downloadContent.innerHTML = originalText;
      this.style.minWidth = '';
    }, 1500);
  });
});