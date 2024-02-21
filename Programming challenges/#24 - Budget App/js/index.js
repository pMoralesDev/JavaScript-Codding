
const ingresos = [
    
 ];

const egresos = [
    
];

let cargarApp = () => {
    cargarcabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngresos = 0;
    for(let i=0; i < ingresos.length; i++){
        totalIngresos += ingresos[i].valor;
    }
    return totalIngresos;
}

let totalEgresos = () =>{
    let totalEgresos = 0;
    for(let i=0; i < egresos.length; i++){
        totalEgresos += egresos[i].valor;
    }
    return totalEgresos;
}

let cargarcabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('es-ES', {style: 'currency', currency:'EUR', minimunFractionDigits:2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-ES',{style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let i=0; i<ingresos.length; i++){
        ingresosHTML += crearIngresoHTML(ingresos[i]);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name = 'close-outline'
                        onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

eliminarIngreso = (id) => {
    let indiceEliminar=ingresos.findIndex(ingreso=>ingreso.id===id);
    ingresos.splice(indiceEliminar, 1);
    cargarcabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                         <ion-icon name = 'close-outline'
                         onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                    </button>
                </div>
            </div>
    </div>
    `;
    return egresoHTML;
}

eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarcabecero();
    cargarEgresos();
}

agregarDato = () => {
    let form = document.forms['forma'];
    let tipo = form['tipo'];
    let descripcion = form['descripcion'];
    let valor = form['valor'];
    if(descripcion.value !== ''&&valor.value!==''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarcabecero();
            cargarIngresos();
            document.getElementById('descripcion').value ='';
            document.getElementById('valor').value ='';
        }
        if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarcabecero();
            cargarEgresos();
            document.getElementById('descripcion').value ='';
            document.getElementById('valor').value ='';
        }
    }
}