import { Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors,Put, Get, Query, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/enums';
import { CategoryparamDTO, CategoryQueryDTO, createcategoryDTO, DeletecategoryDTO, updateCategoryDTO } from './category.DTO';
import { cloudmulteroptions } from 'src/common/multer/cloud.multer.option';
import { Types } from 'mongoose';

export const fileValidation={
  image:["image/jpeg","image/png"],
  file:["application/json","plain/text"],
}
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

@Auth([UserRole.admin])
@UseInterceptors(FileInterceptor("file",cloudmulteroptions({validation:fileValidation.image})))
@Post("create-category")
 async  create(@user() user:TUser, @Body() body:createcategoryDTO 
 ,@UploadedFile() file:Express.Multer.File){
 const category = await this.categoryService.createcategory(user,body,file)
 return{message:"done",data:{category}}

  }

@Auth([UserRole.admin])
@UseInterceptors(FileInterceptor("file",cloudmulteroptions({validation:fileValidation.image})))
@Patch(':categoryId') 
async updateCategory  (@Param() params:CategoryparamDTO, @user() user:TUser,  @Body() body?:updateCategoryDTO , @UploadedFile() file?:Express.Multer.File){
console.log( {rrr:params},body)

 const updated= await this.categoryService.update( user,params.categoryId,body,file)
 console.log(updated);
 
  return{
    message:"updated done",data:{
      updated
    }
  }

}


@Get(':categoryId')
async getCategory(@Param() Params:CategoryparamDTO){
  console.log(Params);
  
 const category=await this.categoryService.findOne(Params.categoryId)
return {message:"done",data:{category}}
}
@Get('')
async getAllCategory(@Query() query:CategoryQueryDTO){
  
 const category=await this.categoryService.findAll(query)
return {message:"done",data:{category}}
}

@Delete(':categoryId')
@Auth([UserRole.admin])
async deletecategory(@Param()params:DeletecategoryDTO, @user() user:TUser){
  await this.categoryService.deletecategory(params.categoryId,user)
  return {message:"done"}

}
}
