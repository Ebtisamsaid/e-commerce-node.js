import { Module, UsePipes, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { Globalauthmodule } from './modules/global.auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { BrandModule } from './modules/brand/brand.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
config()
@UsePipes( new ValidationPipe({whitelist:true,stopAtFirstError:false}))
@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL as string),
     AuthModule,Globalauthmodule,CategoryModule,SubcategoryModule, BrandModule,OrderModule,ProductModule,CartModule],
  controllers: [],
  providers: [],
})


export class AppModule {}

