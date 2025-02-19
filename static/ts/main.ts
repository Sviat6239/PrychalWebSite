// Функция для добавления класса выделения границы
function addHighlightBorder(element: HTMLElement) {
    element.classList.add('highlight-border');
}

// Пример использования
document.addEventListener('DOMContentLoaded', () => {
    const divs = document.querySelectorAll('div');
    divs.forEach(div => addHighlightBorder(div));
});