import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './../../perfil/modal/PerfilModal.module.css'; //Estilos de outro componente
import DeleteTaskModal from '../Modal/DeleteTaskModal.jsx'

function EditModal(){

    const [showModal, setShowModal] = useState(false);
    // const [concluido, setConcluido] = useState(false)

    const toggleModal = () =>{
        setShowModal(!showModal)
    }
    // const toggleConcluido = () =>{
    //     setConcluido(!concluido)
    // }
    const handleChangeStatus = () =>{
        
    }

    return(
        <div className={`${showModal ? styles.hidden : styles.modal_container}`}>

            {showModal && <DeleteTaskModal onClose={toggleModal} />}
            <ul className={`${showModal ? styles.hidden_lista : ''}`}>   
                <li onClick={() => handleChangeStatus()}>Marcar como concluido</li>
                <li>Imprimir</li>
                <li>Compartilhar</li>
                <li onClick={() => toggleModal()}>Deletar</li>
            </ul>

        </div>
    )
}


export default EditModal;