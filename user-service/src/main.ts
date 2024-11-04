import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Cria a aplicação a partir do AppModule
  const app = await NestFactory.create(AppModule);
  
  // Configura o Swagger
  const config = new DocumentBuilder()
    .setTitle('User API') // Título da API
    .setDescription('API for managing users') // Descrição da API
    .setVersion('1.0') // Versão da API
    .build();
  
  // Cria o documento Swagger com base na configuração
  const document = SwaggerModule.createDocument(app, config);
  
  // Configura o Swagger UI em /api
  SwaggerModule.setup('api', app, document);
  
  // Inicia a aplicação na porta 3000
  await app.listen(3000);
}

// Chama a função bootstrap para iniciar a aplicação
bootstrap();
