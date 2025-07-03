import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../DB.service.repository";
import { Coupon, coupondocument } from "./coupon.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CouponRepo extends DatabaseService<coupondocument>{
    constructor(@InjectModel(Coupon.name) private couponModel: Model<coupondocument>){
        super(couponModel)
    }

    
}