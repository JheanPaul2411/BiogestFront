import { createColumnHelper } from "@tanstack/react-table";
import { Usuario } from "../../models/User";
import { parseDate } from "../../handlers/ParseDate";

const columnHelper = createColumnHelper<Usuario>();

    export const columnsUser = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellido', {
            header: 'Apellido',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cedula', {
            header: 'Cédula',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('fecha_nacimiento', {
            header: 'Fecha de Nacimiento',
            cell: info => parseDate(info.getValue()),

        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('contacto', {
            header: 'Contacto',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('rol',{
            header:'Rol',
            cell:info=>info.getValue()
        })
    ];


    export const columnsUserWithoutRol = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellido', {
            header: 'Apellido',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cedula', {
            header: 'Cédula',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('fecha_nacimiento', {
            header: 'Fecha de Nacimiento',
            cell: info => parseDate(info.getValue()),

        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('contacto', {
            header: 'Contacto',
            cell: info => info.getValue(),
        }),
    ];