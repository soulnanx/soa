var cpfCliente = getParameterByName("cpf")
buscarPorCpf(cpfCliente)
var codigoPedido = 0
var htmlPedido =""
var produtoSelecionado = ""

  function buscarCodigo(){

      var url = "http://localhost:8081/produto/?ComandoSQL=SELECT&"
      var codigo = document.getElementById("codigo").value

      if (!codigo){
        alert("O campo codigo é obrigatório")
        return
      } else {
        url = url.concat("codigo=" + codigo)
      }

      if (codigo == 321){
        exibeProdutoNaoEncontrado(codigo)
      } else {
        fetch(replaceUrl(url))
         .then(resp => resp.json())
         .then(produtos => {exibeProduto(produtos[0])})
         .catch(error => alert(error))
      }

  }

  function buscarPorCpf(cpfCliente){
      var url = "http://localhost:8081/cliente/?ComandoSQL=SELECT&cpfCliente=" + cpfCliente

      fetch(replaceUrl(url))
         .then(resp => resp.json())
         .then(clientes => exibeCliente(clientes[0]))
         .catch(error => alert(error))
  }

  function adicionarProdutoNoPedido(codigo, quantidadeEstoque){

      var quantidade = document.getElementById("qtd").value


      if (quantidade == 0 || quantidade < 0 ){
        alert("A quantidade tem que ser maior que 0")
        return
      } else {
         quantidadeEstoque = quantidadeEstoque - quantidade
      }
      produtoSelecionado.qtd = quantidade
      var urlUpdateEstoque = "http://localhost:8081/produto/?ComandoSQL=UPDATE&codigo=" + codigo + "&quantidade=" + quantidadeEstoque
      var urlCreatePedido = "http://localhost:8081/pedido/?ComandoSQL=INSERT&id=" + codigoPedido + "&cpfCliente="+ cpfCliente + "&codigo="+ codigo + "&quantidade=" + quantidade

      console.log("urlEstoque")
      console.log(urlUpdateEstoque)
      console.log("urlCreatePedido")
      console.log(urlCreatePedido)

      fetch(urlCreatePedido)
         .then(resp => resp.json() )
         .then(retorno => {exibePedido(produtoSelecionado);updateCodigo(retorno)})
         .catch(error => alert(error))

      fetch(urlUpdateEstoque)
         .then(resp => {console.log(resp.json())})
         .catch(error => alert(error))
  }

  function updateCodigo(retorno){

    if (codigoPedido == 0){
        codigoPedido = retorno[0].id
    }
    console.log("codigo do pedido" + codigoPedido)
  }

  function exibeCliente(cliente){
    console.log(cliente)
    var html =""
    html = html.concat("<fieldset>")
    html = html.concat("<ul>")
    html = html.concat("<li><strong>CPF:</strong> " + cliente.cpfCliente +"</li>")
    html = html.concat("<li><strong>Nome:</strong> " + cliente.nome +"</li>")
    html = html.concat("<li><strong>EnderecoEntrega:</strong> " + cliente.enderecoEntrega +"</li>")
    html = html.concat("</ul>")
    html = html.concat("</fieldset>")

    document.getElementById("listaCliente").innerHTML = html;

  }

  function exibeProduto(produto){
    console.log(produto)
    var mensagemStatus

    if (produto.status = "F"){
      mensagemStatus = "Produto indisponivel no fornecedor"
    } else if (produto.status = "E"){
      mensagemStatus = "Produto indisponivel na empresa"
    } else {
      mensagemStatus = "Produto disponivel"
    }

    var html =""
    html = html.concat("<ul>")
    html = html.concat("<li><strong>CPF:</strong> " + produto.codigo +"</li>")
    html = html.concat("<li><strong>Nome:</strong> " + produto.nome +"</li>")
    html = html.concat("<li><strong>Estoque:</strong> " + produto.quantidade +"</li>")
    html = html.concat("<li><strong>Valor:</strong> R$" + produto.valor +"</li>")
    html = html.concat("<li><strong>Desconto Maximo:</strong> R$" + produto.descontoMaximo +"</li>")
    html = html.concat("<li><strong>Status:</strong> " + mensagemStatus +"</li>")
    html = html.concat("<li><label for='qtd'>Quantidade:</label>")
    html = html.concat("<input type='text' id='qtd' value='0'></li>")
    html = html.concat("</ul>")

    html = html.concat("<button onclick='adicionarProdutoNoPedido(" + produto.codigo + "," + produto.quantidade + ")'> Adicionar ao pedido </button>")
    document.getElementById("detalheProduto").innerHTML = html;

    produtoSelecionado = produto
  }

  function exibePedido(produto){
    htmlPedido = htmlPedido.concat("<ul style='list-style-type: none;'>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>codigo:</strong> " + produto.codigo +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Nome:</strong> " + produto.nome +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Estoque:</strong> " + produto.quantidade +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Valor:</strong> R$" + produto.valor +"</li>")
    htmlPedido = htmlPedido.concat("</ul>")
    htmlPedido = htmlPedido.concat("</br>")

    document.getElementById("detalhePedido").innerHTML = htmlPedido;

  }

  function deletar(cpf){
    alert(cpf)

  }

  function exibeClienteNaoEncontrado(codigo){
    var html =""
    html = html.concat("<p>Cliente não encontrado!</p>")

    html = html.concat("<button id='cadastrar' onclick='navegarParaCadastro(" + codigo + ")'> cadastrar cliente </button>")
    document.getElementById("listaCliente").innerHTML = html;

  }

  function navegarParaCriarPedido(codigo){
    window.location.replace("criarPedido.html?cpf=" + codigo);
  }
