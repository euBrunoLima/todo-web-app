import styles from './EditTask.module.css';

import Input from "../../forms/Input.jsx";
import SubmitButton from "../../forms/SubmitButton.jsx";
import TextArea from "../../forms/TextArea.jsx";
import SelectCategory from "../../forms/SelectCategory.jsx";
import Message from "../../layouts/message/Message.jsx";
import Loading from "../../layouts/loading/Loading.jsx";
import NavTop from '../../layouts/nav_top/NavTop.jsx';
import EditModal from './Modal/EditModal.jsx';
import Subtask from '../../task_layout/subtask/Subtask.jsx';


import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext, useState, useEffect, use } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getTaskById } from '../../../services/api/taskService.js';
import { updateTask } from '../../../services/api/taskService.js';
import { getAllByTask } from '../../../services/api/subTaskServer.js';



function EditTask() {
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);

    const navigate = useNavigate()

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        deadlineDate: '',
        deadlineTime: '',
        user_id: user.id,
        category_id: ''
    });
    const [subTasks, setSubTask] = useState([]);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [shoModal, setShowModal] = useState(false)

    const toggleModal = () =>{
        setShowModal(!shoModal)
        console.log(shoModal)
    }
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

                setTimeout(() => {
                    setMessage('')
                }, 1500);
            }finally{
                setLoading(false);
                
            }
        };
        fetchTask();
    }, [id, token]);
    const response = async () => {
            if (!id || !token){
                return;
            }

            try{
                const subTask = await getAllByTask(id, token)
                console.log(subTask.mensagem || "sub-tarfas encontradas")
                console.log(subTask)
            
                setSubTask(subTask.dados)
                

            }catch(error){
                console.error("Erro ao buscar sub-tarefas:", error);
            }
    }
    useEffect(() =>{
        response()
    }, [id, token])
    
    useEffect(() => {
        console.log("Dados da tarefa atualizados:", newTask);
    }, [newTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const addSubtask = () => {
        setSubTask([...subTasks, {id: '', title: '', status: false}]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            setLoading(false);
            return;
        }
        if(!newTask.title) {
            setMessage("O título da tarefa é obrigatório.");
            setLoading(false);
            return;
        }
        if(!newTask.deadlineDate || !newTask.deadlineTime){
            setNewTask(prev => ({
                ...prev,
                deadlineDate: null,
                deadlineTime: null
            }));
        }

        try {
            const response = await updateTask(id, newTask, token);
            setMessage(response.mensagem || "Tarefa atualizada com sucesso!");
            setTimeout(() => {
                setLoading(false)
                setMessage('')
                navigate("/tasks")
            }, 2000);
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            setMessage(error.message || "Erro ao atualizar tarefa.");

             setTimeout(() => {
                setMessage('')
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

  
    return (
        <div className={styles.editTask_container}>
            {message && <Message type="success" msg={message} />}
            {loading && <Loading />}   
            <div className={styles.conteudo}>
                <NavTop Rota="tasks" onClick={toggleModal}/>
                {shoModal && <EditModal/>}
                <header>
                    <h1>Editar tarefa</h1>
                    <h2>{newTask.title}</h2>
                </header>
                {/* <hr /> */}
                <SelectCategory
                    defaultCategoryId={newTask.category_id}
                    onChange={(categoryId) => setNewTask(prev => ({ ...prev, category_id: categoryId }))}
                />

                <div className={styles.sub_task_container}>
                    <header className={styles.subtask_header}>
                        <h2>Subtarefas</h2>
                        <button onClick={() => addSubtask()}>Adicionar</button>
                    </header>

                    <div className={styles.cards_container}>
                        {subTasks.length > 0 ?
                            subTasks.map(subtask =>(
                                <Subtask
                                    key={subtask.id}
                                    id={subtask.id}
                                    title={subtask.title}
                                    status={subtask.status}
                                    reLoad={response}
                                    onCreate={addSubtask}
                                />
                            ))
                            :
                            <p>nehunha sub-tarefa</p>
                        }
                    </div>
                </div>
                <hr/>
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
                        value={newTask.deadlineTime || ''}
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
