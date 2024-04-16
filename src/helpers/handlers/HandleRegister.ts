import axios from "axios";
import { baseUrl } from "../constants/BaseURL";
import { handleErrors } from "./HandleErrors";
import { User, ApiResponse } from "@/components/AgendarCita/dto/Login.dto";


export async function registerUser(credentials: User): Promise<ApiResponse> {
    try {
        const [year, month, day] = credentials.fecha_nacimiento.split('-');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const apiUrl = `${baseUrl}/auth/register`
        const body: User = {
            nombre: credentials.nombre,
            apellido: credentials.apellido,
            cedula: credentials.cedula,
            contacto: credentials.contacto,
            email: credentials.email,
            password: credentials.password,
            fecha_nacimiento: formattedDate,
            photoUrl:credentials.photoUrl,
            rol: "PACIENTE"
        };

        const response = await axios.post(apiUrl, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
        handleErrors(error)
        throw error;
    }

}
