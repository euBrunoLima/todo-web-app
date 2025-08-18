import styles from './Subtask.module.css';

function Subtask({ id, name, initialStatus,onStatusChange }) {
    const [status, setStatus] = useState(initialStatus);

    const handleStatus = () => {
        const newStatus = !status;
        setStatus(newStatus);
        if (onStatusChange) onStatusChange(id, newStatus);
    };

    return(
        <div className={styles.subtask_container}>
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
            <div>
                <h4>{name ? name : ''}</h4>
            </div>
           <button>❌</button>
        </div>
    )
    
}


export default Subtask;
