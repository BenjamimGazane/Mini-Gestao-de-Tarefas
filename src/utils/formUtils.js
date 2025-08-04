import Criar from "../pages/criar"
import axios from "axios"

const API = "https://api-tarefas-o5fd.onrender.com/tarefa";

export function getinput(e,objeto,setobjeto){
    setobjeto({...objeto,[e.target.id]: e.target.value})
}

export const criar = async (objeto) => axios.post(API, objeto);

export const listar = async () => axios.get(API);

export const listar_unico = async (id, objeto) => axios.get(`${API}/${id}`,objeto);

export const atualizar = async(id, objeto) => axios.put(`${API}/${id}`,objeto)

export const eliminar = async(id) => axios.delete(`${API}/${id}`)