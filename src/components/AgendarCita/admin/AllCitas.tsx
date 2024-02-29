import {  useEffect, useState } from 'react'
import { Cita } from '../../../models/Cita';
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../../../constants/BaseURL';
import CardCitas from './CardCitas';

function AllCitas() {
    const [citas, setcitas] = useState<Cita[]>([]);

    useEffect(()=>{
        async function fetchCitas() {
            try {
                const response: AxiosResponse<Cita[]> = await axios.get(`${baseUrl}/cita`);
                if (response) {
                    setcitas(response.data);
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchCitas()
    },[citas]);


    return (
        <>
            <CardCitas citas={citas}/>
        </>
      )
}

export default AllCitas