import { CanActivate, ConflictException, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TUser, User } from 'src/DB/models/user/user.model';
import { TokenService } from '../service/token/token.service';
import { Userrepository } from 'src/DB/models/user/user.repository';
export interface IAuth extends Request{
  user:TUser
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private readonly tokenservice:TokenService,
                private readonly userrepo:Userrepository
  ){}
   async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> 
   {

const request :IAuth=context.switchToHttp().getRequest()
const {authorization}=request.headers

if (!authorization ) {
  throw new ConflictException("invalid token")
  
}
if (!authorization.startsWith("Bearer")) {
  throw new UnauthorizedException("invalid bearer token")
  
}
const Token=authorization.split(" ")[1]
 const payload= await this.tokenservice.verfiy(Token,{secret:process.env.jwt_secret})
 
 
//  check user exist
const user= await this.userrepo.findOne({_id:payload.payload})

if(!user){
  throw new NotFoundException(" user is not found")

}
if(user.changecredentialAt?.getTime()/1000 > payload.iat){
  throw new NotFoundException("  token expire plz login again")

}
request.user=user


    return true;
  }
}
