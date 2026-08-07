import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import useStore from './store/useStore'
import { registerAuthAccessors } from './services/api/client'

// Create TanStack Query client with global defaults
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 2, // 2 minutes
        },
    },
});

// Register Zustand auth accessors with the Axios client
// This avoids circular import issues between store and client
registerAuthAccessors(
    () => useStore.getState().token,
    () => useStore.getState().clearAuth()
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename="/Nemvol-swift">
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
