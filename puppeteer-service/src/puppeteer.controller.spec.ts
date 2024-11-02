import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';

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
          },
        },
      ],
    }).compile();

    puppeteerController = module.get<PuppeteerController>(PuppeteerController);
    puppeteerService = module.get<PuppeteerService>(PuppeteerService);
  });

  describe('scrape', () => {
    it('should return the most expensive product and user service response', async () => {
      const result = {
        mostExpensiveProduct: { name: 'Test Product', price: 99.99 },
        userServiceResponse: { success: true }, // Mock da resposta do serviço
      };
      
      jest.spyOn(puppeteerService, 'scrapeAndSaveProduct').mockResolvedValue(result);

      expect(await puppeteerController.getMostExpensiveProduct()).toBe(result);
    });
  });
});
