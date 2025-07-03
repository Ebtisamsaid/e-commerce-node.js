import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { CategoryRepoService } from './../../DB/models/category/category.repository';
import { CloudService, Iimage } from './../../common/multer/cloud.service';
import { SubCategoryRepo } from './../../DB/models/subcategory/subcategory.Repository';
import { BadRequestException, Injectable, NotFoundException, Body } from '@nestjs/common';
import { TUser } from 'src/DB/models/user/user.model';
import { createSubCategoryDTO, subcategoryIdDTO, updatesubcategoryDTo } from './subcategory.DTO';
import { updateCategoryDTO } from '../category/category.DTO';
import { Types } from 'mongoose';
import { ProductRepo } from 'src/DB/models/product/product.Repository';

@Injectable()
export class SubcategoryService {
    constructor(private  subCategoryRepo:SubCategoryRepo,
        private cloudService:CloudService,
        private categoryRepoService:CategoryRepoService,
        private brandRepo:BrandRepo,
        private productRepo:ProductRepo,
    ){}

    async create(user:TUser,body:createSubCategoryDTO,file:Express.Multer.File){
if(!file){
    throw new BadRequestException("invalid file")

}

const subcategory=await this.subCategoryRepo.findOne({subcategoryName:body.subcategoryName})
if(subcategory){
    throw new NotFoundException("subcategory name is already exist");
}
const folderId=String(Math.random()*(999999-100000+1)+1)
const category=await this.categoryRepoService.findOne({_id:body.categoryId})
if(!category){
    throw new NotFoundException("category  is not exist");

}
console.log(category);

const{secure_url,public_id}=await this.cloudService.uploadfile(file,
    {folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${folderId}`})
let image={secure_url,public_id}
console.log(image);

 const createdsubcategory=await this.subCategoryRepo.create({image,subcategoryName:body.subcategoryName,categoryId:body.categoryId,folderId,createdBy:user._id})
    return createdsubcategory
}


async update(subcategoryId:Types.ObjectId,user:TUser,body?:updatesubcategoryDTo,file?:Express.Multer.File){
const subcategory=await this.subCategoryRepo.findOne({_id:subcategoryId})
if(!subcategory){
    throw new NotFoundException("subcatgory not found")
}
const category =await this.categoryRepoService.findOne({_id:body?.categoryId})
if(!category){
    throw new NotFoundException("category not found")
}
let image
if(file){
    await this.cloudService.destoryfile(`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}`)
const{secure_url,public_id}=await this.cloudService.uploadfile(file,{folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}`})
image={secure_url,public_id}
console.log({secure_url,public_id});

}
console.log(file,body?.subcategoryName,image);

  const update=await this.subCategoryRepo.update({_id:subcategoryId},{
    image,
    updatedBy:user._id,
    subcategoryName:body?.subcategoryName
})

return update
}
async getsubCategory(subcategoryId:Types.ObjectId){
    const subcategory=await this.subCategoryRepo.findOne({_id:subcategoryId})
if(!subcategory){
    throw new NotFoundException("subcategory is not exist");
}
return subcategory

}
async getAllsubCategory(){
   return await this.subCategoryRepo.find({})
}
async DelSubCategory(subcategoryId){
    const subcategory=await this.subCategoryRepo.findOne({_id:subcategoryId})
    if(!subcategory){
        throw new NotFoundException("subcategory is not exist");
    }
    await this.brandRepo.deleteMany({ subcategoryId });
    await this.productRepo.deleteMany({ subcategoryId });

 return   await this.subCategoryRepo.delete({_id:subcategoryId})
}

}
