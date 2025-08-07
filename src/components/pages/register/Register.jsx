import styles from './Register.module.css';
import Input from '../../forms/Input';
import SubmitButton from '../../forms/SubmitButton';
import Message from '../../layouts/message/Message';
import { registerUser } from '../../../services/api/userService';
import { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';

function Register(){
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const clear = () =>{
        newUser.email = ''
        newUser.name = ''
        newUser.password = ''
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;

        setNewUser({
            ...newUser,
            [name]: value
        })
    }
    const handleSubmit  = async (e) => {
        e.preventDefault();

        try{
            const data = await registerUser(newUser)
            console.log(data)
            setMessage(data.mensagem)
            
            setTimeout(() =>{
                setMessage('')
                clear();
                navigate('/login')
            }, 2000)
            
        }catch (error){
            console.log('erro ao registrar', error.message);
            setMessage(error.message);

            setTimeout(() =>{
                setMessage('')
                clear()
            }, 2000)
        }

    }
    
    useEffect(() =>{
        console.log(newUser)
    },[newUser])
    return (
        <div className={styles.register_container}>
            {message && <Message type="success" msg={message}/>}
            <div className={styles.texts_header}>
                <h1>Vamos criar sua <br /> Conta ✍️</h1>
                <p>Olá amigo, que você tenha <br />uma ótima jornada</p>
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Digite seu nome"
                    name="name"
                    placeholder="Nome"
                    handleOnChange={handleChange}
                    value={newUser.name ? newUser.name : ''}
                />
                 <Input
                    type="email"
                    text="Digite seu email"
                    name="email"
                    placeholder="Email"
                    handleOnChange={handleChange}
                    value={newUser.email ? newUser.email : ''}
                />
                 <Input
                    type="password"
                    text="Digite sua senha"
                    name="password"
                    placeholder="password"
                    handleOnChange={handleChange}
                    value={newUser.password ? newUser.password : ''}
                />
                <SubmitButton text="Criar"/>
            </form>
            <span>Já tem uma conta ?<Link to={'/login'}>Login</Link></span>
        </div>
    )
}

export default Register;
