import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserPrismaModule } from './user-prisma/user-prisma.module';
import { UserTypeormModule } from './user-typeorm/user-typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { UserTypeorm } from './user-typeorm/entities/user-typeorm.entity';

@Module({
  imports: [
    CommonModule,
    UserPrismaModule,
    UserTypeormModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESQL_PORT),
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [UserTypeorm],
      synchronize: true, // 자동으로 테이블 생성 및 업데이트
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
