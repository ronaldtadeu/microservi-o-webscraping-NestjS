import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';
import { ScrapeProductDto } from './dto/scrape-product.dto';

describe('PuppeteerController', () => {
  let puppeteerController: PuppeteerController;
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteerController],
      providers: [
        {
          provide: PuppeteerService,
          useValue: {
            scrapeAndSaveProduct: jest.fn(),
            tryLogin: jest.fn(), // Adiciona o método necessário para testes
          },
        },
      ],
    }).compile();

    puppeteerController = module.get<PuppeteerController>(PuppeteerController);
    puppeteerService = module.get<PuppeteerService>(PuppeteerService);
  });

  describe('scrapeProduct', () => {
    it('should return scraped product data', async () => {
      const scrapeProductDto: ScrapeProductDto = {
        username: 'exampleUser',
        password: 'examplePass',
      };

      const result = {
        products: [
          { id: '123', name: 'Produto Exemplo 1', price: 19.99, description: 'Descrição do produto exemplo 1' },
          { id: '124', name: 'Produto Exemplo 2', price: 29.99, description: 'Descrição do produto exemplo 2' },
        ],
        mostExpensiveProduct: { id: '124', name: 'Produto Exemplo 2', price: 29.99, description: 'Descrição do produto exemplo 2' },
        cheapestProduct: { id: '123', name: 'Produto Exemplo 1', price: 19.99, description: 'Descrição do produto exemplo 1' },
      };

      jest.spyOn(puppeteerService, 'scrapeAndSaveProduct').mockResolvedValue(result);

      const response = await puppeteerController.scrapeProduct(scrapeProductDto);
      expect(response).toEqual(result);
    });
  });

  describe('automatedLogin', () => {
    it('should return login results for multiple users', async () => {
      const mockResults = [
        { username: 'standard_user', success: true, message: 'Login successful.', mostExpensiveProduct: { name: 'Produto Exemplo', price: 49.99 } },
        { username: 'locked_out_user', success: false, message: 'This user is locked out.' },
        { username: 'problem_user', success: true, message: 'Login successful.', mostExpensiveProduct: { name: 'Produto Exemplo 2', price: 39.99 } },
        { username: 'performance_glitch_user', success: true, message: 'Login successful.', mostExpensiveProduct: { name: 'Produto Exemplo 3', price: 29.99 } },
        { username: 'error_user', success: false, message: 'Login failed.' },
        { username: 'visual_user', success: true, message: 'Login successful.', mostExpensiveProduct: { name: 'Produto Exemplo 4', price: 19.99 } },
      ];
  
      jest.spyOn(puppeteerService, 'tryLogin').mockImplementation(async (username) => {
        return mockResults.find(user => user.username === username) || { error: 'User not found.' };
      });
  
      const result = await puppeteerController.automatedLogin();
      expect(result.results.length).toBe(mockResults.length); // Verifica que retornou todos os resultados
      expect(result.results[0].username).toBe('standard_user');
      expect(result.results[1].username).toBe('locked_out_user');
    });
  });
  
});
