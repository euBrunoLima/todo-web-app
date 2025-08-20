const rede =  'localhost'
const API_URL = `http://${rede}:3000/api/`;

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    let data;

    try {
      data = await response.json();
    } catch (jsonError) {
      // O corpo da resposta não é JSON válido
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.mensagem || 'Erro ao criar usuário');
    }

    return data;

  } catch (error) {
    // Repassa o erro para ser tratado no componente
    throw error;
  }
}
export async function loginUser(userData) {
      try {
          const response = await fetch(`${API_URL}login`,{
              method: 'POST',
              headers:{
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          })

          let data;

          try {
              data = await response.json();
          } catch (jsonError) {
              data = null;   
          }

          if (!response.ok) {
              throw new Error(data?.mensagem || 'Erro ao fazer login');
          }

          return data;
      } catch (error) {
          throw error
      }
}
export async function updateUser(id, userData, token) {
    try {
          const response = await fetch(`${API_URL}user/${id}`,{
              method: 'PATCH',
              headers:{
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          })

          let data;

          try {
              data = await response.json();
          } catch (jsonError) {
              data = null;   
          }

          if (!response.ok) {
              throw new Error(data?.mensagem || 'Erro ao atualizar');
          }

          return data;
      } catch (error) {
          throw error
      }
}
export async function updatePassword(id, userData, token) {
    try {
          const response = await fetch(`${API_URL}user/pass/${id}`,{
              method: 'PATCH',
              headers:{
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          })

          let data;

          try {
              data = await response.json();
          } catch (jsonError) {
              data = null;   
          }

          if (!response.ok) {
              throw new Error(data?.mensagem || 'Erro ao atualizar senha');
          }

          return data;
      } catch (error) {
          throw error
      }
}