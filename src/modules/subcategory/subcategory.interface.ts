
import { Type } from "@nestjs/common";
import { Types } from "mongoose";
import { Iimage } from "src/common/multer/cloud.service";

export  interface ISubcategory {
    _id?:Types.ObjectId
    subcategoryName:string
    image:Iimage
    categoryId:Types.ObjectId
    createdBy:Types.ObjectId
    updatedBy:Types.ObjectId
    folderId:string
    slug:string
}