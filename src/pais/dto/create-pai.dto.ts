import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePaiDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
