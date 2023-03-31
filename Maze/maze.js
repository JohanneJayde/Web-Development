const tiles = document.getElementsByClassName("tile");



const editMode = false;

class CharacterPiece {

    constructor(pos) {
        this.pos = pos;
        this.bounds = { right: false, left: false, up: false, down: false }
        this.moves = {
            upMove: Number(pos.id) - 12,
            downMove: Number(pos.id) + 12,
            leftMove: Number(pos.id) - 1,
            rightMove: Number(pos.id) + 1
        };
    }
    disableMove(bound) {
        switch (bound) {
            case 'up':
                this.bounds.up = true;
                break;
            case 'down':
                this.bounds.down = true;
                break;
            case 'left':
                this.bounds.left = true;
                break;
            case 'right':
                this.bounds.right = true;
                break;
        }
    }
    enableMove(bound) {
        switch (bound) {
            case 'up':
                this.bounds.up = false;
                break;
            case 'down':
                this.bounds.down = false;
                break;
            case 'left':
                this.bounds.left = false;
                break;
            case 'right':
                this.bounds.right = false;
                break;
        }
    }
    updateMoves(pos) {
        this.moves = {
            upMove: Number(pos.id) - 12,
            downMove: Number(pos.id) + 12,
            leftMove: Number(pos.id) - 1,
            rightMove: Number(pos.id) + 1
        };
    }
    updatePos(pos) {
        this.pos = pos;
        this.updateMoves(pos);
    }
    get getUpperBound() {
        return this.bounds.up;
    }
    get getLowerBound() {
        return this.bounds.down;
    }
    get getLeftBound() {
        return this.bounds.left;
    }
    get getRightBound() {
        return this.bounds.right;
    }
    get getMoveOptions() {
        return this.moves;
    }

}

const mazeKey = ["15", "27", "28", "93", "101", "118", "103","105","106","128"];

const character = new CharacterPiece(document.getElementsByClassName("tile")[77]);


function setBounds(){
    setUpperBounds();
    setLowerBouunds();
    setLeftBounds();
    setRightBouunds();
}


function startGame(){
    updatePos(character.pos);
    setBounds();
    generateMaze(mazeKey);
}


function generateMaze(key){
    
    for(const tile of tiles){

        if(key.includes(tile.id)){
            tile.classList.add("wall");
        }
    }

}

function updatePos(pos) {

    pos.classList.add("charPos");
    character.updatePos(pos);
    updateMoveStatus();

    const posTile = Number(pos.id);
    writeToMovementOptions(character.getMoveOptions);
  //  writeMoveStatuses(character.bounds);
    normalMove(posTile);

}

document.addEventListener("keydown", move);
document.addEventListener("keydown", highLightKey);
document.addEventListener("keyup", clearKey);


document.getElementById("reset").addEventListener("click", resetPos);

function updateMoveStatus() {
    const moveOptions = character.getMoveOptions;

    if (isBorder(moveOptions.upMove)) {
        character.disableMove("up");

    }
    else {
        character.enableMove("up");

    }
    if (isBorder(moveOptions.downMove)) {
        character.disableMove("down");
    }
    else {
        character.enableMove("down");
    }
    if (isBorder(moveOptions.leftMove)) {
        character.disableMove("left");

    }
    else {
        character.enableMove("left");
    }
    if (isBorder(moveOptions.rightMove)) {

        character.disableMove('right');

    }
    else {
        character.enableMove("right");
    }

}

function isBorder(tile) {
    const tileClasses = Array.from(document.getElementById(tile.toString()).classList);

    if (tileClasses.includes("wall")) {
        return true;
    }
    else {

        return false;
    }

}

function resetPos() {
    document.getElementsByClassName("charPos")[0].classList.remove("charPos");
    updatePos(document.getElementsByClassName("tile")[77]);
}

function normalMove(posTile) {
    setMovementOption("up", posTile);
    setMovementOption("down", posTile);
    setMovementOption("left", posTile);
    setMovementOption("right", posTile);

}

//Setting the bounds for grid so that user cannot move outside of the bounds
function setUpperBounds() {
    const topRow = document.getElementById("rowOne").children;

    for (const tile of topRow) {
        tile.classList.add("border");
        tile.classList.add("wall");
    }
}

function setLowerBouunds() {
    const bottonRow = document.getElementById("rowTwelve").children;

    for (const tile of bottonRow) {
        tile.classList.add("border");
        tile.classList.add("wall");

    }
}

function setLeftBounds() {
    const rows = document.getElementById("grid").children;

    for (const row of rows) {
        row.children[0].classList.add("border");
        row.children[0].classList.add("wall");

    }
}
function setRightBouunds() {
    const rows = document.getElementById("grid").children;

    for (const row of rows) {
        row.children[rows.length - 1].classList.add("border");
        row.children[rows.length - 1].classList.add("wall");

    }
}

function setMovementOption(moveOption, posTile) {
    switch (moveOption) {
        case 'up':
            upPos = document.getElementById((posTile - 12).toString());
            upPos.classList.add("up");
            break;
        case 'down':
            downPos = document.getElementById((posTile + 12).toString());
            downPos.classList.add("down");
            break;
        case 'left':
            leftPos = document.getElementById((posTile - 1).toString());
            leftPos.classList.add("left");
            break;
        case 'right':
            rightPos = document.getElementById((posTile + 1).toString());
            rightPos.classList.add("right");
            break;
    }
}

function isLeftBound(pos) {
    const classes = Array.from(pos.classList);
    if (classes.includes("border"))
        return true;
    return false;
}

function isRightBound(pos) {
    const classes = Array.from(pos.classList);
    if (classes.includes("border"))
        return true;
    return false;
}

function move(e) {

    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {

    }
    else {
        document.getElementsByClassName("charPos")[0].classList.remove("charPos");
        upPos.classList.remove("up");
        downPos.classList.remove("down");
        leftPos.classList.remove("left");
        rightPos.classList.remove("right");

        if (e.key === "ArrowUp") {
            moveUp();
            writeToMsgLog("You pressed up!");
        }
        if (e.key === "ArrowDown") {
            moveDown();
            writeToMsgLog("You pressed down!");
        }
        if (e.key === "ArrowLeft") {
            moveLeft();
            writeToMsgLog("You pressed left!");
        }
        if (e.key === "ArrowRight") {
            moveRight();
            writeToMsgLog("You pressed right!");
        }
    }
}

function moveUp() {
    if (character.getUpperBound) {
        updatePos(character.pos);
    }
    else {
        updatePos(upPos);
    }
}
function moveDown() {
    if (character.getLowerBound) {
        updatePos(character.pos);
    }
    else {
        updatePos(downPos);
    }
}
function moveLeft() {
    if (character.getLeftBound) {
        updatePos(character.pos);
    }
    else {
        updatePos(leftPos);
    }
}
function moveRight() {
    if (character.getRightBound) {
        updatePos(character.pos);
    }
    else {
        updatePos(rightPos);
    }
}

//This writes a message to the message log for the user to see
function writeToMsgLog(message) {
    const msgLog = document.getElementById("messageLog");
    // const msg = document.createElement("p");

    // msg.innerHTML = message;
    // msgLog.append(msg);

    msgLog.innerHTML = message;
}

//This function writes the tile numbers the user can move to from there current position
function writeToMovementOptions(moveOptions) {

    const upMove = document.getElementById("upMove");
    upMove.innerHTML = moveOptions.upMove;
    const downMove = document.getElementById("downMove");
    downMove.innerHTML = moveOptions.downMove;
    const leftMove = document.getElementById("leftMove");
    leftMove.innerHTML = moveOptions.leftMove;
    const rightMove = document.getElementById("rightMove");
    rightMove.innerHTML = moveOptions.rightMove;

}
function writeMoveStatuses(moveStatus) {

    const upMove = document.getElementById("upStatus");
    upMove.innerHTML = moveStatus.up;
    const downMove = document.getElementById("downStatus");
    downMove.innerHTML = moveStatus.down;
    const leftMove = document.getElementById("leftStatus");
    leftMove.innerHTML = moveStatus.left;
    const rightMove = document.getElementById("rightStatus");
    rightMove.innerHTML = moveStatus.right;

}

function highLightKey(e) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {

    }
    else {

        if (e.key === "ArrowUp") {
            document.getElementById("upKey").classList.add("pressed");

        }
        if (e.key === "ArrowDown") {
            document.getElementById("downKey").classList.add("pressed");
        }
        if (e.key === "ArrowLeft") {
            document.getElementById("leftKey").classList.add("pressed");
        }
        if (e.key === "ArrowRight") {
            document.getElementById("rightKey").classList.add("pressed");
        }
    }
}

function clearKey() {

    const pressedKeys = document.getElementsByClassName("pressed");

    for (pressedKey of pressedKeys) {
        pressedKey.classList.remove("pressed");

    }

}

document.getElementById("editBtn").addEventListener("click", showEditorView);


function showEditorView(){
    displayEditMenu();
    convertTilesEditable();
    hidePlayableInfo();
    swapToEditorColors();
    disableMovement();
}

function disableMovement(){
    document.removeEventListener("keydown", move);
    document.removeEventListener("keydown", highLightKey);
    document.removeEventListener("keyup", clearKey);   
}

function swapToEditorColors(){
    $(":root").css("--main-border-color", "#60F36A");
}

function swapToPlayableColors(){
    $(":root").css("--main-border-color", "#5DADE2");
}

function returnToPlayableView(){
    hideEditMenu();
    showPlayableInfo();
}

function showPlayableInfo(){
    document.getElementById("playableInfo").style.visibility = "visible";
    swapToPlayableColors();
    enableMovement();

}

function enableMovement(){
    document.addEventListener("keydown", move);
    document.addEventListener("keydown", highLightKey);
    document.addEventListener("keyup", clearKey);   
}

function hidePlayableInfo(){
    document.getElementById("playableInfo").style.visibility = "hidden";
}


function displayEditMenu(){
    document.getElementById("editMaze").style.visibility = "visible";
    document.getElementById("saveMazeBtn").addEventListener("click", returnToPlayableView);
    document.getElementById("placeStartBtn").addEventListener("click", placeStartPos);


}

function hideEditMenu(){
    document.getElementById("editMaze").style.visibility = "hidden";
    cementTiles();

}

function convertTilesEditable(){
    for(tile of tiles){
        tile.addEventListener("click", addBorder);
    }
}

function cementTiles(){
    for(tile of tiles){
        tile.removeEventListener("click", addBorder);
    }
}



function addBorder(e){

    if(Array.from(e.target.classList).includes("wall")){

    }
    else{
    e.target.classList.add("wall");
    console.log(e.target.id);
    mazeKey.push(e.target.id);
    writeMaze(e.target.id);
    updatePos(character.pos);
    }
}

function generateMaze(key){
    
    for(const tile of tiles){

        if(key.includes(tile.id)){
            tile.classList.add("wall");
 
        }
    }

}
function writeMaze(mazeTile){

            const msgLog = document.getElementById("mazeKey");
             msgLog.innerHTML += mazeTile + ", ";
    
}


function placeStartPos(){
    document.getElementById("grid").addEventListener("click", setStart)


}

function setStart(e){

    if(isBound(e)){

    }
    else{
        document.getElementsByClassName("charPos")[0].classList.remove("charPos");

    if(isBorder(e.target.id.toString())){
        e.target.classList.remove("wall");
    }

    e.target.classList.add("charPos");

    updatePos(e.target)

    document.getElementById("grid").removeEventListener("click", setStart);
}
}

function isBound(e){
    const tileClasses = Array.from(e.target.classList);
    for(const tileClass of tileClasses){
        if(["border", "border", "border", "border"].includes(tileClass)){
            return true;
        }
    }

    return false;

}

/*
Bug: after maze has been updated, you need to make sure that the character position is in a valid location afterward such that it can move still or update the bounds of character so it can't move onto newly based borders
*/


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

