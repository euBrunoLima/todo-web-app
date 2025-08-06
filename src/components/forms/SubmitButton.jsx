import styles from './SubmitButton.module.css'

function SubmitButton({text, onClick}){
    return(
        <button 
            className={styles.btn}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default SubmitButton;