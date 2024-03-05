/**
 * @var canvas elemto html donde vamos a pintar el juego
 * @var ctx contexto que vamos a aplicar a nuestro canvas, en este caso 2 dimesiones
 * @var ballRadius 
 */
let canvas = document.getElementById("game"),
ctx = canvas.getContext('2d'),
ballRadius = 9,
x = canvas.width / (Math.floor(Math.random()*Math.random()*10)+3),
y = canvas.height - 40,
dx = 2,
dy = -2,
paddleHeight = 12,
paddleWidth = 72,
paddleX = (canvas.width - paddleWidth) / 2,
rowCount = 5,
columnCount = 9,
brickWidth = 54,
brickHeight = 18,
brickPadding = 12,
topOffset = 40,
leftOffset = 33,
score = 0,
bricks = []

for ( let i = 0; i < columnCount ; i++){
    bricks[i] = []
    for ( let j = 0; j < rowCount; j++){
        bricks[i][j] = {x:0, y:0, status:1}
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler (e) {
    let relativeX = e.clientX - canvas.offsetLeft
    if (relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2
    }
}

function drawPaddle () {
    ctx.beginPath()
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30)
    ctx.fillStyle= '#383c41'
    ctx.fill()
    ctx.closePath()
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = '#383c41'
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for ( let i = 0; i < columnCount; i++){
        for (let j = 0; j < rowCount; j++ ){
            if(bricks[i][j].status === 1) {
                let brickX = (i * (brickWidth + brickPadding)) + leftOffset
                let brickY = (j * (brickHeight + brickPadding)) + topOffset
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                ctx.beginPath()
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
                ctx.fillStyle = '#383c41'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function trackStore() {
    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = '#383c41'
    ctx.fillText('Score :' + score, 8, 24)
}

function hitDetection(){
    for ( let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++ ) {
            let brick = bricks[i][j]
            if (brick.status === 1){
                if (x > brick.x && x < brick.x + brickWidth &&
                    y > brick.y && y < brick.y + brickHeight) {
                        dy = -dy
                        brick.status = 0
                        score++
                        if(score === rowCount * columnCount) {
                            alert('Congrats, you Win!!')
                            document.location.reload()
                        }
                    }
            }
        }
    }
}

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trackStore()
    drawBricks()
    drawBall()
    drawPaddle()
    hitDetection()

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
    }

    if(y + dy < ballRadius){
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        } else {
            alert('Game Over!')
            document.location.reload()
        }
    }

    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy
    }

    x += dx
    y += dy

}

setInterval(init, 10)