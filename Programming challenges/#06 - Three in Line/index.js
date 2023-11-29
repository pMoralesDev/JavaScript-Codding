/**Variables que controlan el juego
 * @param playerTurn: string que controla de que jugador es el turno. Jugador x - Jugador o
 * @param moves: integer que controla el número de movimientos, esto permite controlar el empate
 * @param isGameOver: boolean que controla el final del juego
 * @param span: array que contiene todas las casillas de juego
 * @param restartButton: string que contiene el codigo HTML para agregar un boton con funcionalidades, principalmente la funciòn playAgain()
 */
var playerTurn, moves, isGameOver, span, restartButton
playerTurn = "x"
moves = 0
isGameOver = false
span = document.getElementsByTagName("span")
restartButton = '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>'
/**Función principal de la aplicación
 * @function play controla el desarrollo del juego
 * En el HTML cada span tiene un "onclick" que activa la función play
 * Primero comprueba que la celda este vacía y que el juego no haya acabado
 * Despues asigna el valor X O tanto al span como al parámetro en el html en función del turno del jugador
 * Aumenta el contador de turnos y cambia el turno del jugador
 */
function play (y){
    if(y.dataset.player == "none" && window.isGameOver ==false){
        y.innerHTML = playerTurn
        y.dataset.player = playerTurn
        moves++
        if(playerTurn == "x"){
            playerTurn = "o"
        } else if (playerTurn=="o"){
            playerTurn = "x"
        }
    }
    /**Finalmente comprueban las condiciones de Game Over ya sea por 
     * empate @function draw o 
     * @function checkWinner victoria */
    checkWinner (1,2,3)
    checkWinner (4,5,6)
    checkWinner (7,8,9)
    checkWinner (1,4,7)
    checkWinner (2,5,8)
    checkWinner (3,6,9)
    checkWinner (1,5,9)
    checkWinner (3,5,7)
    if (moves == 9 && isGameOver == false){
        draw()
    }
}
/**Comprobación de las condiciones de victoria
 * @function checkWinner mediante el array de span comprueba las condiciones de victoria
 * Introduce el valor de tres celdas y comprueba la victoria, se le resta 1 a cada valor debido a que los array empiezan en 0
 * En caso de victoria llama a la función game over
 */
function checkWinner(a,b,c){
    a--
    b--
    c--
    if((span[a].dataset.player===span[b].dataset.player)&&(span[b].dataset.player === span[c].dataset.player)
    &&(span[a].dataset.player === span[c].dataset.player)&&(span[a].dataset.player === "x" ||span[a].dataset.player === "o")&& isGameOver==false){
        span[a].parentNode.className += " active-box"
        span[b].parentNode.className += " active-box"
        span[c].parentNode.className += " active-box"
        gameOver(a)
    }
}
/** @function playAgain se encarga de limpiar el tablero para poder jugar otra partida. Borra el pop-up, llama a reset game y cambia el valor de game over */
function playAgain() {
    document.getElementsByClassName("alert")[0].parentNode.removeChild(document.getElementsByClassName("alert")[0])
    resetGame()
    window.isGameOver = false
    for( let i = 0; i < span.length; i++){
        span[i].parentNode.className = span[i].parentNode.className.replace("active-box", "")
    }
}
/**@function resetGame se encarga de limpiar el valor de los span, tanto del parametro player como del valor interno. Además define el primer turno del jugador X */
function resetGame() {
    for ( let i = 0; i < span.length; i++ ){
        span[i].dataset.player="none"
        span[i].innerHTML="&nbsp;"
    }
    playerTurn="x"
}
/**
 * @function gameOver se encarga de mostrar el pop-up de fin del juego en caso de victoria. 
 * @param {playerTurn} a el parámetro de entrada se usa para saber que jugador a ganado
 */
function gameOver(a) {
    let gameOverAlertElement = "<b>GAME OVER</b><br><br> Player "+ span[a].dataset.player.toUpperCase()+" WIN!!!<br><br>"+restartButton
    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = gameOverAlertElement
    document.getElementsByTagName("body")[0].appendChild(div)
    window.isGameOver = true
    moves = 0
}
/**
 * @function draw se encarga de mostrar el pop.upo de fin del juego en caso de empate
 */
function draw() {
    var drawAlertElement = "<b>DRAW</b><br><br>" + restartButton
    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = drawAlertElement
    document.getElementsByTagName("body")[0].appendChild(div)
    window.isGameOver = true
    moves = 0
}
