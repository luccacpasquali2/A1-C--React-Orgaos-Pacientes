import React, { useEffect, useState } from 'react';
import { Paciente } from '../../models/Pacientes';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PacientesListar() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    carregarPacientes();
  }, []);

  function carregarPacientes() {
    axios.get('http://localhost:5081/api/paciente/listar')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar pacientes:', error);
      });
  }

  function deletar(id: number) {
    axios.delete(`http://localhost:5081/api/paciente/remover/${id}`)
      .then(() => {
        carregarPacientes(); // Recarrega a lista após a exclusão
      })
      .catch(error => {
        console.error('Erro ao deletar paciente:', error);
      });
  }

  return (
    <div>
      <h1>Listar Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Órgão</th>
            <th>Tipo Sanguíneo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nome}</td>
              <td>{paciente.cpf}</td>
              <td>{paciente.orgao}</td>
              <td>{paciente.tipoSanguineo}</td>
              <td>
                <button onClick={() => deletar(paciente.id!)}>Deletar</button>
              </td>
              <td>
                <Link to={`/paciente/alterar/${paciente.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesListar;
