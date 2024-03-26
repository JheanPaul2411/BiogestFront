import UsersTable from "../components/Common/Userstable";

import Loading from "../components/Common/Loading";
import { columnsUser } from "../helpers/constants/table_columns/UsersTable";
import useUsers from "../helpers/hooks/useUser";

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
