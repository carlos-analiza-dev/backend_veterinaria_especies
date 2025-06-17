import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRazaAnimalDto {
  @IsString()
  nombre: string;

  @IsString()
  abreviatura: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsUUID()
  especieId: string;
}
