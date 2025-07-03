import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Userrepository } from 'src/DB/models/user/user.repository';
import { userModel } from 'src/DB/models/user/user.model';
import { TokenService } from 'src/common/service/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[userModel],
  controllers: [AuthController],
  providers: [AuthService,Userrepository,TokenService,JwtService],
})
export class AuthModule {}
