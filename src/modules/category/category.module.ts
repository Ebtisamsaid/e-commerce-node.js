import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryModel } from 'src/DB/models/category/category.model';
import { CategoryRepoService } from 'src/DB/models/category/category.repository';
import { CloudService } from 'src/common/multer/cloud.service';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { subcategoryModel } from 'src/DB/models/subcategory/subgategory.model';
import { brandModel } from 'src/DB/models/brand/brand.model';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { productmodel } from 'src/DB/models/product/product.model';

@Module({
  imports:[categoryModel,subcategoryModel,brandModel,productmodel],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepoService,CloudService,SubCategoryRepo,BrandRepo,ProductRepo],
})
export class CategoryModule {}
