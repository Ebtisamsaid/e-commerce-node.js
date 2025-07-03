import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderModel } from 'src/DB/models/order/order.model';
import { CartModel } from 'src/DB/models/cart/cart.model';
import { productmodel } from 'src/DB/models/product/product.model';
import { CartRepo } from 'src/DB/models/cart/cart.Repository';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { CartService } from '../cart/cart.service';
import { CouponRepo } from 'src/DB/models/coupon/coupon.Repo';
import { couponModel } from 'src/DB/models/coupon/coupon.model';
import { OrderRepo } from 'src/DB/models/order/order.repository';
import { PaymentService } from 'src/common/payment/payment.service';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports:[orderModel,CartModel,productmodel,couponModel],
  controllers: [OrderController],
  providers: [OrderService,CartRepo,ProductRepo,CartService,CouponRepo,OrderRepo,PaymentService,CouponService],
})
export class OrderModule {}
