const mostrarReloj = () => {
    let fecha = new Date();
    let hora = formatoHoras(fecha.getHours());
    let minutos = formatoHoras(fecha.getMinutes());
    let seg = formatoHoras(fecha.getSeconds());
    document.getElementById("hora").innerHTML = hora+':'+minutos+':'+seg;

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    let diaSemana = dias[fecha.getDay()];
    let dia = fecha.getDate();
    let mes = meses[fecha.getMonth()];
    let fechaTexto = diaSemana+' , '+ dia + ' , '+ mes;
    document.getElementById("fecha").innerHTML=fechaTexto;

    document.getElementById("contenedor").classList.toggle('animar');
}

const formatoHoras = (hora) => {
    if(hora<10){
        hora = '0'+hora;
    }
    return hora;
}

setInterval(mostrarReloj, 1000);