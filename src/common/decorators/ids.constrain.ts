import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Types } from "mongoose";

@ValidatorConstraint({ async: true })
export class CheckMongoDBids implements ValidatorConstraintInterface {
  validate(productsIds: Types.ObjectId[], args: ValidationArguments) {
    for (const id of productsIds) {
        if(!Types.ObjectId.isValid(id)){
        return false
    }
    return true    
    }return true
   
   
  
  }
 
}