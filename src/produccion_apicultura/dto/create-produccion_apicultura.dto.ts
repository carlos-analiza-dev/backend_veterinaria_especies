import {
  IsUUID,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateProduccionApiculturaDto {
  @IsInt({ message: 'El número de colmenas debe ser un entero' })
  @Min(1, { message: 'Debe haber al menos una colmena' })
  numero_colmenas: number;

  @IsString({ message: 'La frecuencia de cosecha debe ser un texto' })
  frecuencia_cosecha: string;

  @IsNumber({}, { message: 'La cantidad por cosecha debe ser numérica' })
  @Min(0.1, { message: 'Debe especificar una cantidad válida' })
  cantidad_por_cosecha: number;

  @IsString({ message: 'La calidad de miel debe ser texto' })
  @IsIn(['Oscura', 'Clara', 'Multifloral'], {
    message: 'La calidad debe ser Oscura, Clara o Multifloral',
  })
  calidad_miel: 'Oscura' | 'Clara' | 'Multifloral';

  @IsDateString(
    {},
    { message: 'La fecha de cosecha debe ser una fecha válida' },
  )
  fecha_cosecha: Date;

  @IsOptional()
  @IsString({ message: 'El destino debe ser texto' })
  destino_comercializacion?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activa debe ser booleano' })
  activa?: boolean;
}
