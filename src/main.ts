import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: ['http://localhost:3001'],
  // });
  app.enableCors();
  await app.listen(9006);
}
bootstrap();
