import { useState } from "react";
import { Paciente } from "../../models/Pacientes";

function PacienteCadastrar() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [orgao, setOrgao] = useState("");
    const [tipoSanguineo, setTipoSanguineo] = useState("");

    function cadastrar(e: any) {
        e.preventDefault();
        const paciente: Paciente = {
            nome: nome,
            cpf: cpf,
            orgao: orgao,
            tipoSanguineo: tipoSanguineo,
        };
        fetch("http://localhost:5081/api/paciente/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
        })
        .then((resposta) => resposta.json())
        .then((pacienteCadastrado: Paciente) => {
            console.log(pacienteCadastrado);
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar paciente:", erro);
        });
    }

    return (
    <div>
        <h1>Cadastrar Paciente</h1>
        <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
        />{" "}
        <br />
        <label>CPF:</label>
        <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
        />{" "}
        <br />
        <label>Órgão:</label>
        <input
            type="text"
            value={orgao}
            onChange={(e) => setOrgao(e.target.value)}
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

export default PacienteCadastrar;
