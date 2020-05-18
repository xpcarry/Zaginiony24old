export interface IUser {
    name:string;
    username: string;
    email: string;
    accessToken: string;
}

export interface IUserFormValues{
    email:string;
    username:string;
    password:string;
    name:string;
    surname:string;
    phoneNumber:string;
}