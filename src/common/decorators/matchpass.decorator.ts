import { registerDecorator, ValidationOptions } from 'class-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({name:"match_pass",async:false})
export class Matchpasswordconstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
  return  args.object["password"]==confirmPassword
    
}
defaultMessage(validationArguments?: ValidationArguments): string {
    return "mis match password"
}
}


export function Ismatchpass(mathwith: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({

      target: object.constructor,
      propertyName: propertyName,
      constraints: [mathwith],
      options: validationOptions,
      validator: Matchpasswordconstraint
      
    });
  };
}