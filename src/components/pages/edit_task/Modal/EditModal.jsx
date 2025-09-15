import { useState } from 'react';
import styles from './../../perfil/modal/PerfilModal.module.css'; //Estilos de outro componente
import DeleteTaskModal from '../Modal/DeleteTaskModal.jsx'

function EditModal({task, onStatusChange}){

    const [showModal, setShowModal] = useState(false);
    
    const toggleModal = () =>{
        setShowModal(!showModal)
    }
 
    const handleChangeStatus = () =>{
        if(onStatusChange){
            onStatusChange(task.id, !task.status)
        }
        
    }

    return(
        <div className={`${showModal ? styles.hidden : styles.modal_container}`}>

            {showModal && <DeleteTaskModal onClose={toggleModal} />}
            <ul className={`${showModal ? styles.hidden_lista : ''}`}>   
                <li onClick={() => handleChangeStatus()}>{`${task.status ? "Desmacar concluido" : "Marcar concluido"}`}</li>
                <li>Imprimir</li>
                <li>Compartilhar</li>
                <li onClick={() => toggleModal()}>Deletar</li>
            </ul>

        </div>
    )
}


export default EditModal;