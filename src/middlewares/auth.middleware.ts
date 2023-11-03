import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UserService } from "src/services/user/user.service";

export class AuthMiddleware implements NestMiddleware {
    
    constructor(private readonly userService: UserService){}
    
    async use(req: Request, res: Response, next: NextFunction)  {
        
        if (!req.headers.has("authorization")){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED );
        }

        next()
    }
}