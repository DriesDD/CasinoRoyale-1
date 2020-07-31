/*
--> Game: Twenty-One

--> The Mission
    Make the card game Twenty-One.
    You do not have to program any of the more difficult features of blackjack, like a dealer, the option to split...

--> Must-have features

    - The user plays against the computer
    - Ask the user if he/she wants to draw a card
    - If yes, add a card to his/her stack
    - Tell him/her if he/she bust or not
    - Make the Computer also draw a card and decide to quit or keep drawing.
    - Try not to make the PC cheat, make some kind of AI to play "intelligently"
    - Alternatively, use the default casino rule: the dealer keeps drawing until he reaches 15
    - When both players stop or bust show the result and assign the victory to the user or to the computer
    - Then ask if the player wants to play another round.
    - Update the user with what happens all the time with prompts and alerts

--> Nice-to-have features

    - Instead of using prompts, use the images of cards. (very hard!)
    - Make a gamble mechanic: every user starts with X chips, and before each round we ask what he/she wants to gamble.
      If both the computer and the player bust the wins go to "the house".
*/

// Cards suits, rank and weight
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const weight = [
  { type: "2", value: 2 },
  { type: "3", value: 3 },
  { type: "4", value: 4 },
  { type: "5", value: 5 },
  { type: "6", value: 6 },
  { type: "7", value: 7 },
  { type: "8", value: 8 },
  { type: "9", value: 9 },
  { type: "1", value: 10 },
  { type: "J", value: 10 },
  { type: "Q", value: 10 },
  { type: "K", value: 10 },
  { type: "A", value: 11 },
];
const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

// DOM elements
const display = document.getElementById("deck");
const play = document.getElementById("dealBtn");
const stand = document.getElementById("standBtn");
const hit = document.getElementById("hitBtn");
const computer = document.getElementById("computer");
const player = document.getElementById("player");

// Variables declaration
const deck = [];
let playerCard,
  computerCard,
  rand1,
  rand2,
  sumPlayer = 0,
  sum;

// Play button listener
play.addEventListener("click", () => {
  deckMaker();
  deal(playerCard, "playerCheck");
  deal(computerCard, "computerCheck");
  play.disabled = true;
});

// Hit button listener
hit.addEventListener("click", () => {
  deal(playerCard, "playerCheck");
});

// Deal 2 cards for player and computer respectively
function deal(cards, check) {
  cards = randNumber();
  let firstCard = deck[cards[0]];
  let firstChar = firstCard.charAt(0);
  let secondCard = deck[cards[1]];
  let secondChar = secondCard.charAt(0);
  weight.forEach((item) => {
    if (firstChar === secondChar && firstChar === item.type) {
      sumPlayer = item.value * 2;
    } else if (firstChar === item.type || secondChar === item.type) {
      sumPlayer += item.value;
    }
  });
  weight.forEach((item) => {
    if (firstChar === item.type) {
      sum = item.value;
    }
  });
  switch (check) {
    case "playerCheck":
      player.innerHTML = `<em>${firstCard} -- ${secondCard}</em> <strong>Score: ${sumPlayer}</strong>`;
      break;
    case "computerCheck":
      console.log(firstCard);
      computer.innerHTML = `<em>Hidden -- ${secondCard}</em> <strong>Score: ${
        sumPlayer - sum
      }</strong>`;
      break;
  }
  (sum = 0), (sumPlayer = 0);
}

// Generate deck
function deckMaker() {
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}-${suit}`);
    });
  });
}

// Random array generator with 2 values
function randNumber() {
  do {
    rand1 = Math.floor(Math.random() * 51);
    rand2 = Math.floor(Math.random() * 51);
  } while (rand1 === rand2);
  return [rand1, rand2];
}
