export class LoginInfoUserDto{
    userId: number;
    username: string;
    token: string;

    constructor(id: number, username: string, jwt: string){
        this.userId = id;
        this.username = username;
        this.token = jwt;
    }
}