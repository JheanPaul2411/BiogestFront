import UserContext from "@/helpers/context/UserPrivider";
import { agendarCita } from "@/helpers/handlers/HandlerAgendarCita";
import { Cita } from "@/helpers/models/Cita";
import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CitaForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Cita>();

  const submit = handleSubmit(async (values) => {
    const { ...datos } = values;
    console.log(values.fecha);
    const response = await agendarCita({
      ...datos,
      fecha: new Date(`${values.fecha}`),
      pacienteId: user!.id!,
    });
    if (response) {
      toast.success("Has agendado la cita correctamente");
    }
    reset();
  });

  return (
    <form
      onSubmit={submit}
      className="dark:bg-gray-700 bg-gray-50 p-10 rounded-md grid items-center justify-center gap-5 md:grid-cols-2 sm:items-start w-full"
      aria-label="Formulario para agendar cita"
    >
      {/* MOTIVO */}
      <div className="flex flex-col">
        <Label className="font-normal" htmlFor="motivo">
          Motivo
        </Label>
        <Textarea
          className="p-2"
          cols={30}
          rows={6}
          maxLength={280}
          id="motivo"
          aria-describedby="motivo-error"
          {...register("motivo", {
            required: {
              value: true,
              message: "Debes llenar este campo",
            },
          })}
          placeholder="Consulta prenatal integral, dolor, etc"
        ></Textarea>
        <Label
          className="text-red-500 dark:text-red-500 font-normal text-xs"
          id="motivo-error"
          role="alert"
          aria-live="assertive"
          hidden={!errors.motivo}
        >
          {errors.motivo?.message}
        </Label>
      </div>

      {/* SINTOMAS */}
      <div className="flex flex-col">
        <Label className="font-normal" htmlFor="sintomas">
          Síntomas <span className="text-gray-500">(opcional)</span>
        </Label>
        <Textarea
          className="p-2"
          id="sintomas"
          cols={30}
          rows={6}
          aria-describedby="sintomas-error"
          placeholder="Nauseas, fiebre, etc"
          {...register("sintomas", {
            maxLength: {
              value: 200,
              message: "No puede exceder los 200 caracteres",
            },
          })}
        ></Textarea>
        <Label
          className="text-red-500 dark:text-red-500 font-normal text-xs"
          id="sintomas-error"
          role="alert"
          aria-live="assertive"
          hidden={!errors.sintomas}
        >
          {errors.sintomas?.message}
        </Label>
      </div>

      <div className="">
        <Label className="font-normal" htmlFor="fecha">
          Fecha
        </Label>
        <TextInput
          type="datetime-local"
          lang="es"
          id="fecha"
          aria-describedby="fecha-error"
          {...register("fecha", {
            required: {
              value: true,
              message: "Debes llenar una fecha tentativa",
            },
            validate: {
              fechaValida: (value) => {
                const fechaCita = new Date(value);
                const todayDate = new Date();
                if (fechaCita < todayDate) {
                  return "Debes solicitar tu cita por lo menos con un día de anticipación.";
                }
                return true;
              },
              horaValida: (value) => {
                const fechaCita = new Date(value);
                const hora = fechaCita.getHours();
                const minutos = fechaCita.getMinutes();
                if (hora > 18 || (hora === 18 && minutos > 0)) {
                  return "La hora de la cita debe ser entre las 08:00 y las 18:00.";
                }
                return true;
              }
            },
          })}
        />
        <Label
          className="text-red-500 dark:text-red-500 font-normal text-xs"
          id="fecha-error"
          role="alert"
          aria-live="assertive"
          hidden={!errors.fecha}
        >
          {errors.fecha?.message}
        </Label>
      </div>

      <Button
        className="sm:col-span-2"
        color="purple"
        type="submit"
        aria-label="Solicitar cita"
      >
        Solicitar cita
      </Button>
    </form>
  );
};

export default CitaForm;
