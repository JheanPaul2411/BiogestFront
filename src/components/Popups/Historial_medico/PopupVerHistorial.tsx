import React, {  } from "react";
import { Modal } from "flowbite-react";
import '../../../index.css';
import HistorialTable from "../../Common/HistorialTable";
import { columnsHistorial } from "../../../helpers/constants/table_columns/HistorialMTable";
import useHistorial from "../../../helpers/hooks/useHistorial";
import { Usuario } from "../../../helpers/models/User";


interface PropsPopupEditarCita {
    selectedUser: Usuario;
    onClose: () => void;
}

const PopupVerHistorial: React.FC<PropsPopupEditarCita> = ({
    selectedUser,
    onClose,
}) => {
    const {historialMedico} = useHistorial({id:selectedUser.id});

    
    return (
        <Modal onClose={onClose} size={"5xl"} popup show={true} className="z-50">
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center">
                <div>
                    <p className="text-xl">Citas del paciente {selectedUser.nombre} {selectedUser.apellido}</p>

                </div>

                {historialMedico ? (
                    <HistorialTable data={historialMedico} columns={columnsHistorial} filterPlaceholder={"Buscar historiales"} />
                ) : (
                    <><h2> Este paciente aún no tiene un historial médico</h2></>
                )}


            </Modal.Body>
        </Modal>
    );
};

export default PopupVerHistorial;