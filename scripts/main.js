console.log("hello")

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');

//----------Constants (lookup data structures - that don't change)
const square = {
    x: 0,
    y: 0,
    dx: 1,
    dy: 1,
}

const food = {
    x: -1,
    y: -1,
}

// let snake =[];
// snake.append(square);
//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightId = 0;
let leftId = 0;
let downId = 0;


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
    food.x = Math.floor(Math.random()*380) + 1
    food.y = Math.floor(Math.random()*380) + 1
    
}
function keepFood() {
    ctx.fillStyle='#9a031e'
    ctx.fillRect( food.x, food.y, 20, 20)
}

//detect collision of snake head to objects
    //if collision is with object on gameSpace, then append that object to the body
    //if collision is with body, then game over
//
function checkCollision (){
    if((square.x+20) >= food.x && (square.x+20) <= (food.x+20) && square.y > food.y && square.y < (food.y+20) || 
    (square.x+20) >= food.x && (square.x+20) <= (food.x+20) && (square.y+20)>=food.y && (square.y+20) <= (food.y+20)||
    square.x >= food.x && square.x <= (food.x+20) && square.y >= food.y && square.y <= (food.y+20)){
        
        
    }
}
function accelerate() {
    createFoodSpot();
    if(square.dx < 8 && square.dy < 8){
        square.dx += 1;
        square.dy +=1;
    }
}
function checkGeneralCollision(square1, square2) {
    if((square1.x+20) >= square2.x && (square1.x+20) <= (square2.x+20) && square1.y > square2.y && square1.y < (square2.y+20) || 
    (square1.x+20) >= square2.x && (square1.x+20) <= (square2.x+20) && (square.y+20)>=square2.y && (square.y+20) <= (square2.y+20)||
    square1.x >= square2.x && square1.x <= (square2.x+20) && square1.y >= square2.y && square1.y <= (square2.y+20)){
        return true;
    }
}
function drawSquare(){
    ctx.fillStyle='#6FFFE9';
    ctx.fillRect(square.x, square.y, 20, 20);
}
function changedRight() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    keepFood();
    square.x += square.dx;
    if (checkGeneralCollision(square, food) === true){
        accelerate()
    }
    if((square.x+20) >= canvas.width){
        square.x = 0;
    }
    noAccelerationOnPress();

    rightId = window.requestAnimationFrame(changedRight);
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();    
    keepFood();
    square.y += -square.dy;
    if (checkGeneralCollision(square, food) === true){
        accelerate()
    }   
    if(square.y <= 0) {
        square.y = canvas.height-20;
    }
    noAccelerationOnPress();
    upId = window.requestAnimationFrame(changedUp);
    
}
function changedLeft() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();    
    keepFood();
    square.x += -square.dx;
    if (checkGeneralCollision(square, food) === true){
        accelerate()
    }    
    if(square.x <= 0) {
        square.x = canvas.width-20;
    }
    noAccelerationOnPress();
    leftId = window.requestAnimationFrame(changedLeft);
}
function changedDown() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    keepFood();
    square.y += square.dy;
    if (checkGeneralCollision(square, food) === true){
        accelerate()
    }
    if((square.y+20) >= canvas.height) {
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

