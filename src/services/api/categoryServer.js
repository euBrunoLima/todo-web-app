const API_URL = 'http://localhost/api/';
export async function fetchUserCategories(token) {
  try {
    const response = await fetch(`${API_URL}categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // token no header
        'Content-Type': 'application/json'
      }
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.mensagem || 'Erro ao buscar categorias');
    }

    return data;  // aqui terá o objeto com categorias pessoais, globais e todas_categorias

  } catch (error) {
    throw error;  // propaga o erro para o componente tratar
  }
}

