const chronometer = document.getElementsByClassName("input-timer")

const {timer} = rxjs
const {map} = rxjs.operators

timer(1000, 1000).pipe(map(()=>{
    const ahora = new Date()
    return ahora.toLocaleString()
})).subscribe(valor=>{
    chronometer.innerText = valor
})