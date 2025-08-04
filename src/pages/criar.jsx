import { Link } from "react-router-dom";
import { useState } from 'react';  
import { getinput } from "../utils/formUtils"; 
import { useNavigate} from "react-router-dom";
import { criar } from "../utils/formUtils";

function Criar() {
    const [listaTarefas, setListaTarefas] = useState([]); 
    const [loading, setloading] =useState(false)
    const navigate = useNavigate();

    const adicionar = async (e) => {
        e.preventDefault();
        if(listaTarefas.titulo && listaTarefas.descricao){
          try {
            setloading(true)
            const novatarefa = {
            titulo: listaTarefas.titulo,
            descricao: listaTarefas.descricao,
            status: listaTarefas.status || "Pendente"
          }
             sessionStorage.removeItem('tarefas')
             await criar(novatarefa)
             alert("Tarefa adicionada com sucesso!");
             navigate("/");
             setloading(false)
            }catch (error) {
            console.error(error)
            alert("erro ao criar o produto")
          }
        }
          else{
            alert('Preencha os campos vazios!')
          }      
        }
    

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">➕ Criar Nova Tarefa</h2>

      <div className="card shadow p-4">
        <form>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Estudar React"
              id="titulo"
                onChange={(e) => getinput(e, listaTarefas, setListaTarefas)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Detalhes da tarefa..."
              id="descricao"
                onChange={(e) => getinput(e, listaTarefas, setListaTarefas)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" id="status" onChange={(e) => getinput(e, listaTarefas, setListaTarefas)}>
              <option value="Pendente">Pendente</option>    
              <option value="Concluída">Concluída</option>
            </select>
          </div>

          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-success" onClick={adicionar}disabled = {loading}>
          {loading ? (<>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
                Salvando...
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

export default Criar;