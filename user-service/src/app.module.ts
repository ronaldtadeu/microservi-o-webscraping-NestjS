import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://julado123br:w66qAHkRe7jSwBRj@cluster0.7mpht.mongodb.net/user_service_db'),
    UsersModule,
  ],
})
export class AppModule {}
