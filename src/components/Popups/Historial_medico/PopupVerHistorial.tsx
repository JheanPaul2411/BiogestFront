import HistorialTable from "@/components/Common/HistorialTable";
import { columnsHistorial } from "@/helpers/constants/table_columns/HistorialMTable";
import useHistorial from "@/helpers/hooks/useHistorial";
import { Usuario } from "@/helpers/models/User";
import { Modal } from "flowbite-react";

interface PropsPopupEditarCita {
  selectedUser: Usuario;
  onClose: () => void;
}

const PopupVerHistorial: React.FC<PropsPopupEditarCita> = ({
  selectedUser,
  onClose,
}) => {

  const {historialMedico} = useHistorial({id:selectedUser.id})

  return (
    <Modal onClose={onClose} size={"8xl"} popup show={true} className="z-50">
      <Modal.Header />
      <Modal.Body className="flex flex-col items-center">
        <div>
          <p className="text-xl">
            Citas del paciente {selectedUser.nombre} {selectedUser.apellido}
          </p>
        </div>

        <HistorialTable
          data={historialMedico}
          filterPlaceholder={"Buscar historiales"}
          columns={columnsHistorial}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PopupVerHistorial;
