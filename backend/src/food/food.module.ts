import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from "./Entity/Food.entity";
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodEntity]),
    UserModule],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule { }
