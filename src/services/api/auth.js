import apiClient from './client';
import useStore from '../../store/useStore';

export const authApi = {
    login: async (email, password) => {
        const response = await apiClient.post('/auth/login', { email, password });
        const data = response.data.data || response.data;
        return {
            token: data.access_token || data.token || 'mock-jwt-token',
            refreshToken: data.refresh_token || null,
            user: data.user || { email, name: email.split('@')[0] }
        };
    },

    signup: async (payload, emailVal, passwordVal) => {
        let first_name = '';
        let last_name = '';
        let email = '';
        let password = '';

        if (typeof payload === 'object' && payload !== null) {
            first_name = payload.firstName || payload.first_name || '';
            last_name = payload.lastName || payload.last_name || '';
            email = payload.email || '';
            password = payload.password || '';
        } else {
            const nameParts = (payload || '').trim().split(/\s+/);
            first_name = nameParts[0] || '';
            last_name = nameParts.slice(1).join(' ') || '';
            email = emailVal;
            password = passwordVal;
        }

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', password);

        const response = await apiClient.post('/auth/sign-up', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        const resData = response.data.data || response.data;
        
        // Auto-login on successful signup if no token is returned in response
        let token = resData.access_token || resData.token;
        let refreshToken = resData.refresh_token;
        let user = resData.user || { email, first_name, last_name };
        
        if (!token) {
            try {
                const loginRes = await authApi.login(email, password);
                token = loginRes.token;
                refreshToken = loginRes.refreshToken;
                user = loginRes.user;
            } catch (e) {
                console.warn('Auto-login after signup failed:', e);
            }
        }

        return {
            token: token || 'mock-jwt-token',
            refreshToken: refreshToken || null,
            user: {
                email: user.email,
                name: user.name || `${user.first_name} ${user.last_name}`.trim(),
                image: user.image_url || user.image
            }
        };
    },

    logout: async () => {
        const { token, refreshToken } = useStore.getState();
        try {
            await apiClient.post('/auth/logout', {
                access_token: token,
                refresh_token: refreshToken
            });
        } catch (e) {
            // Suppress logout network errors
        }
        return { success: true };
    },

    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        const data = response.data.data || response.data;
        return data.user || data;
    },

    getUsers: async () => {
        const response = await apiClient.get('/admin/users');
        const data = response.data.data || response.data;
        return data.users || data;
    },

    loginAdmin: async (email, password) => {
        const response = await apiClient.post('/admin/login', { email, password });
        return response.data.data || response.data;
    }
};
