
import { ApiResponse } from "@/components/AgendarCita/dto/Login.dto";
import { useAuth } from "@/helpers/context/AuthProvider";
import { handleErrors } from "@/helpers/handlers/HandleErrors";
import { loginUser } from "@/helpers/handlers/HandlerLogin";
import { TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Importa solo la función de login del contexto de autenticación

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const data: ApiResponse = await loginUser({ email, password });
      if (data) {
        login(); // Aquí llamamos a la función login para cambiar el estado de logueo a true
        alert(
          `Te has logueado correctamente, ${data.user.nombre} ${data.user.apellido}`
        );
        window.location.href = "/";
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <section id="container_login">
      <section
        id="image-side"
        className="w-[60%] flex flex-col items-center justify-center"
      >
        <h1 className="text-white text-3xl text text-center">
          Somos lo mejor en calidad
        </h1>
        <span>Inicia sesión para acceder a todas nuestras funcionalidades</span>
      </section>

      <form id="form_login" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Iniciar sesión</Button>

        <a href="" className="text-gray-300 text-center">
          ¿Aún no tienes una cuenta?{" "}
          <Link to={"/register"} className="font-bold text-blue-500">
            Registrate
          </Link>
        </a>
      </form>
    </section>
  );
}

export default Login;
