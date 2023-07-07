export interface JwtResponse{
    dataLogin : {
        nombre: string;
        email: string;
        accesstoken: string;
        expire: number;
    }
}