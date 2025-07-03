
import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from 'class-validator';
import { Types, FilterQuery } from 'mongoose';
import { QueryfilterDTO } from 'src/common/dto/query.filter.dto';

export class CreateBrandDTO{
    @IsMongoId()
    categoryId:Types.ObjectId;


    @IsMongoId()
   subcategoryId:Types.ObjectId;
@IsString()
@IsNotEmpty()
@MinLength(2)
   brandName:string;


}

export class updatebrandDTO extends PartialType(CreateBrandDTO){
   @IsString()
@IsNotEmpty()
@MinLength(2)
   brandName?:string;
}


export class BrandIdDTO{
   @IsMongoId()
   brandId:Types.ObjectId; 
}




export class getAllQuery extends QueryfilterDTO{
   @IsString()
   @IsNotEmpty()
   @MinLength(2)
   @IsOptional()
   brandName?:string

}