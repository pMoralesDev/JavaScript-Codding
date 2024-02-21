console.log('Program people list');
const personas = [
    new Persona('Persona', 'Prueba'),
    new Persona('Perico', 'el de los Palotes'),
];

function mostrarPersonas(){
    let text = '';
    for (let persona of personas) {
        console.log(persona);
        text += '<li>'+persona.nombre+' '+persona.apellido+'</li>';
    }
    document.getElementById('personas').innerHTML = text;
}

function agregarPersona(){
    const form = document.getElementById('form');
    const name = document.getElementById('nombre');
    const surname = document.getElementById('apellido');
    if(name.value != '' && surname.value!=''){
        const person = new Persona(name.value, apellido.value);
        console.log(person);
        personas.push(person);
        mostrarPersonas();
        name.innerHTML='';
        surname.innerHTML='';
    }
    else{
        alert('No hay datos introducidos');
    }
    
}