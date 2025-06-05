import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipiosDepartamentosPaiDto } from './create-municipios_departamentos_pai.dto';

export class UpdateMunicipiosDepartamentosPaiDto extends PartialType(CreateMunicipiosDepartamentosPaiDto) {}
