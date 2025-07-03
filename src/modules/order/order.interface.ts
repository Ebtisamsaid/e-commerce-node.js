import { Date, Types } from "mongoose";

export interface Iorder{
    orderId:string;
    address:string;
    phone:string;
    note?:string;
    paidAt?:Date
    couponCode?:string;
    createdBy:Types.ObjectId;
    updatedBy?:Types.ObjectId;
    rejectedReason?:string;
    products:IproductOrder[];
    subtotal:number
    finalOrderPrice:number
    status:OrderStatus
    paymentMethod:paymentMethod
    

}
export enum paymentMethod{
    cash="cash",
    card="card"
}
export enum OrderStatus{
    pending="pending",
    placed="placed",
    onWay="onWay",
    delivered="delivered",
    canceled="canceled"
}

export interface IproductOrder{
    productId:Types.ObjectId
    productname:string;
    intentId?:string;
    unitPrice:number;
    quantity:number;
    finalPrice:number
    refundAmount?:number
    refundAt?:Date
}