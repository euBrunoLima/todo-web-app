import styles from './Perfil.module.css';
import img1 from '../../../imgs/back.png';
import img2 from '../../../imgs/dots.png';
import imgPerfil from '../../../imgs/perfil.png';
import UpdateUserForm from './editForm/UpdateUserForm.jsx';
import UpdatePassForm from './editForm/UpdatePassFom.jsx';
import NavTop from '../../layouts/nav_top/NavTop.jsx';
import PerfilModal from './modal/PerfilModal.jsx';

import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext.jsx";

function Perfil() {

  const navigate = useNavigate();
  const {user, token, logout} = useContext(AuthContext); 

  const [showForm, setShowForm] = useState(false);
  const [showFormSenha, setShowFormSenha] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const navigateTo = (rota) =>{
    navigate(`/${rota}`)
  }
  
  const toggleEditPerfil = () =>{
    setShowForm(!showForm);
  }
  const toggleEditSenha = () =>{
    setShowFormSenha(!showFormSenha);
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  } 
  const fecharFormPerfil = () =>{
    setShowForm(!showForm)
  }
  const fecharFormPassword = () =>{
    setShowFormSenha(!showFormSenha)
  }

  useEffect(() =>{
    console.log(showModal)
  }, [showModal])
  
  return (
    <div className={styles.perfil_container}>
      <div className={styles.conteudo}>
        <NavTop Rota="tasks" onClick={toggleModal}/>
        {/* <header>
          <h1>Perfil</h1>
        </header> */}
        {showModal && <PerfilModal/>}
        <div className={styles.perfil}>
          <img src={imgPerfil} alt="imgage perfil" />
          <div className={styles.texts}>
            <h2>{user.nome.split(" ")[0] + " " + (user.nome.split(" ")[1] || '') }</h2>
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
        
        {/* <button onClick={() => logout()} className={styles.exit_btn}>
          
          Sair
        </button> */}
      </div>
    </div>
  );
}

export default Perfil;
