import styles from './Login.module.css';
import Input from '../../forms/Input';
import SubmitButton from '../../forms/SubmitButton';
import { loginUser } from '../../../services/api/userService';
import Message from '../../layouts/message/Message';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Login(){
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = useState("");
    const clear = () =>{
        login.email = ''
        login.password = ''
    }
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
            const response = await loginUser(login);
            setMessage(response.mensagem);
            setToken(response.token);
            
            localStorage.setItem('token', response.token);
            setMessage(response.mensagem)

            //colocar uma futura img/svg de carregamento por causa do delay

            setTimeout(() => {
                clear();
                setMessage('')
                navigate('/tasks')
            }, 2000);

            console.log('usuario logado', response)
        } catch (error) {
            console.error('Erro ao fazer login', error.message)
            setMessage(error.message) 
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }
    }


    useEffect(() =>{
        console.log(login)
    }, [login])

    return(
        <div className={styles.login_container}>
            {message && <Message type="success" msg={message}/>}
            <div className={styles.login_header}>
                <h1>Vamos fazer seu <br />login 👋</h1>
                <p>Seja bem vindo<br/> Nós sentimos sua falta</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.inputs_container}>
                    <Input
                        type="email"
                        text="Digite seu email"
                        name="email"
                        placeholder="Digite seu email"
                        handleOnChange={handleChange}
                        value={login.email ? login.email : ''}
                    />
                    <Input
                        type="password"
                        text="Digite sua senha"
                        name="password"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        value={login.password ? login.password : ''}
                    />
                    <Link to="/forgot_password">Esqueceu a senha?</Link>
                </div>

                <SubmitButton text="Entrar"/>
            </form>

            <span>Não tem conta ?<Link to={'/register'}>Registre-se</Link></span>

        </div>
    )
}

export default Login;