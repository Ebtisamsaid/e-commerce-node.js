import { Types } from "mongoose";

export interface ICart{
    createdBy:Types.ObjectId;
    products:ICartproduct[]
}

export interface ICartproduct{
    productId:Types.ObjectId
    quantity:number
}