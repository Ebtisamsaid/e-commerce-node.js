import {  Types } from "mongoose";
import { Iimage } from "src/common/multer/cloud.service";

export interface ICategory{
    name:string;
    logo:Iimage;
    slug:string;
    createdBy:Types.ObjectId;
    // createdAt?:Date;
    // updatedBy?:Date;
    folderId:string
    updatedBy:Types.ObjectId
}