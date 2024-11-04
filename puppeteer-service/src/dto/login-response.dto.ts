import { ApiProperty } from '@nestjs/swagger';

class ProductDto {
  @ApiProperty({ example: 'Sauce Labs Backpack' })
  name: string;

  @ApiProperty({ example: 49.99 })
  price: number;
}

export class LoginResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Login successful for user standard_user.' })
  message: string;

  @ApiProperty({ type: ProductDto, description: 'Most expensive product after login' })
  mostExpensiveProduct: ProductDto;
}