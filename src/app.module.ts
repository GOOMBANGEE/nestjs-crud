import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserPrismaModule } from './user-prisma/user-prisma.module';

@Module({
  imports: [CommonModule, UserPrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
