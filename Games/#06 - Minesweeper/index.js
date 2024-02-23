/**
 * @param grid es el tablero de juego donde aplicamos la funcionalidad
 * @param testMode se activa para poder ver las minas antes de hacer click
 * @param lockGame 
 */
const grid = document.getElementById('grid')
testMode = false
let lockGame = false
generateGrid()
/**
 * @function generateGrid inicializa el juego pintando el tablero y agregando la funcionalidad a cada celda
 * @param mine atributo creado para dar funcionalidad de mina a una celda
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

function generateMines() {
    for(var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)
        var cell = grid.rows[row].cells[col]
        cell.setAttribute('mine', 'true')
        if(testMode){
            cell.innerHTML = 'X'
        }
    }
}

function revealMines() {
    for (var i = 0; i < 10; i++){
        for (var j = 0; j<10; j++){
            var cell = grid.rows[i].cells[j]
            if (cell.getAttribute('mine') == "true"){
                cell.className = 'mine'
            }
        }
    }
}

function chaeckGameCompleted() {
    var gameCompleted = true
    for (var i = 0; i < 10; i++ ){
        for(var j; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute('mine') == 'false') && (grid.rows[i].cells[j].innerHTML == '')){
                gameCompleted = false
            }
        }
    }
    if (gameCompleted){
        alert("Game Over, You've found all mines")
        revealMines()
    }
}

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
            for (var i = Math.max(celRow-1, 0); i <= Math.min(cellRow +1, 9); i++ ){
                for (var j = Math.max(celCol-1, 0); j <= Math.min(cellCol +1, 9); j++ ){
                    if(grid.rows[i].cells[j].getAttribute('mine') == 'true'){
                        mineCount++
                    }
                }
            }
            cell.innerHTML = mineCount
            if(mineCount == 0){
                for (var i = Math.max(celRow-1, 0); i <= Math.min(cellRow +1, 9); i++ ){
                    for (var j = Math.max(celCol-1, 0); j <= Math.min(cellCol +1, 9); j++ ){
                        if(grid.rows[i].cells[j].innerHTML = ""){
                            init(grid.rows[i].cells[j])
                        }
                    }
                }
            }
            chaeckGameCompleted()
        }
    }
}