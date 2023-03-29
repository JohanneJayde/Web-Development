
const tiles = document.getElementsByClassName("tile");


class CharacterPiece{
    constructor(pos){
        this.pos = pos;
        this.bounds = {right: false, left: false, up: false, down: false}
    }
}

const character = new CharacterPiece(document.getElementsByClassName("tile")[17]);

let upPos = null;
let downPos = null;
let leftPos = null;
let rightPos = null;

updatePos(character.pos);
setUpperBounds();
setLowerBouunds();
setLeftBounds();
setRightBouunds()

function updatePos(pos){
    pos.classList.add("charPos");
    const posTile = Number(pos.id);

    normalMove(posTile);
    
}

document.addEventListener("keydown", move);

function resetPos(){

}

function normalMove(posTile){
    if(checkOutOfBounds(document.getElementById((posTile - 12).toString()))){}
    else{
        setMovementOption("up", posTile);
    }
    if(checkOutOfBounds(document.getElementById((posTile + 12).toString()))){}
    else{
        setMovementOption("down", posTile);
    }
    if(checkOutOfBounds(document.getElementById((posTile -1).toString())) || isLeftBound(document.getElementById(posTile))){}

    else{
        setMovementOption("left", posTile);
    }
    if(checkOutOfBounds(document.getElementById((posTile + 1).toString())) || isRightBound(document.getElementById(posTile))){}
    else{
        setMovementOption("right", posTile);
    }    
}

//Setting the bounds for grid so that user cannot move outside of the bounds
function setUpperBounds(){
    const topRow = document.getElementById("rowOne").children;

    for(const tile of topRow){
        tile.classList.add("topBound");
    }
}

function setLowerBouunds(){
    const bottonRow = document.getElementById("rowFive").children;

    for(const tile of bottonRow){
        tile.classList.add("lowerBound");
    }
}

function setLeftBounds(){
    const rows = document.getElementById("grid").children;

    for(const row of rows){
        row.children[0].classList.add("leftBound");
    }
}
function setRightBouunds(){
    const rows = document.getElementById("grid").children;

    for(const row of rows){
        row.children[4].classList.add("rightBound");
    }
}

function setMovementOption(moveOption, posTile){
    switch(moveOption){
        case 'up':
            upPos = document.getElementById((posTile - 12).toString());
            upPos.classList.add("up");  
            break;
        case 'down':
            downPos = document.getElementById((posTile + 12).toString());
            downPos.classList.add("down");
            break;
        case 'left':
            leftPos = document.getElementById((posTile -1).toString());
            leftPos.classList.add("left");
            break;
        case 'right':
            rightPos = document.getElementById((posTile + 1).toString());
            rightPos.classList.add("right");
            break;
    }
}

function checkOutOfBounds(pos){

    if(pos === null)
        return true;

    return false;
}

function isLeftBound(pos){
    const classes = Array.from(pos.classList);
    if(classes.includes("leftBound"))
        return true;
    return false;
}

function isRightBound(pos){
    const classes = Array.from(pos.classList);
    if(classes.includes("rightBound"))
        return true;
    return false;
}

function move(e){
    document.getElementsByClassName("charPos")[0].classList.remove("charPos");
    upPos.classList.remove("up");
    downPos.classList.remove("down");
    leftPos.classList.remove("left");
    rightPos.classList.remove("right");
    
    if(e.key === "ArrowUp"){
        moveUp();
        writeToMsgLog("You pressed up!");
    }
    if(e.key === "ArrowDown"){
        moveDown();
        writeToMsgLog("You pressed down!");
    }
    if(e.key === "ArrowLeft"){
        moveLeft();
        writeToMsgLog("You pressed left!");
    }
    if(e.key === "ArrowRight"){
        moveRight();
        writeToMsgLog("You pressed right!");
    }
}

function moveUp(){
    updatePos(upPos);
}
function moveDown(){
    updatePos(downPos);

}
function moveLeft(){
    updatePos(leftPos);

}
function moveRight(){
    updatePos(rightPos);
}

function writeToMsgLog(message){
    const msgLog = document.getElementById("messageLog");
    const msg = document.createElement("p");

    msg.innerHTML = message;
    msgLog.append(msg);
}

/*
Process to do Maze Game:
1. set initial position with class "charPos"
2. Add "up" class to idNum -3, "down" class to idNum+3, "right" class to IdNum+1, "left" class to idNum-1
3. Add eventlistener for "charPos" class so that when a key is pressed, the character is moved to the correct tile
4. adjust "charPos", "up", "down", "left", and "right" classes so that they are moved to relfect the character's new tile
5. if the charater reaches a border, the id doesn't exisit, then don't adjust funtion to allow character to move off of board
6. add message console to show the user where they are in 1-5 and A-D coordinates
7. add error messages for if user tries to move out of bounds
8. add walls eventully to create maze like game or add objective to see how many tiles user can fill in before reaching endpoint
9. add "end" class to symbolize end of maze or game tile

bugs:
out of bounds for up down left right

checking movement of character
1. Check if up, down, left, and right columns to see if they are a left, right, upper, or lower bound
2. if they are, do not define certain movements (i.e if char is in upper bounds, you can't move up and "up" class should not be set)
3. update bounds in charBounds in Char


Laymens terms
1. check if movement option is legal
2. if it's not legal, change to different movement function
3. within each movement function, update charBounds for piece so that it knows to only do certain movements

*/

