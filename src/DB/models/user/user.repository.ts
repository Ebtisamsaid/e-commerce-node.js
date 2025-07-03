import { Model } from "mongoose";
import { DatabaseService } from "../DB.service.repository";
import { TUser, User } from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class Userrepository extends DatabaseService<TUser>{
    constructor( @InjectModel(User.name ) private readonly usermodel:Model<TUser>){
        super(usermodel)
    }

    // checkEmail
    async findbyEmail(email:string){
        const user=await this.findOne({email})
    
        return user

    }
// async create(data:Partial<tUser>){
//   const user=   await this.create(data)
//   return user
// }
}