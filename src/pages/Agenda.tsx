import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FloatingLabel, Spinner } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Agenda() {
  const [fecha, setFecha] = useState<string>();

  const citas = useQuery({
    queryKey: ["agenda", fecha],
    queryFn: async () => {
      const newFecha = fecha ? new Date(fecha) : new Date(Date.now());
      console.log(newFecha)
      const response: AxiosResponse<Cita[]> = await axios.get(
        `${baseUrl}/cita/agenda?fecha=${newFecha}&aceptada=${true}`,
        {
          headers: headerBearer(),
        }
      );

      return response;
    },
  });

  if (citas.isLoading) {
    return <Spinner size={"xl"} />;
  }

  if (citas.isError) {
    toast.error(citas.error.message);
  }

  return (
    <main>
      <h1>Agenda</h1>
      <FloatingLabel
        label={"Fecha"}
        variant={"filled"}
        value={fecha}
        type="date"
        onChange={(e) => setFecha(e.target.value)}
      />

      {citas.data?.data.map((cita, index) => {
        return (
          <div key={index} className="bg-blue-400 p-5 rounded m-5">
            <p>{parseDate(cita.fecha)}</p>
            <p>Cita aceptada: {cita.aceptada.toString()}</p>
          </div>
        );
      })}
    </main>
  );
}
