const inputs = document.querySelector(".word"),
    hintTag = document.querySelector('.hint span'),
    guessLeft = document.querySelector('.guess span'),
    mistakes = document.querySelector('.wrong span'),
    resetBtn = document.querySelector('.reset'),
    hintBtn = document.querySelector('.showhint'),
    hintElement = document.querySelector('.hint'),
    typeInput = document.querySelector('.type-input')

/**
 * Inicializamos las variables del juego
 */
let word, incorrectLeters = [], correctLetters =[], maxGuesses
/**
 * @function startNewGame iniciamos las funcionalidadesd el juego
 */
function startNewGame(){
    alert(`New Game is going to star!! Are you ready to guees the word?`)
    /**
     * Ocultamos el elemento pista
     */
    hintElement.style.display='none'
    hintElement.style.opacity='0'
    /**
     * Seleccionamos una palabra al azar de la lista.
     * Asignamos un número de intentos en función del tamaño de la palabra
     */
    const randomWord = wordList[Math.floor(Math.random()*wordList.length)]
    word = randomWord.word
    maxGuesses = word.length >= 5 ? 8 : 6
    incorrectLeters = []
    correctLetters = []
    hintTag.innerText = randomWord.hint
    guessLeft.innerText = maxGuesses
    mistakes.innerText = incorrectLeters
    /**
     * Creamos un elemento input por cada letra de la palabra
     */
    inputs.innerHTML=''
    for(let i=0; i<word.length; i++){
        let input = document.createElement('input')
        input.type = 'text'
        input.disabled = 'true'
        inputs.appendChild(input)
    }
}
/**
 * Controlamos cuando el usuario introduce letras para intentar adivinar la palabra
 */
function handleInput(e){
    /**
     * Ignoramos los input introducidos que no son letras y aquellas letras que ya se han introducido
     */
    const key = e.target.value.toLowerCase()
    if(key.match(/^[a-z]+$/i) && !incorrectLeters.includes(`&{key}`) && !correctLetters.includes(`{key}`)) {
        if(word.includes(key)){
            for (let i=0; i<word.length; i++){
                inputs.querySelectorAll("input")[i].value += key
            }
        }
        correctLetters += key
    } else {
        /**
         * En caso de que no se haya acertado, actualizamos los errores
         */
        maxGuesses--
        incorrectLeters.push(`${key}`)
        mistakes.innerText = incorrectLeters
    }
    /**
     * Actualizamos los intentos para adivinar y comprobamos las condiciones de victoria y derrota
     */
    guessLeft.innerText = maxGuesses
    if(correctLetters.length === word.length){
        alert(`Congrats! You've guessed the word ${word.toUpperCase()}`)
        startNewGame()
    } else if (maxGuesses < 1) {
        alert(`Game Over! You haven't guessed the word, it's ${word.toUpperCase()}`)
        for (let i=0; i<word.length; i++){
            /**
             * Rellenamos los huecos vacios con las letras correctas
             */
            let input = document.createElement('input')[i].value = word[i]
        }
    }
    /**
     * Limpiamos los inputs para que se pueda reiniciar el juego
     */
    typeInput.value = ''
}
/**
 * Mostramos las pistas
 */
function showHintElement(){
    hintElement.style.display = 'block'
    hintElement.style.opacity = '1'
}

/**
 * Cargamos las funcionalidades en los botones correspondientes
 */
resetBtn.addEventListener('click', startNewGame)
hintBtn.addEventListener('click', showHintElement)
typeInput.addEventListener('input', handleInput)
inputs.addEventListener('click', () => typeInput.focus())
document.addEventListener('keydown', () => typeInput.focus())

startNewGame()