import { InjectModel } from "@nestjs/mongoose";
import { DatabaseService } from "../DB.service.repository";
import { Category, categorydocument, categoryModel } from "./category.model";
import { Model } from "mongoose";

export class CategoryRepoService extends DatabaseService<categorydocument>{
    constructor(@InjectModel(Category.name) readonly CategoryModel: Model<categorydocument>){
        super(CategoryModel)

    }

}