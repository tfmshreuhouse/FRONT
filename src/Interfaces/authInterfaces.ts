export interface intUserInfo {
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    password?: string,
    perfil: string,
    status: number,
    createdAt: string,
    updatedAt: string
}

export interface intUserNew {
    nombres: string,
    apellidos: string,
    correo: string,
    password: string,
    perfil: string,
    status: number,
    createdAt?: string,
    updatedAt?: string
}