import { useLocation } from "react-router-dom";
import { handleLogout } from "../../handlers/HandleLogout";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DarkThemeToggle,
  Flowbite,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext, useEffect } from "react";
import validateToken from "../../handlers/ValidateToken";
import UserContext from "../../context/UserPrivider";
import { getUserByToken } from "../../handlers/GetUserById";
import { UserRole } from "../../constants/UserRole";
import { useAuth } from "../../context/AuthProvider";
import NavItemsByRole from "./NavItems";

function NavBar() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <Navbar fluid rounded>
        <NavbarBrand className="flex items-center justify-center">
          <span className="mr-3 h-fit font-semibold text-purple-700 dark:text-purple-500">
            BioGest
          </span>
          <DarkThemeToggle />
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
                    <Avatar img={`${user?.photoUrl}`} rounded />
                  ) : (
                    <Avatar rounded />
                  )
                }
                className="z-[500]"
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
                <DropdownItem>Mi perfil</DropdownItem>

                <DropdownItem href="/historial_medico">
                  Mi historial médico
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={handleLogout}>
                  Cerrar sesión
                </DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </>
          ) : (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar rounded img={user?.photoUrl} />}
              >
                <DropdownItem href="/login">Iniciar sesión</DropdownItem>
                <DropdownItem href="/register">Registrarse</DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </>
          )}
        </div>

        {/* {Modifica los items de la barra de navegación y las rutas segun el rol del usuario} */}
        {isLoggedIn ? (
          <>
            <NavItemsByRole role={user?.rol!} />
          </>
        ) : (
          <>
            <NavbarCollapse>
              <NavbarLink href="/" active={pathname === "/"}>
                Inicio
              </NavbarLink>
            </NavbarCollapse>
          </>
        )}
      </Navbar>
    </Flowbite>
  );
}

export default NavBar;
