import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaiDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  code_phone: string;
  @IsString()
  @IsNotEmpty()
  nombre_moneda: string;
  @IsString()
  @IsNotEmpty()
  simbolo_moneda: string;
  @IsString()
  @IsNotEmpty()
  nombre_documento: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
