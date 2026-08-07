import axios from 'axios';

// Zustand store will be imported lazily to avoid circular dependencies
let getAuthToken = null;
let clearAuth = null;

/**
 * Register auth accessors from the Zustand store.
 * Called once during app initialization to avoid circular imports.
 */
export function registerAuthAccessors(getToken, onClearAuth) {
    getAuthToken = getToken;
    clearAuth = onClearAuth;
}

/**
 * Centralized Axios instance for all API requests.
 * Base URL is read from environment variables.
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Request Interceptor ──
// Injects Authorization header on every outgoing request
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken?.();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor ──
// Handles 401 (expired/invalid token) globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth state and let the app redirect
            clearAuth?.();
        }

        // Normalize error message
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'An unexpected error occurred';

        return Promise.reject(new Error(message));
    }
);

export default apiClient;
