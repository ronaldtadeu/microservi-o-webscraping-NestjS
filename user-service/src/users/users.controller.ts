import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; // Importando o DTO
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created.' })
  create(@Body() createUserDto: CreateUserDto) { // Usando o DTO
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User details.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'User updated.' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) { // Usando o DTO para atualização
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted.' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
