var codigoPedido = getParameterByName("codigoPedido")
buscarPorCodigoPedido(codigoPedido)
var htmlPedido =""
var produtos = []
var pedido = ""

  function buscarPorCodigoPedido(){

      var urlPedido = "http://localhost:8081/pedido/?ComandoSQL=SELECT&id=" + codigoPedido
      var urlProduto = "http://localhost:8081/produto/?ComandoSQL=SELECT&codigo="
        fetch(urlPedido)
         .then(resp => resp.json())
         .then(pedidoResp => pedidoResp.map(item => {pedido = pedidoResp;fetch(urlProduto+item.codigoProduto)
            .then(resp => resp.json())
            .then(produto => produtos.push(produto[0]))
            .then(resp => callbackPedido())}))
         .catch(error => alert(error))


  }

 function callbackPedido(){
   console.log("==========")
   console.log(pedido)
   console.log(produtos)

   mergeItems()

   for (itemPedido of pedido){
      exibePedido(itemPedido)
   }

   updateValorPedido(pedido)


 }

 function cancelarPedido(){
   var url = "http://localhost:8081/pedido/?ComandoSQL=CANCEL&id=" + codigoPedido

   fetch(replaceUrl(url))
    .then(resp => navegarParaInicio())
    .catch(error => alert(error))
 }

 function mergeItems(){
   for (itemPedido of pedido){
     for (prod of produtos){
        if (itemPedido.codigoProduto == prod.codigo){
          itemPedido.produto = prod
        }
     }
   }
 }

  function exibePedido(itemPedido){
    var produto = itemPedido.produto


    htmlPedido = htmlPedido.concat("<ul style='list-style-type: none;'>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Codigo:</strong> " + produto.codigo +"</li>")
    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Nome:</strong> " + produto.nome +"</li>")

    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Quantidade:</strong> ")
    htmlPedido = htmlPedido.concat("<input type='text' value=' " + itemPedido.quantidade+ "  '>")
    htmlPedido = htmlPedido.concat("</li>")

    htmlPedido = htmlPedido.concat("<li style='float: left;'><strong>Valor:</strong> R$" + produto.valor +"</li>")
    htmlPedido = htmlPedido.concat("</ul>")
    htmlPedido = htmlPedido.concat("</br></br>")

    document.getElementById("detalhePedido").innerHTML = htmlPedido;

  }

  function updateValorPedido(pedido){

    var total = 0
    for (item of pedido){total += item.quantidade * item.produto.valor}

    document.getElementById("valorPedido").innerHTML = "Total R$" + total.toFixed(2);
  }


  function navegarParaInicio(){
    window.location.replace("index.html");
  }
