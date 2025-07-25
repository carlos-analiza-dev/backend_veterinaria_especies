import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionFincaDto } from './create-produccion_finca.dto';

export class UpdateProduccionFincaDto extends PartialType(
  CreateProduccionFincaDto,
) {}
