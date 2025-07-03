import { Types } from "mongoose";
import { Iimage } from "src/common/multer/cloud.service";


export enum sizeproduct{
    m="m",
    l="l",
    xl="xl"
}

export interface IProduct extends Iproductinput{
 
    

  
    folderId:string
   
    soldItimes:number;
    createdBy:Types.ObjectId
    slug:string
    finalprice:number
 

    
}

export interface Iproductinput  {
    color?:string[];
    size?:string[];
    productName:string;
    description:string;
    stock:number;
    image:Iimage
    gallery?:Iimage[]  
    originalprice:number
    discountprice?:number
    categoryId:Types.ObjectId;
    subcategoryId:Types.ObjectId;
    brandId:Types.ObjectId;
}