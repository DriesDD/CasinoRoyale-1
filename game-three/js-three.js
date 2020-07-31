const cards = document.querySelectorAll(".memory.cards");

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  cards.className += "flip";

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    // match
    disableCards();
  } else {
    // no match
    unflipCard();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCard() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }, 1500);
}

cards.forEach((card) => card.addEventListener("click", flipCard()));
