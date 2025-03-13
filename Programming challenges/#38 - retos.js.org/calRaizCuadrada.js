function calRaizCuadrada(numero) {
    if (numero < 0) return NaN;
    let x = numero;
    let y = 1;
    let e = 0.000001;

    while (x - y > e) {
        x = (x + y) / 2;
        y = numero / x;
    }

    return x.toFixed(2);
}

console.log(calRaizCuadrada(25));
console.log(calRaizCuadrada(20));