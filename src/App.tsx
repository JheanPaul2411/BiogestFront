import { Route, Routes } from "react-router-dom"
import NavBar from "./components/Nav/Header"
import CitaPage from "./components/AgendarCita/CitaPage"
import HomeMainCard from "./components/HomeComponents/HomeMainCard"
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import UserContext, { UserProvider } from "./context/UserPrivider"
import './index.css'
import ProtectedRoutes from "./utils/ProtectedRoute"
import { useContext } from "react"

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="dark:bg-gray-800 bg-gray-200 min-h-full">
      

        <UserProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomeMainCard></HomeMainCard>}></Route>

            <Route element={<ProtectedRoutes canActive={user !== undefined || user !== null} />}>
              <Route path="/agendar_cita" element={<CitaPage></CitaPage>}></Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </UserProvider >

    </div>
  )
}

export default App
