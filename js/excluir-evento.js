const SOUND = 'https://xp41-soundgarden-api.herokuapp.com/events/:id';

   const inputNome = document.getElementById("nome");
    const inputBanner = document.getElementById("banner");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao =document.getElementById("lotacao");

    const excluindo = new URLSearchParams(window.location.search).get("excluindo");

    async function getEventos(){
        const response = await fetch(`${SOUND}/${excluindo}`)
        const data = await response.json();
        
        inputNome.value = data.name
        inputBanner.value = data.banner
        inputAtracoes.value = data.attractions
        inputDescricao.value = data.description
        inputData.value = data.scheduled
        inputLotacao.value = data.number_tickets
    }
    getEventos()

    const formExcluirEvento = document.querySelector('#excluir-evento')

    formExcluirEvento.addEventListener(`submit`, async (event) => {
        event.preventDefault();

        const deletar = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }

        const response = await fetch(`${SOUND}/${deletar}`, deletar)
        if(response.status === 204){
            alert('Evento Excluido')
        }
        window.location.href = 'admin.html'
    });
    