import { useEffect, useState } from "react";
import { Orgao } from "../../models/Orgaos";

function OrgaoCadastrar() {
    const [nome, setNome] = useState("");
    const [dataRecebimento, setDataRecebimento] = useState("");
    const [tipoSanguineo, setTipoSanguineo] = useState("");

    function cadastrar(e: any) {
        e.preventDefault();
        const orgao: Orgao = {
            nome: nome,
            dataRecebimento: dataRecebimento,
            tipoSanguineo: tipoSanguineo,
        };

        fetch("http://localhost:5081/api/orgao/cadastrar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(orgao),
        })
            .then((resposta) => resposta.json())
            .then((orgaoCadastrado: Orgao) => {
            console.log(orgaoCadastrado);
        })
            .catch((erro) => {
            console.error("Erro ao cadastrar órgão:", erro);
        });
    }

return (
    <div>
        <h1>Cadastrar Órgão</h1>
        <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
        />{" "}
        <br />
        <label>Data de Recebimento:</label>
        <input
            type="date"
            value={dataRecebimento}
            onChange={(e) => setDataRecebimento(e.target.value)}
            required
        />{" "}
        <br />
        <label>Tipo Sanguíneo:</label>
        <input
            type="text"
            value={tipoSanguineo}
            onChange={(e) => setTipoSanguineo(e.target.value)}
            required
        />{" "}
        <br />
        <button type="submit">Cadastrar</button>
        </form>
    </div>
    );
}

export default OrgaoCadastrar;
