import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/BaseURL";
import { headerBearer } from "../constants/Headers";
import { Cita } from "../models/Cita";

export default function useCitas() {
  const [citas, setcitas] = useState<Cita[]>([]);
  useEffect(() => {
    async function fetchCitas() {
      try {
        const response: AxiosResponse<Cita[]> = await axios.get(
          `${baseUrl}/cita`,
          {
            headers: headerBearer(),
          }
        );
        if (response) {
          setcitas(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCitas();
  }, [setcitas]);
  return { citas };
}
interface Props {
  id: number;
  aceptada?: boolean;
}

export function useCitasByPaciente({ id, aceptada }: Props) {
  const [citas, setcitas] = useState<Cita[]>([]);

  useEffect(() => {
    async function fetchCitas() {
      try {
        const url = `${baseUrl}/cita/paciente/${id}`;
        const params = aceptada !== undefined ? { params: { aceptada } } : {};
        const response: AxiosResponse<Cita[]> = await axios.get(url, {
          headers: headerBearer(),
          ...params,
        });

        if (response) {
          setcitas(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCitas();
  }, [aceptada, id, setcitas]);

  return { citas };
}
