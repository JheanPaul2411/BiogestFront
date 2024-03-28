import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { handleErrors } from "@/helpers/handlers/HandleErrors";
import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import axios, { AxiosResponse } from "axios";
import { Modal, Button } from "flowbite-react";


interface Props {
    selectedCita: Cita;
    onClose: () => void
}



function PopupConfirmarAgendacion({ onClose, selectedCita }: Props) {

    async function confirmarCita() {
        try {
            
            const response: AxiosResponse<Cita> = await axios.put(`${baseUrl}/cita/${selectedCita.id}`, {
                aceptada:true
            }, {headers:headerBearer()});
    
            if(response){
                alert("Has confirmado esta cita")
                onClose()
            }
        } catch (error) {
            handleErrors(error);
        }
    }

    return (
        <Modal popup size={'md'} onClose={onClose} show={true}>
            <Modal.Header />
            <Modal.Body>
                <h2 className="text-center">
                    ¿Seguro que deseas aceptar la cita para el &nbsp;
                    <span className="titulos dark:text-purple-400 text-center">
                        {parseDate(selectedCita.fecha)}
                    </span>?

                </h2>

                <div className="flex gap-3 mt-5">
                    <Button className="grow" color="success" onClick={confirmarCita}>Confirmar</Button>
                    <Button className="btn_cancelar" color="secondary" onClick={onClose} disabled={selectedCita.aceptada}>Cancelar</Button>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PopupConfirmarAgendacion