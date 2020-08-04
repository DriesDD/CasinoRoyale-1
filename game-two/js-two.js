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
const message = document.getElementById("message");
const computerCards = document.getElementById("computerCards");
const playerCards = document.getElementById("playerCards");
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");

// Variables declaration
const deck = [];
let playerCard,
  computerCard,
  rand1,
  rand2,
  firstSum,
  hitPlayer,
  hitSum,
  standSum,
  hiddenCard,
  sumPlayer = 0,
  count = 0,
  valueA,
  sum;

// Play button listener
play.addEventListener("click", () => {
  deckMaker();
  deckShuffle();
  deal(playerCard, "playerFirstCard");
  deal(computerCard, "computerFirstCard");
  behaviourBtn(play, "off");
});

// Hit button listener
hit.addEventListener("click", () => {
  deal(playerCard, "playerHitCard");
  if (firstSum > 21) {
    message.innerHTML = `Player <strong>busts</strong>`;
  }
});

// Stand button listener
stand.addEventListener("click", () => {
  behaviourBtn(hit, "off");
  document
    .getElementById("hiddenCard")
    .setAttribute("src", `cards/${hiddenCard}.svg`);
  console.log(`Inside Stand sumPlayer ${sumPlayer}`);
  console.log(`Inside Stand standSum ${standSum}`);
  console.log(`Inside Stand firstSum ${firstSum}`);
  while (standSum < 17) {
    deal(computerCard, "computerHitCard");
  }
  if (standSum > 21) {
    message.innerHTML = `Computer <strong>busts</strong>`;
  } else if (standSum > firstSum) {
    message.innerHTML = `Computer <strong>wins</strong>`;
  } else if (standSum < firstSum) {
    message.innerHTML = `Player <strong>wins</strong>`;
  } else if ((standSum = firstSum)) {
    message.innerHTML = `It's <strong>tie</strong>`;
  }
  behaviourBtn(stand, "off");
});

// Deal 2 cards for player and computer respectively
function deal(cards, check) {
  let firstCard, firstChar, secondCard, secondChar;
  switch (check) {
    case "playerFirstCard":
    case "computerFirstCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      secondCard = deck[cards[1]];
      secondChar = secondCard.charAt(0);
      ifAce(secondChar);
      weight.forEach((item) => {
        if (firstChar === "A" && secondChar === "A") {
          sumPlayer = 12;
          //          valueA = ifAce(firstChar);
        }
        if (firstChar === secondChar && firstChar === item.type) {
          sumPlayer = item.value * 2;
          //          valueA = ifAce(firstChar);
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
        case "playerFirstCard":
          aInPlayerCard = count;
          count = 0;
          console.log(`Number of A's is ${aInPlayerCard}`);
          firstSum = sumPlayer;
          playerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
          playerCards.innerHTML += `<img class="mr-1" src="cards/${secondCard}.svg" />`;
          playerScore.innerHTML = sumPlayer;
          //player.innerHTML = `<em>${firstCard} -- ${secondCard}</em> <strong>Score: ${sumPlayer}</strong>`;
          break;
        case "computerFirstCard":
          aInComputerCard = count;
          count = 0;
          console.log(`Number of A's is ${aInComputerCard}`);
          console.log(firstCard);
          standSum = sumPlayer;
          hiddenCard = firstCard;
          computerCards.innerHTML += `<img id="hiddenCard" class="mr-1" src="cards/RED_BACK.svg" />`;
          computerCards.innerHTML += `<img class="mr-1" src="cards/${secondCard}.svg" />`;
          computerScore.innerHTML = sumPlayer - sum;

          //computer.innerHTML = `<em>Hidden -- ${secondCard}</em> <strong>Score: ${sumPlayer - sum}</strong>`;

          break;
      }
      console.log(`${check} : ${sumPlayer}`);

      (sum = 0), (sumPlayer = 0);

      break;
    case "playerHitCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      aInPlayerCard += count;
      if (aInPlayerCard > 0 && sumPlayer > 12) {
        weight.forEach((item) => {
          if (firstChar === item.type && firstChar === "A") {
            hitPlayer = 1;
          } else {
            hitPlayer = item.value;
          }
        });
      } else {
        weight.forEach((item) => {
          if (firstChar === item.type) {
            hitPlayer = item.value;
          }
        });
      }
      hitSum = firstSum += hitPlayer;
      console.log(`playerHitCard-previous sum ${firstSum}`);
      console.log(`playerHitCard-hit value ${hitPlayer}`);
      //firstSum += hitPlayer;
      playerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
      playerScore.innerHTML = hitSum;
      //player.innerHTML += `</br><em>${firstCard}</em> <strong>Score: ${hitSum}</strong>`;
      if (hitSum > 21) {
        behaviourBtn(hit, "off");
      }
      break;
    case "computerHitCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      aInComputerCard += count;
      if (aInComputerCard > 0 && standSum <= 17) {
        weight.forEach((item) => {
          if (firstChar === item.type && firstChar === "A") {
            hitPlayer = 1;
          } else {
            hitPlayer = item.value;
          }
        });
      } else {
        weight.forEach((item) => {
          if (firstChar === item.type) {
            hitPlayer = item.value;
          }
        });
      }
      console.log(`computerHitCard-previous sum ${standSum}`);
      console.log(`computerHitCard-hit value ${hitPlayer}`);
      //firstSum += hitPlayer;
      standSum += hitPlayer;
      computerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
      computerScore.innerHTML = standSum;
      //computer.innerHTML += `</br><em>${firstCard}</em> <strong>Score: ${standSum}</strong>`;
      if (standSum > 21) {
        behaviourBtn(stand, "off");
      }
      break;
  }
}
// Number of Aces
function ifAce(char) {
  if (char == "A") {
    count++;
  }
}

// Generate deck
function deckMaker() {
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}-${suit}`);
    });
  });
}
// Shuffling deck
function deckShuffle() {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

// Random array generator with 2 values
function randNumber() {
  do {
    rand1 = Math.floor(Math.random() * 51);
    rand2 = Math.floor(Math.random() * 51);
  } while (rand1 === rand2);
  return [rand1, rand2];
}

// Make button disabled
function behaviourBtn(button, check) {
  switch (check) {
    case "off":
      button.classList.add("bg-orange-300", "cursor-not-allowed");
      button.classList.remove("bg-orange-500");
      button.disabled = true;
      break;
    case "on":
      button.classList.add("bg-orange-500");
      button.classList.remove("bg-orange-300", "cursor-not-allowed");
      button.disabled = false;
      break;
  }
}
