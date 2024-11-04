import { NestFactory } from '@nestjs/core';
import { PuppeteerModule } from './puppeteer.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PuppeteerModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Web Scraping Service')
    .setDescription('API para scraping de produtos e gerenciamento de usuários')
    .setVersion('1.0')
    .addTag('scrape')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
