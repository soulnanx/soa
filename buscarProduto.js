
  function buscarPorCpf(){
      var url = "http://localhost:8081/produto/?ComandoSQL=SELECT&"
      var codigo = document.getElementById("codigo").value

      if (!codigo){
        alert("O campo codigo é obrigatório")
        return
      } else {
        url = url.concat("codigo=" + codigo)
      }

      alert(replaceUrl(url))
      fetch(replaceUrl(url))
       .then(resp => alert(resp[0]))
       .then(produto => exibeproduto(produto))
       .catch(error => alert(error))
  }

  function exibeProduto(produto){

    var html =""
    html = html.concat("<ul>")
    html = html.concat("<li><strong>Codigo:</strong> " + produto.codigo +"</li>")
    html = html.concat("<li><strong>Valor:</strong> " + produto.valor +"</li>")
    html = html.concat("<li><strong>Nome:</strong> " + produto.nome +"</li>")
    html = html.concat("<li><strong>Desconto máximo:</strong> " + produto.descontoMaximo +"</li>")
    html = html.concat("<li><strong>Status do produto:</strong> " + produto.statusProduto +"</li>")
    html = html.concat("</ul>")

    html = html.concat("<button id='enviar' onclick='deletar(" + produto.codigo+ ")'> delete </button>")
    document.getElementById("listaproduto").innerHTML = html;

  }

  function deletar(codigo){
    alert(codigo)
    var url = "http://localhost:8081/produto/?ComandoSQL=DELETE&codigo=" + codigo

    fetch(replaceUrl(url))
     .then(resp => alert(resp))
     .catch(error => alert(error))

  }

  function exibeprodutoNaoEncontrado(cpfproduto){
    var html =""
    html = html.concat("<p>produto não encontrado!</p>")

    html = html.concat("<button id='cadastrar' onclick='navegarParaCadastro(" + cpfproduto + ")'> cadastrar produto </button>")
    document.getElementById("listaproduto").innerHTML = html;

  }

  function navegarParaCadastro(cpfproduto){
    window.location.replace("cadastroproduto.html?cpf=" + cpfproduto);
  }

  function mockDeproduto(){
    produto = {"nome":"João",
    "cpfproduto": 654654654,
    "rg":321321321,
    "telefoneFixo": "6546-6412",
    "telefoneMovel": "4444-5555",
    "enderecoCobranca":"Rua hipodromo 1024",
    "enderecoEntrega": "Rua Almirante brasil"}
    return produto
  }
