import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePreservationDto {
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  size: string;

  @IsInt()
  userId: number;
}

