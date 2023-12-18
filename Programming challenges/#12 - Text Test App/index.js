/**
 * API para sacar textos random
 */
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100"
const quoteSection = document.getElementById("quote")
const userInput = document.getElementById("quote-input")

let quote = ""
let time = 60
let timer = ""
let mistakes = 0

/**
 * display random quotes
 */
const renderNewQuote = async () => {
    /**
     * fetch content from quote api url
     */
    const response = await fetch(quoteApiUrl)
    let data = await response.json()
    quote = data.content
    /**
     * Array of  chars in quote
     */
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>"+value+"</span>"
    })
    quoteSection.innerHTML += arr.join("")
}

/**
 * Funcion para comprobar que lo que escribimos coincide
 */
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars")
    quoteChars = Array.from(quoteChars)
    /**
     * Array para almacenar lo que va escribiendo el usuario
     */
    let userInputChars = userInput.value.split("")
    /**
     * Loop throug each char in quote
     */
    quoteChars.forEach((char, index) => {
        /**
         * Check Chars with quote  chars
         */
        if(char.innerText == userInputChars[index]){
            char.classList.add("success")
        }
        /**
         * Checkemos si ha puesto un espacio en blanco  o nada
         */
        else if(userInputChars[index]==null){
            if(char.classList.contains("success")){
                char.classList.remove("success")
            }else{
                char.classList.remove("fail")
            }
        }
        /**
         * Checkamos si se equiboca al escribir
         */
        else {
            if(!char.classList.contains("fail")){
                /**
                 * Controlamos el cambio en los contadores
                 */
                mistakes++
                char.classList.add("fail")
            }
            document.getElementById("mistakes").innerHTML = mistakes
        }
        /**
         * Return true if all chars are correct
         */
        let check = quoteChars.every((element) => {
            return element.classList.contains("success")
        })
        /**
         * Terminamos la prueba si todo está bien
         */
        if(check){
            displayResult()

        }
    })
})

/**
 * Función para actualizar el tiempo que queda para acabar la prueba
 */
function updateTimer(){
    if(time == 0){
        /**
         * Acabar la prueba si llega a 0
         */
        displayResult()
    }else{
        document.getElementById("timer").innerHTML = --time + "s"
    }
}

/**
 * Set timer
 */
const timeReduce = () => {
    time = 60
    timer = setInterval(updateTimer, 1000)
}

/**
 * Terminar la prueba
 */
const displayResult = () => {
    /**
     * Display result div
     */
    document.querySelector(".result").style.display = "block"
    clearInterval(timer)
    document.getElementById("stop-test").style.display = "none"
    userInput.disable = true
    let timeTaken = 1
    if(time != 0){
        timeTaken = (60-time) / 100
    }
    document.getElementById("speed").innerText = (userInput.value.length / 5 /timeTaken).toFixed(2)+"wpm"
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length-mistakes)/userInput.value.length)*100) + "%"
}

/**
 * Start test
 */
const startTest = () => {
    mistakes = 0;
    timer = ""
    userInput.disable = false
    timeReduce()
    document.getElementById("start-test").style.display="none"
    document.getElementById("stop-test").style.display="block"
}

window.onload = () => {
    userInput.value = ""
    document.getElementById("start-test").style.display="block"
    document.getElementById("stop-test").style.display="none"
    userInput.disable = true
    renderNewQuote()
}