import { UserRole } from "../constants/UserRole"

export interface Paciente{
    id:number;
    nombre: string
    apellido: string
    cedula: string
    fecha_nacimiento: Date
    email: string
    password: string
    contacto: string
    rol: UserRole //
}