const btn = document.getElementById("btn")
const shapes = [
    "square-circle-1",
    "square-circle-2",
    "square-circle-3",
    "square-circle-4",
    "triangle-1",
    "triangle-2",
    "triangle-3",
    "triangle-4",
    "circle",
]

const colors = ["#1345fc","#ab4325","#987da1","#453e5c"]
const boxes = document.querySelectorAll(".container div")

let generatePatern = () => {
    boxes.forEach((box) => {
        box.setAttribute('class','')
        let i = Math.floor(Math.random()*shapes.length)
        let j = Math.floor(Math.random()*colors.length)
        box.classList.add(shapes[i])
        box.style.backgroundColor = colors[j]
    })
}

btn.addEventListener("click", generatePatern)
window.addEventListener("load", generatePatern)