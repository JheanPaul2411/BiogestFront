import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './helpers/context/AuthProvider.tsx'
import { UserProvider } from './helpers/context/UserPrivider.tsx'
import { Toaster } from 'react-hot-toast';
import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <UserProvider>
          <App />
          <Toaster />
          
        </UserProvider>
        
      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>,
)
