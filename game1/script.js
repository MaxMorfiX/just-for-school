const asset = 1;
const SEP = '_';
var mult = Math.PI / 180;
var field = $('#field');
var player = $('#player');
var iForGameEnd = 0;
var gamespeed = 15;
var playerSpeed = 7;
var playerSize = 45;
var coinSize = 50;
var mapSize = 2000;
var playTime = 25;
var device;
var coinCount = 50;
var fakeCoinCount = 10;
var decorationsCount = 100;
var oneCoinPower = 1;
var oneFakeCoinPower = -3;
var time = playTime;
var player1Score = 0;
var player2Score = 0;
var buttons = {};
var playerH = {};
var coinsPositions = {};
var fakeCoinsPositions = {};
var currPlayer = 1;

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);


getDevice();
fitToSize();
addPlayerHitbox();
start();

function start() {
    
    console.log('krjbu')
    
    startMapFunctions();
    $('#timeOut').show();
    $('#time').hide();
    
    function two() {
        $('#timeOut').text('2');
        setTimeout(one, 1000);
    }
    function one() {
        $('#timeOut').text('1');
        setTimeout(go, 1000);
    }
    function go() {
        $('#timeOut').text('GO!');
        setTimeout(startGame, 1000);
    }
    
    $('#timeOut').text('3');
    setTimeout(two, 1000);
    
}

function startMapFunctions() {
    createMap();
    $('#mBC').offset({top: -(mapSize/3), left: -(mapSize/3)});
    player.data('rotation', 0);
    player.show();
    player.css('transform', 'rotate(' + player.data('rotation') + 'deg)');
    $('#scorePlayer1').text(player1Score);
    $('#scorePlayer2').text(player2Score);
    player.css('background', `url('textures/player${currPlayer}.png') 100% 100%`);
    player.css('background-size', '100% 100%');
    if (device === 'phone') {
        $('#left').show();
        $('#right').show();
        $('#up').show();
        $('#down').show();
    }
}

function startGame() {
    
    $('#time').show();
    $('timeOut').text();
    $('#timeOut').hide();
    
    cycle();
}

function createMap() {
    for (i = 1; i <= coinCount; i++) {
        var currCoinPosition = {};
        var x = Math.floor((Math.random()) * mapSize);
        var y = Math.floor((Math.random()) * mapSize);
        create('coin', x, y);
        currCoinPosition['left'] = x;
        currCoinPosition['top'] = y;
        currCoinPosition['onMap'] = true;
        coinsPositions[i] = currCoinPosition;
    }
    for (i = 1; i <= fakeCoinCount; i++) {
        var currCoinPosition = {};
        var x = Math.floor((Math.random()) * mapSize);
        var y = Math.floor((Math.random()) * mapSize);
        create('fakeCoin', x, y);
        currCoinPosition['left'] = x;
        currCoinPosition['top'] = y;
        currCoinPosition['onMap'] = true;
        fakeCoinsPositions[i] = currCoinPosition;
    }
    for (i = 1; i <= decorationsCount; i++) {
        var x = Math.floor((Math.random()) * mapSize);
        var y = Math.floor((Math.random()) * mapSize);
        var type = Math.floor((Math.random()) * 4);
        create('grass' + type, x, y);
    }
}

function addPlayerHitbox() {
    playerH['left'] = player.offset().left;
    playerH['top'] = player.offset().top;
    playerH['right'] = playerH['left'] + playerSize;
    playerH['bottom'] = playerH['top'] + playerSize;
}

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

function cycle() {
    rotatePlayer();
    move();
    checkBorderCol();
    
    $('#time').text(JSON.stringify(time.toFixed(2)));
    
    if(!checkGameEnd()) {
        setTimeout(cycle, gamespeed);
    }
    
    time = Math.floor((time - gamespeed/1000)*100)/100;
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
    if(currPlayer == 1) {
        player1Score = player1Score + number;
        $('#scorePlayer1').text(player1Score);
    } else {
        player2Score = player2Score + number;
        $('#scorePlayer2').text(player2Score);
    }
    coinsPositions[id]['onMap'] = false;
    $('#coin' + id).remove();
}

function increaceCount(number, id) {
    if(currPlayer == 1) {
        player1Score = player1Score + number;
        $('#scorePlayer1').text(player1Score);
    } else {
        player2Score = player2Score + number;
        $('#scorePlayer2').text(player2Score);
    }
    fakeCoinsPositions[id]['onMap'] = false;
    $('#fakeCoin' + id).remove();
}

function move() {
    var rot = player.data('rotation');
    //    console.log(x + ' ' + y + ' ' + rot);
    if (buttons[40]) {
        var x = Math.cos((rot + 90) * mult) * playerSpeed;
        var y = Math.sin((rot + 90) * mult) * playerSpeed;
        $('#mBC').offset({left: $('#mBC').offset().left - x, top: $('#mBC').offset().top - y });
    }
    if (buttons[38]) {
        var x = Math.cos((rot + 90) * mult) * playerSpeed;
        var y = Math.sin((rot + 90) * mult) * playerSpeed;
        $('#mBC').offset({left: $('#mBC').offset().left + x, top: $('#mBC').offset().top + y });
    }
    if (buttons[40] || buttons[38]) {
        hitboxCheck('coin');
        hitboxCheck('fakeCoin');
    }
}

function checkBorderCol() {
    if ($('#mBC').offset().left + 30 > playerH['left']) {
        $('#mBC').offset({left: playerH['left'] - 30 });
    }
    if ($('#mBC').offset().top + 30 > playerH['top']) {
        $('#mBC').offset({top: playerH['top'] - 30 });
    }
    if ($('#mBC').offset().top + mapSize + 30 + playerSize < playerH['bottom']) {
        $('#mBC').offset({top: playerH['bottom'] - mapSize - playerSize - 30 });
    }
    if ($('#mBC').offset().left + mapSize + 30 + playerSize < playerH['right']) {
        $('#mBC').offset({left: playerH['right'] - mapSize - playerSize - 30 });
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
                var top = coinsPositions[key]['top'] + containerT + 30;
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
    if (type == 'fakeCoin') {
        var i = 1;
        for (var key in fakeCoinsPositions) {
            if (fakeCoinsPositions[key]['onMap']) {

                var left = fakeCoinsPositions[key]['left'] + containerL + 30;
                var top = fakeCoinsPositions[key]['top'] + containerT + 30;
                var right = left + coinSize;
                var bottom = top + coinSize;

                if (left <= playerH['right']) {
                    if (top <= playerH['bottom']) {
                        if (right >= playerH['left']) {
                            if (bottom >= playerH['top']) {
                                increaceCount(oneFakeCoinPower, key);
                            }
                        }
                    }
                }
                i++
            }
        }
    }
}



function checkGameEnd() {
    if(time <= 0.1) {
        time = playTime;
        if(currPlayer == 1) {
            currPlayer = 2;
            $('.coin, .fakeCoin, .decoration').remove();
            start();
        } else {
            gameEnd();
        }
            return true;
    }
}

function gameEnd() {
    if(player1Score > player2Score) {
        $('#gameResult').css('background', `url('textures/pl1won.png') 100% 100%`);
    } else if(player2Score > player1Score) {
        $('#gameResult').css('background', `url('textures/pl2won.png') 100% 100%`);
    } else if(player1Score == player2Score) {
        $('#gameResult').css('background', `url('textures/deadHeat.png') 100% 100%`);
    }
    $('#gameResult').css('background-size', '100% 100%').css('opacity', '0%');
    gameEndCycle();
}


function gameEndCycle() {
    $('.playerScore').width($('.playerScore').width()*1.01).height($('.playerScore').height()*1.01);
    $('.playerScore').css('font-size', $('.playerScore').height() - iForGameEnd*0.3 - 9).css('text-align', 'center');
    $('#mBC, .player, #time').css('opacity', `${100 - iForGameEnd}%`);
    $('.LRButtons, .UDButtons').css('opacity', `${50 - iForGameEnd/2}%`);
    $('#gameResult').css('opacity', `${iForGameEnd}%`);
    console.log(iForGameEnd);
    if(iForGameEnd <= 100) {
        setTimeout(gameEndCycle, 15);
    }
    iForGameEnd++;
}



function fitToSize() {
    var y = window.innerHeight - 10;
    var x = window.innerWidth - 10;
    console.log(x + 'px by ' + y + 'px');
    field.width(x).height(y);
    $('.time').width(x);
    $('#left').offset({left: 100, top: field.height() - 200 });
    $('#right').offset({left: 270, top: field.height() - 200 });
    $('#up').offset({left: field.width() - 350, top: field.height() - 300 });
    $('#down').offset({left: field.width() - 350, top: field.height() - 200 });
    $('#mBC').width(mapSize + coinSize).height(mapSize + coinSize);
    $('#gameResult').height(115).width(1100).offset({left: field.width() / 2 - $('#gameResult').width() / 2, top: field.height() / 2 + playerSize / 2});
    player.offset({left: field.width() / 2 - playerSize / 2, top: field.height() / 2 - playerSize / 2 });
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
    } else if (type == 'fakeCoin') {
        var html = `<div id='fakeCoin${i}' class='fakeCoin' style='left: ${left}px; top: ${top}px'>`;
    } else {
        var html = `<div id='dec${i}' class='decoration' style='background: url("textures/${type}.png?asset=${asset}"); background-size: 100% 100%; left: ${left}px; top: ${top}px'>`;
    }
    $('#mBC').append(html);
    //    console.log(html);
}
