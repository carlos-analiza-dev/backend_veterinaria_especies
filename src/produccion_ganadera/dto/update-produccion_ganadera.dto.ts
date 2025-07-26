import { PartialType } from '@nestjs/mapped-types';
import { ProduccionGanaderaDto } from './create-produccion_ganadera.dto';

export class UpdateProduccionGanaderaDto extends PartialType(
  ProduccionGanaderaDto,
) {}
