class Dato{
    
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(value){
        this._descripcion = value;
    }
    get valor(){
        return this._valor;
    }
    set valor(value){
        this._valor = value;
    }

}