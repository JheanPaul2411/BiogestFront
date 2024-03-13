import { useContext, useEffect, useState } from 'react'
import '../../index.css'
import UserContext from '../../context/UserPrivider'
import { UserRole } from '../../constants/UserRole';
import Table from '../Common/Userstable';
import { createColumnHelper } from '@tanstack/react-table';
import { User } from '../AgendarCita/dto/Login.dto';
import axios, { AxiosResponse } from 'axios';
import { headerBearer } from '../../constants/Headers';
import { handleErrors } from '../../handlers/HandleErrors';
import { baseUrl } from '../../constants/BaseURL';
import { parseDate } from '../../handlers/ParseDate';

function PageHistorialMedico() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);

    const columnHelper = createColumnHelper<User>();

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellido', {
            header: 'Apellido',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cedula', {
            header: 'Cédula',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('fecha_nacimiento', {
            header: 'Fecha de Nacimiento',
            cell: info => parseDate(info.getValue()),

        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('contacto', {
            header: 'Contacto',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('rol', {
            header: 'Rol',
            cell: info => info.getValue(),
        }),
    ];

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response: AxiosResponse<User[]> = await axios.get(`${baseUrl}/usuarios/rol/${UserRole.PACIENTE}`, {
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
                    <Table data={users} columns={columns} filterPlaceholder={'Busacr paciente'} />
                </>
            }
        </main>
    )
}

export default PageHistorialMedico