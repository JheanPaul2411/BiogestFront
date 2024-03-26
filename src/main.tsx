import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './helpers/context/AuthProvider.tsx'
import { UserProvider } from './helpers/context/UserPrivider.tsx'



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
