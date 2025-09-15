import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

import TaskCard from "../../task_layout/taskCard/TaskCard";
import Menu from "../../layouts/menu/Menu";
import styles from './TaskList.module.css';
import CategoryTabs from "../../task_layout/categories/Categories";
import imgPerfil from '../../../imgs/perfil.png';
import WithoutTask from "../../task_layout/without_task/WithoutTask.jsx";
import AddTask from "../../task_layout/addTask/AddTask.jsx";

import { fetchUserCategories } from "../../../services/api/categoryServer.js";
import { fetchUserTasks, updateTaskStatus } from "../../../services/api/taskService.js";




function TaskList() {
  const { user, token } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]); // Aqui você deve buscar ou armazenar as tasks
  const [allTasks, setAllTasks] = useState([]); // Mantém todas as tarefas para filtragem
  const [loadingCategories, setLoadingCategories] = useState(true);

  const nameCompleto = user?.nome || "Amigo";
  const firstName = nameCompleto.split(" ")[0] + " " + (nameCompleto.split(" ")[1] || "");

  useEffect(() => {
    if (!token) return;

    fetchUserCategories(token)
      .then(data => {
        const newCategories = [
          {id: 0, name: "Tudo", user_id: null},
          ...data.todas_categorias
        ]
        const orderedCategories = newCategories.sort((a,b) => a.id - b.id);
        setCategories(orderedCategories || []);
      })
      .catch(err => {
        console.error("Erro ao buscar categorias:", err);
        setCategories([]);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetchUserTasks(token)
    .then((data) =>{
      setAllTasks(data.dados || []);
      setTasks(data.dados || []);
    })
    .catch((err) => {
      console.error("Erro ao buscar tarefas:", err);
      setTasks([]);
    })
    
  }, [token]);

  const handleCategorySelect = (category) => {
    console.log("Categoria selecionada:", category);
    if (category.id === 0){
      setTasks(allTasks);
    }else{
      setTasks(allTasks.filter(task => task.category_id == category.id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try{
      const data  = await updateTaskStatus(id, newStatus, token);
      console.log(`${data.mensagem} - Tarefa ID: ${id}, Novo Status: ${newStatus}`);
    }catch(error){
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  
  };

   

  return (
    <div className={styles.task_container}>
      <div className={styles.conteudo}>
        <header>
          <div className={styles.header_texts}>
            <h1>{user?.nome ? `Olá, ${firstName}` : "Olá Amigo"}</h1>
            <p>tenha um ótimo dia.</p>
          </div>
          <Link to="/perfil">
            <img src={imgPerfil} alt="image perfil" />
          </Link>
        </header>

        <div className={styles.category_tabs}>
          <h2>Suas Categorias:</h2>
          {loadingCategories ? (
            <p>Carregando categorias...</p>
          ) : (
            <CategoryTabs
              categories={categories}
              onSelect={handleCategorySelect}
            />
          )}
        </div>

        <div className={styles.task_list_container}>
          <h2>Minhas Tarefas:</h2>
          <div className={styles.task_list}>
            {tasks.length === 0 ? (
                <WithoutTask />
            ) : (
              tasks.map(task => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  name={task.title}
                  initialStatus={task.status}
                  deadlineDate={task.deadlineDate}
                  deadlineTime={task.deadlineTime}
                  onStatusChange={handleStatusChange}
                    
                />
                
              ))
               
            )}    
          </div>
        </div>

        <AddTask />
        
      </div>
      <div className={styles.menu_inferior}>
        <Menu />
      </div>
    </div>
  );
}

export default TaskList;
