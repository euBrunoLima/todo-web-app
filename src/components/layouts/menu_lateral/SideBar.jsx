import styles from './SideBar.module.css'
import React, { forwardRef, useState, useContext } from 'react';
import banner from '../../../imgs/img_banner.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.jsx';


import { FaUser, FaChartBar, FaCalendarAlt, FaListUl, FaPlusCircle } from "react-icons/fa";
import CreateModal from './modal/CreateModal';
import CategoryList from '../../task_layout/categoryList/CategotyList.jsx';

const SideBar = forwardRef(({ isActive }, ref) => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate()

  const navigateTo = (rota) => {
    navigate(`/${rota}`)
  }

  const [showModal, setShowModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const toggleModal = () =>{
      setShowModal(!showModal)
  }
  const toggleCategories = () =>{
      setShowCategories(!showCategories)
  }

  return (
    <>
    {showModal && <CreateModal onClose={toggleModal} />}
    <div ref={ref} className={`${styles.side_container} ${isActive ? styles.active : ''}`}>
      <div className={styles.img_box}>
        <img src={banner} alt="banner app" />
      </div>

      {/* Menu */}
      <div className={styles.menu_container}>
        <ul>
          <li onClick={() => navigateTo("perfil")}>
            <FaUser className={styles.icon} /> Perfil
          </li>
          <li onClick={() => navigateTo("dashboard")}>
            <FaChartBar className={styles.icon} /> Dashboard
          </li>
          <li onClick={() => navigateTo("calendar")}>
            <FaCalendarAlt className={styles.icon} /> Calendário
          </li>
        </ul>

        <ul>
          <li onClick={() => toggleCategories()}>
            <FaListUl className={styles.icon} /> Categorias
          </li>
          {showCategories && (
            <CategoryList token={token} />
          )}
          <li onClick={() => toggleModal()}>
            <FaPlusCircle className={styles.icon} /> Criar nova
          </li>
        </ul>
      </div>
    </div>
    </>
  );
});

export default SideBar;
