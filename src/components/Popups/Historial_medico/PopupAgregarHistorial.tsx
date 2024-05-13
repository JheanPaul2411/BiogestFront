import { handleErrors } from "@/helpers/handlers/HandleErrors";
import handleRegistrarHistorial from "@/helpers/handlers/handleRegistrarHistorial";
import { HistorialMedico } from "@/helpers/models/HistorialMedico";
import { Usuario } from "@/helpers/models/User";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Accordion } from "flowbite-react";

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

      toast.success(
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
    <Modal
      onClose={onClose}
      size={"2xl"}
      className="z-[60]"
      popup
      show={true}
      aria-modal={"true"}
    >
      <Modal.Header />
      <Modal.Body>
        <form>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>Mediciones físicas</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-col">
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

                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>Historial médico</Accordion.Title>
              <Accordion.Content>
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
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>Relacionados a la consulta</Accordion.Title>
              <Accordion.Content>
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
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          <div className="lg:col-span-2 my-5">
            <Button color="purple" onClick={handleAgregarCita}>
              Agregar incidencia
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PopupAgregarHistorial;
