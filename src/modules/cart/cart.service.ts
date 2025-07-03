import { CartRepo } from './../../DB/models/cart/cart.Repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TUser } from 'src/DB/models/user/user.model';
import { AddtoCartDTO, ProductidsDTO } from './Cart.DTO';
import { ProductRepo } from 'src/DB/models/product/product.Repository';
import { Types } from 'mongoose';
import { populate } from 'dotenv';

@Injectable()
export class CartService {
    constructor(private productRepo:ProductRepo,
        private cartRepo:CartRepo
    ){}


    async createCart (body:AddtoCartDTO,user:TUser){

        const product=await this.productRepo.findOne({_id:body.productId,stock:{$gte:body.quantity}})
        if(!product){
            throw new NotFoundException("product not found or out of stock")
        }
        const cart=await this.cartRepo.findOne({createdBy:user._id})
        if(!cart){
         const cartcreated=   await this.cartRepo.create({createdBy:user._id,products:[body]})
         return cartcreated
        }
        let match=false
for (const [index,product] of cart.products.entries()) {
    console.log(cart.products.entries());
    
    if(product.productId.toString() === body.productId.toString()){
        cart.products[index].quantity = body.quantity
    match=true
    break
}    


}
if(!match){
    cart.products.push(body)
}
 return await cart.save()

     
    

    }



    async removeitemsCart(body:ProductidsDTO,user:TUser){
        const cart=await this.cartRepo.updateOne({createdBy:user._id},
            {$pull:{products:{productId:{$in:body.productsIds}}}})
return cart
    }

    async cleanCart( user:TUser){

        const cart=await this.cartRepo.updateOne({createdBy:user._id},{products:[]})
return cart

    }


    async getCart(user:TUser){
      const cart=  await this.cartRepo.findOne({createdBy:user._id},[{path:"products.productId"}])
return cart
    }
}
