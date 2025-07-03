import { BrandModule } from "src/modules/brand/brand.module";
import { DatabaseService } from "../DB.service.repository";
import { Brand, brandDocument } from "./brand.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { RootFilterQuery } from "mongoose";
@Injectable()
export class BrandRepo extends DatabaseService<brandDocument>{
    constructor(@InjectModel(Brand.name) private brandModel:Model<brandDocument>){
        super(brandModel)
    }
    async  deleteMany(filter:RootFilterQuery<brandDocument>){
           return await this.brandModel.deleteMany(filter)
    
        }
}