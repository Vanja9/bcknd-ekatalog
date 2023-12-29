import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtDataUserDto } from "src/dtos/user/jwt.data.user.dto";
import { UserService } from "src/services/user/user.service";
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    
    constructor(private readonly userService: UserService){}
    
    async use(req: Request, res: Response, next: NextFunction)  {
        
        if (!req.headers.authorization){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED );
        }

        
        const token = req.headers.authorization.split(' ')[1];
        
        const jwtData: JwtDataUserDto = jwt.verify(token, jwtSecret) as JwtDataUserDto;

        if(!jwtData){
            throw new HttpException('Bad token', HttpStatus.UNAUTHORIZED );
        }
        if(jwtData.ip !== req.ip){
            throw new HttpException('Bad ip', HttpStatus.UNAUTHORIZED );
        }
    
        if(jwtData.ua !== req.headers['user-agent']){
            throw new HttpException('Bad ua', HttpStatus.UNAUTHORIZED );
        }

        if(jwtData.isAdmin) {   
            const admin = await this.userService.getAdmin(jwtData.username)
            if(!admin){
                throw new HttpException('Admin not found', HttpStatus.UNAUTHORIZED );
            }
        } else {
            const user = await this.userService.getById(jwtData.userId)
        }

        const trenutniTimeStamp = new Date().getTime() / 1000
        if(trenutniTimeStamp >= jwtData.exp){
            throw new HttpException('Token has expired ', HttpStatus.UNAUTHORIZED );
        }

        req.token = jwtData

        next()
    }
}