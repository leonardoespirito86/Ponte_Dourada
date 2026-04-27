/* funcao pagina login*/

function logar() {
    // Pegamos o que foi digitado
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let campoSenha = document.getElementById('senha');

    // REGRA PARA GESTOR: admin / admin
    if (email === "admin" && senha === "admin") {
        alert("Boas Vindas!"); // Mensagem de informação conforme guia
        sessionStorage.setItem('setor', 'GESTOR');
        window.location.href = "PaginaPrincipal.html";
    } 
    // REGRA PARA ATENDIMENTO: operacional / opec2026
    else if (email === "operacional" && senha === "opec2026") {
        alert("Boas Vindas!");
        sessionStorage.setItem('setor', 'ATENDIMENTO');
        window.location.href = "PaginaPrincipal.html";
    } 
    // REGRA DE ERRO: Se nada disso estiver certo
    else {
        alert("Email ou Usuários inválidos"); // Mensagem de alerta exigida
        campoSenha.value = ""; // Limpa a senha para segurança
    }
}

function verificar() {
            let setor = sessionStorage.getItem('setor');
            if (!setor) { window.location.href = "index.html"; return; }
            
            document.getElementById('displaySetor').innerText = setor;
            
            if(setor === "ATENDIMENTO") {
                // Remove os botões que o atendimento não usa
                document.getElementById('m1').remove();
                document.getElementById('m4').remove();
                document.getElementById('m5').remove();
                
                // Os 3 que sobraram (Serviços, Agendamentos e Clientes) 
                // vão se ajustar automaticamente na primeira linha do grid de 3 colunas.
            }
        }
        function nav(url) { window.location.href = url; }
        function sair() { sessionStorage.clear(); window.location.href = "index.html"; }