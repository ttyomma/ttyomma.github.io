document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');

    if (themeToggleBtn && sunIcon && moonIcon) {
        const applyTheme = (theme) => {
            document.documentElement.classList.remove('dark', 'light');
            document.documentElement.classList.add(theme);

            if (theme === 'dark') {
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            } else { theme === 'light'
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        };

        const savedTheme = localStorage.getItem('theme');
        const currentTheme = savedTheme || 'dark';
        applyTheme(currentTheme);
        themeToggleBtn.addEventListener('click', () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            const newTheme = isDarkMode ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }
});