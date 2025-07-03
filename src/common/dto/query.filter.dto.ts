import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class QueryfilterDTO{
    @IsString()
    @IsOptional()
    @MinLength(2)
    select?:string;
    @IsString()
    @IsOptional()
    @MinLength(2)
    sort?:string;
    @IsPositive()
    @IsOptional()
        @IsNumber()
        @Type(()=>Number)
    
    page?:number;
  

}

export interface Ipaginate<t>{
    itemsperPage:number,
    items:number,
    pages:number,
    data:t[]|[],
    currentPage:number

}