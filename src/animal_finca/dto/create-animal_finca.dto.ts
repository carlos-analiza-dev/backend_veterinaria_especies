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
  Min,
  ValidateNested,
} from 'class-validator';

export class AlimentacionDto {
  @IsString()
  @Length(1, 100)
  alimento: string;
}

export class CreateAnimalFincaDto {
  @IsString({ message: 'La especie del animal es obligatoria' })
  @IsUUID()
  @IsNotEmpty({ message: 'El campo especie no puede estar vacio' })
  especie: string;

  @IsString({ message: 'El sexo del animal es obligatorio' })
  @IsNotEmpty({ message: 'El sexp especie no puede estar vacio' })
  sexo: string;

  @IsString({ message: 'El color del animal es obligatorio' })
  @IsNotEmpty({ message: 'El campo color no puede estar vacio' })
  color: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlimentacionDto)
  tipo_alimentacion: AlimentacionDto[];

  @IsString({ message: 'El identificador del animal es obligatorio' })
  @IsNotEmpty({ message: 'El campo identificador no puede estar vacio' })
  identificador: string;

  @IsString({ message: 'La raza del animal es obligatorio' })
  @IsUUID()
  @IsNotEmpty({ message: 'El campo raza no puede estar vacio' })
  raza: string;

  @IsNumber()
  @Min(0, { message: 'La edad promedio debe ser mayor o igual a 0.' })
  edad_promedio?: number;

  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD' },
  )
  @IsNotEmpty({ message: 'El campo fecha nacimiento no puede estar vacio' })
  fecha_nacimiento?: string;

  @IsString({ message: 'Las observaciones del animal son obligatorias' })
  @IsNotEmpty({ message: 'El campo observaciones no puede estar vacio' })
  observaciones?: string;

  @IsUUID()
  propietarioId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El campo finca no puede estar vacio' })
  fincaId: string;

  @IsOptional()
  @IsBoolean()
  castrado?: boolean;

  @IsOptional()
  @IsBoolean()
  esterelizado?: boolean;
}
