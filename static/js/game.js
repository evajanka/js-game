function Snake(x, y, dir, color) {
    this.x = x;
    this.y = y;
    this.body = [[x, y]];
    this.dir = dir;
    this.color = color;
}
var snake1 = new Snake(15, 1, "right", "blue");
var snake2 = new Snake(15, 30, "left", "green");

function draw(snake) {
    for (let i = 0; i < snake.body.length; i++) {
        let pos = "x" + snake.body[i][0] + "y" + snake.body[i][1];
        document.getElementById(pos).style.backgroundColor = snake.color
    }
}
function collisionWall(snake) {
    if (snake.x > 30 || snake.x < 0 || snake.y > 30 || snake.y < 0){
        window.alert(snake.color + " need glasses ;)")
    }
}

function collisionSnake() {
    if (snake1.body[0] === snake2.body[0]) window.alert("TIE");
    for (elem of snake1.body){
        if (elem[0] === snake1.x && elem[1] === snake1.y) window.alert("Snake1 ate himself and dieded very badly")
    }
    for (elem of snake2.body){
        if (elem[0] === snake2.x && elem[1] === snake2.y) window.alert("Snake2 ate himself and dieded very badly")
    }
    for (elem of snake1.body){
        if (elem[0] === snake2.x && elem[1] === snake2.y) window.alert("Snake2 killed snake1")
    }
    for (elem of snake2.body){
        if (elem[0] === snake1.x && elem[1] === snake1.y) window.alert("Snake2 killed snake1")
    }

}
function move(snake) {
    if (snake.dir === "up") snake.y += -1;
    if (snake.dir === "down") snake.y += 1;
    if (snake.dir === "right") snake.x += 1;
    if (snake.dir === "left") snake.x += -1;
    snake.body.unshift([snake.x, snake.y]);
    snake.body.pop();
}

document.addEventListener("keydown", checkkeys);

function checkkeys() {
    if (event.keyCode === 87 && snake1.dir !== "down") snake1.dir = "up";
    if (event.keyCode === 65 && snake1.dir !== "right") snake1.dir = "left";
    if (event.keyCode === 83 && snake1.dir !== "up") snake1.dir = "down";
    if (event.keyCode === 68 && snake1.dir !== "left") snake1.dir = "right";

    if (event.keyCode === 38 && snake2.dir !== "down") snake2.dir = "up";
    if (event.keyCode === 37 && snake2.dir !== "right") snake2.dir = "left";
    if (event.keyCode === 40 && snake2.dir !== "up") snake2.dir = "down";
    if (event.keyCode === 39 && snake2.dir !== "left") snake2.dir = "right";
}

function clear() {
    cells = document.getElementsByTagName("TD");
    for (cell of cells) {
        cell.style.backgroundColor = "white";
    }
}

function game() {
    setInterval(function () {
        clear();
        move(snake1);
        move(snake2);
        collisionWall(snake1);
        collisionWall(snake2);
        collisionSnake();
        draw(snake1);
        draw(snake2);

    }, 500);
}

game();