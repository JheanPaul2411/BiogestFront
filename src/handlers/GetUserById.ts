import axios, { AxiosResponse } from "axios";
import {  jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../models/Payload";
import { Usuario } from "../models/User";
import { baseUrl } from "../constants/BaseURL";

export async function getUserByToken(token:string):Promise<Usuario> {

    const decodedToken = jwtDecode(token) as CustomJwtPayload;
    const {id}=decodedToken;
    const apiUrl = `${baseUrl}/usuarios/${id}`

    try {
    
        const user:AxiosResponse<Usuario> = await axios.get(apiUrl,{
            headers: {
                'authorization': `bearer ${token}`
            }
        });

        return user.data;
        
    } catch (error) {
        throw new Error(`Error: ${error}`);
        
    }

}