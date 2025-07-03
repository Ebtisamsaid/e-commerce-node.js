import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { productmodel } from 'src/DB/models/product/product.model';
import { CartModel } from 'src/DB/models/cart/cart.model';
import { CartRepo } from 'src/DB/models/cart/cart.Repository';

@Module({
  imports:[productmodel,CartModel],
  controllers: [CartController],
  providers: [CartService,ProductRepo,CartRepo],
})
export class CartModule {}
