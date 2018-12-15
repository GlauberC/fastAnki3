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
        this._tableCards = document.querySelector(".tabela-view");
        

        this._listCards = new ListCards();
        this._cardTabelaView = new CardTabelaView(document.querySelector(".tabela-view"));
        this._cardModalEditView = new CardModalEditView(document.querySelector(".modal-content"));  

        this._mensagemInfo = new Mensagem("info", "Card adicionado com sucesso");
        this._mensagemInfoArquivo = new Mensagem("info", "Arquivo gerado com sucesso");
        this._mensagemWarning = new Mensagem("warning", "Card editado com sucesso");
        this._mensagemDanger = new Mensagem("danger", "Card removido com sucesso");
        this._mensagemError = new Mensagem("danger", "Não foi possível adicionar o card, preencha o campo da frase ou definição");
        
        this._mensagemView = new MensagemView(document.querySelector(".mensagem-view"));
        this._mensagemModal;
    
    }

    _mostraItens(){
        this._btnCopiar.classList.remove("invisivel");
        this._btnArquivo.classList.remove("invisivel");
        this._btnDeletar.classList.remove("invisivel");
        this._tableCards.classList.remove("invisivel");
    }
    _escondeItens(){
        this._btnCopiar.classList.add("invisivel");
        this._btnArquivo.classList.add("invisivel");
        this._btnDeletar.classList.add("invisivel");
        this._tableCards.classList.add("invisivel");
    }
    adicionaCardTabela(){
        if(this._inputFrase.value != "" && this._inputDefinicao.value != ""){
            this._listCards.adiciona(this._criaCard((this._inputNumero.textContent), 
                                                    this._inputFrase.value, 
                                                    this._inputDefinicao.value, 
                                                    this._inputGramatica.value, 
                                                    this._inputDescricaoFonetica.value));

            this._cardTabelaView.update(this._listCards);
            this._limpaCampos();
            this._mostraItens();

            this._mensagemView.update(this._mensagemInfo);
        }else{
            this._mensagemView.update(this._mensagemError);
        }
        
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
        this._mensagemModal = new MensagemView(document.querySelector(".modal-mensagem"));
        let editNumero = (document.querySelector(".modal-numero").textContent);
        let editFrase = document.querySelector(".modal-frase").value;
        let editDefinicao = document.querySelector(".modal-definicao").value;
        let editGramatica = document.querySelector(".modal-gramatica").value;
        let editDescricaoFonetica = document.querySelector(".modal-descricao-fonetica").value;
        if(editFrase != "" && editDefinicao != ""){
            this._listCards.edita(this._criaCard(editNumero, editFrase, editDefinicao, editGramatica, editDescricaoFonetica), (editNumero-1))


            this._cardTabelaView.update(this._listCards);
            this._mensagemView.update(this._mensagemWarning);
            $("#modal-edit").modal('toggle');
        }else{
            this._mensagemModal.update(this._mensagemError);
        }

    }
    removeCardTabela(){
        this._listCards.removeUltimo();
        if(this.listaEstaVazia()){
            this._escondeItens();
        }
        this._cardTabelaView.update(this._listCards);
        this._inputNumero.textContent = (this._listCards.tamanho+1);

        this._mensagemView.update(this._mensagemDanger);
    }
    listaEstaVazia(){
        return this._listCards.tamanho < 1;
    }
    focusRapido(){
        if(this._inputFrase.value == ""){
            this._inputFrase.focus();
        }else if(this._inputDescricaoFonetica.value == ""){
            this._inputDescricaoFonetica.focus();
        }else if(this._inputDefinicao.value == ""){
            this._inputDefinicao.focus();
        }
    }
    copiaClick(event){
        let tdClicado = event.target
        tdClicado.classList.add("info-mensagem");
        let inputTemp = document.querySelector(".temp")

        inputTemp.classList.remove("invisivel")
        inputTemp.value = tdClicado.textContent;
        inputTemp.select();
        
        document.execCommand('copy');
        inputTemp.classList.add("invisivel")   
    }
    salvaArquivo(){
        let cards = ([... this._listCards.cards]);
        let csvs = []
        cards.forEach( n => csvs.push(n._csvReady()));
        
        download("anki.csv", csvs.join('\r\n'))
        this._mensagemView.update(this._mensagemInfoArquivo);
    }
}