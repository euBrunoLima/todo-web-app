import styles from './SideBar.module.css'
import React, {forwardRef} from 'react';
import banner from '../../../imgs/img_banner.png'
import { useNavigate } from 'react-router-dom';

const SideBar = forwardRef(({ isActive }, ref) => {
  const navigate = useNavigate()

  const navigateTo = (rota) =>{
    navigate(`/${rota}`)
  }
  return (
    <div ref={ref} className={`${styles.side_container} ${isActive ? styles.active : ''}`}>
      <div className={styles.img_box}>
        <img src={banner} alt="banner app" />
      </div>
      <div className={styles.menu_container}>
        <ul>
          <li onClick={() => navigateTo("perfil")}>Perfil</li>
          <li onClick={() => navigateTo("dashboard")}>DashBoard</li>
          <li onClick={() => navigateTo("calendar")}>Calendário</li>
        </ul>

        <ul>
          <li>Categorias</li>
          <li>Criar nova</li>
        </ul>
      </div>
    </div>
  );
});

export default SideBar;