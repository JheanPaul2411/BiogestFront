import { Usuario } from "./User";

export interface HistorialMedico {
    id: number;
    paciente?: Usuario;
    pacienteId?: number;
    peso?: number ;
    altura?: number;
    presionArterial?: string;
    temperatura?: number;
    enfermedades?: string;
    alergias?: string;
    medicamentos?: string;
    antecedentesFamiliares?: string;
    antecedentesPersonales?: string;
    fecha?: Date;
    observaciones?: string;
    diagnostico?: string;
    tratamiento?: string;
    proximaCita?: Date;
  }
