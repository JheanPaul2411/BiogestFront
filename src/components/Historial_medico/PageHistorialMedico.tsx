import { useContext, useEffect, useState } from 'react'
import '../../index.css'
import UserContext from '../../context/UserPrivider'
import { UserRole } from '../../constants/UserRole';
import axios, { AxiosResponse } from 'axios';
import { headerBearer } from '../../constants/Headers';
import { handleErrors } from '../../handlers/HandleErrors';
import { baseUrl } from '../../constants/BaseURL';
import PacientesTable from '../Common/PacientesTable';
import { Usuario } from '../../models/User';
import { columnsUser } from '../../constants/table_columns/UsersTable';

function PageHistorialMedico() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<Usuario[]>([]);
    

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response: AxiosResponse<Usuario[]> = await axios.get(`${baseUrl}/usuarios/rol/${UserRole.PACIENTE}`, {
                    headers: headerBearer(),
                });
                setUsers(response.data);
            } catch (error) {
                handleErrors(error);
            }
        }
        fetchUsers();
    }, []);

    
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