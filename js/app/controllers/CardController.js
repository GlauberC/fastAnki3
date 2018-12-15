class CardController{
    constructor(){
        this._inputNumero = document.querySelector(".numero");
        this._inputFrase = document.querySelector(".frase");
        this._inputDefinicao = document.querySelector(".definicao");
        this._inputGramatica = document.querySelector(".gramatica");
        this._inputDescricaoFonetica = document.querySelector(".descricao-fonetica");
        
        this._btnCopiar = document.querySelector(".btn-copiar");
        this._btnAdicionar = document.querySelector(".btn-adicionar");
        this._btnArquivo = document.querySelector(".btn-arquivo");
        this._btnDeletar = document.querySelector(".btn-deletar");
        this._btnCloseEdit = document.querySelector(".btn-close-edit");
        this._btnSaveEdit = document.querySelector(".btn-save-edit");
        this._tableCards = document.querySelector(".tabela-view");
        

        this._listCards = new ListCards();
        this._cardTabelaView = new CardTabelaView(document.querySelector(".tabela-view"));

        this._editMode = false;
        this._mensagemInfo = new Mensagem("info", "Card adicionado com sucesso");
        this._mensagemInfoEdicao = new Mensagem("info", "Modo de edição ativado");
        this._mensagemInfoArquivo = new Mensagem("info", "Arquivo gerado com sucesso");
        
        this._mensagemWarning = new Mensagem("warning", "Card editado com sucesso");

        this._mensagemDanger = new Mensagem("danger", "Card removido com sucesso");
        this._mensagemDangerClose = new Mensagem("danger", "Edição cancelada");
        this._mensagemError = new Mensagem("danger", "Não foi possível adicionar o card, preencha o campo da frase ou definição");
        
        this._mensagemView = new MensagemView(document.querySelector(".mensagem-view"));
    
    }

    _mostraItens(){
        this._btnCopiar.classList.remove("invisivel");
        this._btnArquivo.classList.remove("invisivel");
        this._btnDeletar.classList.remove("invisivel");
        this._tableCards.classList.remove("invisivel");
        this._btnAdicionar.classList.remove("invisivel");
    }
    _escondeItens(){
        if(!this._editMode){
            this._btnCopiar.classList.add("invisivel");
            this._btnArquivo.classList.add("invisivel");
            this._btnDeletar.classList.add("invisivel");
            this._tableCards.classList.add("invisivel");
        }else{
            this._btnArquivo.classList.add("invisivel");
            this._btnDeletar.classList.add("invisivel");
            this._btnAdicionar.classList.add("invisivel");
        }

    }
    adicionaCardTabela(){
        if(this._inputFrase.value != "" && this._inputDefinicao.value != "" && !this._editMode){
            this._listCards.adiciona(this._criaCard());

            this._cardTabelaView.update(this._listCards);
            this._limpaCampos();
            this._mostraItens();

            this._mensagemView.update(this._mensagemInfo);
        }else{
            this._mensagemView.update(this._mensagemError);
        }
        
    }

    _criaCard(){
        return new Card(
            this._inputNumero.textContent, 
            this._inputFrase.value, 
            this._inputDefinicao.value, 
            this._inputGramatica.value, 
            this._inputDescricaoFonetica.value
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
        
        this._inputNumero.textContent = card.numero;
        this._inputFrase.value = card.frase;
        this._inputDefinicao.value = card.definicao;
        this._inputGramatica.value = card.gramatica;
        this._inputDescricaoFonetica.value = card.descricaoFonetica;

        this._editMode = true;
        this._escondeItens();
        this._btnCloseEdit.classList.remove("invisivel");
        this._btnSaveEdit.classList.remove("invisivel");
        
        this._mensagemView.update(this._mensagemInfoEdicao);

        
    }
    get editMode(){
        return this._editMode;
    }
    closeEdit(){
        this._editMode = false;
        this._btnCloseEdit.classList.add("invisivel");
        this._btnSaveEdit.classList.add("invisivel");
        this._mostraItens();
        this._limpaCampos();
        this._mensagemView.update(this._mensagemDangerClose);
    }
    saveEdit(){

        if(this._inputFrase.value != "" && this._inputDefinicao.value){
            let cardEditado = this._criaCard();
            this._listCards.edita(cardEditado, (cardEditado.numero-1))
            this._cardTabelaView.update(this._listCards);
            this._btnCloseEdit.classList.add("invisivel");
            this._btnSaveEdit.classList.add("invisivel");
            this._mostraItens();
            this._limpaCampos();
            this._mensagemView.update(this._mensagemWarning);
        }else{
            this._mensagemView.update(this._mensagemError);
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