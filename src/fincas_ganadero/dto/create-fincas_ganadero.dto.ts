import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  IsBoolean,
  Length,
  IsArray,
} from 'class-validator';

export class CreateFincasGanaderoDto {
  @IsString()
  @Length(3, 150)
  nombre_finca: string;

  @IsInt()
  cantidad_animales: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  ubicacion?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  abreviatura?: string;

  @IsUUID()
  departamentoId: string;

  @IsUUID()
  municipioId: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  tamaño_total?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  area_ganaderia?: string;

  @IsOptional()
  @IsString()
  tipo_explotacion?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  especies_maneja?: string[];

  @IsUUID()
  propietario_id: string;

  @IsUUID()
  pais_id: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
