import { Button, Modal } from "flowbite-react"
import { Cita } from "../../../models/Cita";
import { fechaConfig } from "../../../constants/FechaConfig";
import '../../../index.css'

interface Props {
    selectedCita: Cita;
    onClose: () => void
}
function PopupConfirmarAgendacion({ onClose, selectedCita }: Props) {
    return (
        <Modal popup size={'md'} onClose={onClose} show={true}>
            <Modal.Header />
            <Modal.Body>
                <h2 className="text-center">
                    ¿Seguro que deseas aceptar la cita para el &nbsp;
                    <span className="titulos dark:text-purple-400 text-center">
                        {/*
                        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore*/
                            new Date(selectedCita.fecha).toLocaleDateString("es-ES", fechaConfig)}
                    </span>?

                </h2>

                <div className="flex gap-3 mt-5">
                    <Button className="grow" color="success">Confirmar</Button>
                    <Button className="btn_cancelar" color="secondary" onClick={onClose}>Cancelar</Button>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PopupConfirmarAgendacion