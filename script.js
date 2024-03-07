let firstCard = null;
let secondCard = null;
let canClick = true;

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
    if (!canClick) return;
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
window.addEventListener('load', setColors);
cards.forEach(card => card.addEventListener('click', flipCard));
