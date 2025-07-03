import { Types } from 'mongoose';
import { Iimage } from 'src/common/multer/cloud.service';
export interface IBrand{
    brandName:string;
    createdBy:Types.ObjectId;
    image:Iimage;
    updatedBy:Types.ObjectId;
    subcategoryId:Types.ObjectId;
    categoryId:Types.ObjectId;
    slug:string;
    folderId:string;
}