// components/SideBar/CategoryList.jsx
import { useEffect, useState, useContext } from "react";
import { fetchUserCategories } from "../../../services/api/categoryServer.js";
import { FaRegListAlt } from "react-icons/fa";
import styles from "./CategoryList.module.css";

function CategoryList({ token }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchUserCategories(token);
        // aqui você pode escolher se quer pessoais, globais ou todas
        setCategorias(data.todas_categorias);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (loading) return <p className={styles.feedback}>Carregando categorias...</p>;
  if (error) return <p className={styles.feedbackError}>{error}</p>;

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
