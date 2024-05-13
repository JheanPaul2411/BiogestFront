import { UserRole } from "@/helpers/constants/UserRole";
import { NavbarCollapse, NavbarLink } from "flowbite-react";
import { useLocation } from "react-router-dom";

interface Props {
  role: string | undefined;
}

export default function NavItemsByRole({ role }: Props) {
  const { pathname } = useLocation();
  return (
    <>
      {role === UserRole.ADMIN && (
        <NavbarCollapse>
          <NavbarLink
            href="/"
            active={pathname === "/"}
            aria-label="Inicio"
            role="link"
          >
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
            aria-label="Citas pendientes"
            role="link"
          >
            Citas pendientes
          </NavbarLink>

          <NavbarLink
            href="/agenda"
            active={pathname === "/agenda"}
            aria-label="Agenda"
            role="link"
          >
            Agenda
          </NavbarLink>

          <NavbarLink
            href="/usuarios"
            active={pathname === "/usuarios"}
            aria-label="Usuarios"
            role="link"
          >
            Usuarios
          </NavbarLink>
        </NavbarCollapse>
      )}
      {role === UserRole.DOCTOR && (
        <NavbarCollapse>
          <NavbarLink href="/" active={pathname === "/"} aria-label="Inicio">
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
            aria-label="Agendar cita"
            role="link"
          >
            Agendar Cita
          </NavbarLink>

          <NavbarLink
            href="/agenda"
            active={pathname === "/agenda"}
            aria-label="Agenda"
            role="link"
          >
            Agenda
          </NavbarLink>

          <NavbarLink
            href="/usuarios"
            active={pathname === "/usuarios"}
            aria-label="usuarios"
            role="link"
          >
            Usuarios
          </NavbarLink>
        </NavbarCollapse>
      )}
      {role === UserRole.PACIENTE && (
        <NavbarCollapse>
          <NavbarLink href="/" active={pathname === "/"} aria-label="Inicio">
            Inicio
          </NavbarLink>
          <NavbarLink
            href="/agendar_cita"
            active={pathname === "/agendar_cita"}
            aria-label="Agendar cita"
            role="link"
          >
            Agendar Cita
          </NavbarLink>
          <NavbarLink
            href="/historial_medico"
            active={pathname === "/historial_medico"}
            aria-label="Mi historial médico"
            role="link"
          >
            Mi historial médico
          </NavbarLink>
        </NavbarCollapse>
      )}
    </>
  );
}
