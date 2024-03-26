import { fechaConfig } from "../constants/FechaConfig";

export function parseDate(date: Date|string|undefined){
    if(date===undefined){
        return
    }
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
    {/* @ts-ignore */ }
    return new Date(date).toLocaleDateString("es-ES", fechaConfig)

}