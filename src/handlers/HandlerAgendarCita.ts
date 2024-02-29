import axios from "axios";
import { baseUrl } from "../constants/BaseURL";
import { CitaDTO } from "../components/AgendarCita/dto/Cita.dto";
import { headerBearer } from "../constants/Headers";


export async function agendarCita(citaDto: CitaDTO) {
    const api = `${baseUrl}/cita`;

    // Crear un objeto Date con el formato adecuado (asumiendo que 'fecha' es un string en formato 'dd-MM-yyyy')

    // Actualizar el DTO con la fecha formateada
    const citaData = {
        ...citaDto,
    };

    try {
        const response: CitaDTO = await axios.post(api, citaData, {
            headers: headerBearer()
        });
        return response;
    } catch (error) {
        // Manejo de error en caso de que la solicitud falle
        console.error('Error al enviar la cita:', error);
        throw error; // Lanzar el error para que el código que llama pueda manejarlo
    }
}

