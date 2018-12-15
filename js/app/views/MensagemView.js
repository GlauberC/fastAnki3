class MensagemView extends View{
    constructor(elemento){
        super(elemento);
    }

    template(model){
        if(model.texto == ""){
            return `<p></p>`;
        }else if(model.status == "info"){
            return `<p class="alert mensagem info-mensagem">${model.texto}</p>`;
        }else if(model.status == "danger"){
            return `<p class="alert mensagem danger-mensagem">${model.texto}</p>`;
        }else if(model.status == "warning"){
            return `<p class="alert mensagem warning-mensagem">${model.texto}</p>`;
        }
    }
}