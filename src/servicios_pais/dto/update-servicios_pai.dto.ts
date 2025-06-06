import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciosPaiDto } from './create-servicios_pai.dto';

export class UpdateServiciosPaiDto extends PartialType(CreateServiciosPaiDto) {}
