import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../DB.service.repository";
import { Cart, Cartdocument } from "./cart.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CartRepo extends DatabaseService<Cartdocument>{
    constructor(@InjectModel(Cart.name) private CartModel: Model<Cartdocument>){
        super(CartModel)
    }
}
