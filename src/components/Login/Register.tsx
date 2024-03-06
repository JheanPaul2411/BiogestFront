import { Link } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import { registerUser } from '../../handlers/HandleRegister';
import { ApiResponse } from '../AgendarCita/dto/Login.dto';
import { loginUser } from '../../handlers/HandlerLogin';
import { Button, Label, TextInput } from 'flowbite-react';
import { useAuth } from '../../context/AuthProvider';


function Register() {
    const {login} = useAuth();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cedula, setCedula] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [contacto, setContacto] = useState('');



    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const data: ApiResponse = await registerUser({
                nombre, apellido,
                cedula,
                email,
                password,
                fecha_nacimiento,
                contacto,
            });


            const loggeo: ApiResponse = await loginUser({ email, password });
            if (loggeo) {
                login();
                alert('Te has registrado correctamente.')
                localStorage.setItem('token', loggeo.token);
            }
            console.log("Data:", data);

        } catch (error) {
            console.error("Error al Registrarse:", error);
        } finally {
            console.log(email, password);
        }

    };


    return (
        <section id='container_login'>
            <section id="image-side" className="w-auto h-auto flex flex-col items-center justify-center">
                <h1 className='text-white text-3xl text text-center'>Somos lo mejor en calidad</h1>
                <span>Inicia sesión para acceder a todas nuestras funcionalidades</span>
            </section>

            <form id="form_login" onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Nombres" required onChange={e => setNombre(e.target.value)} />
                <TextInput type="text" placeholder="Apellidos" required onChange={e => setApellido(e.target.value)} />
                <TextInput type="text" placeholder="Cedula" required maxLength={10} onChange={e => setCedula(e.target.value)} />
                <TextInput type="text" placeholder="Número de conatcto" required maxLength={10} onChange={e => setContacto(e.target.value)} />
                <TextInput type="email" placeholder="Correo electrónico" required onChange={e => setEmail(e.target.value)} />
                <TextInput type="password" placeholder="Contraseña" required onChange={e => setPassword(e.target.value)} />
                <Label className='font-normal'>Fecha de nacimiento</Label>
                <TextInput type='date' placeholder='aaaa-mm-dd' value={fecha_nacimiento} onChange={e => setFechaNacimiento(e.target.value)} required />
                <Button type='submit' color='purple' className='mt-2'>
                    Registrarse
                </Button>
                <a href="" className="text-center dark:text-gray-300">¿Ya tienes una cuenta? <Link className='font-bold text-purple-500' to={'/login'}>Inicia sesión</Link></a>
            </form>

        </section>
    );
}

export default Register;