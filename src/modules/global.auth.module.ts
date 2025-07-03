import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "src/common/service/token/token.service";
import { userModel } from "src/DB/models/user/user.model";
import { Userrepository } from "src/DB/models/user/user.repository";
import { ProductModule } from './product/product.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
@Global()
@Module({
    imports:[userModel, ProductModule, SubcategoryModule, BrandModule, CartModule, OrderModule, CouponModule],
    controllers:[],
    providers:[JwtService,TokenService,Userrepository],
    exports:[JwtService,TokenService,Userrepository,userModel],
})

export class Globalauthmodule{}