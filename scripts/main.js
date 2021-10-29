

//----------iModel
//----------Glue (connection to the View - DOM)

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');
const start = document.querySelector('#start')
const scoreText = document.querySelector('#scoreText')
const scoreNum = document.querySelector('#scoreNum')
//----------Constants (lookup data structures - that don't change)
const head = {
    x: 0,
    y: 0,
    dx: 3,
    dy: 3,
}

let lizard =[];

const food = {
    x: Math.floor(Math.random()*380) + 1,
    y: Math.floor(Math.random()*380) + 1,
}

console.log(lizard);
//----------State Variables (state is the data that changes as program runs)
let upId = 0;
let rightId = 0;
let leftId = 0;
let downId = 0;
let gameIsLive = false;
let gameScore = 0;
let foodX;
let foodY;

//make a class with the 

//----------View
//----------Cache (to remember) DOM Elements (if they are "touched" more than once)
scoreNum.innerHTML = gameScore;

//----------Event Listeners 
//keydown 
start.addEventListener('click', gameStart)


//----------CONTROLLER  (Functions)
//----------initialize all state, then call render (means to display or visualize data
function gameStart(){ //this is the game loop
    ctx.clearRect(0,0, canvas.width, canvas.height);
    gameIsLive = true;
    head.x = 0;
    head.y = 0;
    head.dx = 3;
    head.dy = 3;

    lizard = []
    gameScore = 0;
    scoreNum.innerHTML = gameScore;
    //console.log(gameIsLive)
    
    if (gameIsLive === true){
        //console.log(`if true`)
        document.body.addEventListener('keydown', changeDirection);
        start.removeEventListener('click', gameStart)
        drawlizard()
       

    }
    if (gameIsLive === false){
        
    }
}
function drawlizard(){
    ctx.fillStyle='#6FFFE9';
    ctx.fillRect(head.x, head.y, 20, 20)
    ctx.fillStyle='white';

    for (i = 0; i < lizard.length; i++){
        ctx.fillRect(lizard[i].x, lizard[i].y, 20, 20);
    }
}

function growBodyFromLeft(){
    const bodyPart = {
        x: head.x-21, 
        y: head.y,
  
    }
    lizard.push(bodyPart)
    //console.log(lizard)
 }
function growBodyFromRight(){
    const bodyPart = {
        x: head.x+21, 
        y: head.y, 
 
    }
    lizard.push(bodyPart)
    //console.log(lizard)
 }
function growBodyFromBelow(){
    const bodyPart = {
        x: head.x, 
        y: head.y+21, 
    }
    lizard.push(bodyPart)
    //console.log(lizard)
 }
function growBodyFromAbove(){
    const bodyPart = {
        x: head.x, 
        y: head.y-21, 
    }
    lizard.push(bodyPart)
    //console.log(lizard)
 }
//control movement 
//once key is pressed, looks for which key is pressed and then change direction accordingly 
function changeDirection(pressedKey) {
    if (pressedKey.keyCode === 37){
        //move to the left
        changedLeft()
    }
    if (pressedKey.keyCode === 38){
        //move up
        changedUp();
    }
    if (pressedKey.keyCode === 39){
        //move to the right   
        changedRight();
    }
    if (pressedKey.keyCode === 40){
        //move down
        changedDown()
    }
}
//create random objects on the gameSpace 
//use Math.random() with regards to the canvas length and height
function createFoodSpot() {
    ctx.fillStyle='#9a031e'
    food.x = Math.floor(Math.random()*380) + 1
    food.y= Math.floor(Math.random()*380) + 1
    
}
function keepFood() {
    ctx.fillStyle='#9a031e'
    ctx.fillRect( food.x, food.y, 20, 20)
}

//detect collision of lizard head to objects
    //if collision is with object on gameSpace, then append that object to the body
    //if collision is with body, then game over

function checkGeneralCollision(head1, head2) {
    if((head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20) || 
    (head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && (head.y+20)>=head2.y && (head1.y+20) <= (head2.y+20) ||
    head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20)||
    head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y <= head2.y && (head1.y+20) >= (head2.y)
    ){
        return true;
    }
}

// function accelerate() {
 
//      if(head.dx < 8 && head.dy < 8){
//          head.dx += 1;
//          head.dy +=1;
//      }
// }
function changedRight() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawlizard();
    keepFood();
    head.x += head.dx;
    if (gameScore === 5){
        head.dx = 4;
        head.dy = 4; 
    }
    if (gameScore === 10){
        head.dx = 5;
        head.dy = 5; 
    }
    
    for (let i = 0; i < lizard.length; i++){
        if (checkGeneralCollision(head, lizard[i]) === true){
            gameIsLive = false;
            console.log(gameIsLive);
        }
    }
    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromLeft()
        gameScore += 1;
        scoreNum.innerHTML = gameScore;
    }
    if((head.x+20) >= canvas.width){
        head.x = 0;
    }
    noAcceleration();

    rightId = window.requestAnimationFrame(changedRight);

    if(gameIsLive === false) {
        cancelAnimationFrame(rightId)
        alert(`game over`);
        document.body.removeEventListener('keydown', changeDirection )
        start.addEventListener('click', gameStart)
    }
}
function changedUp() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawlizard();    
    keepFood();
    head.y += -head.dy;
    if (gameScore === 5){
        head.dx = 4;
        head.dy = 4; 
    }
    if (gameScore === 10){
        head.dx = 5;
        head.dy = 5; 
    }
    for (let i = 0; i < lizard.length; i++){
        if (checkGeneralCollision(head, lizard[i]) === true){
            gameIsLive = false;
            console.log(gameIsLive);
        }
    }
    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromBelow()
        gameScore += 1;
        scoreNum.innerHTML = gameScore;
    }   
    if(head.y <= 0) {
        head.y = canvas.height-20;
    }
    noAcceleration();

    upId = window.requestAnimationFrame(changedUp);

    if(gameIsLive === false) {
        cancelAnimationFrame(upId)
        alert(`game over`);
        document.body.removeEventListener('keydown', changeDirection )
        start.addEventListener('click', gameStart)
    }
    
}
function changedLeft() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawlizard();    
    keepFood();
    head.x += -head.dx;
    if (gameScore === 5){
        head.dx = 4;
        head.dy = 4; 
    }
    if (gameScore === 10){
        head.dx = 5;
        head.dy = 5; 
    }
    for (let i = 0; i < lizard.length; i++){
        if (checkGeneralCollision(head, lizard[i]) === true){
            gameIsLive = false;
            console.log(gameIsLive);
        }
    }
    
    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromRight()
        gameScore += 1;
        scoreNum.innerHTML = gameScore;
    }    
    if(head.x <= 0) {
        head.x = canvas.width-20;
    }
    noAcceleration();

    leftId = window.requestAnimationFrame(changedLeft);

    if(gameIsLive === false) {
        cancelAnimationFrame(leftId)
        alert(`game over`);
        document.body.removeEventListener('keydown', changeDirection )
        start.addEventListener('click', gameStart)
    }
}
function changedDown() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawlizard();
    keepFood();
    head.y += head.dy;
    if (gameScore === 5){
        head.dx = 4;
        head.dy = 4; 
    }
    if (gameScore === 10){
        head.dx = 5;
        head.dy = 5; 
    }
    for (let i = 0; i < lizard.length; i++){
        if (checkGeneralCollision(head, lizard[i]) === true){
            gameIsLive = false;
            console.log(gameIsLive);
        }
    }
    if (checkGeneralCollision(head, food) === true){
        createFoodSpot()
        growBodyFromAbove()
        gameScore += 1;
        scoreNum.innerHTML = gameScore;
        
    }
    if((head.y+20) >= canvas.height) {
        head.y = 0;
    }
    noAcceleration();

    downId = window.requestAnimationFrame(changedDown);

    if(gameIsLive === false) {
        cancelAnimationFrame(downId)
        alert(`game over`);
        document.body.removeEventListener('keydown', changeDirection )
        start.addEventListener('click', gameStart)
    }
}

function noAcceleration() {
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





