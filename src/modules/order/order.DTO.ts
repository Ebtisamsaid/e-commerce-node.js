import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";
import { paymentMethod } from "./order.interface";
import { Types } from "mongoose";

export class CreateOrderDTO{
@IsString()
    address:string;
    @IsString()

    phone:string;
    @IsString()
@IsOptional()
    note?:string;
    @IsEnum(paymentMethod)
    @IsString()

    paymentMethod:paymentMethod
    @IsString()

    couponCode?:string

}

export class OrderIdDTO{

    @IsMongoId()
    orderId:Types.ObjectId
}