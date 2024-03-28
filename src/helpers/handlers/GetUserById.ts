import axios, { AxiosResponse } from "axios";
import {  jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/helpers/models/Payload";
import { Usuario } from "@/helpers/models/User";
import { baseUrl } from "@/helpers/constants/BaseURL";

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