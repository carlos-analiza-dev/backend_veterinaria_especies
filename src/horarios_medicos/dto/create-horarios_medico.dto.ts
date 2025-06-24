import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateHorariosMedicoDto {
  @IsUUID('4', { message: 'El ID del médico debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del médico es obligatorio.' })
  medicoId: string;

  @IsInt({ message: 'El día de la semana debe ser un número entero.' })
  @Min(1, { message: 'El día de la semana debe ser al menos 1 (lunes).' })
  @Max(7, {
    message: 'El día de la semana no puede ser mayor que 7 (domingo).',
  })
  diaSemana: number;

  @IsString({
    message: 'La hora de inicio debe ser una cadena en formato HH:mm.',
  })
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe estar en formato HH:mm (ej. 08:30).',
  })
  horaInicio: string;

  @IsString({ message: 'La hora de fin debe ser una cadena en formato HH:mm.' })
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de fin debe estar en formato HH:mm (ej. 17:00).',
  })
  horaFin: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo disponible debe ser un valor booleano.' })
  disponible?: boolean;
}
