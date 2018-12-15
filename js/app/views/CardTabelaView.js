class CardTabelaView extends View{
    constructor(elemento){
        super(elemento);
    }
    template(model){
        return `
        <table class = "table table-bordered">
            <thead>
                <tr>
                    <th>nº</th>
                    <th>Front</th>
                    <th>Verse</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody class="tabela-frases">
                ${model.cards.map(n => `
                    <tr>
                        <td class = "tabela-numero">${n.numero}</td>
                        <td onClick = "cardController.copiaClick(event)" class = "tabela-dado tabela-frente">${n.frase}</td>
                        <td onClick = "cardController.copiaClick(event)" class = "tabela-dado tabela-verso">${n._versoCard()}</td>
                        <td><button onClick="cardController.editaDadosCardAdicionado(event.target.parentNode.parentNode)" class = "btn btn-button button-custom-color button-color-two">Editar</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `
    }
}