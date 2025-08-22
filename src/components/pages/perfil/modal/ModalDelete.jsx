// ModalDelete.jsx
import { useState, useEffect } from "react";
import styles from './ModalDelete.module.css';
import { FaTimes } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Loading from "../../../layouts/loading/Loading";
import Message from "../../../layouts/message/Message";


import { deleteUser } from "../../../../services/api/userService";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";


function ModalDelete({ isOpen, onClose, onDelete }) {
    
    if (!isOpen) return null;

    const {user, token, logout} = useContext(AuthContext) 

    const [password, setPassword] = useState({senha: ''});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            setLoading(false);
            return;
        }

        if(!password.senha){
            setMessage("Por favor, preencha todos os campo. ");
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        try {
            const response = await deleteUser(user.id, password, token);
            setMessage(response.mensagem || "Conta deletada com sucesso");
            setTimeout(() => logout(), 2000)      
        } catch (error) {
            console.error("Erro ao deletar perfil:", error);
            setMessage(error.message || "Erro ao deletar perfil.");

            setTimeout(() => setMessage(''), 3000);
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className={styles.overlay}>
            {message && <Message msg={message}/>}
            {loading && <Loading/>}
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </button>
                <div className={styles.icon}>
                    <FaRegTrashCan />
                </div>
                <h2>Deletar Conta</h2>
                <p className={styles.warning}>
                    Cuidado: A opração não poderá ser revertida !
                </p>
                <p className={styles.info}>
                    Todas as suas tarefas serão excluídas imediatamente.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password.senha ? password.senha : ''}
                        name="senha"
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttons}>
                        <button type="button" className={styles.back} onClick={onClose}>
                            Voltar
                        </button>
                        <button onClick={() => handleSubmit()} className={styles.delete}>
                            Deletar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalDelete;

