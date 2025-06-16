import { PartialType } from '@nestjs/mapped-types';
import { CreateRazaAnimalDto } from './create-raza_animal.dto';

export class UpdateRazaAnimalDto extends PartialType(CreateRazaAnimalDto) {}
