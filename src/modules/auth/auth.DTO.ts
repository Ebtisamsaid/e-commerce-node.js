import { BadRequestException } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, validate, Validate, ValidateIf } from "class-validator";
import { Ismatchpass, Matchpasswordconstraint } from "src/common/decorators/matchpass.decorator";

export class signupDTO{
   @IsString()
   @IsNotEmpty()
   @MinLength(4)
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;
    @IsString()
    @IsNotEmpty()
    @Matches(/^.{6}$/)
    password:string;
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsString()
    phone:string;
    @IsString()
    @IsNotEmpty()
  //  @Matches(/^.{6}$/)
   @Ismatchpass("password",{message:"pass not matches"})
    @ValidateIf((o:signupDTO)=>{ return o.password? true:false})
   // @Validate(Matchpasswordconstraint)
    // @ValidateIf((o:signupDTO)=>{ if(o.password !=o.confirmPassword){throw new BadRequestException("pass not match")}return true})

    confirmPassword:string
}
export class loginDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}

export class verifyDTO{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
@IsNotEmpty()
@IsString()
    otp:string;
}
export class changepassDTo{
    @IsNotEmpty()
    @IsString()
    oldPassword:string;
    @IsNotEmpty()
    @IsString()
    newPassword:string;
}
export class SendFogetpassDTO{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
  
}
export class ForgetPassowrdDTO{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty()
    @Ismatchpass("password",{message:"pass not matches"})

    confirmPassword:string
}