import styles from './NavTop.module.css';
import { useNavigate } from 'react-router-dom';

import img1 from '../../../imgs/back.png';
import img2 from '../../../imgs/dots.png';


function NavTop({Rota, onClick}){

    const navigate = useNavigate();

    const navigateTo = (rota) =>{
        navigate(`/${rota}`)
    }
    return (
        <nav className={styles.nav_top}>
            <span onClick={() => navigateTo(Rota)}> <img src={img1} alt="back" /> </span>
            <span onClick={() => onClick()}><img src={img2} alt="three dots" /> </span>
        </nav>
    )
}

export default NavTop;
