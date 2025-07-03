import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../DB.service.repository";
import { SubCategory, subCategoryDocument } from "./subgategory.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { filter } from "rxjs";
import { RootFilterQuery } from "mongoose";

@Injectable()
export class SubCategoryRepo extends DatabaseService<subCategoryDocument>{
    constructor(@InjectModel(SubCategory.name) private subCategoryModel: Model<subCategoryDocument> ){
        super(subCategoryModel)
    }



  async  deleteMany(filter:RootFilterQuery<subCategoryDocument>){
       return await this.subCategoryModel.deleteMany(filter)

    }
}