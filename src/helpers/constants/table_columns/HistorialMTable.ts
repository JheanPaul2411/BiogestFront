// HistorialMTable.tsx
import { HistorialMedico } from "@/helpers/models/HistorialMedico";
import { createColumnHelper } from "@tanstack/react-table";
import { parseDate } from "@/helpers/handlers/ParseDate";

const columnHelper = createColumnHelper<HistorialMedico[]>();

export const columnsHistorial = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("pacienteId", {
    header: "ID Paciente",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("peso", {
    header: "Peso",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("altura", {
    header: "Altura",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("presionArterial", {
    header: "Presión Arterial",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("temperatura", {
    header: "Temperatura",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("enfermedades", {
    header: "Enfermedades",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("alergias", {
    header: "Alergias",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("medicamentos", {
    header: "Medicamentos",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("antecedentesFamiliares", {
    header: "Antecedentes Familiares",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("antecedentesPersonales", {
    header: "Antecedentes Personales",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fecha", {
    header: "Fecha",
    cell: (info) => parseDate(info.getValue()), // Asume que formatDate convierte la fecha a un formato legible
  }),
  columnHelper.accessor("observaciones", {
    header: "Observaciones",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("diagnostico", {
    header: "Diagnóstico",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tratamiento", {
    header: "Tratamiento",
    cell: (info) => info.getValue(),
  }),

];