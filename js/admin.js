const listarEventos = async() => {
    const resposta = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    if( resposta.status === 200){ 
        const data = await resposta.json();
        return data
    }
}

const rendEventos = async(eventos) => { 
    const data =  await listarEventos(eventos)
    data.forEach((evento,index) => { 
    const tbody = document.querySelector("tbody")
    const tr = document.createElement("tr")
    tr.innerHTML = `<th scope="row">${index +1} </th>
        <td>${evento.scheduled}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions.join(', ')}</td>
        <td>
          <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
          <a href="editar-evento.html?id=${evento._id}&nome=${evento.name}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}"" class="btn btn-secondary">editar</a>
          <a href="excluir-evento.html?id=${evento._id}&nome=${evento.name}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}" class="btn btn-danger">Excluir</a>
        </td>
    `
     tbody.appendChild(tr)   
    });
}
rendEventos()