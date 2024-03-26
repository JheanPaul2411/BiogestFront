import { createColumnHelper } from "@tanstack/react-table";
import { HistorialMedico } from "../../models/HistorialMedico";

const columnHelper = createColumnHelper<HistorialMedico>();

    export const  columnsHistorial= [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('alergias', {
            header: 'Alergias',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('altura', {
            header: 'Altura',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('antecedentesFamiliares', {
            header: 'Antecedentes familiares',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('antecedentesPersonales', {
            header: 'Antecedentes personales',
            cell: info => info.getValue(),

        }),
        columnHelper.accessor('diagnostico', {
            header: 'Diagnóstico',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('enfermedades', {
            header: 'Enfermedades',
            cell: info => info.getValue(),
        }),
    ];