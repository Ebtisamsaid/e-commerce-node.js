import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Min, min, MinLength, Validate, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { CheckMongoDBids } from "src/common/decorators/ids.constrain";
import {  couponType } from "src/DB/models/coupon/coupon.model";

export class CreatecouponDTO{

@IsString()
@MinLength(3)
    code:string
@IsEnum(couponType)
@IsString()
    type:string
@IsNumber()
        value:number;
   
        @IsNumber()
        @IsOptional()
      
        minPurchase?:number;

        @IsNumber()
        @IsOptional()
        @Min(1)
        usesPerCustomer?:number;
        @Validate(CheckMongoDBids)
        applyProducts?:[Types.ObjectId]

}
export class updatecouponDTO extends PartialType(CreatecouponDTO){}
export class CouponIdDTO{
    @IsMongoId()
    couponId:Types.ObjectId
}