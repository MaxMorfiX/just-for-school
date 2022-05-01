const SEP = '_';
var field = $('#field');
var player = $('#player');
var gamespeed = 15;
var playerSpeed = 7;
var playerSize = 50;
var coinSize = 50;
var mapSize = 2000;
var playerH = {};
var device;
var coinCount = 50;
var buttons = {};
var mult = Math.PI/180;
var playerScore = 0;
var oneCoinPower = 1;
var coinsPositions = {}

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);

startGame();

function startGame() {
    fitToSize();
    createMap();
    addPlayerHitbox();
    
    player.data('rotation', 0)
    player.css('transform', 'rotate(' + player.data('rotation') + 'deg)');
    $('#scorePlayer1').text(playerScore);
    
    cycle();
}
function createMap() {
    for (i = 1; i <= coinCount; i++) {
        var currCoinPosition = {};
        var x = Math.floor((Math.random()) * 2000);
        var y = Math.floor((Math.random()) * 2000);
        create('coin', x, y);
        currCoinPosition['left'] = x;
        currCoinPosition['top'] = y;
        currCoinPosition['onMap'] = true;
        coinsPositions[i] = currCoinPosition;
    }
}
function addPlayerHitbox() {
    playerH['left'] = player.offset().left;
    playerH['top'] = player.offset().top;
    playerH['right'] = playerH['left'] + playerSize;
    playerH['bottom'] = playerH['top'] + playerSize;
}

function KeyDown(e){
    buttons[e.which] = true;
//   console.log (buttons);
}
function KeyUp(e) {
    if (buttons[e.which]) {
    buttons[e.which] = false;
//    console.log (buttons);
    }
}

function cycle() {
    hitboxCheck('coin');
    rotatePlayer();
    move();
    checkBorderCol();
    setTimeout(cycle, gamespeed);
}
function rotatePlayer() {
    if (buttons[37]) {
        player.data('rotation', player.data('rotation') - 3);
    }
    if (buttons[39]) {
        player.data('rotation', player.data('rotation') + 3);
    }
    player.css('transform', 'rotate(' + player.data('rotation') + 'deg)');
}

function addCount(number, id) {
    console.log(playerScore + ' + ' + number);
    playerScore = playerScore + number;
    $('#scorePlayer1').text(playerScore);
    coinsPositions[id]['onMap'] = false;
    $('#coin' + id).remove();
}

function move() {
    var rot = player.data('rotation');
//    console.log(x + ' ' + y + ' ' + rot);
    if (buttons[40]) {
        var x = Math.cos((rot + 90)*mult) * playerSpeed;
        var y = Math.sin((rot + 90)*mult) * playerSpeed;
        $('#mBC').offset({left: $('#mBC').offset().left - x, top: $('#mBC').offset().top - y})
    }
    if (buttons[38]) {
        var x = Math.cos((rot + 90)*mult) * playerSpeed;
        var y = Math.sin((rot + 90)*mult) * playerSpeed;
        $('#mBC').offset({left: $('#mBC').offset().left + x, top: $('#mBC').offset().top + y})
    }
}
function checkBorderCol() {
    if ($('#mBC').offset().left + 30 > playerH['left']) {
        $('#mBC').offset({left: playerH['left'] - 30});
    }
    if ($('#mBC').offset().top + 30 > playerH['top']) {
        $('#mBC').offset({top: playerH['top'] - 30});
    }
    if ($('#mBC').offset().top + mapSize + 30 + playerSize < playerH['bottom']) {
        $('#mBC').offset({top: playerH['bottom'] - mapSize - playerSize - 30});
    }
    if ($('#mBC').offset().left + mapSize + 30 + playerSize < playerH['right']) {
        $('#mBC').offset({left: playerH['right'] - mapSize - playerSize - 30});
    }
}


function hitboxCheck(type) {
    var containerL = $('#mBC').offset().left;
    var containerT = $('#mBC').offset().top;
    
    if (type == 'coin') {
        var i = 1;
            for (var key in coinsPositions) {
                if (coinsPositions[key]['onMap']) {
    
                var left = coinsPositions[key]['left'] + containerL + 30;
                var top = coinsPositions[key]['top'] + containerT  + 30;
                var right = left + coinSize;
                var bottom = top + coinSize;
                
                if (left <= playerH['right']) {
                    if (top <= playerH['bottom']) {
                        if (right >= playerH['left']) {
                            if (bottom >= playerH['top']) {
                                addCount(oneCoinPower, key);
                            }
                        }
                    }
                }
                i++
            }
        }
    }
}





function fitToSize() {
    var y = window.innerHeight - 20;
    var x = window.innerWidth - 20;
    console.log(x + 'px by ' + y + 'px');
    field.width(x).height(y);
    $('#mBC').width(mapSize + coinSize).height(mapSize + coinSize);
    player.offset({left: field.width()/2 - playerSize/2, top: field.height()/2 - playerSize/2});
}
function getDevice() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform ?? window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (iosPlatforms.indexOf(platform) !== -1 || /Android/.test(userAgent)) {
        device = 'phone';
    } else {
        device = 'pc';
    }
    console.log(device);
}

function create(type, left, top) {
    if (type == 'coin') {
        var html = `<div id='coin${i}' class='coin' style='left: ${left}px; top: ${top}px'>`;
        $('#mBC').append(html);
    }
//    console.log(html);
}
