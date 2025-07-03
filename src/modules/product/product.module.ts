import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productmodel } from 'src/DB/models/product/product.model';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { CategoryRepoService } from 'src/DB/models/category/category.repository';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { CloudService } from 'src/common/multer/cloud.service';
import { brandModel } from 'src/DB/models/brand/brand.model';
import { categoryModel } from 'src/DB/models/category/category.model';
import { subcategoryModel } from 'src/DB/models/subcategory/subgategory.model';

@Module({
  imports:[productmodel,brandModel,categoryModel,subcategoryModel],
  controllers: [ProductController],
  providers: [ProductService,ProductRepo,CategoryRepoService,SubCategoryRepo,BrandRepo,CloudService],
})
export class ProductModule {}
