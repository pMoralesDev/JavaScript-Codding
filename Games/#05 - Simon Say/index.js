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

