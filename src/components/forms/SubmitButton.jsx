import styles from './SubmitButton.module.css'

function SubmitButton({text, onClick, disabled}){
    return(
        <button 
            className={styles.btn}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default SubmitButton;