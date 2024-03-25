import UsersTable from "../components/Common/Userstable";
import { columnsUser } from "../constants/table_columns/UsersTable";
import useUsers from "../hooks/useUser";
import Loading from "../components/Common/Loading";

export default function Usuarios() {
  const { users, loading } = useUsers();

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center">
    <UsersTable
        data={users}
        columns={columnsUser}
        filterPlaceholder={"Buscar usuarios"}
      />
    </main>
  );
}
