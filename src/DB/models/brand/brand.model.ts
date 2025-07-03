import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, MongooseError, Types } from "mongoose";
import slugify from "slugify";
import { Iimage } from "src/common/multer/cloud.service";
import { IBrand } from "src/modules/brand/brand.interface";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";
import { SubCategory, subcategoryModel } from "../subcategory/subgategory.model";

@Schema({timestamps:true})
export class Brand implements IBrand{
    @Prop({required:true,minlength:2,maxlength:100})
    brandName: string;
    @Prop({minlength:2,maxlength:100,required:true,default:function(this:Brand){
        return slugify(this.brandName,{trim:true})

    }})
    slug: string;
    @Prop({ type:Types.ObjectId,required:true ,ref:User.name})
    createdBy: Types.ObjectId;
    @Prop({ type:Types.ObjectId,required:false,ref:User.name })
    updatedBy: Types.ObjectId;
    @Prop(raw({secure_url:{type:String,required:true},public_id:{type:String,required:true}}))
    image:Iimage

    @Prop({ type:Types.ObjectId,required:true,ref:SubCategory.name })
    subcategoryId: Types.ObjectId;
    @Prop({ type:Types.ObjectId,required:true,ref:Category.name })
    categoryId: Types.ObjectId;
@Prop({})
    folderId:string

}
export type brandDocument=HydratedDocument<Brand>
export const brandSchema=SchemaFactory.createForClass(Brand)
export const brandModel=MongooseModule.forFeatureAsync([{name:Brand.name,
useFactory(){
    brandSchema.pre("updateOne",function(next){
        let update=this.getUpdate()!
        if(update["brandName"]){
             update["slug"]=slugify(update["brandName"],{trim:true})
            
        }
        this.setUpdate(update)
        return next()
    })
    return brandSchema
}

}])