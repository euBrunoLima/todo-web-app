import styles from "../tasks/TaskList.module.css";
import Menu from "../../layouts/menu/Menu";

function Calendar(){
    return(
        <div className={styles.task_container}>
            <div className={styles.conteudo}>
                <h1>Calendário</h1>
            </div>

            <div className={styles.menu_inferior}>
                <Menu/>
            </div>
        </div>
    )
}

export default Calendar;
    