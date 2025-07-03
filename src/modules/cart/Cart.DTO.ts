import { Type } from "class-transformer";
import { isMongoId, IsMongoId, IsNumber, Validate } from "class-validator";
import { Types } from "mongoose";
import { CheckMongoDBids } from "src/common/decorators/ids.constrain";

export class AddtoCartDTO{
    @IsMongoId()
    productId:Types.ObjectId
    @IsNumber()
    quantity:number

}

export class ProductidsDTO{
  @Validate(CheckMongoDBids)
  @Type(()=>Types.ObjectId)
    productsIds:Types.ObjectId[]
}
export class CartIdDTO{
    @IsMongoId()
    idCart:Types.ObjectId
}