import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user/login.user.dto";
import { ApiRes } from "src/misc/api.response.class";
import { UserService } from "src/services/user/user.service";
import * as crypto from 'crypto'

@Controller('auth')
export class AuthController {
    constructor(public userService: UserService) {}


    @Post('login')
    async doLogin(@Body() data: LoginUserDto){
        const admin = await this.userService.getAdmin(data.username)

        if(!admin){ 
            return new Promise(resolve => resolve(new ApiRes('error', -3006, "Nepostoji admin")))
        }

        const passwordHash = crypto.createHash('sha512')
        passwordHash.update(data.password)
        const passwordHashString = passwordHash.digest('hex').toUpperCase()

        if(admin.passwordHash === passwordHashString){
            return new Promise(resolve => resolve(new ApiRes('error', -3007, "Pogresna sifra")))
        }
             
    }



}