import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav/Header";
import "./index.css";
import CitaPage from "./pages/CitaPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageHistorialMedico from "./pages/PageHistorialMedico";
import Register from "./pages/Register";
import Usuarios from "./pages/Usuarios";
import Agenda from "./pages/Agenda";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <div className="dark:bg-gray-800 bg-gray-200 min-h-full">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>

          <Route path="/agendar_cita" element={<CitaPage />}></Route>

          <Route
            path="/historial_medico"
            element={<PageHistorialMedico />}
          ></Route>
          <Route path="/agenda" element={<Agenda />}></Route>

          <Route path="/usuarios" element={<Usuarios />}></Route>

          <Route path="/pacientes" element={<Usuarios />}></Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ReactQueryDevtools/>

    </QueryClientProvider>
  );
}

export default App;
