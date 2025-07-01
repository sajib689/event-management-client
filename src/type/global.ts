/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TUser {
    name: string;
    email: string;
    img: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
    user: any;
}