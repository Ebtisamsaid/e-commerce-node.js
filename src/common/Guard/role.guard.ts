import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/role.decorator";
import { IAuth } from "./auth.guard.guard";
@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
   canActivate (context:ExecutionContext):boolean{
    const requiredRoles=    this.reflector.getAllAndOverride(Roles,[context.getHandler(),context.getClass()])
        const request:IAuth=context.switchToHttp().getRequest()
        if(!requiredRoles?.includes(request.user.role)){
           throw new ForbiddenException("not allowed")
        }
return true
    }
}