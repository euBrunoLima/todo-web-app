import styles from './ForgotPassword.module.css';
import Input from '../../forms/Input.jsx';
import SubmitButton from '../../forms/SubmitButton.jsx';
import img from './img_forgot_password.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword(){
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    function handleChange(e){
        setEmail(e.target.value)
        console.log(email)
    }

    function handleSubmit(e){
        e.preventDefault();

        //Chamada da Api, futuramente

        navigate('/email_sent');

    }

    return(
        <div className={styles.forgot_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.under_img_container}>
                <div className={styles.texts}>
                    <h1>Esqueceu sua <br/>Senha?</h1>
                    <p>
                        Não se preocupe! Isso acontece. <br/>
                        Insira o seu endereço de email para o qual enviaremos uma mensagem.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        text="Digite seu email"
                        name="email"
                        placeholder="Digite seu email"
                        handleOnChange={handleChange}
                        value={email ? email : ''}
                    />
                    
                    <SubmitButton text="Enviar"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;
