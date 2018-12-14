class CardController{
    constructor(){
        this._inputNumero = document.querySelector(".numero");
        this._inputFrase = document.querySelector(".frase");
        this._inputDescricaoFonetica = document.querySelector(".descricao-fonetica");
        this._inputGramatica = document.querySelector(".gramatica");
        this._inputDefinicao = document.querySelector(".definicao");
        this._listCards = new ListCards();
        this._cardTabelaView = new CardTabelaView(document.querySelector(".tabela-view"));
        this._cardModalEditView = new CardModalEditView(document.querySelector(".modal-content"));      
    }

    adicionaCardTabela(){
        this._listCards.adiciona(this._criaCard());
        this._cardTabelaView.update(this._listCards);
        this._limpaCampos();
    }

    _criaCard(){
        return new Card(
            this._inputNumero.textContent - 1,
            this._inputFrase.value,
            this._inputDefinicao.value,
            this._inputGramatica.value,
            this._inputDescricaoFonetica.value
            

        );
    }
    _limpaCampos(){
        this._inputNumero.textContent = this._listCards.tamanho+1;
        this._inputFrase.value = "";
        this._inputDescricaoFonetica.value = "";
        this._inputGramatica.value = "";
        this._inputDefinicao.value = "";


    }
    recuperaDadosCardAdicionado(){
        this._inputDescricaoFonetica.value = this._listCards._cards[this._listCards.tamanho-1].descricaoFonetica;
        this._inputGramatica.value = this._listCards._cards[this._listCards.tamanho-1].gramatica;
        this._inputDefinicao.value = this._listCards._cards[this._listCards.tamanho-1].definicao;
    }
    editaDadosCardAdicionado(tr){
        let posicao = tr.querySelector(".tabela-numero").textContent - 1;
        let card = this._listCards.cards[posicao];
        this._cardModalEditView.update(card);
        $("#modal-edit").modal();
        
    }
}