import { UserRole } from "@/helpers/constants/UserRole";
import UserContext from "@/helpers/context/UserPrivider";
import { useContext } from "react";
import "../index.css";
import useHistorial from "@/helpers/hooks/useHistorial";
import HistorialTable from "@/components/Common/HistorialTable";
import { columnsHistorial } from "@/helpers/constants/table_columns/HistorialMTable";
// import { Navigate } from "react-router-dom";

function PageHistorialMedico() {
  const { user } = useContext(UserContext);
  const { historialMedico } = useHistorial({ id: user?.id });


  return (
    <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center">
      {user?.rol === UserRole.PACIENTE && (
        <>
          <h1 className="text-center">
            Historial médico de {user.nombre} {user.apellido}
          </h1>

          {historialMedico.length===0 ? (
            <h2 className="text-center mt-10 text-gray-700">
              Aún no cuentas con un historial médico
            </h2>
          ) : (
            <HistorialTable
              data={historialMedico}
              columns={columnsHistorial}
              filterPlaceholder={"Buscar"}
            />
          )}
        </>
      )}
      {/* {user?.rol !== UserRole.PACIENTE && <Navigate to={"/"} />} */}
    </main>
  );
}

export default PageHistorialMedico;
