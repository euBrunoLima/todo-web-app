import { useState } from "react";
import styles from '../editForm/UpdateUserForm.module.css'
import Message from "../../../layouts/message/Message.jsx";
import Loading from "../../../layouts/loading/Loading.jsx";

import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { updateUser } from '../../../../services/api/userService.js';

export default function UpdateUserForm({onFormSubmit}) {

  const {user, token, setUser} = useContext(AuthContext); 
  
  const [formData, setFormData] = useState({
    name: user.nome,
    email: user.email,
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
    if(!formData.name || !formData.email){
        setMessage("Por favor, preencha todos os campo. ")
        console.log("Por favor, preencha todos os campo. ")

        setTimeout(() => {
          setMessage('')
        }, 2000);

        return;
    }

    try {
      const response = await updateUser(user.id, formData, token);
      setMessage(response.mensagem || "Perfil atualizado com sucesso!");
      
      setUser(prev => {
        const updatedUser = {
          ...prev,
          nome: formData.name,
          email: formData.email
        };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // salva no localStorage
        return updatedUser;
      });

      setTimeout(() => {
        setMessage('');
        setTimeout(() => {
          onFormSubmit();
        }, 0);
      }, 1800);


    }catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        setMessage(error.message || "Erro ao atualizar perfil.");

        setTimeout(() => {
          setMessage('')
        }, 2000);

        onFormSubmit()

      
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className={styles.form_container}>
      {message && <Message msg={message}/>}
      {loading && <Loading/>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

