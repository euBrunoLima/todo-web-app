import styles from './EmailSent.module.css';
import SubmitButton from '../../forms/SubmitButton';
import img from './img_email.svg';
import { useNavigate } from 'react-router-dom';


function EmailSent(){

    const navigate = useNavigate();

    function goTo(rota){
        navigate(`/${rota}`)
    }
    
    return(
        <div className={styles.email_container}>
            <div className={styles.img}>
                <img src={img} alt="carta imagem" />
            </div>
            <div className={styles.texts}>
                <h1>Email enviado <br /> com sucesso ✌️</h1>
                <p>
                    Enviamos um link para redefinir a senha.<br />
                    Por favor, chegue sua caixa de mensagens.
                </p>
            </div>

            <SubmitButton text="Voltar para login." onClick={() => goTo("login") }/>
            
        </div>
    )
}

export default EmailSent;

