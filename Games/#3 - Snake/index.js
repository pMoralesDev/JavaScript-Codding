const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".socre")
const highScoreElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".control i")

let gameOver = false
let foodX, foodY
let snakeX=5, sanakeY=5
let velocityX=0, velocityY=0
let snakeBody = []
let setIntervalID
let socre = 0

/**
 * Creamos una variable para almacenar la puntuación más alta
 */
let highScore = localStorage.getItem("high-score") || 0
highScoreElement.innerHTML = `High Score: ${highScore}`

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
        velocityY = 1
    } else if ( e.key === "Arrow-down" && velocityY != -1){
        velocityX = 0
        velocityY = -1
    } else if ( e.key === "Arrow-left" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    } else if ( e.key === "Arrow-right" && velocityX != -1){
        velocityX = 1
        velocityY = 0
    }
}

/**
 * Cambiando la dirección en función de la tecla pulsada
 */
controls.forEach(button => button.addEventListener("click", () => changeDirection({
    key: button.dataset.key
})))