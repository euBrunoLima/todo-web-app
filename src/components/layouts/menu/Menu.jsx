import styles from './Menu.module.css';
import img3 from '../../../imgs/dashboard.png';
import img1 from '../../../imgs/check.png';
import img2 from '../../../imgs/calendar.png';
import img4 from '../../../imgs/menu.png';
import { NavLink } from 'react-router-dom';
import SideBar from '../menu_lateral/SideBar.jsx';
import { useState, useEffect, useRef } from 'react';

function Menu(){

    const [showMenu, setShowMenu] = useState(false);
    const sideBarRef = useRef(null); // aqui cria o ref

    
    const toggleMenu = () =>{
        setShowMenu(!showMenu)
    }
    // if(showMenu){
    //     document.getElementsByTagName(body)
    // }
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setShowMenu(false);
                console.log(showMenu)
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
            console.log(showMenu)

        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            console.log(showMenu)

        };
        
  }, [showMenu]);

    return(
        <div className={styles.menu_container} >
            {showMenu && <div className={styles.overlay}></div>}
            <SideBar ref={sideBarRef} isActive={showMenu}/>
            <nav>
                <NavLink onClick={toggleMenu}>
                    <img src={img4} alt="image menu" />
                </NavLink>
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