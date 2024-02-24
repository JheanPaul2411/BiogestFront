import { Link } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import { loginUser } from '../../handlers/HandlerLogin';
import { ApiResponse } from '../AgendarCita/dto/Login.dto';
import { Button, TextInput } from 'flowbite-react';

function Login() {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const data: ApiResponse = await loginUser({ email, password });
            if (data) {
                alert(`Te has logueado correctamente, ${data.user.nombre} ${data.user.apellido}`);
            }
            console.log("Data:", data);

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        } finally {
            window.location.reload()
            console.log(email, password);
        }

    };

    return (
        <section id='container_login'>
            <section id="image-side" className="w-[60%] flex flex-col items-center justify-center">
                <h1 className='text-white text-3xl text text-center'>Somos lo mejor en calidad</h1>
                <span>Inicia sesión para acceder a todas nuestras funcionalidades</span>
            </section>

            <form id="form_login" onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} />
                <TextInput type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />


                <Button type='submit'>
                    Iniciar sesión
                </Button>

                <a href="" className='text-gray-300 text-center'>¿Aún no tienes una cuenta? <Link to={'/register'} className='font-bold text-blue-500'>Registrate</Link></a>
            </form>

        </section>
    );
}

export default Login;