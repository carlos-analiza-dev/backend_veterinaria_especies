import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecieAnimalDto } from './create-especie_animal.dto';

export class UpdateEspecieAnimalDto extends PartialType(CreateEspecieAnimalDto) {}
