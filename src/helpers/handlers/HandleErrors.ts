import axios from "axios";
import toast from "react-hot-toast";


export function handleErrors(error: unknown) {

    if (axios.isAxiosError(error)) {

        if (error.response?.status === 403) {
            toast.error('No tienes permiso para acceder a este recurso');
            return;
        }
        toast.error(error.response?.data.message);


    } else {
        console.log(error)
    }


}
