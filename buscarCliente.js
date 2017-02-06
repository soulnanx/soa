
  function buscarPorCpf(){
      var url = "http://localhost:8081/cliente/?ComandoSQL=SELECT&"
      var cpfCliente = document.getElementById("cpfCliente").value

      if (!cpfCliente){
        alert("O campo cpf é obrigatório")
        return
      } else {
        url = url.concat("cpfCliente=" + cpfCliente)
      }


        fetch(replaceUrl(url))
         .then(resp => resp.json())
         .then(clientes => exibeCliente(clientes[0]))
         .catch(error => exibeClienteNaoEncontrado(cpfCliente))


  }

  function exibeCliente(cliente){

    var html =""
    html = html.concat("<ul class='collection'>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>CPF:</strong> " + cliente.cpfCliente +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>Nome:</strong> " + cliente.nome +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>RG:</strong> " + cliente.rg +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>TelefoneFixo:</strong> " + cliente.telefoneFixo +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>TelefoneMovel:</strong> " + cliente.telefoneFixo +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>EnderecoCobranca:</strong> " + cliente.enderecoCobranca +"</li>")
    html = html.concat("<li class='collection-item'><strong class='blue-text'>EnderecoEntrega:</strong> " + cliente.enderecoEntrega +"</li>")
    html = html.concat("</ul>")

    //html = html.concat("<button id='deletar' onclick='deletar(" + cliente.cpfCliente + ")'> delete </button>")
    html = html.concat("<button id='enviar' class='btn blue waves-effect waves-light' onclick='navegarParaCriarPedido(" + cliente.cpfCliente + ")'> Criar pedido </button>")
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
    window.location.replace("cadastroCliente.html?cpfCliente=" + cpfCliente);
  }

  function navegarParaCriarPedido(cpfCliente){
    window.location.replace("criarPedido.html?cpfCliente=" + cpfCliente);
  }
