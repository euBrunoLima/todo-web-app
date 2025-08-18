const API_URL = 'http://localhost:3000/api/';

export async function fetchUserTasks(token) {
  try {
    const response = await fetch(`${API_URL}tasks/show`, {
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
export async function createTask(taskData, token) {
  try {
    const response = await fetch(`${API_URL}task`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // token no header
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.mensagem || 'Erro ao criar tarefa');
    }

    return data; // vai retornar o objeto com mensagem e resultado da criação

  } catch (error) {
    throw error; // propaga o erro para o componente tratar
  }
}

export async function getTaskById(id, token) {
  try {
    const response = await fetch(`${API_URL}tasks/${id}/show`, {
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
      throw new Error(data?.mensagem || 'Erro ao buscar tarefa');
    }
    return data; // vai retornar o objeto com mensagem e dados da tarefa
  }catch (error) {
    throw error; // propaga o erro para o componente tratar
  }

}
