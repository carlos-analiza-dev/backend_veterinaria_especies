import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateCitaDto {
  @IsString({ message: 'El ID del médico debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El campo medico es obligatorio.' })
  medicoId: string;

  @IsString({ message: 'El ID del animal debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El campo animal es obligatorio.' })
  animalId: string;

  @IsString({ message: 'El ID del usuario debe ser un UUID válido.' })
  @IsNotEmpty({
    message: 'No se encontro el usuario que realiza esta solicitud.',
  })
  usuarioId: string;

  @IsString({ message: 'El ID de la finca debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El campo finca es obligatorio.' })
  fincaId: string;

  @IsString({ message: 'El ID del servicio debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El campo Servicio es obligatorio.' })
  subServicioId: string;

  @IsDateString({}, { message: 'La fecha debe estar en formato YYYY-MM-DD.' })
  @IsNotEmpty({ message: 'La fecha es obligatoria.' })
  fecha: string;

  @IsString({
    message: 'La hora de inicio debe ser una cadena en formato HH:mm.',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe estar en formato HH:mm (ej. 08:30).',
  })
  horaInicio: string;

  @IsString({ message: 'La hora de fin debe ser una cadena en formato HH:mm.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de fin debe estar en formato HH:mm (ej. 17:00).',
  })
  horaFin: string;

  @IsInt({ message: 'La cantidad de animales debe ser un número entero.' })
  @Min(1, { message: 'La cantidad de animales debe ser al menos 1.' })
  @IsOptional()
  cantidadAnimales?: number;

  @IsNumber()
  @Min(0, { message: 'El total a pagar debe ser mayor o igual a 0.' })
  totalPagar: number;

  @IsInt({ message: 'La duración debe ser un número entero (en horas).' })
  @IsOptional()
  @Min(1, { message: 'La duración mínima de una cita debe ser 1 hora.' })
  duracion?: number = 1;
}
