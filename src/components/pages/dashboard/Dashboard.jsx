import Menu from "../../layouts/menu/Menu";
import styles from "../tasks/TaskList.module.css"

function Dashboard(){
    return(
        <div className={styles.task_container}>
            <div className={styles.conteudo}>
                <h1>Dashboard</h1>
            </div>

            <div className={styles.menu_inferior}>
                <Menu/>
            </div>
        </div>
    )
}

export default Dashboard;
