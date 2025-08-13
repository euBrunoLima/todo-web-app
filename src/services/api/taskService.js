export async function fetchUserTasks(token) {
  try {
    const response = await fetch('http://localhost:3000/api/tasks/show', {
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
      throw new Error(data?.mensagem || 'Erro ao buscar tarefas');
    }

    return data;  // vai retornar o objeto com mensagem e dados (array de tasks)

  } catch (error) {
    throw error;  // propaga o erro para ser tratado no componente
  }
}
