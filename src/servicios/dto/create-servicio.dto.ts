import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descrcipcion es obligatoria' })
  descripcion: string;
}
