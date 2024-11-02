import { NestFactory } from '@nestjs/core';
import { PuppeteerModule } from './puppeteer.module';

async function bootstrap() {
  const app = await NestFactory.create(PuppeteerModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
