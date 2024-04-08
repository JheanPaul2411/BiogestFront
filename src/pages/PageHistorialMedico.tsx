import { UserRole } from "@/helpers/constants/UserRole";
import UserContext from "@/helpers/context/UserPrivider";
import { useContext, useEffect } from "react";
import "../index.css";
import useHistorial from "@/helpers/hooks/useHistorial";

function PageHistorialMedico() {
  const { user } = useContext(UserContext);
  const { historialMedico } = useHistorial({ id: user?.id });

  useEffect(() => {
    console.log(historialMedico);
  }, []);

  return (
    <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center">
      {user?.rol === UserRole.PACIENTE && (
        <>
          <h1>
            Historial médico de {user.nombre} {user.apellido}
          </h1>
        </>
      )}
    </main>
  );
}

export default PageHistorialMedico;
