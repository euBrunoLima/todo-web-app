import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from './img_logo.png';
import styles from '../splash/Splash.module.css';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/presentation');
    }, 1500);

    // Limpa o timer se o componente desmontar antes do tempo
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.logo_container}>
      <img src={img} alt="logo" />
    </div>
  );
}

export default Splash;
