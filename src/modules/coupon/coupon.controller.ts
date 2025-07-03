import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponIdDTO, CreatecouponDTO, updatecouponDTO } from './coupon.DTO';
import { coupondocument } from 'src/DB/models/coupon/coupon.model';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/enums';
import { ValidationError } from 'class-validator';

@Controller('coupon')
@UsePipes( new ValidationPipe({
  whitelist: true,
  stopAtFirstError:false,
  transform:true
  
}))
export class CouponController {
  constructor(private readonly couponService: CouponService) {}


  @Post()
  @Auth([UserRole.admin])
  async createcoupon( @Body() body:CreatecouponDTO,@user() user:TUser ){
 const coupon= await  this.couponService.createcoupon(body,user)
    return{message:"done",data:{coupon}}
  }

  
  @Patch(":couponId")
  @Auth([UserRole.admin])
  async updatecoupon(@Param() params:CouponIdDTO,@Body() body:updatecouponDTO,@user() user:TUser ){
 const updatedcoupon= await  this.couponService.updatecoupon(params.couponId,body,user)
    return{message:"done",data:{updatedcoupon}}
  }
  @Get(":couponId")
  @Auth([UserRole.admin])
  async getcoupon(@Param() params:CouponIdDTO, ){
 const getcoupon= await  this.couponService.getcoupon(params.couponId)
    return{message:"done",data:{getcoupon}}
  }

  @Get()
  @Auth([UserRole.admin])
  async getAllcoupon(){
 const getAllcoupon= await  this.couponService.getAllcoupon()
    return{message:"done",data:{getAllcoupon}}
  }
}
