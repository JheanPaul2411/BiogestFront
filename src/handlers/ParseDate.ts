import { fechaConfig } from "../constants/FechaConfig";

export function parseDate(date: Date|string): string{
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
    {/* @ts-ignore */ }
    return new Date(date).toLocaleDateString("es-ES", fechaConfig)

}