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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark:bg-gray-800 bg-gray-100 min-h-full">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendar_cita" element={<CitaPage />} />
          <Route path="/historial_medico" element={<PageHistorialMedico />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;