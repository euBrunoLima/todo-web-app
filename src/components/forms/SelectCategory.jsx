import { useState, useEffect, useContext } from 'react';
import styles from './SelectCategory.module.css';
import { AuthContext } from "../../context/AuthContext.jsx";
import { fetchUserCategories } from '../../services/api/categoryServer';

function SelectCategory({ onChange, defaultCategoryId }) {
    const { token } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchUserCategories(token);
                const allCategories = data.todas_categorias || [];
                const orderedCategories = allCategories.sort((a,b) => a.id - b.id);
                setCategories(orderedCategories || []);
                
                if (defaultCategoryId) {
                    setSelectedCategory(defaultCategoryId);
                }
            } catch (err) {
                setError('Erro ao carregar categorias.');
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            loadCategories();
        }
    }, [token]);

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
        if (onChange) onChange(e.target.value); // Retorna a categoria selecionada para o componente pai
    };

    if (loading) return <p>Carregando categorias...</p>;
    if (error) return <p>{error}</p>;

    return (
        <select
            className={styles.select}
            value={defaultCategoryId}
            onChange={handleChange}
        > 
            
            {categories.map(cat => (
                
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
}

export default SelectCategory;
