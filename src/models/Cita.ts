import { Paciente } from "./Paciente";

export interface Cita {
  id?: number;
  fecha: Date;
  hora?: Date;
  paciente: Paciente;
  motivo: string;
  minutos?: number;
  sintomas?: string;
  aceptada:boolean;
}
