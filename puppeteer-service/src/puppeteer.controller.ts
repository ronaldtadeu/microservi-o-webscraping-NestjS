import { Controller, Post, Body } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ScrapeProductDto } from './dto/scrape-product.dto';

@ApiTags('scrape')
@Controller('scrape')
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Post('product')
  @ApiOperation({ summary: 'Scrape product information' })
  @ApiBody({
    description: 'Credentials for scraping',
    type: ScrapeProductDto,
    examples: {
      example: {
        value: {
          username: 'exampleUser',
          password: 'examplePass',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully scraped product data.',
    schema: {
      example: {
        products: [
          {
            id: '123',
            name: 'Produto Exemplo 1',
            price: 19.99,
            description: 'Descrição do produto exemplo 1',
          },
          {
            id: '124',
            name: 'Produto Exemplo 2',
            price: 29.99,
            description: 'Descrição do produto exemplo 2',
          },
        ],
        mostExpensiveProduct: {
          id: '124',
          name: 'Produto Exemplo 2',
          price: 29.99,
          description: 'Descrição do produto exemplo 2',
        },
        cheapestProduct: {
          id: '123',
          name: 'Produto Exemplo 1',
          price: 19.99,
          description: 'Descrição do produto exemplo 1',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials or error during scraping.' })
  async scrapeProduct(@Body() body: ScrapeProductDto) {
    const { username, password } = body;
    const result = await this.puppeteerService.scrapeAndSaveProduct(username, password);
    return result;
  }

  @Post('auto-login-products')
  @ApiOperation({ summary: 'Automated login and product scraping' })
  @ApiResponse({
    status: 200,
    description: 'Results of the login attempts.',
    schema: {
      example: {
        results: [
          { username: 'standard_user', success: true, message: 'Login successful.', mostExpensiveProduct: { name: 'Produto Exemplo', price: 49.99 } },
          { username: 'locked_out_user', success: false, message: 'This user is locked out.' },
        ],
      },
    },
  })
  async automatedLogin() {
    const users = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user',
      'error_user',
      'visual_user',
    ];
    const password = 'secret_sauce';
    const results = [];

    for (const user of users) {
      const result = await this.puppeteerService.tryLogin(user, password);
      
      // Verifica se o resultado contém um erro
      if ('error' in result) {
        results.push({
          username: user,
          success: false,
          message: result.error,
          mostExpensiveProduct: null,
        });
      } else {
        results.push({
          username: user,
          success: result.success,
          message: result.message,
          mostExpensiveProduct: result.mostExpensiveProduct || null,
        });
      }
    }

    return { results };
  }
}
