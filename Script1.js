const SEP = '_';
var field = $('#field');
var player = $('#player');
var gamespeed = 10;
var playerSpeed = 7;
var playerSize = player.width();
var coinSize = $('.coin').width();
var playerH = {};
var device;
var coinCount = 50;
var buttons = {};
var mult = Math.PI/180;

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);

startGame();

function startGame() {
    fitToSize();
    createMap();
    addPlayerHitbox();
    
    player.data('rotation', 0)
    player.css('transform', 'rotate(' + player.data('rotation') + 'deg)');
    
    cycle();
}
function createMap() {
    for(i = 1; i <= coinCount; i++) {
        var x = Math.floor(Math.random() * 2000);
        var y = Math.floor(Math.random() * 2000);
        create('coin', x, y);
    }
}
function addPlayerHitbox() {
    playerH['left'] = player.offset().left;
    playerH['top'] = player.offset().top;
    playerH['right'] = playerH['left'] - playerSize;
    playerH['bottom'] = playerH['top'] - playerSize;
}

function KeyDown(e){
    buttons[e.which] = true;
//   console.log (buttons);
}
function KeyUp(e) {
    if(buttons[e.which]) {
    buttons[e.which] = false;
//    console.log (buttons);
    }
}

function cycle() {
    rotatePlayer();
    checkMove();
    setTimeout(cycle, gamespeed);
}
function rotatePlayer() {
    if(buttons[37]) {
        player.data('rotation', player.data('rotation') - 3);
    }
    if(buttons[39]) {
        player.data('rotation', player.data('rotation') + 3);
    }
    player.css('transform', 'rotate(' + player.data('rotation') + 'deg)');
}

function checkMove() {
    var rot = player.data('rotation');
    var x = Math.cos((rot + 90)*mult) * playerSpeed;
    var y = Math.sin((rot + 90)*mult) * playerSpeed;
//    console.log(x + ' ' + y + ' ' + rot);
    
    if(buttons[40]) {
        $('#movingBlocksContainer').offset({left: $('#movingBlocksContainer').offset().left - x, top: $('#movingBlocksContainer').offset().top - y})
    }
    if(buttons[38]) {
        $('#movingBlocksContainer').offset({left: $('#movingBlocksContainer').offset().left + x, top: $('#movingBlocksContainer').offset().top + y})
    }
}




function create(type, left, bottom) {
    if(type == 'coin') {
        var html = `<div id='coin${i}' class='coin' style='left: ${left}px; bottom: ${bottom}px'>`;
        $('#movingBlocksContainer').append(html);
    }
//    console.log(html);
}

function fitToSize() {
    var y = window.innerHeight - 20;
    var x = window.innerWidth - 20;
    console.log(x + 'px by ' + y + 'px');
    field.width(x).height(y);
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
