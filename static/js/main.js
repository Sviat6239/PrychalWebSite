document.addEventListener("DOMContentLoaded", function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.classList.add('visible');
    });

    const themeToggle = document.getElementById('themeToggle');
    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    }
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.copy) {
                copyToClipboard(button.dataset.copy);
                button.textContent = 'Скопійовано!';
                setTimeout(() => {
                    button.textContent = button.dataset.text;
                }, 2000);
            }
        });

        button.addEventListener('mouseover', () => {
            button.classList.add('hovered');
        });

        button.addEventListener('mouseout', () => {
            button.classList.remove('hovered');
        });
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            showFlashMessage('Скопійовано: ' + text);
        }, function(err) {
            console.error('Помилка копіювання: ', err);
        });
    }

    function showFlashMessage(message) {
        const flashMessageDiv = document.getElementById('flash-message');
        flashMessageDiv.textContent = message;
        flashMessageDiv.classList.add('show');
        setTimeout(() => {
            flashMessageDiv.classList.remove('show');
        }, 3000);
    }
});