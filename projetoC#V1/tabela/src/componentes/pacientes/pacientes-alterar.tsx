import { useEffect, useState } from "react";
import { Paciente } from "../../models/Pacientes";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PacienteAlterar() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [orgao, setOrgao] = useState("");
    const [tipoSanguineo, setTipoSanguineo] = useState("");

    useEffect(() => {
        if (id) {
        axios
        .get<Paciente>(`http://localhost:5081/api/paciente/buscar/${id}`)
        .then((resposta) => {
            setNome(resposta.data.nome || "");
            setCpf(resposta.data.cpf || "");
            setOrgao(resposta.data.orgao || "");
            setTipoSanguineo(resposta.data.tipoSanguineo || "");
        })
        .catch((erro) => {
            console.error("Erro ao buscar paciente:", erro);
        });
        }
    }, [id]);

    function salvar(e: any) {
    e.preventDefault();
    const paciente: Paciente = {
        id: parseInt(id!),  // Certifique-se de que id está presente e é um número
        nome: nome,
        cpf: cpf,
        orgao: orgao,
        tipoSanguineo: tipoSanguineo,
    };
    axios
        .put<Paciente>(`http://localhost:5081/api/paciente/alterar/${id}`, paciente)
        .then((pacienteAlterado) => {
            navigate("/paciente/listar");
        })
        .catch((erro) => {
            console.error("Erro ao alterar paciente:", erro);
        });
}

    return (
        <div>
        <h1>Alterar Paciente</h1>
        <form onSubmit={salvar}>
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
            <button type="submit">Salvar</button>
        </form>
        </div>
    );
}

export default PacienteAlterar;
