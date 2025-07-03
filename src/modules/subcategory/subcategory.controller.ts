import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudmulteroptions } from 'src/common/multer/cloud.multer.option';
import { fileValidation } from '../category/category.controller';
import { createSubCategoryDTO, subcategoryIdDTO, updatesubcategoryDTo } from './subcategory.DTO';
import { subCategoryDocument } from 'src/DB/models/subcategory/subgategory.model';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}
@Post('')
@Auth([UserRole.admin])
@UseInterceptors(FileInterceptor("file",cloudmulteroptions({validation:fileValidation.image})))
 async create(@user() user:TUser, @Body() body:createSubCategoryDTO ,@UploadedFile() file:Express.Multer.File)
  {
  const subcategory= await this.subcategoryService.create(user,body,file)
  return{message:"done",data:{subcategory}}
}
@Auth([UserRole.admin])
@UseInterceptors(FileInterceptor("file", cloudmulteroptions({validation:fileValidation.image})))
@Patch(":subcategoryId")

async updatesubcategory( @Param() params:subcategoryIdDTO ,
@user()user:TUser ,@Body() body?:updatesubcategoryDTo,@UploadedFile() file?:Express.Multer.File){
   const updated=await this.subcategoryService.update(params.subcategoryId,user,body,file)
   console.log(updated);
   
   return {message:"done",data:{updated}}
}
@Get(":subcategoryId")
async getSubCategory(@Param() params:subcategoryIdDTO){
 const subcategory= await this.subcategoryService.getsubCategory(params.subcategoryId)
  return{message:"done",data:{subcategory}}

}
@Get()
async getAllSubCategory(){
 const Allsubcategory= await this.subcategoryService.getAllsubCategory()
  return{message:"done",data:{Allsubcategory}}

}

@Delete(":subcategoryId")
@Auth([UserRole.admin])
async DelSubCategory(@Param() params:subcategoryIdDTO){
await this.subcategoryService.DelSubCategory(params.subcategoryId)
  return{message:"done",}

}

}
