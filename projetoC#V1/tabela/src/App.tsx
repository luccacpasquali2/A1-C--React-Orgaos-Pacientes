import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import PacienteListar from "./componentes/pacientes/pacientes-listar";
import PacienteCadastrar from "./componentes/pacientes/pacientes-cadastrar";
import PacienteAlterar from "./componentes/pacientes/pacientes-alterar";
import OrgaoListar from "./componentes/orgaos/orgao-listar";
import OrgaoCadastrar from "./componentes/orgaos/orgao-cadastrar";
import OrgaoAlterar from "./componentes/orgaos/orgao-alterar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/paciente/listar">Listar Pacientes</a>
            </li>
            <li>
              <a href="/paciente/cadastrar">Cadastrar Paciente</a>
            </li>
            <li>
              <a href="/orgao/listar">Listar Órgãos</a>
            </li>
            <li>
              <a href="/orgao/cadastrar">Cadastrar Órgão</a>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/paciente/listar" element={<PacienteListar />} />
          <Route path="/paciente/cadastrar" element={<PacienteCadastrar />} />
          <Route path="/paciente/alterar/:id" element={<PacienteAlterar />} />
          <Route path="/orgao/listar" element={<OrgaoListar />} />
          <Route path="/orgao/cadastrar" element={<OrgaoCadastrar />} />
          <Route path="/orgao/alterar/:id" element={<OrgaoAlterar />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
