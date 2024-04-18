import axios from "axios";
import { baseUrl } from "../constants/BaseURL";
import { headerBearer } from "../constants/Headers";
import { Cita } from "../models/Cita";
import { handleErrors } from "./HandleErrors";


export async function agendarCita(citaDto: Cita) {
    const api = `${baseUrl}/cita`;

    // Crear un objeto Date con el formato adecuado (asumiendo que 'fecha' es un string en formato 'dd-MM-yyyy')

    // Actualizar el DTO con la fecha formateada
    const citaData = {
        ...citaDto,
    };

    try {
        const response: Cita = await axios.post(api, citaData, {
            headers: headerBearer()
        });
        return response;
    } catch (error) {
        // Manejo de error en caso de que la solicitud falle
        handleErrors(error)
        throw error; // Lanzar el error para que el código que llama pueda manejarlo
    }
}

