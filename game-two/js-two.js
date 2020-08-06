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

//Cards suits, rank and weight arrays. Deck is generated using these arrays.
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

const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

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

//DOM elements involve for this game
const display = document.getElementById("deck");
const play = document.getElementById("dealBtn");
const stand = document.getElementById("standBtn");
const hit = document.getElementById("hitBtn");
const computer = document.getElementById("computer");
const player = document.getElementById("player");
const computerCards = document.getElementById("computerCards");
const playerCards = document.getElementById("playerCards");
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");
const playAgain = document.getElementById("play");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const body = document.getElementById("body");
const close = document.getElementById("close");
const coins = document.getElementById("coins");
const bank = document.getElementById("bank");
const chip1 = document.getElementById("chip1");
const chip5 = document.getElementById("chip5");
const chip10 = document.getElementById("chip10");
const chip25 = document.getElementById("chip25");
const bet = document.getElementById("bet");
const balance = document.getElementById("balance");
const pay10 = document.getElementById("pay10");
const coinwon = document.getElementById("coinwon");
const badgeDispaly = document.getElementById("badgeDispaly");

//Variables declaration
let deck = [],
  playerCard,
  computerCard,
  rand1,
  rand2,
  firstSum,
  hitPlayer,
  hitSum,
  standSum,
  hiddenCard,
  sumPlayer = 0,
  betAmount = 0,
  count = 0,
  playerWin = 0,
  sum;
// Coin bank and bet updater function
function betUpdate(coin, minCoin, coinSVG) {
  if (betAmount == 0) bet.classList.remove("hidden");
  if (
    Number(localStorage.getItem("balance")) > coin &&
    Number(localStorage.getItem("balance")) - minCoin >= 0
  ) {
    betAmount += minCoin;
    bet.innerText = betAmount;
    localStorage.setItem(
      "balance",
      Number(localStorage.getItem("balance")) - minCoin
    );
    bank.innerText = Number(localStorage.getItem("balance"));
    coins.innerHTML += `<img class="w-10 mr-2" src="coins/${coinSVG}.svg"
    />`;
  }
}
// Chip 1 listener
chip1.addEventListener("click", () => {
  betUpdate(0, 1, "coin-1");
});

// Chip 5 listener
chip5.addEventListener("click", () => {
  betUpdate(4, 5, "coin-5");
});

// Chip 10 listener
chip10.addEventListener("click", () => {
  betUpdate(9, 10, "coin-10");
});

// Chip 25 listener
chip25.addEventListener("click", () => {
  betUpdate(24, 25, "coin-25");
});

// Close button listener. Closes the popup modal box.
close.addEventListener("click", () => {
  modal.classList.add("hidden");
  body.classList.remove("opacity-25");
});

//On windows load, update bank balance. Disable draw and stand button
window.onload = () => {
  balance.innerText =
    "Current balance: " + Number(localStorage.getItem("balance"));
  bank.innerText = Number(localStorage.getItem("balance"));
  behaviourBtn(hit, "off");
  behaviourBtn(stand, "off");
  betAmount = 0;
};

// Play again button listener. Closes the popup modal box and resets the game.
playAgain.addEventListener("click", () => {
  modal.classList.add("hidden");
  bet.classList.add("hidden");
  playerScore.classList.add("hidden");
  computerScore.classList.add("hidden");
  body.classList.remove("opacity-25");
  playerScore.innerHTML = "";
  computerScore.innerHTML = "";
  playerCards.innerHTML = "";
  computerCards.innerHTML = "";
  coins.innerHTML = "";
  bet.innerHTML = "";
  deck = [];
  behaviourBtn(play, "on");
  behaviourBtn(stand, "on");
  behaviourBtn(hit, "on");
});

// Play button listener. Game starts by clicking this button.
play.addEventListener("click", () => {
  if (betAmount > 0) {
    deckMaker();
    deckShuffle();
    deal(playerCard, "playerFirstCard");
    deal(computerCard, "computerFirstCard");
    playAgain.classList.remove("hidden");
    behaviourBtn(play, "off");
    behaviourBtn(hit, "on");
    behaviourBtn(stand, "on");
  } else {
    setTimeout(() => {
      body.classList.add("opacity-25");
      modal.classList.add("opacity-100");
      modal.classList.remove("hidden");
      playAgain.classList.add("hidden");
      result.innerHTML = `First place a bet`;
    }, 500);
  }
});

// Hit button listener. If player wants to draw more card he/she clicks this button.
hit.addEventListener("click", () => {
  deal(playerCard, "playerHitCard");
  if (firstSum > 21) {
    document
      .getElementById("hiddenCard")
      .setAttribute("src", `cards/${hiddenCard}.svg`);
    computerScore.innerHTML = standSum;
    winner("Player bust!", "lose");
  }
});

// Stand button listener. If player wants to stand and computer play its turn he/she clicks this button.
stand.addEventListener("click", () => {
  behaviourBtn(hit, "off");
  document
    .getElementById("hiddenCard")
    .setAttribute("src", `cards/${hiddenCard}.svg`);
  computerScore.innerHTML = standSum;

  console.log(`Inside Stand sumPlayer ${sumPlayer}`);
  console.log(`Inside Stand standSum ${standSum}`);
  console.log(`Inside Stand firstSum ${firstSum}`);
  while (standSum < 17) {
    deal(computerCard, "computerHitCard");
  }
  if (standSum > 21) {
    winner("Computer bust!", "gain");
  } else if (standSum > firstSum) {
    winner("Computer wins!", "lose");
  } else if (standSum < firstSum) {
    winner("Player wins!", "gain");
  } else if ((standSum = firstSum)) {
    winner("It's a tie!", "tie");
  }

  behaviourBtn(stand, "off");
});
// This function announces the winner
// Uses settimeout to delay function call after 1000ms
// Displays result in popup modal with gain or lose coins
function winner(message, decision) {
  switch (decision) {
    case "gain":
      setTimeout(() => {
        body.classList.add("opacity-25");
        modal.classList.add("opacity-100");
        modal.classList.remove("hidden");
        localStorage.setItem(
          "balance",
          Number(localStorage.getItem("balance")) + betAmount * 2
        );
        bank.innerText = Number(localStorage.getItem("balance"));
        pay10.innerText = Number(localStorage.getItem("balance"));
        result.innerHTML = `${message}`;
        coinwon.classList.remove("hidden");
        coinwon.innerHTML = `Player gets +${betAmount * 2} coins`;
        playerWin += 1;
        if (playerWin == 5) {
          badgeDispaly.classList.remove("hidden");
          badgeDispaly.innerHTML += `<img class="w-10 mr-2" src="coins/coin-1.svg"
          />`;
        }
      }, 1000);

      break;
    case "lose":
      setTimeout(() => {
        body.classList.add("opacity-25");
        modal.classList.remove("hidden");
        result.innerHTML = `${message}`;
        coinwon.classList.remove("hidden");
        coinwon.innerHTML = `Player lose -${betAmount} coins`;
        playerWin = 0;
      }, 1000);
      break;
    case "tie":
      setTimeout(() => {
        body.classList.add("opacity-25");
        modal.classList.remove("hidden");
        result.innerHTML = `${message}`;
      }, 1000);
      break;
  }
}

// This function is the Brain of the game, it contains pretty much all the algorithm of the game.
// Deal 2 cards for player and computer respectively. When player clicks the play button the first 2 cards are generated in this function.
// Clicking the hit button alway fire this funtion for each draw card.
// Computer also call this funtion to draw its cards.
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
        } else if (firstChar === secondChar && firstChar === item.type) {
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
        case "playerFirstCard":
          aInPlayerCard = count;
          count = 0;
          console.log(`Number of A's is ${aInPlayerCard}`);
          firstSum = sumPlayer;
          playerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
          playerCards.innerHTML += `<img class="mr-1" src="cards/${secondCard}.svg" />`;
          playerScore.classList.remove("hidden");
          playerScore.innerHTML = sumPlayer;
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
          computerScore.classList.remove("hidden");
          computerScore.innerHTML = sumPlayer - sum;
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
      playerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
      playerScore.innerHTML = hitSum;
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
      standSum += hitPlayer;
      computerCards.innerHTML += `<img class="mr-1" src="cards/${firstCard}.svg" />`;
      computerScore.innerHTML = standSum;
      if (standSum > 21) {
        behaviourBtn(stand, "off");
      }
      break;
  }
}
// Checks the number of Aces in payer and computer cards
function ifAce(char) {
  if (char == "A") {
    count++;
  }
}

// Generates the deck
function deckMaker() {
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}-${suit}`);
    });
  });
}
// Shuffling the deck
function deckShuffle() {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

// Random array generator with 2 values
function randNumber() {
  do {
    rand1 = Math.floor(Math.random() * 51);
    rand2 = Math.floor(Math.random() * 51);
  } while (rand1 === rand2);
  return [rand1, rand2];
}

// Makes button disabled true or false
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
