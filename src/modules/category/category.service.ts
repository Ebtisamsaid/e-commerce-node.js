import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { BrandRepo } from './../../DB/models/brand/brand.repository';
import { SubCategoryRepo } from './../../DB/models/subcategory/subcategory.Repository';
import { FilterQuery } from 'mongoose';
import { CategoryRepoService } from './../../DB/models/category/category.repository';
import { BadGatewayException, Injectable, ConflictException, NotFoundException, BadRequestException, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, categorydocument } from 'src/DB/models/category/category.model';
import { DatabaseService } from 'src/DB/models/DB.service.repository';
import { CategoryparamDTO, CategoryQueryDTO, createcategoryDTO, updateCategoryDTO } from './category.DTO';
import { TUser } from 'src/DB/models/user/user.model';
import { CloudService } from 'src/common/multer/cloud.service';

@Injectable()
export class CategoryService {
    constructor(private categoryRepo:CategoryRepoService,
     private cloudservice:CloudService,
    private subCategoryRepo:SubCategoryRepo,
private brandRepo:BrandRepo,
private productRepo:ProductRepo
){

    }


  async  createcategory (user:TUser,body:createcategoryDTO,file:Express.Multer.File){
    const{name}=body
    
// checkfile exist
if (!file) {
    throw new BadGatewayException( "missing file")
    
}
const category =await this.categoryRepo.findOne({name})
// check categoiry exist 
if (category) {
    throw new ConflictException("category name is exist")
}
// generate folderid
const folderId=String(Math.random()*(999999-100000+1)+1)

const{secure_url,public_id}=await this.cloudservice.uploadfile(file,{folder:`${process.env.app_name}/category/${folderId}`})
 const categorycreate=await this.categoryRepo.create({name,createdBy:user._id,logo:{secure_url,public_id},folderId})
 return categorycreate

    }



  async  update(user:TUser,categoryId:Types.ObjectId,body?:updateCategoryDTO,file?:Express.Multer.File){
    const isValid = Types.ObjectId.isValid(categoryId);

    //const categoryId= new Types.ObjectId(params.categoryId)
    console.log(isValid);
    
    const category=await this.categoryRepo.findOne({_id:categoryId})
console.log(category);

    if(!category){
        throw new NotFoundException("category not found")

    }
    if(body?.name && await this .categoryRepo.findOne({filter:{name:body.name,_id:{$ne:categoryId}}})){
        throw new ConflictException("category name is already exist")
    }
    let image
    if(file){
        await this.cloudservice.destoryfile(`${process.env.app_name}/category/${category.folderId}`)
      const{secure_url,public_id}=  await this.cloudservice.uploadfile(file,{folder:`${process.env.app_name}/category/${category.folderId}`})
      image={secure_url,public_id}

    }
    const updatedCategory=await this.categoryRepo.updateOne({_id:categoryId},{
        name:body?.name,
        logo:image,
        updatedBy:user._id
    }
    
    )
    return updatedCategory



    }




    async findOne(categoryId:Types.ObjectId){

        const isValid = Types.ObjectId.isValid(categoryId);
        console.log(await this.categoryRepo.findOne({_id:categoryId},[{path:"createdBy",select:"_id "}])); 
        
    const getCategory=await this.categoryRepo.findOne({_id:categoryId},[{path:"createdBy",select:"_id  firstName role "}])

    if(!getCategory)throw new NotFoundException("catgeory not found")
return getCategory
    }



    async findAll(query:CategoryQueryDTO){
        let filter:FilterQuery<categorydocument>={}
        if(query?.name){
            filter= {
                $or:[
                {name:{$regex:`${query.name}`,$options:"i"}},
                {slug:{$regex:`${query.name}`,$options:"i"}}
                    ]
            }
        }   
       return    await this.categoryRepo.find({
       
        filter,
        populate:[{path:"createdBy"}],
        select:query?.select,
        sort:query?.sort,
        page:query?.page,

       })

    }


    async deletecategory(categoryId:Types.ObjectId, user:TUser){
        const category=await this.categoryRepo.findOne({_id:categoryId})
        console.log(category);
        
            if(!category){
                throw new NotFoundException("category not found")
        
            }
            await this.subCategoryRepo.deleteMany({ categoryId });
            await this.brandRepo.deleteMany({ categoryId });
            await this.productRepo.deleteMany({ categoryId });

           return await this.categoryRepo.delete({_id:categoryId})
        
    }
}
