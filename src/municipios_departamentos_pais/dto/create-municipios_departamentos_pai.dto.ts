import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMunicipiosDepartamentosPaiDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  departamento: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
