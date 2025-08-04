import { Link, useNavigate } from "react-router-dom";   
import { useEffect, useState } from 'react';
import { eliminar, listar } from "../utils/formUtils";
 
function Home() {
  const [listaTarefas, setListaTarefas] = useState([]);
  const navigate = useNavigate();

    const dados = async() => {
        const resposta = await listar();
        sessionStorage.setItem('tarefas', JSON.stringify(resposta.data))
        setListaTarefas(resposta.data)
      }

  useEffect(() => {
      const tarefa = sessionStorage.getItem("tarefas");

      if(tarefa){
        const tarefassalvas = JSON.parse(tarefa)
        setListaTarefas(tarefassalvas)
      }
      else{
      dados()
      }
  },[])

    const Atualizar = () => {
      sessionStorage.removeItem("tarefas");
      dados();
    }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📋 Minhas Tarefas</h2>
        <Link to="/criar" className="btn btn-success btn-lg shadow">
          ➕ Criar Nova Tarefa
        </Link>
      </div>

    <div className="row">
       {listaTarefas.map((tarefa) => (
        <div key={tarefa.id} className="col-6 col-md-6 col-lg-4 mb-4">
            <div className="card shadow h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                 <div>
                    <h5 className="card-title">{tarefa.titulo}</h5>
                    <p className="card-text">{tarefa.descricao}</p>
                </div>
                <div className="text-center mt-auto"></div>
                <span
                    className={`badge rounded-pill px-3 py-2 mt-2 ${
                        tarefa.status === "Concluída" ? "bg-success" : "bg-warning text-dark"
                    }`}
                    style={{ width: "fit-content" }}
                    >
                    {tarefa.status}
                </span>
                </div>
             <div className="card-footer d-flex justify-content-between">
                <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>{
                  localStorage.setItem("tarefaeditada", JSON.stringify(tarefa))
                 navigate('/editar');
                }
                }
                >
                ✏️ Editar
                </button>
            <button
                className="btn btn-sm btn-outline-danger"
                onClick={async() =>{
                    await eliminar(tarefa.id);
                    Atualizar();
                }
                }
                >
                🗑️ Remover
            </button>
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  );
}

export default Home;