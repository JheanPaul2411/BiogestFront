import React, { useState } from "react";
import { Modal, TextInput, Button } from "flowbite-react";
import axios, { AxiosResponse } from "axios";
import { Cita } from "../../../models/Cita";
import { baseUrl } from "../../../constants/BaseURL";
import { headerBearer } from "../../../constants/Headers";
import { fechaConfig } from "../../../constants/FechaConfig";
import '../../../index.css'
interface PropsPopupEditarCita {
    selectedCita: Cita;
    onClose: () => void;
}

const PopupEditarCita: React.FC<PropsPopupEditarCita> = ({
    selectedCita,
    onClose,
}) => {
    const [newDate, setNewDate] = useState("");

    async function handleEditFecha() {
        if (!selectedCita || !newDate) return;

        const updatedCita: Cita = { ...selectedCita, fecha: new Date(newDate) };

        try {
            const response: AxiosResponse<Cita> = await axios.put(
                `${baseUrl}/cita/${updatedCita.id}`,
                updatedCita,
                {
                    headers: headerBearer(),
                }
            );
            console.log(response);
            onClose();
            alert("Se ha actualizado la fecha de la cita.");
        } catch (error) {
            console.error("Error al actualizar la fecha de la cita:", error);
        }
    }

    return (
        <Modal onClose={onClose} size={"md"} popup show={true}>
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center">
                <h2 className="font-semibold text-lg mb-8">
                    Modificar fecha de la cita
                </h2>
                <div className="flex gap-2 my-2">
                    <span className="">Fecha actual:</span>
                    <p className="dark:text-gray-400 atributos">
                        {/*
                         //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore*/}
                        {new Date(selectedCita.fecha).toLocaleDateString("es-ES", fechaConfig)}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span>Nueva fecha:</span>
                    <TextInput
                        type="date"
                        onChange={(e) => setNewDate(e.target.value)}
                        value={newDate}
                    />
                </div>
                <div className="flex w-full gap-3 mt-10">
                    <Button
                        color="purple"
                        className="flex-grow"
                        onClick={handleEditFecha}
                    >
                        Confirmar
                    </Button>
                    <Button
                        color="secondary"
                        className="btn_cancelar"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PopupEditarCita;
