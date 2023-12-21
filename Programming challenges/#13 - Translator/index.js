/**
 * @param fromText
 * @param toText
 * @param exchangeIcon
 * @param selectTag
 * @param icons
 * @param translateBtn
 */
const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const exchangeIcon = document.querySelector(".exchange")
const selectTag = document.querySelectorAll("select")
const icons = document.querySelectorAll(".row i")
const translateBtn = document.querySelector("button")
/**
 * Cargamos los idiomas dentro de los select de la página a partir de la información guardada en la clase countries
 */
selectTag.forEach((tag,id) => {
    for(let country_code in countries){
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "es-ES" ? "selected" : ""
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
})
/**
 * Cargamos la funcionalidad del botón para cambiar de idioma. En esencia intercambia los valores del idioma de la derecha con el de la izquierda
 */
exchangeIcon.addEventListener('click', () => {
    let tempText = fromText.value
    let tempLang = selectTag[0].value
    fromText.value = toText.value
    toText.value = tempText
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
})

fromText.addEventListener("keyup", () => {
    if(!fromText.value){
        toText.value = ""
    }
})
/**
 * Cargamos la funcionalidad del botón de traducir.
 */
translateBtn.addEventListener('click', () => {
    let text = fromText.value.trim()
        originLanguage = selectTag[0] .value
        finalLanguage = selectTag[1].value
    /**
     * Comprobamos que hay algún texto en el textarea. De no ser así terminamos la funcionalidad
     */
    if (!text){
        return
    }
    toText.setAttribute("placeholder", "Translating...")
    /**
     * API
     */
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${originLanguage}|${finalLanguage}`
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText
        data.matches.forEach(data => {          
            if(data.id === 0){
                toText.value = data.translation
            }
        })
        toText.setAttribute("placeholder", "No tranlation...")
    })
})

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if(!fromText.value || !toText.value){
            return
        }
        /**
         * Cargando la funcionalidad del boton copiar. 
         */
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            /**
             * Cargamos la funcionalidad para escuchar el texto escrito por el usuario
             */
            let utterance
            if(target.id == 'from'){
                utterance = new SpeechSynthesisUtterance (fromText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance (fromText.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})