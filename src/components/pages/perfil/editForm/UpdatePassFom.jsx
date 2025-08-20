import styles from './UpdateUserForm.module.css'
import { useState } from "react";
import Message from "../../../layouts/message/Message.jsx";
import Loading from "../../../layouts/loading/Loading.jsx";

import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx"; 

import { updatePassword } from '../../../../services/api/userService.js';


export default function UpdatePassForm({onFormSubmit}){

    const {user, token} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        senhaAtual: "",
        novaSenha: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if(!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        setLoading(false);
        return;
      }

      if(!formData.senhaAtual || !formData.novaSenha){
        setMessage("Por favor, preencha todos os campo. ")

        setTimeout(() => {
          setMessage('')
        }, 2000);

        return;
      }

      try {
        const response = await updatePassword(user.id, formData, token);
        setMessage(response.mensagem || "Senha atualizada com suçesso")

        setFormData({
            ...formData,
            senhaAtual: '',
            novaSenha: ''
        })

       setTimeout(() => {
        setMessage('');
        setTimeout(() => {
          onFormSubmit();
        }, 0);
      }, 1800);


      } catch (error) {
          console.error("Erro ao atualizar senha:", error);
          setMessage(error.message || "Erro ao atualizar senha.");

          setTimeout(() => {
            setMessage('')
          }, 2000);
      }finally{
        setLoading(false)
      }



    };
   return (
    <div className={styles.form_container}>
      {message && <Message msg={message}/>}
      {loading && <Loading/>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="senhaAtual">Senha atual</label>
        <input
          type="password"
          id="senhaAtual"
          name="senhaAtual"
          placeholder="Digite sua senha"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="novaSenha">Nova senha</label>
        <input
          type="password"
          id="novaSenha"
          name="novaSenha"
          placeholder="Digite a nova senha"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  ); 
}

