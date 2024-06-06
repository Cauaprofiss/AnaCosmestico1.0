function listopi() {
    var e = document.getElementById("lista");
    e.style.display = e.style.display === "none" ? "block" : "none";
  }

  function abrmen() {
    document.getElementById("sidebar").style.display = "block";
  }

  function fecmen() {
    document.getElementById("sidebar").style.display = "none";
  }
  function fecfor() {
    document.getElementById("modalPagamento").style.display = "none";
  }
  function abrperf() {
    var e = document.getElementById("perfume");
    e.style.display = e.style.display === "none" ? "block" : "none";
  }

  function abrkit() {
    var e = document.getElementById("kits");
    e.style.display = e.style.display === "none" ? "block" : "none";
  }

  function abrinfan() {
    var e = document.getElementById("infan");
    e.style.display = e.style.display === "none" ? "block" : "none";
  }

  function abrcar() {
    document.getElementById("shop").style.display = "block";
  }

  function feccar() {
    var e = document.getElementById("shop");
    if (e.style.display === "block") {
      e.style.display = "none";
    }
  }

  function pesquisarProduto() {
    var e, t, n = document.querySelector('input[placeholder="qual produto você deseja?"]').value.toUpperCase(),
        o = document.querySelectorAll("#produto");
    for (var r = 0; r < o.length; r++) {
      t = (e = o[r]).textContent || e.innerText;
      e.style.display = t.toUpperCase().indexOf(n) > -1 ? "" : "none";
    }
  }

  function addcar(e) {
    var t = e.target,
        n = document.querySelectorAll("#produto button");
    for (var o = 0; o < n.length; o++) {
      if ((c = n[o]) === t) {
        var r = c.parentElement,
            l = r.querySelector("h3").textContent,
            d = r.querySelector("p").textContent.replace("R$", "").trim(),
            a = r.querySelector("img").src,
            i = document.getElementById("prod"),
            c = document.createElement("div");
        c.style.border = "5px solid white";
        var img = document.createElement("img");
        img.src = a;
        img.style.width = "120px";
        c.appendChild(img);
        var pNome = document.createElement("p");
        pNome.textContent = l;
        pNome.style.color = "white";
        c.appendChild(pNome);
        var pPreco = document.createElement("p");
        pPreco.textContent = "R$-" + d;
        pPreco.style.color = "white";
        c.appendChild(pPreco);
        var btnRemover = document.createElement("button");
        btnRemover.innerText = "remover";
        btnRemover.onclick = function() {
          removerDoCarrinho(this);
        };
        btnRemover.style.padding = "4px 8px";
        btnRemover.style.backgroundColor = "red";
        btnRemover.style.border = "solid red";
        btnRemover.style.userSelect = "none";
        btnRemover.style.cursor = "pointer";
        btnRemover.style.borderRadius = "50px";
        c.appendChild(btnRemover);
        i.appendChild(c);
        alert("Produto adicionado ao carrinho: " + l);
        break;
      }
    }
    var e = document.getElementById("prod").innerHTML;
    localStorage.setItem("carrinho", e);
  }

  function removerDoCarrinho(e) {
    e.parentElement.remove();
    var prodHtml = document.getElementById("prod").innerHTML;
    localStorage.setItem("carrinho", prodHtml);
  }

  function finalizarCompra() {
    abrirModalPagamento();
  }

  function confirmarPagamento() {
    var opcaoPagamento = document.querySelector('input[name="pagamento"]:checked').value;
    // Construir mensagem com os detalhes do pedido
    var mensagem = "Pedido Finalizado:\n\n";
    var produtos = document.querySelectorAll("#prod div");
    produtos.forEach(function(produto) {
      var nome = produto.querySelector("p:nth-child(2)").textContent;
      var preco = parseFloat(produto.querySelector("p:nth-child(3)").textContent.replace("R$-", ""));
      mensagem += nome + " - R$" + preco.toFixed(2) + "\n";
    });
    mensagem += "\nForma de pagamento: " + opcaoPagamento;

    // Abrir link do WhatsApp com a mensagem
    var numeroRevendedora = "5511968079403"; // Número da revendedora
    var urlWhatsApp = "https://wa.me/" + numeroRevendedora + "/?text=" + encodeURIComponent(mensagem);
    window.open(urlWhatsApp, "_blank");

    // Fechar modal de pagamento
    fecharModalPagamento();
  }
  function abrirModalPagamento() {
    document.getElementById('modalPagamento').style.display = 'block';
  }

  function fecharModalPagamento() {
    document.getElementById('modalPagamento').style.display = 'none';
  }

  window.onload = function() {
    var e = localStorage.getItem("carrinho");
    if (e) {
      document.getElementById("prod").innerHTML = e;
      document.querySelectorAll("#prod button").forEach(function(e) {
        e.addEventListener("click", function() {
          removerDoCarrinho(this);
        });
      });
    }
  };