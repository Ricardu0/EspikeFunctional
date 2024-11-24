import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5174/api/users',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adicionando o token
    },
    timeout: 10000
});

// Response interceptor for error handling
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default {
    async createUser(userData) {
        try {
            const response = await apiClient.post('', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async getUser() {
        try {
            const response = await apiClient.get('me');  // Usando apiClient com a URL base já configurada
            return response.data;
        } catch (error) {
            throw error;
        }
    },

// Método para atualizar os dados do usuário por email
    // Método para atualizar os dados do usuário por email
    async updateUser(email, userData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado no localStorage.');
            }

            console.log('Token:', token);
            console.log('Headers antes da requisição:', apiClient.defaults.headers);
            console.log('Dados sendo atualizados:', userData); // Verificando os dados que estão sendo enviados
            console.log('URL de atualização:', `email/${email}`);

            const response = await apiClient.put(`email/${email}`, userData);
            console.log('Resposta do servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    },


    async deleteUserByEmail(email) {
        try {
            // Conserta a URL adicionando '/' antes do email
            console.log('Deletando usuário:', email);
            const response = await apiClient.delete(`/email/${email}`);
            console.log('Resposta da deleção:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.response?.data || error.message);
            throw error;
        }
    }
};
