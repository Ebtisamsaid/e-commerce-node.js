import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ICart, ICartproduct } from "src/modules/cart/cart.interface";
import { Product } from "../product/product.model";
@Schema({timestamps:true})
export class Cart implements ICart{
    @Prop({type:Types.ObjectId,required:true,unique:true})
    createdBy: Types.ObjectId;
    @Prop(raw([{productId:{type:Types.ObjectId,ref:Product.name,required:true},quantity:{type:Number,default:1}}]))
    products: ICartproduct[];
}
export type Cartdocument=HydratedDocument<Cart>
export const CartSchema=SchemaFactory.createForClass(Cart)
export const  CartModel=MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}])