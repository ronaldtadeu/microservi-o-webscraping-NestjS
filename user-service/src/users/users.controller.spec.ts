import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = {
    create: jest.fn(dto => {
      return {
        id: '1',
        ...dto,
      };
    }),
    findAll: jest.fn(() => [
      { id: '1', name: 'John Doe', password: 'secret' }, // Incluindo password no mock
      { id: '2', name: 'Jane Doe', password: 'secret' }, // Incluindo password no mock
    ]),
    findOne: jest.fn(id => {
      return { id, name: 'John Doe', password: 'secret' }; // Incluindo password no mock
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
    delete: jest.fn(id => {
      return { id };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { name: 'John Doe', password: 'secret' }; // Incluindo password
      expect(await controller.create(dto)).toEqual({ id: '1', ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toEqual([
        { id: '1', name: 'John Doe', password: 'secret' },
        { id: '2', name: 'Jane Doe', password: 'secret' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = '1';
      expect(await controller.findOne(id)).toEqual({ id, name: 'John Doe', password: 'secret' });
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const dto: CreateUserDto = { name: 'Updated User', password: 'newSecret' }; // Incluindo password
      expect(await controller.update(id, dto)).toEqual({ id, ...dto });
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = '1';
      expect(await controller.delete(id)).toEqual({ id });
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
