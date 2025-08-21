import styles from './NewTask.module.css';

import Input from "../../forms/Input.jsx";
import SubmitButton from "../../forms/SubmitButton.jsx";
import TextArea from "../../forms/TextArea.jsx";
import SelectCategory from "../../forms/SelectCategory.jsx";
import Message from "../../layouts/message/Message.jsx";
import Loading from "../../layouts/loading/Loading.jsx";
import NavTop from '../../layouts/nav_top/NavTop.jsx';

import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext, useState, useEffect } from 'react';
import { createTask } from '../../../services/api/taskService.js';

function NewTask() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, token } = useContext(AuthContext);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadlineDate: '',
    deadlineTime: '',
    user_id: user?.id || '',
    category_id: '1'
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  }

  useEffect(() => {
      console.log(newTask)
  }, [newTask]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);

    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }

    try {
        const response = await createTask(newTask, token);
        setMessage(response.mensagem);
        console.log("Tarefa criada com sucesso:", response);

        setTimeout(() => {
            setMessage('');
            setNewTask({
                title: '',
                description: '',
                deadlineDate: '',
                deadlineTime: '',
                user_id: user?.id || '',
                category_id: '1'
            });
        }, 2000);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        setMessage(error.message);
        setTimeout(() => {
            setMessage('');
        }, 2000);
    }finally{
        setLoading(false);
    }
    
    // createTask(newTask, token)
    //   .then((data) => {
    //     setMessage(data.mensagem);
    //     console.log("Tarefa criada com sucesso:", data);
    //     // Aqui você pode redirecionar ou limpar o formulário
    //     setNewTask({
    //       title: '',
    //       description: '',
    //       deadlineDate: '',
    //       deadlineTime: '',
    //       user_id: user?.id || '',
    //       category_id: '1'
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao criar tarefa:", error);
    //   });
      
  }
    
  return (
    <div className={styles.newTask_container}>
      {message && <Message type="success" msg={message}/>}
      {loading && <Loading/>}
      <div className={styles.conteudo}>
        <NavTop Rota="tasks"/>
        <header>
          <h1>Nova tarefa</h1>
        </header>

         <SelectCategory
            onChange={(categoryId) => setNewTask({ ...newTask, category_id: categoryId })}
          />

        <form onSubmit={handleSubmit}>
          <Input
            type="text" 
            text="Titulo da tarefa" 
            name="title" 
            placeholder="Titulo..."
            handleOnChange={handleChange}
            value={newTask.title}
            required={true}
          />

          <Input 
            type="date"
            text="Prazo" 
            name="deadlineDate"
            handleOnChange={handleChange}
            value={newTask.deadlineDate}
          />

          <Input 
            type="time" 
            text="Hora" 
            name="deadlineTime"
            handleOnChange={handleChange}
            value={newTask.deadlineTime}
            />

          <TextArea
            text="Descrição"
            name="description"
            placeholder="Descreva a tarefa"
            handleOnChange={handleChange}
            value={newTask.description}
          />

          
         
         

          <SubmitButton text="Criar tarefa" />

        </form>
      </div>
    </div>
  );
  }


export default NewTask;