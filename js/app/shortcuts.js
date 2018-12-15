document.addEventListener("keydown",function(event){
    let teclaCtrl = event.ctrlKey;
    let teclaShift = event.shiftKey;
    let teclaApertada = event.keyCode;
    if(teclaCtrl && teclaApertada == 32 && !cardController.listaEstaVazia()){
        cardController.recuperaDadosCardAdicionado();
    }else if(teclaCtrl && teclaApertada == 13 && !cardController.editMode){
        cardController.adicionaCardTabela();
    }else if(teclaCtrl && teclaApertada == 13 && cardController.editMode){
        cardController.saveEdit();
    }else if(teclaCtrl && teclaApertada == 8 && !cardController.listaEstaVazia() && !cardController.editMode){
        cardController.removeCardTabela();
    }else if(teclaCtrl && teclaApertada == 8 && !cardController.listaEstaVazia() && cardController.editMode){
        cardController.closeEdit();
    }else if(teclaCtrl && teclaShift){
        cardController.focusRapido();
    }
    
});

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }