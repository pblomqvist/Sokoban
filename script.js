const container = document.getElementById("container");
const restartBtn = document.getElementById("restart");
restartBtn.setAttribute("onclick", "restart()");
document.body.addEventListener('keydown', keyPress);

var player = {
	x: -1, 
	y: -1
};

function restart() {
    location.reload();
}

function initializeMap()
{
    console.log(tileMap01);

    for (let col = 0; col < tileMap01.width; col++) {
        
        let gridrow = document.createElement("div");
        container.appendChild(gridrow).className = "gridRow";

        for (let row = 0; row < tileMap01.height; row++) {
            
            var block = document.createElement("div");
            gridrow.appendChild(block).className = "block";

            //Assign appropriate class name to respective block
            if(tileMap01.mapGrid[row][col][0] == 'W') {
                block.classList.add(Tiles.Wall);
            } else if (tileMap01.mapGrid[row][col][0] == 'G') {
                block.classList.add(Tiles.Goal);
            } else if (tileMap01.mapGrid[row][col][0] == ' ') {
                block.classList.add(Tiles.Space);
            } else if (tileMap01.mapGrid[row][col][0] == 'B') {
                block.classList.add(Entities.Block);
            } else if (tileMap01.mapGrid[row][col][0] == 'G') {
                block.classList.add(Entities.Goal);
            }

            //Give every block ID that represents coordinates
            block.id = "x" + row + "y" + col;

            //Give player starting position and set coordinates
            var startPosition = document.getElementById("x11y11");
            if(startPosition)
            {
                startPosition.classList.add(Entities.Character);
                player.x = 11;
                player.y = 11;
            }
            
        }
    }
}

function keyPress(e)
{
	switch(e.key){
		case 'ArrowUp':
            console.log("up", player.x, player.y);
            e.preventDefault();
			movePlayer(0, -1);
		break;
		
		case 'ArrowDown':
            console.log("down", player.x, player.y);
            e.preventDefault();
			movePlayer(0, 1);

		break;
		
		case 'ArrowLeft':
            console.log("left", player.x, player.y);
            e.preventDefault();
			movePlayer(-1, 0);

		break;
		
		case 'ArrowRight':
            console.log("right", player.x, player.y);
            e.preventDefault();
			movePlayer(1, 0);

		break;

		default:
		break;
	}
}

function winConditionMet(arr) {
    var result = false;
    var count = 0;

    for (let i = 0; i < arr.length; i++) {
        var checkArr = document.getElementById(arr[i].id);
        if (checkArr.classList.contains(Tiles.Goal) && checkArr.classList.contains(Entities.Block)) {
            count++;
        } else {
            result = false;
        }
    }

    if(count === arr.length) {
        result = true;
    }

    return result;
}

function stopGame() {
        console.log("Win!");
        document.getElementById("displayWin").style.display = "block";
        container.style.filter = ("blur(4px)");
        document.body.removeEventListener('keydown', keyPress);
}

//Handle blocks
function checkNeighbourBlock(element, neighbourElement) {
    if(element.classList.contains(Entities.Block)) {
        console.log("Block found!");
        if(neighbourElement.classList.contains(Tiles.Goal)) {
            console.log("Goal detected!");
            neighbourElement.classList.add(Entities.BlockDone);
        } 
        if(neighbourElement.classList.contains(Entities.Block) || neighbourElement.classList.contains(Tiles.Wall)) {
            console.log("Cannot move block with block!");
        } else {
            element.classList.remove(Entities.Block);
            neighbourElement.classList.add(Entities.Block);
        }
    }
}

//Restore goal tile if block is not present
function checkBlockDone(element) {
    if (element.classList.contains(Entities.BlockDone) && !element.classList.contains(Entities.Block)) {
        element.classList.remove(Entities.BlockDone);
}
}

function movePlayer(x, y){
	var newY = player.y + y;
	var newX = player.x + x;
    var neighbourX = newX + x;
    var neighbourY = newY + y; 

    var goals = document.getElementsByClassName(Tiles.Goal);
    var playerElement = document.getElementById("x"+ player.x + "y"+ player.y);
	var destination = document.getElementById("x" + newX + "y" + newY);
    var neighbourBlock = document.getElementById("x" + neighbourX + "y" + neighbourY);

    checkNeighbourBlock(destination, neighbourBlock);

    //Make walls stop player and blocks
    if(destination.classList.contains(Tiles.Wall)) {
        console.log("Cannot move outside wall!");
    } else if(destination.classList.contains(Entities.Block)) {
        console.log("Cannot move block outside wall!");
    } else {
        playerElement.classList.remove(Entities.Character);
        destination.classList.add(Entities.Character);
        player.x = newX;
        player.y = newY;
    }

    checkBlockDone(playerElement);

    if(winConditionMet(goals)) {
        stopGame();
    }
       
}

initializeMap();