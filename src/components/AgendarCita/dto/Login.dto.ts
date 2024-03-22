export interface User {
    id?: number;
    nombre: string;
    apellido: string;
    cedula: string;
    fecha_nacimiento: string;
    email: string;
    contacto: string;
    password?: string;
    photoUrl?:File | null ;
    rol?: string;
}

export interface ApiResponse {
    user: User;
    token: string;
}