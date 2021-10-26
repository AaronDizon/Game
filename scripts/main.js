console.log("hello")

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');

//----------Constants (lookup data structures - that don't change)
const square = {
    x: 200,
    y: 200,
    dx: 0,
    dy: 0,
}




//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightID = 0;

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
    square.dx = 1;
    square.dy = 0;
    square.x += square.dx;
    square.y += square.dy;
    if(square.x === canvas.width){
        square.x = 0;
    }
    if(upId !== 0){
    cancelAnimationFrame(upId)
    }
    rightId = window.requestAnimationFrame(changedRight);
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSquare();
    square.dx = 0; 
    square.dy= 1;
    square.x += square.dx 
    square.y += -square.dy;
    if(square.y === 0){
        square.y = canvas.height;
    }
    if(rightId !== 0){
        cancelAnimationFrame(rightId)
        }
    upId = window.requestAnimationFrame(changedUp);
    
}
drawSquare()

//----------initialize all state, then call render (means to display or visualize data
function gameLoop(){ //this is the game loop
 drawSquare

}

