import { PartialType } from '@nestjs/mapped-types';
import { CreateSubServicioDto } from './create-sub_servicio.dto';

export class UpdateSubServicioDto extends PartialType(CreateSubServicioDto) {}
