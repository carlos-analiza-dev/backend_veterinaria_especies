import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalFincaDto } from './create-animal_finca.dto';

export class UpdateAnimalFincaDto extends PartialType(CreateAnimalFincaDto) {}
