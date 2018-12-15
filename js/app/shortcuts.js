document.addEventListener("keydown",function(event){
    let teclaCtrl = event.ctrlKey;
    let teclaShift = event.shiftKey;
    let teclaApertada = event.keyCode;
    if(teclaCtrl && teclaApertada == 32 && !cardController.listaEstaVazia()){
        cardController.recuperaDadosCardAdicionado();
    }else if(teclaCtrl && teclaApertada == 13){
        cardController.adicionaCardTabela();
    }else if(teclaCtrl && teclaApertada == 8 && !cardController.listaEstaVazia()){
        cardController.removeCardTabela();
    }else if(teclaCtrl && teclaShift){
        cardController.focusRapido();
    }
    
});