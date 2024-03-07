import { useState } from "react";
import { Cita } from "../../../models/Cita";
import { fechaConfig } from "../../../constants/FechaConfig";
import './CardCitas.css'
import PopupEditarCita from "../../Popups/Cita/PopupModificarCita";
import { Button } from "flowbite-react";
import PopupConfirmarAgendacion from "../../Popups/Cita/PopupConfirmarAgendacion";

interface Props {
    citas: Cita[];
}

function CardCitas({ citas }: Props) {
    const [showReagendarModal, setShowReagendarModal] = useState<boolean>(false);
    const [showPopupConfirmarCita, setshowPopupConfirmarCita] = useState<boolean>(false)
    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

    function handleReagendar(cita: Cita) {
        setSelectedCita(cita);
        setShowReagendarModal(true);
    }

    function handleconfirmarAgendacion(cita: Cita) {
        setSelectedCita(cita);
        setshowPopupConfirmarCita(true)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4" id="citas">
            {citas.map(cita => (
                <div
                    key={cita.id}
                    className={`flex flex-col w-[80%] dark:bg-gray-700 bg-gray-300 p-5 rounded-lg transition-all hover:cursor-pointer ${cita.aceptada ? 'bg-green-800/30 dark:bg-green-800/30' : ''}`}
                >
                    <div className="motivo flex gap-2">
                        <span className="titulos">Paciente:</span>
                        <p className="atributos">{cita.paciente.nombre} {cita.paciente.apellido}</p>
                    </div>
                    <div className="flex">
                        <span className="titulos">Fecha de la cita:</span>
                        {// eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        /* @ts-ignore */}
                        <h2 className="atributos"> &nbsp; {new Date(cita.fecha).toLocaleDateString("es-ES", fechaConfig)}</h2>
                    </div>
                    <div className="motivo flex gap-2">
                        <span className="titulos">Motivo de la cita:</span>
                        <p className="atributos">{cita.motivo}</p>
                    </div>
                    {cita.sintomas && (
                        <div className="sintomas flex gap-2">
                            <span className="titulos">Síntomas</span>
                            <p className="atributos">{cita.sintomas}</p>
                        </div>
                    )}
                    <div className="motivo flex gap-2">
                        <span className="titulos">Aceptada:</span>
                        <p className="atributos">{cita.aceptada.toString()}</p>
                    </div>
                    <div className="flex mt-6 gap-3">
                        <Button color="success" className="grow" disabled={cita.aceptada}
                            onClick={() => handleconfirmarAgendacion(cita)}>Aprobar solicitud</Button>
                        <Button onClick={() => handleReagendar(cita)} disabled={cita.aceptada} color="purple">Reagendar</Button>
                    </div>
                </div>
            ))}
            {selectedCita && showReagendarModal && (
                <PopupEditarCita selectedCita={selectedCita} onClose={() => setShowReagendarModal(false)} />
            )}

            {selectedCita && showPopupConfirmarCita && (
                <PopupConfirmarAgendacion selectedCita={selectedCita} onClose={()=>setshowPopupConfirmarCita(false)}/>
            )}
        </div>
    );
}

export default CardCitas;
