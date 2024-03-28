import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/BaseURL";
import { headerBearer } from "../constants/Headers";
import { Cita } from "../models/Cita";


export default function useCitas() {
    const [citas, setcitas] = useState<Cita[]>([]);
    useEffect(()=>{
        async function fetchCitas() {
            try {
                const response: AxiosResponse<Cita[]> = await axios.get(`${baseUrl}/cita`,{
                    headers: headerBearer()
                });
                if (response) {
                    setcitas(response.data);
                }
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchCitas()
    },[setcitas]);
    return {citas}
};
