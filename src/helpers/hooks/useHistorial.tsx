import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/BaseURL";
import { headerBearer } from "../constants/Headers";
import { handleErrors } from "../handlers/HandleErrors";
import { HistorialMedico } from "../models/HistorialMedico";


interface Props {
  id?: number|undefined;
}
export default function useHistorial({ id }: Props) {
  const [historialMedico, setHistorialMedico] = useState<HistorialMedico[]>([]);

  useEffect(() => {
    async function fetchHistorial() {
      try {
        // {Si como argumento recibe in id, realiza la consulta a la ficha médica relacionada con el id}
        if (id !== undefined) {
          const response = await axios.get(
            `${baseUrl}/ficha-medica/user/${id}`,
            {
              headers: headerBearer(),
            }
          );

          setHistorialMedico(response.data);
          // {Si NO recibe como argumento id, obtiene todas las fichas medicas}
        } else {
          const response = await axios.get(`${baseUrl}/ficha-medica`, {
            headers: headerBearer(),
          });
          setHistorialMedico(response.data);
        }
      } catch (error) {
        handleErrors(error);
      }
    }

    fetchHistorial();
  }, [setHistorialMedico]);

  return { historialMedico };
}
