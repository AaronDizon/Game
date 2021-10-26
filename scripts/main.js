console.log("hello")

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');

//----------Constants (lookup data structures - that don't change)
const square = {
    x: 200,
    y: 200,
    dx: 1,
    dy: 1,
}




//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightId = 0;
let leftId = 1;
let downId = 1;

//make a class with the 

//----------View
//----------Cache (to remember) DOM Elements (if they are "touched" more than once)


//----------Event Listeners 
//keydown 
document.body.addEventListener('keydown', changeDirection);


//----------CONTROLLER  (Functions)
//control movement 
    //once key is pressed, looks for which key is pressed and then change direction accordingly 
function changeDirection(pressedKey) {
    if (pressedKey.keyCode === 37){
        //move to the left
        if(requestAnimationFrame(changedLeft)){
            return;
        }
        changedLeft()
    }

    if (pressedKey.keyCode === 38){
        //move up
        changedUp();
        console.log(pressedKey);
    }
    if (pressedKey.keyCode === 39){
        //move to the right
        changedRight();
        console.log(pressedKey)
    }

    if (pressedKey.keyCode === 40){
        //move down
        changedDown()
    }
}
    //create random objects on the gameSpace 
    //use Math.random() with regards to the canvas length and height
//detect collision of snake head to objects
    //if collision is with object on gameSpace, then append that object to the body
    //if collision is with body, then game over
//
function drawSquare(){
    ctx.fillStyle='#6FFFE9';
    ctx.fillRect(square.x, square.y, 20, 20);
}
function changedRight() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    
    square.x += square.dx;
    
    if(square.x === canvas.width){
        square.x = 0;
    }
    noAccelerationOnPress();

    rightId = window.requestAnimationFrame(changedRight);
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    
    
    square.y += -square.dy;

    if(square.y === 0) {
        square.y = canvas.height;
    }

    noAccelerationOnPress();

    upId = window.requestAnimationFrame(changedUp);
    
}
function changedLeft() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    
    square.x += -square.dx ;

    if(square.x === 0) {
        square.x = canvas.width;
    }

    noAccelerationOnPress();

    leftId = window.requestAnimationFrame(changedLeft);
    
}
function changedDown() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    
    
    square.y += square.dy;

    if(square.y === canvas.height) {
        square.y = 0;
    }
   
    noAccelerationOnPress();

    downId = window.requestAnimationFrame(changedDown);
    
}
function noAccelerationOnPress() {
    if(leftId !== 0){
        cancelAnimationFrame(leftId)
    }
    if(upId !== 0){
        cancelAnimationFrame(upId)
    }
    if(rightId !== 0){
        cancelAnimationFrame(rightId)
    }
    if(downId !== 0){
        cancelAnimationFrame(downId)
    }
}

//----------initialize all state, then call render (means to display or visualize data
function gameLoop(){ //this is the game loop
 drawSquare()

}
gameLoop()

