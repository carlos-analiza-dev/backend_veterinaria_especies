import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMedicoDto {
  @IsString({ message: 'El número de colegiado debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El número de colegiado es obligatorio.' })
  @Matches(/^\d+$/, {
    message: 'El número de colegiado solo debe contener números.',
  })
  @MaxLength(9, {
    message: 'El número de colegiado no debe tener más de 9 dígitos.',
  })
  numero_colegiado: string;

  @IsString({ message: 'La especialidad debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La especialidad es obligatoria.' })
  @Length(3, 25, {
    message: 'La especialidad debe tener entre 3 y 25 caracteres.',
  })
  especialidad: string;

  @IsString({
    message: 'La universidad de formación debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'La universidad de formación es obligatoria.',
  })
  @Length(5, 100, {
    message: 'La universidad de formación debe tener entre 5 y 100 caracteres.',
  })
  universidad_formacion: string;

  @Min(0, {
    message: 'Los años de experiencia no pueden ser negativos.',
  })
  @Max(80, {
    message: 'Los años de experiencia no pueden ser mayores a 80.',
  })
  @IsInt({ message: 'Los años de experiencia deben ser un número entero.' })
  anios_experiencia: number;

  @IsUUID('all', {
    each: true,
    message: 'Cada área de trabajo debe tener un ID válido.',
  })
  @IsArray({ message: 'Las áreas de trabajo deben ser un arreglo.' })
  @ArrayUnique({ message: 'Las áreas de trabajo no deben repetirse.' })
  @ArrayNotEmpty({ message: 'Debe seleccionar al menos un área de trabajo.' })
  areas_trabajo: string[];

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  usuarioId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
