import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateAnimalFincaDto {
  @IsString()
  especie: string;

  @IsString()
  sexo: string;

  @IsString()
  color: string;

  @IsString()
  identificador: string;

  @IsString()
  raza: string;

  @IsString()
  edad_promedio?: string;

  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD' },
  )
  fecha_nacimiento?: string;

  @IsString()
  observaciones?: string;

  @IsUUID()
  propietarioId: string;

  @IsUUID()
  fincaId: string;
}
