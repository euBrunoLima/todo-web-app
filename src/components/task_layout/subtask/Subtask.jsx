import { FaTimes } from 'react-icons/fa';
import styles from './Subtask.module.css';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext.jsx";
import {createSubTask} from '../../../services/api/subTaskServer.js'
import { deleteSubTask } from '../../../services/api/subTaskServer.js';

function Subtask({ id, title, initialStatus, onStatusChange, reLoad, onCreate }) {
    const {id: task_id} = useParams()
    const {token} = useContext(AuthContext)
    const [status, setStatus] = useState(initialStatus);
    const [titleV, setTitleV] = useState({title: title || '', status: initialStatus || false})
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleStatus = () => {
        const newStatus = !status;
        setStatus(newStatus);
        if (onStatusChange) onStatusChange(id, newStatus);
    };
    const handleChange = (e) =>{
        setTitleV({title: e.target.value})
    }
    const handleKeyDown = async (e) => {
        
        if (e.key === 'Enter') {
            e.preventDefault();
                if(!titleV){
                    alert("O título é obrigatorio!")
                    return
                }
            await handleSubmit();
            onCreate()
        }
    };
    const handleSubmit = async () =>{
        
        if (!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            return;
        }
        
        try {
            const response = await createSubTask(titleV, task_id, token );
            console.log(response.mensagem)
            console.log("sub-tarefa criada com sucesso");
        } catch (error) {
            console.log("Erro ao criar sub-tarefa:", error)
            console.log(response.mensagem)
            
        }
    }
    const handleDelete = async () => {
        try {
            const response = await deleteSubTask(id, task_id, token);
            console.log(response.mensagem)
            reLoad()
        } catch (error) {
            console.log("Erro ao deletar sub-tarefa", error)
        }
    }
    const handleUpdate = async () =>{

    }

    
    useEffect(() =>{
        console.log(titleV)

    }, [titleV])
    return(
        <div className={styles.subtask_container}>
            <div className={styles.check_wrapper}>
                <input
                    type="checkbox"
                    id={`check-${id}`}
                    checked={status}
                    onChange={handleStatus}
                    className={styles.check_input}
                />
                <label htmlFor={`check-${id}`} className={styles.check_label}></label>
            </div>
            <input type="text" name="title" id="title" value={titleV.title} onChange={handleChange} onKeyDown={handleKeyDown}/>
           <button onClick={()=>handleDelete()}> <FaTimes /></button>
        </div>
    )
    
}


export default Subtask;
