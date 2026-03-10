document.addEventListener('DOMContentLoaded', function() {
    const mesAno = document.getElementById('mesAno');
    const dias = document.getElementById('dias');
    const janela = document.getElementById("janela");
    const tituloDia = document.getElementById("tituloDia");
    const btnFechar = document.getElementById("fechar");

    const btnAnterior = document.getElementById("anterior");
    const btnProximo = document.getElementById("proximo");

    // VARIÁVEIS DO ARRASTAR
    let arrastar = false;
    let offsetX = 0;
    let offsetY = 0;

    // EVENTO QUANDO COMEÇA A ARRASTAR
    janela.addEventListener("mousedown", function(e) {
        arrastar = true;

        offsetX = e.clientX - janela.offsetLeft;
        offsetY = e.clientY - janela.offsetTop;
    });

    // MOVIMENTO DO MOUSE
    document.addEventListener("mousemove", function(e) {
        if(!arrastar) return;

        janela.style.left = (e.clientX - offsetX) + "px";
        janela.style.top = (e.clientY - offsetY) + "px";
    });

    // PARAR DE ARRASTAR
    document.addEventListener("mouseup", function() {
        arrastar = false;
    });

    // data atual do sistema
    let dataAtual = new Date();
    
    function atualizarCalendario() {

        // pega o mês, ano e dia atual
        const mes = dataAtual.getMonth();
        const ano = dataAtual.getFullYear();
        const diaAtual = dataAtual.getDate();
        
        // descobre em qual dia da semana o mês começa (0 = domingo)
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

        // descobre quantos dias o mês possui
        const totalDiasMes = new Date(ano, mes + 1, 0).getDate();

        const nomesMeses = [
            "Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro" 
        ];

        // escreve o mês e ano no topo do calendário
        mesAno.textContent = nomesMeses[mes] + " " + ano;

        // limpa os dias antigos antes de gerar o novo calendário
        dias.innerHTML = "";

        // Criar os 42 dias vazios
        for(let i = 0; i < 42; i++) {
            // cria um quadrado do calendário
            const dia = document.createElement("div");
            // calcula qual número do mês deveria aparecer aqui
            const numeroDia = i - primeiroDiaSemana + 1;

            // verifica se esse número pertence ao mês atual
            if(numeroDia > 0 && numeroDia <= totalDiasMes) {
                // escreve o número do dia
                dia.textContent = numeroDia;

                // se for o dia atual, adiciona a classe de destaque
                if(numeroDia === diaAtual) {
                    dia.classList.add("diaSelecionado");
                }
                // detectar clique no dia
                dia.addEventListener("click", () => abrirJanela(numeroDia));
            }

            // adiciona o quadrado no calendário
            dias.appendChild(dia);
        } 
    };

    function abrirJanela(dia) {
        tituloDia.textContent = "Dia " + dia;
        janela.style.display = "flex";
    };

    btnFechar.addEventListener("click", function() {
        janela.style.display = "none";
    });

    // Botoes pra mudar os meses
    btnAnterior.addEventListener("click", function() {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        atualizarCalendario();
    });
    btnProximo.addEventListener("click", function() {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        atualizarCalendario();
    });


    // executa a função quando a página carrega
    atualizarCalendario();
});