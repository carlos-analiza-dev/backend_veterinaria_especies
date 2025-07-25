import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProduccionGanaderaDto {
  @IsOptional()
  @IsNumber()
  leche_diaria_lt?: number;

  @IsOptional()
  @IsNumber()
  carne_anual_kg?: number;

  @IsOptional()
  @IsNumber()
  animales_vendidos?: number;

  @IsOptional()
  @IsString()
  notas?: string;
}
