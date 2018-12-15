class Mensagem{
    constructor(status = "info",texto = ""){
        this._texto = texto;
        this._status = status;
    }
    get texto(){
        return this._texto;
    }
    get status(){
        return this._status;
    }
    set texto(texto){
        this._texto = texto;
    }

    
}