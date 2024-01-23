const wrapper = document.querySelector(".wrapper"),
form = document.querySelector('form'),
fileInput = document.querySelector('input'),
infoText = document.querySelector('p'),
closeBtn = document.querySelector('.close'),
copyBtn = document.querySelector('.copy')
/**
 * @function fetchRequest encargada de buscar los datos solicitados en la API
 * @param {*} file arichivo con el código QR que sube el usuario
 * @param {*} formData 
 */
function fetchRequest(file, formData){
    infoText.innerText = 'Scanning QR code...'
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data
        infoText.innerText = result ? 'Upload QR code to scan' : 'Cannot scan QR code'
        if(!result){
            return
        }
        document.querySelector('textarea').innerText=result
        form.querySelector('img').src = URL.createObjectURL(file)
        wrapper.classList.add('active')
    }).catch(() => {
        infoText.innerText = "Cannot scan QR code "
    })
}
/**
 * Enviamos el archivo con el QR junto con la solicitud a la API
 */
fileInput.addEventListener('change', async e => {
    let file = e.target.files[0]
    if(!file){
        return
    }
    let formData = new FormData()
    formData.append('file', file)
    fetchRequest(file, formData)
})
/**
 * Funcionalidad del botón copiar
 */
copyBtn.addEventListener('click', () => {
    let text = document.querySelector('textarea').textContent
    navigator.clipboard.writeText(text)
})
/**
 * Funcionalidad para que salte el selector de archivos cuando el usario hace click en el formulario
 */
form.addEventListener('click', () => fileInput.click())
/**
 * Funcionalidad del botón cerrar
 */
closeBtn.addEventListener('click', wrapper.classList.remove('active'))
