import { Controller, Post, Body } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('scrape')
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Post('product')
  async scrapeProduct(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const result = await this.puppeteerService.scrapeAndSaveProduct(username, password);
    return result; // Retorna o resultado do scraping
  }
}
