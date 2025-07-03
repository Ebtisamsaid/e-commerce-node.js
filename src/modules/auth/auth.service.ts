import { ConflictException, NotFoundException, Body } from '@nestjs/common';
import { TokenService } from '../../common/service/token/token.service';
import  * as randomstring from 'randomstring';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TUser } from 'src/DB/models/user/user.model';
import { Userrepository } from 'src/DB/models/user/user.repository';
import { changepassDTo, ForgetPassowrdDTO, loginDTO, SendFogetpassDTO, verifyDTO } from './auth.DTO';
import { sendMail } from 'src/common/email/sendemail';
import { htmltemplate } from 'src/common/email/html';
import { compare, hash } from 'src/common/security/hash.pass';
import { IAuth } from 'src/common/Guard/auth.guard.guard';
import { Certificate } from 'crypto';

@Injectable()
export class AuthService {
constructor(private readonly userRepo:Userrepository
    ,private readonly TokenService:TokenService
){}
async createAcount(data:Partial<TUser>){
    const{email,password,firstName,lastName}=data
    // check user
 const user=   await this.userRepo.findbyEmail(email as string)
 if(user){
    throw new BadRequestException("user is already exist")
}
// generate otp
const otp= randomstring.generate(4)
console.log(otp);

await sendMail({
    to:email,
    from:process.env.app_mail,
    subject:"your confirm email",
    html:htmltemplate(otp)
})


     return await this.userRepo.create({...data,OTP:otp,OTPexpireAt:new Date(Date.now() + 3600*1000) })

}
async login(body:loginDTO){
    const{email,password}=body
    // check user
    const user = await this.userRepo.findOne({email,isConfirm:true})
    if(!user){
        throw new NotFoundException("user not found or not confirm")
    }
    // check pass
    if (!compare(password,user.password)) {
        throw new NotFoundException("invalid password")
    }
    const access_token= this.TokenService.sign({payload:user._id},{secret:process.env.jwt_secret,expiresIn:"3h"})
    const refresh_token= this.TokenService.sign({payload:user._id},{secret:process.env.jwt_secret,expiresIn:"1d"})
return {access_token,refresh_token}
}


 async verify(body:verifyDTO){
    const{email,otp}=body
    // check email
    const user=await this.userRepo.findOne({email,isConfirm:false})
    if(!user){
        throw new NotFoundException("user is not exist")
    }
    if(user.OTP != otp){
        throw new ConflictException("invalid otp")
    }
    if(new Date().getTime() > user.OTPexpireAt!.getTime()){
throw new ConflictException("otp is expire")
    }
    user.isConfirm=true
    user.OTP=null
    user.OTPexpireAt=null
   
 await   user.save()
return user
}


async changepass(body:changepassDTo,Req:IAuth ){
    const{newPassword,oldPassword}=body
    if(newPassword == oldPassword){
        throw new ConflictException("new password is the same old password")
    }
const user=Req.user
console.log(user);

    
    // check old pass
    if(!compare(oldPassword,user.password)){
        throw new ConflictException("old pass is incorrect")
    }
   const  newPassHashed=await hash(newPassword)
    const newpass=await this.userRepo.update({_id:user._id},{password:newPassHashed,changecredentialAt:new Date(Date.now()/1000)})
    console.log(newpass);
    
    return newpass


}


async sendforgetpasswordOTP(body:SendFogetpassDTO){
    const{email}=body
    const user= await this.userRepo.findbyEmail(email)
    if(!user){
        throw new NotFoundException("user is not found")

    }
    const otp=randomstring.generate(4)
    sendMail({to:email,from:process.env.app_mail,subject:"confirm forget password OTP",html:htmltemplate(otp)})

this.userRepo.update({_id:user._id},{OTP:otp,OTPexpireAt:new Date(Date.now()+3600*1000)})
return
}

 async forgetPassowrd(body:ForgetPassowrdDTO){
const {email,password,confirmPassword}=body
const user=await this.userRepo.findbyEmail(email)
if(!user) throw new NotFoundException("user not found")
 return this.userRepo.update({_id:user._id},{password:hash(password)})
}
}
