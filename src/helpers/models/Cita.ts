import { User } from "../components/AgendarCita/dto/Login.dto";

export interface Cita {
  id?: number;
  fecha: Date;
  hora?: Date;
  paciente: User;
  motivo: string;
  minutos?: number;
  sintomas?: string;
  aceptada:boolean;
}
