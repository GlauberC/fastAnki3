class CardModalEditView extends View{
    constructor(elemento){
        super(elemento);
        this._botaoAtivador = document.querySelector("ativador-modal")
    }

    template(model){
        return `
        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">Editar card </h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <!-- Modal body -->
            <div class = "row">
                <span class = "col-sm-1 numero modal-numero">${model.numero}</span>
                <div class = "col-sm-10">
                    <div class = "row">
                        <input type="text" value="${model.frase}" placeholder="Frases para adicionar" class="form-control frase modal-frase">
                    </div>
                    <div class = "row">
                        <input type="text" value="${model.descricaoFonetica}" placeholder="Descrição fonética" class="form-control descricao-fonetica modal-descricao-fonetica col-sm-2">
                        <select selectedIndex = "4" class = "form-control gramatica col-sm-2 modal-gramatica">
                            <option class="invisible">${model.gramatica}</option>
                            <option></option>
                            <option>Noun</option>
                            <option>Verb</option>
                            <option>Adj</option>
                            <option>Adv</option>
                            <option>Conj</option>
                            <option>Prep</option>
                            <option>PV</option>
                            <option>MV</option>
                        </select>

                        <input type="text" value="${model.definicao}" placeholder="Definição ou tradução" class="form-control definicao col-sm-8 modal-definicao">
                    </div>
                </div> 
            </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn btn-button button-custom-color button-color-one" data-dismiss="modal">Close</button>
            <button type="button" onClick="cardController.saveModal()" class="btn btn-button button-custom-color button-color-three">Save</button>
        </div>
        `
    }
    get botaoAtivador(){
        return this._botaoAtivador;
    }
}
