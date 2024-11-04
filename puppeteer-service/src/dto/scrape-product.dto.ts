import { IsString } from 'class-validator';

export class ScrapeProductDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
