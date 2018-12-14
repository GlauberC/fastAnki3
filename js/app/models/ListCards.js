class ListCards{
    constructor(){
        this._cards = [];
    }
    get cards(){
        return this._cards;
    }
    adiciona(card){
        this._cards.push(card);
    }
    edita(card, posicao){
        this._cards[posicao] = card;
    }
    removeUltimo(){
        this._cards.pop();
    }
    get tamanho(){
        return this._cards.length;
    }
}