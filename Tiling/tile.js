
const tiles = document.getElementsByClassName("tile");


class CharacterPiece{

    constructor(pos){
        this.pos = pos;
        this.bounds = {right: false, left: false, up: false, down: false}
        this.moves = {
            upMove: Number(pos.id) - 12,
            downMove:  Number(pos.id) + 12,
            leftMove: Number(pos.id) -1,
            rightMove: Number(pos.id) + 1
        };
    }
    enableMove(bound){
        switch(bound){
            case 'up':
                this.bounds.up = true;
                break;
            case 'down':
                this.bounds.down = true;
                break;
            case 'left':
                this.bounds.down = true;
                break;
            case 'right':
                this.bounds.down = true;
                break;
        }
    }
    disableMove(bound){
        switch(bound){
            case 'up':
                this.bounds.up = false;
                break;
            case 'down':
                this.bounds.down = false;
                break;
            case 'left':
                this.bounds.down = false;
                break;
            case 'right':
                this.bounds.down = false;
                break;
        }
    }
    updateMoves(pos){
        this.moves = {
            upMove: Number(pos.id) - 12,
            downMove:  Number(pos.id) + 12,
            leftMove: Number(pos.id) -1,
            rightMove: Number(pos.id) + 1
        };
    }
    updatePos(pos){
        this.pos = pos;
        this.updateMoves(pos);
    }
    get getUpperBound(){
        return this.bounds.up;
    }
    get getLowerBound(){
        return this.bounds.down;
    }
    get getleftBound(){
        return this.bounds.left;
    }
    get getRightBound(){
        return this.bounds.right;
    }
    get getMoveOptions(){
        return this.moves;
    }

}

const character = new CharacterPiece(document.getElementsByClassName("tile")[77]);



updatePos(character.pos);
setUpperBounds();
setLowerBouunds();
setLeftBounds();
setRightBouunds()

function updatePos(pos){
    pos.classList.add("charPos");
    character.updatePos(pos);
    const posTile = Number(pos.id);
    writeToMovementOptions(character.getMoveOptions);
    normalMove(posTile);
    
}

document.addEventListener("keydown", move);

function resetPos(){

}

function normalMove(posTile){

        setMovementOption("up", posTile);
        setMovementOption("down", posTile);
        setMovementOption("left", posTile);
        setMovementOption("right", posTile);

}

//Setting the bounds for grid so that user cannot move outside of the bounds
function setUpperBounds(){
    const topRow = document.getElementById("rowOne").children;

    for(const tile of topRow){
        tile.classList.add("topBound");
        tile.classList.add("border");
    }
}

function setLowerBouunds(){
    const bottonRow = document.getElementById("rowTwelve").children;

    for(const tile of bottonRow){
        tile.classList.add("lowerBound");
        tile.classList.add("border");

    }
}

function setLeftBounds(){
    const rows = document.getElementById("grid").children;

    for(const row of rows){
        row.children[0].classList.add("leftBound");
        row.children[0].classList.add("border");

    }
}
function setRightBouunds(){
    const rows = document.getElementById("grid").children;

    for(const row of rows){
        row.children[rows.length - 1].classList.add("rightBound");
        row.children[rows.length - 1].classList.add("border");

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

    if(Array.from(pos.classList).includes("border"))
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

function writeToMovementOptions(moveOptions){

    const upMove = document.getElementById("upMove");
    upMove.innerHTML = moveOptions.upMove;
    const downMove = document.getElementById("downMove");
    downMove.innerHTML = moveOptions.downMove;
    const leftMove = document.getElementById("leftMove");
    leftMove.innerHTML = moveOptions.leftMove;
    const rightMove = document.getElementById("rightMove");
    rightMove.innerHTML = moveOptions.rightMove;

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

