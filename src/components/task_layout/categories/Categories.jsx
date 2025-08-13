import { useState, useEffect } from "react";
import styles from "./CategoryTabs.module.css";

function CategoryTabs({ categories, onSelect }) {
  const [active, setActive] = useState(categories[0]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActive(categories[0]);
    }
  }, [categories]);

  const handleClick = (category) => {
    setActive(category);
    if (onSelect) onSelect(category);
  };
    
  return (
    <div className={styles.category_tabs}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.tab} ${active === cat ? styles.active : ""}`}
          onClick={() => handleClick(cat)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
