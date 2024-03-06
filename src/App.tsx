import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav/Header";
import CitaPage from "./components/AgendarCita/CitaPage";
import HomeMainCard from "./components/HomeComponents/HomeMainCard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import './index.css';
import ProtectedRoutes from "./utils/ProtectedRoute";
import {useAuth } from "./context/AuthProvider";

function App() {
  const { isLoggedIn } = useAuth();
  console.log('Context login',isLoggedIn)
  return (
    <div className="dark:bg-gray-800 bg-gray-200 min-h-full">
      {/* Aquí utilizamos AuthProvider, no seAuth */}
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomeMainCard></HomeMainCard>}></Route>

            <Route element={<ProtectedRoutes canActivate={isLoggedIn} redirectPath="/" />}>
              <Route path="/agendar_cita" element={<CitaPage/>}></Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
    </div>
  )
}

export default App;
