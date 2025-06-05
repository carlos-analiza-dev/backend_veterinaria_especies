import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartamentosPaiDto } from './create-departamentos_pai.dto';

export class UpdateDepartamentosPaiDto extends PartialType(CreateDepartamentosPaiDto) {}
