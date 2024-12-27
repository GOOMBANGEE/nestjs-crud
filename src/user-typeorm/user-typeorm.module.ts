import { Module } from '@nestjs/common';
import { UserTypeormService } from './user-typeorm.service';
import { UserTypeormController } from './user-typeorm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './entities/user-typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeorm])],
  controllers: [UserTypeormController],
  providers: [UserTypeormService],
})
export class UserTypeormModule {}
