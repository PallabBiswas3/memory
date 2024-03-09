let firstCard = null;
let secondCard = null;
let canClick = true;

let points = 0;
const maxPoints = 16;
const timeLimitSeconds = 120;
let remainingTime;
let timer;
let gameOver = false;
let isPaused = false;

const cards = document.querySelectorAll('.card');
const colors = ['red', 'green', 'yellow', 'blue', 'brown', 'skyblue', 'violet', 'orange'];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setColors() {
    const shuffledColors = shuffle(colors.concat(colors));
    cards.forEach((card, index) => {
        card.classList.remove('hidden');
        card.classList.remove(...colors);
        card.classList.add(shuffledColors[index]);
    });

    setTimeout(() => {
        cards.forEach(card => card.classList.add('hidden'));
    }, 0);
}

function flipCard() {
    if (!canClick || gameOver || isPaused) return;
    if (this === firstCard) return;

    this.classList.remove('hidden');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    canClick = false;

    if (firstCard.className === secondCard.className) {
        points += 2;
        updatePoints();
        if (points === maxPoints) {
            gameOver = true;
            isPaused = true;
            showGameOverMessage('Congratulations! You have completed the puzzle');
            return;
        }
        setTimeout(() => {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetCards();
        }, 1000);
    } else {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canClick = true;
}

function startTimer() {
    let timeLeft = timeLimitSeconds;
    if (isPaused === true && typeof remainingTime !== 'undefined') {
        timeLeft = remainingTime;
    } else {
        remainingTime = timeLeft;
    }
    updateTimerDisplay(timeLeft);
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                gameOver = true;
                showGameOverMessage("Sorry! Time's up!");
                return;
            }
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function showGameOverMessage(message) {
    document.getElementById('message').style.display = 'block';
    document.getElementById('message').innerHTML = `<h3>${message}</h3>`;
    document.getElementById('restartBtn').style.display = 'block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('continueBtn').style.display = 'none';
}

function resetGame() {
    points = 0;
    setColors();
    updatePoints();
    document.getElementById('message').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';
    clearInterval(timer);
    gameOver = false;
    isPaused = false;
    startTimer();
}

function pauseGame() {

    isPaused = true;
    remainingTime = getTimeLeft();
    document.getElementById('pauseBtn').textContent = 'Continue';
    clearInterval(timer);
    cards.forEach(card => card.removeEventListener('click', flipCard));

}
function Continue() {
    isPaused = false;
    document.getElementById('continueBtn').textContent = 'Pause';
    document.getElementById('pauseBtn').style.display = 'block';
    document.getElementById('continueBtn').style.display = 'none';
    startTimer();
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function getTimeLeft() {
    const timerText = document.getElementById('timer').textContent;
    const [minutes, seconds] = timerText.split(':').map(Number);
    return minutes * 60 + seconds;
}

function updatePoints() {
    document.getElementById('points').textContent = `Points: ${points}`;
}

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timer').textContent = formattedTime;
}

function startGame() {
    resetGame();
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'block';
    canClick = true;
}

window.addEventListener('load', () => {
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', pauseGame);
    document.getElementById('continueBtn').addEventListener('click', Continue);
});



