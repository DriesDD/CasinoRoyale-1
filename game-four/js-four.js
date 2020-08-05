//----------------------------------------------//
//          PART 1: setting the scene           //
//______________________________________________//

//wrap everything in a function
(() => {
    //declare variables
    const targetid = 'blockygame'
    let playerx, playery, playerdir = 'right',
        playerspeed = 150,
        oldplayerx, oldplayery, life = 3,
        maxlife = 3,
        globalx = 0,
        cycle = 0,
        spawncycle = 0,
        gametime = 0

    //screen width and screen height in number of tiles
    const sw = 40
    const sh = 20
    //how often the game pans
    const interval = 100

    //event list of enemies: msdelay after previous,x,y,direction,speed,movement pattern,style
    eventlist = [
        [20, sw + 20, Math.round(sh / 2) +1 ,      'left', 400, 'none', "bg-red-400","bg-red-900"],
        [500, sw + 20, Math.round(sh / 2) +2, 'left', 150, 'none', "bg-red-400","bg-red-900"],
        [500, sw + 20, Math.round(sh / 2) +3, 'left', 200, 'none', "bg-red-400","bg-red-900"],
        [500, sw + 20, Math.round(sh / 2) +4, 'left', 80, 'none', "bg-red-400","bg-red-900"]
    ]

    //prevent the page from scrolling using the up and down keys, since those are used in game
    window.addEventListener("keydown", function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

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
    document.getElementById(targetid).innerHTML = html;

    //auxiliary function to wait a certain amount of milliseconds
    timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //----------------------------------------------//
    //   PART 2: enemy behavior                     //
    //______________________________________________//

    //enemy spawning
    async function enemyspawning() {
        enemycycle(eventlist[spawncycle][5], eventlist[spawncycle][4], eventlist[spawncycle][6], eventlist[spawncycle][7], eventlist[spawncycle][1], eventlist[spawncycle][2], eventlist[spawncycle][3]);
        await timeout(eventlist[spawncycle + 1][0]);
        spawncycle += 1
        enemyspawning()
    }
    enemyspawning()

    //enemy movement. Every cycle, the x,y position of the enemy is cleared and the new position is determined based on direction, then the enemy is redrawn
    async function enemycycle(pattern, speed, style, trace, x, y, dir) { //clear previous position if it was in the view
        if (x < sw) {
            document.getElementsByClassName('cell')[y * sw + x].classList.remove("bg-gray-800", "bg-gray-700", "bg-yellow-400", "bg-red-900","bg-red-400")
            document.getElementsByClassName('cell')[y * sw + x].classList.add(trace)
        };
        //pattern none doesn't change the direction
        if (pattern == 'none') {};
        //move in the direction
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
        }
        //else, draw enemy if they are in view, redo cycle if their x is higher than 0
        if (x >= 0) {
            if (x < sw) {
                document.getElementsByClassName('cell')[(y * sw) + x].classList.add(style);
                await timeout(speed);
                enemycycle(pattern, speed, style, trace, x, y, dir)
            } else {
                await timeout(speed);
                enemycycle(pattern, speed, style, trace, x, y, dir)
            }
        }
    }


    //----------------------------------------------//
    //   PART 3: player behavior                    //
    //______________________________________________//

    //player movement
    playerx = Math.round(sw / 2)
    playery = Math.round(sh / 2)
    oldplayerx = playerx
    oldplayery = playery
    updatepos()

    document.onkeydown = () => {
        switch (event.key) {
            case 'ArrowLeft':
                playerdir = 'left';
                break;
            case 'ArrowUp':
                playerdir = 'up';
                break;
            case 'ArrowRight':
                playerdir = 'right';
                break;
            case 'ArrowDown':
                playerdir = 'down';
                break;
        }
    }

    async function moveplayer() {
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
        moveplayer()
    }
    moveplayer()

    //this function redraws the position of the player and is triggered after every move
    function updatepos() {
        if (playerx != oldplayerx || playery != oldplayery) {
            //collision detection with enemies
            if (document.getElementsByClassName('cell')[playery * sw + playerx].classList.contains("bg-red-400")){ loselife()};
            //style the table cells to the player style
            document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.remove("bg-gray-800", "bg-gray-700", "bg-yellow-400", "bg-red-900","bg-red-400");
            document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.add("bg-gray-700");
            document.getElementsByClassName('cell')[playery * sw + playerx].classList.add("bg-yellow-400");
        }

        oldplayerx = playerx;
        oldplayery = playery;

        //lose life when too far left or right
        if ((playerx) < 1) {
            playerx = 1;
            playerdir = 'right';
            updatepos();
            loselife()
        }

        if ((playerx) > sw - 1) {
            playerx = sw - 1;
            playerdir = 'left';
            updatepos();
            loselife()
        }



    }


    //called when player loses a life
    function loselife() {
        life -= 1

        for (i = 0; i < 5; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-gray-500")
        }
        for (i = 0; i < maxlife; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-red-500")
        }
        for (i = 0; i < life; i++) {
            document.getElementsByClassName('healthblock')[i].setAttribute("class", "healthblock py-4 px-4 bg-green-500")
        }
    }

    //----------------------------------------------//
    //   PART 3: panning the screen                 //
    //______________________________________________//

    async function cyclestep() {
        await timeout(interval);
        cycle += 1;

        //move all columns to the left every cycle to pan the game field
        if ((cycle % 4) == 0) {
            for (i = 0; i < sh; i++) {
                for (j = 0; j < sw; j++) {
                    if (j < (sw - 1)) {
                        document.getElementsByClassName('cell')[i * sw + j].setAttribute("class", document.getElementsByClassName('cell')[i * sw + j + 1].getAttribute("class"));
                    } else {
                        document.getElementsByClassName('cell')[i * sw + j].classList.remove("bg-gray-800", "bg-gray-700", "bg-yellow-400", "bg-red-900","bg-red-400")
                        document.getElementsByClassName('cell')[i * sw + j].classList.add("bg-gray-800")
                    }
                }
            }
            playerx -= 1;
            oldplayerx -= 1;
            globalx -= 1;
        }

        //resize the first and last column to give the illusion of panning
        for (i = 0; i < sh; i++) {
            document.getElementsByClassName('cell')[i * sw + 0].classList.remove("px-1", "px-2", "px-3", "px-4");
            document.getElementsByClassName('cell')[i * sw + 0].classList.add("px-" + String(5 - ((cycle % 4) + 1)));

            document.getElementsByClassName('cell')[i * sw + sw - 1].classList.remove("px-1", "px-2", "px-3", "px-4");
            document.getElementsByClassName('cell')[i * sw + sw - 1].classList.add("px-" + String((cycle % 4) + 1));


        }
        //repeat the function
        cyclestep()
    };
    cyclestep()


})();