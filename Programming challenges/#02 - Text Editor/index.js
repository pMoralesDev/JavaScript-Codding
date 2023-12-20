/**
 * @param optionsButtons referencia a todos los botenes presentes en la interfaz
 * @param advancedOptionsButtons referencia a todos los elementos con opciones multiples de elección de efectos paa el texto
 * @param fontName referencia directamente al elemento que configura las fuentes del texto
 * @param fontSizeRef referencia directamente al elemento que configura el tamaño del texto
 * @param writingArea refencia al area donde escribe el usuario dentro de la apliación
 * @param linkButton referencia directamente al botón que permite incluir un enlace en el texto
 * @param alignButtons referencia a los botones que confiugran la alineación del texto (derecha, izquierda, justificado y centrado)
 * @param spacingButtons referencia a los botones que configuran el espacio en las listas
 * @param formatButtons referencia a los botones que configuran el formato del texto (negrita, cursiva...)
 * @param scriptButtons refencia a los botones que configuran el superindice y subindice
 */
let optionsButtons = document.querySelectorAll(".option-button")
let advancedOptionsButtons = document.querySelectorAll(".adv-option-button")
let fontName = document.getElementById("fontName")
let fontSizeRef = document.getElementById("fontSize")
let writingArea = document.getElementById("text-input")
let linkButton = document.getElementById("createLink")
let alignButtons = document.querySelectorAll(".align")
let spacingButtons = document.querySelectorAll(".spacing")
let formatButtons = document.querySelectorAll(".format")
let scriptButtons = document.querySelectorAll(".script")
/**
 * @param fontList lista de fuentes que va a usar la aplicación
 */
let fontList = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Cursive"
]
/**
 * @function intializer función encargada de arranzar la apliación al cargar la página
 */
const intializer = () => {
    highLighter(alignButtons, true)
    highLighter(spacingButtons, true)
    highLighter(formatButtons, false)
    highLighter(scriptButtons, true)
    /**
     * Utilizamos la función map para convertir los elementos del array fontList en elementos option de html que puedan ser visualizados dentro del elemento select
     * Con la función appendChild agregamos los elementos option creados al elemento select que permite elegir fuentes de texto
     */
    fontList.map((value) => {
        let option = document.createElement('option')
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })
    /**
     * Con un bucle for creamos 7 elementos option correspondientes a tamaños de fuente diferentes y los cargamos en el elemento select correspondiente con la función appendChild
     */
    for(let i = 1; i <=7; i++) {
        let option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        fontSizeRef.appendChild(option)
    }
    /**
     * Cargamos un tamaño de fuente por defecto
     */
    fontSizeRef.value = 3
}
/**
 * @function modifyText emplea el método execCommand, aunque este método esta calificado como obsoleto para esta aplicación funciona bien. Se trata de la función principal que
 * permite modificar el texto que escribe el usuario
 * @param {*} command comando que se va a ejecutar sobre el contenido editable, los id de los elementos se corresponden con comandos
 * @param {*} defaultUi boleano para indicar si debe de afectar a la interfaz de usuario
 * @param {*} value valor adicional necesario para cargar el la familia de la funte, el tamaño de texto o el link a enlazar.
 */
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value)
}
/**
 * Cargamos las funcionalidades de modificar texto sobre los elementos button de la interfaz
 */
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null)
    })
})
/**
 * Cargamos las funcionalidades de moficar texto sobre los elementos con la clase adv-option-button de la interfaz
 */
advancedOptionsButtons.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value)
    })
})
/**
 * Cargamos la funcionalidad de modificar texto sobre el boton para insertar enlaces en el texto
 */
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL")
    /**
     * Verificamos si la información introducida por el usuario se corresponde con una url.
     * Se utiliza una expresión regular (/http/i) para verificar si la URL ingresada por el usuario contiene "http".
     * La "i" al final de la expresión regular indica que la búsqueda no es sensible a mayúsculas o minúsculas.
     */
    if (/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink)
    } else {
        userLink = "http://" + userLink
        modifyText(linkButton.id, false, userLink)
    }
})
/**
 * @function highLighter carga las funcionalidades de diferentes elementos con funcionalidades para modificar el texto escrito por el usuario
 * @param {*} className clase sobre la que la aplicamos la funcionalidad
 * @param {*} needsRemoval variable booleana para manejar si hemos de desmarcar elementos antes de resaltar uno nuevo
 */
const highLighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false
                if(button.classList.contains("active")){
                    alreadyActive = true
                }
                highLighterRemover(className)
                if(!alreadyActive){
                    button.classList.add("active")
                }
            }else{
                button.classList.toggle("active")
            }
        })
    })
}
/**
 * @function highLighterRemover se encarga de desmarcar (quitar la clase "active") todos los elementos de la clase
 * @param {*} className clase sobre la que aplicar la funcionalidad
 */
const highLighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active")
    })
}
/**
 * Comando para inicializar la aplicación
 */
window.onload = intializer()

