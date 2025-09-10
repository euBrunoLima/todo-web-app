
import styles from './taskCardDay.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskCardDay({ id, name, initialStatus, deadlineDate, deadlineTime, onStatusChange }) {
    const [status, setStatus] = useState(initialStatus);
    const navigate = useNavigate();


    const handleStatus = () => {
        const newStatus = !status;
        setStatus(newStatus);
        if (onStatusChange) onStatusChange(id, newStatus);
    };

    useEffect(() => {
        console.log(status);
    }, [status]);

    const formatTaskDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const zeroTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

        if (zeroTime(date).getTime() === zeroTime(today).getTime()) {
            return 'Hoje';
        } else if (zeroTime(date).getTime() === zeroTime(tomorrow).getTime()) {
            return 'Amanhã';
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    };

    // Função para remover os segundos da hora
    const formatTaskTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    const navigateTo = (rota) => {
        navigate(`/edit_task/${rota}`)
    }

    return (
        <div className={styles.card_container}>
            <div className={styles.faixa_lateral}>
            </div>

            <div onClick={() => navigateTo(`${id}`)} className={styles.texts}>
                <h3>{name ? name : ''}</h3>
                <div className={styles.prazo}>
                    <span>{formatTaskDate(deadlineDate)}</span>
                    <span>{formatTaskTime(deadlineTime)}</span>
                </div>
            </div>
        </div>
    );
}

export default TaskCardDay;
