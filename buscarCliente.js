
  function buscarPorCpf(){
      var url = "http://localhost:8081/cliente/?ComandoSQL=SELECT&"
      var cpfCliente = document.getElementById("cpfCliente").value

      if (!cpfCliente){
        alert("O campo cpf é obrigatório")
        return
      } else {
        url = url.concat("&cpfCliente=" + cpfCliente)
      }

      if (cpfCliente == 123){
        exibeCliente(mockDeCliente())
      } else if (cpfCliente == 321){
        exibeClienteNaoEncontrado(cpfCliente)
      } else {
        fetch(replaceUrl(url))
         .then(resp => resp.json())
         .then(cliente => exibeCliente(cliente))
      }

  }

  function exibeCliente(cliente){

    var html =""
    html = html.concat("<ul>")
    html = html.concat("<li><strong>CPF:</strong> " + cliente.cpfCliente +"</li>")
    html = html.concat("<li><strong>Nome:</strong> " + cliente.nome +"</li>")
    html = html.concat("<li><strong>RG:</strong> " + cliente.rg +"</li>")
    html = html.concat("<li><strong>TelefoneFixo:</strong> " + cliente.telefoneFixo +"</li>")
    html = html.concat("<li><strong>TelefoneMovel:</strong> " + cliente.telefoneFixo +"</li>")
    html = html.concat("<li><strong>EnderecoCobranca:</strong> " + cliente.enderecoCobranca +"</li>")
    html = html.concat("<li><strong>EnderecoEntrega:</strong> " + cliente.enderecoEntrega +"</li>")
    html = html.concat("</ul>")

    html = html.concat("<button id='enviar' onclick='deletar(" + cliente.cpfCliente + ")'> delete </button>")
    document.getElementById("listaCliente").innerHTML = html;

  }

  function deletar(cpf){
    alert(cpf)

  }

  function exibeClienteNaoEncontrado(cpfCliente){
    var html =""
    html = html.concat("<p>Cliente não encontrado!</p>")

    html = html.concat("<button id='cadastrar' onclick='navegarParaCadastro(" + cpfCliente + ")'> cadastrar cliente </button>")
    document.getElementById("listaCliente").innerHTML = html;

  }

  function navegarParaCadastro(cpfCliente){
    window.location.replace("cadastroCliente.html?cpf=" + cpfCliente);
  }

  function mockDeCliente(){
    cliente = {"nome":"João",
    "cpfCliente": 654654654,
    "rg":321321321,
    "telefoneFixo": "6546-6412",
    "telefoneMovel": "4444-5555",
    "enderecoCobranca":"Rua hipodromo 1024",
    "enderecoEntrega": "Rua Almirante brasil"}
    return cliente
  }
