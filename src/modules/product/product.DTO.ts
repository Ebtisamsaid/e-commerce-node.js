import { Iimage } from "src/common/multer/cloud.service";
import { Iproductinput, sizeproduct } from "./product.interface";
import { Types } from "mongoose";
import { IsMongoId, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { QueryfilterDTO } from "src/common/dto/query.filter.dto";
import { Type } from "class-transformer";


export class CreateproductDTO  {
    @IsString()
    @IsOptional()
 color?:string[];

 @IsString()
 @IsOptional()
    size?:string[];

    @IsString()
    @MinLength(4)
    productName:string;
    @IsString()
    @MinLength(4)
    description:string;
    @IsNumber()
    @Type(()=>Number)
    stock:number;

    @IsNumber()
    @Type(()=>Number)

    originalprice:number
    @IsNumber()
    @Type(()=>Number)
    @IsOptional()
    discountprice?:number
    @IsMongoId()
    categoryId:Types.ObjectId;
    @IsMongoId()

    subcategoryId:Types.ObjectId;
    @IsMongoId()

    brandId:Types.ObjectId;
}

export class ProductIdDTO {
    @IsMongoId()
    productId:Types.ObjectId
}
export class UpdateproductDTO extends PartialType(CreateproductDTO){}
export class productQueryfilterDTO extends QueryfilterDTO{
    @IsString()
    @IsOptional()
    @MinLength(3)
    productName?:string
    @IsPositive()
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    minprice?:number

    @IsPositive()
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    maxprice?:number
}