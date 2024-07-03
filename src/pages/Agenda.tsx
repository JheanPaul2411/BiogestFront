import { useState, useEffect } from 'react';
import { Calendar, Badge } from 'rsuite';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { Cita } from "@/helpers/models/Cita";
import { parseDate } from "@/helpers/handlers/ParseDate";
import getHoursParsed from "@/helpers/constants/getHours";

export default function Agenda() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get_agenda", currentMonth],
    queryFn: async () => {
      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      console.log("Fetching data for:", firstDay, "to", lastDay);

      const response = await axios.get<Cita[]>(
        `${baseUrl}/cita/rango?fechaInicio=${firstDay.toISOString()}&fechaFin=${lastDay.toISOString()}&aceptada=true`,
        { headers: headerBearer() }
      );

      console.log("API Response:", response.data);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [currentMonth, refetch]);

  useEffect(() => {
    console.log("Current data:", data);
  }, [data]);

  const renderCell = (date: Date) => {
    const citasForDate = data?.filter(cita =>
      new Date(cita.fecha).toDateString() === date.toDateString()
    );

    console.log("Citas for", date, ":", citasForDate);

    if (citasForDate && citasForDate.length > 0) {
      return (
        <div>
          <Badge content={citasForDate.length} />
        </div>
      );
    }
    return null;
  };

  const handleMonthChange = (date: Date) => {
    console.log("Month changed to:", date);
    const newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    setCurrentMonth(newMonth);
  };

  if (isLoading) {
    return <div>Cargando citas...</div>;
  }

  if (error) {
    return <div>Error al cargar las citas: {(error as Error).message}</div>;
  }

  return (
    <main className="p-20">
      <h1 className="mb-5 text-gray-700 dark:text-gray-300">
        Agenda {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h1>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <Calendar
            bordered
            renderCell={renderCell}
            onMonthChange={handleMonthChange}
          />
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="mb-3">Citas del mes</h2>
          {data && data.length > 0 ? (
            data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()).map((cita, index) => (
              <div key={index} className="mb-2 p-2 border rounded">
                <p><strong>{parseDate(cita.fecha)}</strong> - {getHoursParsed(cita.fecha.toString())}</p>
                <p>Paciente: {cita.paciente.nombre} {cita.paciente.apellido}</p>
                <p>Motivo: {cita.motivo}</p>
              </div>
            ))
          ) : (
            <p>No hay citas programadas para este mes.</p>
          )}
        </div>
      </div>
    </main>
  );
}
