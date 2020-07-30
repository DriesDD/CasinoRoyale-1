/*
Game: Rock, Paper, Scissors, Lizard, Spock
The Mission

Make a Rock, Paper, Scissors, Lizard, Spock game. It's like Rock, Paper, Scissors, but more fun!
Must-have features

    Have five buttons that the player can press to change their pick
    Have another button to let the computer pick one
    Show the winner
    Let the player know if they won or not (no alert box)
    Have a reset button

Nice-to-have features

    Nice graphics
    Simulate the computer thinking/working by using a timeout
    Let the player input using a text field
    Show what the player picked by highlighting the correct button
    Add more options (but avoid using 100 if statements)
    Add complex rules
*/
/*Scissors cuts Paper
Paper covers Rock
Rock crushes Lizard
Lizard poisons Spock
Spock smashes Scissors
Scissors decapitates Lizard
Lizard eats Paper
Paper disproves Spock
Spock vaporizes Rock
(and as it always has) Rock crushes Scissors*/

//rock: 1 paper: 2 scissors: 3 lizard: 4 spock: 5

let playerpick, rand, computerpick, choices

document.getElementById('rock').onclick = () => {playerpick = "rock"; compare()}
document.getElementById('paper').onclick = () => {playerpick = "paper"; compare()}
document.getElementById('scissors').onclick = () => {playerpick = "scissors"; compare()}
document.getElementById('lizard').onclick = () => {playerpick = "lizard"; compare()}
document.getElementById('spock').onclick = () => {playerpick = "spock"; compare()}

choices=["rock","paper","scissors","lizard","spock"]
rockarray= ["it's a tie","Your rock is wrapped in paper","Your rock smashes the scissors","Your rock squashes the lizard to a pulp.", "Your rock is vaporized by Spock."]
paperarray=["Your paper covers the rock", "it's a tie"," Your paper refutes the spock", "Your paper is cut by the scissor", "Your paper is eaten by the lizard"]
scissorsarray=["Your scissors cuts the paper","Your scissor is hit hard by the spock", "it's a tie","Your scissor beheaded the lizard","Your scissor is crushed by the rock"]
lizardarray=["Ssss. Your lizard is sssquashed by a big rock.", "Yummy. Your lizard ate the paper :)."," Swish! Your lizard is cut in half by the scissors. Can lizards grow back half their body or only their tails?", "Oh nice! Another lizard. Hello fellow lizard. It's a tie.", "Hehe >:) Your lizard poisoned the spock."]
spockarray=["Your Spock vaporizes the rock! Don't fock with the Spock, rock.","Your Spock is disproved by the paper. You wither away in shame.","Your Spock smashes the scissors! Spocktastic!", "Spock was poisoned by the computer's lizard. Who knew reptiles were its weakness?", "Spocks don't take issue with eachother. It's a tie."]

function compare() {
rand = Math.floor(Math.random()*5);
computerpick = choices[rand];
document.getElementById("computerpick").innerText = computerpick;
document.getElementById("playerpick").innerText = playerpick;

switch (playerpick)
{
case "rock": 
document.getElementById("winnermsg").innerText = rockarray[rand];break;
case "paper": 
document.getElementById("winnermsg").innerText = paperarray[rand];break;
case "scissors": 
document.getElementById("winnermsg").innerText = scissorsarray[rand];break;
case  "lizard": 
document.getElementById("winnermsg").innerText =  lizardarray[rand];break;
case  "spock": 
document.getElementById("winnermsg").innerText = spockarray[rand];break;
}
} 