var cpfCliente = getParameterByName("cpf")
document.getElementById("cpfCliente").value = cpfCliente


    function enviar(){
        var url = "http://localhost:8081/cliente/?ComandoSQL=INSERT&"

        if (!document.getElementById("cpfCliente").value){
          alert("O campo cpf é obrigatório")
          return
        } else {
          url = url.concat("&cpfCliente=" + document.getElementById("cpfCliente").value)
        }

        if (document.getElementById("nome").value){
          url = url.concat("nome=" + document.getElementById("nome").value)}

        if (document.getElementById("rg").value){
          url = url.concat("&rg=" + document.getElementById("rg").value)}

        if (document.getElementById("telefoneFixo").value){
          url = url.concat("&telefoneFixo=" + document.getElementById("telefoneFixo").value)}

        if (document.getElementById("telefoneMovel").value){
          url = url.concat("&telefoneMovel=" + document.getElementById("telefoneMovel").value)}

        if (document.getElementById("enderecoCobranca").value){
          url = url.concat("&enderecoCobranca=" + document.getElementById("enderecoCobranca").value)}

        if (document.getElementById("enderecoEntrega").value){
          url = url.concat("&enderecoEntrega=" + document.getElementById("enderecoEntrega").value)}

        alert(url)

        fetch(url)
	       .then(resp => {alert("ok");resp.json()})
         .then(api => alert(api))
         .catch(error => alert("Erro ao tentar " + url))

    }

    function buscarPorCpf(cpfCliente){
        var url = "http://localhost:8081/cliente/?ComandoSQL=SELECT&"
        url.concat("cpfCliente=")
        url.concat(cpf)
    }

    function deletar(cpfCliente){
        var url = "http://localhost:8081/cliente/?ComandoSQL=DELETE&"
        url.concat("cpfCliente=")
        url.concat(cpfCliente)
    }
