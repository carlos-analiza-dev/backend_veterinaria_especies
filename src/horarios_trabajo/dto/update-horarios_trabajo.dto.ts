import { PartialType } from '@nestjs/mapped-types';
import { CreateHorariosTrabajoDto } from './create-horarios_trabajo.dto';

export class UpdateHorariosTrabajoDto extends PartialType(CreateHorariosTrabajoDto) {}
