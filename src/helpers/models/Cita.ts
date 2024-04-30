import { User } from "@/components/AgendarCita/dto/Login.dto";

export interface Cita {
  id?: number;
  fecha: Date;
  pacienteId:number;
  paciente: User;
  motivo: string;
  minutos?: number;
  sintomas?: string;
  aceptada:boolean;
  apellido?: string;
  nombre?: string;
  photoUrl?: string | undefined;
}
