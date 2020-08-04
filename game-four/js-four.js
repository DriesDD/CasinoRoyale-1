//wrap everything in a function
(() => {
    const targetid = 'blockygame'
    let playerx, playery, playerdir, playerspeed = 150,
        oldplayerx, oldplayery, cycle = 0
    //screen width and screen height in number of tiles
    const sw = 40
    const sh = 20
    const interval = 100

    //create a sh*sw table with id and style to have full width
    let html = "<table id=\"grid\" class= \"table-fixed \">"
    for (i = 0; i < sh; i++) {
        html += "<tr class= \"\">"
        for (j = 0; j < sw; j++) {
            html += " <td class= \"cell px-4 py-4 bg-gray-800 \" ></td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    document.getElementById(targetid).innerHTML = html;

    //auxiliary function to wait a certain amount of milliseconds
    timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }


    //player movement
    playerx = Math.round(sw / 2)
    playery = Math.round(sh / 2)
    oldplayerx = playerx
    oldplayery = playery
    updatepos()

    document.onkeydown = () => {
        console.log(event.key);
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
                break;
            case 'down':
                playery += 1;
                break;
        }
        updatepos()
        await timeout(playerspeed);
        moveplayer()
    }
    moveplayer()

    //this function updates the position of everything in the grid and is triggered after every move
    function updatepos() {
        if (playerx != oldplayerx || playery != oldplayery) {
            document.getElementsByClassName('cell')[playery * sw + playerx].classList.add("bg-yellow-400");
            document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.remove("bg-yellow-400", "bg-gray-800");
            document.getElementsByClassName('cell')[oldplayery * sw + oldplayerx].classList.add("bg-gray-700");
        }

        oldplayerx = playerx;
        oldplayery = playery;
    }

    //pan the screen

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
                        document.getElementsByClassName('cell')[i * sw + j].classList.remove("bg-gray-800", "bg-gray-700", "bg-yellow-400")
                        document.getElementsByClassName('cell')[i * sw + j].classList.add("bg-gray-800")
                    }
                }
            }
            playerx -= 1;
            oldplayerx -= 1;
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