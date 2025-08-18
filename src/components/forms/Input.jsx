import styles from './Input.module.css';


function Input({type, text, name, placeholder, handleOnChange, value, required = false}){
    return(
        <div className={styles.form_control}>
            <label className={styles.visually_hidden} htmlFor={name}>{text}:</label>
            <input
                required = {required}
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value} 
            />
           
        </div>
    )
}

export default Input;

