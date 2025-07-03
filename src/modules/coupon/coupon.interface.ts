import { Date, Types } from "mongoose";

export interface Icoupon{
    code:string;
    type:string;
    value:number;
    startDate:number;
    endDate:number;
    minPurchase?:number;
    usedBy:[Types.ObjectId];
    createdBy:Types.ObjectId;
    isActive:boolean;
    usesPerCustomer?:number;
    applyProducts?:[Types.ObjectId]
}