import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  PurezaEnum,
  TipoReproduccionEnum,
} from '../entities/animal_finca.entity';

export class TipoAlimentacionDto {
  @IsString({ message: 'El nombre del alimento debe ser un texto válido.' })
  alimento: string;

  @IsIn(['comprado', 'producido', 'comprado y producido'], {
    message:
      'El origen debe ser "comprado", "producido" o "comprado y producido".',
  })
  origen: 'comprado' | 'producido' | 'comprado y producido';

  @ValidateIf((o) => o.origen === 'comprado y producido')
  porcentaje_comprado?: number;

  @ValidateIf((o) => o.origen === 'comprado y producido')
  porcentaje_producido?: number;
}

class ComplementoDto {
  @IsString({ message: 'El complemento debe ser un texto válido.' })
  complemento: string;
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

  @IsString({ message: 'La produccion debe ser un texto' })
  @IsNotEmpty({ message: 'La produccion del animal es obligatorio' })
  produccion: string;

  @IsString({ message: 'El tipo de produccion debe ser un texto' })
  @IsNotEmpty({ message: 'El tipo de produccion del animal es obligatorio' })
  tipo_produccion: string;

  @IsArray({ message: 'La alimentación debe ser un arreglo' })
  @IsNotEmpty({ message: 'Debe ingresar al menos un alimento' })
  @ValidateNested({ each: true })
  @Type(() => TipoAlimentacionDto)
  tipo_alimentacion: TipoAlimentacionDto[];

  @IsEnum(TipoReproduccionEnum)
  tipo_reproduccion: TipoReproduccionEnum = TipoReproduccionEnum.NATURAL;

  @IsEnum(PurezaEnum, {
    message:
      'La pureza debe ser uno de: Puro, Puro por cruza, 3/4 raza, 1/2 raza, Criollo',
  })
  pureza: PurezaEnum;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComplementoDto)
  @IsOptional()
  complementos: ComplementoDto[];

  @IsString()
  @IsOptional()
  medicamento?: string;

  @IsString({ message: 'El identificador debe ser un texto' })
  @IsNotEmpty({ message: 'El identificador del animal es obligatorio' })
  identificador: string;

  @IsArray({ message: 'Las razas deben ser un arreglo de IDs válidos' })
  @IsUUID('4', { each: true, message: 'Cada raza debe ser un UUID válido' })
  @IsNotEmpty({ message: 'Debes ingresar al menos una raza' })
  razaIds: string[];

  @IsOptional()
  @IsNumber({}, { message: 'La edad promedio debe ser un número' })
  @Min(0, { message: 'La edad promedio debe ser mayor o igual a 0' })
  edad_promedio?: number;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
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
  @IsBoolean({ message: 'El valor de la muerte debe ser verdadero o falso' })
  animal_muerte?: boolean;

  @IsString()
  @IsOptional()
  razon_muerte?: string;

  @IsOptional()
  @IsBoolean({ message: 'El valor de esterilizado debe ser verdadero o falso' })
  esterelizado?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'El valor de compra del padre debe ser verdadero o falso.',
  })
  compra_animal?: boolean;

  @IsOptional()
  @IsString({
    message:
      'El nombre del criador de origen del padre debe ser un texto válido.',
  })
  nombre_criador_origen_animal?: string;

  // --- DATOS PADRE ---
  @IsOptional()
  @IsString({ message: 'El nombre del padre debe ser un texto válido.' })
  nombre_padre?: string;

  @IsString({ message: 'El arete del padre debe ser un texto válido.' })
  @IsNotEmpty({ message: 'El arete del padre es obligatorio.' })
  arete_padre?: string;

  @IsArray({ message: 'Las razas deben ser un arreglo de IDs válidos' })
  @IsUUID('4', { each: true, message: 'Cada raza debe ser un UUID válido' })
  @IsNotEmpty({ message: 'Debes ingresar al menos una raza al padre' })
  razas_padre: string[];

  @IsEnum(PurezaEnum, {
    message:
      'La pureza del padre debe ser uno de: 1 raza, 7/8 raza, 3/4 raza, 1/2 raza, 5/8 raza',
  })
  pureza_padre: PurezaEnum;

  @IsNotEmpty({ message: 'El nombre del criador del padre es obligatorio.' })
  @IsString({
    message: 'El nombre del criador del padre debe ser un texto válido.',
  })
  nombre_criador_padre: string;

  @IsNotEmpty({
    message: 'El nombre del propietario del padre es obligatorio.',
  })
  @IsString({
    message: 'El nombre del propietario del padre debe ser un texto válido.',
  })
  nombre_propietario_padre: string;

  @IsNotEmpty({
    message: 'El nombre de la finca de origen del padre es obligatorio.',
  })
  @IsString({
    message: 'El nombre de la finca del padre debe ser un texto válido.',
  })
  nombre_finca_origen_padre: string;

  // --- DATOS MADRE ---
  @IsOptional()
  @IsString({ message: 'El nombre de la madre debe ser un texto válido.' })
  nombre_madre?: string;

  @IsString({ message: 'El arete de la madre debe ser un texto válido.' })
  @IsNotEmpty({ message: 'El arete de la madre es obligatorio.' })
  arete_madre: string;

  @IsArray({ message: 'Las razas deben ser un arreglo de IDs válidos' })
  @IsUUID('4', { each: true, message: 'Cada raza debe ser un UUID válido' })
  @IsNotEmpty({ message: 'Debes ingresar al menos una raza a la madre' })
  razas_madre: string[];

  @IsEnum(PurezaEnum, {
    message:
      'La pureza de la madre debe ser uno de: 1 raza, 7/8 raza, 3/4 raza, 1/2 raza, 5/8 raza',
  })
  pureza_madre: PurezaEnum;

  @IsNotEmpty({ message: 'El nombre del criador de la madre es obligatorio.' })
  @IsString({
    message: 'El nombre del criador de la madre debe ser un texto válido.',
  })
  nombre_criador_madre: string;

  @IsNotEmpty({
    message: 'El nombre del propietario de la madre es obligatorio.',
  })
  @IsString({
    message: 'El nombre del propietario de la madre debe ser un texto válido.',
  })
  nombre_propietario_madre: string;

  @IsNotEmpty({
    message: 'El nombre de la finca de origen de la madre es obligatorio.',
  })
  @IsString({
    message: 'El nombre de la finca de la madre debe ser un texto válido.',
  })
  nombre_finca_origen_madre?: string;

  @IsNotEmpty({ message: 'El número de parto de la madre es obligatorio.' })
  @IsNumber(
    {},
    { message: 'El número de parto de la madre debe ser un número.' },
  )
  numero_parto_madre: number;
}
