import axios from "axios";
import toast from "react-hot-toast";


export function handleErrors(error: unknown) {

    if (axios.isAxiosError(error)) {


        toast.error(error.response?.data.message);


    } else {
        console.log(error)
    }


}
