export default function getHoursParsed(date: string) {
    const fecha = new Date(date);
    const hora = fecha.getHours().toString().padStart(2, '0'); 
    // Obtiene la hora en formato de 24 horas y lo ajusta al formato "hh"
    
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
     // Obtiene los minutos y los ajusta al formato "mm"
    const horaFormateada = `${hora}:${minutos} h`;

    return horaFormateada;
}
