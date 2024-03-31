const canvas = document.getElementById('game'),
context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const paddleWidth = 18,
paddleHeight = 120,
paddleSpeed = 8,
ballRadius = 12,
intitialBallSpeed = 8,
maxBallSpeed = 45,
netWidth = 5,
netColor = 'WHITE'

function drawNet() {
    for(let i=0; i<=canvas.width; i+=15){
        drawRect(canvas.width/2 - netWidth/2, i, netWidth, 10, netColor)
    }
}

function drawRect(x, y, width, height, color){
    context.fillStyle = color
    context.fillRect(x, y, width, height)
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color
    context.beginpath()
    context.arc(x, y, radius, 0, Math.PI*2, false)
    context.closePath()
    context.fill()
}

function drawText(text, x, y, color, fontSize=50, fontWeight='bold', font='Arial'){
    context.fillStyle = color
    context.font = `${fontWeight} ${fontSize}px ${font}`
    context.textAlign = 'center'
    context.fillText(text, x, y)
}

function createPaddle(x, y, width, height, color){
    return{x, y, width, height, color, score:0}
}

function createBall(x, y, radius, velocityX, velocityY){
    return{x, y, radius, velocityX, velocityY, color, speed: intitialBallSpeed}
}

const user = createPaddle(0, canvas.height/2 - paddleHeight/2, paddleWidth, paddleHeight, netColor)
const com = createPaddle(canvas.width - paddleWidth, canvas.height/2 - paddleHeight/2, paddleWidth, paddleHeight, netColor)
const ball = createBall(canvas.width/2, canvas.height/2, ballRadius, intitialBallSpeed, intitialBallSpeed, netColor)

canvas.addEventListener('mousemove', movePaddle)

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect()
    user.y = event.clientY - rect.top - user.height/2
}

function collision(ball, paddle){
    return(
        ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width && 
        ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height 
    )
}

function resetBall(){
    ball.x = canvas.width/2
    ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius
    ball.velocityX = -ball.velocityX
    ball.speed = intitialBallSpeed
}

function update(){
    if(ball.x - ball.radius < 0){
        com.score++
        resetBall()
    } else if (ball.x + ball.radius > 0){
        user.score++
        resetBall()
    }

    ball.x += ball.velocityX
    ball.y += ball.velocityY

    com.y += (ball.y - (com.y + com.height/2)) * 2

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY
    }

    let player = ball.x + ball.radius < canvas.width/2 ? user : com
    if (collision(ball, player)){
        const collisionPoint = ball.y - (player.y + player.height/2)
        colisionAngle = (Math.PI/4) * (collisionPoint / (player.height/2))
        direction = ball.x + ball.radius  < canvas.width/2 ? 1 : -1
        ball.velocityX = direction * ball.speed * Math.cos(colisionAngle)
        ball.velocityY = ball.speed * Math.sin(colisionAngle)

        ball.speed += 0.2
        if(ball.speed > maxBallSpeed) {
            ball.speed = maxBallSpeed
        }
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, '#202020')
    drawNet()
    drawText(user.score, canvas.width/4, canvas.height/2, '#c2c2c2', 120, 'bold')
    drawText(com.score, (3*canvas.width)/4, canvas.height/2, '#c2c2c2', 120, 'bold')
    drawRect(user.x, user.y, user.width, user.height,user.color)
    drawRect(com.x, com.y, com.width, com.height,com.color)
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

function gameLoop() {
    update()
    render()
}

const framePerSec = 60

setInterval(gameLoop, 1000/framePerSec)

