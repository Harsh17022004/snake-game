// Initializing the variables amd constants

let direction = {x:0 , y:0};
 
const food = new Audio('../music/food.mp3');
const gameover = new Audio('../music/gameover.mp3');
const move = new Audio('../music/move.mp3');
const music = new Audio('../music/music.mp3');

let speed = 10;
let lastPaintTime = 0;
let score = 0;

let SnakeArr = [
    {x:13 ,y:15}
]

let Food = {x:2 ,y:5};

// Game Fuctions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    music.play()
}

function isCollide(Snake){
    // If Snake bump to yourself
    for (let i = 1; i < SnakeArr.length; i++) {
        if (Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y) {
            return true;
        }
        
    }
    if (Snake[0].x >=18 || Snake[0].x < 0 ||  Snake[0].y >=18 || Snake[0].y < 0) {
        return true;
    }
}

function gameEngine(){
    // Part 1: Update Snake Array and Food

    if (isCollide(SnakeArr)) {
        gameover.play()
        music.pause()
        direction = {x:0 , y:0};
        alert('GameOver , Press Any Key To Restart')
        SnakeArr = [{x:13 ,y:15}]
        music.play()
        score = 0;
    }


    // If your eat the food , increament the food and regenrate the food
    if(SnakeArr[0].y === Food.y && SnakeArr[0].x === Food.x){
        score +=1;
        if (score>hiscoreVal) {
            hiscoreVal = score;
            localStorage.setItem("hiscore ", JSON.stringify(hiscoreVal))
            HiScore.innerHTML = "Hi Score " + hiscoreVal;
        }
        scoreBoard.innerHTML = "Score : " + score;
        food.play()
        SnakeArr.unshift({x: SnakeArr[0].x + direction.x , y: SnakeArr[0].y + direction.y})
        let a = 2;
        let b = 16;
        Food = {x:Math.round(a + (b-a) * Math.random()) , y:Math.round(a + (b-a) * Math.random()) }
    }


    //Moving the snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i+1] = {...SnakeArr[i]};
    }
    SnakeArr[0].x += direction.x;
    SnakeArr[0].y += direction.y;

    // Part 2 : Display Snake and Food
    // Display Snake
    board.innerHTML = '';
    SnakeArr.forEach((e , index)=>{
        SnakeElement = document.createElement('div');
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
       
        if (index==0) {
            SnakeElement.classList.add('head')   
        }
        else{
            SnakeElement.classList.add('snake')
        }
        board.appendChild(SnakeElement);
    })

    // Display food
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = Food.y;
    FoodElement.style.gridColumnStart = Food.x;
    FoodElement.classList.add('food')
    board.appendChild(FoodElement);
}











// Main Logic Starts here

let hiscore = localStorage.getItem("hiscore")
if (hiscore == null) {
    hiscoreVal = 0;
    localStorage.setItem("hiscore ", JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal = JSON.parse(hiscore)
    HiScore.innerHTML = "Hi Score " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction = {x:0 , y:1} // Start Game
    move.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x=0;
            direction.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x=0;
            direction.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x=-1;
            direction.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x=1;
            direction.y=0;
            break;
    
        default:
            break;
    }
})