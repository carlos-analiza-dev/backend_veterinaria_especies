import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDepartamentosPaiDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  pais: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
