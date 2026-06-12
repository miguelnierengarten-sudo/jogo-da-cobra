const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const difficulty = document.getElementById("difficulty");

const box = 20;

let snake;
let direction;
let food;
let score;
let game;

// Controles
document.addEventListener("keydown", (event) => {

    if(event.key === "ArrowUp" && direction !== "DOWN"){
        direction = "UP";
    }

    if(event.key === "ArrowDown" && direction !== "UP"){
        direction = "DOWN";
    }

    if(event.key === "ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT";
    }

    if(event.key === "ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT";
    }

});

// Verifica colisão com o próprio corpo
function collision(head, body){

    for(let i = 0; i < body.length; i++){

        if(
            head.x === body[i].x &&
            head.y === body[i].y
        ){
            return true;
        }

    }

    return false;
}

// Desenha o jogo
function draw(){

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Cobra
    snake.forEach((part, index) => {

        ctx.fillStyle =
            index === 0 ? "#22c55e" : "#7CFC00";

        ctx.fillRect(
            part.x,
            part.y,
            box,
            box
        );

    });

    let x = snake[0].x;
    let y = snake[0].y;

    if(direction === "UP") y -= box;
    if(direction === "DOWN") y += box;
    if(direction === "LEFT") x -= box;
    if(direction === "RIGHT") x += box;

    // Comeu a comida
    if(x === food.x && y === food.y){

        score++;
        scoreText.textContent = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {

        snake.pop();

    }

    const head = {
        x: x,
        y: y
    };

    // Game Over
    if(
        x < 0 ||
        y < 0 ||
        x >= canvas.width ||
        y >= canvas.height ||
        collision(head, snake)
    ){

        clearInterval(game);

        alert(
            "🐍 Game Over!\n\nPontuação: " + score
        );

        return;
    }

    snake.unshift(head);
}

// Inicia o jogo
function startGame(){

    clearInterval(game);

    snake = [
        {
            x: 200,
            y: 200
        }
    ];

    direction = "RIGHT";

    score = 0;
    scoreText.textContent = score;

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    const speed = Number(difficulty.value);

    game = setInterval(draw, speed);
}

// Botão iniciar
startBtn.addEventListener("click", startGame);
