// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema'; // Certifique-se de que o caminho esteja correto

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registrando o modelo de usuário
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Expondo o serviço, se necessário
})
export class UsersModule {}
