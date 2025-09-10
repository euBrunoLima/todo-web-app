import styles from './Calendar.module.css'
import './Calendar.css'
import Menu from "../../layouts/menu/Menu";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { fetchUserTasks } from '../../../services/api/taskService';
import { AuthContext } from '../../../context/AuthContext';
import TaskCard from '../../task_layout/taskCard/TaskCard';
import TaskCardDay from '../../task_layout/taskCardDay/TaskCardDay';
import AddTask from '../../task_layout/addTask/AddTask';
import WithoutTask from '../../task_layout/without_task/WithoutTask';

function Calendar() {
    const { user, token } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]); 

    function handleChange(args) {
        const newDate = args.value;
        setSelectedDate(newDate);

        // Filtra as tarefas de acordo com o dia selecionado
        const selectedISO = formatDateToISO(newDate);

        const filteredTasks = allTasks.filter(
            (task) => task.deadlineDate.split("T")[0] === selectedISO
        );

        setTasks(filteredTasks);

        console.log("Data selecionada:", selectedISO);
        console.log("Tarefas filtradas:", filteredTasks);
    }

    function formatDateToISO(date) {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // mesmo formato que vem da API
    }

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

    useEffect(() =>{
        console.log(tasks)
    }, [tasks])

    return (
        <div className={styles.calendar_container}>
            <div className={styles.conteudo}>
                <CalendarComponent
                    className={styles.calendarioCustom}
                    value={selectedDate}  
                    change={handleChange}
                />
                
                <div className={styles.cards_filter_day}>
                    {tasks.length > 0 ? 
                        tasks.map(task =>(
                            <TaskCardDay
                                key={task.id}
                                id={task.id}
                                name={task.title}
                                initialStatus={task.status}
                                deadlineDate={task.deadlineDate}
                                deadlineTime={task.deadlineTime}
                                onStatusChange={(id, newStatus) => {
                                    console.log(`Status da tarefa ${id} alterado para: ${newStatus}`,
                                    console.log(task.id, task.title, newStatus, task.deadlineDate, task.deadlineTime)
                                    );
                                   
                                }}  
                                />
                        ))
                     : 
                       <WithoutTask/>
                    
                    }

                    <div className={styles.btn_add}>
                        <AddTask />
                    </div>

                </div>

            </div>

            <div className={styles.menu_inferior}>
                <Menu/>
            </div>
        </div>
    );
}

export default Calendar;
