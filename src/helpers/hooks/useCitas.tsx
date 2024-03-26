import { useEffect, useState } from "react";
import { Cita } from "../models/Cita";
import axios, { AxiosResponse } from "axios";
import { headerBearer } from "../constants/Headers";
import { baseUrl } from "../constants/BaseURL";

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
