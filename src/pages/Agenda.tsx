import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { Cita } from "@/helpers/models/Cita";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FloatingLabel, Spinner, Button, Card } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";

export default function Agenda() {
  const [fecha, setFecha] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    isError,
    isLoading: loadingData,
    refetch,
    error,
  } = useQuery({
    queryKey: ["agenda", fecha],
    queryFn: async () => {
      const newFecha = fecha ? new Date(fecha) : new Date(Date.now());
      const response: AxiosResponse<Cita[]> = await axios.get(
        `${baseUrl}/cita/agenda?fecha=${newFecha}&aceptada=${true}`,
        { headers: headerBearer() }
      );
      return response;
    },
    enabled: false, // Deshabilita la ejecución automática
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

  return (
    <main className="p-20">
      <h1 className="mb-5">Agenda</h1>
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
      {data?.data.length === 0 && (
        <h3>No tienes citas programadas para esa fecha</h3>
      )}
      {data?.data.map((cita, index) => {
        return (
          <Card key={index} className="">
            <p>
              Paciente:
              <span className="ml-2 text-gray-700">
                {cita.paciente.nombre} {cita.paciente.apellido}
              </span>
            </p>
            <p>
              Motivo:
              <span className="ml-2 text-gray-700">
                {cita.motivo}
              </span>
            </p>

            <p>
              Hora asignada:
              <span className="ml-2 text-gray-700">
                {}
              </span>
            </p>
          </Card>
        );
      })}
    </main>
  );
}
