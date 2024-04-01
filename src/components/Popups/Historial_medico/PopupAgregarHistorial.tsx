import { handleErrors } from "@/helpers/handlers/HandleErrors";
import handleRegistrarHistorial from "@/helpers/handlers/handleRegistrarHistorial";
import { HistorialMedico } from "@/helpers/models/HistorialMedico";
import { Usuario } from "@/helpers/models/User";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { useState } from "react";

interface PropsPopupEditarCita {
  selectedUser: Usuario;
  onClose: () => void;
}

const PopupAgregarHistorial: React.FC<PropsPopupEditarCita> = ({
  selectedUser,
  onClose,
}) => {
  const [historialMedico, setHistorialMedico] = useState<HistorialMedico>(
    {} as HistorialMedico
  );

  const [fechaConsulta, setFechaConsulta] = useState("");
  async function handleAgregarCita() {
    try {
      await handleRegistrarHistorial({
        selectedUser: selectedUser,
        dataHistorial: {
          ...historialMedico,
          fecha: new Date(fechaConsulta.toString()),
        },
      });

      alert(
        `Se ha registrado una nueva ficha médica al paciente ${selectedUser.nombre} ${selectedUser.apellido}`
      );
    } catch (error) {
      handleErrors(error);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHistorialMedico({
      ...historialMedico,
      [name]: ["peso", "altura"].includes(name) ? parseFloat(value) : value,
    });
  };

  return (
    <Modal onClose={onClose} size={"5xl"} className="z-[60]" popup show={true}>
      <Modal.Header />
      <Modal.Body>
        <form className="flex flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col mb-4 md:mr-4">
              <Label htmlFor="peso" className="mb-2">
                Peso (Kg):
              </Label>
              <TextInput
                type="number"
                id="peso"
                name="peso"
                value={historialMedico.peso || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4 md:mr-4">
              <Label htmlFor="altura" className="mb-2">
                Altura:
              </Label>
              <TextInput
                type="number"
                id="altura"
                name="altura"
                value={historialMedico.altura || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="presionArterial" className="mb-2">
                Presión Arterial:
              </Label>
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
              <Label htmlFor="temperatura" className="mb-2">
                Temperatura:
              </Label>
              <TextInput
                type="number"
                id="temperatura"
                name="temperatura"
                value={historialMedico.temperatura || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4 md:mr-4">
              <Label htmlFor="enfermedades" className="mb-2">
                Enfermedades:
              </Label>
              <TextInput
                type="text"
                id="enfermedades"
                name="enfermedades"
                value={historialMedico.enfermedades}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="alergias" className="mb-2">
                Alergias:
              </Label>
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
              <Label htmlFor="medicamentos" className="mb-2">
                Medicamentos:
              </Label>
              <TextInput
                type="text"
                id="medicamentos"
                name="medicamentos"
                value={historialMedico.medicamentos}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4 md:mr-4">
              <Label htmlFor="antecedentesFamiliares" className="mb-2">
                Antecedentes Familiares:
              </Label>
              <Textarea
                id="antecedentesFamiliares"
                name="antecedentesFamiliares"
                value={historialMedico.antecedentesFamiliares}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="antecedentesPersonales" className="mb-2">
                Antecedentes Personales:
              </Label>
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
              <Label htmlFor="observaciones" className="mb-2">
                Observaciones:
              </Label>
              <Textarea
                id="observaciones"
                name="observaciones"
                value={historialMedico.observaciones}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4 md:mr-4">
              <Label htmlFor="diagnostico" className="mb-2">
                Diagnóstico:
              </Label>
              <Textarea
                id="diagnostico"
                name="diagnostico"
                value={historialMedico.diagnostico}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="tratamiento" className="mb-2">
                Tratamiento:
              </Label>
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
              <Label htmlFor="proximaCita" className="mb-2">
                Fecha de la cita:
              </Label>
              <TextInput
                type="date"
                id="proximaCita"
                name="proximaCita"
                value={fechaConsulta}
                onChange={(e) => setFechaConsulta(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button color="purple" onClick={handleAgregarCita}>
              Agregar ficha médica
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PopupAgregarHistorial;
