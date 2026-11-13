const express = require("express");
const cors = require("cors");

const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste", async (req, res) => {

    const { data, error } = await supabase
        .from("solicitacoes")
        .select("*");

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.json(data);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

// Rota para cadastrar uma solicitação
app.post("/api/solicitacoes", async (req, res) => {

    const { titulo, descricao, prioridade, categoria } = req.body;

    // Verificar se os campos foram preenchidos
    if (!titulo || !descricao || !prioridade || !categoria) {
        return res.status(400).json({
            erro: "Preencha todos os campos."
        });
    }

    // Inserir no Supabase
    const { data, error } = await supabase
        .from("solicitacoes")
        .insert({
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade,
            categoria: categoria
        });

    if (error) {
        console.error(error);

        return res.status(500).json({
            erro: error.message
        });
    }

    res.status(201).json({
        mensagem: "Solicitação cadastrada com sucesso!",
        solicitacao: data
    });
});