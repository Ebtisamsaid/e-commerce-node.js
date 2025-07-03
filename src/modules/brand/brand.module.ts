import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CategoryRepoService } from 'src/DB/models/category/category.repository';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { brandModel } from 'src/DB/models/brand/brand.model';
import { CloudService } from 'src/common/multer/cloud.service';
import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { categoryModel } from 'src/DB/models/category/category.model';
import { subcategoryModel } from 'src/DB/models/subcategory/subgategory.model';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { productmodel } from 'src/DB/models/product/product.model';

@Module({
  imports:[brandModel,categoryModel,subcategoryModel,productmodel],
  controllers: [BrandController],
  providers: [BrandService,CategoryRepoService,SubCategoryRepo,CloudService,BrandRepo,ProductRepo],
})
export class BrandModule {}
