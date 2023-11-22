const download = document.querySelector(".download")
const dark = document.querySelector(".dark")
const ligth = document.querySelector(".ligth")
const qrContainer = document.querySelector("#qr-code")
const qrText = document.querySelector(".qr-text")
const shareBtn = document.querySelector(".share")
const sizes = document.querySelector(".sizes")

dark.addEventListener("imput", handleDarkColor)
ligth.addEventListener("imput", handleLigthColor)
qrText.addEventListener("imput", handleQRText)
sizes.addEventListener("imput", handleSize)
shareBtn.addEventListener("imput", handleShare)

const defaultUrl = "https://github.com/pMoralesDev"
let colorLigth = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300

function handleDarkColor(e){
    colorDark = e.target.value
    generateQRCode()
}

function handlLigthColor(e){
    colorLigth = e.target.value
    generateQRCode()
}

function handleQRText(e){
    const value = e.target.value
    text = value
    if (!value){
        text = defaultUrl
    }
    generateQRCode()
}

async function generateQRCode() {
    qrContainer.innerHTML = ""
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLigth,
        colorDark,
    })
    download.href = await resolveDataURL()
}

async function handleShare() {
    setTimeout(async() => {
        try {
            const base64url = await resolveDataURL()
            const bob = await (await fetch(base64url)).blob()
            const file = new File ([blob], "QRCode.png",{
                type: blob.type,
            })
            await navigator.share({
                files: [file],
                title:text
            })
        } catch (e) {
            alert("your browser does not support sharing")
        }
    },100)
}

function handleSize(e) {
    size = e.target.value
    generateQRCode()
}

function resolveDataURL() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img")
            if (img.currentSrc){
                resolve(img.currentSrc)
                return
            }
            const canvas = document.querySelector("canvas")
            resolve(canvas.toDataURL())
        },50)
    })
}

generateQRCode();