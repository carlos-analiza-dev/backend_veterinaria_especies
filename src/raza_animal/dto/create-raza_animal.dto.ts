import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRazaAnimalDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsUUID()
  especieId: string;
}
