import styles from './TaskCard.module.css';
import { useEffect, useState } from 'react';

function TaskCard({id, name, initialStatus, deadlineDate, deadlineTime, onStatusChange, onMarkClick}) {
    const [status, setStatus] = useState(initialStatus);

    const handleStatus = () => {
        const newStatus = !status;
        setStatus(newStatus);
        if(onStatusChange) onStatusChange(id, newStatus);
    };

    useEffect(() => {
        console.log(status);
    }, [status]);

    return (
        <div className={styles.card_container}>
            <div className={styles.check_wrapper}>
                <input
                    type="checkbox"
                    id={`check-${id}`}
                    checked={status}
                    onChange={handleStatus}
                    className={styles.check_input}
                />
                <label htmlFor={`check-${id}`} className={styles.check_label}></label>
            </div>

            <div className={styles.texts}>
                <h3>{name}</h3>
                <div className={styles.prazo}>
                    <span>{deadlineDate}</span>
                    <span>{deadlineTime}</span>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
