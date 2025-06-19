import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateSubServicioDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres.' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripcion no debe estar vacia' })
  descripcion: string;

  @IsUUID('4', { message: 'El ID del servicio debe ser un UUID válido.' })
  servicioId: string;

  @IsOptional()
  @IsBoolean({
    message: 'El campo isActive debe ser un valor booleano (true o false).',
  })
  isActive?: boolean;
}
