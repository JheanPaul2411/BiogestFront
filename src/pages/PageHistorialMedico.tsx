import { useContext} from 'react'
import '../index.css'
import PacientesTable from '../components/Common/PacientesTable';
import { columnsUser } from '../helpers/constants/table_columns/UsersTable';
import { UserRole } from '../helpers/constants/UserRole';
import UserContext from '../helpers/context/UserPrivider';
import useUsers from '../helpers/hooks/useUser';


function PageHistorialMedico() {
    const { user } = useContext(UserContext);
    const { users } = useUsers();

    
    return (
        <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center">
            {user?.rol !== UserRole.PACIENTE &&
                <>
                    <h1>Pacientes</h1>
                    <PacientesTable data={users} columns={columnsUser} filterPlaceholder={'Busacr paciente'} />
                </>
            }
        </main>
    )
}

export default PageHistorialMedico