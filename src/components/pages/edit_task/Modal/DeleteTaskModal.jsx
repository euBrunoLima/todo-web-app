import styles from './DeleteTaskModal.module.css';
import { deleteTask } from '../../../../services/api/taskService';

import { useParams, useNavigate  } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

import Loading from '../../../layouts/loading/Loading';
import Message from '../../../layouts/message/Message';

function DeleteTaskModal({onClose}){

    const { id } = useParams();
    const {user, token} = useContext(AuthContext);

    const navigate = useNavigate()

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async () =>{
        setLoading(true)

        if(!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            setLoading(false);
            return;
        }

        try {
           const response = await deleteTask(id, token);
           setMessage(response.mensagem || 'Tarefa deletada com sucesso')
           setTimeout(() =>{
            setLoading(false)
            setMessage('')
            onClose()
            navigate("/tasks")
           }, 1500)
        }catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            setMessage(error.message || "Erro ao deletar tarefa.");

            setTimeout(() => {
                setLoading(false)
                setMessage('')
                onClose()
            }, 2000);
        }finally{
            setLoading(false)
        }

    }

    return(
        <div className={styles.delete_task_container}>
            {message && <Message msg={message}/>}
            {loading && <Loading/>}
            <div className={styles.delete_task_box}>
                <h1>Excluir tarefa?</h1>
                <div className={styles.buttons}>
                    <button onClick={() => onClose()}>Cancelar</button>
                    <button onClick={() => handleDelete()}>Deletar</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteTaskModal;