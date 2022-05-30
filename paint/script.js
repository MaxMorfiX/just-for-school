var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var brush = $('#brush');
var buttons = {};
var drawspeed = 100;
var startPosX = 50;
var startPosY = 50;
var oneLineLenght = 100;
var type = 'square';
var sygzagLenght = 4;

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
}

function changetype() {
    if(type === 'square') {
        type = 'sygzag';
        $('#sygzagLenght').show();
        $('#type').val('SYGZAG');
    } else if(type === 'sygzag') {
        type = 'square';
        $('#sygzagLenght').hide();
        $('#type').val('SQUARE');
    }
}

function draw() {
    ctx.beginPath();
    brush.offset({left: startPosX, top: startPosY});
    ctx.moveTo(startPosX, startPosY);
    if(type === 'square') {
        setTimeout(startD, drawspeed);
        function startD() {
            setTimeout(leftD,drawspeed);
        }
        function leftD() {
            brush.offset({left: startPosX, top: startPosY + oneLineLenght});
            ctx.lineTo(startPosX, startPosY + oneLineLenght);
            setTimeout(bottomD, drawspeed);
            ctx.stroke();
        }
        function bottomD() {
            brush.offset({left: startPosX + oneLineLenght, top: startPosY + oneLineLenght});
            ctx.lineTo(startPosX + oneLineLenght, startPosY + oneLineLenght);
            setTimeout(rightD, drawspeed);
            ctx.stroke();
        }
        function rightD() {
            brush.offset({left: startPosX + oneLineLenght, top: startPosY});
            ctx.lineTo(startPosX + oneLineLenght, startPosY);
            setTimeout(endD, drawspeed);
            ctx.stroke();
        }
        function endD() {
            brush.offset({left: startPosX, top: startPosY});
            ctx.lineTo(startPosX, startPosY);
            ctx.stroke();
        }
    } else if (type === 'sygzag') {
        
        var i = 1;
        var x = startPosX;
        var y = startPosY;
        
        setTimeout(left, drawspeed);
            
        function left() {
            brush.offset({left: x, top: y + oneLineLenght});
            ctx.lineTo(x, y + oneLineLenght);
            ctx.stroke();
            setTimeout(bottom, drawspeed);
        }

        function bottom() {
            brush.offset({left: x + oneLineLenght, top: y + oneLineLenght});
            ctx.lineTo(x + oneLineLenght, y + oneLineLenght);
            ctx.stroke();
            setTimeout(right, drawspeed);
        }

        function right() {
            brush.offset({left: x + oneLineLenght, top: y});
            ctx.lineTo(x + oneLineLenght, y);
            ctx.stroke();
            setTimeout(top, drawspeed);
        }

        function top() {
            brush.offset({left: x + oneLineLenght*2, top: y});
            ctx.lineTo(x + oneLineLenght*2, y);
            ctx.stroke();
            if(i < sygzagLenght) {
                x = x + oneLineLenght*2;
                setTimeout(left, drawspeed);
                i++;
            }
        }
            
    }
}