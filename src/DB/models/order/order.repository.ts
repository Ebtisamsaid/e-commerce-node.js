import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../DB.service.repository";
import { Order, orderDocument } from "./order.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OrderRepo extends DatabaseService<orderDocument>{
    constructor(@InjectModel(Order.name) private orderModel: Model<orderDocument>){
super(orderModel)
    }

}