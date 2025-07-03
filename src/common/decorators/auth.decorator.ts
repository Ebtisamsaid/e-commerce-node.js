import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./role.decorator"
import { RoleGuard } from "../Guard/role.guard"
import { AuthGuard } from "../Guard/auth.guard.guard"
import { UserRole } from "../enums/enums"

export function Auth(roles:string[]){
    return applyDecorators(Roles(roles),UseGuards(AuthGuard,RoleGuard))

}