import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user/login.user.dto";
import { ApiRes } from "src/misc/api.response.class";
import { UserService } from "src/services/user/user.service";
import * as crypto from 'crypto'
import { LoginInfoUserDto } from "src/dtos/user/login.info.user.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataUserDto } from "src/dtos/user/jwt.data.user.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";

@Controller('auth')
export class AuthController {
    constructor(public userService: UserService) {}


    @Post('login')
    async doLogin(@Body() data: LoginUserDto, @Req() req: Request){
        const admin = await this.userService.getAdmin(data.username)

        if(!admin){ 
            return new Promise(resolve => resolve(new ApiRes('error', -3006, "Nepostoji admin")))
        }

        const passwordHash = crypto.createHash('sha512')
        passwordHash.update(data.password)
        const passwordHashString = passwordHash.digest('hex').toUpperCase()

        if(admin.passwordHash !== passwordHashString){
            return new Promise(resolve => resolve(new ApiRes('error', -3007, "Pogresna sifra")))
        }
         
        
        const jwtData = new JwtDataUserDto();
        jwtData.userId = admin.userId
        jwtData.username = admin.username

        let sada = new Date();
        sada.setDate(sada.getDate()+ 14);
        const istekTimestamp = sada.getTime() / 1000
        jwtData.exp = istekTimestamp

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign({...jwtData}, jwtSecret);

        const responseObject = new LoginInfoUserDto(
            admin.userId,
            admin.username,
            token
        )
            return new Promise(resolve => resolve(responseObject))



                
    }

    @Put ('user/register')
    async userRegister(@Body() data: UserRegistrationDto){
        return await this.userService.register(data)
    }

}