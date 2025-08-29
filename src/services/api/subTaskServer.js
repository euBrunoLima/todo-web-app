const rede =  'localhost'
const API_URL = `http://${rede}:3000/api/`;

export async function createSubTask(subData, id, token) {
    
    try{
        const response = await fetch(`${API_URL}tasks/${id}/subtasks`,{
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subData)
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            throw new Error(data?.mensagem || 'Erro ao criar rotina');
        }

        return data; 

    }catch (error) {
        throw error; 
    }
 
}
export async function getAllByTask(task_id, token) {
    try {
        const response = await fetch(`${API_URL}tasks/${task_id}/subtasks`,{
            'method': 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            throw new Error(data?.mensagem || 'Erro ao buscar rotinas');
        }

        return data; 

    } catch (error) {
        throw error; 

    }
    
}
export async function deleteSubTask(id, task_id, token) {
    try {
        const response = await fetch(`${API_URL}tasks/${task_id}/subtasks/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
        })
    
        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            throw new Error(data?.mensagem || 'Erro ao buscar rotinas');
        }

        return data;

    } catch (error) {
        throw error;        
    }
    


}
