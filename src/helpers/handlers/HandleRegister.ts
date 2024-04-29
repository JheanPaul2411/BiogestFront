import axios from "axios";
import { baseUrl } from "../constants/BaseURL";
import { handleErrors } from "./HandleErrors";
import { User, ApiResponse } from "@/components/AgendarCita/dto/Login.dto";

export async function registerUser(credentials: User): Promise<ApiResponse> {
    try {
      const [year, month, day] = credentials.fecha_nacimiento.split('-');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const apiUrl = `${baseUrl}/auth/register`;
  
      const formData = new FormData();
      formData.append('nombre', credentials.nombre);
      formData.append('apellido', credentials.apellido);
      formData.append('cedula', credentials.cedula);
      formData.append('contacto', credentials.contacto);
      formData.append('email', credentials.email);
      formData.append('password', credentials.password!);
      formData.append('fecha_nacimiento', formattedDate);
      formData.append('rol', "PACIENTE");
  
      if (credentials.photoUrl) {
        if (credentials.photoUrl instanceof FileList && credentials.photoUrl.length > 0) {
          const file = credentials.photoUrl[0]; // Obtener el primer archivo del FileList
          const fileBlob = new Blob([file], { type: file.type });
          formData.append('photoUrl', fileBlob, file.name);
        } else if (credentials.photoUrl instanceof File) {
          const file = credentials.photoUrl;
          const fileBlob = new Blob([file], { type: file.type });
          formData.append('photoUrl', fileBlob, file.name);
        }
      }
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      handleErrors(error);
      throw error;
    }
  }