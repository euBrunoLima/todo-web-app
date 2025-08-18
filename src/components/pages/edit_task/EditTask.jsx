import styles from './EditTask.module.css';

import Input from "../../forms/Input.jsx";
import SubmitButton from "../../forms/SubmitButton.jsx";
import TextArea from "../../forms/TextArea.jsx";
import SelectCategory from "../../forms/SelectCategory.jsx";
import Message from "../../layouts/message/Message.jsx";
import Loading from "../../layouts/loading/Loading.jsx";

import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext, useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import {getTaskById } from '../../../services/api/taskService.js';

function EditTask() {
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);


    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        deadlineDate: '',
        deadlineTime: '',
        user_id: user.id,
        category_id: '1'
    });
    const [subTask, setSubTask] = useState([{
        title: '',
        task_id: id,
    }]);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Busca a tarefa ao abrir a página
    useEffect(() => {
        const fetchTask = async () => {

            if (!id || !token){
                return;
            }

            try {
                const task = await getTaskById(id, token);
                console.log("Tarefa encontrada:", task);

                setNewTask({
                    title: task.dados.title || '',
                    description: task.dados.description || '',
                    deadlineDate: task.dados.deadlineDate ? task.dados.deadlineDate.split('T')[0] : '',
                    deadlineTime: task.dados.deadlineTime || '',
                    user_id: task.dados.user_id,
                    category_id: task.dados.category_id || ''
                });
            } catch (error) {
                console.error("Erro ao buscar tarefa:", error);
                setMessage("Erro ao carregar tarefa.");
            }
        };

        fetchTask();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const addSubtask = () => {
    // adiciona uma subtask "vazia" para edição
        setSubTask([...setSubTask, { title: "", task_id: taskId }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            setLoading(false);
            return;
        }

        try {
            const response = await updateTask(id, newTask, token);
            setMessage(response.mensagem || "Tarefa atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            setMessage(error.message || "Erro ao atualizar tarefa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.newTask_container}>
            {message && <Message type="success" msg={message} />}
            {loading && <Loading />}
            <div className={styles.conteudo}>
                <header>
                    <h1>Editar tarefa</h1>
                    <h2>{newTask.title}</h2>
                </header>

                <SelectCategory
                    value={newTask.category_id || ''}
                    onChange={(categoryId) => setNewTask(prev => ({ ...prev, category_id: categoryId }))}
                />

                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        text="Título da tarefa"
                        name="title"
                        placeholder="Título..."
                        handleOnChange={handleChange}
                        value={newTask.title || ''}
                        required ={true}
                    />

                    <Input
                        type="date"
                        text="Prazo"
                        name="deadlineDate"
                        handleOnChange={handleChange}
                        value={newTask.deadlineDate || ''}
                    />

                    <Input
                        type="time"
                        text="Hora"
                        name="deadlineTime"
                        handleOnChange={handleChange}
                        value={newTask.deadlineTime || 'digite a hora'}
                    />

                    <TextArea
                        text="Descrição"
                        name="description"
                        placeholder="Descreva a tarefa"
                        handleOnChange={handleChange}
                        value={newTask.description || ''}
                    />

                    <SubmitButton text="Atualizar tarefa" />
                </form>
            </div>
        </div>
    );
}

export default EditTask;
