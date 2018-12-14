class Card{
    constructor(numero, frase, definicao, gramatica="", descricaoFonetica="" ){
        this._numero = numero;
        this._frase = frase;
        this._definicao = definicao;
        this._gramatica = gramatica;
        this._descricaoFonetica = descricaoFonetica;
        Object.freeze(this);
    }

    get numero(){
        return this._numero;
    }
    get frase(){
        return this._frase;
    }
    get definicao(){
        return this._definicao;
    }
    get gramatica(){
        return this._gramatica;
    }
    get descricaoFonetica(){
        return this._descricaoFonetica;
    }
    _versoCard(){
        let verso;
        if(this._descricaoFonetica!= "" & this._gramatica!= ""){
            verso = this._descricaoFonetica + " - " + this._gramatica + " - " + this._definicao           
        }else if(this._gramatica){
            verso = this._gramatica + " - " + this._definicao
        }else if(this._descricaoFonetica){
            verso = this._descricaoFonetica + " - " + this._definicao
        }else{
            verso = this._definicao;
        }
        return verso;
    }
    
}
