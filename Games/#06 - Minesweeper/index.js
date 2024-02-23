/**
 * @var grid es el tablero de juego donde aplicamos la funcionalidad
 * @var testMode se activa para poder ver las minas antes de hacer click
 * @var lockGame se activa para parar la funcionalidad hasta que reinicia el juego entre partida y partida
 */
const grid = document.getElementById('grid')
testMode = true
let lockGame = false
generateGrid()
/**
 * @function generateGrid inicializa el juego pintando el tablero y agregando la funcionalidad a cada celda
 * @var mine atributo creado para dar funcionalidad de mina a una celda
 */
function generateGrid() {
    lockGame=false
    grid.innerHTML=''    
    for(var i = 0; i < 10; i++){
        row = grid.insertRow(i)
        for(var j = 0; j < 10; j++){
            cell = row.insertCell(j)
            cell.onclick = function () {
                init(this)
            }
            var mine = document.createAttribute('mine')
            mine.value = 'false'
            cell.setAttributeNode(mine)
        }
    }
    generateMines()
}
/**
 * @function generateMines genera minas de manera aleatoria comprobando que no haya posiciones repetidas
 * @var minePositions variable que controla que el número de minas sea el correcto
 * @var row variable que determina la fila en la que se pondra una mina
 * @var col variable que controla la columna en la que se pondra una mina
 * @var position variable que almacena temporalmente una posición para operar con ella
 */
function generateMines() {
    var minePositions = new Set();
    while (minePositions.size < 20) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var position = row + '-' + col; 
        if (!minePositions.has(position)) {
            minePositions.add(position); 
            var cell = grid.rows[row].cells[col];
            cell.setAttribute('mine', 'true');
            if (testMode) {
                cell.innerHTML = 'X';
            }
        }
    }
}
/**
 * @function revealMines hace visibles las minas al final del juego
 */
function revealMines() {
    for (var i = 0; i < 10; i++){
        for (var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j]
            if (cell.getAttribute('mine') == "true"){
                cell.className = 'mine'
            }
        }
    }
}
/**
 * @function checkGameCompleted revisa si el usario ha encontrado todos los huecos en blanco y por tanto a ganado el juego
 * @var gameCompleted boolean inicializado en true, cambia si alguna celda sin mina esta en blanco
 */
function checkGameCompleted() {
    var gameCompleted = true
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute('mine') == 'false') && (grid.rows[i].cells[j].innerHTML == '')){
                gameCompleted = false
            }
        }
    }
    if (gameCompleted){
        alert("Congratulations, You've found all mines")
        revealMines()
    }
}
/**
 * @function init se vincula a cada celda y se encarga de comprobar si la celda es una mina o esta vacía.
 *      -Si la celda tiene mina acaba el juego,
 *      -Si la celda toca a una o más minas cambia de color y marca el numero de minas que toca
 *      -Si la celda no toca ninguna mina, activa @function init en las celdas alrededor de la misa
 * @param {*} cell el parametro de entra es una celda del tablero, es decir, un td ya existente en la tabla
 * @returns si el juego esta inactivo entre partida y partida la función acaba sin hacer nada
 * @var mineCount almacena el número de minas alrededor de la celda
 * @var cellRow almacena la fila a la que pertenece la celda
 * @var cellCol almacena la columna a la que pertenece la celda
 */
function init(cell){
    if(lockGame){
        return
    } else {
        if(cell.getAttribute('mine') == 'true'){
            revealMines()
            lockGame = true
        } else {
            cell.className = 'active'
            var mineCount = 0
            var cellRow = cell.parentNode.rowIndex
            var cellCol = cell.cellIndex
            for (var i = Math.max(cellRow-1, 0); i <= Math.min(cellRow +1, 9); i++ ){
                for (var j = Math.max(cellCol-1, 0); j <= Math.min(cellCol +1, 9); j++ ){
                    if(grid.rows[i].cells[j].getAttribute('mine') == 'true'){
                        mineCount++
                    }
                }
            }
            cell.innerHTML = mineCount
            if(mineCount == 0){
                for (var i = Math.max(cellRow-1, 0); i <= Math.min(cellRow +1, 9); i++ ){
                    for (var j = Math.max(cellCol-1, 0); j <= Math.min(cellCol +1, 9); j++ ){
                        if(grid.rows[i].cells[j].innerHTML == ""){
                            init(grid.rows[i].cells[j])
                        }
                    }
                }
            }
            checkGameCompleted()
        }
    }
}