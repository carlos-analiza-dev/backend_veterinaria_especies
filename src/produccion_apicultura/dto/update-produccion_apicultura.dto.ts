import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionApiculturaDto } from './create-produccion_apicultura.dto';

export class UpdateProduccionApiculturaDto extends PartialType(CreateProduccionApiculturaDto) {}
