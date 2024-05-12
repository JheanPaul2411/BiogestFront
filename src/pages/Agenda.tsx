import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { UserRole } from "@/helpers/constants/UserRole";
import JwtUtils from "@/helpers/constants/ValidateToke";
import getHoursParsed from "@/helpers/constants/getHours";
import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FloatingLabel, Spinner, Button, Card, Avatar } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import calendarioSVG from "@/assets/ccalendar.svg";
import PopupEditarCita from "@/components/Popups/Cita/PopupModificarCita";

export default function Agenda() {
  const [fecha, setFecha] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReagendarModal, setShowReagendarModal] = useState<boolean>(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const newFecha = fecha ? new Date(fecha) : new Date(Date.now());

  const {
    data,
    isError,
    isLoading: loadingData,
    refetch,
    error,
  } = useQuery({
    queryKey: ["get_agenda"],
    queryFn: async () => {
      const response: AxiosResponse<Cita[]> = await axios.get(
        `${baseUrl}/cita/agenda?fecha=${newFecha.toISOString()}&aceptada=${true}`,
        { headers: headerBearer() }
      );
      console.log(response.data);
      return response;
    },
    enabled: false, // Deshabilita la ejecución automática
  });

  const { mutate } = useMutation({
    mutationKey: ["patch_cita", selectedCita],
    mutationFn: async (cita: Partial<Cita>) => {
      const response = axios.patch(
        `${baseUrl}/cita/${selectedCita?.id}`,
        cita,
        { headers: headerBearer() }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Has reagendado la cita correctamente");
      refetch()
    },
    onError: (error) => {
      toast.error(`Error al reagendar la cita: ${error.message}`);
    },
  });

  const handleFetchData = async () => {
    setIsLoading(true);
    await refetch();
    setIsLoading(false);
  };

  if (isLoading || loadingData) {
    return <Spinner size={"xl"} />;
  }

  if (isError) {
    toast.error(error.message || "Error al cargar los datos");
  }

  if (
    !JwtUtils.isTokenValid() ||
    JwtUtils.getUserRole() === UserRole.PACIENTE
  ) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="p-20">
      <h1 className="mb-5 text-gray-700 dark:text-gray-300">
        Agenda {fecha && parseDate(fecha)}
      </h1>
      <div className="flex flex-nowrap gap-5 my-5">
        <FloatingLabel
          label={"Fecha"}
          variant={"filled"}
          value={fecha}
          type="date"
          onChange={(e) => setFecha(e.target.value)}
        />
        <Button onClick={handleFetchData} className="h-fit" color="gray">
          Buscar Citas
          <AiOutlineSearch className="mx-2" />
        </Button>
      </div>
      {data && data.data && data.data.length === 0 && (
        <section className="w-full grid grid-cols-1 md:grid-cols-2">
          <h3 className="text-center text-4xl m-5 dark:text-red-200 text-purple-900">
            No tienes citas programadas para esa fecha
          </h3>
          <img src={calendarioSVG} alt="" className="h-[30vh]" />
        </section>
      )}

      {data &&
        data.data &&
        data.data.length > 0 &&
        data.data.map((cita, index) => {
          return (
            <Card key={index}>
              <div className="grid grid-cols-2 ">
                <div className="flex items-center gap-2">
                  <p>
                    Paciente:
                    <span className="ml-2 text-gray-700">
                      {cita.nombre} {cita.apellido}
                    </span>
                  </p>
                  {cita.photoUrl && (
                    <img
                      src={cita.photoUrl}
                      alt={`Foto de perfil de ${cita.nombre} ${cita.apellido}`}
                    />
                  )}
                  {cita.photoUrl ?? (
                    <Avatar
                      rounded
                      aria-label={`Avatar predeterminado: usuario ${cita.nombre}`}
                    />
                  )}
                </div>

                <div className="flex items-center">
                  <p>
                    Motivo:
                    <span className="ml-2 text-gray-700">{cita.motivo}</span>
                  </p>
                </div>

                <div className="flex items-center ">
                  <p>
                    Hora asignada:
                    <span className="ml-2 text-gray-700">
                      {getHoursParsed(cita.fecha.toString())}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <Button
                    onClick={() => {
                      const filteredCitas = data.data.filter(
                        (data) => data.id === cita?.id
                      );
                      if (filteredCitas.length > 0) {
                        setSelectedCita(filteredCitas[0]);
                        setShowReagendarModal(true);
                      }
                      setShowReagendarModal(true);
                    }}
                  >
                    Reagendar
                  </Button>
                  <Button>Nueva incidencia en el historial</Button>
                </div>

                {cita.sintomas && (
                  <p>
                    Síntomas:
                    <span className="ml-2 text-gray-700">{cita.sintomas}</span>
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      {selectedCita && showReagendarModal && (
        <PopupEditarCita
          selectedCita={selectedCita}
          onClose={() => setShowReagendarModal(false)}
          mutation={mutate}
          aria-label={`Reagendar cita para ${
            selectedCita.paciente
              ? `${selectedCita.paciente.nombre} ${selectedCita.paciente.apellido}`
              : "Paciente sin asignar"
          }`}
        />
      )}
    </main>
  );
}
