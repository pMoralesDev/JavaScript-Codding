const wheel = document.getElementById("wheel"),
spinBtn = document.getElementById("spin-btn"),
finalValue = document.getElementById('final-value')

/**Valores correspondientes al máximo y al mínimo angulo en función del valor */
const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
];

/**Tamaño de las porciones */
const data = [16,16,16,16,16,16]

/**Color de fondo de las porciones */
var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

/**En este caso he usado la librería "pie chart" para el uso de la ruleta, también se puede crear una */
let myChart = new Chart (wheel, {
    /**Mostramos el texto en la libreria "pie Chart" */
    plugins: [ChartDataLabels],
    type: 'pie',
    data: {
        /**Introducimos el valor de los caracteres */
        labels: [1,2,3,4,5,6],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        /**Diseño responsive para la ruleta */
        responsive: true,
        animation: {duration:0},
        plugins: {
            tooltip: false,
            legend:{
                display: false
            },
            /**Mostramos las etiquetas dentro de la ruleta */
            datalabels: {
                color: '#fff',
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: {size: 24},
            }
        }
    }
})

/**Mostramos el valor obtenido de manera aleatoria */
const valueGenerator = (angleValue) => {
    for (let i of rotationValues){
        if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
            finalValue.innerHTML = `<p>Value: ${i.value}`
            spinBtn.disabled = false
            break
        }
    }
}

/**Contador de giros */
let spinCount = 0

/**Establecemos 200 rotaciones para la animación y en la última cojemos el resultado */
let resultValue = 201

/**Agregamos la funcionalidad para que la ruleta de vueltas */
spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true
    finalValue.innerHTML = `<p>Good Luck!</p>`
    /**Generamos un angulo aleatorio para que pare */
    let randomDegree = Math.floor(Math.random()*360)
    /**Establecemos un intervalo dentro del cual la ruleta gira */
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue
        myChart.update()
        /**Dado que superar 360 es más de una vuelta, en este caso lo reiniciamos a 0 */
        if(myChart.options.rotation >=360){
            count+=1
            resultValue-=5
            myChart.options.rotation = 0
        } else if (count > 15 && myChart.options.rotate == randomDegree) {
            valueGenerator(randomDegree)
            clearInterval(rotationInterval)
            count = 0
            resultValue = 201
        }
    }, 10)
})