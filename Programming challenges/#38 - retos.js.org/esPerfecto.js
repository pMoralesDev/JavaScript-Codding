function esPerfecto(n) {
  let suma = 0;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      suma += i;
    }
  }
  return suma === n;
}

console.log(esPerfecto(6)); 
console.log(esPerfecto(23)); 
console.log(esPerfecto(78)); 