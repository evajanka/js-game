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



function randomize_fruit() {
    let score = document.createElement("img");
    score.src = 'static/apple.jpeg'
    score.setAttribute("width", "20");
    score.setAttribute("height", "20");
    let fruit_to_put =  document.getElementById("table").rows[i].cells;
    fruit_to_put[i].appendChild(score);

}


window.addEventListener('load', () => { let i = Math.floor(Math.random() * 31);
    let score = document.createElement("img");
    score.src = 'static/apple.jpeg'
    score.setAttribute("width", "20");
    score.setAttribute("height", "20");
    let fruit_to_put =  document.getElementById("table").rows[i].cells;
    fruit_to_put[i].appendChild(score);});

//game();