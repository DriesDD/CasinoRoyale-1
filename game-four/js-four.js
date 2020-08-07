//----------------------------------------------//
//          PART 1: setting the scene           //
//______________________________________________//

//wrap everything in a function
(() => {
    const targetid = 'blockygame'
    //screen width and screen height in number of tiles
    const sw = 40
    const sh = 20

    //define which tailwind color classes are in the game (could be used later to remove these classes when redrawing things)
    const colors = ["bg-gray-800", "bg-yellow-300", "bg-yellow-100", "bg-red-800", "bg-gray-900", "bg-red-600", "bg-green-600", "bg-green-900", "bg-green-800", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500"];
    //define which color classes are enemies (needed to lose a life when hitting them)
    const enemycolors = [];
    //variables
    let playerx, playery, playerdir, playerspeed,
        oldplayerx, oldplayery, xshift,
        cycle, spawncycle, wave, bgcolor,
        gametime, interval, invincible, life, maxlife,
        score

    //event list of enemies, waves, powerups etc. populated by the generatewave function
    eventlist = []

    //prevent the page from scrolling using the up and down keys, since those are used in game
    window.addEventListener("keydown", function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    //auxiliary function to wait a certain amount of milliseconds
    timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //auxiliary function to select elements by id
    function $(x) {
        return document.getElementById(x);
    }

    //create a sh*sw table with id and style to have full width
    let html = "<div class=\"relative\">"
    html += "<table id=\"grid\" class= \"z-40 table-fixed\">"
    for (i = 0; i < sh; i++) {
        html += "<tr class= \"\">"
        for (j = 0; j < sw; j++) {
            html += " <td class= \"cell px-4 py-4 overflow-hidden bg-gray-800\" ></td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    html += "</div>"
    $(targetid).innerHTML = html;

    //restarts goes up every new game restart. Some functions use it to check if the game restarted since their last cycle.
    let restarts = 0
    //game reset function resets the game to default values, and shows the menu
    function gamereset() {
        //badge check
        if ((difficulty > 1) && (gametime / 1000 > 20)) {
            localStorage.setItem("game4unlock", 1);
            badgeupdate()
        }

        playerx = Math.round(sw / 3);
        playery = Math.round(sh / 2);
        oldplayerx = playerx;
        oldplayery = playery;
        playerdir = 'right';
        playerspeed = 150;
        life = 5;
        maxlife = 5;
        invincible = 0;
        cycle = 0;
        xshift = 0
        spawncycle = 0;
        score = gametime / 1000
        gametime = 0;
        interval = 100;
        restarts += 1;
        wave = 0;
        bgcolor = 'bg-gray-800'
        eventlist = [];

        for (i = 0; i < sh; i++) {
            for (j = 0; j < sw; j++) {
                document.getElementsByClassName('cell')[i * sw + j].classList.remove("bg-gray-800", "bg-green-600", "bg-green-900", "bg-green-800", "bg-yellow-300", "bg-yellow-100", "bg-red-800", "bg-gray-900", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500");
                document.getElementsByClassName('cell')[i * sw + j].classList.add("bg-gray-800");
            }

        }
        updatepos();
        loselife(0);

        $("gametime").innerText = "Paused"
        if (restarts > 1) {
            $('menutext').innerHTML = "You survived for " + score + " seconds." + "</br>"
            if ((difficulty > 1) && (score > 100)) {
                $('menutext').innerText = "Wow! You survived for " + score + " seconds on hard or extreme. You earned your badge!"
            }
        }
        difficulty = 0;
        $('menu').classList.remove("invisible")
    }
    gamereset(1)

    //the game is then started after clicking one of the menu difficulties

    $('normal').onclick = () => {
        if (localStorage.getItem("balance") >= 25) {
            life = 5;
            maxlife = 5;
            difficulty = 1;
            $('difficulty').innerText = 'Difficulty: normal';
            gamestart()
        } else {
            $('menutext').innerText = "Not enough coins to play. You need 25 but you only have " + localStorage.getItem("balance") + "."
        }
    }
    $('hard').onclick = () => {
        if (localStorage.getItem("balance") >= 25) {
            life = 3;
            maxlife = 3;
            difficulty = 2;
            $('difficulty').innerText = 'Difficulty: hard';
            gamestart()
        } else {
            $('menutext').innerText = "Not enough coins to play. You need 25 but you only have " + localStorage.getItem("balance") + "."
        }
    }
    $('extreme').onclick = () => {
        if (localStorage.getItem("balance") >= 25) {
            life = 1;
            maxlife = 1;
            difficulty = 3;
            $('difficulty').innerText = 'Difficulty: extreme';
            gamestart()
        } else {
            $('menutext').innerText = "Not enough coins to play. You need 25 but you only have " + localStorage.getItem("balance") + "."
        }
    }

    async function gamestart() {
        loselife(0);
        $('wavemsg').innerText = "Wave incoming";
        wavegenerator();
        //update the balance in the page menu
        $("balance").innerText = " Current balance: " + Number(localStorage.getItem("balance"));
        localStorage.setItem("balance", localStorage.getItem("balance") - 25);
        localStorage.setItem("spent", localStorage.getItem("spent") + 25);
        //these are repeating functions that carry on the number of game restarts with them. They don't do anything if the game is on a different number than them. This is how the function is killed when a new game has started 
        enemyspawning(restarts);
        cyclestep(restarts);
        $('menu').classList.add("invisible")
        //player entrance effect
        for (i = 0; i < playerx; i++) {
            document.getElementsByClassName('cell')[playery * sw + i].classList.remove("bg-gray-800", "bg-yellow-300", "bg-yellow-100", "bg-green-600", "bg-green-900", "bg-green-800", "bg-gray-900", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500");
            document.getElementsByClassName('cell')[playery * sw + i].classList.add("bg-yellow-300")

        }
        moveplayer(restarts);
    }

    //----------------------------------------------//
    //   PART 2: the wave generator                 //
    //______________________________________________//

    //this is the function where the waves are generated using an array of arrays
    //for enemy: eventtype, delay after previous,x,y,direction,speed, movement pattern, style, trail
    //for wave start: eventtype, delay after previous, background color
    //for message: eventtype, delay after previous, announcement
    //for powerup: eventtype, delay after previous, power, x, y, color1

    function wavegenerator() {
        let randy, randspeed, randsize

        //Assassins   
        eventlist.push(['wave', 5000, 'bg-gray-800']);
        eventlist.push(['message', 0, 'They sent assassins to kill you, captain.']);
        for (i = 0; i < (3 + wave + difficulty); i++) {
            if (Math.random() > (1 / (difficulty / 2 + wave / 2))) {
                eventlist.push(['enemy', 7000 / (1 + wave + difficulty), sw + 10, Math.round(Math.random() * sh), 'left', 600 / (5 + difficulty + wave), 'snake', "bg-red-600", "bg-gray-800"])
            } else {
                eventlist.push(['enemy', 4000 / (1 + wave + difficulty), sw + 10, Math.round(Math.random() * sh), 'up', 800 / (5 + difficulty + wave), 'pursue', "bg-red-600", "bg-gray-800"])
            }
        }
        eventlist.push(['enemy', 1000, -1, 1, 'left', 500, 'none', "bg-gray-800", "bg-gray-800"]);

        //Asteroid swarm
        eventlist.push(['wave', 5000, 'bg-gray-800']);
        eventlist.push(['message', 0, 'Captain, we are caught in an asteroid storm.']);
        for (i = 0; i < 30 * (difficulty + wave); i++) {
            randy = Math.floor(Math.random() * sh);
            randspeed = 50 + Math.floor(Math.random() * 200);
            randsize = Math.ceil(Math.random() * 3)
            eventlist.push(['enemy', 200 / (difficulty + wave), sw + 5, randy, 'left', randspeed, 'none', "bg-gray-900", "bg-gray-800"])
            for (j = 0; j < randsize; j++) {
                for (k = 0; k < randsize; k++) {
                    eventlist.push(['enemy', 0, sw + 5 + Math.round(randsize + j * 2 + 2 * Math.random()), randy + k * 2 + 2 * Math.random(), 'left', randspeed, 'none', "bg-gray-900", "bg-gray-800"]);
                }
            }
        }
        //the glitch
        eventlist.push(['wave', 5000, "bg-gray-800"]);
        eventlist.push(['message', 0, 'Something seems glitchy in the fabric of spacetime.']);
        for (i = 0; i < 10 * (difficulty + wave); i++) {
            randy = Math.floor(Math.random() * sh);
            randspeed = 150 + Math.floor(Math.random() * 100);
            randsize = Math.ceil(2 + Math.random() * 4)
            eventlist.push(['enemy', 400 / (difficulty + wave), sw + 5, randy, 'left', randspeed, 'none', "bg-green-600", "bg-gray-800"])
            for (j = 0; j < randsize * 2; j++) {
                for (k = 0; k < randsize; k++) {
                    eventlist.push(['enemy', 0, sw + 5 - randsize / 2 + j, randy + k, 'left', randspeed, 'none', "bg-green-600", "bg-gray-800"]);
                }
            }
            if (Math.random() > 0.96) {
                randy = Math.floor(Math.random() * sh);
                randspeed = Math.round(200 / (difficulty + wave) + (Math.random() * 200))
                eventlist.push(['enemy', 400, sw + 1, randy, 'down', randspeed, 'none', "bg-green-600", "bg-gray-800"]);
                for (j = 0; j < Math.ceil(Math.random() * 50); j++) {
                    eventlist.push(['enemy', 10, sw + 1, randy + j, 'down', randspeed, 'none', "bg-green-600", "bg-gray-800"]);
                }
            }
        }
        //Blue walls
        eventlist.push(['wave', 3000, 'bg-gray-800']);
        eventlist.push(['message', 0, 'Those walls... They\'re alive!']);
        for (i = 0; i < 0.5 * (3 + wave + difficulty); i++) {
            randy = Math.floor(Math.random() * sh);
            if (Math.random() * 20 < 4 + (difficulty + wave)) {
                eventlist.push(['enemy', 30000 / (1 + wave + difficulty), sw + 5, randy, 'left', 1000 / (5 + difficulty + wave), 'snake', "bg-blue-500", "bg-blue-700"])
                eventlist.push(['enemy', 0, sw + 5, randy + 1, 'left', 1000 / (5 + difficulty + wave), 'snake', "bg-blue-500", "bg-blue-700"])
            } else {
                eventlist.push(['enemy', 20000 / (1 + wave + difficulty), sw, randy, 'left', 8000 / (5 + difficulty + wave), 'none', "bg-blue-700", "bg-blue-700"])
                eventlist.push(['enemy', 10000 / (1 + wave + difficulty), sw + 5, randy, 'left', 1000 / (5 + difficulty + wave), 'snake', "bg-blue-500", "bg-blue-700"])
            }
            for (j = 0; j < (sh / 5 + Math.sqrt(2 + wave + difficulty)); j++) {
                eventlist.push(['enemy', 1, sw, (randy + j), 'up', 2000, 'none', "bg-blue-700", "bg-blue-700"])
                eventlist.push(['enemy', 1, sw, (randy - j), 'down', 2000, 'none', "bg-blue-700", "bg-blue-700"])
                eventlist.push(['enemy', 1, sw - 1, (randy + j), 'up', 2000, 'none', "bg-blue-700", "bg-blue-700"])
                eventlist.push(['enemy', 1, sw - 1, (randy - j), 'down', 2000, 'none', "bg-blue-700", "bg-blue-700"])
            }
        }

        //health bar
        eventlist.push(['message', 3000, 'After all that, you deserve a cookie.']);
        eventlist.push(['powerup', 100, 'health', sw, 5+Math.floor(Math.random() * sh), "bg-green-500"]);
    }


    //----------------------------------------------//
    //   PART 3: enemy and event behavior           //
    //______________________________________________//


    //enemy spawning / event triggering
    async function enemyspawning(currentgame) {
        if (currentgame == restarts) {
            let waittime = 100
            if (spawncycle <= (eventlist.length)) {
                //spawn enemies
                if (eventlist[spawncycle][0] == 'enemy') {
                    enemycycle(eventlist[spawncycle][6], eventlist[spawncycle][5], eventlist[spawncycle][7], eventlist[spawncycle][8], eventlist[spawncycle][2], eventlist[spawncycle][3], eventlist[spawncycle][4], restarts, xshift)
                }
                //new wave
                else if (eventlist[spawncycle][0] == 'wave') {
                    wave += 1;
                    $('wavemsg').innerText = "Wave " + String(wave);
                    bgcolor = eventlist[spawncycle][2]
                }
                //message
                else if (eventlist[spawncycle][0] == 'message') {
                    $('gamemsg').innerText = eventlist[spawncycle][2]
                }
                //powerup is actually a special kind of 'enemy'
                else if (eventlist[spawncycle][0] == 'powerup') {
                    enemycycle(eventlist[spawncycle][2], 100, eventlist[spawncycle][5], "bg-gray-800", eventlist[spawncycle][3], eventlist[spawncycle][4], "still", restarts, xshift)
                }
                //set waittime to the waittime of the next one
                if (spawncycle < (eventlist.length - 1)) {
                    waittime = eventlist[spawncycle + 1][1]
                }
                //if it's the second to last one, create a new wave (not made yet)
                else {
                    wavegenerator()
                    waittime = eventlist[spawncycle + 1][1]
                }
            }
            console.log(waittime);
            await timeout(waittime);
            spawncycle += 1
            enemyspawning(currentgame)
        }
    }

    //individual enemy movement. Every cycle, the x,y position of the enemy is cleared and the new position is determined based on direction, then the enemy is redrawn
    async function enemycycle(pattern, speed, style, trace, x, y, dir, currentgame, prevxshift) {
        if (currentgame == restarts) {
            //calculate how much the entire game screen shifted since the previous enemycycle
            const relshift = (xshift - prevxshift)
            const dead = 0;
            //die when hitting player's tail
            if (document.getElementsByClassName('cell')[y * sw + x].classList.contains("bg-yellow-300") == true) {
                dead = 1;
                document.getElementsByClassName('cell')[y * sw + x].classList.remove("bg-gray-800", "bg-yellow-300", "bg-yellow-100", "bg-green-600", "bg-green-900", "bg-green-800", "bg-gray-900", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500")
                document.getElementsByClassName('cell')[y * sw + x].classList.add("bg-yellow-300")
            };
            if (dead == 0) {
                //clear previous position if it was in the view
                if (x - relshift < sw) {
                    document.getElementsByClassName('cell')[y * sw + x - relshift].classList.remove("bg-gray-800", "bg-yellow-300", "bg-yellow-100", "bg-green-600", "bg-green-900", "bg-green-800", "bg-gray-900", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500")
                    document.getElementsByClassName('cell')[y * sw + x - relshift].classList.add(trace)
                };
                //pattern none doesn't change the direction
                if (pattern == 'none') {}
                //pattern pursue goes in the direction of player, when very close, launches itself as an object with pattern 'none'
                else if (pattern == 'pursue') {
                    if (Math.abs(playerx - x) + Math.abs(playery - y) > Math.random() * 10) {
                        if ((Math.abs(playerx - x)) > Math.min((Math.abs(playery - y - sh), (Math.abs(playery - y))))) {
                            if (x > playerx) {
                                dir = 'left'
                            } else(dir = 'right')
                        } else {
                            if (((y > playery) && ((y - playery) < sh / 2)) || ((y < playery) && ((playery - y) > sh / 2))) {
                                dir = 'up'
                            } else(dir = 'down')
                        }
                    } else {
                        enemycycle('none', speed / 2, style, trace, x, y, dir, currentgame, prevxshift)
                        dead = 1
                    }
                }
                //fade draws itself, then kills itself after one 'cycle'
                else if (pattern == 'fade') {
                    if (x < sw) {
                        document.getElementsByClassName('cell')[(y * sw) + x].classList.add(style);
                    }
                    await timeout(speed);
                    if (x < sw) {
                        document.getElementsByClassName('cell')[y * sw + x].classList.remove("bg-gray-800", "bg-yellow-300", "bg-yellow-100", "bg-green-600", "bg-green-900", "bg-green-800", "bg-gray-900", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500");
                        document.getElementsByClassName('cell')[y * sw + x].classList.add(trace);
                    }
                    dead = 1
                }
                // snake leaves a deadly snail-like trail
                else if (pattern == 'snake') {
                    enemycycle('fade', speed * 3, style, trace, x, y - relshift, dir, currentgame, prevxshift);
                    if ((Math.abs(playerx - x)) > Math.min((Math.abs(playery - y - sh), (Math.abs(playery - y))))) {
                        if (x > playerx) {
                            dir = 'left'
                        } else(dir = 'right')
                    } else {
                        if (((y > playery) && ((y - playery) < sh / 2)) || ((y < playery) && ((playery - y) > sh / 2))) {
                            dir = 'up'
                        } else(dir = 'down')
                    }
                }
                // snake leaves a deadly snail-like trail
                else if (pattern == 'health') {}
                //move in the direction
                x -= relshift
                switch (dir) {
                    case 'right':
                        x += 1;
                        break;
                    case 'left':
                        x -= 1;
                        break;
                    case 'up':
                        y -= 1;
                        if (y < 0) {
                            y += sh
                        }
                        break;
                    case 'down':
                        y += 1;
                        if (y >= sh) {
                            y -= sh
                        }
                        break;
                    case 'still':
                        break;
                }
                //when enemy hits the player, player loses life
                if ((x == playerx) && (y == playery)) {
                    if (pattern == 'health')
                    {loselife(-1)}
                    else {loselife(1)}
                    dead = 1
                }

                //draw enemy if they are in view, redo cycle if their x is higher than 0
                if (x >= 0 && (dead == 0)) {
                    if (x < sw) {
                        if ((pattern == 'health') && ((cycle % 2) < 1)) {
                            document.getElementsByClassName('cell')[(y * sw) + x].classList.add("bg-gray-400")
                        } else {
                            document.getElementsByClassName('cell')[(y * sw) + x].classList.add(style)
                        }
                    }
                    prevxshift = xshift;
                    await timeout(speed);
                    enemycycle(pattern, speed, style, trace, x, y, dir, currentgame, prevxshift)
                }
            }
        }
    }

    //----------------------------------------------//
    //   PART 4: player behavior                    //
    //______________________________________________//

    //player movement

    document.onkeydown = () => {
        switch (event.key) {
            case 'ArrowLeft':
                if (playerdir != 'right') {
                    playerdir = 'left'
                }
                break;
            case 'ArrowUp':
                if (playerdir != 'down') {
                    playerdir = 'up'
                }
                break;
            case 'ArrowRight':
                if (playerdir != 'left') {
                    playerdir = 'right'
                }
                break;
            case 'ArrowDown':
                if (playerdir != 'up') {
                    playerdir = 'down'
                }
                break;
        }
    }

    async function moveplayer(currentgame) {
        if (currentgame == restarts) {
            switch (playerdir) {
                case 'right':
                    playerx += 1;
                    break;
                case 'left':
                    playerx -= 1;
                    break;
                case 'up':
                    playery -= 1;
                    if (playery < 0) {
                        playery += sh
                    }
                    break;
                case 'down':
                    playery += 1;
                    if (playery >= sh) {
                        playery -= sh
                    }
                    break;
            }
            updatepos()
            await timeout(playerspeed);
            moveplayer(currentgame)
        }
    }


    //this function redraws the position of the player and is triggered after every move
    function updatepos() {
        if (playerx != oldplayerx || playery != oldplayery) {
            //collision detection with every enemy color and tail
            if (document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-gray-900") ||
                document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-green-600") ||
                document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-yellow-300") ||
                document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-blue-500") ||
                document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-blue-700") ||
                document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-red-600")) {
                loselife(1)

            };
            //style the table cells to the player style
            document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.remove("bg-gray-800", "bg-yellow-300", "bg-green-600", "bg-green-900", "bg-green-800", "bg-gray-900", "bg-yellow-100", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500");
            if (invincible == 1) {
                document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.add("bg-orange-600")
            } else {
                document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.add("bg-yellow-300")
            }
            document.getElementsByClassName('cell')[playery * sw + playerx].classList.add("bg-yellow-100");


        }

        oldplayerx = playerx;
        oldplayery = playery;

        //lose life when too far left or right
        if ((playerx) < 1) {
            playerx = 1;
            playerdir = 'right';
            updatepos();
            loselife(1);
        }

        if ((playerx) > sw - 1) {
            playerx = sw - 1;
            playerdir = 'left';
            updatepos();
            loselife(1);
        }
    }


    //called when player loses a life
    async function loselife(loss) {
        if (invincible == 0) {
            life -= Number(loss)
            if (life > maxlife) {maxlife = life}
        }

        for (i = 0; i < 5; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-gray-500")
        }
        for (i = 0; i < maxlife; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-red-500")
        }
        for (i = 0; i < life; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-green-500")
        }

        //reset game when lost
        if (life < 1) {
            gamereset()
        }

        //invincibility period
        if (loss > 0) {
            invincible = 1;
            await (timeout)(1000);
            invincible = 0
        }
    }

    //----------------------------------------------//
    //PART 5: panning screen and recording gametime //
    //______________________________________________//

    async function cyclestep(currentgame) {
        if (currentgame == restarts) {
            cycle += 1;
            gametime += interval
            $("gametime").innerText = gametime / 1000 + " seconds"
            //move all columns to the left every cycle to pan the game field
            if ((cycle % 4) == 0) {
                for (i = 0; i < sh; i++) {
                    for (j = 0; j < sw; j++) {
                        if (j < (sw - 1)) {
                            document.getElementsByClassName('cell')[i * sw + j].setAttribute("class", document.getElementsByClassName('cell')[i * sw + j + 1].getAttribute("class"));
                        } else {
                            document.getElementsByClassName('cell')[i * sw + j].classList.remove("bg-gray-800", "bg-green-600", "bg-green-900", "bg-green-800", "bg-yellow-300", "bg-gray-900", "bg-yellow-100", "bg-red-800", "bg-red-600", "bg-blue-500", "bg-blue-700", "bg-orange-600", "bg-green-500")
                            document.getElementsByClassName('cell')[i * sw + j].classList.add(bgcolor)
                        }
                    }
                }
                playerx -= 1;
                oldplayerx -= 1
                xshift += 1
            }

            //resize the first and last column to give the illusion of panning
            for (i = 0; i < sh; i++) {
                document.getElementsByClassName('cell')[i * sw + 0].classList.remove("px-1", "px-2", "px-3", "px-4");
                document.getElementsByClassName('cell')[i * sw + 0].classList.add("px-" + String(5 - ((cycle % 4) + 1)));

                document.getElementsByClassName('cell')[i * sw + sw - 1].classList.remove("px-1", "px-2", "px-3", "px-4");
                document.getElementsByClassName('cell')[i * sw + sw - 1].classList.add("px-" + String((cycle % 4) + 1));


            }
            //repeat the function
            await timeout(interval);
            cyclestep(currentgame)
        }
    };


})();