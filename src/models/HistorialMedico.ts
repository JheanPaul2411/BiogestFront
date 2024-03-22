import { User } from "../components/AgendarCita/dto/Login.dto";

export interface HistorialMedico {
    id:number;
    peso?: number;
    altura?: number;
    presionArterial?: string;
    temperatura?: number;
    enfermedades?: string;
    alergias?: string;
    medicamentos?: string;
    antecedentesFamiliares?: string;
    antecedentesPersonales?: string;
    fecha?: Date;
    hora?: Date;
    paciente:User;
    observaciones?: string;
    diagnostico?: string;
    tratamiento?: string;
    proximaCita?: Date;
    proximaCitaHora?: Date;
}
