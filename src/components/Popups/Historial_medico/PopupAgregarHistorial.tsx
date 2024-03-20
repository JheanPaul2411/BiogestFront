import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { User } from "../../AgendarCita/dto/Login.dto";
import { handleErrors } from "../../../handlers/HandleErrors";
import { useState } from "react";
import { HistorialMedico } from "../../../models/HistorialMedico";

interface PropsPopupEditarCita {
    selectedUser: User;
    onClose: () => void;
}

const PopupAgregarHistorial: React.FC<PropsPopupEditarCita> = ({
    selectedUser,
    onClose,
}) => {
    async function handleAgregarCita() {
        try {
            console.log(selectedUser)
        } catch (error) {
            handleErrors(error)
        }
    }
    const [historialMedico, setHistorialMedico] = useState<HistorialMedico>({} as HistorialMedico);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHistorialMedico({ ...historialMedico, [e.target.name]: e.target.value });
      };
    return (
        <Modal onClose={onClose} size={'5xl'} className="z-[60]" popup show={true}>
            <Modal.Header />
            <Modal.Body>
                <form className="flex flex-col">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="peso" className="mb-2">Peso (Kg):</Label>
                            <TextInput
                                type="number"
                                id="peso"
                                name="peso"
                                value={historialMedico.peso || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="altura" className="mb-2">Altura:</Label>
                            <TextInput
                                type="number"
                                id="altura"
                                name="altura"
                                value={historialMedico.altura || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="presionArterial" className="mb-2">Presión Arterial:</Label>
                            <TextInput
                                type="text"
                                id="presionArterial"
                                name="presionArterial"
                                value={historialMedico.presionArterial}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="temperatura" className="mb-2">Temperatura:</Label>
                            <TextInput
                                type="number"
                                id="temperatura"
                                name="temperatura"
                                value={historialMedico.temperatura || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="enfermedades" className="mb-2">Enfermedades:</Label>
                            <TextInput
                                type="text"
                                id="enfermedades"
                                name="enfermedades"
                                value={historialMedico.enfermedades}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="alergias" className="mb-2">Alergias:</Label>
                            <TextInput
                                type="text"
                                id="alergias"
                                name="alergias"
                                value={historialMedico.alergias}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="medicamentos" className="mb-2">Medicamentos:</Label>
                            <TextInput
                                type="text"
                                id="medicamentos"
                                name="medicamentos"
                                value={historialMedico.medicamentos}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="antecedentesFamiliares" className="mb-2">Antecedentes Familiares:</Label>
                            <Textarea
                                id="antecedentesFamiliares"
                                name="antecedentesFamiliares"
                                value={historialMedico.antecedentesFamiliares}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="antecedentesPersonales" className="mb-2">Antecedentes Personales:</Label>
                            <Textarea
                                id="antecedentesPersonales"
                                name="antecedentesPersonales"
                                value={historialMedico.antecedentesPersonales}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="observaciones" className="mb-2">Observaciones:</Label>
                            <Textarea
                                id="observaciones"
                                name="observaciones"
                                value={historialMedico.observaciones}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="diagnostico" className="mb-2">Diagnóstico:</Label>
                            <Textarea
                                id="diagnostico"
                                name="diagnostico"
                                value={historialMedico.diagnostico}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="tratamiento" className="mb-2">Tratamiento:</Label>
                            <Textarea
                                id="tratamiento"
                                name="tratamiento"
                                value={historialMedico.tratamiento}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mb-4 md:mr-4">
                            <Label htmlFor="proximaCita" className="mb-2">Próxima Cita:</Label>
                            <TextInput
                                type="date"
                                id="proximaCita"
                                name="proximaCita"
                                value={historialMedico.proximaCita?.toISOString().split('T')[0] || ''}
                                onChange={handleChange}
                            />
                        </div>
                       
                    </div>

                    <div>
                        <Button color="purple" onClick={handleAgregarCita}>Agrndar Cita</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )


}


export default PopupAgregarHistorial