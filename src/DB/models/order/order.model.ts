import { MongooseModule, Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";
import { Iorder, IproductOrder, OrderStatus, paymentMethod } from "src/modules/order/order.interface";
import { User } from "../user/user.model";
import { ref } from "process";
import { Product } from "../product/product.model";
import { nanoid } from 'nanoid'
@Schema({timestamps:true})
export class Order implements Iorder{
    @Prop({required:true,default:function(){
        return   nanoid()
    }})
     orderId:string;
     @Prop({required:true,minlength:4})

        address:string;
        @Prop({required:true})
        phone:string;
        @Prop({})
        note?:string;
        @Prop({type:Date,required:false})
        paidAt?:Date  
        @Prop({required:false})
        couponCode?:string;
        @Prop({type:Types.ObjectId,ref:User.name,required:true})
        createdBy:Types.ObjectId;
        @Prop({type:Types.ObjectId,ref:User.name,required:false})

        updatedBy?:Types.ObjectId;
        @Prop({required:false})

        rejectedReason?:string;
        @Prop(raw([{
            productname:{type:String,required:true},
            productId:{type:Types.ObjectId,ref:Product.name,required:true},
            unitPrice:{type:Number,required:true},
            quantity:{type:Number,required:true},
            finalPrice:{type:Number,default:function(this:IproductOrder){
return this.quantity* this.unitPrice
            }}
        }]))
        products:IproductOrder[];
        @Prop({type:Number,required:true})
        subtotal:number
        @Prop({type:Number,required:true})

        finalOrderPrice:number
        @Prop({type:String,enum:OrderStatus,default:OrderStatus.pending})

        status:OrderStatus
        @Prop({type:String,enum:paymentMethod,default:paymentMethod.cash})

        paymentMethod:paymentMethod
        @Prop({required:false})
        intentId:string
        @Prop({ type:Number,required:false ,default:null})
        refundAmount:number
        @Prop({ type:Date,required:false,default:null })

        refundAt:Date
}
export type orderDocument=HydratedDocument<Order>
export const orderSchema=SchemaFactory.createForClass(Order)
export const orderModel=MongooseModule.forFeature([{name:Order.name,schema:orderSchema}])