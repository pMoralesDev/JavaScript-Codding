const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
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
/**
 * @function drawNet se encarga de dibujar la linea divisoria entre los campos del jugador y la computadora
 */
function drawNet() {
    for(let i=0; i<=canvas.width; i+=15){
        drawRect(canvas.width/2 - netWidth/2, i, netWidth, 10, netColor)
    }
}
/**
 * @function drawRect se encarga de dibujar extas / rectangulos
 * @param {Number} x posición en el eje X donde se inicia la recta
 * @param {Number} y posición en el eje Y donde se inicia la recta
 * @param {Number} width ancho designado para la recta
 * @param {Number} height altura desiganada para la recta
 * @param {String} color color con el que se va a dibujar la recta
 */
function drawRect(x, y, width, height, color){
    context.fillStyle = color
    context.fillRect(x, y, width, height)
}
/**
 * @function drawCircle se encarga de dibujar círculos, en concreto el círculo es la bola del pong
 * @param {Number} x posición en el eje X donde va a estar el centro del circulo 
 * @param {Number} y posición en el eje Y donde va a estar el centro del circulo
 * @param {Number} radius tamaño del radio del circulo que se va a dibujar
 * @param {String} color color con el que se va a dibujar el circulo
 */
function drawCircle(x, y, radius, color) {
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI*2, false)
    context.closePath()
    context.fill()
}
/**
 * @function drawText se encarga de dibujar el texto en la pantalla. En concreto dibuja las puntuaciones en pantalla
 * @param {String} text texto a dibujar
 * @param {Number} x define la posición en el eje X donde se dibuja el texto
 * @param {Number} y define la posición en el eje Y donde se dibuja el texto
 * @param {String} color define el color de la fuente del texto
 * @param {Number} fontSize  define el tamaño de la fuente del texto
 * @param {*} fontWeight define el acabado / peso de la fuente del texto (negrita, cursiva...)
 * @param {String} font define la fuente del texto 
 */
function drawText(text, x, y, color, fontSize, fontWeight, font='Arial'){
    context.fillStyle = color
    context.font = `${fontWeight} ${fontSize}px ${font}`
    context.textAlign = 'center'
    context.fillText(text, x, y)
}
/**
 * @function createPaddle se encarga de crear objetos raqueta, los cuales usan los jugadores
 * @param {Number} x define la posición en el eje X donde se situa la raqueta
 * @param {Number} y define la posición en el eje Y donde se situa la raqueta
 * @param {Number} width define el ancho de la raqueta 
 * @param {Number} height define el alto de la raqueta
 * @param {String} color define el color de la raqueta 
 * @returns parametros básicos para crear un obejo raqueta, que va asociado a un jugador mediante @param score que almacena la puntuación
 * que lleva en la partida el jugador
 */
function createPaddle(x, y, width, height, color){
    return{x, y, width, height, color, score:0}
}
/**
 * @function createBall se encarga de crear objetos pelota, cuyo movimiento es el eje principal del juego
 * @param {Number} x define la posición en el eje X donde se situa la pelota
 * @param {Number} y define la posición en el eje Y donde se situa la pelota
 * @param {Number} radius define el tamaño de la pelota
 * @param {Number} velocityX define el movimiento en el eje X de la bola
 * @param {Number} velocityY define el movimiento en el eje Y de la bola
 * @returns parametros básicos para crear un objeto pelota, se le asigna una @param speed velocidad con un valor inicial predeterminado
 */
function createBall(x, y, radius, velocityX, velocityY, color){
    return{x, y, radius, velocityX, velocityY, color, speed: intitialBallSpeed}
}
/**
 * @param user raqueta del jugador
 * @param com raqueta del ordenador
 * @param ball pelota de juego
 */
const user = createPaddle(0, canvas.height/2 - paddleHeight/2, paddleWidth, paddleHeight, netColor)
const com = createPaddle(canvas.width - paddleWidth, canvas.height/2 - paddleHeight/2, paddleWidth, paddleHeight, netColor)
const ball = createBall(canvas.width/2, canvas.height/2, ballRadius, intitialBallSpeed, intitialBallSpeed, netColor)
/**Añadimos un evento vinculado al movimiento del raton, con la función asociada para mover la raqueta */
canvas.addEventListener('mousemove', movePaddle)
/**
 * @function movePaddle se encarga de mover la raqueta
 * @param {*} event 
 */
function movePaddle(event) {
    const rect = canvas.getBoundingClientRect()
    user.y = event.clientY - rect.top - user.height/2
}
/**
 * @function collision se encarga de comprobar si la pelota a tocado algún limite del tablero de juego
 * @param {ball} ball objeto pelota de juego
 * @param {user} paddle objeto raqueta del jugador
 * @returns true o false en función de si ha tocado algún limite o no
 */
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
    } else if (ball.x + ball.radius > canvas.width){
        user.score++
        resetBall()
    }

    ball.x += ball.velocityX
    ball.y += ball.velocityY

    com.y += (ball.y - (com.y + com.height/2)) * 0.1

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY
    }

    let player = ball.x + ball.radius < canvas.width/2 ? user : com
    if (collision(ball, player)){
        const collisionPoint = ball.y - (player.y + player.height/2),
        colisionAngle = (Math.PI/4) * (collisionPoint / (player.height/2)),
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

