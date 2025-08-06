import styles from './Login.module.css';
import Input from '../../forms/Input';
import SubmitButton from '../../forms/SubmitButton';
import { useNavigate, Link } from 'react-router-dom';


function Login(){

    const navigate = useNavigate();

    return(
        <div className={styles.login_container}>

            <div className={styles.login_header}>
                <h1>Vamos fazer login</h1>
                <p>Seja bem vindo <span>👋</span><br/> Nós sentimos sua falta</p>
            </div>

            <form action="">
                <div className={styles.inputs_container}>
                    <Input
                        type="email"
                        text="Digite seu email"
                        name="name"
                        placeholder="Digite seu email"
                        // handleOnChange={handleChange}
                    />
                    <Input
                        type="password"
                        text="Digite sua senha"
                        name="password"
                        placeholder="Digite sua senha"
                        // handleOnChange={handleChange}
                    />
                    <Link to="/forgot_password">Esqueceu a senha?</Link>
                </div>

                <SubmitButton text="Entrar"/>
            </form>
        </div>
    )
}

export default Login;