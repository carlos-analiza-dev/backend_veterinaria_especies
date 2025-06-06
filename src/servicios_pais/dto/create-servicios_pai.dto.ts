import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateServiciosPaiDto {
  @IsUUID()
  @IsNotEmpty({ message: 'El ID del servicio es obligatorio.' })
  servicioId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El ID del país es obligatorio.' })
  paisId: string;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0.' })
  precio: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'La cantidad mínima debe ser un número positivo.' })
  cantidadMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'La cantidad máxima debe ser un número positivo.' })
  cantidadMax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El tiempo debe ser un número positivo.' })
  tiempo?: number;
}
