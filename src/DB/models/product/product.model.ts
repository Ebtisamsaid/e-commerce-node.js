import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, HydrateOptions, Types } from "mongoose";
import slugify from "slugify";
import { Iimage } from "src/common/multer/cloud.service";
import { IProduct, sizeproduct } from "src/modules/product/product.interface";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";
import { SubCategory } from "../subcategory/subgategory.model";
import { Brand } from "../brand/brand.model";
@Schema({timestamps:true})
export class Product implements IProduct{
  @Prop({ type:String,required:true,min:2})
productName: string;

@Prop({required:true,min:2,max:5000})

description: string;
@Prop({ required:true,default:function(this:Product){
    return slugify(this.productName,{trim:true})
} })
slug: string;
@Prop({ required:false })
size?: string[];

@Prop({ required:false ,type:Array<string>})

color?: string[] ;
@Prop(raw({secure_url:{type:String,required:true},public_id:{type:String,required:true}}))

image: Iimage;
@Prop(raw([{secure_url:{type:String,required:true},public_id:{type:String,required:true}}]))

gallery?: Iimage[]
@Prop({required:false})

folderId: string;
@Prop({type:Types.ObjectId,required:true ,ref:User.name})

createdBy: Types.ObjectId;
@Prop({type:Types.ObjectId,required:true ,ref:Category.name})

categoryId: Types.ObjectId;
@Prop({type:Types.ObjectId,required:true ,ref:SubCategory.name})

subcategoryId: Types.ObjectId;
@Prop({type:Types.ObjectId,required:true ,ref:Brand.name})

brandId: Types.ObjectId;
@Prop({type:Number,required:true})

originalprice: number;
@Prop({type:Number,required:true})

discountprice: number;
@Prop({type:Number,required:false})

finalprice: number;
@Prop({type:Number,required:true,default:1})

stock: number;
@Prop({type:Number,required:true})
@Prop({type:Number,default:0})
soldItimes: number;
}

export type productdocument=HydratedDocument<Product>
export const productschema=SchemaFactory.createForClass(Product)
export const productmodel=MongooseModule.forFeatureAsync([{name:Product.name,useFactory(){
productschema.pre("updateOne",function(next){
     let update=this.getUpdate()!
     if(update["productName"]){

        update["slug"]=slugify(update["productName"],{trim:true})
        this.setUpdate(update)
        next()

     }
 
})
return productschema


}}])
