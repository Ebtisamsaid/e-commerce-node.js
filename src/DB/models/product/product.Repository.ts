import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../DB.service.repository";
import { Product, productdocument } from "./product.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductRepo extends DatabaseService<productdocument>{
    constructor(@InjectModel(Product.name) private productModel: Model<productdocument>){
        super(productModel)
        
    }
}