const SOUND = 'https://xp41-soundgarden-api.herokuapp.com/events';
const findID = () => {
    const url = new(window.location.href); // pegar url da pagina
    const id = url.searchParams.get('id'); 
    return id;
}
const exibirDetalhesEvento = async () => {
    const dadosEvento =
        await fetch(SOUND + "/" + findID(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json());

    console.log(dadosEvento);

    const inputNome = document.getElementById("nome");
    const inputBanner = document.getElementById("banner");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao =document.getElementById("lotacao");

    inputNome.value = dadosEvento.name;
    inputAtracoes.value = dadosEvento.attractions.join();
    inputBanner.value = dadosEvento.poster;
    inputDescricao.value = dadosEvento.description;
    inputData.value = dadosEvento.scheduled;
    inputLotacao.value = dadosEvento.number_tickets;
}
exibirDetalhesEvento();

//seleciona formulario 
    const formEditarEvento = documento.querySelector("#editar-evento");

// capturando evento de envio do formulario
    formEditarEvento.addEventListener("sudbmit", async (event) => { 
        event.preventDefault(); // nao deixa a pagina recarregar

    const inputNome = document.getElementById("nome");
    const inputBanner = document.getElementById("banner");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao =document.getElementById("lotacao");

// conversao da data para o padrao do banco de dados 
    const fullDateTime = new Date(inputData.value);
// criando objeto com dados do evento
    const eventoAtualizado = {
    "name": inputNome.value,
    "poster": inputBanner.value,
    "attractions": inputAtracoes.value.split(","),
    "description": inputDescricao.value,
    "scheduled": fullDateTime.toISOString(),     
    "number_tickets": inputLotacao.value,

};
// Convertendo Obj para JSON 
    const eventoAtualizadoJSON = JSON.stringify(eventoAtualizado);

// Conexao com API para cadastrar novo evento 
// Salvando Resposta na Const
    const resposta = await fetch('https://xp41-soundgarden-api.herokuapp.com/events' + "/" + findID(), {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: eventoAtualizadoJSON
    }).then((response) => { 
        return response.json();
    }).then((responseOBJ) => {
        //redireciona para lista de eventos
        window.location.replace('editar-evento.html?id=0,');
})
});