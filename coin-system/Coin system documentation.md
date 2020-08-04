# Balance

Every game should use coins to play. It's optional to add a way to add coins. Players will also be able to add coins from the profile page, or possibly in the top right corner of the page.

The local variables used for the coins system are:

 * "balance" - The current balance. It can't go below zero. When a player wants to play a game, they should have enough coins to lose. Otherwise the game should prevent you from playing, preferrably with a helpful message to get more coins.
 * "spent" - tracks the total amount spent. This number only goes up, and should go up every time you buy more coins.
 
 Other local variables can be added freely.
 
 The local variable functions that exist in javascript are:
 
 ```
 localStorage.setItem("balance",10)
 localStorage.getItem("balance")
```

### How much coins to use?

Imagine 1 coin costing 10 cents.

 *  1 coin is a very small commitment, only appliccable to a single action / a basic rock, paper, scissors game.
 *  5-10 coins is a normal amount to play a simple game.
 *  50 - 100 coins is an investment that matters.
 *  more than 100 coins should only be used if the game lasts more than a minute.
 
*Important:* The house always wins! Like a real casino, spending a lot of time will cause most people you to lose money, not win it.

### Example of some code to pay 10 coins. 

Uses a 'pay10' element that's a button, and a 'balance' element that shows the current balance.

```
$('pay10').onclick = () => {

localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);

$("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));
}
```
