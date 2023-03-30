
//import { setLeftBounds, setRightBouunds, setUpperBounds, setLowerBouunds } from "./maze.js";

const tiles = document.getElementsByClassName("tile");

const mazeKey = [];

setUpperBounds();
setLowerBouunds();
setLeftBounds();
setRightBouunds();
//Setting the bounds for grid so that user cannot move outside of the bounds
function setUpperBounds() {
    const topRow = document.getElementById("rowOne").children;

    for (const tile of topRow) {
        tile.classList.add("topBound");
        tile.classList.add("border");
    }
}

function setLowerBouunds() {
    const bottonRow = document.getElementById("rowTwelve").children;

    for (const tile of bottonRow) {
        tile.classList.add("lowerBound");
        tile.classList.add("border");

    }
}

function setLeftBounds() {
    const rows = document.getElementById("grid").children;

    for (const row of rows) {
        row.children[0].classList.add("leftBound");
        row.children[0].classList.add("border");

    }
}
function setRightBouunds() {
    const rows = document.getElementById("grid").children;

    for (const row of rows) {
        row.children[rows.length - 1].classList.add("rightBound");
        row.children[rows.length - 1].classList.add("border");

    }
}

for(tile of tiles){
    tile.addEventListener("click", addBorder);
}


function addBorder(e){
    e.target.classList.add("border");
    console.log(e.target.id);
    mazeKey.push(e.target.id);
}

function generateMaze(key){
    
    for(const tile of tiles){

        if(key.includes(tile.id)){
            tile.classList.add("border");
 

        }
    }

}