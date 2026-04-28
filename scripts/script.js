/* ==========================================================================
   SISTEMA DE LOGIN E CONTROLE DE ACESSO
   ========================================================================== */

// Esta função verifica as credenciais digitadas na index.html
function logar() {
    // document.getElementById busca o elemento pelo ID e .value pega o que foi escrito
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let campoSenha = document.getElementById('senha');

    // Estrutura de decisão (IF/ELSE): Verifica se é Gestor ou Atendimento
    if (email === "admin" && senha === "admin") {
        alert("Boas Vindas!");
        // sessionStorage guarda uma informação na memória do navegador enquanto a aba estiver aberta
        sessionStorage.setItem('setor', 'GESTOR');
        window.location.href = "PaginaPrincipal.html"; // Redireciona para outra página
    } 
    else if (email === "operacional" && senha === "opec2026") {
        alert("Boas Vindas!");
        sessionStorage.setItem('setor', 'ATENDIMENTO');
        window.location.href = "PaginaPrincipal.html";
    } 
    else {
        alert("Email ou Usuários inválidos");
        campoSenha.value = ""; // Limpa o campo de senha em caso de erro
    }
}

// Esta função roda sempre que uma página protegida abre (onLoad)
function verificar() {
    // Recupera o setor guardado no momento do login
    let setor = sessionStorage.getItem('setor');
    
    // Se não houver setor, significa que não fez login. Volta para a index.
    if (!setor) { window.location.href = "index.html"; return; }
    
    // Exibe o nome do setor no topo da página
    document.getElementById('displaySetor').innerText = setor;
    
    // Se for ATENDIMENTO, remove botões que eles não podem acessar (Segurança Visual)
    if(setor === "ATENDIMENTO") {
        // .remove() exclui o elemento do HTML em tempo real
        if(document.getElementById('m1')) document.getElementById('m1').remove(); // Produtos
        if(document.getElementById('m4')) document.getElementById('m4').remove(); // Fornecedores
        if(document.getElementById('m5')) document.getElementById('m5').remove(); // Configurações
    }
}

// Limpa a memória e volta para o início
function sair() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// Faz a troca de páginas (Navegação)
function nav(url) {
    window.location.href = url;
}

/* ==========================================================================
   MÁSCARAS (BLOQUEIO DE LETRAS E FORMATAÇÃO)
   ========================================================================== */

// (i) representa o próprio campo (this) que chamou a função
function mascaraCPF(i) {
    // .replace(/\D/g, "") -> Substitui tudo que NÃO for número por "nada" (limpeza)
    let v = i.value.replace(/\D/g, ""); 
    i.setAttribute("maxlength", "14"); // Trava o tamanho máximo

    if (v.length > 3) v = v.replace(/^(\d{3})(\d)/, "$1.$2");
    if (v.length > 6) v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 9) v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    i.value = v; // Devolve o valor formatado
}

function mascaraTelefone(i) {
    let v = i.value.replace(/\D/g, ""); // Remove letras
    i.setAttribute("maxlength", "15");
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    if (v.length > 7) v = v.replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v;
}

function mascaraCNPJ(i) {
    let v = i.value.replace(/\D/g, ""); // Remove letras
    i.setAttribute("maxlength", "18");
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 8) v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
    if (v.length > 12) v = v.replace(/(\d{4})(\d)/, "$1-$2");
    i.value = v;
}

function mascaraMoeda(i) {
    let v = i.value.replace(/\D/g, ""); // Limpa letras
    if(v === "") { i.value = ""; return; }
    
    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ","); // Padrão brasileiro
    
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    
    i.value = "R$ " + v;
    
    // Se estiver na tela de produtos, já calcula o total automático
    if (document.getElementById('valorTotal')) {
        calcularTotal();
    }
}

/* ==========================================================================
   LÓGICA MATEMÁTICA
   ========================================================================== */

function calcularTotal() {
    let campoPreco = document.getElementById('precoProduto');
    let campoQtd = document.getElementById('qtdProduto');
    let displayTotal = document.getElementById('valorTotal');

    if (campoPreco && campoQtd && displayTotal) {
        // Remove "R$ ", pontos e troca vírgula por ponto para o JS calcular (padrão Americano)
        let precoLimpo = parseFloat(campoPreco.value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
        let qtd = parseFloat(campoQtd.value);

        if (!isNaN(precoLimpo) && !isNaN(qtd)) {
            let total = precoLimpo * qtd;
            // Converte de volta para Real (R$) na exibição
            displayTotal.innerText = "Valor Total em Estoque: " + total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        } else {
            displayTotal.innerText = "Valor Total em Estoque: R$ 0,00";
        }
    }
}
