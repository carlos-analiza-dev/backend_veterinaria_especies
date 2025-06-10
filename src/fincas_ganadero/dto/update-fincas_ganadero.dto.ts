import { PartialType } from '@nestjs/mapped-types';
import { CreateFincasGanaderoDto } from './create-fincas_ganadero.dto';

export class UpdateFincasGanaderoDto extends PartialType(CreateFincasGanaderoDto) {}
