/**
 * @param heads contador para el número de veces que sale cara
 * @param tails contador para el numero de veces que sale cruz
 * @param coin varaiable para configurar el giro de la moneda
 * @param flipBtn varaiable para configurar la acción del boton flip
 * @param resetBtn varaable para configurar la acción del boton reset
 */
let heads = 0
let tails = 0
let coin = document.querySelector(".coin")
let flipBtn = document.querySelector("#flip-btn")
let resetBtn = document.querySelector("#reset-btn")
/**
 * @description configuración de la acción del boton flip. Se guarda en una variable un resultado aleatorio y en función del 
 * resultado se llama a la animación de cara o cruz. Seguidamente se actualizan los contadores y dado que la animación tarda
 * 3 segundos en completar se hace un setTimout() para que se actualicen los stats a los 3 segundos. Finalmente se llama a la 
 * función disableButton para impedir que se active otra vez la moneda antes de que termine la animación. 
 */
flipBtn.addEventListener("click", () => {
    let i = Math.floor(Math.random()*2)
    coin.style.animation = "none"
    if (i){
        setTimeout(function(){
            coin.style.animation = "spin-heads 3s forwards"
        },100)
        heads++
    }else{
        setTimeout(function(){
            coin.style.animation = "spin-tails 3s forwards"
        },100)
        tails++
    }
    setTimeout(updateStats, 3000)
    disableButton()
})
/**
 * @function updateStats función para actualizar los valores de caras y cruces según vayan saliendo
 */
function updateStats() {
    document.querySelector("#heads-count").textContent=`Heads: ${heads}`
    document.querySelector("#tails-count").textContent=`Tails: ${tails}`
}
/**
 * @function disableButton función para impedir que se vuelva a usar el botón flip mientras gira la moneda
 */
function disableButton() {
    flipBtn.disabled = true
    setTimeout(function(){
        flipBtn.disabled =false
    },3000)
}
/**
 * @description configuración de la acción del botón reset, se inicializan a 0 los contadores, se quita el estilo de la sección coin y 
 * se llama a la función updateStats()
 */
resetBtn.addEventListener("click", () => {
    coin.style.animation="none"
    heads=0
    tails=0
    updateStats()
})