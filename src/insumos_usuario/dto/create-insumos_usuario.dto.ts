import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateInsumosUsuarioDto {
  @IsInt()
  cantidadSku: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categorias: string[];

  @IsString()
  @IsNotEmpty()
  materiaPrima: string;

  @IsString()
  @IsNotEmpty()
  intereses: string;
}
