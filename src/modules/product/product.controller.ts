import { productdocument } from './../../DB/models/product/product.model';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { CategoryRepoService } from './../../DB/models/category/category.repository';
import { fileValidation } from './../category/category.controller';
import { UserRole } from './../../common/enums/enums';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { cloudmulteroptions } from 'src/common/multer/cloud.multer.option';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateproductDTO, ProductIdDTO, productQueryfilterDTO, UpdateproductDTO } from './product.DTO';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { RoleGuard } from 'src/common/Guard/role.guard';
import { UpdateWriteOpResult } from 'mongoose';
import { Ipaginate } from 'src/common/dto/query.filter.dto';
@UsePipes(new ValidationPipe({
  whitelist: true,
 stopAtFirstError:false
}),)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService
 
  ) {}

@Post('')
@UseInterceptors(FileFieldsInterceptor([{name:"image",maxCount:1},{name:"gallery",maxCount:3}],
  cloudmulteroptions({validation:fileValidation.image})))
@Auth([UserRole.admin])

  async createproduct( @user() user:TUser ,@Body() body:CreateproductDTO,
  @UploadedFiles() files:{image:Express.Multer.File[],gallery?:Express.Multer.File[]}
  ){

const createdproduct=await this.productService.Createproduct(user,body,files)

return{message:"done",data:{createdproduct}}

  }
  @Patch(":productId")
@Auth([UserRole.admin])
@UseInterceptors(FileFieldsInterceptor([{name:"image",maxCount:1},{name:"gallery",maxCount:3}],cloudmulteroptions({validation:fileValidation.image})))
  async updateproduct(@Param() params:ProductIdDTO,@user()user:TUser,
  @UploadedFiles() files:{image?:Express.Multer.File[],gallery?:Express.Multer.File[]}
   ,@Body() body:UpdateproductDTO):Promise<{message:string,data:{updated:productdocument |null}}>{

const updated =await this.productService.updateproduct(params.productId,user,files,body)
return {message:"done",data:{updated}}
  }


@Get(':productId')
  async getproduct(@Param() params:ProductIdDTO):Promise<{message:string,data:{product:productdocument}}>{
  const product=  await this.productService.getproduct(params.productId)
    return{message:"done",data:{product}}

  }
  @Get('')
  async getAllproduct(@Query() query:productQueryfilterDTO)
  :Promise<{message:string,data:{allproduct:productdocument[]| Ipaginate<productdocument>}}>{
    const allproduct=  await this.productService.getAllproduct(query)
    return {message:"done",data:{allproduct}}

  }
  @Delete(':productId')
  @Auth([UserRole.admin])
  async deleteproduct(@Param() Params:ProductIdDTO):Promise<{message:string}>{
    await this.productService.deleteproduct(Params.productId)
    return {message:"done"}

  }
}
