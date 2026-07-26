import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { EcommerceProvider } from './context/EcommerceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Nemvol-swift">
      <EcommerceProvider>
        <App />
      </EcommerceProvider>
    </BrowserRouter>
  </StrictMode>,
)
