import React, { useEffect, useState } from 'react';
import { Orgao } from '../../models/Orgaos';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrgaoListar() {
  const [orgaos, setOrgaos] = useState<Orgao[]>([]);

  useEffect(() => {
    carregarOrgaos();
  }, []);

  function carregarOrgaos() {
    axios.get('http://localhost:5081/api/orgao/listar')
      .then(response => {
        setOrgaos(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar órgãos:', error);
      });
  }

  function deletar(id: number) {
    axios.delete(`http://localhost:5081/api/orgao/remover/${id}`)
      .then(() => {
        carregarOrgaos(); // Recarrega a lista após a exclusão
      })
      .catch(error => {
        console.error('Erro ao deletar órgão:', error);
      });
  }

  return (
    <div>
      <h1>Listar Órgãos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de Recebimento</th>
            <th>Tipo Sanguíneo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orgaos.map(orgao => (
            <tr key={orgao.id}>
              <td>{orgao.id}</td>
              <td>{orgao.nome}</td>
              <td>{orgao.dataRecebimento}</td>
              <td>{orgao.tipoSanguineo}</td>
              <td>
                <button onClick={() => deletar(orgao.id!)}>Deletar</button>
              </td>
              <td>
                <Link to={`/orgao/alterar/${orgao.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrgaoListar;
