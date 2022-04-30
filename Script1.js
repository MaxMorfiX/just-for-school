const SEP = '_';
var device;
var field = $('#field');
var player = $('#player');
var coinCount = 50;

startGame();

function startGame() {
    fitToSize();
    createMap();
}

function createMap() {
    for(i = 1; i <= coinCount; i++) {
        var x = Math.floor(Math.random() * 2000);
        var y = Math.floor(Math.random() * 2000);
        create('coin', x, y);
    }
}

function create(type, left, bottom) {
    if(type == 'coin') {
        var html = `<div id='coin${top}${SEP}${bottom}' class='coin' style='left: ${left}px; bottom: ${bottom}px'>`;
    }
//    console.log(html);
    field.append(html);
}


function fitToSize() {
    var y = window.innerHeight - 20;
    var x = window.innerWidth - 20;
    console.log(x + 'px and ' + y + 'px');
    field.width(x).height(y);
    player.offset({left: x/2 - 25, top: y/2 - 25});
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
