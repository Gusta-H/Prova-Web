function getUser() {
    const userId = document.getElementById("getUserId").value;

    fetch('/backend/usuarios.php?id=' + userId, {
        method: 'GET'
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
        if(data.status){
            Swal.fire('Usuario encontrado')
            document.getElementById("inputNome").value = data.users.nome; 
            document.getElementById("inputEmail").value = data.users.email; 
            document.getElementById("inputSenha").value = data.users.senha; 
            document.getElementById("inputCriado").value = data.users.criado; 
            document.getElementById("inputDataNascimento").value = data.users.datanascimento; 
        } else {
            Swal.fire('id invalido')
        }    
    })
    .catch(error => Swal.fire('Usuario não encontrado'));
}