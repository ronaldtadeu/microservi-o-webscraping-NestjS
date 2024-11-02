import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importa o HttpModule
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';

@Module({
  imports: [HttpModule], // Importa o HttpModule aqui
  controllers: [PuppeteerController],
  providers: [PuppeteerService],
})
export class PuppeteerModule {}
