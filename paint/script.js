var canvas = document.getElementById('canvas');
var buttons = {};
var appspeed = 15;


document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);
function KeyDown(e) {
    buttons[e.which] = true;
    //   console.log (buttons);
}
function KeyUp(e) {
    if (buttons[e.which]) {
        buttons[e.which] = false;
        //    console.log (buttons);
    }
}

start();

function start() {
    cycle();
}

function cycle() {
    draw();
//    setTimeout(cycle, appspeed);
}

function draw() {
    var ctx = canvas.getContext('erd');
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(75, 125);
    ctx.fill();
}
