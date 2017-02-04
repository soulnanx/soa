

    function enviar(){
      
        var url = "http://localhost:8081/produto/?ComandoSQL=INSERT"

        if (document.getElementById("codigo").value){
          url = url.concat("&codigo=" + document.getElementById("codigo").value)
        }

        if (document.getElementById("valor").value){
          url = url.concat("&valor=" + document.getElementById("valor").value)}

        if (document.getElementById("quantidade").value){
          url = url.concat("&quantidade=" + document.getElementById("quantidade").value)}

        if (document.getElementById("descontoMaximo").value){
          url = url.concat("&descontoMaximo=" + document.getElementById("descontoMaximo").value)}

        if (document.getElementById("statusProduto").value){
          url = url.concat("&statusProduto=" + document.getElementById("statusProduto").value)}

        alert(replaceUrl(url))

        fetch(replaceUrl(url))
	       .then(resp => {alert("ok");resp.json()})
         .then(api => alert(api))
         .catch(error => alert("Erro ao tentar " + url))

    }
