

    function enviar(){

        var url = "http://localhost:8081/produto/?ComandoSQL=INSERT"

        if (!document.getElementById("codigo").value){
          alert("O campo codigo é obrigatório")
          return
        } else {
          url = url.concat("&codigo=" + document.getElementById("codigo").value)
        }

        if (!document.getElementById("valor").value){
          alert("O campo valor é obrigatório")
          return
        } else {
          url = url.concat("&valor=" + document.getElementById("valor").value)
        }

        if (!document.getElementById("nome").value){
          alert("O campo nome é obrigatório")
          return
        } else {
            url = url.concat("&nome=" + document.getElementById("nome").value)
        }

        if (document.getElementById("quantidade").value){
          url = url.concat("&quantidade=" + document.getElementById("quantidade").value)}

        if (document.getElementById("descontoMaximo").value){
          url = url.concat("&descontoMaximo=" + document.getElementById("descontoMaximo").value)}

        if (document.getElementById("statusProduto").value){
          url = url.concat("&statusProduto=" + document.getElementById("statusProduto").value)}


        fetch(replaceUrl(url))
	       .then(resp => callbackCadastro())
         .catch(error => alert("Erro ao tentar " + url))

    }

    function callbackCadastro(){
      alert("produto cadastrado")
      document.getElementById("codigo").value = ""
      document.getElementById("valor").value = ""
      document.getElementById("nome").value = ""
      document.getElementById("quantidade").value = ""
      document.getElementById("descontoMaximo").value = ""
      document.getElementById("statusProduto").value = ""

    }
