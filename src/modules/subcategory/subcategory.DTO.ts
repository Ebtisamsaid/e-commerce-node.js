import { PartialType } from "@nestjs/mapped-types";
import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";

export class createSubCategoryDTO{
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    subcategoryName:string

    @IsMongoId()
    categoryId:Types.ObjectId

}
export class updatesubcategoryDTo extends PartialType(createSubCategoryDTO){}
export class subcategoryIdDTO{
@IsMongoId()
    subcategoryId:Types.ObjectId
}