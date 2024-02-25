import axios, { AxiosResponse } from "axios";
import {  jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/models/Payload";
import { Usuario } from "../components/models/UserDto";
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
        console.log('Token',token)
        console.log('UserID', id)
        console.log('URL:', apiUrl)
        throw new Error(`Error: ${error}`);
        
    }

}