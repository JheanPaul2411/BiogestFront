import axios from "axios";
import { ApiResponse, User } from "../Pages/dto/Login.dto";


export async function registerUser(credentials: User): Promise<ApiResponse> {
    try {
        const [year, month, day] = credentials.fecha_nacimiento.split('-');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${baseUrl}/auth/register`
        const body: User = {
            nombre: credentials.nombre,
            apellido: credentials.apellido,
            cedula: credentials.cedula,
            contacto: credentials.contacto,
            email: credentials.email,
            password: credentials.password,
            fecha_nacimiento: formattedDate,
            rol: "PACIENTE"

        };

        const response = await axios.post(apiUrl, body);
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error;
    }

}
