const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")

let gameOver = false
let foodX, foodY
let snakeX=5, snakeY=5
let velocityX=0, velocityY=0
let snakeBody = []
let setIntervalID
let score = 0

/**
 * Creamos una variable para almacenar la puntuación más alta
 */
let highScore = localStorage.getItem("high-score") || 0
highScoreElement.innerText = `High Score: ${highScore}`

/**
 * Creamos una función para que aparezca comida de forma aleatoria
 */
const upadateFoodPosition = () => {
    foodX = Math.floor(Math.random()*30)+1
    foodY = Math.floor(Math.random()*30)+1
}

const handleGameOver = () => {
    clearInterval(setIntervalID)
    alert("Game Over! Press OK to replay :)")
    location.reload()
}

const changeDirection = e => {
    if(e.key === "Arrow-up" && velocityY != 1){
        velocityX = 0
        velocityY = -1
    } else if ( e.key === "Arrow-down" && velocityY != -1){
        velocityX = 0
        velocityY = 1
    } else if ( e.key === "Arrow-left" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    } else if ( e.key === "Arrow-right" && velocityX != -1){
        velocityX = 1
        velocityY = 0
    }
}

/**
 * Cambiando la dirección en función del botón de dirección clickado
 */
controls.forEach(button => button.addEventListener("click", () => changeDirection({
    key: button.dataset.key
})))

const initGame = () => {
    if(gameOver) {
        return handleGameOver()
    }
    let html = `<div class='food' style='grid-area:${foodY}/${foodX}'`
    /**
     * Cuando la serpiente come comida
     */
    if( snakeX === foodX && snakeY === foodY) {
        upadateFoodPosition()
        snakeBody.push([foodY, foodX])
        score++
        highScore = score >= highScore ? score : highScore
        localStorage.setItem('high-score', highScore)
        scoreElement.innerText = `Score: ${score}`
        highScoreElement.innerText = `High Score: ${highScore}`
    }
    /**
     * Actualizamos la serpiente
     */
    snakeX += velocityX
    snakeY += velocityY
    /**
     * 
     */
    for(let i = snakeBody.length-1; i>0;i--){
        snakeBody[i] = snakeBody[i-1]
    }
    snakeBody[0] = [snakeX, snakeY]
    /**
     * 
     */
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        return gameOver=true
    }
    /**
     * 
     */
    for(let i = 0; i<snakeBody.length; i++){
        html+= `<div class='head' style='grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}'></div>`
        /**
         * Comprobamos que la serpiente no ha chocado con ella misma
         */
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true
        }
    }
    playBoard.innerHTML = html
}

upadateFoodPosition()
setIntervalID = setInterval(initGame,100)
document.addEventListener('keyup', changeDirection)