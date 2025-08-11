import TaskCard from "../../task_layout/taskCard/TaskCard";
import Menu from "../../layouts/menu/Menu";
import styles from './TaskList.module.css';
import CategoryTabs from "../../task_layout/categories/Categories";
import { Link } from "react-router-dom";
import imgPerfil from '../../../../public/imgs/perfil.png'; // Assuming you have a profile image


function TaskList({id, name,}){

    const categories = ["Todos", "Trabalhos", "Pessoal", "Lista", "Compras", "Outros"];
    
        const handleCategorySelect = (category) => {
        console.log("Categoria selecionada:", category);
        // Aqui você pode filtrar suas tarefas
      };
    return(
        <div className={styles.task_container}>
            <div className={styles.conteudo}>
                <header>
                    <div className={styles.header_texts}>
                        <h1>Olá, Bruno Lima!</h1>
                        <p>tenha um ótimo dia.</p>
                    </div>
                    <Link to="/perfil"> <img src={imgPerfil} alt="image perfil" /> </Link>
                </header>

                <div className={styles.category_tabs}>
                    <h2>Suas Categorias:</h2>
                    <CategoryTabs
                        categories={categories}
                        onSelect={handleCategorySelect}
                    />
                </div>
                
                
                <div className={styles.task_list_container}>
                    <h2>Minhas Tarefas:</h2>
                    <div className={styles.task_list}>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>
                        <TaskCard/>

                    </div>
                </div> 
                
            </div>
           
            <div className={styles.menu_inferior}>
                <Menu/>
            </div>
        </div>
    )
}

export default TaskList;