export interface Cita {
    id: number;
    fecha: string;
    hora: Date;
    pacienteId?: number;
    motivo: string;
    sintomas?: string;
  }