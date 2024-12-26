import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // ejs 설정
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // view 엔진 설정
  app.setViewEngine('ejs');
  // ejs 템플릿 경로 설정
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
