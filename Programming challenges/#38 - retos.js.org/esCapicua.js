function esCapicua(numero) {
  return numero.toString() === numero.toString().split('').reverse().join('');
}

console.log(esCapicua(12321));
console.log(esCapicua(12345));
console.log(esCapicua(1993));