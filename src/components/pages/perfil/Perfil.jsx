import styles from './Perfil.module.css';
import img1 from './imgs/back.png';
import img2 from './imgs/dots.png';
import imgPerfil from '../../../imgs/perfil.png';
import UpdateUserForm from './editForm/UpdateUserForm.jsx';
import UpdatePassForm from './editForm/UpdatePassFom.jsx';





import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext.jsx";

function Perfil() {

  const navigate = useNavigate();
  const {user, token, logout} = useContext(AuthContext); 

  const [showForm, setShowForm] = useState(false);
  const [showFormSenha, setFormSenha] = useState(false)

  
  const toggleEditPerfil = () =>{
    setShowForm(!showForm);
  }
  const toggleEditSenha = () =>{
    setFormSenha(!showFormSenha);
  }
   const navigateTo = (rota) =>{
    navigate(`/${rota}`)
  }
  const fecharFormPerfil = () =>{
    setShowForm(!showForm)
  }
  const fecharFormPassword = () =>{
    setFormSenha(!showFormSenha)
  }
  
  return (
    <div className={styles.perfil_container}>
      <div className={styles.conteudo}>
        <nav className={styles.nav_top}>
          <span onClick={() => navigateTo("tasks")}> <img src={img1} alt="back" /> </span>
          <span> <img src={img2} alt="three dots" /> </span>
        </nav>
        <header>
          <h1>Perfil</h1>
        </header>

        <div className={styles.perfil}>
          <img src={imgPerfil} alt="imgage perfil" />
          <div className={styles.texts}>
            <h2>{user.nome.split(" ")[0] + " " +user.nome.split(" ")[1] }</h2>
            <span>{user.email}</span>
          </div>
        </div>
        
        <div className={styles.editar_container}>
          <div className={styles.toggle_button}>
            <h3>Editar perfil</h3>
              <button className={styles.btn} onClick={toggleEditPerfil}>
                {!showForm ? "Editar" : "Fechar"}
              </button>
          </div>

          {showForm && 
            <UpdateUserForm onFormSubmit={fecharFormPerfil}/>
          }

          <hr />

          <div className={styles.toggle_button}>
            <h3>Alterar senha</h3>
              <button onClick={toggleEditSenha}>
                {!showFormSenha ? "Editar" : "Fechar"}
              </button>
          </div>

          {showFormSenha && 
            <UpdatePassForm onFormSubmit={fecharFormPassword}/>
          }
          <hr />
        </div>
        
        <button onClick={() => logout()} className={styles.exit_btn}>
          
          Sair
        </button>
      </div>
    </div>
  );
}

export default Perfil;
