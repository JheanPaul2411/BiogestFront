// UserProvider.js
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserByToken } from "../handlers/GetUserById";
import { Usuario } from "../models/User";

interface UserProviderProps {
  children: ReactNode; // La propiedad children debe ser de tipo ReactNode
}

const initialUser: Usuario | null = null; // Valor predeterminado para el contexto

const UserContext = createContext<{
  user: Usuario | null;
  setUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
}>({ user: initialUser, setUser: () => {} });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(initialUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token de localStorage o de donde lo almacenes
        if (token) {
          const userData: Usuario = await getUserByToken(token); // Obtener los datos del usuario usando el token
          setUser(userData); // Establecer el estado del usuario correctamente
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Manejar el error según sea necesario
      }
    };

    fetchUser();

    // Limpia el estado del usuario al desmontar el componente
    return () => setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
