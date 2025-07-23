import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateInsumosUsuarioDto {
  @IsNotEmpty({ message: 'La cantidad de SKU es obligatoria' })
  @IsNumber({}, { message: 'La cantidad de SKU debe ser un número' })
  cantidadSku: number;

  @IsArray({ message: 'Las categorías deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'Debe proporcionar al menos una categoría' })
  @IsString({
    each: true,
    message: 'Cada categoría debe ser una cadena de texto',
  })
  categorias: string[];

  @IsNotEmpty({ message: 'La materia prima es obligatoria' })
  @IsString({ message: 'La materia prima debe ser una cadena de texto' })
  materiaPrima: string;

  @IsNotEmpty({ message: 'El campo intereses es obligatorio' })
  @IsString({ message: 'Los intereses deben ser una cadena de texto' })
  intereses: string;

  @IsUUID(undefined, { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;
}
