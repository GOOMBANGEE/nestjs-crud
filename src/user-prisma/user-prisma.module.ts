import { Module } from '@nestjs/common';
import { UserPrismaService } from './user-prisma.service';
import { UserPrismaController } from './user-prisma.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UserPrismaController],
  providers: [UserPrismaService],
})
export class UserPrismaModule {}
