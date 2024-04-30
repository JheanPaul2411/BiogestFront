import AllCitas from "@/components/AgendarCita/admin/AllCitas";
import CitaForm from "@/components/AgendarCita/CitaForm";
import { UserRole } from "@/helpers/constants/UserRole";
import JwtUtils from "@/helpers/constants/ValidateToke";
import { Navigate } from "react-router-dom";

function AgendarCita() {


  if(!JwtUtils.isTokenValid()){
    return <Navigate to={"/"}/>
  }

  return (
    <main
      id="CitasPage"
      className="flex flex-col items-center justify-center w-full min-h-full p-7"
    >
      {JwtUtils.getUserRole() === UserRole.PACIENTE ? (
        <>
          <section className="md:w-[80]">
            <h1 className="font-bold text-lg my-9 dark:text-white">
              Agendación de cita
            </h1>
            <p className="dark:text-gray-300 my-5">
              Cuando envíes una solicitud de cita a la doctora, ella podrá
              aceptar tu solicitud, o reagendarla para una nueva fecha, cercana
              a la que has proporiconado.
            </p>
            <CitaForm />
          </section>
        </>
      ) : (
        <>
          <h2 className="dark:text-white text-2xl my-5">Citas pendientes</h2>
          <AllCitas />
        </>
      )}
    </main>
  );
}

export default AgendarCita;
