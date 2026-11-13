const formulario = document.querySelector(".form-solicitacao");

formulario.addEventListener("submit", async (event) => {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura os valores dos campos
    const dados = {
        titulo: document.querySelector("#titulo").value,
        descricao: document.querySelector("#descricao").value,
        prioridade: document.querySelector("#prioridade").value,
        categoria: document.querySelector("#categoria").value
    };

    try {

        // Envia os dados para o servidor
        const resposta = await fetch("http://localhost:3000/api/solicitacoes", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro);
        }

        alert(resultado.mensagem);

        formulario.reset();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar: " + erro.message);
    }

});