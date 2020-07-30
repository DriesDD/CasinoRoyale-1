//wrap everything in a function
(() => {
    const targetid = 'blockygame'
    let playerx, playery, oldplayerx, oldplayery, cycle

    //create a 20*20 table with id and class grid
    let html = "<table id=\"grid\" class= \"grid\">"
    for (i = 0; i < 20; i++) {
        html += "<tr>"
        for (j = 0; j < 20; j++) {
            html += " <td class= \"cell\" ></td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    document.getElementById(targetid).innerHTML = html;

    //player movement
    playerx = 10
    playery = 10
    oldplayerx = 10
    oldplayery = 10
    updatepos()
    
    document.onkeydown = () => {
    console.log(event.key);
        switch (event.key) {
			case 'ArrowLeft': playerx -=1; updatepos(); break;
			case 'ArrowUp': playery -=1; updatepos(); break;
			case 'ArrowRight': playerx +=1; updatepos(); break;
			case 'ArrowDown': playery +=1; updatepos(); break;
        }
    }

    //this function updates the position of everything in the grid and is triggered after every move
    function updatepos () {
    if (playerx != oldplayerx || playery != oldplayery)
    {document.getElementsByClassName('cell')[playery*20+playerx].style = "background: yellow";
     document.getElementsByClassName('cell')[oldplayery*20+oldplayerx].style = "background: grey";}

    oldplayerx = playerx;
    oldplayery = playery;
    }

    //pan the screen

    timeout = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}

    async function cyclestep() {
        await timeout(50);
        cycle += 1;
        //resize the first and last column to give the illusion of panning
        for (i=0;i<20;i++) 
        {document.getElementsByClassName('cell')[i*20+0].style = "width:" + Stringify(cycle % 20) + "px";
        }   
        //repeat the function
        cyclestep()};
    cyclestep()


})();