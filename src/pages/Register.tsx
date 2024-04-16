import { User } from "@/components/AgendarCita/dto/Login.dto";
import { FloatingLabel, Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUser } from "@/helpers/handlers/HandleRegister";
import { loginUser } from "@/helpers/handlers/HandlerLogin";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const submit = handleSubmit(async (values) => {
    const response = await registerUser(values);
    if (response) {
      const login = await loginUser({
        password: values.password!,
        email: values.email!,
      });
      localStorage.setItem("token", login.token);
      window.location.href = "/";
      toast.success("Te has registrado correctamente");
    }
    reset();
  });

  return (
    <section id="container_login" className="w-full">
      <section
        id="image-side"
        className="w-auto h-auto flex flex-col items-center justify-center"
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
        {/* Foto de perfil */}
        <div className="flex-col lg:col-span-2">
          <FloatingLabel
            label={`Foto de perfil`}
            variant={"standard"}
            color={errors.photoUrl ? "error" : "default"}
            accept="image/*"
            type="file"
            {...register("photoUrl")}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.photoUrl}
          >
            {errors.photoUrl?.message}
          </Label>
        </div>

        {/* Nombres */}
        <div className="flex-col">
          <FloatingLabel
            label={"Nombres"}
            variant={"standard"}
            color={errors.nombre ? "error" : "default"}
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.nombre}
          >
            {errors.nombre?.message}
          </Label>
        </div>
        {/* Apellido */}
        <div className="flex-col">
          <FloatingLabel
            label={"Apellido"}
            variant={"standard"}
            color={errors.apellido ? "error" : "default"}
            type="text"
            {...register("apellido", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
              maxLength: {
                value: 20,
                message: "El apellido no puede tener mas de 20 caracteres",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.apellido}
          >
            {errors.apellido?.message}
          </Label>
        </div>

        {/* Cedula */}
        <div className="flex-col">
          <FloatingLabel
            label={`Cedula`}
            variant={"standard"}
            color={errors.cedula ? "error" : "default"}
            maxLength={10}
            {...register("cedula", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Por favor, ingresa un número de cedula válido",
              },
              minLength: {
                value: 10,
                message: "La cedula debe tener 10 caracteres",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.cedula}
          >
            {errors.cedula?.message}
          </Label>
        </div>

        {/* Contacto */}
        <div className="flex-col">
          <FloatingLabel
            label={"Número de contacto"}
            variant={"standard"}
            type="text"
            maxLength={10}
            {...register("contacto", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Por favor, ingresa un número de contacto válido",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.contacto}
          >
            {errors.contacto?.message}
          </Label>
        </div>

        {/* Correo electrónico */}
        <div className="flex-col lg:col-span-2">
          <FloatingLabel
            label={"Correo electrónico"}
            variant={"standard"}
            type="text"
            maxLength={35}
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

        {/* Contraseña */}
        <div className="flex-col lg:col-span-2">
          <FloatingLabel
            label={"contraseña"}
            variant={"standard"}
            type="password"
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

        {/* Fecha nacimiento */}
        <div className="flex-col lg:col-span-2">
          <FloatingLabel
            label={"Fecha de nacimiento"}
            variant={"standard"}
            type="date"
            {...register("fecha_nacimiento", {
              required: {
                value: true,
                message: "Debes llenar este campo",
              },
            })}
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.fecha_nacimiento}
          >
            {errors.fecha_nacimiento?.message}
          </Label>
        </div>

        <Button
          type="submit"
          color="purple"
          className="mt-2 lg:col-span-2"
        >
          Registrarse
        </Button>
        <a href="" className="text-center dark:text-gray-300 lg:col-span-2">
          ¿Ya tienes una cuenta?{" "}
          <Link className="font-bold text-purple-500" to={"/login"}>
            Inicia sesión
          </Link>
        </a>
      </form>
    </section>
  );
}

export default Register;
