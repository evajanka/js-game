var x = 1;
var y = 1;

function game() {
    setInterval(move, 1000)
}

function move() {

    x += 1;
    pos = "x" + x + "y" + y;
    document.getElementById(pos).style.backgroundColor = "red";
}

game();