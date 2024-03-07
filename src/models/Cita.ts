import { UserRole } from "../constants/UserRole";

export interface Cita {
  id?: number;
  fecha: Date;
  hora?: Date;
  paciente: {
    id: number
    nombre: string,
    apellido: string,
    cedula: string,
    fecha_nacimiento: Date,
    email: string,
    contacto: string,
    rol: UserRole
  };
  motivo: string;
  minutos?: number;
  sintomas?: string;
  aceptada:boolean;
}
