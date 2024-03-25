import { NavbarCollapse, NavbarLink } from "flowbite-react";
import { UserRole } from "../../constants/UserRole";
import { useLocation } from "react-router-dom";

interface Props {
  role: string;
}

export default function NavItemsByRole({ role }: Props) {
  const { pathname } = useLocation();
  return (
    <>
      {role === UserRole.ADMIN && (
        <NavbarCollapse>
          <NavbarLink href="/" active={pathname === "/"}>
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
          >
            Agendar Cita
          </NavbarLink>
          <NavbarLink href="/usuarios" active={pathname === "/usuarios"}>
            Usuarios
          </NavbarLink>
        </NavbarCollapse>
      )}

      {role === UserRole.DOCTOR && (
        <NavbarCollapse>
          <NavbarLink href="/" active={pathname === "/"}>
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
          >
            Agendar Cita
          </NavbarLink>
          <NavbarLink href="/pacientes" active={pathname === "/pacientes"}>
            Pacientes
          </NavbarLink>
        </NavbarCollapse>
      )}

      {role === UserRole.PACIENTE && (
        <NavbarCollapse>
          <NavbarLink href="/" active={pathname === "/"}>
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
          >
            Agendar Cita
          </NavbarLink>
          <NavbarLink
            href="/historial_medico"
            active={pathname === "/historial_medico"}
          >
            Mi historial médico
          </NavbarLink>
        </NavbarCollapse>
      )}
    </>
  );
}
