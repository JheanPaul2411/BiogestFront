import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { handleErrors } from "@/helpers/handlers/HandleErrors";
import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import axios from "axios";
import { Modal, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface PropsPopupEditarCita {
  selectedCita: Cita;
  onClose: () => void;
  onReagendar: (citaActualizada: Cita) => void; // Función para manejar el reagendamiento de la cita
}

const PopupEditarCita: React.FC<PropsPopupEditarCita> = ({
  selectedCita,
  onClose,
  onReagendar,
}) => {
  const [newDate, setNewDate] = useState("");

  async function handleEditFecha() {
    if (!selectedCita || !newDate) return;
    const updatedCita: Cita = { ...selectedCita, fecha: new Date(newDate) };
    try {
      await axios.put(
        `${baseUrl}/cita/${updatedCita.id}`,
        { fecha: new Date(newDate) },
        { headers: headerBearer() }
      );
      onReagendar(updatedCita); // Llamar a la función onReagendar con la cita actualizada
      onClose();
      toast.success("Se ha actualizado la fecha de la cita.");
      window.location.reload();
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <Modal
      onClose={onClose}
      size={"md"}
      popup
      
      show={true}
      aria-modal={"true"}
      aria-label={`Modificar fecha de cita para ${selectedCita.paciente.email}`      
    }
    >
      <Modal.Header />
      <Modal.Body className="flex flex-col items-center">
        <h2 className="font-semibold text-lg mb-8">
          Modificar fecha de la cita
        </h2>
        <p>
          Paciente: <span>{selectedCita.paciente.email}</span>
        </p>
        <div className="flex gap-2 my-2">
          <span className="">Fecha actual:</span>
          <p className="dark:text-gray-400 atributos">
            {parseDate(selectedCita.fecha)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span>Nueva fecha:</span>
          <TextInput
            type="datetime-local"
            onChange={(e) => setNewDate(e.target.value)}
            value={newDate}
            aria-label="Seleccionar nueva fecha"
          />
        </div>
        <div className="flex w-full gap-3 mt-10">
          <Button
            color="purple"
            className="flex-grow"
            onClick={handleEditFecha}
            role="button"
            aria-label="Confirmar nueva fecha"
          >
            Confirmar
          </Button>
          <Button
            color="secondary"
            className="btn_cancelar"
            onClick={onClose}
            role="button"
            aria-label="Cancelar cambio de fecha"
          >
            Cancelar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupEditarCita;