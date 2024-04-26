import { UserRole } from "@/helpers/constants/UserRole";
import { useAuth } from "@/helpers/context/AuthProvider";
import UserContext from "@/helpers/context/UserPrivider";
import { getUserByToken } from "@/helpers/handlers/GetUserById";
import { handleLogout } from "@/helpers/handlers/HandleLogout";
import validateToken from "@/helpers/handlers/ValidateToken";
import {
  Flowbite,
  Navbar,
  NavbarBrand,
  DarkThemeToggle,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavItemsByRole from "./NavItems";

function NavBar() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(UserContext);
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const isTokenValid = await validateToken(token);
        login();

        if (isTokenValid) {
          const userData = await getUserByToken(token ?? "");
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (token) {
      fetchData();
    }
    console.log("Is logged in", isLoggedIn);
  }, [isLoggedIn, login, setUser, token]);

  return (
    <Flowbite>
      <nav aria-label="Barra de navegación principal">
        <Navbar fluid rounded>
          <NavbarBrand className="flex items-center justify-center">
            <span
              className="mr-3 h-fit font-semibold text-purple-700 dark:text-purple-300"
              aria-label="BioGest"
            >
              BioGest
            </span>
            <DarkThemeToggle aria-label="Alternar modo oscuro" />
          </NavbarBrand>
          <div className="flex md:order-2">
            {/* {Modifica el contenido del dropdown de la imagen de usuario segun si esta loggeado o no} */}
            {isLoggedIn ? (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    user?.photoUrl ? (
                      <Avatar
                        role="button"
                        aria-label="Foto de perfil del usuario"
                        img={`${user?.photoUrl}`}
                        rounded
                        alt={`Avatar de ${user?.nombre}`}
                      />
                    ) : (
                      <Avatar
                        rounded
                        alt="Avatar genérico"
                        role="button"
                        aria-label="Foto de perfil del usuario"
                      />
                    )
                  }
                  className="z-[500]"
                  aria-label="Menú de usuario"
                  tabIndex={0}
                >
                  <DropdownHeader>
                    <span className="block text-sm">{user?.nombre}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                    {user?.rol !== UserRole.PACIENTE && (
                      <span className="block truncate text-sm font-medium text-green-500">
                        {user?.rol?.toLowerCase()}
                      </span>
                    )}
                  </DropdownHeader>
                  <DropdownItem href="/perfil" tabIndex={0}>
                    Mi perfil
                  </DropdownItem>
                  <DropdownItem href="/historial_medico" tabIndex={0}>
                    Mi historial médico
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem
                    onClick={handleLogout}
                    aria-label="Cerrar sesión"
                    tabIndex={0}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </Dropdown>
                <NavbarToggle aria-label="Abrir menú de navegación" />
              </>
            ) : (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      rounded
                      img={user?.photoUrl}
                      alt="Avatar genérico"
                    />
                  }
                  aria-label="Menú de inicio de sesión"
                  tabIndex={0}
                >
                  <DropdownItem
                    href="/login"
                    aria-label="Iniciar sesión"
                    tabIndex={0}
                  >
                    Iniciar sesión
                  </DropdownItem>
                  <DropdownItem
                    href="/register"
                    aria-label="Registrarse"
                    tabIndex={0}
                  >
                    Registrarse
                  </DropdownItem>
                </Dropdown>
                <NavbarToggle aria-label="Abrir menú de navegación" />
              </>
            )}
          </div>

          {/* {Modifica los items de la barra de navegación y las rutas segun el rol del usuario} */}
          {isLoggedIn ? (
            <>
              <NavbarCollapse>
                <NavItemsByRole role={user?.rol} />
              </NavbarCollapse>
            </>
          ) : (
            <>
              <NavbarCollapse>
                <NavbarLink
                  href="/"
                  active={pathname === "/"}
                  aria-label="Inicio"
                  tabIndex={0}
                >
                  Inicio
                </NavbarLink>
              </NavbarCollapse>
            </>
          )}
        </Navbar>
      </nav>
    </Flowbite>
  );
}

export default NavBar;
