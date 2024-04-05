const pickerBtn = document.getElementById('#picker-btn'),
clearBtn = document.getElementById('#clear-btn'),
colorList = document.querySelector('.all-colors'),
exportBtn = document.getElementById('#export-btn')

let pickedColors = JSON.parse(localStorage.getItem('colorList')) || []

let currentPopup = null

const copyToClipBoard = async (text, element) => {
    try{
        await navigator.clipboard.writeText(text)
        element.innerText = 'Colors have been copied!'
        setTimeout(() =>  {
            element.innerText = text
        }, 1000)
    } catch (error) {
        alert('There was a problem in the copy')
    }
}

const exportColors = () => {
    const colorText = pickedColors.join('\n'),
    blob = new Blob([colorText],{type: 'text/plain'}),
    url = URL.createObjectURL(blob),
    a = document.createElement('a')

    a.href = url
    a.download = 'Colors.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

const createColorPopup = () => {
    const popup = document.createElement('div')
    popup.classList.add('color-popup')
    popup.innerHTML= `
        <div class="color-popup-content">
            <span class="close-popup">x</span>
            <div class="color-info">
                <div class="color-info" style="background: ${color}"></div>
                <div class="color-details">
                    <div class="color-value">
                        <span class="label">Hex:</span>
                        <span class="value hex" data-color="${color}>${color}</span>
                    </div>
                    <div class="color-value">
                        <span class="label">RGB:</span>
                        <span class="value rgb" data-color="${color}>${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>
    `
    const closePopup = popup.querySelector('.close-popup')
    closePopup.addEventeListener('click', () => {
        document.body.removeChild(popup)
        currentPopup = null
    })

    const colorValues = popup.querySelectorAll('.value')
    colorValues.forEach((value) => {
        value.addEventListener('click', (e) => {
            const text = e.currentTarget.innerText
            copyToClipBoard(text, e.currentTarget)
        })
    })

    return popup
}

const showColors = () => {
    
}