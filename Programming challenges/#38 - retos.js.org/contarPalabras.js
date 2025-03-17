function contarPalabras(frase,palabra){
    let contador = 0;
    let palabras = frase.split(/\W+/);
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].toLowerCase() === palabra.toLowerCase()) {
            contador++;
        }
    }
    return contador;
}

console.log(contarPalabras("Aqui hay varias palabras: palabra, palabra, palabra", "palabra")); // 3