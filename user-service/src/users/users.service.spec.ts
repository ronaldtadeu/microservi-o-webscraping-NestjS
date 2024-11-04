import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  const userMock = { id: '1', name: 'John Doe', password: 'secret' };

  beforeEach(async () => {
    // Mock do UserModel
    mockUserModel = {
      // Simulando a criação de uma nova instância de modelo
      create: jest.fn().mockResolvedValue(userMock), // Mock do método create
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([userMock]), // Retorna um array com o usuário mockado
      }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(userMock), // Retorna o usuário mockado
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...userMock, name: 'Updated User' }), // Retorna o usuário atualizado
      }),
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(userMock), // Retorna o usuário mockado
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = { name: 'John Doe', password: 'secret' };
      const createdUser = await service.create(user);
      expect(createdUser).toEqual(userMock);
      expect(mockUserModel.create).toHaveBeenCalledWith(user); // Verifica se o método create foi chamado com os dados corretos
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([userMock]);
      expect(mockUserModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = '1';
      const result = await service.findOne(id);
      expect(result).toEqual(userMock);
      expect(mockUserModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const user = { name: 'Updated User', password: 'newSecret' };
      const result = await service.update(id, user);
      expect(result).toEqual({ ...userMock, name: 'Updated User' });
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(id, user, { new: true });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = '1';
      const result = await service.delete(id);
      expect(result).toEqual(userMock);
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
