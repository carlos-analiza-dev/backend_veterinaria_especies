import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class AlimentacionDto {
  @IsString()
  @Length(1, 100)
  alimento: string;
}

export class CreateAnimalFincaDto {
  @IsUUID('4', { message: 'La especie debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La especie del animal es obligatoria' })
  especie: string;

  @IsString({ message: 'El sexo debe ser un texto' })
  @IsNotEmpty({ message: 'El sexo del animal es obligatorio' })
  sexo: string;

  @IsString({ message: 'El color debe ser un texto' })
  @IsNotEmpty({ message: 'El color del animal es obligatorio' })
  color: string;

  @IsArray({ message: 'La alimentación debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => AlimentacionDto)
  tipo_alimentacion: AlimentacionDto[];

  @IsString({ message: 'El identificador debe ser un texto' })
  @IsNotEmpty({ message: 'El identificador del animal es obligatorio' })
  @Matches(/^[A-Za-z0-9]{5}-\d{6}$/, {
    message:
      'El identificador debe tener el siguiente formato, ejem: BOSE2-000001',
  })
  identificador: string;

  @IsUUID('4', { message: 'La raza debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La raza del animal es obligatoria' })
  raza: string;

  @IsOptional()
  @IsNumber({}, { message: 'La edad promedio debe ser un número' })
  @Min(0, { message: 'La edad promedio debe ser mayor o igual a 0' })
  edad_promedio?: number;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD' },
  )
  fecha_nacimiento?: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  observaciones?: string;

  @IsUUID('4', { message: 'El ID del propietario debe ser un UUID válido' })
  propietarioId: string;

  @IsUUID('4', { message: 'El ID de la finca debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La finca del animal es obligatoria' })
  fincaId: string;

  @IsOptional()
  @IsBoolean({ message: 'El valor de castrado debe ser verdadero o falso' })
  castrado?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El valor de esterilizado debe ser verdadero o falso' })
  esterelizado?: boolean;
}
