let participantes = [
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 0, 1, 19, 23),
      dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 23, 19, 23),
      dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
      nome: "Ana Souza",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 0, 3, 19, 23),
      dataCheckIn: new Date(2024, 0, 4, 20, 20)
    },
    {
      nome: "João Silva",
      email: "joao@gmail.com",
      dataInscricao: new Date(2023, 11, 4, 19, 23),
      dataCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
      nome: "Maria Oliveira",
      email: "maria@gmail.com",
      dataInscricao: new Date(2023, 10, 5, 19, 23),
      dataCheckIn: new Date(2023, 10, 6, 20, 20)
    },
    {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 9, 6, 19, 23),
      dataCheckIn: new Date(2023, 9, 7, 20, 20)
    },
    {
      nome: "Carla Lima",
      email: "carla@gmail.com",
      dataInscricao: new Date(2023, 8, 7, 19, 23),
      dataCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
      nome: "Lucas Sousa",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2023, 7, 8, 19, 23),
      dataCheckIn: new Date(2023, 7, 9, 20, 20)
    },
    {
      nome: "Paula Costa",
      email: "paula@gmail.com",
      dataInscricao: new Date(2023, 6, 9, 19, 23),
      dataCheckIn: new Date(2023, 6, 10, 20, 20)
    },
    {
      nome: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2023, 5, 10, 19, 23),
      dataCheckIn: new Date(2023, 5, 11, 20, 20)
    }
  ]; //Array JavaScript

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    //verifica se o check-in do usuário não foi confirmado
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)" >
                Confirmar check-in
            </button>
        `
    }

    return `
        <tr>
            <td>
                <strong>${participante.nome}</strong>
                
                <br>
                <small>${participante.email}</small>
            </td>

            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    //Estrura de repetição
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    //Substituir informações no HTML
    document.querySelector('tbody').innerHTML = output

} //Arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('name-input'),
        email: dadosDoFormulario.get('email-input'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //verifica se o participante já existe na lista
    const participanteExiste = participantes.find((p) => {
        return p.email == participante.email
    })

    if(participanteExiste){
        alert("Participante já cadastrado.")
        return
    }

    participantes = [participante, ...participantes]

    atualizarLista(participantes)

    //limpar formulário
    event.target.querySelector('[name="name-input"]').value = ""
    event.target.querySelector('[name="email-input"]').value = ""
}


const fazerCheckIn = (event) => {
    //confirma se realmente quer o check-in
    if(confirm('Tem certeza que deseja fazer o check-in?') == false) {
        return 
    }

    //encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //atualizar a lista de participantes
    atualizarLista(participantes)
}