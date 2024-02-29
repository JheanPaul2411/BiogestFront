export interface Cita {
    id: number;
    fecha: Date;
    hora: Date;
    pacienteId?: number;
    motivo: string;
    sintomas?: string;
  }