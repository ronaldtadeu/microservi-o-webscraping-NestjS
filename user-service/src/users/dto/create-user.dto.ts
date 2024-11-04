// src/users/dto/create-user.dto.ts

import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Senha do usuário' }) // Adicione a senha
  @IsString()
  @IsNotEmpty()
  password: string;

  // Adicione outros campos conforme necessário
}
