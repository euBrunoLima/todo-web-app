import styles from './Loading.module.css';
import img from './img_loading.svg';

function Loading(){
    return(
        <div className={styles.loading_container}>
            <img src={img} alt="loading image" />
        </div>
    )
}

export default Loading;
