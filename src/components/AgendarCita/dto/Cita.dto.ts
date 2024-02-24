
export interface CitaDTO {
  id?: number;
  fecha: Date;
  hora?: Date;
  pacienteId?: number;
  motivo: string;
  minutos?:number;
  sintomas?: string;
}

export interface GetCitaDTO {
    data:{
        id?: number;
        fecha: Date;
        hora: Date;
        pacienteId?: number;
        motivo: string;
        sintomas?: string; 
    }
}
