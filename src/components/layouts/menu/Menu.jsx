import styles from './Menu.module.css';
import img3 from '../../../../public/imgs/dashboard.png';
import img1 from '../../../../public/imgs/check.png';
import img2 from '../../../../public/imgs/calendar.png';
import img4 from '../../../../public/imgs/menu.png';
import { NavLink } from 'react-router-dom';

function Menu(){
    return(
        <div className={styles.menu_container} >
            <nav>
                <img src={img4} alt="image menu" />
                <NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : undefined}>
                    <img src={img1} alt="image task" />
                </NavLink>
                <NavLink to="/calendar" className={({ isActive }) => isActive ? styles.active : undefined}>
                    <img src={img2} alt="image calender " />
                </NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : undefined}>
                    <img  src={img3} alt="image user" />
                </NavLink>
            </nav>
        </div>
    )
}

export default Menu;