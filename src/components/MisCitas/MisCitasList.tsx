import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import { Card } from "flowbite-react";

interface Props {
  citas: Cita[];
}

export default function MisCitasList({ citas }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {citas.map((cita, i) => (
        <Card key={i}>
          <p>
            Fecha de la cita:{" "}
            <span className="text-gray-600">{parseDate(cita.fecha)}</span>
          </p>
          <p>
            Hora:{" "}
            <span className="text-gray-600">
              {new Date(cita.fecha).getHours().toString().padStart(2, "0")} :{" "}
              {new Date(cita.fecha).getMinutes().toString().padStart(2, "0")}
            </span>
          </p>

          <p>
            Motivo: <span className="text-gray-600">{cita.motivo}</span>
          </p>
        </Card>
      ))}
    </section>
  );
}
