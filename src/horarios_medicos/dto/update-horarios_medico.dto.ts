import { PartialType } from '@nestjs/mapped-types';
import { CreateHorariosMedicoDto } from './create-horarios_medico.dto';

export class UpdateHorariosMedicoDto extends PartialType(CreateHorariosMedicoDto) {}
