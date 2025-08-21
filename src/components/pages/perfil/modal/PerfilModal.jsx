import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './PerfilModal.module.css';
import ModalDelete from './ModalDelete.jsx';

function PerfilModal(){

    const {logout} = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () =>{
        setShowModal(!showModal)
        console.log(!showModal)
    }

    return(
        <div className={styles.modal_container}>
            <ModalDelete
                isOpen={showModal}
                onClose={toggleModal}
            />
            <ul>   
                <li>Compartilhar</li>
                <li onClick={() => toggleModal()}>Deletar Conta</li>
                <li onClick={() => logout()}>Sair</li>
            </ul>

        </div>
    )
}


export default PerfilModal;