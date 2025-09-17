
import { FaRegListAlt } from "react-icons/fa";
import styles from "./CategoryList.module.css";

function CategoryList({ categorias, loading, error }) {

  if (loading) return <p className={styles.feedback}>Carregando categorias...</p>;
  if (error) return <p className={styles.feedback}>Erro: {error}</p>;
 
  return (
    <ul className={styles.categoryList}>
      {categorias.map((cat) => (
        <li key={cat.id} className={styles.categoryItem}>
          <div className={styles.left}>
            <FaRegListAlt className={styles.icon} />
            <span className={styles.name}>{cat.name}</span>
          </div>
          <span className={styles.count}>{cat.qtd || 0}</span>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
