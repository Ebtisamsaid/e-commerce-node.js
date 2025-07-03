import { ProductRepo } from './../../DB/models/product/product.Repository';
import { fileValidation } from './../category/category.controller';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { UserRole } from 'src/common/enums/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudmulteroptions } from 'src/common/multer/cloud.multer.option';
import { Auth } from 'src/common/decorators/auth.decorator';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { BrandIdDTO, CreateBrandDTO, updatebrandDTO } from './brand.DTO';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService,
    private productRepo:ProductRepo
  ) {}


  @Post()
  @Auth([UserRole.admin])
  @UseInterceptors(FileInterceptor("file",cloudmulteroptions({validation:fileValidation.image})))
  async createBrand(@UploadedFile() file:Express.Multer.File ,@user() user:TUser,@Body() body:CreateBrandDTO){
  const brand =  await this.brandService.createBrand(file,user,body)
    return{message:"done",data:{brand}}

  }

  @Auth([UserRole.admin])
  @UseInterceptors(FileInterceptor("file",cloudmulteroptions({validation:fileValidation.image})))
  @Patch(':brandId')
   async updatebrand(@Param() params:BrandIdDTO,@user() user:TUser, @Body() body:updatebrandDTO, @UploadedFile() file?:Express.Multer.File){
const updated=await this.brandService.updatebrand(params.brandId,user,body,file)
return{message:"done",data:{updated}}
   }

   @Get(':brandId')
   async getbrand(@Param() params:BrandIdDTO){
   const data= await this.brandService.getbrand(params.brandId)
    return{message:"done",data:{data}}


   }

   @Get()
   async getAllbrand(){
   const data= await this.brandService.getAllbrand()
    return{message:"done",data:{data}}



   }

@Delete(':brandId')
   async deletebrand(@Param() params:BrandIdDTO){

   const data= await this.brandService.delete(params.brandId)
     return{message:"done",data:{data}}
   }
}
