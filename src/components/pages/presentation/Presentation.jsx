import styles from './presentation.module.css';
import img from './img_presentation.svg'
import { useNavigate } from 'react-router-dom';



function Presentation(){

    const navigate = useNavigate();

    
    function goTo(rota){
        navigate(`/${rota}`)
    }

    return(
        <div className={styles.presentation_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Organize suas <br />tarefas</h1>
                <p>
                    Planeje seu dia, acompanhe seu progresso
                    e conclua suas metas com facilidade.
                </p>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => goTo('login')}>Login</button>
                <button onClick={() => goTo('register')}>Registrar</button>
            </div>
        </div>
    )
}

export default Presentation;
