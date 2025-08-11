
import { useState } from "react";
import styles from "./CategoryTabs.module.css";

function CategoryTabs({ categories, onSelect }) {
  const [active, setActive] = useState(categories[0]);

  const handleClick = (category) => {
    setActive(category);
    if (onSelect) onSelect(category);
  };
    
  return (
    <div className={styles.category_tabs}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.tab} ${active === cat ? styles.active : ""}`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
