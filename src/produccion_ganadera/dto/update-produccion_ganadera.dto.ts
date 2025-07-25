import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionGanaderaDto } from './create-produccion_ganadera.dto';

export class UpdateProduccionGanaderaDto extends PartialType(CreateProduccionGanaderaDto) {}
