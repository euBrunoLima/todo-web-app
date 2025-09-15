import styles from '../../../pages/edit_task/modal/DeleteTaskModal.module.css';
import Input from '../../../forms/Input.jsx';
import { useState } from 'react';
import { createCategory } from '../../../../services/api/categoryServer.js';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext.jsx';
import Message from '../../../layouts/message/Message.jsx';
import Loading from '../../../layouts/loading/Loading.jsx';

function CreateModal({ onClose }) {
    const {token} = useContext(AuthContext);
    
    const [categoria, setCategoria] = useState({ name: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!categoria.name.trim()) {
        setMessage("Por favor, insira o nome da categoria.");
        return;
    }

    try {
      const resposta = await createCategory(token, categoria.name);
      setMessage(resposta.mensagem || "Categoria criada com sucesso!");
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage(resposta.mensagem || "Erro ao criar categoria.");
      console.error("Erro ao criar categoria:", error);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.delete_task_container}>
        {message && <Message msg={message}/>}
        {loading && <Loading/>}
      <div className={styles.delete_task_box}>
        <h1>Criar nova categoria</h1>

        <Input
          type="text"
          text="Nome da categoria"
          name="name" 
          placeholder="insira aqui..."
          handleOnChange={handleChange}
          value={categoria.name}
          required={true}
        />

        <div className={styles.buttons}>
          <button onClick={() => onClose()}>Cancelar</button>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
