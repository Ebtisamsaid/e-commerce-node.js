import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, minLength } from "class-validator";
import { Types } from "mongoose";
import {PartialType} from "@nestjs/mapped-types"
import { QueryfilterDTO } from "src/common/dto/query.filter.dto";

export class createcategoryDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)

name:string


}

export class updateCategoryDTO extends PartialType(createcategoryDTO){}


export class CategoryparamDTO{
    @IsMongoId()
    categoryId:Types.ObjectId
}
export class CategoryQueryDTO extends QueryfilterDTO{
    @IsString()
    @IsOptional()
  name?:string
}
export class DeletecategoryDTO{
    @IsMongoId()
    categoryId:Types.ObjectId
}