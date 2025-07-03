import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
config()
async function bootstrap() {
  const PORT=process.env.PORT

  const app = await NestFactory.create(AppModule);
  app.use("/order/webhook", express.raw({type:"application/json"}))

  app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,stopAtFirstError:false}));
  await app.listen(process.env.PORT ?? 3000 , ()=>{
    console.log(`server is running at ${PORT}`
   ) })
   app.enableCors()
}
bootstrap();
