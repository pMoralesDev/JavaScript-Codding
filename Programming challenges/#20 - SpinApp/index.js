/**
 * @param wheel canvas donde se visualiza la ruleta
 * @param spinBtn boton al que vamos a agregar la funcionalidad para inciar la ruleta
 * @param finalValue elemento donde vamos a visualizar el resutlado
 */
const wheel = document.getElementById("wheel"),
spinBtn = document.getElementById("spin-btn"),
finalValue = document.getElementById('final-value')

/**
 * @param rotationValues Valores correspondientes al máximo y al mínimo angulo en función del valor. 
 * Estos valores son los que permiten asignar un número al espacio dentro de la ruleta.
 */
const rotationValues = [
    { minDegree: 0, maxDegree: 60, value: 2 },
    { minDegree: 61, maxDegree: 120, value: 1 },
    { minDegree: 121, maxDegree: 180, value: 6 },
    { minDegree: 181, maxDegree: 240, value: 5 },
    { minDegree: 241, maxDegree: 300, value: 4 },
    { minDegree: 301, maxDegree: 360, value: 3 }
];

/**
 * @param data Tamaño de las porciones dentro de la ruleta 
 */
const data = [16,16,16,16,16,16]

/**
 * @param pieColors Color de fondo de las porciones 
 */
var pieColors = [
    "#1FD6FF",
    "#1F16FF",
    "#1FD6FF",
    "#1F16FF",
    "#1FD6FF",
    "#1F16FF",
];

/**
 * @param myChart Objeto de la librería "pie chart" que permite pintar la ruletaEn.
 * En este caso he usado esta libreria, otra opción hubiera sido crear nuestras propias funcionalidades 
 */
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

/**
 * @function showValue usamos esta función para mostrar el el resultado de la ruleta
 */
const showValue = (angleValue) => {
    for (let i of rotationValues){
        if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
            finalValue.innerHTML = `<p>Value: ${i.value}</p>`
            spinBtn.disabled = false
            break
        }
    }
}

/**
 * @param spinCount Contador de giros de la ruleta
 */
let spinCount = 0

/**Establecemos 200 rotaciones para la animación y en la última cojemos el resultado */
let resultValue = 201

/**
 * Agregamos la funcionalidad al botón para inicia con la funcionalidad de la aplicación 
 */
spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true
    finalValue.innerHTML = `<p>Good Luck!</p>`
    /**
     * @param randomDegree Generamos un angulo aleatorio para poder asignar, de este modo, un resulado numérico aleatorio 
     */
    let randomDegree = Math.floor(Math.random()*360)
    /**Establecemos un intervalo dentro del cual la ruleta gira */
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue
        myChart.update()
        /**Dado que superar 360 es más de una vuelta, en este caso lo reiniciamos a 0 */
        if(myChart.options.rotation >=360){
            spinCount+=1
            resultValue-=5
            myChart.options.rotation = 0
        } else if (spinCount > 15 && myChart.options.rotation == randomDegree) {
            showValue(randomDegree)
            clearInterval(rotationInterval)
            count = 0
            resultValue = 201
        }
    }, 10)
})