import { Usuario } from "@/helpers/models/User";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import PopupAgregarHistorial from "./PopupAgregarHistorial";
import PopupVerHistorial from "./PopupVerHistorial";
import PopupDetallesUsuario from "../Usuarios/PopupDetalles";

interface PorpsPopup {
  selectedUser: Usuario;
  onClose: () => void;
}

const PopupDetallesTabla: React.FC<PorpsPopup> = ({
  selectedUser,
  onClose,
}) => {
  const [showPopupTabla, setshowPopupTabla] = useState(false);
  const [showPopupAgregarHistorial, setShowPopupAgregarHistorial] =
    useState(false);
  const [showChangeRolePopup, setshowChangeRolePopup] = useState(false);

  function handleShowHistorial() {
    setshowPopupTabla(true);
  }

  function handleAgregarHistorial() {
    setShowPopupAgregarHistorial(true);
  }

  function handleShowRolePopup() {
    setshowChangeRolePopup(true);
  }

  return (
    <Modal onClose={onClose} size={"lg"} popup show={true} className="z-40">
      <Modal.Header />
      <Modal.Body className="flex flex-col items-center">
        <div>
          <p className="text-2xl">
            Paciente {selectedUser.nombre} {selectedUser.apellido}
          </p>
        </div>

        <div className="flex m-5 gap-5">
          <Button color="indigo" onClick={handleShowHistorial}>
            Ver historial médico
          </Button>
          <Button color="indigo" onClick={handleAgregarHistorial}>
            Agregar ficha médica
          </Button>
          <Button color="indigo" onClick={handleShowRolePopup}>
            Cambiar rol
          </Button>
        </div>
      </Modal.Body>
      {showPopupTabla && selectedUser && (
        <PopupVerHistorial
          onClose={() => setshowPopupTabla(false)}
          selectedUser={selectedUser}
        />
      )}

      {showPopupAgregarHistorial && (
        <PopupAgregarHistorial
          onClose={() => setShowPopupAgregarHistorial(false)}
          selectedUser={selectedUser}
        />
      )}

      {showChangeRolePopup && selectedUser && (
        <PopupDetallesUsuario
          selectedUser={selectedUser}
          onClose={() => setshowChangeRolePopup(false)}
        ></PopupDetallesUsuario>
      )}
    </Modal>
  );
};

export default PopupDetallesTabla;
