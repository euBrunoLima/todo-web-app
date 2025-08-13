import styles from "./WithoutTask.module.css";
import imgTask from './img_without.svg';

function WithoutTask() {
  return (
    <div className={styles.without_container}>
        <div className={styles.without_task}>
            <img src={imgTask} alt="Sem tarefas" />
            <div className={styles.without_task_text}>
                <h3>Você não possui tarefas cadastradas.</h3>
                <p>Clique em + mais criar uma tarefa</p>
            </div>
        </div>
        
    </div>
  );
}

export default WithoutTask;
