let container = document.querySelector(".container")
let gridButton = document.getElementById("submit-grid")
let clearGridButton = document.getElementById("clear-grid")
let gridWidth = document.getElementById("width-range")
let gridHeight = document.getElementById("height-range")
let colorButton = document.getElementById("color-input")
let eraseBtn = document.getElementById("erase-btn")
let paintBtn = document.getElementById("paint-btn")
let widthValeu = document.getElementById("width-value")
let heightValeu = document.getElementById("height-value")

/**Definición de los eventos que van a iniciar la acción del código.
 * Los nombres de los eventos (mousedown, mouseenter, mouseleave...) son fijos por lo que hay que saberselos o buscarlos.
 * touch: para funciones táctiles.               */
let events ={
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
}
/**Para almacenar el tipo de evento en cada momento ("touch" o "mouse") */
let deviceType = ""
/**Para almacenar en cada momento si esta activado pintar, borrar o ambos */
let draw = false
let erase = false
/**Método para detectar si se esta usando raton o tactil */
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    } 
};
isTouchDevice()
/**Método para crear la cuadrícula, añadiendo un evento en el botón correspondiente. 
 * Para ello se usan dos for, uno para la altura y otro para el ancho.      */
gridButton.addEventListener("click", () => {
    container.innerHTML = ""
    let count = 0
    for(let i=0; i < gridHeight.value; i++){
        count+=1
        let row = document.createElement("div")
        row.classList.add("gridRow")
        for(let j=0; j < gridWidth.value;j++){
            count+=1
            let col = document.createElement("div")
            col.classList.add("gridCol")
            col.setAttribute("id", `gridCol${count}`)
            /**Creamos el método para pintar la cuadricula. Para ello creamos tres evento por cada
             * cuadrícula, un evento por cada tipo evento definido arriba (down, move, up).
             * En el evento down (pulsar, hacer click sin soltar) comprobamos si tenemos activado borrar, 
             * activamos pintar y cargamos el color, transparente para borrar 
             * y el valor del color elegido para pintar         */
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            })
            /**En el evento move (mantener pulsado el ratón) actualizamos los valores de las celdas a medida
             * que se va moviendo el cursor             */
            col.addEventListener(events[deviceType].move, (e) => {
                /**Método para actualizar el valor de la celda (.gridCol) que queremos pintar 
                 * en cada momento cuando esta activo el evento move           */
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            })
            /**En el evento up(soltar) desactivamos pintar */
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            })
            /**Con el método appendChild() incluimos nuestros elementos creados en el padre */
            row.appendChild(col)
        }
        container.appendChild(row)
    }
})
/**Función para pintar las celdas a medida que movemos el ratón */
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol")
    gridColumns.forEach((element)=>{
        if(elementId == element.id){
            if (draw && !erase){
                element.style.backgroundColor = colorButton.value
            }else if (draw && erase){
                element.style.backgroundColor = "transparent"
            }
        }
    })
}
/**Configuramos el botón para borrar la cuadricula borrando el contenido del .container */
clearGridButton.addEventListener("click", () => {
    container.innerHTML = ""
})
/**Configuramos el botón para borrar cambiando el valor de la variable borrar */
eraseBtn.addEventListener("click", () => {
    erase = true
})
/**Configuramos el botón para borrar cambiando el valor de la variable borrar */
paintBtn.addEventListener("click", () => {
    erase = false
})
/**Configuramos el input del ancho para que actualice automáticamente el valor de este que aparece en pantalla */
gridWidth.addEventListener("input", () => {
    widthValeu.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value
})
/**Configuramos el input del alto para que actualice automáticamente el valor de este que aparece en pantalla */
gridHeight.addEventListener("input", () => {
    heightValeu.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value
})
/**Cargamos los valores de alto y ancho a 0 al iniciar la ventana*/
window.onload = () => {
    gridHeight.value = 0
    gridWidth.value = 0
}