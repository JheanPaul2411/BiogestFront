import axios from "axios";
import { ApiResponse } from "../Pages/dto/Login.dto";
import validateToken from "./ValidateToken";

interface LoginCredentials {
    email: string;
    password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse> {
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${baseUrl}/auth/login`;
        const body = {
            email: credentials.email,
            password: credentials.password
        };
        
        const response = await axios.post(apiUrl, body);
        const { token } = response.data;
        const tokenVerified = await validateToken(token); // Await the result of validateToken
        if (tokenVerified) {
            sessionStorage.setItem('token', token);
            console.log('Token válido');
        } else {
            console.log('Token inválido');
        }
        
        console.warn(typeof(token));
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error;
    }
}
