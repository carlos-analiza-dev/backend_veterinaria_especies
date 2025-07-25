import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionAlternativaDto } from './create-produccion_alternativa.dto';

export class UpdateProduccionAlternativaDto extends PartialType(CreateProduccionAlternativaDto) {}
