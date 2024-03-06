import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserPrivider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <UserProvider>
          <App />

        </UserProvider>
      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>,
)
