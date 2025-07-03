
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UserRole } from 'src/common/enums/enums';
import { dencrypted, encrypted } from 'src/common/security/encrypted.phone';
import { hash } from 'src/common/security/hash.pass';
@Schema({timestamps:true})
 export class User{
    @Prop({type:String})
    firstName:string;

    @Prop({type:String})
    lastName:string;

    @Prop({type:String})
    phone:string;

    @Prop({type:String,unique:true,required:true})
    email:string;

    @Prop({type:String,required:true})
    password:string;
    @Prop({ type:Boolean,default:false })
    isConfirm:boolean
    @Prop({type:String || null,default:null})
 OTP:string |null;

 @Prop({ type: Date ,default: Date.now()
 })
 OTPcreateAt:Date;

 @Prop({ type:Date || null, expires:3600,default:null})
 OTPexpireAt:Date |null
 @Prop({ type: Date })
 changecredentialAt:Date;
 @Prop({type:String,enum:UserRole,default:UserRole.user})
 role:string;
}
const userSchema=SchemaFactory.createForClass(User)
// hook
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await hash(this.password)
    }
    if(this.isModified("phone")){
        this.phone= await encrypted(  this.phone )
    }
    return next()
})
userSchema.post("findOne",async function(doc){
    if(doc){
        doc.phone= await dencrypted(doc.phone)

    }
})
// model 
 export const userModel=MongooseModule.forFeature([{name:User.name,schema:userSchema}])
// type
export type TUser=HydratedDocument<User>