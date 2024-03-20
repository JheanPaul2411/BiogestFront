import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { registerUser } from '../../handlers/HandleRegister';
import { ApiResponse, User } from '../AgendarCita/dto/Login.dto';
import { loginUser } from '../../handlers/HandlerLogin';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useAuth } from '../../context/AuthProvider';

function Register() {
    const { login } = useAuth();
    const [user, setUser] = useState<User>({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        cedula: '',
        fecha_nacimiento: '',
        contacto: '',
        photoUrl: null,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        console.log(user);
        try {
            const data: ApiResponse = await registerUser(user);
            const loggeo: ApiResponse = await loginUser({ email: user.email, password: user.password! });
            if (loggeo) {
                login();
                alert('Te has registrado correctamente.');
                localStorage.setItem('token', loggeo.token);
                window.location.href = '/';
            }
            console.log("Data:", data);
        } catch (error) {
            console.error("Error al Registrarse:", error);
        } finally {
            console.log(user.email, user.password);
        }
    };

    return (
        <section id='container_login'>
            <section id="image-side" className="w-auto h-auto flex flex-col items-center justify-center">
                <h1 className='text-white text-3xl text text-center'>Somos lo mejor en calidad</h1>
                <span>Inicia sesión para acceder a todas nuestras funcionalidades</span>
            </section>
            <form id="form_login" onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <Label className='text-gray-600 dark:text-gray-400'>Sube tu foto de perfil</Label>
                    <FileInput
                        accept="image/*"
                        onChange={(e) => setUser({ ...user, photoUrl: e.target.files?.[0] })}
                    />
                </div>
                <TextInput
                    type="text"
                    placeholder="Nombres"
                    required
                    value={user.nombre}
                    onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                />
                <TextInput
                    type="text"
                    placeholder="Apellidos"
                    required
                    value={user.apellido}
                    onChange={(e) => setUser({ ...user, apellido: e.target.value })}
                />
                <TextInput
                    type="text"
                    placeholder="Cedula"
                    required
                    maxLength={10}
                    value={user.cedula}
                    onChange={(e) => setUser({ ...user, cedula: e.target.value })}
                />
                <TextInput
                    type="text"
                    placeholder="Número de contacto"
                    required
                    maxLength={10}
                    value={user.contacto}
                    onChange={(e) => setUser({ ...user, contacto: e.target.value })}
                />
                <TextInput
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <TextInput
                    type="password"
                    placeholder="Contraseña"
                    required
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Label className='text-gray-600 dark:text-gray-400'>Fecha de nacimiento</Label>
                <TextInput
                    type='date'
                    placeholder='aaaa-mm-dd'
                    value={user.fecha_nacimiento}
                    onChange={(e) => setUser({ ...user, fecha_nacimiento: e.target.value })}
                    required
                />
                <Button type='submit' color='purple' className='mt-2'>
                    Registrarse
                </Button>
                <a href="" className="text-center dark:text-gray-300">
                    ¿Ya tienes una cuenta? <Link className='font-bold text-purple-500' to={'/login'}>Inicia sesión</Link>
                </a>
            </form>
        </section>
    );
}

export default Register;