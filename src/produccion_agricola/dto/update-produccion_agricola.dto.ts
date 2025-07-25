import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionAgricolaDto } from './create-produccion_agricola.dto';

export class UpdateProduccionAgricolaDto extends PartialType(CreateProduccionAgricolaDto) {}
