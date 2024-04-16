import { FloatingLabel, Label, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import { useForm } from "react-hook-form";
import { LoginCredentials, loginUser } from "@/helpers/handlers/HandlerLogin";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const submit = handleSubmit(async (values) => {
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });
    if (response) {
      toast.success("Has iniciado sesión correctamente");
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  });
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

      <form
        id="form_login"
        onSubmit={submit}
        className="w-full bg-gray-200 dark:bg-gray-800"
      >
        {/* EMAIL */}
        <div className="lg:col-span-2">
          <FloatingLabel
            label={"Correo electrónico"}
            variant={"standard"}
            {...register("email", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Debes colocar un correo electrónico válido",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.email}
          >
            {errors.email?.message}
          </Label>
        </div>

        {/* PASSWORD */}
        <div className="lg:col-span-2">
          <FloatingLabel
            type="password"
            label={"contraseña"}
            variant={"standard"}
            {...register("password", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe ser de al menos 8 caracteres",
              },
              maxLength: {
                value: 16,
                message: "La contraseña debe ser de máximo 16 caracteres",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.password}
          >
            {errors.password?.message}
          </Label>
        </div>

        <Button type="submit" className="lg:col-span-2">
          Iniciar sesión
        </Button>

        <a className="dark:text-gray-300 text-gray-800 text-center lg:col-span-2">
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
