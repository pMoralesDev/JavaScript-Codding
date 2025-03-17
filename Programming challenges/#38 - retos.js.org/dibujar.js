function dibujar(number) {
    let aux = 0;
    let result = new Array;
    while (aux < number) {
        let aux2 = new Array;
        for (let i = 0; i < number; i++) {
            if (aux == 0 || aux == number - 1 || i == 0 || i == number - 1) {
                aux2.push('*');
            } else {
            aux2.push(' ');
            }
        }
        result.push(aux2);
        aux++;
    }
    return result;
}

console.log(dibujar(5)); 
