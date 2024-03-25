import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav/Header";
import HomeMainCard from "./components/HomeComponents/HomeMainCard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import './index.css';
import ProtectedRoutes from "./utils/ProtectedRoute";
import validateToken from "./handlers/ValidateToken";
import PageHistorialMedico from "./components/Historial_medico/PageHistorialMedico";
import CitaPage from "./pages/CitaPage";
import Usuarios from "./pages/Usuarios";

function App() {
  const token = validateToken(localStorage.getItem("token"));
  
  return (
    <div className="dark:bg-gray-800 bg-gray-200 min-h-full">
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomeMainCard></HomeMainCard>}></Route>

            <Route element={<ProtectedRoutes canActivate={token} redirectPath="/" />}>
              <Route path="/agendar_cita" element={<CitaPage/>}></Route>
            </Route>

            <Route element={<ProtectedRoutes canActivate={token} redirectPath="/" />}>
              <Route path="/historial_medico" element={<PageHistorialMedico/>}></Route>
            </Route>

            <Route element={<ProtectedRoutes canActivate={token} redirectPath="/" />}>
              <Route path="/usuarios" element={<Usuarios/>}></Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
    </div>
  )
}

export default App;
