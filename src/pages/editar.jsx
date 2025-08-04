import { Link } from "react-router-dom";
import { use, useState } from 'react';
import { getinput } from "../utils/formUtils";
import { atualizar } from "../utils/formUtils"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Editar() {

    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const [tarefaEditada, setTarefaEditada] = useState(
        JSON.parse(localStorage.getItem("tarefaeditada")) || {}
    );

    const editar = async() =>{
        setloading(true)
        await atualizar(tarefaEditada.id,tarefaEditada)
        alert("Produto editado com sucesso!")
        sessionStorage.removeItem("tarefas");
        navigate("/");
        setloading(false)
    }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">✏️ Editar Tarefa</h2>

      <div className="card shadow p-4">
        <form>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              defaultValue= {tarefaEditada.titulo}
              id="titulo"
              onChange={(e) => getinput(e, tarefaEditada, setTarefaEditada)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              rows="4"
              defaultValue={tarefaEditada.descricao}
              id="descricao"
              onChange={(e) => getinput(e, tarefaEditada, setTarefaEditada)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" defaultValue={tarefaEditada.status} id="status" onChange={(e) => getinput(e, tarefaEditada, setTarefaEditada)}>
              <option value="Pendente">Pendente</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>

          <div className="d-flex gap-3">
            <button type="button" className="btn btn-primary" onClick={editar} disabled = {loading}>
          {loading ? (<>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
                Atualizando...
          </>) : (<>
            <i className="bi bi-save"></i> Salvar Tarefa
          </>)}
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}