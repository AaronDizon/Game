console.log("hello")

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');

//----------Constants (lookup data structures - that don't change)
const head = {
    x: 40,
    y: 0,
    dx: 2.5,
    dy: 2.5,
}
const pretail = {
    x: 20,
    y: 0,

}
const tail = {
    x: 0,
    y: 0,

}
const food = {
    x: -1,
    y: -1,
}

class Square {
    construction(x, y,){
        this.x = x;
        this.y = y;

    }
}


let snake =[];
snake.push(pretail)
snake.push(tail)


console.log(snake);
//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightId = 0;
let leftId = 0;
let downId = 0;
let bodyCount = 2;


//make a class with the 

//----------View
//----------Cache (to remember) DOM Elements (if they are "touched" more than once)


//----------Event Listeners 
//keydown 



//----------CONTROLLER  (Functions)
function drawsnake(){
    ctx.fillStyle='#6FFFE9';
    ctx.fillRect(head.x, head.y, 20, 20)
    ctx.fillStyle='white';

    for (i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
    }
}
// function moveBody() {
//     const bodyPart = {
//         x: head.x-20, 
//         y: head.y, 
//         dx: head.dx, 
//         dy: head.dy,
//     }
//     snake.push(bodyPart)
//     if(snake.length > bodyCount) {
//         snake.shift()
//     }
// }
function growBodyFromLeft(){
    const bodyPart = {
        x: head.x-20, 
        y: head.y, 
  
    }
    snake.push(bodyPart)
    console.log(snake)
 }
function growBodyFromRight(){
    const bodyPart = {
        x: head.x+20, 
        y: head.y, 
 
    }
    snake.push(bodyPart)
    console.log(snake)
 }
function growBodyFromBelow(){
    const bodyPart = {
        x: head.x, 
        y: head.y+20, 

    }
    snake.push(bodyPart)
    console.log(snake)
 }
function growBodyFromAbove(){
    const bodyPart = {
        x: head.x, 
        y: head.y-20, 
  
    }
    snake.push(bodyPart)
    console.log(snake)
 }
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
        console.log(head);
        console.log(snake);
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
// function checkCollision (){
//     if((head.x+20) >= food.x && (head.x+20) <= (food.x+20) && head.y > food.y && head.y < (food.y+20) || 
//     (head.x+20) >= food.x && (head.x+20) <= (food.x+20) && (head.y+20)>=food.y && (head.y+20) <= (food.y+20)||
//     head.x >= food.x && head.x <= (food.x+20) && head.y >= food.y && head.y <= (food.y+20)){
        
        
function checkGeneralCollision(head1, head2) {
    if((head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && head1.y > head2.y && head1.y < (head2.y+20) || 
    (head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && (head.y+20)>=head2.y && (head.y+20) <= (head2.y+20)||
    head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20)){
        return true;
    }
}
function accelerate() {
 
     if(head.dx < 8 && head.dy < 8){
         head.dx += 1;
         head.dy +=1;
     }
}
function changedRight() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawsnake();
    keepFood();
    head.x += head.dx;

    
    // for (let i = 1; i < snake.length; i++){
    //     snake[i].y = snake[i-1].y;
    //     snake[i].x = snake[i-1].x;
    // }
    
    // snake[0].x = (head.x-20)
    // snake[0].y = (head.y)
    
   

    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromLeft()
        //accelerate()
    }
    if((head.x+20) >= canvas.width){
        head.x = 0;
    }
    noAccelerationOnPress();

    rightId = window.requestAnimationFrame(changedRight);
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawsnake();    
    keepFood();
    head.y += -head.dy;
    // for (let i = 1; i < snake.length; i++){
    //     if (i )
    //     snake[i].y = snake[i-1].y;
    //     snake[i].x = snake[i-1].x;
    // }
    
    // snake[0].x = (head.x)
    // snake[0].y = (head.y+20)
    

    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromBelow()
        //accelerate()
    }   
    if(head.y <= 0) {
        head.y = canvas.height-20;
    }
    noAccelerationOnPress();
    upId = window.requestAnimationFrame(changedUp);
    
}
function changedLeft() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawsnake();    
    keepFood();
    head.x += -head.dx;
    // for (let i = 1; i < snake.length; i++){
    //     if (i )
    //     snake[i].y = snake[i-1].y;
    //     snake[i].x = snake[i-1].x;
    // }
    
    // snake[0].x = (head.x+20)
    // snake[0].y = (head.y)
    
    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromRight()
        
        //accelerate()
    }    
    if(head.x <= 0) {
        head.x = canvas.width-20;
    }
    noAccelerationOnPress();
    leftId = window.requestAnimationFrame(changedLeft);
}
function changedDown() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawsnake();
    keepFood();
    
    head.y += head.dy;
    // for (let i = 1; i < snake.length; i++){
    //     if (i )
    //     snake[i].y = snake[i-1].y;
    //     snake[i].x = snake[i-1].x;
    // }
    
    // snake[0].x = (head.x)
    // snake[0].y = (head.y-20)
   

    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromAbove()
        //accelerate()
    }
    if((head.y+20) >= canvas.height) {
        head.y = 0;
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
    document.body.addEventListener('keydown', changeDirection);
    drawsnake()
    createFoodSpot()    
    console.log(snake)

}
gameStart()

// for (let i = 0; i < snake.length; i++){
//     if (checkGeneralCollision(head, snake[i]) === true){
//         alert(`gameover`)
//     }
// }