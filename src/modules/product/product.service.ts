import { Product, productdocument } from './../../DB/models/product/product.model';
import { CloudService, Iimage } from './../../common/multer/cloud.service';
import { ProductRepo } from './../../DB/models/product/product.Repository';
import { Injectable, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { TUser } from 'src/DB/models/user/user.model';
import { CreateproductDTO, ProductIdDTO, productQueryfilterDTO, UpdateproductDTO } from './product.DTO';
import { CategoryRepoService } from 'src/DB/models/category/category.repository';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { FilterQuery, Types, UpdateWriteOpResult } from 'mongoose';
import { Ipaginate } from 'src/common/dto/query.filter.dto';

@Injectable()
export class ProductService {
    constructor(private productRepo:ProductRepo,
        private categoryRepoService:CategoryRepoService,
            private subCategoryRepo:SubCategoryRepo,
            private brandRepo:BrandRepo,
            private cloudService:CloudService
    ){}

 async Createproduct(user:TUser,body:CreateproductDTO,
    files:{image:Express.Multer.File[],gallery?:Express.Multer.File[]}){

const category=await this.categoryRepoService.findOne({_id:body.categoryId})
if(!category){
    throw new NotFoundException("cateory is not found")

}
const subcategory=await this.subCategoryRepo.findOne({_id:body.subcategoryId})
if(!subcategory){
    throw new NotFoundException("subcateory is not found")

}
const brand=await this.brandRepo.findOne({_id:body.brandId})
if(!brand){
    throw new NotFoundException("brand is not found")

}
if (!files?.image?.[0]) {
    throw new BadRequestException('Main product image is required');
  }
let image:Iimage


const folderId=String(Math.random()*(999999-100000+1)+1)

    let {secure_url,public_id}=await this.cloudService.uploadfile(files.image[0],{folder: `${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}/product/${folderId}/image`})

image={secure_url,public_id}
let gallery:Iimage[]=[]
if(files?.gallery?.length){
  
    gallery=await this.cloudService.uploadfiles(files.gallery,{folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}/product/${folderId}/gallery`})
}
const finalprice=body.discountprice? this.finalpriceCulc(body.originalprice,body.discountprice):body.originalprice
// if(body.discountprice){
//     let finalprice=this.finalpriceCulc(body.originalprice,body.discountprice)

// }
// const finalprice=body.originalprice
const product=await this.productRepo.create({...body,image,
    gallery,finalprice,folderId,createdBy:user._id,soldItimes:0})
return product
 }

 private finalpriceCulc(originalprice:number,discountprice:number){
    const finalprice=originalprice-((discountprice||0)/100)*originalprice
    return finalprice > 0 ?finalprice:0

 }

 async updateproduct(productId:Types.ObjectId,user:TUser
    ,files:{image?:Express.Multer.File[],gallery?:Express.Multer.File[]},
    body:UpdateproductDTO):Promise<productdocument |null>{
        const product=await this.productRepo.findOne({_id:productId})
            if(!product){
                throw new NotFoundException("product is not found")
            }
            const category=await this.categoryRepoService.findOne({_id:body.categoryId})

            if(!category){
                throw new NotFoundException("cateory is not found")
            
            }
            const subcategory=await this.subCategoryRepo.findOne({_id:body.subcategoryId})
            if(!subcategory){
                throw new NotFoundException("subcateory is not found")
            
            }
            const brand=await this.brandRepo.findOne({_id:body.brandId})
            if(!brand){
                throw new NotFoundException("brand is not found")
            
            }
            let image
            if(files.image){
                await this.cloudService.destoryfile(product.image.public_id)

                 image=await this.cloudService.uploadfile(files.image[0],{folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}/image/${product.folderId}`})
            }
            let gallery:Iimage[]=[]
            if(files?.gallery?.length){
                await this.cloudService.destoryfileRes(`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}/gallery/${product.folderId}`)

              gallery= await this.cloudService.uploadfiles(files.gallery,{folder:`${process.env.app_name}/category/${category.folderId}/subcategory/${subcategory.folderId}/brand/${brand.folderId}/gallery/${product.folderId}`})
            }
            let finalprice=this.finalpriceCulc(body?.originalprice||product.originalprice,body?.discountprice||product.discountprice)
        console.log(finalprice);
        
            return  await this.productRepo.update(product._id,
                {...body,image,gallery,finalprice})

    



 }


 async getproduct(productId:Types.ObjectId){
    const product=await this.productRepo.findOne({_id:productId})
    if(!product){
        throw new NotFoundException("product not found")
    }
    return product

 }
 async getAllproduct(query:productQueryfilterDTO):Promise<productdocument[]| Ipaginate<productdocument>>{
    let filter:FilterQuery<productdocument>={}
    if(query?.productName){
        filter={$or:[
            {productName:
                {$regex:`${query.productName}`,$options:"i"}
            },    {slug:
                {$regex:`${query.productName}`,$options:"i"}
            }
        ]}
          

    }
    if(query?.maxprice||query?.minprice){
        filter.finalprice={$gte:query.minprice||0,$lte:query.maxprice}
    }
    return await this.productRepo.find({
        filter,
        populate:[{path:"createdBy",select:"firstName "}],
        sort:query?.sort,
        select:query?.select,
        page:query?.page
    })

 }

 async deleteproduct(productId:Types.ObjectId){
    return  await this.productRepo.delete({_id:productId})
    

 }


}
