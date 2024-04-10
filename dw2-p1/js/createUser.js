document.getElementById('submitButton').addEventListener('click', createUser);

function createUser() {
    const nomeuser = document.getElementById('nomeuser').value;
    const emailuser = document.getElementById('emailuser').value;
    const senhauser = document.getElementById('senhauser').value;
    const criadouser = document.getElementById('criadouser').value;
    const datanascimentouser = document.getElementById('datanascimentouser').value;
    if (!nomeuser) {
        alert("Por favor, insira um nome!");
        return;
    }
    const usuario = {
        nome: nomeuser,
        email: emailuser,
        senha: senhauser,
        criado: criadouser,
        datanascimento: datanascimentouser
    };
    fetch('/backend/usuarios.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Não autorizado');
            } else {
                throw new Error('Sem rede ou não conseguiu localizar o recurso');
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            Swal.fire('Usuario já cadastrado')
        }else{
            Swal.fire('Usuario Criado!')
        } 
       
    })
    .catch(error => alert('Erro: ' + error));
}
