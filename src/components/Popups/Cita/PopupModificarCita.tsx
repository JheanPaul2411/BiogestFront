import getHoursParsed from "@/helpers/constants/getHours";
import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Modal, TextInput, Button } from "flowbite-react";
import { useState } from "react";

interface PropsPopupEditarCita {
  selectedCita: Partial<Cita>;
  onClose: () => void;
  onReagendar?: (citaActualizada: Cita) => void; // Función para manejar el reagendamiento de la cita
  mutation?: UseMutateFunction<AxiosResponse, Error, Partial<Cita>, unknown>;
}

const PopupEditarCita: React.FC<PropsPopupEditarCita> = ({
  selectedCita,
  onClose,
  mutation
}) => {
  const [newDate, setNewDate] = useState("");



  return (
    <Modal
      onClose={onClose}
      size={"md"}
      popup
      show={true}
      aria-modal={"true"}
      aria-label={`Modificar fecha de cita para ${selectedCita?.paciente?.nombre} ${selectedCita?.paciente?.apellido}`}
    >
      <Modal.Header />
      <Modal.Body className="flex flex-col items-center">
        <h2 className="font-semibold text-lg mb-8">
          Modificar fecha de la cita
        </h2>
        <div>
          <p>
            Paciente:{" "}
            <span className="text-gray-500 dark:text-gray-400">
            {selectedCita?.paciente?.nombre} {selectedCita?.paciente?.apellido}
            </span>
          </p>
          <div className="flex gap-2 my-2">
            <span className="">Fecha establecida:</span>
            <p className="dark:text-gray-400 text-gray-500 atributos">
              {parseDate(selectedCita.fecha)}
            </p>
          </div>

          <div className="flex gap-2 my-2">
            <p className="">Hora establecida:</p>
            <span className="text-gray-500 dark:text-gray-400">
              {getHoursParsed(new Date(selectedCita.fecha!).toISOString())}
            </span>
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
        </div>

        <div className="flex w-full gap-3 mt-10">
          <Button
            color="purple"
            className="flex-grow"
            onClick={() => {
              if(mutation){
                mutation({fecha:new Date(newDate)})
              }
            }}
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
