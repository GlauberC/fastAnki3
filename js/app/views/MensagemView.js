class MensagemView extends View{
    constructor(elemento){
        super(elemento);
    }

    template(model){
        if(model.texto == ""){
            return `<p></p>`;
        }else if(model.status == "info"){
            return `<p class="alert info-mensagem">${model.texto}</p>`;
        }else if(model.status == "danger"){
            return `<p class="alert danger-mensagem">${model.texto}</p>`;
        }else if(model.status == "warning"){
            return `<p class="alert warning-mensagem">${model.texto}</p>`;
        }
    }
}