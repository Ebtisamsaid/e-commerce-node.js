import { Brand, brandModel, brandSchema } from 'src/DB/models/brand/brand.model';
import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { minLength } from "class-validator";
import mongoose, { HydratedDocument, Types } from "mongoose";
import slugify from "slugify";
import { Iimage } from "src/common/multer/cloud.service";
import { ISubcategory } from "src/modules/subcategory/subcategory.interface";
import { Category } from "../category/category.model";
import { User } from "../user/user.model";
import { Mongoose, Model } from 'mongoose';
@Schema({timestamps:true})
export class SubCategory implements ISubcategory{
@Prop({required:true,unique:true,minLength:2})
    subcategoryName: string;
@Prop(raw({secure_url:String,public_id:String}))
    image:Iimage
@Prop({required:true,minlength:2,default:function(this:SubCategory){
  return  slugify(this.subcategoryName,{trim:true})
}})
    slug:string
@Prop({type:Types.ObjectId,required:true,ref:"Category"})
    categoryId: Types.ObjectId;

    @Prop({type:Types.ObjectId,required:true,ref:User.name})
    createdBy: Types.ObjectId;
    @Prop({type:Types.ObjectId,required:false,ref:User.name})
    updatedBy: Types.ObjectId;
@Prop({})
folderId:string
}
export type subCategoryDocument=HydratedDocument<SubCategory>
export const subcategorySchema=SchemaFactory.createForClass(SubCategory)
export const subcategoryModel=MongooseModule.forFeatureAsync([{name:SubCategory.name,
    useFactory(){
        subcategorySchema.pre("updateOne",function(next){
let update=this.getUpdate()!
if(update["name"]){
    update["slug"]=slugify(update["name"],{trim:true})
    this.setUpdate(update)
    next()
}

        })
      


return subcategorySchema
    }

}])