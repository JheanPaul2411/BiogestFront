import { Button, Dropdown, Label, Modal } from "flowbite-react";
import "../../../index.css";

import { Usuario } from "../../../helpers/models/User";
import { useState } from "react";
import ConfirmarCambioRol from "./ConfirmarCambioRol";
import { UserRole } from "../../../helpers/constants/UserRole";

interface PorpsPopup {
  selectedUser: Usuario;
  onClose: () => void;
}

export default function PopupDetallesUsuario({
  selectedUser,
  onClose,
}: PorpsPopup) {
  const [showNewRolPopup, setShowNewRolPopup] = useState(false);
  const [newRole, setnewRole] = useState("");

  const handleRoleChange = (role: string) => {
    setnewRole(role);
  };

  return (
    <Modal
      aria-modal={"true"}
      onClose={onClose}
      size={"lg"}
      popup
      show={true}
      className="z-40"
    >
      <Modal.Header />
      <Modal.Body className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl">
            Usuario {selectedUser.nombre} {selectedUser.apellido}
          </p>
          <div className="flex items-center justify-center my-5 gap-5">
            <span>Asignar un nuevo rol:</span>
            <Dropdown label="Roles" color="indigo">
              <Dropdown.Item
                onClick={() => handleRoleChange(UserRole.ADMIN)}
                className="dark:bg-zinc-700"
              >
                {UserRole.ADMIN}
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:bg-zinc-700"
                onClick={() => handleRoleChange(UserRole.PACIENTE)}
              >
                {UserRole.PACIENTE}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleRoleChange(UserRole.DOCTOR)}
                className="dark:bg-zinc-700"
              >
                {UserRole.DOCTOR}
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="flex m-5 gap-5 items-center justify-center">
          {newRole && (
            <p>
              Rol seleccionado{" "}
              <Label className="text-blue-700 dark:text-blue-500">
                {newRole}
              </Label>{" "}
            </p>
          )}
          <Button color="indigo" onClick={() => setShowNewRolPopup(true)}>
            Asignar nuevo rol
          </Button>
        </div>
      </Modal.Body>
      {showNewRolPopup && newRole && (
        <ConfirmarCambioRol
          selectedUser={selectedUser}
          onClose={() => setShowNewRolPopup(false)}
          newRole={newRole}
        />
      )}
    </Modal>
  );
}
