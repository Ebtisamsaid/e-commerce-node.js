
import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/enums';
import { CreateOrderDTO, OrderIdDTO } from './order.DTO';
import { user } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/DB/models/user/user.model';
import Stripe from 'stripe';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post("webhook")
   webhook(@Req() req:Request){
  return  this.orderService.webhook(req)

  }

  @Auth([UserRole.user])
  @Post()
  async createOrder(@Body() body:CreateOrderDTO,@user() user:TUser){
  const order=  await this.orderService.createOrder(body,user)
    return {message:"done",data:{order}}
  }

  @Auth([UserRole.user])
  @Post("checkout/:orderId")
  async checkout(@Param() params:OrderIdDTO,@user() user:TUser):Promise<{message:string,data:{session: Stripe.Response<Stripe.Checkout.Session>}}>{
  const session=  await this.orderService.checkout(params.orderId,user)
    return {message:"done",data:{session}}
  }
  @Auth([UserRole.user])
  @Patch(":orderId/cancel")
  async cancelOrder(@Param() params:OrderIdDTO,@user() user:TUser){
 const cancelOrder= await this.orderService.cancelOrder(params.orderId,user)
    return {message:"done"}
  }



}
