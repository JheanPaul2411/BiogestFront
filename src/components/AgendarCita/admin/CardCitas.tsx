import { useState } from "react";
import { Cita } from "../../../models/Cita";
import { Button, Modal, TextInput } from "flowbite-react";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../../constants/BaseURL";
import { headerBearer } from "../../../constants/Headers";
import { fechaConfig } from "../../../constants/FechaConfig";

interface Props {
    citas: Cita[];
}

function CardCitas({ citas }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
    const [newDate, setNewDate] = useState('');

    function handleClick(cita: Cita) {
        setSelectedCita(cita);
        console.log(cita)
        setShowModal(true);
    }

    async function handleEditFecha() {
        if (!selectedCita || !newDate) return;

        const updatedCita: Cita = { ...selectedCita, fecha: new Date(newDate) };

        try {
            const response: AxiosResponse<Cita> = await axios.put(`${baseUrl}/cita/${updatedCita.id}`, updatedCita, {
                headers: headerBearer()
            });
            console.log(response);
            setShowModal(false);
            alert('Se ha actualizado la fecha de la cita.')
        } catch (error) {
            console.error("Error al actualizar la fecha de la cita:", error);
        }
    }

    return (
        <div className="flex flex-col gap-4" id="citas">
            {citas.map((cita, index) => (
                <div
                    key={index}
                    className="flex flex-col w-fit dark:bg-gray-700 bg-gray-300 p-5 rounded-lg hover:dark:bg-gray-600 transition-all hover:cursor-pointer"
                    onClick={() => handleClick(cita)}
                >
                    <div className="flex">
                        <span>Fecha de la cita:</span>
                        {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        /* @ts-ignore */}
                        <h2> &nbsp; {new Date(cita.fecha).toLocaleDateString("es-ES", fechaConfig)}</h2>
                    </div>
                    <div className="motivo">
                        <span>Motivo de la cita:</span>
                        <p>{cita.motivo}</p>
                    </div>
                    {cita.sintomas && (
                        <div className="sintomas">
                            <span>Síntomas</span>
                            <p>{cita.sintomas}</p>
                        </div>
                    )}
                </div>
            ))}
            {showModal && (
                <Modal onClose={() => setShowModal(false)} size={"2xl"} popup show={showModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <h2 className="font-semibold text-lg">Modificar fecha de la cita</h2>
                        {selectedCita && (
                            <>
                                <div className="flex gap-2 my-2">
                                    <span className="">Fecha actual:</span>
                                    {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        /* @ts-ignore */}
                                    <p className="dark:text-gray-400">{new Date(selectedCita.fecha).toLocaleDateString("es-ES", fechaConfig)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Nueva fecha:</span>
                                    <TextInput type="date" onChange={(e) => setNewDate(e.target.value)} value={newDate}></TextInput>
                                </div>
                                <div className="flex w-full gap-3 my-5">
                                    <Button color="purple" className="flex-grow" onClick={handleEditFecha}>Confirmar</Button>
                                    <Button color="secondary" className="flex-grow border-2 border-purple-600 focus:ring-2 focus:ring-purple-700" onClick={() => setShowModal(false)}>Cancelar</Button>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}

export default CardCitas;
