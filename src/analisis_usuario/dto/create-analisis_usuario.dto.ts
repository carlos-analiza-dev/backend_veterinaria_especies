import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAnalisisUsuarioDto {
  @IsDateString()
  fechaAnalisis: Date;

  @IsEnum(['Excelente', 'Buena', 'Regular', 'Mala', 'Pésima'])
  calidadSuelo: string;

  @IsEnum(['Arcilloso', 'Franco', 'Arenoso', 'Limoso', 'Orgánico'])
  tipoSuelo: string;

  @IsNumber()
  rendimiento: number;

  @IsNumber()
  eficienciaInsumos: number;

  @IsOptional()
  @IsNumber()
  phSuelo?: number;

  @IsOptional()
  @IsNumber()
  materiaOrganica?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsUUID()
  userId: string;
}
