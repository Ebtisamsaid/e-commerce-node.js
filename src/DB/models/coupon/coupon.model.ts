import { Icoupon } from './../../../modules/coupon/coupon.interface';
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";
 export enum couponType{
    freeshipping="freeshipping",
    percentage="percentage",
    fixed="fixed"
 }
@Schema({timestamps:true})
export class Coupon implements Icoupon{


@Prop({ required:true,unique:true})
    code:string;

    @Prop({ required:true,enum:couponType})

    type:string;

@Prop({type:Number,required:function(this:Coupon){
    return this.type==couponType.freeshipping?false:true
}})
    value:number;

    @Prop({type:Date,default:() =>Date.now()})
    startDate:number;
    @Prop({type:Date ,default:() => Date.now() + 30 * 24 * 60 * 60 * 1000
     })

    endDate:number;

    @Prop({type:Number})
    minPurchase?:number;
    @Prop({type:[Types.ObjectId]})
    usedBy:[Types.ObjectId];
    @Prop({type:Boolean,default:false})
    isActive:boolean;
    @Prop({type:Number,default:1})
    usesPerCustomer?:number;

    @Prop({type:[Types.ObjectId],default:[]})

    applyProducts?:[Types.ObjectId]
    createdBy:Types.ObjectId
}

export type coupondocument=HydratedDocument<Coupon>
export const couponSchema=SchemaFactory.createForClass(Coupon)
export const couponModel=MongooseModule.forFeature([{name:Coupon.name,schema:couponSchema}])