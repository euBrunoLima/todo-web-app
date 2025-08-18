import styles from "./AddTask.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddTask() {

    const navigate = useNavigate();
    function goTo(rota){
        navigate(`/${rota}`)
    }

  return (
    <button onClick={() => goTo('new_task')} className={styles.btnAdd}><span>+</span></button>
  );
}

export default AddTask;
