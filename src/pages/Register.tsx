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
    <section
      id="container_login"
      className="w-full"
      aria-label="Sección de registro"
    >
      <section
        id="image-side"
        className="w-auto h-auto flex flex-col items-center justify-center"
        aria-label="Sección de imagen"
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
        aria-label="Formulario de registro"
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
            aria-label="Campo de foto de perfil"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.photoUrl}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de nombres"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.nombre}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de apellido"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.apellido}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de cédula"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.cedula}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de número de contacto"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.contacto}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de correo electrónico"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.email}
            role="alert"
            aria-live="assertive"
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
            })}
            aria-label="Campo de contraseña"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.password}
            role="alert"
            aria-live="assertive"
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
            aria-label="Campo de fecha de nacimiento"
            aria-required="true"
          />
          <Label
            className="text-red-500 dark:text-red-500 font-normal text-xs"
            hidden={!errors.fecha_nacimiento}
            role="alert"
            aria-live="assertive"
          >
            {errors.fecha_nacimiento?.message}
          </Label>
        </div>

        <Button
          type="submit"
          color="purple"
          className="mt-2 lg:col-span-2"
          role="button"
          aria-label="Botón de registro"
        >
          Registrarse
        </Button>
        <a
          href=""
          className="text-center dark:text-gray-300 lg:col-span-2"
          role="link"
          aria-label="Enlace para iniciar sesión"
        >
          ¿Ya tienes una cuenta?{" "}
          <Link
            className="font-bold text-purple-500 dark:text-purple-400"
            to={"/login"}
            role="link"
            aria-label="Enlace para iniciar sesión"
          >
            Inicia sesión
          </Link>
        </a>
      </form>
    </section>
  );
}

export default Register;
