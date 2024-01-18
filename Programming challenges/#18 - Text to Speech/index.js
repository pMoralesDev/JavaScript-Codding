const textarea = document.querySelector("textarea")
const languageList = document.querySelector("select")
const speechBtn = document.querySelector("button")

let synth =  speechSynthesis
isSpeaking = true

languages()

function languages(){
    for(let language of synth.getVoices()){
        let selected = language.name === 'Google US English' ? 'selected' : ""
        let option = `<option value="${language.name}" ${selected}>${language.name} (${language.lang})</option>`
        languageList.insertAdjacentHTML("beforeend", option)
    }
}

synth.addEventListener("voiceschanged", languages)

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text)
    for(let language of synth.getVoices()){
        if(language.name === languageList.value){
            utterance.voice = voice
        }
    }
    synth.speak(utterance)
}

speechBtn.addEventListener('click', e => {
    e.preventDefault()
    if(textarea.value !== ""){
        /**
         * Comprobamos que haya algún texto para reproducir
         */
        if(!synth.speaking){
            textToSpeech(textarea.value)
        }
        /**
         * Si el texto es muy largo (más de 80 caracteres) añadimos una funcionalidad de pausa
         */
        if(textarea.value.length > 80){
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking=true
                    speechBtn.innerText = "Speech"
                }else{}
            },500)
            if(isSpeaking){
                synth.resume()
                isSpeaking=false
                speechBtn.innerText = "Stop"
            } else {
                synth.pause()
                isSpeaking=true
                speechBtn.innerText = "Speech"
            }
        }else {
            speechBtn.innerText = "Speech"
        }
    }
})