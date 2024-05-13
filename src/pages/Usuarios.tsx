import Loading from "@/components/Common/Loading";
import UsersTable from "@/components/Common/Userstable";
import { UserRole } from "@/helpers/constants/UserRole";
import JwtUtils from "@/helpers/constants/ValidateToke";
import { columnsUser } from "@/helpers/constants/table_columns/UsersTable";
import useUsers from "@/helpers/hooks/useUser";
import { Navigate } from "react-router-dom";


export default function Usuarios() {
  const { users, loading } = useUsers();

  if (loading) {
    return (
      <Loading/>
    );
  }

  if(!JwtUtils.isTokenValid() || JwtUtils.getUserRole() === UserRole.PACIENTE){
    return <Navigate to={"/"}/>
  }

  return (
    <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center justify-center">
    <UsersTable
        data={users}
        columns={columnsUser}
        filterPlaceholder={"Buscar usuarios"}
      />
    </main>
  );
}
