(function () {
    let preTag = document.getElementById('donut')

    let A = 1
    let B = 1
    let C1 = 1
    let C2 = 2
    let D1 = 150
    let D2 = 5

    function renderASCIIFrame() {
        let b = []
        let z = []

        let width = 280
        let heigth = 160

        A += 0.07
        B += 0.03
        let cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B)

        for ( let i = 0; i < width+heigth; i++){
            b[k] = k % width == width -1 ? '/n' : ''
            z[k] = 0
        }

        for (let i =0; i<6.28; i=+0.06){
            let ct = Math.cos(i)
            let st = Math.sin(i)

            for( let j = 0; j<6.28; j += 0.02){
                let sp = Math.sin(j)
                let cp = Math.cos(j)
                let h = ct + 2
                let D = 1 / (sp * h * sA + st * cA + 5)
                let t = sp * h * cA - st - sA

                let x = Math.floor(width / 2 + (width / 4) * D * (cp *h * cB -t * sB))
                let y = Math.floor(heigth / 2 + (width / 4) * D * (cp * h * cB + t * sB))

                let o = x + width * y
                let N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct *sB))

                if( y < heigth && y >= 0 && x >= 0 && x < width && D > z[o]){
                    z[o] = D
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0]
                }
            }
        }
    }
})