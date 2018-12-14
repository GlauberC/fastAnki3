class CardController{
    constructor(){
        this._inputNumero = document.querySelector(".numero");
        this._inputFrase = document.querySelector(".frase");
        this._inputDefinicao = document.querySelector(".definicao");
        this._inputGramatica = document.querySelector(".gramatica");
        this._inputDescricaoFonetica = document.querySelector(".descricao-fonetica");
        
        this._btnCopiar = document.querySelector(".btn-copiar");
        this._btnArquivo = document.querySelector(".btn-arquivo");
        this._btnDeletar = document.querySelector(".btn-deletar");
        

        this._listCards = new ListCards();
        this._cardTabelaView = new CardTabelaView(document.querySelector(".tabela-view"));
        this._cardModalEditView = new CardModalEditView(document.querySelector(".modal-content"));      
    }

    _mostraBotoes(){
        this._btnCopiar.classList.remove("invisivel");
        this._btnArquivo.classList.remove("invisivel");
        this._btnDeletar.classList.remove("invisivel");
    }
    _escondeBotoes(){
        this._btnCopiar.classList.add("invisivel");
        this._btnArquivo.classList.add("invisivel");
        this._btnDeletar.classList.add("invisivel");
    }
    adicionaCardTabela(){
        this._listCards.adiciona(this._criaCard((this._inputNumero.textContent), 
                                                this._inputFrase.value, 
                                                this._inputDefinicao.value, 
                                                this._inputGramatica.value, 
                                                this._inputDescricaoFonetica.value));

        this._cardTabelaView.update(this._listCards);
        this._limpaCampos();
        this._mostraBotoes();
    }

    _criaCard(numero, frase, definicao, gramatica, descricaoFonetica){
        return new Card(
            numero,
            frase,
            definicao,
            gramatica,
            descricaoFonetica
        );
    }
    _limpaCampos(){
        this._inputNumero.textContent = (this._listCards.tamanho+1);
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
    saveModal(){
        let editNumero = (document.querySelector(".modal-numero").textContent);
        let editFrase = document.querySelector(".modal-frase").value;
        let editDefinicao = document.querySelector(".modal-definicao").value;
        let editGramatica = document.querySelector(".modal-gramatica").value;
        let editDescricaoFonetica = document.querySelector(".modal-descricao-fonetica").value;

        this._listCards.edita(this._criaCard(editNumero, editFrase, editDefinicao, editGramatica, editDescricaoFonetica), (editNumero-1))


        this._cardTabelaView.update(this._listCards);
        $("#modal-edit").modal('toggle');
    }
    removeCardTabela(){
        this._listCards.removeUltimo();
        if(this._listCards.tamanho<1){
            this._escondeBotoes();
        }
        this._cardTabelaView.update(this._listCards);
    }
}