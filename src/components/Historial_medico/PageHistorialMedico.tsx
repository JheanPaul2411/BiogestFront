import { useContext } from 'react'
import '../../index.css'
import CardUsuarios from './admin/CardUsuarios'
import UserContext from '../../context/UserPrivider'
import { UserRole } from '../../constants/UserRole';

function PageHistorialMedico() {
    const { user } = useContext(UserContext);

    return (
        <main className="mt-10 min-w-screen min-h-[100%] flex flex-col items-center">
            {user?.rol === UserRole.ADMIN &&
                <>
                    <h1>Usuarios</h1>
                    <CardUsuarios />

                </>
            }
        </main>
    )
}

export default PageHistorialMedico