import Loading from "@/components/Common/Loading";
import MisCitasList from "@/components/MisCitas/MisCitasList";
import { UserRole } from "@/helpers/constants/UserRole";
import UserContext from "@/helpers/context/UserPrivider";
import { useCitasByPaciente } from "@/helpers/hooks/useCitas";
import { useContext, useState, useEffect } from "react";

export default function MisCitas() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const { citas } = useCitasByPaciente({ id: user?.id || 0, aceptada:true}); // Utiliza el operador de encadenamiento opcional ?.
    
  useEffect(() => {
      if (user) {
          setIsLoading(false);
      if (user.rol !== UserRole.PACIENTE) {
        window.location.href = "/";
      }
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="p-5 md:p-10 lg:p-20">
      <h1>Mis citas</h1>
      <MisCitasList citas={citas} />
    </main>
  );
}
