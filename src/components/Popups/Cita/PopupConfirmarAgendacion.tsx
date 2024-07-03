import { parseDate } from "@/helpers/handlers/ParseDate";
import { Cita } from "@/helpers/models/Cita";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Modal, Button } from "flowbite-react";

interface Props {
  selectedCita: Cita;
  onConfirmar?: (citaActualizada: Cita) => void; // Función para manejar el reagendamiento de la cita
  mutation?: UseMutateFunction<AxiosResponse, unknown, Partial<Cita>, unknown>;
  onClose: () => void;
}

function PopupConfirmarAgendacion({
   onClose,
    selectedCita,
    mutation,
  }: Props) {

  if (new Date(selectedCita.fecha) < new Date()) {
    return (
      <Modal
        popup
        size={"md"}
        onClose={onClose}
        show={true}
        aria-modal={"true"}
        aria-label="Cita con fecha pasada"
      >
        <Modal.Header />
        <Modal.Body>
          <h2 className="text-center">
            No puedes aceptar una cita cuya fecha ya pasó.
          </h2>
          <Button
            role="button"
            className="btn_cancelar my-5"
            color="secondary"
            onClick={onClose}
            disabled={selectedCita.aceptada}
            aria-label="Salir del modal"
          >
            Salir
          </Button>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal
      popup
      aria-modal={"true"}
      size={"md"}
      onClose={onClose}
      show={true}
      aria-label={`Confirmar cita para ${parseDate(selectedCita.fecha)}`}
    >
      <Modal.Header />
      <Modal.Body>
        <h2 className="text-center">
          ¿Seguro que deseas aceptar la cita para el &nbsp;
          <span className="titulos dark:text-purple-400 text-center">
            {parseDate(selectedCita.fecha)}
          </span>
          ?
        </h2>
        <div className="flex gap-3 mt-5">
          <Button
            className="grow"
            color="success"
            onClick={() => {
              if (mutation) {
                mutation({id: selectedCita.id, aceptada: true});
              }
              onClose();
            }}
            aria-label="Confirmar cita"
            role="button"
          >
            Confirmar
          </Button>
          <Button
            className="btn_cancelar"
            color="secondary"
            onClick={onClose}
            disabled={selectedCita.aceptada}
            aria-label="Cancelar confirmación"
            role="button"
          >
            Cancelar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopupConfirmarAgendacion;