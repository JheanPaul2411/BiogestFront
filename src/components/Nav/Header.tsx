import { useLocation } from "react-router-dom";
import { handleLogout } from "../../handlers/HandleLogout";
import Logo from "./Logo-biogest.png";
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Flowbite,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import { useContext, useEffect, useState } from "react";
import validateToken from "../../handlers/ValidateToken";
import UserContext from "../../context/UserPrivider";
import { getUserByToken } from "../../handlers/GetUserById";

function NavBar() {
    const { pathname } = useLocation();
    const token = sessionStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, setUser } = useContext(UserContext); // Aquí obtenemos el objeto de contexto



    useEffect(() => {
        async function fetchData() {
            try {
                const isTokenValid = await validateToken(token);
                setIsLoggedIn(isTokenValid);

                if (isTokenValid) {
                    const userData = await getUserByToken(token ?? '');
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (token) {
            fetchData();
        }
        console.log("Is logged in", isLoggedIn)
    }, [token, isLoggedIn, setUser]);

    return (
        <Flowbite>

            <Navbar fluid rounded>
                <NavbarBrand>
                    <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                </NavbarBrand>
                <div className="flex md:order-2">

                    {isLoggedIn ? (
                        <>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar rounded />
                                }
                            >

                                <DropdownHeader>
                                    <span className="block text-sm">{user?.data.nombre}</span>
                                    <span className="block truncate text-sm font-medium">{user?.data.email}</span>
                                </DropdownHeader>
                                <DropdownItem></DropdownItem>
                                <DropdownItem>Mi perfil</DropdownItem>


                                <DropdownItem href="/historial_medico">Mi historial médico</DropdownItem>
                                <DropdownDivider />
                                <DropdownItem onClick={handleLogout}>Cerrar sesión</DropdownItem>
                            </Dropdown>
                            <NavbarToggle />
                        </>
                    ) : (
                        <>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar rounded />
                                }
                            >


                                <DropdownItem href="/login">Iniciar sesión</DropdownItem>
                                <DropdownItem href="/register">Registrarse</DropdownItem>

                            </Dropdown>
                            <NavbarToggle />
                        </>
                    )}

                </div>

                <NavbarCollapse>
                    <NavbarLink href="/" active={(pathname === '/')} color="purple">
                        Inicio
                    </NavbarLink>
                    <NavbarLink href="/agendar_cita" active={(pathname === '/agendar_cita')} color="purple">Agendar Cita</NavbarLink>
                    <NavbarLink href="/historial_medico" active={(pathname === '/historial_medico')} color="purple">Historial médico</NavbarLink>
                </NavbarCollapse>

            </Navbar>

        </Flowbite>
    );
}

export default NavBar