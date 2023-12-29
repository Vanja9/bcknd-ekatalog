import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { Observable } from 'rxjs'
import { Request } from 'express'
import { Reflector } from "@nestjs/core";

@Injectable()
export class IsAdminCheckerGuard implements CanActivate{
    constructor(private reflector: Reflector) {}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const isAdmin = req.token.isAdmin;

        
        const allowedToRoles = this.reflector.get<("user" | "admin")[]>('allow_to_roles', context.getHandler() )

        if(!allowedToRoles.includes(isAdmin? "admin" : "user")){ 
            return
        }
        return true


    }
}