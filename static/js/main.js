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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.id = 'back-to-top';
backToTopButton.textContent = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const textBlocks = document.querySelectorAll('.text-block');

    textBlocks.forEach(block => {
        block.addEventListener('click', () => {
            block.classList.toggle('full-content');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.text-block.full-content')) {
            textBlocks.forEach(block => {
                block.classList.remove('full-content');
            });
        }
    });
});