/* ==========================================================================
   SISTEMA DE LOGIN E CONTROLE DE ACESSO
   ========================================================================== */

function logar() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let campoSenha = document.getElementById('senha');

    if (email === "admin" && senha === "admin") {
        alert("Boas Vindas!");
        sessionStorage.setItem('setor', 'GESTOR');
        window.location.href = "PaginaPrincipal.html";
    } 
    else if (email === "operacional" && senha === "opec2026") {
        alert("Boas Vindas!");
        sessionStorage.setItem('setor', 'ATENDIMENTO');
        window.location.href = "PaginaPrincipal.html";
    } 
    else {
        alert("Email ou Usuários inválidos");
        campoSenha.value = "";
    }
}

function verificar() {
    let setor = sessionStorage.getItem('setor');
    if (!setor) { window.location.href = "index.html"; return; }
    document.getElementById('displaySetor').innerText = setor;
    
    if(setor === "ATENDIMENTO") {
        if(document.getElementById('m1')) document.getElementById('m1').remove();
        if(document.getElementById('m4')) document.getElementById('m4').remove();
        if(document.getElementById('m5')) document.getElementById('m5').remove();
    }
}

function sair() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

function nav(url) {
    window.location.href = url;
}

/* ==========================================================================
   MÁSCARAS CORRIGIDAS
   ========================================================================== */

// 1. DATA DE NASCIMENTO (Adicionado limpeza de letras e barras automáticas)
function mascaraData(i) {
    let v = i.value.replace(/\D/g, ""); // BLOQUEIA LETRAS
    i.setAttribute("maxlength", "10"); 
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1/$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    i.value = v;
}

// 2. CEP (Adicionado bloqueio de letras e traço)
function mascaraCEP(i) {
    let v = i.value.replace(/\D/g, ""); // BLOQUEIA LETRAS
    i.setAttribute("maxlength", "9");
    if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    i.value = v;
}

// 3. CNPJ (AJUSTADO: Estava com erro na posição dos pontos e barra)
function mascaraCNPJ(i) {
    let v = i.value.replace(/\D/g, ""); // BLOQUEIA LETRAS
    i.setAttribute("maxlength", "18");
    
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 8) v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
    if (v.length > 12) v = v.replace(/(\d{4})(\d)/, "$1-$2");
    
    i.value = v;
}

function mascaraCPF(i) {
    let v = i.value.replace(/\D/g, ""); 
    i.setAttribute("maxlength", "14");
    if (v.length > 3) v = v.replace(/^(\d{3})(\d)/, "$1.$2");
    if (v.length > 6) v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 9) v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    i.value = v;
}

function mascaraTelefone(i) {
    let v = i.value.replace(/\D/g, ""); 
    i.setAttribute("maxlength", "15");
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    if (v.length > 7) v = v.replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v;
}

function mascaraMoeda(i) {
    let v = i.value.replace(/\D/g, ""); 
    if(v === "") { i.value = ""; return; }
    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = "R$ " + v;
    if (document.getElementById('valorTotal')) { calcularTotal(); }
}

/* ==========================================================================
   LÓGICA MATEMÁTICA
   ========================================================================== */

function calcularTotal() {
    let campoPreco = document.getElementById('precoProduto');
    let campoQtd = document.getElementById('qtdProduto');
    let displayTotal = document.getElementById('valorTotal');

    if (campoPreco && campoQtd && displayTotal) {
        let precoLimpo = parseFloat(campoPreco.value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
        let qtd = parseFloat(campoQtd.value);

        if (!isNaN(precoLimpo) && !isNaN(qtd)) {
            let total = precoLimpo * qtd;
            displayTotal.innerText = "Valor Total em Estoque: " + total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        } else {
            displayTotal.innerText = "Valor Total em Estoque: R$ 0,00";
        }
    }
}
