// FAZ REQUISAO ASSICRONA PARA O SERVIDOR USANDO PROMISE E XMLHttpRequest
const envioAjax = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Algo deu errado');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

// RECUPERA OS RAMAIS DO BANCO DE DADOS
const recuperaRamais = () => {
    envioAjax('POST', 'lib/ramais.php', {
        acao: 'consultar'
    }).then(responseData => {
        let divs = ''
        let divStatus = ''
            //console.log(responseData)
        for (i in responseData) {
            // ALTERA A DIV
            if (responseData[i].status == 'Indisponivel') {
                divStatus = '<div class="cartao cartao-indisponivel">'
            } else {
                divStatus = '<div class="cartao">'
            }
            divs += `${divStatus}
            <span class="${responseData[i].status} icone-posicao"></span>
            <div><button id='${responseData[i].id}' class='botao botao-editar' onclick='editarFormulario("${responseData[i].nomeUser}","${responseData[i].numero}","${responseData[i].ip}","${responseData[i].status}",${responseData[i].id})'>
             Editar </button>
             <button id='${responseData[i].id}' class='botao botao-delete' onclick='excluir(this.id)'> Excluir </button>
            </div>
            <div>${responseData[i].nomeUser}</div>
         
           ${responseData[i].status} <br>  ${responseData[i].numero} <br> 
           ${responseData[i].ip}
           
    </div>`
        }

        document.getElementById("cartoes").innerHTML = divs
    })
}

// ENVIA OS DADOS DO FORMULARIO
const enviaFormulario = (evento) => {
    evento.preventDefault();
    let nomeUser = document.getElementById('nomeUser').value
    let numero = document.getElementById('numero').value
    let ip = document.getElementById('ip').value
    let status = document.getElementById('status').value
        //console.log(nomeUser, numero, ip, status)
    envioAjax('POST', 'lib/ramais.php', {
            nomeUser,
            numero,
            ip,
            status,
            acao: 'inserir'
        })
        .then(responseData => {
            //console.log(responseData);
            document.getElementById('nomeUser').value = ''
            document.getElementById('numero').value = ''
            document.getElementById('ip').value = ''
            document.getElementById('status').value = ''
            recuperaRamais()
        })
        .catch(err => {
            console.log(err);
        });
};

// ATUALIZA QUANDO O FORMULARIO ESTIVER COM INPUTS PREENCHIDOS
const atualizarRamal = (evento) => {
    evento.preventDefault();
    let nomeUser = document.getElementById('nomeUser').value
    let numero = document.getElementById('numero').value
    let ip = document.getElementById('ip').value
    let status = document.getElementById('status').value
    let idUpdate = document.getElementById('idUpdate').value
        //console.log(nomeUser, numero, ip, status)
    envioAjax('POST', 'lib/ramais.php', {
            nomeUser,
            numero,
            ip,
            status,
            idUpdate,
            acao: 'editar',
        })
        .then(responseData => {
            document.getElementById('idUpdate').value = ''
            document.getElementById('nomeUser').value = ''
            document.getElementById('numero').value = ''
            document.getElementById('ip').value = ''
            document.getElementById('status').value = ''

            document.getElementById('spanSalvar').hidden = false
            document.getElementById('spanEditar').hidden = true
                //console.log(responseData);
            recuperaRamais()
        })
        .catch(err => {
            console.log(err);
        });
};

//EXLCUI O RAMAL SELECIONADO
const excluir = (idEvento) => {
    if (confirm('Deseja excluir este ramal?')) {
        //console.log(idEvento)
        envioAjax('POST', 'lib/ramais.php', {
                acao: 'excluir',
                idEvento
            })
            .then(responseData => {
                alert(responseData)
                recuperaRamais()
            })
            .catch(err => {
                console.log(err);
            })
    }
}

//ADICIONA OS VALORES NO INPUTS
const editarFormulario = (nomeUser, numero, ip, status, id) => {
    //console.log(nomeUser, numero, ip, status, id)
    document.getElementById('nomeUser').value = nomeUser
    document.getElementById('numero').value = numero
    document.getElementById('ip').value = ip
    document.getElementById('status').value = status
    document.getElementById('idUpdate').value = id
    document.getElementById('spanEditar').hidden = false
    document.getElementById('spanSalvar').hidden = true
}

//VERIFICA SE PODE ATUALZIAR O FORMULARIO
function ehEditavel(evento) {

    ehEditavel = document.getElementById('idUpdate').value
    let salvar = document.getElementById('formulario');
    if (ehEditavel == '') {
        salvar.addEventListener('submit', enviaFormulario)
            //console.log('enviar')
    } else {

        salvar.addEventListener('submit', atualizarRamal)
            //console.log('edita')

    }
}
// ADICIONA FUNCOES DE ONCLICK PARA OS BOTOES
const envio = document.getElementById('salvar');
envio.addEventListener('click', ehEditavel)

const editar = document.getElementById('editar');
editar.addEventListener('click', atualizarRamal)
recuperaRamais()
setInterval(() => {
    recuperaRamais()
}, 10000);

// LIMPA O CACHE DOS INPUTS QUANDO A PAGINA FOR CARREGADA
window.onload = function() {
    document.getElementById('idUpdate').value = ''
    document.getElementById('nomeUser').value = ''
    document.getElementById('numero').value = ''
    document.getElementById('ip').value = ''
    document.getElementById('status').value = ''
}