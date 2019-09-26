var fruit = new Create_Fruit();
var alert;
var snake1 = new Snake(0, 1, "right", "blue", 0);


if (document.cookie === "gamemode=two") var snake2 = new Snake(31, 30, "left", "green", 0);

console.log(document.cookie);
function draw(snake) {
    for (let i = 0; i < snake.body.length; i++) {
        let pos = "x" + snake.body[i][0] + "y" + snake.body[i][1];
        document.getElementById(pos).style.backgroundColor = snake.color
    }
}

function Snake(x, y, dir, color,score) {
    this.x = x;
    this.y = y;
    this.body = [[x, y]];
    this.dir = dir;
    this.color = color;
    this.score = score;
}


function collisionWall() {
    if (document.cookie === "gamemode=one") {
        if (snake1.x > 30 || snake1.x < 0 || snake1.y > 30 || snake1.y < 0) {
            alert = "Blue hit the wall";
            return true
        }
    } else {
        if ((snake1.x > 30 || snake1.x < 0 || snake1.y > 30 || snake1.y < 0) && (snake2.x > 30 || snake2.x < 0 || snake2.y > 30 || snake2.y < 0)) {
            alert = "TIE";
            return true
        }
        if (snake1.x > 30 || snake1.x < 0 || snake1.y > 30 || snake1.y < 0) {
            alert = "Blue hit the wall";
            return true
        }
        if (snake2.x > 30 || snake2.x < 0 || snake2.y > 30 || snake2.y < 0) {
            alert = "Green hit the wall";
            return true
        }
    }
}

function collisionSnake() {

    if (document.cookie === "gamemode=one") {

        for (let i = 1; i < snake1.body.length; i++) {
            if (snake1.body[i][0] === snake1.x && snake1.body[i][1] === snake1.y && snake1.body.length > 3) {
                alert = "Blue ate himself ";
                return true
            }
        }
    } else {
        if (snake1.x === snake2.x && snake1.y === snake2.y) {
            alert = "Tie";
            return true
        }
        for (let i = 1; i < snake1.body.length; i++) {
            if (snake1.body[i][0] === snake1.x && snake1.body[i][1] === snake1.y && snake1.body.length > 3) {
                alert = "Blue ate himself ";
                return true
            }
        }
        for (let i = 1; i < snake2.body.length; i++) {
            if (snake2.body[i][0] === snake2.x && snake2.body[i][0] === snake2.y && snake2.body.length > 3) {
                alert = "Green ate himself";
                return true
            }
        }
        for (elem of snake1.body) {
            if (elem[0] === snake2.x && elem[1] === snake2.y) {
                alert = "Green killed Blue";
                return true
            }
        }
        for (elem of snake2.body) {
            if (elem[0] === snake1.x && elem[1] === snake1.y) {
                alert = "Blue killed Green";
                return true
            }
        }

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


function Create_Fruit() {
    this.x = Math.floor(Math.random() * 31);
    this.y = Math.floor(Math.random() * 31);
    this.img = document.createElement("img");
    this.img.src = "static/images/apple.png";
    this.img.setAttribute("width", "23");
    this.img.setAttribute("height", "23");

}


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function randomize_fruit() {
    let fruit_to_put = document.getElementById("x" + fruit.x + "y" + fruit.y);
    fruit_to_put.style.padding = 0;
    fruit_to_put.appendChild(fruit.img);
}


function eat_fruit(snake) {
    if (snake.x === fruit.x && snake.y === fruit.y) {
        snake.body.push(snake.body[-1]);
        snake.score += 1;
        document.getElementById('player1').innerHTML = snake1.score;
        document.getElementById('player2').innerHTML = snake2.score;
        let cell_empty = document.getElementById("x" + fruit.x + "y" + fruit.y);
        cell_empty.style.padding = 10;
        cell_empty.innerHTML = "";
        fruit.x = random(1, 31);
        fruit.y = random(1, 31);
        randomize_fruit()
    }
}

function redirect() {
    window.location.href = "http://127.0.0.1:5000/"
}


function countdown() {
    var timeleft = 4;
    var downloadTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeleft - 1;
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "GO!";
            setTimeout(f = () => {
                document.getElementById("countdown").parentNode.removeChild(document.getElementById("countdown"))
            }, 666)


        }
    }, 1000);
}


function game_1player() {
    document.getElementById("board").removeAttribute("hidden");
    randomize_fruit(fruit);
    let interval = setInterval(function () {
        clear();
        move(snake1);
        if (collisionSnake() || collisionWall()) {
            clearInterval(interval);
            let alertbox = document.getElementById("alertbox");
            alertbox.removeAttribute("hidden");
            alertbox.innerText = alert;
            setTimeout(redirect, 3666);
        }
        draw(snake1);
        eat_fruit(snake1);

    }, 250);

}

function game_2players() {
    document.getElementById("board").removeAttribute("hidden");
    randomize_fruit(fruit);
    let interval = setInterval(function () {
        clear();
        move(snake1);
        move(snake2);
        if (collisionSnake() || collisionWall()) {
            clearInterval(interval);
            let alertbox = document.getElementById("alertbox");
            alertbox.removeAttribute("hidden");
            alertbox.innerText = alert;
            setTimeout(redirect, 3666);
        }
        draw(snake1);
        draw(snake2);

        eat_fruit(snake1);
        eat_fruit(snake2)

    }, 250);

}

function main() {
    console.log(document.cookie);

    if (document.cookie === "gamemode=one") {
        game_1player();
    } else if (document.cookie === "gamemode=two") game_2players();

}

countdown();
setTimeout(main, 4666);

