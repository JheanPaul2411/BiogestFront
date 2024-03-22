import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import '../../../index.css';
import PopupVerHistorial from "./PopupVerHistorial";
import PopupAgregarHistorial from "./PopupAgregarHistorial";
import { Usuario } from "../../../models/User";

interface PorpsPopup {
    selectedUser: Usuario;
    onClose: () => void;
}

const PopupDetallesTabla: React.FC<PorpsPopup> = ({
    selectedUser,
    onClose,
}) => {
    const [showPopupTabla, setshowPopupTabla] = useState(false);
    const [showPopupAgregarHistorial, setShowPopupAgregarHistorial] = useState(false);


    function handleShowHistorial() {
        setshowPopupTabla(true)
    }

    function handleAgregarHistorial() {
        setShowPopupAgregarHistorial(true)
    }

    return (
        <Modal onClose={onClose} size={"lg"} popup show={true} className="z-40">
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center">
                <div>
                    <p className="text-2xl">Paciente {selectedUser.nombre} {selectedUser.apellido}</p>
                </div>

                <div className="flex m-5 gap-5">
                    <Button color="indigo" onClick={handleShowHistorial}>Ver historial médico</Button>
                    <Button color="indigo" onClick={handleAgregarHistorial}>Agregar ficha médica</Button>

                </div>
            </Modal.Body>
            {showPopupTabla && selectedUser && (
                <PopupVerHistorial onClose={() => setshowPopupTabla(false)} selectedUser={selectedUser} />
            )}

            {showPopupAgregarHistorial &&(
                <PopupAgregarHistorial onClose={() => setShowPopupAgregarHistorial(false)} selectedUser={selectedUser} />
            )}
        </Modal>
    );
};

export default PopupDetallesTabla;
