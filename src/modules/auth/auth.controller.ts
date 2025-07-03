import { Body, Controller, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { changepassDTo, ForgetPassowrdDTO, loginDTO, SendFogetpassDTO, signupDTO, verifyDTO } from './auth.DTO';
import { AuthGuard, IAuth } from 'src/common/Guard/auth.guard.guard';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/enums';
import { Auth } from 'src/common/decorators/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
 async signup(@Body(ValidationPipe) body:signupDTO){
    const createUSer=await this.authService.createAcount(body)
    return {message:"done",data:createUSer}

  }
@Post('login')
  async login(@Body() body:loginDTO){
    const {refresh_token, access_token}=await this.authService.login(body)
    return{message:"login sucessfully",access_token:access_token,refresh_token:refresh_token}


  }
@Patch('verify-otp')
verify(@Body() body:verifyDTO){
  this.authService.verify(body)
return{message:" OTP is confirm"}
}

// 7oty guard
@UseGuards(AuthGuard)
@Auth([UserRole.user])
@Patch('change-password')
 async changepass(@Body() body:changepassDTo ,@Req() Req:IAuth
 ){
  
  
 const user= await this.authService.changepass(body,Req)
  return{message:"change passweord done",success:true ,data:user}
}
@Patch('forgetPass-OTP')
sendforgetpasswordOTP(@Body() body:SendFogetpassDTO){
  this.authService.sendforgetpasswordOTP(body)
  return{message:"done",success:true}
}


@Patch('forget-password')
forgetPassowrd(@Body() body:ForgetPassowrdDTO){
  this.authService.forgetPassowrd(body)
return {message:"done",sucess:true}
}
}
