let firstCard = null;
let secondCard = null;
let canClick = true;

const cards = document.querySelectorAll('.card');

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

cards.forEach(card => card.addEventListener('click', flipCard));
