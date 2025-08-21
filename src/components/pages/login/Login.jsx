import styles from './Login.module.css';
import Input from '../../forms/Input';
import SubmitButton from '../../forms/SubmitButton';
import { loginUser } from '../../../services/api/userService';
import Message from '../../layouts/message/Message';
import Loading from '../../layouts/loading/Loading';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';


function Login(){
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = useState("");
    const clear = () =>{
        setLogin({email: '', password: ''})
    }
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }
    const { login_context } = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        
        try {
            const response = await loginUser(login);
            setMessage(response.mensagem);
            login_context(response.token, response.usuario); // usar a função do context para salvar o token e dados do user

            setTimeout(() => {
                clear();
                setMessage('')
                navigate('/tasks')
            }, 500);

        } catch (error) {
            console.error('Erro ao fazer login', error.message)
            setMessage(error.message) 
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }finally{
            setLoading(false)
        }
    }


    useEffect(() =>{
        console.log(login)
    }, [login])

    return(
        <div className={styles.login_container}>
            {message && <Message type="success" msg={message}/>}
            {loading && <Loading/>}
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
                        required = {true}
                    />
                    <Input
                        type="password"
                        text="Digite sua senha"
                        name="password"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        value={login.password ? login.password : ''}
                        required = {true}
                    />
                    <Link to="/forgot_password">Esqueceu a senha?</Link>
                </div>

                <SubmitButton text="Entrar" disabled={loading}/>
            </form>

            <span>Não tem conta ?<Link to={'/register'}>Registre-se</Link></span>

        </div>
    )
}

export default Login;