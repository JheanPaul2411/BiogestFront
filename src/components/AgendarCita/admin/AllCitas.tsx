import {  useEffect, useState } from 'react'
import { Cita } from '../../../models/Cita';
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../../../constants/BaseURL';
import CardCitas from './CardCitas';
import { headerBearer } from '../../../constants/Headers';

function AllCitas() {
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
    
    console.log(citas)
    
    return (
        <>
            <CardCitas citas={citas}/>
        </>
      )
}

export default AllCitas