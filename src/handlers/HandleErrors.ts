import axios from "axios";


export function handleErrors(error:unknown) {

    if(axios.isAxiosError(error)){

        if(error.response?.status===403){
        alert('No tienes permiso para acceder a este recurso');
        }
        alert(error.response?.data.message);


    }else{
        console.log(error)
    }

    
}
