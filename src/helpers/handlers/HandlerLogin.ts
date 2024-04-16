import axios from "axios";
import validateToken from "./ValidateToken";
import { ApiResponse } from "@/components/AgendarCita/dto/Login.dto";
import { handleErrors } from "./HandleErrors";

export interface LoginCredentials {
    email: string;
    password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse> {
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${baseUrl}/auth/login`;
        const body = {
            email: credentials.email!,
            password: credentials.password,
        };
        
        const response = await axios.post(apiUrl, body);
        const { token } = response.data;
        const tokenVerified = await validateToken(token); // Await the result of validateToken
        if (tokenVerified) {
            localStorage.setItem('token', token);
        } else {
            console.log('Token inválido');
        }
        
        return response.data;
    } catch (error) {
        handleErrors(error)
        throw error;
    }
}
