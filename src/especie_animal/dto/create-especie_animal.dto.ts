import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEspecieAnimalDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
