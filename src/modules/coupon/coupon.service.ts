import { TUser } from './../../DB/models/user/user.model';
import { Date } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatecouponDTO, updatecouponDTO } from './coupon.DTO';
import { CouponRepo } from 'src/DB/models/coupon/coupon.Repo';
import { coupondocument } from 'src/DB/models/coupon/coupon.model';
import { Types } from 'mongoose';
import { user } from 'src/common/decorators/user.decorator';

@Injectable()
export class CouponService {
    constructor(private couponRepo:CouponRepo){}


    async createcoupon(body:CreatecouponDTO ,user:TUser):Promise<coupondocument | null>{
        const check=await this.couponRepo.findOne({code:body.code})
        if(check){
            throw new ConflictException(" the code is already exist");}
  const coupon=await      this.couponRepo.create({createdBy:user._id,
    code:body.code,
    type:body.type,
    value:body.value,
    minPurchase:body.minPurchase,
    usesPerCustomer:body.usesPerCustomer,
    applyProducts:body.applyProducts,
   

  })
  return coupon

    }

    async updatecoupon(couponId:Types.ObjectId, body:updatecouponDTO,user:TUser){
      const checkcode=  await this.couponRepo.findOne({code:body.code})
      console.log(body.code);
      
      if(checkcode){
        throw new ConflictException(" the code is already exist");}
        const coupon=  await this.couponRepo.findOne({_id:couponId})
      if(!coupon){
        throw new NotFoundException(" coupon is not found");}
        const updated=await this.couponRepo.updateOne({_id:couponId},{...body})
return updated
    }

    async getcoupon(couponId:Types.ObjectId){
        const coupon=await this.couponRepo.findOne({_id:couponId})
        if(!coupon) throw new NotFoundException("coupon is not found")
        return coupon
    }

    async getAllcoupon(){
         return await this.couponRepo.find({})
    }


    async applycoupon(code:string,@user() user:TUser){
      const coupon=await this.couponRepo.findOne({code:code})
      if(!coupon){throw new NotFoundException("coupon is not exist")}
     // 3. Validate expiration date
  const currentDate = Date.now();
  if (coupon.endDate < currentDate) {
    throw new BadRequestException('Coupon has expired');
  }
  if(!coupon.isActive){    throw new BadRequestException('Coupon is not activate');
  }
  if (coupon.usedBy.includes(user._id)) {
    throw new BadRequestException('You have already used this coupon');

    
  }
return coupon


}
  


}
