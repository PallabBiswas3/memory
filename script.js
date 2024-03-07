let firstCard = null;
let secondCard = null;
let canClick = true;

let points = 0;
const maxPoints = 16;
const timeLimitSeconds = 120;
let timer;
let gameOver = false;

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
    const cards = document.querySelectorAll('.card');
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
    if (!canClick || gameOver) return;
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
        if (points === maxPoints) {
            clearInterval(timer);
            gameOver = true;
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').innerHTML = '<h3>Congratulations! You have completed the puzzle!</h3>';
            document.getElementById('points').textContent = `Points: ${points}`;
            document.getElementById('startBtnContainer').style.display = 'block';
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
    updateTimerDisplay(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            gameOver = true;
            document.getElementById('message').style.display = 'block';
            document.getElementById('points').textContent = `Points: ${points}`;
            return;
        } else {
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function resetGame() {
    points = 0;
    setColors();
    document.getElementById('points').textContent = `Points: ${points}`;
    document.getElementById('message').style.display = 'none';
    document.getElementById('startBtnContainer').style.display = 'none';
    clearInterval(timer);
    gameOver = false;
    startTimer();
}

function restartGame() {
    window.location.reload();
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
    canClick = true;
    startTimer();
}


window.addEventListener('load', () => {
    document.getElementById('startBtn').addEventListener('click', startGame);
});
