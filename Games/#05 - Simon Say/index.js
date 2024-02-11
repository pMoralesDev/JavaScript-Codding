const scoreEl = document.getElementById("score"),
colorParts = document.querySelectorAll('.colors'),
containerEl = document.querySelector(".container"),
startBtn = document.getElementById('start-btn'),
resultEl = document.getElementById('score-result'),
wrapperEl = document.querySelector('.wrapper')

const colorObj = {
    color1: {current: '#007000', focus: '#00cc00'},
    color2: {current: '#690202', focus: '#cf0202'},
    color3: {current: '#012c50', focus: '#047cdf'},
    color4: {current: '#979702', focus: '#e7e703'}
}

let randomColors = []
let isPathGenerating = false
let score = 0
let clickCount = 0
/**
 * 
 * @param {*} colorObj 
 * @returns un color aleatorio de entre los proporcionados 
 */
const getRandomColor = (colorObj) => {
    const colorKeys = Object.keys(colorObj)
    return colorKeys[Math.floor(Math.random()*colorKeys.length)]
}
/**
 * 
 * @param {*} time 
 * @returns 
 */
const delay  = async (time) => {
    return await new Promise((resolve) => setTimeout(resolve, time))
}
/**
 * 
 */
const generateRandomPath = async () => {
    randomColors.push(getRandomColor(colorObj))
    score = randomColors.length
    isPathGenerating = true
    await showPath(randomColors)
}
/**
 * 
 * @param {*} colors 
 */
const showPath = async (colors) => {
    scoreEl.innerText = score
    for(let color of colors){
        const currentColor = document.querySelector(`.${color}`)
        await delay(500)
        currentColor.style.backgroundColor = colorObj[color].focus
        await delay(600)
        currentColor.style.backgroundColor = colorObj[color].current
        await delay(600)
    }
    isPathGenerating = false
}
/**
 * 
 */
const endGame = () => {
    resultEl.innerText = `Your score: ${score}`
    resultEl.classList.remove('hide')
    wrapperEl.classList.add('hide')
    startBtn.innerText = 'Play again'
    startBtn.classList.remove('hide')
    containerEl.classList.remove('hide')

}
/**
 * 
 */
const resetGame = () => {
    score = 0
    clickCount = 0
    randomColors = []
    isPathGenerating = false
    wrapperEl.classList.remove('hide')
    containerEl.classList.add('hide')
    generateRandomPath()
}
/**
 * 
 * @param {*} e 
 * @returns 
 */
const handleColorClick = async (e) => {
    if (isPathGenerating){
        return false
    }
    if (e.target.classList.contains(randomColors[clickCount])){
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].focus
        await delay(600)
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current
        clickCount++
        if(clickCount === score){
            clickCount = 0
            generateRandomPath()
        }
    } else {
        endGame()
    }
}

startBtn.addEventListener('click', resetGame)
colorParts.forEach((color) => {
    color.addEventListener('click', handleColorClick)
})