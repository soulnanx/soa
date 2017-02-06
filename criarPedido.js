var cpfCliente = getParameterByName("cpfCliente")
buscarPorCpf(cpfCliente)
var codigoPedido = 0
var htmlPedido =""
var produtoSelecionado = ""
var pedido = []

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

  function adicionarProdutoNoPedido(){

      for (item of pedido){
        if (produtoSelecionado.codigo == item.codigo){
          alert("esse produto já foi adicionaodo no carrinho")
          return
        }
      }

      var quantidade = document.getElementById("qtd").value


      if (quantidade == 0 || quantidade < 0 ){
        alert("A quantidade tem que ser maior que 0")
        return
      } else {
         quantidadeEstoque = produtoSelecionado.quantidade - quantidade
      }
      produtoSelecionado.qtd = quantidade
      var urlUpdateEstoque = "http://localhost:8081/produto/?ComandoSQL=UPDATE&codigo=" + produtoSelecionado.codigo + "&quantidade=" + quantidadeEstoque
      var urlCreatePedido = "http://localhost:8081/pedido/?ComandoSQL=INSERT&id=" + codigoPedido + "&cpfCliente="+ cpfCliente + "&codigo="+ produtoSelecionado.codigo + "&quantidade=" + quantidade

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

    html = html.concat("<ul>")
    html = html.concat("<li><strong>CPF:</strong> " + cliente.cpfCliente +"</li>")
    html = html.concat("<li><strong>Nome:</strong> " + cliente.nome +"</li>")
    html = html.concat("<li><strong>EnderecoEntrega:</strong> " + cliente.enderecoEntrega +"</li>")
    html = html.concat("</ul>")


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

    html = html.concat("<button onclick='adicionarProdutoNoPedido()'> Adicionar ao pedido </button>")
    document.getElementById("detalheProduto").innerHTML = html;

    produtoSelecionado = produto
  }

  function exibePedido(produto){
    document.getElementById("detalheProduto").innerHTML = "";

    pedido.push(produto)
    htmlPedido = htmlPedido.concat("<ul style='list-style-type: none;'>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Codigo:</strong> " + produto.codigo +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Nome:</strong> " + produto.nome +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Estoque:</strong> " + produto.qtd +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Valor:</strong> R$" + produto.valor +"</li>")
    htmlPedido = htmlPedido.concat("</ul>")
    htmlPedido = htmlPedido.concat("</br>")

    document.getElementById("detalhePedido").innerHTML = htmlPedido;
    updateValorPedido()
  }

  function updateValorPedido(){
    console.log(pedido)
    var total = 0
    for (item of pedido){total += item.qtd * item.valor}

    document.getElementById("valorPedido").innerHTML = "Total R$" + total.toFixed(2);
    document.getElementById("valorPedido").innerHTML += "<button onclick='finalizar()'> Finalizar pedido </button>"
  }

  function finalizar(){
    window.location.replace("finalizarPedido.html?codigoPedido=" + codigoPedido);
  }
