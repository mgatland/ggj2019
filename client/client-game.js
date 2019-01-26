let localPlayer = {x: 10, y:10}

var frontend = function (assets) {

    var keysDown = [];
    var socket = undefined
    var port = location.port

    function connect() {
        console.log("connecting to port " + port)
        socket = io.connect("http://" + document.domain + ":" + port)

        socket.on('connect', function () {
            console.log("connected")
        });

        socket.on('updatechat', function (data) {
        })
    }

    var canvas = getEl('gamescreen')
    var ctx = canvas.getContext("2d")
    const tileSize = 10
    const screenWidth = 10
    const scale = 10
    canvas.width = screenWidth * tileSize * scale
    canvas.height = screenWidth * tileSize * scale

    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
        switch (e.code) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
            e.preventDefault();
        }
    }, false);

    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);

    setInterval(function() {
        updateMovement(keysDown)
        draw(ctx, assets)
    }, 1000/60);

    /**
     * Send message when user presses Enter key
     
     input.onkeydown = function(e) {
        switch (e.keyCode) {
            case KeyEvent.DOM_VK_ENTER:
            case KeyEvent.DOM_VK_RETURN:
            sendChatMessage();
            break;
        }
    };

    //get("chatButton").addEventListener("click", sendChatMessage);*/

}

window.onload = function () {
    loader(frontend, ["tiles"])
}

function updateMovement(keysDown) {
  let dir = {x: 0, y:0}
  if (keysDown.ArrowUp) {
    dir.y -= 1
  }
  if (keysDown.ArrowDown) {
    dir.y += 1
  }
  if (keysDown.ArrowLeft) {
    dir.x -= 1
  }
  if (keysDown.ArrowRight) {
    dir.x += 1
  }
  localPlayer.x += dir.x
  localPlayer.y += dir.y
}

function draw(ctx, assets) {
  drawTile(ctx, localPlayer, 0, assets)
}


function drawTile(ctx, pos, num, assets) {
    var tX = num % 10;
    var tY = Math.floor(num / 10); 
    let tileSize = 10
    ctx.drawImage(assets.tiles, tX*tileSize, tY*tileSize, tileSize, tileSize, pos.x*tileSize,pos.y*tileSize,tileSize,tileSize);
}