console.log("hello")

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');

//----------Constants (lookup data structures - that don't change)
const square = {
    x: 180,
    y: 180,
    dx: 1,
    dy: 1,
}
//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightId = 0;
let leftId = 0;
let downId = 0;
let food;
let foodX;
let foodY;
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
        
        
        changedLeft()
        console.log(pressedKey);
    }

    if (pressedKey.keyCode === 38){
        //move up
        changedUp();
        console.log(pressedKey);
    }
    if (pressedKey.keyCode === 39){
        //move to the right
        
        changedRight();
        console.log(pressedKey);
    }

    if (pressedKey.keyCode === 40){
        //move down
        changedDown()
        console.log(pressedKey);
    }
}
    //create random objects on the gameSpace 
    //use Math.random() with regards to the canvas length and height
function createFoodSpot() {
    ctx.fillStyle='#9a031e'
    foodX = Math.floor(Math.random()*380) + 1
    foodY = Math.floor(Math.random()*380) + 1
    
}
function keepFood() {
    ctx.fillStyle='#9a031e'
    food = ctx.fillRect( foodX, foodY, 20, 20)
}

//detect collision of snake head to objects
    //if collision is with object on gameSpace, then append that object to the body
    //if collision is with body, then game over
//
function checkCollision (){
    if((square.x+20) >= foodX && (square.x+20) <= (foodX+20) && square.y > foodY && square.y < (foodY+20) || 
    (square.x+20) >= foodX && (square.x+20) <= (foodX+20) && (square.y+20)>=foodY && (square.y+20) <= (foodY+20)||
    square.x >= foodX && square.x <= (foodX+20) && square.y >= foodY && square.y <= (foodY+20)){
        createFoodSpot();
        if(square.dx < 8 && square.dy < 8){
            square.dx += 1;
            square.dy +=1;
        }
    }
}
function drawSquare(){
    ctx.fillStyle='#6FFFE9';
    ctx.fillRect(square.x, square.y, 20, 20);
}
function changedRight() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    keepFood()
    square.x += square.dx;
    checkCollision()
    if(square.x >= canvas.width){
        square.x = 0;
    }
    noAccelerationOnPress();

    rightId = window.requestAnimationFrame(changedRight);
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();    
    keepFood()
    square.y += -square.dy;
    checkCollision()
    if(square.y <= 0) {
        square.y = canvas.height;
    }
    noAccelerationOnPress();
    upId = window.requestAnimationFrame(changedUp);
    
}
function changedLeft() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();    
    keepFood()
    square.x += -square.dx;
    checkCollision()
    if(square.x <= 0) {
        square.x = canvas.width;
    }
    noAccelerationOnPress();
    leftId = window.requestAnimationFrame(changedLeft);
}
function changedDown() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    keepFood()
    square.y += square.dy;
    checkCollision()
    if(square.y >= canvas.height) {
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
function gameStart(){ //this is the game loop
    drawSquare()
    createFoodSpot()    
}
gameStart()

