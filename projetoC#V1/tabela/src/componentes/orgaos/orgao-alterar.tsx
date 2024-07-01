import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Orgao {
    id: number;
    nome: string;
    tipo: string;
}

const OrgaoAlterar: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");

    useEffect(() => {
        if (id) {
            axios.get<Orgao>(`http://localhost:5081/api/orgao/buscar/${id}`)
                .then(response => {
                    setNome(response.data.nome || "");
                    setTipo(response.data.tipo || "");
                })
                .catch(error => {
                    console.error("Erro ao buscar órgão:", error);
                });
        }
    }, [id]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const orgao: Orgao = {
            id: parseInt(id!), // Certifique-se de que id está presente e é um número
            nome: nome,
            tipo: tipo,
        };

        axios.put<Orgao>(`http://localhost:5081/api/orgao/alterar/${id}`, orgao)
            .then(() => {
                navigate("/orgao/listar");
            })
            .catch(error => {
                console.error("Erro ao alterar órgão:", error);
            });
    };

    return (
        <div>
            <h1>Alterar Órgão</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input
                        type="text"
                        value={tipo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTipo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default OrgaoAlterar;
