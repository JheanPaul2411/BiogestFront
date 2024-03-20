import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import '../../../index.css';
import { User } from "../../AgendarCita/dto/Login.dto";
import { HistorialMedico } from "../../../models/HistorialMedico";
import axios from "axios";
import { baseUrl } from "../../../constants/BaseURL";
import { handleErrors } from "../../../handlers/HandleErrors";
import { headerBearer } from "../../../constants/Headers";
import HistorialTable from "../../Common/HistorialTable";
import { createColumnHelper } from "@tanstack/react-table";

interface PropsPopupEditarCita {
    selectedUser: User;
    onClose: () => void;
}

const PopupVerHistorial: React.FC<PropsPopupEditarCita> = ({
    selectedUser,
    onClose,
}) => {
    const [historialMedico, setHistorialMedico] = useState<HistorialMedico[]>([])

    useEffect(() => {

        async function fetchHistorial() {
            try {
                const response = await axios.get(`${baseUrl}/ficha-medica/${selectedUser.id}`, {
                    headers: headerBearer()
                })
                if (response)
                    setHistorialMedico(response.data)
            } catch (error) {
                handleErrors(error)
            }
        }

        fetchHistorial()

    }, [selectedUser.id])
    const columnHelper = createColumnHelper<HistorialMedico>();

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('alergias', {
            header: 'Alergias',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('altura', {
            header: 'Altura',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('antecedentesFamiliares', {
            header: 'Antecedentes familiares',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('antecedentesPersonales', {
            header: 'Antecedentes personales',
            cell: info => info.getValue(),

        }),
        columnHelper.accessor('diagnostico', {
            header: 'Diagnóstico',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('enfermedades', {
            header: 'Enfermedades',
            cell: info => info.getValue(),
        }),
    ];
    return (
        <Modal onClose={onClose} size={"5xl"} popup show={true} className="z-50">
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center">
                <div>
                    <p className="text-xl">Citas del paciente {selectedUser.nombre} {selectedUser.apellido}</p>

                </div>

                {historialMedico ? (
                    <HistorialTable data={historialMedico} columns={columns} filterPlaceholder={"Buscar historiales"} />
                ) : (
                    <><h2> Este paciente aún no tiene un historial médico</h2></>
                )}


            </Modal.Body>
        </Modal>
    );
};

export default PopupVerHistorial;