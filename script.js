let score = 0;
let clickValue = 1;
const spriteContainer = document.getElementById('sprite-container');
const scoreElement = document.getElementById('score');
const upgradeButton = document.getElementById('upgrade');

// Функция для получения очков с сервера
function getScore() {
    axios.get('http://localhost:5000/get_score')
        .then(response => {
            score = response.data.score;
            scoreElement.innerText = score;
        })
        .catch(error => {
            console.error('Error fetching score:', error);
        });
}

// Функция для обновления очков на сервере
function updateScore() {
    axios.post('http://localhost:5000/update_score', { score: score })
        .then(response => {
            console.log('Score updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating score:', error);
        });
}

spriteContainer.addEventListener('click', () => {
    score += clickValue;
    scoreElement.innerText = score;
    spriteContainer.classList.remove('idle');
    spriteContainer.classList.add('click');
    updateScore();

    // Убираем класс 'click' и возвращаем 'idle' после завершения анимации
    setTimeout(() => {
        spriteContainer.classList.remove('click');
        spriteContainer.classList.add('idle');
    }, 1000);
});

upgradeButton.addEventListener('click', () => {
    if (score >= 10) {
        score -= 10;
        clickValue++;
        scoreElement.innerText = score;
        upgradeButton.innerText = `Upgrade (Cost: ${clickValue * 10})`;
        updateScore();
    }
});

// Инициализация начального состояния
window.onload = () => {
    spriteContainer.classList.add('idle');
    getScore(); // Получить очки с сервера при загрузке
};
