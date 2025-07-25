import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionForrajesInsumoDto } from './create-produccion_forrajes_insumo.dto';

export class UpdateProduccionForrajesInsumoDto extends PartialType(CreateProduccionForrajesInsumoDto) {}
