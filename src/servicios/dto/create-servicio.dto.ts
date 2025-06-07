import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descrcipcion es obligatoria' })
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
