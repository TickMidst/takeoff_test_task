export interface IAuthorizationData {
    email: string;
    password: string
}

export interface IContact {
    name: string;
    email: string;
    phone: string;
    website: string;
    id: number;
}

export interface IAuthorizedUserState {
    accessToken: string,
    user: {
        email: string,
        id: number
    }
}