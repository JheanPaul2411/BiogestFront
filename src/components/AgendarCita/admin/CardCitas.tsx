import PopupConfirmarAgendacion from "@/components/Popups/Cita/PopupConfirmarAgendacion";
import PopupEditarCita from "@/components/Popups/Cita/PopupModificarCita";
import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { isAproabda } from "@/helpers/handlers/HandlerCitas";
import { Cita } from "@/helpers/models/Cita";
import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { parseDate } from "@/helpers/handlers/ParseDate";
import "./CardCitas.css";
import toast from "react-hot-toast";
import getHoursParsed from "@/helpers/constants/getHours";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CardCitas() {
  const [showReagendarModal, setShowReagendarModal] = useState<boolean>(false);
  const [showPopupConfirmarCita, setShowPopupConfirmarCita] = useState<boolean>(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [filtroAceptada, setFiltroAceptada] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  const {
    data: citasData,
    isLoading: citasLoading,
    isError: citasError,
    refetch,
  } = useQuery({
    queryKey: ["get_all_citas"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/cita`, {
        headers: headerBearer(),
      });
      return response.data;
    },
  });

  const { mutate: mutateReagendar } = useMutation({
    mutationKey: ["patch_cita", selectedCita],
    mutationFn: async (cita: Partial<Cita>) => {
      const response = await axios.patch(
        `${baseUrl}/cita/${selectedCita?.id}`,
        cita,
        { headers: headerBearer() }
      );
      queryClient.invalidateQueries({queryKey:["get_all_citas"]})
      return response.data;
    },
    onSuccess: () => {
      toast.success("Has reagendado la cita correctamente");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error al reagendar la cita: ${error.message}`);
    },
  });

  const { mutate: mutateConfirmarCita } = useMutation({
    mutationKey: ["confirmar_cita", selectedCita],
    mutationFn: async (cita: Partial<Cita>) => {
      const response = await axios.patch(
        `${baseUrl}/cita/${cita.id}`,
        {
          ...cita,
          aceptada: true,
        },
        { headers: headerBearer() }
      );
      queryClient.invalidateQueries({queryKey:["get_all_citas"]})
      return response.data;
    },
    onSuccess: () => {
      toast.success("Has confirmado la cita correctamente");
      refetch();
      setShowPopupConfirmarCita(false);
    },
    onError: (error) => {
      toast.error(`Error al confirmar la cita: ${error.message}`);
    },
  });

  const handleFiltrarAceptadas = (aceptada: boolean | null) => {
    setFiltroAceptada(aceptada);
  };

  const citasActualizadas = citasData || [];
  const citasFiltradas =
    filtroAceptada !== null
      ? citasActualizadas.filter((cita: { aceptada: boolean; }) => cita.aceptada === filtroAceptada)
      : citasActualizadas;

  const handleConfirmarAgendacion = (cita: Cita) => {
    setSelectedCita(cita);
    setShowPopupConfirmarCita(true);
  };

  const handleReagendar = (cita: Cita) => {
    setSelectedCita(cita);
    setShowReagendarModal(true);
  };

  if (citasLoading) {
    return <div>Cargando...</div>;
  }

  if (citasError) {
    return <div>Error al cargar las citas</div>;
  }

  return (
    <>
      <div
        className="flex justify-center gap-4 flex-wrap"
        role="navigation"
        aria-label="Filtros de citas"
      >
        <Button
          color="gray"
          onClick={() => handleFiltrarAceptadas(true)}
          aria-label="Mostrar citas aceptadas"
          role="button"
        >
          Mostrar Aceptadas
        </Button>
        <Button
          color="gray"
          onClick={() => handleFiltrarAceptadas(false)}
          aria-label="Mostrar citas pendientes"
          role="button"
        >
          Mostrar Pendientes
        </Button>
        <Button
          color="gray"
          onClick={() => handleFiltrarAceptadas(null)}
          aria-label="Mostrar todas las citas"
          role="button"
        >
          Mostrar Todas
        </Button>
      </div>
      <div
        className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10"
        id="citas"
        role="list"
        aria-label="Lista de citas"
      >
        {citasFiltradas.map((cita: Cita) => (
          <div
            key={cita.id}
            className={`citas_contenedor ${
              cita.aceptada ? "bg-green-800/30 dark:bg-green-800/30" : ""
            }`}
            role="listitem"
            aria-label={`Cita con ${
              cita.paciente
                ? `${cita.paciente.nombre} ${cita.paciente.apellido}`
                : "Paciente sin asignar"
            }`}
          >
            <div className="datos col-span-1 w-full h-full">
              <div className="col-span-1 motivo flex gap-2">
                <span className="titulos">Paciente:</span>
                <p className="atributos">
                  {cita.paciente
                    ? `${cita.paciente.nombre} ${cita.paciente.apellido}`
                    : "Paciente sin asignar"}
                </p>
              </div>
              <div className="col-span-1 flex">
                <span className="titulos">Fecha de la cita:</span>
                <p className="atributos"> &nbsp; {parseDate(cita.fecha)}</p>
              </div>
              <div className="col-span-1 motivo flex gap-2">
                <span className="titulos">Hora:</span>
                <p className="atributos">
                  {getHoursParsed(new Date(cita.fecha).toISOString())}
                </p>
              </div>
              <div className="col-span-1 motivo flex gap-2">
                <span className="titulos">Motivo de la cita:</span>
                <p className="atributos">{cita.motivo}</p>
              </div>
              {cita.sintomas && (
                <div className="col-span-1 sintomas flex gap-2">
                  <span className="titulos">Síntomas</span>
                  <p className="atributos">{cita.sintomas}</p>
                </div>
              )}
              <div className="col-span-1 motivo flex gap-2">
                <span className="titulos">Aceptada:</span>
                <p className="atributos">{isAproabda(cita.aceptada)}</p>
              </div>
            </div>
            <div className="col-span-1 flex mt-6 gap-3 flex-wrap">
              <Button
                color="success"
                className="grow"
                disabled={cita.aceptada}
                onClick={() => handleConfirmarAgendacion(cita)}
                aria-label={`Aprobar solicitud para ${
                  cita.paciente
                    ? `${cita.paciente.nombre} ${cita.paciente.apellido}`
                    : "Paciente sin asignar"
                }`}
                role="button"
              >
                Aprobar solicitud
              </Button>
              <Button
                onClick={() => handleReagendar(cita)}
                color="purple"
                aria-label={`Reagendar cita para ${
                  cita.paciente
                    ? `${cita.paciente.nombre} ${cita.paciente.apellido}`
                    : "Paciente sin asignar"
                }`}
                role="button"
                className="grow"
              >
                Reagendar
              </Button>
            </div>
          </div>
        ))}
        {selectedCita && showReagendarModal && (
          <PopupEditarCita
            selectedCita={selectedCita}
            onClose={() => setShowReagendarModal(false)}
            mutation={mutateReagendar}
            aria-label={`Reagendar cita para ${
              selectedCita.paciente
                ? `${selectedCita.paciente.nombre} ${selectedCita.paciente.apellido}`
                : "Paciente sin asignar"
            }`}
          />
        )}

        {selectedCita && showPopupConfirmarCita && (
          <PopupConfirmarAgendacion
            selectedCita={selectedCita}
            onClose={() => setShowPopupConfirmarCita(false)}
            mutation={mutateConfirmarCita}
            aria-label={`Confirmar agendación de cita para ${
              selectedCita.paciente
                ? `${selectedCita.paciente.nombre} ${selectedCita.paciente.apellido}`
                : "Paciente sin asignar"
            }`}
          />
        )}
      </div>
    </>
  );
}