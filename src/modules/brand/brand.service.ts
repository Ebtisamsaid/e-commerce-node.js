
import { BrandRepo } from './../../DB/models/brand/brand.repository';
import { SubCategoryRepo } from './../../DB/models/subcategory/subcategory.Repository';
import { CategoryRepoService } from './../../DB/models/category/category.repository';
import { CloudService, Iimage } from './../../common/multer/cloud.service';
import { Injectable, Body, NotAcceptableException, NotFoundException, ConflictException, Options } from '@nestjs/common';
import { TUser } from 'src/DB/models/user/user.model';
import { CreateBrandDTO, getAllQuery, updatebrandDTO } from './brand.DTO';
import { FilterQuery, Types } from 'mongoose';
import { brandDocument } from 'src/DB/models/brand/brand.model';
import { NotFoundError } from 'rxjs';
import { ProductRepo } from 'src/DB/models/product/product.Repository';

@Injectable()
export class BrandService {
    constructor(private cloudService:CloudService,
        private categoryRepoService:CategoryRepoService,
        private brandRepo:BrandRepo,
        private subCategoryRepo:SubCategoryRepo,
        private productRepo:ProductRepo,
    ){}


    async createBrand(file:Express.Multer.File,user:TUser,body:CreateBrandDTO){
        const category=await this.categoryRepoService.findOne({_id:body.categoryId})
        if(!category){
            throw new NotFoundException("category not found")
        }
        const subcategory=await this.subCategoryRepo.findOne({_id:body.subcategoryId})
        if(!subcategory){
            throw new NotFoundException("category not found")
        }
      
        if(!file){
         throw new ConflictException("file is requried")
        }
        const folderId=String(Math.random()*(999999-100000+1)+1)

        const{secure_url,public_id}=   await this.cloudService.uploadfile(file,
           {folder:
               `${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${folderId}`})
       let image={secure_url,public_id}
        const brand=await this.brandRepo.create({ createdBy:user._id,categoryId:body.categoryId,
            subcategoryId:body.subcategoryId,brandName:body.brandName,image})
return brand
    }


    async updatebrand(brandId:Types.ObjectId,user:TUser,body:updatebrandDTO,file?:Express.Multer.File){
       const brand= await this.brandRepo.findOne({_id:brandId})
       if(!brand){
        throw new NotFoundException("brand not found");
       }
       const category= await this.categoryRepoService.findOne({_id:body.categoryId})
       if(!category){
        throw new NotFoundException("category not found");
       }
       const subcategory= await this.subCategoryRepo.findOne({_id:body.subcategoryId})
       if(!subcategory){
        throw new NotFoundException("category not found");
       }
   let image
       if(file){
        await this.cloudService.destoryfile(`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}`)
     const{secure_url,public_id}=   await this.cloudService.uploadfile(file,{folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}`})
       image={secure_url,public_id}
    }
  return  await this.brandRepo.updateOne({_id:brandId},
    {image:image,updatedBy:user._id,brandName:body.brandName})

    }


    async getbrand(brandId:Types.ObjectId){
    const brand=    await this.brandRepo.findOne({_id:brandId})
    if(!brand){
        throw new NotFoundException("brand is not exit");
    }
    return brand
    }

    async getAllbrand(){

      return  await this.brandRepo.find({})
    }


    async delete(brandId:Types.ObjectId){
        const brand=await this.brandRepo.findOne({_id:brandId})
        if(!brand){
            throw new NotFoundException("brand is not exist")
        }
        await this.productRepo.deleteMany(brandId)
     return   await this.brandRepo.delete({_id:brandId})

    }
}
