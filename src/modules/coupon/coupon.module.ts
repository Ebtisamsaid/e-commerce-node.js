import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponRepo } from 'src/DB/models/coupon/coupon.Repo';
import { couponModel } from 'src/DB/models/coupon/coupon.model';

@Module({
  imports:[couponModel],
  controllers: [CouponController],
  providers: [CouponService,CouponRepo],
})
export class CouponModule {}
