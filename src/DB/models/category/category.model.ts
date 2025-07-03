import { SubCategory, subcategoryModel, subcategorySchema } from 'src/DB/models/subcategory/subgategory.model';
import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { ICategory } from "src/modules/category/category.interface";
import { User } from "../user/user.model";
import { Iimage } from "src/common/multer/cloud.service";
import slugify from "slugify";


@Schema({timestamps:true})
export class Category implements ICategory{
   
    @Prop({ required:true,minlength:2,maxlength:50 })

    name:string;
    @Prop({ required:true,minlength:2,maxlength:75 ,default:function(this:Category){
return slugify(this.name,{trim:true})
    }})

    slug:string;
    @Prop(raw({secure_url:{type:String,required:true},public_id:{type:String,required:true}}))
    logo:Iimage;

    @Prop({ type:Types.ObjectId,required:true,ref:User.name })

    createdBy: Types.ObjectId;
@Prop({  })
    folderId:string
    @Prop({ type:Types.ObjectId,ref:User.name })

    updatedBy: Types.ObjectId;
}
export const categorySchema=SchemaFactory.createForClass(Category)
const subcatemodel=MongooseModule.forFeature([{name:SubCategory.name,schema:subcategorySchema}])

export const categoryModel=MongooseModule.forFeatureAsync([{name:Category.name,
    useFactory(){
categorySchema.pre("updateOne",function(next){
    let update=this.getUpdate()!
console.log(update);
if (update["name"]) {
    update["slug"]=slugify(update["name"],{trim:true})
    
}
this.setUpdate(update)
next()
})





        return categorySchema
    }
    
}])
export type categorydocument=HydratedDocument<Category>

