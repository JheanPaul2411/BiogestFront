import { Route, Routes } from "react-router-dom"
import NavBar from "./components/Nav/Header"
import CitaPage from "./components/AgendarCita/CitaPage"
import HomeMainCard from "./components/HomeComponents/HomeMainCard"
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import { UserProvider } from "./context/UserPrivider"

function App() {

  return (
    <div className="bg-gray-800 h-full">
      <UserProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomeMainCard></HomeMainCard>}></Route>
          <Route path="/agendar_cita" element={<CitaPage></CitaPage>}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </UserProvider >
    </div>
  )
}

export default App
