import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/enums';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import { AddtoCartDTO, CartIdDTO, ProductidsDTO } from './Cart.DTO';
import { Product } from 'src/DB/models/product/product.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

@Post("")
@Auth([UserRole.user])
  async creatCart(@Body() body:AddtoCartDTO ,@user() user:TUser){
   const cart= await this.cartService.createCart(body ,user)
return{message:"done",data:{cart}}
  }

  @Patch("")
@Auth([UserRole.user])
  async removeitemsCart(@Body() body:ProductidsDTO,@user() user:TUser){
   const cart= await this.cartService.removeitemsCart(body ,user)
return{message:"done",data:{cart}}
  }

  @Delete(":idCart")
  @Auth([UserRole.user])
    async cleanCart( @Param() params:CartIdDTO,@user() user:TUser){
     const cart= await this.cartService.cleanCart(user)
  return{message:"done",data:{cart}}
    }
  
@Get()
@Auth([UserRole.user])
async getCart(@user() user:TUser){
 const cart= await this.cartService.getCart(user)
  return{ message:"done", data:{cart}}

}



}
