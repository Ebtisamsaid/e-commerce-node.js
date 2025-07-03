import { BrandRepo } from 'src/DB/models/brand/brand.repository';
import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { subcategoryModel } from 'src/DB/models/subcategory/subgategory.model';
import { CloudService } from 'src/common/multer/cloud.service';
import { CategoryService } from '../category/category.service';
import { SubCategoryRepo } from 'src/DB/models/subcategory/subcategory.Repository';
import { CategoryRepoService } from 'src/DB/models/category/category.repository';
import { categoryModel } from 'src/DB/models/category/category.model';
import { brandModel } from 'src/DB/models/brand/brand.model';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { productmodel } from 'src/DB/models/product/product.model';

@Module({imports:[subcategoryModel,categoryModel,brandModel,productmodel],
  controllers: [SubcategoryController],
  providers: [SubcategoryService,CloudService,CategoryRepoService ,SubCategoryRepo,BrandRepo,ProductRepo]
})
export class SubcategoryModule {}
