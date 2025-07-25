import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export type ActividadTipo =
  | 'Hongos comestibles'
  | 'Abonos orgánicos'
  | 'Semillas'
  | 'Plantas medicinales o aromáticas'
  | 'Otros';

export class ActividadAlternativaDto {
  @IsEnum([
    'Hongos comestibles',
    'Abonos orgánicos',
    'Semillas',
    'Plantas medicinales o aromáticas',
    'Otros',
  ])
  tipo: ActividadTipo;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  cantidad_producida?: string;

  @IsOptional()
  @IsString()
  unidad_medida?: string;

  @IsOptional()
  @IsNumber()
  ingresos_anuales?: number;
}

export class CreateProduccionAlternativaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActividadAlternativaDto)
  actividades: ActividadAlternativaDto[];
}
