import { CouponService } from './../coupon/coupon.service';
import { PaymentService } from './../../common/payment/payment.service';
import { CartService } from './../cart/cart.service';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateOptions, Types } from 'mongoose';
import { CartRepo } from 'src/DB/models/cart/cart.Repository';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { TUser } from 'src/DB/models/user/user.model';
import { IproductOrder, OrderStatus, paymentMethod } from './order.interface';
import { CreateOrderDTO } from './order.DTO';
import { CouponRepo } from 'src/DB/models/coupon/coupon.Repo';
import { OrderRepo } from 'src/DB/models/order/order.repository';
import { orderSchema } from 'src/DB/models/order/order.model';
import { couponType } from 'src/DB/models/coupon/coupon.model';
import e, { Request } from 'express';
import { error } from 'node:console';

@Injectable()
export class OrderService {
constructor(private cartRepo:CartRepo,
    private productRepo:ProductRepo,
    private couponRepo:CouponRepo,
    private orderRepo:OrderRepo,
    private cartService:CartService,
    private paymentService:PaymentService,
    private   couponService:CouponService
){}

    async createOrder(body:CreateOrderDTO,user:TUser){
        const cart =await this.cartRepo.findOne({createdBy:user._id})
        if(!cart || cart?.products.length == 0){
            throw new NotFoundException("cart is not found or empty")
        }
        let products:IproductOrder[]=[]
        let subtotal:number=0
        for (const product of cart.products) {
            const checkproduct=await this.productRepo.findOne({_id:product.productId,stock:{$gte:product.quantity}} )
            if(!checkproduct){
throw new NotFoundException("product not found or out of stock")
            }

products.push({productname:checkproduct.productName,
    productId:product.productId,
    quantity:product.quantity,
    unitPrice:checkproduct.finalprice,
    finalPrice:product.quantity*checkproduct.finalprice

})
subtotal +=product.quantity*checkproduct.finalprice
            
        }
let finalOrderPrice=subtotal
        if(body.couponCode){
const coupon=await this.couponService.applycoupon(body.couponCode,user)
if(coupon?.type == "percentage"){
    finalOrderPrice=Math.floor(subtotal-(coupon.value/100)*subtotal)
}
if(coupon?.type == "fixed"){
    finalOrderPrice=Math.floor(subtotal-coupon.value)
}
await this.couponRepo.update({code:body.couponCode},{usedBy:user._id})
        }
      const order=await this.  orderRepo.create({...body, 
        products,subtotal,finalOrderPrice,createdBy:user._id})
await this.cartService.cleanCart(user)
for (const product of products) {
    await this.productRepo.update({_id:product.productId},{$inc:{stock:-product.quantity}})
    
}
return order
    }


    async checkout(orderId:Types.ObjectId,user:TUser){
        const order=await this.orderRepo.findOne({_id:orderId,
            paymentMethod:paymentMethod.card,status:OrderStatus.pending})
            if(!order){
                throw new NotFoundException("order is not exist or payment metod cash")
            }
            let discounts: {coupon:string}[]= [];

if(order.couponCode){
    const checkcoupon=await this.couponRepo.findOne({code:order.couponCode})
    if(!checkcoupon){throw new NotFoundException("coupon is not found")}
    const coupon=await this.paymentService.createcoupon(checkcoupon.type ==couponType.percentage?{percent_off:checkcoupon.value,duration:"once" as const}:{amount_off:checkcoupon.value,duration:"once" as const})
if(coupon.id){
    discounts.push({coupon:coupon.id})

}
}
 const session=await this.paymentService.checkoutsession({customer_email:user.email,
    line_items:order.products.map((p)=>{
        return {
            quantity:p.quantity,
            price_data:{
                unit_amount:p.unitPrice *100,
                currency:"egp",
                product_data:{
                    name:p.productname
                }
            },
            
        }
    })
    ,metadata:{orderId :orderId  as unknown as string},
    cancel_url:`${process.env.cancel_url}/order/${orderId}/cancel`,
    success_url:`${process.env.success_url}/order/${orderId}/success`,
    discounts,
    payment_method_types:["card"]
})
const intent=await this.paymentService.createPaymentIntent(order.finalOrderPrice)
await this.orderRepo.updateOne({_id:orderId},{intentId:intent.id})

return session


    }


     webhook(req:Request){
     
        
     return    this.paymentService.webhook(req)
    }

    async cancelOrder(id:Types.ObjectId,user:TUser){
        const order=await this.orderRepo.findOne({_id:id,createdBy:user._id 
            ,$or:[{status:OrderStatus.pending},{status:OrderStatus.placed}]})
        if(!order){throw new NotFoundException("order is not found")}
        let refund={}
        if(order.paymentMethod === paymentMethod.card && order.status === OrderStatus.placed){

 await this.paymentService.refund(order.intentId)
 refund ={refundAmount:order.finalOrderPrice,refundAt:Date.now()}
 for (const product of order.products) {
    await this.productRepo.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
    
}
await this.orderRepo.updateOne({_id:id,createdBy:user._id},{status:OrderStatus.canceled,...refund})


        }
        console.log(refund);
        for (const product of order.products) {
            await this.productRepo.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
            
        }
       await this.orderRepo.updateOne({_id:id,createdBy:user._id},{status:OrderStatus.canceled})
       
return "done"
    }
}
